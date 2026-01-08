"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Slider } from "@/components/ui/slider"
import { Field } from "@/components/ui/field"

export default function SliderDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Slider</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A control for selecting a value within a range by dragging a thumb along a track.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Slider } from "@/components/ui/slider"

<Slider label="Volume" defaultValue={50} />
<Slider
  label="Brightness"
  description="Adjust screen brightness"
  defaultValue={75}
/>
<Slider min={0} max={10} step={1} defaultValue={5} />`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Basic</h2>
          <p className="text-body-s text-content-subtle">
            Simple slider with label and editable value indicator.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
              <p className="text-body-s text-content-subtle">Drag or click to change value</p>
            </div>
            <div className="w-full max-w-sm">
              <Slider label="Volume" defaultValue={0} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With value</p>
            </div>
            <div className="w-full max-w-sm">
              <Slider label="Volume" defaultValue={50} />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">With Description</h2>
          <p className="text-body-s text-content-subtle">
            Slider with additional description text for context.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label and description</p>
            </div>
            <div className="w-full max-w-sm">
              <Slider
                label="Brightness"
                description="Adjust your screen brightness level"
                defaultValue={75}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Editable Value</h2>
          <p className="text-body-s text-content-subtle">
            Hover over the value to reveal an edit icon. Click to enter a value directly.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Editable (default)</p>
              <p className="text-body-s text-content-subtle">Hover over the value</p>
            </div>
            <div className="w-full max-w-sm">
              <Slider label="Opacity" defaultValue={80} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Non-editable</p>
            </div>
            <div className="w-full max-w-sm">
              <Slider label="Progress" defaultValue={65} editableValue={false} />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Custom Range</h2>
          <p className="text-body-s text-content-subtle">
            Configure min, max, and step values for different use cases.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">0-10 range</p>
            </div>
            <div className="w-full max-w-sm">
              <Slider label="Rating" min={0} max={10} step={1} defaultValue={7} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Step of 5</p>
            </div>
            <div className="w-full max-w-sm">
              <Slider label="Quantity" min={0} max={100} step={5} defaultValue={25} />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Custom Formatting</h2>
          <p className="text-body-s text-content-subtle">
            Use formatValue to customize how the value is displayed.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Percentage</p>
            </div>
            <div className="w-full max-w-sm">
              <Slider
                label="Opacity"
                defaultValue={80}
                formatValue={(v) => `${v}%`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Currency</p>
            </div>
            <div className="w-full max-w-sm">
              <Slider
                label="Budget"
                min={0}
                max={1000}
                step={50}
                defaultValue={500}
                formatValue={(v) => `$${v}`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Without Value Indicator</h2>
          <p className="text-body-s text-content-subtle">
            Hide the value indicator for a cleaner look.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label only</p>
            </div>
            <div className="w-full max-w-sm">
              <Slider label="Volume" defaultValue={50} showValue={false} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Value only</p>
            </div>
            <div className="w-full max-w-sm">
              <Slider defaultValue={50} />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Disabled</h2>
          <p className="text-body-s text-content-subtle">
            Disabled state prevents interaction.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="w-full max-w-sm">
              <Slider
                label="Volume"
                description="This setting is locked"
                defaultValue={50}
                disabled
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Field Integration</h2>
          <p className="text-body-s text-content-subtle">
            Slider works inside Field component for form validation.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Inside Field</p>
            </div>
            <div className="w-full max-w-sm">
              <Field
                label="Effort estimate"
                description="How much effort will this task require?"
              >
                <Slider min={1} max={10} defaultValue={5} showValue={false} />
              </Field>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
