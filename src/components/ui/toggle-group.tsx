"use client"

import * as React from "react"
import { Toggle } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ============================================================================
// Types
// ==========================================================================

type ToggleGroupSize = "xs" | "s" | "m" | "l"
type ToggleGroupVariant = "tertiary" | "ghost" | "secondary"

type ToggleGroupContextValue = {
  size: ToggleGroupSize
  variant: ToggleGroupVariant
  hideSeparator: boolean
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null)

function useToggleGroup() {
  const context = React.useContext(ToggleGroupContext)
  if (!context) {
    throw new Error("ToggleGroupItem must be used within a ToggleGroup")
  }
  return context
}

// ============================================================================
// Variants
// ==========================================================================

const toggleGroupVariants = cva("inline-flex items-center gap-[var(--space-4)]", {
  variants: {
    size: {
      xs: "",
      s: "",
      m: "",
      l: "",
    },
  },
  defaultVariants: {
    size: "m",
  },
})

const itemVariants = cva(
  "group relative inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-max)] font-[var(--font-weight-medium)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] transition-[background-color,color,box-shadow,transform] outline-none select-none active:enabled:scale-[0.98] disabled:cursor-not-allowed focus-visible:z-10 focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
  {
    variants: {
      variant: {
        tertiary:
          "bg-actions-tertiary-default text-content-strong backdrop-blur-[12px] shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)] hover:enabled:bg-actions-tertiary-hover data-[pressed]:bg-actions-tertiary-hover disabled:bg-actions-tertiary-disabled disabled:text-content-disabled disabled:shadow-none overflow-hidden",
        ghost:
          "bg-transparent text-content-subtle hover:enabled:bg-actions-secondary-hover hover:enabled:text-content-strong disabled:text-content-disabled data-[pressed]:bg-actions-secondary-default data-[pressed]:text-content-strong data-[pressed]:hover:enabled:bg-actions-secondary-hover",
        secondary:
          "bg-actions-secondary-default text-content-strong hover:enabled:bg-actions-secondary-hover data-[pressed]:bg-actions-secondary-hover disabled:bg-actions-secondary-disabled disabled:text-content-disabled",
      },
      size: {
        xs: "h-[var(--space-28)] gap-[var(--space-2)]",
        s: "h-[var(--space-32)] gap-[var(--space-4)]",
        m: "h-[var(--space-36)] gap-[var(--space-4)]",
        l: "h-[var(--space-40)] gap-[var(--space-4)]",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Icon only - square sizing
      { size: "xs", iconOnly: true, className: "size-[var(--space-28)]" },
      { size: "s", iconOnly: true, className: "size-[var(--space-32)]" },
      { size: "m", iconOnly: true, className: "size-[var(--space-36)]" },
      { size: "l", iconOnly: true, className: "size-[var(--space-40)]" },
      // With label - padding
      { size: "xs", iconOnly: false, className: "px-[var(--space-10)]" },
      { size: "s", iconOnly: false, className: "px-[var(--space-12)]" },
      { size: "m", iconOnly: false, className: "px-[var(--space-16)]" },
      { size: "l", iconOnly: false, className: "px-[var(--space-16)]" },
    ],
    defaultVariants: {
      variant: "ghost",
      size: "m",
      iconOnly: false,
    },
  }
)

const labelVariants = cva("flex shrink-0 items-center justify-center", {
  variants: {
    size: {
      xs: "px-[var(--space-4)] py-[var(--space-4)]",
      s: "px-[var(--space-4)] py-[var(--space-4)]",
      m: "px-[var(--space-4)] py-[var(--space-4)]",
      l: "px-[var(--space-6)] py-[var(--space-6)]",
    },
  },
  defaultVariants: {
    size: "m",
  },
})

const iconVariants = cva("flex shrink-0 items-center justify-center text-current [&_svg]:size-full", {
  variants: {
    size: {
      xs: "size-[16px]",
      s: "size-[16px]",
      m: "size-[16px]",
      l: "size-[18px]",
    },
  },
  defaultVariants: {
    size: "m",
  },
})

// ============================================================================
// ToggleGroup Component
// ==========================================================================

type ToggleGroupProps = Omit<ToggleGroupPrimitive.Props, "className"> &
  VariantProps<typeof toggleGroupVariants> & {
    /** Visual variant for all items */
    variant?: ToggleGroupVariant
    /** Hide separators between items */
    hideSeparator?: boolean
    className?: string
  }

function ToggleGroup({
  className,
  size = "m",
  variant = "ghost",
  hideSeparator = false,
  children,
  ...props
}: ToggleGroupProps) {
  const childArray = React.Children.toArray(children)
  const count = childArray.length

  return (
    <ToggleGroupContext.Provider value={{ size: size ?? "m", variant, hideSeparator }}>
      <ToggleGroupPrimitive
        data-slot="toggle-group"
        data-size={size}
        data-variant={variant}
        className={cn(toggleGroupVariants({ size, className }))}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child

          const isLast = index === count - 1

          return (
            <React.Fragment key={child.key ?? index}>
              {child}
              {!isLast && !hideSeparator && (
                <div
                  aria-hidden="true"
                  className="h-[16px] w-px bg-[var(--color-border-interactive-default)]"
                />
              )}
            </React.Fragment>
          )
        })}
      </ToggleGroupPrimitive>
    </ToggleGroupContext.Provider>
  )
}

// ============================================================================
// ToggleGroupItem Component
// ==========================================================================

type ToggleGroupItemProps = Omit<Toggle.Props, "className"> & {
  /** Required: Unique value to identify this toggle in the group */
  value: string
  /** Optional leading icon */
  leadingIcon?: React.ReactNode
  /** Optional pressed icon */
  pressedIcon?: React.ReactNode
  /** Optional trailing icon */
  trailingIcon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

function ToggleGroupItem({
  className,
  value,
  leadingIcon,
  pressedIcon,
  trailingIcon,
  children,
  ...props
}: ToggleGroupItemProps) {
  const { size, variant } = useToggleGroup()
  const hasLabel = React.Children.count(children) > 0
  const iconOnly = !hasLabel
  const hasPressedIcon = Boolean(pressedIcon)

  return (
    <Toggle
      data-slot="toggle-group-item"
      data-variant={variant}
      data-size={size}
      value={value}
      className={cn(itemVariants({ variant, size, iconOnly, className }))}
      {...props}
    >
      {leadingIcon && (
        <span
          data-slot="icon"
          className={cn(
            iconVariants({ size }),
            "transition-colors duration-200",
            hasPressedIcon && "group-data-[pressed]:hidden"
          )}
        >
          {leadingIcon}
        </span>
      )}
      {pressedIcon && (
        <span
          data-slot="icon"
          className={cn(
            iconVariants({ size }),
            "hidden group-data-[pressed]:flex text-content-strong transition-colors duration-200"
          )}
        >
          {pressedIcon}
        </span>
      )}
      {hasLabel && (
        <span data-slot="label" className={cn(labelVariants({ size }))}>
          {children}
        </span>
      )}
      {trailingIcon && (
        <span data-slot="icon" className={cn(iconVariants({ size }), "transition-colors duration-200")}>
          {trailingIcon}
        </span>
      )}
    </Toggle>
  )
}

export { ToggleGroup, ToggleGroupItem }
export type { ToggleGroupProps, ToggleGroupItemProps, ToggleGroupSize, ToggleGroupVariant }
