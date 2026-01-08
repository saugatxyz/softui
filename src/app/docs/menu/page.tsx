"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Button } from "@/components/ui/button"
import {
  Menu,
  MenuItem,
  MenuPrefix,
  MenuSuffix,
  MenuSeparator,
  MenuGroup,
  MenuGroupLabel,
} from "@/components/ui/menu"
import { Avatar } from "@/components/ui/avatar"
import {
  CopyIcon,
  TrashIcon,
  SettingsIcon,
  AddIcon,
  SearchIcon,
  StarIcon,
  HeartIcon,
  BookmarkIcon,
} from "@/icons"
import {
  RiEditLine,
  RiShareLine,
  RiDownloadLine,
  RiMoreLine,
  RiMailLine,
  RiLockLine,
  RiUserLine,
  RiLogoutBoxLine,
  RiHistoryLine,
  RiArchiveLine,
  RiFolderLine,
  RiPrinterLine,
  RiFileCopyLine,
  RiMoonLine,
  RiNotification3Line,
  RiPriceTag3Line,
} from "@remixicon/react"

// Helper component for checkbox selection menu
function SelectableCheckboxMenu() {
  const [selectedItems, setSelectedItems] = React.useState<string[]>(["notifications", "updates"])

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  return (
    <Menu.Root>
      <Menu.Trigger render={<Button variant="secondary">Email Preferences</Button>} />
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <MenuItem
              selectionControl="checkbox"
              selected={selectedItems.includes("notifications")}
              onClick={() => toggleItem("notifications")}
              closeOnClick={false}
            >
              Notifications
            </MenuItem>
            <MenuItem
              selectionControl="checkbox"
              selected={selectedItems.includes("updates")}
              onClick={() => toggleItem("updates")}
              closeOnClick={false}
            >
              Product updates
            </MenuItem>
            <MenuItem
              selectionControl="checkbox"
              selected={selectedItems.includes("newsletter")}
              onClick={() => toggleItem("newsletter")}
              closeOnClick={false}
            >
              Newsletter
            </MenuItem>
            <MenuItem
              selectionControl="checkbox"
              selected={selectedItems.includes("marketing")}
              onClick={() => toggleItem("marketing")}
              closeOnClick={false}
            >
              Marketing emails
            </MenuItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

// Helper component for radio selection menu
function SelectableRadioMenu() {
  const [selectedSort, setSelectedSort] = React.useState("date")

  return (
    <Menu.Root>
      <Menu.Trigger render={<Button variant="secondary">Sort By</Button>} />
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <MenuItem
              selectionControl="radio"
              selected={selectedSort === "name"}
              onClick={() => setSelectedSort("name")}
              closeOnClick={false}
            >
              Name
            </MenuItem>
            <MenuItem
              selectionControl="radio"
              selected={selectedSort === "date"}
              onClick={() => setSelectedSort("date")}
              closeOnClick={false}
            >
              Date modified
            </MenuItem>
            <MenuItem
              selectionControl="radio"
              selected={selectedSort === "size"}
              onClick={() => setSelectedSort("size")}
              closeOnClick={false}
            >
              Size
            </MenuItem>
            <MenuItem
              selectionControl="radio"
              selected={selectedSort === "type"}
              onClick={() => setSelectedSort("type")}
              closeOnClick={false}
            >
              Type
            </MenuItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

export default function MenuDocsPage() {
  const [darkMode, setDarkMode] = React.useState(false)
  const [notifications, setNotifications] = React.useState(true)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Menu</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Dropdown menu for displaying a list of actions or options
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Menu, MenuItem, MenuSeparator } from "@/components/ui/menu"

<Menu.Root>
  <Menu.Trigger render={<Button>Open Menu</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuSeparator />
        <MenuItem variant="danger">Delete</MenuItem>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`}
        />
      </section>

      {/* Basic Menu */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Text only</p>
              <p className="text-body-s text-content-subtle">Simple menu with text labels</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Open Menu</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <MenuItem>New file</MenuItem>
                      <MenuItem>Open</MenuItem>
                      <MenuItem>Save</MenuItem>
                      <MenuItem>Save as...</MenuItem>
                      <MenuSeparator />
                      <MenuItem>Close</MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With supporting text</p>
              <p className="text-body-s text-content-subtle">Medium weight with description</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Select Plan</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <MenuItem supportingText="For individuals">Free</MenuItem>
                      <MenuItem supportingText="For small teams">Pro</MenuItem>
                      <MenuItem supportingText="For organizations">Enterprise</MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Menu with Icons */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Icons</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon prefix</p>
              <p className="text-body-s text-content-subtle">Leading icons for visual recognition</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Actions</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiEditLine />} />}>
                        Edit
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiFileCopyLine />} />}>
                        Duplicate
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiArchiveLine />} />}>
                        Archive
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiFolderLine />} />}>
                        Move to folder
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Menu with Avatars */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Avatars</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">User selection</p>
              <p className="text-body-s text-content-subtle">For account switching or mentions</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Select Account</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <MenuItem
                        prefix={
                          <MenuPrefix type="avatar">
                            <Avatar size="2xs" initials="JD" fallback="initials" />
                          </MenuPrefix>
                        }
                        supportingText="john@example.com"
                      >
                        John Doe
                      </MenuItem>
                      <MenuItem
                        prefix={
                          <MenuPrefix type="avatar">
                            <Avatar size="2xs" initials="AS" fallback="initials" />
                          </MenuPrefix>
                        }
                        supportingText="alice@example.com"
                      >
                        Alice Smith
                      </MenuItem>
                      <MenuItem
                        prefix={
                          <MenuPrefix type="avatar">
                            <Avatar size="2xs" initials="BJ" fallback="initials" />
                          </MenuPrefix>
                        }
                        supportingText="bob@example.com"
                      >
                        Bob Johnson
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<AddIcon />} />}>
                        Add account
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Menu with Suffix */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Suffix</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Checkmark</p>
              <p className="text-body-s text-content-subtle">Indicates selected state</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Sort By</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <MenuItem suffix={<MenuSuffix type="checkmark" />}>Name</MenuItem>
                      <MenuItem>Date created</MenuItem>
                      <MenuItem>Date modified</MenuItem>
                      <MenuItem>Size</MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Switch</p>
              <p className="text-body-s text-content-subtle">Toggle settings inline</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Preferences</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <MenuItem
                        prefix={<MenuPrefix type="icon" icon={<RiMoonLine />} />}
                        suffix={<MenuSuffix type="switch" checked={darkMode} />}
                        onClick={() => setDarkMode(!darkMode)}
                        closeOnClick={false}
                      >
                        Dark mode
                      </MenuItem>
                      <MenuItem
                        prefix={<MenuPrefix type="icon" icon={<RiNotification3Line />} />}
                        suffix={<MenuSuffix type="switch" checked={notifications} />}
                        onClick={() => setNotifications(!notifications)}
                        closeOnClick={false}
                      >
                        Notifications
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Selectable Items */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Selectable Items</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Checkbox selection</p>
              <p className="text-body-s text-content-subtle">Multi-select with checkboxes</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <SelectableCheckboxMenu />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Radio selection</p>
              <p className="text-body-s text-content-subtle">Single-select with radio buttons</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <SelectableRadioMenu />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled selectable</p>
              <p className="text-body-s text-content-subtle">Disabled states for selection controls</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Disabled States</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <MenuItem selectionControl="checkbox" selected>
                        Enabled checked
                      </MenuItem>
                      <MenuItem selectionControl="checkbox" selected disabled>
                        Disabled checked
                      </MenuItem>
                      <MenuItem selectionControl="checkbox" disabled>
                        Disabled unchecked
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem selectionControl="radio" selected>
                        Enabled selected
                      </MenuItem>
                      <MenuItem selectionControl="radio" selected disabled>
                        Disabled selected
                      </MenuItem>
                      <MenuItem selectionControl="radio" disabled>
                        Disabled unselected
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Groups */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Groups</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With labels</p>
              <p className="text-body-s text-content-subtle">Organize items into sections</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">File Menu</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <MenuGroup>
                        <MenuGroupLabel>Document</MenuGroupLabel>
                        <MenuItem prefix={<MenuPrefix type="icon" icon={<AddIcon />} />}>
                          New
                        </MenuItem>
                        <MenuItem prefix={<MenuPrefix type="icon" icon={<RiFileCopyLine />} />}>
                          Duplicate
                        </MenuItem>
                      </MenuGroup>
                      <MenuSeparator />
                      <MenuGroup>
                        <MenuGroupLabel>Export</MenuGroupLabel>
                        <MenuItem prefix={<MenuPrefix type="icon" icon={<RiDownloadLine />} />}>
                          Download
                        </MenuItem>
                        <MenuItem prefix={<MenuPrefix type="icon" icon={<RiPrinterLine />} />}>
                          Print
                        </MenuItem>
                        <MenuItem prefix={<MenuPrefix type="icon" icon={<RiShareLine />} />}>
                          Share
                        </MenuItem>
                      </MenuGroup>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
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
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Options</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiEditLine />} />}>
                        Edit
                      </MenuItem>
                      <Menu.SubmenuRoot>
                        <Menu.SubmenuTrigger>
                          <MenuPrefix type="icon" icon={<RiShareLine />} />
                          <span className="flex min-w-0 flex-1 pl-[var(--space-2)] font-[var(--font-weight-medium)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] text-content-strong">
                            Share
                          </span>
                          <MenuSuffix type="submenu" />
                        </Menu.SubmenuTrigger>
                        <Menu.Portal>
                          <Menu.Positioner sideOffset={8} alignOffset={-4} side="right" align="start">
                            <Menu.Popup>
                              <MenuItem>Copy link</MenuItem>
                              <MenuItem>Email</MenuItem>
                              <MenuItem>Twitter</MenuItem>
                              <MenuItem>LinkedIn</MenuItem>
                            </Menu.Popup>
                          </Menu.Positioner>
                        </Menu.Portal>
                      </Menu.SubmenuRoot>
                      <Menu.SubmenuRoot>
                        <Menu.SubmenuTrigger>
                          <MenuPrefix type="icon" icon={<RiFolderLine />} />
                          <span className="flex min-w-0 flex-1 pl-[var(--space-2)] font-[var(--font-weight-medium)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] text-content-strong">
                            Move to
                          </span>
                          <MenuSuffix type="submenu" />
                        </Menu.SubmenuTrigger>
                        <Menu.Portal>
                          <Menu.Positioner sideOffset={8} alignOffset={-4} side="right" align="start">
                            <Menu.Popup>
                              <MenuItem>Documents</MenuItem>
                              <MenuItem>Downloads</MenuItem>
                              <MenuItem>Archive</MenuItem>
                            </Menu.Popup>
                          </Menu.Positioner>
                        </Menu.Portal>
                      </Menu.SubmenuRoot>
                      <MenuSeparator />
                      <MenuItem
                        variant="danger"
                        prefix={<MenuPrefix type="danger-icon" icon={<TrashIcon />} />}
                      >
                        Delete
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Badge</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Highlight new items</p>
              <p className="text-body-s text-content-subtle">Draw attention to new features</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Features</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <MenuItem>Dashboard</MenuItem>
                      <MenuItem badge="New">Analytics</MenuItem>
                      <MenuItem badge="Beta">AI Assistant</MenuItem>
                      <MenuItem>Settings</MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
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
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Manage</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiEditLine />} />}>
                        Edit
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiArchiveLine />} />}>
                        Archive
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem
                        variant="danger"
                        prefix={<MenuPrefix type="danger-icon" icon={<TrashIcon />} />}
                      >
                        Delete permanently
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
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
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Actions</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
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
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Trigger Variants */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Trigger Variants</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon button</p>
              <p className="text-body-s text-content-subtle">Compact trigger for toolbars</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger
                  render={
                    <Button variant="ghost" size="s" className="size-[32px] p-0">
                      <RiMoreLine className="size-[20px]" />
                    </Button>
                  }
                />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <MenuItem>View details</MenuItem>
                      <MenuItem>Edit</MenuItem>
                      <MenuItem>Duplicate</MenuItem>
                      <MenuSeparator />
                      <MenuItem variant="danger">Delete</MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Avatar trigger</p>
              <p className="text-body-s text-content-subtle">User menu from avatar</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger
                  render={
                    <button className="cursor-pointer rounded-full outline-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]">
                      <Avatar size="m" initials="JD" fallback="initials" />
                    </button>
                  }
                />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiUserLine />} />}>
                        Profile
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<SettingsIcon />} />}>
                        Settings
                      </MenuItem>
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiMailLine />} />}>
                        Messages
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem prefix={<MenuPrefix type="icon" icon={<RiLogoutBoxLine />} />}>
                        Sign out
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Prefix Types */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Prefix Types</h2>
          <p className="text-body-s text-content-subtle">
            Available prefix styles for menu items
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <MenuPrefix type="icon" icon={<StarIcon />} />
              <MenuPrefix type="icon" icon={<HeartIcon />} />
              <MenuPrefix type="icon" icon={<BookmarkIcon />} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Danger icon</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <MenuPrefix type="danger-icon" icon={<TrashIcon />} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Avatar</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <MenuPrefix type="avatar">
                <Avatar size="2xs" initials="JD" fallback="initials" />
              </MenuPrefix>
              <MenuPrefix type="avatar">
                <Avatar size="2xs" initials="AS" fallback="initials" />
              </MenuPrefix>
              <MenuPrefix type="avatar">
                <Avatar size="2xs" initials="BJ" fallback="initials" />
              </MenuPrefix>
            </div>
          </div>
        </div>
      </section>

      {/* Suffix Types */}
      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Suffix Types</h2>
          <p className="text-body-s text-content-subtle">
            Available suffix styles for menu items
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Checkmark</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <MenuSuffix type="checkmark" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Submenu arrow</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <MenuSuffix type="submenu" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Switch</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <MenuSuffix type="switch" />
              <MenuSuffix type="switch" defaultChecked />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
