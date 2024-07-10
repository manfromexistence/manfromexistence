"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Icons } from "@/components/example/icons"

import { NavigationMenuDropdown } from "./navigatioin-menu"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex">
      <Link href="/" className="flex items-center space-x-2 pr-2 ">
        <Icons.logo className="navbar-logo-icon h-6 w-6" />

        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="hidden rounded-lg p-2 px-5 font-bold hover:bg-[--code-foreground] sm:inline-block ">
              {siteConfig.name}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="/manofexistence.jpg" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@manofexistence</h4>
                <p className="text-sm">
                  Made by manofexistence and growing with the help of all users.
                </p>
                <div className="flex items-center pt-2">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    Release will occur April 2024.
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Link>

      <NavigationMenuDropdown />
    </div>
  )
}
