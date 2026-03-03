export const modes = ["light", "dark"] as const

export const themeColors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "mauve",
  "mist",
  "olive",
  "taupe",
] as const

export const baseColors = [
  "neutral",
  "slate",
  "gray",
  "zinc",
  "stone",
  "mauve",
  "mist",
  "olive",
  "taupe",
] as const

export const designSystemConfig = {
  defaultMode: "light",
  defaultScheme: "mono",
  defaultThemeColor: "blue",
  defaultBaseColor: "neutral",
} as const
