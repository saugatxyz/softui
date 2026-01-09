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

## Action Components

### Button
**When to use:** Trigger actions. Primary CTA, form submit, navigation.

**Base UI Primitive:** `@base-ui/react/button`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary"` \| `"secondary"` \| `"tertiary"` \| `"ghost"` \| `"link"` \| `"link-neutral"` \| `"danger"` | `"primary"` | Visual style |
| `size` | `"xs"` \| `"s"` \| `"m"` \| `"l"` | `"m"` | Button size |
| `tone` | Semantic or decorative color | - | Color override for ghost/link variants |
| `leadingIcon` | `ReactNode` | - | Icon before label |
| `trailingIcon` | `ReactNode` | - | Icon after label |

```tsx
import { Button } from "@/components/ui/button"

<Button variant="primary" size="m" leadingIcon={<RiAddLine />}>
  Create
</Button>
```

---

### IconButton
**When to use:** Icon-only actions when the icon is universally understood.

**Base UI Primitive:** `@base-ui/react/button`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary"` \| `"secondary"` \| `"tertiary"` \| `"ghost"` \| `"danger"` | `"secondary"` | Visual style |
| `size` | `"3xs"` \| `"2xs"` \| `"xs"` \| `"s"` \| `"m"` \| `"l"` | `"m"` | Button size |
| `tone` | Semantic or decorative color | - | Color override |

```tsx
import { IconButton } from "@/components/ui/icon-button"

<IconButton variant="ghost" size="xs">
  <RiMoreLine />
</IconButton>
```

---

### ButtonGroup
**When to use:** Group related buttons together with connected styling.

**Note:** Custom component, not a Base UI primitive.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"secondary"` \| `"tertiary"` | `"secondary"` | Visual style for all buttons |
| `size` | `"xs"` \| `"s"` \| `"m"` \| `"l"` | `"m"` | Size for all buttons |
| `disabled` | `boolean` | `false` | Disable all buttons |

```tsx
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"

<ButtonGroup variant="secondary" size="s">
  <ButtonGroupItem leadingIcon={<RiAlignLeft />} />
  <ButtonGroupItem leadingIcon={<RiAlignCenter />} />
  <ButtonGroupItem leadingIcon={<RiAlignRight />} />
</ButtonGroup>
```

---

## Display Components

### Badge
**When to use:** Display status, category, or count. Non-interactive.

**Note:** Custom component, not a Base UI primitive.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | Semantic (`"neutral"`, `"info"`, `"warning"`, `"danger"`, `"success"`) or decorative colors | `"neutral"` | Color variant |
| `size` | `"xs"` \| `"s"` \| `"m"` | `"s"` | Badge size |
| `isEmphasized` | `boolean` | `false` | Add colored background and border |
| `leadingIcon` | `ReactNode` | - | Icon before label (s/m only) |
| `trailingIcon` | `ReactNode` | - | Icon after label (s/m only) |
| `leadingDot` | `boolean` | `false` | Status dot before label |
| `trailingDot` | `boolean` | `false` | Status dot after label |

```tsx
import { Badge } from "@/components/ui/badge"

<Badge variant="success" isEmphasized leadingDot>Active</Badge>
<Badge variant="info" size="xs">Beta</Badge>
```

---

### Chip
**When to use:** Selectable/removable items like filters, tags, or selected values.

**Note:** Custom component, not a Base UI primitive.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"s"` \| `"m"` | `"s"` | Chip size |
| `selected` | `boolean` | `false` | Shows X button for removal |
| `disabled` | `boolean` | `false` | Disable chip |
| `icon` | `ReactNode` | - | Leading icon |
| `prefix` | `ReactNode` | - | Custom prefix (Avatar, Logo, etc.) |
| `onRemove` | `() => void` | - | Callback when X is clicked |

```tsx
import { Chip } from "@/components/ui/chip"

<Chip selected onRemove={() => {}}>Active Filter</Chip>
<Chip icon={<RiFilterLine />}>Type</Chip>
```

---

### ChipGroup
**When to use:** Container for multiple chips with consistent spacing.

**Note:** Custom component providing context for Chip sizing.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"s"` \| `"m"` | `"s"` | Size for all chips |

```tsx
import { ChipGroup } from "@/components/ui/chip-group"
import { Chip } from "@/components/ui/chip"

<ChipGroup size="s">
  <Chip selected>Active</Chip>
  <Chip>Pending</Chip>
  <Chip>Archived</Chip>
</ChipGroup>
```

---

### Avatar
**When to use:** Represent users or entities visually.

**Base UI Primitive:** `@base-ui/react/avatar`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"3xs"` \| `"2xs"` \| `"xs"` \| `"s"` \| `"m"` \| `"l"` | `"m"` | Avatar size |
| `shape` | `"circular"` \| `"square"` | `"circular"` | Avatar shape |
| `src` | `string` | - | Image URL |
| `alt` | `string` | `""` | Alt text |
| `initials` | `string` | - | Fallback initials (1-2 chars) |
| `icon` | `ReactNode` | User icon | Custom fallback icon |
| `isEmphasized` | `boolean` | `false` | Colored background |
| `color` | Decorative color | - | Background color when emphasized |

```tsx
import { Avatar } from "@/components/ui/avatar"

<Avatar src="/avatars/avatar-1.png" size="m" />
<Avatar initials="JD" isEmphasized color="blue" />
```

---

### AvatarGroup
**When to use:** Display multiple avatars in a stacked group.

**Note:** Custom component wrapping Avatar.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | Same as Avatar | `"m"` | Size for all avatars |
| `shape` | `"circular"` \| `"square"` | `"circular"` | Shape for all avatars |
| `max` | `number` | - | Max visible avatars (shows +N) |

```tsx
import { AvatarGroup } from "@/components/ui/avatar-group"
import { Avatar } from "@/components/ui/avatar"

<AvatarGroup size="s" max={3}>
  <Avatar src="/avatars/avatar-1.png" />
  <Avatar src="/avatars/avatar-2.png" />
  <Avatar src="/avatars/avatar-3.png" />
  <Avatar src="/avatars/avatar-4.png" />
</AvatarGroup>
```

---

### Separator
**When to use:** Visual divider between content sections.

**Base UI Primitive:** `@base-ui/react/separator`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal"` \| `"vertical"` | `"horizontal"` | Separator direction |

```tsx
import { Separator } from "@/components/ui/separator"

<Separator />
<Separator orientation="vertical" />
```

---

### Kbd
**When to use:** Display keyboard shortcuts.

**Note:** Custom component, not a Base UI primitive.

```tsx
import { Kbd } from "@/components/ui/kbd"

<Kbd>⌘</Kbd>
<Kbd>K</Kbd>
```

---

### Logo
**When to use:** Display brand/service logos.

**Note:** Custom component for consistent logo rendering.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | Logo name string | - | Which logo to display |
| `size` | `number` | `24` | Logo size in pixels |

```tsx
import { Logo } from "@/components/ui/logo"

<Logo logo="discord" size={24} />
<Logo logo="github" size={20} />
```

---

## Progress Components

### Progress
**When to use:** Show completion progress of a task (determinate progress).

**Base UI Primitive:** `@base-ui/react/progress`

**Sub-components:** `Progress.Root`, `Progress.Label`, `Progress.Track`, `Progress.Indicator`, `Progress.Value`

**Props (Root):**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Current progress (0-100) |
| `tone` | `"neutral"` \| `"positive"` \| `"warning"` \| `"danger"` | `"neutral"` | Color theme |
| `size` | `"s"` \| `"m"` | `"s"` | Track height |

```tsx
import { Progress } from "@/components/ui/progress"

<Progress.Root value={65} tone="positive" size="m">
  <Progress.Label>Uploading</Progress.Label>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
  <Progress.Value />
</Progress.Root>
```

---

### Meter
**When to use:** Display a value within a known range (like disk usage, battery).

**Base UI Primitive:** `@base-ui/react/meter`

**Sub-components:** `Meter.Root`, `Meter.Label`, `Meter.Track`, `Meter.Indicator`, `Meter.Value`

**Props (Root):**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Current value |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `tone` | `"neutral"` \| `"positive"` \| `"warning"` \| `"danger"` | `"neutral"` | Color theme |
| `size` | `"s"` \| `"m"` | `"s"` | Track height |

```tsx
import { Meter } from "@/components/ui/meter"

<Meter.Root value={75} min={0} max={100} tone="warning" size="m">
  <Meter.Label>Storage</Meter.Label>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
  <Meter.Value />
</Meter.Root>
```

---

### Slider
**When to use:** Select a numeric value by dragging a thumb.

**Base UI Primitive:** `@base-ui/react/slider`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Controlled value |
| `defaultValue` | `number` | `min` | Initial uncontrolled value |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `disabled` | `boolean` | `false` | Disable slider |
| `label` | `string` | - | Label text |
| `description` | `string` | - | Description text |
| `showValue` | `boolean` | `true` | Show value indicator |
| `editableValue` | `boolean` | `true` | Allow direct value editing |
| `formatValue` | `(value: number) => string` | - | Custom value formatting |
| `onValueChange` | `(value: number) => void` | - | Change callback |
| `onValueCommitted` | `(value: number) => void` | - | Commit callback (drag end) |

```tsx
import { Slider } from "@/components/ui/slider"

<Slider
  label="Volume"
  defaultValue={50}
  min={0}
  max={100}
  formatValue={(v) => `${v}%`}
/>
```

---

## Feedback Components

### Toast
**When to use:** Non-blocking feedback after an action.

**Base UI Primitive:** `@base-ui/react/toast`

**Sub-components:** `Toast.Provider`, `Toast.Portal`, `Toast.Viewport`, `Toast.Root`, `Toast.Content`, `Toast.CompactContent`, `Toast.TextWrapper`, `Toast.CompactTextWrapper`, `Toast.Title`, `Toast.Description`, `Toast.Actions`, `Toast.CompactActions`, `Toast.Action`, `Toast.CompactAction`, `Toast.Close`, `Toast.Icon`

**Props (Root):**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"card"` \| `"compact"` | `"card"` | Toast style |

**Props (Viewport):**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"top-right"` \| `"top-left"` \| `"bottom-right"` \| `"bottom-left"` \| `"top-center"` \| `"bottom-center"` | `"bottom-right"` | Toast position |

**Props (Icon):**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tone` | `"default"` \| `"info"` \| `"success"` \| `"warning"` \| `"danger"` | `"default"` | Icon color |

```tsx
import { Toast, useToastManager } from "@/components/ui/toast"

// Card variant
<Toast.Root variant="card">
  <Toast.Content>
    <Toast.Icon tone="success" />
    <Toast.TextWrapper>
      <Toast.Title>Saved</Toast.Title>
      <Toast.Description>Your changes have been saved.</Toast.Description>
    </Toast.TextWrapper>
    <Toast.Close />
  </Toast.Content>
</Toast.Root>

// Compact variant
<Toast.Root variant="compact">
  <Toast.CompactContent>
    <Toast.Icon tone="success" />
    <Toast.CompactTextWrapper>
      <Toast.Title>Saved</Toast.Title>
    </Toast.CompactTextWrapper>
    <Toast.Close />
  </Toast.CompactContent>
</Toast.Root>
```

---

### Banner
**When to use:** Page-level or section-level announcements.

**Note:** Custom component, not a Base UI primitive.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tone` | `"default"` \| `"info"` \| `"success"` \| `"warning"` \| `"danger"` | `"default"` | Banner color |
| `icon` | `ReactNode` | Auto from tone | Custom icon |
| `title` | `string` | - | Banner title |
| `description` | `string` | - | Banner description |
| `action` | `ReactNode` | - | Action button |
| `onDismiss` | `() => void` | - | Dismiss callback (shows X) |

```tsx
import { Banner } from "@/components/ui/banner"

<Banner
  tone="info"
  title="New feature available"
  description="Check out our latest updates."
  action={<Button variant="link" size="xs">Learn more</Button>}
  onDismiss={() => {}}
/>
```

---

### InlineNotification
**When to use:** Contextual feedback within content areas.

**Note:** Custom component, not a Base UI primitive.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tone` | `"default"` \| `"info"` \| `"success"` \| `"warning"` \| `"danger"` | `"default"` | Notification color |
| `title` | `string` | - | Notification title |
| `description` | `string` | - | Notification description |
| `action` | `ReactNode` | - | Action element |
| `onDismiss` | `() => void` | - | Dismiss callback (shows X) |

```tsx
import { InlineNotification } from "@/components/ui/inline-notification"

<InlineNotification
  tone="warning"
  title="Rate limit approaching"
  description="You've used 80% of your API quota."
/>
```

---

### EmptyState
**When to use:** Display when there's no content to show.

**Note:** Custom component, not a Base UI primitive.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | - | Illustration/icon |
| `title` | `string` | - | Empty state title |
| `description` | `string` | - | Empty state description |
| `action` | `ReactNode` | - | Action button |

```tsx
import { EmptyState } from "@/components/ui/empty-state"

<EmptyState
  icon={<RiInboxLine />}
  title="No messages"
  description="You don't have any messages yet."
  action={<Button>Compose</Button>}
/>
```

---

## Data Components

### Table
**When to use:** Display tabular data with sorting, selection, and actions.

**Note:** Custom component with semantic HTML table elements.

**Sub-components:** `Table.Root`, `Table.Header`, `Table.Body`, `Table.Footer`, `Table.Row`, `Table.Head`, `Table.Cell`, `Table.Caption`, `Table.CheckboxCell`, `Table.TextCell`, `Table.NumberCell`, `Table.BadgeCell`, `Table.AvatarGroupCell`, `Table.ProgressCell`, `Table.ActionsCell`

**Props (Root):**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"s"` \| `"m"` \| `"l"` | `"m"` | Row height |

**Props (Head):**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortable` | `boolean` | `false` | Enable sorting |
| `sortDirection` | `"asc"` \| `"desc"` \| `null` | `null` | Current sort |
| `onSort` | `() => void` | - | Sort callback |
| `align` | `"left"` \| `"right"` | `"left"` | Text alignment |

**Props (Row):**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | `false` | Row selected state |
| `isHeader` | `boolean` | `false` | Is header row |

**Props (TextCell):**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `additionalInfo` | `string` | - | Secondary text |
| `prefix` | `ReactNode` | - | Leading element |
| `suffix` | `ReactNode` | - | Trailing element |
| `emphasized` | `boolean` | `false` | Bold text |

```tsx
import { Table } from "@/components/ui/table"

<Table.Root size="m">
  <Table.Header>
    <Table.Row isHeader>
      <Table.Head sortable sortDirection="asc" onSort={() => {}}>Name</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head align="right">Amount</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.TextCell emphasized>John Doe</Table.TextCell>
      <Table.BadgeCell variant="success">Active</Table.BadgeCell>
      <Table.NumberCell>$1,234.56</Table.NumberCell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

---

### Pagination
**When to use:** Navigate between pages of content.

**Note:** Custom component using Base UI Button.

**Components:** `Pagination`, `PaginationContent`, `PageIndicator`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`

**Props (Pagination):**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs"` \| `"s"` \| `"m"` \| `"l"` | `"m"` | Control size |

**Props (PageIndicator):**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isActive` | `boolean` | `false` | Current page |

```tsx
import { Pagination, PaginationContent, PageIndicator, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination"

<Pagination size="m">
  <PaginationPrevious />
  <PaginationContent>
    <PageIndicator isActive>1</PageIndicator>
    <PageIndicator>2</PageIndicator>
    <PageIndicator>3</PageIndicator>
    <PaginationEllipsis />
    <PageIndicator>10</PageIndicator>
  </PaginationContent>
  <PaginationNext />
</Pagination>
```

---

## Form Components

### Input
**When to use:** Single-line text input.

**Note:** This is a styled native `<input>`, not a Base UI primitive.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"s"` \| `"m"` \| `"l"` | `"m"` | Input size |
| `leadingIcon` | `ReactNode` | - | Icon at start |
| `trailingIcon` | `ReactNode` | - | Icon at end |

---

### Number Field
**When to use:** Numeric input with increment/decrement controls.

**Base UI Primitive:** `@base-ui/react/number-field`

---

### InputGroup
**When to use:** Combine input with prefix/suffix elements.

**Note:** Custom component for input composition.

**Sub-components:** `InputGroup`, `InputGroup.Prefix`, `InputGroup.Suffix`

```tsx
import { InputGroup } from "@/components/ui/input-group"

<InputGroup>
  <InputGroup.Prefix>$</InputGroup.Prefix>
  <Input type="number" />
  <InputGroup.Suffix>USD</InputGroup.Suffix>
</InputGroup>
```

---

### Field
**When to use:** Wrapper for form inputs providing label, description, and error states.

**Base UI Primitive:** `@base-ui/react/field`

**Sub-components:** `Field`, `Field.Label`, `Field.Description`, `Field.Error`

```tsx
import { Field } from "@/components/ui/field"

<Field>
  <Field.Label>Email</Field.Label>
  <Input type="email" />
  <Field.Description>We'll never share your email.</Field.Description>
  <Field.Error>Please enter a valid email.</Field.Error>
</Field>
```

---

### Fieldset
**When to use:** Group related form fields with a legend.

**Base UI Primitive:** `@base-ui/react/fieldset`

**Sub-components:** `Fieldset`, `Fieldset.Legend`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disable all fields |

```tsx
import { Fieldset } from "@/components/ui/fieldset"

<Fieldset>
  <Fieldset.Legend>Account Information</Fieldset.Legend>
  <Field>
    <Field.Label>Email</Field.Label>
    <Input type="email" />
  </Field>
</Fieldset>
```

---

### Form
**When to use:** Form container with validation and submission handling.

**Base UI Primitive:** `@base-ui/react/form`

```tsx
import { Form } from "@/components/ui/form"

<Form onSubmit={(data) => console.log(data)}>
  <Field>
    <Field.Label>Name</Field.Label>
    <Input name="name" required />
  </Field>
  <Button type="submit">Submit</Button>
</Form>
```

---

### Autocomplete
**When to use:** Input with auto-suggestions from a predefined list.

**Base UI Primitive:** Based on `@base-ui/react/combobox`

**Data Attributes:** Same as Combobox (`data-highlighted`, `data-selected`, `data-disabled`)

**Difference from Combobox:** Autocomplete filters from a static list, while Combobox can have async data loading.

```tsx
import { Autocomplete } from "@/components/ui/autocomplete"

<Autocomplete
  options={["Apple", "Banana", "Cherry"]}
  placeholder="Search fruits..."
/>
```

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
