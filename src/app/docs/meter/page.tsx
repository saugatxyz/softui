"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Meter, type MeterTone } from "@/components/ui/meter"
import { Slider } from "@/components/ui/slider"

const toneRows = [
  { value: "default", label: "Default", description: "Default state for general measurement", sampleValue: 45 },
  { value: "success", label: "Success", description: "Safe or optimal range", sampleValue: 25 },
  { value: "warning", label: "Warning", description: "Approaching limits or caution", sampleValue: 75 },
  { value: "danger", label: "Danger", description: "Critical threshold reached", sampleValue: 95 },
] as const

const sizeRows = [
  { value: "s", label: "Small", description: "4px height" },
  { value: "m", label: "Medium", description: "6px height" },
] as const

export default function MeterDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Meter</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Display a scalar measurement within a known range, such as disk usage or battery level.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Meter } from "@/components/ui/meter"

<Meter.Root value={60}>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Tones</h2>
        <div className="flex flex-col">
          {toneRows.map((tone) => (
            <div
              key={tone.value}
              className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div className="md:min-w-[200px]">
                <p className="text-body-m text-content-strong">{tone.label}</p>
                <p className="text-body-m text-content-subtle">{tone.description}</p>
              </div>
              <div className="flex-1 md:max-w-[400px]">
                <Meter.Root tone={tone.value} value={tone.sampleValue}>
                  <Meter.Track>
                    <Meter.Indicator />
                  </Meter.Track>
                </Meter.Root>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          {sizeRows.map((size) => (
            <div
              key={size.value}
              className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div className="md:min-w-[200px]">
                <p className="text-body-m text-content-strong">{size.label}</p>
                <p className="text-body-m text-content-subtle">{size.description}</p>
              </div>
              <div className="flex-1 md:max-w-[400px]">
                <Meter.Root size={size.value} value={60}>
                  <Meter.Track>
                    <Meter.Indicator />
                  </Meter.Track>
                </Meter.Root>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Label</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[200px]">
              <p className="text-body-m text-content-strong">Label and value</p>
              <p className="text-body-m text-content-subtle">Shows description and percentage</p>
            </div>
            <div className="flex-1 md:max-w-[400px]">
              <Meter.Root value={72}>
                <div className="flex items-center justify-between">
                  <Meter.Label>Storage used</Meter.Label>
                  <Meter.Value />
                </div>
                <Meter.Track>
                  <Meter.Indicator />
                </Meter.Track>
              </Meter.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Custom Range</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[200px]">
              <p className="text-body-m text-content-strong">Min and max values</p>
              <p className="text-body-m text-content-subtle">Set custom range boundaries</p>
            </div>
            <div className="flex-1 md:max-w-[400px]">
              <Meter.Root value={750} min={0} max={1000}>
                <div className="flex items-center justify-between">
                  <Meter.Label>CPU Temperature</Meter.Label>
                  <span className="text-body-s-medium text-content-subtle">75°C / 100°C</span>
                </div>
                <Meter.Track>
                  <Meter.Indicator />
                </Meter.Track>
              </Meter.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Status-Based Tones</h2>
        <p className="text-body-m text-content-subtle">
          Dynamically change the tone based on the value to indicate status.
        </p>
        <StatusMeterDemo />
      </section>
    </div>
  )
}

function StatusMeterDemo() {
  const [storage, setStorage] = React.useState(45)

  const getTone = (value: number): MeterTone => {
    if (value >= 90) return "danger"
    if (value >= 75) return "warning"
    if (value >= 50) return "default"
    return "success"
  }

  return (
    <div className="flex flex-col gap-[var(--space-16)]">
      <div className="md:max-w-[400px]">
        <Meter.Root tone={getTone(storage)} value={storage}>
          <div className="flex items-center justify-between">
            <Meter.Label>Disk usage</Meter.Label>
            <Meter.Value />
          </div>
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      </div>
      <div className="md:max-w-[400px]">
        <Slider
          value={storage}
          onValueChange={(value) => {
            setStorage(Array.isArray(value) ? value[0] ?? 0 : value)
          }}
          min={0}
          max={100}
        >
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      </div>
    </div>
  )
}
