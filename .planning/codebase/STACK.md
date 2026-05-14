# Technology Stack

**Analysis Date:** 2026-05-14

## Languages

**Primary:**
- TypeScript 5.9 - Full codebase (React components, utilities, type definitions)
- JavaScript (JSX/TSX) - React component markup via TypeScript

**Secondary:**
- CSS - Styling (Bootstrap 5, custom module CSS, Swiper, animations)
- HTML - Template markup

## Runtime

**Environment:**
- Node.js 20 (specified in CI workflow)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- React 19.1.1 - UI framework for cleaning services platform
- react-dom 19.1.1 - DOM rendering layer
- react-router 7.9.3 - Client-side routing (createBrowserRouter)
- react-router-dom 7.9.3 - DOM components for routing

**UI & Animation:**
- Swiper 12.0.2 - Image carousels and sliders
- lucide-react 0.545.0 - Icon library
- yet-another-react-lightbox 3.25.0 - Modal image gallery
- sweetalert2 11.23.0 - Alert/modal dialogs
- react-fast-marquee 1.6.5 - Scrolling text animations
- @ramonak/react-progress-bar 5.4.0 - Progress bar component

**Utilities:**
- react-countdown 2.3.6 - Countdown timer component
- react-countup 6.5.3 - Number animation (counters, stats)
- react-intersection-observer 9.16.0 - Lazy loading/visibility detection
- react-icons 5.5.0 - Icon collections

**Testing:**
- None configured (no test framework in package.json)

**Build/Dev:**
- Vite 7.1.7 - Build tool and dev server
- @vitejs/plugin-react 5.0.4 - Fast refresh for React components

## Key Dependencies

**Critical:**
- @supabase/supabase-js 2.105.4 - PostgreSQL database + auth (frontend client for database queries and real-time subscriptions)

**Infrastructure:**
- Stripe integration ready (VITE_STRIPE_PUBLISHABLE_KEY env var configured, but stripe package not yet installed)

## Configuration

**Environment:**
- `.env.example` template exists defining required vars
- Uses Vite's `import.meta.env.*` pattern for env access
- Supabase client requires: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`
- Stripe requires: `VITE_STRIPE_PUBLISHABLE_KEY` (frontend-only)
- Stripe secret key stored separately in Vercel/Supabase Edge Functions (not in browser)
- Only vars prefixed with `VITE_` are exposed to browser

**Build:**
- `vite.config.ts` - Minimal config with React plugin
- `tsconfig.app.json` - Target ES2022, strict mode enabled
- `tsconfig.node.json` - For build tooling (ES2023)
- ESLint config: `eslint.config.js` with recommended + React rules

## Linting & Formatting

**Linting:**
- ESLint 9.36.0
- typescript-eslint 8.45.0 (TypeScript support)
- eslint-plugin-react-hooks 5.2.0 (Hook linting)
- eslint-plugin-react-refresh 0.4.22 (Vite-specific)
- Globals 16.4.0 (Browser globals)
- Config: `eslint.config.js` uses flat config format

**Formatting:**
- Not detected (no .prettierrc, no prettier dependency)

## TypeScript Configuration

**Compiler Options:**
- `target: ES2022` (app), `ES2023` (build tools)
- `jsx: react-jsx` - New JSX transform
- `strict: true` - Full type checking
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `moduleResolution: bundler`
- Module system: `ESNext`
- Allow importing TS extensions (no `.js` required in imports)

## CI/CD Pipeline

**GitHub Actions:** `.github/workflows/ci.yml`
- Triggers: Push to main branch, pull requests to main
- Runs on: `ubuntu-latest` with Node 20
- Steps:
  1. Checkout code
  2. Setup Node with npm caching
  3. `npm ci` (clean install)
  4. `npm run lint` (ESLint validation)
  5. `npm run build` (Vite build with placeholder env vars for CI)
  
**Build Script:** `npm run build` = `tsc -b && vite build`
- Type-checks with TypeScript before bundling
- Outputs to `dist/` directory

## Development Scripts

```bash
npm run dev      # Start Vite dev server (HMR enabled)
npm run build    # Type-check + Vite build (production)
npm run lint     # ESLint validation
npm run preview  # Preview production build locally
```

## Deployment Target

**Platform:** Vercel (GitHub integration via PDAC95/hummi repo)
- Frontend SPA deployed to Vercel CDN
- No backend Next.js API routes (pure SPA)
- Vite build outputs static files to `dist/`
- Environment variables configured in Vercel dashboard

## Browser Support

- ES2022+ (targets modern browsers only)
- DOM.Iterable support included

---

*Stack analysis: 2026-05-14*
