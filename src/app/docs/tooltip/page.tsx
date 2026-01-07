"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Tooltip } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import {
  RiInformationLine,
  RiQuestionLine,
  RiFileCopyLine,
  RiDeleteBinLine,
  RiShareLine,
  RiDownloadLine,
  RiPieChartLine,
} from "@remixicon/react"

export default function TooltipDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Tooltip</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A popup that displays information related to an element when it receives keyboard focus or the mouse hovers over it.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Tooltip } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger render={<Button>Hover me</Button>} />
    <Tooltip.Portal>
      <Tooltip.Positioner sideOffset={8}>
        <Tooltip.Popup>
          <Tooltip.Simple>Tooltip text</Tooltip.Simple>
        </Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>`}
        />
      </section>

      {/* Simple */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Simple</h2>
          <p className="text-body-m text-content-subtle">
            Basic tooltip with text and optional keyboard shortcut.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Text only</p>
              <p className="text-body-s text-content-subtle">Simple label tooltip</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger render={<IconButton variant="ghost" size="m"><RiInformationLine /></IconButton>} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner sideOffset={8}>
                      <Tooltip.Popup>
                        <Tooltip.Simple>More information</Tooltip.Simple>
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With shortcut</p>
              <p className="text-body-s text-content-subtle">Label with keyboard shortcut</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Tooltip.Provider>
                <div className="flex items-center gap-[var(--space-8)]">
                  <Tooltip.Root>
                    <Tooltip.Trigger render={<IconButton variant="secondary" size="m"><RiFileCopyLine /></IconButton>} />
                    <Tooltip.Portal>
                      <Tooltip.Positioner sideOffset={8}>
                        <Tooltip.Popup>
                          <Tooltip.Simple shortcut={["⌘", "C"]}>Copy</Tooltip.Simple>
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                  <Tooltip.Root>
                    <Tooltip.Trigger render={<IconButton variant="secondary" size="m"><RiDeleteBinLine /></IconButton>} />
                    <Tooltip.Portal>
                      <Tooltip.Positioner sideOffset={8}>
                        <Tooltip.Popup>
                          <Tooltip.Simple shortcut={["⌫"]}>Delete</Tooltip.Simple>
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                  <Tooltip.Root>
                    <Tooltip.Trigger render={<IconButton variant="secondary" size="m"><RiShareLine /></IconButton>} />
                    <Tooltip.Portal>
                      <Tooltip.Positioner sideOffset={8}>
                        <Tooltip.Popup>
                          <Tooltip.Simple shortcut={["⌘", "⇧", "S"]}>Share</Tooltip.Simple>
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
              </Tooltip.Provider>
            </div>
          </div>
        </div>
      </section>

      {/* Explainer */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Explainer</h2>
          <p className="text-body-m text-content-subtle">
            Tooltip with title and description for more detailed explanations.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Title + description</p>
              <p className="text-body-s text-content-subtle">More detailed help text</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger render={<IconButton variant="ghost" size="m"><RiQuestionLine /></IconButton>} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner sideOffset={8}>
                      <Tooltip.Popup>
                        <Tooltip.Explainer title="Keyboard shortcuts">
                          Press ? to see all available shortcuts
                        </Tooltip.Explainer>
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With shortcut</p>
              <p className="text-body-s text-content-subtle">Includes keyboard shortcut</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger render={<IconButton variant="secondary" size="m"><RiDownloadLine /></IconButton>} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner sideOffset={8}>
                      <Tooltip.Popup>
                        <Tooltip.Explainer title="Download" shortcut={["⌘", "D"]}>
                          Save a copy to your device
                        </Tooltip.Explainer>
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
        </div>
      </section>

      {/* Breakdown */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Breakdown</h2>
          <p className="text-body-m text-content-subtle">
            Data tooltip for charts and visualizations.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Chart tooltip</p>
              <p className="text-body-s text-content-subtle">For data visualizations</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger render={<IconButton variant="secondary" size="m"><RiPieChartLine /></IconButton>} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner sideOffset={8}>
                      <Tooltip.Popup>
                        <Tooltip.Breakdown
                          title="Traffic Sources"
                          description="Last 30 days"
                          items={[
                            { label: "Direct", value: "645", color: "warning" },
                            { label: "Organic Search", value: "1,280", color: "success" },
                            { label: "Referral", value: "296", color: "info" },
                            { label: "Social", value: "440", color: "danger" },
                          ]}
                        />
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Custom colors</p>
              <p className="text-body-s text-content-subtle">With hex color values</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger render={<Button variant="secondary">Revenue breakdown</Button>} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner sideOffset={8}>
                      <Tooltip.Popup>
                        <Tooltip.Breakdown
                          title="Q4 Revenue"
                          description="By product category"
                          items={[
                            { label: "Enterprise", value: "$2.4M", color: "#8b5cf6" },
                            { label: "Pro", value: "$1.8M", color: "#06b6d4" },
                            { label: "Starter", value: "$920K", color: "#f59e0b" },
                          ]}
                        />
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
        </div>
      </section>

      {/* Placement */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Placement</h2>
          <p className="text-body-m text-content-subtle">
            Tooltips can be positioned on different sides of the trigger.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Top</p>
              <p className="text-body-s text-content-subtle">Tooltip appears above</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger render={<Button variant="secondary" size="s">Hover me</Button>} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="top" sideOffset={8}>
                      <Tooltip.Popup>
                        <Tooltip.Simple>Top tooltip</Tooltip.Simple>
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Right</p>
              <p className="text-body-s text-content-subtle">Tooltip appears to the right</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger render={<Button variant="secondary" size="s">Hover me</Button>} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="right" sideOffset={8}>
                      <Tooltip.Popup>
                        <Tooltip.Simple>Right tooltip</Tooltip.Simple>
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Bottom</p>
              <p className="text-body-s text-content-subtle">Tooltip appears below</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger render={<Button variant="secondary" size="s">Hover me</Button>} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="bottom" sideOffset={8}>
                      <Tooltip.Popup>
                        <Tooltip.Simple>Bottom tooltip</Tooltip.Simple>
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Left</p>
              <p className="text-body-s text-content-subtle">Tooltip appears to the left</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger render={<Button variant="secondary" size="s">Hover me</Button>} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="left" sideOffset={8}>
                      <Tooltip.Popup>
                        <Tooltip.Simple>Left tooltip</Tooltip.Simple>
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
