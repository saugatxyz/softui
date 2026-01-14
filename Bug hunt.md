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
