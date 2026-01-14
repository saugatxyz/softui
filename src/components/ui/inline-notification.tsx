"use client"

import * as React from "react"
import {
  RiCloseLine,
  RiCheckboxCircleFill,
  RiInformationFill,
  RiErrorWarningFill,
  RiCloseCircleFill,
} from "@remixicon/react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { IconButton } from "./icon-button"
import { Separator } from "./separator"

// ============================================================================
// Types
// ============================================================================

type InlineNotificationTone = "neutral" | "info" | "success" | "warning" | "danger"
type InlineNotificationVariant = "default" | "filled"

// ============================================================================
// Tone Mappings (shared with Toast for consistency)
// ============================================================================

const toneIconColors: Record<InlineNotificationTone, string> = {
  neutral: "text-content-strong",
  info: "text-content-feedback-info-strong",
  success: "text-content-feedback-success-strong",
  warning: "text-content-feedback-warning-strong",
  danger: "text-content-feedback-danger-strong",
}

const toneIcons: Record<InlineNotificationTone, React.ComponentType<{ className?: string }>> = {
  neutral: RiInformationFill,
  info: RiInformationFill,
  success: RiCheckboxCircleFill,
  warning: RiErrorWarningFill,
  danger: RiCloseCircleFill,
}

// Filled variant background colors
const toneFilledBackgrounds: Record<InlineNotificationTone, string> = {
  neutral: "bg-surface-interactive-default",
  info: "bg-surface-feedback-info-muted",
  success: "bg-surface-feedback-success-muted",
  warning: "bg-surface-feedback-warning-muted",
  danger: "bg-surface-feedback-danger-muted",
}

// Filled variant title colors (use feedback content subtle for softer look)
const toneFilledTitleColors: Record<InlineNotificationTone, string> = {
  neutral: "text-content-strong",
  info: "text-content-feedback-info-subtle",
  success: "text-content-feedback-success-subtle",
  warning: "text-content-feedback-warning-subtle",
  danger: "text-content-feedback-danger-subtle",
}

// Filled variant description colors (use feedback content subtle)
const toneFilledDescriptionColors: Record<InlineNotificationTone, string> = {
  neutral: "text-content-subtle",
  info: "text-content-feedback-info-subtle",
  success: "text-content-feedback-success-subtle",
  warning: "text-content-feedback-warning-subtle",
  danger: "text-content-feedback-danger-subtle",
}

// ============================================================================
// InlineNotification Icon
// ============================================================================

type InlineNotificationIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: InlineNotificationTone
}

function InlineNotificationIcon({ tone = "neutral", className, ...props }: InlineNotificationIconProps) {
  const Icon = toneIcons[tone]
  return (
    <span
      data-slot="inline-notification-icon"
      className={cn(
        "flex size-[var(--space-20)] shrink-0 items-center justify-center [&_svg]:size-full",
        toneIconColors[tone],
        className
      )}
      aria-hidden="true"
      {...props}
    >
      <Icon />
    </span>
  )
}

// ============================================================================
// InlineNotification Root
// ============================================================================

type InlineNotificationRootProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: InlineNotificationTone
  variant?: InlineNotificationVariant
  icon?: React.ReactNode
}

const InlineNotificationContext = React.createContext<{
  tone: InlineNotificationTone
  variant: InlineNotificationVariant
  hasDescription: boolean
}>({
  tone: "neutral",
  variant: "default",
  hasDescription: false,
})

// Recursively check if a component type exists in children tree
function hasComponentInTree(children: React.ReactNode, componentType: React.ComponentType): boolean {
  return React.Children.toArray(children).some((child) => {
    if (!React.isValidElement(child)) return false
    if (child.type === componentType) return true
    const childProps = child.props as { children?: React.ReactNode }
    if (childProps.children) {
      return hasComponentInTree(childProps.children, componentType)
    }
    return false
  })
}

function InlineNotificationRoot({
  tone = "neutral",
  variant = "default",
  icon,
  className,
  children,
  ...props
}: InlineNotificationRootProps) {
  // Determine if we have a description by checking children tree
  const hasDescription = hasComponentInTree(children, InlineNotificationDescription)

  // Get background color based on variant
  const bgColor = variant === "filled"
    ? toneFilledBackgrounds[tone]
    : "bg-surface-interactive-default"

  return (
    <InlineNotificationContext.Provider value={{ tone, variant, hasDescription }}>
      <div
        role="status"
        data-slot="inline-notification"
        data-tone={tone}
        data-variant={variant}
        data-has-description={hasDescription || undefined}
        className={cn(
          bgColor,
          "flex overflow-hidden",
          hasDescription
            ? "items-start gap-[var(--space-12)] rounded-[var(--radius-16)] p-[var(--space-16)]"
            : "min-h-[var(--space-36)] items-center gap-[var(--space-2)] rounded-[var(--radius-10)] py-[var(--space-4)] pl-[var(--space-10)] pr-[var(--space-6)]",
          className
        )}
        {...props}
      >
        {/* Icon */}
        {icon !== undefined ? (
          icon
        ) : (
          <InlineNotificationIcon tone={tone} className={hasDescription ? "" : "ml-0"} />
        )}
        {children}
      </div>
    </InlineNotificationContext.Provider>
  )
}

// ============================================================================
// InlineNotification Content (groups title, description, and actions)
// ============================================================================

type InlineNotificationContentProps = React.HTMLAttributes<HTMLDivElement>

function InlineNotificationContent({ className, children, ...props }: InlineNotificationContentProps) {
  const { hasDescription } = React.useContext(InlineNotificationContext)

  return (
    <div
      data-slot="inline-notification-content"
      className={cn(
        "flex min-w-0 flex-1",
        hasDescription
          ? "flex-col gap-[var(--space-16)] sm:flex-row sm:items-start"
          : "items-center gap-[var(--space-10)] pl-[var(--space-4)] pr-[var(--space-8)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// InlineNotification Text Wrapper (groups title and description)
// ============================================================================

type InlineNotificationTextWrapperProps = React.HTMLAttributes<HTMLDivElement>

function InlineNotificationTextWrapper({ className, children, ...props }: InlineNotificationTextWrapperProps) {
  const { hasDescription } = React.useContext(InlineNotificationContext)

  return (
    <div
      data-slot="inline-notification-text-wrapper"
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-[var(--space-4)]",
        !hasDescription && "justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// InlineNotification Title
// ============================================================================

type InlineNotificationTitleProps = React.HTMLAttributes<HTMLParagraphElement>

function InlineNotificationTitle({ className, ...props }: InlineNotificationTitleProps) {
  const { tone, variant } = React.useContext(InlineNotificationContext)

  const textColor = variant === "filled"
    ? toneFilledTitleColors[tone]
    : "text-content-strong"

  return (
    <p
      data-slot="inline-notification-title"
      className={cn(
        "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]",
        textColor,
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// InlineNotification Description
// ============================================================================

type InlineNotificationDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

function InlineNotificationDescription({ className, ...props }: InlineNotificationDescriptionProps) {
  const { tone, variant } = React.useContext(InlineNotificationContext)

  const textColor = variant === "filled"
    ? toneFilledDescriptionColors[tone]
    : "text-content-subtle"

  return (
    <p
      data-slot="inline-notification-description"
      className={cn(
        "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
        textColor,
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// InlineNotification Actions (container for action buttons)
// ============================================================================

type InlineNotificationActionsProps = React.HTMLAttributes<HTMLDivElement>

function InlineNotificationActions({ className, children, ...props }: InlineNotificationActionsProps) {
  const { hasDescription } = React.useContext(InlineNotificationContext)

  if (hasDescription) {
    return (
      <div
        data-slot="inline-notification-actions"
        className={cn("flex shrink-0 items-center gap-[var(--space-8)]", className)}
        {...props}
      >
        {children}
      </div>
    )
  }

  // Compact variant with separator
  return (
    <div
      data-slot="inline-notification-actions"
      className={cn("flex shrink-0 items-center gap-[var(--space-8)]", className)}
      {...props}
    >
      <Separator orientation="vertical" className="h-[var(--space-12)]" />
      {children}
    </div>
  )
}

// ============================================================================
// InlineNotification Action (button for card variant)
// ============================================================================

type InlineNotificationActionProps = React.ComponentProps<typeof Button>

function InlineNotificationAction({ className, children, ...props }: InlineNotificationActionProps) {
  const { hasDescription } = React.useContext(InlineNotificationContext)

  if (hasDescription) {
    return (
      <Button
        data-slot="inline-notification-action"
        variant="tertiary"
        size="xs"
        className={className}
        {...props}
      >
        {children}
      </Button>
    )
  }

  // Compact variant uses link-neutral
  return (
    <Button
      data-slot="inline-notification-action"
      variant="link-neutral"
      size="xs"
      className={className}
      {...props}
    >
      {children}
    </Button>
  )
}

// ============================================================================
// InlineNotification Close
// ============================================================================

type InlineNotificationCloseProps = Omit<React.ComponentProps<typeof IconButton>, "children"> & {
  onClose?: () => void
}

function InlineNotificationClose({ className, onClose, onClick, ...props }: InlineNotificationCloseProps) {
  const { hasDescription } = React.useContext(InlineNotificationContext)

  return (
    <IconButton
      data-slot="inline-notification-close"
      variant="ghost"
      size={hasDescription ? "3xs" : "2xs"}
      aria-label="Dismiss notification"
      className={cn("shrink-0", className)}
      onClick={(e) => {
        onClose?.()
        onClick?.(e)
      }}
      {...props}
    >
      <RiCloseLine />
    </IconButton>
  )
}

// ============================================================================
// Namespace Export
// ============================================================================

const InlineNotification = {
  Root: InlineNotificationRoot,
  Icon: InlineNotificationIcon,
  Content: InlineNotificationContent,
  TextWrapper: InlineNotificationTextWrapper,
  Title: InlineNotificationTitle,
  Description: InlineNotificationDescription,
  Actions: InlineNotificationActions,
  Action: InlineNotificationAction,
  Close: InlineNotificationClose,
}

export { InlineNotification }
export type {
  InlineNotificationTone,
  InlineNotificationVariant,
  InlineNotificationRootProps,
  InlineNotificationIconProps,
  InlineNotificationContentProps,
  InlineNotificationTextWrapperProps,
  InlineNotificationTitleProps,
  InlineNotificationDescriptionProps,
  InlineNotificationActionsProps,
  InlineNotificationActionProps,
  InlineNotificationCloseProps,
}
