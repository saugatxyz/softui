"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  MenuItem,
  MenuGroup,
  MenuGroupLabel,
  MenuEmpty,
  MenuPrefix,
  MenuSuffix,
  MenuSeparator,
} from "@/components/ui/menu"
import {
  RiEditLine,
  RiFileCopyLine,
  RiArchiveLine,
  RiFolderLine,
  RiMore2Line,
  RiUserAddLine,
  RiSettings3Line,
  RiLinksLine,
  RiMailLine,
  RiTwitterXLine,
  RiSlackLine,
  RiDownloadLine,
  RiShareLine,
  RiNotification3Line,
  RiUserLine,
  RiLogoutBoxLine,
  RiDashboardLine,
  RiBarChartLine,
  RiRobot2Line,
  RiSoundModuleLine,
} from "@remixicon/react"
import { TrashIcon } from "@/icons"

const menuPopupClassName = "flex flex-col gap-[var(--space-2)] p-[var(--space-4)]"
const menuItemLabelClassName =
  "text-[length:var(--font-size-m)] leading-[var(--line-height-m)]"
const menuItemDescriptionClassName =
  "text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-subtle"

function SelectableCheckboxMenu() {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([
    "updates",
    "security",
  ])

  const handleCheckedChange = (item: string) => (checked: boolean) => {
    setSelectedItems((prev) =>
      checked ? [...new Set([...prev, item])] : prev.filter((value) => value !== item)
    )
  }

  return (
    <Menu.Root>
      <Menu.Trigger render={<Button variant="secondary">Notification preferences</Button>} />
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup className={menuPopupClassName}>
            <Menu.CheckboxItem
              checked={selectedItems.includes("updates")}
              onCheckedChange={handleCheckedChange("updates")}
              closeOnClick={false}
            >
              <span className={menuItemLabelClassName}>Product updates</span>
            </Menu.CheckboxItem>
            <Menu.CheckboxItem
              checked={selectedItems.includes("security")}
              onCheckedChange={handleCheckedChange("security")}
              closeOnClick={false}
            >
              <span className={menuItemLabelClassName}>Security alerts</span>
            </Menu.CheckboxItem>
            <Menu.CheckboxItem
              checked={selectedItems.includes("tips")}
              onCheckedChange={handleCheckedChange("tips")}
              closeOnClick={false}
            >
              <span className={menuItemLabelClassName}>Product tips</span>
            </Menu.CheckboxItem>
            <Menu.CheckboxItem
              checked={selectedItems.includes("newsletter")}
              onCheckedChange={handleCheckedChange("newsletter")}
              closeOnClick={false}
            >
              <span className={menuItemLabelClassName}>Monthly newsletter</span>
            </Menu.CheckboxItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

function SelectableRadioMenu() {
  const [selectedSort, setSelectedSort] = React.useState("date")

  return (
    <Menu.Root>
      <Menu.Trigger render={<Button variant="secondary">Sort by</Button>} />
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup className={menuPopupClassName}>
            <Menu.RadioGroup
              className="flex flex-col gap-[var(--space-2)]"
              value={selectedSort}
              onValueChange={setSelectedSort}
            >
              <Menu.RadioItem value="name">
                <span className={menuItemLabelClassName}>Name</span>
              </Menu.RadioItem>
              <Menu.RadioItem value="date">
                <span className={menuItemLabelClassName}>Date modified</span>
              </Menu.RadioItem>
              <Menu.RadioItem value="size">
                <span className={menuItemLabelClassName}>File size</span>
              </Menu.RadioItem>
              <Menu.RadioItem value="type">
                <span className={menuItemLabelClassName}>File type</span>
              </Menu.RadioItem>
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

function SwitchMenu() {
  const [notifications, setNotifications] = React.useState(true)
  const [sounds, setSounds] = React.useState(false)
  const [autoSave, setAutoSave] = React.useState(true)

  return (
    <Menu.Root>
      <Menu.Trigger render={<Button variant="secondary">Settings</Button>} />
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup className={menuPopupClassName}>
            <MenuItem closeOnClick={false} onClick={() => setNotifications(!notifications)}>
              <MenuPrefix type="icon" icon={<RiNotification3Line />} />
              <span className={menuItemLabelClassName}>Notifications</span>
              <MenuSuffix
                type="switch"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </MenuItem>
            <MenuItem closeOnClick={false} onClick={() => setSounds(!sounds)}>
              <MenuPrefix type="icon" icon={<RiSoundModuleLine />} />
              <span className={menuItemLabelClassName}>Sounds</span>
              <MenuSuffix
                type="switch"
                checked={sounds}
                onCheckedChange={setSounds}
              />
            </MenuItem>
            <MenuItem closeOnClick={false} onClick={() => setAutoSave(!autoSave)}>
              <MenuPrefix type="icon" icon={<RiDownloadLine />} />
              <span className={menuItemLabelClassName}>Auto-save</span>
              <MenuSuffix
                type="switch"
                checked={autoSave}
                onCheckedChange={setAutoSave}
              />
            </MenuItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

export default function MenuDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Menu</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Dropdown menu for displaying a list of actions or options
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Menu, MenuItem, MenuSeparator } from "@/components/ui/menu"

<Menu.Root>
  <Menu.Trigger render={<Button>Open Menu</Button>} />
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup className="flex flex-col gap-[var(--space-2)] p-[var(--space-4)]">
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

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Basics</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">File actions</p>
              <p className="text-body-m text-content-subtle">
                Common tasks for a document or project
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">File</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup className={menuPopupClassName}>
                      <MenuItem>
                        <span className={menuItemLabelClassName}>New file</span>
                      </MenuItem>
                      <MenuItem>
                        <span className={menuItemLabelClassName}>Open recent</span>
                      </MenuItem>
                      <MenuItem>
                        <span className={menuItemLabelClassName}>Save</span>
                      </MenuItem>
                      <MenuItem>
                        <span className={menuItemLabelClassName}>Save as...</span>
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem>
                        <span className={menuItemLabelClassName}>Close</span>
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Trigger Variants</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon button trigger</p>
              <p className="text-body-m text-content-subtle">
                Compact trigger for overflow menus
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<IconButton variant="ghost" size="m"><RiMore2Line /></IconButton>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup className={menuPopupClassName}>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiEditLine />} />
                        <span className={menuItemLabelClassName}>Edit</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiFileCopyLine />} />
                        <span className={menuItemLabelClassName}>Duplicate</span>
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem variant="danger">
                        <MenuPrefix type="danger-icon" icon={<TrashIcon />} />
                        <span className={menuItemLabelClassName}>Delete</span>
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Avatar trigger</p>
              <p className="text-body-m text-content-subtle">
                User profile menu trigger
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<button className="cursor-pointer"><Avatar size="m" initials="JD" isEmphasized color="blue" /></button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup className={menuPopupClassName}>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiUserLine />} />
                        <span className={menuItemLabelClassName}>Profile</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiSettings3Line />} />
                        <span className={menuItemLabelClassName}>Settings</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiMailLine />} />
                        <span className={menuItemLabelClassName}>Messages</span>
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiLogoutBoxLine />} />
                        <span className={menuItemLabelClassName}>Log out</span>
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
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
                Visual cues for quicker scanning
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Actions</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup className={menuPopupClassName}>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiEditLine />} />
                        <span className={menuItemLabelClassName}>Edit details</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiFileCopyLine />} />
                        <span className={menuItemLabelClassName}>Duplicate</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiArchiveLine />} />
                        <span className={menuItemLabelClassName}>Archive</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiFolderLine />} />
                        <span className={menuItemLabelClassName}>Move</span>
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Avatars</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Assign to user</p>
              <p className="text-body-m text-content-subtle">
                User selection with avatars
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Assign to</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup className={menuPopupClassName}>
                      <MenuItem>
                        <MenuPrefix type="avatar">
                          <Avatar size="2xs" initials="AJ" isEmphasized color="blue" />
                        </MenuPrefix>
                        <span className={menuItemLabelClassName}>Alice Johnson</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="avatar">
                          <Avatar size="2xs" initials="BS" isEmphasized color="emerald" />
                        </MenuPrefix>
                        <span className={menuItemLabelClassName}>Bob Smith</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="avatar">
                          <Avatar size="2xs" initials="CW" isEmphasized color="violet" />
                        </MenuPrefix>
                        <span className={menuItemLabelClassName}>Carol Williams</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="avatar">
                          <Avatar size="2xs" initials="DM" isEmphasized color="orange" />
                        </MenuPrefix>
                        <span className={menuItemLabelClassName}>David Miller</span>
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Badge</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Status indicators</p>
              <p className="text-body-m text-content-subtle">
                Badges for counts or status
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Navigation</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup className={menuPopupClassName}>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiDashboardLine />} />
                        <span className={menuItemLabelClassName}>Dashboard</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiBarChartLine />} />
                        <span className={menuItemLabelClassName}>Analytics</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiRobot2Line />} />
                        <span className={menuItemLabelClassName}>AI Assistant</span>
                        <Badge size="xs" isEmphasized variant="info" className="ml-auto">New</Badge>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiSettings3Line />} />
                        <span className={menuItemLabelClassName}>Settings</span>
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Description</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Plan selection</p>
              <p className="text-body-m text-content-subtle">
                Supporting text for clearer choices
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Select plan</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup className={menuPopupClassName}>
                      <MenuItem>
                        <span className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)]">
                          <span className={menuItemLabelClassName}>Free</span>
                          <span className={menuItemDescriptionClassName}>For individuals</span>
                        </span>
                      </MenuItem>
                      <MenuItem>
                        <span className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)]">
                          <span className={menuItemLabelClassName}>Pro</span>
                          <span className={menuItemDescriptionClassName}>For small teams</span>
                        </span>
                      </MenuItem>
                      <MenuItem>
                        <span className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)]">
                          <span className={menuItemLabelClassName}>Enterprise</span>
                          <span className={menuItemDescriptionClassName}>For organizations</span>
                        </span>
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
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
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Grouped menu</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup className={menuPopupClassName}>
                      <MenuGroup className="flex flex-col gap-[var(--space-2)]">
                        <MenuGroupLabel>Workspace</MenuGroupLabel>
                        <MenuItem>
                          <MenuPrefix type="icon" icon={<RiUserAddLine />} />
                          <span className={menuItemLabelClassName}>Invite members</span>
                        </MenuItem>
                        <MenuItem>
                          <MenuPrefix type="icon" icon={<RiSettings3Line />} />
                          <span className={menuItemLabelClassName}>Manage roles</span>
                        </MenuItem>
                      </MenuGroup>
                      <MenuSeparator />
                      <MenuGroup className="flex flex-col gap-[var(--space-2)]">
                        <MenuGroupLabel>Danger zone</MenuGroupLabel>
                        <MenuItem variant="danger">
                          <MenuPrefix type="danger-icon" icon={<TrashIcon />} />
                          <span className={menuItemLabelClassName}>Delete workspace</span>
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

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Disabled Items</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Unavailable actions</p>
              <p className="text-body-m text-content-subtle">
                Show disabled state for restricted actions
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Document</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup className={menuPopupClassName}>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiEditLine />} />
                        <span className={menuItemLabelClassName}>Edit</span>
                      </MenuItem>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiFileCopyLine />} />
                        <span className={menuItemLabelClassName}>Duplicate</span>
                      </MenuItem>
                      <MenuItem disabled>
                        <MenuPrefix type="icon" icon={<RiShareLine />} disabled />
                        <span className={menuItemLabelClassName}>Share</span>
                      </MenuItem>
                      <MenuItem disabled>
                        <MenuPrefix type="icon" icon={<RiDownloadLine />} disabled />
                        <span className={menuItemLabelClassName}>Download</span>
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem variant="danger" disabled>
                        <MenuPrefix type="danger-icon" icon={<TrashIcon />} disabled />
                        <span className={menuItemLabelClassName}>Delete</span>
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Switch</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Toggle settings</p>
              <p className="text-body-m text-content-subtle">
                Switch controls for on/off options
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <SwitchMenu />
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
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Search</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup className={menuPopupClassName}>
                      <MenuEmpty
                        title="No matching files"
                        description="Try a different keyword."
                      />
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
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
              <p className="text-body-m text-content-subtle">
                Toggle multiple options
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <SelectableCheckboxMenu />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Radio selection</p>
              <p className="text-body-m text-content-subtle">Choose a single option</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <SelectableRadioMenu />
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
              <Menu.Root>
                <Menu.Trigger render={<Button variant="secondary">Share</Button>} />
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup className={menuPopupClassName}>
                      <MenuItem>
                        <MenuPrefix type="icon" icon={<RiLinksLine />} />
                        <span className={menuItemLabelClassName}>Copy link</span>
                      </MenuItem>
                      <Menu.SubmenuRoot>
                        <Menu.SubmenuTrigger>
                          <MenuPrefix type="icon" icon={<RiShareLine />} />
                          <span className={menuItemLabelClassName}>Send via</span>
                          <MenuSuffix type="submenu" />
                        </Menu.SubmenuTrigger>
                        <Menu.Portal>
                          <Menu.Positioner sideOffset={8} alignOffset={-4} side="right" align="start">
                            <Menu.Popup className={menuPopupClassName}>
                              <MenuItem>
                                <MenuPrefix type="icon" icon={<RiMailLine />} />
                                <span className={menuItemLabelClassName}>Email</span>
                              </MenuItem>
                              <MenuItem>
                                <MenuPrefix type="icon" icon={<RiSlackLine />} />
                                <span className={menuItemLabelClassName}>Slack</span>
                              </MenuItem>
                              <MenuItem>
                                <MenuPrefix type="icon" icon={<RiTwitterXLine />} />
                                <span className={menuItemLabelClassName}>Twitter</span>
                              </MenuItem>
                            </Menu.Popup>
                          </Menu.Positioner>
                        </Menu.Portal>
                      </Menu.SubmenuRoot>
                      <MenuSeparator />
                      <MenuItem variant="danger">
                        <MenuPrefix type="danger-icon" icon={<TrashIcon />} />
                        <span className={menuItemLabelClassName}>Delete</span>
                      </MenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
