"use client"

import { CheckboxControl, type CheckboxControlProps } from "./checkbox-control"

type CheckboxProps = CheckboxControlProps

function Checkbox(props: CheckboxProps) {
  return <CheckboxControl {...props} />
}

export { Checkbox }
export type { CheckboxProps }
