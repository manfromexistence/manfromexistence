"use client"

import { MoonIcon, SunIcon, UnderlineIcon } from "@radix-ui/react-icons"
import { Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { siteConfig } from "@/config/site"
import { Button } from "@/registry/default/ui/button"
import { Input } from "@/registry/default/ui/input"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group"

export function SiteFooter() {
  const { setTheme } = useTheme()

  return (
    <footer className="flex min-h-[300px] w-full items-center justify-center border-t pt-10 pb-16">
      <div className="w-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 place-content-center gap-5 md:grid-cols-3 xl:grid-cols-6 max-w-[1200px]">
          <div className="space-y-3">
            <a className="font-semidark text-xl" href="#">
              Get all updates.
            </a>
            <div className="mx-auto mt-3 flex flex-col space-y-3">
              <Input
                type="email"
                placeholder="Enter you email"
                className="w-[185px]"
              />
              <Button variant="default">Suscribe</Button>
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
                  Our technologies
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Recommendation
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Discussions
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Report & Vulnerebility
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
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Customers
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Brand
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Croudfund
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Resource</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Community
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
                  Dpa
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
              <span className="text-md">Preferences</span>
              <div className="flex w-min flex-row items-start justify-start space-x-1 rounded-full border p-1">
                <ToggleGroup type="single">
                  <ToggleGroupItem
                    onClick={() => setTheme("dark")}
                    className="rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
                    value="dark"
                    aria-label="Toggle dark"
                  >
                    <MoonIcon className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    onClick={() => setTheme("light")}
                    className="rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
                    value="light"
                    aria-label="Toggle light"
                  >
                    <SunIcon className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    onClick={() => setTheme("system")}
                    className="rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
                    value="system"
                    aria-label="Toggle system"
                  >
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
