# Component Audit Plan

Last updated: 2026-01-10

Rule: Update Done/Pending statuses as work progresses without waiting for user input.
Status reflects audit verification (not just existence).
Evidence format: ui: <path>; primitive: <primitive/custom>; docs: <path or note>; audit: <pending/passed>

## Base UI wrappers (strict passthrough)

| Component | Status | Evidence | Notes |
| --- | --- | --- | --- |
| Accordion | Done | ui: src/components/ui/accordion.tsx; primitive: @base-ui/react/accordion; docs: /docs/accordion; audit: passed | Strict passthrough; no internal state. |
| Alert Dialog | Done | ui: src/components/ui/alert-dialog.tsx; primitive: @base-ui/react/alert-dialog; docs: /docs/alert-dialog; audit: passed | Strict passthrough; no internal state. |
| Autocomplete | Done | ui: src/components/ui/autocomplete.tsx; primitive: @base-ui/react/autocomplete; docs: /docs/autocomplete; audit: passed | Strict passthrough; styling-only props. |
| Avatar | Done | ui: src/components/ui/avatar.tsx; primitive: @base-ui/react/avatar; docs: /docs/avatar; audit: passed | Skinned Base UI wrapper with design variants. |
| Button | Done | ui: src/components/ui/button.tsx; primitive: @base-ui/react/button; docs: /docs/button; audit: passed | Strict passthrough; styling-only props. |
| Checkbox | Done | ui: src/components/ui/checkbox.tsx; primitive: @base-ui/react/checkbox; docs: /docs/checkbox; audit: passed | Control-only wrapper; labeling via Field. |
| Checkbox Control | Done | ui: src/components/ui/checkbox-control.tsx; primitive: @base-ui/react/checkbox; docs: /docs/checkbox (control); audit: passed | Strict passthrough; data attrs only. |
| Combobox | Done | ui: src/components/ui/combobox.tsx; primitive: @base-ui/react/combobox; docs: /docs/combobox; audit: passed | Strict passthrough; styling-only props. |
| Context Menu | Done | ui: src/components/ui/context-menu.tsx; primitive: @base-ui/react/context-menu; docs: /docs/context-menu; audit: passed | Strict passthrough; no convenience props. |
| Dialog | Done | ui: src/components/ui/dialog.tsx; primitive: @base-ui/react/dialog; docs: /docs/dialog; audit: passed | Strict passthrough; no internal state. |
| Field | Done | ui: src/components/ui/field.tsx; primitive: @base-ui/react/field; docs: /docs/field; audit: passed | Convenience wrapper for label/description. |
| Fieldset | Done | ui: src/components/ui/fieldset.tsx; primitive: @base-ui/react/fieldset; docs: /docs/fieldset; audit: passed | Strict passthrough; styling-only props. |
| Form | Done | ui: src/components/ui/form.tsx; primitive: @base-ui/react/form; docs: /docs/form; audit: passed | Strict passthrough; styling-only props. |
| Input | Done | ui: src/components/ui/input.tsx; primitive: @base-ui/react/input; docs: /docs/input; audit: passed | Focus styles via CSS only. |
| Menu | Done | ui: src/components/ui/menu.tsx; primitive: @base-ui/react/menu; docs: /docs/menu; audit: passed | Strict passthrough; no search convenience. |
| Menu Item | Done | ui: src/components/ui/menu-item.tsx; primitive: @base-ui/react/menu; docs: /docs/menu (item); audit: passed | Thin wrapper; no prefix/suffix props. |
| Meter | Done | ui: src/components/ui/meter.tsx; primitive: @base-ui/react/meter; docs: /docs/meter; audit: passed | Strict passthrough; styling-only props. |
| Number Field | Done | ui: src/components/ui/number-field.tsx; primitive: @base-ui/react/number-field; docs: /docs/number-field; audit: passed | Strict passthrough; styling-only props. |
| Popover | Done | ui: src/components/ui/popover.tsx; primitive: @base-ui/react/popover; docs: /docs/popover; audit: passed | Strict passthrough; styling-only props. |
| Progress | Done | ui: src/components/ui/progress.tsx; primitive: @base-ui/react/progress; docs: /docs/progress; audit: passed | Strict passthrough; styling-only props. |
| Radio Control | Done | ui: src/components/ui/radio-control.tsx; primitive: @base-ui/react/radio; docs: /docs/radio-group (control); audit: passed | Strict passthrough; styling-only props. |
| Select | Done | ui: src/components/ui/select.tsx; primitive: @base-ui/react/select; docs: /docs/select; audit: passed | Strict passthrough; styling-only props. |
| Separator | Done | ui: src/components/ui/separator.tsx; primitive: @base-ui/react/separator; docs: /docs/separator; audit: passed | Strict passthrough; styling-only props. |
| Slider | Done | ui: src/components/ui/slider.tsx; primitive: @base-ui/react/slider; docs: /docs/slider; audit: passed | Thumb colors + strict passthrough. |
| Switch | Done | ui: src/components/ui/switch.tsx; primitive: @base-ui/react/switch; docs: /docs/switch; audit: passed | Control-only wrapper; labeling via Field. |
| Switch Control | Done | ui: src/components/ui/switch-control.tsx; primitive: @base-ui/react/switch; docs: /docs/switch (control); audit: passed | Strict passthrough; thumb tokens set. |
| Tabs | Done | ui: src/components/ui/tabs.tsx; primitive: @base-ui/react/tabs; docs: /docs/tabs; audit: passed | Strict passthrough; styling-only props. |
| Toast | Done | ui: src/components/ui/toast.tsx; primitive: @base-ui/react/toast; docs: /docs/toast; audit: passed | Strict passthrough; styling-only props. |
| Toggle Button | Done | ui: src/components/ui/toggle-button.tsx; primitive: @base-ui/react/toggle; docs: /docs/toggle-button; audit: passed | Strict passthrough; styling-only props. |
| Toggle Group | Done | ui: src/components/ui/toggle-group.tsx; primitive: @base-ui/react/toggle-group; docs: /docs/toggle-group; audit: passed | Strict passthrough; styling-only props. |
| Tooltip | Done | ui: src/components/ui/tooltip.tsx; primitive: @base-ui/react/tooltip; docs: /docs/tooltip; audit: passed | Strict passthrough; styling-only props. |

## Custom components (non-Base UI)

| Component | Status | Evidence | Notes |
| --- | --- | --- | --- |
| Avatar Group | Done | ui: src/components/ui/avatar-group.tsx; primitive: custom; docs: /docs/avatar (group); audit: passed | Custom layout. |
| Badge | Done | ui: src/components/ui/badge.tsx; primitive: custom; docs: /docs/badge; audit: passed | Custom component. |
| Banner | Done | ui: src/components/ui/banner.tsx; primitive: custom; docs: /docs/banner; audit: passed | Custom component. |
| Breadcrumbs | Done | ui: src/components/ui/breadcrumbs.tsx; primitive: custom; docs: /docs/breadcrumbs; audit: passed | Custom component. |
| Button Group | Done | ui: src/components/ui/button-group.tsx; primitive: custom (uses @base-ui/react/button); docs: /docs/button-group; audit: passed | Custom component. |
| Checkbox Group | Done | ui: src/components/ui/checkbox-group.tsx; primitive: custom; docs: /docs/checkbox-group; audit: passed | Custom component. |
| Checkbox Group Item | Done | ui: src/components/ui/checkbox-group-item.tsx; primitive: custom (uses @base-ui/react/field); docs: /docs/checkbox-group (item); audit: passed | Field-based labeling + full-row click. |
| Checkbox Prefix | Done | ui: src/components/ui/checkbox-prefix.tsx; primitive: custom; docs: /docs/checkbox-group (prefix); audit: passed | Custom visual prefix. |
| Chip | Done | ui: src/components/ui/chip.tsx; primitive: custom; docs: /docs/chip; audit: passed | Custom component. |
| Chip Group | Done | ui: src/components/ui/chip-group.tsx; primitive: custom; docs: /docs/chip (group); audit: passed | Custom component. |
| Chip Prefix | Done | ui: src/components/ui/chip-prefix.tsx; primitive: custom; docs: /docs/chip (prefix); audit: passed | Custom visual prefix. |
| Crypto | Done | ui: src/components/ui/crypto.tsx; primitive: custom; docs: /docs/crypto; audit: passed | Brand asset tokens (hardcoded colors allowed). |
| Empty State | Done | ui: src/components/ui/empty-state.tsx; primitive: custom; docs: /docs/empty-state; audit: passed | Custom component. |
| File Icon | Done | ui: src/components/ui/file-icon.tsx; primitive: custom; docs: /docs/file-icon; audit: passed | Brand asset tokens (hardcoded colors allowed). |
| File Upload | Done | ui: src/components/ui/file-upload.tsx; primitive: custom; docs: /docs/file-upload; audit: passed | Custom component. |
| Filter | Done | ui: src/components/ui/filter.tsx; primitive: custom; docs: /docs/filter; audit: passed | Custom component. |
| Icon Button | Done | ui: src/components/ui/icon-button.tsx; primitive: custom (uses @base-ui/react/button); docs: /docs/icon-button; audit: passed | Custom component. |
| Inline Notification | Done | ui: src/components/ui/inline-notification.tsx; primitive: custom; docs: /docs/inline-notification; audit: passed | Custom component. |
| Input Group | Done | ui: src/components/ui/input-group.tsx; primitive: custom (uses @base-ui/react/input); docs: /docs/input-group; audit: passed | Focus handling + API alignment. |
| Kbd | Done | ui: src/components/ui/kbd.tsx; primitive: custom; docs: /docs/kbd; audit: passed | Custom component. |
| Logo | Done | ui: src/components/ui/logo.tsx; primitive: custom; docs: /docs/logo; audit: passed | Brand asset tokens (hardcoded colors allowed). |
| Menu Empty | Done | ui: src/components/ui/menu-empty.tsx; primitive: custom helper; docs: /docs/menu (empty), /docs/context-menu (empty); audit: passed | Custom menu empty state. |
| Menu Group | Done | ui: src/components/ui/menu-group.tsx; primitive: custom helper (uses @base-ui/react/menu); docs: /docs/menu (group), /docs/context-menu (group); audit: passed | Custom menu helper + MenuGroupLabel. |
| Menu Prefix | Done | ui: src/components/ui/menu-prefix.tsx; primitive: custom helper (uses @base-ui/react/menu); docs: /docs/menu (prefix), /docs/context-menu (prefix); audit: passed | Custom menu helper. |
| Menu Separator | Done | ui: src/components/ui/menu-separator.tsx; primitive: custom helper (uses @base-ui/react/menu); docs: /docs/menu (separator), /docs/context-menu (separator); audit: passed | Custom menu helper. |
| Menu Suffix | Done | ui: src/components/ui/menu-suffix.tsx; primitive: custom helper (uses @base-ui/react/menu); docs: /docs/filter (suffix); audit: passed | Custom menu helper. |
| Pagination | Done | ui: src/components/ui/pagination.tsx; primitive: custom (uses @base-ui/react/button); docs: /docs/pagination; audit: passed | Custom component. |
| Radio Group | Done | ui: src/components/ui/radio-group.tsx; primitive: custom (uses @base-ui/react/radio-group); docs: /docs/radio-group; audit: passed | Custom component. |
| Radio Group Item | Done | ui: src/components/ui/radio-group-item.tsx; primitive: custom (uses @base-ui/react/field); docs: /docs/radio-group (item); audit: passed | Field-based labeling + full-row click. |
| Radio Prefix | Done | ui: src/components/ui/radio-prefix.tsx; primitive: custom; docs: /docs/radio-group (prefix); audit: passed | Custom visual prefix. |
| Scroll Fade Container | Done | ui: removed (unused); primitive: custom utility; docs: n/a (removed); audit: passed | Removed (unused in repo). |
| Segmented Control | Done | ui: src/components/ui/segmented-control.tsx; primitive: custom (uses @base-ui/react/tabs); docs: /docs/segmented-control; audit: passed | Custom component. |
| Switch Group | Done | ui: src/components/ui/switch-group.tsx; primitive: custom; docs: /docs/switch-group; audit: passed | Custom component. |
| Switch Group Item | Done | ui: src/components/ui/switch-group-item.tsx; primitive: custom (uses @base-ui/react/field); docs: /docs/switch-group (item); audit: passed | Field-based labeling + full-row click. |
| Switch Prefix | Done | ui: src/components/ui/switch-prefix.tsx; primitive: custom; docs: /docs/switch-group (prefix); audit: passed | Custom visual prefix. |
| Table | Done | ui: src/components/ui/table.tsx; primitive: custom; docs: /docs/table; audit: passed | Custom component. |
| Table Prefix | Done | ui: src/components/ui/table-prefix.tsx; primitive: custom; docs: /docs/table (prefix); audit: passed | Custom component. |
| Textarea | Done | ui: src/components/ui/textarea.tsx; primitive: custom (uses @base-ui/react/input); docs: /docs/textarea; audit: passed | Focus handling + API alignment. |

## Shared utilities (internal)

| Utility | Status | Evidence | Notes |
| --- | --- | --- | --- |
| List Item Styles | Done | ui: src/components/ui/list-item-styles.tsx; primitive: n/a; docs: n/a (internal); audit: passed | Shared Menu/Select styles. |

## Inventory reconciliation notes

- src/app/docs pages and src/components/docs/nav-sections.ts are aligned (no missing component routes).
- COMPONENTS.md documents Collapsible as Base UI-only; no wrapper planned.
- Internal helpers (controls, prefixes, group items, menu helpers, table prefix, list-item-styles) are intentionally not in the docs nav; coverage lives in parent component pages.
- ChipGroup and AvatarGroup docs live under `/docs/chip` and `/docs/avatar` (no separate routes).

## Audit checks (global)

- `rg "useState(" src/components/ui` -> hits only in `src/components/ui/file-upload.tsx` (custom component).
- `rg "#[0-9A-Fa-f]{3,8}" src/components/ui` -> only brand assets (`src/components/ui/logo.tsx`, `src/components/ui/file-icon.tsx`, `src/components/ui/crypto.tsx`), allowed by guardrails.
- `rg "rgb\\(|hsl\\(" src/components/ui` -> tokenized `rgb(var(--...))` usage in `src/components/ui/button.tsx`, `src/components/ui/icon-button.tsx`, `src/components/ui/file-icon.tsx`.
- `pnpm tsc --noEmit` -> passes.
- `pnpm lint` -> passes.
