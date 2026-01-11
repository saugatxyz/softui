"use client"

import * as React from "react"
import { Menu } from "@base-ui/react/menu"

import { cn } from "@/lib/utils"

type MenuGroupProps = Omit<Menu.Group.Props, "className"> & {
  className?: string
}

function MenuGroup({ className, children, ...props }: MenuGroupProps) {
  return (
    <Menu.Group
      data-slot="menu-group"
      className={cn("flex w-full flex-col", className)}
      {...props}
    >
      {children}
    </Menu.Group>
  )
}

type MenuGroupLabelProps = Omit<Menu.GroupLabel.Props, "className"> & {
  className?: string
}

function MenuGroupLabel({ className, children, ...props }: MenuGroupLabelProps) {
  return (
    <Menu.GroupLabel
      data-slot="menu-group-label"
      className={cn(
        "flex min-h-[28px] items-center px-[var(--space-10)] py-[var(--space-6)] text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)] text-content-subtle",
        className
      )}
      {...props}
    >
      {children}
    </Menu.GroupLabel>
  )
}

export { MenuGroup, MenuGroupLabel }
export type { MenuGroupProps, MenuGroupLabelProps }
