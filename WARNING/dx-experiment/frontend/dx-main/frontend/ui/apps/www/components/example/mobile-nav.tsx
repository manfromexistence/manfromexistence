"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
// import { docsConfig } from "@/config/docs"
// import { more, products } from "@/config/navbar"
// import { siteConfig } from "@/config/site"
// import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { more, products } from "@/config/navbar"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/example/icons"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Avatar, AvatarFallback, AvatarImage, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  function logoLetter(title: string): string {
    let text = title
    let firstLetter = text.charAt(0).toUpperCase()
    let lastLetter = text.charAt(text.length - 1).toUpperCase()
    let result = firstLetter + lastLetter
    return result
  }

  function transformString(str: string): string {
    return str.replace(/\b(\w)(\w*)\b/g, (match, firstLetter, restOfWord) => {
      let titleName = firstLetter.toUpperCase() + restOfWord.toLowerCase()
      return titleName
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="nav-toggles h-24 px-2 py-5 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>

          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sheetLeft m-0 p-0">
        <MobileLink
          href="/"
          className="mx-8 mt-5 flex items-center justify-center rounded-md border p-10 py-1 hover:bg-[--code-foreground]"
          onOpenChange={setOpen}
        >
          <Avatar className="font-bold">
            <AvatarImage src="/manofexistence.jpg" alt="@manofexistence" />
            <AvatarFallback>DX</AvatarFallback>
          </Avatar>
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>

        <ScrollArea className="mobile-scroll mt-2 h-[100vh] px-8 pb-0 ">
          <Accordion type="multiple" className="w-full">
            {/* Products */}
            <div className="flex flex-col space-y-3">
              <AccordionItem value="products">
                <AccordionTrigger>All Products</AccordionTrigger>
                <AccordionContent className="w-full ">
                  {products.map(
                    (item, index) =>
                      item.href && (
                        <div
                          key={index}
                          className="flex h-12 w-full flex-row items-center justify-between"
                        >
                          <div className="products-logo">
                            <div className="items-logo-container rainbow-text flex h-[32.5px] w-[32.5px] items-center justify-center rounded-full border text-center text-[12.5px] ">
                              <div className="item-logo-fallback">
                                {item.title ? logoLetter(item.title) : "Dx"}
                              </div>
                            </div>
                          </div>
                          <div className="products-title flex-1 items-center justify-center">
                            <MobileLink
                              key={item.href}
                              href={item.href}
                              onOpenChange={setOpen}
                              className="flex w-full flex-row items-center justify-center"
                            >
                              {item.title}
                            </MobileLink>
                          </div>
                          <div className="products-action flex h-[32.5px] w-[32.5px] items-center justify-center rounded-full border text-center text-[12.5px]">
                            <Icons.moreHorizental className="h-4 w-4" />
                          </div>
                        </div>
                      )
                  )}
                </AccordionContent>
              </AccordionItem>
            </div>

            {/* More */}
            <div className="flex flex-col space-y-3">
              <AccordionItem value="more">
                <AccordionTrigger>More</AccordionTrigger>
                <AccordionContent className="w-full ">
                  {more.map(
                    (item, index) =>
                      item.href && (
                        <div
                          key={index}
                          className="flex h-12 w-full flex-row items-center justify-between"
                        >
                          <div className="products-logo">
                            <div className="items-logo-container rainbow-text flex h-[32.5px] w-[32.5px] items-center justify-center rounded-full border text-center text-[12.5px] ">
                              <div className="item-logo-fallback">
                                {item.title ? logoLetter(item.title) : "Dx"}
                              </div>
                            </div>
                          </div>
                          <div className="products-title flex-1 items-center justify-center">
                            <MobileLink
                              key={item.href}
                              href={item.href}
                              onOpenChange={setOpen}
                              className="flex w-full flex-row items-center justify-center"
                            >
                              {item.title}
                            </MobileLink>
                          </div>
                          <div className="products-action flex h-[32.5px] w-[32.5px] items-center justify-center rounded-full border text-center text-[12.5px]">
                            <Icons.moreHorizental className="h-4 w-4" />
                          </div>
                        </div>
                      )
                  )}
                </AccordionContent>
              </AccordionItem>
            </div>

            {/* Extra NavItem */}
            <div className="flex flex-col space-y-3">
              <AccordionItem value="extra-navitems">
                <AccordionTrigger>Extra NavItems</AccordionTrigger>
                <AccordionContent className="w-full ">
                  {docsConfig.mainNav.map(
                    (item, index) =>
                      item.href && (
                        <div
                          key={index}
                          className="flex h-12 w-full flex-row items-center justify-between"
                        >
                          <div className="products-logo">
                            <div className="items-logo-container rainbow-text flex h-[32.5px] w-[32.5px] items-center justify-center rounded-full border text-center text-[12.5px] ">
                              <div className="item-logo-fallback">
                                {item.title ? logoLetter(item.title) : "Dx"}
                              </div>
                            </div>
                          </div>
                          <div className="products-title flex-1 items-center justify-center">
                            <MobileLink
                              key={item.href}
                              href={item.href}
                              onOpenChange={setOpen}
                              className="flex w-full flex-row items-center justify-center"
                            >
                              {item.title}
                            </MobileLink>
                          </div>
                          <div className="products-action flex h-[32.5px] w-[32.5px] items-center justify-center rounded-full border text-center text-[12.5px]">
                            <Icons.moreHorizental className="h-4 w-4" />
                          </div>
                        </div>
                      )
                  )}
                </AccordionContent>
              </AccordionItem>
            </div>

            {/* Main NavItems */}
            <div className="flex flex-col space-y-3">
              {docsConfig.sidebarNav.map((item, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <AccordionItem value={item.title}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent className="w-full">
                      {item?.items?.length &&
                        item?.items?.map((item: any) => (
                          <React.Fragment key={item.href}>
                            {!item.disabled &&
                              (item.href ? (
                                <div className="flex h-12 w-full flex-row items-center justify-between">
                                  <div className="products-logo">
                                    <div className="items-logo-container rainbow-text flex h-[32.5px] w-[32.5px] items-center justify-center rounded-lg border text-center text-[12.5px] ">
                                      <Avatar className="h-[25px] w-[25px] rounded-sm">
                                        <AvatarImage
                                          src={
                                            item.logo
                                              ? `/docs/${item.title
                                                .replace(/\s/g, "-")
                                                .toLowerCase()}.jpg`
                                              : ""
                                          }
                                          alt="Dx"
                                        />
                                        <AvatarFallback>
                                          {item.title
                                            ? logoLetter(item.title)
                                            : "Dx"}
                                        </AvatarFallback>
                                      </Avatar>
                                    </div>
                                  </div>
                                  <div className="products-title flex-1 items-center justify-center">
                                    <MobileLink
                                      key={item.href}
                                      href={item.href}
                                      onOpenChange={setOpen}
                                      className="flex w-full flex-row items-center justify-center"
                                    >
                                      {transformString(
                                        item.title.replace(/'S/g, "")
                                      )}
                                    </MobileLink>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <div className="main-navitem-action flex h-[32.5px] w-[32.5px] items-center justify-center rounded-full border text-center text-[12.5px]">
                                        <Icons.moreHorizental className="h-4 w-4" />
                                      </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      {item.website_url ? (
                                        <DropdownMenuItem className="flex items-center justify-center">
                                          <Link
                                            key={index}
                                            href={item.website_url}
                                            target={
                                              item.external ? "_blank" : ""
                                            }
                                            rel={
                                              item.external ? "noreferrer" : ""
                                            }
                                          >
                                            Website
                                          </Link>
                                        </DropdownMenuItem>
                                      ) : (
                                        ""
                                      )}

                                      {item.appStore &&
                                        item.playStore &&
                                        item.webStore ? (
                                        <div>
                                          <DropdownMenuItem className="flex items-center justify-center">
                                            <Link
                                              key={index}
                                              href={item.appStore}
                                              target={
                                                item.external ? "_blank" : ""
                                              }
                                              rel={
                                                item.external
                                                  ? "noreferrer"
                                                  : ""
                                              }
                                              className="appStore hover:underline"
                                            >
                                              AppStore
                                            </Link>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="flex items-center justify-center">
                                            <Link
                                              key={index}
                                              href={item.playStore}
                                              target={
                                                item.external ? "_blank" : ""
                                              }
                                              rel={
                                                item.external
                                                  ? "noreferrer"
                                                  : ""
                                              }
                                              className="playStore hover:underline"
                                            >
                                              PlayStore
                                            </Link>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="flex items-center justify-center">
                                            <Link
                                              key={index}
                                              href={item.webStore}
                                              target={
                                                item.external ? "_blank" : ""
                                              }
                                              rel={
                                                item.external
                                                  ? "noreferrer"
                                                  : ""
                                              }
                                              className="webStore hover:underline"
                                            >
                                              WebStore
                                            </Link>
                                          </DropdownMenuItem>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      {item.download &&
                                        item.star &&
                                        item.version &&
                                        item.updated ? (
                                        <div>
                                          <DropdownMenuItem className="flex items-center justify-center">
                                            Downloads({item.download})
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="flex items-center justify-center">
                                            Stars({item.star})
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="flex items-center justify-center">
                                            Version({item.version})
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="flex items-center justify-center">
                                            Updated({item.updated})
                                          </DropdownMenuItem>
                                        </div>
                                      ) : (
                                        ""
                                      )}

                                      {item.github_repo ? (
                                        <DropdownMenuItem className="flex items-center justify-center">
                                          <Link
                                            key={index}
                                            href={item.github_repo}
                                            target={
                                              item.external ? "_blank" : ""
                                            }
                                            rel={
                                              item.external ? "noreferrer" : ""
                                            }
                                          >
                                            Github
                                          </Link>
                                        </DropdownMenuItem>
                                      ) : (
                                        ""
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              ) : (
                                item.title
                              ))}
                          </React.Fragment>
                        ))}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </div>
          </Accordion>
          <h5 className="mt-8 flex h-[250px] w-full items-start justify-center">
            Build By Sumon & Loved By You!!!
            {/* <Avatar>
              <AvatarImage src={"/docs/metamask.jpg"} alt="@beingofexistence" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
          </h5>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}


// "use client"

// import * as React from "react"
// import Link, { LinkProps } from "next/link"
// import { useRouter } from "next/navigation"
// import { docsConfig } from "@/config/docs"
// import { siteConfig } from "@/config/software"
// import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
// import { Button } from "@/components/ui/button"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// export function MobileNav() {
//   const [open, setOpen] = React.useState(false)

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button
//           variant="ghost"
//           className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
//         >
//           <svg
//             strokeWidth="1.5"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//           >
//             <path
//               d="M3 5H11"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             ></path>
//             <path
//               d="M3 12H16"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             ></path>
//             <path
//               d="M3 19H21"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             ></path>
//           </svg>
//           <span className="sr-only">Toggle Menu</span>
//         </Button>
//       </SheetTrigger>
//       <SheetContent side="left" className="pr-0">
//         <MobileLink
//           href="/"
//           className="flex items-center"
//           onOpenChange={setOpen}
//         >
//           <Icons.logo className="mr-2 h-4 w-4" />
//           <span className="font-bold">{siteConfig.name}</span>
//         </MobileLink>
//         <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
//           <div className="flex flex-col space-y-3">
//             {docsConfig.mainNav?.map(
//               (item) =>
//                 item.href && (
//                   <MobileLink
//                     key={item.href}
//                     href={item.href}
//                     onOpenChange={setOpen}
//                   >
//                     {item.title}
//                   </MobileLink>
//                 )
//             )}
//           </div>
//           <div className="flex flex-col space-y-2">
//             {docsConfig.sidebarNav.map((item, index) => (
//               <div key={index} className="flex flex-col space-y-3 pt-6">
//                 <h4 className="font-medium">{item.title}</h4>
//                 {item?.items?.length &&
//                   item.items.map((item) => (
//                     <React.Fragment key={item.href}>
//                       {!item.disabled &&
//                         (item.href ? (
//                           <MobileLink
//                             href={item.href}
//                             onOpenChange={setOpen}
//                             className="text-muted-foreground"
//                           >
//                             {item.title}
//                             {item.label && (
//                               <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
//                                 {item.label}
//                               </span>
//                             )}
//                           </MobileLink>
//                         ) : (
//                           item.title
//                         ))}
//                     </React.Fragment>
//                   ))}
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
//       </SheetContent>
//     </Sheet>
//   )
// }

// interface MobileLinkProps extends LinkProps {
//   onOpenChange?: (open: boolean) => void
//   children: React.ReactNode
//   className?: string
// }

// function MobileLink({
//   href,
//   onOpenChange,
//   className,
//   children,
//   ...props
// }: MobileLinkProps) {
//   const router = useRouter()
//   return (
//     <Link
//       href={href}
//       onClick={() => {
//         router.push(href.toString())
//         onOpenChange?.(false)
//       }}
//       className={cn(className)}
//       {...props}
//     >
//       {children}
//     </Link>
//   )
// }
