"use client"

import { CodeBlock } from "@/components/docs/code-block"
import { Select } from "@/components/ui/select"
import { Avatar } from "@/components/ui/avatar"
import { Crypto } from "@/components/ui/crypto"
import { Logo } from "@/components/ui/logo"
import {
  RiGlobalLine,
  RiMailLine,
  RiPhoneLine,
  RiMessage2Line,
  RiVideoOnLine,
  RiTimeLine,
  RiAlarmWarningLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiSubtractLine,
  RiDeleteBinLine,
  RiStarLine,
  RiFolder3Line,
  RiTeamLine,
} from "@remixicon/react"

// Realistic option sets
const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
]

const timezones = [
  { value: "pst", label: "Pacific Time (PT)" },
  { value: "mst", label: "Mountain Time (MT)" },
  { value: "cst", label: "Central Time (CT)" },
  { value: "est", label: "Eastern Time (ET)" },
  { value: "utc", label: "UTC" },
]

const priorities = [
  { value: "urgent", label: "Urgent", icon: <RiAlarmWarningLine />, prefixType: "icon" as const },
  { value: "high", label: "High", icon: <RiArrowUpLine />, prefixType: "icon" as const },
  { value: "medium", label: "Medium", icon: <RiSubtractLine />, prefixType: "icon" as const },
  { value: "low", label: "Low", icon: <RiArrowDownLine />, prefixType: "icon" as const },
]

const contactMethods = [
  { value: "email", label: "Email", icon: <RiMailLine /> },
  { value: "phone", label: "Phone call", icon: <RiPhoneLine /> },
  { value: "sms", label: "Text message", icon: <RiMessage2Line /> },
  { value: "video", label: "Video call", icon: <RiVideoOnLine /> },
]

// Options with icon-emphasized prefix (colored backgrounds)
const categories = [
  { value: "work", label: "Work", icon: <RiFolder3Line />, prefixType: "icon-emphasized" as const, prefixColor: "blue" as const },
  { value: "personal", label: "Personal", icon: <RiStarLine />, prefixType: "icon-emphasized" as const, prefixColor: "purple" as const },
  { value: "team", label: "Team", icon: <RiTeamLine />, prefixType: "icon-emphasized" as const, prefixColor: "green" as const },
]

// Options with danger icon
const dangerActions = [
  { value: "archive", label: "Archive project", icon: <RiFolder3Line />, prefixType: "icon" as const },
  { value: "delete", label: "Delete permanently", icon: <RiDeleteBinLine />, prefixType: "danger-icon" as const },
]

// Avatar options with images
const reviewers = [
  { value: "sarah", label: "Sarah Wilson", icon: <Avatar size="2xs" src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Wilson" />, prefixType: "avatar" as const },
  { value: "mike", label: "Mike Chen", icon: <Avatar size="2xs" src="https://i.pravatar.cc/150?u=mike" alt="Mike Chen" />, prefixType: "avatar" as const },
  { value: "emma", label: "Emma Davis", icon: <Avatar size="2xs" src="https://i.pravatar.cc/150?u=emma" alt="Emma Davis" />, prefixType: "avatar" as const },
  { value: "james", label: "James Park", icon: <Avatar size="2xs" src="https://i.pravatar.cc/150?u=james" alt="James Park" />, prefixType: "avatar" as const },
]

// Avatar options with placeholder colors
const assignees = [
  { value: "alice", label: "Alice Chen", icon: <Avatar size="2xs" initials="AC" isEmphasized color="blue" />, prefixType: "avatar" as const },
  { value: "bob", label: "Bob Smith", icon: <Avatar size="2xs" initials="BS" isEmphasized color="green" />, prefixType: "avatar" as const },
  { value: "carol", label: "Carol Davis", icon: <Avatar size="2xs" initials="CD" isEmphasized color="purple" />, prefixType: "avatar" as const },
  { value: "dave", label: "Dave Wilson", icon: <Avatar size="2xs" initials="DW" isEmphasized color="orange" />, prefixType: "avatar" as const },
]

// Crypto token options
const cryptoTokens = [
  { value: "btc", label: "Bitcoin", icon: <Crypto crypto="btc" size={24} />, prefixType: "token" as const },
  { value: "eth", label: "Ethereum", icon: <Crypto crypto="eth" size={24} />, prefixType: "token" as const },
  { value: "sol", label: "Solana", icon: <Crypto crypto="sol" size={24} />, prefixType: "token" as const },
  { value: "usdc", label: "USD Coin", icon: <Crypto crypto="usdc" size={24} />, prefixType: "token" as const },
]

// Company logo options
const integrations = [
  { value: "linear", label: "Linear", icon: <Logo logo="linear" size={24} />, prefixType: "company" as const },
  { value: "discord", label: "Discord", icon: <Logo logo="discord" size={24} />, prefixType: "company" as const },
  { value: "loom", label: "Loom", icon: <Logo logo="loom" size={24} />, prefixType: "company" as const },
  { value: "framer", label: "Framer", icon: <Logo logo="framer" size={24} />, prefixType: "company" as const },
]

const statuses = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive", disabled: true },
  { value: "archived", label: "Archived" },
]

// Options with descriptions
const plans = [
  { value: "free", label: "Free", description: "Up to 3 projects, 1 GB storage" },
  { value: "pro", label: "Pro", description: "Unlimited projects, 100 GB storage" },
  { value: "team", label: "Team", description: "Everything in Pro, plus collaboration" },
  { value: "enterprise", label: "Enterprise", description: "Custom limits, dedicated support" },
]

const roles = [
  { value: "viewer", label: "Viewer", description: "Can view and comment" },
  { value: "editor", label: "Editor", description: "Can edit content" },
  { value: "admin", label: "Admin", description: "Full access to all settings" },
  { value: "owner", label: "Owner", description: "Can transfer or delete workspace", disabled: true },
]

// Multi-select options
const features = [
  { value: "dark-mode", label: "Dark mode" },
  { value: "notifications", label: "Notifications" },
  { value: "auto-save", label: "Auto-save" },
  { value: "sync", label: "Cloud sync" },
  { value: "analytics", label: "Analytics" },
]

export default function SelectDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <h1 className="text-body-3xl-semibold">Select</h1>
        <p className="max-w-2xl text-body-l text-content-subtle">
          Pick from a short list of predefined values. Supports single and multiple selection.
        </p>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Select } from "@/components/ui/select"

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
]

// Basic
<Select options={options} placeholder="Select fruit" />

// With label and description
<Select
  options={options}
  label="Fruit"
  description="Choose your favorite"
  placeholder="Select fruit"
/>

// With icons
const priorities = [
  { value: "high", label: "High", icon: <RiArrowUpLine /> },
  { value: "medium", label: "Medium", icon: <RiSubtractLine /> },
  { value: "low", label: "Low", icon: <RiArrowDownLine /> },
]

<Select options={priorities} placeholder="Set priority" />

// Multi-select
<Select multiple options={options} placeholder="Select fruits" />`}
        />
      </section>

      {/* Basic */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
              <p className="text-body-s text-content-subtle">Simple dropdown selection</p>
            </div>
            <div className="w-full max-w-sm">
              <Select options={countries} placeholder="Select country" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With default value</p>
              <p className="text-body-s text-content-subtle">Pre-selected option</p>
            </div>
            <div className="w-full max-w-sm">
              <Select options={countries} defaultValue="us" />
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
              <Select size="s" options={timezones} placeholder="Select timezone" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium (36px)</p>
              <p className="text-body-s text-content-subtle">Default for most forms</p>
            </div>
            <div className="w-full max-w-sm">
              <Select size="m" options={timezones} placeholder="Select timezone" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large (40px)</p>
              <p className="text-body-s text-content-subtle">Prominent selections, touch targets</p>
            </div>
            <div className="w-full max-w-sm">
              <Select size="l" options={timezones} placeholder="Select timezone" />
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
              <p className="text-body-s text-content-subtle">Icon in trigger button</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={countries}
                leadingIcon={<RiGlobalLine />}
                placeholder="Select country"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Option icons</p>
              <p className="text-body-s text-content-subtle">Icons in dropdown items</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={contactMethods}
                placeholder="Preferred contact"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon emphasized</p>
              <p className="text-body-s text-content-subtle">Colored background icons</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={categories}
                placeholder="Select category"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Danger icon</p>
              <p className="text-body-s text-content-subtle">Destructive action indicator</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={dangerActions}
                placeholder="Select action"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Avatar (images)</p>
              <p className="text-body-s text-content-subtle">User photos in options</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={reviewers}
                placeholder="Select reviewer"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Avatar (placeholders)</p>
              <p className="text-body-s text-content-subtle">Colored initials in options</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={assignees}
                placeholder="Select assignee"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Crypto tokens</p>
              <p className="text-body-s text-content-subtle">Cryptocurrency icons</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={cryptoTokens}
                placeholder="Select token"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Company logos</p>
              <p className="text-body-s text-content-subtle">Brand icons in options</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={integrations}
                placeholder="Select integration"
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
              <p className="text-body-m text-content-strong">Plan selection</p>
              <p className="text-body-s text-content-subtle">Options with secondary text</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={plans}
                label="Plan"
                placeholder="Select a plan"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Role selection</p>
              <p className="text-body-s text-content-subtle">Permissions explained</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={roles}
                label="Role"
                placeholder="Select a role"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Selection */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Multiple Selection</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Multi-select</p>
              <p className="text-body-s text-content-subtle">Select multiple options</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                multiple
                options={features}
                label="Features"
                placeholder="Select features"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With avatars</p>
              <p className="text-body-s text-content-subtle">Multi-select with user avatars</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                multiple
                options={assignees}
                label="Assign to"
                defaultValue={["alice", "bob"]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* With Label */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Label</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label only</p>
              <p className="text-body-s text-content-subtle">Simple field label</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={countries}
                label="Country"
                placeholder="Select country"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label + description</p>
              <p className="text-body-s text-content-subtle">Additional context for the field</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={timezones}
                label="Timezone"
                description="Used for scheduling and notifications"
                placeholder="Select timezone"
              />
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
              <Select
                options={countries}
                label="Country"
                defaultValue="us"
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled option</p>
              <p className="text-body-s text-content-subtle">Individual option unavailable</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={statuses}
                label="Status"
                placeholder="Select status"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Error</p>
              <p className="text-body-s text-content-subtle">Validation error state</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={countries}
                label="Country"
                placeholder="Select country"
                error="Country is required"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Complete Example */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Complete Example</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">All features combined</p>
              <p className="text-body-s text-content-subtle">Label, description, icon, options with icons</p>
            </div>
            <div className="w-full max-w-sm">
              <Select
                options={priorities}
                label="Priority"
                description="How urgent is this task?"
                leadingIcon={<RiTimeLine />}
                placeholder="Set priority level"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
