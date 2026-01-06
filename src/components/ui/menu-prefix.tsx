"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

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
  "neutral",
] as const

type DecorativeColor = (typeof decorativeColors)[number]

const menuPrefixVariants = cva(
  "flex size-[24px] shrink-0 items-center justify-center",
  {
    variants: {
      type: {
        icon: "",
        "danger-icon": "",
        avatar: "",
        company: "",
        token: "",
        "icon-emphasized": "rounded-[var(--radius-8)]",
      },
    },
    defaultVariants: {
      type: "icon",
    },
  }
)

const iconVariants = cva(
  "flex shrink-0 items-center justify-center [&_svg]:size-full [&_svg]:shrink-0 size-[16px]",
  {
    variants: {
      type: {
        icon: "",
        "danger-icon": "",
        "icon-emphasized": "",
      },
    },
    defaultVariants: {
      type: "icon",
    },
  }
)

const decorativeSurfaceStrongClass: Record<DecorativeColor, string> = {
  red: "bg-surface-decorative-red-strong",
  orange: "bg-surface-decorative-orange-strong",
  amber: "bg-surface-decorative-amber-strong",
  yellow: "bg-surface-decorative-yellow-strong",
  lime: "bg-surface-decorative-lime-strong",
  green: "bg-surface-decorative-green-strong",
  emerald: "bg-surface-decorative-emerald-strong",
  teal: "bg-surface-decorative-teal-strong",
  cyan: "bg-surface-decorative-cyan-strong",
  sky: "bg-surface-decorative-sky-strong",
  blue: "bg-surface-decorative-blue-strong",
  indigo: "bg-surface-decorative-indigo-strong",
  violet: "bg-surface-decorative-violet-strong",
  purple: "bg-surface-decorative-purple-strong",
  fuchsia: "bg-surface-decorative-fuchsia-strong",
  pink: "bg-surface-decorative-pink-strong",
  rose: "bg-surface-decorative-rose-strong",
  neutral: "bg-neutral-600",
}

type MenuPrefixProps = VariantProps<typeof menuPrefixVariants> & {
  icon?: React.ReactNode
  /** Color for icon-emphasized type */
  color?: DecorativeColor | "default"
  /** Disabled state */
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

function MenuPrefix({
  type = "icon",
  icon,
  color,
  disabled,
  className,
  children,
}: MenuPrefixProps) {
  const isIconEmphasized = type === "icon-emphasized"
  const isDangerIcon = type === "danger-icon"
  const isIcon = type === "icon"

  // For icon-emphasized type with color
  const colorClass = isIconEmphasized
    ? color && color !== "default"
      ? decorativeSurfaceStrongClass[color]
      : "bg-actions-secondary-default"
    : ""

  // Icon color based on type and disabled state
  const getIconColorClass = () => {
    if (isIconEmphasized) {
      if (disabled) return "text-content-disabled"
      return color && color !== "default" ? "text-white" : "text-content-strong"
    }
    if (isDangerIcon) {
      return disabled ? "text-content-feedback-danger-disabled" : "text-content-feedback-danger-strong"
    }
    // Default icon
    return disabled ? "text-content-disabled" : "text-content-strong"
  }

  return (
    <span
      data-slot="menu-prefix"
      data-type={type}
      data-color={color}
      data-disabled={disabled || undefined}
      className={cn(menuPrefixVariants({ type }), colorClass, className)}
    >
      {(isIcon || isDangerIcon || isIconEmphasized) && (
        <span className={cn(iconVariants({ type }), getIconColorClass())}>
          {icon ?? children}
        </span>
      )}
      {(type === "avatar" || type === "company" || type === "token") && (children ?? icon)}
    </span>
  )
}

export { MenuPrefix, menuPrefixVariants, decorativeColors }
export type { MenuPrefixProps, DecorativeColor }
