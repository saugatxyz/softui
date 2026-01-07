"use client"

import * as React from "react"
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { cva, type VariantProps } from "class-variance-authority"
import { RiAddLine, RiSubtractLine } from "@remixicon/react"

import { cn } from "@/lib/utils"

type NumberFieldSize = "s" | "m" | "l"

type NumberFieldContextValue = {
  size: NumberFieldSize
  disabled?: boolean
}

const NumberFieldContext = React.createContext<NumberFieldContextValue | null>(null)

function useNumberFieldContext() {
  const context = React.useContext(NumberFieldContext)
  if (!context) {
    throw new Error("NumberField components must be used within NumberField.Root")
  }
  return context
}

const groupVariants = cva(
  "inline-flex w-fit items-center rounded-[var(--radius-max)] bg-surface-interactive-default transition-colors duration-200",
  {
    variants: {
      size: {
        s: "h-[var(--space-32)]",
        m: "h-[var(--space-36)]",
        l: "h-[var(--space-40)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const inputVariants = cva(
  "bg-transparent text-center text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] outline-none placeholder:text-content-muted caret-actions-primary-default text-content-strong tabular-nums",
  {
    variants: {
      size: {
        s: "w-[var(--space-36)]",
        m: "w-[var(--space-40)]",
        l: "w-[var(--space-48)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const stepperContainerVariants = cva(
  "group inline-flex items-center justify-center shrink-0 bg-transparent outline-none select-none focus-visible:z-10 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        s: "size-[var(--space-32)]",
        m: "size-[var(--space-36)]",
        l: "size-[var(--space-40)]",
      },
      position: {
        decrement: "rounded-l-[var(--radius-max)]",
        increment: "rounded-r-[var(--radius-max)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const stepperButtonVariants = cva(
  "pointer-events-none inline-flex items-center justify-center rounded-full bg-actions-tertiary-default text-content-strong backdrop-blur-[12px] shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)] transition-[background-color,box-shadow,transform] duration-200 group-hover:bg-actions-tertiary-hover group-active:scale-[0.94]",
  {
    variants: {
      size: {
        s: "size-[var(--space-24)]",
        m: "size-[var(--space-28)]",
        l: "size-[var(--space-32)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const iconVariants = cva(
  "flex shrink-0 items-center justify-center [&_svg]:size-full",
  {
    variants: {
      size: {
        s: "size-[14px]",
        m: "size-[16px]",
        l: "size-[18px]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

type NumberFieldRootProps = NumberFieldPrimitive.Root.Props &
  VariantProps<typeof groupVariants> & {
    size?: NumberFieldSize
  }

function Root({
  className,
  size = "m",
  disabled,
  children,
  ...props
}: NumberFieldRootProps) {
  return (
    <NumberFieldContext.Provider value={{ size, disabled }}>
      <NumberFieldPrimitive.Root
        data-slot="number-field"
        data-size={size}
        disabled={disabled}
        className={cn("inline-flex flex-col gap-[var(--space-6)]", className)}
        {...props}
      >
        {children}
      </NumberFieldPrimitive.Root>
    </NumberFieldContext.Provider>
  )
}

type NumberFieldGroupProps = NumberFieldPrimitive.Group.Props

function Group({ className, ...props }: NumberFieldGroupProps) {
  const { size, disabled } = useNumberFieldContext()

  return (
    <NumberFieldPrimitive.Group
      data-slot="number-field-group"
      className={cn(
        groupVariants({ size }),
        !disabled && "hover:bg-surface-interactive-hover",
        "[&:has([data-focus-visible])]:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        disabled && "opacity-50",
        className
      )}
      {...props}
    />
  )
}

type NumberFieldInputProps = NumberFieldPrimitive.Input.Props

function Input({ className, ...props }: NumberFieldInputProps) {
  const { size, disabled } = useNumberFieldContext()

  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      className={cn(
        inputVariants({ size }),
        disabled && "text-content-disabled placeholder:text-content-disabled",
        className
      )}
      {...props}
    />
  )
}

type NumberFieldIncrementProps = NumberFieldPrimitive.Increment.Props

function Increment({ className, children, ...props }: NumberFieldIncrementProps) {
  const { size } = useNumberFieldContext()

  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      tabIndex={-1}
      className={cn(stepperContainerVariants({ size, position: "increment" }), className)}
      {...props}
    >
      <span className={cn(stepperButtonVariants({ size }), "group-disabled:bg-actions-tertiary-disabled group-disabled:text-content-disabled group-disabled:shadow-none")}>
        {children ?? (
          <span className={cn(iconVariants({ size }))}>
            <RiAddLine />
          </span>
        )}
      </span>
    </NumberFieldPrimitive.Increment>
  )
}

type NumberFieldDecrementProps = NumberFieldPrimitive.Decrement.Props

function Decrement({ className, children, ...props }: NumberFieldDecrementProps) {
  const { size } = useNumberFieldContext()

  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      tabIndex={-1}
      className={cn(stepperContainerVariants({ size, position: "decrement" }), className)}
      {...props}
    >
      <span className={cn(stepperButtonVariants({ size }), "group-disabled:bg-actions-tertiary-disabled group-disabled:text-content-disabled group-disabled:shadow-none")}>
        {children ?? (
          <span className={cn(iconVariants({ size }))}>
            <RiSubtractLine />
          </span>
        )}
      </span>
    </NumberFieldPrimitive.Decrement>
  )
}

type NumberFieldScrubAreaProps = NumberFieldPrimitive.ScrubArea.Props

function ScrubArea({ className, ...props }: NumberFieldScrubAreaProps) {
  return (
    <NumberFieldPrimitive.ScrubArea
      data-slot="number-field-scrub-area"
      className={cn("cursor-ew-resize select-none", className)}
      {...props}
    />
  )
}

type NumberFieldScrubAreaCursorProps = NumberFieldPrimitive.ScrubAreaCursor.Props

function ScrubAreaCursor({ className, ...props }: NumberFieldScrubAreaCursorProps) {
  return (
    <NumberFieldPrimitive.ScrubAreaCursor
      data-slot="number-field-scrub-area-cursor"
      className={cn(className)}
      {...props}
    />
  )
}

export const NumberField = {
  Root,
  Group,
  Input,
  Increment,
  Decrement,
  ScrubArea,
  ScrubAreaCursor,
}

export type {
  NumberFieldRootProps,
  NumberFieldGroupProps,
  NumberFieldInputProps,
  NumberFieldIncrementProps,
  NumberFieldDecrementProps,
  NumberFieldScrubAreaProps,
  NumberFieldScrubAreaCursorProps,
}
