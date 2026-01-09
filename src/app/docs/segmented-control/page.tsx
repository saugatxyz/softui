"use client"

import { useState } from "react"
import { RiListCheck, RiGridFill, RiLayoutColumnFill } from "@remixicon/react"
import { CodeBlock } from "@/components/docs/code-block"
import { SegmentedControl } from "@/components/ui/segmented-control"

const ListIcon = RiListCheck
const GridIcon = RiGridFill
const BoardIcon = RiLayoutColumnFill

export default function SegmentedControlDocsPage() {
  const [view, setView] = useState("list")

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Segmented Control</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A compact control for switching between mutually exclusive views or
            modes
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { SegmentedControl } from "@/components/ui/segmented-control"

<SegmentedControl variant="filled" defaultValue="list">
  <SegmentedControl.List>
    <SegmentedControl.Item value="list">List</SegmentedControl.Item>
    <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
    <SegmentedControl.Indicator />
  </SegmentedControl.List>
  <SegmentedControl.Content value="list">List view</SegmentedControl.Content>
  <SegmentedControl.Content value="grid">Grid view</SegmentedControl.Content>
</SegmentedControl>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Variants</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <SegmentedControl variant="default" defaultValue="list">
                <SegmentedControl.List>
                  <SegmentedControl.Item value="list">List</SegmentedControl.Item>
                  <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
                  <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
                <SegmentedControl.Indicator />
                </SegmentedControl.List>
              </SegmentedControl>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Filled</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <SegmentedControl variant="filled" defaultValue="list">
                <SegmentedControl.List>
                  <SegmentedControl.Item value="list">List</SegmentedControl.Item>
                  <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
                  <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
                <SegmentedControl.Indicator />
                </SegmentedControl.List>
              </SegmentedControl>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Outline</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <SegmentedControl variant="outline" defaultValue="list">
                <SegmentedControl.List>
                  <SegmentedControl.Item value="list">List</SegmentedControl.Item>
                  <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
                  <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
                <SegmentedControl.Indicator />
                </SegmentedControl.List>
              </SegmentedControl>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">XS</p>
              <p className="text-body-m text-content-subtle">28px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <SegmentedControl variant="filled" size="xs" defaultValue="list">
                <SegmentedControl.List>
                  <SegmentedControl.Item value="list">List</SegmentedControl.Item>
                  <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
                  <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
                  <SegmentedControl.Indicator />
                </SegmentedControl.List>
              </SegmentedControl>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">S</p>
              <p className="text-body-m text-content-subtle">32px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <SegmentedControl variant="filled" size="s" defaultValue="list">
                <SegmentedControl.List>
                  <SegmentedControl.Item value="list">List</SegmentedControl.Item>
                  <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
                  <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
                  <SegmentedControl.Indicator />
                </SegmentedControl.List>
              </SegmentedControl>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">M</p>
              <p className="text-body-m text-content-subtle">36px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <SegmentedControl variant="filled" size="m" defaultValue="list">
                <SegmentedControl.List>
                  <SegmentedControl.Item value="list">List</SegmentedControl.Item>
                  <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
                  <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
                  <SegmentedControl.Indicator />
                </SegmentedControl.List>
              </SegmentedControl>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Content Panels</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0">
            <SegmentedControl variant="filled" value={view} onValueChange={setView}>
              <SegmentedControl.List>
                <SegmentedControl.Item value="list">List</SegmentedControl.Item>
                <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
                <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
                <SegmentedControl.Indicator />
              </SegmentedControl.List>
              <SegmentedControl.Content value="list">
                <div className="rounded-[var(--radius-8)] border border-border-muted p-[var(--space-16)]">
                  <p className="text-body-m text-content-subtle">
                    Displaying items in a vertical list format with detailed
                    information for each row.
                  </p>
                </div>
              </SegmentedControl.Content>
              <SegmentedControl.Content value="grid">
                <div className="rounded-[var(--radius-8)] border border-border-muted p-[var(--space-16)]">
                  <p className="text-body-m text-content-subtle">
                    Showing items in a responsive grid layout with visual
                    thumbnails and compact details.
                  </p>
                </div>
              </SegmentedControl.Content>
              <SegmentedControl.Content value="board">
                <div className="rounded-[var(--radius-8)] border border-border-muted p-[var(--space-16)]">
                  <p className="text-body-m text-content-subtle">
                    Kanban-style board view with draggable cards organized in
                    columns.
                  </p>
                </div>
              </SegmentedControl.Content>
            </SegmentedControl>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Disabled State</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled item</p>
              <p className="text-body-m text-content-subtle">
                Individual items can be disabled
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <SegmentedControl variant="filled" defaultValue="active">
                <SegmentedControl.List>
                  <SegmentedControl.Item value="active">Active</SegmentedControl.Item>
                  <SegmentedControl.Item value="disabled" disabled>
                    Disabled
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="normal">Normal</SegmentedControl.Item>
                <SegmentedControl.Indicator />
                </SegmentedControl.List>
              </SegmentedControl>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Icons</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon with label</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <SegmentedControl variant="filled" defaultValue="list">
                <SegmentedControl.List>
                  <SegmentedControl.Item value="list" leadingIcon={<ListIcon />}>
                    List
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="grid" leadingIcon={<GridIcon />}>
                    Grid
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="board" leadingIcon={<BoardIcon />}>
                    Board
                  </SegmentedControl.Item>
                  <SegmentedControl.Indicator />
                </SegmentedControl.List>
              </SegmentedControl>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon only</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <SegmentedControl variant="filled" defaultValue="list">
                <SegmentedControl.List>
                  <SegmentedControl.Item value="list" leadingIcon={<ListIcon />} />
                  <SegmentedControl.Item value="grid" leadingIcon={<GridIcon />} />
                  <SegmentedControl.Item value="board" leadingIcon={<BoardIcon />} />
                  <SegmentedControl.Indicator />
                </SegmentedControl.List>
              </SegmentedControl>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
