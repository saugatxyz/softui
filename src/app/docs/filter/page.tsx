"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Filter } from "@/components/ui/filter"
import { Menu, MenuItem, MenuSuffix } from "@/components/ui/menu"
import { Popover } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { Input } from "@/components/ui/input"
import {
  RiFilter3Line,
  RiCalendarLine,
  RiUserLine,
  RiPriceTag3Line,
  RiCloseLine,
} from "@remixicon/react"

// Example: Simple status filter with Menu
function StatusFilterExample() {
  const [status, setStatus] = React.useState<string | undefined>(undefined)

  return (
    <Menu.Root>
      <Menu.Trigger
        render={
          <Filter
            size="s"
            label="Status"
            value={status}
            onClear={() => setStatus(undefined)}
          />
        }
      />
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <MenuItem suffix={status === "Active" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setStatus("Active")}>Active</MenuItem>
            <MenuItem suffix={status === "Pending" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setStatus("Pending")}>Pending</MenuItem>
            <MenuItem suffix={status === "Completed" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setStatus("Completed")}>Completed</MenuItem>
            <MenuItem suffix={status === "Archived" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setStatus("Archived")}>Archived</MenuItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

// Example: Filter with icon
function CategoryFilterExample() {
  const [category, setCategory] = React.useState<string | undefined>(undefined)

  return (
    <Menu.Root>
      <Menu.Trigger
        render={
          <Filter
            size="s"
            icon={<RiPriceTag3Line />}
            label="Category"
            value={category}
            onClear={() => setCategory(undefined)}
          />
        }
      />
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <MenuItem suffix={category === "Design" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setCategory("Design")}>Design</MenuItem>
            <MenuItem suffix={category === "Engineering" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setCategory("Engineering")}>Engineering</MenuItem>
            <MenuItem suffix={category === "Marketing" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setCategory("Marketing")}>Marketing</MenuItem>
            <MenuItem suffix={category === "Sales" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setCategory("Sales")}>Sales</MenuItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

// Example: Assignee filter with icon
function AssigneeFilterExample() {
  const [assignee, setAssignee] = React.useState<string | undefined>(undefined)

  return (
    <Menu.Root>
      <Menu.Trigger
        render={
          <Filter
            size="s"
            icon={<RiUserLine />}
            label="Assignee"
            value={assignee}
            onClear={() => setAssignee(undefined)}
          />
        }
      />
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <MenuItem suffix={assignee === "Alice" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setAssignee("Alice")}>Alice</MenuItem>
            <MenuItem suffix={assignee === "Bob" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setAssignee("Bob")}>Bob</MenuItem>
            <MenuItem suffix={assignee === "Charlie" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setAssignee("Charlie")}>Charlie</MenuItem>
            <MenuItem suffix={assignee === "Diana" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setAssignee("Diana")}>Diana</MenuItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

// Example: Date filter with Popover (complex content)
function DateFilterExample() {
  const [date, setDate] = React.useState<string | undefined>(undefined)
  const [tempDate, setTempDate] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const handleApply = () => {
    if (tempDate) {
      setDate(tempDate)
    }
    setOpen(false)
  }

  const handleReset = () => {
    setTempDate("")
    setDate(undefined)
    setOpen(false)
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        render={
          <Filter
            size="s"
            icon={<RiCalendarLine />}
            label="Date"
            value={date}
            onClear={() => setDate(undefined)}
          />
        }
      />
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup className="w-[280px] p-[var(--space-16)]">
            <div className="flex flex-col gap-[var(--space-16)]">
              <div className="flex items-center justify-between">
                <Popover.Title>Select date</Popover.Title>
                <Popover.Close render={<IconButton variant="ghost" size="2xs"><RiCloseLine /></IconButton>} />
              </div>
              <div className="flex flex-col gap-[var(--space-6)]">
                <label className="text-[length:var(--font-size-s)] font-[var(--font-weight-medium)] leading-[var(--line-height-s)] text-content-strong">
                  Date
                </label>
                <Input
                  size="xs"
                  type="date"
                  value={tempDate}
                  onChange={(e) => setTempDate(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-[var(--space-8)] border-t border-border-muted pt-[var(--space-12)] -mx-[var(--space-16)] px-[var(--space-16)] -mb-[var(--space-16)] pb-[var(--space-12)]">
                <Button variant="secondary" size="xs" onClick={handleReset}>
                  Reset
                </Button>
                <Button size="xs" onClick={handleApply}>
                  Apply
                </Button>
              </div>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}

// Example: Multiple filters together
function FilterBarExample() {
  const [status, setStatus] = React.useState<string | undefined>("Active")
  const [priority, setPriority] = React.useState<string | undefined>(undefined)
  const [assignee, setAssignee] = React.useState<string | undefined>(undefined)

  return (
    <div className="flex flex-wrap items-center gap-[var(--space-8)]">
      <Menu.Root>
        <Menu.Trigger
          render={
            <Filter
              size="s"
              label="Status"
              value={status}
              onClear={() => setStatus(undefined)}
            />
          }
        />
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <MenuItem suffix={status === "Active" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setStatus("Active")}>Active</MenuItem>
              <MenuItem suffix={status === "Pending" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setStatus("Pending")}>Pending</MenuItem>
              <MenuItem suffix={status === "Completed" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setStatus("Completed")}>Completed</MenuItem>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger
          render={
            <Filter
              size="s"
              label="Priority"
              value={priority}
              onClear={() => setPriority(undefined)}
            />
          }
        />
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <MenuItem suffix={priority === "High" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setPriority("High")}>High</MenuItem>
              <MenuItem suffix={priority === "Medium" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setPriority("Medium")}>Medium</MenuItem>
              <MenuItem suffix={priority === "Low" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setPriority("Low")}>Low</MenuItem>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger
          render={
            <Filter
              size="s"
              icon={<RiUserLine />}
              label="Assignee"
              value={assignee}
              onClear={() => setAssignee(undefined)}
            />
          }
        />
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <MenuItem suffix={assignee === "Alice" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setAssignee("Alice")}>Alice</MenuItem>
              <MenuItem suffix={assignee === "Bob" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setAssignee("Bob")}>Bob</MenuItem>
              <MenuItem suffix={assignee === "Charlie" ? <MenuSuffix type="checkmark" /> : undefined} onClick={() => setAssignee("Charlie")}>Charlie</MenuItem>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  )
}

export default function FilterDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Filter</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A chip-styled trigger button for filters. Composable with Menu for simple lists or Popover for complex content.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Filter } from "@/components/ui/filter"
import { Menu, MenuItem, MenuSuffix } from "@/components/ui/menu"

<Menu.Root>
  <Menu.Trigger
    render={
      <Filter
        label="Status"
        value={status}
        onClear={() => setStatus(undefined)}
      />
    }
  />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <MenuItem
          suffix={status === "Active" ? <MenuSuffix type="checkmark" /> : undefined}
          onClick={() => setStatus("Active")}
        >
          Active
        </MenuItem>
        <MenuItem
          suffix={status === "Pending" ? <MenuSuffix type="checkmark" /> : undefined}
          onClick={() => setStatus("Pending")}
        >
          Pending
        </MenuItem>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`}
        />
      </section>

      {/* Sizes */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">XS</p>
              <p className="text-body-m text-content-subtle">28px height</p>
            </div>
            <div className="flex items-center gap-[var(--space-8)]">
              <Filter size="xs" label="Status" />
              <Filter size="xs" icon={<RiFilter3Line />} label="Filter" />
              <Filter size="xs" label="Status" value="Active" onClear={() => {}} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">S</p>
              <p className="text-body-m text-content-subtle">32px height</p>
            </div>
            <div className="flex items-center gap-[var(--space-8)]">
              <Filter size="s" label="Status" />
              <Filter size="s" icon={<RiFilter3Line />} label="Filter" />
              <Filter size="s" label="Status" value="Active" onClear={() => {}} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">M</p>
              <p className="text-body-m text-content-subtle">36px height</p>
            </div>
            <div className="flex items-center gap-[var(--space-8)]">
              <Filter size="m" label="Status" />
              <Filter size="m" icon={<RiFilter3Line />} label="Filter" />
              <Filter size="m" label="Status" value="Active" onClear={() => {}} />
            </div>
          </div>
        </div>
      </section>

      {/* With Menu */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">With Menu</h2>
          <p className="text-body-m text-content-subtle">
            Use with Menu for simple selection lists.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Basic</p>
              <p className="text-body-m text-content-subtle">Label only</p>
            </div>
            <div className="flex items-center gap-[var(--space-8)]">
              <StatusFilterExample />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With icon</p>
              <p className="text-body-m text-content-subtle">Leading icon for context</p>
            </div>
            <div className="flex items-center gap-[var(--space-8)]">
              <CategoryFilterExample />
              <AssigneeFilterExample />
            </div>
          </div>
        </div>
      </section>

      {/* With Popover */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">With Popover</h2>
          <p className="text-body-m text-content-subtle">
            Use with Popover for complex content like date pickers, forms, or multi-select.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Date filter</p>
              <p className="text-body-m text-content-subtle">Custom form content</p>
            </div>
            <div className="flex items-center gap-[var(--space-8)]">
              <DateFilterExample />
            </div>
          </div>
        </div>
      </section>

      {/* States */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Inactive</p>
              <p className="text-body-m text-content-subtle">No value selected</p>
            </div>
            <div className="flex items-center gap-[var(--space-8)]">
              <Filter label="Status" />
              <Filter icon={<RiFilter3Line />} label="Filter" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Active</p>
              <p className="text-body-m text-content-subtle">Value selected</p>
            </div>
            <div className="flex items-center gap-[var(--space-8)]">
              <Filter
                label="Status"
                value="Active"
                onClear={() => {}}
              />
              <Filter
                icon={<RiUserLine />}
                label="Assignee"
                value="Alice"
                onClear={() => {}}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
              <p className="text-body-m text-content-subtle">Non-interactive</p>
            </div>
            <div className="flex items-center gap-[var(--space-8)]">
              <Filter label="Status" disabled />
              <Filter
                label="Status"
                value="Active"
                onClear={() => {}}
                disabled
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Filter Bar</h2>
          <p className="text-body-m text-content-subtle">
            Combine multiple filters for a complete filtering experience.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Multiple filters</p>
              <p className="text-body-m text-content-subtle">Combined filter bar</p>
            </div>
            <FilterBarExample />
          </div>
        </div>
      </section>
    </div>
  )
}
