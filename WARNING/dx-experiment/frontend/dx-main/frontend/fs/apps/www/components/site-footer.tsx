"use client"
import { siteConfig } from "@/config/site"
import { Button } from "@/registry/default/ui/button"
import { Input } from "@/registry/default/ui/input"
import { Monitor } from "lucide-react"
import { MoonIcon, SunIcon, UnderlineIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { ToggleGroup, ToggleGroupItem } from "@/registry/default/ui/toggle-group"

export function SiteFooter() {
  const { setTheme } = useTheme()

  return (
    <footer className="flex min-h-[300px] w-full items-center justify-center border-t py-10">
      <div className="w-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 place-content-center gap-8 md:grid-cols-3 xl:grid-cols-5 ">
          <div className="space-y-3">
            <a className="font-semidark text-xl" href="#">
              Hang With Us.
            </a>
            <div className="mx-auto mt-3 flex space-x-3">
              <Input
                type="email"
                placeholder="Enter you email"
                className="w-[185px]"
              />
              <Button variant="default">Join</Button>
            </div>
            <div className="text-start text-[0.8rem]">
              ©ManOfExistence 2024 All rights reserved.
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">About us</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Our resources
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Term & conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium">Developer</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Api
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Status
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Readme
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Wiki
                </a>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-medium">Follow us</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Linkedin
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Reddit
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-md">Preferences</span>
            <div className="flex w-min flex-row items-start justify-start space-x-1 rounded-full border p-1">
              {/* <Monitor className="" onClick={() => setTheme("system")} />
              <SunIcon className="" onClick={() => setTheme("light")} />
              <MoonIcon className="" onClick={() => setTheme("dark")} /> */}
              <ToggleGroup type="single">
                <ToggleGroupItem onClick={() => setTheme("dark")} className="rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]" value="dark" aria-label="Toggle dark">
                  <MoonIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem onClick={() => setTheme("light")} className="rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]" value="light" aria-label="Toggle light">
                  <SunIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem onClick={() => setTheme("system")} className="rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]" value="system" aria-label="Toggle system">
                  <Monitor className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}
