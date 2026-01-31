import { CodeBlock } from "@/components/docs/code-block"
import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsSeparator,
} from "@/components/ui/breadcrumbs"

export default function BreadcrumbsDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Breadcrumbs</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Navigation aid showing the user&apos;s location within a site hierarchy
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsSeparator } from "@/components/ui/breadcrumbs"

<Breadcrumbs separator="slash">
  <BreadcrumbsItem showHomeIcon>Home</BreadcrumbsItem>
  <BreadcrumbsSeparator />
  <BreadcrumbsItem>Settings</BreadcrumbsItem>
  <BreadcrumbsSeparator />
  <BreadcrumbsItem isCurrent>Account</BreadcrumbsItem>
</Breadcrumbs>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Slash Separator</h2>
          <p className="text-body-m text-content-subtle">
            Use slash separator for a more traditional breadcrumb style.
          </p>
        </div>
        <div className="flex flex-col gap-[var(--space-16)] rounded-[var(--radius-12)] border border-border-muted p-[var(--space-24)]">
          <Breadcrumbs separator="slash">
            <BreadcrumbsItem showHomeIcon>
              Home
            </BreadcrumbsItem>
            <BreadcrumbsSeparator />
            <BreadcrumbsItem>Settings</BreadcrumbsItem>
            <BreadcrumbsSeparator />
            <BreadcrumbsItem>Account</BreadcrumbsItem>
            <BreadcrumbsSeparator />
            <BreadcrumbsItem isCurrent>Profile</BreadcrumbsItem>
          </Breadcrumbs>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Chevron Separator</h2>
          <p className="text-body-m text-content-subtle">
            Use chevron separator for a more modern, visual hierarchy indicator.
          </p>
        </div>
        <div className="flex flex-col gap-[var(--space-16)] rounded-[var(--radius-12)] border border-border-muted p-[var(--space-24)]">
          <Breadcrumbs separator="chevron">
            <BreadcrumbsItem showHomeIcon>
              Home
            </BreadcrumbsItem>
            <BreadcrumbsSeparator />
            <BreadcrumbsItem>Settings</BreadcrumbsItem>
            <BreadcrumbsSeparator />
            <BreadcrumbsItem>Account</BreadcrumbsItem>
            <BreadcrumbsSeparator />
            <BreadcrumbsItem isCurrent>Profile</BreadcrumbsItem>
          </Breadcrumbs>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Without Home Icon</h2>
          <p className="text-body-m text-content-subtle">
            Breadcrumbs without the home icon for a simpler text-only appearance.
          </p>
        </div>
        <div className="flex flex-col gap-[var(--space-16)] rounded-[var(--radius-12)] border border-border-muted p-[var(--space-24)]">
          <Breadcrumbs separator="slash">
            <BreadcrumbsItem>Home</BreadcrumbsItem>
            <BreadcrumbsSeparator />
            <BreadcrumbsItem>Products</BreadcrumbsItem>
            <BreadcrumbsSeparator />
            <BreadcrumbsItem isCurrent>Electronics</BreadcrumbsItem>
          </Breadcrumbs>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Two Levels</h2>
          <p className="text-body-m text-content-subtle">
            Simple two-level breadcrumb for shallow navigation.
          </p>
        </div>
        <div className="flex flex-col gap-[var(--space-16)] rounded-[var(--radius-12)] border border-border-muted p-[var(--space-24)]">
          <Breadcrumbs separator="chevron">
            <BreadcrumbsItem showHomeIcon>
              Home
            </BreadcrumbsItem>
            <BreadcrumbsSeparator />
            <BreadcrumbsItem isCurrent>Dashboard</BreadcrumbsItem>
          </Breadcrumbs>
        </div>
      </section>
    </div>
  )
}
