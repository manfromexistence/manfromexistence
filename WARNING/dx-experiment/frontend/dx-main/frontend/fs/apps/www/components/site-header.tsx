import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/registry/default/ui/button"
import { buttonVariants } from "@/registry/new-york/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"
import { UserAuthForm } from "@/app/examples/authentication/components/user-auth-form"
import { Send } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            <div className="hidden md:block">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="ghost">
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="min-w-[1250px]">
                  {/* <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you are done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter> */}
                  <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                    {/* <Link
                      href="/examples/authentication"
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                      )}
                    >
                      Login
                    </Link> */}
                    <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                      <div className="absolute inset-0 bg-zinc-900" />
                      <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-6 w-6"
                        >
                          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        Acme Inc
                      </div>
                      <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                          <p className="text-lg">
                            &ldquo;This library has saved me countless hours of work and
                            helped me deliver stunning designs to my clients faster than
                            ever before.&rdquo;
                          </p>
                          <footer className="text-sm">Sofia Davis</footer>
                        </blockquote>
                      </div>
                    </div>
                    <div className="lg:p-8">
                      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                          <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                          </h1>
                          <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account
                          </p>
                        </div>
                        <UserAuthForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                          By clicking continue, you agree to our{" "}
                          <Link
                            href="/terms"
                            className="underline underline-offset-4 hover:text-primary"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="underline underline-offset-4 hover:text-primary"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    Submit
                  </Button>
                </DialogTrigger>
                <DialogContent className="h-[250px] sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Submit a resource</DialogTitle>
                    <DialogDescription>
                      Submit a resource for other freelancers. If we like it too, we will feature it on Freelance Things.
                    </DialogDescription>
                  </DialogHeader>
                  <Input id="name" type="text" placeholder="Resouce link" className="mt-3 w-full" />
                  <DialogFooter>
                    <Button className="w-full" type="submit">Submit <Send className="ml-2 h-4 w-4" /></Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>


            </div>
            {/* <ModeToggle /> */}
          </nav>
        </div>
      </div>
    </header>
  )
}
