"use client"

import { CodeBlock } from "@/components/docs/code-block"
import { Separator } from "@soft-ui/react/separator"
import { Avatar } from "@soft-ui/react/avatar"
import { ToggleButton } from "@soft-ui/react/toggle-button"
import { ToggleGroup, ToggleGroupItem } from "@soft-ui/react/toggle-group"
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiLink,
  RiImage2Line,
  RiMailLine,
  RiNotification3Line,
  RiMegaphoneLine,
} from "@remixicon/react"

export default function SeparatorDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Separator</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A visual divider that separates content. Accessible to screen
            readers.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Separator } from "@soft-ui/react/separator"

// Horizontal separator (default)
<Separator />

// Vertical separator
<Separator orientation="vertical" />`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Orientation</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
              <p className="text-body-s text-content-subtle">
                Default orientation
              </p>
            </div>
            <div className="w-full max-w-sm">
              <div className="flex flex-col gap-[var(--space-12)]">
                <p className="text-body-m text-content-default">
                  Separators create visual boundaries between sections of content.
                </p>
                <Separator />
                <p className="text-body-m text-content-default">
                  They help users scan and understand the structure of a page.
                </p>
                <Separator />
                <p className="text-body-m text-content-default">
                  Use them sparingly to maintain a clean interface.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Vertical</p>
              <p className="text-body-s text-content-subtle">
                For inline content
              </p>
            </div>
            <div className="w-full max-w-sm">
              <div className="flex h-5 items-center gap-[var(--space-12)]">
                <span className="text-body-m text-content-default">Home</span>
                <Separator orientation="vertical" />
                <span className="text-body-m text-content-default">
                  Products
                </span>
                <Separator orientation="vertical" />
                <span className="text-body-m text-content-default">About</span>
                <Separator orientation="vertical" />
                <span className="text-body-m text-content-default">
                  Contact
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Content</h2>
        <div className="flex flex-col">
          {/* Profile Card */}
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">In a card</p>
              <p className="text-body-s text-content-subtle">
                Dividing card sections
              </p>
            </div>
            <div className="w-full max-w-sm">
              <div className="flex flex-col rounded-[var(--radius-12)] border border-border-muted">
                <div className="flex items-center gap-[var(--space-12)] p-[var(--space-16)]">
                  <Avatar initials="SC" size="l" color="violet" isEmphasized />
                  <div className="flex flex-col">
                    <p className="text-body-m-medium text-content-strong">
                      Sarah Chen
                    </p>
                    <p className="text-body-s text-content-subtle">
                      Product Designer
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-around p-[var(--space-16)]">
                  <div className="flex flex-col items-center">
                    <p className="text-body-l-medium text-content-strong">
                      142
                    </p>
                    <p className="text-body-s text-content-subtle">Projects</p>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="flex flex-col items-center">
                    <p className="text-body-l-medium text-content-strong">
                      2.4k
                    </p>
                    <p className="text-body-s text-content-subtle">Followers</p>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="flex flex-col items-center">
                    <p className="text-body-l-medium text-content-strong">89</p>
                    <p className="text-body-s text-content-subtle">Following</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">In a toolbar</p>
              <p className="text-body-s text-content-subtle">
                Separating action groups
              </p>
            </div>
            <div className="w-full max-w-sm">
              <div className="flex w-fit items-center gap-[var(--space-4)] rounded-[var(--radius-10)] bg-actions-tertiary-default p-[var(--space-6)] shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)] backdrop-blur-[12px]">
                <ToggleButton
                  variant="ghost"
                  size="s"
                  icon={<RiBold />}
                  defaultPressed
                />
                <ToggleButton
                  variant="ghost"
                  size="s"
                  icon={<RiItalic />}
                />
                <ToggleButton
                  variant="ghost"
                  size="s"
                  icon={<RiUnderline />}
                />
                <Separator
                  orientation="vertical"
                  className="mx-[var(--space-4)] h-5"
                />
                <ToggleGroup
                  defaultValue={["left"]}
                  variant="ghost"
                  size="s"
                  hideSeparator
                >
                  <ToggleGroupItem value="left" leadingIcon={<RiAlignLeft />} />
                  <ToggleGroupItem
                    value="center"
                    leadingIcon={<RiAlignCenter />}
                  />
                  <ToggleGroupItem
                    value="right"
                    leadingIcon={<RiAlignRight />}
                  />
                </ToggleGroup>
                <Separator
                  orientation="vertical"
                  className="mx-[var(--space-4)] h-5"
                />
                <ToggleButton
                  variant="ghost"
                  size="s"
                  icon={<RiLink />}
                />
                <ToggleButton
                  variant="ghost"
                  size="s"
                  icon={<RiImage2Line />}
                />
              </div>
            </div>
          </div>

          {/* Settings List */}
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">In a list</p>
              <p className="text-body-s text-content-subtle">
                Dividing list items
              </p>
            </div>
            <div className="w-full max-w-sm">
              <div className="flex flex-col rounded-[var(--radius-12)] border border-border-muted">
                <div className="flex items-center gap-[var(--space-12)] p-[var(--space-16)]">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-10)] bg-surface-decorative-blue-muted">
                    <RiMailLine className="size-5 text-content-decorative-blue-subtle" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-body-m-medium text-content-strong">
                      Email notifications
                    </p>
                    <p className="text-body-s text-content-subtle">
                      Receive updates via email
                    </p>
                  </div>
                  <span className="text-body-s text-content-subtle">On</span>
                </div>
                <Separator />
                <div className="flex items-center gap-[var(--space-12)] p-[var(--space-16)]">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-10)] bg-surface-decorative-amber-muted">
                    <RiNotification3Line className="size-5 text-content-decorative-amber-subtle" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-body-m-medium text-content-strong">
                      Push notifications
                    </p>
                    <p className="text-body-s text-content-subtle">
                      Get notified on your device
                    </p>
                  </div>
                  <span className="text-body-s text-content-subtle">Off</span>
                </div>
                <Separator />
                <div className="flex items-center gap-[var(--space-12)] p-[var(--space-16)]">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-10)] bg-surface-decorative-emerald-muted">
                    <RiMegaphoneLine className="size-5 text-content-decorative-emerald-subtle" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-body-m-medium text-content-strong">
                      Marketing emails
                    </p>
                    <p className="text-body-s text-content-subtle">
                      News and product updates
                    </p>
                  </div>
                  <span className="text-body-s text-content-subtle">On</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">In a footer</p>
              <p className="text-body-s text-content-subtle">
                Separating link groups
              </p>
            </div>
            <div className="w-full max-w-sm">
              <div className="flex h-5 flex-wrap items-center gap-[var(--space-8)]">
                <span className="text-body-s text-content-subtle">
                  Privacy Policy
                </span>
                <Separator orientation="vertical" />
                <span className="text-body-s text-content-subtle">
                  Terms of Service
                </span>
                <Separator orientation="vertical" />
                <span className="text-body-s text-content-subtle">
                  Cookie Settings
                </span>
                <Separator orientation="vertical" />
                <span className="text-body-s text-content-subtle">
                  Help Center
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
