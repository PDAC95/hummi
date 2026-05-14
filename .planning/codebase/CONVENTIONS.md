# Coding Conventions

**Analysis Date:** 2026-05-14

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `BeforeAfterSlider.tsx`, `ContactForm.tsx`, `MobileNav.tsx`)
- Utility/type files: PascalCase or camelCase (e.g., `TestimonialType.ts`, `FreshFlowContext.tsx`, `supabase.ts`)
- Directories: lowercase with hyphens for multi-word directories (e.g., `home-1`, `before-after`, `accordion`)

**Functions:**
- camelCase for all function names and arrow functions (e.g., `handleToggle`, `handleSubmitChat`, `scrollToSection`, `moveCursor`)
- Event handlers prefixed with `handle` + action (e.g., `handleMouseDown`, `handleTouchStart`, `handleKeyDown`, `handleSubmit`)
- Custom hooks and utility functions follow camelCase (e.g., `useContext`)

**Variables:**
- camelCase for all variable declarations (e.g., `beforeImageUrl`, `sliderPosition`, `isDragging`, `contactInfoList`)
- useState state variables use camelCase: `[state, setState]` pattern (e.g., `[loading, setLoading]`, `[isMobileOpen, setIsMobileOpen]`)
- Constants defined in files use UPPER_SNAKE_CASE when module-level (e.g., `FIRST_MARQUEE_TESTIMONIALS`, `SECOND_MARQUEE_TESTIMONIALS`)
- Local const arrays/objects in components use camelCase (e.g., `contactInfoList`, `formFields`)

**Types:**
- Interface names use PascalCase (e.g., `BeforeAfterSliderProps`, `ContactFormData`, `FreshFlowContextType`, `Testimonial`)
- Type discriminator properties use lowercase (e.g., `type: 'text' | 'email'`)

## Code Style

**Formatting:**
- No Prettier config detected (`.prettierrc` not present)
- Manual formatting follows consistent spacing patterns observed in codebase
- Object properties and type definitions use consistent 4-space indentation
- HTML/JSX attributes use double quotes for string values
- TypeScript inline styles use camelCase property names (e.g., `userSelect: "none"`, `pointerEvents: "none"`)

**Linting:**
- ESLint 9.36.0 with flat config (`eslint.config.js`)
- Extends: `@eslint/js` recommended, `typescript-eslint` recommended, `react-hooks` recommended-latest, `react-refresh` vite
- Targets: `**/*.{ts,tsx}` files
- Global env: browser
- ECMAScript target: 2020

**Key Rules:**
- React hooks plugin: enforces `eslintplugin-react-hooks/recommended-latest` rules (dependency arrays, hook call order)
- React Refresh plugin: enforces component naming for fast refresh
- TypeScript ESLint: enforces strict type safety
- No explicit disables observed; code follows recommended rules

## Import Organization

**Order:**
1. React and external framework imports (e.g., `import React, { useContext, useEffect } from "react"`)
2. Third-party library imports (e.g., `import { createBrowserRouter } from "react-router"`, `import Swal from "sweetalert2"`)
3. Project internal imports from `components/`, `sections/`, `pages/`, `lib/` (relative paths with `../../` notation)
4. Type/interface imports using `type` keyword when importing only types (e.g., `import type { FormEvent } from 'react'`, `import type { FAQ } from '../../sections/about/SectionThree'`)
5. Asset imports (images, styles) at end of imports before component definition

**Path Aliases:**
- Not detected. Uses relative path imports throughout (e.g., `../../components/context/ContextProvider`)
- Consider adding `paths` in `tsconfig.app.json` for cleaner imports

## Error Handling

**Patterns:**
- Context validation via guard clause with `throw new Error()` for missing context providers
  - Example in `src/App.tsx:14`: `if (!context) { throw new Error("App must be used within a ContextProvider"); }`
  - Repeated in many components using context (e.g., `src/components/sidebar/SideBar.tsx`, `src/sections/home-1/Header.tsx`)
- No try-catch blocks observed in codebase; errors are thrown immediately for missing initialization
- Error page routing: dedicated `Error` component at `src/pages/error/Error.tsx` integrated as `errorElement` in router configuration
- Environment variable validation with early throw: `src/lib/supabase.ts` checks Supabase config and throws if missing

**Error Boundaries:**
- Not explicitly implemented; relies on React error boundary in router (Error page as errorElement)

## Logging

**Framework:** Console API (no dedicated logging library detected)

**Patterns:**
- Commented-out `console.log` statements throughout codebase indicate manual debugging approach
  - Example: `src/sections/contact/ContactForm.tsx:71` has `// console.log(userInfo);`
  - Example: `src/pages/error/Error.tsx:11` has `// console.log(data)`
- No production logging framework; removed logs suggest development-only debugging
- SweetAlert2 used for user-facing notifications instead of console logs (e.g., `src/components/common/ChatProp.tsx`)

## Comments

**When to Comment:**
- Minimal inline comments; code is self-documenting where possible
- Comments used only for non-obvious intent or workarounds
- Example of descriptive comment: `src/App.tsx:25` - `// Cursor refs` clarifies DOM ref purpose
- Example: `src/App.tsx:67` - `// --- Handle route changes (fake loading) ---` explains complex side effect

**TSDoc/JSDoc:**
- Not consistently used for function or type documentation
- Some interfaces have inline type annotations (e.g., `src/sections/contact/ContactForm.tsx:3-10`)
- No formal JSDoc blocks observed; types serve as inline documentation

## Function Design

**Size:** 
- Mostly small to medium functions (20-150 lines for complex components)
- Large components exist but are divided into functional sections with clear responsibility
- Example: `BeforeAfterSlider.tsx` is 346 lines but handles single feature (before/after image slider)

**Parameters:**
- Props destructured at function signature level
- Example: `const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage, ... })`
- Event handlers receive native browser events and extract values as needed
- Form data extracted via `FormData` API (e.g., `src/sections/contact/ContactForm.tsx:61`)

**Return Values:**
- Components return JSX.Element or null (conditional rendering)
- Utility functions return typed values (e.g., `ScrollToSection` returns `void`, form handlers return `void`)
- Callbacks return void for event handlers (e.g., `handleToggle: void`, `handleSubmitChat: void`)

## Module Design

**Exports:**
- Default export for all components: `export default ComponentName`
- Named exports for types and interfaces in data files (e.g., `export const TESTIMONIALS: Testimonial[] = [...]`)
- Mixed pattern: types exported named, components default

**Barrel Files:**
- Not detected. Each component file is imported individually
- `src/components/router/FreshFlowRouter.tsx` imports all pages individually (lines 1-40)
- Opportunity: Create barrel files in `components/` subdirectories to simplify imports

## Additional Patterns

**Refs:**
- Used carefully for DOM manipulation and element references
- Pattern: `useRef<HTMLDivElement | null>(null)` with null safety checks
- Example: `src/App.tsx:22-23` - cursor refs with null checks before use

**Callbacks with useCallback:**
- Used extensively in interactive components to optimize re-renders
- Pattern: `useCallback((args) => { logic }, [deps])`
- Example: `src/components/common/BeforeAfterSlider.tsx:51-110` - multiple arrow function callbacks with dependencies

**Inline Styles vs Classes:**
- Mix of both: inline styles for dynamic values and component-specific styling, class names for CSS rules
- Example: `src/components/common/BeforeAfterSlider.tsx` uses inline styles with dynamic `${sliderPosition}%` values
- CSS classes used for pre-defined styles (e.g., `className="before-after-slider"`)

---

*Convention analysis: 2026-05-14*
