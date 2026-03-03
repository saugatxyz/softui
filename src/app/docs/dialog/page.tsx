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
import { Field as FieldPrimitive } from "@base-ui/react/field"
import {
  RiMailLine,
  RiLineChartLine,
  RiMegaphoneLine,
} from "@remixicon/react"

export default function DialogDocsPage() {
  const [basicOpen, setBasicOpen] = React.useState(false)
  const [rightOpen, setRightOpen] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [swipeableOpen, setSwipeableOpen] = React.useState(false)
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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Dialog</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A modal dialog for displaying content, forms, or information. Can be dismissed by clicking the close button, backdrop, or pressing Escape.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
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

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Simple dialog</p>
              <p className="text-body-m text-content-subtle">Header with close button</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Dialog.Root open={basicOpen} onOpenChange={setBasicOpen}>
                <Dialog.Trigger id="dialog-basic-trigger" render={<Button variant="secondary">Open dialog</Button>} />
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

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Position</h2>
        <p className="text-body-m text-content-subtle">
          Use the <code className="rounded bg-surface-muted px-[var(--space-4)] py-[var(--space-2)] text-body-s">position</code> prop to change the dialog placement and animation.
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Right panel</p>
              <p className="text-body-m text-content-subtle">Slides in from right</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Dialog.Root open={rightOpen} onOpenChange={setRightOpen}>
                <Dialog.Trigger id="dialog-right-trigger" render={<Button variant="secondary">Open panel</Button>} />
                <Dialog.Portal>
                  <Dialog.Backdrop />
                  <Dialog.Popup position="right">
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Settings</Dialog.Title>
                        <Dialog.Close />
                      </Dialog.Header>
                      <Dialog.Body>
                        <p className="text-body-m text-content-default">
                          Right-positioned dialogs are useful for settings panels, detail views, or any content that should slide in from the side.
                        </p>
                      </Dialog.Body>
                    </Dialog.Content>
                    <Dialog.Footer>
                      <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                      <Button variant="primary" onClick={() => setRightOpen(false)}>
                        Save
                      </Button>
                    </Dialog.Footer>
                  </Dialog.Popup>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>

          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Bottom sheet</p>
              <p className="text-body-m text-content-subtle">Slides up from bottom</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Dialog.Root open={sheetOpen} onOpenChange={setSheetOpen}>
                <Dialog.Trigger id="dialog-sheet-trigger" render={<Button variant="secondary">Open sheet</Button>} />
                <Dialog.Portal>
                  <Dialog.Backdrop />
                  <Dialog.Popup position="sheet">
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Actions</Dialog.Title>
                        <Dialog.Close />
                      </Dialog.Header>
                      <Dialog.Body>
                        <p className="text-body-m text-content-default">
                          Bottom sheets are ideal for mobile navigation, action menus, or any content that should slide up from the bottom of the screen.
                        </p>
                      </Dialog.Body>
                    </Dialog.Content>
                    <Dialog.Footer>
                      <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                      <Button variant="primary" onClick={() => setSheetOpen(false)}>
                        Done
                      </Button>
                    </Dialog.Footer>
                  </Dialog.Popup>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Swipeable</h2>
        <p className="text-body-m text-content-subtle">
          Use the <code className="rounded bg-surface-muted px-[var(--space-4)] py-[var(--space-2)] text-body-s">swipeable</code> prop to enable drag-to-dismiss on bottom sheets. A drag indicator appears in the header automatically.
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Swipe to dismiss</p>
              <p className="text-body-m text-content-subtle">Drag down to close</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Dialog.Root open={swipeableOpen} onOpenChange={setSwipeableOpen}>
                <Dialog.Trigger id="dialog-swipeable-trigger" render={<Button variant="secondary">Open swipeable sheet</Button>} />
                <Dialog.Portal>
                  <Dialog.Backdrop />
                  <Dialog.Popup position="sheet" swipeable>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Swipeable Sheet</Dialog.Title>
                        <Dialog.Close />
                      </Dialog.Header>
                      <Dialog.Body>
                        <p className="text-body-m text-content-default">
                          Drag this sheet down to dismiss it. Works on both mobile and desktop when using the sheet position.
                        </p>
                        <p className="text-body-m text-content-subtle">
                          The drag indicator at the top signals that the sheet is swipeable. You can also swipe quickly (high velocity) to dismiss.
                        </p>
                      </Dialog.Body>
                    </Dialog.Content>
                    <Dialog.Footer>
                      <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                      <Button variant="primary" onClick={() => setSwipeableOpen(false)}>
                        Done
                      </Button>
                    </Dialog.Footer>
                  </Dialog.Popup>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Account Settings</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Complex form</p>
              <p className="text-body-m text-content-subtle">Input, InputGroup, CheckboxGroup, Switch</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Dialog.Root open={accountOpen} onOpenChange={setAccountOpen}>
                <Dialog.Trigger id="dialog-account-trigger" render={<Button variant="secondary">Account settings</Button>} />
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
                                  type="icon"
                                  icon={<RiMailLine />}
                                  containerStyle="strong"
                                  containerColor="blue"
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
                                  type="icon"
                                  icon={<RiLineChartLine />}
                                  containerStyle="strong"
                                  containerColor="emerald"
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
                                  type="icon"
                                  icon={<RiMegaphoneLine />}
                                  containerStyle="strong"
                                  containerColor="orange"
                                />
                              }
                            />
                          </CheckboxGroup>
                        </div>

                        {/* Do not disturb switch */}
                        <FieldPrimitive.Root className="flex items-center justify-between">
                          <div className="flex flex-col gap-[var(--space-2)]">
                            <FieldPrimitive.Label className="text-body-m-medium text-content-strong">
                              Do not disturb
                            </FieldPrimitive.Label>
                            <FieldPrimitive.Description className="text-body-xs text-content-subtle">
                              Pause all notifications
                            </FieldPrimitive.Description>
                          </div>
                          <Switch checked={dnd} onCheckedChange={setDnd} />
                        </FieldPrimitive.Root>
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

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Nested Dialog</h2>
        <p className="text-body-m text-content-subtle">
          When a nested dialog opens, the parent dialog scales down and dims slightly to create visual depth.
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Dialog in dialog</p>
              <p className="text-body-m text-content-subtle">Parent scales when child opens</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <Dialog.Root open={nestedOpen} onOpenChange={setNestedOpen}>
                <Dialog.Trigger id="dialog-nested-trigger" render={<Button variant="secondary">Open dialog</Button>} />
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
                          <Input placeholder="Enter email address" />
                        </div>
                      </Dialog.Body>
                    </Dialog.Content>
                    <Dialog.Footer>
                      {/* Nested dialog */}
                      <Dialog.Root open={nestedInnerOpen} onOpenChange={setNestedInnerOpen}>
                        <Dialog.Trigger
                          id="dialog-nested-advanced-trigger"
                          render={(
                            <div className="mr-auto">
                              <Button variant="ghost">Advanced</Button>
                            </div>
                          )}
                        />
                        <Dialog.Portal>
                          <Dialog.Popup className="w-[min(400px,calc(100vw-var(--space-32)))]">
                            <Dialog.Content>
                              <Dialog.Header>
                                <Dialog.Title>Advanced settings</Dialog.Title>
                                <Dialog.Close />
                              </Dialog.Header>
                              <Dialog.Body>
                                <FieldPrimitive.Root className="flex items-center justify-between">
                                  <div className="flex flex-col gap-[var(--space-2)]">
                                    <FieldPrimitive.Label className="text-body-m-medium text-content-strong">
                                      Allow downloads
                                    </FieldPrimitive.Label>
                                    <FieldPrimitive.Description className="text-body-xs text-content-subtle">
                                      Users can download the file
                                    </FieldPrimitive.Description>
                                  </div>
                                  <Switch />
                                </FieldPrimitive.Root>
                                <FieldPrimitive.Root className="flex items-center justify-between">
                                  <div className="flex flex-col gap-[var(--space-2)]">
                                    <FieldPrimitive.Label className="text-body-m-medium text-content-strong">
                                      Allow comments
                                    </FieldPrimitive.Label>
                                    <FieldPrimitive.Description className="text-body-xs text-content-subtle">
                                      Users can leave comments
                                    </FieldPrimitive.Description>
                                  </div>
                                  <Switch defaultChecked />
                                </FieldPrimitive.Root>
                                <FieldPrimitive.Root className="flex items-center justify-between">
                                  <div className="flex flex-col gap-[var(--space-2)]">
                                    <FieldPrimitive.Label className="text-body-m-medium text-content-strong">
                                      Require password
                                    </FieldPrimitive.Label>
                                    <FieldPrimitive.Description className="text-body-xs text-content-subtle">
                                      Viewers must enter a password
                                    </FieldPrimitive.Description>
                                  </div>
                                  <Switch />
                                </FieldPrimitive.Root>
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

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Accessibility</h2>
        <div className="flex flex-col gap-[var(--space-12)]">
          <p className="text-body-m text-content-subtle">
            Dialogs are fully accessible and follow WAI-ARIA best practices:
          </p>
          <ul className="list-inside list-disc text-body-m text-content-subtle">
            <li>Focus is trapped within the dialog when open</li>
            <li>Escape key closes the dialog</li>
            <li>Click on backdrop closes the dialog (use AlertDialog for required acknowledgment)</li>
            <li>Focus returns to the trigger element after closing</li>
            <li>Title and description are announced to screen readers</li>
            <li>Tab navigates between focusable elements within the dialog</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
