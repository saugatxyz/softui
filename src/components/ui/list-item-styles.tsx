"use client"

/**
 * Shared styles for list-based dropdown components (Menu, Select)
 *
 * Menu is the authoritative source for these styles. When updating visual patterns,
 * update this file and all components will inherit the changes.
 */

import { cva } from "class-variance-authority"

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

  // Width constraints - match anchor width
  width: "min-w-[var(--anchor-width)]",
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
    "group flex w-full cursor-pointer items-center gap-[var(--space-8)] rounded-[var(--radius-8)] outline-none select-none",
    // Size
    "min-h-[36px] px-[var(--space-10)] py-[var(--space-6)]",
    // Typography
    "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]",
    // States - highlight color serves as focus indicator (no ring needed)
    "data-[highlighted]:bg-surface-interactive-hover",
    "data-[disabled]:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        danger: "data-[highlighted]:bg-surface-feedback-danger-muted",
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
