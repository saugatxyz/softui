"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { motion } from "motion/react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

type TabsVariant = "stroke" | "pill" | "pill-emphasized"
type TabsSize = "s" | "m"

type TabsContextValue = {
  variant: TabsVariant
  size: TabsSize
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a TabsRoot")
  }
  return context
}

// -----------------------------------------------------------------------------
// TabsRoot
// -----------------------------------------------------------------------------

type TabsRootProps = TabsPrimitive.Root.Props & {
  variant?: TabsVariant
  size?: TabsSize
}

function TabsRoot({
  variant = "stroke",
  size = "m",
  className,
  ...props
}: TabsRootProps) {
  return (
    <TabsContext.Provider value={{ variant, size }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-variant={variant}
        data-size={size}
        className={cn("flex flex-col", className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

// -----------------------------------------------------------------------------
// TabsList
// -----------------------------------------------------------------------------

const listVariants = cva("relative inline-flex items-center", {
  variants: {
    variant: {
      stroke: "gap-[var(--space-16)] border-b border-border-subtle",
      pill: "gap-[var(--space-8)]",
      "pill-emphasized": "gap-[var(--space-8)]",
    },
  },
  defaultVariants: {
    variant: "stroke",
  },
})

type TabsListProps = TabsPrimitive.List.Props

function TabsList({ className, ...props }: TabsListProps) {
  const { variant } = useTabsContext()

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(listVariants({ variant }), className)}
      {...props}
    />
  )
}

// -----------------------------------------------------------------------------
// TabsTrigger
// -----------------------------------------------------------------------------

const triggerVariants = cva(
  "group relative inline-flex shrink-0 items-center justify-center gap-[var(--space-6)] font-[var(--font-weight-medium)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] outline-none select-none transition-colors data-[disabled]:cursor-not-allowed",
  {
    variants: {
      variant: {
        stroke:
          "text-content-subtle hover:not-data-[disabled]:text-content-strong data-[active]:text-content-strong data-[disabled]:text-content-disabled",
        pill: "z-10 rounded-[var(--radius-max)] text-content-subtle hover:not-data-[disabled]:bg-actions-secondary-hover hover:not-data-[disabled]:text-content-strong data-[active]:text-content-strong data-[active]:hover:not-data-[disabled]:bg-transparent data-[disabled]:text-content-disabled",
        "pill-emphasized":
          "z-10 rounded-[var(--radius-max)] text-content-strong hover:not-data-[disabled]:bg-actions-secondary-hover data-[active]:text-content-on-accent-strong data-[active]:hover:not-data-[disabled]:bg-transparent data-[disabled]:text-content-disabled data-[active]:data-[disabled]:text-content-on-accent-disabled",
      },
      size: {
        s: "",
        m: "",
      },
    },
    compoundVariants: [
      // Stroke sizes - 0px horizontal padding
      { variant: "stroke", size: "m", className: "pb-[var(--space-8)]" },
      { variant: "stroke", size: "s", className: "pb-[var(--space-6)]" },
      // Pill sizes - 16px horizontal padding for m, 12px for s
      { variant: "pill", size: "m", className: "h-[var(--space-36)] px-[var(--space-16)]" },
      { variant: "pill", size: "s", className: "h-[var(--space-32)] px-[var(--space-12)]" },
      // Pill-emphasized sizes - same padding as pill
      { variant: "pill-emphasized", size: "m", className: "h-[var(--space-36)] px-[var(--space-16)]" },
      { variant: "pill-emphasized", size: "s", className: "h-[var(--space-32)] px-[var(--space-12)]" },
    ],
    defaultVariants: {
      variant: "stroke",
      size: "m",
    },
  }
)

const labelContainerVariants = cva(
  "flex items-center justify-center gap-[var(--space-6)] rounded-[var(--radius-6)] transition-colors",
  {
    variants: {
      variant: {
        stroke: "px-[var(--space-6)] hover:bg-actions-secondary-hover",
        pill: "",
        "pill-emphasized": "",
      },
      size: {
        s: "py-[var(--space-2)]",
        m: "py-[var(--space-4)]",
      },
    },
    defaultVariants: {
      variant: "stroke",
      size: "m",
    },
  }
)

const iconVariants =
  "flex size-[var(--space-16)] shrink-0 items-center justify-center text-current [&_svg]:size-full"

type TabsTriggerProps = TabsPrimitive.Tab.Props & {
  leadingIcon?: React.ReactNode
}

function TabsTrigger({
  className,
  children,
  leadingIcon,
  ...props
}: TabsTriggerProps) {
  const { variant, size } = useTabsContext()
  const hasLabel = React.Children.count(children) > 0

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        triggerVariants({ variant, size }),
        variant !== "stroke" &&
          "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        "focus-visible:outline-none",
        className
      )}
      {...props}
    >
      <span
        data-slot="label-container"
        className={cn(
          labelContainerVariants({ variant, size }),
          variant === "stroke" &&
            "group-focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]"
        )}
      >
        {leadingIcon && (
          <span
            aria-hidden={hasLabel ? true : undefined}
            data-slot="icon"
            className={iconVariants}
          >
            {leadingIcon}
          </span>
        )}
        {hasLabel && <span data-slot="label">{children}</span>}
      </span>
    </TabsPrimitive.Tab>
  )
}

// -----------------------------------------------------------------------------
// TabsIndicator
// -----------------------------------------------------------------------------

const indicatorVariants = cva(
  "absolute",
  {
    variants: {
      variant: {
        stroke: "bottom-0 h-[var(--space-2)] bg-border-interactive-active",
        pill: "rounded-[var(--radius-max)] bg-actions-secondary-default",
        "pill-emphasized": "rounded-[var(--radius-max)] bg-actions-primary-default",
      },
      size: {
        s: "",
        m: "",
      },
    },
    compoundVariants: [
      { variant: "pill", size: "m", className: "h-[var(--space-36)]" },
      { variant: "pill", size: "s", className: "h-[var(--space-32)]" },
      { variant: "pill-emphasized", size: "m", className: "h-[var(--space-36)]" },
      { variant: "pill-emphasized", size: "s", className: "h-[var(--space-32)]" },
    ],
    defaultVariants: {
      variant: "stroke",
      size: "m",
    },
  }
)

type TabsIndicatorProps = TabsPrimitive.Indicator.Props

function TabsIndicator({ className, ...props }: TabsIndicatorProps) {
  const { variant, size } = useTabsContext()

  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      className={cn(indicatorVariants({ variant, size }), className)}
      style={{
        left: "var(--active-tab-left)",
        width: "var(--active-tab-width)",
        top: variant !== "stroke" ? "var(--active-tab-top)" : undefined,
      }}
      {...props}
      render={
        <motion.span
          layout
          transition={{ type: "spring", bounce: 0, duration: 0.2 }}
        />
      }
    />
  )
}

// -----------------------------------------------------------------------------
// TabsContent
// -----------------------------------------------------------------------------

type TabsContentProps = TabsPrimitive.Panel.Props

function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("mt-[var(--space-32)] outline-none", className)}
      {...props}
    />
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  Indicator: TabsIndicator,
})

export {
  Tabs,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsIndicator,
}
