import "./globals.css"
import Script from "next/script"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster as DefaultToaster } from "@/registry/default/ui/toaster"
import { Toaster as NewYorkSonner } from "@/registry/new-york/ui/sonner"
import { Toaster as NewYorkToaster } from "@/registry/new-york/ui/toaster"
import { Nextui } from "./nextui"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <body className="">
          <Nextui>
            {/* <SiteHeader /> */}
            <div>{children}</div>
            {/* <SiteFooter /> */}
            <Toaster />
            <NewYorkToaster />
            <DefaultToaster />
            <NewYorkSonner />
          </Nextui>
        </body>

      </ThemeProvider>
      {/* 
        const { theme } = useTheme()
  const isDarkMode = theme === "dark"
        <ClerkProvider
          appearance={{
            baseTheme: isDarkMode ? dark : undefined,
            variables: {
              colorPrimary: "hsl(263.4, 70%, 50.4%)", // change this value (you can get it from you're css variables, make sure to include 'hsl' and commas)
            },
          }}
        >

        </ClerkProvider>
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" /> */}
    </html>
  )
}
