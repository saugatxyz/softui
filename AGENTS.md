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
- Focus rings: use `utility-focus-inner` (1px) + `utility-focus-outer` (3px) combo.
- Always use existing utility classes from `src/app/globals.css` before inventing new ones.

Follow this pattern for any new components:
1. Base UI primitives (preferred): import from `@base-ui/react/*`.
2. Use `cva` for variants + sizes.
3. Use token-driven colors (e.g., `actions-*`, `content-*`).
4. Use `label` wrapper for optical balance and icon padding.
5. Do not hardcode colors. Use CSS vars only.


## Docs Page Layout (all component/token pages)
Files: `src/app/docs/*`

## MCP + Figma Workflow (for components)
When a component has a Figma source:
1. Use MCP to fetch design context:
   - `mcp__figma__get_design_context` for the target node.
   - `mcp__figma__get_screenshot` for visual confirmation.
   - `mcp__figma__get_variable_defs` if tokens are tied to variables.
2. Record exact sizes, padding, border radius, colors, and states.
3. Map to tokens in `src/design-system/tokens.css`.
4. Implement component based on Base UI + shadcn conventions.
5. Add or update docs page for usage + variants + sizes based on buttons page.

## Token Changes
- Tokens are sourced from `tokens/*.json` and compiled into `src/design-system/tokens.css`.
- If adding new tokens:
  1. Update JSON source or edit `tokens.css` directly (if needed).
  2. Ensure `@theme inline` and theme-mode blocks are updated.
  3. Update docs + token helper functions as needed.

## Guardrails
- Avoid hardcoded colors or spacing.
- Use tokens + existing utilities first.
- Keep spacing and typography consistent with other pages.