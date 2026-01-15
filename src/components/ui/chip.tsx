"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { RiCloseLine } from "@remixicon/react"

import { cn } from "@/lib/utils"

type ChipSize = "s" | "m"

type ChipContextValue = {
  size: ChipSize
}

const ChipContext = React.createContext<ChipContextValue | null>(null)

function useChipContext() {
  return React.useContext(ChipContext)
}

const chipVariants = cva(
  "group relative inline-flex items-center justify-center overflow-hidden rounded-[var(--radius-max)] font-[var(--font-weight-medium)] outline-none transition-[background-color,border-color,box-shadow] duration-200 ease-out select-none",
  {
    variants: {
      size: {
        s: "h-[var(--space-24)] gap-[var(--space-4)] text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]",
        m: "h-[var(--space-32)] gap-[var(--space-6)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
      },
      selected: {
        true: "bg-actions-secondary-default",
        false: "border border-border-interactive-default bg-actions-tertiary-default",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      // Unselected states
      {
        selected: false,
        disabled: false,
        className: "hover:border-border-interactive-hover hover:bg-actions-tertiary-hover",
      },
      {
        selected: false,
        disabled: true,
        className: "border-transparent bg-actions-tertiary-disabled",
      },
      // Selected states
      {
        selected: true,
        disabled: false,
        className: "hover:bg-actions-secondary-hover",
      },
      {
        selected: true,
        disabled: true,
        className: "bg-actions-secondary-disabled",
      },
      // Size + prefix type padding
      // s size without prefix (none)
      {
        size: "s",
        selected: false,
        className: "px-[var(--space-10)]",
      },
      // m size without prefix (none)
      {
        size: "m",
        selected: false,
        className: "px-[var(--space-12)]",
      },
      // s size selected without prefix - left padding for label, right for X
      {
        size: "s",
        selected: true,
        className: "pl-[var(--space-10)] pr-[var(--space-2)]",
      },
      // m size selected without prefix
      {
        size: "m",
        selected: true,
        className: "pl-[var(--space-12)] pr-[var(--space-8)]",
      },
    ],
    defaultVariants: {
      size: "s",
      selected: false,
      disabled: false,
    },
  }
)

const chipWithIconVariants = cva("", {
  variants: {
    size: {
      s: "",
      m: "",
    },
    selected: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    // s size with icon prefix - not selected (6px left padding)
    {
      size: "s",
      selected: false,
      className: "pl-[var(--space-6)] pr-[var(--space-10)]",
    },
    // m size with icon prefix - not selected
    {
      size: "m",
      selected: false,
      className: "pl-[var(--space-10)] pr-[var(--space-12)]",
    },
    // s size with icon prefix - selected (6px left padding)
    {
      size: "s",
      selected: true,
      className: "pl-[var(--space-6)] pr-[var(--space-2)]",
    },
    // m size with icon prefix - selected
    {
      size: "m",
      selected: true,
      className: "pl-[var(--space-10)] pr-[var(--space-8)]",
    },
  ],
  defaultVariants: {
    size: "s",
    selected: false,
  },
})

const chipWithCustomPrefixVariants = cva("", {
  variants: {
    size: {
      s: "",
      m: "",
    },
    selected: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    // s size with custom prefix - not selected
    {
      size: "s",
      selected: false,
      className: "pl-[var(--space-2)] pr-[var(--space-10)]",
    },
    // m size with custom prefix - not selected
    {
      size: "m",
      selected: false,
      className: "pl-[var(--space-4)] pr-[var(--space-12)]",
    },
    // s size with custom prefix - selected
    {
      size: "s",
      selected: true,
      className: "px-[var(--space-2)]",
    },
    // m size with custom prefix - selected
    {
      size: "m",
      selected: true,
      className: "pl-[var(--space-4)] pr-[var(--space-8)]",
    },
  ],
  defaultVariants: {
    size: "s",
    selected: false,
  },
})

const iconVariants = cva(
  "flex shrink-0 items-center justify-center text-current [&_svg]:size-full",
  {
    variants: {
      size: {
        s: "size-[var(--space-16)]",
        m: "size-[var(--space-16)]",
      },
    },
    defaultVariants: {
      size: "s",
    },
  }
)

const labelVariants = cva("", {
  variants: {
    disabled: {
      true: "text-content-disabled",
      false: "text-content-strong",
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

const closeButtonVariants = cva(
  "flex shrink-0 items-center justify-center rounded-[var(--radius-max)] transition-[background-color] duration-200 ease-out [&_svg]:size-full",
  {
    variants: {
      size: {
        s: "size-[var(--space-20)] p-[var(--space-2)]",
        m: "size-[var(--space-20)] p-[var(--space-2)]",
      },
      disabled: {
        true: "text-content-disabled",
        false: "text-content-subtle hover:bg-actions-secondary-hover hover:text-content-strong",
      },
    },
    defaultVariants: {
      size: "s",
      disabled: false,
    },
  }
)

type ChipProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "prefix"> &
  VariantProps<typeof chipVariants> & {
    /** Leading icon displayed before the label */
    leadingIcon?: React.ReactNode
    /** Custom prefix content (e.g., ChipPrefix for avatar, token, logo) */
    prefix?: React.ReactNode
    selected?: boolean
    onRemove?: () => void
    /** Hide the remove button when selected */
    hideRemove?: boolean
  }

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    className,
    size: sizeProp,
    selected = false,
    disabled = false,
    leadingIcon,
    prefix,
    onRemove,
    hideRemove = false,
    children,
    onClick,
    ...props
  },
  ref
) {
  const context = useChipContext()
  const size = sizeProp ?? context?.size ?? "s"
  const hasIcon = Boolean(leadingIcon)
  const hasPrefix = Boolean(prefix)
  const hasCustomPrefix = hasPrefix && !hasIcon
  // When hideRemove is true, use unselected padding even when selected
  const effectiveSelected = selected && !hideRemove

  const getPaddingClass = () => {
    if (hasIcon) {
      return chipWithIconVariants({ size, selected: effectiveSelected })
    }
    if (hasCustomPrefix) {
      return chipWithCustomPrefixVariants({ size, selected: effectiveSelected })
    }
    return ""
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    onClick?.(e)
  }

  const handleRemoveClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    if (disabled) return
    onRemove?.()
  }

  // Delete/Backspace on the chip removes it (keyboard accessible alternative to clicking X)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      if (selected && onRemove) {
        e.preventDefault()
        onRemove()
      }
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      data-slot="chip"
      data-size={size}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        chipVariants({ size, selected, disabled }),
        getPaddingClass(),
        // Override padding when hideRemove is true (use unselected padding)
        selected && hideRemove && !hasIcon && !hasCustomPrefix && (size === "s" ? "px-[var(--space-10)]" : "px-[var(--space-12)]"),
        "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        className
      )}
      {...props}
    >
      {/* Leading icon */}
      {hasIcon && (
        <span
          data-slot="icon"
          className={cn(
            iconVariants({ size }),
            disabled ? "text-content-disabled" : "text-content-strong"
          )}
        >
          {leadingIcon}
        </span>
      )}

      {/* Custom prefix (avatar, token, logo, etc.) */}
      {hasCustomPrefix && prefix}

      {/* Label */}
      <span data-slot="label" className={labelVariants({ disabled })}>
        {children}
      </span>

      {/* Close button (only when selected and not hidden) - click for pointer, Delete/Backspace for keyboard */}
      {selected && !hideRemove && (
        <span
          aria-hidden="true"
          data-slot="remove-button"
          onClick={handleRemoveClick}
          className={closeButtonVariants({ size, disabled })}
        >
          <RiCloseLine />
        </span>
      )}
    </button>
  )
})

export { Chip, ChipContext, useChipContext, chipVariants }
export type { ChipProps, ChipSize, ChipContextValue }
