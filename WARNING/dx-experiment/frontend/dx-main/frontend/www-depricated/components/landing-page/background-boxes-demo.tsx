import React from "react";
import { Boxes } from "../ui/background-boxes";
import { cn } from "@/lib/utils";

export function BackgroundBoxesDemo() {
  return (
    <div className="relative flex h-96 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent">
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-transparent [mask-image:radial-gradient(transparent,white)]" />

      <Boxes />
      <h1 className={cn("relative z-20 text-xl md:text-4xl")}>
        Tailwind is Awesome
      </h1>
      <p className="relative z-20 mt-2 text-center">
        Framer motion is the best animation library ngl
      </p>
    </div>
  );
}
