"use client"

import * as React from "react"
import { Checkbox } from "@base-ui/react/checkbox"
import { RiCheckFill, RiSubtractFill } from "@remixicon/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

let lastInteractionWasPointer = false
let hasGlobalFocusListeners = false

const ensureGlobalFocusListeners = () => {
  if (hasGlobalFocusListeners || typeof window === "undefined") return
  hasGlobalFocusListeners = true

  window.addEventListener("pointerdown", () => {
    lastInteractionWasPointer = true
  }, true)

  window.addEventListener("keydown", (event) => {
    if (event.metaKey || event.altKey || event.ctrlKey) return
    lastInteractionWasPointer = false
  }, true)
}

const checkboxControlVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center rounded-[var(--radius-6)] outline-none transition-[background-color,border-color,box-shadow] duration-200 ease-out disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        default: "size-[var(--space-16)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type CheckboxControlProps = Omit<Checkbox.Root.Props, "className"> &
  VariantProps<typeof checkboxControlVariants> & {
    indeterminate?: boolean
    className?: string
  }

function CheckboxControl({
  className,
  onPointerDown,
  onFocus,
  onBlur,
  ...props
}: CheckboxControlProps) {
  const [showFocusRing, setShowFocusRing] = React.useState(false)

  React.useEffect(() => {
    ensureGlobalFocusListeners()
  }, [])

  const handleFocus = (event: React.FocusEvent<HTMLSpanElement>) => {
    setShowFocusRing(!lastInteractionWasPointer)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFocus?.(event as any)
  }

  const handleBlur = (event: React.FocusEvent<HTMLSpanElement>) => {
    setShowFocusRing(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onBlur?.(event as any)
  }

  return (
    <Checkbox.Root
      data-slot="checkbox-control"
      className={cn(
        checkboxControlVariants(),
        "group",
        "bg-actions-tertiary-default shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1),0_0_0_1px_var(--color-utility-shadow-l1)]",
        "hover:bg-actions-tertiary-hover",
        "data-[checked]:bg-actions-primary-default data-[checked]:shadow-none data-[checked]:hover:bg-actions-primary-hover",
        "data-[indeterminate]:bg-actions-primary-default data-[indeterminate]:shadow-none data-[indeterminate]:hover:bg-actions-primary-hover",
        "data-[disabled]:bg-actions-tertiary-disabled data-[disabled]:border data-[disabled]:border-border-muted data-[disabled]:shadow-none data-[disabled]:hover:bg-actions-tertiary-disabled",
        "data-[disabled]:data-[checked]:bg-actions-primary-disabled",
        "data-[disabled]:data-[indeterminate]:bg-actions-primary-disabled",
        showFocusRing && [
          "bg-actions-tertiary-hover shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
          "data-[checked]:bg-actions-primary-hover data-[indeterminate]:bg-actions-primary-hover",
        ].join(" "),
        className
      )}
      onPointerDown={onPointerDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      <Checkbox.Indicator
        className={cn(
          "flex items-center justify-center text-content-on-accent-strong",
          "group-data-[disabled]:text-content-on-accent-disabled"
        )}
      >
        <RiCheckFill className="size-[var(--space-12)] group-data-[indeterminate]:hidden" />
        <RiSubtractFill className="hidden size-[var(--space-12)] group-data-[indeterminate]:block" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}

export { CheckboxControl, checkboxControlVariants }
export type { CheckboxControlProps }
