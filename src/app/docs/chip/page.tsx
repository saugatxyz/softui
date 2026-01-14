"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Chip } from "@/components/ui/chip"
import { ChipGroup } from "@/components/ui/chip-group"
import { ChipPrefix } from "@/components/ui/chip-prefix"
import { StarFillIcon, HeartFillIcon, CheckCircleIcon, SpamFillIcon } from "@/icons"

const sizes = [
  { value: "s", label: "S", height: 24 },
  { value: "m", label: "M", height: 32 },
] as const

const prefixTypes = [
  { value: "avatar", label: "Avatar" },
  { value: "token", label: "Token" },
  { value: "logo", label: "Logo" },
  { value: "emphasized", label: "Emphasized Icon" },
] as const

const decorativeColors = [
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "amber", label: "Amber" },
  { value: "yellow", label: "Yellow" },
  { value: "lime", label: "Lime" },
  { value: "green", label: "Green" },
  { value: "emerald", label: "Emerald" },
  { value: "teal", label: "Teal" },
  { value: "cyan", label: "Cyan" },
  { value: "sky", label: "Sky" },
  { value: "blue", label: "Blue" },
  { value: "indigo", label: "Indigo" },
  { value: "violet", label: "Violet" },
  { value: "purple", label: "Purple" },
  { value: "fuchsia", label: "Fuchsia" },
  { value: "pink", label: "Pink" },
  { value: "rose", label: "Rose" },
] as const

const avatarImages = [
  "/avatars/avatar-1.png",
  "/avatars/avatar-2.png",
  "/avatars/avatar-3.png",
]

export default function ChipDocsPage() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(["Development"]))

  const isSelected = (id: string) => selected.has(id)

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const remove = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Chip</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Compact, interactive element for filtering, selection, and input
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Chip, ChipGroup } from "@/components/ui/chip"
import { ChipPrefix } from "@/components/ui/chip-prefix"
import { StarFillIcon } from "@/icons"

<ChipGroup label="Categories">
  <Chip>Design</Chip>
  <Chip leadingIcon={<StarFillIcon />}>Featured</Chip>
  <Chip selected onRemove={() => {}}>Marketing</Chip>
</ChipGroup>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          {sizes.map((size) => (
            <div
              key={size.value}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-body-m text-content-strong">{size.label}</p>
                <p className="text-body-m text-content-subtle">
                  {size.height}px height
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-4)]">
                {["Design", "Development", "Marketing"].map((item) => {
                  const id = `sizes-${size.value}-${item}`
                  return (
                    <Chip
                      key={id}
                      size={size.value}
                      selected={isSelected(id)}
                      onClick={() => toggle(id)}
                      onRemove={() => remove(id)}
                    >
                      {item}
                    </Chip>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Icon</h2>
        <div className="flex flex-col">
          {sizes.map((size) => (
            <div
              key={size.value}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div className="md:min-w-[220px]">
                <p className="text-body-m text-content-strong">{size.label}</p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-4)]">
                {[
                  { name: "Featured", icon: <StarFillIcon /> },
                  { name: "Popular", icon: <HeartFillIcon /> },
                  { name: "Verified", icon: <CheckCircleIcon /> },
                  { name: "Urgent", icon: <SpamFillIcon /> },
                ].map((item) => {
                  const id = `icon-${size.value}-${item.name}`
                  return (
                    <Chip
                      key={id}
                      size={size.value}
                      leadingIcon={item.icon}
                      selected={isSelected(id)}
                      onClick={() => toggle(id)}
                      onRemove={() => remove(id)}
                    >
                      {item.name}
                    </Chip>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">With Prefix</h2>
          <p className="text-body-m text-content-subtle">
            Use ChipPrefix for avatars, tokens, logos, or emphasized icons.
          </p>
        </div>
        <div className="flex flex-col">
          {prefixTypes.map((prefixType) => (
            <div
              key={prefixType.value}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div className="md:min-w-[220px]">
                <p className="text-body-m text-content-strong">{prefixType.label}</p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-4)]">
                {prefixType.value === "avatar" && (
                  <>
                    {[
                      { name: "Alice", size: "s" as const, src: avatarImages[0] },
                      { name: "Bob", size: "m" as const, src: avatarImages[1] },
                    ].map((person) => {
                      const id = `avatar-${person.name}`
                      return (
                        <Chip
                          key={id}
                          size={person.size}
                          prefix={<ChipPrefix type="avatar" size={person.size} src={person.src} />}
                          selected={isSelected(id)}
                          onClick={() => toggle(id)}
                          onRemove={() => remove(id)}
                        >
                          {person.name}
                        </Chip>
                      )
                    })}
                  </>
                )}
                {prefixType.value === "token" && (
                  <>
                    {[
                      { name: "Bitcoin", size: "s" as const, token: "btc" as const },
                      { name: "Ethereum", size: "m" as const, token: "eth" as const },
                    ].map((item) => {
                      const id = `token-${item.name}`
                      return (
                        <Chip
                          key={id}
                          size={item.size}
                          prefix={<ChipPrefix type="token" token={item.token} size={item.size} />}
                          selected={isSelected(id)}
                          onClick={() => toggle(id)}
                          onRemove={() => remove(id)}
                        >
                          {item.name}
                        </Chip>
                      )
                    })}
                  </>
                )}
                {prefixType.value === "logo" && (
                  <>
                    {[
                      { name: "Claude", size: "s" as const, logo: "claude" as const },
                      { name: "OpenAI", size: "m" as const, logo: "openai" as const },
                    ].map((item) => {
                      const id = `logo-${item.name}`
                      return (
                        <Chip
                          key={id}
                          size={item.size}
                          prefix={<ChipPrefix type="logo" logo={item.logo} size={item.size} />}
                          selected={isSelected(id)}
                          onClick={() => toggle(id)}
                          onRemove={() => remove(id)}
                        >
                          {item.name}
                        </Chip>
                      )
                    })}
                  </>
                )}
                {prefixType.value === "emphasized" && (
                  <div className="ml-auto flex max-w-[500px] flex-wrap items-center justify-end gap-[var(--space-4)]">
                    {decorativeColors.map((color) => {
                      const id = `emphasized-${color.value}`
                      return (
                        <Chip
                          key={id}
                          size="s"
                          prefix={
                            <ChipPrefix
                              type={`icon-emphasized-${color.value}`}
                              size="s"
                              icon={<StarFillIcon />}
                            />
                          }
                          selected={isSelected(id)}
                          onClick={() => toggle(id)}
                          onRemove={() => remove(id)}
                        >
                          {color.label}
                        </Chip>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-4)]">
              {["Design", "Development", "Marketing"].map((item) => {
                const id = `states-default-${item}`
                return (
                  <Chip
                    key={id}
                    selected={isSelected(id)}
                    onClick={() => toggle(id)}
                    onRemove={() => remove(id)}
                  >
                    {item}
                  </Chip>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Selected</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-4)]">
              {["Design", "Development", "Marketing"].map((item) => {
                const id = `states-selected-${item}`
                return (
                  <Chip
                    key={id}
                    selected={isSelected(id)}
                    onClick={() => toggle(id)}
                    onRemove={() => remove(id)}
                  >
                    {item}
                  </Chip>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-4)]">
              <Chip disabled>Design</Chip>
              <Chip disabled>Development</Chip>
              <Chip disabled selected onRemove={() => {}}>Marketing</Chip>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Chip Group</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">S</p>
              <p className="text-body-m text-content-subtle">24px height</p>
            </div>
            <ChipGroup label="Categories" size="s">
              {[
                { name: "Featured", icon: <StarFillIcon /> },
                { name: "Popular", icon: <HeartFillIcon /> },
                { name: "Verified", icon: <CheckCircleIcon /> },
              ].map((item) => {
                const id = `group-s-${item.name}`
                return (
                  <Chip
                    key={id}
                    leadingIcon={item.icon}
                    selected={isSelected(id)}
                    onClick={() => toggle(id)}
                    onRemove={() => remove(id)}
                  >
                    {item.name}
                  </Chip>
                )
              })}
            </ChipGroup>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">M</p>
              <p className="text-body-m text-content-subtle">32px height</p>
            </div>
            <ChipGroup label="Integrations" size="m">
              {[
                { name: "Claude", logo: "claude" as const },
                { name: "OpenAI", logo: "openai" as const },
                { name: "Google", logo: "google" as const },
              ].map((item) => {
                const id = `group-m-${item.name}`
                return (
                  <Chip
                    key={id}
                    prefix={<ChipPrefix type="logo" logo={item.logo} size="m" />}
                    selected={isSelected(id)}
                    onClick={() => toggle(id)}
                    onRemove={() => remove(id)}
                  >
                    {item.name}
                  </Chip>
                )
              })}
            </ChipGroup>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Accessibility</h2>
        <div className="flex flex-col gap-[var(--space-12)]">
          <p className="text-body-m text-content-subtle">
            Chips with remove functionality are fully keyboard accessible:
          </p>
          <ul className="list-inside list-disc text-body-m text-content-subtle">
            <li>Tab to focus the chip</li>
            <li>Enter or Space to toggle selection</li>
            <li>Backspace or Delete while focused on a selected chip removes it</li>
            <li>Click the X button to remove (pointer users)</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
