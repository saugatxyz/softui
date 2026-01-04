"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import {
  baseColors,
  designSystemConfig,
  modes,
  themeColors,
} from "@/design-system/config"
import {
  ExpandUpDownIcon,
  MenuIcon,
  MoonFillIcon,
  SettingsIcon,
  SunFillIcon,
} from "@/icons"
import { cn } from "@/lib/utils"
import { IconButton } from "@/components/ui/icon-button"
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

type SpringControls = {
  bounce: number
  duration: number
  delay?: number
}

const springFromControls = ({ bounce, duration, delay = 0 }: SpringControls) => {
  const clampedBounce = Math.min(Math.max(bounce, 0), 1)
  const clampedDuration = Math.max(duration, 0.15)
  const mass = 1
  const dampingRatio = 1 - clampedBounce * 0.9
  const angularFrequency = 4 / (dampingRatio * clampedDuration)
  const stiffness = mass * angularFrequency * angularFrequency
  const damping = 2 * dampingRatio * angularFrequency * mass

  return { type: "spring" as const, stiffness, damping, mass, delay }
}

export function ThemeSwitcher({ onMenuOpen, menuOpen }: ThemeSwitcherProps) {
  const [state, setState] = React.useState<ThemeState>(initialState)
  const [followsSystemPreference, setFollowsSystemPreference] = React.useState(false)
  const [mobileExpanded, setMobileExpanded] = React.useState(false)
  const [showThemeLeftFade, setShowThemeLeftFade] = React.useState(false)
  const [showThemeRightFade, setShowThemeRightFade] = React.useState(false)
  const [showBaseLeftFade, setShowBaseLeftFade] = React.useState(false)
  const [showBaseRightFade, setShowBaseRightFade] = React.useState(false)
  const [popoverDragOffset, setPopoverDragOffset] = React.useState(0)
  const [popoverDragging, setPopoverDragging] = React.useState(false)
  const popoverSpring = springFromControls({
    bounce: 0.1,
    duration: 0.1,
    delay: 0,
  })
  const popoverContentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.04 },
    },
  }
  const popoverItemVariants = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  }
  const themeOptions = ["mono", ...themeColors]
  const swatchRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const themeRowRef = React.useRef<HTMLDivElement | null>(null)
  const baseRowRef = React.useRef<HTMLDivElement | null>(null)
  const popoverDragStartY = React.useRef(0)
  const popoverDragOffsetRef = React.useRef(0)
  const popoverDragThreshold = 96

  React.useEffect(() => {
    const { state: stored, followsSystem } = loadStoredState()
    setState(stored)
    setFollowsSystemPreference(followsSystem)
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
    if (mobileExpanded) return
    setPopoverDragOffset(0)
    setPopoverDragging(false)
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
  }, [mobileExpanded])

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

  const handlePopoverDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!mobileExpanded) return
    popoverDragStartY.current = event.clientY
    popoverDragOffsetRef.current = 0
    setPopoverDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePopoverDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!popoverDragging) return
    const nextOffset = Math.max(0, event.clientY - popoverDragStartY.current)
    popoverDragOffsetRef.current = nextOffset
    setPopoverDragOffset(nextOffset)
  }

  const handlePopoverDragEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!popoverDragging) return
    event.currentTarget.releasePointerCapture(event.pointerId)
    const shouldClose = popoverDragOffsetRef.current > popoverDragThreshold
    setPopoverDragging(false)
    setPopoverDragOffset(0)
    if (shouldClose) {
      setMobileExpanded(false)
    }
  }

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
                size="s"
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
        <AnimatePresence>
          {mobileExpanded ? (
            <motion.div
              className="fixed inset-0 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                type="button"
                aria-label="Close theme settings"
                onClick={() => setMobileExpanded(false)}
                className="absolute inset-0 bg-[color:rgb(var(--darken-40))]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
              <motion.div
                className="absolute bottom-[var(--space-8)] left-[var(--space-8)] right-[var(--space-8)] max-h-[80vh] rounded-[16px] bg-surface-overlay"
                initial={{ y: "100%", opacity: 0, filter: "blur(20px)" }}
                animate={{ y: popoverDragOffset, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "100%", opacity: 0, filter: "blur(20px)" }}
                transition={popoverDragging ? { duration: 0 } : popoverSpring}
              >
                <motion.div
                  variants={popoverContentVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="flex flex-col gap-[var(--space-16)] p-[var(--space-12)]"
                >
                  <motion.div
                    variants={popoverItemVariants}
                    className="flex flex-col items-start justify-center gap-[var(--space-8)] pb-[var(--space-8)] touch-none"
                    onPointerDown={handlePopoverDragStart}
                    onPointerMove={handlePopoverDragMove}
                    onPointerUp={handlePopoverDragEnd}
                    onPointerCancel={handlePopoverDragEnd}
                  >
                    <span className="h-[4px] w-[40px] self-center rounded-full bg-border-muted" />
                    <span className="text-body-l-semibold text-content-strong">
                      Customize library
                    </span>
                  </motion.div>
                  <motion.div
                    variants={popoverItemVariants}
                    className="flex flex-col gap-[var(--space-4)]"
                  >
                    <div className="text-body-xs-medium text-content-strong">
                      Theme color
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
                  </motion.div>
                  <motion.div
                    variants={popoverItemVariants}
                    className="flex flex-col gap-[var(--space-4)]"
                  >
                    <div className="text-body-xs-medium text-content-strong">
                      Neutral color
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
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

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
          className="ml-auto hidden size-[36px] items-center justify-center rounded-full bg-transparent text-content-subtle transition-[background-color,color,box-shadow] duration-200 focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)] hover:bg-actions-secondary-hover hover:text-content-strong md:flex"
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
        </button>
      </div>
    </div>
  )
}
