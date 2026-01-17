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

function AdjustmentSliderExample(props: SliderExampleProps) {
  return (
    <Slider variant="adjustment" {...props}>
      <Slider.Control>
        <Slider.AdjustmentTrack>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Value />
            <Slider.Thumb />
          </Slider.Track>
        </Slider.AdjustmentTrack>
      </Slider.Control>
    </Slider>
  )
}

function SegmentedSliderExample({ defaultValue, ...props }: SliderExampleProps) {
  const [value, setValue] = React.useState<number[]>(
    Array.isArray(defaultValue) ? [...defaultValue] : [defaultValue ?? 0]
  )
  const handleValueChange = React.useCallback(
    (nextValue: number | readonly number[]) => {
      setValue(Array.isArray(nextValue) ? [...nextValue] : [nextValue])
    },
    []
  )

  return (
    <Slider
      variant="segmented"
      value={value}
      onValueChange={handleValueChange}
      {...props}
    >
      <Slider.Control>
        <Slider.Track>
          <Slider.SegmentedTrack>
            <Slider.SelectedSegment />
            <Slider.SegmentedGap />
            <Slider.SegmentedThumb />
            <Slider.SegmentedGap />
            <Slider.UnselectedSegment />
          </Slider.SegmentedTrack>
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
          <h2 className="text-body-xl-semibold">Adjustment Variant</h2>
          <p className="text-body-m text-content-subtle">
            A pill-shaped slider with a vertical bar thumb, ideal for settings panels.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">At Zero</p>
              <p className="text-body-m text-content-subtle">Thumb docked 4px from left edge</p>
            </div>
            <div className="w-full max-w-sm">
              <AdjustmentSliderExample defaultValue={0} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Below 50% (30%)</p>
              <p className="text-body-m text-content-subtle">Thumb inside indicator, 4px left</p>
            </div>
            <div className="w-full max-w-sm">
              <AdjustmentSliderExample defaultValue={30} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Above 50% (70%)</p>
              <p className="text-body-m text-content-subtle">Thumb outside indicator, 4px right</p>
            </div>
            <div className="w-full max-w-sm">
              <AdjustmentSliderExample defaultValue={70} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">At Maximum</p>
              <p className="text-body-m text-content-subtle">Thumb docked 4px from right edge</p>
            </div>
            <div className="w-full max-w-sm">
              <AdjustmentSliderExample defaultValue={100} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="w-full max-w-sm">
              <AdjustmentSliderExample defaultValue={50} disabled />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Adjustment Sizes</h2>
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
              <AdjustmentSliderExample size="s" defaultValue={30} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium</p>
            </div>
            <div className="w-full max-w-sm">
              <AdjustmentSliderExample size="m" defaultValue={50} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large</p>
            </div>
            <div className="w-full max-w-sm">
              <AdjustmentSliderExample size="l" defaultValue={70} />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Segmented Variant</h2>
          <p className="text-body-m text-content-subtle">
            A two-segment slider with accent thumb and visible gaps. The selected segment shrinks to nothing at 0%, and the unselected segment disappears at 100%.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">50% Value</p>
              <p className="text-body-m text-content-subtle">Both segments visible</p>
            </div>
            <div className="w-full max-w-sm">
              <SegmentedSliderExample defaultValue={50} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">At Zero</p>
              <p className="text-body-m text-content-subtle">Selected segment hidden</p>
            </div>
            <div className="w-full max-w-sm">
              <SegmentedSliderExample defaultValue={0} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">At Maximum</p>
              <p className="text-body-m text-content-subtle">Unselected segment hidden</p>
            </div>
            <div className="w-full max-w-sm">
              <SegmentedSliderExample defaultValue={100} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="w-full max-w-sm">
              <SegmentedSliderExample defaultValue={50} disabled />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Segmented Sizes</h2>
          <p className="text-body-m text-content-subtle">
            Segmented variant also supports the same size variants.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Small</p>
            </div>
            <div className="w-full max-w-sm">
              <SegmentedSliderExample size="s" defaultValue={30} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium</p>
            </div>
            <div className="w-full max-w-sm">
              <SegmentedSliderExample size="m" defaultValue={50} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large</p>
            </div>
            <div className="w-full max-w-sm">
              <SegmentedSliderExample size="l" defaultValue={70} />
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
