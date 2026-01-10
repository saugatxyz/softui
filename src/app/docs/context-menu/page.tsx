"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import {
  ContextMenu,
  MenuItem,
  MenuGroup,
  MenuGroupLabel,
  MenuEmpty,
  MenuPrefix,
  MenuSeparator,
} from "@/components/ui/context-menu"
import { CopyIcon, TrashIcon } from "@/icons"
import { RiEditLine, RiShareLine, RiDownloadLine } from "@remixicon/react"

const menuPopupClassName = "flex flex-col gap-[var(--space-2)] p-[var(--space-4)]"
const menuItemLabelClassName =
  "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]"

function SelectableCheckboxContextMenu() {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([
    "rulers",
    "grid",
  ])

  const handleCheckedChange = (item: string) => (checked: boolean) => {
    setSelectedItems((prev) =>
      checked ? [...new Set([...prev, item])] : prev.filter((value) => value !== item)
    )
  }

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <button className="rounded-[var(--radius-10)] border border-border-subtle px-[var(--space-12)] py-[var(--space-8)] text-body-m text-content-strong">
          Right click for toggles
        </button>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner>
          <ContextMenu.Popup className={menuPopupClassName}>
            <ContextMenu.CheckboxItem
              checked={selectedItems.includes("rulers")}
              onCheckedChange={handleCheckedChange("rulers")}
              closeOnClick={false}
            >
              <span className={menuItemLabelClassName}>Show rulers</span>
            </ContextMenu.CheckboxItem>
            <ContextMenu.CheckboxItem
              checked={selectedItems.includes("guides")}
              onCheckedChange={handleCheckedChange("guides")}
              closeOnClick={false}
            >
              <span className={menuItemLabelClassName}>Show guides</span>
            </ContextMenu.CheckboxItem>
            <ContextMenu.CheckboxItem
              checked={selectedItems.includes("grid")}
              onCheckedChange={handleCheckedChange("grid")}
              closeOnClick={false}
            >
              <span className={menuItemLabelClassName}>Show grid</span>
            </ContextMenu.CheckboxItem>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}

function SelectableRadioContextMenu() {
  const [selectedSort, setSelectedSort] = React.useState("date")

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <button className="rounded-[var(--radius-10)] border border-border-subtle px-[var(--space-12)] py-[var(--space-8)] text-body-m text-content-strong">
          Right click for sorting
        </button>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner>
          <ContextMenu.Popup className={menuPopupClassName}>
            <ContextMenu.RadioGroup
              className="flex flex-col gap-[var(--space-2)]"
              value={selectedSort}
              onValueChange={setSelectedSort}
            >
              <ContextMenu.RadioItem value="name">
                <span className={menuItemLabelClassName}>Name</span>
              </ContextMenu.RadioItem>
              <ContextMenu.RadioItem value="date">
                <span className={menuItemLabelClassName}>Date modified</span>
              </ContextMenu.RadioItem>
              <ContextMenu.RadioItem value="size">
                <span className={menuItemLabelClassName}>File size</span>
              </ContextMenu.RadioItem>
            </ContextMenu.RadioGroup>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}

export default function ContextMenuDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Context Menu</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Right-click menu for contextual actions
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { ContextMenu, MenuItem, MenuSeparator } from "@/components/ui/context-menu"

<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div>Right click me</div>
  </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner>
          <ContextMenu.Popup className="flex flex-col gap-[var(--space-2)] p-[var(--space-4)]">
            <MenuItem>Edit</MenuItem>
            <MenuItem>Copy</MenuItem>
            <MenuSeparator />
            <MenuItem variant="danger">Delete</MenuItem>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
</ContextMenu.Root>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Basics</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">File actions</p>
              <p className="text-body-m text-content-subtle">
                Common actions for a document
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <button className="rounded-[var(--radius-10)] border border-border-subtle px-[var(--space-12)] py-[var(--space-8)] text-body-m text-content-strong">
                    Right click me
                  </button>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner>
                    <ContextMenu.Popup className={menuPopupClassName}>
                      <MenuItem>
                        <span className={menuItemLabelClassName}>New file</span>
                      </MenuItem>
                      <MenuItem>
                        <span className={menuItemLabelClassName}>Open</span>
                      </MenuItem>
                      <MenuItem>
                        <span className={menuItemLabelClassName}>Save</span>
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem>
                        <span className={menuItemLabelClassName}>Close</span>
                      </MenuItem>
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Empty State</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">No results</p>
              <p className="text-body-m text-content-subtle">
                Use MenuEmpty to guide users
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <button className="rounded-[var(--radius-10)] border border-border-subtle px-[var(--space-12)] py-[var(--space-8)] text-body-m text-content-strong">
                    Right click me
                  </button>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner>
                    <ContextMenu.Popup className={menuPopupClassName}>
                      <MenuEmpty
                        title="No matching files"
                        description="Try a different keyword."
                      />
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Icons</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Project actions</p>
              <p className="text-body-m text-content-subtle">
                Helpful visuals for quick scanning
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <button className="rounded-[var(--radius-10)] border border-border-subtle px-[var(--space-12)] py-[var(--space-8)] text-body-m text-content-strong">
                    Right click for actions
                  </button>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner>
                    <ContextMenu.Popup className={menuPopupClassName}>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiEditLine />} />
                        <span className={menuItemLabelClassName}>Edit</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<CopyIcon />} />
                        <span className={menuItemLabelClassName}>Duplicate</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiShareLine />} />
                        <span className={menuItemLabelClassName}>Share</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiDownloadLine />} />
                        <span className={menuItemLabelClassName}>Download</span>
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem variant="danger">
                        <MenuPrefix type="danger-icon" icon={<TrashIcon />} />
                        <span className={menuItemLabelClassName}>Delete</span>
                      </MenuItem>
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Grouped</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Grouped actions</p>
              <p className="text-body-m text-content-subtle">
                Separate sections by intent
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <button className="rounded-[var(--radius-10)] border border-border-subtle px-[var(--space-12)] py-[var(--space-8)] text-body-m text-content-strong">
                    Right click for grouped menu
                  </button>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner>
                    <ContextMenu.Popup className={menuPopupClassName}>
                      <MenuGroup className="flex flex-col gap-[var(--space-2)]">
                        <MenuGroupLabel>View</MenuGroupLabel>
                        <MenuItem>
                          <span className={menuItemLabelClassName}>Zoom in</span>
                        </MenuItem>
                        <MenuItem>
                          <span className={menuItemLabelClassName}>Zoom out</span>
                        </MenuItem>
                      </MenuGroup>
                      <MenuSeparator />
                      <MenuGroup className="flex flex-col gap-[var(--space-2)]">
                        <MenuGroupLabel>Danger zone</MenuGroupLabel>
                        <MenuItem variant="danger">
                          <span className={menuItemLabelClassName}>Delete</span>
                        </MenuItem>
                      </MenuGroup>
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Selections</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Checkbox selection</p>
              <p className="text-body-m text-content-subtle">Toggle multiple options</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <SelectableCheckboxContextMenu />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Radio selection</p>
              <p className="text-body-m text-content-subtle">Choose a single option</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <SelectableRadioContextMenu />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Submenu</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Nested actions</p>
              <p className="text-body-m text-content-subtle">
                Secondary options within a submenu
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <button className="rounded-[var(--radius-10)] border border-border-subtle px-[var(--space-12)] py-[var(--space-8)] text-body-m text-content-strong">
                    Right click for submenu
                  </button>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner>
                    <ContextMenu.Popup className={menuPopupClassName}>
                      <MenuItem>
                        <span className={menuItemLabelClassName}>Copy link</span>
                      </MenuItem>
                      <ContextMenu.SubmenuRoot>
                        <ContextMenu.SubmenuTrigger>
                          <span className={menuItemLabelClassName}>Send via</span>
                        </ContextMenu.SubmenuTrigger>
                        <ContextMenu.Portal>
                          <ContextMenu.Positioner sideOffset={8} alignOffset={-4} side="right" align="start">
                            <ContextMenu.Popup className={menuPopupClassName}>
                              <MenuItem>
                                <span className={menuItemLabelClassName}>Email</span>
                              </MenuItem>
                              <MenuItem>
                                <span className={menuItemLabelClassName}>Slack</span>
                              </MenuItem>
                              <MenuItem>
                                <span className={menuItemLabelClassName}>Twitter</span>
                              </MenuItem>
                            </ContextMenu.Popup>
                          </ContextMenu.Positioner>
                        </ContextMenu.Portal>
                      </ContextMenu.SubmenuRoot>
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
