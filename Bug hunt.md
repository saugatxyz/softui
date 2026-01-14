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

## Seed backlog (from deep audit)

## 1. File Upload - Dropzone keyboard access
Status: [ ]
Owner:
Review:

Problem:
- Dropzone is click-only and not keyboard accessible.

Files:
- src/components/ui/file-upload.tsx

Acceptance criteria:
- Dropzone is focusable and triggers file picker with Enter/Space.
- Focus ring is visible on keyboard focus.
- No behavior change for pointer users.

Notes:
- Consider rendering a button or adding role="button", tabIndex=0, and key handlers.

## 2. Table - Sortable header accessibility
Status: [ ]
Owner:
Review:

Problem:
- Sortable headers are mouse-only and lack aria-sort.

Files:
- src/components/ui/table.tsx

Acceptance criteria:
- Sortable headers are keyboard-operable (Enter/Space).
- aria-sort is set correctly when sortDirection is defined.
- Focus state is visible.

Notes:
- Consider using a button inside the th for semantics.

## 3. Chip / Filter - Clear affordance keyboard support
Status: [ ]
Owner:
Review:

Problem:
- Clear/remove controls use tabIndex={-1} and cannot be reached by keyboard.

Files:
- src/components/ui/chip.tsx
- src/components/ui/filter.tsx

Acceptance criteria:
- Clear/remove controls are focusable and keyboard operable.
- Interaction does not interfere with parent button behavior.

Notes:
- Use a real button element or add key handlers and aria-labels.

## 4. Dialog / AlertDialog - keepMounted behavior
Status: [ ]
Owner:
Review:

Problem:
- keepMounted is effectively ignored because children are removed when closed.

Files:
- src/components/ui/dialog.tsx
- src/components/ui/alert-dialog.tsx

Acceptance criteria:
- keepMounted true retains DOM nodes while closed.
- Animations and accessibility remain correct.

Notes:
- Use forceMount or render gating based on keepMounted.

## 5. Core components - Ref forwarding consistency
Status: [ ]
Owner:
Review:

Problem:
- Many primitives do not forward refs (limits form libs and measurements).

Files:
- src/components/ui/button.tsx
- src/components/ui/icon-button.tsx
- src/components/ui/input.tsx
- src/components/ui/textarea.tsx
- src/components/ui/select.tsx
- src/components/ui/combobox.tsx
- src/components/ui/autocomplete.tsx
- src/components/ui/toggle-button.tsx
- src/components/ui/pagination.tsx

Acceptance criteria:
- Core primitives forward refs to underlying DOM or Base UI primitive.
- Types are updated accordingly.

Notes:
- Prefer React.forwardRef with displayName where useful.

## 6. Token compliance - Remove non-token spacing/radius
Status: [ ]
Owner:
Review:

Problem:
- Several components use raw px values.

Files:
- src/components/ui/filter.tsx (pl-[14px])
- src/components/ui/toast.tsx (rounded-[17px])

Acceptance criteria:
- Replace with tokenized values or document exceptions.

Notes:
- If tokens do not exist, propose additions separately.

## 7. Token compliance - Document intentional color exceptions
Status: [ ]
Owner:
Review:

Problem:
- Hardcoded brand colors are present without explicit exception policy.

Files:
- src/components/ui/logo.tsx
- src/components/ui/crypto.tsx
- src/components/ui/file-icon.tsx

Acceptance criteria:
- Document exceptions in a single place (e.g., CLAUDE.md or SPEC).
- Keep token usage everywhere else.

Notes:
- Do not change brand colors without design approval.

## 8. Docs - Accessibility usage notes
Status: [ ]
Owner:
Review:

Problem:
- Docs show usage but do not call out a11y considerations.

Files:
- src/app/docs/*/page.tsx

Acceptance criteria:
- Add short a11y notes to components with custom interactions.
- Examples remain consistent with component behavior.

-------------------------------------------------------------------------------
