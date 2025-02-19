"use client"

import * as React from "react"
import { Provider as JotaiProvider } from "jotai"
import { ThemeProvider as NextThemesProvider } from "next-themes"

import { TooltipProvider } from "@/components/ui/tooltip"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <JotaiProvider>
      <NextThemesProvider {...props}>
        <TooltipProvider delayDuration={0}>
          {children as React.ReactNode}
        </TooltipProvider>
      </NextThemesProvider>
    </JotaiProvider>
  )
}
