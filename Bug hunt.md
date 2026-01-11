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
**Review:** Approved

### Problem
- Input text doesn't have the correct color (should match typed text color)
- Focus ring shows on mouse click (should only show on keyboard tab)
- Field docs showing placeholder color instead of filled state color

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

### Docs Text Color Fix (Added)

**Root Cause:** Field docs page "With Different Controls" section showed placeholder states, not filled states. The examples used `placeholder` prop without `defaultValue`, so text showed `text-content-muted` (correct for placeholder) instead of `text-content-strong` (filled state).

**Solution Applied:**
```diff
- <Input placeholder="John Doe" />
+ <Input defaultValue="John Doe" />

- <SelectDemo options={countries} placeholder="Select country" />
+ <SelectDemo options={countries} defaultValue="us" placeholder="Select country" />
```

**File:** `src/app/docs/field/page.tsx`

**Why This Is Correct:**
- Component styling was already correct (`text-content-strong` for filled, `text-content-muted` for placeholder)
- Only the documentation examples needed updating to demonstrate filled state

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
**Review:** Approved

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

## 21. Checkbox - Border Visible on Checked State
**Status:** [x] Fixed
**Review:** Code review pending

### Problem
When a checkbox is checked or in indeterminate state, it incorrectly shows a border/shadow around it. The checked state should have a solid background color with no border.

### Root Cause Analysis

**Main branch approach:**
Uses a `getStateClasses(isSelected)` function that returns **completely different class sets** for checked vs unchecked:
```tsx
// Main branch - checked state has NO shadow
if (isSelected) {
  return "bg-actions-primary-default hover:bg-actions-primary-hover ..."
}
// Unchecked state has shadow
return "bg-actions-tertiary-default shadow-[...]"
```

**Codexrefactor approach:**
Uses Tailwind data attribute variants but applies shadow as a **base style** and only overrides the background on checked:
```tsx
// Shadow is always applied as base
"bg-actions-tertiary-default shadow-[...]",
// Only background changes on checked - shadow persists!
"data-[checked]:bg-actions-primary-default",
```

### Solution Applied

Added `shadow-none` to checked and indeterminate states to remove the border-like shadow:

**File:** `src/components/ui/checkbox-control.tsx`

```diff
- "data-[checked]:bg-actions-primary-default data-[checked]:hover:bg-actions-primary-hover",
- "data-[indeterminate]:bg-actions-primary-default data-[indeterminate]:hover:bg-actions-primary-hover",
+ "data-[checked]:bg-actions-primary-default data-[checked]:shadow-none data-[checked]:hover:bg-actions-primary-hover",
+ "data-[indeterminate]:bg-actions-primary-default data-[indeterminate]:shadow-none data-[indeterminate]:hover:bg-actions-primary-hover",
```

### Why This Is NOT Breaking Base UI

This is purely **CSS styling** using Base UI's provided data attributes:
- `data-[checked]` targets Base UI's `data-checked` attribute (automatically added when checked)
- `data-[indeterminate]` targets Base UI's `data-indeterminate` attribute
- We're only applying CSS styles based on these attributes - no behavior changes
- This follows the "Style it. Compose it. Wrap it. Never change it." principle exactly

---

## 22. Select Grouped Options - Checkmark Position
**Status:** [x] Fixed
**Review:** Code review pending

### Problem
In the grouped options example of Select, the checkmark of selected item appears right next to the label text instead of being pushed to the right edge of the item.

### Root Cause Analysis
The `Select.ItemText` component didn't include `flex-1` to fill available horizontal space:
```tsx
// Before - ItemText only takes content width, checkmark appears right after
<Select.Item>
  <Select.ItemText>{option.label}</Select.ItemText>  // No flex-1
  <Select.ItemIndicator>...</Select.ItemIndicator>
</Select.Item>
```

Without `flex-1`, the ItemText only takes up as much space as its content, leaving the checkmark immediately adjacent instead of at the right edge.

### Solution Applied

Added `flex-1 min-w-0` to `Select.ItemText` component (component-level fix):

**File:** `src/components/ui/select.tsx`

```diff
  function SelectItemText({ className, ...props }: SelectItemTextProps) {
    return (
      <SelectPrimitive.ItemText
        data-slot="item-text"
-       className={cn(itemTextVariants(), className)}
+       className={cn(itemTextVariants(), "flex-1 min-w-0", className)}
        {...props}
      />
    )
  }
```

### Why This Is NOT Breaking Base UI

This is **pure CSS styling** passed via the standard `className` prop:
- Base UI's `SelectPrimitive.ItemText` accepts `className` as a standard prop
- We're just adding Tailwind utility classes (`flex-1 min-w-0`) for layout
- `flex-1` makes the element grow to fill available space
- `min-w-0` allows proper text truncation in flex containers
- No callbacks intercepted, no state managed, no ARIA overridden, no behavior changed
- This follows "Style it. Compose it. Wrap it. Never change it." - we're only adding CSS styling

### Component-Level Fix
This fix is at the **component level** (`select.tsx`), not just in docs. Any usage of `Select.ItemText` will automatically fill available space, pushing siblings (like `Select.ItemIndicator`) to the right edge.

---

## 23. Select With Description - Checkmark Top Alignment
**Status:** [x] Fixed
**Review:** Code review pending

### Problem
In the "With Descriptions" examples of Select, the checkmark is not top-aligned when an item has a description. It stays vertically centered while the item content grows taller due to the description text.

### Root Cause Analysis
The `Select.ItemIndicator` component didn't have conditional top alignment for items with descriptions. The icon wrapper already handles this with:
```tsx
group-has-[[data-slot=item-description]]:items-start
group-has-[[data-slot=item-description]]:self-stretch
group-has-[[data-slot=item-description]]:pt-[var(--space-2)]
```

But the ItemIndicator was missing similar treatment.

### Solution Applied

Added conditional alignment classes directly to the `Select.ItemIndicator` component (component-level fix):

**File:** `src/components/ui/select.tsx`

```diff
  function SelectItemIndicator({ className, ...props }: SelectItemIndicatorProps) {
    return (
      <SelectPrimitive.ItemIndicator
        data-slot="indicator"
-       className={cn("flex size-[20px] shrink-0 items-center justify-center", className)}
+       className={cn(
+         "flex size-[20px] shrink-0 items-center justify-center",
+         "group-has-[[data-slot=item-description]]:self-start group-has-[[data-slot=item-description]]:mt-[var(--space-2)]",
+         className
+       )}
        {...props}
      />
    )
  }
```

### Why This Is NOT Breaking Base UI

This is **pure CSS styling** passed via the standard `className` prop:
- Base UI's `SelectPrimitive.ItemIndicator` accepts `className` as a standard prop
- We're just adding Tailwind utility classes for conditional alignment
- `group-has-[[data-slot=item-description]]` uses CSS `:has()` selector to detect when a sibling has the description slot
- No callbacks intercepted, no state managed, no ARIA overridden, no behavior changed
- This follows "Style it. Compose it. Wrap it. Never change it." - we're only adding CSS styling to our wrapper component

### Component-Level Fix
This fix is at the **component level** (`select.tsx`), not just in docs. Any usage of `Select.ItemIndicator` will automatically get correct top-alignment when the parent item contains a description element.

---

## 24. Disabled Input Components - Missing Cursor
**Status:** [x] Fixed
**Review:** Code review pending

### Problem
When input components are disabled, they don't show `cursor-not-allowed`. The cursor remains as `cursor-text` (I-beam) which incorrectly suggests the field is editable.

**Affected pages:**
- Field page (States → Disabled example)
- Input page (States → Disabled example)
- Input Group page (States → Disabled example)
- Number Field page (States → Disabled example)
- Textarea page (States → Disabled example)

### Root Cause Analysis

**Two-layer problem:**
1. The input **container divs** had `cursor-text` applied unconditionally
2. The inner **input/textarea elements** have `cursor: text` by default in browsers, which **overrides** the parent's cursor

HTML `<input>` and `<textarea>` elements have built-in cursor styling that takes precedence over parent containers. Both layers need the cursor fix.

### Solution Applied

Added `cursor-not-allowed` to **both** the container AND the inner input element when disabled.

**Files changed:**

**1. `src/components/ui/input.tsx`**
```diff
  // Container div
  className={cn(
    inputFieldVariants({ size: resolvedSize }),
    "group relative",
+   disabled ? "cursor-not-allowed bg-actions-secondary-disabled" : "cursor-text",
    ...
  )}

  // Inner InputPrimitive
  className={cn(
    inputVariants({ size: resolvedSize }),
    disabled
-     ? "text-content-disabled placeholder:text-content-disabled"
+     ? "cursor-not-allowed text-content-disabled placeholder:text-content-disabled"
      : "text-content-strong"
  )}
```

**2. `src/components/ui/textarea.tsx`**
```diff
  // Container div
  className={cn(
    textareaFieldVariants({ size: resolvedSize }),
    "group relative",
+   disabled ? "cursor-not-allowed bg-actions-secondary-disabled" : "cursor-text",
    ...
  )}

  // Inner InputPrimitive (textarea)
  className={cn(
    textareaVariants({ size: resolvedSize, resize }),
    disabled
-     ? "text-content-disabled placeholder:text-content-disabled"
+     ? "cursor-not-allowed text-content-disabled placeholder:text-content-disabled"
      : "text-content-strong"
  )}
```

**3. `src/components/ui/number-field.tsx`**
```diff
  // Group container
  className={cn(
    groupVariants({ size }),
    !disabled && "hover:bg-surface-interactive-hover",
-   disabled && "opacity-50",
+   disabled && "opacity-50 cursor-not-allowed",
    className
  )}

  // Inner NumberFieldPrimitive.Input
  className={cn(
    inputVariants({ size }),
-   disabled && "text-content-disabled placeholder:text-content-disabled",
+   disabled && "cursor-not-allowed text-content-disabled placeholder:text-content-disabled",
    className
  )}
```

**4. `src/components/ui/input-group.tsx`**
```diff
  // Main segment container
  className={cn(
    mainSegmentVariants({...}),
+   disabled ? "cursor-not-allowed bg-actions-secondary-disabled" : "cursor-text",
    ...
  )}

  // Inner InputPrimitive
  className={cn(
    inputVariants({ size: resolvedSize }),
    disabled
-     ? "text-content-disabled placeholder:text-content-disabled"
+     ? "cursor-not-allowed text-content-disabled placeholder:text-content-disabled"
      : "text-content-strong"
  )}
```

### Why This Is NOT Breaking Base UI

This is **pure CSS styling** passed via the standard `className` prop:
- We're adding Tailwind utility classes for cursor styling
- `cursor-not-allowed` and `cursor-text` are standard CSS cursor properties
- The `disabled` prop is already provided by the component and comes from Base UI
- No callbacks intercepted, no state managed, no ARIA overridden, no behavior changed
- This follows "Style it. Compose it. Wrap it. Never change it." - we're only adding CSS styling

### Component-Level Fix
This fix is at the **component level** in all 4 files (`input.tsx`, `textarea.tsx`, `number-field.tsx`, `input-group.tsx`). Any usage of these components with `disabled={true}` will automatically show `cursor-not-allowed`.

---

## 25. Separator Page - Redesign
**Status:** [x] Fixed
**Review:** Code review pending

### Problem
The separator documentation page had poorly designed examples with:
- Inconsistent text sizes
- Generic/plain examples
- "Use Cases" section naming (content-focused instead of capability-focused)
- Toolbar using plain text instead of real components
- Misaligned examples (different max-widths)

### Solution Applied

**File:** `src/app/docs/separator/page.tsx`

Complete redesign with:

1. **Consistent text sizes:**
   - Row labels: `text-body-m text-content-strong`
   - Row descriptions: `text-body-s text-content-subtle`

2. **Section naming:** "Use Cases" → "With Content" (capability-focused per CLAUDE.md)

3. **Polished examples:**
   - **Profile card**: Avatar with decorative color (`color="violet"`), name, role, and stats separated by vertical separators
   - **Toolbar**: Real `ToggleButton` and `ToggleGroup` components with tertiary button styling (`bg-actions-tertiary-default`, shadow, backdrop-blur)
   - **Settings list**: Icon containers with decorative muted backgrounds (`bg-surface-decorative-*-muted`) and decorative icon colors
   - **Footer links**: Typical footer pattern

4. **Alignment:** All example containers standardized to `w-full max-w-sm`

5. **Toolbar width:** Inner container uses `w-fit` to only take space needed for children

### Components Used
- `Avatar` with `color` prop for decorative styling
- `ToggleButton` with `variant="ghost"` for formatting toggles
- `ToggleGroup` with `hideSeparator` for single-selection alignment buttons
- `Separator` in both horizontal and vertical orientations

### Why This Is Safe
This is a **docs page change only** - no component modifications. Uses existing component APIs as designed.

---

## 26. MenuEmpty - Oversized Styling
**Status:** [x] Fixed
**Review:** Code review pending

### Problem
The `MenuEmpty` component (used in Menu's "No results" state) looked oversized and disproportionate in a menu dropdown context:
- Icon too large (24px)
- Excessive padding (24px all around)
- Large gaps between elements
- Title font size too big

### Solution Applied

**File:** `src/components/ui/menu-empty.tsx`

| Property | Before | After |
|----------|--------|-------|
| Padding | `p-[var(--space-24)]` | `py-[var(--space-20)] px-[var(--space-28)]` |
| Icon size | `size-[24px]` | `size-4` (16px) |
| Icon color | `text-content-strong` | `text-content-strong` (kept) |
| Outer gap | `gap-[var(--space-24)]` | `gap-[var(--space-16)]` |
| Inner gap | `gap-[var(--space-16)]` | `gap-[var(--space-12)]` |
| Title size | `font-size-m` (16px) | `font-size-s` (14px) |
| Title weight | `font-weight-medium` | `font-weight-medium` (kept) |

### Why This Is Safe
`MenuEmpty` is a **custom component** (not a Base UI primitive). It's purely styled HTML with no Base UI dependencies - completely safe to modify styling.

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

## 27. Accordion - Expand/Collapse Animation
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

## 28. Alert Dialog - Enter/Exit Animation
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

## 29. Dialog - Enter/Exit Animation
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

## 30. Switch Control - Thumb Slide Animation
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

## 31. Toggle Button - Icon Morphing Animation
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

## 32. Toggle Group - Icon Morphing Animation
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
1. **Bug #31 - Toggle Button** - Core functionality relies on icon/state animations
2. **Bug #32 - Toggle Group** - Same as Toggle Button
3. **Bug #30 - Switch Control** - Spring feel important for toggle UX

### Medium Priority
4. **Bug #29 - Dialog** - Polish for modal experience
5. **Bug #28 - Alert Dialog** - Same as Dialog
6. **Bug #27 - Accordion** - Expand/collapse polish

### Notes
- **File Upload, Slider, Tooltip** already have motion animations
- CSS transitions (`transition-*`) are still present in most components for hover/focus states
- Consider keeping CSS transitions for simple hover states, use motion for:
  - State changes (pressed, checked, open)
  - Complex multi-property animations
  - Spring-based physics

---

## 33. Menu Submenu - Missing Arrow Indicator
**Status:** [x] Fixed
**Review:** Code review pending

### Problem
In the Menu page's "Nested actions" (Submenu) example, the submenu trigger item didn't show an arrow indicator to signal that it opens a submenu.

### Root Cause Analysis
The `MenuSuffix` component exists with a `type="submenu"` prop that renders a chevron arrow icon:
```tsx
// In menu.tsx
function MenuSuffix({ type, ... }) {
  if (type === "submenu") {
    return <RiArrowRightSLine className="size-[20px]" />
  }
  // ...
}
```

However, the documentation example didn't use this component inside the `Menu.SubmenuTrigger`.

### Solution Applied

**File:** `src/app/docs/menu/page.tsx`

```diff
  <Menu.SubmenuTrigger>
    <span className={menuItemLabelClassName}>Send via</span>
+   <MenuSuffix type="submenu" />
  </Menu.SubmenuTrigger>
```

### Why This Is Safe
This is a **docs page change only** - the `MenuSuffix` component already exists and is properly exported. The fix simply uses the existing component API as designed.

### Component Already Correct
The `MenuSuffix` component in `src/components/ui/menu.tsx` was already correctly implemented with submenu arrow support. No component changes were needed.

---

## 34. Menu Danger Item - Custom Hover Background
**Status:** [x] Fixed
**Review:** Code review pending

### Problem
Danger menu items (e.g., "Delete" actions) used the same neutral gray hover background as regular items. This didn't provide enough visual distinction for destructive actions.

### Solution Applied

**File:** `src/components/ui/list-item-styles.tsx`

Added a danger-specific hover background to the `listItemVariants` CVA:

```diff
  variants: {
    variant: {
      default: "",
-     danger: "",
+     danger: "data-[highlighted]:bg-surface-feedback-danger-muted",
    },
  },
```

### Design Token Used
- `bg-surface-feedback-danger-muted` - Subtle red-tinted background that pairs with the danger text color (`text-content-feedback-danger-strong`)

### Why This Is NOT Breaking Base UI

This is **pure CSS styling** using Base UI's provided data attributes:
- `data-[highlighted]` targets Base UI's `data-highlighted` attribute (automatically added when item is keyboard/hover focused)
- We're just adding a Tailwind class to the CVA variant - no state management, no callback interception
- Same pattern already used for default hover: `data-[highlighted]:bg-surface-interactive-hover`
- Follows "Style it. Compose it. Wrap it. Never change it." exactly

### Affected Components
All components using `listItemVariants` with `variant="danger"` automatically get this fix:
- `MenuItem` (Menu)
- `MenuItem` (ContextMenu)
- Any future danger menu items

---

## 35. InlineNotification - Filled Variant with Colored Backgrounds
**Status:** [x] Fixed
**Review:** Code review pending

### Feature Request
Add a new `variant` prop for inline notifications to support colored backgrounds that match the notification tone.

### Solution Applied

**File:** `src/components/ui/inline-notification.tsx`

Added a `variant` prop with two options:
- `"default"` - Neutral gray background (existing behavior)
- `"filled"` - Colored background based on tone

**New type:**
```tsx
type InlineNotificationVariant = "default" | "filled"
```

**Token mappings added:**

| Tone | Background (filled) | Title Color | Description Color |
|------|---------------------|-------------|-------------------|
| neutral | `bg-surface-interactive-default` | `text-content-strong` | `text-content-subtle` |
| info | `bg-surface-feedback-info-muted` | `text-content-feedback-info-strong` | `text-content-feedback-info-subtle` |
| success | `bg-surface-feedback-success-muted` | `text-content-feedback-success-strong` | `text-content-feedback-success-subtle` |
| warning | `bg-surface-feedback-warning-muted` | `text-content-feedback-warning-strong` | `text-content-feedback-warning-subtle` |
| danger | `bg-surface-feedback-danger-muted` | `text-content-feedback-danger-strong` | `text-content-feedback-danger-subtle` |

**Usage:**
```tsx
// Default (neutral background)
<InlineNotification.Root tone="success">
  ...
</InlineNotification.Root>

// Filled (colored background)
<InlineNotification.Root tone="success" variant="filled">
  ...
</InlineNotification.Root>
```

### Implementation Details

1. **Context updated** to include `variant` alongside `tone` and `hasDescription`
2. **Root component** accepts `variant` prop and applies tone-specific background
3. **Title component** uses feedback content colors when variant is "filled"
4. **Description component** uses feedback content subtle colors when variant is "filled"

### Why This Is Safe

This is a **pure addition** - no breaking changes:
- New `variant` prop defaults to `"default"` (existing behavior)
- Only adds CSS classes based on variant/tone combination
- Uses existing design system tokens
- No Base UI primitives involved (InlineNotification is a custom component)

---

## 36. Combobox Multi-Select - Structure Issues (Placeholder, Chevron, Arrow Key, Spacing)
**Status:** [x] Fixed
**Review:** Code review pending

### Problems
Multiple issues found in multi-select combobox:
1. **Placeholder text persists** - Placeholder still shows after chips are added
2. **Chevron pushed out** - When many chips are added, the dropdown chevron icon can be pushed outside the container
3. **Left arrow key doesn't close menu** - Pressing left arrow with menu open should close it to allow navigating between chips (default Base UI behavior)
4. **No vertical padding when chips present** - Chips touched top/bottom edges of container
5. **Chips not left-aligned** - Needed visual balancing with left offset
6. **Chevron centering on multi-row** - When chips wrap to multiple rows, chevron should stay at top, not center

### Root Cause Analysis

**Our implementation (before):**
```tsx
{multiple && (
  <Combobox.Chips>  // Had className="contents" - no box model!
    <Combobox.Value>
      {(selectedValue) => selectedValue.map(...chips)}
    </Combobox.Value>
  </Combobox.Chips>
)}

<Combobox.Input placeholder={placeholder} />  // OUTSIDE - can't access selected value
<Combobox.Trigger>...</Combobox.Trigger>
```

**Issues explained:**
1. **Placeholder**: Input was outside `Combobox.Value`, so couldn't access selected values for conditional placeholder
2. **Chevron pushed out**: `Combobox.Chips` had `className="contents"` (display: contents), so chips expanded horizontally without wrapping
3. **Arrow key behavior**: Base UI expects Input inside `Chips/Value` structure for proper keyboard navigation context
4. **No padding**: `contents` display removes element from box model - padding/margin don't work
5. **Chevron centering**: Root uses `items-center`, so trigger centers when container grows

### Solution Applied

**Files changed:**
- `src/app/docs/combobox/page.tsx` - Restructured multi-select demo
- `src/components/ui/combobox.tsx` - Removed `contents` from Chips base class

#### Component Change: `combobox.tsx`

Removed `contents` from `ComboboxChips` so it can be a proper flex container:

```diff
  function ComboboxChips({ className, ...props }: ComboboxChipsProps) {
    return (
      <ComboboxPrimitive.Chips
        data-slot="chips"
-       className={cn("contents", className)}
+       className={className}
        {...props}
      />
    )
  }
```

#### Demo Change: `combobox/page.tsx`

Restructured multi-select with CSS `:has()` for conditional styling:

```tsx
{multiple ? (
  <>
    <Combobox.Chips
      className={cn(
        // Base: flex container with wrapping
        "flex min-w-0 flex-1 flex-wrap items-center gap-[var(--space-4)]",
        // Conditional: when chips exist, add padding and left offset
        "has-[[data-slot=chip]]:py-[var(--space-6)] has-[[data-slot=chip]]:-ml-[var(--space-6)]"
      )}
    >
      <Combobox.Value>
        {(selectedValue) => {
          const values = Array.isArray(selectedValue) ? selectedValue : []
          return (
            <>
              {values.map((item) => (
                <Combobox.Chip key={...}>
                  <span className="truncate">{label}</span>
                  <Combobox.ChipRemove>
                    <RiCloseLine />
                  </Combobox.ChipRemove>
                </Combobox.Chip>
              ))}
              <Combobox.Input
                placeholder={values.length > 0 ? "" : placeholder}
              />
            </>
          )
        }}
      </Combobox.Value>
    </Combobox.Chips>
    {/* Trigger: wrapper with self-stretch and top padding aligns icon with first row */}
    <div className="flex self-stretch pt-[var(--space-10)]">
      <Combobox.Trigger>
        <RiExpandUpDownLine />
      </Combobox.Trigger>
    </div>
  </>
) : (
  // Single-select: standard layout with centered trigger
  <>
    <Combobox.Input placeholder={placeholder} />
    {clearable && (
      <Combobox.Clear>
        <RiCloseLine />
      </Combobox.Clear>
    )}
    <Combobox.Trigger>
      <RiExpandUpDownLine />
    </Combobox.Trigger>
  </>
)}
```

### Key Techniques Used

| Technique | Purpose |
|-----------|---------|
| `has-[[data-slot=chip]]:` | CSS `:has()` selector - applies styles only when chips exist |
| `py-[var(--space-6)]` | Vertical padding (6px) when chips present |
| `-ml-[var(--space-6)]` | Left offset to balance visual alignment (root has 12px padding, so 12-6=6px from edge) |
| `self-stretch pt-[var(--space-10)]` | Wrapper div stretches full height with 10px top padding - keeps chevron aligned with first row regardless of chip count |

### Chevron Alignment Solution

**Problem:** When chips wrap to multiple rows, the chevron would either:
- Stay vertically centered (default `items-center` from root)
- Jump to top on first chip added (if using conditional `self-start`)

**Solution:** Wrapper div approach
```tsx
<div className="flex self-stretch pt-[var(--space-10)]">
  <Combobox.Trigger>...</Combobox.Trigger>
</div>
```

- `self-stretch` makes wrapper fill full height of flex container
- `pt-[var(--space-10)]` (10px) offsets chevron from top to align with first row of chips
- Chevron stays at same position regardless of how many chips/rows are added
- No conditional logic needed - works for 0 chips (centered due to root's `items-center`) and multiple rows

### Summary of All Fixes

| Issue | Fix |
|-------|-----|
| Placeholder persists | Input inside `Combobox.Value` - conditional `placeholder={values.length > 0 ? "" : placeholder}` |
| Chevron pushed out | `flex-wrap` on Chips container, removed `contents` class from component |
| Left arrow doesn't close menu | Correct structure: `Chips > Value > (chips + Input)` |
| No vertical padding | `has-[[data-slot=chip]]:py-[var(--space-6)]` on Chips |
| Chips not left-aligned | `has-[[data-slot=chip]]:-ml-[var(--space-6)]` on Chips |
| Chevron alignment | Wrapper div with `self-stretch pt-[var(--space-10)]` around Trigger |

### Why This Is NOT Breaking Base UI

This fix follows the **exact pattern from Base UI's official documentation example**:
- `Combobox.Input` inside `Combobox.Value` is the documented approach for multi-select
- Removed `contents` from component is pure CSS change - no behavior affected
- CSS `:has()` and `peer` patterns are pure styling
- No callbacks intercepted, no state managed externally, no ARIA overridden
- This follows "Style it. Compose it. Wrap it. Never change it."

### Affected Sections
All multi-select examples in the combobox docs page:
- With Descriptions → Multi-select
- Multiple Selection → Multi-select
- Multiple Selection → With default values
- Grouped → Multi-select grouped

---

## 37. Number Field - Focus Ring Only on Keyboard (Not Mouse Click)
**Status:** [x] Fixed
**Review:** Ready for code review

### Problem
When clicking the Number Field component, the focus ring appears. Focus ring should ONLY show when using keyboard navigation (Tab key), not on mouse click.

### Root Cause Analysis

The original implementation used pure CSS `:focus-visible`:

```tsx
"[&:has(:focus-visible)]:shadow-[...]"
```

**The issue:** For text inputs, browsers show `:focus-visible` on click too, because the user might type. This is intentional browser behavior for editable fields, but not our desired UX.

### Solution Applied

**File:** `src/components/ui/number-field.tsx`

Implemented the same `focusVisibleOnly` pattern used by the Input component - tracking pointer events to distinguish keyboard from mouse focus:

```tsx
function Group({ className, focusVisibleOnly = true, ...props }: NumberFieldGroupProps) {
  const { size, disabled } = useNumberFieldContext()
  const [showFocusRing, setShowFocusRing] = React.useState(false)
  const wasPointerDown = React.useRef(false)

  const handlePointerDown = () => {
    wasPointerDown.current = true
  }

  const handleFocus = () => {
    if (focusVisibleOnly) {
      setShowFocusRing(!wasPointerDown.current)  // Only show if NOT from pointer
    } else {
      setShowFocusRing(true)
    }
    wasPointerDown.current = false
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) return
    setShowFocusRing(false)
    wasPointerDown.current = false
  }

  return (
    <NumberFieldPrimitive.Group
      className={cn(
        groupVariants({ size }),
        !disabled && "hover:bg-surface-interactive-hover",
        showFocusRing &&
          "shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onPointerDownCapture={handlePointerDown}  // Capture phase - runs before Base UI
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  )
}
```

### How It Works

1. **Pointer down (capture phase)** → `wasPointerDown.current = true`
2. **Focus event fires** → Check if focus came from pointer:
   - If `wasPointerDown` is true → Don't show focus ring (mouse click)
   - If `wasPointerDown` is false → Show focus ring (keyboard Tab)
3. **Blur** → Hide focus ring, reset pointer flag

### Critical Fix: Using Capture Phase

**Initial problem:** Even with pointer tracking, clicking the +/- buttons directly (without prior focus) still showed the focus ring.

**Root cause:** Event timing. When clicking the increment/decrement button:
1. Base UI's internal `pointerdown` handler fires and focuses the input
2. Our `onPointerDown` handler fires (too late - focus already happened)
3. Focus event sees `wasPointerDown = false` → shows ring incorrectly

**Solution:** Use `onPointerDownCapture` instead of `onPointerDown`:

```tsx
// WRONG - bubble phase (child handlers run first)
onPointerDown={handlePointerDown}

// CORRECT - capture phase (parent handlers run first)
onPointerDownCapture={handlePointerDown}
```

**Event phases explained:**
- **Capture phase:** Window → Document → ... → Parent → Child (top-down)
- **Bubble phase:** Child → Parent → ... → Document → Window (bottom-up)

By using capture, our handler sets `wasPointerDown = true` **before** Base UI's handlers run, so when Base UI focuses the input, the focus event correctly sees that focus originated from a pointer.

### New Prop Added

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `focusVisibleOnly` | `boolean` | `true` | Only show focus ring on keyboard focus |

Set `focusVisibleOnly={false}` to show focus ring on both mouse and keyboard focus.

### Why This Is NOT Breaking Base UI

This is **pure styling behavior**:
- We're using standard DOM events (`onPointerDown`, `onFocus`, `onBlur`)
- Base UI's internal state management is untouched
- We're only controlling when our CSS shadow appears
- No callbacks intercepted or values transformed
- Follows "Style it. Compose it. Wrap it. Never change it."

### Note: Buttons Are Not Focusable

The increment/decrement buttons have `tabIndex={-1}`, so they don't receive keyboard focus. Only the Input is focusable, which is correct UX - users type values or use arrow keys.

---

## 38. Avatar Group - Border Instead of Real Gap
**Status:** [x] Fixed
**Review:** Ready for code review

### Problem
Avatar Group uses a `shadow-[0_0_0_2px_var(--color-surface-page)]` border to visually separate avatars. This only works on page background color and doesn't adapt to different backgrounds.

### Previous Implementation
```tsx
// Each avatar had a shadow border
className="shadow-[0_0_0_2px_var(--color-surface-page)]"

// Overflow indicator had same shadow
"shadow-[0_0_0_2px_var(--color-surface-page)]"
```

### Expected Behavior
- Avatars should have a real gap between them
- The gap should work on any background (light, dark, colored, gradient, image)
- No reliance on matching border color to background

### Solution Applied

**File:** `src/components/ui/avatar-group.tsx`

Used CSS `mask-image` to cut out the overlapping area, creating a real transparent gap.

#### 1. Added constants for gap and corner radius
```tsx
const GAP = 2 // gap between avatars in pixels
const SQUARE_CORNER_RADIUS = 8 // matches --radius-8
```

#### 2. Created `getMaskStyle` function for dynamic mask generation
```tsx
const getMaskStyle = (index: number): React.CSSProperties | undefined => {
  if (index === 0) return undefined // First avatar has no mask

  const avatarRadius = config.px / 2
  const maskRadius = avatarRadius + GAP
  const maskCenterX = -avatarRadius + config.overlap

  if (resolvedShape === "circular") {
    // Radial gradient mask - creates circular cutout
    return {
      maskImage: `radial-gradient(circle at ${maskCenterX}px 50%, transparent ${maskRadius}px, black ${maskRadius}px)`,
    }
  } else {
    // SVG mask for square avatars with rounded corners
    const cutoutSize = config.px + GAP * 2
    const cutoutX = maskCenterX - avatarRadius - GAP
    const cutoutY = -GAP
    const svg = `<svg xmlns="...">
      <defs>
        <mask id="m">
          <rect fill="white"/>
          <rect x="${cutoutX}" y="${cutoutY}" rx="${SQUARE_CORNER_RADIUS}" fill="black"/>
        </mask>
      </defs>
      <rect fill="white" mask="url(%23m)"/>
    </svg>`
    return {
      maskImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
      maskSize: "100% 100%",
    }
  }
}
```

#### 3. Removed shadow border, applied mask to avatars and overflow
```tsx
// Before (removed):
className="shadow-[0_0_0_2px_var(--color-surface-page)]"

// After - no shadow, mask applied via style prop:
style={{
  ...existingStyles,
  ...getMaskStyle(index),
}}
```

#### 4. Changed overflow indicator background
```tsx
// Before:
"bg-actions-secondary-default ... shadow-[0_0_0_2px_var(--color-surface-page)]"

// After:
"bg-[var(--color-utility-avatar)] ..."  // New token, no shadow
```

#### 5. Added new design token
**File:** `src/design-system/tokens.css`

```css
/* Base token declaration */
--color-utility-avatar: rgb(var(--utility-avatar));

/* Light mode (both color and mono schemes) */
--utility-avatar: var(--neutral-200);

/* Dark mode (both color and mono schemes) */
--utility-avatar: var(--neutral-800);
```

#### 6. Updated Avatar component styling for consistency
**File:** `src/components/ui/avatar.tsx`

```diff
// Background for non-emphasized avatars (initials/fallback)
- false: "bg-actions-secondary-default",
+ false: "bg-[var(--color-utility-avatar)]",

// Text color for fallback/initials
- "text-content-strong"
+ "text-content-subtle"

// Icon color
- "text-content-strong"
+ "text-content-subtle"
```

This ensures avatars with initials or icon fallback have the same styling as the overflow indicator in avatar groups.

### How the Mask Works

**For both circular and square avatars:**
- Uses `radial-gradient()` to create a circular transparent area
- Center position: `(-avatarRadius + overlap)px` from left edge
- Radius: `avatarRadius + GAP` (slightly larger than avatar to create gap)
- Everything inside the circle is transparent (masked out)
- Everything outside is black (visible)
- Square avatars use the same circular cutout - since it's on the edge, the visual difference is minimal

### Mask Mathematics

For size "m" (36px avatar, 12px overlap, 2px gap):
- Avatar radius: 18px
- Mask radius: 18 + 2 = 20px (cuts out slightly more for gap)
- Mask center X: -18 + 12 = -6px (positioned where previous avatar's center is)

```
Current avatar (36px wide):
[0px -------- 36px]
        ^
        Mask circle center at -6px
        with 20px radius cuts this area
```

### Why This Is NOT Breaking Base UI

This fix involves no Base UI components at all:
- AvatarGroup is a **custom component** (not a Base UI primitive)
- Pure CSS mask techniques via inline styles
- No callbacks intercepted, no state managed externally
- Follows "Style it. Compose it. Wrap it. Never change it."

### Summary

| Change | Before | After |
|--------|--------|-------|
| Avatar separation | `shadow-[0_0_0_2px_var(--color-surface-page)]` | CSS mask with 2px gap |
| Overflow background | `bg-actions-secondary-default` | `bg-[var(--color-utility-avatar)]` |
| Overflow text | `text-content-strong` | `text-content-subtle` |
| Avatar fallback bg | `bg-actions-secondary-default` | `bg-[var(--color-utility-avatar)]` |
| Avatar fallback text | `text-content-strong` | `text-content-subtle` |
| New token | - | `--color-utility-avatar` (neutral-200/800) |
| Background compatibility | Only works on page background | Works on any background |
| Shape support | Both circular & square | Circular only (square removed) |
| Stacking order | First on top | Last on top (overflow has z-index 100) |
| Mask direction | Left side | Right side (where next item overlaps) |

### Final Implementation Details

**Stacking:** `[Avatar1] → [Avatar2] → [Avatar3] → [Avatar4] → [+N]` with last item on top

**Mask logic (RIGHT side cutout):**
- Each avatar has mask on RIGHT (where the next item sits on top)
- Last avatar has no mask if no overflow
- Overflow indicator has no mask (it's topmost, z-index 100)

```tsx
// Mask cuts out RIGHT side where next item overlaps from above
const maskCenterX = config.px - config.overlap + avatarRadius
return {
  maskImage: `radial-gradient(circle at ${maskCenterX}px 50%, transparent ${maskRadius}px, black ${maskRadius}px)`,
}
```

**Files changed:**
- `src/components/ui/avatar-group.tsx` - Mask logic, stacking order, removed square shape
- `src/components/ui/avatar.tsx` - Fallback bg/text colors
- `src/design-system/tokens.css` - New `--color-utility-avatar` token
- `src/app/docs/avatar/page.tsx` - Removed square variant examples

---

## 39. Combobox Searchable Select - Two Visible Input Fields
**Status:** [x] Fixed
**Review:** Ready for code review

### Problem
In the "Input Inside Popup" section of combobox docs, the SearchableSelect component showed two visible input fields stacked on top of each other. Both had the same background color (`bg-actions-secondary-default`), causing a visual overlap issue.

### Root Cause Analysis

The `Combobox.Root` component wraps its children in a styled div with input-like styling:
```tsx
// In combobox.tsx - ComboboxRoot renders:
<div
  className={cn(
    rootVariants({ size }),  // includes bg-actions-secondary-default, padding, min-height, radius
    ...
  )}
>
  {children}
</div>
```

The `SearchableSelect` component structure was:
```tsx
<Combobox.Root>                    {/* Styled container (looks like input) */}
  <Combobox.Trigger className="bg-actions-secondary-default ...">  {/* Also styled (looks like input) */}
    ...
  </Combobox.Trigger>
</Combobox.Root>
```

Result: Two nested styled containers, both visible with same background color.

### Solution Applied

**File:** `src/app/docs/combobox/page.tsx`

Made `Combobox.Root` unstyled for the searchable select pattern - let `Combobox.Trigger` handle all visual styling:

```diff
  <Combobox.Root
    items={options}
    defaultValue={defaultValue}
+   className="bg-transparent p-0 min-h-0 rounded-none shadow-none"
  >
```

### Why This Works

- `bg-transparent` removes the gray background from root
- `p-0` removes padding that was creating extra space
- `min-h-0` removes minimum height constraint
- `rounded-none` removes border radius
- `shadow-none` removes any focus ring that might show on root

Now only `Combobox.Trigger` has visual styling, appearing as a single select-like button.

### Why This Is NOT Breaking Base UI

This is **pure CSS styling** via the standard `className` prop:
- We're overriding visual styles, not behavior
- The root container's focus handlers still work (just invisible)
- No callbacks intercepted, no state managed, no ARIA changed
- Follows "Style it. Compose it. Wrap it. Never change it."

---

## 40. Breadcrumbs - Home Icon and Gap Update
**Status:** [x] Fixed
**Review:** Ready for code review

### Changes Requested
1. Change home icon from `RiHome5Line` to `RiHome7Fill`
2. Increase gap between icon and text by 4px (from 2px to 6px)

### Solution Applied

**File:** `src/components/ui/breadcrumbs.tsx`

```diff
- import { RiArrowRightSLine, RiHome5Line } from "@remixicon/react"
+ import { RiArrowRightSLine, RiHome7Fill } from "@remixicon/react"

  <span
    data-slot="breadcrumbs-item-content"
    className={cn(
-     "flex items-center gap-[var(--space-2)] rounded-[var(--radius-8)] px-[var(--space-4)]",
+     "flex items-center gap-[var(--space-6)] rounded-[var(--radius-8)] px-[var(--space-4)]",
      ...
    )}
  >
    {showHomeIcon && (
      <span ...>
-       <RiHome5Line className="size-full" />
+       <RiHome7Fill className="size-full" />
      </span>
    )}
```

### Summary

| Property | Before | After |
|----------|--------|-------|
| Icon | `RiHome5Line` (outline) | `RiHome7Fill` (filled) |
| Gap | `--space-2` (2px) | `--space-6` (6px) |

---

## 41. Tabs - Padding Consistency and Cleanup
**Status:** [x] Fixed
**Review:** Ready for code review

### Problems Fixed
1. **Console error:** `contained` prop was being passed to DOM element
2. **Inconsistent padding:** `pill-emphasized` had different padding than `pill` variant

### Solution Applied

**File:** `src/components/ui/tabs.tsx`

#### 1. Removed unused `contained` prop
The `contained` prop was being passed through to the DOM, causing a React warning. Removed it from the component since it wasn't implemented.

#### 2. Matched pill-emphasized padding with pill

```diff
  // Pill-emphasized sizes - same padding as pill
- { variant: "pill-emphasized", size: "m", className: "h-[var(--space-36)] px-[var(--space-12)]" },
+ { variant: "pill-emphasized", size: "m", className: "h-[var(--space-36)] px-[var(--space-16)]" },
  { variant: "pill-emphasized", size: "s", className: "h-[var(--space-32)] px-[var(--space-12)]" },
```

**File:** `src/app/docs/tabs/page.tsx`

Removed all `contained` prop usages from docs examples.

### Summary

| Variant | Size | Before | After |
|---------|------|--------|-------|
| pill | m | 16px | 16px |
| pill | s | 12px | 12px |
| pill-emphasized | m | 12px | **16px** |
| pill-emphasized | s | 12px | 12px |

### Why This Is NOT Breaking Base UI

- Removed prop that was incorrectly passing to DOM (cleanup)
- Only CSS padding values changed (pure styling)
- No Base UI behavior modified

---

## 42. Menu - Minimum Width Consistency with Context Menu
**Status:** [x] Fixed
**Review:** Ready for code review

### Problem
Menu popup was narrower than Context Menu popup. Context Menu had `min-w-[220px]` while Menu had no minimum width constraint.

### Analysis

| Component | Before | After |
|-----------|--------|-------|
| **Menu** | `listPopupStyles.width` only (`min-w-[var(--anchor-width)]`) | + `min-w-[220px]` |
| **Context Menu** | `min-w-[220px] max-w-[400px]` | unchanged |

### Why Not Change Shared Styles?

The `listPopupStyles.width` is used by:
- Menu
- Autocomplete
- Combobox
- Select

Autocomplete, Combobox, and Select need to match their input field width, so adding a fixed `min-w-[220px]` to shared styles would break them.

### Solution Applied

**File:** `src/components/ui/menu.tsx`

Added `min-w-[220px]` directly to Menu.Popup only:

```diff
  function MenuPopup({ className, ...props }: MenuPopupProps) {
    return (
      <MenuPrimitive.Popup
        data-slot="menu-popup"
        className={cn(
          listPopupStyles.base,
+         "min-w-[220px]",
          listPopupStyles.width,
          "overflow-y-auto",
          className
        )}
        style={{ maxHeight: LIST_MAX_HEIGHT }}
        {...props}
      />
    )
  }
```

### Why This Is NOT Breaking Base UI

- Pure CSS styling via className
- No Base UI behavior modified
- Other components (Autocomplete, Combobox, Select) unaffected

---

## 43. Menu - Group Label Padding Alignment
**Status:** [x] Fixed
**Review:** Ready for code review

### Problem
MenuGroupLabel had different horizontal padding than MenuItem, causing misalignment.

### Solution Applied

**File:** `src/components/ui/menu-group.tsx`

```diff
  <Menu.GroupLabel
    className={cn(
-     "flex min-h-[28px] items-center px-[var(--space-12)] py-[var(--space-6)]...",
+     "flex min-h-[28px] items-center px-[var(--space-10)] py-[var(--space-6)]...",
    )}
  >
```

| Component | Before | After |
|-----------|--------|-------|
| MenuItem | 10px | 10px |
| MenuGroupLabel | 12px | **10px** |

---

## 44. Menu - Submenu Chevron Alignment
**Status:** [x] Fixed
**Review:** Ready for code review

### Problem
The submenu chevron (arrow icon) was positioned close to the label instead of on the rightmost side of the menu item.

### Solution Applied

**File:** `src/components/ui/menu-suffix.tsx`

Added `ml-auto` to the `submenu` variant to push the chevron to the right:

```diff
  const menuSuffixVariants = cva(
    "flex shrink-0 items-center justify-center",
    {
      variants: {
        type: {
          checkmark: "w-[20px] h-[24px] px-[var(--space-2)] py-[var(--space-4)]",
-         submenu: "w-[20px] h-[24px] px-[var(--space-2)] py-[var(--space-4)]",
+         submenu: "ml-auto w-[20px] h-[24px] px-[var(--space-2)] py-[var(--space-4)]",
          ...
        },
      },
    }
  )
```

### Why This Is NOT Breaking Base UI

- Pure CSS styling (`ml-auto` for layout)
- No Base UI behavior modified

---

## 45. Menu - Documentation Examples Update
**Status:** [x] Fixed
**Review:** Ready for code review

### Changes Made

**File:** `src/app/docs/menu/page.tsx`

Added new documentation examples:

| Section | Description |
|---------|-------------|
| **Trigger Variants** | Icon button trigger, Avatar trigger |
| **With Avatars** | User selection with avatar prefixes |
| **With Badge** | Status indicators with badge suffixes |
| **Disabled Items** | Showing unavailable actions |
| **With Switch** | Toggle settings with switch controls |

Updated existing examples:
- **Grouped actions**: Added icons to menu items
- **Submenu**: Added icons to all menu items (parent and nested)
- **Selections**: Checkbox and Radio examples already present

### New Imports Added

```tsx
import { IconButton } from "@/components/ui/icon-button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
```

### Why This Is NOT Breaking Base UI

- Documentation changes only
- No component behavior modified

---

## 46. Menu Documentation - Example Polish (Follow-up)
**Status:** [x] Fixed
**Review:** Ready for code review

### Changes Made

**File:** `src/app/docs/menu/page.tsx`

Polished menu documentation examples based on detailed feedback:

#### 1. Icon Button Trigger
- Changed `variant="secondary"` to `variant="ghost"` for cleaner appearance
- Increased size from `s` to `m` for better visibility

```diff
- <Menu.Trigger render={<IconButton variant="secondary" size="s"><RiMore2Line /></IconButton>} />
+ <Menu.Trigger render={<IconButton variant="ghost" size="m"><RiMore2Line /></IconButton>} />
```

#### 2. Avatar Trigger
- Added `isEmphasized color="blue"` for decorative styling
- Increased size from `s` to `m`
- Added icons to all menu items (Profile, Settings, Messages, Log out)

```diff
- <Menu.Trigger render={<button className="cursor-pointer"><Avatar size="s" initials="JD" /></button>} />
+ <Menu.Trigger render={<button className="cursor-pointer"><Avatar size="m" initials="JD" isEmphasized color="blue" /></button>} />
```

#### 3. Assign to User Avatars
- Added different decorative colors for each avatar

```diff
- <Avatar size="2xs" initials="AJ" />
+ <Avatar size="2xs" initials="AJ" isEmphasized color="blue" />

- <Avatar size="2xs" initials="BS" />
+ <Avatar size="2xs" initials="BS" isEmphasized color="emerald" />

- <Avatar size="2xs" initials="CW" />
+ <Avatar size="2xs" initials="CW" isEmphasized color="violet" />

- <Avatar size="2xs" initials="DM" />
+ <Avatar size="2xs" initials="DM" isEmphasized color="orange" />
```

#### 4. Badge Example
- Changed from notifications (Messages, Alerts, Updates with counts) to navigation pattern
- New items: Dashboard, Analytics, AI Assistant (with "New" badge), Settings
- Added icons for all items
- Used colored badge with text (`isEmphasized variant="info"`)
- Added `ml-auto` to push badge to right side

```tsx
<MenuItem>
  <MenuPrefix type="icon" icon={<RiRobot2Line />} />
  <span className={menuItemLabelClassName}>AI Assistant</span>
  <Badge size="xs" isEmphasized variant="info" className="ml-auto">New</Badge>
</MenuItem>
```

#### 5. Switch Example
- Added `onClick` handler to each MenuItem to toggle switch when clicking the menu item
- Changed sound icon from `RiInformationLine` to `RiSoundModuleLine`

```diff
- <MenuItem closeOnClick={false}>
+ <MenuItem closeOnClick={false} onClick={() => setNotifications(!notifications)}>
```

### New Icons Added

```tsx
import {
  RiUserLine,       // Profile
  RiLogoutBoxLine,  // Log out
  RiDashboardLine,  // Dashboard
  RiBarChartLine,   // Analytics
  RiRobot2Line,     // AI Assistant
  RiSoundModuleLine, // Sounds
} from "@remixicon/react"
```

### Why This Is NOT Breaking Base UI

- Documentation changes only
- Uses existing component props and APIs as designed
- No component behavior modified

---

## 47. Menu - Switch Alignment and Label Font Weight
**Status:** [x] Fixed
**Review:** Ready for code review

### Problems Fixed
1. **Switch not right-aligned:** MenuSuffix switch type was missing `ml-auto`, so switch appeared close to label instead of on rightmost side
2. **Label font weight:** Menu item labels in docs used `font-weight-default` instead of `font-weight-medium`

### Solution Applied

#### 1. Switch Right Alignment

**File:** `src/components/ui/menu-suffix.tsx`

Added `ml-auto` to the switch variant to push it to the right edge:

```diff
  type: {
    checkmark: "w-[20px] h-[24px] px-[var(--space-2)] py-[var(--space-4)]",
    submenu: "ml-auto w-[20px] h-[24px] px-[var(--space-2)] py-[var(--space-4)]",
-   switch: "w-[40px] h-[24px] px-[var(--space-2)] py-[var(--space-2)]",
+   switch: "ml-auto w-[40px] h-[24px] px-[var(--space-2)] py-[var(--space-2)]",
    icon: "w-[20px] h-[24px] px-[var(--space-2)] py-[var(--space-4)]",
  },
```

#### 2. Label Font Weight (Component Level)

**File:** `src/components/ui/list-item-styles.tsx`

Changed `listItemVariants` font weight from default to medium:

```diff
  // Typography
- "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
+ "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]",
```

This affects all components using `listItemVariants`:
- MenuItem (Menu)
- MenuItem (ContextMenu)
- Select items
- Any other list-based dropdown items

**File:** `src/app/docs/menu/page.tsx`

Removed explicit font-weight from docs since it now inherits from component:

```diff
  const menuItemLabelClassName =
-   "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]"
+   "text-[length:var(--font-size-m)] leading-[var(--line-height-m)]"
```

Note: Description text keeps `font-weight-default` as intended.

### Why This Is NOT Breaking Base UI

- Pure CSS styling changes
- `ml-auto` is standard Tailwind for flex alignment
- No Base UI behavior modified

---
