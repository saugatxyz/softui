"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const feedbackTones = ["default", "info", "warning", "danger", "success"] as const
const decorativeTones = [
  "red", "orange", "amber", "yellow", "lime", "green", "emerald",
  "teal", "cyan", "sky", "blue", "indigo", "violet", "purple",
  "fuchsia", "pink", "rose",
] as const

type FeedbackTone = (typeof feedbackTones)[number]
type DecorativeTone = (typeof decorativeTones)[number]
type ButtonGroupItemTone = FeedbackTone | DecorativeTone

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

function isFeedbackTone(tone: ButtonGroupItemTone): tone is FeedbackTone {
  return (feedbackTones as readonly string[]).includes(tone)
}

function getToneClass(tone: ButtonGroupItemTone | undefined): string {
  if (!tone) return ""
  return isFeedbackTone(tone) ? feedbackToneClass[tone] : decorativeToneClass[tone]
}

type ButtonGroupSize = "xs" | "s" | "m" | "l"

type ButtonGroupContextValue = {
  size: ButtonGroupSize
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(null)

function useButtonGroup() {
  const context = React.useContext(ButtonGroupContext)
  if (!context) {
    throw new Error("ButtonGroupItem must be used within a ButtonGroup")
  }
  return context
}

const buttonGroupVariants = cva(
  "inline-flex items-center rounded-[var(--radius-max)] bg-actions-tertiary-default backdrop-blur-[12px] shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]",
  {
    variants: {
      size: {
        xs: "h-[var(--space-28)]",
        s: "h-[var(--space-32)]",
        m: "h-[var(--space-36)]",
        l: "h-[var(--space-40)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

type ButtonGroupProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof buttonGroupVariants>

function ButtonGroup({
  className,
  size = "m",
  children,
  ...props
}: ButtonGroupProps) {
  const childArray = React.Children.toArray(children)
  const count = childArray.length

  return (
    <ButtonGroupContext.Provider value={{ size: size ?? "m" }}>
      <div
        role="group"
        data-slot="button-group"
        data-size={size}
        className={cn(buttonGroupVariants({ size, className }))}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child

          const position =
            count === 1
              ? "only"
              : index === 0
                ? "first"
                : index === count - 1
                  ? "last"
                  : "middle"

          return React.cloneElement(child as React.ReactElement<{ position?: string }>, {
            position,
          })
        })}
      </div>
    </ButtonGroupContext.Provider>
  )
}

const itemVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap font-[var(--font-weight-medium)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] transition-[background-color,color,box-shadow] outline-none select-none bg-transparent text-content-strong hover:enabled:bg-actions-tertiary-hover active:enabled:scale-[0.98] disabled:cursor-not-allowed disabled:text-content-disabled focus-visible:z-10 focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
  {
    variants: {
      size: {
        xs: "h-full gap-[var(--space-2)] px-[var(--space-10)]",
        s: "h-full gap-[var(--space-4)] px-[var(--space-12)]",
        m: "h-full gap-[var(--space-4)] px-[var(--space-16)]",
        l: "h-full gap-[var(--space-4)] px-[var(--space-16)]",
      },
      position: {
        only: "rounded-[var(--radius-max)]",
        first: "rounded-l-[var(--radius-max)] rounded-r-none border-r border-r-[var(--color-border-interactive-default)]",
        middle: "rounded-none border-r border-r-[var(--color-border-interactive-default)]",
        last: "rounded-r-[var(--radius-max)] rounded-l-none",
      },
    },
    defaultVariants: {
      size: "m",
      position: "only",
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

const iconVariants = cva(
  "flex shrink-0 items-center justify-center text-current [&_svg]:size-full [&_svg]:shrink-0 [&_svg]:text-current",
  {
    variants: {
      size: {
        xs: "size-[16px]",
        s: "size-[16px]",
        m: "size-[16px]",
        l: "size-[18px]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

type ButtonGroupItemProps = ButtonPrimitive.Props & {
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  position?: "only" | "first" | "middle" | "last"
  tone?: ButtonGroupItemTone
}

function ButtonGroupItem({
  className,
  leadingIcon,
  trailingIcon,
  position = "only",
  tone,
  children,
  ...props
}: ButtonGroupItemProps) {
  const { size } = useButtonGroup()
  const hasLabel = React.Children.count(children) > 0
  const hideIconFromAT = hasLabel ? true : undefined
  const toneClass = getToneClass(tone)

  return (
    <ButtonPrimitive
      data-slot="button-group-item"
      data-size={size}
      data-position={position}
      data-tone={tone}
      className={cn(itemVariants({ size, position, className }), toneClass)}
      {...props}
    >
      <span
        data-slot="content"
        className="inline-flex items-center justify-center transition-transform [gap:inherit] active:scale-[0.94]"
      >
        {leadingIcon ? (
          <span
            aria-hidden={hideIconFromAT}
            data-slot="icon"
            className={cn(iconVariants({ size }))}
          >
            {leadingIcon}
          </span>
        ) : null}
        {hasLabel ? (
          <span data-slot="label" className={cn(labelVariants({ size }))}>
            {children}
          </span>
        ) : null}
        {trailingIcon ? (
          <span
            aria-hidden={hideIconFromAT}
            data-slot="icon"
            className={cn(iconVariants({ size }))}
          >
            {trailingIcon}
          </span>
        ) : null}
      </span>
    </ButtonPrimitive>
  )
}

export { ButtonGroup, ButtonGroupItem }
