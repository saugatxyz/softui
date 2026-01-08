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
| `COMPONENTS.md` | Component implementation reference | When implementing with Base UI primitives |
| `UX-GUIDE.md` | Component selection & variant recommendations | When deciding which component to use |

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

### Base UI Data Attributes Reference

**CRITICAL:** Always use the correct data attributes for each primitive. Do NOT guess - refer to this table.

| Primitive | Active/Selected State | Other States |
|-----------|----------------------|--------------|
| `Tabs.Tab` | `data-[active]` | `data-[disabled]` |
| `Menu.Item` | `data-[highlighted]` | `data-[disabled]` |
| `Select.Option` | `data-[highlighted]`, `data-[selected]` | `data-[disabled]` |
| `Combobox.Option` | `data-[highlighted]`, `data-[selected]` | `data-[disabled]` |
| `Radio.Item` | `data-[checked]` | `data-[disabled]` |
| `Checkbox.Root` | `data-[checked]`, `data-[indeterminate]` | `data-[disabled]` |
| `Switch.Root` | `data-[checked]` | `data-[disabled]` |
| `Toggle.Root` | `data-[pressed]` | `data-[disabled]` |
| `Accordion.Item` | `data-[open]` | `data-[disabled]` |
| `Dialog.Root` | `data-[open]` | - |
| `Popover.Root` | `data-[open]` | - |
| `Collapsible.Root` | `data-[open]` | `data-[disabled]` |

**Common patterns:**
- Selection in lists: `data-[highlighted]` (keyboard/hover focus) + `data-[selected]` (chosen value)
- Toggle states: `data-[checked]` or `data-[pressed]`
- Expandable: `data-[open]`
- Navigation tabs: `data-[active]` (NOT `data-[selected]`)

**Before styling a Base UI component**, check the primitive's source or existing components in this codebase to confirm the correct data attribute.

### Compound Component API Reference

**CRITICAL:** Use the correct sub-component names. Do NOT guess - refer to this table.

| Component | Sub-components |
|-----------|----------------|
| `Tabs` | `.List`, `.Trigger`, `.Content`, `.Indicator` |
| `Dialog` | `.Root`, `.Trigger`, `.Portal`, `.Backdrop`, `.Popup`, `.Content`, `.Header`, `.Title`, `.Description`, `.Body`, `.Footer`, `.Close` |
| `AlertDialog` | `.Root`, `.Trigger`, `.Portal`, `.Backdrop`, `.Popup`, `.Content`, `.Title`, `.Description`, `.Footer`, `.Close` |
| `Popover` | `.Root`, `.Trigger`, `.Portal`, `.Positioner`, `.Popup`, `.Arrow`, `.Title`, `.Description`, `.Close`, `.Backdrop` |
| `Tooltip` | `.Provider`, `.Root`, `.Trigger`, `.Portal`, `.Positioner`, `.Popup`, `.Arrow`, `.Simple`, `.Explainer`, `.Breakdown` |
| `Menu` | `.Root`, `.Trigger`, `.Portal`, `.Positioner`, `.Popup`, `.Search`, `.Arrow`, `.Item`, `.Group`, `.GroupLabel`, `.Separator`, `.Prefix`, `.Suffix`, `.Empty`, `.RadioGroup`, `.RadioItem`, `.CheckboxItem`, `.SubmenuRoot`, `.SubmenuTrigger` |
| `ContextMenu` | `.Root`, `.Trigger`, `.Portal`, `.Positioner`, `.Popup`, `.Arrow`, `.RadioGroup`, `.RadioItem`, `.CheckboxItem`, `.SubmenuRoot`, `.SubmenuTrigger` (also uses `MenuItem`, `MenuPrefix`, `MenuSuffix`, `MenuSeparator`, `MenuGroup`, `MenuGroupLabel`, `MenuEmpty` as separate imports) |
| `Toast` | `.Provider`, `.Portal`, `.Viewport`, `.Root`, `.Content`, `.CompactContent`, `.TextWrapper`, `.CompactTextWrapper`, `.Title`, `.Description`, `.Actions`, `.CompactActions`, `.Action`, `.CompactAction`, `.Close`, `.Icon` |
| `Fieldset` | `.Legend` (also works as root directly) |
| `SegmentedControl` | `.List`, `.Item`, `.Indicator`, `.Content` |

**Separate component imports (not compound):**

| Component | Related Components |
|-----------|-------------------|
| `Accordion` | `AccordionRoot`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| `RadioGroup` | `RadioGroupItem` |
| `CheckboxGroup` | `CheckboxGroupItem` |
| `SwitchGroup` | `SwitchGroupItem` |
| `ButtonGroup` | `ButtonGroupItem` |
| `ToggleGroup` | `ToggleGroupItem` |
| `ChipGroup` | `Chip` |
| `AvatarGroup` | `Avatar` |

**Single components (no sub-components):**
`Select`, `Combobox`, `Autocomplete`, `Input`, `Button`, `IconButton`, `Switch`, `Checkbox`, `Field`, `Form`, `Badge`, `Chip`, `Avatar`, `Separator`

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

### Typography

**Text sizes:**
| Use Case | Size |
|----------|------|
| Normal text | 14px |
| Small titles | 16px |
| Section titles | 18px |
| Page titles | 24px |

**Font weights:**
- Page titles: semibold
- Section titles: medium
- Small titles: medium
- Normal text: regular or medium (never semibold)

**Title + subtitle pairing:**

| Title Type | Title Style | Subtitle Size | Subtitle Style |
|------------|-------------|---------------|----------------|
| Page title (24px) | `content-primary`, semibold | 14px | `content-subtle`, regular |
| Section title (18px) | `content-primary`, medium | 14px | `content-subtle`, regular |
| Small title (16px) | `content-primary`, medium | 12px | `content-subtle`, regular |
| Normal text (14px) | `content-primary`, medium | 12px | `content-subtle`, regular |

### Animation

- UI animations must not exceed 300ms
- Prefer spring animations: `{ type: "spring", bounce: 0-0.2, duration: 0.15-0.3 }`
- Hover transitions: `transition: property 200ms ease`
- Use `transform` instead of `x`/`y` for hardware acceleration
- Avoid `ease-in`; prefer `ease-out` for enter/exit

**Spring configs:**
| Name | Config |
|------|--------|
| Instant/Snappy | `bounce: 0, duration: 0.15` |
| Fast/Responsive | `bounce: 0, duration: 0.2` |
| Smooth/Subtle | `bounce: 0.1, duration: 0.25` |
| Expressive | `bounce: 0.2, duration: 0.3` |

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
