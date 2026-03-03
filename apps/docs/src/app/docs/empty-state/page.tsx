import * as React from "react"
import { RiSearchLine, RiInboxLine, RiFileAddLine, RiUserAddLine } from "@remixicon/react"
import { CodeBlock } from "@/components/docs/code-block"
import { EmptyState } from "@soft-ui/react/empty-state"

export default function EmptyStateDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Empty State</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Placeholder content for when there is no data to display.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { EmptyState } from "@soft-ui/react/empty-state"

<EmptyState.Root>
  <EmptyState.Icon>
    <RiSearchLine />
  </EmptyState.Icon>
  <EmptyState.Content>
    <EmptyState.Title>No results found</EmptyState.Title>
    <EmptyState.Description>
      Try adjusting your search or filters
    </EmptyState.Description>
  </EmptyState.Content>
  <EmptyState.Actions>
    <EmptyState.Action leadingIcon={<RiAddLine />}>
      Create new
    </EmptyState.Action>
  </EmptyState.Actions>
</EmptyState.Root>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Default</h2>
        <p className="text-body-m text-content-subtle">
          Basic empty state with icon, title, description, and action.
        </p>
        <div className="rounded-[var(--radius-16)] border border-border-muted p-[var(--space-24)]">
          <EmptyState.Root>
            <EmptyState.Icon>
              <RiSearchLine />
            </EmptyState.Icon>
            <EmptyState.Content>
              <EmptyState.Title>No results found</EmptyState.Title>
              <EmptyState.Description>
                Try adjusting your search or filters to find what you&apos;re looking for.
              </EmptyState.Description>
            </EmptyState.Content>
            <EmptyState.Actions>
              <EmptyState.Action leadingIcon={<RiFileAddLine />}>
                Create new
              </EmptyState.Action>
            </EmptyState.Actions>
          </EmptyState.Root>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Filled</h2>
        <p className="text-body-m text-content-subtle">
          Use the filled prop to add a subtle background, useful when the empty state needs more visual presence.
        </p>
        <div className="rounded-[var(--radius-16)] border border-border-muted p-[var(--space-24)]">
          <EmptyState.Root filled>
            <EmptyState.Icon>
              <RiSearchLine />
            </EmptyState.Icon>
            <EmptyState.Content>
              <EmptyState.Title>No results found</EmptyState.Title>
              <EmptyState.Description>
                Try adjusting your search or filters to find what you&apos;re looking for.
              </EmptyState.Description>
            </EmptyState.Content>
            <EmptyState.Actions>
              <EmptyState.Action leadingIcon={<RiFileAddLine />}>
                Create new
              </EmptyState.Action>
            </EmptyState.Actions>
          </EmptyState.Root>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Without Action</h2>
        <p className="text-body-m text-content-subtle">
          Empty states can be displayed without action buttons when no action is available.
        </p>
        <div className="rounded-[var(--radius-16)] border border-border-muted p-[var(--space-24)]">
          <EmptyState.Root>
            <EmptyState.Icon>
              <RiInboxLine />
            </EmptyState.Icon>
            <EmptyState.Content>
              <EmptyState.Title>No messages</EmptyState.Title>
              <EmptyState.Description>
                Your inbox is empty. New messages will appear here.
              </EmptyState.Description>
            </EmptyState.Content>
          </EmptyState.Root>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Without Description</h2>
        <p className="text-body-m text-content-subtle">
          Minimal empty state with just an icon, title, and optional action.
        </p>
        <div className="rounded-[var(--radius-16)] border border-border-muted p-[var(--space-24)]">
          <EmptyState.Root>
            <EmptyState.Icon>
              <RiUserAddLine />
            </EmptyState.Icon>
            <EmptyState.Content>
              <EmptyState.Title>No team members</EmptyState.Title>
            </EmptyState.Content>
            <EmptyState.Actions>
              <EmptyState.Action leadingIcon={<RiUserAddLine />}>
                Invite members
              </EmptyState.Action>
            </EmptyState.Actions>
          </EmptyState.Root>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Multiple Actions</h2>
        <p className="text-body-m text-content-subtle">
          Empty states can have multiple action buttons.
        </p>
        <div className="rounded-[var(--radius-16)] border border-border-muted p-[var(--space-24)]">
          <EmptyState.Root filled>
            <EmptyState.Icon>
              <RiFileAddLine />
            </EmptyState.Icon>
            <EmptyState.Content>
              <EmptyState.Title>No documents</EmptyState.Title>
              <EmptyState.Description>
                Get started by creating a new document or importing an existing one.
              </EmptyState.Description>
            </EmptyState.Content>
            <EmptyState.Actions>
              <EmptyState.Action leadingIcon={<RiFileAddLine />}>
                Create new
              </EmptyState.Action>
              <EmptyState.Action>
                Import
              </EmptyState.Action>
            </EmptyState.Actions>
          </EmptyState.Root>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Custom Icon</h2>
        <p className="text-body-m text-content-subtle">
          Use any icon that fits your context. The default icon is a search icon.
        </p>
        <div className="grid gap-[var(--space-16)] sm:grid-cols-2">
          <div className="rounded-[var(--radius-16)] border border-border-muted p-[var(--space-16)]">
            <EmptyState.Root>
              <EmptyState.Icon>
                <RiInboxLine />
              </EmptyState.Icon>
              <EmptyState.Content>
                <EmptyState.Title>All caught up!</EmptyState.Title>
                <EmptyState.Description>
                  No new notifications
                </EmptyState.Description>
              </EmptyState.Content>
            </EmptyState.Root>
          </div>
          <div className="rounded-[var(--radius-16)] border border-border-muted p-[var(--space-16)]">
            <EmptyState.Root>
              <EmptyState.Icon>
                <RiUserAddLine />
              </EmptyState.Icon>
              <EmptyState.Content>
                <EmptyState.Title>Build your team</EmptyState.Title>
                <EmptyState.Description>
                  Invite colleagues to collaborate
                </EmptyState.Description>
              </EmptyState.Content>
            </EmptyState.Root>
          </div>
        </div>
      </section>
    </div>
  )
}
