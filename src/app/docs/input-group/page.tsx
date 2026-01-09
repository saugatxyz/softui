"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { InputGroup } from "@/components/ui/input-group"
import { Field } from "@/components/ui/field"
import { RiSearchLine, RiGlobalLine, RiTwitterXFill, RiInstagramFill, RiLinkedinFill, RiAtLine } from "@remixicon/react"
import { Avatar } from "@/components/ui/avatar"
import { Crypto } from "@/components/ui/crypto"

function SocialSelect() {
  const [platform, setPlatform] = React.useState("instagram")

  const icons: Record<string, React.ReactNode> = {
    twitter: <RiTwitterXFill />,
    instagram: <RiInstagramFill />,
    linkedin: <RiLinkedinFill />,
  }

  return (
    <InputGroup
      prefixIcon={icons[platform]}
      prefix={
        <select
          className="appearance-none bg-transparent outline-none cursor-pointer text-content-strong"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="twitter">Twitter</option>
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      }
      prefixType="select"
      placeholder="username"
      focusVisibleOnly
    />
  )
}

function CurrencySelect() {
  const [currency, setCurrency] = React.useState("btc")

  return (
    <InputGroup
      prefixIcon={<Crypto crypto={currency as "btc" | "eth" | "sol"} size={20} />}
      prefix={
        <select
          className="appearance-none bg-transparent outline-none cursor-pointer text-content-strong"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="btc">BTC</option>
          <option value="eth">ETH</option>
          <option value="sol">SOL</option>
        </select>
      }
      prefixType="select"
      suffix="Max"
      suffixType="action"
      onSuffixClick={() => console.log("Max clicked")}
      placeholder="0.00"
      focusVisibleOnly
    />
  )
}

export default function InputGroupDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Input Group</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Input field with prefix and suffix segments
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { InputGroup } from "@/components/ui/input-group"

// Static prefix
<InputGroup prefix="https://" placeholder="example.com" />

// With leading icon in field
<InputGroup leadingIcon={<RiSearchLine />} placeholder="Search..." />

// Action suffix with icon
<InputGroup
  suffixIcon={<RiSearchLine />}
  suffix="Check"
  suffixType="action"
  onSuffixClick={() => {}}
  placeholder="username"
/>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Prefix & Suffix</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Prefix</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <SocialSelect />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Suffix</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <InputGroup
                leadingIcon={<RiAtLine />}
                suffixIcon={<RiSearchLine />}
                suffix="Check"
                suffixType="action"
                onSuffixClick={() => console.log("Check clicked")}
                placeholder="username"
                focusVisibleOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Both</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <CurrencySelect />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Icons</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Leading icon</p>
              <p className="text-body-m text-content-subtle">Inside input field</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <InputGroup
                leadingIcon={<RiSearchLine />}
                placeholder="Search..."
                focusVisibleOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Trailing icon</p>
              <p className="text-body-m text-content-subtle">Inside input field</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <InputGroup
                prefix="https://"
                trailingIcon={<RiGlobalLine />}
                placeholder="example.com"
                focusVisibleOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Segment icon</p>
              <p className="text-body-m text-content-subtle">In prefix/suffix</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <InputGroup
                prefixIcon={<RiGlobalLine />}
                placeholder="example.com"
                focusVisibleOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Crypto</p>
              <p className="text-body-m text-content-subtle">In prefix/suffix</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <InputGroup
                prefixIcon={<Crypto crypto="eth" size={20} />}
                placeholder="0.00"
                focusVisibleOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Avatar</p>
              <p className="text-body-m text-content-subtle">In prefix/suffix</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <InputGroup
                prefixIcon={<Avatar size="2xs" initials="JD" />}
                placeholder="Send message..."
                focusVisibleOnly
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Small</p>
              <p className="text-body-m text-content-subtle">32px height</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <InputGroup
                size="s"
                prefix="https://"
                placeholder="example.com"
                focusVisibleOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium</p>
              <p className="text-body-m text-content-subtle">36px height</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <InputGroup
                size="m"
                prefix="https://"
                placeholder="example.com"
                focusVisibleOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large</p>
              <p className="text-body-m text-content-subtle">40px height</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <InputGroup
                size="l"
                prefix="https://"
                placeholder="example.com"
                focusVisibleOnly
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Field</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label only</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Website">
                <InputGroup
                  prefix="https://"
                  placeholder="example.com"
                  focusVisibleOnly
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label and description</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Website" description="Enter your company website">
                <InputGroup
                  prefix="https://"
                  placeholder="example.com"
                  focusVisibleOnly
                />
              </Field>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Website">
                <InputGroup
                  prefix="https://"
                  placeholder="example.com"
                  focusVisibleOnly
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Website" disabled>
                <InputGroup
                  prefix="https://"
                  placeholder="example.com"
                  disabled
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Error</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Website" error="Please enter a valid URL">
                <InputGroup
                  prefix="https://"
                  placeholder="example.com"
                  focusVisibleOnly
                />
              </Field>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
