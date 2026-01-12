"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { RiCheckboxCircleFill } from "@remixicon/react"

import { cn } from "@/lib/utils"
import { listPopupStyles, listItemVariants, LIST_MAX_HEIGHT } from "./list-item-styles"

// Re-export shared styles for consumers
export { listPopupStyles, listItemVariants, LIST_MAX_HEIGHT } from "./list-item-styles"

// Re-export child components
export { MenuItem } from "./menu-item"
export type { MenuItemProps } from "./menu-item"
export { MenuPrefix } from "./menu-prefix"
export type { MenuPrefixProps } from "./menu-prefix"
export { MenuSuffix } from "./menu-suffix"
export type { MenuSuffixProps } from "./menu-suffix"
export { MenuSeparator } from "./menu-separator"
export type { MenuSeparatorProps } from "./menu-separator"
export { MenuGroup, MenuGroupLabel } from "./menu-group"
export type { MenuGroupProps, MenuGroupLabelProps } from "./menu-group"
export { MenuEmpty } from "./menu-empty"
export type { MenuEmptyProps } from "./menu-empty"

// ============================================================================
// Menu Root
// ============================================================================

type MenuRootProps = MenuPrimitive.Root.Props

function MenuRoot(props: MenuRootProps) {
  return <MenuPrimitive.Root {...props} />
}

// ============================================================================
// Menu Trigger
// ============================================================================

type MenuTriggerProps = Omit<MenuPrimitive.Trigger.Props, "className"> & {
  className?: string
}

function MenuTrigger({ className, ...props }: MenuTriggerProps) {
  return (
    <MenuPrimitive.Trigger
      data-slot="menu-trigger"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

// ============================================================================
// Menu Portal
// ============================================================================

type MenuPortalProps = MenuPrimitive.Portal.Props

function MenuPortal(props: MenuPortalProps) {
  return <MenuPrimitive.Portal {...props} />
}

// ============================================================================
// Menu Positioner
// ============================================================================

type MenuPositionerProps = Omit<MenuPrimitive.Positioner.Props, "className"> & {
  className?: string
}

function MenuPositioner({
  className,
  align = "start",
  sideOffset = 4,
  collisionPadding = 8,
  sticky = true,
  ...props
}: MenuPositionerProps) {
  return (
    <MenuPrimitive.Positioner
      data-slot="menu-positioner"
      className={cn("outline-none", className)}
      align={align}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      sticky={sticky}
      {...props}
    />
  )
}

// ============================================================================
// Menu Popup
// ============================================================================

type MenuPopupProps = Omit<MenuPrimitive.Popup.Props, "className"> & {
  className?: string
}

function MenuPopup({ className, ...props }: MenuPopupProps) {
  return (
    <MenuPrimitive.Popup
      data-slot="menu-popup"
      className={cn(
        listPopupStyles.base,
        "min-w-[220px]",
        "overflow-y-auto",
        className
      )}
      style={{ maxHeight: LIST_MAX_HEIGHT }}
      {...props}
    />
  )
}

// ============================================================================
// Menu Arrow
// ============================================================================

type MenuArrowProps = Omit<MenuPrimitive.Arrow.Props, "className"> & {
  className?: string
}

function MenuArrow({ className, ...props }: MenuArrowProps) {
  return (
    <MenuPrimitive.Arrow
      data-slot="menu-arrow"
      className={cn(
        "fill-surface-overlay",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Menu RadioGroup
// ============================================================================

type MenuRadioGroupProps = MenuPrimitive.RadioGroup.Props

function MenuRadioGroup(props: MenuRadioGroupProps) {
  return <MenuPrimitive.RadioGroup {...props} />
}

// ============================================================================
// Menu RadioItem
// ============================================================================

type MenuRadioItemProps = Omit<MenuPrimitive.RadioItem.Props, "className"> & {
  className?: string
  children?: React.ReactNode
}

function MenuRadioItem({ className, children, ...props }: MenuRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="menu-radio-item"
      className={cn(listItemVariants(), className)}
      {...props}
    >
      {children}
      <MenuPrimitive.RadioItemIndicator
        data-slot="menu-radio-indicator"
        className="ml-auto flex size-[20px] shrink-0 items-center justify-center text-actions-primary-default data-[disabled]:text-content-disabled"
      >
        <RiCheckboxCircleFill className="size-[16px]" />
      </MenuPrimitive.RadioItemIndicator>
    </MenuPrimitive.RadioItem>
  )
}

// ============================================================================
// Menu CheckboxItem
// ============================================================================

type MenuCheckboxItemProps = Omit<MenuPrimitive.CheckboxItem.Props, "className"> & {
  className?: string
  children?: React.ReactNode
}

function MenuCheckboxItem({ className, children, ...props }: MenuCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menu-checkbox-item"
      className={cn(listItemVariants(), className)}
      {...props}
    >
      {children}
      <MenuPrimitive.CheckboxItemIndicator
        data-slot="menu-checkbox-indicator"
        className="ml-auto flex size-[20px] shrink-0 items-center justify-center text-actions-primary-default data-[disabled]:text-content-disabled"
      >
        <RiCheckboxCircleFill className="size-[16px]" />
      </MenuPrimitive.CheckboxItemIndicator>
    </MenuPrimitive.CheckboxItem>
  )
}

// ============================================================================
// Submenu Components
// ============================================================================

type SubmenuRootProps = MenuPrimitive.SubmenuRoot.Props

function SubmenuRoot(props: SubmenuRootProps) {
  return <MenuPrimitive.SubmenuRoot {...props} />
}

type SubmenuTriggerProps = Omit<MenuPrimitive.SubmenuTrigger.Props, "className"> & {
  className?: string
}

function SubmenuTrigger({ className, ...props }: SubmenuTriggerProps) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="submenu-trigger"
      className={cn(listItemVariants(), className)}
      {...props}
    />
  )
}

// ============================================================================
// Menu Namespace Export
// ============================================================================

const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Portal: MenuPortal,
  Positioner: MenuPositioner,
  Popup: MenuPopup,
  Arrow: MenuArrow,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  CheckboxItem: MenuCheckboxItem,
  SubmenuRoot: SubmenuRoot,
  SubmenuTrigger: SubmenuTrigger,
}

export { Menu }
export type {
  MenuRootProps,
  MenuTriggerProps,
  MenuPortalProps,
  MenuPositionerProps,
  MenuPopupProps,
  MenuArrowProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuCheckboxItemProps,
  SubmenuRootProps,
  SubmenuTriggerProps,
}
