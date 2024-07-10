"use client"

import React, { useRef } from "react"
import { CommandMenu } from "./command-menu"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import SocialMedias from "./social-media-account"
import { Avatar, AvatarFallback, AvatarImage } from "../ui"
import Auth from "../dx-ui/auth"

export function Navbar() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <header className="blurred_container sticky top-0 z-50 border-b md:mr-10 py-[5.5px]">
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 lg:justify-end">
          <Avatar ref={ref} className="lg:hidden">
            <AvatarImage src="/logo.svg" alt="@beingofexistence" />
            <AvatarFallback>DX</AvatarFallback>
          </Avatar>
          <div className="w-full flex-1 lg:w-auto lg:flex-none ">
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            <SocialMedias />
            {/* <ModeToggle /> */}
            {/* <Auth /> */}
          </nav>
        </div>
      </div>
    </header>
  )
}
