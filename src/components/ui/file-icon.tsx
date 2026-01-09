"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const fileTypeConfig = {
  doc: {
    color: "bg-[rgb(var(--surface-decorative-blue-strong))]",
    lines: [
      { width: "50%", top: "31%" },
      { width: "50%", top: "42%" },
      { width: "70%", top: "53%" },
      { width: "70%", top: "64%" },
    ],
  },
  spreadsheet: {
    color: "bg-[rgb(var(--surface-decorative-emerald-strong))]",
    type: "grid",
  },
  pdf: {
    color: "bg-[rgb(var(--surface-decorative-red-strong))]",
    lines: [
      { width: "50%", top: "31%" },
      { width: "50%", top: "42%" },
      { width: "70%", top: "53%" },
      { width: "70%", top: "64%" },
    ],
  },
  slides: {
    color: "bg-[rgb(var(--surface-decorative-orange-strong))]",
    type: "chart",
  },
  audio: {
    color: "bg-[rgb(var(--surface-decorative-purple-strong))]",
    type: "waveform",
  },
  video: {
    color: "bg-[rgb(var(--surface-decorative-pink-strong))]",
    type: "play",
  },
  image: {
    color: "bg-[rgb(var(--surface-decorative-rose-strong))]",
    type: "image",
  },
  archive: {
    color: "bg-[rgb(var(--surface-decorative-amber-strong))]",
    type: "zip",
  },
  code: {
    color: "bg-[rgb(var(--surface-decorative-cyan-strong))]",
    lines: [
      { width: "40%", top: "36%" },
      { width: "55%", top: "50%" },
      { width: "40%", top: "64%" },
    ],
  },
  generic: {
    color: "bg-surface-interactive-default",
    lines: [
      { width: "50%", top: "36%" },
      { width: "50%", top: "50%" },
      { width: "70%", top: "64%" },
    ],
  },
} as const

type FileType = keyof typeof fileTypeConfig

type FileIconProps = {
  className?: string
  fileType?: FileType
  size?: "s" | "m" | "l"
}

function getFileTypeFromExtension(filename: string): FileType {
  const ext = filename.split(".").pop()?.toLowerCase() || ""

  const extensionMap: Record<string, FileType> = {
    // Documents
    doc: "doc",
    docx: "doc",
    txt: "doc",
    rtf: "doc",
    odt: "doc",
    // Spreadsheets
    xls: "spreadsheet",
    xlsx: "spreadsheet",
    csv: "spreadsheet",
    ods: "spreadsheet",
    // PDFs
    pdf: "pdf",
    // Presentations
    ppt: "slides",
    pptx: "slides",
    key: "slides",
    odp: "slides",
    // Audio
    mp3: "audio",
    wav: "audio",
    flac: "audio",
    aac: "audio",
    ogg: "audio",
    m4a: "audio",
    // Video
    mp4: "video",
    mov: "video",
    avi: "video",
    mkv: "video",
    webm: "video",
    // Images
    jpg: "image",
    jpeg: "image",
    png: "image",
    gif: "image",
    webp: "image",
    svg: "image",
    bmp: "image",
    ico: "image",
    // Archives
    zip: "archive",
    rar: "archive",
    "7z": "archive",
    tar: "archive",
    gz: "archive",
    // Code
    js: "code",
    ts: "code",
    jsx: "code",
    tsx: "code",
    py: "code",
    rb: "code",
    go: "code",
    rs: "code",
    java: "code",
    c: "code",
    cpp: "code",
    h: "code",
    css: "code",
    scss: "code",
    html: "code",
    json: "code",
    xml: "code",
    yaml: "code",
    yml: "code",
    md: "code",
  }

  return extensionMap[ext] || "generic"
}

const sizeClasses = {
  s: "size-[32px] rounded-[var(--radius-6)]",
  m: "size-[44px] rounded-[var(--radius-8)]",
  l: "size-[56px] rounded-[var(--radius-10)]",
}

const paperSizeClasses = {
  s: "size-[24px] rounded-tl-[3px]",
  m: "size-[36px] rounded-tl-[4px]",
  l: "size-[46px] rounded-tl-[5px]",
}

function FileIcon({ className, fileType = "generic", size = "m" }: FileIconProps) {
  const config = fileTypeConfig[fileType]

  return (
    <div
      data-slot="file-icon"
      data-file-type={fileType}
      className={cn(
        "relative flex shrink-0 items-end justify-end overflow-hidden",
        sizeClasses[size],
        config.color,
        className
      )}
    >
      {/* Paper shape */}
      <div
        className={cn(
          "absolute bg-white shadow-[-1px_1px_4px_0px_rgba(0,0,0,0.15)]",
          paperSizeClasses[size]
        )}
        style={{
          top: 0,
          left: 0,
        }}
      />

      {/* Content decoration based on type */}
      {"lines" in config && (
        <div className="absolute inset-0">
          {config.lines.map((line, i) => (
            <div
              key={i}
              className="absolute left-[30%] h-[6%] rounded-[1px] bg-black/10"
              style={{
                width: line.width,
                top: line.top,
              }}
            />
          ))}
        </div>
      )}

      {"type" in config && config.type === "grid" && (
        <div className="absolute inset-0">
          {/* Horizontal lines */}
          <div className="absolute left-[18%] top-[45%] h-px w-[64%] bg-black/10" />
          <div className="absolute left-[18%] top-[72%] h-px w-[64%] bg-black/10" />
          {/* Vertical line */}
          <div className="absolute left-[40%] top-[18%] h-[64%] w-px bg-black/10" />
        </div>
      )}

      {"type" in config && config.type === "chart" && (
        <div className="absolute left-[30%] top-[30%] flex size-[28%] items-center justify-center">
          <div className="size-full rounded-full border-[2px] border-black/10" />
          <div className="absolute left-0 top-0 size-1/2 rounded-tl-full bg-black/10" />
        </div>
      )}

      {"type" in config && config.type === "waveform" && (
        <div className="absolute left-[30%] top-[50%] flex -translate-y-1/2 items-center gap-[4%]">
          {[30, 50, 80, 60, 25].map((h, i) => (
            <div
              key={i}
              className="w-[6%] rounded-[1px] bg-black/10"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      )}

      {"type" in config && config.type === "play" && (
        <div className="absolute left-[35%] top-[35%] size-[30%]">
          <div
            className="size-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-black/10"
            style={{ marginLeft: "25%" }}
          />
        </div>
      )}

      {"type" in config && config.type === "image" && (
        <div className="absolute left-[25%] top-[30%] size-[50%] overflow-hidden rounded-[2px] bg-black/5">
          <div className="absolute bottom-0 left-0 h-[40%] w-[60%] rounded-tr-full bg-black/10" />
          <div className="absolute right-[20%] top-[20%] size-[20%] rounded-full bg-black/10" />
        </div>
      )}

      {"type" in config && config.type === "zip" && (
        <div className="absolute left-[40%] top-[25%] flex flex-col gap-[8%]">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="h-[8%] w-[20%] rounded-[1px] bg-black/10" />
          ))}
        </div>
      )}
    </div>
  )
}

export { FileIcon, getFileTypeFromExtension }
export type { FileIconProps, FileType }
