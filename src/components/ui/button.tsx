import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-max)] font-[var(--font-weight-medium)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] transition-[background-color,color,box-shadow,transform] outline-none select-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)] active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed",
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
        link: "bg-transparent text-content-link-default hover:text-content-link-hover disabled:text-content-disabled",
        "link-alt":
          "bg-transparent text-content-strong hover:text-content-strong disabled:text-content-disabled",
        danger:
          "bg-actions-danger-default text-[color:rgb(var(--content-inverse-strong))] hover:bg-actions-danger-hover hover:text-[color:rgb(var(--content-inverse-strong))] disabled:bg-actions-danger-disabled disabled:text-[color:rgb(var(--content-inverse-disabled))]",
      },
      size: {
        xs: "h-[var(--space-28)] gap-[var(--space-2)] px-[var(--space-10)]",
        s: "h-[var(--space-32)] gap-[var(--space-4)] px-[var(--space-12)]",
        m: "h-[var(--space-36)] gap-[var(--space-4)] px-[var(--space-16)]",
        l: "h-[var(--space-40)] gap-[var(--space-4)] px-[var(--space-16)]",
      },
    },
    compoundVariants: [
      {
        variant: "link",
        className: "px-0 hover:underline underline-offset-4",
      },
      {
        variant: "link-alt",
        className: "px-0 hover:underline underline-offset-2",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "m",
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
  "flex shrink-0 items-center justify-center text-current [&_svg]:size-full [&_svg]:shrink-0 [&_svg]:text-current",
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

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
  }

function Button({
  className,
  variant,
  size,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonProps) {
  const hasLabel = React.Children.count(children) > 0
  const hideIconFromAT = hasLabel ? true : undefined

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {leadingIcon ? (
        <span
          aria-hidden={hideIconFromAT}
          data-slot="icon"
          className={cn(iconVariants({ size }))}
        >
          {leadingIcon}
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
          className={cn(iconVariants({ size }))}
        >
          {trailingIcon}
        </span>
      ) : null}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
