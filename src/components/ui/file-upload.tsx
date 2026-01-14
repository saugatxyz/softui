"use client"

import * as React from "react"
import {
  RiCheckboxCircleFill,
  RiLoader2Line,
  RiErrorWarningFill,
  RiDeleteBinLine,
  RiCloseLine,
} from "@remixicon/react"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { FileIcon, UploadIcon, getFileTypeFromExtension } from "@/components/ui/file-icon"

// ============================================================================
// Utilities
// ============================================================================

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function isValidFileType(file: File, accept?: string): boolean {
  if (!accept) return true

  const acceptedTypes = accept.split(",").map((t) => t.trim())

  for (const type of acceptedTypes) {
    // Handle MIME type wildcards like "image/*"
    if (type.endsWith("/*")) {
      const category = type.slice(0, -2)
      if (file.type.startsWith(category + "/")) return true
    }
    // Handle exact MIME types
    else if (type.includes("/")) {
      if (file.type === type) return true
    }
    // Handle extensions like ".pdf"
    else if (type.startsWith(".")) {
      if (file.name.toLowerCase().endsWith(type.toLowerCase())) return true
    }
  }

  return false
}

// ============================================================================
// FileItem Component
// ============================================================================

type FileItemState = "uploaded" | "uploading" | "error" | "warning"

type FileItemProps = {
  file: File
  state?: FileItemState
  progress?: number
  displaySize?: number
  onRemove?: () => void
  className?: string
}

function FileItem({
  file,
  state = "uploaded",
  progress = 0,
  displaySize,
  onRemove,
  className,
}: FileItemProps) {
  const fileType = getFileTypeFromExtension(file.name)
  const size = displaySize ?? file.size

  const [imageUrl, setImageUrl] = React.useState<string | undefined>()

  React.useEffect(() => {
    if (fileType === "image" && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [file, fileType])

  return (
    <div
      data-slot="file-item"
      data-state={state}
      className={cn(
        "relative flex items-center gap-[var(--space-12)] overflow-hidden rounded-[var(--radius-16)] bg-surface-interactive-default p-[var(--space-12)]",
        className
      )}
    >
      {state === "uploading" && (
        <div
          data-slot="progress"
          className="absolute bottom-0 left-0 top-0 bg-actions-secondary-default transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      )}

      <FileIcon fileType={fileType} size="m" src={imageUrl} className="relative z-10" />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-[var(--space-4)]">
        <div className="flex items-center gap-[var(--space-2)]">
          <p className="truncate text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">{file.name}</p>
          <span className="relative flex size-[var(--space-16)] shrink-0 items-center justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
              {state === "uploading" && (
                <motion.span
                  key="spinner"
                  className="absolute inset-0 flex items-center justify-center text-content-strong"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, y: -8, filter: "blur(4px)" }}
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.25,
                  }}
                >
                  <RiLoader2Line className="size-[var(--space-16)] animate-spin" style={{ animationDuration: "0.8s" }} />
                </motion.span>
              )}
              {state === "uploaded" && (
                <motion.span
                  key="check"
                  className="absolute inset-0 flex items-center justify-center text-content-feedback-success-strong"
                  initial={{ opacity: 0, scale: 0.5, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.35 }}
                >
                  <RiCheckboxCircleFill className="size-[var(--space-16)]" />
                </motion.span>
              )}
              {state === "error" && (
                <motion.span
                  key="error"
                  className="absolute inset-0 flex items-center justify-center text-content-feedback-danger-strong"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.25 }}
                >
                  <RiErrorWarningFill className="size-[var(--space-16)]" />
                </motion.span>
              )}
              {state === "warning" && (
                <motion.span
                  key="warning"
                  className="absolute inset-0 flex items-center justify-center text-content-feedback-warning-strong"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.25 }}
                >
                  <RiErrorWarningFill className="size-[var(--space-16)]" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </div>

        <p className="text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-subtle">
          {state === "uploading"
            ? `${formatFileSize(size * (progress / 100))} / ${formatFileSize(size)}`
            : formatFileSize(size)}
        </p>
      </div>

      <IconButton
        variant="ghost"
        size="s"
        onClick={onRemove}
        className="relative z-10"
      >
        {state === "uploaded" ? (
          <RiDeleteBinLine />
        ) : (
          <RiCloseLine />
        )}
      </IconButton>
    </div>
  )
}

// ============================================================================
// FileUpload Component
// ============================================================================

type FileUploadFile = {
  file: File
  state: FileItemState
  progress: number
}

type FileUploadProps = {
  className?: string
  disabled?: boolean
  label?: string
  hint?: string
  /** Accepted file types (e.g., "image/*,.pdf") */
  accept?: string
  /** Allow multiple files */
  multiple?: boolean
  /** Controlled files */
  files?: FileUploadFile[]
  /** Callback when files change */
  onFilesChange?: (files: FileUploadFile[]) => void
  /** Callback when files are added */
  onFilesAdded?: (files: File[]) => void
}

function FileUpload({
  className,
  disabled = false,
  label = "Drag and drop or browse",
  hint,
  accept,
  multiple = true,
  files: controlledFiles,
  onFilesChange,
  onFilesAdded,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [internalFiles, setInternalFiles] = React.useState<FileUploadFile[]>([])
  const [isDragActive, setIsDragActive] = React.useState(false)
  const [isDragReject, setIsDragReject] = React.useState(false)
  const dragCounter = React.useRef(0)

  const isControlled = controlledFiles !== undefined
  const files = isControlled ? controlledFiles : internalFiles

  const updateFiles = React.useCallback(
    (newFiles: FileUploadFile[]) => {
      if (isControlled) {
        onFilesChange?.(newFiles)
      } else {
        setInternalFiles(newFiles)
      }
    },
    [isControlled, onFilesChange]
  )

  const handleFiles = React.useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return

      const validFiles: File[] = []

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        if (isValidFileType(file, accept)) {
          validFiles.push(file)
        }
      }

      if (validFiles.length === 0) return

      const newFileItems: FileUploadFile[] = validFiles.map((file) => ({
        file,
        state: "uploaded" as const,
        progress: 100,
      }))

      if (multiple) {
        updateFiles([...files, ...newFileItems])
      } else {
        updateFiles(newFileItems.slice(0, 1))
      }

      onFilesAdded?.(validFiles)
    },
    [accept, multiple, files, updateFiles, onFilesAdded]
  )

  const removeFile = React.useCallback(
    (index: number) => {
      updateFiles(files.filter((_, i) => i !== index))
    },
    [files, updateFiles]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    // Reset input so same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (disabled) return

    dragCounter.current++

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true)

      // Check if any file type is rejected
      const items = Array.from(e.dataTransfer.items)
      const hasInvalid = items.some((item) => {
        if (item.kind !== "file") return true
        if (!accept) return false
        // Can't fully validate during drag, just check MIME category
        const type = item.type
        if (!type) return false
        return !isValidFileType({ type, name: "" } as File, accept)
      })

      setIsDragReject(hasInvalid)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    dragCounter.current--

    if (dragCounter.current === 0) {
      setIsDragActive(false)
      setIsDragReject(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    dragCounter.current = 0
    setIsDragActive(false)
    setIsDragReject(false)

    if (disabled) return

    handleFiles(e.dataTransfer.files)
  }

  const openFilePicker = () => {
    if (disabled) return
    inputRef.current?.click()
  }

  return (
    <div
      data-slot="file-upload"
      className={cn("flex flex-col gap-[var(--space-2)]", className)}
    >
      {/* Dropzone is a drop target + click area, keyboard access via the file input */}
      <div
        data-slot="dropzone"
        data-drag-active={isDragActive || undefined}
        data-drag-reject={isDragReject || undefined}
        data-disabled={disabled || undefined}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "flex items-center gap-[var(--space-12)] rounded-[var(--radius-16)] border border-dashed border-border-interactive-default p-[var(--space-12)] transition-colors duration-200",
          !disabled && "cursor-pointer hover:border-border-interactive-hover",
          !disabled && "has-[:focus-visible]:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
          isDragActive && !isDragReject && "border-border-interactive-strong bg-surface-interactive-selected",
          isDragReject && "border-border-feedback-danger bg-surface-feedback-danger-subtle",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onClick={openFilePicker}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          className="sr-only"
        />

        <UploadIcon
          size="m"
          className={cn(
            isDragActive && !isDragReject && "text-actions-primary-default",
            isDragReject && "text-actions-danger-default"
          )}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-4)]">
          <p
            data-slot="label"
            className={cn(
              "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong",
              disabled && "text-content-disabled"
            )}
          >
            {isDragActive
              ? isDragReject
                ? "File type not accepted"
                : "Drop to upload"
              : label}
          </p>
          {hint && (
            <p
              data-slot="hint"
              className={cn(
                "text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-subtle",
                disabled && "text-content-disabled"
              )}
            >
              {hint}
            </p>
          )}
        </div>

        <Button
          type="button"
          variant="secondary"
          size="s"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation()
            openFilePicker()
          }}
        >
          Browse
        </Button>
      </div>

      {files.length > 0 && (
        <div data-slot="file-list" className="flex flex-col gap-[var(--space-2)]">
          {files.map((fileItem, index) => (
            <FileItem
              key={`${fileItem.file.name}-${index}`}
              file={fileItem.file}
              state={fileItem.state}
              progress={fileItem.progress}
              onRemove={() => removeFile(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { FileUpload, FileItem }
export type { FileUploadProps, FileItemProps, FileUploadFile, FileItemState }
