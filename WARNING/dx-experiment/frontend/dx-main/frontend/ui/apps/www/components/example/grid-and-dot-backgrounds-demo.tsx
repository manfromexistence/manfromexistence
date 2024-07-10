import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React from "react";

export function GridBackgroundDemo() {
  const { theme } = useTheme()
  let themeStatus;
  if (theme === 'light') {
    themeStatus = 'bg-grid-black/[0.1]';
  } else if (theme === 'dark') {
    themeStatus = 'bg-grid-white/[0.1]';
  }
  return (
    <div className={cn("relative flex h-[50rem] w-full  items-center justify-center bg-white bg-grid-black/[0.2] dark:bg-black dark:bg-grid-white/[0.2]",themeStatus)}>
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        Backgrounds
      </p>
    </div>
  );
}
