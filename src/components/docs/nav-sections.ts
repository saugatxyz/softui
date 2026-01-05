import {
  AppsFillIcon,
  HashtagIcon,
  HomeIcon,
  InputMethodIcon,
  LayoutLeftIcon,
  PaletteIcon,
} from "@/icons"

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
      { label: "Icons", href: "/docs/tokens/icons", icon: AppsFillIcon },
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
      { label: "Button Group", href: "/docs/button-group" },
      { label: "Icon Button", href: "/docs/icon-button" },
      { label: "Badge", href: "/docs/badge" },
      { label: "Accordion", href: "/docs/accordion" },
      { label: "Toggle Button", href: "/docs/toggle-button" },
      { label: "Toggle Group", href: "/docs/toggle-group" },
    ]
      .slice()
      .sort((a, b) => a.label.localeCompare(b.label)),
  },
] as const
