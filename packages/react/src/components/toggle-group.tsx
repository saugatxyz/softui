"use client"

import * as React from "react"
import { Toggle } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type Transition } from "motion/react"

import { cn, usePrefersReducedMotion } from "../lib/utils"

// ============================================================================
// Types
// ==========================================================================

type ToggleGroupSize = "xs" | "s" | "m" | "l"
type ToggleGroupVariant = "tertiary" | "ghost" | "secondary"

type ToggleGroupContextValue = {
  size: ToggleGroupSize
  variant: ToggleGroupVariant
  hideSeparator: boolean
  currentValue: readonly unknown[]
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null)

function useToggleGroup() {
  const context = React.useContext(ToggleGroupContext)
  if (!context) {
    throw new Error("ToggleGroupItem must be used within a ToggleGroup")
  }
  return context
}

// ============================================================================
// Variants
// ==========================================================================

const toggleGroupVariants = cva("inline-flex items-center gap-[var(--space-4)]", {
  variants: {
    size: {
      xs: "",
      s: "",
      m: "",
      l: "",
    },
  },
  defaultVariants: {
    size: "m",
  },
})

const itemVariants = cva(
  "group relative inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-max)] font-[var(--font-weight-medium)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] transition-[background-color,color,box-shadow,transform] outline-none select-none active:enabled:scale-[0.98] disabled:cursor-not-allowed focus-visible:z-10 focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
  {
    variants: {
      variant: {
        tertiary:
          "bg-actions-tertiary-default text-content-strong backdrop-blur-[12px] shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)] hover:enabled:bg-actions-tertiary-hover data-[pressed]:bg-actions-tertiary-hover disabled:bg-actions-tertiary-disabled disabled:text-content-disabled disabled:shadow-none overflow-hidden",
        ghost:
          "bg-transparent text-content-subtle hover:enabled:bg-actions-secondary-hover hover:enabled:text-content-strong disabled:text-content-disabled data-[pressed]:bg-actions-secondary-default data-[pressed]:text-content-strong data-[pressed]:hover:enabled:bg-actions-secondary-hover",
        secondary:
          "bg-actions-secondary-default text-content-strong hover:enabled:bg-actions-secondary-hover data-[pressed]:bg-actions-secondary-hover disabled:bg-actions-secondary-disabled disabled:text-content-disabled",
      },
      size: {
        xs: "h-[var(--space-28)] gap-[var(--space-2)]",
        s: "h-[var(--space-32)] gap-[var(--space-4)]",
        m: "h-[var(--space-36)] gap-[var(--space-4)]",
        l: "h-[var(--space-40)] gap-[var(--space-4)]",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Icon only - square sizing
      { size: "xs", iconOnly: true, className: "size-[var(--space-28)]" },
      { size: "s", iconOnly: true, className: "size-[var(--space-32)]" },
      { size: "m", iconOnly: true, className: "size-[var(--space-36)]" },
      { size: "l", iconOnly: true, className: "size-[var(--space-40)]" },
      // With label - padding
      { size: "xs", iconOnly: false, className: "px-[var(--space-10)]" },
      { size: "s", iconOnly: false, className: "px-[var(--space-12)]" },
      { size: "m", iconOnly: false, className: "px-[var(--space-16)]" },
      { size: "l", iconOnly: false, className: "px-[var(--space-16)]" },
    ],
    defaultVariants: {
      variant: "ghost",
      size: "m",
      iconOnly: false,
    },
  }
)

const labelVariants = cva("flex shrink-0 items-center justify-center", {
  variants: {
    size: {
      xs: "px-[var(--space-4)] py-[var(--space-4)]",
      s: "px-[var(--space-4)] py-[var(--space-4)]",
      m: "px-[var(--space-4)] py-[var(--space-4)]",
      l: "px-[var(--space-6)] py-[var(--space-6)]",
    },
  },
  defaultVariants: {
    size: "m",
  },
})

const iconVariants = cva("flex shrink-0 items-center justify-center text-current [&_svg]:size-full", {
  variants: {
    size: {
      xs: "size-[var(--space-16)]",
      s: "size-[var(--space-16)]",
      m: "size-[var(--space-16)]",
      l: "size-[var(--space-18)]",
    },
  },
  defaultVariants: {
    size: "m",
  },
})

const iconFadeTransition: Transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1],
}

const iconMorphTransition = {
  type: "spring" as const,
  bounce: 0.2,
  duration: 0.25,
}

const labelTransition = {
  type: "spring" as const,
  bounce: 0.15,
  duration: 0.25,
}

const getMorphTransform = (translateY: number, scale: number) =>
  `translateY(${translateY}px) scale(${scale})`

type MorphingIconProps = {
  pressed: boolean
  icon: React.ReactNode
  pressedIcon?: React.ReactNode
  size: ToggleGroupSize
  morph?: boolean
  prefersReducedMotion: boolean
}

const instantTransition = { duration: 0 }

function MorphingIcon({
  pressed,
  icon,
  pressedIcon,
  size,
  morph = false,
  prefersReducedMotion,
}: MorphingIconProps) {
  const iconWrapperClassName = cn(iconVariants({ size }), "relative")
  const pressedNode = pressedIcon ?? icon

  if (!morph) {
    return (
      <span data-slot="icon" className={iconWrapperClassName}>
        <motion.span
          className="absolute inset-0 flex items-center justify-center [&_svg]:size-full"
          animate={{ opacity: pressed ? 0 : 1 }}
          transition={prefersReducedMotion ? instantTransition : iconFadeTransition}
        >
          {icon}
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center [&_svg]:size-full"
          animate={{ opacity: pressed ? 1 : 0 }}
          transition={prefersReducedMotion ? instantTransition : iconFadeTransition}
        >
          {pressedNode}
        </motion.span>
      </span>
    )
  }

  return (
    <span data-slot="icon" className={iconWrapperClassName}>
      <motion.span
        className="absolute inset-0 flex items-center justify-center [&_svg]:size-full"
        animate={{
          opacity: pressed ? 0 : 1,
          filter: prefersReducedMotion ? "blur(0px)" : (pressed ? "blur(8px)" : "blur(0px)"),
          transform: prefersReducedMotion ? getMorphTransform(0, 1) : getMorphTransform(pressed ? -8 : 0, pressed ? 0.5 : 1),
        }}
        transition={prefersReducedMotion ? instantTransition : iconMorphTransition}
      >
        {icon}
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center [&_svg]:size-full"
        animate={{
          opacity: pressed ? 1 : 0,
          filter: prefersReducedMotion ? "blur(0px)" : (pressed ? "blur(0px)" : "blur(8px)"),
          transform: prefersReducedMotion ? getMorphTransform(0, 1) : getMorphTransform(pressed ? 0 : 8, pressed ? 1 : 0.5),
        }}
        transition={prefersReducedMotion ? instantTransition : iconMorphTransition}
      >
        {pressedNode}
      </motion.span>
    </span>
  )
}

// ============================================================================
// ToggleGroup Component
// ==========================================================================

type ToggleGroupProps = Omit<ToggleGroupPrimitive.Props, "className"> &
  VariantProps<typeof toggleGroupVariants> & {
    /** Visual variant for all items */
    variant?: ToggleGroupVariant
    /** Hide separators between items */
    hideSeparator?: boolean
    className?: string
    /** Explicit escape hatch for intentional structural overrides. */
    unsafeClassName?: string
  }

function ToggleGroup({
  className,
  unsafeClassName,
  size = "m",
  variant = "ghost",
  hideSeparator = false,
  children,
  value,
  defaultValue,
  onValueChange,
  ...props
}: ToggleGroupProps) {
  const childArray = React.Children.toArray(children)
  const count = childArray.length
  const [internalValue, setInternalValue] = React.useState<readonly unknown[]>(
    defaultValue ?? []
  )
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleValueChange = React.useCallback(
    (nextValue: unknown[], eventDetails: Parameters<NonNullable<typeof onValueChange>>[1]) => {
      if (!isControlled) {
        setInternalValue(nextValue)
      }
      onValueChange?.(nextValue, eventDetails)
    },
    [isControlled, onValueChange]
  )

  return (
    <ToggleGroupContext.Provider
      value={{
        size: size ?? "m",
        variant,
        hideSeparator,
        currentValue: currentValue ?? [],
      }}
    >
      <ToggleGroupPrimitive
        data-slot="toggle-group"
        data-size={size}
        data-variant={variant}
        className={cn(className, toggleGroupVariants({ size }), unsafeClassName)}
        {...(isControlled ? { value } : { defaultValue })}
        onValueChange={handleValueChange}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child

          const isLast = index === count - 1

          return (
            <React.Fragment key={child.key ?? index}>
              {child}
              {!isLast && !hideSeparator && (
                <div
                  aria-hidden="true"
                  className="h-[var(--space-16)] w-px bg-[var(--color-border-interactive-default)]"
                />
              )}
            </React.Fragment>
          )
        })}
      </ToggleGroupPrimitive>
    </ToggleGroupContext.Provider>
  )
}

// ============================================================================
// ToggleGroupItem Component
// ==========================================================================

type ToggleGroupItemProps = Omit<Toggle.Props, "className"> & {
  /** Required: Unique value to identify this toggle in the group */
  value: string
  /** Leading icon displayed before the label */
  leadingIcon?: React.ReactNode
  /** Icon displayed when toggle is pressed (for icon morphing) */
  pressedIcon?: React.ReactNode
  /** Trailing icon displayed after the label */
  trailingIcon?: React.ReactNode
  /** Enable morph animation between icons */
  morph?: boolean
  className?: string
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
  children?: React.ReactNode
}

function ToggleGroupItem({
  className,
  unsafeClassName,
  value,
  leadingIcon,
  pressedIcon,
  trailingIcon,
  morph = false,
  children,
  ...props
}: ToggleGroupItemProps) {
  const { size, variant, currentValue } = useToggleGroup()
  const hasLabel = React.Children.count(children) > 0
  const iconOnly = !hasLabel
  const isPressed = currentValue.includes(value)
  const hasPressedIcon = Boolean(pressedIcon)
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <Toggle
      data-slot="toggle-group-item"
      data-variant={variant}
      data-size={size}
      value={value}
      className={cn(className, itemVariants({ variant, size, iconOnly }), unsafeClassName)}
      {...props}
    >
      {leadingIcon ? (
        hasPressedIcon ? (
          <MorphingIcon
            pressed={isPressed}
            icon={leadingIcon}
            pressedIcon={pressedIcon}
            size={size}
            morph={morph}
            prefersReducedMotion={prefersReducedMotion}
          />
        ) : (
          <span data-slot="icon" className={cn(iconVariants({ size }), "transition-colors duration-200")}>
            {leadingIcon}
          </span>
        )
      ) : null}
      {hasLabel && (
        <motion.span
          layout={!prefersReducedMotion}
          transition={prefersReducedMotion ? instantTransition : labelTransition}
          data-slot="label"
          className={cn(labelVariants({ size }), "overflow-hidden whitespace-nowrap")}
        >
          {children}
        </motion.span>
      )}
      {trailingIcon && (
        <span data-slot="icon" className={cn(iconVariants({ size }), "transition-colors duration-200")}>
          {trailingIcon}
        </span>
      )}
    </Toggle>
  )
}

export { ToggleGroup, ToggleGroupItem }
export type { ToggleGroupProps, ToggleGroupItemProps, ToggleGroupSize, ToggleGroupVariant }
