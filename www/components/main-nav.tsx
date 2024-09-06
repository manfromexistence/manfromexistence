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
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/home"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/home" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Home
        </Link>
        {/* <Link
          href="/docs/components"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/components") &&
              !pathname?.startsWith("/docs/component/chart")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Components
        </Link>
        <Link
          href="/blocks"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/blocks")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Blocks
        </Link> */}
        <Link
          href="/about"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/component/chart") ||
              pathname?.startsWith("/about")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          About
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
          href="/writings"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/writings")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Writings
        </Link>
        <Link
          href="/advice"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/advice")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Advices
        </Link>
      </nav>
    </div>
  )
}
