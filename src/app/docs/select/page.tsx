"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Select } from "@/components/ui/select"
import { RiGlobalLine, RiUserLine } from "@remixicon/react"

export default function SelectDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Select</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Native dropdown for selecting from a list of options
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Select } from "@/components/ui/select"

<Select focusVisibleOnly>
  <option value="">Select country</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
</Select>
<Select
  label="Country"
  description="Where are you located?"
  leadingIcon={<RiGlobalLine />}
  focusVisibleOnly
>
  <option value="">Select country</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
</Select>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Small</p>
              <p className="text-body-s text-content-subtle">32px height</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Select size="s" defaultValue="" focusVisibleOnly>
                <option value="">Select option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium</p>
              <p className="text-body-s text-content-subtle">36px height</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Select size="m" defaultValue="" focusVisibleOnly>
                <option value="">Select option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large</p>
              <p className="text-body-s text-content-subtle">40px height</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Select size="l" defaultValue="" focusVisibleOnly>
                <option value="">Select option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Icon</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Leading icon</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Select leadingIcon={<RiGlobalLine />} defaultValue="" focusVisibleOnly>
                <option value="">Select country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Label</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label only</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Select label="Country" defaultValue="" focusVisibleOnly>
                <option value="">Select country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label and description</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Select
                label="Country"
                description="Select your country of residence"
                defaultValue=""
                focusVisibleOnly
              >
                <option value="">Select country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Select
                label="Role"
                leadingIcon={<RiUserLine />}
                defaultValue=""
                focusVisibleOnly
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Select
                label="Role"
                leadingIcon={<RiUserLine />}
                defaultValue=""
                disabled
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Error</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Select
                label="Role"
                leadingIcon={<RiUserLine />}
                defaultValue=""
                error="Please select a role"
                focusVisibleOnly
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
