# maaike's Magical Gift Website

## Product, UX/UI and Technical Specification

### Project Name

**A Gift for maaike ✨**

A premium, romantic, magical gift-selection website created as a graduation and birthday surprise for **maaike**.

---

# 1. Project Overview

Create a private, premium, magical-themed website that allows maaike to choose her gift for her graduation and upcoming birthday.

### Important dates

* **Graduation:** 15 October 2026
* **Website gifted to maaike:** 15 October 2026
* **Birthday:** 9 November 2026
* **Gift selection deadline:** 25 October 2026

The website should feel like a **personal digital fairytale**, combining:

* Disney-inspired fantasy atmosphere
* Luxury fashion/e-commerce aesthetics
* Romantic and cute visual design
* Premium animations
* Elegant typography
* Soft magical effects
* High-quality imagery
* Smooth transitions

Do NOT make the website childish or overly cartoonish.

The desired feeling is:

> **"A beautiful magical experience created especially for her."**

---

# 2. Core Concept

maaike receives a private URL from me on her graduation day.

She opens the website and is greeted by a personalized experience.

The website should NOT reveal the monetary budget.

Internally, there is a maximum gift budget of **€250**, but maaike should never see:

* €250
* Individual gift prices
* Remaining budget
* "Budget remaining"
* Any indication that gifts have monetary values

Instead, she simply explores beautiful gift cards and chooses what she wants.

The system handles the budget internally.

---

# 3. Emotional Experience

The website should communicate:

> "You worked hard. You graduated. Your birthday is coming. Now you get to choose something that makes you happy."

The experience should feel thoughtful rather than transactional.

The user should feel like she is entering a magical gift room created specifically for her.

---

# 4. Visual Direction

## Overall Style

Premium romantic fantasy.

### Primary aesthetic

* White / ivory background
* Champagne / soft gold accents
* Very subtle blush pink
* Soft beige
* Elegant shadows
* Glassmorphism where appropriate
* Fine borders
* Soft glowing elements
* Subtle stars
* Floating particles
* Light bokeh
* Soft gradients

### Typography

Use an elegant serif font for major headings.

Possible combinations:

**Playfair Display + Inter**

or

**Cormorant Garamond + Inter**

Headings should feel romantic and luxurious.

Body text should remain highly readable.

---

# 5. Design Principles

The website should be:

* Premium
* Romantic
* Feminine
* Cute
* Elegant
* Minimal
* Magical
* Smooth
* Responsive
* Mobile-first

Avoid:

* Bright saturated colors
* Cartoon graphics
* Excessive hearts
* Cheap-looking gradients
* Generic stock-photo website appearance
* Excessive animations
* Clutter
* Visible prices

Think:

**Luxury boutique + fairytale + romantic surprise.**

---

# 6. Landing Page

When maaike opens the URL, display a beautiful cinematic opening.

### Screen

Large white/ivory background.

Very subtle floating particles.

A small magical glow appears.

Then:

> **For maaike ✨**

After a short animation:

> **A little something for the girl who just graduated.**

Then:

> **And for the birthday that is coming very soon...**

Then:

### Main heading

> **Your Gift Awaits**

Subheading:

> *You have worked hard, dreamed big, and reached another beautiful milestone.*

CTA:

### `Begin Your Journey ✨`

The button should have a subtle glowing hover animation.

---

# 7. Personal Message

After clicking "Begin Your Journey", transition into a personal message.

Display:

> **Dear maaike,**
>
> Congratulations on your graduation. ❤️
>
> You have reached a beautiful new chapter, and I wanted to give you something a little different this time.
>
> Instead of choosing your gift for you...
>
> **I want you to choose it yourself.**
>
> So take your time.
>
> Explore.
>
> Dream a little.
>
> And choose whatever makes you happiest. ✨

CTA:

### `Show Me My Gifts`

The actual final wording can be easily edited through a configuration file.

---

# 8. Gift Selection Page

This is the main page.

Heading:

> **Choose Your Magic ✨**

Subheading:

> *There is something here for every kind of adventure.*

Display gift options as large premium cards.

Cards should have:

* Large beautiful image
* Gift title
* Short emotional description
* Category
* Select button
* Selected state
* Beautiful hover animation

Do NOT display prices.

---

# 9. Gift Categories

## Category 1: Something You Can Keep 💎

### Pandora

Title:

> **A Little Sparkle**

Description:

> *Something beautiful to keep, wear, and remember this chapter by.*

Internal value:

**€60**

---

### Jewelry

Title:

> **Something Precious**

Description:

> *A little piece chosen especially for you.*

Internal value:

**€60**

The exact jewelry can be decided later.

---

### Dress

Title:

> **The Perfect Dress**

Description:

> *Because sometimes a new chapter deserves a new look.*

Internal value:

**€80**

---

# 10. Category 2: Something You Can Use ✨

## Keyboard

Title:

> **Your Dream Setup**

Description:

> *Something beautiful for your desk, your creativity, and everything that comes next.*

Internal value:

**€50**

---

## Tablet

Title:

> **The Little Magic Screen**

Description:

> *For studying, creating, travelling, watching, and everything in between.*

Internal value:

**€250**

Because this consumes the entire internal budget, it becomes an exclusive single-choice gift.

---

## Apple Watch

Title:

> **A Little Something for Every Day**

Description:

> *A little companion for wherever the next chapter takes you.*

Internal value:

**€250**

Also an exclusive single-choice gift.

---

# 11. Category 3: Something You Can Experience 👗

## Shopping Spree

Title:

> **A Day of Shopping**

Description:

> *You choose what you want. No overthinking. Just have fun.*

Internal value:

**€100**

---

# 12. Category 4: Somewhere We Can Go ✈️

## Germany Getaway

Title:

> **The Enchanted Escape**

Description:

> *Two nights somewhere beautiful. Just the two of us.*

Internal value:

**€200**

Includes:

* Two-night hotel stay
* Trip planning/booking
* Romantic dinner

---

## European Getaway

Title:

> **A Little Adventure**

Description:

> *A little trip outside Germany. Somewhere new, somewhere beautiful.*

Internal value:

**€250**

Includes:

* Accommodation
* Trip planning/booking
* Romantic dinner

This is an exclusive single-choice gift.

The destination should NOT necessarily be fixed on the website.

After selection, I can decide the actual destination and booking.

---

# 13. Dinner Included

Dinner should NEVER count toward the internal budget.

Every selected gift includes:

> **✨ One dinner together**

This should be revealed during the selection experience.

Possible copy:

> **And one thing comes with every gift...**
>
> **Dinner with me. ❤️**
>
> *That one was never up for negotiation.*

This should be a cute emotional moment.

---

# 14. Budget Logic

The website has an internal maximum budget of:

**€250**

This value must NEVER be shown to maaike.

The frontend should not display prices.

The backend/database stores the prices.

### Rules

maaike can select multiple smaller gifts as long as:

**sum(selected gift internal values) <= €250**

Examples:

* Keyboard €50 + Pandora €60 = €110
* Keyboard €50 + Pandora €60 + Dress €80 = €190
* Shopping €100 + Pandora €60 + Jewelry €60 = €220

She cannot exceed €250.

---

# 15. Full-Budget Gifts

The following gifts consume the entire budget:

* Tablet: €250
* Apple Watch: €250
* European Getaway: €250

If one of these is selected:

1. All other gifts become unavailable.
2. The UI should visually communicate that this is an "all-in" choice without mentioning money.
3. Previously selected smaller gifts should be removed after confirmation.
4. Display a beautiful confirmation:

> **This one is a whole adventure by itself. ✨**
>
> *Are you sure this is the one?*

Buttons:

**Yes, this is the one ❤️**

**Let me keep exploring**

---

# 16. Selection Behaviour

For smaller gifts:

* Clicking a card selects it.
* Selected cards receive an elegant glowing border.
* Add a small checkmark.
* Card slightly lifts/scales.
* A subtle sparkle animation can play.

For deselection:

* Clicking again removes it.
* Animate smoothly back to normal state.

At the bottom:

### CTA

> **These are my choices ✨**

Do not show the total value.

Do not show the remaining budget.

---

# 17. Selection Validation

If maaike attempts to select something that would exceed the hidden €250 limit, do NOT say:

> "You exceeded your budget."

Instead say something playful:

> **✨ That's a little too much magic for one adventure.**
>
> *Maybe choose one of these instead, or remove something from your current collection.*

The exact wording should be configurable.

---

# 18. Selection Summary

Before final submission, show a beautiful summary.

Heading:

> **Your Little Collection ✨**

Show selected items as elegant cards.

Example:

> 💎 A Little Sparkle
> 👗 The Perfect Dress
> ⌨️ Your Dream Setup

Then:

> **And, of course...**
>
> 🍽️ **Dinner with me.**
>
> *Always included.*

CTA:

### `This Is My Choice ❤️`

Secondary:

### `I Want To Change Something`

---

# 19. Confirmation Animation

After submitting:

The screen should transition into a beautiful magical animation.

Potential sequence:

1. Screen fades slightly.
2. Small glowing particles appear.
3. Selected gift cards float upward.
4. Sparkles appear.
5. A beautiful message fades in.

Message:

> **It's official. ✨**
>
> **Your gift has been chosen.**
>
> I'll take care of the rest.
>
> And I'll see you before your birthday. ❤️

Then:

> **Until then... keep being magical.**

Optional final animation:

**✨ ✨ ✨**

---

# 20. Login / Authentication

The website is private.

maaike should create a **4-digit PIN** when she first enters.

### First visit

Show:

> **Create your secret PIN 🔐**

> *You'll use this little secret to come back and change your gift later.*

PIN requirements:

* Exactly 4 digits
* Confirmation field
* Do not display the PIN after creation

---

# 21. Returning User

When she visits again:

> **Welcome back, maaike ✨**

> **Enter your secret PIN**

4-digit PIN input.

Use four individual input boxes with automatic focus movement.

Example:

`• • • •`

After successful authentication:

> **Welcome back ❤️**

She can see her current selection and change it.

---

# 22. Security

Do not store the PIN as plaintext.

Hash the PIN on the backend.

Recommended:

* bcrypt
* Argon2

Implement rate limiting for PIN attempts.

After multiple failed attempts, temporarily block further attempts.

Do not expose the internal gift prices through the frontend API.

The frontend should only receive:

* Gift ID
* Title
* Description
* Image
* Category
* Selection availability

Price values should remain server-side.

---

# 23. Selection Deadline

maaike can change her selection until:

**25 October 2026**

At the deadline:

**26 October 2026 onward**

The selection becomes locked.

If she visits after the deadline:

> **The magic has been sealed. ✨**
>
> Your choice has been saved and is now being prepared.

Do not allow modifications after the deadline.

The deadline should be configurable through environment/configuration.

---

# 24. Administrator Functionality

There should be a private administrator mechanism.

The administrator is the gift giver.

Whenever maaike:

* Creates her PIN
* Submits her selection
* Changes her selection

the administrator should receive the current selection.

Preferred method:

### Email notification

Example:

**Subject: maaike updated her gift selection ✨**

Email:

> maaike has updated her gift selection.
>
> Selected gifts:
>
> * Pandora
> * Keyboard
> * Dress
>
> Selection time:
> 18 October 2026, 14:32
>
> Selection status:
> Active
>
> You can view the latest selection in the admin dashboard.

Do not send confirmation emails to maaike.

---

# 25. Admin Dashboard

Create a simple private admin dashboard.

The admin should be able to see:

### maaike

Status:

**Active**

Current selection:

* Pandora
* Keyboard

Selection history:

| Date   | Action            | Selection          |
| ------ | ----------------- | ------------------ |
| 15 Oct | Initial selection | Pandora            |
| 18 Oct | Changed           | Pandora + Keyboard |
| 22 Oct | Changed           | Weekend getaway    |

Admin should be able to see the current selection instantly.

The admin dashboard can show the internal prices because maaike never has access to it.

---

# 26. Admin Dashboard Security

Protect the admin dashboard separately.

Do NOT use the same 4-digit PIN.

Use:

* Admin password
* Or secure authentication
* Or an admin-only secret URL plus authentication

Prefer proper authentication.

---

# 27. Database Model

Suggested database structure:

### users

```text
id
name
pin_hash
created_at
updated_at
selection_locked
```

### gifts

```text
id
title
description
category
image_url
internal_price
is_active
is_exclusive
created_at
```

### selections

```text
id
user_id
created_at
total_internal_value
is_final
```

### selection_items

```text
id
selection_id
gift_id
```

### selection_events

```text
id
user_id
event_type
selection_snapshot
created_at
```

The selection history should allow the administrator to see how maaike changed her choices.

---

# 28. Recommended Tech Stack

Use a modern production-quality stack.

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Animation

Use:

* Framer Motion
* CSS animations
* Optional GSAP for more advanced cinematic effects

Animations must remain smooth on mobile.

---

# 29. Image Strategy

Use high-quality images.

Do NOT use obviously generic stock photography.

Each gift should have a beautiful hero image.

For example:

### Pandora

Elegant close-up jewelry photography.

### Apple Watch

Premium minimal product-style image.

### Tablet

Clean luxury desk setup.

### Keyboard

Beautiful aesthetic workstation.

### Dress

Elegant feminine fashion photography.

### Getaway

Romantic European hotel/travel imagery.

The imagery should feel cohesive.

Use consistent image treatment:

* Rounded corners
* Soft shadows
* Slight overlay
* Elegant cropping
* Consistent aspect ratio

---

# 30. Gift Card Design

Each gift should look like a premium physical invitation/card.

Example structure:

```text
┌─────────────────────────────┐
│                             │
│       BEAUTIFUL IMAGE       │
│                             │
├─────────────────────────────┤
│                             │
│  A Little Sparkle           │
│                             │
│  Something beautiful to     │
│  remember this chapter by.  │
│                             │
│        Choose ✨             │
│                             │
└─────────────────────────────┘
```

On hover:

* Image gently zooms
* Card rises slightly
* Glow appears
* Button animates
* Tiny particles may appear

On selection:

* Elegant gold/champagne border
* Checkmark
* Subtle glow
* Small sparkle burst

---

# 31. Page Structure

Recommended website routes:

```text
/
    Landing page

/welcome
    Personal message

/gifts
    Gift selection

/review
    Review selection

/success
    Final confirmation

/login
    PIN login

/create-pin
    First-time PIN setup

/admin
    Admin dashboard
```

The user should never need to understand these URLs.

---

# 32. Navigation

Avoid a traditional website navigation bar.

This should feel like a guided experience.

Use:

* Back
* Continue
* Explore
* Choose
* Confirm

Minimal navigation.

---

# 33. Progress Indicator

Instead of:

`Step 1 / 4`

use something more magical.

For example:

**✦ Discover → Choose → Make It Yours ✦**

Subtle and elegant.

---

# 34. Mobile Experience

Mobile is extremely important.

maaike will most likely open the website on her phone.

Requirements:

* Fully responsive
* Touch-friendly cards
* Large buttons
* Smooth scrolling
* No horizontal overflow
* Fast loading
* Optimized images
* Mobile-friendly PIN input
* Animations should not cause performance problems

Desktop should also look excellent.

---

# 35. Accessibility

Include:

* Keyboard navigation
* Proper contrast
* Accessible buttons
* Alt text
* Reduced-motion support

If the user has enabled `prefers-reduced-motion`, significantly reduce animations.

---

# 36. Performance

The site should feel extremely fast.

Requirements:

* Optimize all images
* Lazy-load images where appropriate
* Avoid unnecessarily large libraries
* Use Next.js image optimization
* Minimize JavaScript where possible
* Avoid animation jank
* Target excellent Lighthouse scores

The magical effects should never make the website feel slow.

---

# 37. Secret URL

The website will eventually use a custom domain.

The domain will be configured later.

For now, build the application so it can run on a normal deployment URL.

The final URL will be private and shared only with maaike.

Do not implement public SEO.

Add:

```text
noindex
nofollow
```

Prevent search engine indexing.

Do not expose maaike's name in page metadata unnecessarily.

---

# 38. Configuration

Keep all important settings in configuration/environment variables.

Example:

```text
GIFT_BUDGET=250

SELECTION_DEADLINE=2026-10-25

ADMIN_EMAIL=...

SITE_RECIPIENT_NAME=maaike
```

Gift prices should be configurable.

Gift descriptions should be configurable.

Gift images should be configurable.

Personal messages should be configurable.

This allows the gift list to be changed without rewriting application logic.

---

# 39. Initial Gift Configuration

Start with:

```text
Pandora
€60

Jewelry
€60

Dress
€80

Keyboard
€50

Shopping Spree
€100

Tablet
€250

Apple Watch
€250

Germany Getaway
€200

European Getaway
€250
```

All prices are internal only.

Dinner:

```text
€0
```

Dinner is always included and should never affect selection calculations.

These values should be easy to change before deployment.

---

# 40. Important Business Logic

Implement the following algorithm:

```text
budget = 250

selected gifts = []

when selecting gift:

    if gift.price == 250:
        clear all existing selections
        select gift

    else:
        calculate new total

        if new total <= 250:
            select gift

        else:
            prevent selection
            show magical "too much magic" message
```

If a €250 gift is already selected and maaike selects another gift:

```text
remove the €250 gift
select the new gift
```

Alternatively, ask for confirmation before replacing it.

Recommended:

> **This choice changes your whole gift adventure. ✨**
>
> *Do you want to replace your current selection?*

---

# 41. No Visible Pricing

This is extremely important.

Never show:

* €250
* €200
* €60
* "remaining"
* "budget"
* "spent"
* "cost"
* "price"

The website should feel like maaike is choosing freely.

The budget mechanism is entirely behind the scenes.

---

# 42. Final Emotional Detail

The website should repeatedly reinforce that the gift is personal.

Possible microcopy:

### On gift selection

> *Choose what makes your heart happy.*

### On a selected gift

> *A beautiful choice. ✨*

### On multiple selections

> *Your little collection is coming together.*

### Before confirmation

> *Ready to make it official?*

### After confirmation

> *Perfect. I'll take care of the rest. ❤️*

---

# 43. Easter Eggs

Optional but highly recommended.

Add subtle surprises throughout the website.

For example:

### Clicking a star

A tiny message appears:

> *Psst... you're very cute.*

Another:

> *I hope you're smiling right now.*

Another:

> *Yes, I really made a whole website for you.*

These should be rare and subtle.

Do not overdo them.

---

# 44. Music

Music should NOT autoplay.

Optionally include a small music button.

If enabled, maaike can start a soft instrumental/fairytale background track.

Default:

**Music OFF**

because browser autoplay restrictions and unexpected audio can be annoying.

---

# 45. Final Screen

After confirmation:

Large heading:

> **For maaike, with love. ❤️**

Then:

> **Your gift is officially chosen.**

Then:

> *I'll take care of everything else.*

Then:

> **Graduation: 15 October 2026 🎓**

> **Birthday: 9 November 2026 🎂**

And:

> **Until then... ✨**

Final small line:

> *Keep being you.*

---

# 46. Development Requirements

Build this as a real working application, not a static mockup.

The implementation must include:

* Working PIN authentication
* Persistent selections
* Selection editing
* Hidden budget calculation
* Exclusive €250 gifts
* Selection deadline
* Selection history
* Admin dashboard
* Admin notifications
* Responsive UI
* Error handling
* Loading states
* Empty states
* Secure backend validation

All budget validation must happen server-side.

Do not rely only on frontend validation.

---

# 47. Security Requirements

Implement:

* Secure PIN hashing
* Rate limiting
* Server-side authorization
* Secure cookies/session handling
* Admin authentication
* Server-side budget validation
* Server-side deadline validation
* No internal prices in public API responses
* No sensitive information in client-side source
* No indexing by search engines

---

# 48. Deployment

The application should be deployment-ready.

Recommended:

**Vercel + Supabase**

Possible architecture:

```text
maaike
   ↓
Private Domain
   ↓
Next.js Application
   ↓
Authentication / API
   ↓
Supabase Database
   ↓
Admin Dashboard
   ↓
Email Notification
```

The architecture should allow the domain to be connected later.

---

# 49. Admin Notification

Whenever maaike changes her selection, send the administrator an email containing:

```text
maaike updated her gift selection ✨

Current selection:
- Gift 1
- Gift 2
- Gift 3

Internal total:
€XXX

Selection timestamp:
YYYY-MM-DD HH:MM

Selection deadline:
25 October 2026
```

The internal total can be shown to the administrator.

Do NOT send this information to maaike.

---

# 50. Testing Requirements

Before considering the website complete, test:

### Authentication

* First-time PIN creation
* Incorrect PIN
* Correct PIN
* Multiple incorrect attempts
* Returning login

### Gift selection

* One small gift
* Multiple small gifts
* Exactly €250
* Attempting to exceed €250
* Selecting a €250 gift
* Replacing a €250 gift
* Removing selections

### Deadline

* Before 25 October
* On 25 October
* After 25 October

### Persistence

* Refresh browser
* Close browser
* Return later
* Login from another device

### Admin

* Current selection
* Selection history
* Email notification
* Multiple selection changes

### Responsive

Test:

* iPhone
* Android
* Desktop
* Tablet

---

# 51. Definition of Done

The project is complete when:

1. maaike can open the private website.
2. She sees a beautiful personalized welcome experience.
3. She can create a 4-digit PIN.
4. She can explore all gifts.
5. She cannot see prices or the €250 budget.
6. She can select multiple gifts within the hidden limit.
7. €250 gifts behave as exclusive choices.
8. Dinner is automatically included.
9. She can return later using her PIN.
10. She can modify her selection until 25 October 2026.
11. Her selection becomes locked afterward.
12. The administrator receives every selection update.
13. The administrator can see selection history.
14. The website works beautifully on mobile.
15. Animations are smooth and premium.
16. The website feels romantic, magical and personal.
17. The website does not feel like a generic e-commerce store.

---

# 52. Most Important Design Instruction

Do not build this like a normal gift-shopping website.

The primary objective is **emotion**.

When maaike opens this website, the reaction should ideally be:

> **"Oh my God, he made this for me." ❤️**

The website should feel like a small digital love letter that happens to let her choose her own gift.

Every design decision should support that feeling.

---

# 53. Implementation Priority

If development time is limited, prioritize in this order:

### Priority 1

Beautiful visual design and overall emotional experience.

### Priority 2

Gift selection and hidden budget logic.

### Priority 3

PIN authentication and persistence.

### Priority 4

Admin dashboard and notifications.

### Priority 5

Advanced animations and Easter eggs.

### Priority 6

Extra polish and performance optimization.

---

# 54. Final Instruction to claude Code

Build the complete website according to this specification.

Do not simplify the design into a basic dashboard or generic card grid.

Start by implementing the visual design system and core user journey.

The final result should look like a **premium luxury fantasy experience**, with elegant white/ivory visuals, subtle gold accents, romantic typography, cinematic transitions, beautiful gift imagery, and polished micro-interactions.

The application should be fully functional, responsive, secure, and deployment-ready.

All gift prices and budget rules are internal.

**maaike should never see the €250 budget or individual gift prices.**

The final experience should feel personal, romantic, magical and memorable.

**The website is the gift before the gift. ❤️✨**
