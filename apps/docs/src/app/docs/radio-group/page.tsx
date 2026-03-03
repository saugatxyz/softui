"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { RadioGroup } from "@soft-ui/react/radio-group"
import { RadioGroupItem } from "@soft-ui/react/radio-group-item"
import { RadioPrefix } from "@soft-ui/react/radio-prefix"
import { Badge } from "@soft-ui/react/badge"
import {
  BankCardIcon,
  BankIcon,
  SunIcon,
  MoonIcon,
  SwapIcon,
} from "@soft-ui/icons"

export default function RadioGroupDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Radio Group</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Single-select lists with multiple layout styles and configurations
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { RadioGroup } from "@soft-ui/react/radio-group"
import { RadioGroupItem } from "@soft-ui/react/radio-group-item"

<RadioGroup defaultValue="option1" style="simple">
  <RadioGroupItem value="option1" label="Option 1" />
  <RadioGroupItem value="option2" label="Option 2" />
  <RadioGroupItem value="option3" label="Option 3" />
</RadioGroup>`}
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
              <RadioGroup defaultValue="weekly" style="simple" stack="vertical">
                <RadioGroupItem value="daily" label="Daily" />
                <RadioGroupItem value="weekly" label="Weekly" />
                <RadioGroupItem value="monthly" label="Monthly" />
              </RadioGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <RadioGroup defaultValue="m" style="simple" stack="horizontal">
                <RadioGroupItem value="s" label="S" />
                <RadioGroupItem value="m" label="M" />
                <RadioGroupItem value="l" label="L" />
                <RadioGroupItem value="xl" label="XL" />
              </RadioGroup>
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
              <RadioGroup defaultValue="standard" style="list" stack="vertical">
                <RadioGroupItem
                  value="express"
                  label="Express"
                  description="1-2 business days"
                  badge={<Badge variant="blue" size="xs" isEmphasized>$12.99</Badge>}
                />
                <RadioGroupItem
                  value="standard"
                  label="Standard"
                  description="3-5 business days"
                  badge={<Badge variant="neutral" size="xs" isEmphasized>$4.99</Badge>}
                />
                <RadioGroupItem
                  value="economy"
                  label="Economy"
                  description="7-10 business days"
                  badge={<Badge variant="green" size="xs" isEmphasized>Free</Badge>}
                />
              </RadioGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
            </div>
            <div className="w-full max-w-md">
              <RadioGroup defaultValue="yearly" style="list" stack="horizontal">
                <RadioGroupItem
                  value="monthly"
                  label="Monthly"
                  description="$12/month"
                />
                <RadioGroupItem
                  value="yearly"
                  label="Yearly"
                  description="$99/year"
                  badge={<Badge variant="green" size="xs" isEmphasized>Save 30%</Badge>}
                />
                <RadioGroupItem
                  value="lifetime"
                  label="Lifetime"
                  description="$249 once"
                />
              </RadioGroup>
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
              <RadioGroup defaultValue="card" style="card-small" stack="vertical">
                <RadioGroupItem
                  value="card"
                  label="Credit card"
                  description="Visa ending in 4242"
                  prefix={<RadioPrefix type="icon" size="s" icon={<BankCardIcon />} />}
                />
                <RadioGroupItem
                  value="bank"
                  label="Bank transfer"
                  prefix={<RadioPrefix type="icon" size="s" icon={<BankIcon />} />}
                />
                <RadioGroupItem
                  value="crypto"
                  label="Cryptocurrency"
                  description="BTC, ETH, or USDC"
                  prefix={<RadioPrefix type="icon" size="s" icon={<BankCardIcon />} />}
                />
              </RadioGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
            </div>
            <div className="w-full max-w-md">
              <RadioGroup defaultValue="system" style="card-small" stack="horizontal">
                <RadioGroupItem
                  value="light"
                  label="Light"
                  prefix={<RadioPrefix type="icon" size="s" icon={<SunIcon />} containerStyle="subtle" containerColor="orange" />}
                />
                <RadioGroupItem
                  value="dark"
                  label="Dark"
                  prefix={<RadioPrefix type="icon" size="s" icon={<MoonIcon />} containerStyle="subtle" containerColor="indigo" />}
                />
                <RadioGroupItem
                  value="system"
                  label="System"
                  prefix={<RadioPrefix type="icon" size="s" icon={<SwapIcon />} containerStyle="subtle" containerColor="green" />}
                />
              </RadioGroup>
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
              <RadioGroup defaultValue="eth" style="card-big" stack="vertical">
                <RadioGroupItem
                  value="btc"
                  label="BTC"
                  description="$97,432.41"
                  prefix={<RadioPrefix type="token" size="m" token="btc" />}
                  badge={<Badge variant="success" size="xs" leadingDot>2.4%</Badge>}
                />
                <RadioGroupItem
                  value="eth"
                  label="ETH"
                  description="$3,521.08"
                  prefix={<RadioPrefix type="token" size="m" token="eth" />}
                  badge={<Badge variant="danger" size="xs" leadingDot>1.2%</Badge>}
                />
                <RadioGroupItem
                  value="sol"
                  label="SOL"
                  description="$189.24"
                  prefix={<RadioPrefix type="token" size="m" token="sol" />}
                  badge={<Badge variant="success" size="xs" leadingDot>5.1%</Badge>}
                />
              </RadioGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
            </div>
            <div className="w-full max-w-md">
              <RadioGroup defaultValue="google" style="card-big" stack="horizontal">
                <RadioGroupItem
                  value="google"
                  label="Google"
                  description="gmail.com"
                  prefix={<RadioPrefix type="logo" size="m" logo="google" />}
                />
                <RadioGroupItem
                  value="apple"
                  label="Apple"
                  description="icloud.com"
                  prefix={<RadioPrefix type="logo" size="m" logo="apple" />}
                />
                <RadioGroupItem
                  value="linear"
                  label="Linear"
                  description="linear.app"
                  prefix={<RadioPrefix type="logo" size="m" logo="linear" />}
                />
                <RadioGroupItem
                  value="airbnb"
                  label="Airbnb"
                  description="airbnb.com"
                  prefix={<RadioPrefix type="logo" size="m" logo="airbnb" />}
                />
              </RadioGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">States</h2>
          <p className="text-body-m text-content-subtle">
            Disabled radio options.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="w-full max-w-md">
              <RadioGroup defaultValue="usdc" style="card-small" stack="vertical">
                <RadioGroupItem
                  value="usdc"
                  label="USDC"
                  description="Available balance: $1,250"
                  prefix={<RadioPrefix type="token" size="s" token="usdc" />}
                />
                <RadioGroupItem
                  value="usdt"
                  label="USDT"
                  description="Available balance: $0"
                  prefix={<RadioPrefix type="token" size="s" token="usdt" />}
                  disabled
                />
                <RadioGroupItem
                  value="dai"
                  label="DAI"
                  description="Coming soon"
                  prefix={<RadioPrefix type="token" size="s" token="dai" />}
                  disabled
                />
              </RadioGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Prefix</h2>
          <p className="text-body-m text-content-subtle">
            Prefix types for card-based radio items.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <RadioPrefix type="icon" size="s" icon={<BankCardIcon />} />
              <RadioPrefix type="icon" size="m" icon={<BankCardIcon />} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Container Subtle</p>
              <p className="text-body-m text-content-subtle">Default (neutral)</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <RadioPrefix type="icon" size="s" icon={<SunIcon />} containerStyle="subtle" />
              <RadioPrefix type="icon" size="m" icon={<SunIcon />} containerStyle="subtle" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Container Subtle Colors</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <RadioPrefix type="icon" size="s" icon={<MoonIcon />} containerStyle="subtle" containerColor="blue" />
              <RadioPrefix type="icon" size="s" icon={<SwapIcon />} containerStyle="subtle" containerColor="green" />
              <RadioPrefix type="icon" size="s" icon={<SunIcon />} containerStyle="subtle" containerColor="orange" />
              <RadioPrefix type="icon" size="s" icon={<MoonIcon />} containerStyle="subtle" containerColor="purple" />
              <RadioPrefix type="icon" size="s" icon={<SwapIcon />} containerStyle="subtle" containerColor="red" />
              <RadioPrefix type="icon" size="s" icon={<SunIcon />} containerStyle="subtle" containerColor="cyan" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Container Strong</p>
              <p className="text-body-m text-content-subtle">Default (neutral)</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <RadioPrefix type="icon" size="s" icon={<SunIcon />} containerStyle="strong" />
              <RadioPrefix type="icon" size="m" icon={<SunIcon />} containerStyle="strong" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Container Strong Colors</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <RadioPrefix type="icon" size="s" icon={<MoonIcon />} containerStyle="strong" containerColor="blue" />
              <RadioPrefix type="icon" size="s" icon={<SwapIcon />} containerStyle="strong" containerColor="green" />
              <RadioPrefix type="icon" size="s" icon={<SunIcon />} containerStyle="strong" containerColor="orange" />
              <RadioPrefix type="icon" size="s" icon={<MoonIcon />} containerStyle="strong" containerColor="purple" />
              <RadioPrefix type="icon" size="s" icon={<SwapIcon />} containerStyle="strong" containerColor="red" />
              <RadioPrefix type="icon" size="s" icon={<SunIcon />} containerStyle="strong" containerColor="cyan" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Token</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <RadioPrefix type="token" size="s" token="btc" />
              <RadioPrefix type="token" size="s" token="eth" />
              <RadioPrefix type="token" size="s" token="sol" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Logo</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <RadioPrefix type="logo" size="s" logo="google" />
              <RadioPrefix type="logo" size="s" logo="apple" />
              <RadioPrefix type="logo" size="s" logo="linear" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
