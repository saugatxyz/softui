# Soft UI Agent Guidelines

This document defines how AI/agents (Codex, Cursor, etc.) should implement components and docs in this repo.

## Documentation Resources

| Document | Purpose | When to Use |
|----------|---------|-------------|
| `CLAUDE.md` | Claude Code implementation guidelines | When using Claude Code specifically |
| `AGENTS.md` | General AI agent guidelines | For Codex or other AI tools |
| `ANIMATION.md` | Animation best practices | When adding motion to components |
| `COMPONENTS.md` | Component API reference | When implementing with Base UI primitives |
| `UX-GUIDE.md` | Design patterns & component selection | When deciding which component to use |

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
- Preserve the existing documentation page structure; do not reformat sections unless explicitly requested (use `src/app/docs/button/page.tsx` as the layout reference).
- After changing component styles, recheck docs/examples to avoid unintended visual regressions.

## MCP + Figma Workflow

When implementing a design from Figma:

### Step 1: Study the Design
Pull the design using Figma MCP and study it thoroughly before writing any code:
- `mcp__figma__get_design_context` for the target node
- `mcp__figma__get_screenshot` for visual confirmation
- `mcp__figma__get_variable_defs` if tokens are tied to variables

Understand the layout, components, spacing, and visual details. Record exact specifications:
- Sizes, padding, border radius
- Colors and states
- Typography (font, size, weight, line-height)
- Shadows, borders, alignment

### Step 2: Map to Tokens
Map Figma values to existing tokens in `src/design-system/tokens.css`. Only propose new tokens if no existing token matches.

### Step 3: Build First Pass
Implement the component based on Base UI + design system conventions. **It will be wrong. That's expected.**

### Step 4: Refinement Loop
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

### Step 5: Handle Ambiguity
If something in the design is ambiguous or impossible to implement as spec'd, **ask the user rather than guessing**.

### Step 6: Documentation
Add/update docs page for usage, variants, and sizes.

## Token Changes
- Tokens are sourced from `tokens/*.json` and compiled into `src/design-system/tokens.css`.
- If adding new tokens:
  1. Update JSON source or edit `tokens.css` directly (if needed).
  2. Ensure `@theme inline` and theme-mode blocks are updated.
  3. Update docs + token helper functions as needed.

## Guardrails
- Avoid hardcoded colors or spacing.
- For any task that involves updating design tokens, always ask a user for confirmation with a summary table.
- Use tokens + existing utilities first.
- Keep spacing and typography consistent with other pages.

# Animation

See `ANIMATION.md` for complete animation guidelines including:
- Easing functions (ease-out, ease-in-out, ease-in)
- Duration & timing rules
- Spring animation configuration
- Performance best practices
- Base UI integration patterns

**Key rules:**
- UI animations must not exceed 300ms
- Prefer spring animations with `bounce` and `duration`
- Use `transform` instead of `x`/`y` for hardware acceleration
- Animate from the trigger element
