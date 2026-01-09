import { CodeBlock } from "@/components/docs/code-block"
import { FileIcon, UploadIcon } from "@/components/ui/file-icon"

const fileTypes = [
  { type: "doc", color: "#3B82F6", label: "Document", description: ".doc, .docx, .txt, .rtf, .odt" },
  { type: "spreadsheet", color: "#10B981", label: "Spreadsheet", description: ".xls, .xlsx, .csv, .ods" },
  { type: "pdf", color: "#EF4444", label: "PDF", description: ".pdf" },
  { type: "slides", color: "#FF6900", label: "Slides", description: ".ppt, .pptx, .key, .odp" },
  { type: "audio", color: "#F43F5E", label: "Audio", description: ".mp3, .wav, .flac, .aac, .ogg" },
  { type: "image", color: "#84CC16", label: "Image", description: ".jpg, .png, .gif, .webp, .svg" },
  { type: "generic", color: "#404040", label: "Generic", description: "Unknown file types" },
] as const

const customColors = [
  "red", "orange", "amber", "yellow", "lime", "green",
  "emerald", "teal", "cyan", "sky", "blue", "indigo",
  "violet", "purple", "fuchsia", "pink", "rose",
] as const

export default function FileIconDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">File Icon</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Visual file type indicators with automatic extension detection
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { FileIcon, UploadIcon, getFileTypeFromExtension } from "@/components/ui/file-icon"

// Basic usage
<FileIcon fileType="doc" />
<FileIcon fileType="pdf" size="l" />

// Auto-detect from filename
const type = getFileTypeFromExtension("report.xlsx")
<FileIcon fileType={type} />

// Image with actual thumbnail
<FileIcon fileType="image" src={imageUrl} />

// Custom color
<FileIcon fileType="custom" color="emerald" />

// Upload icon (matches FileIcon sizing)
<UploadIcon size="m" />`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">File Types</h2>
          <p className="text-body-m text-content-subtle">
            Auto-detected from file extension using getFileTypeFromExtension()
          </p>
        </div>
        <div className="flex flex-col">
          {fileTypes.map(({ type, color, label, description }) => (
            <div
              key={type}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-center md:justify-between"
            >
              <div className="md:min-w-[220px]">
                <p className="text-body-m text-content-strong">{label}</p>
                <p className="text-body-m text-content-subtle">{description}</p>
              </div>
              <div className="flex items-center gap-[var(--space-12)]">
                <FileIcon fileType={type} size="m" />
                <span className="text-body-xs text-content-subtle">{color}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Image Preview</h2>
          <p className="text-body-m text-content-subtle">
            Pass src prop to show actual image thumbnail instead of icon
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With src</p>
              <p className="text-body-m text-content-subtle">Shows actual image</p>
            </div>
            <div className="flex items-center gap-[var(--space-12)]">
              <FileIcon fileType="image" size="s" src="/avatars/avatar-1.png" />
              <FileIcon fileType="image" size="m" src="/avatars/avatar-1.png" />
              <FileIcon fileType="image" size="l" src="/avatars/avatar-1.png" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Without src</p>
              <p className="text-body-m text-content-subtle">Shows default icon</p>
            </div>
            <div className="flex items-center gap-[var(--space-12)]">
              <FileIcon fileType="image" size="s" />
              <FileIcon fileType="image" size="m" />
              <FileIcon fileType="image" size="l" />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Custom Colors</h2>
          <p className="text-body-m text-content-subtle">
            Use fileType=&quot;custom&quot; with a color prop for decorative colors
          </p>
        </div>
        <div className="flex flex-col">
          {customColors.map((color) => (
            <div
              key={color}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-16)] md:flex-row md:items-center md:justify-between"
            >
              <div className="md:min-w-[220px]">
                <p className="text-body-m text-content-strong">{color}</p>
              </div>
              <div className="flex items-center gap-[var(--space-12)]">
                <FileIcon fileType="custom" color={color} size="m" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Sizes</h2>
          <p className="text-body-m text-content-subtle">
            Three sizes available: s (32px), m (44px), l (56px)
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">FileIcon</p>
              <p className="text-body-m text-content-subtle">32px, 44px, 56px</p>
            </div>
            <div className="flex items-end gap-[var(--space-12)]">
              <FileIcon fileType="doc" size="s" />
              <FileIcon fileType="doc" size="m" />
              <FileIcon fileType="doc" size="l" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">UploadIcon</p>
              <p className="text-body-m text-content-subtle">Matches FileIcon sizing</p>
            </div>
            <div className="flex items-end gap-[var(--space-12)]">
              <UploadIcon size="s" />
              <UploadIcon size="m" />
              <UploadIcon size="l" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
