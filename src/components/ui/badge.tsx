import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-max)]",
  {
    variants: {
      size: {
        xs: "h-[var(--space-20)] gap-[var(--space-4)] px-[var(--space-8)]",
        s: "h-[var(--space-24)] gap-[var(--space-4)] px-[var(--space-8)]",
        m: "h-[var(--space-28)] gap-[var(--space-6)] px-[var(--space-12)]",
      },
      isEmphasized: {
        true: "border",
        false:
          "bg-actions-tertiary-default backdrop-blur-[12px] shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]",
      },
    },
    defaultVariants: {
      size: "s",
      isEmphasized: false,
    },
  }
)

const labelVariants = cva(
  "flex shrink-0 items-center justify-center px-0 py-0 font-[var(--font-weight-medium)]",
  {
    variants: {
      size: {
        xs: "text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]",
        s: "text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]",
        m: "text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
      },
    },
    defaultVariants: {
      size: "s",
    },
  }
)

const iconVariants = cva(
  "flex shrink-0 items-center justify-center text-current [&_svg]:size-full [&_svg]:shrink-0 [&_svg]:text-current",
  {
    variants: {
      size: {
        s: "size-[16px]",
        m: "size-[16px]",
      },
    },
    defaultVariants: {
      size: "s",
    },
  }
)

const dotVariants = cva("shrink-0 rounded-full bg-current", {
  variants: {
    size: {
      xs: "size-[6px]",
      s: "size-[6px]",
      m: "size-[6px]",
    },
  },
  defaultVariants: {
    size: "s",
  },
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const decorativeColors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const

const semanticVariants = ["neutral", "info", "warning", "danger", "success"] as const
type SemanticVariant = (typeof semanticVariants)[number]
type DecorativeVariant = (typeof decorativeColors)[number]
type BadgeVariant = SemanticVariant | DecorativeVariant

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    variant?: BadgeVariant
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    leadingDot?: boolean
    trailingDot?: boolean
  }

const feedbackStrongClass = {
  neutral: "text-content-strong",
  info: "text-content-feedback-info-strong",
  warning: "text-content-feedback-warning-strong",
  danger: "text-content-feedback-danger-strong",
  success: "text-content-feedback-success-strong",
} as const

const feedbackSubtleClass = {
  neutral: "text-content-strong",
  info: "text-content-feedback-info-subtle",
  warning: "text-content-feedback-warning-subtle",
  danger: "text-content-feedback-danger-subtle",
  success: "text-content-feedback-success-subtle",
} as const

const feedbackColoredClass = {
  neutral: "bg-actions-secondary-default border-border-interactive-default",
  info: "bg-surface-feedback-info-subtle border-border-feedback-info-subtle",
  warning:
    "bg-surface-feedback-warning-subtle border-border-feedback-warning-subtle",
  danger: "bg-surface-feedback-danger-subtle border-border-feedback-danger-subtle",
  success:
    "bg-surface-feedback-success-subtle border-border-feedback-success-subtle",
} as const

const decorativeSurfaceSubtleClass = {
  red: "bg-surface-decorative-red-subtle",
  orange: "bg-surface-decorative-orange-subtle",
  amber: "bg-surface-decorative-amber-subtle",
  yellow: "bg-surface-decorative-yellow-subtle",
  lime: "bg-surface-decorative-lime-subtle",
  green: "bg-surface-decorative-green-subtle",
  emerald: "bg-surface-decorative-emerald-subtle",
  teal: "bg-surface-decorative-teal-subtle",
  cyan: "bg-surface-decorative-cyan-subtle",
  sky: "bg-surface-decorative-sky-subtle",
  blue: "bg-surface-decorative-blue-subtle",
  indigo: "bg-surface-decorative-indigo-subtle",
  violet: "bg-surface-decorative-violet-subtle",
  purple: "bg-surface-decorative-purple-subtle",
  fuchsia: "bg-surface-decorative-fuchsia-subtle",
  pink: "bg-surface-decorative-pink-subtle",
  rose: "bg-surface-decorative-rose-subtle",
} as const

const decorativeBorderSubtleClass = {
  red: "border-border-decorative-red-subtle",
  orange: "border-border-decorative-orange-subtle",
  amber: "border-border-decorative-amber-subtle",
  yellow: "border-border-decorative-yellow-subtle",
  lime: "border-border-decorative-lime-subtle",
  green: "border-border-decorative-green-subtle",
  emerald: "border-border-decorative-emerald-subtle",
  teal: "border-border-decorative-teal-subtle",
  cyan: "border-border-decorative-cyan-subtle",
  sky: "border-border-decorative-sky-subtle",
  blue: "border-border-decorative-blue-subtle",
  indigo: "border-border-decorative-indigo-subtle",
  violet: "border-border-decorative-violet-subtle",
  purple: "border-border-decorative-purple-subtle",
  fuchsia: "border-border-decorative-fuchsia-subtle",
  pink: "border-border-decorative-pink-subtle",
  rose: "border-border-decorative-rose-subtle",
} as const

const decorativeStrongClass = {
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
} as const

const decorativeSubtleClass = {
  red: "text-content-decorative-red-subtle",
  orange: "text-content-decorative-orange-subtle",
  amber: "text-content-decorative-amber-subtle",
  yellow: "text-content-decorative-yellow-subtle",
  lime: "text-content-decorative-lime-subtle",
  green: "text-content-decorative-green-subtle",
  emerald: "text-content-decorative-emerald-subtle",
  teal: "text-content-decorative-teal-subtle",
  cyan: "text-content-decorative-cyan-subtle",
  sky: "text-content-decorative-sky-subtle",
  blue: "text-content-decorative-blue-subtle",
  indigo: "text-content-decorative-indigo-subtle",
  violet: "text-content-decorative-violet-subtle",
  purple: "text-content-decorative-purple-subtle",
  fuchsia: "text-content-decorative-fuchsia-subtle",
  pink: "text-content-decorative-pink-subtle",
  rose: "text-content-decorative-rose-subtle",
} as const

const defaultVariant: BadgeVariant = "neutral"
const defaultSize = "s"

function isSemanticVariant(variant: BadgeVariant): variant is SemanticVariant {
  return (semanticVariants as readonly string[]).includes(variant)
}

function Badge({
  className,
  variant,
  size,
  isEmphasized,
  leadingIcon,
  trailingIcon,
  leadingDot,
  trailingDot,
  children,
  ...props
}: BadgeProps) {
  const resolvedVariant = variant ?? defaultVariant
  const resolvedSize = size ?? defaultSize
  const resolvedIsEmphasized = isEmphasized ?? false
  const canShowIcons = resolvedSize === "s" || resolvedSize === "m"
  const hasLabel = React.Children.count(children) > 0
  const hideAdornmentFromAT = hasLabel ? true : undefined
  const iconSize = resolvedSize === "m" ? "m" : "s"

  const isSemantic = isSemanticVariant(resolvedVariant)

  const toneClass = resolvedIsEmphasized
    ? isSemantic
      ? feedbackColoredClass[resolvedVariant]
      : cn(
          decorativeSurfaceSubtleClass[resolvedVariant],
          decorativeBorderSubtleClass[resolvedVariant]
        )
    : ""

  const labelColorClass = resolvedIsEmphasized
    ? isSemantic
      ? feedbackSubtleClass[resolvedVariant]
      : decorativeSubtleClass[resolvedVariant]
    : "text-content-strong"

  const adornmentColorClass = resolvedIsEmphasized
    ? isSemantic
      ? feedbackSubtleClass[resolvedVariant]
      : decorativeSubtleClass[resolvedVariant]
    : isSemantic
      ? feedbackStrongClass[resolvedVariant]
      : decorativeStrongClass[resolvedVariant]

  const showLeadingIcon = Boolean(canShowIcons && leadingIcon)
  const showTrailingIcon = Boolean(canShowIcons && trailingIcon)
  const showLeadingDot = Boolean(leadingDot && !showLeadingIcon)
  const showTrailingDot = Boolean(trailingDot && !showTrailingIcon)

  return (
    <span
      data-slot="badge"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      data-emphasized={resolvedIsEmphasized || undefined}
      className={cn(
        badgeVariants({
          size: resolvedSize,
          isEmphasized: resolvedIsEmphasized,
        }),
        toneClass,
        className
      )}
      {...props}
    >
      {showLeadingIcon ? (
        <span
          aria-hidden={hideAdornmentFromAT}
          data-slot="icon"
          className={cn(iconVariants({ size: iconSize }), adornmentColorClass)}
        >
          {leadingIcon}
        </span>
      ) : showLeadingDot ? (
        <span
          aria-hidden={hideAdornmentFromAT}
          data-slot="dot"
          className={cn(dotVariants({ size: resolvedSize }), adornmentColorClass)}
        />
      ) : null}
      {hasLabel ? (
        <span
          data-slot="label"
          className={cn(labelVariants({ size: resolvedSize }), labelColorClass)}
        >
          {children}
        </span>
      ) : null}
      {showTrailingIcon ? (
        <span
          aria-hidden={hideAdornmentFromAT}
          data-slot="icon"
          className={cn(iconVariants({ size: iconSize }), adornmentColorClass)}
        >
          {trailingIcon}
        </span>
      ) : showTrailingDot ? (
        <span
          aria-hidden={hideAdornmentFromAT}
          data-slot="dot"
          className={cn(dotVariants({ size: resolvedSize }), adornmentColorClass)}
        />
      ) : null}
    </span>
  )
}

export { Badge, badgeVariants }
