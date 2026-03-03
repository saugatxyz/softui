"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"
import {
  CheckboxGroupContext,
  type CheckboxGroupItemType,
  type CheckboxGroupContextValue,
} from "./checkbox-group-item"

const checkboxGroupStacks = ["vertical", "horizontal"] as const
type CheckboxGroupStack = (typeof checkboxGroupStacks)[number]

const checkboxGroupVariants = cva("", {
  variants: {
    style: {
      simple: "",
      list: "",
      "card-small": "",
      "card-big": "",
    },
    stack: {
      vertical: "flex flex-col",
      horizontal: "",
    },
  },
  compoundVariants: [
    // Simple layouts
    {
      style: "simple",
      stack: "vertical",
      className: "flex flex-col",
    },
    {
      style: "simple",
      stack: "horizontal",
      className: "flex flex-row flex-wrap gap-[var(--space-24)]",
    },
    // List layouts
    {
      style: "list",
      stack: "vertical",
      className: "flex flex-col",
    },
    {
      style: "list",
      stack: "horizontal",
      className: "grid grid-cols-2 gap-x-[var(--space-16)] [&>*:nth-last-child(-n+2)]:border-b-0",
    },
    // Card-small layouts
    {
      style: "card-small",
      stack: "vertical",
      className: "flex flex-col gap-[var(--space-2)]",
    },
    {
      style: "card-small",
      stack: "horizontal",
      className: "flex flex-col gap-[var(--space-2)] md:grid md:grid-cols-2",
    },
    // Card-big layouts
    {
      style: "card-big",
      stack: "vertical",
      className: "flex flex-col gap-[var(--space-2)]",
    },
    {
      style: "card-big",
      stack: "horizontal",
      className: "flex flex-col gap-[var(--space-2)] md:grid md:grid-cols-2",
    },
  ],
  defaultVariants: {
    style: "simple",
    stack: "vertical",
  },
})

type CheckboxGroupProps = VariantProps<typeof checkboxGroupVariants> & {
  style?: CheckboxGroupItemType
  stack?: CheckboxGroupStack
  children: React.ReactNode
  className?: string
}

function CheckboxGroup({
  style = "simple",
  stack = "vertical",
  children,
  className,
}: CheckboxGroupProps) {
  const contextValue = React.useMemo<CheckboxGroupContextValue>(
    () => ({ type: style, stack }),
    [style, stack]
  )

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div
        data-slot="checkbox-group"
        data-style={style}
        data-stack={stack}
        role="group"
        className={cn(checkboxGroupVariants({ style, stack }), className)}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  )
}

export { CheckboxGroup, checkboxGroupVariants, checkboxGroupStacks }
export type { CheckboxGroupProps, CheckboxGroupStack }
