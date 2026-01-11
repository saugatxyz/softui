"use client"

import * as React from "react"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  RadioGroupContext,
  type RadioGroupItemType,
  type RadioGroupContextValue,
} from "./radio-group-item"

const radioGroupStacks = ["vertical", "horizontal"] as const
type RadioGroupStack = (typeof radioGroupStacks)[number]

const radioGroupVariants = cva("", {
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
      className: "grid grid-cols-2 gap-[var(--space-2)]",
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
      className: "grid grid-cols-2 gap-[var(--space-2)]",
    },
  ],
  defaultVariants: {
    style: "simple",
    stack: "vertical",
  },
})

type RadioGroupProps = Omit<BaseRadioGroup.Props, "className"> &
  VariantProps<typeof radioGroupVariants> & {
    style?: RadioGroupItemType
    stack?: RadioGroupStack
    className?: string
  }

function RadioGroup({
  style = "simple",
  stack = "vertical",
  value,
  defaultValue,
  onValueChange,
  disabled,
  name,
  required,
  children,
  className,
  ...props
}: RadioGroupProps) {
  const contextValue = React.useMemo<RadioGroupContextValue>(
    () => ({ type: style, stack }),
    [style, stack]
  )

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <BaseRadioGroup
        data-slot="radio-group"
        data-style={style}
        data-stack={stack}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
        required={required}
        className={cn(radioGroupVariants({ style, stack }), className)}
        {...props}
      >
        {children}
      </BaseRadioGroup>
    </RadioGroupContext.Provider>
  )
}

export { RadioGroup, radioGroupVariants, radioGroupStacks }
export type { RadioGroupProps, RadioGroupStack }
