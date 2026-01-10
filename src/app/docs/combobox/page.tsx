"use client"

import type { ReactNode } from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Combobox, type ComboboxRootProps } from "@/components/ui/combobox"
import { Field } from "@/components/ui/field"
import { Avatar } from "@/components/ui/avatar"
import { Crypto } from "@/components/ui/crypto"
import { Logo } from "@/components/ui/logo"
import { MenuPrefix } from "@/components/ui/menu-prefix"
import { cn } from "@/lib/utils"
import {
  RiSearchLine,
  RiMailLine,
  RiPhoneLine,
  RiMessage2Line,
  RiVideoOnLine,
  RiFolder3Line,
  RiDeleteBinLine,
  RiExpandUpDownLine,
  RiCheckFill,
  RiCloseLine,
} from "@remixicon/react"

// Basic options
const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
  { value: "pineapple", label: "Pineapple" },
  { value: "strawberry", label: "Strawberry" },
  { value: "watermelon", label: "Watermelon" },
]

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
]

// Options with icons
const contactMethods = [
  { value: "email", label: "Email", icon: <RiMailLine /> },
  { value: "phone", label: "Phone call", icon: <RiPhoneLine /> },
  { value: "sms", label: "Text message", icon: <RiMessage2Line /> },
  { value: "video", label: "Video call", icon: <RiVideoOnLine /> },
]

// Options with danger icon
const dangerActions = [
  { value: "archive", label: "Archive project", icon: <RiFolder3Line />, prefixType: "icon" as const },
  { value: "delete", label: "Delete permanently", icon: <RiDeleteBinLine />, prefixType: "danger-icon" as const },
]

// Avatar options
const reviewers = [
  { value: "sarah", label: "Sarah Wilson", icon: <Avatar size="2xs" src="/avatars/avatar-1.png" alt="Sarah Wilson" />, prefixType: "avatar" as const },
  { value: "mike", label: "Mike Chen", icon: <Avatar size="2xs" src="/avatars/avatar-2.png" alt="Mike Chen" />, prefixType: "avatar" as const },
  { value: "emma", label: "Emma Davis", icon: <Avatar size="2xs" src="/avatars/avatar-3.png" alt="Emma Davis" />, prefixType: "avatar" as const },
  { value: "james", label: "James Park", icon: <Avatar size="2xs" src="/avatars/avatar-4.png" alt="James Park" />, prefixType: "avatar" as const },
]

// Crypto tokens
const cryptoTokens = [
  { value: "btc", label: "Bitcoin", icon: <Crypto crypto="btc" size={24} />, prefixType: "token" as const },
  { value: "eth", label: "Ethereum", icon: <Crypto crypto="eth" size={24} />, prefixType: "token" as const },
  { value: "sol", label: "Solana", icon: <Crypto crypto="sol" size={24} />, prefixType: "token" as const },
  { value: "usdc", label: "USD Coin", icon: <Crypto crypto="usdc" size={24} />, prefixType: "token" as const },
]

// Company logos
const integrations = [
  { value: "linear", label: "Linear", icon: <Logo logo="linear" size={24} />, prefixType: "company" as const },
  { value: "discord", label: "Discord", icon: <Logo logo="discord" size={24} />, prefixType: "company" as const },
  { value: "loom", label: "Loom", icon: <Logo logo="loom" size={24} />, prefixType: "company" as const },
  { value: "framer", label: "Framer", icon: <Logo logo="framer" size={24} />, prefixType: "company" as const },
]

// Options with descriptions
const plans = [
  { value: "free", label: "Free", description: "Up to 3 projects, 1 GB storage" },
  { value: "pro", label: "Pro", description: "Unlimited projects, 100 GB storage" },
  { value: "team", label: "Team", description: "Everything in Pro, plus collaboration" },
  { value: "enterprise", label: "Enterprise", description: "Custom limits, dedicated support" },
]

// Options with icons and descriptions
const notificationChannels = [
  { value: "email", label: "Email", description: "Delivered to your inbox", icon: <RiMailLine /> },
  { value: "sms", label: "SMS", description: "Text message alerts", icon: <RiPhoneLine /> },
  { value: "push", label: "Push notification", description: "Instant mobile alerts", icon: <RiMessage2Line /> },
]

// Team members with descriptions
const teamMembers = [
  { value: "sarah", label: "Sarah Wilson", description: "Engineering Lead", icon: <Avatar size="2xs" src="/avatars/avatar-1.png" alt="Sarah Wilson" />, prefixType: "avatar" as const },
  { value: "mike", label: "Mike Chen", description: "Senior Developer", icon: <Avatar size="2xs" src="/avatars/avatar-2.png" alt="Mike Chen" />, prefixType: "avatar" as const },
  { value: "emma", label: "Emma Davis", description: "Product Designer", icon: <Avatar size="2xs" src="/avatars/avatar-3.png" alt="Emma Davis" />, prefixType: "avatar" as const },
  { value: "james", label: "James Park", description: "DevOps Engineer", icon: <Avatar size="2xs" src="/avatars/avatar-4.png" alt="James Park" />, prefixType: "avatar" as const },
]

// Permissions with descriptions for multi-select
const permissions = [
  { value: "read", label: "Read", description: "View files and folders" },
  { value: "write", label: "Write", description: "Create and edit content" },
  { value: "delete", label: "Delete", description: "Remove files permanently" },
  { value: "admin", label: "Admin", description: "Full access and settings" },
]

// Options with disabled
const statuses = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive", disabled: true },
  { value: "archived", label: "Archived" },
]

// Multi-select options
const features = [
  { value: "dark-mode", label: "Dark mode" },
  { value: "notifications", label: "Notifications" },
  { value: "auto-save", label: "Auto-save" },
  { value: "sync", label: "Cloud sync" },
  { value: "analytics", label: "Analytics" },
]

const tags = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "design", label: "Design" },
  { value: "devops", label: "DevOps" },
  { value: "mobile", label: "Mobile" },
  { value: "testing", label: "Testing" },
]

// Grouped options
const teamGroups = [
  {
    label: "Engineering",
    options: [
      { value: "alex", label: "Alex Chen" },
      { value: "jordan", label: "Jordan Lee" },
      { value: "taylor", label: "Taylor Kim" },
    ],
  },
  {
    label: "Design",
    options: [
      { value: "casey", label: "Casey Morgan" },
      { value: "jamie", label: "Jamie Rivera" },
    ],
  },
  {
    label: "Product",
    options: [
      { value: "sam", label: "Sam Johnson" },
      { value: "riley", label: "Riley Thompson" },
    ],
  },
]

const regionGroups = [
  {
    label: "North America",
    options: [
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "mx", label: "Mexico" },
    ],
  },
  {
    label: "Europe",
    options: [
      { value: "uk", label: "United Kingdom" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
    ],
  },
  {
    label: "Asia Pacific",
    options: [
      { value: "jp", label: "Japan" },
      { value: "au", label: "Australia" },
      { value: "sg", label: "Singapore" },
    ],
  },
]

// Countries for searchable select example
const allCountries = [
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
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
  { value: "nl", label: "Netherlands" },
  { value: "kr", label: "South Korea" },
  { value: "sg", label: "Singapore" },
]

type ComboboxOption = {
  value: string
  label: string
  description?: string
  icon?: ReactNode
  prefixType?: "icon" | "danger-icon" | "avatar" | "company" | "token"
  disabled?: boolean
}

type ComboboxGroup = {
  label: string
  options: ComboboxOption[]
}

type ComboboxDemoProps = Omit<ComboboxRootProps, "items"> & {
  options?: ComboboxOption[]
  groups?: ComboboxGroup[]
  placeholder?: string
  leadingIcon?: ReactNode
  clearable?: boolean
}

function renderComboboxItem(option: ComboboxOption) {
  return (
    <Combobox.Item key={option.value} value={option} disabled={option.disabled}>
      {option.icon && (
        <span className="flex shrink-0 group-has-[[data-slot=item-description]]:items-start group-has-[[data-slot=item-description]]:self-stretch group-has-[[data-slot=item-description]]:pt-[var(--space-2)]">
          <MenuPrefix
            type={option.prefixType ?? "icon"}
            icon={option.icon}
            disabled={option.disabled}
          />
        </span>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)] pl-[var(--space-2)]">
        <span
          className={cn(
            "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
            "text-content-strong group-data-[disabled]:text-content-disabled"
          )}
        >
          {option.label}
        </span>
        {option.description && (
          <span
            data-slot="item-description"
            className={cn(
              "truncate text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)]",
              "text-content-subtle group-data-[disabled]:text-content-disabled"
            )}
          >
            {option.description}
          </span>
        )}
      </div>

      <Combobox.ItemIndicator>
        <span className="flex size-[16px] items-center justify-center text-content-strong [&_svg]:size-full">
          <RiCheckFill />
        </span>
      </Combobox.ItemIndicator>
    </Combobox.Item>
  )
}

function ComboboxDemo({
  options = [],
  groups,
  placeholder = "Search...",
  leadingIcon,
  clearable = false,
  size = "m",
  multiple,
  className,
  ...props
}: ComboboxDemoProps) {
  const items = groups?.length
    ? groups.map((group) => ({
        value: group.label,
        items: group.options,
      }))
    : options

  return (
    <Combobox.Root
      items={items}
      size={size}
      multiple={multiple}
      className={className}
      {...props}
    >
      {leadingIcon && (
        <span
          data-slot="leading-icon"
          className={cn(
            "flex size-[16px] shrink-0 items-center justify-center [&_svg]:size-full",
            "text-content-subtle"
          )}
        >
          {leadingIcon}
        </span>
      )}

      {multiple ? (
        // Multi-select: Input inside Chips>Value for proper keyboard nav (left arrow closes menu)
        // Uses CSS :has() for conditional styling when chips are present
        <>
          <Combobox.Chips
            className={cn(
              "flex min-w-0 flex-1 flex-wrap items-center gap-[var(--space-4)]",
              "has-[[data-slot=chip]]:py-[var(--space-6)] has-[[data-slot=chip]]:-ml-[var(--space-6)]"
            )}
          >
            <Combobox.Value>
              {(selectedValue) => {
                const values = Array.isArray(selectedValue) ? selectedValue : []
                return (
                  <>
                    {values.map((item) => {
                      const option = item as ComboboxOption
                      const label = option.label ?? String(option.value)
                      return (
                        <Combobox.Chip key={option.value ?? label}>
                          <span className="truncate">{label}</span>
                          <Combobox.ChipRemove>
                            <RiCloseLine />
                          </Combobox.ChipRemove>
                        </Combobox.Chip>
                      )
                    })}
                    <Combobox.Input
                      placeholder={values.length > 0 ? "" : placeholder}
                    />
                  </>
                )
              }}
            </Combobox.Value>
          </Combobox.Chips>
          <div className="flex self-stretch pt-[var(--space-10)]">
            <Combobox.Trigger>
              <RiExpandUpDownLine />
            </Combobox.Trigger>
          </div>
        </>
      ) : (
        // Single-select: standard layout
        <>
          <Combobox.Input placeholder={placeholder} />
          {clearable && (
            <Combobox.Clear>
              <RiCloseLine />
            </Combobox.Clear>
          )}
          <Combobox.Trigger>
            <RiExpandUpDownLine />
          </Combobox.Trigger>
        </>
      )}

      <Combobox.Portal>
        <Combobox.Positioner align="start" sideOffset={4} collisionPadding={8}>
          <Combobox.Popup>
            <Combobox.List className="p-[var(--space-4)]">
              {groups?.length ? (
                groups.map((group) => (
                  <Combobox.Group key={group.label} items={group.options}>
                    <Combobox.GroupLabel>{group.label}</Combobox.GroupLabel>
                    <Combobox.Collection>
                      {(option) => renderComboboxItem(option as ComboboxOption)}
                    </Combobox.Collection>
                  </Combobox.Group>
                ))
              ) : (
                <Combobox.Collection>
                  {(option) => renderComboboxItem(option as ComboboxOption)}
                </Combobox.Collection>
              )}
              <Combobox.Empty>No results found</Combobox.Empty>
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  )
}

// ============================================================================
// Searchable Select Component (Input Inside Popup)
// ============================================================================

function SearchableSelect({
  options,
  placeholder = "Select an option",
  defaultValue,
}: {
  options: ComboboxOption[]
  placeholder?: string
  defaultValue?: ComboboxOption
}) {
  return (
    // Use unstyled root - Trigger handles all visual styling for select-like appearance
    <Combobox.Root
      items={options}
      defaultValue={defaultValue}
      className="bg-transparent p-0 min-h-0 rounded-none shadow-none"
    >
      <Combobox.Trigger
        className={cn(
          "flex w-full items-center gap-[var(--space-6)] rounded-[var(--radius-10)]",
          "h-[var(--space-36)] px-[var(--space-12)]",
          "bg-actions-secondary-default transition-colors duration-200 outline-none cursor-pointer",
          "hover:bg-actions-secondary-hover",
          "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]"
        )}
      >
        <Combobox.Value>
          {(value) => {
            const selected = value as ComboboxOption | null
            if (selected?.label) {
              return (
                <span className="min-w-0 flex-1 truncate text-left text-content-strong text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]">
                  {selected.label}
                </span>
              )
            }
            return (
              <span className="min-w-0 flex-1 truncate text-left text-content-muted text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]">
                {placeholder}
              </span>
            )
          }}
        </Combobox.Value>
        <span className="ml-auto flex size-[16px] shrink-0 items-center justify-center text-content-muted [&_svg]:size-full">
          <RiExpandUpDownLine />
        </span>
      </Combobox.Trigger>

      <Combobox.Portal>
        <Combobox.Positioner align="start" sideOffset={4} collisionPadding={8}>
          <Combobox.Popup>
            <div className="p-[var(--space-4)]">
              <div
                className={cn(
                  "flex w-full items-center gap-[var(--space-2)] rounded-[var(--radius-10)]",
                  "h-[var(--space-36)] px-[var(--space-12)]",
                  "bg-actions-secondary-default transition-colors duration-200",
                  "hover:bg-actions-secondary-hover"
                )}
              >
                <span className="flex size-[16px] shrink-0 items-center justify-center text-content-subtle [&_svg]:size-full">
                  <RiSearchLine />
                </span>
                <Combobox.Input placeholder="Search..." autoFocus className="px-[var(--space-4)]" />
                <Combobox.Clear>
                  <RiCloseLine />
                </Combobox.Clear>
              </div>
            </div>

            <Combobox.List className="max-h-[280px] overflow-auto p-[var(--space-4)] pt-0">
              <Combobox.Collection>
                {(option) => renderComboboxItem(option as ComboboxOption)}
              </Combobox.Collection>
              <Combobox.Empty>No results found</Combobox.Empty>
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  )
}

export default function ComboboxDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <h1 className="text-body-3xl-semibold">Combobox</h1>
        <p className="max-w-2xl text-body-l text-content-subtle">
          A searchable dropdown that combines an input with a filterable list of options.
        </p>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Combobox } from "@/components/ui/combobox"
import { RiCheckFill, RiExpandUpDownLine } from "@remixicon/react"

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
]

<Combobox.Root items={options}>
  <Combobox.Input placeholder="Search fruits..." />
  <Combobox.Trigger>
    <RiExpandUpDownLine />
  </Combobox.Trigger>
  <Combobox.Portal>
    <Combobox.Positioner sideOffset={4} align="start">
      <Combobox.Popup>
        <Combobox.List>
          <Combobox.Collection>
            {(option) => (
              <Combobox.Item value={option}>
                {option.label}
                <Combobox.ItemIndicator>
                  <RiCheckFill />
                </Combobox.ItemIndicator>
              </Combobox.Item>
            )}
          </Combobox.Collection>
        </Combobox.List>
      </Combobox.Popup>
    </Combobox.Positioner>
  </Combobox.Portal>
</Combobox.Root>`}
        />
      </section>

      {/* Basic */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
              <p className="text-body-m text-content-subtle">Type to filter options</p>
            </div>
            <div className="w-full max-w-sm">
              <ComboboxDemo options={fruits} placeholder="Search fruits..." />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Clearable</p>
              <p className="text-body-m text-content-subtle">With clear button</p>
            </div>
            <div className="w-full max-w-sm">
              <ComboboxDemo options={fruits} defaultValue={{ value: "banana", label: "Banana" }} clearable />
            </div>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Small (32px)</p>
              <p className="text-body-m text-content-subtle">Compact areas</p>
            </div>
            <div className="w-full max-w-sm">
              <ComboboxDemo size="s" options={fruits} placeholder="Search..." />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium (36px)</p>
              <p className="text-body-m text-content-subtle">Default size</p>
            </div>
            <div className="w-full max-w-sm">
              <ComboboxDemo size="m" options={fruits} placeholder="Search..." />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large (40px)</p>
              <p className="text-body-m text-content-subtle">Touch targets</p>
            </div>
            <div className="w-full max-w-sm">
              <ComboboxDemo size="l" options={fruits} placeholder="Search..." />
            </div>
          </div>
        </div>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Icons</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Leading icon</p>
              <p className="text-body-m text-content-subtle">Icon in trigger</p>
            </div>
            <div className="w-full max-w-sm">
              <ComboboxDemo
                options={countries}
                leadingIcon={<RiSearchLine />}
                placeholder="Search countries..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Option icons</p>
              <p className="text-body-m text-content-subtle">Icons in dropdown items</p>
            </div>
            <div className="w-full max-w-sm">
              <ComboboxDemo
                options={contactMethods}
                placeholder="Preferred contact..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Danger icon</p>
              <p className="text-body-m text-content-subtle">Destructive action indicator</p>
            </div>
            <div className="w-full max-w-sm">
              <ComboboxDemo
                options={dangerActions}
                placeholder="Select action..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Avatars</p>
              <p className="text-body-m text-content-subtle">User photos in options</p>
            </div>
            <div className="w-full max-w-sm">
              <ComboboxDemo
                options={reviewers}
                placeholder="Search reviewers..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Crypto tokens</p>
              <p className="text-body-m text-content-subtle">Cryptocurrency icons</p>
            </div>
            <div className="w-full max-w-sm">
              <ComboboxDemo
                options={cryptoTokens}
                placeholder="Search tokens..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Company logos</p>
              <p className="text-body-m text-content-subtle">Brand icons in options</p>
            </div>
            <div className="w-full max-w-sm">
              <ComboboxDemo
                options={integrations}
                placeholder="Search integrations..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* With Descriptions */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Descriptions</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Text only</p>
              <p className="text-body-m text-content-subtle">Options with secondary text</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Plan">
                <ComboboxDemo
                  options={plans}
                  placeholder="Search plans..."
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With icons</p>
              <p className="text-body-m text-content-subtle">Icons paired with descriptions</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Notification channel">
                <ComboboxDemo
                  options={notificationChannels}
                  placeholder="Search channels..."
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With avatars</p>
              <p className="text-body-m text-content-subtle">Team members with roles</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Assign to">
                <ComboboxDemo
                  options={teamMembers}
                  placeholder="Search team..."
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Multi-select</p>
              <p className="text-body-m text-content-subtle">Multiple options with descriptions</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Permissions">
                <ComboboxDemo
                  multiple
                  options={permissions}
                  placeholder="Select permissions..."
                />
              </Field>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Selection */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Multiple Selection</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Multi-select</p>
              <p className="text-body-m text-content-subtle">Select multiple options with chips</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Features">
                <ComboboxDemo
                  multiple
                  options={features}
                  placeholder="Search features..."
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With default values</p>
              <p className="text-body-m text-content-subtle">Pre-selected options</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Tags">
                <ComboboxDemo
                  multiple
                  options={tags}
                  defaultValue={[{ value: "frontend", label: "Frontend" }, { value: "design", label: "Design" }]}
                  placeholder="Add tags..."
                />
              </Field>
            </div>
          </div>
        </div>
      </section>

      {/* With Field */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Field</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label only</p>
              <p className="text-body-m text-content-subtle">Simple field label</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Country">
                <ComboboxDemo
                  options={countries}
                  placeholder="Search countries..."
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label + description</p>
              <p className="text-body-m text-content-subtle">Additional context</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Country" description="Where is your business located?">
                <ComboboxDemo
                  options={countries}
                  placeholder="Search countries..."
                />
              </Field>
            </div>
          </div>
        </div>
      </section>

      {/* States */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
              <p className="text-body-m text-content-subtle">Non-interactive</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Fruit" disabled>
                <ComboboxDemo
                  options={fruits}
                  defaultValue={{ value: "apple", label: "Apple" }}
                  disabled
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled option</p>
              <p className="text-body-m text-content-subtle">Individual option unavailable</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Status">
                <ComboboxDemo
                  options={statuses}
                  placeholder="Select status..."
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Error</p>
              <p className="text-body-m text-content-subtle">Validation error</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Country" error="Country is required">
                <ComboboxDemo
                  options={countries}
                  placeholder="Search countries..."
                />
              </Field>
            </div>
          </div>
        </div>
      </section>

      {/* Grouped */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Grouped</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Single select</p>
              <p className="text-body-m text-content-subtle">Options organized by category</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Assign to">
                <ComboboxDemo
                  groups={teamGroups}
                  placeholder="Search team members..."
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Multi-select grouped</p>
              <p className="text-body-m text-content-subtle">Select from multiple groups</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Markets">
                <ComboboxDemo
                  multiple
                  groups={regionGroups}
                  placeholder="Select regions..."
                />
              </Field>
            </div>
          </div>
        </div>
      </section>

      {/* Input Inside Popup */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Input Inside Popup</h2>
        <p className="text-body-m text-content-subtle">
          A searchable select pattern where the input appears inside the popup, similar to a native select with search.
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Searchable select</p>
              <p className="text-body-m text-content-subtle">Click to open, then search</p>
            </div>
            <div className="w-full max-w-sm">
              <SearchableSelect
                options={allCountries}
                placeholder="Select country"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With default value</p>
              <p className="text-body-m text-content-subtle">Pre-selected option</p>
            </div>
            <div className="w-full max-w-sm">
              <SearchableSelect
                options={allCountries}
                placeholder="Select country"
                defaultValue={{ value: "us", label: "United States" }}
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
