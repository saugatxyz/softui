import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Crypto, type CryptoType } from "./crypto"
import { Logo, type LogoType } from "./logo"

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

type DecorativeColor = (typeof decorativeColors)[number]

type PrefixType =
  | "icon"
  | "token"
  | "logo"
  | "icon-emphasized"
  | "icon-emphasized-neutral"
  | `icon-emphasized-${DecorativeColor}`

const prefixVariants = cva(
  "inline-flex shrink-0 items-center justify-center",
  {
    variants: {
      size: {
        s: "size-[var(--space-24)]",
        m: "size-[var(--space-36)]",
      },
    },
    defaultVariants: {
      size: "s",
    },
  }
)

const iconWrapperVariants = cva(
  "flex items-center justify-center rounded-[var(--radius-8)] px-[var(--space-4)] py-0",
  {
    variants: {
      size: {
        s: "size-[var(--space-24)]",
        m: "size-[var(--space-36)]",
      },
    },
    defaultVariants: {
      size: "s",
    },
  }
)

// Background color classes for emphasized icon types
const emphasizedBgClass: Record<DecorativeColor | "neutral" | "default", string> = {
  default: "bg-actions-secondary-default",
  neutral: "bg-neutral-600",
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
}

type RadioPrefixProps = VariantProps<typeof prefixVariants> & {
  type: PrefixType
  icon?: React.ReactNode
  token?: CryptoType
  logo?: LogoType
  className?: string
}

function parseEmphasizedColor(type: PrefixType): DecorativeColor | "neutral" | "default" | null {
  if (type === "icon-emphasized") return "default"
  if (type === "icon-emphasized-neutral") return "neutral"
  if (type.startsWith("icon-emphasized-")) {
    const color = type.replace("icon-emphasized-", "") as DecorativeColor
    if (decorativeColors.includes(color)) return color
  }
  return null
}

function RadioPrefix({
  type,
  size = "s",
  icon,
  token,
  logo,
  className,
}: RadioPrefixProps) {
  const resolvedSize = size ?? "s"
  const iconSize = resolvedSize === "m" ? 16 : 16
  const assetSize = resolvedSize === "m" ? 36 : 24

  const emphasizedColor = parseEmphasizedColor(type)
  const isEmphasized = emphasizedColor !== null
  const isIcon = type === "icon" || isEmphasized
  const isToken = type === "token"
  const isLogo = type === "logo"

  // For icon types (plain or emphasized)
  if (isIcon) {
    const needsBackground = isEmphasized
    const bgClass = needsBackground ? emphasizedBgClass[emphasizedColor!] : ""
    const iconColorClass = needsBackground && emphasizedColor !== "default"
      ? "text-content-inverse-strong"
      : "text-content-strong"

    return (
      <span
        data-slot="radio-prefix"
        data-type={type}
        data-size={resolvedSize}
        className={cn(
          iconWrapperVariants({ size: resolvedSize }),
          bgClass,
          className
        )}
      >
        <span
          className={cn(
            "flex shrink-0 items-center justify-center [&_svg]:size-full",
            iconColorClass
          )}
          style={{ width: iconSize, height: iconSize }}
        >
          {icon}
        </span>
      </span>
    )
  }

  // For token type
  if (isToken && token) {
    return (
      <span
        data-slot="radio-prefix"
        data-type={type}
        data-size={resolvedSize}
        className={cn(prefixVariants({ size: resolvedSize }), className)}
      >
        <Crypto crypto={token} size={assetSize} />
      </span>
    )
  }

  // For logo type
  if (isLogo && logo) {
    return (
      <span
        data-slot="radio-prefix"
        data-type={type}
        data-size={resolvedSize}
        className={cn(prefixVariants({ size: resolvedSize }), className)}
      >
        <Logo logo={logo} variant="filled" size={assetSize} />
      </span>
    )
  }

  // Fallback - empty prefix
  return (
    <span
      data-slot="radio-prefix"
      data-type={type}
      data-size={resolvedSize}
      className={cn(prefixVariants({ size: resolvedSize }), className)}
    />
  )
}

export { RadioPrefix, decorativeColors }
export type { RadioPrefixProps, PrefixType, DecorativeColor }
