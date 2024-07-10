import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "../ui/spotlight";
import { useTheme } from 'next-themes'

export function SpotlightPreview() {
  const { theme } = useTheme()
  let themeStatus;
  if (theme === 'light') {
    themeStatus = 'bg-grid-black/[0.1]';
  } else if (theme === 'dark') {
    themeStatus = 'bg-grid-white/[0.1]';
  }
  return (
    <div className={cn("relative flex h-[40rem] w-full overflow-hidden rounded-md antialiased md:items-center md:justify-center", themeStatus)}>
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="rgb(65, 255, 113)"
      />
      <div className=" relative z-10  mx-auto w-full max-w-7xl  p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-/50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Spotlight <br /> is the new trend.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          Spotlight effect is a great way to draw attention to a specific part
          of the page. Here, we are drawing the attention towards the text
          section of the page. I don&apos;t know why but I&apos;m running out of
          copy.
        </p>
      </div>
    </div>
  );
}
