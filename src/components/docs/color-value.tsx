"use client"

import * as React from "react"

const formatHsl = (r: number, g: number, b: number, a: number) => {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === rNorm) h = ((gNorm - bNorm) / delta) % 6
    else if (max === gNorm) h = (bNorm - rNorm) / delta + 2
    else h = (rNorm - gNorm) / delta + 4
    h = Math.round(h * 60)
    if (h < 0) h += 360
  }

  const l = (max + min) / 2
  const s =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  const hsl = `hsl(${h} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
  return a < 1 ? `${hsl} / ${a.toFixed(2)})` : `${hsl})`
}

const parseChannels = (raw: string) => {
  const [rgbPart, alphaPart] = raw.split("/")
  const rgb = rgbPart
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean)
    .map((part) => Number(part))
  if (rgb.length < 3) return null
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    a: alphaPart ? Number(alphaPart.trim()) : 1,
  }
}

const parseColor = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return null
  if (trimmed.startsWith("#")) {
    const hex = trimmed.replace("#", "")
    if (hex.length === 6 || hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1
      return { r, g, b, a }
    }
  }
  if (trimmed.startsWith("rgb")) {
    const rgbValue = trimmed.replace(/^rgba?\(/, "").replace(/\)$/, "").trim()
    return parseChannels(rgbValue)
  }
  if (/^[\d.]/.test(trimmed)) {
    return parseChannels(trimmed)
  }
  return null
}

const resolveVar = (value: string, resolver: (name: string) => string) => {
  let current = value
  let next = current.replace(/var\((--[^)]+)\)/g, (_, name) =>
    resolver(name).trim()
  )
  while (next !== current && /var\(/.test(next)) {
    current = next
    next = current.replace(/var\((--[^)]+)\)/g, (_, name) =>
      resolver(name).trim()
    )
  }
  return next
}

type ColorValueProps = {
  cssVar: string
  alias?: string | null
}

export function ColorValue({ cssVar, alias }: ColorValueProps) {
  const [hsl, setHsl] = React.useState<string>("")

  React.useEffect(() => {
    if (alias) {
      setHsl("")
      return
    }
    const root = document.documentElement
    const style = getComputedStyle(root)

    const compute = () => {
      const raw = style.getPropertyValue(cssVar).trim()
      const resolved = resolveVar(raw, (name) =>
        style.getPropertyValue(name).trim()
      )
      const parsed = parseColor(resolved)
      if (!parsed) return
      setHsl(formatHsl(parsed.r, parsed.g, parsed.b, parsed.a))
    }

    compute()
    const observer = new MutationObserver(() => compute())
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme-color", "data-base-color", "data-mode", "data-scheme"],
    })
    return () => observer.disconnect()
  }, [alias, cssVar])

  const displayValue = alias || hsl || "--"

  return (
    <span className="text-body-m text-content-subtle">{displayValue}</span>
  )
}
