import { HomeIcon, InputMethodIcon, LayoutLeftIcon, PaletteIcon } from "@/icons"

export const navSections = [
  {
    title: "Overview",
    items: [
      {
        label: "Welcome",
        href: "/docs",
        icon: HomeIcon,
      },
    ],
  },
  {
    title: "Tokens",
    items: [
      { label: "Colors", href: "/docs/tokens/colors", icon: PaletteIcon },
      {
        label: "Typography",
        href: "/docs/tokens/typography",
        icon: InputMethodIcon,
      },
      {
        label: "Spacing & Radius",
        href: "/docs/tokens/spacing",
        icon: LayoutLeftIcon,
      },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Button", href: "/docs/button" },
      { label: "Icon Button", href: "/docs/icon-button" },
      { label: "Accordion", href: "/docs/accordion" },
    ],
  },
] as const
