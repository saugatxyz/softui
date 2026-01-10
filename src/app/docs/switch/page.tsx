"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Switch } from "@/components/ui/switch"
import { SwitchControl } from "@/components/ui/switch-control"
import { Field } from "@/components/ui/field"

export default function SwitchDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Switch</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Toggle control for enabling or disabling a setting
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Field } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { SwitchControl } from "@/components/ui/switch-control"

<Field label="Enable notifications">
  <Switch />
</Field>
<Field
  label="Dark mode"
  description="Use dark theme across the app"
>
  <Switch />
</Field>
<SwitchControl />`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Switch Control</h2>
          <p className="text-body-m text-content-subtle">
            The core toggle indicator without label or description.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
              <p className="text-body-m text-content-subtle">Click to toggle</p>
            </div>
            <div className="flex items-center gap-[var(--space-24)]">
              <SwitchControl />
              <SwitchControl defaultChecked />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex items-center gap-[var(--space-24)]">
              <SwitchControl disabled />
              <SwitchControl disabled defaultChecked />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">With Field Label</h2>
          <p className="text-body-m text-content-subtle">
            Use Field to provide the label and description for the switch.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label only</p>
            </div>
            <Field label="Enable notifications" className="max-w-xs">
              <Switch />
            </Field>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label and description</p>
            </div>
            <Field
              label="Dark mode"
              description="Switch between light and dark themes"
              className="max-w-xs"
            >
              <Switch />
            </Field>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Field label="Notifications" className="max-w-xs" disabled>
                <Switch disabled />
              </Field>
              <Field label="Dark mode" className="max-w-xs" disabled>
                <Switch disabled defaultChecked />
              </Field>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
