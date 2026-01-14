"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

const toneRows = [
  { value: "default", label: "Default", description: "Default state for general progress", sampleValue: 45 },
  { value: "success", label: "Success", description: "Success or completion state", sampleValue: 100 },
  { value: "warning", label: "Warning", description: "Approaching limits or caution", sampleValue: 75 },
  { value: "danger", label: "Danger", description: "Critical or error state", sampleValue: 90 },
] as const

const sizeRows = [
  { value: "s", label: "Small", description: "4px height" },
  { value: "m", label: "Medium", description: "6px height" },
] as const

export default function ProgressDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Progress</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Display the completion progress of a task or operation.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Progress } from "@/components/ui/progress"

<Progress.Root value={60}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>`}
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
                <Progress.Root tone={tone.value} value={tone.sampleValue}>
                  <Progress.Track>
                    <Progress.Indicator />
                  </Progress.Track>
                </Progress.Root>
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
                <Progress.Root size={size.value} value={60}>
                  <Progress.Track>
                    <Progress.Indicator />
                  </Progress.Track>
                </Progress.Root>
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
              <Progress.Root value={45}>
                <div className="flex items-center justify-between">
                  <Progress.Label>Uploading files...</Progress.Label>
                  <Progress.Value />
                </div>
                <Progress.Track>
                  <Progress.Indicator />
                </Progress.Track>
              </Progress.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Indeterminate</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[200px]">
              <p className="text-body-m text-content-strong">Unknown progress</p>
              <p className="text-body-m text-content-subtle">Set value to null</p>
            </div>
            <div className="flex-1 md:max-w-[400px]">
              <Progress.Root value={null}>
                <Progress.Track>
                  <Progress.Indicator className="animate-pulse" />
                </Progress.Track>
              </Progress.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Interactive</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[200px]">
              <p className="text-body-m text-content-strong">Simulated upload</p>
              <p className="text-body-m text-content-subtle">Click to start progress</p>
            </div>
            <InteractiveProgressDemo />
          </div>
        </div>
      </section>
    </div>
  )
}

function InteractiveProgressDemo() {
  const [progress, setProgress] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)

  React.useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsRunning(false)
          return 100
        }
        return prev + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }, [isRunning])

  const handleStart = () => {
    setProgress(0)
    setIsRunning(true)
  }

  const tone = progress === 100 ? "success" : "default"

  return (
    <div className="flex flex-1 items-end gap-[var(--space-12)] md:max-w-[400px]">
      <div className="flex-1">
        <Progress.Root tone={tone} value={progress}>
          <div className="flex items-center justify-between">
            <Progress.Label>
              {progress === 100 ? "Complete!" : "Processing..."}
            </Progress.Label>
            <Progress.Value />
          </div>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      </div>
      <Button onClick={handleStart} disabled={isRunning}>
        {isRunning ? "Running..." : "Start"}
      </Button>
    </div>
  )
}
