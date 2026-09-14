-- ============================================================================
--  A Gift for maaike ✨ — Supabase schema, security-definer logic, and seed.
--
--  Run this whole file once in the Supabase SQL editor (Dashboard → SQL → New
--  query → paste → Run). It is safe to re-run: it drops and recreates objects.
--
--  Security model (matches the plan):
--   * Prices live ONLY in `gifts.internal_price` and never leave the database.
--   * The browser (anon role) cannot read any base table — RLS is ON with no
--     policies, and table grants are revoked.
--   * All reads/writes go through SECURITY DEFINER functions that run as the
--     table owner, apply the €250 budget + deadline + PIN rules server-side,
--     and return only sanitised results (ids/titles — never prices/totals).
--   * The admin function is the sole place internal totals are exposed, and it
--     is gated by a server-verified password.
-- ============================================================================

-- Supabase installs extensions into the `extensions` schema; make sure pgcrypto
-- is there (crypt/gen_salt/gen_random_bytes). Functions below add `extensions`
-- to their search_path so these resolve.
create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------------
--  Tables
-- ---------------------------------------------------------------------------
drop table if exists selection_events cascade;
drop table if exists selection_items cascade;
drop table if exists recipient cascade;
drop table if exists app_config cascade;
drop table if exists gifts cascade;

create table gifts (
  id             text primary key,
  title          text not null,
  description    text,
  category       text not null,
  image_path     text,
  is_exclusive   boolean not null default false,
  is_active      boolean not null default true,
  sort_order     int not null default 0,
  internal_price int not null default 0        -- NEVER exposed to the client
);

-- Single recipient (lean, per the plan). Enforced as a singleton row id = 1.
create table recipient (
  id               int primary key default 1,
  name             text not null,
  pin_hash         text,
  session_token    text,
  session_expires  timestamptz,
  failed_attempts  int not null default 0,
  lockout_until    timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  constraint recipient_singleton check (id = 1)
);

create table selection_items (
  gift_id text primary key references gifts(id)
);

create table selection_events (
  id             bigint generated always as identity primary key,
  event_type     text not null,
  snapshot       jsonb not null default '[]'::jsonb,
  internal_total int not null default 0,
  created_at     timestamptz not null default now()
);

create table app_config (
  key   text primary key,
  value text not null
);

-- Column-hiding view: everything about a gift EXCEPT its price. (Not required
-- by the current client, which uses local display config, but provided for a
-- safe price-free read path.)
drop view if exists gifts_public;
create view gifts_public as
  select id, title, description, category, image_path, is_exclusive, is_active, sort_order
  from gifts;

-- ---------------------------------------------------------------------------
--  Lock everything down: RLS on, no anon policies, revoke table grants.
-- ---------------------------------------------------------------------------
alter table gifts            enable row level security;
alter table recipient        enable row level security;
alter table selection_items  enable row level security;
alter table selection_events enable row level security;
alter table app_config       enable row level security;

revoke all on gifts, recipient, selection_items, selection_events, app_config
  from anon, authenticated;

grant select on gifts_public to anon, authenticated;

-- ---------------------------------------------------------------------------
--  Internal helpers (SECURITY DEFINER, NOT exposed to the API)
-- ---------------------------------------------------------------------------
create or replace function _budget() returns int
  language sql security definer set search_path = public, extensions stable as $$
  select value::int from app_config where key = 'budget';
$$;

create or replace function _is_locked() returns boolean
  language sql security definer set search_path = public, extensions stable as $$
  select current_date > (select value::date from app_config where key = 'selection_deadline');
$$;

create or replace function _current_ids() returns text[]
  language sql security definer set search_path = public, extensions stable as $$
  select coalesce(array_agg(gift_id), array[]::text[]) from selection_items;
$$;

create or replace function _total(p_ids text[]) returns int
  language sql security definer set search_path = public, extensions stable as $$
  select coalesce(sum(internal_price), 0)::int from gifts where id = any(p_ids);
$$;

-- Normalise a requested set: keep active gifts only; if any exclusive gift is
-- present, it stands alone (consumes the whole budget).
create or replace function _normalize(p_gift_ids text[]) returns text[]
  language plpgsql security definer set search_path = public, extensions stable as $$
declare v_ids text[]; v_excl text;
begin
  select array_agg(distinct id) into v_ids
    from gifts where id = any(p_gift_ids) and is_active;
  v_ids := coalesce(v_ids, array[]::text[]);
  select id into v_excl from gifts where id = any(v_ids) and is_exclusive limit 1;
  if v_excl is not null then
    return array[v_excl];
  end if;
  return v_ids;
end;
$$;

create or replace function _valid_token(p_token text) returns boolean
  language sql security definer set search_path = public, extensions stable as $$
  select coalesce(p_token, '') <> '' and exists (
    select 1 from recipient
    where id = 1 and session_token = p_token
      and (session_expires is null or session_expires > now())
  );
$$;

-- Keep helpers off the public API.
revoke all on function _budget(), _is_locked(), _current_ids(), _total(text[]),
  _normalize(text[]), _valid_token(text) from anon, authenticated, public;

-- ---------------------------------------------------------------------------
--  Public RPCs (exposed to the anon client via PostgREST)
-- ---------------------------------------------------------------------------
create or replace function app_has_pin() returns boolean
  language sql security definer set search_path = public, extensions stable as $$
  select (select pin_hash from recipient where id = 1) is not null;
$$;

create or replace function app_status() returns json
  language sql security definer set search_path = public, extensions stable as $$
  select json_build_object(
    'locked', _is_locked(),
    'deadline', (select value from app_config where key = 'selection_deadline')
  );
$$;

create or replace function app_create_pin(p_pin text) returns json
  language plpgsql security definer set search_path = public, extensions as $$
declare v_token text;
begin
  if p_pin !~ '^\d{4}$' then
    return json_build_object('ok', false, 'reason', 'error');
  end if;
  if (select pin_hash from recipient where id = 1) is not null then
    return json_build_object('ok', false, 'reason', 'already_exists');
  end if;
  v_token := encode(gen_random_bytes(24), 'hex');
  update recipient
    set pin_hash = crypt(p_pin, gen_salt('bf')),
        session_token = v_token,
        session_expires = now() + interval '45 days',
        updated_at = now()
    where id = 1;
  insert into selection_events(event_type, snapshot, internal_total)
    values ('pin_created', '[]'::jsonb, 0);
  return json_build_object('ok', true, 'token', v_token);
end;
$$;

create or replace function app_verify_pin(p_pin text) returns json
  language plpgsql security definer set search_path = public, extensions as $$
declare r recipient; v_token text; v_attempts int;
begin
  select * into r from recipient where id = 1;
  if r.lockout_until is not null and r.lockout_until > now() then
    return json_build_object('ok', false, 'reason', 'locked_out');
  end if;

  if r.pin_hash is not null and r.pin_hash = crypt(p_pin, r.pin_hash) then
    v_token := encode(gen_random_bytes(24), 'hex');
    update recipient
      set session_token = v_token,
          session_expires = now() + interval '45 days',
          failed_attempts = 0,
          lockout_until = null,
          updated_at = now()
      where id = 1;
    return json_build_object('ok', true, 'token', v_token);
  end if;

  -- Wrong PIN: count the attempt, lock out after 5 within the window.
  update recipient set failed_attempts = failed_attempts + 1 where id = 1
    returning failed_attempts into v_attempts;
  if v_attempts >= 5 then
    update recipient set lockout_until = now() + interval '5 minutes',
                         failed_attempts = 0 where id = 1;
    return json_build_object('ok', false, 'reason', 'locked_out');
  end if;
  return json_build_object('ok', false, 'reason', 'wrong');
end;
$$;

create or replace function app_get_selection(p_token text) returns json
  language plpgsql security definer set search_path = public, extensions stable as $$
begin
  if not _valid_token(p_token) then
    return json_build_object('ok', false, 'reason', 'invalid_token', 'giftIds', array[]::text[]);
  end if;
  return json_build_object('ok', true, 'giftIds', _current_ids());
end;
$$;

create or replace function app_check_selection(p_token text, p_gift_ids text[]) returns json
  language plpgsql security definer set search_path = public, extensions stable as $$
declare v_norm text[];
begin
  if not _valid_token(p_token) then
    return json_build_object('ok', false, 'reason', 'invalid_token', 'giftIds', array[]::text[]);
  end if;
  if _is_locked() then
    return json_build_object('ok', false, 'reason', 'locked', 'giftIds', _current_ids());
  end if;
  v_norm := _normalize(p_gift_ids);
  if _total(v_norm) <= _budget() then
    return json_build_object('ok', true, 'giftIds', v_norm);
  end if;
  return json_build_object('ok', false, 'reason', 'exceeds', 'giftIds', _current_ids());
end;
$$;

create or replace function app_save_selection(p_token text, p_gift_ids text[]) returns json
  language plpgsql security definer set search_path = public, extensions as $$
declare v_norm text[]; v_total int;
begin
  if not _valid_token(p_token) then
    return json_build_object('ok', false, 'reason', 'invalid_token', 'giftIds', array[]::text[]);
  end if;
  if _is_locked() then
    return json_build_object('ok', false, 'reason', 'locked', 'giftIds', _current_ids());
  end if;

  v_norm := _normalize(p_gift_ids);
  v_total := _total(v_norm);
  if v_total > _budget() then
    return json_build_object('ok', false, 'reason', 'exceeds', 'giftIds', _current_ids());
  end if;

  delete from selection_items where gift_id is not null; -- WHERE required (pg_safeupdate)
  insert into selection_items(gift_id) select unnest(v_norm);
  insert into selection_events(event_type, snapshot, internal_total)
    values ('save', to_jsonb(v_norm), v_total);
  update recipient set updated_at = now() where id = 1;

  return json_build_object('ok', true, 'giftIds', v_norm);
end;
$$;

create or replace function admin_get_state(p_password text) returns json
  language plpgsql security definer set search_path = public, extensions stable as $$
declare v_hash text; v_cur text[]; v_hist json;
begin
  select value into v_hash from app_config where key = 'admin_password_hash';
  -- Guard first so crypt() is never called with an empty/absent hash.
  if v_hash is null or v_hash = '' or p_password is null then
    return json_build_object('ok', false, 'reason', 'wrong_password');
  end if;
  if v_hash <> crypt(p_password, v_hash) then
    return json_build_object('ok', false, 'reason', 'wrong_password');
  end if;

  v_cur := _current_ids();
  select coalesce(
    json_agg(json_build_object(
      'createdAt', created_at,
      'eventType', event_type,
      'giftIds', snapshot,
      'internalTotal', internal_total
    ) order by created_at desc), '[]'::json)
  into v_hist from selection_events;

  return json_build_object(
    'ok', true,
    'recipientName', (select name from recipient where id = 1),
    'currentGiftIds', to_jsonb(v_cur),
    'internalTotal', _total(v_cur),
    'locked', _is_locked(),
    'history', v_hist
  );
end;
$$;

-- Expose only the intended RPCs to the client.
grant execute on function
  app_has_pin(),
  app_status(),
  app_create_pin(text),
  app_verify_pin(text),
  app_get_selection(text),
  app_check_selection(text, text[]),
  app_save_selection(text, text[]),
  admin_get_state(text)
to anon, authenticated;

-- ---------------------------------------------------------------------------
--  Seed data — EDIT prices/titles here before deploying. Prices stay in the DB.
-- ---------------------------------------------------------------------------
insert into recipient (id, name) values (1, 'maaike')
  on conflict (id) do update set name = excluded.name;

insert into app_config (key, value) values
  ('budget', '250'),
  ('selection_deadline', '2026-10-25'),
  -- Placeholder — set a real one (see README): the value must be a bcrypt hash.
  ('admin_password_hash', '')
on conflict (key) do nothing;

insert into gifts (id, title, description, category, image_path, is_exclusive, sort_order, internal_price) values
  ('pandora',          'A Little Sparkle',                 'Something beautiful to keep, wear, and remember this chapter by.',                'keep',       'images/gifts/pandora.jpg',          false, 10,  60),
  ('jewelry',          'Something Precious',               'A little piece chosen especially for you.',                                      'keep',       'images/gifts/jewelry.jpg',          false, 20,  60),
  ('dress',            'The Perfect Dress',                'Because sometimes a new chapter deserves a new look.',                            'keep',       'images/gifts/dress.jpg',            false, 30,  80),
  ('keyboard',         'Your Dream Setup',                 'Something beautiful for your desk, your creativity, and everything that comes next.', 'use',    'images/gifts/keyboard.jpg',         false, 40,  60),
  ('tablet',           'The Little Magic Screen',          'For studying, creating, travelling, watching, and everything in between.',        'use',        'images/gifts/tablet.jpg',           true,  50, 250),
  ('apple_watch',      'A Little Something for Every Day', 'A little companion for wherever the next chapter takes you.',                     'use',        'images/gifts/apple_watch.jpg',      true,  60, 250),
  ('shopping',         'A Day of Shopping',                'You choose what you want. No overthinking. Just have fun.',                       'experience', 'images/gifts/shopping.jpg',         false, 70, 100),
  ('primark',          'A Little Treat',                   'A little voucher for bits and bobs and small finds that make you smile.',         'experience', 'images/gifts/primark.jpg',          false, 75,  40),
  ('germany_getaway',  'The Enchanted Escape',             'Two nights somewhere beautiful. Just the two of us.',                             'go',         'images/gifts/germany_getaway.jpg',  false, 80, 200),
  ('european_getaway', 'A Little Adventure',               'A little trip outside Germany. Somewhere new, somewhere beautiful.',              'go',         'images/gifts/european_getaway.jpg', true,  90, 250)
on conflict (id) do update set
  title = excluded.title, description = excluded.description, category = excluded.category,
  image_path = excluded.image_path, is_exclusive = excluded.is_exclusive,
  sort_order = excluded.sort_order, internal_price = excluded.internal_price;
