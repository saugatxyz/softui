"use client"

import { Menu } from "@base-ui/react/menu"
import { type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"
import { listItemVariants } from "./list-item-styles"

type MenuItemProps = Omit<Menu.Item.Props, "className"> &
  VariantProps<typeof listItemVariants> & {
    className?: string
  }

function MenuItem({
  variant = "default",
  className,
  ...props
}: MenuItemProps) {
  const textClass =
    variant === "danger"
      ? "text-content-feedback-danger-strong data-[disabled]:text-content-feedback-danger-disabled"
      : "text-content-strong data-[disabled]:text-content-disabled"

  return (
    <Menu.Item
      data-slot="menu-item"
      data-variant={variant}
      className={cn(listItemVariants({ variant }), textClass, className)}
      {...props}
    />
  )
}

// Export shared variants for other components to use
export { MenuItem, listItemVariants }
export type { MenuItemProps }
