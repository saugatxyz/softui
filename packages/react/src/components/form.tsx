"use client"

import * as React from "react"
import { Form as FormPrimitive } from "@base-ui/react/form"

import { cn } from "../lib/utils"

// ============================================================================
// Types
// ============================================================================

type FormProps = FormPrimitive.Props & {
  className?: string
}

// ============================================================================
// Form Component
// ============================================================================

function Form({ className, children, ...props }: FormProps) {
  return (
    <FormPrimitive
      data-slot="form"
      className={cn("flex flex-col gap-[var(--space-24)]", className)}
      {...props}
    >
      {children}
    </FormPrimitive>
  )
}

export { Form }
export type { FormProps }
