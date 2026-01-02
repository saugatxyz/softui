# Soft UI Design System Spec

## Goals
- Skin shadcn components using Base UI primitives.
- Use design tokens that map to Tailwind scales and allow live theme/base switching.
- Document each component with variants and usage.
- Support Remix Icons and a future self-hosted shadcn registry.

## Architecture
- Next.js app with App Router.
- Base UI primitives for component behavior.
- Tokens drive color, spacing, typography, and radii.
- Theme + base colors are switched with `data-theme-color` and `data-base-color`.

## Tokens
- Colors are derived from Tailwind palettes and mapped to `--theme-*` and `--base-*`.
- `data-scheme=mono` uses neutral primary actions; `data-scheme=color` uses theme.
- Typography uses Inter Variable:
  - sizes: xs 10/10, s 12/16, m 14/20, l 16/22, xl 18/24, 2xl 20/28, 3xl 24/32
  - weights: default 400, medium 480, semibold 550

## Components
- `Button` is the first component.
- Balanced icon padding with a label wrapper.
- Variants: primary, secondary, tertiary, ghost, link, link-alt, danger.
- Size paddings: xs/s 8px, m 12px, l 16px.
- Focus ring: inner 1px, outer 3px.

## Docs
- `/docs/button` shows usage, examples, variants, and sizings.
- Token documentation lives in `docs/tokens`.

## Icons
- Use Remix Icons (`@remixicon/react`) across the system.

## Registry
- `registry.json` prepares a future shadcn registry setup.
