"use client"

import * as React from "react"
import { useDropzone, type DropzoneOptions, type FileRejection, type DropEvent } from "react-dropzone"
import {
  RiUploadCloud2Line,
  RiCheckboxCircleFill,
  RiLoader2Line,
  RiErrorWarningFill,
  RiDeleteBinLine,
  RiCloseLine,
} from "@remixicon/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FileIcon, getFileTypeFromExtension } from "@/components/ui/file-icon"

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

// ============================================================================
// FileItem Component
// ============================================================================

type FileItemState = "uploaded" | "uploading" | "error" | "warning"

type FileItemProps = {
  file: File
  state?: FileItemState
  progress?: number
  onRemove?: () => void
  className?: string
}

function FileItem({
  file,
  state = "uploaded",
  progress = 0,
  onRemove,
  className,
}: FileItemProps) {
  const fileType = getFileTypeFromExtension(file.name)

  return (
    <div
      data-slot="file-item"
      data-state={state}
      className={cn(
        "relative flex items-center gap-[var(--space-12)] overflow-hidden rounded-[var(--radius-16)] bg-surface-interactive-default p-[var(--space-12)]",
        className
      )}
    >
      {/* Progress background for uploading state */}
      {state === "uploading" && (
        <div
          data-slot="progress"
          className="absolute bottom-0 left-0 top-0 bg-actions-secondary-default transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      )}

      {/* File icon */}
      <FileIcon fileType={fileType} size="m" className="relative z-10" />

      {/* File info */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-[var(--space-4)]">
        <div className="flex items-center gap-[var(--space-8)]">
          <p className="truncate text-body-m-medium text-content-strong">
            {file.name}
          </p>

          {/* Status icon */}
          {state === "uploaded" && (
            <RiCheckboxCircleFill className="size-[18px] shrink-0 text-content-feedback-success-strong" />
          )}
          {state === "uploading" && (
            <RiLoader2Line className="size-[18px] shrink-0 animate-spin text-content-strong" />
          )}
          {state === "error" && (
            <RiErrorWarningFill className="size-[18px] shrink-0 text-content-feedback-danger-strong" />
          )}
          {state === "warning" && (
            <RiErrorWarningFill className="size-[18px] shrink-0 text-content-feedback-warning-strong" />
          )}
        </div>

        {/* Size or progress */}
        {state === "uploading" ? (
          <p className="text-body-xs text-content-subtle">
            {formatFileSize(file.size * (progress / 100))} / {formatFileSize(file.size)}
          </p>
        ) : (
          <p className="text-body-xs text-content-subtle">
            {formatFileSize(file.size)}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="relative z-10 flex items-center gap-[var(--space-4)]">
        {state === "uploaded" ? (
          <>
            <button
              type="button"
              onClick={onRemove}
              className="flex size-[24px] items-center justify-center rounded-[var(--radius-max)] text-content-subtle transition-colors hover:bg-actions-secondary-hover hover:text-content-strong"
            >
              <RiDeleteBinLine className="size-[16px]" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onRemove}
            className="flex size-[24px] items-center justify-center rounded-[var(--radius-max)] text-content-subtle transition-colors hover:bg-actions-secondary-hover hover:text-content-strong"
          >
            <RiCloseLine className="size-[16px]" />
          </button>
        )}
      </div>
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

type FileUploadProps = Omit<DropzoneOptions, "disabled"> & {
  className?: string
  disabled?: boolean
  /** Text shown as the main label */
  label?: string
  /** Hint text shown below the label */
  hint?: string
  /** Controlled files */
  files?: FileUploadFile[]
  /** Callback when files change */
  onFilesChange?: (files: FileUploadFile[]) => void
}

function FileUpload({
  className,
  disabled = false,
  label = "Drag and drop or browse for file",
  hint,
  files: controlledFiles,
  onFilesChange,
  onDrop,
  onDropRejected,
  ...dropzoneOptions
}: FileUploadProps) {
  const [internalFiles, setInternalFiles] = React.useState<FileUploadFile[]>([])

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

  const handleDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[], event: DropEvent) => {
      const newFileItems: FileUploadFile[] = acceptedFiles.map((file) => ({
        file,
        state: "uploaded" as const,
        progress: 100,
      }))

      if (dropzoneOptions.multiple === false) {
        updateFiles(newFileItems.slice(0, 1))
      } else {
        updateFiles([...files, ...newFileItems])
      }
      onDrop?.(acceptedFiles, rejectedFiles, event)
    },
    [dropzoneOptions.multiple, updateFiles, files, onDrop]
  )

  const removeFile = React.useCallback(
    (index: number) => {
      updateFiles(files.filter((_, i) => i !== index))
    },
    [updateFiles, files]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused,
    open,
  } = useDropzone({
    ...dropzoneOptions,
    disabled,
    onDrop: handleDrop,
    onDropRejected,
    noClick: true,
    noKeyboard: true,
  })

  const showFocusRing = isFocused && !isDragActive

  return (
    <div
      data-slot="file-upload"
      className={cn("flex flex-col gap-[var(--space-4)]", className)}
    >
      {/* Dropzone */}
      <div
        {...getRootProps()}
        data-slot="dropzone"
        data-drag-active={isDragActive || undefined}
        data-drag-accept={isDragAccept || undefined}
        data-drag-reject={isDragReject || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          "flex flex-col items-start gap-[var(--space-12)] rounded-[var(--radius-16)] border border-border-interactive-default p-[var(--space-16)] transition-colors duration-200",
          !disabled && "hover:border-actions-primary-default",
          isDragActive && "border-actions-primary-default bg-surface-interactive-selected",
          isDragReject && "border-actions-danger-default bg-surface-feedback-danger-subtle",
          showFocusRing && "shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
          disabled && "cursor-not-allowed border-border-muted opacity-50"
        )}
      >
        <input {...getInputProps()} />

        {/* Icon */}
        <span
          data-slot="icon"
          className={cn(
            "text-content-subtle",
            isDragActive && "text-actions-primary-default",
            isDragReject && "text-actions-danger-default",
            disabled && "text-content-disabled"
          )}
        >
          <RiUploadCloud2Line className="size-[20px]" />
        </span>

        {/* Text content */}
        <div className="flex flex-col gap-[var(--space-20)]">
          <div className="flex flex-col gap-[var(--space-4)]">
            <p
              data-slot="label"
              className={cn(
                "text-body-m-medium",
                disabled ? "text-content-disabled" : "text-content-strong"
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
                  "text-body-xs",
                  disabled ? "text-content-disabled" : "text-content-subtle"
                )}
              >
                {hint}
              </p>
            )}
          </div>

          {/* Browse button */}
          <Button
            type="button"
            variant="tertiary"
            size="s"
            onClick={open}
            disabled={disabled}
            className="w-fit"
          >
            Browse
          </Button>
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div data-slot="file-list" className="flex flex-col gap-[var(--space-4)]">
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
