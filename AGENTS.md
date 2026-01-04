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
- For any task that involves updating design tokens, always ask a user for confirmation with a summary table.
- Use tokens + existing utilities first.
- Keep spacing and typography consistent with other pages.

# Animation Best Practices
 
## 1. Easing
 
Use custom easing functions over built-in CSS easings for more natural motion.
 
### ease-out (Elements entering or exiting / user interactions)
 
```css
--ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
--ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
--ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
--ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);
```
 
### ease-in-out (Elements moving within the screen)
 
```css
--ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
--ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
--ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
--ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
--ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
--ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);
```
 
### ease-in (Should generally be avoided as it makes the UI feel slow.)
 
```css
--ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
--ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
--ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
--ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
--ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
--ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);
```
 
## 2. Duration & Timing
 
- **Hover transitions**: Use `transition: property 200ms ease` for `color`, `background-color`, `opacity`
- **Spring animations**: When using Motion/Framer Motion using Spring animations usually results in a better animation. Avoid using bouncy spring animations unless you are working with drag gestures.
- **Make your UI feel fast**: Keep in mind that most animations should be fast. We want the user to feel that the UI is responsive and listens to him. No animation should be longer than 1s, unless it's illustrative.
- **Origin-aware**: Animate from the trigger (e.g., dropdown animates from button). Set `transform-origin` accordingly
 
## 3. Motion/Framer Motion
 
- Prefer **spring animations** for natural feel (avoid bouncy springs unless using drag gestures)
- Use `transform` instead of `x`/`y` for hardware acceleration:
 
```tsx
// Prefer this (hardware accelerated)
<motion.div style={{ transform: "translateX(100px)" }} />
 
// Over this
<motion.div animate={{ x: 100 }} />
```
 
## 4. Performance
 
- **Animate mostlyx**: `opacity`, `transform`
- **Avoid**: Animating `top`, `left`, `width`, `height` — use `transform` instead
- **Blur**: Keep blur values ≤ 20px
- **will-change**: Use sparingly, only for `transform`, `opacity`, `clipPath`, `filter`
- **Never** animate drag gestures with CSS variables
 
## 5. Radix UI Integration
 
### Adding animations
 
Use `asChild` with a `motion` component:
 
```tsx
<Dialog.Content asChild>
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
  >
    {children}
  </motion.div>
</Dialog.Content>
```
 
### Exit & layout animations
 
Hoist state and use `AnimatePresence` with `forceMount`:
 
```tsx
const [open, setOpen] = useState(false);
 
return (
  <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger>Open</Dialog.Trigger>
    <AnimatePresence>
      {open && (
        <Dialog.Content forceMount asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        </Dialog.Content>
      )}
    </AnimatePresence>
  </Dialog.Root>
);
```