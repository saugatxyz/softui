"use client"

import { useState } from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Tabs } from "@/components/ui/tabs"
import { HomeIcon, SettingsIcon, StarIcon } from "@/icons"

export default function TabsDocsPage() {
  const [activeTab, setActiveTab] = useState("tab1")

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Tabs</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Toggle between related content sections within the same context
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Tabs } from "@/components/ui/tabs"

<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="overview">Overview content</Tabs.Content>
  <Tabs.Content value="activity">Activity content</Tabs.Content>
  <Tabs.Content value="settings">Settings content</Tabs.Content>
</Tabs>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Variants</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Stroke</p>
              <p className="text-body-m text-content-subtle">
                Underline indicator
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Tabs variant="stroke" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Activity</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Pill</p>
              <p className="text-body-m text-content-subtle">
                Secondary pill background
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Tabs variant="pill" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Activity</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Pill Emphasized</p>
              <p className="text-body-m text-content-subtle">
                Primary pill background
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Tabs variant="pill-emphasized" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Activity</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Contained</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Pill</p>
              <p className="text-body-m text-content-subtle">
                With container background
              </p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <Tabs variant="pill" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Activity</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
              <Tabs variant="pill" size="s" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Activity</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Pill emphasized</p>
              <p className="text-body-m text-content-subtle">
                With container background
              </p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <Tabs variant="pill-emphasized" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Activity</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
              <Tabs variant="pill-emphasized" size="s" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Activity</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Small</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <Tabs variant="stroke" size="s" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Activity</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
              <Tabs variant="pill" size="s" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Activity</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <Tabs variant="stroke" size="m" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Activity</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
              <Tabs variant="pill" size="m" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Activity</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Icons</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Stroke variant</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Tabs variant="stroke" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1" leadingIcon={<HomeIcon />}>
                    Home
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab2" leadingIcon={<StarIcon />}>
                    Favorites
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab3" leadingIcon={<SettingsIcon />}>
                    Settings
                  </Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Pill variant</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Tabs variant="pill" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1" leadingIcon={<HomeIcon />}>
                    Home
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab2" leadingIcon={<StarIcon />}>
                    Favorites
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab3" leadingIcon={<SettingsIcon />}>
                    Settings
                  </Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Pill emphasized</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Tabs variant="pill-emphasized" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1" leadingIcon={<HomeIcon />}>
                    Home
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab2" leadingIcon={<StarIcon />}>
                    Favorites
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab3" leadingIcon={<SettingsIcon />}>
                    Settings
                  </Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Content Panels</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0">
            <Tabs variant="stroke" value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Trigger value="tab1" leadingIcon={<HomeIcon />}>
                  Overview
                </Tabs.Trigger>
                <Tabs.Trigger value="tab2" leadingIcon={<StarIcon />}>
                  Features
                </Tabs.Trigger>
                <Tabs.Trigger value="tab3" leadingIcon={<SettingsIcon />}>
                  Settings
                </Tabs.Trigger>
                <Tabs.Indicator />
              </Tabs.List>
              <Tabs.Content value="tab1">
                <div className="rounded-[var(--radius-8)] border border-border-muted p-[var(--space-16)]">
                  <p className="text-body-m text-content-subtle">
                    This is the overview panel content. It provides a high-level
                    summary of the most important information.
                  </p>
                </div>
              </Tabs.Content>
              <Tabs.Content value="tab2">
                <div className="rounded-[var(--radius-8)] border border-border-muted p-[var(--space-16)]">
                  <p className="text-body-m text-content-subtle">
                    Explore the features available in this section. Each feature
                    is designed to enhance your workflow.
                  </p>
                </div>
              </Tabs.Content>
              <Tabs.Content value="tab3">
                <div className="rounded-[var(--radius-8)] border border-border-muted p-[var(--space-16)]">
                  <p className="text-body-m text-content-subtle">
                    Configure your preferences and customize the experience to
                    suit your needs.
                  </p>
                </div>
              </Tabs.Content>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Disabled State</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Stroke variant</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Tabs variant="stroke" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Active</Tabs.Trigger>
                  <Tabs.Trigger value="tab2" disabled>
                    Disabled
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Normal</Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Pill emphasized</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Tabs variant="pill-emphasized" defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Active</Tabs.Trigger>
                  <Tabs.Trigger value="tab2" disabled>
                    Disabled
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Normal</Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
