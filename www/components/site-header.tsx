import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { EyeCatchingButton_v1 } from "./indieui/buttons/eye-catching-buttons"
import { Play } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <Link target="_blank" href={"https://www.upwork.com/freelancers/~01221bf135ed62b3b3"}>
              <EyeCatchingButton_v1 className="text-sm">
                <Play className="h-4 w-4 mr-1" />
                Start a Project
              </EyeCatchingButton_v1>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}