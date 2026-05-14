# Codebase Structure

**Analysis Date:** 2026-05-14

## Directory Layout

```
hummi/
├── src/
│   ├── main.tsx                 # React root, app initialization
│   ├── App.tsx                  # Global layout wrapper, route shell
│   ├── declarations.d.ts        # TypeScript module declarations
│   ├── assets/                  # Static resources
│   │   ├── css/
│   │   │   ├── *.css           # Global stylesheets (Bootstrap, custom, animations)
│   │   │   └── module-css/     # Per-feature CSS files
│   │   ├── fonts/              # Font files (FontAwesome, icomoon)
│   │   └── images/             # Image assets (backgrounds, icons, resources, testimonials, etc.)
│   ├── components/             # Shared cross-cutting components
│   │   ├── router/             # Routing setup
│   │   │   └── FreshFlowRouter.tsx
│   │   ├── context/            # State management
│   │   │   ├── FreshFlowContext.tsx
│   │   │   └── ContextProvider.tsx
│   │   ├── common/             # Reusable UI (nav, menu, scroll-to-top, chat widget)
│   │   │   ├── MobileNav.tsx
│   │   │   ├── MobileNavSingle.tsx
│   │   │   ├── ChatProp.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   ├── VideoGalleryPopup.tsx
│   │   │   ├── FreshFlowMarquee.tsx
│   │   │   ├── BeforeAfterSlider.tsx
│   │   │   └── AdvanceCountUp.tsx
│   │   ├── sidebar/            # Side navigation panel
│   │   │   └── SideBar.tsx
│   │   ├── stricky-nav/        # Sticky navigation bars
│   │   │   ├── StickyNavTow.tsx
│   │   │   └── StrickyNavHomeone.tsx
│   │   ├── preloader/          # Loading screen
│   │   │   └── PreLoader.tsx
│   │   ├── progress-bar/       # Progress indicators
│   │   │   └── ProgressBars.tsx
│   │   └── accordion/          # Accordion components
│   │       ├── Accordion.tsx
│   │       ├── AccordionItem.tsx
│   │       └── AccorditionItemFaq.tsx
│   ├── lib/                    # External clients and utilities
│   │   └── supabase.ts         # Supabase client initialization
│   ├── pages/                  # Route page components (one folder per route)
│   │   ├── home-1/
│   │   │   └── HomeOne.tsx
│   │   ├── home-2/
│   │   │   └── HomeTow.tsx
│   │   ├── home-3/
│   │   │   └── HomeThree.tsx
│   │   ├── about/
│   │   │   └── About.tsx
│   │   ├── contact/
│   │   │   └── Contact.tsx
│   │   ├── services/
│   │   │   ├── Service.tsx
│   │   │   ├── ResidentialCleaning.tsx
│   │   │   ├── CommercialCleaning.tsx
│   │   │   ├── DeepCleaning.tsx
│   │   │   ├── OfficeCleaning.tsx
│   │   │   └── SanitizingMopping.tsx
│   │   ├── products/
│   │   │   ├── ProductLeft.tsx
│   │   │   ├── ProductRightSidebar.tsx
│   │   │   ├── NoSidebar.tsx
│   │   │   └── ProductDetails.tsx
│   │   ├── blog/
│   │   │   ├── Blog.tsx
│   │   │   ├── BlogCarousel.tsx
│   │   │   ├── BlogList.tsx
│   │   │   └── BlogDetails.tsx
│   │   ├── projects/
│   │   │   ├── Projects.tsx
│   │   │   ├── ProjectCarousel.tsx
│   │   │   └── ProjectDetails.tsx
│   │   ├── testimonials/ (or team/)
│   │   ├── pricing/
│   │   ├── gallery/
│   │   ├── faq/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── sign/
│   │   ├── comming/
│   │   ├── error/
│   │   ├── singlePage/
│   │   └── [other routes]/
│   └── sections/               # Visual blocks (composed into pages)
│       ├── home-1/             # Sections for Home 1 page
│       │   ├── Banner.tsx
│       │   ├── Header.tsx
│       │   ├── SearchProp.tsx
│       │   ├── AboutOne.tsx
│       │   ├── ServicesOne.tsx
│       │   ├── CounterOne.tsx
│       │   ├── BeforeAfter.tsx
│       │   ├── WhyChooseOne.tsx
│       │   ├── ProjectOne.tsx
│       │   ├── TeamOne.tsx
│       │   ├── ContactOne.tsx
│       │   ├── TestimonialsHomeOne.tsx
│       │   ├── BrandOne.tsx
│       │   ├── OfficeLocation.tsx
│       │   ├── PricingOne.tsx
│       │   ├── BlogOne.tsx
│       │   ├── SlidingTextOne.tsx
│       │   └── SlidingTestTow.tsx
│       ├── home-2/
│       ├── home-3/
│       ├── about/              # Sections for About page
│       │   ├── AboutMain.tsx
│       │   ├── SectionOne.tsx
│       │   ├── SectionTow.tsx
│       │   └── SectionThree.tsx
│       ├── services/
│       │   └── ServiceMain.tsx
│       ├── residential-cleaning/
│       ├── commercial-cleaning/
│       ├── deep-cleaning/
│       ├── office-cleaning/
│       ├── sanitizing-mopping/
│       ├── contact/
│       │   ├── ContactMain.tsx
│       │   ├── ContactForm.tsx
│       │   ├── ContactUs.tsx
│       │   └── OfficeLocation.tsx
│       ├── common/             # Shared sections (used across pages)
│       │   ├── BannerOne.tsx
│       │   ├── NewsLetterOne.tsx
│       │   └── NewsLeterTow.tsx
│       ├── footer/
│       │   ├── FooterOne.tsx
│       │   └── FooterTow.tsx
│       ├── blog/
│       ├── blog-details/
│       ├── blog-list/
│       ├── cart/
│       ├── checkout/
│       ├── gallery/
│       ├── faq/
│       ├── pricing/
│       ├── product-details/
│       ├── product-leftSidebar/
│       ├── product-rightSidebar/
│       ├── products-noSidebar/
│       ├── projects/
│       ├── team/
│       ├── testimonials/
│       └── singlePage/
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite build configuration
├── tsconfig.json               # TypeScript root config
├── tsconfig.app.json           # TypeScript app config
├── tsconfig.node.json          # TypeScript Node config
├── package.json                # Dependencies and scripts
├── .eslintrc.cjs               # ESLint configuration
└── .planning/                  # GSD planning documents (you are here)
    └── codebase/
        ├── ARCHITECTURE.md
        └── STRUCTURE.md
```

## Directory Purposes

**`src/`:**
- Purpose: All source code (React, TypeScript, assets)
- Contains: Components, pages, sections, styles, images, fonts
- Key files: `main.tsx`, `App.tsx`

**`src/main.tsx`:**
- Purpose: Application entry point
- Bootstraps React, wraps app in ContextProvider and RouterProvider
- Imports global CSS bundles (Swiper, custom styles)

**`src/App.tsx`:**
- Purpose: Shell component, parent to all routes
- Contains: Custom cursor DOM, route outlet, global navigation (mobile nav, sidebar, scroll-to-top)
- Used by: All routes as parent element

**`src/components/`:**
- Purpose: Shared, cross-cutting UI components
- Contains: Router setup, context (state), common UI (navigation, sidebar), preloader, progress bars, accordion
- Not feature-specific

**`src/components/router/FreshFlowRouter.tsx`:**
- Purpose: Route configuration
- Contains: `createBrowserRouter()` config with all ~40 routes
- Patterns: One route object per page component, error boundary set to `<Error />` component

**`src/components/context/`:**
- Purpose: Centralized UI state management
- FreshFlowContext.tsx: Type definition for context value
- ContextProvider.tsx: Provider component that manages state (loading, mobile menu, search, sidebar, active section)
- Used by: Any component reading UI state via `useContext(FreshFlowContext)`

**`src/components/common/`:**
- Purpose: Reusable navigation and utility UI
- MobileNav.tsx: Mobile menu with nested dropdowns
- ScrollToTop.tsx: "Back to top" button with scroll handler
- ChatProp.tsx: Chat widget
- Others: Sliders, video popups, marquee text, counters

**`src/lib/`:**
- Purpose: External service clients
- supabase.ts: Supabase client initialization with environment variable validation
- Exported for use in any component/page that needs database or auth

**`src/pages/`:**
- Purpose: Route page components
- Structure: One folder per route (e.g., `home-1/`, `about/`, `contact/`)
- Pattern: Single `.tsx` file per folder importing sections and common components
- Responsibilities: Assemble sections into page layout, no internal logic
- Example: `src/pages/about/About.tsx` imports BannerOne, AboutMain, NewsLeterTow, FooterTow, StickyNavTow

**`src/sections/`:**
- Purpose: Reusable visual blocks/modules
- Structure: One folder per feature/page type (organized to match pages)
- Pattern: Components with internal state (animations, counters), returns JSX with Bootstrap grid layout
- Responsibilities: Render UI, manage animations, handle event listeners
- Examples:
  - `src/sections/home-1/Banner.tsx`: Hero section with typing effect and counters
  - `src/sections/about/AboutMain.tsx`: Container that renders sub-sections (SectionOne, SectionTow, SectionThree)
  - `src/sections/contact/ContactForm.tsx`: Form with input handling

**`src/assets/css/`:**
- Purpose: All stylesheets
- Contents:
  - Vendor CSS: `bootstrap.min.css`, `animate.min.css`, `swiper.min.css`, `jquery-ui.css`, `owl.carousel.min.css`
  - Font CSS: `font-awesome-all.css`, `flaticon.css`
  - Custom CSS: `style.css` (main theme), `custom-animate.css`, `dark.css`
  - Responsive: `responsive.css`
  - Module CSS: `module-css/banner.css`, `module-css/services.css`, `module-css/footer.css`, etc. (per-feature)
- Imported by: `src/main.tsx` (global bundles) and component inline imports

**`src/assets/images/`:**
- Purpose: Image assets
- Contents:
  - `backgrounds/`: Hero backgrounds, page backgrounds
  - `resources/`: Logos, partner images, ratings
  - `blog/`: Blog post images
  - `gallery/`: Image galleries
  - `project/`: Project thumbnails
  - `services/`: Service icons/images
  - `team/`: Team member photos
  - `testimonials/`: Client testimonial images
  - `favicons/`: Browser icon

**`src/assets/fonts/`:**
- Purpose: Font files
- Contents: FontAwesome (solid, regular, brands), icomoon custom icon font, other web fonts

## Key File Locations

**Entry Points:**
- `index.html`: HTML shell, mounts React root
- `src/main.tsx`: Vite entry point, renders React tree
- `src/App.tsx`: Root page component (inherited by all routes)

**Configuration:**
- `vite.config.ts`: Build configuration (React plugin only, no path aliases)
- `tsconfig.json`: TypeScript root config
- `tsconfig.app.json`: App TypeScript settings (strict mode enabled)
- `.eslintrc.cjs`: ESLint rules
- `package.json`: Dependencies, build scripts

**Core Logic:**
- `src/components/router/FreshFlowRouter.tsx`: Route definitions
- `src/components/context/FreshFlowContext.tsx`: State type definition
- `src/components/context/ContextProvider.tsx`: State provider
- `src/lib/supabase.ts`: Database client

**Common Sections:**
- `src/sections/common/BannerOne.tsx`: Used on most pages
- `src/sections/common/NewsLetterOne.tsx`: Newsletter signup
- `src/sections/footer/FooterOne.tsx`, `FooterTow.tsx`: Footer variants
- `src/sections/home-1/Header.tsx`: Navigation header

## Naming Conventions

**Files:**
- PascalCase for component files: `Banner.tsx`, `AboutMain.tsx`, `FreshFlowRouter.tsx`
- lowercase for utility files: `supabase.ts`
- All TypeScript: `.ts` or `.tsx` (no `.js`)

**Directories:**
- kebab-case for multi-word paths: `home-1/`, `about/`, `mobile-nav/`
- Single lowercase for short names: `lib/`, `src/`
- Plural for collections: `components/`, `sections/`, `pages/`, `assets/`

**Components:**
- PascalCase class/function names: `HomeOne`, `AboutMain`, `MobileNav`
- Exported as default and named exports: `export default ServiceMain;`

**CSS Classes:**
- BEM-style: `.banner-one__title`, `.section-one__left`, `.home-showcase__item`
- Utilities: `.thm-btn` (theme button), `.list-unstyled`, `.container`, Bootstrap grid classes

**Context/Hooks:**
- Context: `FreshFlowContext` (uppercase, ContextAPI convention)
- Type: `FreshFlowContextType` (Suffix "Type")
- Provider: `ContextProvider` (Suffix "Provider")

## Where to Add New Code

**New Page (Route):**
1. Create folder in `src/pages/`: e.g., `src/pages/my-route/`
2. Create page component: `src/pages/my-route/MyRoute.tsx`
3. Assemble sections: Import sections and common components, wrap in `<div className='page-wrapper'>`
4. Add route to `src/components/router/FreshFlowRouter.tsx`

Example structure:
```typescript
import BannerOne from '../../sections/common/BannerOne';
import MyMainSection from '../../sections/my-route/MyMainSection';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';

const MyRoute: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerOne title="My Route" secondTitle="MY ROUTE" />
            <MyMainSection />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default MyRoute;
```

**New Section (Visual Block):**
1. Create folder in `src/sections/`: e.g., `src/sections/my-feature/`
2. Create section component: `src/sections/my-feature/MyFeatureSection.tsx`
3. Use Bootstrap grid classes (col-xl-6, col-lg-3, etc.) for layout
4. Import images as ES modules: `import myImg from '../../assets/images/...png'`
5. Use inline `style={{}}` for dynamic positioning
6. Return JSX with semantic HTML and BEM CSS classes

Example structure:
```typescript
import React from 'react';
import myImage from '../../assets/images/resources/my-image.png';

const MyFeatureSection: React.FC = () => {
    return (
        <section className="my-feature">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <h2 className="my-feature__title">Title</h2>
                        <p className="my-feature__text">Content</p>
                    </div>
                    <div className="col-xl-6">
                        <img src={myImage} alt="My image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyFeatureSection;
```

**New Shared Component:**
1. Create in appropriate subfolder of `src/components/`: e.g., `src/components/common/`
2. If stateful UI across pages: consider adding to `src/components/context/FreshFlowContext.tsx`
3. If used in many pages: place in `src/components/common/`
4. If specific to navigation: place in `src/components/sidebar/` or `src/components/stricky-nav/`

**New Utility/Client:**
1. Add to `src/lib/` (e.g., `src/lib/api.ts`, `src/lib/helpers.ts`)
2. Export functions/clients for import in pages/sections

**New Styles:**
1. Create CSS file in `src/assets/css/module-css/` named after feature: `my-feature.css`
2. Use BEM naming: `.my-feature__element`
3. Class selectors scoped to feature (no global resets)
4. Import in component or via `style.css` import

## Special Directories

**`src/assets/`:**
- Purpose: Static resources bundled at build time
- Generated: No, all pre-built
- Committed: Yes, all checked into git
- Images imported as ES modules (Vite bundles them)
- CSS imported globally or locally

**`.planning/`:**
- Purpose: GSD documentation (architecture, testing, concerns, etc.)
- Generated: No, manually created by architects
- Committed: Yes
- Not part of build output

**`node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes, by `npm install`
- Committed: No (in .gitignore)

---

*Structure analysis: 2026-05-14*
