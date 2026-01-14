# Animation Guidelines

This document defines animation best practices for Soft UI. All AI agents and developers should follow these guidelines.

## Documentation Resources

| Document | Purpose | When to Use |
|----------|---------|-------------|
| `CLAUDE.md` | Claude Code implementation guidelines | When building or modifying components |
| `AGENTS.md` | General AI agent guidelines | For Codex or other AI tools |
| `ANIMATION.md` | Animation best practices | When adding motion to components |
| `COMPONENTS.md` | Component API reference | When implementing with Base UI primitives |
| `UX-GUIDE.md` | Design patterns & component selection | When deciding which component to use |

---

## Core Principles

- **UI animations must not exceed 300ms** - Keep the interface feeling fast and responsive
- **Prefer spring animations** - More natural feel than easing curves
- **Avoid bouncy springs** - Unless working with drag gestures
- **Animate from the trigger** - Set `transform-origin` to animate from the source element

---

## Easing Functions

Use custom easing functions over built-in CSS easings for more natural motion.

### ease-out (Elements entering/exiting, user interactions)

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

### ease-in (Avoid - makes UI feel slow)

```css
--ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
--ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
--ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
--ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
--ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
--ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);
```

---

## Duration & Timing

| Context | Recommendation |
|---------|----------------|
| Hover transitions | `transition: property 200ms ease` |
| Micro-interactions | 150ms or less |
| Standard UI elements | 200-250ms |
| Modals/drawers | 250-300ms max |

**Never exceed 300ms** for UI animations. Longer durations are only acceptable for illustrative/decorative animations.

---

## Spring Animations (Motion/Framer Motion)

### Configuration

**Always use `bounce` and `duration`** instead of `stiffness`, `mass`, `damping`. This is more intuitive and easier to adjust.

```tsx
// Preferred - intuitive and easy to adjust
const transition = {
  type: "spring",
  bounce: 0.4,    // 0 = no bounce, 1 = very bouncy
  duration: 0.5   // total duration in seconds
}

// Avoid - harder to reason about
const transition = {
  type: "spring",
  stiffness: 300,
  mass: 1,
  damping: 20
}
```

### Standard Presets

| Name | Config | Use Cases |
|------|--------|-----------|
| Instant/Snappy | `bounce: 0, duration: 0.15` | Micro-interactions, icon swaps, tooltips |
| Fast/Responsive | `bounce: 0, duration: 0.2` | Buttons, toggles, small state changes |
| Smooth/Subtle | `bounce: 0.1, duration: 0.25` | Modals, dropdowns, panels |
| Expressive | `bounce: 0.2, duration: 0.3` | Onboarding, celebrations, attention-grabbing |

---

## Performance

### Do
- Animate `opacity` and `transform` properties
- Use `transform` instead of `x`/`y` for hardware acceleration
- Keep blur values ≤ 20px

### Don't
- Animate `top`, `left`, `width`, `height` - use `transform` instead
- Animate drag gestures with CSS variables
- Overuse `will-change` - only for `transform`, `opacity`, `clipPath`, `filter`

```tsx
// Preferred - hardware accelerated
<motion.div style={{ transform: "translateX(100px)" }} />

// Avoid - not hardware accelerated
<motion.div animate={{ x: 100 }} />
```

---

## Base UI Integration

### Adding animations to components

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

---

## Quick Reference

| Animation Type | Duration | Easing/Spring |
|---------------|----------|---------------|
| Hover states | 200ms | `ease` or `ease-out` |
| Button press | 150ms | `bounce: 0, duration: 0.15` |
| Modal enter | 250ms | `bounce: 0.1, duration: 0.25` |
| Modal exit | 200ms | `bounce: 0, duration: 0.2` |
| Dropdown | 200ms | `bounce: 0, duration: 0.2` |
| Toast enter | 250ms | `bounce: 0.1, duration: 0.25` |
| Tooltip | 150ms | `bounce: 0, duration: 0.15` |
