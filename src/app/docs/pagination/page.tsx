"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import {
  Pagination,
  PaginationContent,
  PageIndicator,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"

const sizes = [
  { value: "xs", label: "XS", height: 28 },
  { value: "s", label: "S", height: 32 },
  { value: "m", label: "M", height: 36 },
  { value: "l", label: "L", height: 40 },
] as const

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages: (number | "ellipsis-start" | "ellipsis-end")[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  if (currentPage <= 3) {
    pages.push(2, 3, 4, "ellipsis-end", totalPages)
  } else if (currentPage >= totalPages - 2) {
    pages.push(
      "ellipsis-start",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    )
  } else {
    pages.push(
      "ellipsis-start",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis-end",
      totalPages
    )
  }

  return pages
}

function InteractivePagination({
  size,
  totalPages = 16,
}: {
  size?: "xs" | "s" | "m" | "l"
  totalPages?: number
}) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const visiblePages = getVisiblePages(currentPage, totalPages)

  return (
    <Pagination size={size}>
      <PaginationPrevious
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      />
      <PaginationContent>
        {visiblePages.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return <PaginationEllipsis key={page} />
          }
          return (
            <PageIndicator
              key={index}
              isActive={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageIndicator>
          )
        })}
      </PaginationContent>
      <PaginationNext
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  )
}

export default function PaginationDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Pagination</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Navigates between pages of content
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import {
  Pagination,
  PaginationContent,
  PageIndicator,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationPrevious />
  <PaginationContent>
    <PageIndicator isActive>1</PageIndicator>
    <PageIndicator>2</PageIndicator>
    <PageIndicator>3</PageIndicator>
    <PaginationEllipsis />
    <PageIndicator>16</PageIndicator>
  </PaginationContent>
  <PaginationNext />
</Pagination>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Active</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <PageIndicator isActive>1</PageIndicator>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Inactive</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <PageIndicator>2</PageIndicator>
              <PageIndicator disabled>3</PageIndicator>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Sizes</h2>
          <p className="text-body-m text-content-subtle">
            Sizes match button component.
          </p>
        </div>
        <div className="flex flex-col">
          {sizes.map((size) => (
            <div
              key={size.value}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-body-m text-content-strong">{size.label}</p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-8)]">
                <InteractivePagination size={size.value} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Navigation Buttons</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Previous</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <PaginationPrevious />
              <PaginationPrevious disabled />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Next</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <PaginationNext />
              <PaginationNext disabled />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
