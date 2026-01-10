"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Switch } from "@/components/ui/switch"
import { SwitchControl } from "@/components/ui/switch-control"

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
          code={`import { Switch } from "@/components/ui/switch"
import { SwitchControl } from "@/components/ui/switch-control"

<Switch label="Enable notifications" />
<Switch
  label="Dark mode"
  description="Use dark theme across the app"
/>
<Switch label="Label on right" position="left" />
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
          <h2 className="text-body-xl-semibold">With Label</h2>
          <p className="text-body-m text-content-subtle">
            Use the label prop for side-by-side alignment and position to change placement.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label on left</p>
            </div>
            <Switch label="Enable notifications" />
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label on right</p>
            </div>
            <Switch label="Enable notifications" position="left" />
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label and description</p>
            </div>
            <Switch
              label="Dark mode"
              description="Switch between light and dark themes"
            />
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Switch label="Notifications" disabled />
              <Switch label="Dark mode" disabled defaultChecked />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
