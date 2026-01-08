"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { motion, type Transition } from "motion/react"
import { RiPencilFill, RiCheckboxCircleFill } from "@remixicon/react"

import { cn } from "@/lib/utils"

// ============================================================================
// Animation Config
// ============================================================================

const thumbTransition: Transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.2,
}

// ============================================================================
// SliderLabelRow
// ============================================================================

type SliderLabelRowProps = {
  label?: string
  value: number
  min: number
  max: number
  step: number
  onValueChange: (value: number) => void
  disabled?: boolean
  formatValue?: (value: number) => string
  editable?: boolean
  hasValue?: boolean
  showValue?: boolean
}

function SliderLabelRow({
  label,
  value,
  min,
  max,
  step,
  onValueChange,
  disabled = false,
  formatValue,
  editable = true,
  hasValue = false,
  showValue = true,
}: SliderLabelRowProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(String(value))
  const [isDirty, setIsDirty] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const hasLabel = Boolean(label)

  // Sync input value when external value changes
  React.useEffect(() => {
    if (!isEditing) {
      setInputValue(String(value))
      setIsDirty(false)
    }
  }, [value, isEditing])

  // Focus input when entering edit mode
  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const displayValue = formatValue ? formatValue(value) : String(value)

  const confirmEdit = () => {
    const numValue = Number(inputValue)
    if (!isNaN(numValue)) {
      // Clamp to min/max and snap to step
      const clampedValue = Math.max(min, Math.min(max, numValue))
      const snappedValue = Math.round((clampedValue - min) / step) * step + min
      onValueChange(snappedValue)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      confirmEdit()
    } else if (e.key === "Escape") {
      setInputValue(String(value))
      setIsEditing(false)
    }
  }

  const handleClick = () => {
    if (editable && !disabled && showValue) {
      setIsEditing(true)
    }
  }

  const valueTextClasses = cn(
    "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]",
    disabled
      ? "text-content-muted"
      : hasValue
        ? "text-content-strong"
        : "text-content-subtle"
  )

  return (
    <div
      data-slot="slider-label-row"
      className={cn(
        "group flex w-full items-center gap-[var(--space-10)]",
        disabled ? "cursor-not-allowed" : editable && showValue && "cursor-pointer"
      )}
      onClick={handleClick}
    >
      {/* Label */}
      {hasLabel && (
        <span
          data-slot="slider-label"
          className={cn(
            "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]",
            disabled ? "text-content-muted" : "text-content-strong"
          )}
        >
          {label}
        </span>
      )}

      {/* Separator */}
      {hasLabel && showValue && (
        <span
          data-slot="slider-separator"
          className="size-[2px] shrink-0 rounded-full bg-content-muted"
        />
      )}

      {/* Value indicator with edit icon */}
      {showValue && (
        <div
          data-slot="slider-value-indicator"
          className="flex items-center gap-[var(--space-6)]"
        >
          <div className="relative h-[20px] flex items-center">
            {/* Hidden span to measure text width */}
            <span
              className={cn(
                "invisible whitespace-pre",
                "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]"
              )}
              aria-hidden="true"
            >
              {isEditing ? (inputValue || "0") : displayValue}
            </span>
            {/* Input or display text overlaid on top */}
            {isEditing && !disabled ? (
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setIsDirty(true)
                }}
                onKeyDown={handleKeyDown}
                onBlur={confirmEdit}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "absolute inset-0 w-full bg-transparent outline-none caret-actions-primary-default",
                  "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]",
                  "text-content-strong"
                )}
              />
            ) : (
              <span className={cn("absolute inset-0", valueTextClasses)}>
                {displayValue}
              </span>
            )}
          </div>

          {/* Morphing icon: pencil <-> checkbox */}
          {editable && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                if (isEditing) {
                  confirmEdit()
                }
              }}
              className="relative flex size-[16px] shrink-0 items-center justify-center"
            >
              {/* Pencil icon - shown on hover when not editing */}
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-content-subtle"
                initial={false}
                animate={{
                  y: isEditing ? -6 : 0,
                  scale: isEditing ? 0.5 : 1,
                  opacity: isEditing ? 0 : 1,
                  filter: isEditing ? "blur(4px)" : "blur(0px)",
                }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.2 }}
              >
                <RiPencilFill className="size-[14px] opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
              </motion.span>

              {/* Checkbox icon - shown when editing */}
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                initial={false}
                animate={{
                  y: isEditing ? 0 : 6,
                  scale: isEditing ? 1 : 0.5,
                  opacity: isEditing ? 1 : 0,
                  filter: isEditing ? "blur(0px)" : "blur(4px)",
                }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.2 }}
              >
                {/* Muted icon - fades out when dirty */}
                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-content-muted"
                  initial={false}
                  animate={{ opacity: isDirty ? 0 : 1 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <RiCheckboxCircleFill className="size-[16px]" />
                </motion.span>
                {/* Primary icon - fades in when dirty */}
                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-actions-primary-default"
                  initial={false}
                  animate={{ opacity: isDirty ? 1 : 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <RiCheckboxCircleFill className="size-[16px]" />
                </motion.span>
              </motion.span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Slider Types
// ============================================================================

type SliderProps = Omit<SliderPrimitive.Root.Props, "value" | "defaultValue" | "onValueChange" | "onValueCommitted"> & {
  /** Controlled value */
  value?: number
  /** Initial uncontrolled value */
  defaultValue?: number
  /** Callback when value changes during interaction */
  onValueChange?: (value: number) => void
  /** Callback when value is committed (drag end, click) */
  onValueCommitted?: (value: number) => void
  /** Label text */
  label?: string
  /** Description text below label */
  description?: string
  /** Show value indicator (default: true) */
  showValue?: boolean
  /** Allow editing value directly (default: true) */
  editableValue?: boolean
  /** Custom value formatting function */
  formatValue?: (value: number) => string
  /** Additional class name */
  className?: string
}

// ============================================================================
// Slider Component
// ============================================================================

function Slider({
  value: controlledValue,
  defaultValue,
  onValueChange,
  onValueCommitted,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
  description,
  showValue = true,
  editableValue = true,
  formatValue,
  className,
  ...props
}: SliderProps) {
  // Track internal state for uncontrolled mode
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? min)

  // Use controlled value if provided, otherwise use internal state
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue

  // Track if slider has been interacted with (for styling)
  const hasValue = currentValue !== min

  const handleValueChange: SliderPrimitive.Root.Props["onValueChange"] = (newValues) => {
    const newValue = Array.isArray(newValues) ? newValues[0] : newValues
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  const handleValueCommitted: SliderPrimitive.Root.Props["onValueCommitted"] = (newValues) => {
    const newValue = Array.isArray(newValues) ? newValues[0] : newValues
    onValueCommitted?.(newValue)
  }

  // Handle value change from the value indicator input
  const handleIndicatorValueChange = (newValue: number) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
    onValueCommitted?.(newValue)
  }

  const hasLabel = Boolean(label)
  const hasDescription = Boolean(description)

  return (
    <div
      data-slot="slider"
      data-disabled={disabled || undefined}
      className={cn("flex w-full flex-col gap-[var(--space-12)]", className)}
    >
      {/* Label row with value indicator */}
      {(hasLabel || showValue) && (
        <div className="flex flex-col gap-[var(--space-2)]">
          <SliderLabelRow
            label={label}
            value={currentValue}
            min={min}
            max={max}
            step={step}
            onValueChange={handleIndicatorValueChange}
            disabled={disabled}
            formatValue={formatValue}
            editable={editableValue}
            hasValue={hasValue}
            showValue={showValue}
          />
          {hasDescription && (
            <span
              data-slot="slider-description"
              className={cn(
                "text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)]",
                disabled ? "text-content-muted" : "text-content-subtle"
              )}
            >
              {description}
            </span>
          )}
        </div>
      )}

      {/* Slider control */}
      <SliderPrimitive.Root
        value={[currentValue]}
        onValueChange={handleValueChange}
        onValueCommitted={handleValueCommitted}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        {...props}
      >
        <SliderPrimitive.Control
          data-slot="slider-control"
          className={cn(
            "flex h-[20px] w-full touch-none items-center",
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className={cn(
              "relative h-[4px] w-full rounded-[var(--radius-max)] transition-colors duration-200 ease-out",
              disabled
                ? "bg-actions-secondary-disabled backdrop-blur-sm"
                : "bg-actions-secondary-default group-hover:bg-actions-secondary-hover"
            )}
          >
            <SliderPrimitive.Indicator
              data-slot="slider-indicator"
              className={cn(
                "absolute h-full rounded-[var(--radius-max)]",
                disabled
                  ? "bg-actions-primary-disabled backdrop-blur-sm"
                  : "bg-actions-primary-default"
              )}
            />
            <SliderPrimitive.Thumb
              data-slot="slider-thumb"
              className="focus-visible:outline-none"
              render={
                <motion.span
                  className={cn(
                    "block size-[16px] rounded-full",
                    "shadow-[0_2px_4px_0_var(--color-utility-shadow-l3),0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l3),0_0_0_1px_var(--color-utility-shadow-l1)]",
                    "focus-visible:shadow-[0_2px_4px_0_var(--color-utility-shadow-l3),0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l3),0_0_0_1px_var(--color-utility-shadow-l1),0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
                    disabled
                      ? hasValue
                        ? "bg-content-on-accent-disabled"
                        : "bg-neutral-400"
                      : "bg-white"
                  )}
                  whileHover={disabled ? undefined : { scale: 1.25 }}
                  whileFocus={disabled ? undefined : { scale: 1.25 }}
                  transition={thumbTransition}
                />
              }
            />
          </SliderPrimitive.Track>
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    </div>
  )
}

export { Slider }
export type { SliderProps }
