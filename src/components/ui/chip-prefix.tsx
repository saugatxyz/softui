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

type ChipPrefixType =
  | "avatar"
  | "token"
  | "logo"
  | "icon-emphasized"
  | "icon-emphasized-neutral"
  | `icon-emphasized-${DecorativeColor}`

const prefixSizeVariants = cva(
  "inline-flex shrink-0 items-center justify-center",
  {
    variants: {
      size: {
        s: "size-[20px]",
        m: "size-[24px]",
      },
    },
    defaultVariants: {
      size: "s",
    },
  }
)

const iconWrapperVariants = cva(
  "flex items-center justify-center rounded-[var(--radius-max)]",
  {
    variants: {
      size: {
        s: "size-[20px] px-[var(--space-4)]",
        m: "size-[24px] px-[var(--space-4)]",
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

type ChipPrefixProps = VariantProps<typeof prefixSizeVariants> & {
  type: ChipPrefixType
  icon?: React.ReactNode
  token?: CryptoType
  logo?: LogoType
  src?: string
  alt?: string
  className?: string
}

function parseEmphasizedColor(type: ChipPrefixType): DecorativeColor | "neutral" | "default" | null {
  if (type === "icon-emphasized") return "default"
  if (type === "icon-emphasized-neutral") return "neutral"
  if (type.startsWith("icon-emphasized-")) {
    const color = type.replace("icon-emphasized-", "") as DecorativeColor
    if (decorativeColors.includes(color)) return color
  }
  return null
}

function ChipPrefix({
  type,
  size = "s",
  icon,
  token,
  logo,
  src,
  alt = "",
  className,
}: ChipPrefixProps) {
  const resolvedSize = size ?? "s"
  const iconSize = resolvedSize === "m" ? 16 : 12
  const assetSize = resolvedSize === "m" ? 24 : 20

  const emphasizedColor = parseEmphasizedColor(type)
  const isEmphasized = emphasizedColor !== null
  const isAvatar = type === "avatar"
  const isToken = type === "token"
  const isLogo = type === "logo"

  // For emphasized icon types
  if (isEmphasized) {
    const bgClass = emphasizedBgClass[emphasizedColor!]
    const iconColorClass = emphasizedColor !== "default"
      ? "text-content-inverse-strong"
      : "text-content-strong"

    return (
      <span
        data-slot="chip-prefix"
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

  // For avatar type (image)
  if (isAvatar) {
    return (
      <span
        data-slot="chip-prefix"
        data-type={type}
        data-size={resolvedSize}
        className={cn(
          prefixSizeVariants({ size: resolvedSize }),
          "overflow-hidden rounded-[var(--radius-max)]",
          className
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="size-full object-cover"
          />
        ) : (
          <span className="size-full bg-actions-secondary-default" />
        )}
      </span>
    )
  }

  // For token type
  if (isToken && token) {
    return (
      <span
        data-slot="chip-prefix"
        data-type={type}
        data-size={resolvedSize}
        className={cn(prefixSizeVariants({ size: resolvedSize }), className)}
      >
        <Crypto crypto={token} size={assetSize} />
      </span>
    )
  }

  // For logo type
  if (isLogo && logo) {
    return (
      <span
        data-slot="chip-prefix"
        data-type={type}
        data-size={resolvedSize}
        className={cn(
          prefixSizeVariants({ size: resolvedSize }),
          "overflow-hidden rounded-[var(--radius-max)]",
          className
        )}
      >
        <Logo logo={logo} variant="filled" size={assetSize} />
      </span>
    )
  }

  // Fallback - empty prefix
  return (
    <span
      data-slot="chip-prefix"
      data-type={type}
      data-size={resolvedSize}
      className={cn(prefixSizeVariants({ size: resolvedSize }), className)}
    />
  )
}

export { ChipPrefix, decorativeColors }
export type { ChipPrefixProps, ChipPrefixType, DecorativeColor }
