"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { CommandPalette } from "@soft-ui/react/command-palette"
import { Button } from "@soft-ui/react/button"
import { Badge } from "@soft-ui/react/badge"
import { Avatar } from "@soft-ui/react/avatar"
import { KbdGroup } from "@soft-ui/react/kbd"
import {
  RiEditLine,
  RiStarLine,
  RiTimeLine,
  RiCheckLine,
  RiPriceTag3Line,
  RiArrowUpLine,
  RiSettings3Line,
  RiLogoutBoxLine,
  RiSearchLine,
  RiFileTextLine,
  RiFolder3Line,
  RiLoader2Line,
  RiHeartFill,
} from "@remixicon/react"

export default function CommandPaletteDocsPage() {
  const [basicOpen, setBasicOpen] = React.useState(false)
  const [groupedOpen, setGroupedOpen] = React.useState(false)
  const [prefixOpen, setPrefixOpen] = React.useState(false)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Command Palette</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A searchable command menu for quickly accessing actions, navigation, and more. Press{" "}
            <KbdGroup keys={["⌘", "K"]} className="mx-1" /> to open.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { CommandPalette } from "@soft-ui/react/command-palette"

<CommandPalette.Root open={open} onOpenChange={setOpen}>
  <CommandPalette.Content>
    <CommandPalette.Input placeholder="Type a command or search..." />
    <CommandPalette.List>
      <CommandPalette.Empty />
      <CommandPalette.Group heading="Actions">
        <CommandPalette.Item>
          <CommandPalette.ItemPrefix>
            <RiEditLine />
          </CommandPalette.ItemPrefix>
          <CommandPalette.ItemLabel>Edit</CommandPalette.ItemLabel>
        </CommandPalette.Item>
      </CommandPalette.Group>
    </CommandPalette.List>
    <CommandPalette.Footer />
  </CommandPalette.Content>
</CommandPalette.Root>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Simple command palette</p>
              <p className="text-body-m text-content-subtle">With search, items, and footer</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <CommandPalette.Root open={basicOpen} onOpenChange={setBasicOpen}>
                <CommandPalette.Trigger render={<Button variant="secondary">Open command palette</Button>} />
                <CommandPalette.Content>
                  <CommandPalette.Input placeholder="Type a command or search..." />
                  <CommandPalette.List>
                    <CommandPalette.Empty />
                    <CommandPalette.Item onSelect={() => setBasicOpen(false)}>
                      <CommandPalette.ItemPrefix>
                        <RiEditLine />
                      </CommandPalette.ItemPrefix>
                      <CommandPalette.ItemLabel>Edit file</CommandPalette.ItemLabel>
                      <CommandPalette.ItemSuffix>
                        <KbdGroup keys={["⌘", "E"]} />
                      </CommandPalette.ItemSuffix>
                    </CommandPalette.Item>
                    <CommandPalette.Item onSelect={() => setBasicOpen(false)}>
                      <CommandPalette.ItemPrefix>
                        <RiStarLine />
                      </CommandPalette.ItemPrefix>
                      <CommandPalette.ItemLabel>Add to favorites</CommandPalette.ItemLabel>
                      <CommandPalette.ItemSuffix>
                        <KbdGroup keys={["⌘", "⇧", "F"]} />
                      </CommandPalette.ItemSuffix>
                    </CommandPalette.Item>
                    <CommandPalette.Item onSelect={() => setBasicOpen(false)}>
                      <CommandPalette.ItemPrefix>
                        <RiTimeLine />
                      </CommandPalette.ItemPrefix>
                      <CommandPalette.ItemLabel>View history</CommandPalette.ItemLabel>
                    </CommandPalette.Item>
                    <CommandPalette.Item onSelect={() => setBasicOpen(false)}>
                      <CommandPalette.ItemPrefix>
                        <RiSettings3Line />
                      </CommandPalette.ItemPrefix>
                      <CommandPalette.ItemLabel>Settings</CommandPalette.ItemLabel>
                      <CommandPalette.ItemSuffix>
                        <KbdGroup keys={["⌘", ","]} />
                      </CommandPalette.ItemSuffix>
                    </CommandPalette.Item>
                  </CommandPalette.List>
                  <CommandPalette.Footer />
                </CommandPalette.Content>
              </CommandPalette.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Grouped Items</h2>
        <p className="text-body-m text-content-subtle">
          Use <code className="rounded bg-surface-muted px-[var(--space-4)] py-[var(--space-2)] text-body-s">CommandPalette.Group</code> with a heading to organize related commands.
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With groups</p>
              <p className="text-body-m text-content-subtle">Organized by category</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <CommandPalette.Root open={groupedOpen} onOpenChange={setGroupedOpen} enableKeyboardShortcut>
                <CommandPalette.Trigger render={<Button variant="secondary">Open grouped palette</Button>} />
                <CommandPalette.Content>
                  <CommandPalette.Input placeholder="Type a command or search..." />
                  <CommandPalette.List>
                    <CommandPalette.Empty />

                    <CommandPalette.Group>
                      <CommandPalette.GroupHeading>Recent</CommandPalette.GroupHeading>
                      <CommandPalette.Item onSelect={() => setGroupedOpen(false)}>
                        <CommandPalette.ItemPrefix variant="avatar">
                          <Avatar
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face"
                            size="xs"
                          />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>Assign to Jane Doe</CommandPalette.ItemLabel>
                        <CommandPalette.ItemSuffix>
                          <Badge variant="success" size="s" isEmphasized>Recommended</Badge>
                          <KbdGroup keys={["⌘", "1"]} />
                        </CommandPalette.ItemSuffix>
                      </CommandPalette.Item>
                      <CommandPalette.Item onSelect={() => setGroupedOpen(false)}>
                        <CommandPalette.ItemPrefix variant="emphasized" color="pink">
                          <RiHeartFill />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>Add to favorites</CommandPalette.ItemLabel>
                        <CommandPalette.ItemSuffix>
                          <KbdGroup keys={["⌘", "⇧", "2"]} />
                        </CommandPalette.ItemSuffix>
                      </CommandPalette.Item>
                      <CommandPalette.Item onSelect={() => setGroupedOpen(false)}>
                        <CommandPalette.ItemPrefix variant="emphasized" color="green">
                          <RiLoader2Line />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>Update status</CommandPalette.ItemLabel>
                        <CommandPalette.ItemSuffix>
                          <KbdGroup keys={["⌘", "3"]} />
                        </CommandPalette.ItemSuffix>
                      </CommandPalette.Item>
                    </CommandPalette.Group>

                    <CommandPalette.Separator />

                    <CommandPalette.Group>
                      <CommandPalette.GroupHeading>Actions</CommandPalette.GroupHeading>
                      <CommandPalette.Item onSelect={() => setGroupedOpen(false)}>
                        <CommandPalette.ItemPrefix>
                          <RiArrowUpLine />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>Change priority</CommandPalette.ItemLabel>
                      </CommandPalette.Item>
                      <CommandPalette.Item onSelect={() => setGroupedOpen(false)}>
                        <CommandPalette.ItemPrefix>
                          <RiTimeLine />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>Set estimate</CommandPalette.ItemLabel>
                      </CommandPalette.Item>
                      <CommandPalette.Item onSelect={() => setGroupedOpen(false)}>
                        <CommandPalette.ItemPrefix>
                          <RiPriceTag3Line />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>Add tag</CommandPalette.ItemLabel>
                      </CommandPalette.Item>
                    </CommandPalette.Group>
                  </CommandPalette.List>
                  <CommandPalette.Footer />
                </CommandPalette.Content>
              </CommandPalette.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Item Prefix Variants</h2>
        <p className="text-body-m text-content-subtle">
          The <code className="rounded bg-surface-muted px-[var(--space-4)] py-[var(--space-2)] text-body-s">ItemPrefix</code> component supports different variants: icon, avatar, and emphasized (with color).
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Prefix styles</p>
              <p className="text-body-m text-content-subtle">Icon, avatar, emphasized</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <CommandPalette.Root open={prefixOpen} onOpenChange={setPrefixOpen}>
                <CommandPalette.Trigger render={<Button variant="secondary">Open prefix demo</Button>} />
                <CommandPalette.Content>
                  <CommandPalette.Input placeholder="Type a command or search..." />
                  <CommandPalette.List>
                    <CommandPalette.Empty />

                    <CommandPalette.Group>
                      <CommandPalette.GroupHeading>Icon (default)</CommandPalette.GroupHeading>
                      <CommandPalette.Item onSelect={() => setPrefixOpen(false)}>
                        <CommandPalette.ItemPrefix>
                          <RiSearchLine />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>Search files</CommandPalette.ItemLabel>
                      </CommandPalette.Item>
                      <CommandPalette.Item onSelect={() => setPrefixOpen(false)}>
                        <CommandPalette.ItemPrefix>
                          <RiFileTextLine />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>New document</CommandPalette.ItemLabel>
                      </CommandPalette.Item>
                    </CommandPalette.Group>

                    <CommandPalette.Separator />

                    <CommandPalette.Group>
                      <CommandPalette.GroupHeading>Avatar</CommandPalette.GroupHeading>
                      <CommandPalette.Item onSelect={() => setPrefixOpen(false)}>
                        <CommandPalette.ItemPrefix variant="avatar">
                          <Avatar
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face"
                            size="xs"
                          />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>Assign to Sarah</CommandPalette.ItemLabel>
                      </CommandPalette.Item>
                      <CommandPalette.Item onSelect={() => setPrefixOpen(false)}>
                        <CommandPalette.ItemPrefix variant="avatar">
                          <Avatar
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
                            size="xs"
                          />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>Assign to Mike</CommandPalette.ItemLabel>
                      </CommandPalette.Item>
                    </CommandPalette.Group>

                    <CommandPalette.Separator />

                    <CommandPalette.Group>
                      <CommandPalette.GroupHeading>Emphasized</CommandPalette.GroupHeading>
                      <CommandPalette.Item onSelect={() => setPrefixOpen(false)}>
                        <CommandPalette.ItemPrefix variant="emphasized" color="green">
                          <RiCheckLine />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>Mark complete</CommandPalette.ItemLabel>
                      </CommandPalette.Item>
                      <CommandPalette.Item onSelect={() => setPrefixOpen(false)}>
                        <CommandPalette.ItemPrefix variant="emphasized" color="blue">
                          <RiFolder3Line />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>Move to folder</CommandPalette.ItemLabel>
                      </CommandPalette.Item>
                      <CommandPalette.Item onSelect={() => setPrefixOpen(false)}>
                        <CommandPalette.ItemPrefix variant="emphasized" color="orange">
                          <RiTimeLine />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>Set reminder</CommandPalette.ItemLabel>
                      </CommandPalette.Item>
                      <CommandPalette.Item onSelect={() => setPrefixOpen(false)}>
                        <CommandPalette.ItemPrefix variant="emphasized" color="rose">
                          <RiLogoutBoxLine />
                        </CommandPalette.ItemPrefix>
                        <CommandPalette.ItemLabel>Sign out</CommandPalette.ItemLabel>
                      </CommandPalette.Item>
                    </CommandPalette.Group>
                  </CommandPalette.List>
                  <CommandPalette.Footer />
                </CommandPalette.Content>
              </CommandPalette.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Features</h2>
        <div className="flex flex-col gap-[var(--space-12)]">
          <ul className="list-inside list-disc text-body-m text-content-subtle">
            <li><strong>Global shortcut:</strong> Press <KbdGroup keys={["⌘", "K"]} className="mx-1" /> to open from anywhere</li>
            <li><strong>Fuzzy search:</strong> cmdk provides built-in fuzzy matching</li>
            <li><strong>Keyboard navigation:</strong> Use arrow keys to navigate, Enter to select</li>
            <li><strong>Groups:</strong> Organize commands with headings and separators</li>
            <li><strong>Async support:</strong> Show loading state while fetching results</li>
            <li><strong>Customizable:</strong> Styled with design tokens, fully themeable</li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Accessibility</h2>
        <div className="flex flex-col gap-[var(--space-12)]">
          <p className="text-body-m text-content-subtle">
            Command palettes are fully accessible:
          </p>
          <ul className="list-inside list-disc text-body-m text-content-subtle">
            <li>Focus is trapped within the palette when open</li>
            <li>Escape key closes the palette</li>
            <li>Arrow keys navigate between items</li>
            <li>Enter selects the highlighted item</li>
            <li>Screen readers announce the search results</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
