# Soft UI Agent Guidelines

This document defines how AI/agents should implement components and docs in this repo. It is optimized for the current Button implementation and documentation flow and should be followed step by step.

## Scope
- Applies to all component work and docs pages.
- Treat this as source-of-truth for agent workflow and repo conventions.

## Project Structure (key paths)
- Components: `src/components/ui/*`
- Docs pages: `src/app/docs/*`
- Docs layout + controls: `src/components/docs/*`
- Tokens + theme system: `src/design-system/tokens.css`, `src/design-system/config.ts`
- Token data helpers: `src/lib/token-data.ts`
- Global typography utilities: `src/app/globals.css`

## Global Design System Rules
- Use CSS variables defined in `src/design-system/tokens.css` for all colors and spacing.
- For row separators (lists in docs), use `border-b border-border-muted`.
- Focus rings: use `utility-focus-inner` (1px) + `utility-focus-outer` (3px) combo.
- Typography letter-spacing:
  - 16px: `-0.08px` (applies via `.text-body-l*`)
  - 18px: `-0.18px` (applies via `.text-body-xl*`)
  - 20px: `-0.3px` (applies via `.text-body-2xl*`)
  - 24px: `-0.24px` (applies via `.text-body-3xl*`)
- Always use existing utility classes from `src/app/globals.css` before inventing new ones.

## Button Component Implementation (reference behavior)
File: `src/components/ui/button.tsx`

Follow this pattern for any new components:
1. Base UI primitives (preferred): import from `@base-ui/react/*`.
2. Use `cva` for variants + sizes.
3. Use token-driven colors (e.g., `actions-*`, `content-*`).
4. Use `label` wrapper for optical balance and icon padding.
5. Do not hardcode colors. Use CSS vars only.

Button sizing rules (must match):
- `xs`: label padding 4px; left/right padding 10px; gap 2px
- `s`: label padding 4px; left/right padding 12px; gap 4px
- `m`: label padding 4px; left/right padding 16px; gap 4px
- `l`: label padding 6px; left/right padding 16px; gap 4px

Button states:
- Primary/secondary/tertiary/ghost/link/link-alt/danger are all token-driven.
- Danger uses content inverse colors for all states.
- Tertiary uses shadow stack + `overflow-hidden`.

## Docs Page Layout (all component/token pages)
Files: `src/app/docs/*`

### Page header
- Icon sits above the title (not inline).
- Spacing between icon and title block: 20px.
- Title style: `text-body-3xl-semibold`.

### Content layout
- Use list-style rows (no cards for lists).
- Row padding: 16px top and bottom.
- Row separator: `border-b border-border-muted` (except last).
- Row titles: regular weight (`text-body-m`).
- Row values: subtle (`text-content-subtle`), regular weight.

### Tokens pages (current)
- Colors: list of tokens by section; show token name + HSL on right with color swatch on the far right.
- Spacing + Radius: both on one page.
- Typography: list of size/line-height pairs with live sample aligned to the right.

## Docs Navigation
- Sidebar is fixed and always visible on desktop.
- Only the content column scrolls.
- Sidebar:
  - Background: `surface-canvas`
  - Category labels: uppercase, semibold
  - Menu items: regular weight by default, no weight change on hover
  - Item padding: 12px left/right

## MCP + Figma Workflow (for components)
When a component has a Figma source:
1. Use MCP to fetch design context:
   - `mcp__figma__get_design_context` for the target node.
   - `mcp__figma__get_screenshot` for visual confirmation.
   - `mcp__figma__get_variable_defs` if tokens are tied to variables.
2. Record exact sizes, padding, border radius, colors, and states.
3. Map to tokens in `src/design-system/tokens.css`.
4. Implement component based on Base UI + shadcn conventions.
5. Add or update docs page for usage + variants + sizes.

## Token Changes
- Tokens are sourced from `tokens/*.json` and compiled into `src/design-system/tokens.css`.
- If adding new tokens:
  1. Update JSON source or edit `tokens.css` directly (if needed).
  2. Ensure `@theme inline` and theme-mode blocks are updated.
  3. Update docs + token helper functions as needed.

## Component Docs Checklist
- Header includes icon + title.
- Usage example included.
- Variants section with default + disabled.
- Sizes section with icon balance demonstration.
- Row separators use `border-border-muted`.
- Text sizes and weights match global typography utilities.

## Guardrails
- Avoid hardcoded colors or spacing.
- Use tokens + existing utilities first.
- If adding new docs pages, follow the same header + list layout.
- Keep spacing and typography consistent with other pages.
