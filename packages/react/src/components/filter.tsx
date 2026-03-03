"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { RiArrowDownSLine, RiCloseLine } from "@soft-ui/icons"

import { cn } from "../lib/utils"

const filterChipTriggerVariants = cva(
  [
    "inline-flex items-center rounded-[var(--radius-max)] font-[var(--font-weight-medium)] outline-none transition-[background-color,box-shadow] duration-200 ease-out select-none",
    "bg-actions-tertiary-default backdrop-blur-[12px] shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]",
    "hover:enabled:bg-actions-tertiary-hover",
    "disabled:cursor-not-allowed disabled:bg-actions-tertiary-disabled disabled:shadow-none",
    "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
  ],
  {
    variants: {
      size: {
        xs: "h-[var(--space-28)] gap-[var(--space-6)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
        s: "h-[var(--space-32)] gap-[var(--space-6)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
        m: "h-[var(--space-36)] gap-[var(--space-6)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const paddingVariants = cva("", {
  variants: {
    size: {
      xs: "",
      s: "",
      m: "",
    },
    hasValue: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { size: "xs", hasValue: false, className: "pl-[var(--space-12)] pr-[var(--space-10)]" },
    { size: "xs", hasValue: true, className: "pl-[var(--space-12)] pr-[var(--space-6)]" },
    { size: "s", hasValue: false, className: "pl-[var(--space-12)] pr-[var(--space-10)]" },
    { size: "s", hasValue: true, className: "pl-[var(--space-12)] pr-[var(--space-6)]" },
    { size: "m", hasValue: false, className: "pl-[var(--space-16)] pr-[var(--space-12)]" },
    { size: "m", hasValue: true, className: "pl-[var(--space-16)] pr-[var(--space-8)]" },
  ],
  defaultVariants: {
    size: "m",
    hasValue: false,
  },
})

const iconVariants = cva(
  "flex shrink-0 items-center justify-center [&_svg]:size-full",
  {
    variants: {
      size: {
        xs: "size-[var(--space-16)]",
        s: "size-[var(--space-16)]",
        m: "size-[var(--space-16)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const clearButtonVariants = cva(
  "flex shrink-0 items-center justify-center rounded-[var(--radius-max)] transition-[background-color,box-shadow] duration-200 ease-out size-[var(--space-20)] [&_svg]:size-[var(--space-16)] focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
  {
    variants: {
      size: {
        xs: "",
        s: "",
        m: "",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const dividerVariants = cva("w-px", {
    variants: {
      size: {
        xs: "mx-[var(--space-4)] h-[var(--space-10)]",
        s: "mx-[var(--space-4)] h-[var(--space-10)]",
        m: "mx-[var(--space-6)] h-[var(--space-12)]",
      },
    },
  defaultVariants: {
    size: "m",
  },
})

type FilterProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> &
  VariantProps<typeof filterChipTriggerVariants> & {
    icon?: React.ReactNode
    label: string
    value?: string
    onClear?: () => void
    /** Explicit escape hatch for intentional structural overrides. */
    unsafeClassName?: string
  }

const Filter = React.forwardRef<
  HTMLButtonElement,
  FilterProps
>(function Filter(
  { className, size = "m", icon, label, value, onClear, disabled, unsafeClassName, ...props },
  ref
) {
  const hasValue = Boolean(value)

  const handleClearClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!disabled) {
      onClear?.()
    }
  }

  const handleClearKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      onClear?.()
    }
  }

  // Delete/Backspace on the filter clears it (keyboard accessible alternative to clicking X)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      if (hasValue && onClear && !disabled) {
        e.preventDefault()
        onClear()
      }
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      data-slot="filter-chip-trigger"
      data-size={size}
      data-active={hasValue || undefined}
      data-disabled={disabled || undefined}
      disabled={disabled}
      onKeyDown={handleKeyDown}
      className={cn(
        className,
        filterChipTriggerVariants({ size }),
        paddingVariants({ size, hasValue }),
        unsafeClassName
      )}
      {...props}
    >
      {/* Leading icon */}
      {icon && (
        <span
          data-slot="icon"
          className={cn(
            iconVariants({ size }),
            disabled ? "text-content-disabled" : "text-content-strong"
          )}
        >
          {icon}
        </span>
      )}

      {/* Label */}
      <span
        data-slot="label"
        className={disabled ? "text-content-disabled" : "text-content-strong"}
      >
        {label}
      </span>

      {/* Value section (when active) */}
      {hasValue && (
        <>
          {/* Divider */}
          <span
            data-slot="divider"
            className={cn(
              dividerVariants({ size }),
              disabled ? "bg-border-disabled" : "bg-border-subtle"
            )}
          />

          {/* Value */}
          <span
            data-slot="value"
            className={cn(
              "font-[var(--font-weight-default)]",
              disabled ? "text-content-disabled" : "text-content-strong"
            )}
          >
            {value}
          </span>

          {/* Clear button - click or Enter/Space; Delete/Backspace also clears on the trigger */}
          {onClear && (
            <span
              data-slot="clear-button"
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={`Clear ${label}`}
              aria-disabled={disabled || undefined}
              onClick={handleClearClick}
              onKeyDown={handleClearKeyDown}
              className={cn(
                clearButtonVariants({ size }),
                disabled
                  ? "text-content-disabled"
                  : "text-content-subtle hover:bg-actions-secondary-hover hover:text-content-strong"
              )}
            >
              <RiCloseLine />
            </span>
          )}
        </>
      )}

      {/* Chevron (when inactive) */}
      {!hasValue && (
        <span
          data-slot="chevron"
          className={cn(
            iconVariants({ size }),
            disabled ? "text-content-disabled" : "text-content-strong"
          )}
        >
          <RiArrowDownSLine />
        </span>
      )}
    </button>
  )
})

export { Filter }
export type { FilterProps }
