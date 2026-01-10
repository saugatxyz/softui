"use client"

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

function CheckboxControl({ className, ...props }: CheckboxControlProps) {
  return (
    <Checkbox.Root
      data-slot="checkbox-control"
      className={cn(
        checkboxControlVariants(),
        "group",
        "bg-actions-tertiary-default shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1),0_0_0_1px_var(--color-utility-shadow-l1)]",
        "hover:bg-actions-tertiary-hover",
        "focus-visible:bg-actions-tertiary-hover focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        "data-[checked]:bg-actions-primary-default data-[checked]:hover:bg-actions-primary-hover data-[checked]:focus-visible:bg-actions-primary-hover",
        "data-[indeterminate]:bg-actions-primary-default data-[indeterminate]:hover:bg-actions-primary-hover data-[indeterminate]:focus-visible:bg-actions-primary-hover",
        "data-[disabled]:bg-actions-tertiary-disabled data-[disabled]:border data-[disabled]:border-border-muted data-[disabled]:shadow-none data-[disabled]:hover:bg-actions-tertiary-disabled",
        "data-[disabled]:data-[checked]:bg-actions-primary-disabled",
        "data-[disabled]:data-[indeterminate]:bg-actions-primary-disabled",
        className
      )}
      {...props}
    >
      <Checkbox.Indicator
        className={cn(
          "flex items-center justify-center text-content-on-accent-strong",
          "group-data-[disabled]:text-content-on-accent-disabled"
        )}
      >
        <RiCheckFill className="size-[12px] group-data-[indeterminate]:hidden" />
        <RiSubtractFill className="hidden size-[12px] group-data-[indeterminate]:block" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}

export { CheckboxControl, checkboxControlVariants }
export type { CheckboxControlProps }
