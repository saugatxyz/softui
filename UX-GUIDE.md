# UX Guide: Component Selection & Variant Recommendations

This guide helps AI assistants and developers choose the right component and variant for any UI situation. It provides decision trees, variant recommendations, and usage patterns.

---

## Visual Design Rules

### Typography

**Text sizes:**
| Use Case | Token |
|----------|-------|
| Normal text | `--font-size-m` |
| Small titles | `--font-size-l` |
| Section titles | `--font-size-xl` |
| Page titles | `--font-size-3xl` |

**Font weights:**
- Page titles: semibold
- Section titles: semibold
- Small titles: medium
- Normal text: regular or medium (never semibold)

**Text colors:**
- Only use `content-strong` and `content-subtle`
- Do not use `content-muted` — if text isn't important enough for subtle, reconsider if it's needed

**Titles:**
- Not every title needs a subtitle or badge — most don't
- Only add subtitles when extra context is genuinely needed
- Only add badges for status or counts, not decoration

**Title + subtitle pairing:**

| Title Type | Title Style | Subtitle Size | Subtitle Style |
|------------|-------------|---------------|----------------|
| Page title | `content-strong`, semibold | `--font-size-m` | `content-subtle`, regular |
| Section title | `content-strong`, semibold | `--font-size-m` | `content-subtle`, regular |
| Small title | `content-strong`, medium | `--font-size-xs` | `content-subtle`, regular |
| Normal text | `content-strong`, medium | `--font-size-xs` | `content-subtle`, regular |

### Icons

- Never pair icons with labels or text outside of components
- Icons are only for use within components that natively support them (`leadingIcon`, `trailingIcon`, `icon`, `prefix`)
- Do not manually add icons next to labels, stats, headings, or any standalone text
- Do not manually size or style icons — components handle this

**When to use icons (within components):**
- Buttons: only when it adds clarity to the action (download, send, add)
- Inputs: only for type indicators (search, currency) — most inputs need no icon
- Menu items: sparingly, for key actions only — not every item
- List prefixes: when items need visual distinction (integrations, categories)

**When NOT to use icons:**
- Labels or stat labels (e.g., "Tasks Completed" doesn't need an icon)
- Generic form fields (name, email, description)
- Every menu item or list row
- When the label is already clear

### Containers

Containers are for grouping related content (cards, panels, etc.):

- Do not use containers to group content unless necessary
- Never wrap sections in containers
- Use fills for containers (e.g., `surface-*` tokens)
- Never combine fill + border on the same container — pick one

### Tables

- Do not wrap tables in visible containers (no fill, no border around the table)
- Rows have bottom borders as separators — that's the only visual division needed
- Header row can have a subtle background if needed

### Button Placement

- Never stack buttons vertically as a list of actions
- Place action buttons next to relevant section titles, aligned right
- Group related buttons horizontally with appropriate gap

### List Items (Repeating Content)

When displaying a list of similar items (team members, activity feed, files, etc.):
- Use gap between items, not cards with fills
- Each item is a row, not a card — no background, no border
- Save filled cards for feature highlights or distinct content blocks

### Page Layout

- 40px top and bottom padding for pages

### Component Styling

**STRICT: No component customization. Ever.**

- NEVER add custom colors, sizes, padding, or any styling to components
- NEVER use className to override component appearance
- Use ONLY the props components provide (`variant`, `size`, `tone`, etc.)
- If a component doesn't support what you need, use it as-is or ask — do not hack it
- Components are designed to work together — custom styling breaks consistency

---

## Quick Decision Trees

### "User needs to trigger an action"

```
Is it the primary action on the page?
├── Yes → Button (variant="primary")
└── No
    ├── Is it a destructive action (delete, remove)?
    │   └── Yes → Button (variant="danger")
    └── Is it secondary but still important?
        ├── Yes → Button (variant="secondary")
        └── Is it a tertiary/low-emphasis action?
            ├── Yes → Button (variant="tertiary")
            └── Is it navigation or inline text action?
                ├── Yes → Button (variant="link" or "link-neutral")
                └── Is it icon-only?
                    └── Yes → IconButton
```

### "User needs to select from options"

```
How many options?
├── 2-5 options, all visible at once
│   ├── Single selection → RadioGroup
│   └── Multiple selection → CheckboxGroup
├── 6+ options or space constrained
│   ├── User knows what they want → Select
│   └── User needs to search/filter → Combobox / Autocomplete
└── Switching between views/modes
    ├── Content panels below → Tabs
    └── Compact mode switcher → SegmentedControl
```

### "User needs to toggle a setting"

```
Is it a boolean on/off setting?
├── Immediate effect (no form submit) → Switch
├── Part of a form (submitted later) → Checkbox
└── Toggle button in a toolbar → Toggle / ToggleGroup
```

### "Show additional content/actions"

```
Does it block the page?
├── Yes (requires user action) → Dialog
│   ├── Confirmation/destructive → AlertDialog
│   ├── Form or complex content → Dialog (position="center")
│   └── Side panel/drawer → Dialog (position="right" or "sheet")
└── No (non-blocking)
    ├── Contextual actions list → Menu
    ├── Right-click actions → ContextMenu
    ├── Rich content/forms → Popover
    └── Brief helper text → Tooltip
```

### "Display status or metadata"

```
Is it interactive?
├── Yes (can be selected/removed) → Chip
└── No (display only)
    ├── Status indicator → Badge (with semantic variant)
    ├── Category/tag label → Badge (with decorative variant)
    └── User/entity identity → Avatar
```

---

## Component Reference

### Button

**Use when:** User needs to trigger an action.

| Variant | When to Use |
|---------|-------------|
| `primary` | Main CTA, most important action on the page. Limit to 1-2 per view. |
| `secondary` | Important but not primary actions. Safe default for most buttons. |
| `tertiary` | Low-emphasis actions, often in toolbars or card actions. Has subtle glass/shadow effect. |
| `ghost` | Minimal visual weight. Good for icon+text in dense UIs, navigation items. |
| `link` | Inline text actions, navigation. Uses accent color, shows underline on hover. |
| `link-neutral` | Same as link but neutral color. For less prominent inline actions. |
| `danger` | Destructive actions (delete, remove, disconnect). Red background. |

| Size | When to Use |
|------|-------------|
| `xs` | Compact UIs, inline actions, toasts |
| `s` | Secondary actions, tight layouts |
| `m` | Default size, most use cases |
| `l` | Hero CTAs, onboarding flows, emphasis |

**Tone prop:** Use `tone` for semantic (`info`, `warning`, `danger`, `success`) or decorative colors on ghost/tertiary variants.

**Icon guidance:**
- `leadingIcon`: Most common. Use for action clarity (e.g., download icon + "Download")
- `trailingIcon`: For indicating direction/expansion (e.g., arrow, chevron)

**Label guidance:**
- Keep button labels concise: 1-2 words when possible
- Use action verbs: "Save", "Delete", "View", "Clear"
- Context from surrounding UI eliminates need for verbose labels
- "View" not "View All Memories" when the setting label provides context

**Layout guidance:**
- Buttons should NOT stretch to fill containers. They maintain their intrinsic width.
- In flex column containers, buttons stretch by default. Always prevent this:
  - Add `items-start` on parent container, OR
  - Add `self-start` on the button itself
- Exception: Full-width buttons in narrow contexts (mobile sheets, narrow modals) can use `w-full` explicitly.

```tsx
// BAD - Button stretches in flex column
<div className="flex flex-col gap-[var(--space-16)]">
  <Button>Save</Button>
</div>

// GOOD - Prevent stretching with items-start
<div className="flex flex-col items-start gap-[var(--space-16)]">
  <Button>Save</Button>
</div>

// GOOD - Or use self-start on button
<div className="flex flex-col gap-[var(--space-16)]">
  <Button className="self-start">Save</Button>
</div>
```

**Button alignment:**

| Context | Alignment |
|---------|-----------|
| Settings pages (many fields) | Left-aligned |
| Dialogs/Modals | Right-aligned |
| Alert dialogs | Full-width (built into component) |

```tsx
// Settings page - left aligned
<div className="flex justify-start gap-[var(--space-12)]">
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save</Button>
</div>

// Modal footer - right aligned
<Dialog.Footer>  {/* Already handles right alignment */}
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Confirm</Button>
</Dialog.Footer>

// Alert dialog - full width buttons, no alignment needed
<AlertDialog.Footer>
  <AlertDialog.Close><Button variant="secondary">Cancel</Button></AlertDialog.Close>
  <Button variant="danger">Delete</Button>
</AlertDialog.Footer>
```

---

### IconButton

**Use when:** Action is clear from icon alone, or space is limited.

| Variant | When to Use |
|---------|-------------|
| `primary` | Rare. Main action when icon is universally understood (e.g., + for "Add"). |
| `secondary` | Default for standalone icon buttons. Good contrast and visibility. |
| `tertiary` | Floating actions, toolbar buttons with glass effect. |
| `ghost` | Dense UIs, table row actions, header icons. Minimal visual noise. |
| `danger` | Destructive icon actions (trash, X for delete). |

| Size | When to Use |
|------|-------------|
| `3xs` | Inline close buttons (toasts, chips), very tight spaces |
| `2xs` | Small inline actions, dense lists |
| `xs` | Compact toolbars, table actions |
| `s` | Standard toolbar buttons |
| `m` | Default, standalone icon buttons |
| `l` | Hero/prominent icon actions |

---

### Badge

**Use when:** Displaying status, category, or count without interaction.

| Variant Category | Variants | When to Use |
|------------------|----------|-------------|
| **Semantic** | `neutral`, `info`, `warning`, `danger`, `success` | Status indicators with meaning |
| **Decorative** | `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose` | Categories, tags, labels without semantic meaning |

| Prop | When to Use |
|------|-------------|
| `isEmphasized` | When badge needs more visual weight. Adds colored background and border. |
| `leadingDot` | Status indicators (online/offline, active/inactive) |
| `leadingIcon` / `trailingIcon` | Adding context (e.g., check icon for verified) |

| Size | When to Use |
|------|-------------|
| `xs` | **Inline with regular labels/text** - most common. Use when badge appears next to field labels, setting names, or in tight spaces. |
| `s` | **Standalone status** or **large headings/titles** (including number counts in titles). Use for status indicators on their own, or next to page titles and section headings. |
| `m` | Standalone badges when extra emphasis needed |

```tsx
// GOOD - xs for inline with regular label
<div className="flex items-center gap-[var(--space-8)]">
  <p>Remember Conversations</p>
  <Badge size="xs" variant="info">Beta</Badge>
</div>

// GOOD - s for standalone status
<Badge size="s" variant="success" leadingDot>Active</Badge>

// GOOD - s for page/section headings
<div className="flex items-center gap-[var(--space-12)]">
  <h1>Settings</h1>
  <Badge size="s" variant="info">AI Chat</Badge>
</div>

// GOOD - s for number count in title
<div className="flex items-center gap-[var(--space-12)]">
  <h2>Notifications</h2>
  <Badge size="s" variant="neutral">42</Badge>
</div>

// BAD - s mixed with regular label (should be xs)
<div className="flex items-center gap-[var(--space-8)]">
  <p>Feature Name</p>
  <Badge size="s">New</Badge>
</div>
```

**Usage patterns:**
- **Status:** `variant="success"` + `isEmphasized` + `leadingDot` for "Active"
- **Count:** `variant="neutral"` + number for notification counts
- **Category:** Decorative colors for tagging content types

---

### Chip

**Use when:** Representing selectable/removable items like filters, tags, or selected values.

| State | When to Use |
|-------|-------------|
| Unselected | Available option that can be selected |
| Selected | Shows X button for removal. Active filter/selection. |
| Disabled | Option not currently available |

| Size | When to Use |
|------|-------------|
| `s` | Compact filter bars, inline selections |
| `m` | Default, filter panels, tag inputs |

**Common patterns:**
- **Filter chips:** Horizontal group of chips for filtering content
- **Tag input:** Chips inside an input for multi-select with text entry
- **Selected items:** Show what user has chosen with ability to remove

**Prefixes:**
- `icon` prop: Leading icon
- `prefix` prop: Custom prefix (Avatar, Logo, etc.)

---

### Input

**Use when:** Collecting single-line text input.

| Size | When to Use |
|------|-------------|
| `s` | Compact forms, inline editing, tables |
| `m` | Default, most form fields |
| `l` | Emphasized inputs, search bars |

**Icon guidance:**
- `leadingIcon`: Context/type indicator (e.g., search icon, $ for currency)
- `trailingIcon`: Actions or status (e.g., clear button, validation icon)

**Layout guidance:**
- Don't stack input fields horizontally by default. Keep fields in a single column.
- Only stack fields side-by-side for extremely related inputs that are entered together (e.g., First name + Last name, City + State + Zip).
- Use Fieldset to group related fields - it handles vertical spacing automatically.

---

### Select

**Use when:** User picks ONE option from a predefined list.

| Size | When to Use |
|------|-------------|
| `s` | Compact forms, table cells |
| `m` | Default, standard forms |
| `l` | Emphasized selections |

**Use Select over RadioGroup when:**
- More than 5 options
- Space is limited
- Options might change dynamically

**Use `multiple={true}` when:** User can select multiple values.

---

### Tabs

**Use when:** Switching between mutually exclusive content panels.

**Prefer pill variants.** Use `pill-emphasized` for page-level tabs.

| Variant | When to Use |
|---------|-------------|
| `pill-emphasized` | Page-level tabs |
| `pill` | Other contexts |
| `stroke` | When underline style is preferred |

| Size | When to Use |
|------|-------------|
| `s` | Compact UIs, nested navigation |
| `m` | Default, page-level tabs |

**Content spacing:** Use `gap-[var(--space-32)]` (32px) for spacing within tab content panels.

---

### SegmentedControl

**Use when:** Compact view/mode switcher (functionally identical to Tabs but visually distinct).

**Use SegmentedControl over Tabs when:**
- Switching view modes (List/Grid/Map)
- Toggle between 2-4 options
- Need contained, button-like appearance

---

### Dialog

**Use when:** Interrupting user flow for focused interaction.

| Position | When to Use |
|----------|-------------|
| `center` | Default. Forms, confirmations, focused tasks. |
| `right` | Side panels, settings, detail views, editing. |
| `sheet` | Mobile-friendly bottom sheet, quick actions. |

**Use AlertDialog instead when:**
- Confirming destructive actions
- Must not be dismissed by clicking outside

---

### Toast

**Use when:** Providing non-blocking feedback after an action.

| Variant | When to Use |
|---------|-------------|
| `card` | Default. Has title, description, and optional actions. More prominent. |
| `compact` | Brief confirmations. Single line, minimal height. |

| Tone | When to Use |
|------|-------------|
| `default` | Neutral information |
| `info` | Informational, blue icon |
| `success` | Action completed successfully, green icon |
| `warning` | Caution or potential issue, amber icon |
| `danger` | Error or failure, red icon |

---

### Avatar

**Use when:** Representing users or entities.

**Use local avatars.** For examples and demos, use images from `/public/avatars/` (avatar-1.png through avatar-8.png). Do not use random internet URLs.

| Size | When to Use |
|------|-------------|
| `3xs` | Inline mentions, compact lists |
| `2xs` | Small avatars in dense UIs |
| `xs` | Comment headers, small cards |
| `s` | List items, table cells |
| `m` | Default, profile displays |
| `l` | Profile headers, hero sections |

| Shape | When to Use |
|-------|-------------|
| `circular` | Default. People, users. |
| `square` | Companies, workspaces, bots, non-human entities. |

| Props | When to Use |
|-------|-------------|
| `initials` | When no image available, show 1-2 letters |
| `icon` | Custom fallback icon (default is user icon) |
| `isEmphasized` + `color` | Colored background for visual distinction |

---

### Tooltip

**Use when:** Providing brief contextual help on hover/focus.

| Content Type | When to Use |
|--------------|-------------|
| `Tooltip.Simple` | Short label + optional keyboard shortcut |
| `Tooltip.Explainer` | Title + description + optional shortcut |
| `Tooltip.Breakdown` | Data visualizations, charts (shows color-coded items) |

**Guidelines:**
- Keep text concise
- Don't put essential info only in tooltips
- Use for supplementary context
- Include keyboard shortcuts when applicable

---

### Menu / ContextMenu

**Use when:** Showing a list of actions.

| Component | When to Use |
|-----------|-------------|
| `Menu` | Triggered by button click. Dropdown menus. |
| `ContextMenu` | Triggered by right-click. |

---

### Popover

**Use when:** Non-blocking overlay with rich content.

**Use Popover over Tooltip when:**
- Content is interactive (buttons, links, forms)
- Content is longer than a sentence or two
- User needs to interact with the content

---

### RadioGroup / CheckboxGroup / SwitchGroup

**Use when:** Selecting from visible options or toggling settings.

| Component | When to Use |
|-----------|-------------|
| `RadioGroup` | Single selection from 2-5 visible options |
| `CheckboxGroup` | Multiple selection from visible options |
| `SwitchGroup` | Multiple independent toggles |

**Use Select/Combobox instead when:**
- More than 5 options
- Space is constrained
- Options need filtering

**Card styles:** Choose based on content needs.

| Style | When to Use |
|-------|-------------|
| `card-big` | Items with description |
| `card-small` | Label only, no description |

**When to use prefix:** Add a prefix when a visual element helps users scan and differentiate options faster—logos for integrations, icons for categories, tokens for crypto. Skip prefix for simple text-only options where the label is clear enough.

Each group type has its own prefix component. The card style automatically determines prefix size.

| Prefix Component | Available Types |
|------------------|-----------------|
| `RadioPrefix` / `CheckboxPrefix` / `SwitchPrefix` | `icon`, `logo`, `token`, `icon-emphasized`, `icon-emphasized-{color}` |
| `ChipPrefix` | `avatar`, `logo`, `token`, `icon-emphasized`, `icon-emphasized-{color}` |
| `MenuPrefix` | `icon`, `danger-icon`, `avatar`, `company`, `token` |

| Type | When to Use |
|------|-------------|
| `icon` | Category indicators, feature icons |
| `icon-emphasized` | When icon needs more visual weight with background |
| `icon-emphasized-{color}` | Color-coded categories (e.g., priority levels, status) |
| `logo` | Third-party integrations, apps, services |
| `token` | Cryptocurrency or asset selection |
| `avatar` | User selection, assignees, mentions |
| `company` | Organization or workspace selection |
| `danger-icon` | Destructive menu actions (delete, remove) |

```tsx
// GOOD - Use prefix component (handles size and color automatically)
<SwitchGroup style="card-big">
  <SwitchGroupItem
    label="Discord"
    description="Get notifications in Discord"
    prefix={<SwitchPrefix type="logo" logo="discord" />}
  />
</SwitchGroup>

// GOOD - Icon prefix
<RadioGroup style="card-small">
  <RadioGroupItem
    label="Dark"
    prefix={<RadioPrefix type="icon" icon={<RiMoonLine />} />}
  />
</RadioGroup>

// BAD - Don't use Logo/Icon directly
<SwitchGroupItem prefix={<Logo logo="discord" size={24} />} />

// BAD - Don't use raw icons with manual styling
<RadioGroupItem prefix={<RiMoonLine className="size-[16px] text-content-subtle" />} />
```

**Descriptions:** Only add descriptions when they provide value beyond the label. Avoid redundant descriptions.

| Use description | Skip description |
|-----------------|------------------|
| Label needs clarification | Label is self-explanatory |
| Explaining consequences | Icon + label is sufficient |
| Differentiating similar options | Simple on/off toggles |
| Technical settings users may not understand | Common settings (Dark mode, Notifications) |

```tsx
// GOOD - Description adds value
<SwitchGroupItem
  label="Marketing emails"
  description="New features and product updates"
/>

// GOOD - No description needed, label is clear
<SwitchGroupItem label="Reduce motion" />

// GOOD - Icon + label is sufficient
<SwitchGroupItem
  label="Push notifications"
  prefix={<SwitchPrefix type="icon" icon={<RiBellLine />} />}
/>

// BAD - Redundant description
<RadioGroupItem
  label="Dark"
  description="Use dark theme"  // Just repeats the label
  prefix={<RadioPrefix type="icon" icon={<RiMoonLine />} />}
/>
```

---

### Switch

**Use when:** Toggling a setting with immediate effect.

**Use Switch over Checkbox when:**
- Change takes effect immediately (no form submit)
- Binary on/off state
- Common in settings panels

---

## Variant Selection Cheatsheet

### By Visual Hierarchy (highest to lowest)

**Buttons:**
1. `primary` - Accent background, highest emphasis
2. `danger` - Red background, for destructive
3. `secondary` - Solid muted background
4. `tertiary` - Glass effect with shadow
5. `ghost` - No background
6. `link` / `link-neutral` - Text only

**Badges:**
1. `isEmphasized={true}` + semantic/decorative - Colored background
2. Semantic variants - Colored text, neutral background
3. Decorative variants - Colored text, neutral background
4. `neutral` - Fully neutral

**Tabs:** Prefer pill variants. Use `pill-emphasized` for page-level tabs.

### By Context

| Context | Recommended Components & Variants |
|---------|-----------------------------------|
| **Page CTA** | `Button primary size="m"` or `size="l"` |
| **Form submit** | `Button primary size="m"` |
| **Form cancel** | `Button secondary size="m"` or `ghost` |
| **Inline action** | `Button link` or `link-neutral` |
| **Toolbar** | `IconButton ghost` or `tertiary`, small sizes |
| **Table row action** | `IconButton ghost size="xs"` |
| **Delete/remove** | `Button danger` or `IconButton danger` |
| **Status indicator** | `Badge` with semantic variant, possibly emphasized |
| **Filter selection** | `Chip` in a `ChipGroup` |
| **View switcher** | `SegmentedControl` or `Tabs pill` |
| **Page-level tabs** | `Tabs pill-emphasized` |
| **Settings panel** | `Switch` for toggles, `RadioGroup` for options |
| **Confirmation** | `Dialog` or `AlertDialog` with `Button primary` and `secondary` |
| **Success feedback** | `Toast compact tone="success"` |
| **Error feedback** | `Toast card tone="danger"` with description |

---

## Layout Principles

### Theme Support

All pages must support dark/light mode switching with system preference detection. The token system handles this automatically:

- **Never hardcode colors** - Always use token CSS variables (`content-strong`, `surface-page`, etc.)
- **Tokens adapt automatically** - Colors switch based on `data-theme-color` and `data-base-color` attributes
- **System preference** - Respects user's OS dark/light mode setting by default

If a page looks wrong in dark or light mode, you're likely using hardcoded colors instead of tokens.

---

### Spacing Over Separators

Achieve visual separation through spacing, not separator lines.

- **52px** (`--space-52`) between major sections (Fieldsets, content blocks)
- **24px** (`--space-24`) between fields within a section (handled by Fieldset)
- **Avoid `<Separator />`** unless absolutely necessary

**When separators ARE appropriate:**
- Interactive list rows where the **entire row is clickable** (e.g., navigation lists, clickable data rows)
- Inside menus to separate groups of related actions (not between every item)
- Clear hierarchy breaks that spacing alone can't achieve

**Settings rows clarification:**
- Settings rows with controls (switches, selects, inputs) are NOT interactive rows
- The control is interactive, but the row itself is not clickable
- Use **spacing** between settings rows, not `border-b` separators

**When to use spacing (gap) instead:**
- Form fields and inputs → use Fieldset (handles 24px gap) or `gap-[var(--space-24)]`
- Between form sections → use `gap-[var(--space-40)]` or `gap-[var(--space-52)]`
- Between content blocks → use generous spacing

**Never use separators for:**
- Between individual form fields/inputs
- Between labels and their inputs
- After every field in a form

```tsx
// GOOD - Spacing for separation
<div className="flex flex-col gap-[var(--space-52)]">
  <Fieldset>...</Fieldset>
  <Fieldset>...</Fieldset>
</div>

// AVOID - Unnecessary separators
<div className="flex flex-col gap-[var(--space-52)]">
  <Fieldset>...</Fieldset>
  <Separator />  // Not needed, spacing is enough
  <Fieldset>...</Fieldset>
</div>
```

---

## Token Usage Guide

### Design Hierarchy Principle

```
Tokens → Components → Pages
```

| Layer | Built With | Who Uses |
|-------|------------|----------|
| **Tokens** | Raw values (colors, spacing, radius) | Component developers |
| **Components** | Tokens | Page/feature developers |
| **Pages** | Components (+ occasional tokens for layout) | End product |

**Key rules:**
1. **Tokens are for components** - Use tokens when building/styling UI components
2. **Components are for pages** - Use components (Button, Input, Card, etc.) when building pages and features
3. **Pages rarely need raw tokens** - Only use tokens directly on pages for:
   - Layout spacing (`gap`, `padding` on containers)
   - Page-level backgrounds (`surface-page`, `surface-canvas`)
   - Custom one-off styling not covered by components

**Anti-patterns to avoid:**
- Using `content-strong` directly on page text instead of letting components handle it
- Using `actions-primary-default` on page elements instead of using `<Button variant="primary">`
- Building custom styled elements when a component exists

**When to use tokens on pages:**
```tsx
// GOOD - Layout spacing
<div className="flex flex-col gap-[var(--space-24)] p-[var(--space-16)]">
  <Button>Save</Button>  {/* Component handles its own tokens */}
</div>

// BAD - Styling that should be a component
<div className="bg-actions-primary-default text-content-on-accent-strong rounded-[var(--radius-max)] px-[var(--space-12)]">
  Save  {/* This should just be <Button variant="primary">Save</Button> */}
</div>
```

---

### Color Tokens Decision Tree

```
What are you styling?
├── Background/Surface
│   ├── Page background → surface-page
│   ├── Content area/card background → surface-canvas
│   ├── Elevated card → surface-card
│   ├── Modal/popover/dropdown → surface-overlay
│   ├── Inverted (dark on light, light on dark) → surface-inverse
│   └── Interactive element background → surface-interactive-*
├── Text/Content
│   ├── Primary text, headings → content-strong
│   ├── Secondary text, descriptions → content-subtle
│   ├── Placeholder, hint text → content-muted
│   ├── Disabled text → content-disabled
│   ├── Link text → content-link-*
│   ├── Text on accent background → content-on-accent-*
│   └── Text on inverse background → content-inverse-*
├── Interactive Elements (buttons, inputs)
│   ├── Primary action → actions-primary-*
│   ├── Secondary action → actions-secondary-*
│   ├── Tertiary/glass action → actions-tertiary-*
│   └── Destructive action → actions-danger-*
├── Borders
│   ├── Subtle dividers → border-subtle
│   ├── Muted borders → border-muted
│   ├── Interactive element borders → border-interactive-*
│   └── Inverted borders → border-inverse
└── Feedback/Status
    ├── Success (green) → *-feedback-success-*
    ├── Warning (amber) → *-feedback-warning-*
    ├── Danger/Error (red) → *-feedback-danger-*
    └── Info (blue) → *-feedback-info-*
```

### Surface Tokens

| Token | When to Use | Examples |
|-------|-------------|----------|
| `surface-page` | Main page background. The default for most content. | Page body, app background, most sections |
| `surface-canvas` | **Optional.** Only when you need an alternate background to distinguish an area from page. | Sidebar (if it needs contrast), content well, inset panels |
| `surface-card` | Elevated cards that need to stand out from canvas. | Cards within sidebar, nested panels, feature cards |
| `surface-overlay` | Floating elements with backdrop blur. | Modals, dialogs, popovers, dropdowns, tooltips, command palette |
| `surface-inverse` | Inverted color scheme. | Tooltips (dark on light theme), inverted callouts |
| `surface-interactive-default` | Hoverable/clickable row or cell backgrounds. | Table rows, list items, menu items, selectable cards |
| `surface-interactive-hover` | Hover state for interactive surfaces. | Table row on hover, list item on hover |
| `surface-interactive-selected` | Selected state for interactive surfaces. | Selected table row, active list item, chosen option |
| `surface-feedback-*-subtle` | Light feedback backgrounds. | Alert banners, status badges, notification cards |
| `surface-feedback-*-muted` | Even lighter feedback backgrounds. | Subtle inline warnings, background highlights |
| `surface-decorative-*-subtle` | Decorative colored backgrounds. | Colored avatars, category tags, chart legends |

**Visual layering (back to front):**
```
┌─────────────────────────────────────────────────┐
│  surface-page (main background - DEFAULT)       │
│                                                 │
│  ┌────────────┐                                 │
│  │ surface-   │   Most content sits directly   │
│  │ canvas     │   on surface-page. Canvas is   │
│  │ (optional, │   only for visual separation.  │
│  │ e.g.       │                                 │
│  │ sidebar)   │   ┌──────────────────────┐     │
│  └────────────┘   │ surface-card         │     │
│                   │ (elevated element)   │     │
│                   └──────────────────────┘     │
│                                                 │
│         ┌─────────────────────────────┐        │
│         │  surface-overlay            │        │
│         │  (modal/popover - floats)   │        │
│         └─────────────────────────────┘        │
└─────────────────────────────────────────────────┘
```

**When to use `surface-canvas`:**
- Sidebar that needs to look distinct from main content
- Inset content wells or recessed areas
- Only when you specifically need a different background shade

**When NOT to use `surface-canvas`:**
- Regular sections or containers (keep transparent or use `surface-page`)
- Navigation panels that don't need contrast
- Default content areas
- Icon containers (see below)

**Interactive surface patterns:**

Most interactive surfaces don't need a default background - just add hover state:
```tsx
// PREFERRED - No default bg, just hover
<tr className="hover:bg-surface-interactive-hover">
<li className="hover:bg-surface-interactive-hover">

// Only use default bg when you need visible rows/cells
<tr className="bg-surface-interactive-default hover:bg-surface-interactive-hover">

// Selected state
<tr className="hover:bg-surface-interactive-hover data-[selected]:bg-surface-interactive-selected">
```

**Icon containers:**

Never use `surface-canvas` for icon container backgrounds. If you need to emphasize an icon with a background:
- Use `surface-interactive-default` for neutral emphasis
- Use `surface-decorative-*-subtle` for colored emphasis (with matching `content-decorative-*-subtle` foreground)
- Use `surface-feedback-*-subtle` for semantic emphasis (with matching `content-feedback-*-strong` foreground)

```tsx
// GOOD - Interactive surface for neutral icon bg
<div className="bg-surface-interactive-default">
  <RiGlobalLine className="text-content-subtle" />
</div>

// GOOD - Decorative color for emphasis
<div className="bg-surface-decorative-blue-subtle">
  <RiGlobalLine className="text-content-decorative-blue-subtle" />
</div>

// BAD - Don't use canvas for icon containers
<div className="bg-surface-canvas">
  <RiGlobalLine />
</div>
```

### Content Tokens

| Token | When to Use |
|-------|-------------|
| `content-strong` | Primary text: headings, labels, important content. |
| `content-subtle` | Secondary text: descriptions, helper text. |
| `content-muted` | Tertiary text: placeholders, hints, timestamps. |
| `content-disabled` | Disabled state text. |
| `content-link-default` | Clickable link text (default state). |
| `content-link-hover` | Clickable link text (hover state). |
| `content-on-accent-strong` | Text on primary/accent button backgrounds. |
| `content-on-accent-subtle` | Secondary text on accent backgrounds. |
| `content-inverse-strong` | Text on inverse surfaces (tooltips). |
| `content-inverse-subtle` | Secondary text on inverse surfaces. |
| `content-feedback-*-strong` | Prominent feedback text (error messages). |
| `content-feedback-*-subtle` | Subtle feedback text (on colored backgrounds). |
| `content-decorative-*-strong` | Decorative colored text (badges, tags). |

**Text hierarchy:**
1. `content-strong` - Most important (headings, labels)
2. `content-subtle` - Supporting (descriptions)
3. `content-muted` - Least important (hints, timestamps)
4. `content-disabled` - Unavailable

### Action Tokens

| Token | When to Use |
|-------|-------------|
| `actions-primary-default` | Primary button background. Main CTAs. |
| `actions-primary-hover` | Primary button hover state. |
| `actions-primary-disabled` | Primary button disabled state. |
| `actions-secondary-default` | Secondary button/input background. |
| `actions-secondary-hover` | Secondary button/input hover state. |
| `actions-secondary-disabled` | Secondary button/input disabled state. |
| `actions-tertiary-default` | Tertiary/glass button background. |
| `actions-tertiary-hover` | Tertiary button hover state. |
| `actions-tertiary-disabled` | Tertiary button disabled state. |
| `actions-danger-default` | Destructive action background. |
| `actions-danger-hover` | Destructive action hover state. |
| `actions-danger-disabled` | Destructive action disabled state. |

### Border Tokens

| Token | When to Use |
|-------|-------------|
| `border-subtle` | Regular separators, dividers, card borders. Most common. |
| `border-muted` | When there are many borders (e.g., list item separators) and you need them less prominent. |
| `border-inverse` | Borders on inverse surfaces. |
| `border-interactive-default` | Interactive component borders, interactive row bottom borders (default state). |
| `border-interactive-hover` | Interactive component borders (hover state). |
| `border-interactive-active` | Interactive component borders (focus/active state). |
| `border-feedback-*-subtle` | Feedback-colored borders (alerts, badges). |
| `border-decorative-*-subtle` | Decorative colored borders. |

**Choosing between `border-subtle` and `border-muted`:**
- Use `border-subtle` for single separators, card borders, section dividers
- Use `border-muted` for dense lists with many separators to avoid visual noise

### Feedback vs Decorative Colors

| Type | Purpose | Example Use Cases |
|------|---------|-------------------|
| **Feedback** | Conveys meaning/status | Error messages, success states, warnings, info alerts |
| **Decorative** | Visual distinction without meaning | User avatars, category tags, charts, themes |

**Feedback colors:**
- `success` (green) - Completed, approved, online, positive
- `warning` (amber) - Caution, pending, needs attention
- `danger` (red) - Error, failed, offline, destructive
- `info` (blue) - Informational, neutral status

**Decorative colors:** Use any of the 17 color options (red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose) for visual variety without semantic meaning.

---

### Spacing Tokens

| Token | Value |
|-------|-------|
| `--space-2` | 2px |
| `--space-4` | 4px |
| `--space-6` | 6px |
| `--space-8` | 8px |
| `--space-10` | 10px |
| `--space-12` | 12px |
| `--space-16` | 16px |
| `--space-20` | 20px |
| `--space-24` | 24px |
| `--space-28` | 28px |
| `--space-32` | 32px |
| `--space-36` | 36px |
| `--space-40` | 40px |

Use smaller values (2-8) for tight spacing, medium values (10-16) for standard spacing, larger values (20-40) for generous spacing. Component-specific spacing is handled by the components themselves.

---

### Radius Tokens

| Token | Value |
|-------|-------|
| `--radius-4` | 4px |
| `--radius-6` | 6px |
| `--radius-8` | 8px |
| `--radius-10` | 10px |
| `--radius-12` | 12px |
| `--radius-16` | 16px |
| `--radius-24` | 24px |
| `--radius-max` | 999px (pill/circular) |

Use smaller values (4-8) for subtle rounding, medium values (10-16) for standard rounding, larger values (24+) for prominent rounding, and `--radius-max` for fully rounded pills. Component-specific radius is handled by the components themselves.

---

### Utility Tokens

**Focus rings (ALWAYS use this exact pattern):**
```css
shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]
```

**Shadow layers:**
| Token | Use Case |
|-------|----------|
| `--utility-shadow-l1` | Subtle: tertiary buttons, badges |
| `--utility-shadow-l2` | Medium: cards, dropdowns |
| `--utility-shadow-l3` | Prominent: modals, elevated panels |
| `--utility-shadow-l4` | Maximum: floating elements |

**Backdrop:**
- `--utility-backdrop` - Modal/dialog backdrop overlay

---

## Accessibility Reminders

1. **Don't rely on color alone** - Use icons or text to reinforce meaning
2. **Maintain contrast** - Token system handles this, but verify with custom colors
3. **Keyboard navigation** - Base UI handles this; don't override
4. **Focus indicators** - All interactive components have focus rings
5. **Disabled states** - Use sparingly; explain why something is disabled

---

## Common Patterns

### Confirmation Dialog
```tsx
<Dialog>
  <Dialog.Popup position="center">
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Delete item?</Dialog.Title>
        <Dialog.Close />
      </Dialog.Header>
      <Dialog.Body>
        This action cannot be undone.
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close render={<Button variant="secondary">Cancel</Button>} />
        <Button variant="danger">Delete</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Popup>
</Dialog>
```

### Filter Bar
```tsx
<div className="flex gap-2">
  <Chip selected onRemove={() => {}}>Active</Chip>
  <Chip>Pending</Chip>
  <Chip>Archived</Chip>
</div>
```

### Action Menu
```tsx
<Menu>
  <Menu.Trigger>
    <IconButton variant="ghost" size="xs">
      <RiMoreLine />
    </IconButton>
  </Menu.Trigger>
  <Menu.Popup>
    <Menu.Item>Edit</Menu.Item>
    <Menu.Item>Duplicate</Menu.Item>
    <Menu.Separator />
    <Menu.Item variant="danger">Delete</Menu.Item>
  </Menu.Popup>
</Menu>
```

### Form with Validation Feedback
```tsx
<Field>
  <Field.Label>Email</Field.Label>
  <Input type="email" />
  <Field.Error>Please enter a valid email</Field.Error>
</Field>
```

---

## AI Implementation Notes

### The Golden Rule

**Use components to build pages, not tokens.**

Only reach for tokens when:
1. Building a new component
2. Adding layout spacing to page containers
3. No existing component covers your need

### When implementing UIs:

1. **First, check if a component exists** - Don't reinvent with raw tokens
2. **Start with component selection** - Use decision trees above
3. **Choose appropriate variant** - Match visual hierarchy to importance
4. **Select correct size** - Match context (compact UI = smaller, hero sections = larger)
5. **Add semantic meaning** - Use tones/variants that convey meaning (danger, success, etc.)
6. **Consider the full flow** - Success states, error handling, loading states
7. **Keep it simple** - Don't over-engineer; use default variants when unsure

### When in doubt:
- Buttons: `secondary` variant, `m` size
- Badges: `neutral` variant, `s` size
- Icons: Leading position, not trailing
- Dialogs: `center` position
- Toasts: `card` variant for important, `compact` for confirmations
- Layout gaps: `--space-16` or `--space-24`
- Page padding: `--space-16` to `--space-24`
