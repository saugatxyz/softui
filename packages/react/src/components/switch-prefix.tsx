import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"
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

type ContainerStyle = "subtle" | "strong"
type ContainerColor = "default" | "neutral" | DecorativeColor

type PrefixType = "icon" | "token" | "logo"

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

// Background color classes for subtle container style
const subtleBgClass: Record<ContainerColor, string> = {
  default: "bg-actions-secondary-default",
  neutral: "bg-surface-interactive-default",
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

// Icon color classes for subtle container style
const subtleIconClass: Record<ContainerColor, string> = {
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

// Background color classes for strong container style
const strongBgClass: Record<ContainerColor, string> = {
  default: "bg-actions-primary-default",
  neutral: "bg-surface-inverse",
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

// Icon color classes for strong container style
const strongIconClass: Record<ContainerColor, string> = {
  default: "text-content-on-accent-strong",
  neutral: "text-content-on-accent-strong",
  red: "text-content-inverse-strong",
  orange: "text-content-inverse-strong",
  amber: "text-content-inverse-strong",
  yellow: "text-content-inverse-strong",
  lime: "text-content-inverse-strong",
  green: "text-content-inverse-strong",
  emerald: "text-content-inverse-strong",
  teal: "text-content-inverse-strong",
  cyan: "text-content-inverse-strong",
  sky: "text-content-inverse-strong",
  blue: "text-content-inverse-strong",
  indigo: "text-content-inverse-strong",
  violet: "text-content-inverse-strong",
  purple: "text-content-inverse-strong",
  fuchsia: "text-content-inverse-strong",
  pink: "text-content-inverse-strong",
  rose: "text-content-inverse-strong",
}

type SwitchPrefixProps = VariantProps<typeof prefixVariants> & {
  type: PrefixType
  icon?: React.ReactNode
  token?: CryptoType
  logo?: LogoType
  containerStyle?: ContainerStyle
  containerColor?: ContainerColor
  className?: string
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
}

function SwitchPrefix({
  type,
  size = "s",
  icon,
  token,
  logo,
  containerStyle,
  containerColor = "default",
  className,
  unsafeClassName,
}: SwitchPrefixProps) {
  const resolvedSize = size ?? "s"
  const iconSize = resolvedSize === "m" ? 17 : 16
  const assetSize = resolvedSize === "m" ? 40 : 28

  const isIcon = type === "icon"
  const isToken = type === "token"
  const isLogo = type === "logo"

  // For icon types (plain or with container)
  if (isIcon) {
    const hasContainer = containerStyle !== undefined

    // Plain icon - no container
    if (!hasContainer) {
      if (resolvedSize === "s") {
        return (
          <span
            data-slot="switch-prefix"
            data-type={type}
            data-size={resolvedSize}
            className={cn(className, "flex shrink-0 items-start pt-[var(--space-2)]", unsafeClassName)}
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
          data-slot="switch-prefix"
          data-type={type}
          data-size={resolvedSize}
          className={cn(className, iconWrapperVariants({ size: resolvedSize }), unsafeClassName)}
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

    // Container icon - subtle or strong
    const bgClass = containerStyle === "strong"
      ? strongBgClass[containerColor]
      : subtleBgClass[containerColor]
    const iconColorClass = containerStyle === "strong"
      ? strongIconClass[containerColor]
      : subtleIconClass[containerColor]

    return (
      <span
        data-slot="switch-prefix"
        data-type={type}
        data-size={resolvedSize}
        data-container-style={containerStyle}
        data-container-color={containerColor}
        className={cn(
          className,
          iconWrapperVariants({ size: resolvedSize }),
          bgClass,
          unsafeClassName
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
        data-slot="switch-prefix"
        data-type={type}
        data-size={resolvedSize}
        className={cn(className, prefixVariants({ size: resolvedSize }), unsafeClassName)}
      >
        <Crypto crypto={token} size={assetSize} />
      </span>
    )
  }

  // For logo type
  if (isLogo && logo) {
    return (
      <span
        data-slot="switch-prefix"
        data-type={type}
        data-size={resolvedSize}
        className={cn(className, prefixVariants({ size: resolvedSize }), unsafeClassName)}
      >
        <Logo logo={logo} variant="filled" size={assetSize} />
      </span>
    )
  }

  // Fallback - empty prefix
  return (
    <span
      data-slot="switch-prefix"
      data-type={type}
      data-size={resolvedSize}
      className={cn(className, prefixVariants({ size: resolvedSize }), unsafeClassName)}
    />
  )
}

export { SwitchPrefix, decorativeColors }
export type { SwitchPrefixProps, PrefixType, DecorativeColor, ContainerStyle, ContainerColor }
