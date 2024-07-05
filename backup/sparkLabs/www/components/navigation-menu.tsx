/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const workshopComponents: { title: string; href: string; description: string }[] = [
  {
    title: "Scratch Introduction",
    href: "/workshop/scratch-introduction",
    description:
      "An introductory course to get students started with Scratch programming. Covers the basics of using the Spark Labs editor.",
  },
  {
    title: "Animation with Scratch",
    href: "/workshop/animation-with-scratch",
    description:
      "A course that teaches students how to create animations using Scratch. Students will learn to use various animation techniques in the Spark Labs editor.",
  },
  {
    title: "Game Development with Scratch",
    href: "/workshop/game-development-with-scratch",
    description:
      "This course introduces students to game development using Scratch. They will learn to create interactive games using the Spark Labs editor.",
  },
  {
    title: "Advanced Scratch Projects",
    href: "/workshop/advanced-scratch-projects",
    description: "A course for students who have mastered the basics and are ready to tackle more complex Scratch projects using the Spark Labs editor.",
  },
  {
    title: "Teacher Resources",
    href: "/workshop/teacher-resources",
    description:
      "A collection of resources for teachers to assist them in teaching Scratch programming using the Spark Labs editor.",
  },
  {
    title: "Student Gallery",
    href: "/workshop/student-gallery",
    description:
      "A showcase of projects created by students in the workshop, demonstrating what they've learned about Scratch programming using the Spark Labs editor.",
  },
]


export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-foreground">Workshop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/workshop/scratch-introduction"
                  >
                    <img className="h-20 w-auto" src="./logo.png" alt="logo" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Scratch Introduction
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      An introductory course to get students started with Scratch programming. Covers the basics of using the Spark Labs editor.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/workshop/animation-with-scratch" title="Animation with Scratch">
                A course that teaches students how to create animations using Scratch. Students will learn to use various animation techniques in the Spark Labs editor.
              </ListItem>
              <ListItem href="/workshop/game-development-with-scratch" title="Game Development with Scratch">
                This course introduces students to game development using Scratch. They will learn to create interactive games using the Spark Labs editor.
              </ListItem>
              <ListItem href="/workshop/advanced-scratch-projects" title="Advanced Scratch Projects">
                A course for students who have mastered the basics and are ready to tackle more complex Scratch projects using the Spark Labs editor.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-foreground ml-1">Explore</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {workshopComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <Link href="/teachers" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Teachers
            </NavigationMenuLink>
          </Link>
        <NavigationMenuItem>
          <Link href="/students" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Students
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/projects" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Projects
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}

      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
