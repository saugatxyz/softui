"use client"

import { CodeBlock } from "@/components/docs/code-block"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export default function KbdDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Kbd</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Keyboard shortcut indicators for displaying key combinations. Available in tertiary and inverted variants.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Kbd, KbdGroup } from "@/components/ui/kbd"

// Single key
<Kbd>⌘</Kbd>

// Multiple keys
<KbdGroup keys={["⌘", "K"]} />

// Inverted variant (for dark backgrounds)
<KbdGroup keys={["⌘", "⇧", "P"]} variant="inverted" />`}
        />
      </section>

      {/* Tertiary Variant */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Tertiary</h2>
          <p className="text-body-m text-content-subtle">
            Default variant for use on light backgrounds.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Single key</p>
              <p className="text-body-s text-content-subtle">Individual keyboard key</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <div className="flex items-center justify-center rounded-[var(--radius-12)] border border-border-muted bg-surface-canvas p-[var(--space-24)]">
                <div className="flex items-center gap-[var(--space-16)]">
                  <Kbd>⌘</Kbd>
                  <Kbd>⇧</Kbd>
                  <Kbd>K</Kbd>
                  <Kbd>⌫</Kbd>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Key combinations</p>
              <p className="text-body-s text-content-subtle">Multiple keys grouped together</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <div className="flex items-center justify-center rounded-[var(--radius-12)] border border-border-muted bg-surface-canvas p-[var(--space-24)]">
                <div className="flex items-center gap-[var(--space-16)]">
                  <KbdGroup keys={["⌘"]} />
                  <KbdGroup keys={["⌘", "K"]} />
                  <KbdGroup keys={["⌘", "⇧", "P"]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inverted Variant */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Inverted</h2>
          <p className="text-body-m text-content-subtle">
            For use on inverted backgrounds like tooltips.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Single key</p>
              <p className="text-body-s text-content-subtle">Individual keyboard key</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <div className="flex items-center justify-center rounded-[var(--radius-12)] bg-surface-inverse p-[var(--space-24)]">
                <div className="flex items-center gap-[var(--space-16)]">
                  <Kbd variant="inverted">⌘</Kbd>
                  <Kbd variant="inverted">⇧</Kbd>
                  <Kbd variant="inverted">K</Kbd>
                  <Kbd variant="inverted">⌫</Kbd>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Key combinations</p>
              <p className="text-body-s text-content-subtle">Multiple keys grouped together</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <div className="flex items-center justify-center rounded-[var(--radius-12)] bg-surface-inverse p-[var(--space-24)]">
                <div className="flex items-center gap-[var(--space-16)]">
                  <KbdGroup keys={["⌘"]} variant="inverted" />
                  <KbdGroup keys={["⌘", "K"]} variant="inverted" />
                  <KbdGroup keys={["⌘", "⇧", "P"]} variant="inverted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
