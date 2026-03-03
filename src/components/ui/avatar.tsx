import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { RiUserFill } from "@remixicon/react"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
  {
    variants: {
      size: {
        "3xs": "size-[var(--space-20)]",
        "2xs": "size-[var(--space-24)]",
        xs: "size-[var(--space-28)]",
        s: "size-[var(--space-32)]",
        m: "size-[var(--space-36)]",
        l: "size-[var(--space-40)]",
      },
      shape: {
        square: "rounded-[var(--radius-8)]",
        circular: "rounded-[var(--radius-max)]",
      },
      isEmphasized: {
        true: "border",
        false: "bg-[var(--color-utility-avatar)]",
      },
    },
    defaultVariants: {
      size: "m",
      shape: "circular",
      isEmphasized: false,
    },
  }
)

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

const imageVariants = cva("absolute inset-0 size-full object-cover")

// Size to pixel value mapping for explicit image dimensions (prevents layout shift)
const sizeToPixels: Record<string, number> = {
  "3xs": 20,
  "2xs": 24,
  xs: 28,
  s: 32,
  m: 36,
  l: 40,
}

const fallbackVariants = cva(
  "flex items-center justify-center font-[var(--font-weight-medium)] text-content-subtle select-none",
  {
    variants: {
      size: {
        "3xs": "text-[length:var(--font-size-2xs)] leading-[var(--line-height-2xs)]",
        "2xs": "text-[length:var(--font-size-2xs)] leading-[var(--line-height-2xs)]",
        xs: "text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]",
        s: "text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]",
        m: "text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
        l: "text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const iconVariants = cva(
  "flex items-center justify-center text-content-subtle [&_svg]:size-full",
  {
    variants: {
      size: {
        "3xs": "size-[var(--space-10)]",
        "2xs": "size-[var(--space-12)]",
        xs: "size-[calc(var(--space-16)-var(--space-2))]",
        s: "size-[var(--space-16)]",
        m: "size-[calc(var(--space-20)-var(--space-2))]",
        l: "size-[var(--space-20)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

type AvatarProps = AvatarPrimitive.Root.Props &
  VariantProps<typeof avatarVariants> & {
    src?: string
    alt?: string
    initials?: string
    icon?: React.ReactNode
    fallback?: "initials" | "icon"
    color?: DecorativeColor
    /** Explicit escape hatch for intentional structural overrides. */
    unsafeClassName?: string
  }

function Avatar({
  className,
  size,
  shape,
  isEmphasized,
  src,
  alt = "",
  initials,
  icon,
  fallback = "icon",
  color,
  unsafeClassName,
  ...props
}: AvatarProps) {
  const resolvedSize = size ?? "m"
  const resolvedShape = shape ?? "circular"
  const resolvedIsEmphasized = isEmphasized ?? false
  const showInitials = fallback === "initials" || initials

  const colorClass =
    resolvedIsEmphasized && color
      ? cn(decorativeSurfaceSubtleClass[color], decorativeBorderSubtleClass[color])
      : ""

  const textColorClass =
    resolvedIsEmphasized && color ? decorativeSubtleClass[color] : ""

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={resolvedSize}
      data-shape={resolvedShape}
      data-color={color || undefined}
      data-emphasized={resolvedIsEmphasized || undefined}
      className={cn(
        className,
        avatarVariants({
          size: resolvedSize,
          shape: resolvedShape,
          isEmphasized: resolvedIsEmphasized,
        }),
        colorClass,
        unsafeClassName
      )}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          width={sizeToPixels[resolvedSize]}
          height={sizeToPixels[resolvedSize]}
          className={imageVariants()}
        />
      )}
      <AvatarPrimitive.Fallback
        className={cn(fallbackVariants({ size: resolvedSize }), textColorClass)}
      >
        {showInitials ? (
          initials?.slice(0, 2).toUpperCase()
        ) : (
          <span className={cn(iconVariants({ size: resolvedSize }), textColorClass)}>
            {icon ?? <RiUserFill />}
          </span>
        )}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export { Avatar, avatarVariants, decorativeColors }
export type { AvatarProps, DecorativeColor }
