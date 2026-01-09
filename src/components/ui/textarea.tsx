"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaFieldVariants = cva(
  "flex w-full rounded-[var(--radius-10)] bg-actions-secondary-default transition-colors duration-200",
  {
    variants: {
      size: {
        s: "px-[var(--space-10)] py-[var(--space-8)]",
        m: "px-[var(--space-12)] py-[var(--space-10)]",
        l: "px-[var(--space-12)] py-[var(--space-12)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const textareaVariants = cva(
  "w-full bg-transparent text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] outline-none placeholder:text-content-muted caret-actions-primary-default",
  {
    variants: {
      size: {
        s: "",
        m: "",
        l: "",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      size: "m",
      resize: "vertical",
    },
  }
)

type TextareaSize = "s" | "m" | "l"
type TextareaResize = "none" | "vertical" | "horizontal" | "both"

type TextareaProps = Omit<
  React.ComponentProps<typeof InputPrimitive>,
  "size" | "render"
> &
  VariantProps<typeof textareaFieldVariants> & {
    /** Number of visible text rows */
    rows?: number
    /** Resize behavior */
    resize?: TextareaResize
    /** Only show focus ring on keyboard navigation */
    focusVisibleOnly?: boolean
  }

function Textarea({
  className,
  size,
  rows = 3,
  resize = "vertical",
  focusVisibleOnly = true,
  disabled,
  ...props
}: TextareaProps) {
  const resolvedSize: TextareaSize = size ?? "m"
  const [showFocusRing, setShowFocusRing] = React.useState(false)
  const wasMouseDown = React.useRef(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    wasMouseDown.current = true
  }

  const handleFocus = () => {
    if (focusVisibleOnly) {
      setShowFocusRing(!wasMouseDown.current)
    } else {
      setShowFocusRing(true)
    }
    wasMouseDown.current = false
  }

  const handleBlur = () => {
    setShowFocusRing(false)
    wasMouseDown.current = false
  }

  return (
    <div
      ref={containerRef}
      data-slot="textarea"
      data-size={resolvedSize}
      className={cn(
        textareaFieldVariants({ size: resolvedSize }),
        "group relative cursor-text",
        !disabled && "hover:bg-actions-secondary-hover",
        showFocusRing &&
          "shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        disabled && "bg-actions-secondary-disabled",
        className
      )}
      onMouseDown={handleMouseDown}
      onClick={() => containerRef.current?.querySelector("textarea")?.focus()}
    >
      <InputPrimitive
        data-slot="control"
        disabled={disabled}
        render={<textarea rows={rows} />}
        className={cn(
          textareaVariants({ size: resolvedSize, resize }),
          disabled
            ? "text-content-disabled placeholder:text-content-disabled"
            : "text-content-strong"
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  )
}

export { Textarea }
export type { TextareaProps }
