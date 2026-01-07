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
      { label: "Accordion", href: "/docs/accordion" },
      { label: "Alert Dialog", href: "/docs/alert-dialog" },
      { label: "Autocomplete", href: "/docs/autocomplete" },
      { label: "Avatar", href: "/docs/avatar" },
      { label: "Badge", href: "/docs/badge" },
      { label: "Button", href: "/docs/button" },
      { label: "Button Group", href: "/docs/button-group" },
      { label: "Checkbox", href: "/docs/checkbox" },
      { label: "Checkbox Group", href: "/docs/checkbox-group" },
      { label: "Chip", href: "/docs/chip" },
      { label: "Combobox", href: "/docs/combobox" },
      { label: "Context Menu", href: "/docs/context-menu" },
      { label: "Dialog", href: "/docs/dialog" },
      { label: "Field", href: "/docs/field" },
      { label: "Icon Button", href: "/docs/icon-button" },
      { label: "Input", href: "/docs/input" },
      { label: "Input Group", href: "/docs/input-group" },
      { label: "Kbd", href: "/docs/kbd" },
      { label: "Menu", href: "/docs/menu" },
      { label: "Number Field", href: "/docs/number-field" },
      { label: "Pagination", href: "/docs/pagination" },
      { label: "Popover", href: "/docs/popover" },
      { label: "Radio Group", href: "/docs/radio-group" },
      { label: "Select", href: "/docs/select" },
      { label: "Switch", href: "/docs/switch" },
      { label: "Switch Group", href: "/docs/switch-group" },
      { label: "Toggle Button", href: "/docs/toggle-button" },
      { label: "Toggle Group", href: "/docs/toggle-group" },
      { label: "Tooltip", href: "/docs/tooltip" },
    ],
  },
  {
    title: "Assets",
    items: [
      { label: "Logo", href: "/docs/logo" },
      { label: "Crypto", href: "/docs/crypto" },
    ],
  },
] as const
