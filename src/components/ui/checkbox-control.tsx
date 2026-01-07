"use client"

import * as React from "react"
import { Checkbox } from "@base-ui/react/checkbox"
import { RiCheckFill, RiSubtractFill } from "@remixicon/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const checkboxControlVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center rounded-[var(--radius-6)] outline-none transition-[background-color,border-color,box-shadow] duration-200 ease-out disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        default: "size-[16px]",
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
  checked,
  defaultChecked,
  onCheckedChange,
  indeterminate = false,
  disabled = false,
  className,
  ...props
}: CheckboxControlProps) {
  // When indeterminate, force checked=true so Indicator renders
  // For controlled: pass through checked prop (or true if indeterminate)
  // For uncontrolled: let Base UI handle internal state
  const effectiveChecked = indeterminate ? true : checked

  // Determine visual state classes based on selection state
  const getStateClasses = (isSelected: boolean) => {
    if (disabled) {
      if (isSelected) {
        return "bg-actions-primary-disabled"
      }
      return "bg-actions-tertiary-disabled border border-border-muted"
    }

    if (isSelected) {
      return "bg-actions-primary-default hover:bg-actions-primary-hover focus-visible:bg-actions-primary-hover focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]"
    }

    return "bg-actions-tertiary-default shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1),0_0_0_1px_var(--color-utility-shadow-l1)] hover:bg-actions-tertiary-hover focus-visible:bg-actions-tertiary-hover focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]"
  }

  return (
    <Checkbox.Root
      data-slot="checkbox-control"
      checked={effectiveChecked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={({ checked: isChecked }) => {
        const isSelected = isChecked === true || indeterminate
        return cn(checkboxControlVariants(), getStateClasses(isSelected), className)
      }}
      {...props}
    >
      <Checkbox.Indicator
        className={cn(
          "flex items-center justify-center",
          disabled ? "text-content-on-accent-disabled" : "text-content-on-accent-strong"
        )}
      >
        {indeterminate ? (
          <RiSubtractFill className="size-[12px]" />
        ) : (
          <RiCheckFill className="size-[12px]" />
        )}
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}

export { CheckboxControl, checkboxControlVariants }
export type { CheckboxControlProps }
