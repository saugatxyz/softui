"use client"

import * as React from "react"

import {
  baseColors,
  designSystemConfig,
  modes,
  themeColors,
} from "@/design-system/config"
import { ExpandUpDownIcon, MoonIcon, SunIcon } from "@/icons"
import { cn } from "@/lib/utils"

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
}

function SwatchButton({ label, selected, color, onSelect }: SwatchButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "size-[28px] rounded-full border transition focus-visible:outline-none",
        selected
          ? "border-border-interactive-default ring-2 ring-utility-focus-inner ring-offset-2 ring-offset-surface-page"
          : "border-border-subtle hover:border-border-interactive-hover"
      )}
      style={{ backgroundColor: color }}
    />
  )
}

export function ThemeSwitcher() {
  const [state, setState] = React.useState<ThemeState>(initialState)
  const themeOptions = ["mono", ...themeColors]

  React.useEffect(() => {
    const stored = loadStoredState()
    setState(stored)
    applyToRoot(stored)
  }, [])

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
        ? "var(--color-actions-primary-default)"
        : "rgb(var(--pure-black))"
    }
    return `rgb(var(--${value}-600))`
  }

  const baseSwatchColor = (value: string) => `rgb(var(--${value}-500))`

  return (
    <div className="bg-surface-page">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-12)] px-[var(--space-24)] py-[var(--space-12)] md:flex-row md:items-center">
        <div className="hidden flex-1 flex-wrap items-center gap-[var(--space-8)] md:flex">
          <div className="flex flex-wrap items-center gap-[var(--space-6)]">
            {themeOptions.map((value) => (
              <SwatchButton
                key={value}
                label={value}
                selected={currentTheme === value}
                color={themeSwatchColor(value)}
                onSelect={() => handleThemeChange(value)}
              />
            ))}
          </div>
        </div>

        <div className="flex w-full items-center gap-[var(--space-8)] md:hidden">
          <div className="relative flex-1">
            <span
              className="pointer-events-none absolute left-[var(--space-8)] top-1/2 size-[20px] -translate-y-1/2 rounded-full border border-border-subtle"
              style={{ backgroundColor: themeSwatchColor(currentTheme) }}
            />
            <select
              aria-label="Theme color"
              value={currentTheme}
              onChange={(event) => handleThemeChange(event.target.value)}
              className="h-[36px] w-full appearance-none rounded-[var(--radius-10)] border border-border-subtle bg-surface-page pl-[calc(var(--space-8)+26px)] pr-[var(--space-12)] text-body-s text-content-strong transition hover:border-border-interactive-hover focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]"
            >
              {themeOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="relative flex-[0_0_30%]">
            <span
              className="pointer-events-none absolute left-[var(--space-8)] top-1/2 size-[20px] -translate-y-1/2 rounded-full border border-border-subtle"
              style={{ backgroundColor: baseSwatchColor(state.baseColor) }}
            />
            <select
              aria-label="Base color"
              value={state.baseColor}
              onChange={(event) => updateState({ baseColor: event.target.value })}
              className="h-[36px] w-full appearance-none rounded-[var(--radius-10)] border border-border-subtle bg-surface-page pl-[calc(var(--space-8)+26px)] pr-[var(--space-26)] text-body-s text-content-strong transition hover:border-border-interactive-hover focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]"
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
          <button
            type="button"
            aria-label={
              state.mode === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            onClick={() =>
              updateState({ mode: state.mode === "dark" ? "light" : "dark" })
            }
            className="flex size-[36px] items-center justify-center rounded-full bg-transparent text-content-subtle transition-[background-color,color,box-shadow] focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)] hover:bg-actions-secondary-hover hover:text-content-strong"
          >
            {state.mode === "dark" ? (
              <SunIcon className="size-4" />
            ) : (
              <MoonIcon className="size-4" />
            )}
          </button>
        </div>

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
