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

const AVATAR_GAP = 2 // matches --space-2

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
  "inline-flex shrink-0 items-center justify-center rounded-[var(--radius-max)] bg-[var(--color-utility-avatar)] font-[var(--font-weight-medium)] text-content-subtle select-none",
  {
    variants: {
      size: {
        "3xs": "size-[var(--space-20)] text-[length:var(--font-size-2xs)] leading-[var(--line-height-2xs)]",
        "2xs": "size-[var(--space-24)] text-[length:var(--font-size-2xs)] leading-[var(--line-height-2xs)]",
        xs: "size-[var(--space-28)] text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]",
        s: "size-[var(--space-32)] text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]",
        m: "size-[var(--space-36)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
        l: "size-[var(--space-40)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

type AvatarGroupProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof avatarGroupVariants> & {
    max?: number
    children?: React.ReactNode
  }

function AvatarGroup({
  className,
  size,
  max = 4,
  children,
  ...props
}: AvatarGroupProps) {
  const resolvedSize = size ?? "m"
  const config = sizeConfig[resolvedSize]
  const [useWebkitGap, setUseWebkitGap] = React.useState(false)
  const avatars = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<AvatarProps> =>
      React.isValidElement(child)
  )

  const visibleAvatars = max ? avatars.slice(0, max) : avatars
  const overflowCount = avatars.length - visibleAvatars.length
  const hasOverflow = overflowCount > 0

  React.useEffect(() => {
    const ua = navigator.userAgent
    const isWebKit = /AppleWebKit/.test(ua) && !/Chrome|Chromium|Edg/.test(ua)
    setUseWebkitGap(isWebKit)
  }, [])

  const getMaskStyle = (isLast: boolean): React.CSSProperties | undefined => {
    if (isLast || useWebkitGap) return undefined

    const avatarRadius = config.px / 2
    const maskRadius = avatarRadius + AVATAR_GAP
    const maskCenterX = config.px - config.overlap + avatarRadius

    return {
      maskImage: `radial-gradient(circle at ${maskCenterX}px 50%, transparent ${maskRadius}px, black ${maskRadius}px)`,
    }
  }

  return (
    <div
      data-slot="avatar-group"
      data-size={resolvedSize}
      className={cn(
        avatarGroupVariants({ size: resolvedSize }),
        useWebkitGap && "gap-[var(--space-2)]",
        className
      )}
      {...props}
    >
      {visibleAvatars.map((avatar, index) => {
        const isLastItem = !hasOverflow && index === visibleAvatars.length - 1
        return React.cloneElement(avatar, {
          key: avatar.key ?? index,
          size: resolvedSize,
          shape: "circular",
          style: useWebkitGap
            ? avatar.props.style
            : {
                width: config.px,
                height: config.px,
                borderRadius: "var(--radius-max)",
                zIndex: index + 1,
                position: "relative" as const,
                marginLeft: index > 0 ? -config.overlap : undefined,
                ...getMaskStyle(isLastItem),
                ...avatar.props.style,
              },
        })
      })}
      {hasOverflow && (
        <div
          data-slot="avatar-overflow"
          className={cn(overflowVariants({ size: resolvedSize }))}
          style={
            useWebkitGap
              ? undefined
              : {
                  zIndex: 100,
                  position: "relative",
                  marginLeft: -config.overlap,
                }
          }
        >
          +{overflowCount}
        </div>
      )}
    </div>
  )
}

export { AvatarGroup, avatarGroupVariants }
export type { AvatarGroupProps }
