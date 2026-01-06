"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Switch } from "@/components/ui/switch"
import { SwitchControl } from "@/components/ui/switch-control"

export default function SwitchDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Switch</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Toggle control for enabling or disabling a setting
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Switch } from "@/components/ui/switch"
import { SwitchControl } from "@/components/ui/switch-control"

<Switch label="Enable notifications" />
<Switch
  label="Dark mode"
  description="Use dark theme across the app"
/>
<SwitchControl />`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Switch Control</h2>
          <p className="text-body-s text-content-subtle">
            The core toggle indicator without label or description.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
              <p className="text-body-s text-content-subtle">Click to toggle</p>
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

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">With Label</h2>
          <p className="text-body-s text-content-subtle">
            Switch with an associated label for better accessibility.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label only</p>
            </div>
            <Switch label="Enable notifications" />
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
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Position</h2>
          <p className="text-body-s text-content-subtle">
            Switch can be positioned on the left or right of the label.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Right (default)</p>
            </div>
            <Switch
              label="Show online status"
              description="Let others see when you're active"
              position="right"
            />
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Left</p>
            </div>
            <Switch
              label="Show online status"
              description="Let others see when you're active"
              position="left"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Card Variant</h2>
          <p className="text-body-s text-content-subtle">
            Switch displayed inside a card container for prominence.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Card + Right</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-4)]">
              <Switch
                label="Two-factor authentication"
                description="Add an extra layer of security to your account"
                isCard
                position="right"
              />
              <Switch
                label="Biometric login"
                description="Use Face ID or fingerprint to sign in"
                isCard
                position="right"
                defaultChecked
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Card + Left</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-4)]">
              <Switch
                label="Two-factor authentication"
                description="Add an extra layer of security to your account"
                isCard
                position="left"
              />
              <Switch
                label="Biometric login"
                description="Use Face ID or fingerprint to sign in"
                isCard
                position="left"
                defaultChecked
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-4)]">
              <Switch
                label="Remember this device"
                description="Skip verification on trusted devices"
                isCard
                disabled
              />
              <Switch
                label="Single sign-on"
                description="Managed by your organization"
                isCard
                disabled
                defaultChecked
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
