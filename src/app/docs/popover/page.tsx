"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Popover } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { Input } from "@/components/ui/input"
import {
  RiCloseLine,
  RiSettings3Line,
  RiInformationLine,
  RiFilter3Line,
} from "@remixicon/react"

export default function PopoverDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Popover</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A popup that displays rich content in a portal, triggered by a button.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Popover } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

<Popover.Root>
  <Popover.Trigger render={<Button>Open popover</Button>} />
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup className="p-[var(--space-16)]">
        <Popover.Title>Popover title</Popover.Title>
        <Popover.Description>
          Popover description goes here.
        </Popover.Description>
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>`}
        />
      </section>

      {/* Basic */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Basic</h2>
          <p className="text-body-m text-content-subtle">
            Simple popover with title and description.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
              <p className="text-body-s text-content-subtle">Title and description</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Popover.Root>
                <Popover.Trigger render={<Button variant="secondary">Open popover</Button>} />
                <Popover.Portal>
                  <Popover.Positioner>
                    <Popover.Popup className="w-[280px] p-[var(--space-16)]">
                      <div className="flex flex-col gap-[var(--space-4)]">
                        <Popover.Title>Popover title</Popover.Title>
                        <Popover.Description>
                          This is a description that provides more context about the popover content.
                        </Popover.Description>
                      </div>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With close button</p>
              <p className="text-body-s text-content-subtle">Includes dismiss action</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Popover.Root>
                <Popover.Trigger render={<IconButton variant="secondary"><RiSettings3Line /></IconButton>} />
                <Popover.Portal>
                  <Popover.Positioner>
                    <Popover.Popup className="w-[280px] p-[var(--space-16)]">
                      <div className="flex items-start justify-between gap-[var(--space-8)]">
                        <div className="flex flex-col gap-[var(--space-4)]">
                          <Popover.Title>Settings</Popover.Title>
                          <Popover.Description>
                            Configure your preferences here.
                          </Popover.Description>
                        </div>
                        <Popover.Close render={<IconButton variant="ghost" size="2xs"><RiCloseLine /></IconButton>} />
                      </div>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>
        </div>
      </section>

      {/* With Arrow */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">With Arrow</h2>
          <p className="text-body-m text-content-subtle">
            Popover with an arrow pointing to the trigger.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Arrow indicator</p>
              <p className="text-body-s text-content-subtle">Points to trigger element</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Popover.Root>
                <Popover.Trigger render={<IconButton variant="ghost"><RiInformationLine /></IconButton>} />
                <Popover.Portal>
                  <Popover.Positioner>
                    <Popover.Popup className="w-[240px] p-[var(--space-16)]">
                      <Popover.Arrow />
                      <Popover.Description>
                        Helpful information about this feature.
                      </Popover.Description>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>
        </div>
      </section>

      {/* With Form */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">With Form</h2>
          <p className="text-body-m text-content-subtle">
            Popover with form inputs for filtering or settings.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Filter popover</p>
              <p className="text-body-s text-content-subtle">With small input fields</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Popover.Root>
                <Popover.Trigger render={<Button variant="secondary" leadingIcon={<RiFilter3Line />}>Filters</Button>} />
                <Popover.Portal>
                  <Popover.Positioner>
                    <Popover.Popup className="w-[280px] p-[var(--space-16)]">
                      <div className="flex flex-col gap-[var(--space-16)]">
                        <div className="flex items-center justify-between">
                          <Popover.Title>Filters</Popover.Title>
                          <Popover.Close render={<IconButton variant="ghost" size="2xs"><RiCloseLine /></IconButton>} />
                        </div>
                        <div className="flex flex-col gap-[var(--space-12)]">
                          <div className="flex flex-col gap-[var(--space-6)]">
                            <label className="text-[length:var(--font-size-s)] font-[var(--font-weight-medium)] leading-[var(--line-height-s)] text-content-strong">
                              Min price
                            </label>
                            <Input size="s" placeholder="0" />
                          </div>
                          <div className="flex flex-col gap-[var(--space-6)]">
                            <label className="text-[length:var(--font-size-s)] font-[var(--font-weight-medium)] leading-[var(--line-height-s)] text-content-strong">
                              Max price
                            </label>
                            <Input size="s" placeholder="1000" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-[var(--space-8)] border-t border-border-muted pt-[var(--space-12)] -mx-[var(--space-16)] px-[var(--space-16)] -mb-[var(--space-16)] pb-[var(--space-12)]">
                          <Popover.Close render={<Button variant="secondary" size="s">Reset</Button>} />
                          <Popover.Close render={<Button variant="primary" size="s">Apply</Button>} />
                        </div>
                      </div>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Placement */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Placement</h2>
          <p className="text-body-m text-content-subtle">
            Popovers can be positioned on different sides of the trigger.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Top</p>
              <p className="text-body-s text-content-subtle">Popover appears above</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Popover.Root>
                <Popover.Trigger render={<Button variant="secondary" size="s">Top</Button>} />
                <Popover.Portal>
                  <Popover.Positioner side="top">
                    <Popover.Popup className="p-[var(--space-12)]">
                      <Popover.Description>Top placement</Popover.Description>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Right</p>
              <p className="text-body-s text-content-subtle">Popover appears to the right</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Popover.Root>
                <Popover.Trigger render={<Button variant="secondary" size="s">Right</Button>} />
                <Popover.Portal>
                  <Popover.Positioner side="right">
                    <Popover.Popup className="p-[var(--space-12)]">
                      <Popover.Description>Right placement</Popover.Description>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Bottom</p>
              <p className="text-body-s text-content-subtle">Popover appears below</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Popover.Root>
                <Popover.Trigger render={<Button variant="secondary" size="s">Bottom</Button>} />
                <Popover.Portal>
                  <Popover.Positioner side="bottom">
                    <Popover.Popup className="p-[var(--space-12)]">
                      <Popover.Description>Bottom placement</Popover.Description>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Left</p>
              <p className="text-body-s text-content-subtle">Popover appears to the left</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Popover.Root>
                <Popover.Trigger render={<Button variant="secondary" size="s">Left</Button>} />
                <Popover.Portal>
                  <Popover.Positioner side="left">
                    <Popover.Popup className="p-[var(--space-12)]">
                      <Popover.Description>Left placement</Popover.Description>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>
        </div>
      </section>

      {/* With Backdrop */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">With Backdrop</h2>
          <p className="text-body-m text-content-subtle">
            Modal-like popover with a backdrop overlay.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Backdrop overlay</p>
              <p className="text-body-s text-content-subtle">Dims background content</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Popover.Root>
                <Popover.Trigger render={<Button variant="secondary">With backdrop</Button>} />
                <Popover.Portal>
                  <Popover.Backdrop />
                  <Popover.Positioner>
                    <Popover.Popup className="w-[280px] p-[var(--space-16)]">
                      <div className="flex items-start justify-between gap-[var(--space-8)]">
                        <div className="flex flex-col gap-[var(--space-4)]">
                          <Popover.Title>Important action</Popover.Title>
                          <Popover.Description>
                            This popover requires your attention.
                          </Popover.Description>
                        </div>
                        <Popover.Close render={<IconButton variant="ghost" size="2xs"><RiCloseLine /></IconButton>} />
                      </div>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
