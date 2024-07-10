"use client"

import * as React from "react"
import { useState } from "react"
import { socialMediaConfig } from "#/config/social-media"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/landing-page/icons"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Tabs, TabsContent, TabsList, TabsTrigger, buttonVariants } from "../ui"

export default function SocialMedias() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "nav-toggles social-media w-9 px-0"
          )}
        >
          <Icons.chevronDown className="h-4 w-4" />
          <span className="sr-only">Social Medias</span>
        </div>
      </DialogTrigger>
      <DialogContent className="flex h-[500px] max-w-[90%] flex-col items-center justify-start overflow-y-auto overflow-x-hidden rounded-md px-0 py-5 sm:max-w-[375px]">
        <Tabs defaultValue="vlog" className="">
          <DialogHeader>
            <DialogTitle>
              <TabsList className="absolute left-1 top-1 w-[200px]">
                <TabsTrigger value="vlog">Vlog</TabsTrigger>
                <TabsTrigger value="gaming">Gaming</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
              </TabsList>
            </DialogTitle>
            <DialogDescription className="social_media_container h-auto w-full p-0">
              <TabsContent value="vlog" className="p-0">
                <div className="grid grid-cols-2 justify-stretch gap-3">
                  {socialMediaConfig.platformVlog?.map(
                    (item, index) =>
                      item.href && (
                        <span
                          key={index}
                          className={cn(
                            buttonVariants({
                              variant: "ghost",
                            }),
                            " flex h-[75px] items-center justify-center rounded-md border"
                          )}
                        >
                          {item.title}
                        </span>
                      )
                  )}
                </div>
              </TabsContent>
              <TabsContent value="gaming">
                <div className="grid grid-cols-2 justify-stretch gap-3 ">
                  {socialMediaConfig.platformGaming?.map(
                    (item, index) =>
                      item.href && (
                        <span
                          key={index}
                          className={cn(
                            buttonVariants({
                              variant: "ghost",
                            }),
                            " flex h-[75px] items-center justify-center rounded-md border"
                          )}
                        >
                          {item.title}
                        </span>
                      )
                  )}
                </div>
              </TabsContent>
              <TabsContent value="react">
                <div className="grid grid-cols-2 justify-stretch gap-3 ">
                  {socialMediaConfig.platformReact?.map(
                    (item, index) =>
                      item.href && (
                        <span
                          key={index}
                          className={cn(
                            buttonVariants({
                              variant: "ghost",
                            }),
                            " flex h-[75px] items-center justify-center rounded-md border"
                          )}
                        >
                          {item.title}
                        </span>
                      )
                  )}
                </div>
              </TabsContent>
            </DialogDescription>
          </DialogHeader>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
