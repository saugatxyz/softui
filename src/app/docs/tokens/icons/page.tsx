"use client"

import * as React from "react"
import * as RemixIcons from "@remixicon/react"
import { motion } from "motion/react"

import {
  AppsFillIcon,
  CheckCircleIcon,
  CloseIcon,
  CopyIcon,
  MenuSearchLineIcon,
  SearchIcon,
} from "@/icons"

type IconEntry = {
  name: string
  Component: React.ComponentType<{ className?: string }>
}

const allIcons: IconEntry[] = Object.entries(RemixIcons)
  .filter(
    (entry): entry is [string, React.ComponentType<{ className?: string }>] =>
      entry[0].startsWith("Ri") && typeof entry[1] === "function"
  )
  .map(([name, Component]) => ({ name, Component }))

const iconLookup = new Map(allIcons.map((icon) => [icon.name, icon]))

const categorySource =
  (RemixIcons as unknown as { categories?: Record<string, string[]> }).categories ??
  (RemixIcons as unknown as { iconCategories?: Record<string, string[]> })
    .iconCategories ??
  null


const formatIconLabel = (name: string) =>
  name
    .replace(/^Ri/, "")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([a-zA-Z])([0-9])/g, "$1-$2")
    .replace(/([0-9])([a-zA-Z])/g, "$1-$2")
    .toLowerCase()

function getGroupedIcons(
  query: string,
  groups: Record<string, string[]> | null
) {
  const normalizedQuery = query.trim().toLowerCase()
  const matchesQuery = (name: string) =>
    normalizedQuery === "" ||
    name.toLowerCase().includes(normalizedQuery) ||
    formatIconLabel(name).includes(normalizedQuery)

  if (!groups) {
    return [
      {
        title: "All icons",
        icons: allIcons.filter((icon) => matchesQuery(icon.name)),
      },
    ]
  }

  return Object.entries(groups)
    .map(([title, names]) => ({
      title,
      icons: names
        .map((name) => iconLookup.get(name))
        .filter((icon): icon is IconEntry => Boolean(icon))
        .filter((icon) => matchesQuery(icon.name)),
    }))
    .filter((group) => group.icons.length > 0)
}

export default function TokensIconsPage() {
  const [query, setQuery] = React.useState("")
  const [copiedName, setCopiedName] = React.useState<string | null>(null)
  const handleCopy = React.useCallback((iconName: string) => {
    setCopiedName(iconName)
    navigator?.clipboard?.writeText(iconName).catch(() => {})
  }, [])
  const iconGroups = React.useMemo(
    () => getGroupedIcons(query, categorySource),
    [query]
  )
  const totalIcons = React.useMemo(
    () => iconGroups.reduce((count, group) => count + group.icons.length, 0),
    [iconGroups]
  )
  const showEmptyState = totalIcons === 0

  React.useEffect(() => {
    if (!copiedName) return
    const timer = window.setTimeout(() => setCopiedName(null), 1600)
    return () => window.clearTimeout(timer)
  }, [copiedName])

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-16)] md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-[var(--space-12)]">
            <div className="flex size-[32px] items-center justify-center text-content-strong">
              <AppsFillIcon className="size-8" />
            </div>
            <div className="flex flex-col gap-[var(--space-6)]">
              <h1 className="text-body-3xl-semibold">Icons</h1>
              <p className="max-w-2xl text-body-l text-content-subtle">
                Remix Icon used as icon library
              </p>
            </div>
          </div>
          <div className="flex h-[40px] w-full items-center gap-[var(--space-8)] rounded-[var(--radius-10)] bg-actions-secondary-default px-[var(--space-12)] text-content-strong transition hover:bg-actions-secondary-hover md:ml-auto md:w-[calc((100%-var(--space-4)*5)/6*2+var(--space-4))]">
            <span className="flex size-[16px] shrink-0 items-center justify-center text-content-muted">
              <SearchIcon className="size-[16px]" />
            </span>
            <input
              id="icon-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by icon name"
              aria-label="Search icons"
              className="h-full w-full bg-transparent text-body-m text-content-strong placeholder:text-content-muted focus:outline-none"
            />
            <span className="flex size-[16px] shrink-0 items-center justify-center text-content-strong">
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="flex size-[16px] items-center justify-center text-content-strong hover:text-content-strong focus:outline-none"
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <CloseIcon className="size-[16px]" />
                </button>
              ) : null}
            </span>
          </div>
        </div>
      </header>

      <section className="flex flex-1 flex-col gap-[var(--space-24)]">
        {showEmptyState ? (
          <div className="flex flex-1 flex-col justify-between border-b border-border-muted px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)] text-center">
            <div className="flex flex-1 flex-col items-center justify-center gap-[var(--space-16)]">
              <MenuSearchLineIcon className="size-[28px] text-content-strong" />
              <div className="flex flex-col gap-[var(--space-6)]">
                <p className="text-body-l text-content-strong">
                  No icons match that name
                </p>
                <p className="text-body-xs text-content-subtle">
                  Try another name or check for mispelling
                </p>
              </div>
            </div>
            <footer className="pt-[var(--space-24)] text-body-s text-content-subtle">
              Remix Icon by Remix Design, licensed under Apache-2.0.{" "}
              <a
                className="text-content-link-default hover:text-content-link-hover"
                href="https://remixicon.com"
                target="_blank"
                rel="noreferrer"
              >
                remixicon.com
              </a>
            </footer>
          </div>
        ) : (
          <div className="flex flex-col gap-[var(--space-24)]">
            {iconGroups.map((group) => (
              <section
                key={group.title}
                className="flex flex-col gap-[var(--space-12)]"
                style={{ contentVisibility: "auto" }}
              >
                {group.title !== "All icons" ? (
                  <h2 className="text-body-xl-semibold">{group.title}</h2>
                ) : null}
                <div className="grid grid-cols-4 gap-[var(--space-4)] md:grid-cols-6">
                  {group.icons.map((icon) => {
                    const IconComponent = icon.Component
                    const isCopied = copiedName === icon.name
                    return (
                      <div
                        key={icon.name}
                        onClick={() => handleCopy(icon.name)}
                        className="group relative flex aspect-square w-full cursor-pointer items-center justify-center rounded-[var(--radius-12)] bg-surface-interactive-default text-content-strong hover:bg-surface-interactive-hover"
                        title={icon.name}
                      >
                        {/* Main icon - static on desktop, morphs on mobile */}
                        <div className="relative size-[20px] md:size-[28px]">
                          <span
                            className={`absolute inset-0 flex items-center justify-center text-content-link-default transition-[opacity,transform,filter] duration-300 ease-out ${
                              isCopied ? "max-md:scale-50 max-md:opacity-0 max-md:blur-[8px]" : ""
                            }`}
                          >
                            <IconComponent className="size-full" />
                          </span>
                          <span
                            className={`absolute inset-0 flex items-center justify-center text-content-feedback-success-strong transition-[opacity,transform,filter] duration-300 ease-out md:hidden ${
                              isCopied ? "scale-100 opacity-100 blur-0" : "scale-50 opacity-0 blur-[8px]"
                            }`}
                          >
                            <CheckCircleIcon className="size-full" />
                          </span>
                        </div>
                        {/* Desktop copy/success indicator */}
                        <div
                          className={`absolute right-[var(--space-12)] top-[var(--space-12)] hidden size-[20px] items-center justify-center md:flex ${
                            isCopied ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <motion.span
                            className="absolute inset-0 flex items-center justify-center text-content-subtle"
                            animate={{
                              scale: isCopied ? 0.8 : 1,
                              opacity: isCopied ? 0 : 1,
                              filter: isCopied ? "blur(8px)" : "blur(0px)",
                            }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                          >
                            <CopyIcon className="size-[16px]" />
                          </motion.span>
                          <motion.span
                            className="absolute inset-0 flex items-center justify-center text-content-feedback-success-strong"
                            animate={{
                              scale: isCopied ? 1 : 0.8,
                              opacity: isCopied ? 1 : 0,
                              filter: isCopied ? "blur(0px)" : "blur(8px)",
                            }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                          >
                            <CheckCircleIcon className="size-[20px]" />
                          </motion.span>
                        </div>
                        <div className="pointer-events-none absolute bottom-[var(--space-16)] left-[var(--space-8)] right-[var(--space-8)] hidden truncate text-center text-body-xs text-content-subtle opacity-0 group-hover:opacity-100 md:block">
                          {formatIconLabel(icon.name)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>

      {showEmptyState ? null : (
        <footer className="text-body-s text-content-subtle">
          Remix Icon by Remix Design, licensed under Apache-2.0.{" "}
          <a
            className="text-content-link-default hover:text-content-link-hover"
            href="https://remixicon.com"
            target="_blank"
            rel="noreferrer"
          >
            remixicon.com
          </a>
        </footer>
      )}
    </div>
  )
}
