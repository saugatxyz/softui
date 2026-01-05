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
import { AnimatePresence, motion } from "motion/react"

import { ArrowDownIcon, QuestionIcon } from "@/icons"
import { cn } from "@/lib/utils"

type AccordionVariant = "list" | "card"

// Root-level context to track open items
type AccordionRootContextValue = {
  openValues: (string | number)[]
}

const AccordionRootContext = React.createContext<AccordionRootContextValue>({
  openValues: [],
})

// Item-level context for variant and value
type AccordionItemContextValue = {
  variant: AccordionVariant
  withIcon: boolean
  value: string | number
}

const AccordionItemContext = React.createContext<AccordionItemContextValue>({
  variant: "list",
  withIcon: true,
  value: 0,
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
  "text-body-m text-content-subtle font-[var(--font-weight-default)] overflow-hidden",
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

type AccordionRootProps = BaseAccordionRootProps & {
  type?: "single" | "multiple"
}

function AccordionRoot({ type, multiple, children, defaultValue, ...props }: AccordionRootProps) {
  const resolvedMultiple = type ? type === "multiple" : multiple
  const [openValues, setOpenValues] = React.useState<(string | number)[]>(defaultValue ?? [])

  const handleValueChange = React.useCallback((value: (string | number)[]) => {
    setOpenValues(value)
  }, [])

  const contextValue = React.useMemo(
    () => ({ openValues }),
    [openValues]
  )

  return (
    <AccordionRootContext.Provider value={contextValue}>
      <Accordion.Root
        multiple={resolvedMultiple}
        value={openValues}
        onValueChange={handleValueChange}
        {...props}
      >
        {children}
      </Accordion.Root>
    </AccordionRootContext.Provider>
  )
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
    () => ({ variant: resolvedVariant, withIcon: resolvedWithIcon, value }),
    [resolvedVariant, resolvedWithIcon, value]
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
  const rootContext = React.useContext(AccordionRootContext)
  const resolvedVariant = variant ?? itemContext.variant
  const isOpen = rootContext.openValues.includes(itemContext.value)

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
        <motion.span
          className="flex size-[20px] shrink-0 items-center justify-center text-content-strong"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        >
          <ArrowDownIcon className="size-[16px]" />
        </motion.span>
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
  const rootContext = React.useContext(AccordionRootContext)
  const resolvedVariant = variant ?? itemContext.variant
  const isOpen = rootContext.openValues.includes(itemContext.value)

  return (
    <Accordion.Panel
      data-slot="accordion-panel"
      keepMounted
      className={cn(
        panelVariants({ variant: resolvedVariant, withIcon: itemContext.withIcon }),
        className
      )}
      {...props}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto", transition: { type: "spring", bounce: 0, duration: 0.3 } }}
            exit={{ height: 0, transition: { type: "spring", bounce: 0, duration: 0.3 } }}
            style={{ willChange: "height", transform: "translateZ(0)" }}
          >
            <motion.div
              className="pt-[var(--space-6)] pb-[var(--space-16)]"
              initial={{ opacity: 0, y: 2, filter: "blur(4px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { type: "spring", bounce: 0.1, duration: 0.3 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15 },
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Accordion.Panel>
  )
}

export {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
}
