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

// ============================================================================
// Types
// ============================================================================

type BannerTone = "neutral" | "info" | "success" | "warning" | "danger"

// ============================================================================
// Tone Mappings
// ============================================================================

const toneBackgrounds: Record<BannerTone, string> = {
  neutral: "bg-surface-interactive-default",
  info: "bg-surface-feedback-info-muted",
  success: "bg-surface-feedback-success-muted",
  warning: "bg-surface-feedback-warning-muted",
  danger: "bg-surface-feedback-danger-muted",
}

const toneBorders: Record<BannerTone, string> = {
  neutral: "border-l-border-interactive-active",
  info: "border-l-content-feedback-info-strong",
  success: "border-l-content-feedback-success-strong",
  warning: "border-l-content-feedback-warning-strong",
  danger: "border-l-content-feedback-danger-strong",
}

const toneIconColors: Record<BannerTone, string> = {
  neutral: "text-content-strong",
  info: "text-content-feedback-info-strong",
  success: "text-content-feedback-success-strong",
  warning: "text-content-feedback-warning-strong",
  danger: "text-content-feedback-danger-strong",
}

const toneTitleColors: Record<BannerTone, string> = {
  neutral: "text-content-strong",
  info: "text-content-feedback-info-subtle",
  success: "text-content-feedback-success-subtle",
  warning: "text-content-feedback-warning-subtle",
  danger: "text-content-feedback-danger-subtle",
}

const toneIcons: Record<BannerTone, React.ComponentType<{ className?: string }>> = {
  neutral: RiInformationFill,
  info: RiInformationFill,
  success: RiCheckboxCircleFill,
  warning: RiErrorWarningFill,
  danger: RiCloseCircleFill,
}

// ============================================================================
// Banner Context
// ============================================================================

const BannerContext = React.createContext<{
  tone: BannerTone
}>({
  tone: "neutral",
})

// ============================================================================
// Banner Icon
// ============================================================================

type BannerIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: BannerTone
}

function BannerIcon({ tone: toneProp, className, ...props }: BannerIconProps) {
  const { tone: contextTone } = React.useContext(BannerContext)
  const tone = toneProp ?? contextTone
  const Icon = toneIcons[tone]

  return (
    <span
      data-slot="banner-icon"
      className={cn(
        "flex size-[20px] shrink-0 items-center justify-center [&_svg]:size-full",
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
// Banner Root
// ============================================================================

type BannerRootProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: BannerTone
  icon?: React.ReactNode
}

function BannerRoot({
  tone = "neutral",
  icon,
  className,
  children,
  ...props
}: BannerRootProps) {
  return (
    <BannerContext.Provider value={{ tone }}>
      <div
        role="status"
        data-slot="banner"
        data-tone={tone}
        className={cn(
          "flex w-full items-center gap-[var(--space-2)]",
          "border-l-2 py-[var(--space-10)] pl-[var(--space-12)] pr-[var(--space-10)]",
          toneBackgrounds[tone],
          toneBorders[tone],
          className
        )}
        {...props}
      >
        {/* Icon */}
        {icon !== undefined ? icon : <BannerIcon tone={tone} />}
        {children}
      </div>
    </BannerContext.Provider>
  )
}

// ============================================================================
// Banner Content (groups title and actions)
// ============================================================================

type BannerContentProps = React.HTMLAttributes<HTMLDivElement>

function BannerContent({ className, children, ...props }: BannerContentProps) {
  return (
    <div
      data-slot="banner-content"
      className={cn(
        "flex min-w-0 flex-1 items-center gap-[var(--space-10)] px-[var(--space-8)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// Banner Title
// ============================================================================

type BannerTitleProps = React.HTMLAttributes<HTMLParagraphElement>

function BannerTitle({ className, ...props }: BannerTitleProps) {
  const { tone } = React.useContext(BannerContext)

  return (
    <p
      data-slot="banner-title"
      className={cn(
        "min-w-0 flex-1",
        "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]",
        toneTitleColors[tone],
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Banner Actions (container for action buttons)
// ============================================================================

type BannerActionsProps = React.HTMLAttributes<HTMLDivElement>

function BannerActions({ className, children, ...props }: BannerActionsProps) {
  return (
    <div
      data-slot="banner-actions"
      className={cn("flex shrink-0 items-center gap-[var(--space-8)]", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// Banner Action (tertiary button, 2xs size)
// ============================================================================

type BannerActionProps = React.ComponentProps<typeof Button>

function BannerAction({ className, children, ...props }: BannerActionProps) {
  return (
    <Button
      data-slot="banner-action"
      variant="tertiary"
      size="xs"
      className={className}
      {...props}
    >
      {children}
    </Button>
  )
}

// ============================================================================
// Banner Close
// ============================================================================

type BannerCloseProps = Omit<React.ComponentProps<typeof IconButton>, "children"> & {
  onClose?: () => void
}

function BannerClose({ className, onClose, onClick, ...props }: BannerCloseProps) {
  return (
    <IconButton
      data-slot="banner-close"
      variant="ghost"
      size="2xs"
      aria-label="Dismiss banner"
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

const Banner = {
  Root: BannerRoot,
  Icon: BannerIcon,
  Content: BannerContent,
  Title: BannerTitle,
  Actions: BannerActions,
  Action: BannerAction,
  Close: BannerClose,
}

export { Banner }
export type {
  BannerTone,
  BannerRootProps,
  BannerIconProps,
  BannerContentProps,
  BannerTitleProps,
  BannerActionsProps,
  BannerActionProps,
  BannerCloseProps,
}
