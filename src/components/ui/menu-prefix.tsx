"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const menuPrefixVariants = cva(
  "flex shrink-0 items-center justify-center",
  {
    variants: {
      type: {
        icon: "",
        "danger-icon": "",
        avatar: "",
        company: "",
        token: "",
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
      },
    },
    defaultVariants: {
      type: "icon",
    },
  }
)

type MenuPrefixProps = VariantProps<typeof menuPrefixVariants> & {
  icon?: React.ReactNode
  /** Disabled state */
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

function MenuPrefix({
  type = "icon",
  icon,
  disabled,
  className,
  children,
}: MenuPrefixProps) {
  const isDangerIcon = type === "danger-icon"
  const isIcon = type === "icon"

  // Icon color based on type and disabled state
  const getIconColorClass = () => {
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
      data-disabled={disabled || undefined}
      className={cn(menuPrefixVariants({ type }), className)}
    >
      {(isIcon || isDangerIcon) && (
        <span className={cn(iconVariants({ type }), getIconColorClass())}>
          {icon ?? children}
        </span>
      )}
      {(type === "avatar" || type === "company" || type === "token") && (children ?? icon)}
    </span>
  )
}

export { MenuPrefix, menuPrefixVariants }
export type { MenuPrefixProps }
