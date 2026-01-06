# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Soft UI is a token-driven design system built on Next.js 16 (App Router) with React 19. It skins shadcn-style components using Base UI primitives, with live theme/base color switching.

## Commands

```bash
pnpm dev      # Start development server on localhost:3000
pnpm build    # Production build
pnpm lint     # Run ESLint
```

No test suite is currently configured.

## Architecture

### Key Directories
- `src/components/ui/` - Reusable UI components (Button, Accordion, Badge, IconButton)
- `src/components/docs/` - Documentation components (sidebar, theme-switcher, code-block)
- `src/design-system/` - Token system: `tokens.css` (CSS variables), `config.ts` (theme config)
- `src/app/docs/` - Documentation pages for components and tokens
- `tokens/` - Design token JSON files synced from Figma

### Component Pattern
Components follow this structure:
1. Import primitives from `@base-ui/react/*`
2. Use `cva` (class-variance-authority) for variants and sizes
3. Use token-driven CSS variables for all colors (`actions-*`, `content-*`, `surface-*`, `border-*`)
4. Use `label` wrapper for optical balance with icon padding
5. Add `data-slot`, `data-variant`, `data-size`, `data-tone` attributes for semantic styling

### Menu Ecosystem (Dropdowns)

**Menu is the master component** for all dropdown/popup list UIs. Three components share visual patterns:

| Component | Use Case | Primitive |
|-----------|----------|-----------|
| **Menu** | Actions/commands (clicking does something) | `@base-ui/react/menu` |
| **Select** | Pick a value from options (form input) | `@base-ui/react/select` |
| **Autocomplete** | Search + select with free-form typing | `@base-ui/react/combobox` |

**When to use which:**
- Use **Menu** for context menus, action dropdowns, navigation menus
- Use **Select** for form fields where user picks from predefined options
- Use **Autocomplete** when users need to search/filter or can type custom values

**Shared styles in `list-item-styles.tsx`:**
- `listPopupStyles` - Popup container (shadow, animation, sizing)
- `listItemVariants` - Item hover, focus, disabled states
- `listItemLabelVariants` - Text styling
- `ListSearch` - Search input component for filtering dropdown items
- `LIST_MAX_HEIGHT` (320px), `LIST_SEARCH_THRESHOLD` (7 items)

**Rules for new dropdown components:**
1. Import shared styles from `list-item-styles.tsx`
2. Use `ScrollFadeContainer` for scrollable content
3. Use `MenuPrefix`/`MenuSuffix` for item decorations when applicable
4. Follow Menu's popup styling (shadow, animation, border-radius)
5. Support `searchable` prop for lists > 7 items

### Token System
- All colors and spacing use CSS variables from `src/design-system/tokens.css`
- Theme switching via `data-theme-color` and `data-base-color` attributes
- Scheme modes: `data-scheme=mono` (neutral) or `data-scheme=color` (theme-driven)
- Focus rings: always use `utility-focus-inner` (1px) + `utility-focus-outer` (3px) combo:
  ```
  shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]
  ```

### Dependencies
- `@base-ui/react` - Headless UI primitives
- `@remixicon/react` - Icons
- `motion` - Animations (Framer Motion)
- `sugar-high` - Syntax highlighting in docs

## Design Rules

**Never hardcode colors or spacing values.** Use CSS variables from tokens.css.

**Token changes require user confirmation** with a summary table before implementation.

**Animation guidelines:**
- UI animations must not exceed 300ms
- Prefer spring animations with Motion: `{ type: "spring", bounce: 0-0.2, duration: 0.15-0.3 }`
- Hover transitions: `transition: property 200ms ease` for color, background-color, opacity
- Use `transform` instead of `x`/`y` for hardware acceleration
- Avoid `ease-in` (feels slow); prefer `ease-out` for enter/exit, `ease-in-out` for movement

**Spring configs:**
- Instant/Snappy: `bounce: 0, duration: 0.15`
- Fast/Responsive: `bounce: 0, duration: 0.2`
- Smooth/Subtle: `bounce: 0.1, duration: 0.25`
- Expressive: `bounce: 0.2, duration: 0.3`

## Documentation Structure

Documentation pages should be organized around **component capabilities** (what the component can do), not around **content or use cases** (what data you might use with it).

**Good section names** (capability-focused):
- "Sizes" - the component supports different sizes
- "With Icon" - the component can display icons
- "With Label" - the component supports labels
- "Custom Options" - the component allows custom option rendering
- "States" - the component has different states

**Bad section names** (content-focused):
- "Company Search" - describes what data is being searched
- "Crypto Tokens" - describes the content type
- "User List" - describes the data

The key principle: section headers should describe **what the component is capable of**, not **what example content is being shown**. Multiple content examples can live under a single capability section.

## Path Aliases

`@/*` maps to `./src/*`
