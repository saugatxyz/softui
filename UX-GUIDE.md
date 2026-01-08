# UX Guide: Component Selection & Design Patterns

This guide helps AI assistants produce consistent, Stripe-quality UIs. It defines invariants, canonical patterns, and component recommendations.

---

## Visual Design Rules

### Text Colors

**AI uses only two text tokens:**

| Token | Use Case |
|-------|----------|
| `content-strong` | Headings, labels, primary values |
| `content-subtle` | Descriptions, helper text, secondary content |

If text isn't important enough for `content-subtle`, remove it.

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

**Title + subtitle pairing:**

| Title Type | Title Style | Subtitle Size | Subtitle Style |
|------------|-------------|---------------|----------------|
| Page title | `content-strong`, semibold | `--font-size-m` | `content-subtle`, regular |
| Section title | `content-strong`, semibold | `--font-size-m` | `content-subtle`, regular |
| Small title | `content-strong`, medium | `--font-size-xs` | `content-subtle`, regular |
| Normal text | `content-strong`, medium | `--font-size-xs` | `content-subtle`, regular |

**Titles:**
- Not every title needs a subtitle or badge—most don't
- Only add subtitles when extra context is genuinely needed
- Only add badges for status or counts, not decoration

### Icons

**Icons can appear only:**
1. Inside supported component props (`leadingIcon`, `trailingIcon`, `icon`, `prefix`)
2. In a dedicated Stat component (if one exists)
3. In Table cells as status indicators (via Badge or prefix), not next to arbitrary text

**Never do:**
- Pair icons with labels or text outside of components
- Manually size or style icons—components handle this
- Add icons to every menu item or list row

**When to use icons (within components):**
- Buttons: only when it adds clarity (download, send, add)
- Inputs: only for type indicators (search, currency)—most inputs need no icon
- Menu items: sparingly, for key actions only
- List prefixes: when items need visual distinction

### Containers

- Do not use containers to group content unless necessary
- Never wrap sections in containers
- Use fills for containers (`surface-*` tokens)
- Never combine fill + border on the same container—pick one

### Tables

- Never wrap tables in visible containers (no fill, no border around the table)
- Rows have bottom borders as separators—that's the only visual division needed

**Exception:** `surface-canvas` is OK as a page region (sidebar, split pane), but the table itself remains unwrapped.

### Button Placement

- Never stack buttons vertically as a list of actions
- Place action buttons next to relevant section titles, aligned right
- Group related buttons horizontally with appropriate gap

**Actions must be tied to sections:**
- Every action belongs to a specific section—don't have floating action groups
- Page has one main intent → one primary button, others use secondary
- If more than 2 actions, put less important ones in an icon menu (overflow)

**Button variants:**
- Use `primary` and `secondary` for section actions
- Use `tertiary` only on surfaces (cards, interactive rows)
- Use `link` for inline text actions

### List Items (Repeating Content)

When displaying a list of similar items (team members, activity feed, files, etc.):
- Use gap between items, not cards with fills
- Each item is a row, not a card—no background, no border
- Don't overload the page with separators—use sparingly

**Text weight in list items:**
- If an item has a description/subtitle, use **medium** weight on the identifier to differentiate
- Single-line items without descriptions → regular weight is fine

### Separators vs Cards

**Use separators (rows with dividers):**
- Items in a continuous list read top-to-bottom
- Similar items of the same type
- Read-only or single-action items
- Content flows—items are siblings

**Use cards (with fill):**
- Standalone units that could exist independently
- Items with multiple actions or rich interactive content
- Feature highlights, dashboard widgets
- Distinct entities—items are self-contained

**Simple rule:** Lists → separators or gaps. Collections of modules → cards.

**Dashboard exception:** KPI summary strip can be cards only if they are clickable modules; otherwise use plain layout.

### Interactive Surfaces

For interactive cards or clickable areas, use `surface-interactive-*` tokens:
- **Want attention on it:** use `surface-interactive-default` as the default fill
- **Subtle/minimal:** no default fill, just add `surface-interactive-hover` on hover
- Always add hover state for interactive surfaces

**Row click guidance:**
- If the whole row is clickable, apply interactive hover token to the row
- If only a cell/control is clickable, don't make the row hoverable

### Component Styling

**STRICT: No component customization. Ever.**

- NEVER add custom colors, sizes, padding, or any styling to components
- NEVER use className to override component appearance
- Use ONLY the props components provide (`variant`, `size`, `tone`, etc.)
- If a component doesn't support what you need, use it as-is or ask—do not hack it
- Components are designed to work together—custom styling breaks consistency

---

## Page Composition Rules

Every page uses this skeleton:

1. **Page Header** - title, optional subtitle, right-aligned actions
2. **Primary Content Sections** - each has a section title row
3. **Optional: Right Drawer** - for details/edit flows
4. **Toasts** - for feedback

### Hard Limits

- 1 primary action per page header (max 2 total header actions)
- Each section has max 1 primary section action (else use overflow Menu)

### Section Layout

- 48px gap between sections
- 20px gap between section title row and content
- Sections do not get containers by default
- Sections can have subsections, which can be arranged side by side
- Section and subsection action buttons use `size="m"`

### Page Padding

- 48px top and bottom padding for pages
- Pages are composed of distinct **sections**—don't put everything in one container
- Each section has its own title and content

---

## Canonical Patterns

### Dashboard Layout

**Default structure:**
1. Page header
2. Optional: summary section (stats, key info, or contextual content)
3. Filter bar (chips + select/search)
4. Table
5. Optional: detail drawer on row click

**Summary content format:**
- Page-wide metrics → use stats (each in container, 4px gap between)
- Metadata with values → use a list

**When using stats:**
- Prioritize top 4–5 stats only
- Each stat: label (subtle), value (strong), optional delta (subtle)
- No icons unless the Stat component supports it

**Table rules (dashboards):**
- Row click opens detail drawer if a detail view exists
- Row-level actions go in overflow menu (IconButton ghost)
- Avoid inline action buttons per row (unless 1 clear action)

**Filtering rules:**
- 0–3 primary filters visible (Chip/Segmented/Select)
- Anything beyond goes into "More filters" Popover/Drawer
- Filters always show active state + "Clear" action (link-neutral)

### Settings Layout

**Default structure:**
1. Page header
2. Sections as Fieldsets
3. One concept per section
4. Actions: usually inline (Save) at bottom of page or section (not both)

**Settings rows:**
- Rows are not clickable
- Use spacing, not separators
- Label + description on left, control on right (Switch/Select/Input)

**Save behavior (pick one per page):**
- **Immediate:** Switch toggles + toast "Saved"
- **Confirmation required:** Sticky footer or bottom actions: Cancel/Save

Don't mix immediate + Save button in same section unless clearly separated.

---

## Density & Scannability

**Dashboards:**
- Prefer tables + minimal summary over card grids
- Avoid card grids unless the cards are truly independent modules
- Don't repeat labels—let column headers do work

**Text density:**
- Descriptions: max 1 line by default
- Avoid secondary labels inside table rows (use columns)

**Visual noise limits:**
- Borders: use row separators only
- Badges: only for real status categories (Paid/Failed/Pending), not decoration

---

## UX Copy Rules

- **Titles:** 1–4 words
- **Subtitles:** One concise sentence, no commas if possible
- **Button labels:** Verb + object preferred ("Export CSV", "Create invoice")
- **Avoid vague CTAs:** No "Continue" or "Submit" unless context is perfect
- **Consistent nouns:** Pick one term per page (Payment vs Transaction—not both)

---

## AI Output Contract

When generating a screen, output in this order:

1. Information architecture (sections)
2. Component tree (by section)
3. States (loading/empty/error/success)
4. Interaction notes (row click → drawer, filters, etc.)

**Rules:**
- Do not output custom CSS
- Do not invent new components unless requested

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

**In tables:** Avoid visible buttons per row; use overflow Menu.

**In drawers:** Primary action goes bottom-right in Dialog.Footer.

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

- **48px** (`--space-48`) between major sections (Fieldsets, content blocks)
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
- Between form sections → use `gap-[var(--space-48)]`
- Between content blocks → use generous spacing

**Never use separators for:**
- Between individual form fields/inputs
- Between labels and their inputs
- After every field in a form

```tsx
// GOOD - Spacing for separation
<div className="flex flex-col gap-[var(--space-48)]">
  <Fieldset>...</Fieldset>
  <Fieldset>...</Fieldset>
</div>

// AVOID - Unnecessary separators
<div className="flex flex-col gap-[var(--space-48)]">
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
| `--space-48` | 48px |

Use smaller values (2-8) for tight spacing, medium values (10-16) for standard spacing, larger values (20-48) for generous spacing. Component-specific spacing is handled by the components themselves.

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
- Page padding: `--space-48`
