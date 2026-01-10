"use client"

import { CodeBlock } from "@/components/docs/code-block"
import { SelectDemo } from "@/components/docs/select-demo"
import { Field } from "@/components/ui/field"
import { Select } from "@/components/ui/select"
import { Avatar } from "@/components/ui/avatar"
import { Crypto } from "@/components/ui/crypto"
import { Logo } from "@/components/ui/logo"
import {
  RiCheckFill,
  RiExpandUpDownLine,
  RiGlobalLine,
  RiMailLine,
  RiPhoneLine,
  RiMessage2Line,
  RiVideoOnLine,
  RiDeleteBinLine,
  RiFolder3Line,
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

// Avatar options with images
const reviewers = [
  { value: "sarah", label: "Sarah Wilson", icon: <Avatar size="2xs" src="/avatars/avatar-1.png" alt="Sarah Wilson" />, prefixType: "avatar" as const },
  { value: "mike", label: "Mike Chen", icon: <Avatar size="2xs" src="/avatars/avatar-2.png" alt="Mike Chen" />, prefixType: "avatar" as const },
  { value: "emma", label: "Emma Davis", icon: <Avatar size="2xs" src="/avatars/avatar-3.png" alt="Emma Davis" />, prefixType: "avatar" as const },
  { value: "james", label: "James Park", icon: <Avatar size="2xs" src="/avatars/avatar-4.png" alt="James Park" />, prefixType: "avatar" as const },
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

const frameworkGroups = [
  {
    label: "Frontend",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ],
  },
  {
    label: "Backend",
    options: [
      { value: "node", label: "Node.js" },
      { value: "go", label: "Go" },
      { value: "ruby", label: "Ruby" },
    ],
  },
]

const frameworkOptions = frameworkGroups.flatMap((group) => group.options)

// Multi-select options
const features = [
  { value: "dark-mode", label: "Dark mode" },
  { value: "notifications", label: "Notifications" },
  { value: "auto-save", label: "Auto-save" },
  { value: "sync", label: "Cloud sync" },
  { value: "analytics", label: "Analytics" },
]

function GroupedSelect() {
  return (
    <Select defaultValue="react">
      <Select.Trigger>
        <Select.Value>
          {(value) => {
            if (!value || Array.isArray(value)) return "Select framework"
            return frameworkOptions.find((option) => option.value === value)?.label ?? value
          }}
        </Select.Value>
        <Select.Icon>
          <RiExpandUpDownLine />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={4} align="start" collisionPadding={8}>
          <Select.Popup>
            <Select.List>
              {frameworkGroups.map((group) => (
                <Select.Group key={group.label}>
                  <Select.GroupLabel>{group.label}</Select.GroupLabel>
                  {group.options.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      <Select.ItemText>{option.label}</Select.ItemText>
                      <Select.ItemIndicator>
                        <span className="flex size-[16px] items-center justify-center text-content-strong [&_svg]:size-full">
                          <RiCheckFill />
                        </span>
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select>
  )
}

export default function SelectDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <h1 className="text-body-3xl-semibold">Select</h1>
        <p className="max-w-2xl text-body-l text-content-subtle">
          Pick from a short list of predefined values. Supports single and multiple selection.
        </p>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Select } from "@/components/ui/select"
import { RiCheckFill, RiExpandUpDownLine } from "@remixicon/react"

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
]

<Select defaultValue="apple">
  <Select.Trigger>
    <Select.Value>
      {(value) => {
        if (!value || Array.isArray(value)) return "Select fruit"
        return options.find((option) => option.value === value)?.label ?? value
      }}
    </Select.Value>
    <Select.Icon>
      <RiExpandUpDownLine />
    </Select.Icon>
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner sideOffset={4} align="start">
      <Select.Popup>
        <Select.List>
          {options.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              <Select.ItemText>{option.label}</Select.ItemText>
              <Select.ItemIndicator>
                <RiCheckFill />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.List>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select>`}
        />
      </section>

      {/* Basic */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
              <p className="text-body-m text-content-subtle">Simple dropdown selection</p>
            </div>
            <div className="w-full max-w-sm">
              <SelectDemo options={countries} placeholder="Select country" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With default value</p>
              <p className="text-body-m text-content-subtle">Pre-selected option</p>
            </div>
            <div className="w-full max-w-sm">
              <SelectDemo options={countries} defaultValue="us" />
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
              <p className="text-body-m text-content-subtle">Compact areas, inline forms</p>
            </div>
            <div className="w-full max-w-sm">
              <SelectDemo size="s" options={timezones} placeholder="Select timezone" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium (36px)</p>
              <p className="text-body-m text-content-subtle">Default for most forms</p>
            </div>
            <div className="w-full max-w-sm">
              <SelectDemo size="m" options={timezones} placeholder="Select timezone" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large (40px)</p>
              <p className="text-body-m text-content-subtle">Prominent selections, touch targets</p>
            </div>
            <div className="w-full max-w-sm">
              <SelectDemo size="l" options={timezones} placeholder="Select timezone" />
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
              <p className="text-body-m text-content-subtle">Icon in trigger button</p>
            </div>
            <div className="w-full max-w-sm">
              <SelectDemo
                options={countries}
                leadingIcon={<RiGlobalLine />}
                placeholder="Select country"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Option icons</p>
              <p className="text-body-m text-content-subtle">Icons in dropdown items</p>
            </div>
            <div className="w-full max-w-sm">
              <SelectDemo
                options={contactMethods}
                placeholder="Preferred contact"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Danger icon</p>
              <p className="text-body-m text-content-subtle">Destructive action indicator</p>
            </div>
            <div className="w-full max-w-sm">
              <SelectDemo
                options={dangerActions}
                placeholder="Select action"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Avatar (images)</p>
              <p className="text-body-m text-content-subtle">User photos in options</p>
            </div>
            <div className="w-full max-w-sm">
              <SelectDemo
                options={reviewers}
                placeholder="Select reviewer"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Avatar (placeholders)</p>
              <p className="text-body-m text-content-subtle">Colored initials in options</p>
            </div>
            <div className="w-full max-w-sm">
              <SelectDemo
                options={assignees}
                placeholder="Select assignee"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Crypto tokens</p>
              <p className="text-body-m text-content-subtle">Cryptocurrency icons</p>
            </div>
            <div className="w-full max-w-sm">
              <SelectDemo
                options={cryptoTokens}
                placeholder="Select token"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Company logos</p>
              <p className="text-body-m text-content-subtle">Brand icons in options</p>
            </div>
            <div className="w-full max-w-sm">
              <SelectDemo
                options={integrations}
                placeholder="Select integration"
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
              <p className="text-body-m text-content-strong">Plan selection</p>
              <p className="text-body-m text-content-subtle">Options with secondary text</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Plan">
                <SelectDemo
                  options={plans}
                  placeholder="Select a plan"
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Role selection</p>
              <p className="text-body-m text-content-subtle">Permissions explained</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Role">
                <SelectDemo
                  options={roles}
                  placeholder="Select a role"
                />
              </Field>
            </div>
          </div>
        </div>
      </section>

      {/* Grouped Options */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Grouped Options</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Grouped list</p>
              <p className="text-body-m text-content-subtle">Organize related options under headings</p>
            </div>
            <div className="w-full max-w-sm">
              <GroupedSelect />
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
              <p className="text-body-m text-content-subtle">Select multiple options</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Features">
                <SelectDemo
                  multiple
                  options={features}
                  placeholder="Select features"
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With avatars</p>
              <p className="text-body-m text-content-subtle">Multi-select with user avatars</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Assign to">
                <SelectDemo
                  multiple
                  options={assignees}
                  defaultValue={["alice", "bob"]}
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
                <SelectDemo
                  options={countries}
                  placeholder="Select country"
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label + description</p>
              <p className="text-body-m text-content-subtle">Additional context for the field</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Timezone" description="Used for scheduling and notifications">
                <SelectDemo
                  options={timezones}
                  placeholder="Select timezone"
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
              <p className="text-body-m text-content-subtle">Non-interactive state</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Country" disabled>
                <SelectDemo
                  options={countries}
                  defaultValue="us"
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
                <SelectDemo
                  options={statuses}
                  placeholder="Select status"
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Error</p>
              <p className="text-body-m text-content-subtle">Validation error state</p>
            </div>
            <div className="w-full max-w-sm">
              <Field label="Country" error="Country is required">
                <SelectDemo
                  options={countries}
                  placeholder="Select country"
                />
              </Field>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
