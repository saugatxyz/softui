"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { type AvatarProps } from "./avatar"

const sizeConfig = {
  "3xs": { overlap: 6, px: 20 },
  "2xs": { overlap: 8, px: 24 },
  xs: { overlap: 10, px: 28 },
  s: { overlap: 10, px: 32 },
  m: { overlap: 12, px: 36 },
  l: { overlap: 12, px: 40 },
} as const

const shapeRadius = {
  circular: "var(--radius-max)",
  square: "var(--radius-8)",
} as const

type Size = keyof typeof sizeConfig

const avatarGroupVariants = cva("flex items-center", {
  variants: {
    size: {
      "3xs": "",
      "2xs": "",
      xs: "",
      s: "",
      m: "",
      l: "",
    },
  },
  defaultVariants: {
    size: "m",
  },
})

const overflowVariants = cva(
  "inline-flex shrink-0 items-center justify-center bg-actions-secondary-default backdrop-blur-[10px] font-[var(--font-weight-medium)] text-content-strong select-none shadow-[0_0_0_2px_var(--color-surface-page)]",
  {
    variants: {
      size: {
        "3xs": "size-[20px] text-[length:var(--font-size-2xs)] leading-[var(--line-height-2xs)]",
        "2xs": "size-[24px] text-[length:var(--font-size-2xs)] leading-[var(--line-height-2xs)]",
        xs: "size-[28px] text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]",
        s: "size-[32px] text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]",
        m: "size-[36px] text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
        l: "size-[40px] text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
      },
      shape: {
        square: "rounded-[var(--radius-8)]",
        circular: "rounded-[var(--radius-max)]",
      },
    },
    defaultVariants: {
      size: "m",
      shape: "circular",
    },
  }
)

type AvatarGroupProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof avatarGroupVariants> & {
    max?: number
    shape?: "square" | "circular"
    children?: React.ReactNode
  }

function AvatarGroup({
  className,
  size,
  shape = "circular",
  max = 4,
  children,
  ...props
}: AvatarGroupProps) {
  const resolvedSize = size ?? "m"
  const resolvedShape = shape ?? "circular"
  const config = sizeConfig[resolvedSize]

  const avatars = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<AvatarProps> =>
      React.isValidElement(child)
  )

  const visibleAvatars = max ? avatars.slice(0, max) : avatars
  const overflowCount = avatars.length - visibleAvatars.length
  const hasOverflow = overflowCount > 0
  const totalItems = hasOverflow ? visibleAvatars.length + 1 : visibleAvatars.length

  return (
    <div
      data-slot="avatar-group"
      data-size={resolvedSize}
      data-shape={resolvedShape}
      className={cn(avatarGroupVariants({ size: resolvedSize }), className)}
      {...props}
    >
      {visibleAvatars.map((avatar, index) =>
        React.cloneElement(avatar, {
          key: avatar.key ?? index,
          size: resolvedSize,
          shape: resolvedShape,
          className: cn(
            "shadow-[0_0_0_2px_var(--color-surface-page)]",
            avatar.props.className
          ),
          style: {
            width: config.px,
            height: config.px,
            borderRadius: shapeRadius[resolvedShape],
            zIndex: index + 1,
            position: "relative" as const,
            marginLeft: index > 0 ? -config.overlap : undefined,
          },
        })
      )}
      {hasOverflow && (
        <div
          data-slot="avatar-overflow"
          className={cn(
            overflowVariants({ size: resolvedSize, shape: resolvedShape })
          )}
          style={{
            zIndex: totalItems,
            position: "relative",
            marginLeft: -config.overlap,
          }}
        >
          +{overflowCount}
        </div>
      )}
    </div>
  )
}

export { AvatarGroup, avatarGroupVariants }
export type { AvatarGroupProps }
