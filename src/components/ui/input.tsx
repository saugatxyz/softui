"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputFieldVariants = cva(
  "flex w-full items-center gap-[var(--space-6)] rounded-[var(--radius-10)] bg-actions-secondary-default transition-colors duration-200",
  {
    variants: {
      size: {
        s: "h-[var(--space-32)] px-[var(--space-10)]",
        m: "h-[var(--space-36)] px-[var(--space-12)]",
        l: "h-[var(--space-40)] px-[var(--space-12)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const inputVariants = cva(
  "flex-1 bg-transparent text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] outline-none placeholder:text-content-muted caret-actions-primary-default",
  {
    variants: {
      size: {
        s: "",
        m: "",
        l: "",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const iconVariants = cva(
  "flex shrink-0 items-center justify-center text-content-subtle [&_svg]:size-full",
  {
    variants: {
      size: {
        s: "size-[16px]",
        m: "size-[16px]",
        l: "size-[16px]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

type InputSize = "s" | "m" | "l"

type InputProps = Omit<React.ComponentProps<typeof InputPrimitive>, "size"> &
  VariantProps<typeof inputFieldVariants> & {
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    /** Only show focus ring on keyboard navigation */
    focusVisibleOnly?: boolean
  }

function Input({
  className,
  size,
  leadingIcon,
  trailingIcon,
  focusVisibleOnly = true,
  disabled,
  ...props
}: InputProps) {
  const resolvedSize: InputSize = size ?? "m"
  const [showFocusRing, setShowFocusRing] = React.useState(false)
  const wasMouseDown = React.useRef(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

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
      data-slot="input"
      data-size={resolvedSize}
      className={cn(
        inputFieldVariants({ size: resolvedSize }),
        "group relative cursor-text",
        !disabled && "hover:bg-actions-secondary-hover",
        showFocusRing && "shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        disabled && "bg-actions-secondary-disabled",
        className
      )}
      onMouseDown={handleMouseDown}
      onClick={() => inputRef.current?.focus()}
    >
      {leadingIcon && (
        <span
          data-slot="icon"
          className={cn(
            iconVariants({ size: resolvedSize }),
            disabled && "text-content-disabled"
          )}
        >
          {leadingIcon}
        </span>
      )}

      <InputPrimitive
        ref={inputRef}
        data-slot="control"
        disabled={disabled}
        className={cn(
          inputVariants({ size: resolvedSize }),
          disabled
            ? "text-content-disabled placeholder:text-content-disabled"
            : "text-content-strong"
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />

      {trailingIcon && (
        <span
          data-slot="icon"
          className={cn(
            iconVariants({ size: resolvedSize }),
            disabled && "text-content-disabled"
          )}
        >
          {trailingIcon}
        </span>
      )}
    </div>
  )
}

export { Input }
export type { InputProps }
