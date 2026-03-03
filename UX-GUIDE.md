# UX Guide: Component Selection & Design Patterns

This guide helps AI assistants produce consistent, Stripe-quality UIs. It defines invariants, canonical patterns, and component recommendations.

## Documentation Resources

| Document | Purpose | When to Use |
|----------|---------|-------------|
| `CLAUDE.md` | Claude Code implementation guidelines | When using Claude Code specifically |
| `AGENTS.md` | General AI agent guidelines | For Codex or other AI tools |
| `ANIMATION.md` | Animation best practices | When adding motion to components |
| `COMPONENTS.md` | Component API reference | When implementing with Base UI primitives |
| `UX-GUIDE.md` | Design patterns & component selection | When deciding which component to use |

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

| Title Type | Title Size | Title Weight | Subtitle Size | Gap |
|------------|------------|--------------|---------------|-----|
| Page title | 2xl (20px) | semibold | m (14px) | 6px |
| Section title | xl (18px) | semibold | m (14px) | 4px |
| Card/small title | l (16px) | medium | s (13px) | 2px |
| List item | m (14px) | medium | s (13px) | 0px |

Subtitles always use `content-subtle` with regular weight.

**Titles:**
- Not every title needs a subtitle or badge—most don't
- Only add subtitles when extra context is genuinely needed
- Only add badges for status or counts, not decoration

### Text Pairing Guide

**Base rule:** Most text should be 14px (`--font-size-m`). Only titles go larger.

**Available text sizes:**

| Token | Size | Use |
|-------|------|-----|
| 3xl | 24px | Hero titles only |
| 2xl | 20px | Page titles |
| xl | 18px | Section titles |
| l | 16px | Card titles, emphasized text |
| m | 14px | Body text, list items (default) |
| s | 13px | Secondary text, subtitles |
| xs | 12px | Captions, helper text |
| 2xs | 10px | Rare, very small labels |

**Size pairings by context:**

| Primary Text | Paired With | Gap | Use Case |
|--------------|-------------|-----|----------|
| 2xl (20px) | m (14px) | 6px | Page title + description |
| xl (18px) | m (14px) | 4px | Section title + description |
| l (16px) | s (13px) | 2px | Card title + description |
| m (14px) | s (13px) | 0px | List item title + subtitle |

**List item text pairing:**

For lists and repeating items, use 14px + 13px stacking (no gap):

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Primary text (identifier) | m (14px) | medium | `content-strong` |
| Secondary text (subtitle) | s (13px) | regular | `content-subtle` |

**What goes in primary vs secondary:**

| Primary (14px, strong) | Secondary (13px, subtle) |
|------------------------|--------------------------|
| Name, title, identifier | Email, handle, ID |
| Action or label | Description, explanation |
| Main value | Supporting context |
| File name | File size, date |
| Task title | Project, assignee |

**Single-line vs stacked:**
- **Single-line:** Use when secondary info is short (email, date, ID)
- **Stacked:** Use when secondary info is a full sentence or description
- **Inline separator:** Use `·` or `—` to separate inline secondary info

```tsx
// Stacked (list items, cards)
<div className="flex flex-col">
  <span className="text-body-m-medium text-content-strong">Sarah Chen</span>
  <span className="text-body-s text-content-subtle">sarah.chen@company.com</span>
</div>

// Inline with separator
<div className="flex items-center gap-[var(--space-6)]">
  <span className="text-body-m-medium text-content-strong">Document.pdf</span>
  <span className="text-body-s text-content-subtle">·</span>
  <span className="text-body-s text-content-subtle">2.4 MB</span>
</div>
```

**When NOT to stack:**
- Single-line items without meaningful secondary info
- When the list is already dense
- When secondary info belongs in a separate column (tables)

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
- If you must intentionally break component structure, use `unsafeClassName` (only on components that expose it) and treat it as an exception path
- If a component doesn't support what you need, use it as-is or ask—do not hack it
- Components are designed to work together—custom styling breaks consistency
- For per-family allowed vs forbidden overrides, see `COMPONENTS.md` → **Allowed vs Forbidden Overrides Matrix**

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

### "User needs to enter text"

```
Is it single line or multi-line?
├── Single line → Input
│   ├── Needs prefix/suffix → InputGroup
│   └── Numeric with +/- controls → NumberField
└── Multi-line → Textarea
    ├── Fixed height needed → resize="none"
    └── User can resize → resize="vertical" (default)
```

### "User needs to upload files"

```
Is it file upload?
├── Yes → FileUpload
│   ├── Single file (avatar, document) → multiple={false}
│   └── Multiple files → multiple={true} (default)
└── Just showing file info → FileIcon + FileItem
```

### "User needs to filter data"

```
What type of filter interaction?
├── Filter opens a dropdown/popover to select value
│   └── Filter (always)
│       ├── Inactive: label + chevron
│       └── Active: label + value + clear button
│
├── Predefined options all visible, user picks one or more
│   ├── Single selection → SegmentedControl
│   └── Multi-selection → ToggleGroup (multiple)
│
└── Displaying already-applied filters (read-only)
    └── Badge or inline text
```

**CRITICAL: Filter vs Chip vs ChipGroup**

| Component | Purpose | Context | Interaction |
|-----------|---------|---------|-------------|
| **Filter** | Filter trigger that opens dropdown/popover | Filter bars, table headers | Click → opens Menu/Popover |
| **Chip** | Tag in content, removable selection | Selected items display, tags | Click → removes item |
| **ChipGroup** | Form input for selecting from predefined tags | Forms, tag editors | Click → toggles selection |

**Use Filter when:**
- Filtering table data (Status, Date, Type columns)
- Filtering section-level data (cards, lists, grids)
- Search refinement controls
- Any context where clicking reveals filter options in a dropdown

**Do NOT use Chip/ChipGroup for filtering:**
- Chip is for displaying/removing already-selected items
- ChipGroup is for forms where user selects from visible tags
- Neither should appear in filter bars—always use Filter

**Example filter bar patterns:**

```tsx
// CORRECT: Filter bar with Filter components
<div className="flex gap-[var(--space-8)]">
  <Filter label="Status" value={status} onClear={() => setStatus(null)} />
  <Filter label="Type" value={type} onClear={() => setType(null)} />
  <Filter label="Date" icon={<RiCalendarLine />} />
</div>

// WRONG: Don't use Chip/ChipGroup for filter controls
<div className="flex gap-[var(--space-8)]">
  <Chip>Status: Active</Chip>  {/* NO - Chip doesn't open dropdown */}
  <ChipGroup>...</ChipGroup>   {/* NO - ChipGroup is for form inputs */}
</div>
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
- Do not override intrinsic sizing/text styles via `className`; use `variant`, `size`, and `tone`
- Use `unsafeClassName` only for intentional, reviewed structural overrides

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

// GOOD - Keep button untouched, apply layout on wrapper
<div className="flex flex-col gap-[var(--space-16)]">
  <div className="self-start">
    <Button>Save</Button>
  </div>
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
| `icon` | Accent-colored icon style. Links and navigational elements. |
| `plain` | Minimal style with no background. Subtle icons that appear on hover. |
| `danger` | Destructive icon actions (trash, X for delete). |

| Size | When to Use |
|------|-------------|
| `3xs` | Inline close buttons (toasts, chips), very tight spaces |
| `2xs` | Small inline actions, dense lists |
| `xs` | Compact toolbars, table actions |
| `s` | Standard toolbar buttons |
| `m` | Default, standalone icon buttons |
| `l` | Hero/prominent icon actions |

**Accessibility:** All IconButtons require `aria-label` for screen readers.
**Do not override size with `className`; use `size` prop.**

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

**Use when:** Displaying tags, categories, or removable selected items.

| State | When to Use |
|-------|-------------|
| Unselected | Available tag/category |
| Selected | Active selection, shows X for removal |
| Disabled | Option not currently available |

| Size | When to Use |
|------|-------------|
| `s` | Compact lists, inline tags |
| `m` | Default, tag displays, selected items |

**Chip is for:**
- Displaying selected items (e.g., selected users, chosen tags)
- Content tags/categories
- Removable selections in multi-select contexts

**Chip is NOT for:**
- Filter bars → use **Filter** component
- Opening dropdowns → use **Filter** component
- Filter controls with label + value → use **Filter** component

**Prefixes:**
- `leadingIcon` prop: Leading icon
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

### Toggle / ToggleGroup

**Use when:** Toggle button or group of toggle buttons in a toolbar or action bar.

| Component | When to Use |
|-----------|-------------|
| `Toggle` | Single toggle button (on/off state) |
| `ToggleGroup` | Group of related toggles (single or multiple selection) |

**Use Toggle over Switch when:**
- It's a toolbar action (bold, italic, alignment)
- Visual appearance should be a button
- Part of a button group

---

### Combobox / Autocomplete

**Use when:** User needs to search/filter through a list of options.

| Component | When to Use |
|-----------|-------------|
| `Combobox` | Searchable dropdown with async data loading |
| `Autocomplete` | Search with static predefined options |

**Use Combobox/Autocomplete over Select when:**
- More than 10 options
- User benefits from typing to filter
- Options are dynamic or loaded asynchronously

---

### Accordion

**Use when:** Organizing content into collapsible sections.

**When to use:**
- FAQs, expandable content sections
- Settings panels with many options
- Progressive disclosure of information

**Avoid when:**
- Content should always be visible
- Only 1-2 items (just show them)
- Items are unrelated

---

### AlertDialog

**Use when:** Confirming destructive or irreversible actions.

**Use AlertDialog over Dialog when:**
- Action is destructive (delete, disconnect, remove)
- User must explicitly confirm or cancel
- Clicking outside should NOT dismiss

```tsx
<AlertDialog>
  <AlertDialog.Trigger>
    <Button variant="danger">Delete</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Delete this item?</AlertDialog.Title>
      <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
      <AlertDialog.Footer>
        <AlertDialog.Close>
          <Button variant="secondary">Cancel</Button>
        </AlertDialog.Close>
        <Button variant="danger">Delete</Button>
      </AlertDialog.Footer>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog>
```

---

### AvatarGroup

**Use when:** Showing multiple users/entities together (team members, assignees, collaborators).

| Size | When to Use |
|------|-------------|
| `3xs`, `2xs` | Inline mentions, compact spaces |
| `xs`, `s` | Table cells, list items |
| `m`, `l` | Feature sections, headers |

**Guidelines:**
- Use `max` prop to limit visible avatars (3-5 typical)
- Overflow count shows as "+N" avatar
- All avatars in a group share the same size

```tsx
<AvatarGroup size="s" max={3}>
  <Avatar src="/avatars/avatar-1.png" />
  <Avatar src="/avatars/avatar-2.png" />
  <Avatar src="/avatars/avatar-3.png" />
  <Avatar src="/avatars/avatar-4.png" />  {/* Shows as +1 */}
</AvatarGroup>
```

---

### ChipGroup

**Use when:** Form input for selecting tags from a predefined set (like a multi-select with visible options).

**ChipGroup is for:**
- Tag selection in forms (select categories, select skills)
- Multi-select where all options should be visible
- Input contexts where user picks from predefined tags

**ChipGroup is NOT for:**
- Filter bars → use **Filter** components
- Displaying already-selected items → use individual Chips
- Filter controls → use **Filter** component

**Guidelines:**
- Provides consistent spacing between chips
- Passes size context to child chips
- Use with form state management

---

### ButtonGroup

**Use when:** Grouping related actions that are mutually exclusive or closely related.

**Common patterns:**
- Alignment controls (left/center/right)
- View toggles (list/grid)
- Formatting options (bold/italic/underline)

**Guidelines:**
- Set group sizing with `size` on `ButtonGroup`
- Use `tone` on `ButtonGroupItem` for semantic/decorative emphasis when needed
- Buttons render with connected styling (no gap)

---

### Field

**Use when:** Wrapping any form input with label, description, and error handling.

**Guidelines:**
- Always use Field for form inputs (accessibility)
- Field.Label is required for screen readers
- Field.Description for helper text
- Field.Error for validation messages

```tsx
<Field>
  <Field.Label>Username</Field.Label>
  <Input placeholder="Enter username" />
  <Field.Description>Must be unique</Field.Description>
  <Field.Error>Username already taken</Field.Error>
</Field>
```

---

### Fieldset

**Use when:** Grouping related form fields into a section.

**Guidelines:**
- Use for logical groupings (Account, Billing, Preferences)
- Fieldset.Legend provides the section title
- Handles vertical spacing between fields automatically (24px)
- Use `disabled` to disable all fields in the group

---

### Form

**Use when:** Creating a form with validation and submission handling.

**Guidelines:**
- Wrap all form content in Form component
- Handles form submission events
- Integrates with Field validation

---

### InputGroup

**Use when:** Adding prefix/suffix elements to an input.

**Common patterns:**
- Currency prefix ($, €, £)
- Domain suffix (.com, .io)
- Unit indicators (kg, lbs, %)

```tsx
<InputGroup>
  <InputGroup.Prefix>$</InputGroup.Prefix>
  <Input type="number" />
  <InputGroup.Suffix>USD</InputGroup.Suffix>
</InputGroup>
```

---

### NumberField

**Use when:** Collecting numeric input with increment/decrement controls.

**Use NumberField over Input when:**
- Value must be a number
- User benefits from +/- buttons
- Precise numeric adjustments needed

---

### Slider

**Use when:** You need composable slider primitives (default, segmented, or adjustment variant) and want full slot-level control.

| Use Case | Configuration |
|----------|---------------|
| Basic range | `variant="default"` `min={0}` `max={100}` |
| Segmented media/editor controls | `variant="segmented"` `size="m"` |
| Custom adjustment composition | `variant="adjustment"` + `Slider.AdjustmentTrack` + `Slider.Value` |

**Guidelines:**
- Prefer `variant` + `size` props; avoid style overrides on `Thumb`/`Value` slots
- Do not manually shift value text/thumb positioning with `className`
- Use `unsafeClassName` only when you intentionally need structural overrides

---

### AdjustmentSlider

**Use when:** You want a ready-made adjustment control with built-in icon + label + value layout.

| Use Case | Configuration |
|----------|---------------|
| Image/video adjustments | `label`, `icon`, `min/max`, optional `renderValue` |
| Token/parameter tuning | `showValue={true}` with `animated` defaults |
| Dense editor rows | `size="s"` |

**Guidelines:**
- Keep `AdjustmentSlider` separate from `Slider`; they serve different integration needs
- Use `renderValue` for units or formatting (e.g. percentages, `dB`)
- Avoid overriding track/value typography via `className`; use provided props first

---

### Progress

**Use when:** Showing completion progress of a task.

| Tone | When to Use |
|------|-------------|
| `default` | Default, general progress |
| `success` | Success-oriented progress |
| `warning` | Approaching limit |
| `danger` | Critical/error state |

**Guidelines:**
- Use for file uploads, form completion, loading states
- Always provide a label for context
- Value shows percentage by default

---

### Meter

**Use when:** Displaying a value within a known range (static measurement, not task progress).

**Use Meter (not Progress) for:**
- Disk usage, battery level
- Password strength
- Storage quota

**Guidelines:**
- Meter is for measurements, Progress is for tasks
- Use tone to indicate thresholds (danger when near limit)

---

### Table

**Use when:** Displaying structured data in rows and columns.

| Size | When to Use |
|------|-------------|
| `s` | Compact data, many rows |
| `m` | Default, most tables |
| `l` | Emphasized data, fewer rows |

**Specialized cells:**
| Cell Type | When to Use |
|-----------|-------------|
| `Table.TextCell` | Primary text content, can have prefix/suffix |
| `Table.NumberCell` | Numeric values (right-aligned, tabular nums) |
| `Table.BadgeCell` | Status indicators |
| `Table.CheckboxCell` | Row selection |
| `Table.AvatarGroupCell` | Multiple users/assignees |
| `Table.ProgressCell` | Progress within a row |
| `Table.ActionsCell` | Row actions (view, menu) |

**Guidelines:**
- Use `sortable` on headers for sortable columns
- Use `Table.Row selected` for selected state
- Keep actions in overflow menu, not visible per row

---

### Pagination

**Use when:** Navigating between pages of content.

| Size | When to Use |
|------|-------------|
| `xs`, `s` | Compact UIs, mobile |
| `m` | Default |
| `l` | Emphasized pagination |

**Guidelines:**
- Show 5-7 page numbers max
- Use ellipsis for large page counts
- Always show Previous/Next buttons

---

### Banner

**Use when:** Page-level or section-level announcements that persist.

| Tone | When to Use |
|------|-------------|
| `default` | Neutral announcement |
| `info` | Informational notice |
| `success` | Positive outcome |
| `warning` | Caution required |
| `danger` | Error or critical |

**Use Banner over Toast when:**
- Message should persist (not auto-dismiss)
- Page-level announcement
- User hasn't taken an action

**Use Toast over Banner when:**
- Feedback for user action
- Should auto-dismiss
- Transient notification

---

### InlineNotification

**Use when:** Contextual feedback within a content area (not page-level).

**Use InlineNotification when:**
- Feedback relates to a specific section
- Inline with form content
- Contextual warnings or info

**Use Banner when:**
- Page-level announcement
- Should be at top of page/section

---

### EmptyState

**Use when:** No content to display.

**Guidelines:**
- Always provide a clear title
- Description explains why it's empty
- Action button to resolve (create, import, etc.)
- Use a relevant icon/illustration

```tsx
<EmptyState
  icon={<RiInboxLine />}
  title="No messages yet"
  description="When you receive messages, they'll appear here."
  action={<Button>Compose message</Button>}
/>
```

---

### Separator

**Use when:** Visual divider is necessary (rare).

**Orientation:**
- `horizontal` (default) - Full-width line
- `vertical` - Height-based line

**Avoid separators. Use spacing instead.** Only use for:
- Menu group dividers
- Clear visual breaks in dense UIs
- Interactive list rows

---

### Kbd

**Use when:** Displaying keyboard shortcuts.

**Guidelines:**
- Use in tooltips, menus, command palettes
- Keep shortcuts platform-aware (⌘ for Mac, Ctrl for Windows)
- Combine multiple Kbd elements for key combos

```tsx
<Kbd>⌘</Kbd><Kbd>K</Kbd>  {/* Command + K */}
```

---

### Logo

**Use when:** Displaying brand/service logos consistently.

**Guidelines:**
- Use within Chip prefixes, menu items, integrations lists
- Size adapts to context (via prefix components)
- Don't manually size logos—use prefix components

---

### Breadcrumbs

**Use when:** Showing hierarchical navigation path and current location.

| Separator | When to Use |
|-----------|-------------|
| `slash` | Default, traditional style |
| `chevron` | Modern, directional feel |

**Guidelines:**
- Always include the current page as the last item (with `isCurrent`)
- Use `showHomeIcon` on the first item for dashboard/app contexts
- Keep breadcrumb labels short—use page titles, not full descriptions
- Don't use breadcrumbs for linear flows (use stepper instead)

```tsx
<Breadcrumbs separator="slash">
  <BreadcrumbsItem href="/" showHomeIcon>Home</BreadcrumbsItem>
  <BreadcrumbsSeparator />
  <BreadcrumbsItem href="/settings">Settings</BreadcrumbsItem>
  <BreadcrumbsSeparator />
  <BreadcrumbsItem isCurrent>Profile</BreadcrumbsItem>
</Breadcrumbs>
```

---

### Textarea

**Use when:** Collecting multi-line text input (comments, descriptions, messages).

| Size | When to Use |
|------|-------------|
| `s` | Compact forms, inline editing |
| `m` | Default, most form fields |
| `l` | Emphasized inputs, primary content entry |

| Resize | When to Use |
|--------|-------------|
| `vertical` | Default, most cases |
| `none` | Fixed height required, consistent layouts |
| `horizontal` | Rare, specific width adjustment needs |
| `both` | Full flexibility needed |

**Use Textarea over Input when:**
- Content is expected to be multiple lines
- User is writing paragraphs or descriptions
- Comments, notes, or messages

**Guidelines:**
- Set appropriate `rows` for expected content length
- Use `resize="none"` when layout consistency matters
- Pair with Field for labels and error states

---

### FileUpload

**Use when:** Allowing users to upload files.

**Guidelines:**
- Always specify accepted file types with `accept` prop
- Provide helpful `hint` text (file types, size limits)
- Use `multiple={false}` for single file uploads (avatars, documents)
- Handle all states: uploading, uploaded, error, warning

**Patterns:**
| Pattern | Configuration |
|---------|---------------|
| Profile photo | `multiple={false}` `accept="image/*"` |
| Documents | `accept=".pdf,.doc,.docx"` |
| Images | `accept="image/*"` |
| Any file | No `accept` prop |

```tsx
<FileUpload
  accept="image/*,.pdf"
  hint="PNG, JPG, PDF up to 10MB"
  onFilesAdded={(files) => uploadFiles(files)}
/>
```

---

### FileIcon

**Use when:** Displaying file type indicators in lists, uploads, or file browsers.

| Size | When to Use |
|------|-------------|
| `s` | Compact lists, table cells |
| `m` | Default, file items |
| `l` | Emphasized displays, previews |

| FileType | When to Use |
|----------|-------------|
| `doc` | Word documents, text files |
| `spreadsheet` | Excel, CSV files |
| `pdf` | PDF documents |
| `slides` | PowerPoint, presentations |
| `audio` | Music, audio files |
| `image` | Photos, graphics (can show thumbnail with `src`) |
| `generic` | Unknown file types |
| `custom` | Custom categorization with decorative color |

**Guidelines:**
- Use `getFileTypeFromExtension()` helper to auto-detect file type
- For images, pass `src` to show actual thumbnail
- Use `custom` with `color` for app-specific file categories

---

### Filter

**Use when:** Building filter bars for tables, lists, or data views where clicking reveals filter options.

| Size | When to Use |
|------|-------------|
| `xs` | Compact filter bars, dense UIs |
| `s` | Secondary filter areas |
| `m` | Default, primary filter bars |

**Filter is for:**
- Filtering table data (by Status, Date, Type, Category columns)
- Filtering section-level data (cards, lists, grids within a section)
- Search refinement controls
- Any data filtering that opens a dropdown/popover on click

**Filter is NOT for:**
- Displaying selected tags → use Badge
- Form tag selection → use ChipGroup
- Simple toggles → use Switch or ToggleButton
- Predefined visible options → use SegmentedControl or ToggleGroup

**Implementation pattern:**

```tsx
// Filter + Menu pattern
<Menu.Root>
  <Menu.Trigger render={
    <Filter
      label="Status"
      value={status}
      onClear={() => setStatus(null)}
    />
  } />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <MenuItem onClick={() => setStatus("Active")}>Active</MenuItem>
        <MenuItem onClick={() => setStatus("Inactive")}>Inactive</MenuItem>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>

// Filter bar example
<div className="flex gap-[var(--space-8)]">
  <Filter label="Status" value={status} onClear={...} />
  <Filter label="Type" value={type} onClear={...} />
  <Filter label="Date" icon={<RiCalendarLine />} value={dateRange} onClear={...} />
</div>
```

**Guidelines:**
- Always pair with Menu or Popover—Filter alone does nothing
- Show `value` when filter is active
- Always provide `onClear` when `value` is set
- Use consistent sizing across filter bar
- Icons optional—use for recognizable filters (calendar for date)

---

### Crypto

**Use when:** Displaying cryptocurrency token icons.

**Guidelines:**
- Use in trading UIs, crypto selectors, portfolio displays
- Consistent sizing via prefix components when in lists
- Available tokens: BTC, ETH, USDT, BNB, ADA, XRP, USDC, DOT, BUSD, UNI, LTC, SOL, LINK, WBTC, DAI

```tsx
<Crypto crypto="btc" size={24} />
<Crypto crypto="eth" size={32} />
```

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
<div className="flex gap-[var(--space-8)]">
  <Filter label="Status" value={status} onClear={() => setStatus(null)} />
  <Filter label="Type" value={type} onClear={() => setType(null)} />
  <Filter label="Date" icon={<RiCalendarLine />} />
</div>
```

### Action Menu
```tsx
<Menu>
  <Menu.Trigger>
    <IconButton variant="ghost" size="xs" aria-label="More actions">
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
