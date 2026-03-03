export const modes = ["light", "dark"] as const

export const schemes = ["mono", "color"] as const

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

export type Mode = (typeof modes)[number]
export type Scheme = (typeof schemes)[number]
export type ThemeColor = (typeof themeColors)[number]
export type BaseColor = (typeof baseColors)[number]

export type ThemeConfig = {
  defaultMode: Mode
  defaultScheme: Scheme
  defaultThemeColor: ThemeColor
  defaultBaseColor: BaseColor
}

export type ThemeStorageKeys = {
  mode: string
  scheme: string
  theme: string
  base: string
}

export type ThemeInitOptions = {
  storageKeys?: Partial<ThemeStorageKeys>
  defaults?: Partial<ThemeConfig>
}

export const designSystemConfig: ThemeConfig = {
  defaultMode: "light",
  defaultScheme: "mono",
  defaultThemeColor: "blue",
  defaultBaseColor: "neutral",
}

const defaultStorageKeys: ThemeStorageKeys = {
  mode: "ds-mode",
  scheme: "ds-scheme",
  theme: "ds-theme-color",
  base: "ds-base-color",
}

export function createThemeInitScript(options: ThemeInitOptions = {}) {
  const storageKeys: ThemeStorageKeys = {
    ...defaultStorageKeys,
    ...options.storageKeys,
  }

  const defaults: ThemeConfig = {
    ...designSystemConfig,
    ...options.defaults,
  }

  return `
(function () {
  const storageKeys = ${JSON.stringify(storageKeys)}
  const query = "(prefers-color-scheme: dark)"
  const defaults = ${JSON.stringify(defaults)}
  let mode = defaults.defaultMode
  let scheme = defaults.defaultScheme
  let theme = defaults.defaultThemeColor
  let base = defaults.defaultBaseColor
  const root = document.documentElement
  try {
    const prefersDark = window.matchMedia(query).matches
    const storedMode = localStorage.getItem(storageKeys.mode)
    const storedScheme = localStorage.getItem(storageKeys.scheme)
    const storedTheme = localStorage.getItem(storageKeys.theme)
    const storedBase = localStorage.getItem(storageKeys.base)
    const hasModeOverride = storedMode === "light" || storedMode === "dark"
    const followsSystemMode = !hasModeOverride
    if (hasModeOverride) {
      mode = storedMode
    } else {
      mode = prefersDark ? "dark" : "light"
    }
    if (storedScheme === "mono" || storedScheme === "color") {
      scheme = storedScheme
    }
    if (storedTheme) {
      theme = storedTheme
    }
    if (storedBase) {
      base = storedBase
    }
    const mediaQuery = window.matchMedia(query)
    const updateModeFromSystem = () => {
      if (!followsSystemMode) return
      const nextMode = mediaQuery.matches ? "dark" : "light"
      mode = nextMode
      root.dataset.mode = nextMode
    }
    updateModeFromSystem()
    mediaQuery.addEventListener("change", () => {
      updateModeFromSystem()
    })
  } catch (error) {
    // Ignore storage failures so defaults stay intact.
  }
  root.dataset.mode = mode
  root.dataset.scheme = scheme
  root.dataset.themeColor = scheme === "mono" ? defaults.defaultThemeColor : theme
  root.dataset.baseColor = base
})()
`
}
