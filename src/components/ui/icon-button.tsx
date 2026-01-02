import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-[var(--radius-max)] font-[var(--font-weight-medium)] transition-[background-color,color,box-shadow,transform] outline-none select-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)] active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-actions-primary-default text-content-on-accent-strong hover:bg-actions-primary-hover disabled:bg-actions-primary-disabled disabled:text-content-on-accent-disabled",
        secondary:
          "bg-actions-secondary-default text-content-strong hover:bg-actions-secondary-hover disabled:bg-actions-secondary-disabled disabled:text-content-disabled",
        tertiary:
          "bg-actions-tertiary-default text-content-strong shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)] hover:bg-actions-tertiary-hover disabled:bg-actions-tertiary-disabled disabled:text-content-disabled disabled:shadow-none overflow-hidden",
        ghost:
          "bg-transparent text-content-subtle hover:bg-actions-secondary-hover hover:text-content-strong disabled:text-content-disabled",
        danger:
          "bg-actions-danger-default text-[color:rgb(var(--content-inverse-strong))] hover:bg-actions-danger-hover hover:text-[color:rgb(var(--content-inverse-strong))] disabled:bg-actions-danger-disabled disabled:text-[color:rgb(var(--content-inverse-disabled))]",
      },
      size: {
        xs: "size-[var(--space-28)]",
        s: "size-[var(--space-32)]",
        m: "size-[var(--space-36)]",
        l: "size-[var(--space-40)]",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "m",
    },
  }
)

const iconVariants = cva(
  "flex items-center justify-center text-current [&_svg]:size-full [&_svg]:shrink-0 [&_svg]:text-current",
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

type IconButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof iconButtonVariants>

const defaultVariant = "secondary"
const defaultSize = "m"

function IconButton({
  className,
  variant,
  size,
  children,
  ...props
}: IconButtonProps) {
  const resolvedVariant = variant ?? defaultVariant
  const resolvedSize = size ?? defaultSize

  return (
    <ButtonPrimitive
      data-slot="icon-button"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      className={cn(
        iconButtonVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          className,
        })
      )}
      {...props}
    >
      <span className={cn(iconVariants({ size: resolvedSize }))}>{children}</span>
    </ButtonPrimitive>
  )
}

export { IconButton, iconButtonVariants }
