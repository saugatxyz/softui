"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleButtonVariants = cva(
  "group inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-max)] font-[var(--font-weight-medium)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] transition-[background-color,color,box-shadow,transform] outline-none select-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)] active:enabled:scale-[0.98] disabled:cursor-not-allowed",
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
      variant: "tertiary",
      size: "m",
      iconOnly: true,
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

const iconVariants = cva(
  "flex shrink-0 items-center justify-center text-current [&_svg]:size-full [&_svg]:shrink-0",
  {
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
  }
)

type ToggleButtonSize = "xs" | "s" | "m" | "l"
type ToggleButtonVariant = "tertiary" | "ghost" | "secondary"

type ToggleButtonProps = Omit<TogglePrimitive.Props, "className"> &
  VariantProps<typeof toggleButtonVariants> & {
    leadingIcon?: React.ReactNode
    pressedIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    className?: string
  }

function ToggleButton({
  className,
  variant = "tertiary",
  size = "m",
  leadingIcon,
  pressedIcon,
  trailingIcon,
  children,
  ...props
}: ToggleButtonProps) {
  const hasLabel = React.Children.count(children) > 0
  const iconOnly = !hasLabel
  const hideIconFromAT = hasLabel ? true : undefined
  const hasPressedIcon = Boolean(pressedIcon)

  return (
    <TogglePrimitive
      data-slot="toggle-button"
      data-variant={variant}
      data-size={size}
      className={cn(toggleButtonVariants({ variant, size, iconOnly, className }))}
      {...props}
    >
      {leadingIcon ? (
        <span
          aria-hidden={hideIconFromAT}
          data-slot="icon"
          className={cn(
            iconVariants({ size }),
            "transition-colors duration-200",
            hasPressedIcon && "group-data-[pressed]:hidden"
          )}
        >
          {leadingIcon}
        </span>
      ) : null}
      {pressedIcon ? (
        <span
          aria-hidden={hideIconFromAT}
          data-slot="icon"
          className={cn(
            iconVariants({ size }),
            "hidden group-data-[pressed]:flex text-content-strong transition-colors duration-200"
          )}
        >
          {pressedIcon}
        </span>
      ) : null}
      {hasLabel ? (
        <span data-slot="label" className={cn(labelVariants({ size }))}>
          {children}
        </span>
      ) : null}
      {trailingIcon ? (
        <span
          aria-hidden={hideIconFromAT}
          data-slot="icon"
          className={cn(iconVariants({ size }), "transition-colors duration-200")}
        >
          {trailingIcon}
        </span>
      ) : null}
    </TogglePrimitive>
  )
}

export { ToggleButton }
export type { ToggleButtonProps, ToggleButtonSize, ToggleButtonVariant }
