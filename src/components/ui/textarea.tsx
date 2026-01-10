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
  }

function Textarea({
  className,
  size,
  rows = 3,
  resize = "vertical",
  disabled,
  ...props
}: TextareaProps) {
  const resolvedSize: TextareaSize = size ?? "m"
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      data-slot="textarea"
      data-size={resolvedSize}
      className={cn(
        textareaFieldVariants({ size: resolvedSize }),
        "group relative",
        disabled ? "cursor-not-allowed bg-actions-secondary-disabled" : "cursor-text",
        !disabled && "hover:bg-actions-secondary-hover",
        "has-[:focus-visible]:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        className
      )}
      onClick={() => containerRef.current?.querySelector("textarea")?.focus()}
    >
      <InputPrimitive
        data-slot="control"
        disabled={disabled}
        render={<textarea rows={rows} />}
        className={cn(
          textareaVariants({ size: resolvedSize, resize }),
          disabled
            ? "cursor-not-allowed text-content-disabled placeholder:text-content-disabled"
            : "text-content-strong"
        )}
        {...props}
      />
    </div>
  )
}

export { Textarea }
export type { TextareaProps }
