"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { RiCheckboxCircleFill, RiArrowRightSLine } from "@remixicon/react"

import { cn } from "@/lib/utils"
import { SwitchControl } from "./switch-control"

const menuSuffixVariants = cva(
  "flex shrink-0 items-center justify-center",
  {
    variants: {
      type: {
        checkmark: "w-[var(--space-20)] h-[var(--space-24)] px-[var(--space-2)] py-[var(--space-4)]",
        submenu: "ml-auto w-[var(--space-20)] h-[var(--space-24)] px-[var(--space-2)] py-[var(--space-4)]",
        switch: "ml-auto w-[var(--space-40)] h-[var(--space-24)] px-[var(--space-2)] py-[var(--space-2)]",
        icon: "w-[var(--space-20)] h-[var(--space-24)] px-[var(--space-2)] py-[var(--space-4)]",
      },
    },
    defaultVariants: {
      type: "checkmark",
    },
  }
)

const iconVariants = cva(
  "flex shrink-0 items-center justify-center [&_svg]:size-full [&_svg]:shrink-0",
  {
    variants: {
      type: {
        checkmark: "size-[var(--space-16)] text-actions-primary-default",
        submenu: "size-[var(--space-16)] text-content-subtle",
        icon: "size-[var(--space-16)] text-content-subtle",
      },
    },
    defaultVariants: {
      type: "checkmark",
    },
  }
)

type MenuSuffixProps = VariantProps<typeof menuSuffixVariants> & {
  icon?: React.ReactNode
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

function MenuSuffix({
  type = "checkmark",
  icon,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
}: MenuSuffixProps) {
  return (
    <span
      data-slot="menu-suffix"
      data-type={type}
      className={cn(menuSuffixVariants({ type }), "pointer-events-none", className)}
    >
      {type === "checkmark" && (
        <span className={cn(iconVariants({ type: "checkmark" }))}>
          <RiCheckboxCircleFill />
        </span>
      )}
      {type === "submenu" && (
        <span className={cn(iconVariants({ type: "submenu" }))}>
          <RiArrowRightSLine />
        </span>
      )}
      {type === "switch" && (
        <SwitchControl
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
        />
      )}
      {type === "icon" && (
        <span className={cn(iconVariants({ type: "icon" }))}>
          {icon}
        </span>
      )}
    </span>
  )
}

export { MenuSuffix, menuSuffixVariants }
export type { MenuSuffixProps }
