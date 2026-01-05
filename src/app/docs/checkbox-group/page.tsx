"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { CheckboxGroupItem } from "@/components/ui/checkbox-group-item"
import { CheckboxPrefix } from "@/components/ui/checkbox-prefix"
import { Badge } from "@/components/ui/badge"
import { BankCardIcon, SettingsIcon, HomeIcon, NotificationIcon } from "@/icons"

function IndeterminateDemo() {
  const [items, setItems] = React.useState({
    email: true,
    push: false,
    sms: false,
  })

  const allChecked = items.email && items.push && items.sms
  const noneChecked = !items.email && !items.push && !items.sms
  const isIndeterminate = !allChecked && !noneChecked

  const handleSelectAll = () => {
    const newValue = !allChecked
    setItems({
      email: newValue,
      push: newValue,
      sms: newValue,
    })
  }

  return (
    <CheckboxGroup style="list" stack="vertical">
      <CheckboxGroupItem
        label="Select all notifications"
        description="Toggle all notification types"
        checked={allChecked}
        indeterminate={isIndeterminate}
        onCheckedChange={handleSelectAll}
      />
      <CheckboxGroupItem
        label="Email notifications"
        description="Get notified via email"
        checked={items.email}
        onCheckedChange={(checked) => setItems((prev) => ({ ...prev, email: checked }))}
      />
      <CheckboxGroupItem
        label="Push notifications"
        description="Get notified on your device"
        checked={items.push}
        onCheckedChange={(checked) => setItems((prev) => ({ ...prev, push: checked }))}
      />
      <CheckboxGroupItem
        label="SMS notifications"
        description="Get notified via text message"
        checked={items.sms}
        onCheckedChange={(checked) => setItems((prev) => ({ ...prev, sms: checked }))}
      />
    </CheckboxGroup>
  )
}

export default function CheckboxGroupDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Checkbox Group</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Composable checkbox lists with multiple layout styles and configurations
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
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

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Simple</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Vertical</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <CheckboxGroup style="simple" stack="vertical">
                <CheckboxGroupItem label="Email notifications" />
                <CheckboxGroupItem label="Push notifications" />
                <CheckboxGroupItem label="SMS notifications" />
              </CheckboxGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <CheckboxGroup style="simple" stack="horizontal">
                <CheckboxGroupItem label="Red" />
                <CheckboxGroupItem label="Green" />
                <CheckboxGroupItem label="Blue" />
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">List</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Vertical</p>
            </div>
            <div className="w-full max-w-md">
              <CheckboxGroup style="list" stack="vertical">
                <CheckboxGroupItem
                  label="Order confirmations"
                  description="Receive emails when your order is confirmed"
                  badge={<Badge variant="orange" size="xs" isEmphasized>Recommended</Badge>}
                />
                <CheckboxGroupItem
                  label="Shipping updates"
                  description="Get notified when your package ships"
                />
                <CheckboxGroupItem
                  label="Delivery notifications"
                  description="Know when your package arrives"
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
                  label="JavaScript"
                  description="Modern web development"
                />
                <CheckboxGroupItem
                  label="TypeScript"
                  description="Type-safe JavaScript"
                />
                <CheckboxGroupItem
                  label="Python"
                  description="Data science and automation"
                />
                <CheckboxGroupItem
                  label="Rust"
                  description="Systems programming"
                />
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Small card</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Vertical</p>
              <p className="text-body-s text-content-subtle">Icon auto-aligns when description is present</p>
            </div>
            <div className="w-full max-w-md">
              <CheckboxGroup style="card-small" stack="vertical">
                <CheckboxGroupItem
                  label="Payment methods"
                  description="Manage cards and accounts"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<BankCardIcon />} />}
                />
                <CheckboxGroupItem
                  label="Security"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<SettingsIcon />} />}
                />
                <CheckboxGroupItem
                  label="Push notifications"
                  description="Mobile alerts"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<NotificationIcon />} />}
                />
                <CheckboxGroupItem
                  label="Home address"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<HomeIcon />} />}
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
                  label="Payments"
                  prefix={<CheckboxPrefix type="icon-emphasized-blue" size="s" icon={<BankCardIcon />} />}
                />
                <CheckboxGroupItem
                  label="Privacy"
                  prefix={<CheckboxPrefix type="icon-emphasized-green" size="s" icon={<SettingsIcon />} />}
                />
                <CheckboxGroupItem
                  label="Notifications"
                  prefix={<CheckboxPrefix type="icon-emphasized-orange" size="s" icon={<NotificationIcon />} />}
                />
                <CheckboxGroupItem
                  label="Home"
                  prefix={<CheckboxPrefix type="icon-emphasized-purple" size="s" icon={<HomeIcon />} />}
                />
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
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
                  badge={<Badge variant="warning" size="xs" isEmphasized>1.2%</Badge>}
                />
                <CheckboxGroupItem
                  label="Ethereum"
                  description="ETH"
                  prefix={<CheckboxPrefix type="token" size="m" token="eth" />}
                />
                <CheckboxGroupItem
                  label="Solana"
                  description="SOL"
                  prefix={<CheckboxPrefix type="token" size="m" token="sol" />}
                  badge={<Badge variant="success" size="xs" isEmphasized>2.5%</Badge>}
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
                  label="Discord"
                  description="Community chat"
                  prefix={<CheckboxPrefix type="logo" size="m" logo="discord" />}
                />
                <CheckboxGroupItem
                  label="Linear"
                  description="Issue tracking"
                  prefix={<CheckboxPrefix type="logo" size="m" logo="linear" />}
                />
                <CheckboxGroupItem
                  label="Framer"
                  description="Design tool"
                  prefix={<CheckboxPrefix type="logo" size="m" logo="framer" />}
                />
                <CheckboxGroupItem
                  label="Loom"
                  description="Video recording"
                  prefix={<CheckboxPrefix type="logo" size="m" logo="loom" />}
                />
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">States</h2>
          <p className="text-body-s text-content-subtle">
            Different checkbox states including disabled and indeterminate.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
              <p className="text-body-s text-content-subtle">Non-interactive</p>
            </div>
            <div className="w-full max-w-md">
              <CheckboxGroup style="card-small" stack="vertical">
                <CheckboxGroupItem
                  label="Available option"
                  description="This option can be selected"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<BankCardIcon />} />}
                />
                <CheckboxGroupItem
                  label="Disabled option"
                  description="This option is not available"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<SettingsIcon />} />}
                  disabled
                />
                <CheckboxGroupItem
                  label="Disabled checked"
                  description="Already selected, cannot change"
                  prefix={<CheckboxPrefix type="icon" size="s" icon={<NotificationIcon />} />}
                  disabled
                  defaultChecked
                />
              </CheckboxGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Indeterminate</p>
              <p className="text-body-s text-content-subtle">Partial selection</p>
            </div>
            <div className="w-full max-w-md">
              <IndeterminateDemo />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Prefix</h2>
          <p className="text-body-s text-content-subtle">
            Different prefix types for card-based checkbox items.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <CheckboxPrefix type="icon" size="s" icon={<BankCardIcon />} />
              <CheckboxPrefix type="icon" size="m" icon={<BankCardIcon />} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon Emphasized</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <CheckboxPrefix type="icon-emphasized" size="s" icon={<SettingsIcon />} />
              <CheckboxPrefix type="icon-emphasized" size="m" icon={<SettingsIcon />} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon Emphasized Colors</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <CheckboxPrefix type="icon-emphasized-blue" size="s" icon={<BankCardIcon />} />
              <CheckboxPrefix type="icon-emphasized-green" size="s" icon={<SettingsIcon />} />
              <CheckboxPrefix type="icon-emphasized-orange" size="s" icon={<NotificationIcon />} />
              <CheckboxPrefix type="icon-emphasized-purple" size="s" icon={<HomeIcon />} />
              <CheckboxPrefix type="icon-emphasized-red" size="s" icon={<BankCardIcon />} />
              <CheckboxPrefix type="icon-emphasized-cyan" size="s" icon={<SettingsIcon />} />
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
