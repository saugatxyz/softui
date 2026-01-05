"use client"

import * as React from "react"
import { Radio } from "@base-ui/react/radio"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const radioControlVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center rounded-full outline-none transition-[background-color,border-color,box-shadow] duration-200 ease-out disabled:cursor-not-allowed",
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

type RadioControlProps = Omit<Radio.Root.Props, "className"> &
  VariantProps<typeof radioControlVariants> & {
    className?: string
  }

function RadioControl({
  value,
  disabled = false,
  className,
  ...props
}: RadioControlProps) {
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

    return "bg-actions-tertiary-default shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)] hover:bg-actions-tertiary-hover focus-visible:bg-actions-tertiary-hover focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]"
  }

  return (
    <Radio.Root
      data-slot="radio-control"
      value={value}
      disabled={disabled}
      className={({ checked }) =>
        cn(radioControlVariants(), getStateClasses(checked), className)
      }
      {...props}
    >
      <Radio.Indicator
        className={cn(
          "flex items-center justify-center",
          disabled ? "text-content-on-accent-disabled" : "text-content-on-accent-strong"
        )}
      >
        {/* 5x5px circle dot */}
        <span className="size-[5px] rounded-full bg-current" />
      </Radio.Indicator>
    </Radio.Root>
  )
}

export { RadioControl, radioControlVariants }
export type { RadioControlProps }
