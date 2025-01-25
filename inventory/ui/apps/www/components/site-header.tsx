import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { EyeCatchingButton_v1 } from "@/components/eye-catching-buttons"
import { Play } from "lucide-react"
import { ModeSwitcher } from "./mode-switcher"

export function SiteHeader() {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <div className="container flex h-14 max-w-screen-xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <ModeSwitcher />
            <Link target="_blank" href={"https://www.upwork.com/freelancers/~01221bf135ed62b3b3"}>
              <EyeCatchingButton_v1 className="text-sm">
                <Play className="mr-1 h-4 w-4" />
                Start a Project
              </EyeCatchingButton_v1>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
