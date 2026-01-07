"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  CheckCircleIcon,
  InformationFillIcon,
  QuestionIcon,
  Spam2FillIcon,
} from "@/icons"

export default function AlertDialogDocsPage() {
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [logoutOpen, setLogoutOpen] = React.useState(false)
  const [warningOpen, setWarningOpen] = React.useState(false)
  const [simpleOpen, setSimpleOpen] = React.useState(false)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Alert Dialog</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A modal dialog that requires user acknowledgment before proceeding. Cannot be dismissed by clicking outside.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { AlertDialog } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Spam2FillIcon } from "@/icons"

<AlertDialog.Root open={open} onOpenChange={setOpen}>
  <AlertDialog.Trigger render={<Button variant="danger">Delete</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Content icon={<Spam2FillIcon />} iconTone="danger">
        <AlertDialog.Title>Delete account?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone.
        </AlertDialog.Description>
      </AlertDialog.Content>
      <AlertDialog.Footer>
        <AlertDialog.Close render={<Button variant="ghost">Cancel</Button>} />
        <Button variant="primary" onClick={handleDelete}>Delete</Button>
      </AlertDialog.Footer>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Simple confirmation</p>
              <p className="text-body-s text-content-subtle">Title and description only</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <AlertDialog.Root open={simpleOpen} onOpenChange={setSimpleOpen}>
                <AlertDialog.Trigger render={<Button variant="secondary">Confirm action</Button>} />
                <AlertDialog.Portal>
                  <AlertDialog.Backdrop />
                  <AlertDialog.Popup>
                    <AlertDialog.Content>
                      <AlertDialog.Title>Are you sure?</AlertDialog.Title>
                      <AlertDialog.Description>
                        This action will update your settings.
                      </AlertDialog.Description>
                    </AlertDialog.Content>
                    <AlertDialog.Footer>
                      <AlertDialog.Close render={<Button variant="ghost">Cancel</Button>} />
                      <Button variant="primary" onClick={() => setSimpleOpen(false)}>
                        Continue
                      </Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Popup>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Icon</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Danger action</p>
              <p className="text-body-s text-content-subtle">Destructive confirmation</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <AlertDialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialog.Trigger render={<Button variant="danger" leadingIcon={<Spam2FillIcon />}>Delete account</Button>} />
                <AlertDialog.Portal>
                  <AlertDialog.Backdrop />
                  <AlertDialog.Popup>
                    <AlertDialog.Content icon={<Spam2FillIcon />} iconTone="danger">
                      <AlertDialog.Title>Delete account?</AlertDialog.Title>
                      <AlertDialog.Description>
                        This action cannot be undone. All your data will be permanently removed from our servers.
                      </AlertDialog.Description>
                    </AlertDialog.Content>
                    <AlertDialog.Footer>
                      <AlertDialog.Close render={<Button variant="ghost">Cancel</Button>} />
                      <Button variant="danger" onClick={() => setDeleteOpen(false)}>
                        Delete account
                      </Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Popup>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Warning action</p>
              <p className="text-body-s text-content-subtle">Caution before proceeding</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <AlertDialog.Root open={warningOpen} onOpenChange={setWarningOpen}>
                <AlertDialog.Trigger render={<Button variant="secondary" leadingIcon={<Spam2FillIcon />}>Reset settings</Button>} />
                <AlertDialog.Portal>
                  <AlertDialog.Backdrop />
                  <AlertDialog.Popup>
                    <AlertDialog.Content icon={<Spam2FillIcon />} iconTone="warning">
                      <AlertDialog.Title>Reset all settings?</AlertDialog.Title>
                      <AlertDialog.Description>
                        This will restore all settings to their default values. Your preferences will be lost.
                      </AlertDialog.Description>
                    </AlertDialog.Content>
                    <AlertDialog.Footer>
                      <AlertDialog.Close render={<Button variant="ghost">Cancel</Button>} />
                      <Button variant="primary" onClick={() => setWarningOpen(false)}>
                        Reset settings
                      </Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Popup>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Logout confirmation</p>
              <p className="text-body-s text-content-subtle">Default icon tone</p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-end gap-[var(--space-16)]">
              <AlertDialog.Root open={logoutOpen} onOpenChange={setLogoutOpen}>
                <AlertDialog.Trigger render={<Button variant="ghost">Sign out</Button>} />
                <AlertDialog.Portal>
                  <AlertDialog.Backdrop />
                  <AlertDialog.Popup>
                    <AlertDialog.Content icon={<QuestionIcon />}>
                      <AlertDialog.Title>Sign out?</AlertDialog.Title>
                      <AlertDialog.Description>
                        You will need to sign in again to access your account.
                      </AlertDialog.Description>
                    </AlertDialog.Content>
                    <AlertDialog.Footer>
                      <AlertDialog.Close render={<Button variant="ghost">Cancel</Button>} />
                      <Button variant="primary" onClick={() => setLogoutOpen(false)}>
                        Sign out
                      </Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Popup>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Icon Tones</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Available tones</p>
              <p className="text-body-s text-content-subtle">default, danger, warning, info, success</p>
            </div>
            <div className="flex w-full max-w-sm justify-end gap-[var(--space-16)]">
              {([
                { tone: "default", icon: <QuestionIcon />, className: "text-content-strong" },
                { tone: "danger", icon: <Spam2FillIcon />, className: "text-content-feedback-danger-strong" },
                { tone: "warning", icon: <Spam2FillIcon />, className: "text-content-feedback-warning-strong" },
                { tone: "info", icon: <InformationFillIcon />, className: "text-content-feedback-info-strong" },
                { tone: "success", icon: <CheckCircleIcon />, className: "text-content-feedback-success-strong" },
              ] as const).map(({ tone, icon, className }) => (
                <span key={tone} className={cn("flex size-[28px] [&_svg]:size-full", className)}>
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
