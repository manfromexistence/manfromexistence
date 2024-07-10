"use client";
import React from "react";
import { Button } from "../ui/moving-border";

export function MovingBorderDemo() {
  return (
    <div className="flex h-auto w-full items-center justify-center bg-[hsl(var(--code-foreground))]">
      <Button
        borderRadius="1.75rem"
        className="rounded-md border"
      >
        Borders are cool
      </Button>
    </div>
  );
}
