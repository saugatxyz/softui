import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { RiArrowLeftSLine, RiArrowRightSLine } from "@soft-ui/icons"

import { cn } from "../lib/utils"

const pageIndicatorVariants = cva(
  "inline-flex items-center justify-center rounded-[var(--radius-max)] font-[var(--font-weight-medium)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] transition-[background-color,color,box-shadow,transform] outline-none select-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)] active:enabled:scale-[0.98] disabled:cursor-not-allowed",
  {
    variants: {
      isActive: {
        true: "bg-actions-secondary-default text-content-strong hover:enabled:bg-actions-secondary-hover disabled:bg-actions-secondary-disabled disabled:text-content-disabled",
        false:
          "bg-transparent text-content-subtle hover:enabled:bg-actions-secondary-hover hover:enabled:text-content-strong disabled:text-content-disabled",
      },
      size: {
        xs: "size-[var(--space-28)]",
        s: "size-[var(--space-32)]",
        m: "size-[var(--space-36)]",
        l: "size-[var(--space-40)]",
      },
    },
    defaultVariants: {
      isActive: false,
      size: "m",
    },
  }
)

type PageIndicatorProps = ButtonPrimitive.Props &
  VariantProps<typeof pageIndicatorVariants> & {
    isActive?: boolean
    /** Explicit escape hatch for intentional structural overrides. */
    unsafeClassName?: string
  }

const defaultSize = "m"

function PageIndicator({
  className,
  unsafeClassName,
  isActive = false,
  size,
  children,
  ...props
}: PageIndicatorProps) {
  const resolvedSize = size ?? defaultSize

  return (
    <ButtonPrimitive
      data-slot="page-indicator"
      data-active={isActive}
      data-size={resolvedSize}
      className={cn(
        className,
        pageIndicatorVariants({
          isActive,
          size: resolvedSize,
        }),
        unsafeClassName
      )}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

const navButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-max)] font-[var(--font-weight-medium)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] transition-[background-color,color,box-shadow,transform] outline-none select-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)] active:enabled:scale-[0.98] disabled:cursor-not-allowed bg-transparent text-content-subtle hover:enabled:bg-actions-secondary-hover hover:enabled:text-content-strong disabled:text-content-disabled",
  {
    variants: {
      size: {
        xs: "h-[var(--space-28)] gap-[var(--space-2)] px-[var(--space-10)]",
        s: "h-[var(--space-32)] gap-[var(--space-4)] px-[var(--space-12)]",
        m: "h-[var(--space-36)] gap-[var(--space-4)] px-[var(--space-16)]",
        l: "h-[var(--space-40)] gap-[var(--space-4)] px-[var(--space-16)]",
      },
    },
    defaultVariants: {
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
        xs: "size-[var(--space-16)]",
        s: "size-[var(--space-16)]",
        m: "size-[var(--space-16)]",
        l: "size-[var(--space-16)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

type PaginationNavButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof navButtonVariants> & {
    /** Explicit escape hatch for intentional structural overrides. */
    unsafeClassName?: string
  }

function PaginationPrevious({
  className,
  unsafeClassName,
  size,
  children,
  ...props
}: PaginationNavButtonProps) {
  const resolvedSize = size ?? defaultSize

  return (
    <ButtonPrimitive
      data-slot="pagination-previous"
      data-size={resolvedSize}
      className={cn(className, navButtonVariants({ size: resolvedSize }), unsafeClassName)}
      {...props}
    >
      <span
        aria-hidden
        data-slot="icon"
        className={cn(iconVariants({ size: resolvedSize }))}
      >
        <RiArrowLeftSLine />
      </span>
      <span data-slot="label" className={cn(labelVariants({ size: resolvedSize }))}>
        {children ?? "Previous"}
      </span>
    </ButtonPrimitive>
  )
}

function PaginationNext({
  className,
  unsafeClassName,
  size,
  children,
  ...props
}: PaginationNavButtonProps) {
  const resolvedSize = size ?? defaultSize

  return (
    <ButtonPrimitive
      data-slot="pagination-next"
      data-size={resolvedSize}
      className={cn(className, navButtonVariants({ size: resolvedSize }), unsafeClassName)}
      {...props}
    >
      <span data-slot="label" className={cn(labelVariants({ size: resolvedSize }))}>
        {children ?? "Next"}
      </span>
      <span
        aria-hidden
        data-slot="icon"
        className={cn(iconVariants({ size: resolvedSize }))}
      >
        <RiArrowRightSLine />
      </span>
    </ButtonPrimitive>
  )
}

const paginationContainerVariants = cva("inline-flex items-center", {
  variants: {
    size: {
      xs: "gap-[var(--space-8)]",
      s: "gap-[var(--space-8)]",
      m: "gap-[var(--space-8)]",
      l: "gap-[var(--space-8)]",
    },
  },
  defaultVariants: {
    size: "m",
  },
})

const pageIndicatorsContainerVariants = cva("inline-flex items-center gap-[var(--space-4)]")

type PaginationProps = React.ComponentProps<"nav"> &
  VariantProps<typeof paginationContainerVariants> & {
    /** Explicit escape hatch for intentional structural overrides. */
    unsafeClassName?: string
  }

function Pagination({ className, unsafeClassName, size, children, ...props }: PaginationProps) {
  const resolvedSize = size ?? defaultSize

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      data-size={resolvedSize}
      className={cn(className, paginationContainerVariants({ size: resolvedSize }), unsafeClassName)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass size to child components if they accept it
          if (
            child.type === PageIndicator ||
            child.type === PaginationPrevious ||
            child.type === PaginationNext ||
            child.type === PaginationContent
          ) {
            return React.cloneElement(child as React.ReactElement<{ size?: typeof resolvedSize }>, {
              size: (child.props as { size?: typeof resolvedSize }).size ?? resolvedSize,
            })
          }
        }
        return child
      })}
    </nav>
  )
}

type PaginationContentProps = React.ComponentProps<"div"> &
  VariantProps<typeof pageIndicatorsContainerVariants> & {
    size?: "xs" | "s" | "m" | "l"
    /** Explicit escape hatch for intentional structural overrides. */
    unsafeClassName?: string
  }

function PaginationContent({
  className,
  unsafeClassName,
  size,
  children,
  ...props
}: PaginationContentProps) {
  const resolvedSize = size ?? defaultSize

  return (
    <div
      data-slot="pagination-content"
      className={cn(className, pageIndicatorsContainerVariants(), unsafeClassName)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          (child.type === PageIndicator || child.type === PaginationEllipsis)
        ) {
          return React.cloneElement(child as React.ReactElement<{ size?: typeof resolvedSize }>, {
            size: (child.props as { size?: typeof resolvedSize }).size ?? resolvedSize,
          })
        }
        return child
      })}
    </div>
  )
}

function PaginationEllipsis({
  className,
  unsafeClassName,
  size,
  ...props
}: Omit<PageIndicatorProps, "children">) {
  const resolvedSize = size ?? defaultSize

  return (
    <PageIndicator
      className={className}
      unsafeClassName={unsafeClassName}
      size={resolvedSize}
      disabled
      aria-hidden
      {...props}
    >
      ..
    </PageIndicator>
  )
}

export {
  Pagination,
  PaginationContent,
  PageIndicator,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  pageIndicatorVariants,
}
