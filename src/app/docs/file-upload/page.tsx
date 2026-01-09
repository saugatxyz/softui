"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { FileUpload, FileItem, type FileUploadFile } from "@/components/ui/file-upload"
import { FileIcon } from "@/components/ui/file-icon"
import { Field } from "@/components/ui/field"

// Mock file for demos
function createMockFile(name: string, sizeInBytes: number): File {
  // Create a blob of approximately the specified size
  const content = new Array(Math.min(sizeInBytes, 100)).fill("x").join("")
  const blob = new Blob([content], { type: "application/octet-stream" })
  // Override the size property for display purposes
  const file = new File([blob], name, { lastModified: Date.now() })
  Object.defineProperty(file, "size", { value: sizeInBytes })
  return file
}

function FileStatesDemo() {
  const mockFiles: FileUploadFile[] = [
    { file: createMockFile("Q4 Forecast.xlsx", 2.5 * 1024 * 1024), state: "uploaded", progress: 100 },
    { file: createMockFile("KPI Review.docx", 8 * 1024 * 1024), state: "uploading", progress: 15 },
    { file: createMockFile("Project Roadmap.pptx", 1.2 * 1024 * 1024), state: "error", progress: 0 },
    { file: createMockFile("Budget Analysis.pdf", 3.4 * 1024 * 1024), state: "warning", progress: 0 },
  ]

  return (
    <div className="flex flex-col gap-[var(--space-4)]">
      {mockFiles.map((fileItem, index) => (
        <FileItem
          key={index}
          file={fileItem.file}
          state={fileItem.state}
          progress={fileItem.progress}
          onRemove={() => {}}
        />
      ))}
    </div>
  )
}

export default function FileUploadDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">File Upload</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Drag and drop file upload with validation and progress support
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { FileUpload, FileItem } from "@/components/ui/file-upload"
import { FileIcon } from "@/components/ui/file-icon"
import { Field } from "@/components/ui/field"

// Basic usage
<FileUpload hint="Image file up to 10MB" />

// With file type restrictions
<FileUpload
  accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif"] }}
  hint="PNG, JPG, GIF up to 10MB"
/>

// Single file only
<FileUpload multiple={false} />

// With Field wrapper
<Field label="Attachments">
  <FileUpload hint="PDF, DOC up to 25MB" />
</Field>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Default</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With hint</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileUpload hint="Image file up to 10MB" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Without hint</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileUpload />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">File Item States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">All states</p>
              <p className="text-body-m text-content-subtle">Uploaded, uploading, error, warning</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileStatesDemo />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">File Icons</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">File types</p>
              <p className="text-body-m text-content-subtle">Auto-detected from extension</p>
            </div>
            <div className="flex w-full max-w-md flex-wrap gap-[var(--space-12)]">
              <FileIcon fileType="doc" />
              <FileIcon fileType="spreadsheet" />
              <FileIcon fileType="pdf" />
              <FileIcon fileType="slides" />
              <FileIcon fileType="audio" />
              <FileIcon fileType="video" />
              <FileIcon fileType="image" />
              <FileIcon fileType="archive" />
              <FileIcon fileType="code" />
              <FileIcon fileType="generic" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Sizes</p>
            </div>
            <div className="flex w-full max-w-md items-end gap-[var(--space-12)]">
              <FileIcon fileType="doc" size="s" />
              <FileIcon fileType="doc" size="m" />
              <FileIcon fileType="doc" size="l" />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">File Type Restrictions</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Images only</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileUpload
                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] }}
                hint="PNG, JPG, GIF, WEBP up to 10MB"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Documents only</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileUpload
                accept={{
                  "application/pdf": [".pdf"],
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
                }}
                hint="PDF, DOCX files only"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Single vs Multiple</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Single file</p>
              <p className="text-body-m text-content-subtle">Replaces previous file</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileUpload
                multiple={false}
                hint="Only one file allowed"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Multiple files</p>
              <p className="text-body-m text-content-subtle">Default behavior</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileUpload hint="Upload as many files as you need" />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Field</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With label</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <Field label="Attachments">
                <FileUpload hint="PDF, DOC, DOCX up to 25MB" />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With description</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <Field label="Profile Picture" description="This will be shown on your public profile">
                <FileUpload
                  accept={{ "image/*": [] }}
                  multiple={false}
                  hint="Square image recommended"
                />
              </Field>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileUpload hint="Image file up to 10MB" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileUpload disabled hint="Image file up to 10MB" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
