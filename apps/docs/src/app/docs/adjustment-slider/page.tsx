"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { AdjustmentSlider } from "@soft-ui/react/adjustment-slider"
import { SunFillIcon, ContrastFillIcon, VolumeFillIcon } from "@soft-ui/icons"

export default function AdjustmentSliderDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Adjustment Slider</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A compact slider with integrated icon, label, and value display. Ideal for settings panels and control interfaces.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { AdjustmentSlider } from "@soft-ui/react/adjustment-slider"
import { SunFillIcon } from "@soft-ui/icons"

<AdjustmentSlider
  icon={<SunFillIcon />}
  label="Brightness"
  defaultValue={[50]}
/>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Basic</h2>
          <p className="text-body-m text-content-subtle">
            Simple adjustment slider with icon and label.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With Icon</p>
              <p className="text-body-m text-content-subtle">Shows icon, label, and value</p>
            </div>
            <div className="w-full max-w-sm">
              <AdjustmentSlider
                icon={<SunFillIcon />}
                label="Brightness"
                defaultValue={[20]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Without Icon</p>
              <p className="text-body-m text-content-subtle">Label and value only</p>
            </div>
            <div className="w-full max-w-sm">
              <AdjustmentSlider
                label="Opacity"
                defaultValue={[75]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Settings Panel</h2>
          <p className="text-body-m text-content-subtle">
            Multiple sliders grouped together for a settings interface.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Stacked</p>
              <p className="text-body-m text-content-subtle">Common pattern for settings</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-4)]">
              <AdjustmentSlider
                icon={<SunFillIcon />}
                label="Brightness"
                defaultValue={[80]}
              />
              <AdjustmentSlider
                icon={<ContrastFillIcon />}
                label="Contrast"
                defaultValue={[50]}
              />
              <AdjustmentSlider
                icon={<VolumeFillIcon />}
                label="Volume"
                defaultValue={[65]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Sizes</h2>
          <p className="text-body-m text-content-subtle">
            Size variants matching input component sizes.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Small</p>
            </div>
            <div className="w-full max-w-sm">
              <AdjustmentSlider
                size="s"
                icon={<SunFillIcon />}
                label="Brightness"
                defaultValue={[30]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium (default)</p>
            </div>
            <div className="w-full max-w-sm">
              <AdjustmentSlider
                size="m"
                icon={<SunFillIcon />}
                label="Brightness"
                defaultValue={[50]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large</p>
            </div>
            <div className="w-full max-w-sm">
              <AdjustmentSlider
                size="l"
                icon={<SunFillIcon />}
                label="Brightness"
                defaultValue={[70]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Custom Range</h2>
          <p className="text-body-m text-content-subtle">
            Configure min, max, and step values.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">0-10 Range</p>
              <p className="text-body-m text-content-subtle">With step of 1</p>
            </div>
            <div className="w-full max-w-sm">
              <AdjustmentSlider
                icon={<SunFillIcon />}
                label="Level"
                min={0}
                max={10}
                step={1}
                defaultValue={[7]}
              />
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
              <AdjustmentSlider
                icon={<SunFillIcon />}
                label="Brightness"
                defaultValue={[50]}
                disabled
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
