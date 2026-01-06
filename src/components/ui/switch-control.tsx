"use client"

import * as React from "react"
import { Switch } from "@base-ui/react/switch"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"

const switchControlVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center rounded-[var(--radius-max)] p-[var(--space-4)] outline-none transition-[background-color] duration-200 ease-out disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        default: "h-[20px] w-[36px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const thumbTransition: Transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.25,
}

type SwitchControlProps = Omit<Switch.Root.Props, "className"> &
  VariantProps<typeof switchControlVariants> & {
    className?: string
  }

function SwitchControl({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  className,
  ...props
}: SwitchControlProps) {
  // Track internal state for animation
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked)

  // Use controlled value if provided, otherwise use internal state
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked

  const handleCheckedChange = (newChecked: boolean) => {
    if (controlledChecked === undefined) {
      setInternalChecked(newChecked)
    }
    onCheckedChange?.(newChecked)
  }

  const getStateClasses = () => {
    if (disabled) {
      if (isChecked) {
        return "bg-actions-primary-disabled"
      }
      return "bg-actions-secondary-disabled"
    }

    if (isChecked) {
      return "bg-actions-primary-default hover:bg-actions-primary-hover focus-visible:bg-actions-primary-hover focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]"
    }

    return "bg-actions-secondary-default hover:bg-actions-secondary-hover focus-visible:bg-actions-secondary-hover focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]"
  }

  return (
    <Switch.Root
      data-slot="switch-control"
      checked={isChecked}
      onCheckedChange={handleCheckedChange}
      disabled={disabled}
      className={cn(switchControlVariants(), getStateClasses(), className)}
      {...props}
    >
      <Switch.Thumb
        render={
          <motion.span
            data-slot="switch-thumb"
            animate={{
              x: isChecked ? 16 : 0,
            }}
            transition={thumbTransition}
            className={cn(
              "block size-[12px] rounded-full shadow-[0_2px_4px_0_var(--color-utility-shadow-l3),0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l3),0_0_0_1px_var(--color-utility-shadow-l1)]",
              disabled ? "bg-neutral-400" : "bg-white"
            )}
          />
        }
      />
    </Switch.Root>
  )
}

export { SwitchControl, switchControlVariants }
export type { SwitchControlProps }
