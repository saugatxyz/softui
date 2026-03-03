"use client"

import * as React from "react"
import { Menu } from "@base-ui/react/menu"

import { cn } from "../lib/utils"

type MenuSeparatorProps = Omit<Menu.Separator.Props, "className"> & {
  className?: string
}

function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <Menu.Separator
      data-slot="menu-separator"
      className={cn(
        "flex h-[var(--space-4)] w-full items-center px-[var(--space-8)]",
        className
      )}
      {...props}
    >
      <span className="h-px w-full bg-border-subtle" />
    </Menu.Separator>
  )
}

export { MenuSeparator }
export type { MenuSeparatorProps }
