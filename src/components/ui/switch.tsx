"use client"

import { SwitchControl, type SwitchControlProps } from "./switch-control"

type SwitchProps = SwitchControlProps

function Switch(props: SwitchProps) {
  return <SwitchControl {...props} />
}

export { Switch }
export type { SwitchProps }
