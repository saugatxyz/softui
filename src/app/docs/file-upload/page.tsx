"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { FileUpload, FileItem } from "@/components/ui/file-upload"
import { FileIcon } from "@/components/ui/file-icon"
import { Field } from "@/components/ui/field"

function createMockFile(name: string): File {
  const blob = new Blob([""], { type: "application/octet-stream" })
  return new File([blob], name, { lastModified: Date.now() })
}

function FileStatesDemo() {
  const mockFiles = [
    { file: createMockFile("Q4 Forecast.xlsx"), size: 2.5 * 1024 * 1024, state: "uploaded" as const, progress: 100 },
    { file: createMockFile("KPI Review.docx"), size: 8 * 1024 * 1024, state: "uploading" as const, progress: 45 },
    { file: createMockFile("Project Roadmap.pptx"), size: 1.2 * 1024 * 1024, state: "error" as const, progress: 0 },
    { file: createMockFile("Budget Analysis.pdf"), size: 3.4 * 1024 * 1024, state: "warning" as const, progress: 0 },
  ]

  return (
    <div className="flex flex-col gap-[var(--space-2)]">
      {mockFiles.map((item, index) => (
        <FileItem
          key={index}
          file={item.file}
          state={item.state}
          progress={item.progress}
          displaySize={item.size}
          onRemove={() => {}}
        />
      ))}
    </div>
  )
}

function SimulatedUploadDemo() {
  const [files, setFiles] = React.useState<Array<{
    file: File
    state: "uploaded" | "uploading" | "error"
    progress: number
    size: number
  }>>([])

  const simulateUpload = (newFiles: File[]) => {
    newFiles.forEach((file) => {
      // Simulate a large file (50-150MB)
      const simulatedSize = (50 + Math.random() * 100) * 1024 * 1024

      const newFile = {
        file,
        state: "uploading" as const,
        progress: 0,
        size: simulatedSize,
      }

      setFiles((prev) => [...prev, newFile])

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setFiles((prev) =>
            prev.map((f) =>
              f.file === file ? { ...f, state: "uploaded" as const, progress: 100 } : f
            )
          )
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.file === file ? { ...f, progress } : f
            )
          )
        }
      }, 500)
    })
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-[var(--space-2)]">
      <FileUpload
        hint="Upload any file to see simulated progress"
        onFilesAdded={simulateUpload}
        files={[]}
        onFilesChange={() => {}}
      />
      {files.map((item, index) => (
        <FileItem
          key={`${item.file.name}-${index}`}
          file={item.file}
          state={item.state}
          progress={item.progress}
          displaySize={item.size}
          onRemove={() => removeFile(index)}
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
import { Field } from "@/components/ui/field"

// Basic usage
<FileUpload hint="Any file up to 10MB" />

// With file type restrictions
<FileUpload
  accept="image/*,.pdf"
  hint="Images or PDF up to 10MB"
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
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With hint</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileUpload hint="Any file up to 10MB" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
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
        <h2 className="text-body-xl-semibold">Simulated Upload</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large file upload</p>
              <p className="text-body-m text-content-subtle">Upload any file to see progress</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <SimulatedUploadDemo />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">File Item States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
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
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
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
              <FileIcon fileType="image" />
              <FileIcon fileType="generic" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
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
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Images only</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileUpload
                accept="image/*"
                hint="PNG, JPG, GIF, WEBP up to 10MB"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Documents only</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileUpload
                accept=".pdf,.doc,.docx"
                hint="PDF, DOC, DOCX files only"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Single vs Multiple</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
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
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
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
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With label</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <Field label="Attachments">
                <FileUpload hint="PDF, DOC, DOCX up to 25MB" />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With description</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <Field label="Profile Picture" description="This will be shown on your public profile">
                <FileUpload
                  accept="image/*"
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
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileUpload hint="Any file up to 10MB" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <FileUpload disabled hint="Any file up to 10MB" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
