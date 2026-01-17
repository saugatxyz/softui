"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { IconButton } from "@/components/ui/icon-button"
import { RiMoonLine, RiSunLine } from "@remixicon/react"

export default function AdjustmentTestPage() {
  const [isDark, setIsDark] = React.useState(true)

  React.useEffect(() => {
    document.documentElement.setAttribute("data-mode", isDark ? "dark" : "light")
  }, [isDark])

  return (
    <div className="flex min-h-screen flex-col bg-surface-default">
      <div className="absolute right-4 top-4">
        <IconButton
          variant="secondary"
          onClick={() => setIsDark(!isDark)}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
        </IconButton>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Slider variant="adjustment" defaultValue={50}>
            <Slider.Control>
              <Slider.AdjustmentTrack>
                <Slider.Track>
                  <Slider.Indicator />
                  <Slider.Value />
                  <Slider.Thumb />
                </Slider.Track>
              </Slider.AdjustmentTrack>
            </Slider.Control>
          </Slider>
        </div>
      </div>
    </div>
  )
}
