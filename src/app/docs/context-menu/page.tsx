"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import {
  ContextMenu,
  MenuItem,
  MenuPrefix,
  MenuSuffix,
  MenuSeparator,
  MenuGroup,
  MenuGroupLabel,
} from "@/components/ui/context-menu"
import {
  CopyIcon,
  TrashIcon,
  AddIcon,
} from "@/icons"
import {
  RiEditLine,
  RiShareLine,
  RiDownloadLine,
  RiFolderLine,
  RiFileCopyLine,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiRefreshLine,
  RiPriceTag3Line,
} from "@remixicon/react"

export default function ContextMenuDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Context Menu</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A menu activated by right-clicking or long-pressing on a trigger area
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { ContextMenu, MenuItem, MenuSeparator } from "@/components/ui/context-menu"

<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div className="...">Right click here</div>
  </ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Positioner>
      <ContextMenu.Popup>
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

      {/* Basic Context Menu */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Text only</p>
              <p className="text-body-s text-content-subtle">Simple menu with text labels</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <div className="flex h-[120px] w-[200px] items-center justify-center rounded-[var(--radius-12)] border border-dashed border-border-muted bg-surface-canvas text-body-s text-content-subtle">
                    Right click here
                  </div>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner>
                    <ContextMenu.Popup>
                      <MenuItem>New file</MenuItem>
                      <MenuItem>Open</MenuItem>
                      <MenuItem>Save</MenuItem>
                      <MenuItem>Save as...</MenuItem>
                      <MenuSeparator />
                      <MenuItem>Close</MenuItem>
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With supporting text</p>
              <p className="text-body-s text-content-subtle">Items with descriptions</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <div className="flex h-[120px] w-[200px] items-center justify-center rounded-[var(--radius-12)] border border-dashed border-border-muted bg-surface-canvas text-body-s text-content-subtle">
                    Right click here
                  </div>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner>
                    <ContextMenu.Popup>
                      <MenuItem supportingText="Create a new document">New</MenuItem>
                      <MenuItem supportingText="Open existing file">Open</MenuItem>
                      <MenuItem supportingText="Save current changes">Save</MenuItem>
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            </div>
          </div>
        </div>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Icons</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon prefix</p>
              <p className="text-body-s text-content-subtle">Leading icons for actions</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <div className="flex h-[120px] w-[200px] items-center justify-center rounded-[var(--radius-12)] border border-dashed border-border-muted bg-surface-canvas text-body-s text-content-subtle">
                    Right click here
                  </div>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner>
                    <ContextMenu.Popup>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiEditLine />} />}>
                        Edit
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiFileCopyLine />} />}>
                        Duplicate
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiShareLine />} />}>
                        Share
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiFolderLine />} />}>
                        Move to folder
                      </MenuItem>
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Browser-style Context Menu */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Browser Style</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Page context menu</p>
              <p className="text-body-s text-content-subtle">Common browser actions</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <div className="flex h-[120px] w-[200px] items-center justify-center rounded-[var(--radius-12)] border border-dashed border-border-muted bg-surface-canvas text-body-s text-content-subtle">
                    Right click here
                  </div>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner>
                    <ContextMenu.Popup>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiArrowGoBackLine />} />}>
                        Back
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiArrowGoForwardLine />} />} disabled>
                        Forward
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiRefreshLine />} />}>
                        Reload
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<CopyIcon />} />}>
                        Copy
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiDownloadLine />} />}>
                        Save as...
                      </MenuItem>
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Groups</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With labels</p>
              <p className="text-body-s text-content-subtle">Organize items into sections</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <div className="flex h-[120px] w-[200px] items-center justify-center rounded-[var(--radius-12)] border border-dashed border-border-muted bg-surface-canvas text-body-s text-content-subtle">
                    Right click here
                  </div>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner>
                    <ContextMenu.Popup>
                      <MenuGroup>
                        <MenuGroupLabel>Edit</MenuGroupLabel>
                        <MenuItem prefix={<MenuPrefix type="icon" icon={<RiEditLine />} />}>
                          Edit file
                        </MenuItem>
                        <MenuItem prefix={<MenuPrefix type="icon" icon={<RiFileCopyLine />} />}>
                          Duplicate
                        </MenuItem>
                      </MenuGroup>
                      <MenuSeparator />
                      <MenuGroup>
                        <MenuGroupLabel>Organize</MenuGroupLabel>
                        <MenuItem prefix={<MenuPrefix type="icon" icon={<RiFolderLine />} />}>
                          Move to folder
                        </MenuItem>
                        <MenuItem prefix={<MenuPrefix type="icon" icon={<RiDownloadLine />} />}>
                          Download
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

      {/* Submenu */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Submenu</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Nested menu</p>
              <p className="text-body-s text-content-subtle">For hierarchical navigation</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <div className="flex h-[120px] w-[200px] items-center justify-center rounded-[var(--radius-12)] border border-dashed border-border-muted bg-surface-canvas text-body-s text-content-subtle">
                    Right click here
                  </div>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner>
                    <ContextMenu.Popup>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiEditLine />} />}>
                        Edit
                      </MenuItem>
                      <ContextMenu.SubmenuRoot>
                        <ContextMenu.SubmenuTrigger>
                          <MenuPrefix type="icon" icon={<RiShareLine />} />
                          <span className="flex min-w-0 flex-1 pl-[var(--space-2)] font-[var(--font-weight-medium)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] text-content-strong">
                            Share
                          </span>
                          <MenuSuffix type="submenu" />
                        </ContextMenu.SubmenuTrigger>
                        <ContextMenu.Portal>
                          <ContextMenu.Positioner sideOffset={2} alignOffset={-4} side="right" align="start">
                            <ContextMenu.Popup>
                              <MenuItem>Copy link</MenuItem>
                              <MenuItem>Email</MenuItem>
                              <MenuItem>Twitter</MenuItem>
                              <MenuItem>LinkedIn</MenuItem>
                            </ContextMenu.Popup>
                          </ContextMenu.Positioner>
                        </ContextMenu.Portal>
                      </ContextMenu.SubmenuRoot>
                      <ContextMenu.SubmenuRoot>
                        <ContextMenu.SubmenuTrigger>
                          <MenuPrefix type="icon" icon={<RiFolderLine />} />
                          <span className="flex min-w-0 flex-1 pl-[var(--space-2)] font-[var(--font-weight-medium)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] text-content-strong">
                            Move to
                          </span>
                          <MenuSuffix type="submenu" />
                        </ContextMenu.SubmenuTrigger>
                        <ContextMenu.Portal>
                          <ContextMenu.Positioner sideOffset={2} alignOffset={-4} side="right" align="start">
                            <ContextMenu.Popup>
                              <MenuItem>Documents</MenuItem>
                              <MenuItem>Downloads</MenuItem>
                              <MenuItem>Archive</MenuItem>
                            </ContextMenu.Popup>
                          </ContextMenu.Positioner>
                        </ContextMenu.Portal>
                      </ContextMenu.SubmenuRoot>
                      <MenuSeparator />
                      <MenuItem
                        variant="danger"
                        prefix={<MenuPrefix type="danger-icon" icon={<TrashIcon />} />}
                      >
                        Delete
                      </MenuItem>
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Selection Controls */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Selectable Items</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Checkbox selection</p>
              <p className="text-body-s text-content-subtle">Multi-select with checkboxes</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <SelectableCheckboxContextMenu />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Radio selection</p>
              <p className="text-body-s text-content-subtle">Single-select with radio buttons</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <SelectableRadioContextMenu />
            </div>
          </div>
        </div>
      </section>

      {/* Danger Variant */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Danger Variant</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Destructive actions</p>
              <p className="text-body-s text-content-subtle">Red color for dangerous operations</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <div className="flex h-[120px] w-[200px] items-center justify-center rounded-[var(--radius-12)] border border-dashed border-border-muted bg-surface-canvas text-body-s text-content-subtle">
                    Right click here
                  </div>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner>
                    <ContextMenu.Popup>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiEditLine />} />}>
                        Edit
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiFileCopyLine />} />}>
                        Duplicate
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem
                        variant="danger"
                        prefix={<MenuPrefix type="danger-icon" icon={<TrashIcon />} />}
                      >
                        Delete permanently
                      </MenuItem>
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            </div>
          </div>
        </div>
      </section>

      {/* States */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled items</p>
              <p className="text-body-s text-content-subtle">Non-interactive items</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <div className="flex h-[120px] w-[200px] items-center justify-center rounded-[var(--radius-12)] border border-dashed border-border-muted bg-surface-canvas text-body-s text-content-subtle">
                    Right click here
                  </div>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner>
                    <ContextMenu.Popup>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiEditLine />} />}>
                        Edit
                      </MenuItem>
                      <MenuItem
                        prefix={<MenuPrefix type="icon" icon={<CopyIcon />} disabled />}
                        disabled
                      >
                        Copy (No permission)
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiShareLine />} />}>
                        Share
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem
                        variant="danger"
                        prefix={<MenuPrefix type="danger-icon" icon={<TrashIcon />} disabled />}
                        disabled
                      >
                        Delete (Locked)
                      </MenuItem>
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

// Helper component for checkbox selection
function SelectableCheckboxContextMenu() {
  const [selectedItems, setSelectedItems] = React.useState<string[]>(["grid"])

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div className="flex h-[120px] w-[200px] items-center justify-center rounded-[var(--radius-12)] border border-dashed border-border-muted bg-surface-canvas text-body-s text-content-subtle">
          Right click here
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner>
          <ContextMenu.Popup>
            <MenuItem
              selectionControl="checkbox"
              selected={selectedItems.includes("grid")}
              onClick={() => toggleItem("grid")}
              closeOnClick={false}
            >
              Show grid
            </MenuItem>
            <MenuItem
              selectionControl="checkbox"
              selected={selectedItems.includes("rulers")}
              onClick={() => toggleItem("rulers")}
              closeOnClick={false}
            >
              Show rulers
            </MenuItem>
            <MenuItem
              selectionControl="checkbox"
              selected={selectedItems.includes("guides")}
              onClick={() => toggleItem("guides")}
              closeOnClick={false}
            >
              Show guides
            </MenuItem>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}

// Helper component for radio selection
function SelectableRadioContextMenu() {
  const [selectedView, setSelectedView] = React.useState("list")

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div className="flex h-[120px] w-[200px] items-center justify-center rounded-[var(--radius-12)] border border-dashed border-border-muted bg-surface-canvas text-body-s text-content-subtle">
          Right click here
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner>
          <ContextMenu.Popup>
            <MenuItem
              selectionControl="radio"
              selected={selectedView === "list"}
              onClick={() => setSelectedView("list")}
              closeOnClick={false}
            >
              List view
            </MenuItem>
            <MenuItem
              selectionControl="radio"
              selected={selectedView === "grid"}
              onClick={() => setSelectedView("grid")}
              closeOnClick={false}
            >
              Grid view
            </MenuItem>
            <MenuItem
              selectionControl="radio"
              selected={selectedView === "columns"}
              onClick={() => setSelectedView("columns")}
              closeOnClick={false}
            >
              Column view
            </MenuItem>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
