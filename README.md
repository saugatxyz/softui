# Soft UI Monorepo

Soft UI is a package-first design system for React/Next.js prototyping.

## Workspace Packages

- `@soft-ui/tokens` - design tokens, CSS entrypoints, and theme init helper
- `@soft-ui/icons` - swappable icon adapter with default Remix implementation
- `@soft-ui/react` - UI component package (subpath imports)
- `@soft-ui/docs` - dogfooding docs app in `apps/docs`

## Commands

```bash
pnpm dev         # docs app
pnpm typecheck   # packages + docs
pnpm lint        # packages + docs
pnpm build       # packages + docs production build
pnpm test:smoke  # docs smoke build
pnpm verify      # full local gate (same checks as CI)
```

## Vercel Setup (Docs App)

This repo is a monorepo. Set your Vercel project **Root Directory** to:

`apps/docs`

If Root Directory points to repo root, Vercel cannot detect the Next.js app correctly.

## Consumer Setup (v1)

1. Install packages:

```bash
npm i @soft-ui/tokens @soft-ui/icons @soft-ui/react
```

2. Import styles once:

```ts
import "@soft-ui/tokens/styles.css"
```

3. Add Tailwind v4 source scanning:

```css
@source "../node_modules/@soft-ui/react/dist/**/*.{js,mjs}";
```

4. Import components via subpaths:

```tsx
import { Button } from "@soft-ui/react/button"
```
