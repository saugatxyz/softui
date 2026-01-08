"use client"

import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"

import { cn } from "@/lib/utils"
import { ScrollFadeContainer } from "./scroll-fade-container"
import {
  listPopupStyles,
  listItemVariants,
  LIST_MAX_HEIGHT,
} from "./list-item-styles"

// Re-export child components from Menu (they work the same way)
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
// ContextMenu Root
// ============================================================================

type ContextMenuRootProps = ContextMenuPrimitive.Root.Props

function ContextMenuRoot(props: ContextMenuRootProps) {
  return <ContextMenuPrimitive.Root {...props} />
}

// ============================================================================
// ContextMenu Trigger
// ============================================================================

type ContextMenuTriggerProps = Omit<ContextMenuPrimitive.Trigger.Props, "className"> & {
  className?: string
}

function ContextMenuTrigger({ className, ...props }: ContextMenuTriggerProps) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

// ============================================================================
// ContextMenu Portal
// ============================================================================

type ContextMenuPortalProps = ContextMenuPrimitive.Portal.Props

function ContextMenuPortal(props: ContextMenuPortalProps) {
  return <ContextMenuPrimitive.Portal {...props} />
}

// ============================================================================
// ContextMenu Positioner
// ============================================================================

type ContextMenuPositionerProps = Omit<ContextMenuPrimitive.Positioner.Props, "className"> & {
  className?: string
}

function ContextMenuPositioner({
  className,
  sideOffset = 4,
  collisionPadding = 8,
  ...props
}: ContextMenuPositionerProps) {
  return (
    <ContextMenuPrimitive.Positioner
      data-slot="context-menu-positioner"
      className={cn("outline-none", className)}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      {...props}
    />
  )
}

// ============================================================================
// ContextMenu Popup
// ============================================================================

type ContextMenuPopupProps = Omit<ContextMenuPrimitive.Popup.Props, "className"> & {
  className?: string
  /** Maximum height before scrolling (default: LIST_MAX_HEIGHT) */
  maxHeight?: number
}

function ContextMenuPopup({
  className,
  maxHeight = LIST_MAX_HEIGHT,
  children,
  ...props
}: ContextMenuPopupProps) {
  return (
    <ContextMenuPrimitive.Popup
      data-slot="context-menu-popup"
      className={cn(
        listPopupStyles.base,
        "min-w-[220px] max-w-[400px]",
        className
      )}
      {...props}
    >
      <ScrollFadeContainer maxHeight={maxHeight}>
        {children}
      </ScrollFadeContainer>
    </ContextMenuPrimitive.Popup>
  )
}

// ============================================================================
// ContextMenu Arrow
// ============================================================================

type ContextMenuArrowProps = Omit<ContextMenuPrimitive.Arrow.Props, "className"> & {
  className?: string
}

function ContextMenuArrow({ className, ...props }: ContextMenuArrowProps) {
  return (
    <ContextMenuPrimitive.Arrow
      data-slot="context-menu-arrow"
      className={cn(
        "fill-surface-overlay",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// ContextMenu RadioGroup
// ============================================================================

type ContextMenuRadioGroupProps = ContextMenuPrimitive.RadioGroup.Props

function ContextMenuRadioGroup(props: ContextMenuRadioGroupProps) {
  return <ContextMenuPrimitive.RadioGroup {...props} />
}

// ============================================================================
// ContextMenu RadioItem
// ============================================================================

type ContextMenuRadioItemProps = Omit<ContextMenuPrimitive.RadioItem.Props, "className"> & {
  className?: string
  children?: React.ReactNode
}

function ContextMenuRadioItem({ className, children, ...props }: ContextMenuRadioItemProps) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(listItemVariants(), className)}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

// ============================================================================
// ContextMenu CheckboxItem
// ============================================================================

type ContextMenuCheckboxItemProps = Omit<ContextMenuPrimitive.CheckboxItem.Props, "className"> & {
  className?: string
  children?: React.ReactNode
}

function ContextMenuCheckboxItem({ className, children, ...props }: ContextMenuCheckboxItemProps) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(listItemVariants(), className)}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

// ============================================================================
// Submenu Components
// ============================================================================

type SubmenuRootProps = ContextMenuPrimitive.SubmenuRoot.Props

function SubmenuRoot(props: SubmenuRootProps) {
  return <ContextMenuPrimitive.SubmenuRoot {...props} />
}

type SubmenuTriggerProps = Omit<ContextMenuPrimitive.SubmenuTrigger.Props, "className"> & {
  className?: string
}

function SubmenuTrigger({ className, ...props }: SubmenuTriggerProps) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-submenu-trigger"
      className={cn(listItemVariants(), className)}
      {...props}
    />
  )
}

// ============================================================================
// ContextMenu Namespace Export
// ============================================================================

const ContextMenu = {
  Root: ContextMenuRoot,
  Trigger: ContextMenuTrigger,
  Portal: ContextMenuPortal,
  Positioner: ContextMenuPositioner,
  Popup: ContextMenuPopup,
  Arrow: ContextMenuArrow,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  CheckboxItem: ContextMenuCheckboxItem,
  SubmenuRoot: SubmenuRoot,
  SubmenuTrigger: SubmenuTrigger,
}

export { ContextMenu }
export type {
  ContextMenuRootProps,
  ContextMenuTriggerProps,
  ContextMenuPortalProps,
  ContextMenuPositionerProps,
  ContextMenuPopupProps,
  ContextMenuArrowProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuCheckboxItemProps,
  SubmenuRootProps,
  SubmenuTriggerProps,
}
