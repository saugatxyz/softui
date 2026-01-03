import fs from "fs"
import path from "path"

type TokenValue = {
  $value: unknown
  $extensions?: {
    "com.figma.aliasData"?: {
      targetVariableName?: string
    }
  }
}

type TokenNode = TokenValue | TokenTree

interface TokenTree {
  [key: string]: TokenNode
}

const tokensDir = path.join(process.cwd(), "tokens")

const readJson = (filename: string) =>
  JSON.parse(fs.readFileSync(path.join(tokensDir, filename), "utf8"))

const cached = {
  light: undefined as undefined | Record<string, TokenNode>,
  value: undefined as undefined | Record<string, TokenNode>,
  typography: undefined as undefined | Record<string, TokenNode>,
  color: undefined as undefined | Record<string, TokenNode>,
}

const getLightTokens = () => {
  if (!cached.light) cached.light = readJson("light.tokens.json")
  return cached.light ?? {}
}

const getValueTokens = () => {
  if (!cached.value) cached.value = readJson("value.tokens.json")
  return cached.value ?? {}
}

const getTypographyTokens = () => {
  if (!cached.typography) cached.typography = readJson("typography.tokens.json")
  return cached.typography ?? {}
}

const getColorTokens = () => {
  if (!cached.color) cached.color = readJson("color.tokens.json")
  return cached.color ?? {}
}

const flattenTokens = (
  obj: TokenNode,
  pathParts: string[] = [],
  out: { name: string; token: TokenValue }[] = []
) => {
  if (!obj || typeof obj !== "object") return out
  if ("$value" in obj) {
    out.push({ name: pathParts.join("."), token: obj as TokenValue })
    return out
  }
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue
    flattenTokens(value, pathParts.concat(key), out)
  }
  return out
}

const normalizeInverseToken = (name: string) =>
  name.replace("content.inverse.muted", "content.inverse.disabled")

const humanize = (value: string) => value.replace(/-/g, " ")
const capitalize = (value: string) =>
  value ? value[0].toUpperCase() + value.slice(1) : value
const stripTrailingPeriod = (value: string) => value.replace(/\.$/, "")

const describeColorToken = (name: string) => {
  const parts = name.split(".")
  const section = parts[0]

  if (section === "surface") {
    const role = parts[1]
    if (role === "page") return "Page background"
    if (role === "canvas") return "Canvas background behind surfaces"
    if (role === "card") return "Card surface fill"
    if (role === "overlay") return "Overlay surface for raised content"
    if (role === "inverse") return "Inverse surface for dark contexts"
    if (role === "interactive") {
      return `Interactive surface (${humanize(parts[2])})`
    }
    if (role === "feedback") {
      return `Feedback surface for ${humanize(parts[2])} (${humanize(
        parts[3]
      )})`
    }
    if (role === "decorative") {
      return `Decorative ${humanize(parts[2])} surface (${humanize(parts[3])})`
    }
  }

  if (section === "content") {
    const role = parts[1]
    if (role === "strong") return "Primary text and icon color"
    if (role === "subtle") return "Secondary text and icon color"
    if (role === "muted") return "Tertiary text and icon color"
    if (role === "disabled") return "Disabled text and icon color"
    if (role === "link") {
      return `Link text (${humanize(parts[2])})`
    }
    if (role === "feedback") {
      return `Feedback content for ${humanize(parts[2])} (${humanize(
        parts[3]
      )})`
    }
    if (role === "decorative") {
      return `Decorative content for ${humanize(parts[2])} (${humanize(
        parts[3]
      )})`
    }
    if (role === "inverse") {
      return `Content on inverse surfaces (${humanize(parts[2])})`
    }
    if (role === "on-accent") {
      return `Content on accent fills (${humanize(parts[2])})`
    }
  }

  if (section === "actions") {
    return `${capitalize(humanize(parts[1]))} action fill (${humanize(
      parts[2]
    )})`
  }

  if (section === "border") {
    const role = parts[1]
    if (role === "subtle") return "Subtle borders and dividers"
    if (role === "inverse") return "Borders on inverse surfaces"
    if (role === "interactive") {
      return `Interactive border (${humanize(parts[2])})`
    }
    if (role === "feedback") {
      return `Feedback border for ${humanize(parts[2])} (${humanize(
        parts[3]
      )})`
    }
    if (role === "decorative") {
      return `Decorative border for ${humanize(parts[2])} (${humanize(
        parts[3]
      )})`
    }
  }

  if (section === "utility") {
    const role = parts[1]
    if (role === "kbd") return "Keyboard key surface"
    if (role === "focus") return `Focus ring ${humanize(parts[2])}`
    if (role === "shadow") {
      const layer = parts[2]?.replace("l", "")
      return `Shadow tint layer ${layer}`
    }
  }

  return stripTrailingPeriod(
    `Color token for ${humanize(name.replace(/\./g, " "))}`
  )
}

export const getColorTokenSections = () => {
  const lightTokens = getLightTokens()
  const sections = [
    {
      key: "surface",
      title: "Surface",
      description: "Backgrounds and elevation layers across the UI.",
    },
    {
      key: "content",
      title: "Content",
      description: "Text, icon, and inline content colors.",
    },
    {
      key: "actions",
      title: "Actions",
      description: "Interactive fills for buttons and controls.",
    },
    {
      key: "border",
      title: "Border",
      description: "Dividers, outlines, and interactive borders.",
    },
    {
      key: "utility",
      title: "Utility",
      description: "Focus rings and shadow utilities.",
    },
  ]

  return sections.map((section) => {
    const node = lightTokens[section.key] as TokenNode
    const tokens = flattenTokens(node, [section.key]).map((entry) => {
      const normalized = normalizeInverseToken(entry.name)
      return {
        name: normalized,
        cssVar: `--${normalized.replace(/\./g, "-")}`,
        description: describeColorToken(normalized),
      }
    })
    return { ...section, tokens }
  })
}

export const getSpacingScale = () => {
  const valueTokens = getValueTokens()
  const spacing = (valueTokens.spacing ?? {}) as Record<string, TokenValue>
  const keys = Object.keys(spacing)
    .map((key) => Number(key))
    .filter((value) => !Number.isNaN(value))
    .sort((a, b) => a - b)
    .map(String)
  return keys.map((key) => ({
    token: `space/${key}`,
    value: `${(spacing[key].$value as number) ?? 0}px`,
  }))
}

export const getRadiusScale = () => {
  const valueTokens = getValueTokens()
  const radius = (valueTokens.radius ?? {}) as Record<string, TokenValue>
  const numericKeys = Object.keys(radius)
    .filter((key) => key !== "max")
    .map((key) => Number(key))
    .filter((value) => !Number.isNaN(value))
    .sort((a, b) => a - b)
    .map(String)
  const orderedKeys = [...numericKeys, ...(radius.max ? ["max"] : [])]
  return orderedKeys.map((key) => ({
    token: `radius/${key}`,
    value: `${(radius[key].$value as number) ?? 0}px`,
  }))
}

const typeOrder = ["2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl"]

export const getTypographyScale = () => {
  const typography = getTypographyTokens()
  const sizeTokens = typography["font-size"] as Record<string, TokenValue>
  const lineTokens = typography["line-height"] as Record<string, TokenValue>

  return typeOrder
    .filter((key) => sizeTokens?.[key] && lineTokens?.[key])
    .map((key) => ({
      token: key,
      value: `${sizeTokens[key].$value} / ${lineTokens[key].$value}`,
    }))
}

const weightMap = new Map([
  ["Regular", "400"],
  ["Semibold", "550"],
])

export const getTypographyWeights = () => {
  const typography = getTypographyTokens()
  const weights = typography["font-weight"] as Record<string, TokenValue>
  const ordered = ["default", "medium", "semibold"]
  return ordered
    .filter((key) => weights?.[key])
    .map((key) => {
      const raw = weights[key].$value as string
      const mapped = weightMap.get(raw) ?? raw
      return { token: key, value: mapped }
    })
}

const parseAliasValue = (value: unknown) => {
  if (typeof value !== "string") return String(value ?? "")
  const match = value.match(/^\{(.+)\}$/)
  const inner = match ? match[1] : value
  return inner.replace(".", "/")
}

export const getPaletteScale = (palette: "theme" | "base") => {
  const colorTokens = getColorTokens()
  const scale = (colorTokens[palette] ?? {}) as Record<string, TokenValue>
  const keys = Object.keys(scale)
    .map((key) => Number(key))
    .filter((value) => !Number.isNaN(value))
    .sort((a, b) => a - b)
    .map(String)

  return keys.map((key) => ({
    token: `${palette}/${key}`,
    source: parseAliasValue(scale[key].$value),
  }))
}
