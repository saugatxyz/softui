# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Soft UI is a token-driven design system built on Next.js 16 (App Router) with React 19. It skins Base UI primitives with our design tokens, providing live theme/base color switching.

## Commands

```bash
pnpm dev      # Start development server on localhost:3000
pnpm build    # Production build
pnpm lint     # Run ESLint
```

No test suite is currently configured.

## Documentation Resources

| Document | Purpose | When to Use |
|----------|---------|-------------|
| `CLAUDE.md` | Technical implementation guidelines | When building or modifying components |
| `AGENTS.md` | General AI agent guidelines | For Codex or other AI tools |
| `ANIMATION.md` | Animation best practices | When adding motion to components |
| `COMPONENTS.md` | Component API reference | When implementing with Base UI primitives |
| `UX-GUIDE.md` | Design patterns & component selection | When deciding which component to use |

**Before building UI, always consult `UX-GUIDE.md`** to select the right component and variant for the use case. It contains:
- Decision trees for component selection
- Variant recommendations for all components
- **Token usage guide** (when to use each color, spacing, radius token)
- Common usage patterns

**Design hierarchy:** `Tokens → Components → Pages`
- **Tokens** are for building components
- **Components** are for building pages
- Pages should rarely use tokens directly (only for layout spacing)

---

## Architecture

### Key Directories
- `src/components/ui/` - Reusable UI components (Button, Tabs, Dialog, Select, etc.)
- `src/components/docs/` - Documentation components (sidebar, theme-switcher, code-block)
- `src/design-system/` - Token system: `tokens.css` (CSS variables), `config.ts` (theme config)
- `src/app/docs/` - Documentation pages for components and tokens
- `tokens/` - Design token JSON files synced from Figma

### Dependencies
- `@base-ui/react` - Headless UI primitives (our foundation)
- `@remixicon/react` - Icons
- `motion` - Animations (Framer Motion)
- `sugar-high` - Syntax highlighting in docs

### Path Aliases
`@/*` maps to `./src/*`

---

## Base UI Guidelines

> **CRITICAL:** We strictly skin Base UI. We do not modify, override, or duplicate its behavior. Every component must pass the audit checklist below.

### Core Principle

**Style it. Compose it. Wrap it. Never change it.**

Base UI handles: state management, keyboard navigation, focus management, ARIA attributes, and data attributes. We only add: CSS classes, design tokens, and convenience props for styling.

### Component Pattern

Components follow this structure:
1. Import primitives from `@base-ui-react/*`
2. Spread all Base UI props via `{...props}`
3. Use `cva` (class-variance-authority) for variants and sizes
4. Use token-driven CSS variables for all colors
5. Add `data-slot`, `data-variant`, `data-size` attributes for styling hooks

**Allowed additions:**
- `variant`, `size`, `tone` props for design system styling
- `leadingIcon`, `trailingIcon` for icon convenience
- React context to pass variant/size to children

**Never do:**
- Transform prop values (e.g., converting strings to objects)
- Add `useState` that tracks state Base UI already manages
- Override `role` or `aria-*` attributes manually
- Intercept `onChange`/`onValueChange` and transform values

### New Component Workflow

**Follow these steps IN ORDER when creating a new component:**

#### Step 1: Research
- [ ] **First**, search for an existing Base UI component or matching component in `src/components/ui/`
- [ ] If no direct match exists, identify the Base UI primitive to use and **ask the user to confirm** they're okay with using that primitive before proceeding
- [ ] Check `COMPONENTS.md` for similar components and their Base UI primitives
- [ ] Note the exact data attributes from the reference table above
- [ ] Look at existing components in `src/components/ui/` for patterns

#### Step 2: Implement Component
- [ ] Create `src/components/ui/[component-name].tsx`
- [ ] Import primitive from `@base-ui/react/[primitive]`
- [ ] Extend Base UI types with `& { variant?: ..., size?: ... }`
- [ ] Spread `{...props}` on all Base UI primitives
- [ ] Use `cva` for variant/size styling
- [ ] Use correct data attributes (e.g., `data-[active]` NOT `data-[selected]` for Tabs)
- [ ] Use design tokens for ALL colors, spacing, radius
- [ ] Add `data-slot` attributes for styling hooks

#### Step 3: Create Documentation Page
- [ ] Create `src/app/docs/[component-name]/page.tsx`
- [ ] Add import example in `<CodeBlock>`
- [ ] Add sections: Sizes, Variants, States, Disabled (as applicable)
- [ ] Follow existing doc page patterns (see `src/app/docs/tabs/page.tsx`)

#### Step 4: Update Navigation
- [ ] Add component to `src/components/docs/nav-sections.ts` (alphabetical order)

#### Step 5: Verify
- [ ] Run `pnpm lint` - fix any errors
- [ ] Check the page loads at `localhost:3000/docs/[component-name]`
- [ ] Test all variants and sizes render correctly
- [ ] Test keyboard navigation works (Base UI handles this)

#### Step 6: Audit & Summary
- [ ] Run the Base UI audit checklist (below)
- [ ] Provide the Component Summary table

---

### MCP + Figma Workflow

When implementing a design from Figma:

#### Step 1: Study the Design
Pull the design using Figma MCP and study it thoroughly before writing any code:
- `mcp__figma__get_design_context` for the target node
- `mcp__figma__get_screenshot` for visual confirmation
- `mcp__figma__get_variable_defs` if tokens are tied to variables

Understand the layout, components, spacing, and visual details. Record exact specifications:
- Sizes, padding, border radius
- Colors and states
- Typography (font, size, weight, line-height)
- Shadows, borders, alignment

#### Step 2: Map to Tokens
Map Figma values to existing tokens in `src/design-system/tokens.css`. Only propose new tokens if no existing token matches.

#### Step 3: Build First Pass
Implement the component based on Base UI + design system conventions. **It will be wrong. That's expected.**

#### Step 4: Refinement Loop
Run this loop until pixel-perfect:

1. **Screenshot your implementation** using Chrome DevTools MCP (`mcp__browser__screenshot`) and inspect element properties directly
2. **Compare side-by-side** with the Figma source
3. **List every difference** you spot:
   - Spacing (margins, padding, gaps)
   - Colors (backgrounds, text, borders)
   - Typography (size, weight, line-height)
   - Border radius
   - Shadows
   - Borders
   - Alignment
   - Responsive behavior
4. **Fix differences one by one**, verifying each fix in the browser
5. **Repeat** until you cannot find any differences

Be obsessive about the details—the gap between "close enough" and "correct" is where polish lives.

#### Step 5: Handle Ambiguity
If something in the design is ambiguous or impossible to implement as spec'd, **ask the user rather than guessing**.

#### Step 6: Documentation
Add/update docs page for usage, variants, and sizes

---

### Component Audit Checklist

**After creating or modifying ANY Base UI component, you MUST:**

1. **Ask the user:** "Should I run the Base UI audit checklist for this component?"
2. **If yes, verify each item:**

**Props passthrough:**
- [ ] All Base UI props spread via `{...props}`
- [ ] No prop value transformations
- [ ] Component extends Base UI types (not replaces)

**Behavior preservation:**
- [ ] Data attributes work (`data-active`, `data-disabled`, `data-open`, etc.)
- [ ] Keyboard navigation unchanged
- [ ] Focus management unchanged
- [ ] ARIA comes from Base UI, not manually added

**Styling only:**
- [ ] Only CSS classes and design tokens added
- [ ] Uses Base UI's CSS variables when available
- [ ] No JS logic duplicating Base UI behavior

3. **Provide a summary table** (see Component Summary section below)

### Base UI Reference

**CRITICAL:** Always use the correct data attributes and sub-component names. See `COMPONENTS.md` for the complete reference tables including:
- Data attributes for each primitive (`data-active`, `data-checked`, `data-open`, etc.)
- Compound component API (sub-components for Dialog, Menu, Toast, etc.)
- Props and usage examples for all components

**Common patterns:**
- Selection in lists: `data-[highlighted]` (keyboard/hover focus) + `data-[selected]` (chosen value)
- Toggle states: `data-[checked]` or `data-[pressed]`
- Expandable: `data-[open]`
- Navigation tabs: `data-[active]` (NOT `data-[selected]`)

### Documentation Examples

When showing Base UI primitive usage in docs (not our wrapped components):

**Do:**
- Import and use Base UI primitives directly
- Apply our CSS classes and design tokens
- Use the same prop types and signatures as Base UI docs

**Don't:**
- Add wrapper logic that changes how Base UI expects data
- Create abstraction layers over their API

**Note:** Our wrapped components (`Select`, `Combobox`, `Tabs`) can provide convenience APIs - that's intentional. But doc examples showing primitives directly should match Base UI's API exactly.

---

## Design Rules

### Tokens

**Never hardcode colors or spacing values.** Use CSS variables from `tokens.css`.

Token categories:
- Colors: `actions-*`, `content-*`, `surface-*`, `border-*`
- Spacing: `--space-*` (4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 36, 40...)
- Radius: `--radius-*` (4, 6, 8, 10, 12, 16, max)

Focus rings always use the combo:
```
shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]
```

Theme switching via `data-theme-color` and `data-base-color` attributes.

**Token changes require user confirmation** with a summary table before implementation.

### Intentional Token Exceptions

The following components use hardcoded colors by design. **Do not replace these with design tokens.**

| File | Reason |
|------|--------|
| `src/components/ui/logo.tsx` | Third-party brand logos (Claude, Airbnb, Discord, Linear, etc.) must use official brand colors |
| `src/components/ui/crypto.tsx` | Cryptocurrency brand colors (BTC, ETH, USDT, etc.) must match official coin colors |
| `src/components/ui/file-icon.tsx` | File type icons use standardized colors (matching Google Workspace conventions) |

These exceptions exist because:
- Brand colors are legally mandated and cannot be theme-adapted
- Users expect cryptocurrency icons to match official branding
- File type colors follow industry conventions for recognition

### Animation

See `ANIMATION.md` for detailed animation guidelines. Key rules:
- UI animations must not exceed 300ms
- Prefer spring animations with `bounce` and `duration` params
- Hover transitions: `transition: property 200ms ease`
- Use `transform` instead of `x`/`y` for hardware acceleration

---

## Documentation Structure

Organize pages around **component capabilities**, not content/use cases.

**Good section names:** Sizes, With Icon, Variants, States, Disabled
**Bad section names:** Company Search, Crypto Tokens, User List

Section headers describe what the component can do, not what example data is shown.

---

## Component Summary Requirements

**After ANY component creation or update, provide this summary:**

```
## Component Summary: [ComponentName]

**Files changed:**
| File | Action |
|------|--------|
| `src/components/ui/xyz.tsx` | Created/Modified |
| `src/app/docs/xyz/page.tsx` | Created/Modified |

**Features:**
- Variants: [list]
- Sizes: [list]
- Props added: [list]

**Base UI primitives used:**
- [List each primitive]

**Base UI audit:** [Passed/Needs review]
```

This summary is **required** - do not skip it.
