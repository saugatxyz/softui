"use client"

import * as React from "react"

import { defaultSoftUIIcons } from "./defaults/remix"
import type { SoftUIIconComponent, SoftUIIconMap, SoftUIIconSlot } from "./slots"

type SoftUIIconContextValue = {
  icons: SoftUIIconMap
}

const SoftUIIconContext = React.createContext<SoftUIIconContextValue>({
  icons: defaultSoftUIIcons,
})

export type SoftUIIconProviderProps = {
  icons?: SoftUIIconMap
  children: React.ReactNode
}

export function SoftUIIconProvider({ icons, children }: SoftUIIconProviderProps) {
  const value = React.useMemo<SoftUIIconContextValue>(
    () => ({
      icons: {
        ...defaultSoftUIIcons,
        ...icons,
      },
    }),
    [icons]
  )

  return <SoftUIIconContext.Provider value={value}>{children}</SoftUIIconContext.Provider>
}

export function useSoftUIIcon(slot: SoftUIIconSlot): SoftUIIconComponent {
  const { icons } = React.useContext(SoftUIIconContext)
  return icons[slot] ?? defaultSoftUIIcons[slot] ?? (() => null)
}

export function createSoftUIIcon(slot: SoftUIIconSlot) {
  const Icon = React.forwardRef<HTMLElement, Record<string, unknown>>(function SoftUIIcon(
    props,
    ref
  ) {
    const IconComponent = useSoftUIIcon(slot)
    // The icon slot resolves to a component type by design; forwarding ref is intentional.
    // eslint-disable-next-line react-hooks/refs
    return React.createElement(IconComponent, { ...props, ref })
  })

  Icon.displayName = "SoftUIIcon(" + slot + ")"
  return Icon
}
