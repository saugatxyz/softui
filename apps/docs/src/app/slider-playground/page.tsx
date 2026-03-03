"use client"

import * as React from "react"
import { RiRefreshLine } from "@remixicon/react"

import {
  Slider,
  defaultSliderAnimConfig,
  type CubicBezier,
  type SliderAnimationConfig,
} from "@soft-ui/react/slider"
import { AdjustmentSlider } from "@soft-ui/react/adjustment-slider"
import { Button } from "@soft-ui/react/button"
import { Select } from "@soft-ui/react/select"

const bezierAxisLabels = ["x1", "y1", "x2", "y2"] as const

type ValueFormat = "number" | "percent" | "signed" | "padded"

const valueFormatOptions: { value: ValueFormat; label: string }[] = [
  { value: "number", label: "Number" },
  { value: "percent", label: "Percent" },
  { value: "signed", label: "Signed" },
  { value: "padded", label: "Padded" },
]

function toNumber(value: number | readonly number[]): number {
  if (typeof value === "number") {
    return value
  }

  return value[0] ?? 0
}

function formatValue(value: number, format: ValueFormat): string {
  const rounded = Math.round(value)

  if (format === "percent") {
    return `${rounded}%`
  }

  if (format === "signed") {
    return rounded >= 0 ? `+${rounded}` : `${rounded}`
  }

  if (format === "padded") {
    return rounded.toString().padStart(4, "0")
  }

  return `${rounded}`
}

export default function SliderPlaygroundPage() {
  const [config, setConfig] = React.useState<SliderAnimationConfig>(defaultSliderAnimConfig)
  const [value, setValue] = React.useState<number[]>([86])
  const [size, setSize] = React.useState<"s" | "m" | "l">("m")
  const [valueFormat, setValueFormat] = React.useState<ValueFormat>("number")

  React.useEffect(() => {
    window.__sliderAnimConfig = config
  }, [config])

  React.useEffect(() => {
    return () => {
      delete window.__sliderAnimConfig
    }
  }, [])

  const previewValue = value[0] ?? 0

  const updateRootDrag = <K extends keyof SliderAnimationConfig["root"]["drag"]>(
    key: K,
    next: SliderAnimationConfig["root"]["drag"][K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      root: {
        ...prev.root,
        drag: {
          ...prev.root.drag,
          [key]: next,
        },
      },
    }))
  }

  const updateRootDragEase = (index: number, next: number) => {
    setConfig((prev) => {
      const ease = [...prev.root.drag.ease] as CubicBezier
      ease[index] = next

      return {
        ...prev,
        root: {
          ...prev.root,
          drag: {
            ...prev.root.drag,
            ease,
          },
        },
      }
    })
  }

  const updateRootTrackPress = <K extends keyof SliderAnimationConfig["root"]["trackPress"]>(
    key: K,
    next: SliderAnimationConfig["root"]["trackPress"][K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      root: {
        ...prev.root,
        trackPress: {
          ...prev.root.trackPress,
          [key]: next,
        },
      },
    }))
  }

  const updateThumbDefault = <K extends keyof SliderAnimationConfig["thumb"]["default"]>(
    key: K,
    next: SliderAnimationConfig["thumb"]["default"][K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      thumb: {
        ...prev.thumb,
        default: {
          ...prev.thumb.default,
          [key]: next,
        },
      },
    }))
  }

  const updateAdjustmentThumb = <
    K extends keyof SliderAnimationConfig["thumb"]["adjustment"],
    P extends keyof SliderAnimationConfig["thumb"]["adjustment"][K]
  >(
    section: K,
    key: P,
    next: SliderAnimationConfig["thumb"]["adjustment"][K][P]
  ) => {
    setConfig((prev) => ({
      ...prev,
      thumb: {
        ...prev.thumb,
        adjustment: {
          ...prev.thumb.adjustment,
          [section]: {
            ...prev.thumb.adjustment[section],
            [key]: next,
          },
        },
      },
    }))
  }

  const updateAdjustmentThumbEase = (
    section: "fadeIn" | "fadeOut",
    index: number,
    next: number
  ) => {
    setConfig((prev) => {
      const ease = [...prev.thumb.adjustment[section].ease] as CubicBezier
      ease[index] = next

      return {
        ...prev,
        thumb: {
          ...prev.thumb,
          adjustment: {
            ...prev.thumb.adjustment,
            [section]: {
              ...prev.thumb.adjustment[section],
              ease,
            },
          },
        },
      }
    })
  }

  const resetSection = (section: keyof SliderAnimationConfig) => {
    setConfig((prev) => ({
      ...prev,
      [section]: defaultSliderAnimConfig[section],
    }))
  }

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[var(--space-32)] px-[var(--space-24)] py-[var(--space-40)]">
      <header className="flex flex-col gap-[var(--space-8)]">
        <h1 className="text-body-3xl-semibold text-content-strong">Slider Animation Playground</h1>
        <p className="text-body-m text-content-subtle">
          Focused on the adjustment thumb hide/reveal interaction near the value label.
        </p>
      </header>

      <div className="grid gap-[var(--space-24)] xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start">
        <aside className="order-1 xl:order-2 xl:sticky xl:top-[var(--space-24)]">
          <section className="flex flex-col gap-[var(--space-20)] rounded-[var(--radius-16)] border border-border-default bg-surface-default p-[var(--space-24)]">
        <div className="flex flex-wrap items-center justify-between gap-[var(--space-12)]">
          <h2 className="text-body-xl-semibold text-content-strong">Live Preview</h2>
          <div className="flex items-center gap-[var(--space-10)]">
            {([0, 85, 92, 96, 100] as const).map((preset) => (
              <Button
                key={preset}
                variant="secondary"
                size="s"
                onClick={() => setValue([preset])}
              >
                {preset}
              </Button>
            ))}
          </div>
        </div>

        <ControlGroup label="Value">
          <AdjustmentSlider
            label="Preview Value"
            value={previewValue}
            onValueChange={(next) => setValue([toNumber(next)])}
            min={0}
            max={100}
            step={1}
          />
        </ControlGroup>

        <div className="grid gap-[var(--space-16)] md:grid-cols-2">
          <ControlGroup label="Size">
            <Select
              size="m"
              variant="secondary"
              value={size}
              onValueChange={(next) => setSize(next as "s" | "m" | "l")}
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Icon />
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner>
                  <Select.Popup>
                    <Select.List>
                      {(["s", "m", "l"] as const).map((option) => (
                        <Select.Item key={option} value={option}>
                          <Select.ItemText>{option.toUpperCase()}</Select.ItemText>
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.List>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select>
          </ControlGroup>

          <ControlGroup label="Value Format">
            <Select
              size="m"
              variant="secondary"
              value={valueFormat}
              onValueChange={(next) => setValueFormat(next as ValueFormat)}
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Icon />
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner>
                  <Select.Popup>
                    <Select.List>
                      {valueFormatOptions.map((option) => (
                        <Select.Item key={option.value} value={option.value}>
                          <Select.ItemText>{option.label}</Select.ItemText>
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.List>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select>
          </ControlGroup>
        </div>

        <div className="flex flex-col gap-[var(--space-14)]">
          <Slider variant="adjustment" size={size} value={value} onValueChange={(next) => setValue([toNumber(next)])} min={0} max={100}>
            <Slider.Control>
              <Slider.AdjustmentTrack>
                <Slider.Track>
                  <Slider.Indicator />
                  <Slider.Value>{() => formatValue(previewValue, valueFormat)}</Slider.Value>
                  <Slider.Thumb />
                </Slider.Track>
              </Slider.AdjustmentTrack>
            </Slider.Control>
          </Slider>
        </div>
          </section>
        </aside>

        <div className="order-2 flex flex-col gap-[var(--space-24)] xl:order-1">

      <ConfigSection title="Root Animation" onReset={() => resetSection("root")}>
        <div className="grid gap-[var(--space-16)] lg:grid-cols-2">
          <ControlCard
            title="Drag Follow"
            description="How fast the slider value tracks your pointer while dragging."
          >
            <div className="grid gap-[var(--space-16)]">
              <AdjustmentSlider
                label="Duration"
                value={config.root.drag.duration}
                onValueChange={(next) => updateRootDrag("duration", toNumber(next))}
                min={0}
                max={0.6}
                step={0.01}
                renderValue={(next) => `${next.toFixed(2)}s`}
              />
              <BezierControl
                label="Ease Curve"
                ease={config.root.drag.ease}
                onChange={updateRootDragEase}
              />
            </div>
          </ControlCard>

          <ControlCard
            title="Track Press / Keyboard"
            description="Spring used when jumping to a new value via click/tap or keyboard."
          >
            <div className="grid gap-[var(--space-16)]">
              <AdjustmentSlider
                label="Bounce"
                value={config.root.trackPress.bounce}
                onValueChange={(next) => updateRootTrackPress("bounce", toNumber(next))}
                min={0}
                max={0.6}
                step={0.01}
                renderValue={(next) => next.toFixed(2)}
              />
              <AdjustmentSlider
                label="Duration"
                value={config.root.trackPress.duration}
                onValueChange={(next) => updateRootTrackPress("duration", toNumber(next))}
                min={0.05}
                max={0.6}
                step={0.01}
                renderValue={(next) => `${next.toFixed(2)}s`}
              />
            </div>
          </ControlCard>
        </div>
      </ConfigSection>

      <ConfigSection title="Thumb Hide / Reveal Animation" onReset={() => resetSection("thumb")}>
        <div className="grid gap-[var(--space-16)]">
          <ControlCard
            title="Horizontal Motion"
            description="Position springs for the thumb bar before it hides."
          >
            <div className="grid gap-[var(--space-16)] md:grid-cols-3">
              <AdjustmentSlider
                label="Base X Bounce"
                value={config.thumb.default.bounce}
                onValueChange={(next) => updateThumbDefault("bounce", toNumber(next))}
                min={0}
                max={0.6}
                step={0.01}
                renderValue={(next) => next.toFixed(2)}
              />
              <AdjustmentSlider
                label="Base X Duration"
                value={config.thumb.default.duration}
                onValueChange={(next) => updateThumbDefault("duration", toNumber(next))}
                min={0.05}
                max={0.6}
                step={0.01}
                renderValue={(next) => `${next.toFixed(2)}s`}
              />
              <AdjustmentSlider
                label="Drag Bounce"
                value={config.thumb.adjustment.drag.bounce}
                onValueChange={(next) => updateAdjustmentThumb("drag", "bounce", toNumber(next))}
                min={0}
                max={0.6}
                step={0.01}
                renderValue={(next) => next.toFixed(2)}
              />
              <AdjustmentSlider
                label="Drag Duration"
                value={config.thumb.adjustment.drag.duration}
                onValueChange={(next) => updateAdjustmentThumb("drag", "duration", toNumber(next))}
                min={0.05}
                max={0.6}
                step={0.01}
                renderValue={(next) => `${next.toFixed(2)}s`}
              />
              <AdjustmentSlider
                label="Edge Snap Bounce"
                value={config.thumb.adjustment.edgeSnap.bounce}
                onValueChange={(next) => updateAdjustmentThumb("edgeSnap", "bounce", toNumber(next))}
                min={0}
                max={0.6}
                step={0.01}
                renderValue={(next) => next.toFixed(2)}
              />
              <AdjustmentSlider
                label="Edge Snap Duration"
                value={config.thumb.adjustment.edgeSnap.duration}
                onValueChange={(next) => updateAdjustmentThumb("edgeSnap", "duration", toNumber(next))}
                min={0.05}
                max={0.6}
                step={0.01}
                renderValue={(next) => `${next.toFixed(2)}s`}
              />
            </div>
          </ControlCard>

          <ControlCard
            title="Hide Shape"
            description="Spring for size/scale as the thumb compresses before disappearing."
          >
            <div className="grid gap-[var(--space-16)] sm:grid-cols-2">
              <AdjustmentSlider
                label="Size Bounce"
                value={config.thumb.adjustment.size.bounce}
                onValueChange={(next) => updateAdjustmentThumb("size", "bounce", toNumber(next))}
                min={0}
                max={0.8}
                step={0.01}
                renderValue={(next) => next.toFixed(2)}
              />
              <AdjustmentSlider
                label="Size Duration"
                value={config.thumb.adjustment.size.duration}
                onValueChange={(next) => updateAdjustmentThumb("size", "duration", toNumber(next))}
                min={0.05}
                max={0.8}
                step={0.01}
                renderValue={(next) => `${next.toFixed(2)}s`}
              />
            </div>
          </ControlCard>

          <div className="grid gap-[var(--space-16)] lg:grid-cols-2">
            <ControlCard
              title="Fade Out"
              description="Opacity curve while the thumb disappears near the value."
            >
              <div className="grid gap-[var(--space-16)]">
                <div className="grid gap-[var(--space-16)] sm:grid-cols-2">
                  <AdjustmentSlider
                    label="Duration"
                    value={config.thumb.adjustment.fadeOut.duration}
                    onValueChange={(next) => updateAdjustmentThumb("fadeOut", "duration", toNumber(next))}
                    min={0}
                    max={0.5}
                    step={0.01}
                    renderValue={(next) => `${next.toFixed(2)}s`}
                  />
                  <AdjustmentSlider
                    label="Delay"
                    value={config.thumb.adjustment.fadeOut.delay}
                    onValueChange={(next) => updateAdjustmentThumb("fadeOut", "delay", toNumber(next))}
                    min={0}
                    max={0.3}
                    step={0.01}
                    renderValue={(next) => `${next.toFixed(2)}s`}
                  />
                </div>
                <BezierControl
                  label="Ease Curve"
                  ease={config.thumb.adjustment.fadeOut.ease}
                  onChange={(index, next) => updateAdjustmentThumbEase("fadeOut", index, next)}
                />
              </div>
            </ControlCard>

            <ControlCard
              title="Fade In"
              description="Opacity curve while the thumb reappears."
            >
              <div className="grid gap-[var(--space-16)]">
                <AdjustmentSlider
                  label="Duration"
                  value={config.thumb.adjustment.fadeIn.duration}
                  onValueChange={(next) => updateAdjustmentThumb("fadeIn", "duration", toNumber(next))}
                  min={0}
                  max={0.5}
                  step={0.01}
                  renderValue={(next) => `${next.toFixed(2)}s`}
                />
                <BezierControl
                  label="Ease Curve"
                  ease={config.thumb.adjustment.fadeIn.ease}
                  onChange={(index, next) => updateAdjustmentThumbEase("fadeIn", index, next)}
                />
              </div>
            </ControlCard>
          </div>
        </div>
      </ConfigSection>

      <section className="flex flex-col gap-[var(--space-16)] rounded-[var(--radius-16)] border border-border-default bg-surface-default p-[var(--space-24)]">
        <div className="flex items-center justify-between">
          <h2 className="text-body-xl-semibold text-content-strong">Generated Thumb Config</h2>
          <Button variant="ghost" size="s" onClick={() => setConfig(defaultSliderAnimConfig)} leadingIcon={<RiRefreshLine />}>
            Reset All
          </Button>
        </div>
        <pre className="overflow-auto rounded-[var(--radius-12)] bg-surface-sunken p-[var(--space-16)] text-body-s text-content-default">
{JSON.stringify({
  root: config.root,
  thumb: config.thumb,
}, null, 2)}
        </pre>
      </section>
        </div>
      </div>
    </div>
  )
}

function ConfigSection({
  title,
  onReset,
  children,
}: {
  title: string
  onReset: () => void
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-[var(--space-20)] rounded-[var(--radius-16)] border border-border-default bg-surface-default p-[var(--space-24)]">
      <div className="flex items-center justify-between">
        <h2 className="text-body-xl-semibold text-content-strong">{title}</h2>
        <Button variant="ghost" size="s" onClick={onReset} leadingIcon={<RiRefreshLine />}>
          Reset
        </Button>
      </div>
      {children}
    </section>
  )
}

function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[var(--space-10)]">
      <span className="text-body-s-medium text-content-strong">{label}</span>
      {children}
    </div>
  )
}

function ControlCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[var(--radius-12)] border border-border-subtle bg-surface-sunken p-[var(--space-16)]">
      <div className="mb-[var(--space-12)] flex flex-col gap-[var(--space-4)]">
        <h3 className="text-body-m-medium text-content-strong">{title}</h3>
        <p className="text-body-s text-content-muted">{description}</p>
      </div>
      {children}
    </section>
  )
}

function BezierControl({
  label,
  ease,
  onChange,
}: {
  label: string
  ease: CubicBezier
  onChange: (index: number, value: number) => void
}) {
  return (
    <ControlGroup label={label}>
      <div className="grid gap-[var(--space-16)] sm:grid-cols-2">
        {bezierAxisLabels.map((axisLabel, index) => (
          <AdjustmentSlider
            key={axisLabel}
            label={axisLabel.toUpperCase()}
            value={ease[index]}
            onValueChange={(next) => onChange(index, toNumber(next))}
            min={-1}
            max={2}
            step={0.01}
            renderValue={(next) => next.toFixed(2)}
          />
        ))}
      </div>
    </ControlGroup>
  )
}
