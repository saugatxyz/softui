import * as React from "react"

import { cn } from "@/lib/utils"
import { Crypto, type CryptoType } from "./crypto"
import { Logo, type LogoType } from "./logo"
import { Avatar } from "./avatar"

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

type FeedbackTone = "success" | "warning" | "danger" | "info"

type TablePrefixType =
  | "icon"
  | "token"
  | "logo"
  | "avatar"
  | "icon-emphasized"
  | "icon-emphasized-neutral"
  | `icon-emphasized-${DecorativeColor}`
  | `icon-emphasized-${FeedbackTone}`

// Background color classes for emphasized icon types
const emphasizedBgClass: Record<DecorativeColor | FeedbackTone | "neutral" | "default", string> = {
  default: "bg-actions-secondary-default",
  neutral: "bg-surface-neutral-muted",
  // Feedback tones
  success: "bg-surface-feedback-success-muted",
  warning: "bg-surface-feedback-warning-muted",
  danger: "bg-surface-feedback-danger-muted",
  info: "bg-surface-feedback-info-muted",
  // Decorative colors
  red: "bg-surface-decorative-red-muted",
  orange: "bg-surface-decorative-orange-muted",
  amber: "bg-surface-decorative-amber-muted",
  yellow: "bg-surface-decorative-yellow-muted",
  lime: "bg-surface-decorative-lime-muted",
  green: "bg-surface-decorative-green-muted",
  emerald: "bg-surface-decorative-emerald-muted",
  teal: "bg-surface-decorative-teal-muted",
  cyan: "bg-surface-decorative-cyan-muted",
  sky: "bg-surface-decorative-sky-muted",
  blue: "bg-surface-decorative-blue-muted",
  indigo: "bg-surface-decorative-indigo-muted",
  violet: "bg-surface-decorative-violet-muted",
  purple: "bg-surface-decorative-purple-muted",
  fuchsia: "bg-surface-decorative-fuchsia-muted",
  pink: "bg-surface-decorative-pink-muted",
  rose: "bg-surface-decorative-rose-muted",
}

// Icon color classes for emphasized icon types
const emphasizedIconClass: Record<DecorativeColor | FeedbackTone | "neutral" | "default", string> = {
  default: "text-content-strong",
  neutral: "text-content-subtle",
  // Feedback tones
  success: "text-content-feedback-success-strong",
  warning: "text-content-feedback-warning-strong",
  danger: "text-content-feedback-danger-strong",
  info: "text-content-feedback-info-strong",
  // Decorative colors
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

type TablePrefixSize = "s" | "m" | "l" | "xl"

type TablePrefixProps = {
  type: TablePrefixType
  icon?: React.ReactNode
  token?: CryptoType
  logo?: LogoType
  /** Avatar props for type="avatar" */
  avatarSrc?: string
  avatarInitials?: string
  /** Size variant - automatically set from table context */
  size?: TablePrefixSize
  /** Additional class for the icon (e.g., animate-spin) */
  iconClassName?: string
  className?: string
}

const feedbackTones: FeedbackTone[] = ["success", "warning", "danger", "info"]

function parseEmphasizedColor(type: TablePrefixType): DecorativeColor | FeedbackTone | "neutral" | "default" | null {
  if (type === "icon-emphasized") return "default"
  if (type === "icon-emphasized-neutral") return "neutral"
  if (type.startsWith("icon-emphasized-")) {
    const color = type.replace("icon-emphasized-", "")
    if (feedbackTones.includes(color as FeedbackTone)) return color as FeedbackTone
    if (decorativeColors.includes(color as DecorativeColor)) return color as DecorativeColor
  }
  return null
}

// Size mappings
const sizeConfig: Record<TablePrefixSize, {
  container: number
  emphasizedContainer: number
  emphasizedIcon: number
  icon: number
  avatarSize: "2xs" | "xs" | "s" | "m"
}> = {
  s: { container: 24, emphasizedContainer: 24, emphasizedIcon: 14, icon: 16, avatarSize: "2xs" },
  m: { container: 24, emphasizedContainer: 24, emphasizedIcon: 14, icon: 16, avatarSize: "2xs" },
  l: { container: 36, emphasizedContainer: 36, emphasizedIcon: 17, icon: 16, avatarSize: "m" },
  xl: { container: 36, emphasizedContainer: 36, emphasizedIcon: 17, icon: 16, avatarSize: "m" },
}

function TablePrefix({
  type,
  icon,
  token,
  logo,
  avatarSrc,
  avatarInitials,
  size = "m",
  iconClassName,
  className,
}: TablePrefixProps) {
  const sizes = sizeConfig[size]
  const emphasizedColor = parseEmphasizedColor(type)
  const isEmphasized = emphasizedColor !== null
  const isIcon = type === "icon" || isEmphasized
  const isToken = type === "token"
  const isLogo = type === "logo"
  const isAvatar = type === "avatar"

  // For icon types (plain or emphasized)
  if (isIcon) {
    const needsBackground = isEmphasized
    const bgClass = needsBackground ? emphasizedBgClass[emphasizedColor!] : ""
    const iconColorClass = needsBackground
      ? emphasizedIconClass[emphasizedColor!]
      : "text-content-strong"

    // Plain icon - centered in container
    if (!needsBackground) {
      return (
        <span
          data-slot="table-prefix"
          data-type={type}
          className={cn(
            "flex shrink-0 items-center justify-center",
            className
          )}
          style={{ width: sizes.icon, height: sizes.icon }}
        >
          <span
            className={cn(
              "flex shrink-0 items-center justify-center text-content-strong [&_svg]:size-full",
              iconClassName
            )}
            style={{ width: sizes.icon, height: sizes.icon }}
          >
            {icon}
          </span>
        </span>
      )
    }

    // Emphasized icon - full container with background
    return (
      <span
        data-slot="table-prefix"
        data-type={type}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-[var(--radius-8)] border border-border-subtle",
          bgClass,
          className
        )}
        style={{ width: sizes.emphasizedContainer, height: sizes.emphasizedContainer }}
      >
        <span
          className={cn(
            "flex shrink-0 items-center justify-center [&_svg]:size-full",
            iconColorClass,
            iconClassName
          )}
          style={{ width: sizes.emphasizedIcon, height: sizes.emphasizedIcon }}
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
        data-slot="table-prefix"
        data-type={type}
        className={cn("inline-flex shrink-0 items-center justify-center", className)}
        style={{ width: sizes.container, height: sizes.container }}
      >
        <Crypto crypto={token} size={sizes.container} />
      </span>
    )
  }

  // For logo type
  if (isLogo && logo) {
    return (
      <span
        data-slot="table-prefix"
        data-type={type}
        className={cn("inline-flex shrink-0 items-center justify-center", className)}
        style={{ width: sizes.container, height: sizes.container }}
      >
        <Logo logo={logo} variant="filled" size={sizes.container} />
      </span>
    )
  }

  // For avatar type
  if (isAvatar) {
    return (
      <span
        data-slot="table-prefix"
        data-type={type}
        className={cn("inline-flex shrink-0 items-center justify-center", className)}
      >
        <Avatar size={sizes.avatarSize} src={avatarSrc} initials={avatarInitials} />
      </span>
    )
  }

  // Fallback - empty prefix
  return (
    <span
      data-slot="table-prefix"
      data-type={type}
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: sizes.container, height: sizes.container }}
    />
  )
}

export { TablePrefix, decorativeColors }
export type { TablePrefixProps, TablePrefixType, TablePrefixSize, DecorativeColor }
