import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { designSystemConfig } from "@/design-system/config"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Soft UI",
  description: "Soft UI design system",
}

const themeInitScript = `
(function () {
  const storageKeys = {
    mode: "ds-mode",
    scheme: "ds-scheme",
    theme: "ds-theme-color",
    base: "ds-base-color",
  }
  const query = "(prefers-color-scheme: dark)"
  const defaults = {
    mode: ${JSON.stringify(designSystemConfig.defaultMode)},
    scheme: ${JSON.stringify(designSystemConfig.defaultScheme)},
    theme: ${JSON.stringify(designSystemConfig.defaultThemeColor)},
    base: ${JSON.stringify(designSystemConfig.defaultBaseColor)},
  }
  let mode = defaults.mode
  let scheme = defaults.scheme
  let theme = defaults.theme
  let base = defaults.base
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
  root.dataset.themeColor = scheme === "mono" ? defaults.theme : theme
  root.dataset.baseColor = base
})()
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-mode={designSystemConfig.defaultMode}
      data-scheme={designSystemConfig.defaultScheme}
      data-theme-color={designSystemConfig.defaultThemeColor}
      data-base-color={designSystemConfig.defaultBaseColor}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
