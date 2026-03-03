import * as React from "react"
import { RiSearchLine } from "@soft-ui/icons"

import { cn } from "../lib/utils"
import { Button } from "./button"

// ============================================================================
// Types
// ============================================================================

type EmptyStateProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Whether to show a filled background */
  filled?: boolean
}

type EmptyStateIconProps = React.HTMLAttributes<HTMLSpanElement>

type EmptyStateTitleProps = React.HTMLAttributes<HTMLHeadingElement>

type EmptyStateDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

type EmptyStateActionsProps = React.HTMLAttributes<HTMLDivElement>

type EmptyStateActionProps = React.ComponentProps<typeof Button>

// ============================================================================
// EmptyState Root
// ============================================================================

function EmptyStateRoot({ filled = false, className, children, ...props }: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      data-filled={filled || undefined}
      className={cn(
        "flex flex-col items-center justify-center gap-[var(--space-16)] p-[var(--space-32)] text-center",
        filled && "rounded-[var(--radius-16)] bg-surface-interactive-default",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// EmptyState Icon
// ============================================================================

function EmptyStateIcon({ className, children, ...props }: EmptyStateIconProps) {
  return (
    <span
      data-slot="empty-state-icon"
      className={cn(
        "flex size-[var(--space-24)] items-center justify-center text-content-strong [&_svg]:size-full",
        className
      )}
      aria-hidden="true"
      {...props}
    >
      {children ?? <RiSearchLine />}
    </span>
  )
}

// ============================================================================
// EmptyState Content (groups title and description)
// ============================================================================

type EmptyStateContentProps = React.HTMLAttributes<HTMLDivElement>

function EmptyStateContent({ className, children, ...props }: EmptyStateContentProps) {
  return (
    <div
      data-slot="empty-state-content"
      className={cn("flex flex-col items-center gap-[var(--space-4)]", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// EmptyState Title
// ============================================================================

function EmptyStateTitle({ className, children, ...props }: EmptyStateTitleProps) {
  return (
    <h3
      data-slot="empty-state-title"
      className={cn(
        "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]",
        "text-content-strong",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

// ============================================================================
// EmptyState Description
// ============================================================================

function EmptyStateDescription({ className, children, ...props }: EmptyStateDescriptionProps) {
  return (
    <p
      data-slot="empty-state-description"
      className={cn(
        "text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)]",
        "text-content-subtle",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

// ============================================================================
// EmptyState Actions
// ============================================================================

function EmptyStateActions({ className, children, ...props }: EmptyStateActionsProps) {
  return (
    <div
      data-slot="empty-state-actions"
      className={cn("flex items-center gap-[var(--space-8)]", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// EmptyState Action (tertiary button)
// ============================================================================

function EmptyStateAction({ className, children, ...props }: EmptyStateActionProps) {
  return (
    <Button
      data-slot="empty-state-action"
      variant="tertiary"
      size="s"
      className={className}
      {...props}
    >
      {children}
    </Button>
  )
}

// ============================================================================
// Namespace Export
// ============================================================================

const EmptyState = {
  Root: EmptyStateRoot,
  Icon: EmptyStateIcon,
  Content: EmptyStateContent,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Actions: EmptyStateActions,
  Action: EmptyStateAction,
}

export { EmptyState }
export type {
  EmptyStateProps,
  EmptyStateIconProps,
  EmptyStateContentProps,
  EmptyStateTitleProps,
  EmptyStateDescriptionProps,
  EmptyStateActionsProps,
  EmptyStateActionProps,
}
