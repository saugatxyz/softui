# @soft-ui/tokens

Soft UI design tokens and theme runtime helpers.

## Install

```bash
npm i @soft-ui/tokens
```

## Usage

Import base styles once:

```ts
import "@soft-ui/tokens/styles.css"
```

Optional direct imports:

- `@soft-ui/tokens/tokens.css`
- `@soft-ui/tokens/utilities.css`

## Theme Init Script

```tsx
import { createThemeInitScript } from "@soft-ui/tokens"

<script dangerouslySetInnerHTML={{ __html: createThemeInitScript() }} />
```
