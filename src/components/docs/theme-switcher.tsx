"use client"

import * as React from "react"

import {
  baseColors,
  designSystemConfig,
  modes,
  themeColors,
} from "@/design-system/config"
import {
  ExpandUpDownIcon,
  MenuIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "@/icons"
import { cn } from "@/lib/utils"
import { IconButton } from "@/components/ui/icon-button"

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
  root.dataset.themeColor = state.themeColor
  root.dataset.baseColor = state.baseColor
}

const loadStoredState = (): ThemeState => {
  const stored = {
    mode: localStorage.getItem(storageKeys.mode) ?? initialState.mode,
    scheme: localStorage.getItem(storageKeys.scheme) ?? initialState.scheme,
    themeColor:
      localStorage.getItem(storageKeys.theme) ?? initialState.themeColor,
    baseColor: localStorage.getItem(storageKeys.base) ?? initialState.baseColor,
  }
  if (!modes.includes(stored.mode as (typeof modes)[number])) {
    stored.mode = initialState.mode
  }
  if (!["mono", "color"].includes(stored.scheme)) {
    stored.scheme = initialState.scheme
  }
  if (!themeColors.includes(stored.themeColor as (typeof themeColors)[number])) {
    stored.themeColor = initialState.themeColor
  }
  if (!baseColors.includes(stored.baseColor as (typeof baseColors)[number])) {
    stored.baseColor = initialState.baseColor
  }
  return stored
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
}

function SwatchButton({
  label,
  selected,
  color,
  onSelect,
  onKeyDown,
  buttonRef,
  tabIndex,
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
        "h-[28px] w-[28px] flex-none rounded-full border transition focus-visible:outline-none",
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
  const [mobileExpanded, setMobileExpanded] = React.useState(false)
  const [showThemeLeftFade, setShowThemeLeftFade] = React.useState(false)
  const [showThemeRightFade, setShowThemeRightFade] = React.useState(false)
  const [showBaseLeftFade, setShowBaseLeftFade] = React.useState(false)
  const [showBaseRightFade, setShowBaseRightFade] = React.useState(false)
  const themeOptions = ["mono", ...themeColors]
  const swatchRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const themeRowRef = React.useRef<HTMLDivElement | null>(null)
  const baseRowRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const stored = loadStoredState()
    setState(stored)
    applyToRoot(stored)
  }, [])

  React.useEffect(() => {
    if (!mobileExpanded) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileExpanded(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [mobileExpanded])

  React.useEffect(() => {
    if (!mobileExpanded) return
    const themeRow = themeRowRef.current
    const baseRow = baseRowRef.current
    if (!themeRow || !baseRow) return

    const updateRow = (
      element: HTMLDivElement,
      setLeft: React.Dispatch<React.SetStateAction<boolean>>,
      setRight: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      const hasOverflow = element.scrollWidth - element.clientWidth > 1
      const isAtLeft = element.scrollLeft <= 0
      const isAtRight =
        element.scrollLeft + element.clientWidth >= element.scrollWidth - 1
      setLeft(hasOverflow && !isAtLeft)
      setRight(hasOverflow && !isAtRight)
    }

    const updateTheme = () =>
      updateRow(themeRow, setShowThemeLeftFade, setShowThemeRightFade)
    const updateBase = () =>
      updateRow(baseRow, setShowBaseLeftFade, setShowBaseRightFade)

    updateTheme()
    updateBase()

    const observer = new ResizeObserver(() => {
      updateTheme()
      updateBase()
    })
    observer.observe(themeRow)
    observer.observe(baseRow)
    themeRow.addEventListener("scroll", updateTheme)
    baseRow.addEventListener("scroll", updateBase)
    return () => {
      observer.disconnect()
      themeRow.removeEventListener("scroll", updateTheme)
      baseRow.removeEventListener("scroll", updateBase)
    }
  }, [mobileExpanded, themeOptions.length, baseColors.length])

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
    <div className="border-b border-border-muted bg-surface-page">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-12)] px-[var(--space-12)] py-[var(--space-12)] md:flex-row md:items-center md:px-[var(--space-24)]">
        <div className="hidden flex-1 flex-wrap items-center gap-[var(--space-8)] md:flex">
          <div
            className="flex flex-wrap items-center gap-[var(--space-6)]"
            role="radiogroup"
            aria-label="Theme colors"
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
          <div className="text-body-l-semibold text-content-strong">SoftUI</div>
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
              {state.mode === "dark" ? (
                <SunIcon className="size-4" />
              ) : (
                <MoonIcon className="size-4" />
              )}
            </IconButton>
            <IconButton
              type="button"
              aria-label="Theme settings"
              aria-expanded={mobileExpanded}
              size="m"
              variant="ghost"
              onClick={() => setMobileExpanded((prev) => !prev)}
            >
              <SettingsIcon className="size-4" />
            </IconButton>
          </div>
        </div>
        {mobileExpanded ? (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              aria-label="Close theme settings"
              onClick={() => setMobileExpanded(false)}
              className="absolute inset-0 bg-[color:rgb(var(--darken-40))]"
            />
            <div className="absolute left-[var(--space-8)] right-[var(--space-8)] top-[calc(var(--space-12)+var(--space-12)+var(--space-36)-var(--space-4))] flex flex-col gap-[var(--space-12)] rounded-[var(--radius-12)] bg-surface-overlay p-[var(--space-12)]">
              <div className="text-body-l-semibold text-content-strong">
                Customize library
              </div>
              <div className="text-body-xs-medium text-content-strong">
                Theme colors
              </div>
              <div
                ref={themeRowRef}
                className={cn(
                  "swatch-row-scroll flex flex-nowrap items-center gap-[var(--space-6)] overflow-x-auto overflow-y-visible px-[var(--space-4)] py-[var(--space-4)]",
                  showThemeLeftFade && showThemeRightFade
                    ? "swatch-row-mask-both"
                    : showThemeLeftFade
                      ? "swatch-row-mask-left"
                      : showThemeRightFade
                        ? "swatch-row-mask-right"
                        : ""
                )}
                role="radiogroup"
                aria-label="Theme colors"
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
              <div className="text-body-xs-medium text-content-strong">
                Neutral colors
              </div>
              <div
                ref={baseRowRef}
                className={cn(
                  "swatch-row-scroll flex flex-nowrap items-center gap-[var(--space-6)] overflow-x-auto overflow-y-visible px-[var(--space-4)] py-[var(--space-4)]",
                  showBaseLeftFade && showBaseRightFade
                    ? "swatch-row-mask-both"
                    : showBaseLeftFade
                      ? "swatch-row-mask-left"
                      : showBaseRightFade
                        ? "swatch-row-mask-right"
                        : ""
                )}
                role="radiogroup"
                aria-label="Neutral colors"
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
        ) : null}

        <div className="hidden items-center md:flex">
          <div className="relative">
            <span
              className="pointer-events-none absolute left-[var(--space-8)] top-1/2 size-[20px] -translate-y-1/2 rounded-full border border-border-subtle"
              style={{ backgroundColor: baseSwatchColor(state.baseColor) }}
            />
            <select
              aria-label="Base color"
              value={state.baseColor}
              onChange={(event) => updateState({ baseColor: event.target.value })}
              className="h-[36px] w-[180px] appearance-none rounded-[var(--radius-10)] border border-border-subtle bg-surface-page pl-[calc(var(--space-8)+26px)] pr-[var(--space-26)] text-body-s text-content-strong transition hover:border-border-interactive-hover focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]"
            >
              {baseColors.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-[var(--space-8)] top-1/2 -translate-y-1/2 text-content-muted">
              <ExpandUpDownIcon className="size-4" />
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label={
            state.mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          onClick={() =>
            updateState({ mode: state.mode === "dark" ? "light" : "dark" })
          }
          className="ml-auto hidden size-[36px] items-center justify-center rounded-full bg-transparent text-content-subtle transition-[background-color,color,box-shadow] focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)] hover:bg-actions-secondary-hover hover:text-content-strong md:flex"
        >
          {state.mode === "dark" ? (
            <SunIcon className="size-4" />
          ) : (
            <MoonIcon className="size-4" />
          )}
        </button>
      </div>
    </div>
  )
}
