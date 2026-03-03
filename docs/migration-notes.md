# Migration Notes: Soft UI Package-First Monorepo

## What changed

- Moved docs app to `apps/docs`
- Introduced publishable packages under `packages/*`
- Added package names:
  - `@soft-ui/tokens`
  - `@soft-ui/icons`
  - `@soft-ui/react`
- Switched docs usage from `@/components/ui/*` to `@soft-ui/react/*`

## Consumer import updates

Old:

```tsx
import { Button } from "@/components/ui/button"
import { SearchIcon } from "@/icons"
```

New:

```tsx
import { Button } from "@soft-ui/react/button"
import { SearchIcon } from "@soft-ui/icons"
import "@soft-ui/tokens/styles.css"
```

## Tailwind requirement

Add source scanning for packaged component classes:

```css
@source "../node_modules/@soft-ui/react/dist/**/*.{js,mjs}";
```

## Theme bootstrap helper

Use `createThemeInitScript()` from `@soft-ui/tokens` in your app layout `<head>` script.
