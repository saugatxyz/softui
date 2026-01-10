"use client"

import * as React from "react"
import { Accordion } from "@base-ui/react/accordion"
import type {
  AccordionItemProps as BaseAccordionItemProps,
  AccordionPanelProps as BaseAccordionPanelProps,
  AccordionRootProps as BaseAccordionRootProps,
  AccordionTriggerProps as BaseAccordionTriggerProps,
} from "@base-ui/react/accordion"
import { cva, type VariantProps } from "class-variance-authority"

import { ArrowDownIcon, QuestionIcon } from "@/icons"
import { cn } from "@/lib/utils"

type AccordionVariant = "list" | "card"

// Item-level context for variant and value
type AccordionItemContextValue = {
  variant: AccordionVariant
  withIcon: boolean
}

const AccordionItemContext = React.createContext<AccordionItemContextValue>({
  variant: "list",
  withIcon: true,
})

const itemVariants = cva(
  "grid items-start gap-x-[var(--space-12)] text-body-m transition-colors",
  {
    variants: {
      variant: {
        list:
          "border-b border-border-muted last:border-b-0 hover:border-border-interactive-hover",
        card:
          "rounded-[var(--radius-12)] bg-surface-interactive-default hover:bg-surface-interactive-hover",
      },
      withIcon: {
        true: "grid-cols-[20px_minmax(0,1fr)_20px]",
        false: "grid-cols-[minmax(0,1fr)_20px]",
      },
    },
    defaultVariants: {
      variant: "list",
      withIcon: true,
    },
  }
)

const triggerVariants = cva(
  "group grid w-full items-start gap-x-[var(--space-12)] text-left text-content-strong outline-none",
  {
    variants: {
      variant: {
        list:
          "px-[var(--space-8)] pt-[var(--space-16)] pb-[var(--space-16)] data-[panel-open]:pb-0",
        card:
          "rounded-[var(--radius-12)] px-[var(--space-16)] pt-[var(--space-16)] pb-[var(--space-16)] data-[panel-open]:pb-0",
      },
      withIcon: {
        true: "col-span-3 grid-cols-[20px_minmax(0,1fr)_20px]",
        false: "col-span-2 grid-cols-[minmax(0,1fr)_20px]",
      },
    },
    defaultVariants: {
      variant: "list",
      withIcon: true,
    },
  }
)

const panelVariants = cva(
  "text-body-m text-content-subtle font-[var(--font-weight-default)] overflow-hidden pt-[var(--space-6)] pb-[var(--space-16)]",
  {
    variants: {
      variant: {
        list: "px-[var(--space-8)]",
        card: "px-[var(--space-16)]",
      },
      withIcon: {
        true: "col-start-2 col-end-3",
        false: "col-start-1 col-end-2",
      },
    },
    defaultVariants: {
      variant: "list",
      withIcon: true,
    },
  }
)

type AccordionRootProps = BaseAccordionRootProps

function AccordionRoot(props: AccordionRootProps) {
  return <Accordion.Root {...props} />
}

type AccordionItemProps = BaseAccordionItemProps &
  Omit<VariantProps<typeof itemVariants>, "withIcon"> & {
    withIcon?: boolean
    value: string | number
  }

function AccordionItem({
  className,
  variant,
  withIcon = true,
  value,
  ...props
}: AccordionItemProps) {
  const resolvedVariant = variant ?? "list"
  const resolvedWithIcon = withIcon ?? true

  const itemContextValue = React.useMemo(
    () => ({ variant: resolvedVariant, withIcon: resolvedWithIcon }),
    [resolvedVariant, resolvedWithIcon]
  )

  return (
    <AccordionItemContext.Provider value={itemContextValue}>
      <Accordion.Item
        data-slot="accordion-item"
        data-variant={resolvedVariant}
        className={cn(itemVariants({ variant: resolvedVariant, withIcon: resolvedWithIcon, className }))}
        value={value}
        {...props}
      />
    </AccordionItemContext.Provider>
  )
}

type AccordionTriggerProps = BaseAccordionTriggerProps &
  VariantProps<typeof triggerVariants> & {
    icon?: React.ReactNode
  }

function AccordionTrigger({
  className,
  variant,
  icon,
  children,
  ...props
}: AccordionTriggerProps) {
  const itemContext = React.useContext(AccordionItemContext)
  const resolvedVariant = variant ?? itemContext.variant

  const iconNode = icon ?? <QuestionIcon />
  const iconElement = React.isValidElement(iconNode)
    ? React.cloneElement(iconNode as React.ReactElement<{ className?: string }>, {
        className: cn(
          (iconNode as React.ReactElement<{ className?: string }>).props?.className,
          "size-[16px]"
        ),
      })
    : iconNode

  return (
    <Accordion.Header className="contents">
      <Accordion.Trigger
        data-slot="accordion-trigger"
        className={cn(
          triggerVariants({ variant: resolvedVariant, withIcon: itemContext.withIcon }),
          className
        )}
        {...props}
      >
        {itemContext.withIcon ? (
          <span className="flex size-[20px] shrink-0 items-center justify-center text-content-strong">
            {iconElement}
          </span>
        ) : null}
        <span className="min-w-0 text-body-m-medium text-content-strong">
          {children}
        </span>
        <span className="flex size-[20px] shrink-0 items-center justify-center text-content-strong transition-transform duration-200 ease-out group-data-[panel-open]:rotate-180">
          <ArrowDownIcon className="size-[16px]" />
        </span>
      </Accordion.Trigger>
    </Accordion.Header>
  )
}

type AccordionContentProps = BaseAccordionPanelProps &
  VariantProps<typeof panelVariants>

function AccordionContent({
  className,
  variant,
  children,
  ...props
}: AccordionContentProps) {
  const itemContext = React.useContext(AccordionItemContext)
  const resolvedVariant = variant ?? itemContext.variant

  return (
    <Accordion.Panel
      data-slot="accordion-panel"
      className={cn(
        panelVariants({ variant: resolvedVariant, withIcon: itemContext.withIcon }),
        className
      )}
      {...props}
    >
      {children}
    </Accordion.Panel>
  )
}

export {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
}
