"use client"

import * as React from "react"
import { motion } from "motion/react"

import {
  baseColors,
  designSystemConfig,
  modes,
  themeColors,
} from "@soft-ui/tokens"
import {
  MenuIcon,
  MoonFillIcon,
  SettingsIcon,
  SunFillIcon,
} from "@soft-ui/icons"
import { cn } from "@/lib/utils"
import { Dialog } from "@soft-ui/react/dialog"
import { IconButton } from "@soft-ui/react/icon-button"
import { SoftLogo } from "@/components/docs/soft-logo"

const storageKeys = {
  mode: "ds-mode",
  scheme: "ds-scheme",
  theme: "ds-theme-color",
  base: "ds-base-color",
}

type ThemeState = {
  mode: string
  scheme: string
  themeColor: string
  baseColor: string
}

const initialState: ThemeState = {
  mode: designSystemConfig.defaultMode,
  scheme: designSystemConfig.defaultScheme,
  themeColor: designSystemConfig.defaultThemeColor,
  baseColor: designSystemConfig.defaultBaseColor,
}

const applyToRoot = (state: ThemeState) => {
  const root = document.documentElement
  root.dataset.mode = state.mode
  root.dataset.scheme = state.scheme
  root.dataset.themeColor =
    state.scheme === "mono"
      ? designSystemConfig.defaultThemeColor
      : state.themeColor
  root.dataset.baseColor = state.baseColor
}

const getPreferredMode = () => {
  if (typeof window === "undefined") {
    return initialState.mode
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  return prefersDark ? "dark" : "light"
}

type LoadedThemeState = {
  state: ThemeState
  followsSystem: boolean
}

const loadStoredState = (): LoadedThemeState => {
  if (typeof window === "undefined") {
    return { state: initialState, followsSystem: false }
  }
  const storedMode = localStorage.getItem(storageKeys.mode)
  const storedScheme = localStorage.getItem(storageKeys.scheme)
  const storedTheme = localStorage.getItem(storageKeys.theme)
  const storedBase = localStorage.getItem(storageKeys.base)
  const hasModeOverride =
    storedMode !== null && modes.includes(storedMode as (typeof modes)[number])
  const mode = hasModeOverride ? storedMode! : getPreferredMode()
  const scheme =
    storedScheme === "mono" || storedScheme === "color"
      ? (storedScheme as ThemeState["scheme"])
      : initialState.scheme
  const themeColor =
    storedTheme && themeColors.includes(storedTheme as (typeof themeColors)[number])
      ? storedTheme
      : initialState.themeColor
  const baseColor =
    storedBase && baseColors.includes(storedBase as (typeof baseColors)[number])
      ? storedBase
      : initialState.baseColor
  return {
    state: {
      mode,
      scheme,
      themeColor,
      baseColor,
    },
    followsSystem: !hasModeOverride,
  }
}

const persistState = (state: ThemeState) => {
  localStorage.setItem(storageKeys.mode, state.mode)
  localStorage.setItem(storageKeys.scheme, state.scheme)
  localStorage.setItem(storageKeys.theme, state.themeColor)
  localStorage.setItem(storageKeys.base, state.baseColor)
}

type SwatchButtonProps = {
  label: string
  selected: boolean
  color: string
  onSelect: () => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void
  buttonRef?: React.Ref<HTMLButtonElement>
  tabIndex?: number
  size?: "s" | "m"
}

function SwatchButton({
  label,
  selected,
  color,
  onSelect,
  onKeyDown,
  buttonRef,
  tabIndex,
  size = "m",
}: SwatchButtonProps) {
  return (
    <button
      type="button"
      ref={buttonRef}
      aria-label={label}
      aria-checked={selected}
      role="radio"
      tabIndex={tabIndex}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={cn(
        "flex-none rounded-full border transition focus-visible:outline-none",
        size === "s" ? "h-[20px] w-[20px]" : "h-[32px] w-[32px]",
        selected
          ? "border-border-interactive-default ring-2 ring-utility-focus-inner ring-offset-2 ring-offset-surface-page"
          : "border-border-subtle hover:border-border-interactive-hover"
      )}
      style={{ backgroundColor: color }}
    />
  )
}

type ThemeSwitcherProps = {
  onMenuOpen?: () => void
  menuOpen?: boolean
}

export function ThemeSwitcher({ onMenuOpen, menuOpen }: ThemeSwitcherProps) {
  const [state, setState] = React.useState<ThemeState>(initialState)
  const [followsSystemPreference, setFollowsSystemPreference] = React.useState(false)
  const [mobileExpanded, setMobileExpanded] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const themeOptions = ["mono", ...themeColors]
  const swatchRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  React.useEffect(() => {
    const { state: stored, followsSystem } = loadStoredState()
    setState(stored)
    setFollowsSystemPreference(followsSystem)
    applyToRoot(stored)
  }, [])

  React.useEffect(() => {
    if (!followsSystemPreference) return
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (event: MediaQueryListEvent) => {
      setState((prev) => {
        const nextMode = event.matches ? "dark" : "light"
        if (prev.mode === nextMode) {
          return prev
        }
        const nextState = { ...prev, mode: nextMode }
        applyToRoot(nextState)
        return nextState
      })
    }
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [followsSystemPreference])

  const updateState = (partial: Partial<ThemeState>) => {
    setState((prev) => {
      const next = { ...prev, ...partial }
      applyToRoot(next)
      persistState(next)
      return next
    })
  }

  const currentTheme = state.scheme === "mono" ? "mono" : state.themeColor

  const handleThemeChange = (value: string) => {
    if (value === "mono") {
      updateState({ scheme: "mono" })
      return
    }
    updateState({ scheme: "color", themeColor: value })
  }

  const themeSwatchColor = (value: string) => {
    if (value === "mono") {
      return state.mode === "dark"
        ? `rgb(var(--${state.baseColor}-100))`
        : `rgb(var(--${state.baseColor}-800))`
    }
    return `rgb(var(--${value}-600))`
  }

  const baseSwatchColor = (value: string) => `rgb(var(--${value}-500))`

  const handleSwatchKeyDown =
    (index: number) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (
        event.key !== "ArrowRight" &&
        event.key !== "ArrowLeft" &&
        event.key !== "ArrowDown" &&
        event.key !== "ArrowUp"
      ) {
        return
      }
      event.preventDefault()
      const direction =
        event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1
      const nextIndex =
        (index + direction + themeOptions.length) % themeOptions.length
      const nextValue = themeOptions[nextIndex]
      handleThemeChange(nextValue)
      swatchRefs.current[nextIndex]?.focus()
    }

  return (
    <div className="z-40 shrink-0 border-b border-border-muted bg-surface-page md:border-b-0">
      <div className="flex w-full flex-col gap-[var(--space-12)] px-[var(--space-12)] py-[var(--space-12)] md:flex-row md:items-center md:px-[var(--space-24)]">
        <div className="hidden text-body-l-semibold text-content-strong md:block">
          <SoftLogo />
        </div>
        <div className="hidden flex-1 items-center justify-end gap-[var(--space-8)] md:flex">
          <IconButton
            type="button"
            aria-label={
              state.mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            size="m"
            variant="ghost"
            onClick={() =>
              updateState({ mode: state.mode === "dark" ? "light" : "dark" })
            }
          >
            <span className="relative size-4">
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  y: state.mode === "dark" ? 0 : 6,
                  scale: state.mode === "dark" ? 1 : 0.5,
                  opacity: state.mode === "dark" ? 1 : 0,
                  filter: state.mode === "dark" ? "blur(0px)" : "blur(8px)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <SunFillIcon className="size-full" />
              </motion.span>
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  y: state.mode === "dark" ? -6 : 0,
                  scale: state.mode === "dark" ? 0.5 : 1,
                  opacity: state.mode === "dark" ? 0 : 1,
                  filter: state.mode === "dark" ? "blur(8px)" : "blur(0px)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <MoonFillIcon className="size-full" />
              </motion.span>
            </span>
          </IconButton>
          <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
            <Dialog.Trigger id="theme-settings-desktop-trigger" render={
              <IconButton
                type="button"
                aria-label="Theme settings"
                size="m"
                variant="ghost"
              >
                <SettingsIcon className="size-4" />
              </IconButton>
            } />
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup position="right" className="max-w-[320px]">
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Customize library</Dialog.Title>
                    <Dialog.Close />
                  </Dialog.Header>
                  <Dialog.Body>
                    <div className="flex flex-col gap-[var(--space-24)]">
                      <div className="flex flex-col gap-[var(--space-12)]">
                        <div className="text-body-s-medium text-content-strong">
                          Theme color
                        </div>
                        <div
                          className="flex flex-wrap items-center gap-[var(--space-8)]"
                          role="radiogroup"
                          aria-label="Theme color"
                        >
                          {themeOptions.map((value, index) => (
                            <SwatchButton
                              key={value}
                              label={value}
                              selected={currentTheme === value}
                              color={themeSwatchColor(value)}
                              onSelect={() => handleThemeChange(value)}
                              onKeyDown={handleSwatchKeyDown(index)}
                              buttonRef={(node) => {
                                swatchRefs.current[index] = node
                              }}
                              tabIndex={currentTheme === value ? 0 : -1}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-[var(--space-12)]">
                        <div className="text-body-s-medium text-content-strong">
                          Neutral color
                        </div>
                        <div
                          className="flex flex-wrap items-center gap-[var(--space-8)]"
                          role="radiogroup"
                          aria-label="Neutral color"
                        >
                          {baseColors.map((value) => (
                            <SwatchButton
                              key={value}
                              label={value}
                              selected={state.baseColor === value}
                              color={baseSwatchColor(value)}
                              onSelect={() => updateState({ baseColor: value })}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Dialog.Body>
                </Dialog.Content>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <div className="flex w-full items-center gap-[var(--space-8)] md:hidden">
          {onMenuOpen ? (
            <IconButton
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              aria-controls="docs-mobile-menu"
              size="m"
              variant="ghost"
              onClick={onMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <div className="text-body-l-semibold text-content-strong">
            <SoftLogo />
          </div>
          <div className="ml-auto flex items-center gap-[var(--space-8)]">
            <IconButton
              type="button"
              aria-label={
                state.mode === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              size="m"
              variant="ghost"
              onClick={() =>
                updateState({ mode: state.mode === "dark" ? "light" : "dark" })
              }
            >
              <span className="relative size-4">
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    y: state.mode === "dark" ? 0 : 6,
                    scale: state.mode === "dark" ? 1 : 0.5,
                    opacity: state.mode === "dark" ? 1 : 0,
                    filter: state.mode === "dark" ? "blur(0px)" : "blur(8px)",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <SunFillIcon className="size-full" />
                </motion.span>
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    y: state.mode === "dark" ? -6 : 0,
                    scale: state.mode === "dark" ? 0.5 : 1,
                    opacity: state.mode === "dark" ? 0 : 1,
                    filter: state.mode === "dark" ? "blur(8px)" : "blur(0px)",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <MoonFillIcon className="size-full" />
                </motion.span>
              </span>
            </IconButton>
            <Dialog.Root open={mobileExpanded} onOpenChange={setMobileExpanded}>
              <Dialog.Trigger id="theme-settings-mobile-trigger" render={
                <IconButton
                  type="button"
                  aria-label="Theme settings"
                  size="m"
                  variant="ghost"
                >
                  <SettingsIcon className="size-4" />
                </IconButton>
              } />
              <Dialog.Portal>
                <Dialog.Backdrop />
                <Dialog.Popup position="sheet">
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Customize library</Dialog.Title>
                      <Dialog.Close />
                    </Dialog.Header>
                    <Dialog.Body>
                      <div className="flex flex-col gap-[var(--space-24)]">
                        <div className="flex flex-col gap-[var(--space-12)]">
                          <div className="text-body-s-medium text-content-strong">
                            Theme color
                          </div>
                          <div
                            className="flex flex-wrap items-center gap-[var(--space-8)]"
                            role="radiogroup"
                            aria-label="Theme color"
                          >
                            {themeOptions.map((value, index) => (
                              <SwatchButton
                                key={value}
                                label={value}
                                selected={currentTheme === value}
                                color={themeSwatchColor(value)}
                                onSelect={() => handleThemeChange(value)}
                                onKeyDown={handleSwatchKeyDown(index)}
                                buttonRef={(node) => {
                                  swatchRefs.current[index] = node
                                }}
                                tabIndex={currentTheme === value ? 0 : -1}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-[var(--space-12)]">
                          <div className="text-body-s-medium text-content-strong">
                            Neutral color
                          </div>
                          <div
                            className="flex flex-wrap items-center gap-[var(--space-8)]"
                            role="radiogroup"
                            aria-label="Neutral color"
                          >
                            {baseColors.map((value) => (
                              <SwatchButton
                                key={value}
                                label={value}
                                selected={state.baseColor === value}
                                color={baseSwatchColor(value)}
                                onSelect={() => updateState({ baseColor: value })}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </Dialog.Body>
                  </Dialog.Content>
                </Dialog.Popup>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </div>
  )
}
