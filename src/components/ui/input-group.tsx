"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import { RiExpandUpDownLine } from "@remixicon/react"

import { cn } from "@/lib/utils"

const fieldContainerVariants = cva(
  "flex w-full items-center",
  {
    variants: {
      size: {
        s: "h-[var(--space-32)]",
        m: "h-[var(--space-36)]",
        l: "h-[var(--space-40)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const segmentVariants = cva(
  "flex h-full items-center gap-[var(--space-8)] bg-actions-secondary-default transition-colors duration-200",
  {
    variants: {
      size: {
        s: "px-[var(--space-10)]",
        m: "px-[var(--space-12)]",
        l: "px-[var(--space-12)]",
      },
      position: {
        left: "rounded-l-[var(--radius-10)] border-r border-border-subtle",
        middle: "",
        right: "rounded-r-[var(--radius-10)] border-l border-border-subtle",
      },
      type: {
        static: "",
        action: "",
        select: "",
      },
    },
    defaultVariants: {
      size: "m",
      position: "left",
      type: "static",
    },
  }
)

const mainSegmentVariants = cva(
  "flex h-full flex-1 items-center gap-[var(--space-8)] bg-actions-secondary-default transition-colors duration-200",
  {
    variants: {
      size: {
        s: "px-[var(--space-10)]",
        m: "px-[var(--space-12)]",
        l: "px-[var(--space-12)]",
      },
      hasPrefix: {
        true: "",
        false: "rounded-l-[var(--radius-10)]",
      },
      hasSuffix: {
        true: "",
        false: "rounded-r-[var(--radius-10)]",
      },
    },
    defaultVariants: {
      size: "m",
      hasPrefix: false,
      hasSuffix: false,
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
  "flex shrink-0 items-center justify-center [&_svg]:size-full",
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

type InputGroupSize = "s" | "m" | "l"
type SegmentType = "static" | "action" | "select"

type InputGroupProps = Omit<React.ComponentProps<typeof InputPrimitive>, "size" | "prefix" | "suffix"> &
  VariantProps<typeof fieldContainerVariants> & {
    /** Content for the prefix segment (text or select element) */
    prefix?: React.ReactNode
    /** Visual element before prefix content (icon, crypto, avatar) */
    prefixIcon?: React.ReactNode
    /** Type of prefix segment - affects styling */
    prefixType?: SegmentType
    /** Click handler for prefix (when type is action) */
    onPrefixClick?: () => void
    /** Content for the suffix segment (text or select element) */
    suffix?: React.ReactNode
    /** Visual element before suffix content (icon, crypto, avatar) */
    suffixIcon?: React.ReactNode
    /** Type of suffix segment - affects styling */
    suffixType?: SegmentType
    /** Click handler for suffix (when type is action) */
    onSuffixClick?: () => void
    /** Icon shown before the input text */
    leadingIcon?: React.ReactNode
    /** Icon shown after the input text */
    trailingIcon?: React.ReactNode
    /** Only show focus ring on keyboard navigation */
    focusVisibleOnly?: boolean
  }

function InputGroup({
  className,
  size,
  prefix,
  prefixIcon,
  prefixType = "static",
  onPrefixClick,
  suffix,
  suffixIcon,
  suffixType = "static",
  onSuffixClick,
  leadingIcon,
  trailingIcon,
  focusVisibleOnly,
  disabled,
  ...props
}: InputGroupProps) {
  const resolvedSize: InputGroupSize = size ?? "m"
  const hasPrefix = Boolean(prefix) || Boolean(prefixIcon)
  const hasSuffix = Boolean(suffix) || Boolean(suffixIcon)
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

  const getSegmentTextColor = (type: SegmentType) => {
    if (disabled) return "text-content-disabled"
    if (type === "select") return "text-content-strong"
    return "text-content-subtle"
  }

  const getSegmentFontWeight = (type: SegmentType) => {
    if (type === "action") return "font-[var(--font-weight-medium)]"
    return "font-[var(--font-weight-default)]"
  }

  return (
    <div
      data-slot="input-group"
      data-size={resolvedSize}
      className={cn(
        fieldContainerVariants({ size: resolvedSize }),
        "relative rounded-[var(--radius-10)]",
        className
      )}
      onMouseDown={handleMouseDown}
    >
      {/* Prefix segment */}
      {hasPrefix && (
        <div
          data-slot="prefix"
          data-type={prefixType}
          tabIndex={!disabled && prefixType === "action" ? 0 : undefined}
          role={prefixType === "action" ? "button" : undefined}
          className={cn(
            segmentVariants({ size: resolvedSize, position: "left", type: prefixType }),
            "group/prefix",
            !disabled && (prefixType === "action" || prefixType === "select") && "cursor-pointer",
            !disabled && "hover:bg-actions-secondary-hover",
            !disabled && prefixType === "action" && "focus:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
            !disabled && prefixType === "select" && "focus-within:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
            disabled && "bg-actions-secondary-disabled"
          )}
          onClick={(e) => {
            if (disabled) return
            if (prefixType === "action") {
              onPrefixClick?.()
            } else if (prefixType === "select") {
              const select = e.currentTarget.querySelector("select") as HTMLSelectElement | null
              if (select && e.target !== select) {
                if (typeof select.showPicker === "function") {
                  select.showPicker()
                } else {
                  select.focus()
                }
              }
            }
          }}
          onKeyDown={(e) => {
            if (disabled) return
            if (prefixType === "action" && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault()
              onPrefixClick?.()
            } else if (prefixType === "select" && (e.key === "Enter" || e.key === " ")) {
              const select = e.currentTarget.querySelector("select") as HTMLSelectElement | null
              if (select && typeof select.showPicker === "function") {
                e.preventDefault()
                select.showPicker()
              }
            }
          }}
        >
          {prefixIcon && (
            <span
              className={cn(
                "flex shrink-0 items-center justify-center [&>svg]:size-[16px] transition-colors duration-200",
                disabled ? "text-content-disabled" : "text-content-subtle",
                !disabled && prefixType === "action" && "group-hover/prefix:text-content-strong"
              )}
            >
              {prefixIcon}
            </span>
          )}
          {prefix && (
            <span
              className={cn(
                "flex items-center text-[length:var(--font-size-m)] leading-[var(--line-height-m)] transition-colors duration-200",
                getSegmentFontWeight(prefixType),
                getSegmentTextColor(prefixType),
                !disabled && prefixType === "action" && "group-hover/prefix:text-content-strong"
              )}
            >
              {prefix}
            </span>
          )}
          {prefixType === "select" && (
            <span
              className={cn(
                "flex shrink-0 items-center justify-center",
                disabled ? "text-content-disabled" : "text-content-muted"
              )}
            >
              <RiExpandUpDownLine className="size-[16px]" />
            </span>
          )}
        </div>
      )}

      {/* Main input segment */}
      <div
        data-slot="field"
        className={cn(
          mainSegmentVariants({
            size: resolvedSize,
            hasPrefix,
            hasSuffix,
          }),
          "cursor-text",
          !disabled && "hover:bg-actions-secondary-hover",
          disabled && "bg-actions-secondary-disabled",
          showFocusRing && "shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {leadingIcon && (
          <span
            data-slot="icon"
            className={cn(
              iconVariants({ size: resolvedSize }),
              disabled ? "text-content-disabled" : "text-content-subtle"
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
              disabled ? "text-content-disabled" : "text-content-subtle"
            )}
          >
            {trailingIcon}
          </span>
        )}
      </div>

      {/* Suffix segment */}
      {hasSuffix && (
        <div
          data-slot="suffix"
          data-type={suffixType}
          tabIndex={!disabled && suffixType === "action" ? 0 : undefined}
          role={suffixType === "action" ? "button" : undefined}
          className={cn(
            segmentVariants({ size: resolvedSize, position: "right", type: suffixType }),
            "group/suffix",
            !disabled && (suffixType === "action" || suffixType === "select") && "cursor-pointer",
            !disabled && "hover:bg-actions-secondary-hover",
            !disabled && suffixType === "action" && "focus:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
            !disabled && suffixType === "select" && "focus-within:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
            disabled && "bg-actions-secondary-disabled"
          )}
          onClick={(e) => {
            if (disabled) return
            if (suffixType === "action") {
              onSuffixClick?.()
            } else if (suffixType === "select") {
              const select = e.currentTarget.querySelector("select") as HTMLSelectElement | null
              if (select && e.target !== select) {
                if (typeof select.showPicker === "function") {
                  select.showPicker()
                } else {
                  select.focus()
                }
              }
            }
          }}
          onKeyDown={(e) => {
            if (disabled) return
            if (suffixType === "action" && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault()
              onSuffixClick?.()
            } else if (suffixType === "select" && (e.key === "Enter" || e.key === " ")) {
              const select = e.currentTarget.querySelector("select") as HTMLSelectElement | null
              if (select && typeof select.showPicker === "function") {
                e.preventDefault()
                select.showPicker()
              }
            }
          }}
        >
          {suffixIcon && (
            <span
              className={cn(
                "flex shrink-0 items-center justify-center [&>svg]:size-[16px] transition-colors duration-200",
                disabled ? "text-content-disabled" : "text-content-subtle",
                !disabled && suffixType === "action" && "group-hover/suffix:text-content-strong"
              )}
            >
              {suffixIcon}
            </span>
          )}
          {suffix && (
            <span
              className={cn(
                "flex items-center text-[length:var(--font-size-m)] leading-[var(--line-height-m)] transition-colors duration-200",
                getSegmentFontWeight(suffixType),
                getSegmentTextColor(suffixType),
                !disabled && suffixType === "action" && "group-hover/suffix:text-content-strong"
              )}
            >
              {suffix}
            </span>
          )}
          {suffixType === "select" && (
            <span
              className={cn(
                "flex shrink-0 items-center justify-center",
                disabled ? "text-content-disabled" : "text-content-muted"
              )}
            >
              <RiExpandUpDownLine className="size-[16px]" />
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export { InputGroup }
export type { InputGroupProps, SegmentType }
