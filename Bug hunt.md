# Bug Hunt - Visual and Behavior Parity

This document tracks visual, behavioral, and accessibility gaps discovered during the Base UI refactor.
Use it as the single source of truth for what is pending, in progress, fixed, and reviewed.

Status legend:
- [ ] Not started
- [~] In progress
- [x] Fixed

Review tags:
- Review: Code review pending
- Review: Needs QA
- Review: Approved

How to use:
- Each issue should be updated in place with status, owner, and review tag.
- Include the exact files touched and acceptance criteria.
- Keep changes token-driven and Base UI compliant.

-------------------------------------------------------------------------------

## Template
## [ID] Title
Status: [ ]
Owner:
Review:

Problem:
- What is broken or mismatched?

Files:
- path/to/file.tsx

Acceptance criteria:
- Bullet list of required outcomes

Notes:
- Optional context or links

-------------------------------------------------------------------------------

## Issues

## [BH-001] Avatar Group sizing + Safari overlap parity
Status: [ ]
Owner: Unassigned
Review: Review: Needs QA

Problem:
- AvatarGroup uses hardcoded pixel sizes/overlap and JS mask math instead of token-driven values.
- UA sniffing switches to `gap` layout for WebKit, causing layout shift and non-overlapping rendering in Safari.

Files:
- src/components/ui/avatar-group.tsx

Acceptance criteria:
- Replace hardcoded size/overlap values with token-driven values or derived Avatar tokens.
- Remove UA sniffing; use feature detection or a single layout path.
- Overlap rendering is visually consistent across Safari/Chrome/Firefox with no hydration/layout shift.

Notes:
- Affects sizing config + overlap mask logic.

## [BH-002] Icon Button missing accessible labels in docs/examples
Status: [ ]
Owner: Unassigned
Review: Review: Code review pending

Problem:
- Icon-only IconButton examples lack accessible names (no `aria-label` or visible text).
- Component API/docs do not emphasize the label requirement for icon-only usage.

Files:
- src/components/ui/icon-button.tsx
- src/app/docs/icon-button/page.tsx

Acceptance criteria:
- Docs examples include `aria-label` (or visible text) for icon-only buttons.
- Document or enforce accessible labeling for IconButton (type guard, runtime warning, or docs callout).

Notes:
- Screen readers announce unlabeled buttons in current docs examples.

## [BH-003] File Upload remove action a11y + motion guideline drift
Status: [ ]
Owner: Unassigned
Review: Review: Needs QA

Problem:
- Icon-only remove action has no accessible name.
- Progress bar animates width via `transition-all` instead of transform.
- Motion states use `y` transforms and a 350ms spring duration, which exceed motion guidelines.

Files:
- src/components/ui/file-upload.tsx

Acceptance criteria:
- Remove action has `aria-label`/`title` describing delete/cancel.
- Progress animation uses transform-based scaling (no width transitions, no `transition-all`).
- Motion transitions use `transform` instead of `y`, and durations stay within guidance (<= 300ms).

Notes:
- Applies to FileItem icon transitions and progress bar.

## [BH-004] Icon-only close/actions missing accessible labels (components)
Status: [ ]
Owner: Unassigned
Review: Review: Needs QA

Problem:
- Several components render icon-only action buttons without accessible names, which is not announced to screen readers.

Files:
- src/components/ui/dialog.tsx
- src/components/ui/toast.tsx
- src/components/ui/banner.tsx
- src/components/ui/inline-notification.tsx
- src/components/ui/table.tsx

Acceptance criteria:
- Icon-only actions include `aria-label` (or `title`) describing the action.
- Default close/overflow actions provide a sensible label without requiring consumers to wrap manually.

Notes:
- Affects DialogClose, ToastClose, BannerClose, InlineNotificationClose, and TableActionsCell default overflow action.

## [BH-005] IconButton docs/examples lack accessible names
Status: [ ]
Owner: Unassigned
Review: Review: Code review pending

Problem:
- Multiple docs pages render icon-only IconButton instances with no accessible name.

Files:
- src/app/docs/icon-button/page.tsx
- src/app/docs/popover/page.tsx
- src/app/docs/tooltip/page.tsx
- src/app/docs/table/page.tsx

Acceptance criteria:
- All icon-only IconButton usage in docs includes `aria-label`.
- Docs call out label requirements for icon-only controls.

Notes:
- Use a consistent label pattern across docs.

## [BH-006] Tabs + Segmented Control indicator animates layout properties
Status: [ ]
Owner: Unassigned
Review: Review: Needs QA

Problem:
- Indicators animate `left`/`width` via `transition-all`, which causes layout thrash and violates motion guidance to prefer transforms.

Files:
- src/components/ui/tabs.tsx
- src/components/ui/segmented-control.tsx

Acceptance criteria:
- Indicator movement uses transform-based animation (e.g., translate/scaleX with transform-origin).
- Avoid `transition-all` where only transform/opacity are needed.

Notes:
- Use CSS variables for offsets but apply them via transforms.

## [BH-007] Accordion motion exceeds duration guidance and animates height
Status: [ ]
Owner: Unassigned
Review: Review: Needs QA

Problem:
- Trigger rotation uses a 0.4s spring duration (over the 300ms guidance).
- Panel open/close animates height with `will-change: height`, which conflicts with motion best practices.

Files:
- src/components/ui/accordion.tsx

Acceptance criteria:
- Reduce rotation duration to <= 0.3s.
- Replace height animation with transform/scaleY (or alternate technique) and avoid `will-change: height`.

Notes:
- Keep animation origin aligned with trigger.

## [BH-008] Hardcoded pixel sizes instead of spacing tokens
Status: [ ]
Owner: Unassigned
Review: Review: Code review pending

Problem:
- Multiple components use hardcoded pixel sizes for spacing and icon/dot sizes, contrary to token usage rules.

Files:
- src/components/ui/icon-button.tsx
- src/components/ui/badge.tsx
- src/components/ui/chip.tsx

Acceptance criteria:
- Replace hardcoded pixel sizes with `var(--space-*)` or other tokenized values.
- If tokens are missing, propose additions and get approval before implementation.

Notes:
- Examples include `size-[20px]`, `size-[16px]`, `size-[6px]`, `p-[2px]`.

## [BH-009] Sortable table headers lack button semantics
Status: [ ]
Owner: Unassigned
Review: Review: Needs QA

Problem:
- Sortable headers are clickable/focusable `th` elements without button semantics, which may not be announced as interactive.

Files:
- src/components/ui/table.tsx

Acceptance criteria:
- Use a `<button>` inside the `th` (or apply `role="button"` + `aria-pressed`/`aria-label` where appropriate).
- Preserve `aria-sort` and keyboard interactions.

Notes:
- Ensure focus ring applies to the interactive element.

-------------------------------------------------------------------------------

## Quality milestones (10/10 scorecard)

## [QM-01] API consistency across components
Status: [ ]
Owner: Unassigned
Review: Review: Needs QA

Problem:
- API surface is not yet audited for consistent prop naming, passthrough behavior, and polymorphism patterns.

Files:
- src/components/ui/*
- src/app/docs/*

Acceptance criteria:
- Standardize `size`, `variant`, `tone`, `leadingIcon/trailingIcon` naming and semantics across all applicable components.
- Consistent polymorphic patterns (`render`/`asChild`) and passthrough behavior documented in docs.
- Deprecations or exceptions documented where divergence is required.

Notes:
- Baseline requirement for “shadcn‑level” DX.

## [QM-02] Accessibility baseline (icon-only + semantics)
Status: [ ]
Owner: Unassigned
Review: Review: Needs QA

Problem:
- System-wide accessible naming and interaction semantics are not guaranteed by default.

Files:
- src/components/ui/*
- src/app/docs/*

Acceptance criteria:
- All icon-only actions have accessible names (`aria-label` or visible text).
- Interactive elements expose appropriate semantics (button roles, `aria-sort`, focus order).
- Focus rings are consistent and meet the utility-focus-inner/outer rule.
- Docs examples are copy-safe for a11y.

Notes:
- Manual keyboard + screen reader pass required for sign-off.

## [QM-03] Token purity (no hardcoded sizes/colors)
Status: [ ]
Owner: Unassigned
Review: Review: Code review pending

Problem:
- Not all sizing, spacing, and visual styles are tokenized.

Files:
- src/components/ui/*
- src/design-system/tokens.css

Acceptance criteria:
- Remove hardcoded px values in components; use existing tokens or approved new tokens.
- Any new tokens are documented and added to theme blocks and token helpers.
- Exceptions (brand assets) are explicitly documented.

Notes:
- Requires approval before adding tokens.

## [QM-04] Motion system consistency
Status: [ ]
Owner: Unassigned
Review: Review: Needs QA

Problem:
- Motion guidelines (transform-only, <= 300ms, no transition-all) are not enforced system-wide.

Files:
- src/components/ui/*

Acceptance criteria:
- Animations use transform/opacity only; no height/width/left transitions.
- Durations <= 300ms unless explicitly justified.
- No `transition-all` in interactive components.
- Motion easing uses documented custom easings.

Notes:
- Must feel consistent across all components.

## [QM-05] Docs parity and completeness
Status: [ ]
Owner: Unassigned
Review: Review: Needs QA

Problem:
- Docs are not validated for parity, accessibility notes, and full API coverage.

Files:
- src/app/docs/*
- src/components/docs/*

Acceptance criteria:
- Every component page documents variants, sizes, states, and a11y requirements.
- Examples match actual API and are safe to copy/paste.
- Visual parity between docs and production components is verified.

Notes:
- Use `src/app/docs/button/page.tsx` as reference layout.

## [QM-06] Runtime stability + SSR hygiene
Status: [ ]
Owner: Unassigned
Review: Review: Code review pending

Problem:
- Client-only logic and UA sniffing can create hydration or parity risks.

Files:
- src/components/ui/*

Acceptance criteria:
- No UA sniffing for layout decisions; use feature detection or CSS.
- No hydration/layout shifts from client-only measurement.
- Controlled/uncontrolled patterns behave consistently with Base UI.
- Minimal `any` usage and no runtime type gaps.

Notes:
- Focus on Base UI passthrough behavior.

-------------------------------------------------------------------------------

## 10/10 roadmap (proposed)

### Phase 1 — A11y baseline + docs safety
- BH-002 Icon Button missing accessible labels in docs/examples
- BH-004 Icon-only close/actions missing accessible labels (components)
- BH-005 IconButton docs/examples lack accessible names
- BH-009 Sortable table headers lack button semantics
- BH-003 File Upload remove action a11y (a11y portion)
- QM-02 Accessibility baseline (icon-only + semantics)
- QM-05 Docs parity and completeness (a11y callouts)

### Phase 2 — Motion + interaction consistency
- BH-006 Tabs + Segmented Control indicator animates layout properties
- BH-007 Accordion motion exceeds duration guidance and animates height
- BH-003 File Upload motion guideline drift (motion portion)
- QM-04 Motion system consistency

### Phase 3 — Token purity + sizing parity
- BH-001 Avatar Group sizing + Safari overlap parity
- BH-008 Hardcoded pixel sizes instead of spacing tokens
- QM-03 Token purity (no hardcoded sizes/colors)

### Phase 4 — API consistency + SSR hygiene
- QM-01 API consistency across components
- QM-06 Runtime stability + SSR hygiene

Notes:
- Phases are ordered to deliver the fastest quality lift: a11y → motion → tokens → API/SSR hygiene.
- Token changes require approval per guardrails.
