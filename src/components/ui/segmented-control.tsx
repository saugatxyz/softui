"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { motion } from "motion/react"
import { cva } from "class-variance-authority"

import { cn, usePrefersReducedMotion } from "@/lib/utils"

type SegmentedControlSize = "xs" | "s" | "m"
type SegmentedControlVariant = "default" | "filled" | "outline"

type SegmentedControlContextValue = {
  size: SegmentedControlSize
  variant: SegmentedControlVariant
}

const SegmentedControlContext =
  React.createContext<SegmentedControlContextValue | null>(null)

function useSegmentedControlContext() {
  const context = React.useContext(SegmentedControlContext)
  if (!context) {
    throw new Error(
      "SegmentedControl components must be used within a SegmentedControlRoot"
    )
  }
  return context
}

// -----------------------------------------------------------------------------
// SegmentedControlRoot
// -----------------------------------------------------------------------------

type SegmentedControlRootProps = TabsPrimitive.Root.Props & {
  size?: SegmentedControlSize
  variant?: SegmentedControlVariant
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
}

function SegmentedControlRoot({
  size = "m",
  variant = "default",
  className,
  unsafeClassName,
  ...props
}: SegmentedControlRootProps) {
  return (
    <SegmentedControlContext.Provider value={{ size, variant }}>
      <TabsPrimitive.Root
        data-slot="segmented-control"
        data-size={size}
        data-variant={variant}
        className={cn(className, "flex flex-col", unsafeClassName)}
        {...props}
      />
    </SegmentedControlContext.Provider>
  )
}

// -----------------------------------------------------------------------------
// SegmentedControlList
// -----------------------------------------------------------------------------

const listVariants = cva(
  "relative inline-flex self-start items-center gap-[var(--space-2)] rounded-[var(--radius-max)] p-[var(--space-2)]",
  {
    variants: {
      variant: {
        default: "bg-surface-interactive-default",
        filled:
          "bg-actions-tertiary-default backdrop-blur-[12px] shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]",
        outline: "border border-border-interactive-default bg-transparent",
      },
      size: {
        xs: "h-[var(--space-28)]",
        s: "h-[var(--space-32)]",
        m: "h-[var(--space-36)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "m",
    },
  }
)

type SegmentedControlListProps = TabsPrimitive.List.Props & {
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
}

function SegmentedControlList({
  className,
  unsafeClassName,
  ...props
}: SegmentedControlListProps) {
  const { size, variant } = useSegmentedControlContext()

  return (
    <TabsPrimitive.List
      data-slot="segmented-control-list"
      className={cn(className, listVariants({ size, variant }), unsafeClassName)}
      {...props}
    />
  )
}

// -----------------------------------------------------------------------------
// SegmentedControlItem
// -----------------------------------------------------------------------------

const itemVariants = cva(
  [
    "relative z-10 inline-flex shrink-0 items-center justify-center rounded-[var(--radius-max)] font-[var(--font-weight-medium)] outline-none select-none transition-colors",
    // Inactive state
    "text-content-subtle",
    // Hover state (inactive only)
    "hover:not-data-[disabled]:not-data-[active]:text-content-strong",
    // Active state (text only - background is on indicator)
    "data-[active]:text-content-strong",
    // Disabled state
    "data-[disabled]:cursor-not-allowed data-[disabled]:text-content-disabled",
    // Focus visible
    "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
  ],
  {
    variants: {
      size: {
        xs: "h-[var(--space-24)] px-[var(--space-10)] text-[length:var(--font-size-s)] leading-[var(--line-height-s)]",
        s: "h-[var(--space-28)] px-[var(--space-12)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
        m: "h-[var(--space-32)] px-[var(--space-12)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const iconVariants = cva(
  "flex shrink-0 items-center justify-center text-current [&_svg]:size-full",
  {
    variants: {
      size: {
        xs: "size-[var(--space-14)]",
        s: "size-[var(--space-16)]",
        m: "size-[var(--space-16)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

type SegmentedControlItemProps = TabsPrimitive.Tab.Props & {
  leadingIcon?: React.ReactNode
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
}

function SegmentedControlItem({
  className,
  unsafeClassName,
  children,
  leadingIcon,
  ...props
}: SegmentedControlItemProps) {
  const { size } = useSegmentedControlContext()
  const hasLabel = React.Children.count(children) > 0

  return (
    <TabsPrimitive.Tab
      data-slot="segmented-control-item"
      className={cn(className, itemVariants({ size }), "gap-[var(--space-6)]", unsafeClassName)}
      {...props}
    >
      {leadingIcon && (
        <span
          aria-hidden={hasLabel ? true : undefined}
          data-slot="icon"
          className={iconVariants({ size })}
        >
          {leadingIcon}
        </span>
      )}
      {children}
    </TabsPrimitive.Tab>
  )
}

// -----------------------------------------------------------------------------
// SegmentedControlIndicator
// -----------------------------------------------------------------------------

const indicatorVariants = cva(
  "absolute rounded-[var(--radius-max)]",
  {
    variants: {
      variant: {
        default:
          "bg-actions-tertiary-default shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]",
        filled: "bg-actions-secondary-default",
        outline: "bg-actions-secondary-default",
      },
      size: {
        xs: "h-[var(--space-24)]",
        s: "h-[var(--space-28)]",
        m: "h-[var(--space-32)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "m",
    },
  }
)

type SegmentedControlIndicatorProps = TabsPrimitive.Indicator.Props & {
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
}

function SegmentedControlIndicator({
  className,
  unsafeClassName,
  ...props
}: SegmentedControlIndicatorProps) {
  const { size, variant } = useSegmentedControlContext()
  const prefersReducedMotion = usePrefersReducedMotion()
  const instantTransition = { duration: 0 }
  const springTransition = { type: "spring" as const, bounce: 0, duration: 0.2 }

  return (
    <TabsPrimitive.Indicator
      data-slot="segmented-control-indicator"
      className={cn(className, indicatorVariants({ size, variant }), unsafeClassName)}
      style={{
        left: "var(--active-tab-left)",
        width: "var(--active-tab-width)",
        top: "var(--active-tab-top)",
      }}
      {...props}
      render={
        <motion.span
          layout={!prefersReducedMotion}
          transition={prefersReducedMotion ? instantTransition : springTransition}
        />
      }
    />
  )
}

// -----------------------------------------------------------------------------
// SegmentedControlContent
// -----------------------------------------------------------------------------

type SegmentedControlContentProps = TabsPrimitive.Panel.Props & {
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
}

function SegmentedControlContent({
  className,
  unsafeClassName,
  ...props
}: SegmentedControlContentProps) {
  return (
    <TabsPrimitive.Panel
      data-slot="segmented-control-content"
      className={cn(className, "mt-[var(--space-16)] outline-none", unsafeClassName)}
      {...props}
    />
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SegmentedControl = Object.assign(SegmentedControlRoot, {
  List: SegmentedControlList,
  Item: SegmentedControlItem,
  Indicator: SegmentedControlIndicator,
  Content: SegmentedControlContent,
})

export {
  SegmentedControl,
  SegmentedControlRoot,
  SegmentedControlList,
  SegmentedControlItem,
  SegmentedControlIndicator,
  SegmentedControlContent,
}
