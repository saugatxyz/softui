# @soft-ui/icons

Swappable icon adapter package for Soft UI components.

## Install

```bash
npm i @soft-ui/icons
```

## Default Usage

Soft UI components work out of the box with Remix icons.

## Override Icons Globally

```tsx
import { SoftUIIconProvider, type SoftUIIconMap } from "@soft-ui/icons"

const icons: SoftUIIconMap = {
  CloseIcon: MyCloseIcon,
}

<SoftUIIconProvider icons={icons}>{children}</SoftUIIconProvider>
```
