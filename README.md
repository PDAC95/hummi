# Hummi 🐦

> Cleaning services platform for **Kitchener-Waterloo-Cambridge-Guelph (KWC) + Guelph**, Ontario.

**Quick. Quiet. Spotless.**

---

## What is Hummi?

Hummi is a digital-first cleaning services platform built for the KWC region in Ontario. Customers book and manage cleaning services online — one-time, subscription, or commercial contracts — with the easiest, most flexible scheduling experience in the area.

**Differentiators:**
- 📱 Mobile-first, book in under 2 minutes
- 🔄 Flexible subscriptions (pause, reschedule, cancel anytime)
- 🛡️ Happiness guarantee on every service
- ⚡ No phone calls, no contracts, no friction

## Project structure

```
Hummi/
├── .claude/                  # PLANNING.md + project instructions
├── src/
│   ├── App.tsx               # Root layout (cursor + preloader)
│   ├── main.tsx              # Entry point
│   ├── assets/               # CSS, fonts, images
│   ├── components/           # Shared components (router, context, layout)
│   ├── pages/                # Page assemblers (one folder = one route)
│   └── sections/             # Visual blocks composed into pages
├── public/                   # Static assets
└── index.html
```

## Stack

- **React 19** + **TypeScript 5.9**
- **Vite 7** (build/dev server)
- **react-router 7** (routing)
- **Swiper** (carousels), **lucide-react** (icons), **sweetalert2** (alerts)
- Backend (coming soon): **Supabase** (Postgres + Auth + Storage)
- Payments (coming soon): **Stripe** + Stripe Subscriptions
- Hosting (coming soon): **Vercel**

## Development

```bash
npm install          # install deps (first time)
npm run dev          # start dev server at http://localhost:5173
npm run build        # production build
npm run lint         # lint check
npm run preview      # preview production build locally
```

## Roadmap

See [`.claude/PLANNING.md`](.claude/PLANNING.md) for the full plan.

**MVP (6-8 weeks):** customer signup, booking, subscriptions, payments, admin orders/clients/finance dashboard.

**Phase 2:** marketplace with contractor profiles, mobile contractor dashboard, Stripe Connect.

**Phase 3:** live tracking, multi-language (FR/ES), route optimization, native app.

---

🏗️ **Project status:** ideation complete — starting MVP build.
