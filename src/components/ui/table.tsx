"use client"

import * as React from "react"
import { RiArrowUpSLine, RiArrowDownSLine, RiMoreLine } from "@remixicon/react"

import { cn } from "@/lib/utils"
import { CheckboxControl } from "./checkbox-control"
import { Badge, type BadgeVariant } from "./badge"
import { Avatar } from "./avatar"
import { AvatarGroup } from "./avatar-group"
import { Progress } from "./progress"
import { Button } from "./button"
import { IconButton } from "./icon-button"

// ============================================================================
// Types
// ============================================================================

type TableSize = "s" | "m" | "l"
type SortDirection = "asc" | "desc" | null

// ============================================================================
// Size Mappings
// ============================================================================

const rowHeights: Record<TableSize, string> = {
  s: "h-[40px]",
  m: "h-[48px]",
  l: "h-[56px]",
}

const cellPadding: Record<TableSize, string> = {
  s: "px-[var(--space-12)] py-[var(--space-8)]",
  m: "px-[var(--space-16)] py-[var(--space-12)]",
  l: "px-[var(--space-16)] py-[var(--space-12)]",
}

// ============================================================================
// Table Context
// ============================================================================

const TableContext = React.createContext<{
  size: TableSize
}>({
  size: "m",
})

// ============================================================================
// Table Root
// ============================================================================

type TableRootProps = React.HTMLAttributes<HTMLTableElement> & {
  size?: TableSize
}

function TableRoot({ size = "m", className, children, ...props }: TableRootProps) {
  return (
    <TableContext.Provider value={{ size }}>
      <div className="w-full overflow-auto">
        <table
          data-slot="table"
          data-size={size}
          className={cn("w-full caption-bottom border-collapse", className)}
          {...props}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  )
}

// ============================================================================
// Table Header
// ============================================================================

type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>

function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      className={cn("border-b border-border-default", className)}
      {...props}
    />
  )
}

// ============================================================================
// Table Body
// ============================================================================

type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>

function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

// ============================================================================
// Table Footer
// ============================================================================

type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>

function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t border-border-default bg-surface-muted", className)}
      {...props}
    />
  )
}

// ============================================================================
// Table Row
// ============================================================================

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  selected?: boolean
  isHeader?: boolean
}

function TableRow({ selected, isHeader, className, ...props }: TableRowProps) {
  const { size } = React.useContext(TableContext)

  return (
    <tr
      data-slot="table-row"
      data-selected={selected || undefined}
      className={cn(
        "border-b border-border-muted",
        !isHeader && "hover:bg-surface-interactive-hover",
        selected && "bg-surface-interactive-selected",
        rowHeights[size],
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Table Head (Header Cell)
// ============================================================================

type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  sortable?: boolean
  sortDirection?: SortDirection
  onSort?: () => void
  align?: "left" | "right"
}

function TableHead({
  sortable,
  sortDirection,
  onSort,
  align = "left",
  className,
  children,
  ...props
}: TableHeadProps) {
  const { size } = React.useContext(TableContext)

  return (
    <th
      data-slot="table-head"
      data-sortable={sortable || undefined}
      data-sort={sortDirection || undefined}
      className={cn(
        "align-middle",
        "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]",
        "text-content-subtle",
        align === "right" ? "text-right" : "text-left",
        cellPadding[size],
        sortable && "cursor-pointer select-none hover:text-content-strong",
        className
      )}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      <div className={cn(
        "flex items-center gap-[var(--space-6)]",
        align === "right" && "justify-end"
      )}>
        {children}
        {sortable && (
          <span
            className={cn(
              "flex size-[16px] shrink-0 items-center justify-center",
              sortDirection ? "text-content-strong" : "text-content-muted"
            )}
          >
            {sortDirection === "asc" ? (
              <RiArrowUpSLine className="size-[16px]" />
            ) : sortDirection === "desc" ? (
              <RiArrowDownSLine className="size-[16px]" />
            ) : (
              <RiArrowUpSLine className="size-[16px] opacity-50" />
            )}
          </span>
        )}
      </div>
    </th>
  )
}

// ============================================================================
// Table Cell
// ============================================================================

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>

function TableCell({ className, ...props }: TableCellProps) {
  const { size } = React.useContext(TableContext)

  return (
    <td
      data-slot="table-cell"
      className={cn(
        "align-middle",
        "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
        "text-content-strong",
        cellPadding[size],
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Table Caption
// ============================================================================

type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>

function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "mt-[var(--space-16)] text-[length:var(--font-size-s)] text-content-subtle",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Specialized Cell Components
// ============================================================================

// Checkbox Cell
type TableCheckboxCellProps = {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  indeterminate?: boolean
  className?: string
}

function TableCheckboxCell({
  checked,
  onCheckedChange,
  indeterminate,
  className,
}: TableCheckboxCellProps) {
  const { size } = React.useContext(TableContext)

  const checkboxPadding: Record<TableSize, string> = {
    s: "pl-[var(--space-12)] py-[var(--space-8)]",
    m: "pl-[var(--space-16)] py-[var(--space-12)]",
    l: "pl-[var(--space-16)] py-[var(--space-12)]",
  }

  return (
    <td
      data-slot="table-checkbox-cell"
      className={cn("w-[24px]", checkboxPadding[size], className)}
    >
      <div className="flex size-[16px] items-center justify-center">
        <CheckboxControl
          checked={checked}
          onCheckedChange={onCheckedChange}
          indeterminate={indeterminate}
        />
      </div>
    </td>
  )
}

// Text Cell with optional prefix/suffix and additional info
type TableTextCellProps = {
  children: React.ReactNode
  additionalInfo?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  emphasized?: boolean
  className?: string
}

function TableTextCell({
  children,
  additionalInfo,
  prefix,
  suffix,
  emphasized,
  className,
}: TableTextCellProps) {
  const { size } = React.useContext(TableContext)
  const isStacked = size === "l" && additionalInfo

  return (
    <td
      data-slot="table-text-cell"
      className={cn("align-middle", cellPadding[size], className)}
    >
      <div className="flex min-w-0 items-start gap-[var(--space-8)]">
        {prefix && (
          <span className="flex size-[20px] shrink-0 items-center justify-center">
            {prefix}
          </span>
        )}
        <div className={cn("flex min-w-0 flex-1", isStacked ? "flex-col gap-[var(--space-2)]" : "items-center gap-[var(--space-8)]")}>
          <span
            className={cn(
              "text-[length:var(--font-size-m)] leading-[var(--line-height-m)] text-content-strong",
              emphasized ? "font-[var(--font-weight-medium)]" : "font-[var(--font-weight-default)]"
            )}
          >
            {children}
          </span>
          {additionalInfo && (
            <>
              {!isStacked && (
                <span className="size-[2px] shrink-0 rounded-full bg-content-muted" />
              )}
              <span className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-subtle">
                {additionalInfo}
              </span>
            </>
          )}
        </div>
        {suffix && (
          <span className="flex size-[20px] shrink-0 items-center justify-center">
            {suffix}
          </span>
        )}
      </div>
    </td>
  )
}

// Number Cell (right-aligned)
type TableNumberCellProps = {
  children: React.ReactNode
  className?: string
}

function TableNumberCell({ children, className }: TableNumberCellProps) {
  const { size } = React.useContext(TableContext)

  return (
    <td
      data-slot="table-number-cell"
      className={cn(
        "text-right align-middle",
        "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
        "text-content-strong tabular-nums",
        cellPadding[size],
        className
      )}
    >
      {children}
    </td>
  )
}

// Badge Cell
type TableBadgeCellProps = {
  children: React.ReactNode
  variant?: BadgeVariant
  isEmphasized?: boolean
  className?: string
}

function TableBadgeCell({ children, variant = "neutral", isEmphasized = true, className }: TableBadgeCellProps) {
  const { size } = React.useContext(TableContext)

  return (
    <td
      data-slot="table-badge-cell"
      className={cn("align-middle", cellPadding[size], className)}
    >
      <Badge variant={variant} size="s" isEmphasized={isEmphasized}>
        {children}
      </Badge>
    </td>
  )
}

// Avatar Group Cell
type TableAvatarGroupCellProps = {
  avatars: Array<{ src?: string; name?: string }>
  max?: number
  className?: string
}

function TableAvatarGroupCell({ avatars, max = 3, className }: TableAvatarGroupCellProps) {
  const { size } = React.useContext(TableContext)
  const avatarSize = size === "s" ? "3xs" : "2xs"

  return (
    <td
      data-slot="table-avatar-group-cell"
      className={cn("align-middle", cellPadding[size], className)}
    >
      <AvatarGroup size={avatarSize}>
        {avatars.slice(0, max).map((avatar, i) => (
          <Avatar key={i} size={avatarSize} src={avatar.src} name={avatar.name} />
        ))}
        {avatars.length > max && (
          <Avatar size={avatarSize} name={`+${avatars.length - max}`} />
        )}
      </AvatarGroup>
    </td>
  )
}

// Progress Cell
type TableProgressCellProps = {
  value: number
  tone?: "neutral" | "positive" | "warning" | "danger"
  className?: string
}

function TableProgressCell({ value, tone = "neutral", className }: TableProgressCellProps) {
  const { size } = React.useContext(TableContext)

  return (
    <td
      data-slot="table-progress-cell"
      className={cn("align-middle", cellPadding[size], className)}
    >
      <Progress.Root tone={tone} value={value} size="s">
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </td>
  )
}

// Actions Cell
type TableActionsCellProps = {
  children?: React.ReactNode
  className?: string
}

function TableActionsCell({ children, className }: TableActionsCellProps) {
  const { size } = React.useContext(TableContext)

  return (
    <td
      data-slot="table-actions-cell"
      className={cn("align-middle text-right", cellPadding[size], className)}
    >
      <div className="flex items-center justify-end gap-[var(--space-4)]">
        {children || (
          <>
            <Button variant="link-neutral" size="xs">
              View
            </Button>
            <IconButton variant="ghost" size="2xs">
              <RiMoreLine />
            </IconButton>
          </>
        )}
      </div>
    </td>
  )
}

// ============================================================================
// Namespace Export
// ============================================================================

const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
  CheckboxCell: TableCheckboxCell,
  TextCell: TableTextCell,
  NumberCell: TableNumberCell,
  BadgeCell: TableBadgeCell,
  AvatarGroupCell: TableAvatarGroupCell,
  ProgressCell: TableProgressCell,
  ActionsCell: TableActionsCell,
}

export { Table }
export type {
  TableSize,
  SortDirection,
  TableRootProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
  TableCheckboxCellProps,
  TableTextCellProps,
  TableNumberCellProps,
  TableBadgeCellProps,
  TableAvatarGroupCellProps,
  TableProgressCellProps,
  TableActionsCellProps,
}
