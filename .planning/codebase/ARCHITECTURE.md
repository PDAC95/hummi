# Architecture

**Analysis Date:** 2026-05-14

## Pattern Overview

**Overall:** Modular SPA with layout-driven pages and composable sections, following the FreshFlow template convention.

**Key Characteristics:**
- Single-page application (SPA) using React Router 7 with client-side routing
- Context API for lightweight UI state management (no Redux/Zustand)
- Supabase as headless backend (database, auth, edge functions)
- CSS-driven layouts with pre-compiled Bootstrap grid + custom styles
- No data fetching logic currently in frontend (ready for integration)

## Layers

**Routing & Shell:**
- Purpose: Entry point, route configuration, global layout wrapper
- Location: `src/main.tsx`, `src/App.tsx`, `src/components/router/FreshFlowRouter.tsx`
- Contains: Root provider setup, route definitions, cross-cutting UI (cursor, sidebar, mobile nav)
- Depends on: React Router, Context API, all page components
- Used by: Browser DOM

**Context (State Management):**
- Purpose: Centralized UI state (loading, mobile menu, search, sidebar, scroll sections)
- Location: `src/components/context/FreshFlowContext.tsx`, `src/components/context/ContextProvider.tsx`
- Contains: Context definition with typed state + setters, provider wrapper, scroll-to-section utility
- Depends on: React hooks (useState, createContext)
- Used by: All pages and components that need UI state

**Pages:**
- Purpose: Route handlers that assemble sections into complete page views
- Location: `src/pages/*/` (one folder per route, one component per page)
- Contains: Page layout wrapper (`<div className='page-wrapper'>`), section imports, sticky navigation
- Depends on: Sections (visual blocks), common components (nav, footer), context indirectly via sections
- Used by: Router

**Sections:**
- Purpose: Reusable visual blocks/modules that pages compose together
- Location: `src/sections/*/` (organized by page/feature type)
- Contains: Feature-specific components, internal state (animations, counters), DOM markup with inline styles
- Depends on: Assets (images, CSS), common components, lucide-react icons, external libraries (Swiper, react-countdown)
- Used by: Pages, sometimes by other sections

**Common Components:**
- Purpose: Cross-cutting UI elements used across pages (navigation, mobile menu, search, scroll-to-top)
- Location: `src/components/common/`, `src/components/sidebar/`, `src/components/preloader/`, `src/components/stricky-nav/`
- Contains: Navigation, mobile menu, chat widget, loading overlay, progress bars, utility components
- Depends on: Context API (for mobile menu state), router (NavLink), image assets
- Used by: App layout, pages

**External Integrations:**
- Purpose: Supabase client initialization and configuration
- Location: `src/lib/supabase.ts`
- Contains: Single Supabase client instance, environment variable validation
- Depends on: `@supabase/supabase-js`, environment variables
- Used by: Any component/page that needs to fetch data or authenticate

**Assets:**
- Purpose: Static resources (images, fonts, CSS stylesheets)
- Location: `src/assets/css/`, `src/assets/images/`, `src/assets/fonts/`
- Contains: Bootstrap grid, custom animations, module-specific CSS, image files, icon fonts (FontAwesome, icomoon)
- Imported by: Main CSS bundle, section components
- Compiled: All CSS bundled into single stylesheet at build time

## Data Flow

**User Navigation:**

1. User clicks a link (NavLink in navigation component or mobile menu)
2. React Router matches path against `FreshFlowRouter` config
3. Router renders matched page component from `src/pages/`
4. Page component renders sections and common elements
5. Sections render JSX with image imports and inline event handlers
6. Styles applied from `src/assets/css/` (module-specific CSS classes)

**State Management (UI-only):**

1. Component needs UI state (e.g., mobile menu toggle)
2. Component imports `FreshFlowContext` and calls `useContext(FreshFlowContext)`
3. Component reads state (e.g., `isMobileOpen`) and setter from context
4. State updates propagate to all subscribers
5. No persistence layer (context resets on page refresh)

**Backend Integration (Ready but Not Yet Used):**

1. Component imports `supabase` client from `src/lib/supabase.ts`
2. Component calls `supabase.from('table').select()` or auth methods
3. Data returned, component stores in local state if needed
4. No global data caching layer exists yet

**Route Change Flow:**

1. User clicks internal link or navigates
2. `App.tsx` detects path change via `useLocation()` hook
3. Sets `loading = true`, renders preloader (only on home pages)
4. Page timeout (500ms) resets loading to false
5. Page content renders
6. Custom cursor position updates on mousemove

**Scroll-to-Section:**

1. `scrollToSection(id)` called from context consumer
2. Finds DOM element by ID
3. Calls `element.scrollIntoView({ behavior: "smooth" })`

## Key Abstractions

**FreshFlowContext:**
- Purpose: Central UI state container
- Examples: `src/components/context/FreshFlowContext.tsx` (type definition), `src/components/context/ContextProvider.tsx` (provider)
- Pattern: React Context with typed value, provider wrapper exposing state + setters + utility functions

**Page Assembly Pattern:**
- Purpose: Compose visual sections into page views without repeating layout boilerplate
- Examples: `src/pages/home-1/HomeOne.tsx`, `src/pages/about/About.tsx`, `src/pages/contact/Contact.tsx`
- Pattern: Page component returns `<div className='page-wrapper'>` with imported sections in order

**Section Component:**
- Purpose: Self-contained, styled visual block
- Examples: `src/sections/home-1/Banner.tsx`, `src/sections/about/AboutMain.tsx`, `src/sections/contact/ContactMain.tsx`
- Pattern: Functional component with internal state (animations, counters), returns JSX with Bootstrap grid layout and inline image styles

**Supabase Client Singleton:**
- Purpose: Single reusable database/auth client
- Location: `src/lib/supabase.ts`
- Pattern: Initialized at module load, exported for import anywhere

## Entry Points

**`index.html`:**
- Location: `index.html` (project root)
- Triggers: Browser loads page
- Responsibilities: Define HTML shell (`<div id="root"></div>`), load main.tsx as module

**`src/main.tsx`:**
- Location: `src/main.tsx`
- Triggers: Vite bundles and runs this file first
- Responsibilities: Create React root, render `<StrictMode>` + `<ContextProvider>` + `<RouterProvider>` tree

**`src/App.tsx`:**
- Location: `src/App.tsx`
- Triggers: Router matches "/" (all routes inherit App as parent)
- Responsibilities: Global layout (custom cursor, preloader, mobile nav, sidebar, scroll-to-top), read route location, manage page transitions

**`src/components/router/FreshFlowRouter.tsx`:**
- Location: `src/components/router/FreshFlowRouter.tsx`
- Triggers: App component renders RouterProvider
- Responsibilities: Define all 40+ routes, map paths to page components, set error boundary

## Error Handling

**Strategy:** Boundary error page + console logging. Limited error recovery.

**Patterns:**
- Router-level: `<Error />` component renders for unmatched routes (404 page)
- Context safety: App checks if context is null, throws error if ContextProvider missing
- Component safety: MobileNav checks context on mount, throws error if null
- Supabase: Environment variable validation on module load (throws if missing)
- No try-catch blocks in sections/components (errors bubble up)

## Cross-Cutting Concerns

**Logging:** console (no structured logger configured). Error messages logged to browser console during development.

**Validation:** 
- TypeScript strict mode catches most type errors at build time
- Supabase env vars validated at app startup
- No runtime validation of user input

**Authentication:**
- Supabase client available for auth integration (`src/lib/supabase.ts`)
- No auth flows currently implemented in UI
- SignUp and LogIn pages exist as templates but no integration

**Styling:**
- Global CSS: `src/assets/css/style.css` (main stylesheet, ~50KB pre-built)
- Module CSS: `src/assets/css/module-css/*.css` (per-feature stylesheets)
- Inline styles: React components use `style={{}}` prop for dynamic positioning (cursor, animations)
- CSS classes: BEM-like naming (`.banner-one__title`, `.section-one__left`)
- Responsive: Bootstrap 5 grid system (col-xl-6, col-lg-3, etc.)

**Animation:**
- CSS transitions in stylesheets (fade, slide, float animations)
- JavaScript effects in components (typing effect in Banner, counter animations)
- Swiper library for carousels
- react-countdown for Coming Soon page timer

**Performance:**
- No lazy loading (all sections imported eagerly)
- CSS imported at build time (no dynamic imports)
- Images imported as ES modules (bundled)
- No code splitting by route (single bundle)

---

*Architecture analysis: 2026-05-14*
