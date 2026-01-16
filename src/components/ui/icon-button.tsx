import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const feedbackTones = ["default", "info", "warning", "danger", "success"] as const
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const decorativeTones = [
  "red", "orange", "amber", "yellow", "lime", "green", "emerald",
  "teal", "cyan", "sky", "blue", "indigo", "violet", "purple",
  "fuchsia", "pink", "rose",
] as const

type FeedbackTone = (typeof feedbackTones)[number]
type DecorativeTone = (typeof decorativeTones)[number]
type IconButtonTone = FeedbackTone | DecorativeTone

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

function isFeedbackTone(tone: IconButtonTone): tone is FeedbackTone {
  return (feedbackTones as readonly string[]).includes(tone)
}

function getToneClass(tone: IconButtonTone | undefined): string {
  if (!tone) return ""
  return isFeedbackTone(tone) ? feedbackToneClass[tone] : decorativeToneClass[tone]
}

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-[var(--radius-max)] font-[var(--font-weight-medium)] transition-[background-color,color,box-shadow,transform] outline-none select-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)] active:enabled:scale-[0.98] disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-actions-primary-default text-content-on-accent-strong hover:enabled:bg-actions-primary-hover disabled:bg-actions-primary-disabled disabled:text-content-on-accent-disabled",
        secondary:
          "bg-actions-secondary-default text-content-strong hover:enabled:bg-actions-secondary-hover disabled:bg-actions-secondary-disabled disabled:text-content-disabled",
        tertiary:
          "bg-actions-tertiary-default text-content-strong shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)] hover:enabled:bg-actions-tertiary-hover disabled:bg-actions-tertiary-disabled disabled:text-content-disabled disabled:shadow-none overflow-hidden",
        ghost:
          "bg-transparent text-content-subtle hover:enabled:bg-actions-secondary-hover hover:enabled:text-content-strong disabled:text-content-disabled",
        /** Accent-colored icon style */
        icon: "bg-transparent text-content-link-default hover:enabled:text-content-link-hover disabled:text-content-disabled",
        /** Minimal style with no background, subtle→strong on hover */
        plain:
          "bg-transparent text-content-subtle hover:enabled:text-content-strong disabled:text-content-disabled",
        danger:
          "bg-actions-danger-default text-[color:rgb(var(--content-inverse-strong))] hover:enabled:bg-actions-danger-hover hover:enabled:text-[color:rgb(var(--content-inverse-strong))] disabled:bg-actions-danger-disabled disabled:text-[color:rgb(var(--content-inverse-disabled))]",
      },
      size: {
        "3xs": "size-[var(--space-20)]",
        "2xs": "size-[var(--space-24)]",
        xs: "size-[var(--space-28)]",
        s: "size-[var(--space-32)]",
        m: "size-[var(--space-36)]",
        l: "size-[var(--space-40)]",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "m",
    },
  }
)

const iconVariants = cva(
  "flex items-center justify-center text-current [&_svg]:size-full [&_svg]:shrink-0 [&_svg]:text-current",
  {
    variants: {
      size: {
        "3xs": "size-[var(--space-16)]",
        "2xs": "size-[var(--space-16)]",
        xs: "size-[var(--space-16)]",
        s: "size-[var(--space-16)]",
        m: "size-[var(--space-16)]",
        l: "size-[var(--space-18)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

type IconButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof iconButtonVariants> & {
    tone?: IconButtonTone
  }

const defaultVariant = "secondary"
const defaultSize = "m"

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      className,
      variant,
      size,
      tone,
      children,
      ...props
    },
    ref
  ) {
    const resolvedVariant = variant ?? defaultVariant
    const resolvedSize = size ?? defaultSize
    const toneClass = getToneClass(tone)

    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="icon-button"
        data-variant={resolvedVariant}
        data-size={resolvedSize}
        data-tone={tone}
        className={cn(
          iconButtonVariants({
            variant: resolvedVariant,
            size: resolvedSize,
            className,
          }),
          toneClass
        )}
        {...props}
      >
        <span aria-hidden="true" className={cn(iconVariants({ size: resolvedSize }))}>{children}</span>
      </ButtonPrimitive>
    )
  }
)

export { IconButton, iconButtonVariants }
