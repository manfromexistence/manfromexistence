"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function MainNav() {
  const pathname = usePathname()
  return (
    <div className="mr-4 hidden md:flex">
      {/* <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link> */}
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Home
        </Link>
        <Link
          href="/thoughts"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/thoughts")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Thoughts
        </Link>
        <Link
          href="/works"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/works")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Works
        </Link>
        <Link
          href="/lists"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/lists")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Lists
        </Link>
        <Link
          href="/gaming"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/gaming")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Gaming
        </Link>
      </nav>
    </div>
  )
}
