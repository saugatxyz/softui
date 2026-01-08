"use client"

/**
 * Shared styles for list-based dropdown components (Menu, Select)
 *
 * Menu is the authoritative source for these styles. When updating visual patterns,
 * update this file and all components will inherit the changes.
 */

import * as React from "react"
import { cva } from "class-variance-authority"
import { RiSearchLine, RiCloseLine } from "@remixicon/react"

import { cn } from "@/lib/utils"

// ============================================================================
// Popup Styles
// ============================================================================

/**
 * Shared popup container styles for dropdown overlays
 * Used by: Menu.Popup, Select popup
 */
export const listPopupStyles = {
  base: [
    // Base styles
    "relative flex flex-col rounded-[var(--radius-12)] bg-surface-overlay outline-none",
    // Shadow (consistent across all dropdowns)
    "shadow-[0_4px_16px_0_var(--color-utility-shadow-l3),0_3px_12px_0_var(--color-utility-shadow-l2),0_1px_2px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]",
    // Animation: 100ms for instant feel
    "origin-[var(--transform-origin)] transition-[transform,scale,opacity] duration-100",
    "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
    "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
  ].join(" "),

  // Width constraints - use anchor width but enforce min/max
  width: "min-w-[max(var(--anchor-width),220px)] max-w-[400px]",
} as const

/**
 * Combined popup className for easy application
 */
export const listPopupClassName = `${listPopupStyles.base} ${listPopupStyles.width}`

// ============================================================================
// Item Styles
// ============================================================================

/**
 * Shared list item styles using CVA for variant support
 * Used by: MenuItem, Select items
 */
export const listItemVariants = cva(
  [
    // Base styles
    "group flex w-full cursor-pointer items-center gap-[var(--space-8)] rounded-[var(--radius-10)] outline-none select-none",
    // Size
    "min-h-[36px] px-[var(--space-10)] py-[var(--space-6)]",
    // States - highlight color serves as focus indicator (no ring needed)
    "data-[highlighted]:bg-surface-interactive-hover",
    "data-[disabled]:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        danger: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Shared item text/label styles
 */
export const listItemLabelVariants = cva(
  [
    "flex min-w-0 flex-1 flex-col gap-[var(--space-2)] pl-[var(--space-2)]",
    "text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
  ].join(" "),
  {
    variants: {
      weight: {
        medium: "font-[var(--font-weight-medium)]",
        regular: "font-[var(--font-weight-default)]",
      },
    },
    defaultVariants: {
      weight: "medium",
    },
  }
)

/**
 * Get text color class based on state and variant
 */
export function getListItemTextColor({
  disabled,
  variant = "default",
}: {
  disabled?: boolean
  variant?: "default" | "danger"
}): string {
  if (disabled) {
    return variant === "danger"
      ? "text-content-feedback-danger-disabled"
      : "text-content-disabled"
  }
  return variant === "danger"
    ? "text-content-feedback-danger-strong"
    : "text-content-strong"
}

/**
 * Supporting text color
 */
export function getListItemSupportingTextColor(disabled?: boolean): string {
  return disabled ? "text-content-muted" : "text-content-subtle"
}

// ============================================================================
// Scroll Container Defaults
// ============================================================================

/**
 * Default max height for scrollable list containers
 */
export const LIST_MAX_HEIGHT = 320

/**
 * Default search threshold for auto-showing search
 */
export const LIST_SEARCH_THRESHOLD = 7

// ============================================================================
// List Search Component
// ============================================================================

type ListSearchProps = {
  /** Current search value */
  value: string
  /** Change handler */
  onChange: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Auto focus when mounted */
  autoFocus?: boolean
  /** Ref to the input element */
  inputRef?: React.RefObject<HTMLInputElement | null>
  /** Custom className */
  className?: string
}

/**
 * Shared search input for dropdown components (Menu, Select)
 * Styled to match the Input component visual treatment
 * - No focus ring (auto-focused, caret is sufficient indication)
 * - Captures typing even when focus is elsewhere in the popup
 */
function ListSearch({
  value,
  onChange,
  placeholder = "Search...",
  autoFocus = true,
  inputRef,
  className,
}: ListSearchProps) {
  const internalRef = React.useRef<HTMLInputElement>(null)
  const ref = inputRef || internalRef
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Auto focus when mounted
  React.useEffect(() => {
    if (autoFocus && ref.current) {
      const timer = setTimeout(() => {
        ref.current?.focus()
      }, 10)
      return () => clearTimeout(timer)
    }
  }, [autoFocus, ref])

  // Clear highlights when search value changes (prevents auto-highlight on filter)
  React.useEffect(() => {
    if (!ref.current) return
    const popup = containerRef.current?.closest('[data-slot="menu-popup"], [data-slot="popup"]')
    if (popup && document.activeElement === ref.current) {
      // Small delay to let Base UI update first, then clear
      const timer = setTimeout(() => {
        popup.querySelectorAll('[data-highlighted]').forEach((el) => {
          el.removeAttribute('data-highlighted')
        })
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [value, ref])

  // Capture typing even when focus is elsewhere in the popup
  React.useEffect(() => {
    const input = ref.current
    if (!input) return

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // If input is already focused, let it handle normally
      if (document.activeElement === input) return

      // Only capture if our container is visible (popup is open)
      const container = containerRef.current
      if (!container || container.offsetParent === null) return

      // Check if the event target is within a popup that contains our search
      const popup = container.closest('[data-slot="menu-popup"], [data-slot="popup"]')
      if (!popup) return

      // Ignore if user is interacting with something outside our popup
      const targetElement = e.target as Element
      if (!popup.contains(targetElement) && targetElement !== document.body) return

      // Handle Escape: clear input first, then allow close
      if (e.key === "Escape") {
        if (value) {
          e.preventDefault()
          e.stopPropagation()
          onChange("")
          input.focus()
        }
        // If no value, let it propagate to close the menu
        return
      }

      // Handle ArrowUp on first item: return focus to search input
      if (e.key === "ArrowUp") {
        const items = popup.querySelectorAll<HTMLElement>(
          '[data-slot="menu-item"]:not([data-disabled]), [data-slot="item"]:not([data-disabled]), [role="option"]:not([aria-disabled="true"]), [role="menuitem"]:not([aria-disabled="true"])'
        )
        const firstItem = items[0]
        const highlightedItem = popup.querySelector<HTMLElement>('[data-highlighted]')

        // Check if first item is highlighted/focused
        if (firstItem && (
          document.activeElement === firstItem ||
          highlightedItem === firstItem ||
          targetElement === firstItem
        )) {
          e.preventDefault()
          e.stopPropagation()
          // Clear highlight from all items before focusing input
          popup.querySelectorAll('[data-highlighted]').forEach((el) => {
            el.removeAttribute('data-highlighted')
          })
          input.focus()
        }
        return
      }

      // Ignore modifier keys, arrows, etc.
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Enter" ||
        e.key === "Tab" ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      ) {
        return
      }

      // For printable characters, focus input and append
      if (e.key.length === 1) {
        e.preventDefault()
        input.focus()
        onChange(value + e.key)
      }

      // For backspace, focus and remove last char
      if (e.key === "Backspace" && value) {
        e.preventDefault()
        input.focus()
        onChange(value.slice(0, -1))
      }
    }

    // Use capture phase to intercept before Base UI handles the event
    document.addEventListener("keydown", handleGlobalKeyDown, true)
    return () => document.removeEventListener("keydown", handleGlobalKeyDown, true)
  }, [ref, value, onChange])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle Escape: first clear input, then allow close
    if (e.key === "Escape") {
      if (value) {
        // First Escape: clear input, don't close menu
        e.preventDefault()
        e.stopPropagation()
        onChange("")
      } else {
        // Second Escape (no input): blur and let parent close
        e.currentTarget.blur()
      }
      return
    }

    // ArrowDown: move focus to first menu item
    if (e.key === "ArrowDown") {
      e.preventDefault()
      e.stopPropagation()
      const popup = containerRef.current?.closest('[data-slot="menu-popup"], [data-slot="popup"]')
      const firstItem = popup?.querySelector<HTMLElement>(
        '[data-slot="menu-item"]:not([data-disabled]), [data-slot="item"]:not([data-disabled]), [role="option"]:not([aria-disabled="true"]), [role="menuitem"]:not([aria-disabled="true"])'
      )
      if (firstItem) {
        // Set highlighted attribute so Base UI's state is in sync
        firstItem.setAttribute('data-highlighted', '')
        firstItem.focus()
      }
      return
    }

    // Allow typing without triggering parent keyboard navigation
    e.stopPropagation()
  }

  return (
    <div
      ref={containerRef}
      data-slot="list-search"
      className={cn("p-[var(--space-4)]", className)}
    >
      {/* Field container - matches Input component styling (no focus ring) */}
      <div
        className={cn(
          "flex w-full items-center gap-[var(--space-2)] rounded-[var(--radius-10)]",
          "h-[var(--space-36)] px-[var(--space-12)]",
          "bg-actions-secondary-default transition-colors duration-200",
          "hover:bg-actions-secondary-hover"
        )}
      >
        <span className="flex size-[16px] shrink-0 items-center justify-center text-content-subtle [&_svg]:size-full">
          <RiSearchLine />
        </span>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent outline-none px-[var(--space-4)]",
            "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
            "text-content-strong placeholder:text-content-muted",
            "caret-actions-primary-default"
          )}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="flex size-[16px] shrink-0 items-center justify-center text-content-subtle hover:text-content-strong transition-colors duration-200 [&_svg]:size-full"
          >
            <RiCloseLine />
          </button>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// List Empty Component
// ============================================================================

type ListEmptyProps = {
  /** Message to display */
  message?: string
  /** Custom className */
  className?: string
}

/**
 * Shared empty state for dropdown components
 * Same size as a menu item for visual consistency
 */
function ListEmpty({
  message = "No results found",
  className,
}: ListEmptyProps) {
  return (
    <div
      data-slot="list-empty"
      className={cn(
        // Same sizing as menu item
        "flex w-full items-center justify-center rounded-[var(--radius-10)]",
        "min-h-[36px] px-[var(--space-10)] py-[var(--space-6)]",
        "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
        "text-content-muted",
        className
      )}
    >
      {message}
    </div>
  )
}

export { ListSearch, ListEmpty }
export type { ListSearchProps, ListEmptyProps }
