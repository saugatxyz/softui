"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { CheckboxGroupItem } from "@/components/ui/checkbox-group-item"
import { CheckboxPrefix } from "@/components/ui/checkbox-prefix"
import { Badge } from "@/components/ui/badge"
import {
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  SunIcon,
  MoonIcon,
} from "@/icons"

function IndeterminateDemo() {
  const [items, setItems] = React.useState({
    slack: true,
    email: false,
    sms: false,
  })

  const allChecked = items.slack && items.email && items.sms
  const noneChecked = !items.slack && !items.email && !items.sms
  const isIndeterminate = !allChecked && !noneChecked

  const handleSelectAll = () => {
    const newValue = !allChecked
    setItems({
      slack: newValue,
      email: newValue,
      sms: newValue,
    })
  }

  return (
    <CheckboxGroup style="list" stack="vertical">
      <CheckboxGroupItem
        label="Select all channels"
        description="Enable all notification channels"
        checked={allChecked}
        indeterminate={isIndeterminate}
        onCheckedChange={handleSelectAll}
      />
      <CheckboxGroupItem
        label="Slack notifications"
        description="Get alerts in your Slack workspace"
        checked={items.slack}
        onCheckedChange={(checked) => setItems((prev) => ({ ...prev, slack: checked }))}
      />
      <CheckboxGroupItem
        label="Email digest"
        description="Daily summary sent to your inbox"
        checked={items.email}
        onCheckedChange={(checked) => setItems((prev) => ({ ...prev, email: checked }))}
      />
      <CheckboxGroupItem
        label="SMS alerts"
        description="Critical alerts via text message"
        checked={items.sms}
        onCheckedChange={(checked) => setItems((prev) => ({ ...prev, sms: checked }))}
      />
    </CheckboxGroup>
  )
}

export default function CheckboxGroupDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Checkbox Group</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Multi-select lists with multiple layout styles and configurations
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { CheckboxGroupItem } from "@/components/ui/checkbox-group-item"

<CheckboxGroup style="simple">
  <CheckboxGroupItem label="Option 1" />
  <CheckboxGroupItem label="Option 2" />
  <CheckboxGroupItem label="Option 3" />
</CheckboxGroup>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Simple</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Vertical</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <CheckboxGroup style="simple" stack="vertical">
                <CheckboxGroupItem label="Vegetarian" />
                <CheckboxGroupItem label="Vegan" />
                <CheckboxGroupItem label="Gluten-free" />
              </CheckboxGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <CheckboxGroup style="simple" stack="horizontal">
                <CheckboxGroupItem label="S" />
                <CheckboxGroupItem label="M" />
                <CheckboxGroupItem label="L" />
                <CheckboxGroupItem label="XL" />
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">List</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Vertical</p>
            </div>
            <div className="w-full max-w-md">
              <CheckboxGroup style="list" stack="vertical">
                <CheckboxGroupItem
                  label="Gift wrapping"
                  description="Elegant packaging with a personalized note"
                  badge={<Badge variant="green" size="xs" isEmphasized>Free</Badge>}
                />
                <CheckboxGroupItem
                  label="Priority handling"
                  description="Your order ships first"
                  badge={<Badge variant="orange" size="xs" isEmphasized>+ $3</Badge>}
                />
                <CheckboxGroupItem
                  label="Package protection"
                  description="Full coverage for lost or damaged items"
                />
              </CheckboxGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
            </div>
            <div className="w-full max-w-md">
              <CheckboxGroup style="list" stack="horizontal">
                <CheckboxGroupItem
                  label="React"
                  description="UI library"
                />
                <CheckboxGroupItem
                  label="TypeScript"
                  description="Type safety"
                />
                <CheckboxGroupItem
                  label="Tailwind"
                  description="Utility CSS"
                />
                <CheckboxGroupItem
                  label="Next.js"
                  description="Framework"
                />
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Small card</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Vertical</p>
              <p className="text-body-m text-content-subtle">Icon auto-aligns when description is present</p>
            </div>
            <div className="w-full max-w-md">
              <CheckboxGroup style="card-small" stack="vertical">
                <CheckboxGroupItem
                  label="Order updates"
                  description="When your order ships or arrives"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<StarIcon />} />}
                />
                <CheckboxGroupItem
                  label="Promotions"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<HeartIcon />} />}
                />
                <CheckboxGroupItem
                  label="Account alerts"
                  description="Security and billing notifications"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<BookmarkIcon />} />}
                />
              </CheckboxGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
            </div>
            <div className="w-full max-w-md">
              <CheckboxGroup style="card-small" stack="horizontal">
                <CheckboxGroupItem
                  label="Favorites"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<StarIcon />} containerStyle="subtle" containerColor="orange" />}
                />
                <CheckboxGroupItem
                  label="Liked"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<HeartIcon />} containerStyle="subtle" containerColor="red" />}
                />
                <CheckboxGroupItem
                  label="Saved"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<BookmarkIcon />} containerStyle="subtle" containerColor="blue" />}
                />
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Big card</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Vertical</p>
            </div>
            <div className="w-full max-w-md">
              <CheckboxGroup style="card-big" stack="vertical">
                <CheckboxGroupItem
                  label="Bitcoin"
                  description="BTC"
                  prefix={<CheckboxPrefix type="token" size="m" token="btc" />}
                  badge={<Badge variant="success" size="xs" isEmphasized>+2.4%</Badge>}
                />
                <CheckboxGroupItem
                  label="Ethereum"
                  description="ETH"
                  prefix={<CheckboxPrefix type="token" size="m" token="eth" />}
                  badge={<Badge variant="danger" size="xs" isEmphasized>-1.2%</Badge>}
                />
                <CheckboxGroupItem
                  label="Solana"
                  description="SOL"
                  prefix={<CheckboxPrefix type="token" size="m" token="sol" />}
                  badge={<Badge variant="success" size="xs" isEmphasized>+5.1%</Badge>}
                />
              </CheckboxGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
            </div>
            <div className="w-full max-w-md">
              <CheckboxGroup style="card-big" stack="horizontal">
                <CheckboxGroupItem
                  label="Google"
                  description="google.com"
                  prefix={<CheckboxPrefix type="logo" size="m" logo="google" />}
                />
                <CheckboxGroupItem
                  label="Apple"
                  description="apple.com"
                  prefix={<CheckboxPrefix type="logo" size="m" logo="apple" />}
                />
                <CheckboxGroupItem
                  label="Linear"
                  description="linear.app"
                  prefix={<CheckboxPrefix type="logo" size="m" logo="linear" />}
                />
                <CheckboxGroupItem
                  label="Framer"
                  description="framer.com"
                  prefix={<CheckboxPrefix type="logo" size="m" logo="framer" />}
                />
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">States</h2>
          <p className="text-body-m text-content-subtle">
            Disabled and indeterminate checkbox states.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="w-full max-w-md">
              <CheckboxGroup style="card-small" stack="vertical">
                <CheckboxGroupItem
                  label="Light mode"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<SunIcon />} />}
                />
                <CheckboxGroupItem
                  label="Dark mode"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<MoonIcon />} />}
                  disabled
                />
                <CheckboxGroupItem
                  label="Auto (system)"
                  description="Locked by admin"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<SunIcon />} />}
                  disabled
                  defaultChecked
                />
              </CheckboxGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Indeterminate</p>
              <p className="text-body-m text-content-subtle">Partial selection</p>
            </div>
            <div className="w-full max-w-md">
              <IndeterminateDemo />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Prefix</h2>
          <p className="text-body-m text-content-subtle">
            Prefix types for card-based checkbox items.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <CheckboxPrefix type="icon" size="s" icon={<StarIcon />} />
              <CheckboxPrefix type="icon" size="m" icon={<StarIcon />} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Container Subtle</p>
              <p className="text-body-m text-content-subtle">Default (neutral)</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <CheckboxPrefix type="icon" size="s" icon={<HeartIcon />} containerStyle="subtle" />
              <CheckboxPrefix type="icon" size="m" icon={<HeartIcon />} containerStyle="subtle" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Container Subtle Colors</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <CheckboxPrefix type="icon" size="s" icon={<BookmarkIcon />} containerStyle="subtle" containerColor="blue" />
              <CheckboxPrefix type="icon" size="s" icon={<StarIcon />} containerStyle="subtle" containerColor="green" />
              <CheckboxPrefix type="icon" size="s" icon={<HeartIcon />} containerStyle="subtle" containerColor="orange" />
              <CheckboxPrefix type="icon" size="s" icon={<BookmarkIcon />} containerStyle="subtle" containerColor="purple" />
              <CheckboxPrefix type="icon" size="s" icon={<StarIcon />} containerStyle="subtle" containerColor="red" />
              <CheckboxPrefix type="icon" size="s" icon={<HeartIcon />} containerStyle="subtle" containerColor="cyan" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Container Strong</p>
              <p className="text-body-m text-content-subtle">Default (neutral)</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <CheckboxPrefix type="icon" size="s" icon={<HeartIcon />} containerStyle="strong" />
              <CheckboxPrefix type="icon" size="m" icon={<HeartIcon />} containerStyle="strong" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Container Strong Colors</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <CheckboxPrefix type="icon" size="s" icon={<BookmarkIcon />} containerStyle="strong" containerColor="blue" />
              <CheckboxPrefix type="icon" size="s" icon={<StarIcon />} containerStyle="strong" containerColor="green" />
              <CheckboxPrefix type="icon" size="s" icon={<HeartIcon />} containerStyle="strong" containerColor="orange" />
              <CheckboxPrefix type="icon" size="s" icon={<BookmarkIcon />} containerStyle="strong" containerColor="purple" />
              <CheckboxPrefix type="icon" size="s" icon={<StarIcon />} containerStyle="strong" containerColor="red" />
              <CheckboxPrefix type="icon" size="s" icon={<HeartIcon />} containerStyle="strong" containerColor="cyan" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Token</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <CheckboxPrefix type="token" size="s" token="btc" />
              <CheckboxPrefix type="token" size="s" token="eth" />
              <CheckboxPrefix type="token" size="s" token="sol" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Logo</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <CheckboxPrefix type="logo" size="s" logo="discord" />
              <CheckboxPrefix type="logo" size="s" logo="linear" />
              <CheckboxPrefix type="logo" size="s" logo="framer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
