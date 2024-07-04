"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import Link from "next/link";
import React from "react";

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex items-center space-x-6 text-md">
      <Link
        href="/home"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname === "/universities" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Home
      </Link>
      <Link
        href="/portfolio"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname === "/specialties"
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Portfolio
      </Link>
      <Link
        href="/contract"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname === "/questions"
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Contract
      </Link>
      <Link
        href="/whiteboard"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname === "/whiteboard"
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Whiteboard
      </Link>
      <Link
        href="/planner"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname === "/planner"
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Planner
      </Link>
      {/* <h1
        className={cn(
          "cursor-not-allowed",
          pathname === "/page-variants"
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Questions
      </h1> */}
    </div>
  );
}
