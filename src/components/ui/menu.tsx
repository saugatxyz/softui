"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "@/lib/utils"
import { ScrollFadeContainer } from "./scroll-fade-container"
import {
  listPopupStyles,
  listItemVariants,
  ListSearch,
  LIST_MAX_HEIGHT,
  LIST_SEARCH_THRESHOLD,
} from "./list-item-styles"

// Re-export shared styles for consumers
export {
  listPopupStyles,
  listItemVariants,
  ListSearch,
  ListEmpty,
  LIST_MAX_HEIGHT,
  LIST_SEARCH_THRESHOLD,
} from "./list-item-styles"

// ============================================================================
// Menu Search Context
// ============================================================================

type MenuSearchContextValue = {
  searchValue: string
  setSearchValue: (value: string) => void
  searchInputRef: React.RefObject<HTMLInputElement | null>
}

const MenuSearchContext = React.createContext<MenuSearchContextValue | null>(null)

function useMenuSearch() {
  return React.useContext(MenuSearchContext)
}

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
// Menu Search
// ============================================================================

type MenuSearchProps = {
  /** Placeholder text */
  placeholder?: string
  /** Custom className */
  className?: string
  /** Auto focus the search input when menu opens */
  autoFocus?: boolean
}

function MenuSearch({
  placeholder = "Search...",
  className,
  autoFocus = true,
}: MenuSearchProps) {
  const context = useMenuSearch()

  if (!context) {
    console.warn("MenuSearch must be used within a MenuPopup with searchable enabled")
    return null
  }

  const { searchValue, setSearchValue, searchInputRef } = context

  return (
    <ListSearch
      value={searchValue}
      onChange={setSearchValue}
      placeholder={placeholder}
      autoFocus={autoFocus}
      inputRef={searchInputRef}
      className={className}
    />
  )
}

// ============================================================================
// Menu Popup
// ============================================================================

type MenuPopupProps = Omit<MenuPrimitive.Popup.Props, "className"> & {
  className?: string
  /** Maximum height before scrolling (default: LIST_MAX_HEIGHT) */
  maxHeight?: number
  /** Enable search field (default: false, "auto" shows when items exceed threshold) */
  searchable?: boolean | "auto"
  /** Number of items threshold for auto-showing search (default: LIST_SEARCH_THRESHOLD) */
  searchThreshold?: number
  /** Search placeholder text */
  searchPlaceholder?: string
  /** Callback when search value changes */
  onSearchChange?: (value: string) => void
  /** Current search value (controlled) */
  searchValue?: string
}

function MenuPopup({
  className,
  maxHeight = LIST_MAX_HEIGHT,
  searchable = false,
  searchThreshold = LIST_SEARCH_THRESHOLD,
  searchPlaceholder = "Search...",
  onSearchChange,
  searchValue: controlledSearchValue,
  children,
  ...props
}: MenuPopupProps) {
  const [internalSearchValue, setInternalSearchValue] = React.useState("")
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const popupRef = React.useRef<HTMLDivElement>(null)
  const [itemCount, setItemCount] = React.useState(0)
  const [initialHeight, setInitialHeight] = React.useState<number | null>(null)

  // Determine if search is controlled
  const isControlled = controlledSearchValue !== undefined
  const searchValue = isControlled ? controlledSearchValue : internalSearchValue

  const setSearchValue = React.useCallback((value: string) => {
    if (!isControlled) {
      setInternalSearchValue(value)
    }
    onSearchChange?.(value)
  }, [isControlled, onSearchChange])

  // Count items for auto mode
  React.useEffect(() => {
    if (searchable === "auto" && contentRef.current) {
      const timer = setTimeout(() => {
        const items = contentRef.current?.querySelectorAll('[data-slot="menu-item"], [data-slot="menu-radio-item"], [data-slot="menu-checkbox-item"]')
        setItemCount(items?.length ?? 0)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [searchable, children])

  // Determine if search should be shown
  const showSearch = searchable === true || (searchable === "auto" && itemCount > searchThreshold)

  // Capture initial height to prevent position flipping when filtering
  React.useEffect(() => {
    if (showSearch && popupRef.current && initialHeight === null) {
      const timer = setTimeout(() => {
        if (popupRef.current) {
          setInitialHeight(popupRef.current.offsetHeight)
        }
      }, 10)
      return () => clearTimeout(timer)
    }
  }, [showSearch, initialHeight])

  // Reset search and initial height when menu closes
  React.useEffect(() => {
    return () => {
      if (!isControlled) {
        setInternalSearchValue("")
      }
      setInitialHeight(null)
    }
  }, [isControlled])

  const contextValue = React.useMemo(() => ({
    searchValue,
    setSearchValue,
    searchInputRef,
  }), [searchValue, setSearchValue])

  return (
    <MenuSearchContext.Provider value={contextValue}>
      <MenuPrimitive.Popup
        ref={popupRef}
        data-slot="menu-popup"
        className={cn(
          // Shared popup styles (Menu is the authoritative source)
          listPopupStyles.base,
          // Menu width: fixed for searchable, flexible for non-searchable
          showSearch ? "w-[280px]" : "min-w-[220px] max-w-[400px]",
          className
        )}
        style={showSearch && initialHeight ? { minHeight: initialHeight } : undefined}
        {...props}
      >
        {showSearch && (
          <MenuSearch placeholder={searchPlaceholder} />
        )}
        <div ref={contentRef}>
          <ScrollFadeContainer maxHeight={showSearch ? maxHeight - 52 : maxHeight}>
            {children}
          </ScrollFadeContainer>
        </div>
      </MenuPrimitive.Popup>
    </MenuSearchContext.Provider>
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
  Search: MenuSearch,
  Arrow: MenuArrow,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  CheckboxItem: MenuCheckboxItem,
  SubmenuRoot: SubmenuRoot,
  SubmenuTrigger: SubmenuTrigger,
}

export { Menu, useMenuSearch }
export type {
  MenuRootProps,
  MenuTriggerProps,
  MenuPortalProps,
  MenuPositionerProps,
  MenuPopupProps,
  MenuSearchProps,
  MenuArrowProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuCheckboxItemProps,
  SubmenuRootProps,
  SubmenuTriggerProps,
}
