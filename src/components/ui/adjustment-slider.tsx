"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { motion, type Transition } from "motion/react"
import NumberFlow from "@number-flow/react"

import { cn, usePrefersReducedMotion } from "@/lib/utils"

// ============================================================================
// Animation Config
// ============================================================================

const fillTransition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.25,
}

const reducedMotionTransition: Transition = {
  duration: 0,
}

const numberFlowTiming = {
  transform: { duration: 200, easing: "ease-out" },
  spin: { duration: 200, easing: "ease-out" },
  opacity: { duration: 120, easing: "ease-out" },
}

// ============================================================================
// Types
// ============================================================================

type AdjustmentSliderSize = "s" | "m" | "l"

type AdjustmentSliderProps = Omit<SliderPrimitive.Root.Props, "className" | "children"> & {
  className?: string
  /** Size variant matching input component sizes */
  size?: AdjustmentSliderSize
  /** Icon displayed at the start of the slider */
  icon?: React.ReactNode
  /** Label text displayed next to the icon */
  label: string
  /** Whether to show the current value */
  showValue?: boolean
  /** Custom render function for the value */
  renderValue?: (value: number) => React.ReactNode
  /** Whether to animate the value changes (default: true) */
  animated?: boolean
}

// ============================================================================
// Size Config
// ============================================================================

const sizeConfig = {
  s: {
    control: "h-[var(--space-32)]",
    track: "rounded-[var(--radius-8)]",
    padding: "px-[var(--space-10)]",
  },
  m: {
    control: "h-[var(--space-36)]",
    track: "rounded-[var(--radius-10)]",
    padding: "px-[var(--space-12)]",
  },
  l: {
    control: "h-[var(--space-40)]",
    track: "rounded-[var(--radius-12)]",
    padding: "px-[var(--space-12)]",
  },
}

// ============================================================================
// Component
// ============================================================================

function AdjustmentSlider({
  className,
  size = "m",
  icon,
  label,
  showValue = true,
  renderValue,
  animated = true,
  defaultValue,
  value: controlledValue,
  onValueChange,
  disabled,
  ...props
}: AdjustmentSliderProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = React.useState<number[]>(
    () => (controlledValue ?? defaultValue ?? [0]) as number[]
  )

  // Use controlled value if provided, otherwise use internal state
  const currentValue = controlledValue ?? internalValue
  const displayValue = Array.isArray(currentValue) ? currentValue[0] : currentValue
  const min = props.min ?? 0
  const max = props.max ?? 100
  const isAtZero = displayValue === min

  // Calculate fill percentage for animation
  const fillPercentage = React.useMemo(() => {
    const range = max - min
    return range > 0 ? ((displayValue as number) - min) / range * 100 : 0
  }, [displayValue, min, max])

  // Handle value changes
  const handleValueChange = React.useCallback(
    (newValue: number[], event: Event) => {
      if (!controlledValue) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue, event)
    },
    [controlledValue, onValueChange]
  )

  return (
    <SliderPrimitive.Root
      data-slot="adjustment-slider"
      data-size={size}
      className={cn("relative w-full", className)}
      defaultValue={defaultValue}
      value={controlledValue}
      onValueChange={handleValueChange}
      disabled={disabled}
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="adjustment-slider-control"
        className={cn(
          "flex w-full touch-none items-center cursor-pointer",
          "data-[disabled]:cursor-not-allowed",
          sizeConfig[size].control
        )}
      >
        <SliderPrimitive.Track
          data-slot="adjustment-slider-track"
          className={cn(
            "relative h-full w-full overflow-hidden",
            sizeConfig[size].track,
            "bg-actions-secondary-default",
            "data-[disabled]:bg-actions-secondary-disabled data-[disabled]:backdrop-blur-sm"
          )}
        >
          {/* Animated fill indicator */}
          <motion.div
            data-slot="adjustment-slider-indicator"
            className="absolute left-0 top-0 h-full rounded-none bg-actions-secondary-hover"
            initial={false}
            animate={{ width: `${fillPercentage}%` }}
            transition={prefersReducedMotion ? reducedMotionTransition : fillTransition}
          />

          {/* Content overlay - icon, label, value */}
          <div
            className={cn(
              "absolute inset-0 flex items-center pointer-events-none z-10",
              sizeConfig[size].padding
            )}
          >
            {icon && (
              <span
                className={cn(
                  "shrink-0 size-[var(--space-16)] [&>svg]:size-full",
                  disabled ? "text-content-disabled" : "text-content-strong"
                )}
              >
                {icon}
              </span>
            )}
            <span
              className={cn(
                "text-[length:var(--font-size-m)] font-medium leading-[var(--line-height-m)]",
                disabled ? "text-content-disabled" : "text-content-strong",
                icon && "ml-[var(--space-8)]"
              )}
            >
              {label}
            </span>
            {showValue && (
              <span
                className={cn(
                  "ml-auto",
                  "text-[length:var(--font-size-m)] font-normal leading-[var(--line-height-m)]",
                  disabled
                    ? "text-content-disabled"
                    : isAtZero
                      ? "text-content-muted"
                      : "text-content-strong"
                )}
              >
                {renderValue ? (
                  renderValue(displayValue as number)
                ) : animated ? (
                  <NumberFlow
                    value={Math.round(displayValue as number)}
                    transformTiming={numberFlowTiming.transform}
                    spinTiming={numberFlowTiming.spin}
                    opacityTiming={numberFlowTiming.opacity}
                    willChange
                    respectMotionPreference
                  />
                ) : (
                  Math.round(displayValue as number)
                )}
              </span>
            )}
          </div>

          {/* Hidden thumb for interaction - visually hidden but accessible */}
          <SliderPrimitive.Thumb
            data-slot="adjustment-slider-thumb"
            className="block size-0 opacity-0"
          />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

// ============================================================================
// Exports
// ============================================================================

export { AdjustmentSlider }
export type { AdjustmentSliderProps, AdjustmentSliderSize }
