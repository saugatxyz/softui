"use client"

import * as React from "react"
import { highlight } from "sugar-high"

import { Button } from "@/components/ui/button"
import { CheckCircleIcon } from "@/icons"
import { cn } from "@/lib/utils"

type CodeBlockProps = {
  code: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [showTopFade, setShowTopFade] = React.useState(false)
  const [showBottomFade, setShowBottomFade] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
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

  React.useEffect(() => {
    const element = scrollRef.current
    if (!element) return
    const update = () => {
      const hasOverflow = element.scrollHeight - element.clientHeight > 1
      const isAtTop = element.scrollTop <= 0
      const isAtBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight - 1
      setShowTopFade(hasOverflow && !isAtTop)
      setShowBottomFade(hasOverflow && !isAtBottom)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    element.addEventListener("scroll", update)
    return () => {
      observer.disconnect()
      element.removeEventListener("scroll", update)
    }
  }, [normalized, highlightedLines.length])

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
    <div className="code-block-surface relative flex flex-col rounded-[var(--radius-12)] backdrop-blur-[6px]">
      <Button
        type="button"
        size="xs"
        variant="tertiary"
        onClick={handleCopy}
        className={cn(
          "absolute right-[var(--space-12)] top-[var(--space-12)] z-20 hidden md:inline-flex pointer-events-auto",
          frostedClass
        )}
        leadingIcon={copied ? <CheckCircleIcon /> : undefined}
      >
        {copied ? "Copied" : "Copy"}
      </Button>
      <Button
        type="button"
        size="xs"
        variant="tertiary"
        onClick={handleCopy}
        className={cn(
          "absolute bottom-[var(--space-12)] right-[var(--space-12)] z-20 inline-flex pointer-events-auto md:hidden",
          frostedClass
        )}
        leadingIcon={copied ? <CheckCircleIcon /> : undefined}
      >
        {copied ? "Copied" : "Copy"}
      </Button>
      <div
        ref={scrollRef}
        className={cn(
          "code-block-scroll relative z-0 max-h-[320px] overflow-auto px-[var(--space-16)] py-[var(--space-16)]",
          showTopFade && showBottomFade
            ? "code-block-mask-both"
            : showTopFade
              ? "code-block-mask-top"
              : showBottomFade
                ? "code-block-mask-bottom"
                : ""
        )}
      >
        <div className="grid grid-cols-[auto_1fr] gap-[var(--space-12)]">
          <div className="select-none text-mono-s text-content-muted">
            {highlightedLines.map((_, index) => (
              <span
                key={`line-${index}`}
                className="block text-right leading-[var(--line-height-s)]"
              >
                {index}
              </span>
            ))}
          </div>
          <pre className="sh__code text-mono-s text-content-strong whitespace-pre">
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
  )
}
