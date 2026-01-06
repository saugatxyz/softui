import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { RiUserFill } from "@remixicon/react"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-actions-secondary-default",
  {
    variants: {
      size: {
        "3xs": "size-[20px]",
        "2xs": "size-[24px]",
        xs: "size-[28px]",
        s: "size-[32px]",
        m: "size-[36px]",
        l: "size-[40px]",
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

const imageVariants = cva("absolute inset-0 size-full object-cover")

const fallbackVariants = cva(
  "flex items-center justify-center font-[var(--font-weight-medium)] text-content-strong select-none",
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
  "flex items-center justify-center text-content-strong [&_svg]:size-full",
  {
    variants: {
      size: {
        "3xs": "size-[10px]",
        "2xs": "size-[12px]",
        xs: "size-[14px]",
        s: "size-[16px]",
        m: "size-[18px]",
        l: "size-[20px]",
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
  }

function Avatar({
  className,
  size,
  shape,
  src,
  alt = "",
  initials,
  icon,
  fallback = "icon",
  ...props
}: AvatarProps) {
  const resolvedSize = size ?? "m"
  const resolvedShape = shape ?? "circular"
  const showInitials = fallback === "initials" || initials

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={resolvedSize}
      data-shape={resolvedShape}
      className={cn(
        avatarVariants({ size: resolvedSize, shape: resolvedShape }),
        className
      )}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className={imageVariants()}
        />
      )}
      <AvatarPrimitive.Fallback
        className={cn(fallbackVariants({ size: resolvedSize }))}
      >
        {showInitials ? (
          initials?.slice(0, 2).toUpperCase()
        ) : (
          <span className={cn(iconVariants({ size: resolvedSize }))}>
            {icon ?? <RiUserFill />}
          </span>
        )}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export { Avatar, avatarVariants }
export type { AvatarProps }
