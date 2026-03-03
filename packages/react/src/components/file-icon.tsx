"use client"

import * as React from "react"
import Image from "next/image"
import { RiUploadCloud2Line } from "@soft-ui/icons"
import { cn } from "../lib/utils"

// ============================================================================
// Types
// ============================================================================

type FileType = "doc" | "spreadsheet" | "pdf" | "slides" | "audio" | "image" | "generic" | "custom"
type FileIconSize = "s" | "m" | "l"
type DecorativeColor =
  | "red" | "orange" | "amber" | "yellow" | "lime" | "green"
  | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo"
  | "violet" | "purple" | "fuchsia" | "pink" | "rose"

type FileIconProps = {
  className?: string
  fileType?: FileType
  size?: FileIconSize
  /** Custom color for fileType="custom" */
  color?: DecorativeColor
  /** Image source for fileType="image" - displays actual image thumbnail */
  src?: string
}

// ============================================================================
// Size Configuration
// ============================================================================

const sizeClasses = {
  s: "size-[var(--space-32)] rounded-[var(--radius-6)]",
  m: "size-[calc(var(--space-32)+var(--space-12))] rounded-[var(--radius-8)]",
  l: "size-[var(--space-56)] rounded-[var(--radius-10)]",
}

const imagePixelSizes = {
  s: 32,
  m: 44,
  l: 56,
} as const

// ============================================================================
// SVG Icons
// ============================================================================

function DocIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <g clipPath="url(#doc-clip)">
        <rect width="44" height="44" fill="#3B82F6" />
        <g filter="url(#doc-shadow)">
          <path d="M8 12C8 9.79086 9.79086 8 12 8H44V44H8V12Z" fill="white" />
        </g>
        <path d="M14 15C14 14.4477 14.4477 14 15 14H25C25.5523 14 26 14.4477 26 15V16C26 16.5523 25.5523 17 25 17H15C14.4477 17 14 16.5523 14 16V15Z" fill="black" fillOpacity="0.1" />
        <path d="M14 20C14 19.4477 14.4477 19 15 19H25C25.5523 19 26 19.4477 26 20V21C26 21.5523 25.5523 22 25 22H15C14.4477 22 14 21.5523 14 21V20Z" fill="black" fillOpacity="0.06" />
        <path d="M14 27C14 26.4477 14.4477 26 15 26H39C39.5523 26 40 26.4477 40 27V28C40 28.5523 39.5523 29 39 29H15C14.4477 29 14 28.5523 14 28V27Z" fill="black" fillOpacity="0.1" />
        <path d="M14 32C14 31.4477 14.4477 31 15 31H39C39.5523 31 40 31.4477 40 32V33C40 33.5523 39.5523 34 39 34H15C14.4477 34 14 33.5523 14 33V32Z" fill="black" fillOpacity="0.06" />
      </g>
      <defs>
        <filter id="doc-shadow" x="3" y="5" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
        </filter>
        <clipPath id="doc-clip">
          <rect width="44" height="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function SpreadsheetIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <g clipPath="url(#spreadsheet-clip)">
        <rect width="44" height="44" fill="#10B981" />
        <g filter="url(#spreadsheet-shadow)">
          <path d="M8 12C8 9.79086 9.79086 8 12 8H44V44H8V12Z" fill="white" />
        </g>
        <path d="M8 19.5H44M19.5 8V44M8 31.5H44" stroke="black" strokeOpacity="0.1" />
      </g>
      <defs>
        <filter id="spreadsheet-shadow" x="3" y="5" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
        </filter>
        <clipPath id="spreadsheet-clip">
          <rect width="44" height="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <g clipPath="url(#pdf-clip)">
        <rect width="44" height="44" fill="#EF4444" />
        <g filter="url(#pdf-shadow)">
          <path d="M8 12C8 9.79086 9.79086 8 12 8H44V44H8V12Z" fill="white" />
        </g>
        <path d="M14 27C14 26.4477 14.4477 26 15 26H39C39.5523 26 40 26.4477 40 27V28C40 28.5523 39.5523 29 39 29H15C14.4477 29 14 28.5523 14 28V27Z" fill="black" fillOpacity="0.1" />
        <path d="M14 32C14 31.4477 14.4477 31 15 31H39C39.5523 31 40 31.4477 40 32V33C40 33.5523 39.5523 34 39 34H15C14.4477 34 14 33.5523 14 33V32Z" fill="black" fillOpacity="0.06" />
        <path d="M14 15C14 14.4477 14.4477 14 15 14H25C25.5523 14 26 14.4477 26 15V16C26 16.5523 25.5523 17 25 17H15C14.4477 17 14 16.5523 14 16V15Z" fill="black" fillOpacity="0.1" />
        <path d="M14 20C14 19.4477 14.4477 19 15 19H25C25.5523 19 26 19.4477 26 20V21C26 21.5523 25.5523 22 25 22H15C14.4477 22 14 21.5523 14 21V20Z" fill="black" fillOpacity="0.06" />
      </g>
      <defs>
        <filter id="pdf-shadow" x="3" y="5" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <clipPath id="pdf-clip">
          <rect width="44" height="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function SlidesIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <g clipPath="url(#slides-clip)">
        <rect width="44" height="44" fill="#FF6900" />
        <g filter="url(#slides-shadow)">
          <path d="M8 12C8 9.79086 9.79086 8 12 8H44V44H8V12Z" fill="white" />
        </g>
        <path d="M29 19C29 18.4477 29.4477 18 30 18H40C40.5523 18 41 18.4477 41 19V20C41 20.5523 40.5523 21 40 21H30C29.4477 21 29 20.5523 29 20V19Z" fill="black" fillOpacity="0.1" />
        <path d="M29 24C29 23.4477 29.4477 23 30 23H35C35.5523 23 36 23.4477 36 24V25C36 25.5523 35.5523 26 35 26H30C29.4477 26 29 25.5523 29 25V24Z" fill="black" fillOpacity="0.06" />
        <path d="M21.5 25V30.4753H26.9753C26.7244 33.002 24.5926 34.9753 22 34.9753C19.2386 34.9753 17 32.7368 17 29.9753C17 27.3826 18.9733 25.2509 21.5 25ZM22.5 25C24.8622 25.2345 26.7408 27.1131 26.9753 29.4753H22.5V25Z" fill="black" fillOpacity="0.12" />
        <path d="M44 14H16.9032C15.2998 14 14 15.3431 14 17V35C14 36.6569 15.2998 38 16.9032 38H44" stroke="black" strokeOpacity="0.1" />
      </g>
      <defs>
        <filter id="slides-shadow" x="3" y="5" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <clipPath id="slides-clip">
          <rect width="44" height="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function AudioIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <g clipPath="url(#audio-clip)">
        <rect width="44" height="44" fill="#F43F5E" />
        <g filter="url(#audio-shadow)">
          <path d="M8 12C8 9.79086 9.79086 8 12 8H44V44H8V12Z" fill="white" />
        </g>
        <path d="M16 32C15.4477 32 15 31.5523 15 31L15 21C15 20.4477 15.4477 20 16 20C16.5523 20 17 20.4477 17 21L17 31C17 31.5523 16.5523 32 16 32Z" fill="black" fillOpacity="0.1" />
        <path d="M20 29.5C19.4477 29.5 19 29.0523 19 28.5L19 23.5C19 22.9477 19.4477 22.5 20 22.5C20.5523 22.5 21 22.9477 21 23.5V28.5C21 29.0523 20.5523 29.5 20 29.5Z" fill="black" fillOpacity="0.1" />
        <path d="M24 35C23.4477 35 23 34.5523 23 34L23 18C23 17.4477 23.4477 17 24 17C24.5523 17 25 17.4477 25 18L25 34C25 34.5523 24.5523 35 24 35Z" fill="black" fillOpacity="0.1" />
        <path d="M28 33C27.4477 33 27 32.5523 27 32L27 20C27 19.4477 27.4477 19 28 19C28.5523 19 29 19.4477 29 20L29 32C29 32.5523 28.5523 33 28 33Z" fill="black" fillOpacity="0.1" />
        <path d="M32 28C31.4477 28 31 27.5523 31 27V25C31 24.4477 31.4477 24 32 24C32.5523 24 33 24.4477 33 25V27C33 27.5523 32.5523 28 32 28Z" fill="black" fillOpacity="0.1" />
        <path d="M36 27C35.4477 27 35 26.5523 35 26C35 25.4477 35.4477 25 36 25C36.5523 25 37 25.4477 37 26C37 26.5523 36.5523 27 36 27Z" fill="black" fillOpacity="0.1" />
      </g>
      <defs>
        <filter id="audio-shadow" x="3" y="5" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <clipPath id="audio-clip">
          <rect width="44" height="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <rect width="44" height="44" fill="#84CC16" />
      <g clipPath="url(#image-clip)">
        <g filter="url(#image-shadow)">
          <path d="M8 12C8 9.79086 9.79086 8 12 8H44V44H8V12Z" fill="white" />
        </g>
        <circle cx="19.5" cy="19.5" r="4.5" fill="black" fillOpacity="0.14" />
        <path d="M36 22L8 44H43.5V30L36 22Z" fill="black" fillOpacity="0.06" />
      </g>
      <defs>
        <filter id="image-shadow" x="3" y="5" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <clipPath id="image-clip">
          <rect width="36" height="36" fill="white" transform="translate(8 8)" />
        </clipPath>
      </defs>
    </svg>
  )
}

function GenericIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <g clipPath="url(#generic-clip)">
        <rect width="44" height="44" fill="#404040" />
        <g filter="url(#generic-shadow)">
          <path d="M8 12C8 9.79086 9.79086 8 12 8H44V44H8V12Z" fill="white" />
        </g>
        <path d="M14 15C14 14.4477 14.4477 14 15 14H25C25.5523 14 26 14.4477 26 15V16C26 16.5523 25.5523 17 25 17H15C14.4477 17 14 16.5523 14 16V15Z" fill="black" fillOpacity="0.1" />
        <path d="M14 20C14 19.4477 14.4477 19 15 19H25C25.5523 19 26 19.4477 26 20V21C26 21.5523 25.5523 22 25 22H15C14.4477 22 14 21.5523 14 21V20Z" fill="black" fillOpacity="0.06" />
        <path d="M14 27C14 26.4477 14.4477 26 15 26H39C39.5523 26 40 26.4477 40 27V28C40 28.5523 39.5523 29 39 29H15C14.4477 29 14 28.5523 14 28V27Z" fill="black" fillOpacity="0.1" />
        <path d="M14 32C14 31.4477 14.4477 31 15 31H39C39.5523 31 40 31.4477 40 32V33C40 33.5523 39.5523 34 39 34H15C14.4477 34 14 33.5523 14 33V32Z" fill="black" fillOpacity="0.06" />
      </g>
      <defs>
        <filter id="generic-shadow" x="3" y="5" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <clipPath id="generic-clip">
          <rect width="44" height="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

const decorativeColorMap: Record<DecorativeColor, string> = {
  red: "rgb(var(--surface-decorative-red-strong))",
  orange: "rgb(var(--surface-decorative-orange-strong))",
  amber: "rgb(var(--surface-decorative-amber-strong))",
  yellow: "rgb(var(--surface-decorative-yellow-strong))",
  lime: "rgb(var(--surface-decorative-lime-strong))",
  green: "rgb(var(--surface-decorative-green-strong))",
  emerald: "rgb(var(--surface-decorative-emerald-strong))",
  teal: "rgb(var(--surface-decorative-teal-strong))",
  cyan: "rgb(var(--surface-decorative-cyan-strong))",
  sky: "rgb(var(--surface-decorative-sky-strong))",
  blue: "rgb(var(--surface-decorative-blue-strong))",
  indigo: "rgb(var(--surface-decorative-indigo-strong))",
  violet: "rgb(var(--surface-decorative-violet-strong))",
  purple: "rgb(var(--surface-decorative-purple-strong))",
  fuchsia: "rgb(var(--surface-decorative-fuchsia-strong))",
  pink: "rgb(var(--surface-decorative-pink-strong))",
  rose: "rgb(var(--surface-decorative-rose-strong))",
}

function CustomIcon({ color }: { color: DecorativeColor }) {
  const fillColor = decorativeColorMap[color]

  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <g clipPath="url(#custom-clip)">
        <rect width="44" height="44" fill={fillColor} />
        <g filter="url(#custom-shadow)">
          <path d="M8 12C8 9.79086 9.79086 8 12 8H44V44H8V12Z" fill="white" />
        </g>
        <path d="M14 15C14 14.4477 14.4477 14 15 14H25C25.5523 14 26 14.4477 26 15V16C26 16.5523 25.5523 17 25 17H15C14.4477 17 14 16.5523 14 16V15Z" fill="black" fillOpacity="0.1" />
        <path d="M14 20C14 19.4477 14.4477 19 15 19H25C25.5523 19 26 19.4477 26 20V21C26 21.5523 25.5523 22 25 22H15C14.4477 22 14 21.5523 14 21V20Z" fill="black" fillOpacity="0.06" />
        <path d="M14 27C14 26.4477 14.4477 26 15 26H39C39.5523 26 40 26.4477 40 27V28C40 28.5523 39.5523 29 39 29H15C14.4477 29 14 28.5523 14 28V27Z" fill="black" fillOpacity="0.1" />
        <path d="M14 32C14 31.4477 14.4477 31 15 31H39C39.5523 31 40 31.4477 40 32V33C40 33.5523 39.5523 34 39 34H15C14.4477 34 14 33.5523 14 33V32Z" fill="black" fillOpacity="0.06" />
      </g>
      <defs>
        <filter id="custom-shadow" x="3" y="5" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <clipPath id="custom-clip">
          <rect width="44" height="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

// ============================================================================
// Extension Mapping
// ============================================================================

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
    // Images
    jpg: "image",
    jpeg: "image",
    png: "image",
    gif: "image",
    webp: "image",
    svg: "image",
    bmp: "image",
    ico: "image",
  }

  return extensionMap[ext] || "generic"
}

// ============================================================================
// FileIcon Component
// ============================================================================

function FileIcon({ className, fileType = "generic", size = "m", color = "lime", src }: FileIconProps) {
  // If src is provided for image type, show actual image thumbnail
  if (fileType === "image" && src) {
    return (
      <div
        data-slot="file-icon"
        data-file-type={fileType}
        data-size={size}
        className={cn("shrink-0 overflow-hidden", sizeClasses[size], className)}
      >
        <Image
          src={src}
          alt=""
          className="size-full object-cover"
          width={imagePixelSizes[size]}
          height={imagePixelSizes[size]}
          unoptimized
        />
      </div>
    )
  }

  const IconComponent = {
    doc: DocIcon,
    spreadsheet: SpreadsheetIcon,
    pdf: PdfIcon,
    slides: SlidesIcon,
    audio: AudioIcon,
    image: ImageIcon,
    generic: GenericIcon,
    custom: () => <CustomIcon color={color} />,
  }[fileType]

  return (
    <div
      data-slot="file-icon"
      data-file-type={fileType}
      data-size={size}
      className={cn("shrink-0 overflow-hidden", sizeClasses[size], className)}
    >
      <IconComponent />
    </div>
  )
}

// ============================================================================
// UploadIcon Component
// ============================================================================

type UploadIconProps = {
  className?: string
  size?: FileIconSize
}

const uploadIconSizeClasses = {
  s: "size-[var(--space-16)]",
  m: "size-[var(--space-20)]",
  l: "size-[var(--space-24)]",
}

function UploadIcon({ className, size = "m" }: UploadIconProps) {
  return (
    <div
      data-slot="upload-icon"
      className={cn(
        "flex shrink-0 items-center justify-center bg-surface-interactive-default text-content-subtle",
        sizeClasses[size],
        className
      )}
    >
      <RiUploadCloud2Line className={uploadIconSizeClasses[size]} />
    </div>
  )
}

export { FileIcon, UploadIcon, getFileTypeFromExtension }
export type { FileIconProps, UploadIconProps, FileType, DecorativeColor }
