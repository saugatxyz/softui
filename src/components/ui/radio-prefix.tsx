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
        s: "size-[var(--space-28)]",
        m: "size-[var(--space-40)]",
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
        s: "size-[var(--space-28)]",
        m: "size-[var(--space-40)]",
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
  neutral: "bg-surface-neutral-subtle",
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
}

// Icon color classes for emphasized icon types
const emphasizedIconClass: Record<DecorativeColor | "neutral" | "default", string> = {
  default: "text-content-strong",
  neutral: "text-content-subtle",
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
  const iconSize = resolvedSize === "m" ? 17 : 16
  const assetSize = resolvedSize === "m" ? 40 : 28

  const emphasizedColor = parseEmphasizedColor(type)
  const isEmphasized = emphasizedColor !== null
  const isIcon = type === "icon" || isEmphasized
  const isToken = type === "token"
  const isLogo = type === "logo"

  // For icon types (plain or emphasized)
  if (isIcon) {
    const needsBackground = isEmphasized
    const bgClass = needsBackground ? emphasizedBgClass[emphasizedColor!] : ""
    const iconColorClass = needsBackground
      ? emphasizedIconClass[emphasizedColor!]
      : "text-content-strong"

    // Plain icon - small: tight width, top-aligned; medium: centered in container
    if (!needsBackground) {
      if (resolvedSize === "s") {
        return (
          <span
            data-slot="radio-prefix"
            data-type={type}
            data-size={resolvedSize}
            className={cn("flex shrink-0 items-start pt-[var(--space-2)]", className)}
            style={{ width: iconSize }}
          >
            <span
              className="flex shrink-0 items-center justify-center text-content-strong [&_svg]:size-full"
              style={{ width: iconSize, height: iconSize }}
            >
              {icon}
            </span>
          </span>
        )
      }
      return (
        <span
          data-slot="radio-prefix"
          data-type={type}
          data-size={resolvedSize}
          className={cn(iconWrapperVariants({ size: resolvedSize }), className)}
        >
          <span
            className="flex shrink-0 items-center justify-center text-content-strong [&_svg]:size-full"
            style={{ width: iconSize, height: iconSize }}
          >
            {icon}
          </span>
        </span>
      )
    }

    // Emphasized icon - full container with background
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
