"use client"

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

type SwitchControlProps = Omit<Switch.Root.Props, "className"> &
  VariantProps<typeof switchControlVariants> & {
    className?: string
  }

const thumbTransition: Transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.25,
}

function SwitchControl({ className, ...props }: SwitchControlProps) {
  return (
    <Switch.Root
      data-slot="switch-control"
      className={cn(
        switchControlVariants(),
        "group",
        "bg-actions-secondary-default hover:bg-actions-secondary-hover",
        "data-[checked]:bg-actions-primary-default data-[checked]:hover:bg-actions-primary-hover",
        "data-[disabled]:bg-actions-secondary-disabled data-[disabled]:cursor-not-allowed",
        "data-[disabled]:data-[checked]:bg-actions-primary-disabled",
        "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        className
      )}
      {...props}
    >
      <Switch.Thumb
        className={cn(
          "block size-[12px] rounded-full",
          "bg-content-inverse-strong",
          "shadow-[0_2px_4px_0_var(--color-utility-shadow-l3),0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l3),0_0_0_1px_var(--color-utility-shadow-l1)]",
          "group-data-[checked]:bg-content-on-accent-strong",
          "group-data-[disabled]:bg-content-muted",
          "group-data-[disabled]:group-data-[checked]:bg-content-on-accent-disabled"
        )}
        render={(thumbProps, state) => {
          const {
            className: thumbClassName,
            onAnimationStart,
            onDrag,
            onDragStart,
            onDragEnd,
            onDragOver,
            onDragEnter,
            onDragLeave,
            onDrop,
            ...thumbRest
          } = thumbProps
          return (
            <motion.span
              {...thumbRest}
              className={thumbClassName}
              initial={false}
              animate={{
                transform: state.checked ? "translateX(16px)" : "translateX(0px)",
              }}
              transition={thumbTransition}
            />
          )
        }}
      />
    </Switch.Root>
  )
}

export { SwitchControl, switchControlVariants }
export type { SwitchControlProps }
