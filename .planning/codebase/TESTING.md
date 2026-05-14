# Testing Patterns

**Analysis Date:** 2026-05-14

## Status: No Testing Framework Configured

**This project has no active testing infrastructure. No tests exist in the codebase.**

The following testing tools are NOT installed:
- Jest
- Vitest
- Playwright
- React Testing Library
- Cypress
- Any other test runner or assertion library

No test files exist in `src/` directory. Package.json contains no `test` script.

## Test Framework Setup

**Current:**
- None configured

**Recommended Setup (not yet implemented):**

For a React 19 + Vite + TypeScript project, recommend:

```bash
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/coverage-v8
```

**Why Vitest over Jest:**
- Native ESM support (matches Vite's philosophy)
- Faster test execution
- Simpler TypeScript configuration
- Better HMR during test development

## Test File Organization

**Not Yet Established**

**Recommended Pattern (for future implementation):**

Co-locate test files with source:
```
src/components/accordion/
├── Accordion.tsx
├── Accordion.test.tsx          # Unit tests
├── AccordionItem.tsx
└── AccordionItem.test.tsx
```

**Naming Convention:**
- `[ComponentName].test.tsx` for unit tests
- `[FeatureName].integration.test.tsx` for integration tests
- Place in same directory as implementation

## Test Structure

**Not Yet Established**

**Recommended Pattern:**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from './Accordion';

describe('Accordion Component', () => {
    it('should toggle accordion item on click', () => {
        // arrange
        const data = [{ id: '1', title: 'Item 1' }];
        const setActive = vi.fn();
        
        // act
        render(<Accordion data={data} setActive={setActive} />);
        const button = screen.getByRole('button');
        await userEvent.click(button);
        
        // assert
        expect(setActive).toHaveBeenCalled();
    });
});
```

## Mocking

**Not Yet Established**

**Recommended Patterns (for future use):**

**Context Mocking:**
```typescript
// For components using FreshFlowContext from src/components/context/FreshFlowContext.tsx
const mockContextValue: FreshFlowContextType = {
    loading: false,
    setLoading: vi.fn(),
    isMobileOpen: false,
    setIsMobileOpen: vi.fn(),
    isSearch: false,
    setIsSearch: vi.fn(),
    isSideBar: false,
    setSideBar: vi.fn(),
    toggleMobileMenu: vi.fn(),
    scrollToSection: vi.fn(),
    activeSection: 'home',
    setActiveSection: vi.fn(),
};

render(
    <FreshFlowContext.Provider value={mockContextValue}>
        <ComponentToTest />
    </FreshFlowContext.Provider>
);
```

**Supabase Client Mocking:**
For components using `src/lib/supabase.ts`:
```typescript
import { vi } from 'vitest';

vi.mock('../lib/supabase', () => ({
    supabase: {
        auth: { getSession: vi.fn() },
        from: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({ data: [], error: null }),
            }),
        }),
    },
}));
```

**What to Mock:**
- External API calls (Supabase queries)
- Context providers (FreshFlowContext)
- Event handlers (callbacks passed as props)
- timers (`setTimeout`, `setInterval` via `vi.useFakeTimers()`)

**What NOT to Mock:**
- React hooks (`useState`, `useEffect`, `useRef`)
- Router components (test actual navigation)
- DOM API (test real DOM interactions)
- User events (use `@testing-library/user-event`)

## Fixtures and Factories

**Not Yet Established**

**Recommended Location:**
Create `src/__tests__/fixtures/` directory:
```
src/__tests__/
├── fixtures/
│   ├── testimonials.fixtures.ts
│   ├── contact-form.fixtures.ts
│   └── pricing.fixtures.ts
└── setup.ts
```

**Example Fixture (based on actual data patterns):**
```typescript
// src/__tests__/fixtures/testimonials.fixtures.ts
import { Testimonial } from '../../pages/home-1/TestimonialType';

export const createTestimonial = (overrides?: Partial<Testimonial>): Testimonial => ({
    id: 'test-1',
    icon: 'icon.png',
    clientName: 'Test Client',
    clientTitle: 'Test Title',
    clientImage: 'image.jpg',
    subtitle: 'Test subtitle',
    testimonialText: ['Text 1', 'Text 2'],
    rating: 5,
    date: '1 day ago',
    ...overrides,
});

export const mockTestimonials = (): Testimonial[] => [
    createTestimonial({ id: '1', clientName: 'Emily' }),
    createTestimonial({ id: '2', clientName: 'John' }),
];
```

## Coverage

**Not Applicable** - No testing framework configured

**Recommendation:** Set target of 70%+ coverage for `src/` directory once testing is implemented

**View Coverage (future):**
```bash
vitest run --coverage
```

## Test Types

### Unit Tests (to implement)

**Scope:** Individual components and utility functions

**Examples to test (priority order):**
1. Context hooks and providers (`src/components/context/ContextProvider.tsx`, `src/components/context/FreshFlowContext.tsx`)
2. Reusable components (`src/components/common/BeforeAfterSlider.tsx`, `src/components/accordion/Accordion.tsx`)
3. Form handlers (`src/sections/contact/ContactForm.tsx`, `src/components/common/ChatProp.tsx`)
4. Utility functions (`scrollToSection` in ContextProvider)

**Approach:**
- Test props validation
- Test state changes
- Test event handler callbacks
- Test conditional rendering

### Integration Tests (to implement)

**Scope:** Multiple components working together

**Examples:**
- Contact form submission flow (`ContactForm` + form data extraction)
- Router configuration loading pages (`FreshFlowRouter` + page components)
- Before/After slider with keyboard and touch interaction
- Context changes triggering component updates

### E2E Tests (future - not recommended for MVP)

**Current:** Not used; project is too early-stage

**Consider for future:** Playwright or Cypress for critical user flows:
- Contact form submission to confirmation
- Navigation between pages
- Mobile menu toggle functionality

## Common Patterns to Test

**Async Testing (future pattern):**
```typescript
it('should load and display data', async () => {
    const { getByText } = render(<ComponentWithAsync />);
    const element = await screen.findByText('loaded data');
    expect(element).toBeInTheDocument();
});
```

**Error Testing (future pattern):**
```typescript
it('should throw error when context is missing', () => {
    expect(() => {
        render(<ComponentNeedingContext />); // without provider
    }).toThrow('App must be used within a ContextProvider');
});
```

**Form Testing (future pattern - based on code patterns):**
```typescript
it('should extract form data on submit', async () => {
    render(<ContactForm />);
    
    await userEvent.type(screen.getByPlaceholderText('Full Name'), 'John');
    await userEvent.type(screen.getByPlaceholderText('Your Email'), 'john@test.com');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    
    // Assert data extraction or callback was called
});
```

**Event Handler Testing (based on BeforeAfterSlider):**
```typescript
it('should update slider position on mouse move', async () => {
    render(<BeforeAfterSlider />);
    const slider = screen.getByRole('presentation', { hidden: true });
    
    await userEvent.pointer([
        { keys: '[MouseLeft>]', target: slider },
        { coords: { x: 100, y: 0 } },
    ]);
    
    // Assert sliderPosition state updated
});
```

## CI/CD Testing

**Current Status:** No testing in CI pipeline

**CI Pipeline Location:** `.github/workflows/ci.yml`

**Current Steps:**
1. `npm ci` - Install dependencies
2. `npm run lint` - Run ESLint
3. `npm run build` - Build for production

**Recommendation:** Add test step before or after lint:
```yaml
- run: npm run test -- --run
- run: npm run test -- --coverage
```

## Pre-Test Checklist

When implementing tests:

- [ ] Install Vitest and Testing Library dependencies
- [ ] Create `vitest.config.ts` in project root
- [ ] Create `src/__tests__/setup.ts` for global test setup
- [ ] Add `"test": "vitest"` and `"test:ui": "vitest --ui"` to package.json scripts
- [ ] Create `src/__tests__/fixtures/` directory with data builders
- [ ] Create first test file for Context (lowest risk, high value)
- [ ] Update `.github/workflows/ci.yml` to run tests
- [ ] Set coverage threshold in vitest config

---

*Testing analysis: 2026-05-14*

**Note:** This document describes current state (no tests) and provides scaffolding for future implementation. The codebase is functional but lacks test coverage. Priority: implement basic unit tests for context, reusable components, and form handlers before adding more features.
