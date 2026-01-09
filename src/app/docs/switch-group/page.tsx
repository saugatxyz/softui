"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { SwitchGroup } from "@/components/ui/switch-group"
import { SwitchGroupItem } from "@/components/ui/switch-group-item"
import { SwitchPrefix } from "@/components/ui/switch-prefix"
import { Badge } from "@/components/ui/badge"
import {
  RiMailLine,
  RiNotification3Line,
  RiSmartphoneLine,
  RiWifiLine,
  RiBluetoothLine,
  RiPlaneLine,
} from "@remixicon/react"
import {
  StarIcon,
  HeartIcon,
  BookmarkIcon,
} from "@/icons"

export default function SwitchGroupDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Switch Group</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Toggle lists with multiple layout styles and configurations
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { SwitchGroup } from "@/components/ui/switch-group"
import { SwitchGroupItem } from "@/components/ui/switch-group-item"

<SwitchGroup style="simple">
  <SwitchGroupItem label="Option 1" />
  <SwitchGroupItem label="Option 2" />
  <SwitchGroupItem label="Option 3" />
</SwitchGroup>`}
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
              <SwitchGroup style="simple" stack="vertical">
                <SwitchGroupItem label="Show online status" defaultChecked />
                <SwitchGroupItem label="Read receipts" defaultChecked />
                <SwitchGroupItem label="Typing indicators" />
              </SwitchGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <SwitchGroup style="simple" stack="horizontal">
                <SwitchGroupItem label="Wi-Fi" defaultChecked />
                <SwitchGroupItem label="Bluetooth" />
                <SwitchGroupItem label="Airplane" />
              </SwitchGroup>
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
              <SwitchGroup style="list" stack="vertical">
                <SwitchGroupItem
                  label="Push notifications"
                  description="Get notified about messages and updates instantly"
                  defaultChecked
                />
                <SwitchGroupItem
                  label="Email digest"
                  description="Weekly summary of activity and insights"
                />
                <SwitchGroupItem
                  label="SMS alerts"
                  description="Critical security alerts via text message"
                  badge={<Badge variant="orange" size="xs" isEmphasized>Premium</Badge>}
                />
              </SwitchGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
            </div>
            <div className="w-full max-w-md">
              <SwitchGroup style="list" stack="horizontal">
                <SwitchGroupItem
                  label="Auto-merge"
                  description="PRs merge when ready"
                  defaultChecked
                />
                <SwitchGroupItem
                  label="Branch protection"
                  description="Require reviews"
                  defaultChecked
                />
              </SwitchGroup>
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
              <SwitchGroup style="card-small" stack="vertical">
                <SwitchGroupItem
                  label="Email"
                  description="Weekly digest and important updates"
                  prefix={<SwitchPrefix type="icon" size="s" icon={<RiMailLine size={16} />} />}
                  defaultChecked
                />
                <SwitchGroupItem
                  label="Push"
                  prefix={<SwitchPrefix type="icon" size="s" icon={<RiNotification3Line size={16} />} />}
                  defaultChecked
                />
                <SwitchGroupItem
                  label="SMS"
                  prefix={<SwitchPrefix type="icon" size="s" icon={<RiSmartphoneLine size={16} />} />}
                />
              </SwitchGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
            </div>
            <div className="w-full max-w-md">
              <SwitchGroup style="card-small" stack="horizontal">
                <SwitchGroupItem
                  label="Wi-Fi"
                  prefix={<SwitchPrefix type="icon-emphasized-blue" size="s" icon={<RiWifiLine size={16} />} />}
                  defaultChecked
                />
                <SwitchGroupItem
                  label="Bluetooth"
                  prefix={<SwitchPrefix type="icon-emphasized-cyan" size="s" icon={<RiBluetoothLine size={16} />} />}
                />
                <SwitchGroupItem
                  label="Airplane"
                  prefix={<SwitchPrefix type="icon-emphasized-orange" size="s" icon={<RiPlaneLine size={16} />} />}
                />
              </SwitchGroup>
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
              <SwitchGroup style="card-big" stack="vertical">
                <SwitchGroupItem
                  label="Google Calendar"
                  description="Sync events and meetings"
                  prefix={<SwitchPrefix type="logo" size="m" logo="google" />}
                  badge={<Badge variant="success" size="xs" isEmphasized>Connected</Badge>}
                  defaultChecked
                />
                <SwitchGroupItem
                  label="Linear"
                  description="Create issues from tasks"
                  prefix={<SwitchPrefix type="logo" size="m" logo="linear" />}
                  badge={<Badge variant="success" size="xs" isEmphasized>Connected</Badge>}
                  defaultChecked
                />
                <SwitchGroupItem
                  label="Discord"
                  description="Send notifications to channels"
                  prefix={<SwitchPrefix type="logo" size="m" logo="discord" />}
                />
              </SwitchGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
            </div>
            <div className="w-full max-w-md">
              <SwitchGroup style="card-big" stack="horizontal">
                <SwitchGroupItem
                  label="Bitcoin"
                  description="BTC price alerts"
                  prefix={<SwitchPrefix type="token" size="m" token="btc" />}
                  defaultChecked
                />
                <SwitchGroupItem
                  label="Ethereum"
                  description="ETH price alerts"
                  prefix={<SwitchPrefix type="token" size="m" token="eth" />}
                />
              </SwitchGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="w-full max-w-md">
              <SwitchGroup style="card-big" stack="vertical">
                <SwitchGroupItem
                  label="Google"
                  description="Sync events and meetings"
                  prefix={<SwitchPrefix type="logo" size="m" logo="google" />}
                  defaultChecked
                />
                <SwitchGroupItem
                  label="Linear"
                  description="Managed by your organization"
                  prefix={<SwitchPrefix type="logo" size="m" logo="linear" />}
                  disabled
                  defaultChecked
                />
                <SwitchGroupItem
                  label="Discord"
                  description="Requires admin approval"
                  prefix={<SwitchPrefix type="logo" size="m" logo="discord" />}
                  badge={<Badge variant="warning" size="xs" isEmphasized>Disconnected</Badge>}
                  disabled
                />
              </SwitchGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Prefix</h2>
          <p className="text-body-m text-content-subtle">
            Prefix types for card-based switch items.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <SwitchPrefix type="icon" size="s" icon={<StarIcon />} />
              <SwitchPrefix type="icon" size="m" icon={<StarIcon />} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon Emphasized</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <SwitchPrefix type="icon-emphasized" size="s" icon={<HeartIcon />} />
              <SwitchPrefix type="icon-emphasized" size="m" icon={<HeartIcon />} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon Emphasized Colors</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <SwitchPrefix type="icon-emphasized-blue" size="s" icon={<BookmarkIcon />} />
              <SwitchPrefix type="icon-emphasized-green" size="s" icon={<StarIcon />} />
              <SwitchPrefix type="icon-emphasized-orange" size="s" icon={<HeartIcon />} />
              <SwitchPrefix type="icon-emphasized-purple" size="s" icon={<BookmarkIcon />} />
              <SwitchPrefix type="icon-emphasized-red" size="s" icon={<StarIcon />} />
              <SwitchPrefix type="icon-emphasized-cyan" size="s" icon={<HeartIcon />} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Token</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <SwitchPrefix type="token" size="s" token="btc" />
              <SwitchPrefix type="token" size="s" token="eth" />
              <SwitchPrefix type="token" size="s" token="sol" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Logo</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <SwitchPrefix type="logo" size="s" logo="discord" />
              <SwitchPrefix type="logo" size="s" logo="linear" />
              <SwitchPrefix type="logo" size="s" logo="framer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
