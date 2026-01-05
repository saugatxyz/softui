"use client"

import * as React from "react"
import { motion } from "motion/react"
import { highlight } from "sugar-high"

import { Button } from "@/components/ui/button"
import { CheckCircleIcon, CopyIcon } from "@/icons"
import { cn } from "@/lib/utils"

function CopyButtonIcon({ copied }: { copied: boolean }) {
  return (
    <span className="relative flex size-4 items-center justify-center overflow-hidden">
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          y: copied ? -8 : 0,
          scale: copied ? 0.5 : 1,
          opacity: copied ? 0 : 1,
          filter: copied ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.25 }}
      >
        <CopyIcon className="size-4" />
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-content-feedback-success-strong"
        animate={{
          y: copied ? 0 : 8,
          scale: copied ? 1 : 0.5,
          opacity: copied ? 1 : 0,
          filter: copied ? "blur(0px)" : "blur(8px)",
        }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.25 }}
      >
        <CheckCircleIcon className="size-4" />
      </motion.span>
    </span>
  )
}

function CopyButton({
  copied,
  onClick,
  className,
  buttonClassName,
}: {
  copied: boolean
  onClick: () => void
  className?: string
  buttonClassName?: string
}) {
  return (
    <div className={className}>
      <Button
        type="button"
        size="xs"
        variant="tertiary"
        onClick={onClick}
        className={cn("pointer-events-auto", buttonClassName)}
        leadingIcon={<CopyButtonIcon copied={copied} />}
      >
        <motion.span
          className="inline-block whitespace-nowrap"
          initial={false}
          animate={{ width: copied ? 46 : 32 }}
          transition={{ type: "spring", bounce: 0.15, duration: 0.25 }}
        >
          {copied ? "Copied" : "Copy"}
        </motion.span>
      </Button>
    </div>
  )
}

type CodeBlockProps = {
  code: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [showTopFade, setShowTopFade] = React.useState(false)
  const [showBottomFade, setShowBottomFade] = React.useState(false)
  const [showLeftFade, setShowLeftFade] = React.useState(false)
  const [lineNumbersWidth, setLineNumbersWidth] = React.useState(0)
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null)
  const codeScrollRef = React.useRef<HTMLDivElement | null>(null)
  const lineNumbersRef = React.useRef<HTMLDivElement | null>(null)
  const frostedClass =
    "backdrop-blur-[12px] !bg-[color:color-mix(in_srgb,_rgb(var(--actions-tertiary-default))_88%,_transparent)] !hover:bg-[color:color-mix(in_srgb,_rgb(var(--actions-tertiary-hover))_88%,_transparent)]"
  const normalized = React.useMemo(
    () =>
      code
        .replace(/\r\n/g, "\n")
        .replace(/^\s*\n+/, "")
        .replace(/\n+\s*$/, "")
        .replace(/\n[ \t]+\n/g, "\n\n")
        .replace(/\n{2,}/g, "\n\n"),
    [code]
  )
  const highlightedLines = React.useMemo(() => {
    const html = highlight(normalized).replace(/\n$/, "")
    return html.split("\n").map((line) =>
      line
        .replace(/^<span class="sh__line">/, "")
        .replace(/<\/span>$/, "")
    )
  }, [normalized])

  React.useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), 1500)
    return () => window.clearTimeout(timeout)
  }, [copied])

  const updateVerticalFade = React.useCallback((element: HTMLElement) => {
    const hasVerticalOverflow = element.scrollHeight - element.clientHeight > 1
    const isAtTop = element.scrollTop <= 0
    const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1
    setShowTopFade(hasVerticalOverflow && !isAtTop)
    setShowBottomFade(hasVerticalOverflow && !isAtBottom)
  }, [])

  React.useEffect(() => {
    const scrollEl = scrollContainerRef.current
    if (!scrollEl) return
    updateVerticalFade(scrollEl)
    const observer = new ResizeObserver(() => {
      if (scrollEl) updateVerticalFade(scrollEl)
    })
    observer.observe(scrollEl)
    return () => observer.disconnect()
  }, [highlightedLines.length, updateVerticalFade])

  React.useEffect(() => {
    const lineNumEl = lineNumbersRef.current
    if (!lineNumEl) return
    const updateWidth = () => setLineNumbersWidth(lineNumEl.offsetWidth)
    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(lineNumEl)
    return () => observer.disconnect()
  }, [highlightedLines.length])

  const handleCopy = async () => {
    const text = normalized
    if (navigator?.clipboard?.writeText && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        return
      } catch {
        // Fallback to legacy copy path below.
      }
    }
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.setAttribute("readonly", "")
    textarea.style.position = "fixed"
    textarea.style.top = "-9999px"
    textarea.style.opacity = "0"
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    textarea.setSelectionRange(0, textarea.value.length)
    const success = document.execCommand("copy")
    document.body.removeChild(textarea)
    if (success) {
      setCopied(true)
    }
  }

  return (
    <div className="code-block-surface relative flex flex-col rounded-[var(--radius-12)]">
      <CopyButton
        copied={copied}
        onClick={handleCopy}
        className="absolute right-[var(--space-12)] top-[var(--space-12)] z-20 hidden md:block"
      />
      <CopyButton
        copied={copied}
        onClick={handleCopy}
        className="absolute bottom-[var(--space-12)] right-[var(--space-12)] z-20 block md:hidden"
        buttonClassName={frostedClass}
      />
      <div
        className="absolute top-0 bottom-0 z-10 w-px bg-border-muted"
        style={{ left: lineNumbersWidth }}
      />
      <div
        ref={scrollContainerRef}
        className={cn(
          "code-block-scroll max-h-[320px] overflow-y-auto",
          showTopFade && showBottomFade
            ? "code-block-mask-both"
            : showTopFade
              ? "code-block-mask-top"
              : showBottomFade
                ? "code-block-mask-bottom"
                : ""
        )}
        onScroll={(e) => updateVerticalFade(e.currentTarget)}
      >
        <div className="grid grid-cols-[auto_1fr]">
          <div
            ref={lineNumbersRef}
            className="select-none py-[var(--space-16)] pl-[var(--space-16)] pr-[var(--space-12)] text-content-muted"
          >
            {highlightedLines.map((_, index) => (
              <span
                key={`line-${index}`}
                className="text-mono-s block text-right"
              >
                {index}
              </span>
            ))}
          </div>
          <div
            ref={codeScrollRef}
            className={cn(
              "code-block-scroll overflow-x-auto",
              showLeftFade && "code-block-mask-left"
            )}
            onScroll={(e) => setShowLeftFade(e.currentTarget.scrollLeft > 0)}
          >
            <pre className="sh__code px-[var(--space-16)] py-[var(--space-16)] text-mono-s text-content-strong whitespace-pre">
              <code>
                {highlightedLines.map((line, index) => (
                  <span
                    key={`code-line-${index}`}
                    className="sh__line"
                    dangerouslySetInnerHTML={{
                      __html: line.length > 0 ? line : "&nbsp;",
                    }}
                  />
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
