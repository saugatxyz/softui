"use client"

import * as React from "react"
import { Toast, useToastManager, defaultAnimConfig, type ToastAnimationConfig } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { NumberField } from "@/components/ui/number-field"
import { Field } from "@/components/ui/field"
import { ChipGroup } from "@/components/ui/chip-group"
import { Chip } from "@/components/ui/chip"
import { RiPlayLine, RiStopLine, RiDeleteBinLine, RiAddLine, RiRefreshLine } from "@remixicon/react"

// Use the default animation config from the toast component
// The playground allows overriding these values for testing

// Toast family options
type ToastFamily = "default" | "default-action" | "compact" | "compact-action"

const toastFamilyOptions: { value: ToastFamily; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "default-action", label: "Default + Action" },
  { value: "compact", label: "Compact" },
  { value: "compact-action", label: "Compact + Action" },
]

// Toast tones
const tones = ["success", "info", "warning", "danger", "default"] as const
type ToastTone = (typeof tones)[number]

// Tone-specific messages to ensure content matches the tone
const messagesByTone: Record<ToastTone, { titles: string[]; descriptions: string[] }> = {
  success: {
    titles: [
      "Changes saved",
      "File uploaded",
      "Message sent",
      "Payment complete",
      "Task completed",
      "Profile updated",
      "Export finished",
      "Sync complete",
    ],
    descriptions: [
      "Your changes have been saved successfully.",
      "The file has been uploaded to the server.",
      "Your message was delivered successfully.",
      "Payment of $49.99 was processed.",
      "All tasks have been marked as done.",
      "Your profile has been updated.",
      "Your data has been exported.",
      "All devices are now in sync.",
    ],
  },
  info: {
    titles: [
      "New notification",
      "Update available",
      "Scheduled maintenance",
      "New feature",
      "Tip of the day",
      "Session reminder",
    ],
    descriptions: [
      "You have 3 new messages.",
      "A new version is ready to install.",
      "System maintenance scheduled for tonight.",
      "Check out the new dashboard features.",
      "Press ⌘K to open the command palette.",
      "Your session will expire in 5 minutes.",
    ],
  },
  warning: {
    titles: [
      "Low storage",
      "Weak connection",
      "Expiring soon",
      "Unusual activity",
      "Rate limit",
      "Deprecated API",
    ],
    descriptions: [
      "You have less than 10% storage remaining.",
      "Your connection is unstable.",
      "Your subscription expires in 3 days.",
      "We detected a login from a new device.",
      "You're approaching the API rate limit.",
      "This API version will be deprecated soon.",
    ],
  },
  danger: {
    titles: [
      "Connection lost",
      "Upload failed",
      "Payment declined",
      "Error occurred",
      "Access denied",
      "Sync failed",
    ],
    descriptions: [
      "Please check your internet connection.",
      "The file could not be uploaded. Try again.",
      "Your payment method was declined.",
      "Something went wrong. Please try again.",
      "You don't have permission to access this.",
      "Failed to sync with the server.",
    ],
  },
  default: {
    titles: [
      "Notification",
      "Reminder",
      "Update",
      "Note",
      "Activity",
      "Status",
    ],
    descriptions: [
      "You have a new notification.",
      "Don't forget about your upcoming meeting.",
      "Your request has been received.",
      "This is a note for your reference.",
      "There was activity on your account.",
      "Your status has been updated.",
    ],
  },
}

// Helper to get random item from array
function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Context to share toast family between components
const ToastFamilyContext = React.createContext<ToastFamily>("default")

const transformOriginOptions = [
  "top left",
  "top center",
  "top right",
  "left center",
  "center center",
  "right center",
  "bottom left",
  "bottom center",
  "bottom right",
]

export default function ToastPlaygroundPage() {
  const [toastFamily, setToastFamily] = React.useState<ToastFamily>("default")

  return (
    <ToastFamilyContext.Provider value={toastFamily}>
      <Toast.Provider timeout={3000}>
        <PlaygroundContent toastFamily={toastFamily} setToastFamily={setToastFamily} />
        <Toast.Portal>
          <Toast.Viewport position="bottom-right">
            <ToastList />
          </Toast.Viewport>
        </Toast.Portal>
      </Toast.Provider>
    </ToastFamilyContext.Provider>
  )
}

function ToastList() {
  const { toasts } = useToastManager()
  const family = React.useContext(ToastFamilyContext)
  const isCompact = family === "compact" || family === "compact-action"
  const hasAction = family === "default-action" || family === "compact-action"

  return toasts.map((toast) => {
    const tone = (toast.data?.tone as ToastTone) ?? "default"

    if (isCompact) {
      return (
        <Toast.Root key={toast.id} toast={toast} variant="compact">
          <Toast.CompactContent>
            <Toast.Icon tone={tone} />
            <Toast.CompactTextWrapper>
              <Toast.Title>{toast.title}</Toast.Title>
              {hasAction && (
                <Toast.CompactActions>
                  <Toast.CompactAction onClick={() => {}}>Undo</Toast.CompactAction>
                </Toast.CompactActions>
              )}
            </Toast.CompactTextWrapper>
            <Toast.Close />
          </Toast.CompactContent>
        </Toast.Root>
      )
    }

    return (
      <Toast.Root key={toast.id} toast={toast} variant="card">
        <Toast.Content>
          <Toast.Icon tone={tone} />
          <Toast.TextWrapper>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
            {hasAction && (
              <Toast.Actions>
                <Toast.Action onClick={() => {}}>Undo</Toast.Action>
              </Toast.Actions>
            )}
          </Toast.TextWrapper>
          <Toast.Close />
        </Toast.Content>
      </Toast.Root>
    )
  })
}

function PlaygroundContent({
  toastFamily,
  setToastFamily,
}: {
  toastFamily: ToastFamily
  setToastFamily: (family: ToastFamily) => void
}) {
  const toastManager = useToastManager()
  const [isAutoSpawning, setIsAutoSpawning] = React.useState(false)
  const [spawnInterval, setSpawnInterval] = React.useState(1500)
  const [toastTimeout, setToastTimeout] = React.useState(3000)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  const [config, setConfig] = React.useState<ToastAnimationConfig>(defaultAnimConfig)

  // Update global config when local config changes
  React.useEffect(() => {
    window.__toastAnimConfig = config
  }, [config])

  // Helper to spawn a toast with random content matching the tone
  const spawnRandomToast = React.useCallback(() => {
    const tone = randomFrom(tones)
    const messages = messagesByTone[tone]
    const title = randomFrom(messages.titles)
    const description = randomFrom(messages.descriptions)

    toastManager.add({
      title,
      description,
      type: "foreground",
      timeout: toastTimeout,
      data: { tone },
    })
  }, [toastManager, toastTimeout])

  // Spacebar to spawn toast
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      if (e.code === "Space") {
        e.preventDefault()
        spawnRandomToast()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [spawnRandomToast])

  // Auto-spawn logic
  React.useEffect(() => {
    if (isAutoSpawning) {
      intervalRef.current = setInterval(() => {
        spawnRandomToast()
      }, spawnInterval)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoSpawning, spawnInterval, spawnRandomToast])

  const spawnSingle = () => {
    spawnRandomToast()
  }

  const clearAll = () => {
    toastManager.toasts.forEach((toast) => {
      toastManager.close(toast.id)
    })
  }

  const updateEntryConfig = <K extends keyof ToastAnimationConfig["entry"]>(
    key: K,
    value: ToastAnimationConfig["entry"][K]
  ) => {
    setConfig((prev) => ({ ...prev, entry: { ...prev.entry, [key]: value } }))
  }

  const updateExitConfig = <K extends keyof ToastAnimationConfig["exit"]>(
    key: K,
    value: ToastAnimationConfig["exit"][K]
  ) => {
    setConfig((prev) => ({ ...prev, exit: { ...prev.exit, [key]: value } }))
  }

  const updateLayoutConfig = <K extends keyof ToastAnimationConfig["layout"]>(
    key: K,
    value: ToastAnimationConfig["layout"][K]
  ) => {
    setConfig((prev) => ({ ...prev, layout: { ...prev.layout, [key]: value } }))
  }

  const resetEntry = () => setConfig((prev) => ({ ...prev, entry: defaultAnimConfig.entry }))
  const resetExit = () => setConfig((prev) => ({ ...prev, exit: defaultAnimConfig.exit }))
  const resetLayout = () => setConfig((prev) => ({ ...prev, layout: defaultAnimConfig.layout }))
  const resetAll = () => setConfig(defaultAnimConfig)

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[var(--space-32)] px-[var(--space-24)] py-[var(--space-40)]">
      {/* Header */}
      <header className="flex flex-col gap-[var(--space-8)]">
        <h1 className="text-body-3xl-semibold text-content-strong">Toast Animation Playground</h1>
        <p className="text-body-m text-content-subtle">
          Tweak animation settings and test in real-time. Changes apply to new toasts.
        </p>
      </header>

      {/* Spawn Controls */}
      <section className="flex flex-col gap-[var(--space-20)] rounded-[var(--radius-16)] border border-border-default bg-surface-default p-[var(--space-24)]">
        <div className="flex items-center justify-between">
          <h2 className="text-body-xl-semibold text-content-strong">Spawn Controls</h2>
          <span className="text-body-s text-content-muted">
            {toastManager.toasts.length} active toast{toastManager.toasts.length !== 1 && "s"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-[var(--space-12)]">
          <Button onClick={spawnSingle} leadingIcon={<RiAddLine />}>
            Spawn Toast
          </Button>
          <Button
            variant={isAutoSpawning ? "danger" : "secondary"}
            onClick={() => setIsAutoSpawning(!isAutoSpawning)}
            leadingIcon={isAutoSpawning ? <RiStopLine /> : <RiPlayLine />}
          >
            {isAutoSpawning ? "Stop Auto-Spawn" : "Auto-Spawn"}
          </Button>
          <Button variant="ghost" onClick={clearAll} leadingIcon={<RiDeleteBinLine />}>
            Clear All
          </Button>
        </div>

        {/* Toast Family */}
        <ControlGroup label="Toast Family">
          <ChipGroup size="m">
            {toastFamilyOptions.map((option) => (
              <Chip
                key={option.value}
                selected={toastFamily === option.value}
                onClick={() => setToastFamily(option.value)}
                hideRemove
              >
                {option.label}
              </Chip>
            ))}
          </ChipGroup>
        </ControlGroup>

        {/* Timing Controls */}
        <div className="grid gap-[var(--space-20)] sm:grid-cols-2">
          <Field label="Spawn Interval (ms)">
            <NumberField.Root
              value={spawnInterval}
              onValueChange={(val) => setSpawnInterval(val ?? 1500)}
              min={200}
              step={100}
            >
              <NumberField.Group>
                <NumberField.Decrement />
                <NumberField.Input />
                <NumberField.Increment />
              </NumberField.Group>
            </NumberField.Root>
          </Field>

          <Field label="Toast Duration (ms)">
            <NumberField.Root
              value={toastTimeout}
              onValueChange={(val) => setToastTimeout(val ?? 3000)}
              min={500}
              step={500}
            >
              <NumberField.Group>
                <NumberField.Decrement />
                <NumberField.Input />
                <NumberField.Increment />
              </NumberField.Group>
            </NumberField.Root>
          </Field>
        </div>
      </section>

      {/* Entry Animation */}
      <section className="flex flex-col gap-[var(--space-20)] rounded-[var(--radius-16)] border border-border-default bg-surface-default p-[var(--space-24)]">
        <div className="flex items-center justify-between">
          <h2 className="text-body-xl-semibold text-content-strong">Entry Animation</h2>
          <Button variant="ghost" size="s" onClick={resetEntry} leadingIcon={<RiRefreshLine />}>
            Reset
          </Button>
        </div>

        {/* Transform Origin */}
        <ControlGroup label="Transform Origin">
          <ChipGroup size="m">
            {transformOriginOptions.map((origin) => (
              <Chip
                key={origin}
                selected={config.entry.transformOrigin === origin}
                onClick={() => updateEntryConfig("transformOrigin", origin)}
                hideRemove
              >
                {origin}
              </Chip>
            ))}
          </ChipGroup>
        </ControlGroup>

        {/* Position */}
        <ControlGroup label="Position">
          <div className="grid gap-[var(--space-16)] sm:grid-cols-2">
            <SliderField
              label="X"
              value={config.entry.initialX}
              onChange={(v) => updateEntryConfig("initialX", v)}
              min={-100}
              max={100}
              step={1}
              unit="px"
            />
            <SliderField
              label="Y"
              value={config.entry.initialY}
              onChange={(v) => updateEntryConfig("initialY", v)}
              min={-100}
              max={100}
              step={1}
              unit="px"
            />
          </div>
        </ControlGroup>

        {/* Appearance */}
        <ControlGroup label="Appearance">
          <div className="grid gap-[var(--space-16)] sm:grid-cols-3">
            <SliderField
              label="Opacity"
              value={config.entry.initialOpacity}
              onChange={(v) => updateEntryConfig("initialOpacity", v)}
              min={0}
              max={1}
              step={0.05}
              decimals={2}
            />
            <SliderField
              label="Scale"
              value={config.entry.initialScale}
              onChange={(v) => updateEntryConfig("initialScale", v)}
              min={0.5}
              max={1.2}
              step={0.01}
              decimals={2}
            />
            <SliderField
              label="Blur"
              value={config.entry.initialBlur}
              onChange={(v) => updateEntryConfig("initialBlur", v)}
              min={0}
              max={20}
              step={1}
              unit="px"
            />
          </div>
        </ControlGroup>

        {/* Spring Physics */}
        <ControlGroup label="Spring Physics">
          <div className="grid gap-[var(--space-16)] sm:grid-cols-2">
            <SliderField
              label="Bounce"
              value={config.entry.springBounce}
              onChange={(v) => updateEntryConfig("springBounce", v)}
              min={0}
              max={0.5}
              step={0.01}
              decimals={2}
            />
            <SliderField
              label="Duration"
              value={config.entry.springDuration}
              onChange={(v) => updateEntryConfig("springDuration", v)}
              min={0.1}
              max={1}
              step={0.05}
              unit="s"
              decimals={2}
            />
          </div>
        </ControlGroup>
      </section>

      {/* Exit Animation */}
      <section className="flex flex-col gap-[var(--space-20)] rounded-[var(--radius-16)] border border-border-default bg-surface-default p-[var(--space-24)]">
        <div className="flex items-center justify-between">
          <h2 className="text-body-xl-semibold text-content-strong">Exit Animation</h2>
          <Button variant="ghost" size="s" onClick={resetExit} leadingIcon={<RiRefreshLine />}>
            Reset
          </Button>
        </div>

        {/* Transform Origin */}
        <ControlGroup label="Transform Origin">
          <ChipGroup size="m">
            {transformOriginOptions.map((origin) => (
              <Chip
                key={origin}
                selected={config.exit.transformOrigin === origin}
                onClick={() => updateExitConfig("transformOrigin", origin)}
                hideRemove
              >
                {origin}
              </Chip>
            ))}
          </ChipGroup>
        </ControlGroup>

        {/* Position */}
        <ControlGroup label="Position">
          <div className="grid gap-[var(--space-16)] sm:grid-cols-2">
            <SliderField
              label="X"
              value={config.exit.x}
              onChange={(v) => updateExitConfig("x", v)}
              min={-100}
              max={100}
              step={1}
              unit="px"
            />
            <SliderField
              label="Y"
              value={config.exit.y}
              onChange={(v) => updateExitConfig("y", v)}
              min={-100}
              max={100}
              step={1}
              unit="px"
            />
          </div>
        </ControlGroup>

        {/* Appearance */}
        <ControlGroup label="Appearance">
          <div className="grid gap-[var(--space-16)] sm:grid-cols-3">
            <SliderField
              label="Opacity"
              value={config.exit.opacity}
              onChange={(v) => updateExitConfig("opacity", v)}
              min={0}
              max={1}
              step={0.05}
              decimals={2}
            />
            <SliderField
              label="Scale"
              value={config.exit.scale}
              onChange={(v) => updateExitConfig("scale", v)}
              min={0.5}
              max={1.2}
              step={0.01}
              decimals={2}
            />
            <SliderField
              label="Blur"
              value={config.exit.blur}
              onChange={(v) => updateExitConfig("blur", v)}
              min={0}
              max={20}
              step={1}
              unit="px"
            />
          </div>
        </ControlGroup>

        {/* Spring Physics */}
        <ControlGroup label="Spring Physics">
          <div className="grid gap-[var(--space-16)] sm:grid-cols-2">
            <SliderField
              label="Bounce"
              value={config.exit.springBounce}
              onChange={(v) => updateExitConfig("springBounce", v)}
              min={0}
              max={0.5}
              step={0.01}
              decimals={2}
            />
            <SliderField
              label="Duration"
              value={config.exit.springDuration}
              onChange={(v) => updateExitConfig("springDuration", v)}
              min={0.1}
              max={1}
              step={0.05}
              unit="s"
              decimals={2}
            />
          </div>
        </ControlGroup>
      </section>

      {/* Layout Animation */}
      <section className="flex flex-col gap-[var(--space-20)] rounded-[var(--radius-16)] border border-border-default bg-surface-default p-[var(--space-24)]">
        <div className="flex items-center justify-between">
          <h2 className="text-body-xl-semibold text-content-strong">Layout Animation</h2>
          <Button variant="ghost" size="s" onClick={resetLayout} leadingIcon={<RiRefreshLine />}>
            Reset
          </Button>
        </div>

        {/* Enable/Disable Toggle */}
        <Switch
          checked={config.layout.enabled}
          onCheckedChange={(checked) => updateLayoutConfig("enabled", checked)}
          label="Enable layout animations"
          description="Animate toast positions when the stack changes"
        />

        {config.layout.enabled && (
          <ControlGroup label="Spring Physics">
            <div className="grid gap-[var(--space-16)] sm:grid-cols-2">
              <SliderField
                label="Bounce"
                value={config.layout.springBounce}
                onChange={(v) => updateLayoutConfig("springBounce", v)}
                min={0}
                max={0.5}
                step={0.01}
                decimals={2}
              />
              <SliderField
                label="Duration"
                value={config.layout.springDuration}
                onChange={(v) => updateLayoutConfig("springDuration", v)}
                min={0.1}
                max={1}
                step={0.05}
                unit="s"
                decimals={2}
              />
            </div>
          </ControlGroup>
        )}
      </section>

      {/* Generated Config */}
      <section className="flex flex-col gap-[var(--space-16)] rounded-[var(--radius-16)] border border-border-default bg-surface-default p-[var(--space-24)]">
        <div className="flex items-center justify-between">
          <h2 className="text-body-xl-semibold text-content-strong">Generated Config</h2>
          <Button variant="ghost" size="s" onClick={resetAll} leadingIcon={<RiRefreshLine />}>
            Reset All
          </Button>
        </div>
        <pre className="overflow-auto rounded-[var(--radius-12)] bg-surface-sunken p-[var(--space-16)] text-body-s text-content-default">
{`// Entry Animation
entry: {
  style: {
    transformOrigin: "${config.entry.transformOrigin}",
    opacity: ${config.entry.initialOpacity},
    scale: ${config.entry.initialScale},
    y: ${config.entry.initialY},
    x: ${config.entry.initialX},
    blur: ${config.entry.initialBlur},
  },
  animate: { opacity: 1, scale: 1, y: 0, x: 0, blur: 0 },
  transition: { type: "spring", bounce: ${config.entry.springBounce}, duration: ${config.entry.springDuration} }
}

// Exit Animation
exit: {
  transformOrigin: "${config.exit.transformOrigin}",
  animate: {
    opacity: ${config.exit.opacity},
    scale: ${config.exit.scale},
    y: ${config.exit.y},
    x: ${config.exit.x},
    filter: "blur(${config.exit.blur}px)"
  },
  transition: { type: "spring", bounce: ${config.exit.springBounce}, duration: ${config.exit.springDuration} }
}

// Layout Animation
layout: {
  enabled: ${config.layout.enabled},
  transition: { type: "spring", bounce: ${config.layout.springBounce}, duration: ${config.layout.springDuration} }
}`}
        </pre>
      </section>
    </div>
  )
}

// Control group with label
function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[var(--space-10)]">
      <span className="text-body-s-medium text-content-strong">{label}</span>
      {children}
    </div>
  )
}

// Format value with appropriate precision and unit
function formatValue(value: number, unit?: string, decimals?: number): string {
  const formatted = decimals !== undefined ? value.toFixed(decimals) : String(value)
  return unit ? `${formatted}${unit}` : formatted
}

// Custom SliderField component that wraps our Slider with a label and value display
function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  decimals,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  unit?: string
  decimals?: number
}) {
  const handleValueChange = (val: number | readonly number[]) => {
    // Slider can return number or array, we only use single values
    const numValue = Array.isArray(val) ? val[0] : val
    onChange(numValue)
  }

  return (
    <Slider value={value} onValueChange={handleValueChange} min={min} max={max} step={step}>
      <div className="flex items-center justify-between">
        <span className="text-body-s-medium text-content-strong">{label}</span>
        <span className="text-body-s tabular-nums text-content-strong">
          {formatValue(value, unit, decimals)}
        </span>
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb />
        </Slider.Track>
      </Slider.Control>
    </Slider>
  )
}
