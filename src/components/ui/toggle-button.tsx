"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { motion } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ============================================================================
// Tone System
// ============================================================================

const feedbackTones = ["default", "info", "warning", "danger", "success"] as const
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const decorativeTones = [
  "red", "orange", "amber", "yellow", "lime", "green", "emerald",
  "teal", "cyan", "sky", "blue", "indigo", "violet", "purple",
  "fuchsia", "pink", "rose",
] as const

type FeedbackTone = (typeof feedbackTones)[number]
type DecorativeTone = (typeof decorativeTones)[number]
type ToggleButtonTone = FeedbackTone | DecorativeTone

const feedbackToneClass: Record<FeedbackTone, string> = {
  default: "",
  info: "text-content-feedback-info-strong",
  warning: "text-content-feedback-warning-strong",
  danger: "text-content-feedback-danger-strong",
  success: "text-content-feedback-success-strong",
}

const decorativeToneClass: Record<DecorativeTone, string> = {
  red: "text-content-decorative-red-strong",
  orange: "text-content-decorative-orange-strong",
  amber: "text-content-decorative-amber-strong",
  yellow: "text-content-decorative-yellow-strong",
  lime: "text-content-decorative-lime-strong",
  green: "text-content-decorative-green-strong",
  emerald: "text-content-decorative-emerald-strong",
  teal: "text-content-decorative-teal-strong",
  cyan: "text-content-decorative-cyan-strong",
  sky: "text-content-decorative-sky-strong",
  blue: "text-content-decorative-blue-strong",
  indigo: "text-content-decorative-indigo-strong",
  violet: "text-content-decorative-violet-strong",
  purple: "text-content-decorative-purple-strong",
  fuchsia: "text-content-decorative-fuchsia-strong",
  pink: "text-content-decorative-pink-strong",
  rose: "text-content-decorative-rose-strong",
}

function isFeedbackTone(tone: ToggleButtonTone): tone is FeedbackTone {
  return (feedbackTones as readonly string[]).includes(tone)
}

function getToneClass(tone: ToggleButtonTone | undefined): string {
  if (!tone) return ""
  return isFeedbackTone(tone) ? feedbackToneClass[tone] : decorativeToneClass[tone]
}

// ============================================================================
// Variants
// ============================================================================

const toggleButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-max)] font-[var(--font-weight-medium)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] transition-[background-color,color,box-shadow,transform] outline-none select-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)] active:enabled:scale-[0.98] disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        tertiary:
          "bg-actions-tertiary-default text-content-strong backdrop-blur-[12px] shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)] hover:enabled:bg-actions-tertiary-hover disabled:bg-actions-tertiary-disabled disabled:text-content-disabled disabled:shadow-none overflow-hidden",
        ghost:
          "bg-transparent text-content-subtle hover:enabled:bg-actions-secondary-hover hover:enabled:text-content-strong disabled:text-content-disabled",
        secondary:
          "bg-actions-secondary-default text-content-strong hover:enabled:bg-actions-secondary-hover disabled:bg-actions-secondary-disabled disabled:text-content-disabled",
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
      variant: "tertiary",
      size: "m",
      iconOnly: true,
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

const iconSizeMap = {
  xs: 16,
  s: 16,
  m: 16,
  l: 18,
} as const

// ============================================================================
// Types
// ============================================================================

type ToggleButtonSize = "xs" | "s" | "m" | "l"
type ToggleButtonVariant = "tertiary" | "ghost" | "secondary"

type ToggleButtonProps = Omit<TogglePrimitive.Props, "className"> &
  VariantProps<typeof toggleButtonVariants> & {
    /** Required: Icon to display when not pressed */
    icon: React.ReactNode
    /** Icon to display when pressed (falls back to icon) */
    pressedIcon?: React.ReactNode
    /** Label to display when not pressed */
    children?: React.ReactNode
    /** Label to display when pressed (falls back to children) */
    pressedChildren?: React.ReactNode
    /** Color tone when pressed */
    pressedTone?: ToggleButtonTone
    /** Fixed width for label animation (unpressed state) */
    labelWidth?: number
    /** Fixed width for label animation (pressed state) */
    pressedLabelWidth?: number
    /** Enable morphing animation between icons (blur, scale, y-position). Defaults to false (smooth fade). */
    morph?: boolean
    className?: string
  }

// ============================================================================
// MorphingIcon Component
// ============================================================================

function MorphingIcon({
  pressed,
  icon,
  pressedIcon,
  size,
  toneClass,
  morph,
}: {
  pressed: boolean
  icon: React.ReactNode
  pressedIcon?: React.ReactNode
  size: number
  toneClass: string
  morph: boolean
}) {
  // No morphing - smooth fade transition
  if (!morph) {
    return (
      <span
        className="relative flex shrink-0 items-center justify-center"
        style={{ width: size, height: size }}
      >
        <motion.span
          className="absolute inset-0 flex items-center justify-center [&_svg]:size-full"
          initial={false}
          animate={{
            opacity: pressed ? 0 : 1,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {icon}
        </motion.span>
        <motion.span
          className={cn(
            "absolute inset-0 flex items-center justify-center [&_svg]:size-full",
            toneClass
          )}
          initial={false}
          animate={{
            opacity: pressed ? 1 : 0,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {pressedIcon ?? icon}
        </motion.span>
      </span>
    )
  }

  // Morphing animation between icons
  return (
    <span
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <motion.span
        className="absolute inset-0 flex items-center justify-center [&_svg]:size-full"
        initial={false}
        animate={{
          y: pressed ? -8 : 0,
          scale: pressed ? 0.5 : 1,
          opacity: pressed ? 0 : 1,
          filter: pressed ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.25 }}
      >
        {icon}
      </motion.span>
      <motion.span
        className={cn(
          "absolute inset-0 flex items-center justify-center [&_svg]:size-full",
          toneClass
        )}
        initial={false}
        animate={{
          y: pressed ? 0 : 8,
          scale: pressed ? 1 : 0.5,
          opacity: pressed ? 1 : 0,
          filter: pressed ? "blur(0px)" : "blur(8px)",
        }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.25 }}
      >
        {pressedIcon ?? icon}
      </motion.span>
    </span>
  )
}

// ============================================================================
// ToggleButton Component
// ============================================================================

const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  function ToggleButton(
    {
      className,
      variant = "tertiary",
      size = "m",
      icon,
      pressedIcon,
      children,
      pressedChildren,
      pressedTone,
      labelWidth,
      pressedLabelWidth,
      pressed,
      defaultPressed,
      onPressedChange,
      morph,
      ...props
    },
    ref
  ) {
    // Track animation state - synced with Base UI's state via onPressedChange
    // This is separate from control logic which Base UI handles
    const isControlled = pressed !== undefined
    const [animationPressed, setAnimationPressed] = React.useState(
      pressed ?? defaultPressed ?? false
    )

    // Sync animation state with controlled value when it changes
    React.useEffect(() => {
      if (isControlled) {
        setAnimationPressed(pressed ?? false)
      }
    }, [isControlled, pressed])

    // Handle pressed change - sync animation state and forward callback
    const handlePressedChange = React.useCallback<NonNullable<TogglePrimitive.Props["onPressedChange"]>>(
      (newPressed, eventDetails) => {
        if (!isControlled) {
          setAnimationPressed(newPressed)
        }
        onPressedChange?.(newPressed, eventDetails)
      },
      [isControlled, onPressedChange]
    )

    const resolvedSize: ToggleButtonSize = size ?? "m"
    const iconSize = iconSizeMap[resolvedSize]
    const toneClass = getToneClass(pressedTone)
    const shouldMorph = morph ?? false

    const hasLabel = children !== undefined || pressedChildren !== undefined
    const currentLabel = animationPressed ? (pressedChildren ?? children) : children
    const currentWidth = animationPressed ? (pressedLabelWidth ?? labelWidth) : labelWidth

    return (
      <TogglePrimitive
        ref={ref}
        data-slot="toggle-button"
        data-variant={variant}
        data-size={resolvedSize}
        pressed={pressed}
        defaultPressed={defaultPressed}
        onPressedChange={handlePressedChange}
        className={cn(toggleButtonVariants({ variant, size: resolvedSize, iconOnly: !hasLabel, className }))}
        {...props}
      >
        <MorphingIcon
          pressed={animationPressed}
          icon={icon}
          pressedIcon={pressedIcon}
          size={iconSize}
          toneClass={toneClass}
          morph={shouldMorph}
        />
        {hasLabel && (
          <span data-slot="label" className={cn(labelVariants({ size: resolvedSize }))}>
            {currentWidth !== undefined ? (
              <motion.span
                className="inline-block overflow-hidden whitespace-nowrap"
                initial={false}
                animate={{ width: currentWidth }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.25 }}
              >
                {currentLabel}
              </motion.span>
            ) : (
              currentLabel
            )}
          </span>
        )}
      </TogglePrimitive>
    )
  }
)

export { ToggleButton }
export type { ToggleButtonProps, ToggleButtonSize, ToggleButtonVariant, ToggleButtonTone }
