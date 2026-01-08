# Component Usage Guide

This document details when to use each component and how to implement them correctly with Base UI.

---

## Selection Components

### Tabs
**When to use:** Switching between content panels within the same context. Content is mutually exclusive.

**Base UI Primitive:** `@base-ui/react/tabs`
- `Tabs.Root` - Container, manages state
- `Tabs.List` - Tab button container (has `tablist` role)
- `Tabs.Tab` - Individual tab button
- `Tabs.Panel` - Content panel
- `Tabs.Indicator` - Optional animated indicator

**Data Attributes:**
| Element | Attribute | When Applied |
|---------|-----------|--------------|
| `Tabs.Tab` | `data-active` | Tab is currently selected |
| `Tabs.Tab` | `data-disabled` | Tab is disabled |

**Indicator Positioning:** Base UI provides CSS variables:
- `--active-tab-left` - Left position of active tab
- `--active-tab-width` - Width of active tab
- `--active-tab-top` - Top position (for vertical tabs)

```tsx
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
</Tabs>
```

---

### Segmented Control
**When to use:** Compact view/mode switcher. Visually distinct from tabs (contained pill shape). Functionally identical to Tabs.

**Base UI Primitive:** Same as Tabs (`@base-ui/react/tabs`)

**Data Attributes:** Same as Tabs - uses `data-active` for selected item.

**Key Difference from Tabs:** Styling only. The container has a background, items have no gap, active item has fill + shadow.

```tsx
<SegmentedControl defaultValue="list">
  <SegmentedControl.List>
    <SegmentedControl.Item value="list">List</SegmentedControl.Item>
    <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
  </SegmentedControl.List>
  <SegmentedControl.Content value="list">...</SegmentedControl.Content>
</SegmentedControl>
```

---

### Select
**When to use:** Dropdown to pick ONE value from a list. Form input semantics.

**Base UI Primitive:** `@base-ui/react/select`
- `Select.Root` - Container, manages state
- `Select.Trigger` - Button that opens dropdown
- `Select.Value` - Displays selected value
- `Select.Portal` - Renders dropdown in portal
- `Select.Positioner` - Handles positioning
- `Select.Popup` - Dropdown container
- `Select.Option` - Individual option
- `Select.OptionIndicator` - Checkmark for selected option

**Data Attributes:**
| Element | Attribute | When Applied |
|---------|-----------|--------------|
| `Select.Trigger` | `data-open` | Dropdown is open |
| `Select.Option` | `data-highlighted` | Option has keyboard/hover focus |
| `Select.Option` | `data-selected` | Option is the current value |
| `Select.Option` | `data-disabled` | Option is disabled |

```tsx
<Select defaultValue="option1">
  <Select.Trigger>
    <Select.Value placeholder="Select..." />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select>
```

---

### Combobox
**When to use:** Searchable dropdown. User can type to filter options.

**Base UI Primitive:** `@base-ui/react/combobox`
- Similar structure to Select, but with `Combobox.Input` instead of trigger

**Data Attributes:** Same as Select (`data-highlighted`, `data-selected`, `data-disabled`)

---

### Radio Group
**When to use:** Pick ONE option from a small set (2-5 options). All options visible at once.

**Base UI Primitive:** `@base-ui/react/radio-group`
- `RadioGroup.Root` - Container
- `RadioGroup.Item` - Individual radio button
- `RadioGroup.Indicator` - Visual indicator (dot)

**Data Attributes:**
| Element | Attribute | When Applied |
|---------|-----------|--------------|
| `RadioGroup.Item` | `data-checked` | This option is selected |
| `RadioGroup.Item` | `data-disabled` | Option is disabled |

---

### Checkbox
**When to use:** Toggle a single boolean value, or select multiple items from a list.

**Base UI Primitive:** `@base-ui/react/checkbox`
- `Checkbox.Root` - The checkbox element
- `Checkbox.Indicator` - Visual indicator (checkmark)

**Data Attributes:**
| Element | Attribute | When Applied |
|---------|-----------|--------------|
| `Checkbox.Root` | `data-checked` | Checkbox is checked |
| `Checkbox.Root` | `data-indeterminate` | Partial selection (parent of mixed children) |
| `Checkbox.Root` | `data-disabled` | Checkbox is disabled |

---

### Switch
**When to use:** Toggle a setting on/off. Immediate effect (no form submit needed).

**Base UI Primitive:** `@base-ui/react/switch`
- `Switch.Root` - The switch track
- `Switch.Thumb` - The sliding thumb

**Data Attributes:**
| Element | Attribute | When Applied |
|---------|-----------|--------------|
| `Switch.Root` | `data-checked` | Switch is on |
| `Switch.Root` | `data-disabled` | Switch is disabled |

---

### Toggle / Toggle Group
**When to use:** Toggle = single on/off button. Toggle Group = select one or multiple from button group.

**Base UI Primitive:** `@base-ui/react/toggle`, `@base-ui/react/toggle-group`

**Data Attributes:**
| Element | Attribute | When Applied |
|---------|-----------|--------------|
| `Toggle.Root` | `data-pressed` | Toggle is active |

---

## Overlay Components

### Menu
**When to use:** Contextual actions triggered by a button. Ephemeral - closes after action.

**Base UI Primitive:** `@base-ui/react/menu`

**Data Attributes:**
| Element | Attribute | When Applied |
|---------|-----------|--------------|
| `Menu.Trigger` | `data-open` | Menu is open |
| `Menu.Item` | `data-highlighted` | Item has keyboard/hover focus |
| `Menu.Item` | `data-disabled` | Item is disabled |
| `Menu.CheckboxItem` | `data-checked` | Checkbox item is checked |
| `Menu.RadioItem` | `data-checked` | Radio item is selected |

---

### Context Menu
**When to use:** Right-click menu. Same as Menu but triggered by right-click.

**Base UI Primitive:** `@base-ui/react/menu` with `Menu.Trigger` using context trigger

---

### Dialog
**When to use:** Modal that requires user attention/action. Blocks interaction with page.

**Base UI Primitive:** `@base-ui/react/dialog`

**Data Attributes:**
| Element | Attribute | When Applied |
|---------|-----------|--------------|
| `Dialog.Popup` | `data-open` | Dialog is visible |
| `Dialog.Backdrop` | `data-open` | Backdrop is visible |

---

### Alert Dialog
**When to use:** Confirmation dialog for destructive/important actions. Cannot be dismissed by clicking outside.

**Base UI Primitive:** `@base-ui/react/alert-dialog`

---

### Popover
**When to use:** Non-modal overlay with arbitrary content. User can still interact with page.

**Base UI Primitive:** `@base-ui/react/popover`

**Data Attributes:**
| Element | Attribute | When Applied |
|---------|-----------|--------------|
| `Popover.Trigger` | `data-open` | Popover is open |
| `Popover.Popup` | `data-open` | Popover is visible |

---

### Tooltip
**When to use:** Brief helper text on hover/focus. No interactive content.

**Base UI Primitive:** `@base-ui/react/tooltip`

---

## Disclosure Components

### Accordion
**When to use:** Collapsible sections of content. Can be single or multiple open.

**Base UI Primitive:** `@base-ui/react/accordion`
- `Accordion.Root` - Container
- `Accordion.Item` - Individual section
- `Accordion.Header` - Section header
- `Accordion.Trigger` - Button to toggle
- `Accordion.Panel` - Collapsible content

**Data Attributes:**
| Element | Attribute | When Applied |
|---------|-----------|--------------|
| `Accordion.Item` | `data-open` | Section is expanded |
| `Accordion.Item` | `data-disabled` | Section is disabled |
| `Accordion.Trigger` | `data-open` | Section is expanded |

---

### Collapsible
**When to use:** Single collapsible section (simpler than Accordion).

**Base UI Primitive:** `@base-ui/react/collapsible`

**Data Attributes:**
| Element | Attribute | When Applied |
|---------|-----------|--------------|
| `Collapsible.Root` | `data-open` | Content is visible |
| `Collapsible.Trigger` | `data-open` | Content is visible |

---

## Form Components

### Input
**When to use:** Single-line text input.

**Note:** This is a styled native `<input>`, not a Base UI primitive.

---

### Number Field
**When to use:** Numeric input with increment/decrement controls.

**Base UI Primitive:** `@base-ui/react/number-field`

---

### Field
**When to use:** Wrapper for form inputs providing label, description, and error states.

**Base UI Primitive:** `@base-ui/react/field`

---

## Implementation Checklist

Before implementing any component:

1. **Identify the Base UI primitive** - Check this guide or Base UI docs
2. **Note the data attributes** - Use the correct ones for styling states
3. **Check existing components** - Look at similar components in `src/components/ui/`
4. **Follow the pattern:**
   - Extend Base UI types with `&`
   - Spread `{...props}` on primitives
   - Use `cva` for variants
   - Use design tokens for all values
5. **Run the audit checklist** after implementation
