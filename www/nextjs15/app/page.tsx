"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Home() {
  const [theme, setTheme] = useState<any>({
    "background": "224 71.4% 4.1%",
    "foreground": "210 20% 98%",
    "card": "224 71.4% 4.1%",
    "card-foreground": "210 20% 98%",
    "popover": "224 71.4% 4.1%",
    "popover-foreground": "210 20% 98%",
    "primary": "210 20% 98%",
    "primary-foreground": "220.9 39.3% 11%",
    "secondary": "215 27.9% 16.9%",
    "secondary-foreground": "210 20% 98%",
    "muted": "215 27.9% 16.9%",
    "muted-foreground": "217.9 10.6% 64.9%",
    "accent": "215 27.9% 16.9%",
    "accent-foreground": "210 20% 98%",
    "destructive": "0 62.8% 30.6%",
    "destructive-foreground": "210 20% 98%",
    "border": "215 27.9% 16.9%",
    "input": "215 27.9% 16.9%",
    "ring": "216 12.2% 83.9%",
    "primaryPaletteKeyColor": "225 8% 48%",
    "secondaryPaletteKeyColor": "231 2% 47%",
    "tertiaryPaletteKeyColor": "278 52% 4%",
    "neutralPaletteKeyColor": "300 0% 46%",
    "neutralVariantPaletteKeyColor": "231 2% 47%",
    "onBackground": "340 5% 89%",
    "surface": "240 2% 7%",
    "surfaceDim": "240 2% 7%",
    "surfaceBright": "300 0% 31%",
    "surfaceContainerLowest": "0 0% 0%",
    "surfaceContainerLow": "300 1% 12%",
    "surfaceContainer": "300 1% 19%",
    "surfaceContainerHigh": "300 0% 23%",
    "surfaceContainerHighest": "300 0% 27%",
    "onSurface": "0 0% 100%",
    "surfaceVariant": "223 4% 28%",
    "onSurfaceVariant": "0 0% 100%",
    "inverseSurface": "340 5% 89%",
    "inverseOnSurface": "0 0% 0%",
    "outline": "249 28% 95%",
    "outlineVariant": "240 5% 77%",
    "shadow": "0 0% 0%",
    "scrim": "0 0% 0%",
    "surfaceTint": "226 21% 80%",
    "onPrimary": "0 0% 0%",
    "primaryContainer": "226 19% 78%",
    "onPrimaryContainer": "0 0% 0%",
    "inversePrimary": "221 12% 29%",
    "onSecondary": "0 0% 0%",
    "secondaryContainer": "240 6% 77%",
    "onSecondaryContainer": "0 0% 0%",
    "tertiary": "294 90% 95%",
    "onTertiary": "0 0% 0%",
    "tertiaryContainer": "290 16% 78%",
    "onTertiaryContainer": "0 0% 0%",
    "error": "8 100% 95%",
    "onError": "0 0% 0%",
    "errorContainer": "7 100% 82%",
    "onErrorContainer": "0 0% 0%",
    "primaryFixed": "226 47% 90%",
    "primaryFixedDim": "226 21% 80%",
    "onPrimaryFixed": "0 0% 0%",
    "onPrimaryFixedVariant": "220 45% 7%",
    "secondaryFixed": "240 13% 89%",
    "secondaryFixedDim": "240 6% 79%",
    "onSecondaryFixed": "0 0% 0%",
    "onSecondaryFixedVariant": "223 18% 7%",
    "tertiaryFixed": "294 38% 90%",
    "tertiaryFixedDim": "290 17% 79%",
    "onTertiaryFixed": "0 0% 0%",
    "onTertiaryFixedVariant": "280 30% 7%",
  });


  useEffect(() => {
    for (const key in theme) {
      document.documentElement.style.setProperty(`--${key}`, theme[key]);
    }
  }, [theme]);

  // Gray/Default Theme:
  const switchDefaultTheme = () => {
    setTheme({
      "background": "224 71.4% 4.1%",
      "foreground": "210 20% 98%",
      "card": "224 71.4% 4.1%",
      "card-foreground": "210 20% 98%",
      "popover": "224 71.4% 4.1%",
      "popover-foreground": "210 20% 98%",
      "primary": "210 20% 98%",
      "primary-foreground": "220.9 39.3% 11%",
      "secondary": "215 27.9% 16.9%",
      "secondary-foreground": "210 20% 98%",
      "muted": "215 27.9% 16.9%",
      "muted-foreground": "217.9 10.6% 64.9%",
      "accent": "215 27.9% 16.9%",
      "accent-foreground": "210 20% 98%",
      "destructive": "0 62.8% 30.6%",
      "destructive-foreground": "210 20% 98%",
      "border": "215 27.9% 16.9%",
      "input": "215 27.9% 16.9%",
      "ring": "216 12.2% 83.9%",


      "primaryPaletteKeyColor": "225 8% 48%",
      "secondaryPaletteKeyColor": "231 2% 47%",
      "tertiaryPaletteKeyColor": "278 52% 4%",
      "neutralPaletteKeyColor": "300 0% 46%",
      "neutralVariantPaletteKeyColor": "231 2% 47%",
      "onBackground": "300 1% 10%",
      "surface": "345 40% 98%",
      "surfaceDim": "330 1% 72%",
      "surfaceBright": "345 40% 98%",
      "surfaceContainerLowest": "0 0% 100%",
      "surfaceContainerLow": "340 11% 94%",
      "surfaceContainer": "340 5% 89%",
      "surfaceContainerHigh": "330 2% 83%",
      "surfaceContainerHighest": "330 1% 78%",
      "onSurface": "0 0% 0%",
      "surfaceVariant": "240 11% 89%",
      "onSurfaceVariant": "0 0% 0%",
      "inverseSurface": "300 1% 19%",
      "inverseOnSurface": "0 0% 100%",
      "outline": "223 7% 17%",
      "outlineVariant": "230 4% 29%",
      "shadow": "0 0% 0%",
      "scrim": "0 0% 0%",
      "surfaceTint": "224 9% 38%",
      "onPrimary": "0 0% 100%",
      "primaryContainer": "220 29% 12%",
      "onPrimaryContainer": "0 0% 100%",
      "inversePrimary": "226 21% 80%",
      "onSecondary": "0 0% 100%",
      "secondaryContainer": "225 5% 29%",
      "onSecondaryContainer": "0 0% 100%",
      "tertiary": "0 0% 0%",
      "onTertiary": "0 0% 100%",
      "tertiaryContainer": "282 21% 11%",
      "onTertiaryContainer": "0 0% 100%",
      "error": "357 100% 18%",
      "onError": "0 0% 100%",
      "errorContainer": "356 100% 29%",
      "onErrorContainer": "0 0% 100%",
      "primaryFixed": "224 12% 30%",
      "primaryFixedDim": "220 16% 21%",
      "onPrimaryFixed": "0 0% 100%",
      "onPrimaryFixedVariant": "0 0% 100%",
      "secondaryFixed": "225 5% 29%",
      "secondaryFixedDim": "231 6% 20%",
      "onSecondaryFixed": "0 0% 100%",
      "onSecondaryFixedVariant": "0 0% 100%",
      "tertiaryFixed": "284 9% 30%",
      "tertiaryFixedDim": "283 12% 21%",
      "onTertiaryFixed": "0 0% 100%",
      "onTertiaryFixedVariant": "0 0% 100%",
    });
  };

  return (
    <div className="w-full lg:w-[1200px] mx-auto p-5 space-y-5">
      <h1 className="flex-center bg-primary-foreground h-16 w-full border text-foreground rounded-md">Theme!</h1>
      <div className="flex items-center justify-start w-full h-auto py-3 space-x-3">
        <Button onClick={switchDefaultTheme}>Default(Gray)</Button>
        <Button>Slate</Button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {theme && Object.entries(theme).map(([key, value]: [any, any]) => (
          <p key={key} style={{ backgroundColor: `hsl(${value})` }} className={`flex-center text-[#00ff44] h-32 w-full border`}><strong>{key}</strong></p>
        ))}
      </div>
    </div>
  );
}
