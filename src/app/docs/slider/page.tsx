"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Slider } from "@/components/ui/slider"
import { Field } from "@/components/ui/field"

type SliderExampleProps = React.ComponentProps<typeof Slider>

function SliderExample(props: SliderExampleProps) {
  return (
    <Slider {...props}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb />
        </Slider.Track>
      </Slider.Control>
    </Slider>
  )
}

export default function SliderDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Slider</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A control for selecting a value within a range by dragging a thumb along a track.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Slider } from "@/components/ui/slider"

<Slider defaultValue={50} min={0} max={100}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Basic</h2>
          <p className="text-body-m text-content-subtle">
            Simple slider with default range values.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
              <p className="text-body-m text-content-subtle">Drag or click to change value</p>
            </div>
            <div className="w-full max-w-sm">
              <SliderExample defaultValue={50} />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Custom Range</h2>
          <p className="text-body-m text-content-subtle">
            Configure min, max, and step values for different use cases.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">0-10 range</p>
            </div>
            <div className="w-full max-w-sm">
              <SliderExample min={0} max={10} step={1} defaultValue={7} />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Disabled</h2>
          <p className="text-body-m text-content-subtle">
            Disabled state prevents interaction.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="w-full max-w-sm">
              <SliderExample defaultValue={50} disabled />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Field Integration</h2>
          <p className="text-body-m text-content-subtle">
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
                <SliderExample min={1} max={10} defaultValue={5} />
              </Field>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
