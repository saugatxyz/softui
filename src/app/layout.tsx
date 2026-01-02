import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { designSystemConfig } from "@/design-system/config"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Soft UI",
  description: "Soft UI design system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-mode={designSystemConfig.defaultMode}
      data-scheme={designSystemConfig.defaultScheme}
      data-theme-color={designSystemConfig.defaultThemeColor}
      data-base-color={designSystemConfig.defaultBaseColor}
    >
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
