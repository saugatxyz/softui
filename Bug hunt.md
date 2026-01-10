# Bug Hunt - Visual Bug Solutions

This document tracks visual bugs found during the codexrefactor and provides solutions by comparing against the main branch implementations.

**Status Legend:**
- [ ] Not started
- [~] In progress
- [x] Fixed

---

## 1. Autocomplete - Width, Gap, and Focus Ring
**Status:** [x] Fixed
**Review:** Code review pending (width fix)

### Problem
- Suggestion dropdown doesn't match the width of the trigger field
- Missing 4px gap between the field and menu
- Focus ring not showing when tabbing with keyboard (but correctly hidden on mouse click)

### Solution from Main Branch

**File:** `src/components/ui/autocomplete.tsx`

Main branch has:
1. **Width matching:** The Popup uses `min-w-[var(--anchor-width)]` to match trigger width
2. **Gap:** `sideOffset={4}` on the Positioner component
3. **Focus ring:** Main branch tracks mouse focus with `isMouseFocus` state and conditional focus ring

**Codexrefactor Issue:**
- Currently uses `has-[:focus-visible]` which is CSS-only approach
- Missing `sideOffset` default on Positioner (needs to be 4)

### Implementation

```tsx
// In AutocompletePositioner - add sideOffset default:
function AutocompletePositioner({
  sideOffset = 4, // Add this default
  ...props
}: AutocompletePositionerProps) {
  // ...
}

// For focus ring that only shows on keyboard:
// Option A: Use isMouseFocus state tracking (main branch approach)
const [isMouseFocus, setIsMouseFocus] = React.useState(false)
const handleMouseDown = () => setIsMouseFocus(true)
const handleFocus = () => { /* only show ring if !isMouseFocus */ }
const handleBlur = () => setIsMouseFocus(false)

// Option B: Use focus-visible CSS (simpler, browser-native)
// Already using has-[:focus-visible] - verify it's working correctly
```

### Alternative Solutions
1. **CSS-only width:** Use `min-w-[var(--anchor-width)]` on popup (already present, verify it's applied)
2. **For focus ring:** Could use `:focus-visible` pseudo-class directly on the input element instead of container-based approach

### Width Fix Implementation (Added)

**Root Cause:** Base UI's Positioner defaults to anchoring on the Input element, not the visual container. The Input is narrower than the styled container (which includes icons/padding).

**Solution Applied:**
1. Added React Context (`AutocompleteContext`) to share container ref between Root and Positioner
2. Added `containerRef` to Root component, attached to the outer styled div
3. Positioner now uses `anchor={context?.containerRef}` to anchor on the full container

**Why this is NOT modifying Base UI behavior:**
- `anchor` is a standard Base UI Positioner prop designed for this exact use case
- We're using Base UI's API, not overriding internal state or behavior
- Same pattern as passing `sideOffset` or `align` - just configuration

**Files changed:**
- `src/components/ui/autocomplete.tsx`
- `src/components/ui/list-item-styles.tsx` (removed conflicting max-w-[400px])

---

## 2. Button Group - Clickable Area
**Status:** [x] Fixed
**Review:** Approved

### Problem
Whole container not clickable for button group segments - only text within the button is clickable.

### Solution from Main Branch

**File:** `src/components/ui/button-group.tsx`

Main branch structure ensures the entire segment is clickable by:
1. Making the button element itself have full padding
2. Not adding extra padding to nested label elements

**Codexrefactor Issue:**
The `ButtonGroupItem` may have reduced clickable area due to nested span with padding.

### Implementation

```tsx
// Ensure the outer button element has the full padding, not inner spans
const itemVariants = cva(
  "...",
  {
    compoundVariants: [
      // Padding should be on the button itself
      { size: "s", className: "px-[var(--space-12)]" },
      // NOT on the inner label span
    ],
  }
)
```

### Alternative Solutions
1. Add `w-full h-full` to inner content wrapper
2. Use `pointer-events-none` on label and `pointer-events-auto` on button
3. Remove nested spans and make button directly hold the content

---

## 3. Checkbox - Label Alignment
**Status:** [x] Fixed
**Review:** Approved

### Problem
Checkbox label not aligned side by side like CheckboxGroup items.

### Solution from Main Branch

**File:** `src/components/ui/checkbox.tsx`

Main branch `Checkbox` component includes built-in label/description support with side-by-side layout:

```tsx
// Main branch has:
function Checkbox({ label, description, ...props }) {
  return (
    <label className="group inline-flex cursor-pointer items-start gap-[var(--space-12)]">
      {/* Label and description */}
      {(hasLabel || hasDescription) && (
        <span className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)]">
          {hasLabel && <span data-slot="label" className="...">{label}</span>}
          {hasDescription && <span data-slot="description" className="...">{description}</span>}
        </span>
      )}
      {/* Checkbox control */}
      <span className="flex h-[20px] shrink-0 items-center">
        <CheckboxControl {...} />
      </span>
    </label>
  )
}
```

**Codexrefactor Issue:**
Current implementation is just a pass-through to CheckboxControl without label support.

### Implementation
Add `label` and `description` props to Checkbox component with the same layout as CheckboxGroupItem uses.

### Alternative Solutions
1. Use CheckboxGroupItem with `type="simple"` instead of standalone Checkbox
2. Wrap Checkbox in Field component with external label

---

## 4. Combobox - Focus, Menu, and Empty State
**Status:** [x] Fixed
**Review:** Code review pending (width fix)

### Problem
- Same focus ring issue as Autocomplete (not showing on keyboard tab)
- Menu positioning/gap issues
- "Without icon" empty state example incorrectly shows an icon

### Solution from Main Branch

**File:** `src/components/ui/combobox.tsx`

Main branch has:
1. **Focus ring:** Mouse focus tracking with `isMouseFocus` state
2. **Menu gap:** `sideOffset={4}` default on Positioner
3. **Empty state:** Uses `ComboboxEmpty` component without icon prop for "no icon" variant

### Implementation

```tsx
// Add sideOffset default to ComboboxPositioner
function ComboboxPositioner({
  sideOffset = 4,
  ...props
}: ComboboxPositionerProps)

// Fix empty state example in docs - remove icon prop for "without icon" example
<ComboboxEmpty>No results found</ComboboxEmpty>
```

### Width Fix Implementation (Added)

**Root Cause:** Same as Autocomplete - Base UI's Positioner defaults to anchoring on the Input element.

**Solution Applied:**
1. Added React Context (`ComboboxContext`) to share container ref between Root and Positioner
2. Added `containerRef` to Root component, attached to the outer styled div
3. Positioner now uses `anchor={context?.containerRef}` to anchor on the full container

**Why this is NOT modifying Base UI behavior:**
- `anchor` is a standard Base UI Positioner prop designed for this exact use case
- We're using Base UI's API, not overriding internal state or behavior

**Files changed:**
- `src/components/ui/combobox.tsx`

---

## 5. Field / Input - Text Color and Focus Ring
**Status:** [x] Fixed
**Review:** Partial - focus ring approved

### Problem
- Input text doesn't have the correct color (should match typed text color)
- Focus ring shows on mouse click (should only show on keyboard tab)

### Solution from Main Branch

**File:** `src/components/ui/input.tsx`

Main branch has `focusVisibleOnly` prop with mouse detection:

```tsx
type InputProps = {
  focusVisibleOnly?: boolean // default true
}

function Input({ focusVisibleOnly = true, ...props }) {
  const [showFocusRing, setShowFocusRing] = React.useState(false)
  const wasMouseDown = React.useRef(false)

  const handleMouseDown = () => {
    wasMouseDown.current = true
  }

  const handleFocus = () => {
    if (focusVisibleOnly) {
      setShowFocusRing(!wasMouseDown.current)
    } else {
      setShowFocusRing(true)
    }
    wasMouseDown.current = false
  }

  const handleBlur = () => {
    setShowFocusRing(false)
    wasMouseDown.current = false
  }
}
```

**Text color:** Ensure input uses `text-content-strong` for entered text (not placeholder color).

### Implementation
Add `focusVisibleOnly` prop and mouse tracking logic to Input component.

### Alternative Solutions
1. Use CSS `:focus-visible` instead of JS tracking
2. Apply `outline-none focus-visible:shadow-[...]` directly to input

---

## 6. Fieldset - Focus Ring on Mouse Click
**Status:** [x] Fixed
**Review:** Approved

### Problem
Focus ring shows when clicking with mouse (should only show on keyboard tab).

### Solution
Same as Field/Input - apply `focusVisibleOnly` pattern or use CSS `:focus-visible`.

### Implementation
```tsx
// Use focus-visible instead of focus
className="focus-visible:shadow-[...] focus:outline-none"
```

---

## 7. Filter - Menu Container Padding
**Status:** [x] Fixed

### Problem
Menu container in Filter examples doesn't have same padding as other menu containers.

### Solution from Main Branch

Menu containers should use consistent padding from `listPopupStyles`:

```tsx
// In list-item-styles.ts
export const listPopupStyles = {
  base: "rounded-[var(--radius-12)] bg-surface-overlay shadow-overlay p-[var(--space-4)]",
  // ...
}
```

**Issue in docs:** Filter examples may be using Menu.Popup without the standard padding.

### Implementation
Ensure Filter docs examples wrap menu content in proper padding container:

```tsx
<Menu.Popup>
  <div className="flex flex-col gap-[var(--space-2)] p-[var(--space-4)]">
    {/* menu items */}
  </div>
</Menu.Popup>
```

Or ensure Menu.Popup applies `p-[var(--space-4)]` by default.

---

## 8. FileIcon - Hex Display in Documentation
**Status:** [x] Fixed

### Problem
FileIcon documentation displays hex color values which should be removed or not use raw hex.

### Solution

**File:** `src/app/docs/file-icon/page.tsx`

The docs page displays hex colors like `#3B82F6` next to each file type icon.

### Implementation
Either:
1. Remove the hex display entirely
2. Replace hex with token name if applicable

```tsx
// Current (showing hex):
<span className="text-body-xs text-content-subtle">{color}</span>

// Option 1: Remove entirely
// (just remove this line)

// Option 2: Show descriptive text instead
<span className="text-body-xs text-content-subtle">{label} icon</span>
```

---

## 9. File Upload - Gap Issues
**Status:** [x] Fixed

### Problem
- Gap between file upload dropzone and uploaded files should be 2px
- Gap between multiple uploaded files should be 2px
- Seen specifically in "simulated upload" example

### Solution from Main Branch

**File:** `src/components/ui/file-upload.tsx`

Check the gap values in the file upload container and file list:

```tsx
// Should use 2px gap (var(--space-2))
<div className="flex flex-col gap-[var(--space-2)]">
  {/* File upload zone */}
  {/* Uploaded files list */}
</div>
```

### Implementation
Update gap values to `gap-[var(--space-2)]` (2px) instead of larger values.

---

## 10. Form - Validation Display and Focus Ring
**Status:** [x] Fixed
**Review:** Approved

### Problem
- Form examples don't show validation states
- Focus ring shows on mouse click (should only show on keyboard tab)

### Solution

**Validation:** Form validation needs `required`, `validate` props, and error states displayed.

**Focus ring:** Apply same `focusVisibleOnly` pattern to all form input elements.

### Implementation

```tsx
// Validation example
<Form onSubmit={handleSubmit}>
  <Field.Root required validate={(value) => value ? undefined : "Required"}>
    <Field.Label>Email</Field.Label>
    <Field.Control render={<Input />} />
    <Field.Error />
  </Field.Root>
</Form>
```

---

## 11. Input - Focus Ring on Mouse Click
**Status:** [x] Fixed
**Review:** Approved

### Problem
Same as Field - focus ring shows on mouse click.

### Solution
Apply `focusVisibleOnly` pattern (see Bug #5).

---

## 12. Input Group - Focus Ring Shows on Multiple Segments
**Status:** [x] Fixed
**Review:** Approved

### Problem
When focusing Input Group, focus ring shows on both the input segment AND prefix/suffix segments. Should only focus one segment at a time.

### Solution from Main Branch

**File:** `src/components/ui/input-group.tsx`

Main branch tracks focus state per segment and only shows focus ring on the actively focused segment.

**Codexrefactor Issue:**
Current implementation uses `has-[:focus-visible]` on container which highlights entire container, plus individual segment focus rings - causing double rings.

### Implementation

Remove container-level focus ring and keep only segment-level:

```tsx
// Remove from container:
// "has-[:focus-visible]:shadow-[...]"

// Keep only on individual segments:
<div data-slot="field" className={cn(
  // Only show focus ring when THIS segment's input is focused
  "focus-within:shadow-[...]"
)}>
```

Or use the `focusVisibleOnly` state tracking approach to conditionally apply focus ring only to the active segment.

---

## 13. Menu - Checkbox and Radio Selection Icons
**Status:** [x] Fixed

### Problem
Menu checkbox and radio item selections don't show check icons.

### Solution from Main Branch

**File:** `src/components/ui/menu.tsx`

MenuCheckboxItem and MenuRadioItem need to include a check indicator that appears when selected:

```tsx
function MenuCheckboxItem({ children, ...props }) {
  return (
    <MenuPrimitive.CheckboxItem {...props}>
      <MenuPrimitive.CheckboxItemIndicator>
        <RiCheckFill className="size-[16px]" />
      </MenuPrimitive.CheckboxItemIndicator>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}
```

**Codexrefactor Issue:**
Current implementation doesn't include the CheckboxItemIndicator/RadioItemIndicator with check icon.

### Implementation
Add indicator components with check icon to MenuCheckboxItem and MenuRadioItem.

---

## 14. Select - Positioning, Width, and Gap
**Status:** [x] Fixed
**Review:** Code review pending (alignItemWithTrigger fix)

### Problem
Same issues as Autocomplete - menu doesn't match trigger width, missing gap. Additionally, popup positioning seemed "random" - changing based on which item was selected.

### Solution from Main Branch

**File:** `src/components/ui/select.tsx`

Main branch has:
1. `sideOffset={4}` on Positioner
2. Popup uses `min-w-[var(--anchor-width)]` for width matching
3. `alignItemWithTrigger={false}` for consistent positioning

### Implementation

```tsx
// Ensure SelectPositioner has sideOffset default
function SelectPositioner({
  sideOffset = 4,
  ...props
}: SelectPositionerProps)

// Ensure SelectPopup matches anchor width
className={cn(listPopupStyles.base, "min-w-[var(--anchor-width)]")}
```

### Positioning Fix Implementation (Added)

**Root Cause:** Base UI's `alignItemWithTrigger` prop defaults to `true`, which causes:
- Popup overlaps trigger to align selected item text with trigger text (macOS-style picker)
- Position changes based on which item is currently selected
- Falls back inconsistently based on viewport space or touch interaction

**Solution Applied:**
Added `alignItemWithTrigger={false}` to SelectPositioner for standard dropdown behavior (popup appears below trigger with consistent 4px gap).

**Why this is NOT modifying Base UI behavior:**
- `alignItemWithTrigger` is a standard Base UI Positioner prop
- We're configuring it to use standard dropdown positioning vs macOS-style picker
- This is the intended use of the prop per Base UI docs

**Files changed:**
- `src/components/ui/select.tsx`
- `src/components/ui/list-item-styles.tsx` (removed conflicting `max-w-[400px]`)

### Note: Width Fix

**Why Select width works but Autocomplete/Combobox needed anchor fix:**
- Select: `SelectPrimitive.Trigger` IS the full-width styled button - Base UI correctly uses it as the anchor
- Autocomplete/Combobox: Have a styled container div with an Input inside - Base UI defaults to anchoring on the Input, which is narrower

Select only needed the `list-item-styles.tsx` fix for width (removing conflicting `max-w-[400px]`).

---

## 15. Segmented Control - Hover Text Color
**Status:** [x] Fixed

### Problem
When hovering on inactive segment, text color should change to `content-strong`.

### Solution from Main Branch

**File:** `src/components/ui/segmented-control.tsx`

Both branches have similar hover styling, but verify the hover state properly changes text to `content-strong`:

```tsx
// Current (in itemVariants):
"hover:not-data-[disabled]:not-data-[active]:text-content-default"

// Should be:
"hover:not-data-[disabled]:not-data-[active]:text-content-strong"
```

### Implementation
Change hover text color from `content-default` to `content-strong`.

---

## 16. Switch - Label Side by Side
**Status:** [x] Fixed
**Review:** Approved

### Problem
Switch and label should be displayed side by side.

### Solution from Main Branch

**File:** `src/components/ui/switch.tsx`

Main branch has built-in label support:

```tsx
function Switch({ label, description, position = "right", ...props }) {
  return (
    <label className="group inline-flex cursor-pointer items-start gap-[var(--space-12)]">
      {/* Label and description */}
      <span className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)]">
        <span data-slot="label">{label}</span>
        <span data-slot="description">{description}</span>
      </span>
      {/* Switch control */}
      <span className="flex h-[20px] shrink-0 items-center">
        <SwitchControl {...} />
      </span>
    </label>
  )
}
```

**Codexrefactor Issue:**
Current Switch is just a pass-through to SwitchControl without label support.

### Implementation
Add `label`, `description`, and `position` props to Switch component.

---

## 17. Tabs - Keyboard Navigation
**Status:** [x] Fixed
**Review:** Pending - focus ring update

### Problem
Keyboard navigation (arrow keys, Tab) not working for Tabs component.

### Solution

Base UI's Tabs primitive should handle keyboard navigation automatically. If it's not working, the issue may be:

1. Missing `tabindex` on Tab elements
2. Custom event handlers blocking default behavior
3. Focus management being overridden

### Implementation

Verify Base UI props are being passed through correctly:

```tsx
<TabsPrimitive.Tab
  // Ensure no custom keyboard handlers are blocking
  // Base UI handles Arrow Left/Right navigation
  {...props}
>
```

Check if any `onKeyDown` handlers are preventing default behavior.

---

## 18. Toggle Button - Icon Not Changing, On/Off Not Working
**Status:** [x] Fixed
**Review:** Approved

### Problem
- Icon doesn't change between pressed/unpressed states
- Toggle on/off functionality not working

### Solution from Main Branch

**File:** `src/components/ui/toggle-button.tsx`

Main branch has a sophisticated implementation with:
1. `icon` and `pressedIcon` props for icon switching
2. `MorphingIcon` component for animated transitions
3. State tracking for animation sync

**Codexrefactor Issue:**
Current implementation uses simple `leadingIcon`/`trailingIcon` without pressed state variants.

### Implementation

Add pressed icon support:

```tsx
type ToggleButtonProps = {
  icon: React.ReactNode      // Icon when unpressed
  pressedIcon?: React.ReactNode  // Icon when pressed (falls back to icon)
  pressedTone?: ToneType     // Color tone when pressed
}

// Use data-[pressed] attribute for CSS-based styling
className="data-[pressed]:bg-... data-[pressed]:text-..."
```

For icon switching, either:
1. Use conditional rendering based on pressed state
2. Implement MorphingIcon component from main branch

---

## 19. Toggle Group - Icon Change Not Working
**Status:** [x] Fixed
**Review:** Approved

### Problem
Icons in Toggle Group items don't change when pressed. Only background changes.

### Solution from Main Branch

**File:** `src/components/ui/toggle-group.tsx`

Main branch implementation:
1. Tracks `currentValue` in context to determine pressed state
2. Uses `MorphingIcon` component for icon transitions
3. Supports `icon`, `pressedIcon`, and `pressedTone` props

**Codexrefactor Issue:**
Current implementation uses static `leadingIcon`/`trailingIcon` without pressed variants.

### Implementation

Similar to Toggle Button - add pressed icon support:

```tsx
type ToggleGroupItemProps = {
  icon: React.ReactNode
  pressedIcon?: React.ReactNode
  pressedTone?: ToneType
}

// Derive pressed state from context
const { currentValue } = useToggleGroup()
const pressed = currentValue.includes(value)

// Render appropriate icon based on pressed state
{pressed ? pressedIcon ?? icon : icon}
```

---

## 20. Group Card Variant - Icon Alignment
**Status:** [x] Fixed
**Review:** Approved

### Problem
In small card variant of Switch Group, Checkbox Group, and Radio Group:
- Icons don't align properly when there's a description
- Icon should be centered when only title present
- Icon should be top-aligned and balanced when description present

### Solution from Main Branch

**File:** `src/components/ui/checkbox-group-item.tsx` (and similar for switch/radio)

Main branch uses conditional alignment based on description presence:

```tsx
{showPrefix && (
  <span
    data-slot="prefix-wrapper"
    className={cn(
      "flex shrink-0 items-center self-start",
      // When description exists, offset icon slightly
      isPrefixPlainIcon && showDescription && "-mt-[2px]"
    )}
  >
    {prefixWithSize}
  </span>
)}
```

**Codexrefactor Issue:**
The offset logic may be using wrong token (`-mt-[var(--space-2)]` instead of `-mt-[2px]`).

### Implementation

For card variants with icons:
1. When only title: `items-center` alignment (vertically centered)
2. When title + description: `self-start` with small negative margin for visual balance

```tsx
className={cn(
  "flex shrink-0",
  showDescription ? "self-start -mt-[2px]" : "items-center"
)}
```

---

## 21. Field Docs - Filled State Text Color
**Status:** [x] Fixed
**Review:** Code review pending

### Problem
In Field docs page, the "With Different Controls" section showed placeholder states for both Input and Select examples. The text was using placeholder color (`text-content-muted`) when it should demonstrate filled/selected state with proper text color (`text-content-strong`).

### Root Cause Analysis
Both "With Input" and "With Select" examples were using `placeholder` prop without any `defaultValue`:
- Input: `<Input placeholder="John Doe" />` - shows placeholder text
- Select: `<SelectDemo options={...} placeholder="Select country" />` - shows placeholder text

Base UI correctly applies `data-placeholder` attribute when no value is selected, which triggers `text-content-muted` color. This is correct behavior - the examples were simply showing placeholder state rather than filled state.

### Solution Applied
Updated the docs to show filled/selected states:

**File:** `src/app/docs/field/page.tsx`

```diff
- <Input placeholder="John Doe" />
+ <Input defaultValue="John Doe" />

- <SelectDemo options={countries} placeholder="Select country" />
+ <SelectDemo options={countries} defaultValue="us" placeholder="Select country" />
```

### Why This Is the Correct Fix
- No component code changes needed - styling was already correct
- The issue was documentation examples not demonstrating the intended state
- With `defaultValue` set, Base UI removes the `data-placeholder` attribute
- Text color correctly changes to `text-content-strong`

---

## Summary Priority List

### High Priority (Affects functionality)
1. Bug #17 - Tabs keyboard navigation
2. Bug #18 - Toggle Button on/off not working
3. Bug #19 - Toggle Group icon not changing
4. Bug #13 - Menu checkbox/radio icons missing

### Medium Priority (UX/Visual consistency)
5. Bug #1 - Autocomplete width/gap/focus
6. Bug #4 - Combobox focus/menu/empty state
7. Bug #5 - Field/Input text color and focus
8. Bug #12 - Input Group double focus ring
9. Bug #14 - Select positioning/width/gap

### Lower Priority (Styling refinements)
10. Bug #2 - Button Group clickable area
11. Bug #3 - Checkbox label alignment
12. Bug #6 - Fieldset focus ring
13. Bug #7 - Filter menu padding
14. Bug #8 - FileIcon hex display
15. Bug #9 - File Upload gaps
16. Bug #10 - Form validation display
17. Bug #11 - Input focus ring
18. Bug #15 - Segmented Control hover color
19. Bug #16 - Switch label side by side
20. Bug #20 - Group card icon alignment

---

## General Patterns Found

### Focus Ring Pattern
Many components need the `focusVisibleOnly` pattern. Standard implementation:

```tsx
const [showFocusRing, setShowFocusRing] = React.useState(false)
const wasMouseDown = React.useRef(false)

const handleMouseDown = () => { wasMouseDown.current = true }
const handleFocus = () => {
  setShowFocusRing(!wasMouseDown.current)
  wasMouseDown.current = false
}
const handleBlur = () => {
  setShowFocusRing(false)
  wasMouseDown.current = false
}

// Apply: showFocusRing && "shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]"
```

**Alternative:** Use CSS `:focus-visible` pseudo-class (simpler but less control).

### Dropdown Positioning Pattern
All dropdown components (Autocomplete, Combobox, Select, Menu) should have:
- `sideOffset={4}` on Positioner
- `min-w-[var(--anchor-width)]` on Popup for width matching

### Label Pattern
Components needing inline labels (Checkbox, Switch, Radio) should follow the same pattern:
```tsx
<label className="inline-flex items-start gap-[var(--space-12)]">
  <span className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)]">
    <span data-slot="label">{label}</span>
    <span data-slot="description">{description}</span>
  </span>
  <span className="flex h-[20px] shrink-0 items-center">
    {/* Control */}
  </span>
</label>
```

---
---

# Part 2: Missing Animations

This section documents all animations that existed in the main branch but were removed or simplified during the refactor.

## Animation Inventory

### Components WITH motion animations in main branch:
| Component | Has Motion in Main | Has Motion in Refactor | Status |
|-----------|-------------------|------------------------|--------|
| accordion.tsx | ✅ | ❌ | **Missing** |
| alert-dialog.tsx | ✅ | ❌ | **Missing** |
| dialog.tsx | ✅ | ❌ | **Missing** |
| file-upload.tsx | ✅ | ✅ | OK |
| slider.tsx | ✅ | ✅ | OK |
| switch-control.tsx | ✅ | ❌ | **Missing** |
| toggle-button.tsx | ✅ | ❌ | **Missing** |
| toggle-group.tsx | ✅ | ❌ | **Missing** |
| tooltip.tsx | ✅ | ✅ | OK |

---

## 22. Accordion - Expand/Collapse Animation
**Status:** [ ] Not started

### Missing Animations
1. **Chevron rotation** - Arrow icon rotates 180° when item opens
2. **Height animation** - Content expands/collapses with spring animation
3. **Opacity fade** - Content fades in/out during transition

### Main Branch Implementation

**File:** `src/components/ui/accordion.tsx`

```tsx
import { AnimatePresence, motion } from "motion/react"

// Chevron rotation in AccordionTrigger
<motion.span
  className="flex size-[20px] shrink-0 items-center justify-center"
  animate={{ rotate: isOpen ? 180 : 0 }}
  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
>
  <ArrowDownIcon className="size-[16px]" />
</motion.span>

// Content expand/collapse in AccordionContent
<AnimatePresence initial={false} mode="popLayout">
  {isOpen && (
    <motion.div
      initial={{ height: 0 }}
      animate={{
        height: "auto",
        transition: { type: "spring", bounce: 0, duration: 0.4 }
      }}
      exit={{
        height: 0,
        transition: { type: "spring", bounce: 0, duration: 0.4 }
      }}
      style={{ willChange: "height", transform: "translateZ(0)" }}
    >
      <motion.div
        className="pt-[var(--space-6)] pb-[var(--space-16)]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.2, delay: 0.1 },
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.1 },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

### Requirements to Restore
1. Add `motion` and `AnimatePresence` imports
2. Track open state via context (AccordionRootContext with `openValues`)
3. Replace static chevron with `motion.span` for rotation
4. Wrap content with AnimatePresence and motion.div for height/opacity

### Animation Specs
| Animation | Type | Duration | Bounce | Delay |
|-----------|------|----------|--------|-------|
| Chevron rotation | Spring | 0.4s | 0 | - |
| Height expand/collapse | Spring | 0.4s | 0 | - |
| Content fade in | Tween | 0.2s | - | 0.1s |
| Content fade out | Tween | 0.1s | - | - |

---

## 23. Alert Dialog - Enter/Exit Animation
**Status:** [ ] Not started

### Missing Animations
1. **Backdrop fade** - Opacity fade in/out
2. **Popup scale** - Scale and translate animation

### Main Branch Implementation

**File:** `src/components/ui/alert-dialog.tsx`

```tsx
import { AnimatePresence, motion } from "motion/react"

const springTransition = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.15,
}

// Context to track open state for AnimatePresence
const AlertDialogContext = React.createContext<{ open: boolean }>({ open: false })

// AlertDialogBackdrop with animation
<AlertDialogPrimitive.Backdrop
  render={
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={springTransition}
    />
  }
  {...props}
/>

// AlertDialogPopup with animation
<AlertDialogPrimitive.Popup
  render={
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 8 }}
      transition={springTransition}
    />
  }
  {...props}
>
```

### Requirements to Restore
1. Add context to track `open` state
2. Wrap Portal children with `AnimatePresence`
3. Use `render` prop on Backdrop/Popup with motion.div

### Animation Specs
| Animation | Type | Duration | Bounce |
|-----------|------|----------|--------|
| Backdrop fade | Spring | 0.15s | 0 |
| Popup scale/translate | Spring | 0.15s | 0 |

---

## 24. Dialog - Enter/Exit Animation
**Status:** [ ] Not started

### Missing Animations
1. **Backdrop fade** - Opacity fade in/out
2. **Popup animation** - Different animations per position:
   - Center: scale + opacity + y-translate
   - Right: x-translate + opacity
   - Sheet: y-translate + opacity

### Main Branch Implementation

**File:** `src/components/ui/dialog.tsx`

```tsx
import { AnimatePresence, motion } from "motion/react"

const springTransition = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.15,
}

// Position-based animations
const animations = {
  center: {
    initial: { opacity: 0, scale: 0.95, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 8 },
  },
  right: {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 16 },
  },
  sheet: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 16 },
  },
}

// DialogBackdrop
<DialogPrimitive.Backdrop
  render={
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={springTransition}
    />
  }
/>

// DialogPopup
<DialogPrimitive.Popup
  render={
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={position === "center" ? springTransition : { ...springTransition, duration: 0.2 }}
    />
  }
>
```

### Requirements to Restore
1. Add context to track `open` state for AnimatePresence
2. Define position-based animation variants
3. Use `render` prop with motion.div on Backdrop and Popup

### Animation Specs
| Position | Animation | Type | Duration |
|----------|-----------|------|----------|
| Center | Scale + Y + Opacity | Spring | 0.15s |
| Right | X + Opacity | Spring | 0.2s |
| Sheet | Y + Opacity | Spring | 0.2s |

---

## 25. Switch Control - Thumb Slide Animation
**Status:** [ ] Not started

### Missing Animations
1. **Thumb slide** - Spring animation when toggling

### Current vs Main Branch

**Current (CSS transition):**
```tsx
<Switch.Thumb
  className={cn(
    "transition-transform duration-200 ease-out",
    "group-data-[checked]:translate-x-[16px]"
  )}
/>
```

**Main Branch (Motion spring):**
```tsx
import { motion, type Transition } from "motion/react"

const thumbTransition: Transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.25,
}

// Track internal state for animation
const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
const isChecked = controlledChecked ?? internalChecked

<Switch.Root>
  <Switch.Thumb
    render={
      <motion.span
        data-slot="switch-thumb"
        initial={false}
        animate={{
          x: isChecked ? 16 : 0,
        }}
        transition={thumbTransition}
        className="..."
      />
    }
  />
</Switch.Root>
```

### Requirements to Restore
1. Add internal state tracking for animation sync
2. Replace CSS transition with motion.span
3. Use `render` prop on Switch.Thumb

### Animation Specs
| Animation | Type | Duration | Bounce |
|-----------|------|----------|--------|
| Thumb slide | Spring | 0.25s | 0.1 |

### Alternative
Keep CSS `transition-transform duration-200 ease-out` if spring feel is not critical.

---

## 26. Toggle Button - Icon Morphing Animation
**Status:** [ ] Not started

### Missing Animations
1. **Icon fade** - Smooth crossfade between icons
2. **Icon morph** - Scale + blur + y-translate for dramatic transitions
3. **Label width** - Animated width change for label text

### Main Branch Implementation

**File:** `src/components/ui/toggle-button.tsx`

```tsx
import { motion } from "motion/react"

// MorphingIcon component for icon transitions
function MorphingIcon({ pressed, icon, pressedIcon, morph }) {
  // Simple fade (morph: false)
  if (!morph) {
    return (
      <span className="relative" style={{ width: size, height: size }}>
        <motion.span
          className="absolute inset-0"
          animate={{ opacity: pressed ? 0 : 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {icon}
        </motion.span>
        <motion.span
          className="absolute inset-0"
          animate={{ opacity: pressed ? 1 : 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {pressedIcon ?? icon}
        </motion.span>
      </span>
    )
  }

  // Morph animation (morph: true)
  return (
    <span className="relative" style={{ width: size, height: size }}>
      <motion.span
        animate={{
          y: pressed ? -8 : 0,
          scale: pressed ? 0.5 : 1,
          opacity: pressed ? 0 : 1,
          filter: pressed ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.25 }}
      >
        {icon}
      </motion.span>
      <motion.span
        animate={{
          y: pressed ? 0 : 8,
          scale: pressed ? 1 : 0.5,
          opacity: pressed ? 1 : 0,
          filter: pressed ? "blur(0px)" : "blur(8px)",
        }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.25 }}
      >
        {pressedIcon ?? icon}
      </motion.span>
    </span>
  )
}

// Label width animation
{currentWidth !== undefined && (
  <motion.span
    className="inline-block overflow-hidden whitespace-nowrap"
    animate={{ width: currentWidth }}
    transition={{ type: "spring", bounce: 0.15, duration: 0.25 }}
  >
    {currentLabel}
  </motion.span>
)}
```

### Requirements to Restore
1. Track `animationPressed` state synced with Base UI
2. Implement MorphingIcon component
3. Add `icon`, `pressedIcon`, `morph` props
4. Add label width animation support

### Animation Specs
| Animation | Type | Duration | Bounce |
|-----------|------|----------|--------|
| Icon fade | Tween | 0.15s | - |
| Icon morph (scale/blur/y) | Spring | 0.25s | 0.2 |
| Label width | Spring | 0.25s | 0.15 |

---

## 27. Toggle Group - Icon Morphing Animation
**Status:** [ ] Not started

### Missing Animations
Same as Toggle Button:
1. **Icon fade/morph** - Between pressed/unpressed icons
2. **Label width** - Animated width transitions

### Main Branch Implementation

**File:** `src/components/ui/toggle-group.tsx`

Shares the same `MorphingIcon` component pattern as Toggle Button.

Key difference: Derives `pressed` state from group context:

```tsx
const { currentValue } = useToggleGroup()
const pressed = currentValue.includes(value)
```

### Requirements to Restore
1. Add `currentValue` to ToggleGroupContext
2. Track value changes via `onValueChange`
3. Implement same MorphingIcon component
4. Add `icon`, `pressedIcon`, `pressedTone`, `morph` props to ToggleGroupItem

---

## Animation Standards Reference

### Spring Presets

| Name | Config | Use Case |
|------|--------|----------|
| Instant | `bounce: 0, duration: 0.15` | Quick feedback (dialogs, tooltips) |
| Fast | `bounce: 0, duration: 0.2` | Standard UI transitions |
| Smooth | `bounce: 0.1, duration: 0.25` | Switch thumb, toggle icons |
| Expressive | `bounce: 0.2, duration: 0.25-0.3` | Icon morphs, emphasis |
| Slow | `bounce: 0, duration: 0.4` | Accordion expand/collapse |

### Tween Presets

| Duration | Use Case |
|----------|----------|
| 0.1s | Quick fade out |
| 0.15s | Icon crossfade |
| 0.2s | Standard transitions |

### Hardware Acceleration
Always use `transform: translateZ(0)` or `willChange: "height"` for animated height changes.

---

## Summary: Animation Restoration Priority

### High Priority
1. **Bug #26 - Toggle Button** - Core functionality relies on icon/state animations
2. **Bug #27 - Toggle Group** - Same as Toggle Button
3. **Bug #25 - Switch Control** - Spring feel important for toggle UX

### Medium Priority
4. **Bug #24 - Dialog** - Polish for modal experience
5. **Bug #23 - Alert Dialog** - Same as Dialog
6. **Bug #22 - Accordion** - Expand/collapse polish

### Notes
- **File Upload, Slider, Tooltip** already have motion animations
- CSS transitions (`transition-*`) are still present in most components for hover/focus states
- Consider keeping CSS transitions for simple hover states, use motion for:
  - State changes (pressed, checked, open)
  - Complex multi-property animations
  - Spring-based physics
