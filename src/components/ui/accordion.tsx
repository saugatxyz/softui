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

import { ArrowDownIcon, ArrowUpIcon, QuestionIcon } from "@/icons"
import { cn } from "@/lib/utils"

type AccordionVariant = "list" | "card"
type AccordionContextValue = {
  variant: AccordionVariant
  withIcon: boolean
}

const AccordionVariantContext = React.createContext<AccordionContextValue>({
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
  "text-body-m text-content-subtle font-[var(--font-weight-default)] data-[open]:pt-[var(--space-6)] transition-none duration-0 animate-none",
  {
    variants: {
      variant: {
        list: "px-[var(--space-8)] data-[open]:pb-[var(--space-16)]",
        card: "px-[var(--space-16)] data-[open]:pb-[var(--space-16)]",
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

type AccordionRootProps = BaseAccordionRootProps & {
  type?: "single" | "multiple"
}

function AccordionRoot({ type, multiple, ...props }: AccordionRootProps) {
  const resolvedMultiple = type ? type === "multiple" : multiple
  return <Accordion.Root multiple={resolvedMultiple} {...props} />
}

type AccordionItemProps = BaseAccordionItemProps &
  Omit<VariantProps<typeof itemVariants>, "withIcon"> & {
    withIcon?: boolean
  }

function AccordionItem({
  className,
  variant,
  withIcon = true,
  ...props
}: AccordionItemProps) {
  const resolvedVariant = variant ?? "list"
  const resolvedWithIcon = withIcon ?? true
  return (
    <AccordionVariantContext.Provider
      value={{ variant: resolvedVariant, withIcon: resolvedWithIcon }}
    >
      <Accordion.Item
        data-slot="accordion-item"
        data-variant={resolvedVariant}
        className={cn(itemVariants({ variant: resolvedVariant, withIcon: resolvedWithIcon, className }))}
        {...props}
      />
    </AccordionVariantContext.Provider>
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
  const context = React.useContext(AccordionVariantContext)
  const resolvedVariant = variant ?? context.variant
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
          triggerVariants({ variant: resolvedVariant, withIcon: context.withIcon }),
          className
        )}
        {...props}
      >
        {context.withIcon ? (
          <span className="flex size-[20px] shrink-0 items-center justify-center text-content-strong">
            {iconElement}
          </span>
        ) : null}
        <span className="min-w-0 text-body-m-medium text-content-strong">
          {children}
        </span>
        <span className="relative flex size-[20px] shrink-0 items-center justify-center text-content-strong">
          <ArrowDownIcon className="absolute size-[16px] group-data-[panel-open]:opacity-0" />
          <ArrowUpIcon className="absolute size-[16px] opacity-0 group-data-[panel-open]:opacity-100" />
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
  style,
  ...props
}: AccordionContentProps) {
  const context = React.useContext(AccordionVariantContext)
  const resolvedVariant = variant ?? context.variant
  const resolvedStyle = {
    ...style,
    transitionProperty: "none",
    transitionDuration: "0s",
    animationName: "none",
    animationDuration: "0s",
  } as React.CSSProperties

  return (
    <Accordion.Panel
      data-slot="accordion-panel"
      className={cn(
        panelVariants({ variant: resolvedVariant, withIcon: context.withIcon }),
        className
      )}
      style={resolvedStyle}
      {...props}
    />
  )
}

export {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
}
