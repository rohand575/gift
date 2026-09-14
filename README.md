# A Gift for maaike ✨

A private, premium, magical gift-selection website — a graduation & birthday
surprise. maaike opens a private link, is welcomed with a small cinematic
experience, and chooses her own gift from beautiful cards **without ever seeing
prices or the €250 budget**. Dinner is always included. You (the gift-giver) see
her choice on a private admin page.

Built as a **static site** (Vite + React + TypeScript + Tailwind + Framer Motion)
hosted on **GitHub Pages**, with **Supabase** handling all the private logic
(prices, the budget, the PIN, the deadline lock) so none of it ever reaches the
browser.

---

## Quick start (local preview — no backend needed)

```bash
npm install
npm run dev
```

With no Supabase configured, the app runs in a **local demo mode** (data saved in
your browser) so you can walk the entire experience immediately. The demo admin
password is `demo`. Demo code is stripped from production builds.

To preview with real curated images (optional — there's an elegant fallback):

```bash
node scripts/fetch-images.mjs
```

---

## Going live

### 1. Create the Supabase backend
1. Make a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste all of [`supabase/schema.sql`](supabase/schema.sql), and **Run**. This creates the tables, the price-hiding logic, and seeds the gifts.
3. Set your **admin password** (run in the SQL editor, choose your own):
   ```sql
   update app_config
     set value = extensions.crypt('YOUR_ADMIN_PASSWORD', extensions.gen_salt('bf'))
     where key = 'admin_password_hash';
   ```
4. From **Project Settings → API**, copy the **Project URL** and the **anon public** key.

### 2. Configure the site
Copy `.env.example` to `.env.local` and fill in:
```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```
(The anon key is public by design — Row Level Security + the server-side functions
are what protect the data.)

### 3. Deploy to GitHub Pages
1. Push this repo to GitHub (the repo can be **public** — no secrets live in the code).
2. Repo **Settings → Secrets and variables → Actions** → add secrets
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. If your repo name is **not** `gift`, either rename it or set an Actions
   **variable** `VITE_BASE=/your-repo-name/`. (For a custom domain later, set
   `VITE_BASE=/`.)
4. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. Push to `main`. The included workflow builds and publishes automatically. The
   private link will be `https://<user>.github.io/<repo>/`.

Share only that link with maaike. The site is `noindex, nofollow` so it stays off search engines.

---

## How it works

| Concern | Where it lives |
| --- | --- |
| Gift **display** copy/images | `src/config/gifts.ts`, `src/config/site.ts` (no prices) |
| Gift **prices** & €250 budget | **Supabase only** — `supabase/schema.sql`, never sent to the browser |
| Budget / exclusive-gift / deadline rules | Supabase `security definer` RPC functions |
| PIN (hashed) & session | Supabase `recipient` table + `app_verify_pin` |
| Your notification | Private `/#/admin` page (password-gated) |

### The gifts & hidden values
Edit titles/copy in `src/config/gifts.ts`; edit **prices** in the seed block of
`supabase/schema.sql` (then re-run it). Current set:

| Gift | Internal € | Type |
| --- | --- | --- |
| Pandora — A Little Sparkle | 60 | small |
| Jewelry — Something Precious | 60 | small |
| Dress — The Perfect Dress | 80 | small |
| Keyboard — Your Dream Setup | 60 | small |
| Shopping — A Day of Shopping | 100 | small |
| Germany Getaway — The Enchanted Escape | 200 | small |
| Tablet / Apple Watch / European Getaway | 250 | exclusive (all-in) |

Dinner = €0, always included. She can combine small gifts up to €250, or pick one
"all-in" €250 gift. She never sees any of these numbers.

### Reset to a clean slate (run right before you share the link with maaike)
Clears any test PIN / selections without dropping anything:
```sql
update recipient set pin_hash = null, session_token = null, session_expires = null,
  failed_attempts = 0, lockout_until = null where id = 1;
delete from selection_items  where gift_id is not null;
delete from selection_events where event_type is not null;
```

### Changing the deadline
`update app_config set value = '2026-10-25' where key = 'selection_deadline';`
After the deadline the selection locks automatically (server-enforced).

---

## Things to personalise
- **Copy & names** — `src/config/site.ts` (landing lines, the personal letter, easter eggs).
- **Images** — swap any file in `public/images/gifts/` or edit URLs in `scripts/fetch-images.mjs` and re-run. Please glance at the downloaded images and replace any you don't love.
- **Music** — drop a soft instrumental at `public/audio/theme.mp3` to enable the (off-by-default) music button.
- **Admin password** — see step 1.3 above.
