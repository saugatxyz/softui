"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { InputGroup } from "@/components/ui/input-group"
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { CheckboxGroupItem } from "@/components/ui/checkbox-group-item"
import { CheckboxPrefix } from "@/components/ui/checkbox-prefix"
import {
  RiMailLine,
  RiLineChartLine,
  RiMegaphoneLine,
} from "@remixicon/react"

export default function DialogDocsPage() {
  const [basicOpen, setBasicOpen] = React.useState(false)
  const [accountOpen, setAccountOpen] = React.useState(false)
  const [nestedOpen, setNestedOpen] = React.useState(false)
  const [nestedInnerOpen, setNestedInnerOpen] = React.useState(false)

  // Account settings state
  const [displayName, setDisplayName] = React.useState("John Doe")
  const [username, setUsername] = React.useState("johndoe")
  const [emailPrefs, setEmailPrefs] = React.useState({
    updates: true,
    digest: true,
    marketing: false,
  })
  const [dnd, setDnd] = React.useState(false)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Dialog</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A modal dialog for displaying content, forms, or information. Can be dismissed by clicking the close button, backdrop, or pressing Escape.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger render={<Button>Open Dialog</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Dialog title</Dialog.Title>
          <Dialog.Close />
        </Dialog.Header>
        <Dialog.Body>
          {/* Your content here */}
        </Dialog.Body>
      </Dialog.Content>
      <Dialog.Footer>
        <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
        <Button variant="primary">Confirm</Button>
      </Dialog.Footer>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Simple dialog</p>
              <p className="text-body-s text-content-subtle">Header with close button</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Dialog.Root open={basicOpen} onOpenChange={setBasicOpen}>
                <Dialog.Trigger render={<Button variant="secondary">Open dialog</Button>} />
                <Dialog.Portal>
                  <Dialog.Backdrop />
                  <Dialog.Popup>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Welcome</Dialog.Title>
                        <Dialog.Close />
                      </Dialog.Header>
                      <Dialog.Body>
                        <p className="text-body-m text-content-default">
                          This is a simple dialog with a header and close button. You can dismiss it by clicking outside, pressing Escape, or using the close button.
                        </p>
                      </Dialog.Body>
                    </Dialog.Content>
                    <Dialog.Footer>
                      <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                      <Button variant="primary" onClick={() => setBasicOpen(false)}>
                        Got it
                      </Button>
                    </Dialog.Footer>
                  </Dialog.Popup>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Account Settings</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Complex form</p>
              <p className="text-body-s text-content-subtle">Input, InputGroup, CheckboxGroup, Switch</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Dialog.Root open={accountOpen} onOpenChange={setAccountOpen}>
                <Dialog.Trigger render={<Button variant="secondary">Account settings</Button>} />
                <Dialog.Portal>
                  <Dialog.Backdrop />
                  <Dialog.Popup>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Account settings</Dialog.Title>
                        <Dialog.Close />
                      </Dialog.Header>
                      <Dialog.Body>
                        {/* Display name input */}
                        <div className="flex flex-col gap-[var(--space-8)]">
                          <label className="text-body-m-medium text-content-strong">Display name</label>
                          <Input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Your name"
                            focusVisibleOnly
                          />
                        </div>

                        {/* Username with @ prefix */}
                        <div className="flex flex-col gap-[var(--space-8)]">
                          <label className="text-body-m-medium text-content-strong">Username</label>
                          <InputGroup
                            prefix="@"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                            focusVisibleOnly
                          />
                        </div>

                        {/* Email preferences - simple row layout */}
                        <div className="flex flex-col gap-[var(--space-10)]">
                          <label className="text-body-m-medium text-content-strong">Email preferences</label>
                          <CheckboxGroup style="card-small" stack="horizontal">
                            <CheckboxGroupItem
                              label="Product updates"
                              checked={emailPrefs.updates}
                              onCheckedChange={(checked) =>
                                setEmailPrefs((prev) => ({ ...prev, updates: checked }))
                              }
                              prefix={
                                <CheckboxPrefix
                                  type="icon-emphasized-blue"
                                  icon={<RiMailLine />}
                                />
                              }
                            />
                            <CheckboxGroupItem
                              label="Weekly digest"
                              checked={emailPrefs.digest}
                              onCheckedChange={(checked) =>
                                setEmailPrefs((prev) => ({ ...prev, digest: checked }))
                              }
                              prefix={
                                <CheckboxPrefix
                                  type="icon-emphasized-emerald"
                                  icon={<RiLineChartLine />}
                                />
                              }
                            />
                            <CheckboxGroupItem
                              label="Marketing"
                              checked={emailPrefs.marketing}
                              onCheckedChange={(checked) =>
                                setEmailPrefs((prev) => ({ ...prev, marketing: checked }))
                              }
                              prefix={
                                <CheckboxPrefix
                                  type="icon-emphasized-orange"
                                  icon={<RiMegaphoneLine />}
                                />
                              }
                            />
                          </CheckboxGroup>
                        </div>

                        {/* Do not disturb switch */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-[var(--space-2)]">
                            <p className="text-body-m-medium text-content-strong">Do not disturb</p>
                            <p className="text-body-xs text-content-subtle">Pause all notifications</p>
                          </div>
                          <Switch checked={dnd} onCheckedChange={setDnd} />
                        </div>
                      </Dialog.Body>
                    </Dialog.Content>
                    <Dialog.Footer>
                      <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                      <Button variant="primary" onClick={() => setAccountOpen(false)}>
                        Save
                      </Button>
                    </Dialog.Footer>
                  </Dialog.Popup>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Nested Dialog</h2>
        <p className="text-body-m text-content-subtle">
          When a nested dialog opens, the parent dialog scales down and dims slightly to create visual depth.
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Dialog in dialog</p>
              <p className="text-body-s text-content-subtle">Parent scales when child opens</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Dialog.Root open={nestedOpen} onOpenChange={setNestedOpen}>
                <Dialog.Trigger render={<Button variant="secondary">Open dialog</Button>} />
                <Dialog.Portal>
                  <Dialog.Backdrop />
                  <Dialog.Popup className="w-[min(400px,calc(100vw-var(--space-32)))]">
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Share settings</Dialog.Title>
                        <Dialog.Close />
                      </Dialog.Header>
                      <Dialog.Body>
                        <p className="text-body-m text-content-default">
                          Configure who can access this document and what permissions they have.
                        </p>
                        <div className="flex flex-col gap-[var(--space-8)]">
                          <label className="text-body-m-medium text-content-strong">Invite by email</label>
                          <Input placeholder="Enter email address" focusVisibleOnly />
                        </div>
                      </Dialog.Body>
                    </Dialog.Content>
                    <Dialog.Footer>
                      {/* Nested dialog */}
                      <Dialog.Root open={nestedInnerOpen} onOpenChange={setNestedInnerOpen}>
                        <Dialog.Trigger render={<Button variant="ghost" className="mr-auto">Advanced</Button>} />
                        <Dialog.Portal>
                          <Dialog.Popup className="w-[min(400px,calc(100vw-var(--space-32)))]">
                            <Dialog.Content>
                              <Dialog.Header>
                                <Dialog.Title>Advanced settings</Dialog.Title>
                                <Dialog.Close />
                              </Dialog.Header>
                              <Dialog.Body>
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-col gap-[var(--space-2)]">
                                    <p className="text-body-m-medium text-content-strong">Allow downloads</p>
                                    <p className="text-body-xs text-content-subtle">Users can download the file</p>
                                  </div>
                                  <Switch />
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-col gap-[var(--space-2)]">
                                    <p className="text-body-m-medium text-content-strong">Allow comments</p>
                                    <p className="text-body-xs text-content-subtle">Users can leave comments</p>
                                  </div>
                                  <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-col gap-[var(--space-2)]">
                                    <p className="text-body-m-medium text-content-strong">Require password</p>
                                    <p className="text-body-xs text-content-subtle">Viewers must enter a password</p>
                                  </div>
                                  <Switch />
                                </div>
                              </Dialog.Body>
                            </Dialog.Content>
                            <Dialog.Footer>
                              <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                              <Button variant="primary" onClick={() => setNestedInnerOpen(false)}>
                                Save
                              </Button>
                            </Dialog.Footer>
                          </Dialog.Popup>
                        </Dialog.Portal>
                      </Dialog.Root>

                      <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                      <Button variant="primary" onClick={() => setNestedOpen(false)}>
                        Share
                      </Button>
                    </Dialog.Footer>
                  </Dialog.Popup>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
