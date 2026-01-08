"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Autocomplete } from "@/components/ui/autocomplete"
import { Field } from "@/components/ui/field"
import {
  RiSearchLine,
  RiMapPinLine,
  RiGlobalLine,
  RiUser3Line,
} from "@remixicon/react"

// Sample data
const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "mx", label: "Mexico" },
]

const cities = [
  { value: "nyc", label: "New York City", description: "United States" },
  { value: "london", label: "London", description: "United Kingdom" },
  { value: "tokyo", label: "Tokyo", description: "Japan" },
  { value: "paris", label: "Paris", description: "France" },
  { value: "berlin", label: "Berlin", description: "Germany" },
  { value: "sydney", label: "Sydney", description: "Australia" },
  { value: "toronto", label: "Toronto", description: "Canada" },
  { value: "mumbai", label: "Mumbai", description: "India" },
]

const locations = [
  { value: "nyc", label: "New York", icon: <RiMapPinLine />, prefixType: "icon" as const },
  { value: "sf", label: "San Francisco", icon: <RiMapPinLine />, prefixType: "icon" as const },
  { value: "la", label: "Los Angeles", icon: <RiMapPinLine />, prefixType: "icon" as const },
  { value: "chicago", label: "Chicago", icon: <RiMapPinLine />, prefixType: "icon" as const },
  { value: "seattle", label: "Seattle", icon: <RiMapPinLine />, prefixType: "icon" as const },
]

const users = [
  { value: "john", label: "John Smith", description: "john@example.com", icon: <RiUser3Line />, prefixType: "icon" as const },
  { value: "jane", label: "Jane Doe", description: "jane@example.com", icon: <RiUser3Line />, prefixType: "icon" as const },
  { value: "bob", label: "Bob Wilson", description: "bob@example.com", icon: <RiUser3Line />, prefixType: "icon" as const },
  { value: "alice", label: "Alice Chen", description: "alice@example.com", icon: <RiUser3Line />, prefixType: "icon" as const },
]

// Async loading demo component
function AsyncAutocomplete() {
  const [inputValue, setInputValue] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [filteredOptions, setFilteredOptions] = React.useState(countries)

  React.useEffect(() => {
    if (!inputValue) {
      setFilteredOptions(countries)
      return
    }

    setLoading(true)
    // Simulate API call
    const timer = setTimeout(() => {
      const filtered = countries.filter((c) =>
        c.label.toLowerCase().includes(inputValue.toLowerCase())
      )
      setFilteredOptions(filtered)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [inputValue])

  return (
    <div className="flex flex-col gap-[var(--space-4)]">
      <Field label="Country">
        <Autocomplete
          options={countries}
          filteredOptions={filteredOptions}
          value={inputValue}
          onValueChange={setInputValue}
          placeholder="Search countries..."
          leadingIcon={<RiSearchLine />}
          mode="none"
        />
      </Field>
      {loading && (
        <span className="text-body-xs text-content-subtle">Loading...</span>
      )}
    </div>
  )
}

export default function AutocompleteDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <h1 className="text-body-3xl-semibold">Autocomplete</h1>
        <p className="max-w-2xl text-body-l text-content-subtle">
          An input that suggests options as you type. Unlike Combobox, users can enter custom text values that aren&apos;t in the suggestion list.
        </p>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Autocomplete } from "@/components/ui/autocomplete"
import { Field } from "@/components/ui/field"

const options = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
]

// Basic
<Autocomplete options={options} placeholder="Search countries..." />

// With Field wrapper for label and description
<Field label="Country" description="Start typing to see suggestions">
  <Autocomplete options={options} placeholder="Search..." />
</Field>

// Free-form text is allowed - user can type anything
// Suggestions are optional, not required`}
        />
      </section>

      {/* Basic */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
              <p className="text-body-s text-content-subtle">Type to filter suggestions</p>
            </div>
            <div className="w-full max-w-sm">
              <Autocomplete options={countries} placeholder="Search countries..." />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With default value</p>
              <p className="text-body-s text-content-subtle">Pre-filled input text</p>
            </div>
            <div className="w-full max-w-sm">
              <Autocomplete options={countries} defaultValue="United" placeholder="Search countries..." />
            </div>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Small (32px)</p>
              <p className="text-body-s text-content-subtle">Compact areas, inline forms</p>
            </div>
            <div className="w-full max-w-sm">
              <Autocomplete size="s" options={countries} placeholder="Search..." />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium (36px)</p>
              <p className="text-body-s text-content-subtle">Default for most forms</p>
            </div>
            <div className="w-full max-w-sm">
              <Autocomplete size="m" options={countries} placeholder="Search..." />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large (40px)</p>
              <p className="text-body-s text-content-subtle">Prominent inputs, touch targets</p>
            </div>
            <div className="w-full max-w-sm">
              <Autocomplete size="l" options={countries} placeholder="Search..." />
            </div>
          </div>
        </div>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Icons</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Leading icon</p>
              <p className="text-body-s text-content-subtle">Search icon in input</p>
            </div>
            <div className="w-full max-w-sm">
              <Autocomplete
                options={countries}
                leadingIcon={<RiSearchLine />}
                placeholder="Search countries..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Option icons</p>
              <p className="text-body-s text-content-subtle">Icons in dropdown items</p>
            </div>
            <div className="w-full max-w-sm">
              <Autocomplete
                options={locations}
                leadingIcon={<RiMapPinLine />}
                placeholder="Search locations..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* With Descriptions */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Descriptions</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Secondary text</p>
              <p className="text-body-s text-content-subtle">Options with descriptions</p>
            </div>
            <div className="w-full max-w-sm">
              <Autocomplete
                options={cities}
                leadingIcon={<RiGlobalLine />}
                placeholder="Search cities..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With icons and descriptions</p>
              <p className="text-body-s text-content-subtle">Full option detail</p>
            </div>
            <div className="w-full max-w-sm">
              <Autocomplete
                options={users}
                leadingIcon={<RiSearchLine />}
                placeholder="Search users..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* With Field */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Field</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label only</p>
              <p className="text-body-s text-content-subtle">Simple field label</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Country">
                <Autocomplete options={countries} placeholder="Search countries..." />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label + description</p>
              <p className="text-body-s text-content-subtle">Additional context</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Country" description="You can type any country name or select from suggestions">
                <Autocomplete options={countries} placeholder="Search or type..." />
              </Field>
            </div>
          </div>
        </div>
      </section>

      {/* States */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
              <p className="text-body-s text-content-subtle">Non-interactive state</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Country" disabled>
                <Autocomplete options={countries} defaultValue="United States" disabled />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Error</p>
              <p className="text-body-s text-content-subtle">Validation error state</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Country" error="Please enter a valid country">
                <Autocomplete options={countries} placeholder="Search countries..." />
              </Field>
            </div>
          </div>
        </div>
      </section>

      {/* Filtering Modes */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Filtering Modes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">List mode (default)</p>
              <p className="text-body-s text-content-subtle">Filters as you type</p>
            </div>
            <div className="w-full max-w-sm">
              <Autocomplete
                options={countries}
                mode="list"
                placeholder="Type to filter..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Both mode</p>
              <p className="text-body-s text-content-subtle">Filters + updates input on arrow keys</p>
            </div>
            <div className="w-full max-w-sm">
              <Autocomplete
                options={countries}
                mode="both"
                placeholder="Type or use arrows..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Inline mode</p>
              <p className="text-body-s text-content-subtle">Static list, input updates on navigation</p>
            </div>
            <div className="w-full max-w-sm">
              <Autocomplete
                options={countries}
                mode="inline"
                placeholder="Use arrows to navigate..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">None mode</p>
              <p className="text-body-s text-content-subtle">Static list, no auto-filtering</p>
            </div>
            <div className="w-full max-w-sm">
              <Autocomplete
                options={countries}
                mode="none"
                placeholder="Browse all options..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Async Loading */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Async Loading</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">External filtering</p>
              <p className="text-body-s text-content-subtle">Simulated API call with 500ms delay</p>
            </div>
            <div className="w-full max-w-sm">
              <AsyncAutocomplete />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
