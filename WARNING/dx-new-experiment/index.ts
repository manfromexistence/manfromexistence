import { argbFromHex, themeFromSourceColor, hexFromArgb, MaterialDynamicColors, SchemeContent, Hct } from "./color/typescript/index";

// First Quest, (hsl to hex) converter.
function hslToHex(hsl: string) {
  const regex: any = /^(\d+|\d+\.\d+)\s+(\d+|\d+\.\d+)%\s+(\d+|\d+\.\d+)%$/;
  let matches: any = hsl.match(regex);
  let hue = Number(matches[1]);
  let saturation = Number(matches[2]);
  let luminosity = Number(matches[3]);
  // First let me make (hsl to rgb) ofcourse based on algorithm from http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB.
  let hslToRgb = function (hue: any, saturation: any, lightness: any) {
    if (hue == undefined) {
      return [0, 0, 0];
    }

    let chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
    let huePrime = hue / 60;
    let secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

    huePrime = Math.floor(huePrime);
    let red: any;
    let green: any;
    let blue: any;

    if (huePrime === 0) {
      red = chroma;
      green = secondComponent;
      blue = 0;
    } else if (huePrime === 1) {
      red = secondComponent;
      green = chroma;
      blue = 0;
    } else if (huePrime === 2) {
      red = 0;
      green = chroma;
      blue = secondComponent;
    } else if (huePrime === 3) {
      red = 0;
      green = secondComponent;
      blue = chroma;
    } else if (huePrime === 4) {
      red = secondComponent;
      green = 0;
      blue = chroma;
    } else if (huePrime === 5) {
      red = chroma;
      green = 0;
      blue = secondComponent;
    }

    let lightnessAdjustment = lightness - (chroma / 2);
    red += lightnessAdjustment;
    green += lightnessAdjustment;
    blue += lightnessAdjustment;

    return [
      Math.abs(Math.round(red * 255)),
      Math.abs(Math.round(green * 255)),
      Math.abs(Math.round(blue * 255))
    ];

  };
  // Second task is to make (rgb to hex)
  function hexMax(hexValue: number, hexNumber: number) {
    return (hexValue > hexNumber) ? hexNumber : hexValue
  }
  function hexMin(hexValue: number, hexNumber: number) {
    return (hexValue < hexNumber) ? hexNumber : hexValue
  }
  function cycle(hexValue: number) {
    // for safety:
    hexValue = hexMax(hexValue, 1e7)
    hexValue = hexMin(hexValue, -1e7)
    // cycle value:
    while (hexValue < 0) { hexValue += 360 }
    while (hexValue > 359) { hexValue -= 360 }
    return hexValue
  }
  // resolve degrees to 0 - 359 range
  hue = cycle(hue)
  // enforce constraints
  saturation = hexMin(hexMax(saturation, 100), 0)
  luminosity = hexMin(hexMax(luminosity, 100), 0)
  // convert to 0 to 1 range used by hsl-to-rgb-for-reals
  saturation /= 100
  luminosity /= 100
  // let hsl-to-rgb-for-reals do the hard work
  let rgb = hslToRgb(hue, saturation, luminosity)
  // convert each value in the returned RGB array
  // to a 2 character hex value, join the array into
  // a string, prefixed with a hash
  return '#' + rgb
    .map(function (hexNumber) {
      return (256 + hexNumber).toString(16).substr(-2)
    })
    .join('')
}
// Second Quest -> (hex to hsl).
const hexToHsl = (hex: string) => {
  // So, fist let me make (hex to rgb)
  function hexToRgb(hex: any): any {

    if (hex.charAt && hex.charAt(0) === '#') {
      hex = removeHash(hex)
    }

    if (hex.length === 3) {
      hex = expand(hex)
    }

    let bigint = parseInt(hex, 16)
    let r = (bigint >> 16) & 255
    let g = (bigint >> 8) & 255
    let b = bigint & 255

    return [r, g, b]
  }
  function removeHash(hex: any) {
    let arr = hex.split('')
    arr.shift()
    return arr.join('')
  }
  function expand(hex: any) {
    return hex
      .split('')
      .reduce(function (accum: any, value: any) {

        return accum.concat([value, value])
      }, [])
      .join('')
  }
  // Then the target is to make (rgb to hsl)
  function rgbToHsl(r: any, g: any, b: any) {
    let rgbDifference: any, rgbHue: any, rgbLuminosity: any, rgbMax: any, rgbMin: any, rgbSaturation: any;
    r /= 255;
    g /= 255;
    b /= 255;
    rgbMax = Math.max(r, g, b);
    rgbMin = Math.min(r, g, b);
    rgbHue = 0;
    rgbSaturation = 0;
    rgbLuminosity = (rgbMax + rgbMin) / 2;
    if (rgbMax === rgbMin) {
      rgbHue = rgbSaturation = 0;
    } else {
      rgbDifference = rgbMax - rgbMin;
      rgbSaturation = rgbLuminosity > 0.5 ? rgbDifference / (2 - rgbMax - rgbMin) : rgbDifference / (rgbMax + rgbMin);
      switch (rgbMax) {
        case r:
          rgbHue = (g - b) / rgbDifference + (g < b ? 6 : 0);
          break;
        case g:
          rgbHue = (b - r) / rgbDifference + 2;
          break;
        case b:
          rgbHue = (r - g) / rgbDifference + 4;
      }
      rgbHue /= 6;
    }
    rgbHue = rgbHue * 360;
    rgbSaturation = (rgbSaturation * 100) + "%";
    rgbLuminosity = (rgbLuminosity * 100) + "%";
    return [rgbHue, rgbSaturation, rgbLuminosity];
  };

  let hsl = rgbToHsl.apply(rgbToHsl, hexToRgb(hex));
  return [`${Math.round(hsl[0])} ${parseInt(hsl[1], 10)}% ${parseInt(hsl[2], 10)}%`];
}

const materialColors = {
  primaryPaletteKeyColor: MaterialDynamicColors.primaryPaletteKeyColor,
  secondaryPaletteKeyColor: MaterialDynamicColors.secondaryPaletteKeyColor,
  tertiaryPaletteKeyColor: MaterialDynamicColors.tertiaryPaletteKeyColor,
  neutralPaletteKeyColor: MaterialDynamicColors.neutralPaletteKeyColor,
  neutralVariantPaletteKeyColor: MaterialDynamicColors.neutralVariantPaletteKeyColor,
  // background: MaterialDynamicColors.background,
  onBackground: MaterialDynamicColors.onBackground,
  surface: MaterialDynamicColors.surface,
  surfaceDim: MaterialDynamicColors.surfaceDim,
  surfaceBright: MaterialDynamicColors.surfaceBright,
  surfaceContainerLowest: MaterialDynamicColors.surfaceContainerLowest,
  surfaceContainerLow: MaterialDynamicColors.surfaceContainerLow,
  surfaceContainer: MaterialDynamicColors.surfaceContainer,
  surfaceContainerHigh: MaterialDynamicColors.surfaceContainerHigh,
  surfaceContainerHighest: MaterialDynamicColors.surfaceContainerHighest,
  onSurface: MaterialDynamicColors.onSurface,
  surfaceVariant: MaterialDynamicColors.surfaceVariant,
  onSurfaceVariant: MaterialDynamicColors.onSurfaceVariant,
  inverseSurface: MaterialDynamicColors.inverseSurface,
  inverseOnSurface: MaterialDynamicColors.inverseOnSurface,
  outline: MaterialDynamicColors.outline,
  outlineVariant: MaterialDynamicColors.outlineVariant,
  shadow: MaterialDynamicColors.shadow,
  scrim: MaterialDynamicColors.scrim,
  surfaceTint: MaterialDynamicColors.surfaceTint,
  // primary: MaterialDynamicColors.primary,
  onPrimary: MaterialDynamicColors.onPrimary,
  primaryContainer: MaterialDynamicColors.primaryContainer,
  onPrimaryContainer: MaterialDynamicColors.onPrimaryContainer,
  inversePrimary: MaterialDynamicColors.inversePrimary,
  // secondary: MaterialDynamicColors.secondary,
  onSecondary: MaterialDynamicColors.onSecondary,
  secondaryContainer: MaterialDynamicColors.secondaryContainer,
  onSecondaryContainer: MaterialDynamicColors.onSecondaryContainer,
  tertiary: MaterialDynamicColors.tertiary,
  onTertiary: MaterialDynamicColors.onTertiary,
  tertiaryContainer: MaterialDynamicColors.tertiaryContainer,
  onTertiaryContainer: MaterialDynamicColors.onTertiaryContainer,
  error: MaterialDynamicColors.error,
  onError: MaterialDynamicColors.onError,
  errorContainer: MaterialDynamicColors.errorContainer,
  onErrorContainer: MaterialDynamicColors.onErrorContainer,
  primaryFixed: MaterialDynamicColors.primaryFixed,
  primaryFixedDim: MaterialDynamicColors.primaryFixedDim,
  onPrimaryFixed: MaterialDynamicColors.onPrimaryFixed,
  onPrimaryFixedVariant: MaterialDynamicColors.onPrimaryFixedVariant,
  secondaryFixed: MaterialDynamicColors.secondaryFixed,
  secondaryFixedDim: MaterialDynamicColors.secondaryFixedDim,
  onSecondaryFixed: MaterialDynamicColors.onSecondaryFixed,
  onSecondaryFixedVariant: MaterialDynamicColors.onSecondaryFixedVariant,
  tertiaryFixed: MaterialDynamicColors.tertiaryFixed,
  tertiaryFixedDim: MaterialDynamicColors.tertiaryFixedDim,
  onTertiaryFixed: MaterialDynamicColors.onTertiaryFixed,
  onTertiaryFixedVariant: MaterialDynamicColors.onTertiaryFixedVariant,
};


// let obj: {[key: string]: any} = {
//   "slate-50": "#f8fafc",
//   "slate-100": "#f1f5f9",
//   "slate-200": "#e2e8f0",
//   "slate-300": "#cbd5e1",
//   "slate-400": "#94a3b8",
//   "slate-500": "#64748b",
//   "slate-600": "#475569",
//   "slate-700": "#334155",
//   "slate-800": "#1e293b",
//   "slate-900": "#0f172a",
//   "slate-950": "#020617",
//   "gray-50": "#f9fafb",
//   "gray-100": "#f3f4f6",
//   "gray-200": "#e5e7eb",
//   "gray-300": "#d1d5db",
//   "gray-400": "#9ca3af",
//   "gray-500": "#6b7280",
//   "gray-600": "#4b5563",
//   "gray-700": "#374151",
//   "gray-800": "#1f2937",
//   "gray-900": "#111827",
//   "gray-950": "#030712",
//   "zinc-50": "#fafafa",
//   "zinc-100": "#f4f4f5",
//   "zinc-200": "#e4e4e7",
//   "zinc-300": "#d4d4d8",
//   "zinc-400": "#a1a1aa",
//   "zinc-500": "#71717a",
//   "zinc-600": "#52525b",
//   "zinc-700": "#3f3f46",
//   "zinc-800": "#27272a",
//   "zinc-900": "#18181b",
//   "zinc-950": "#09090b",
//   "neutral-50": "#fafafa",
//   "neutral-100": "#f5f5f5",
//   "neutral-200": "#e5e5e5",
//   "neutral-300": "#d4d4d4",
//   "neutral-400": "#a3a3a3",
//   "neutral-500": "#737373",
//   "neutral-600": "#525252",
//   "neutral-700": "#404040",
//   "neutral-800": "#262626",
//   "neutral-900": "#171717",
//   "neutral-950": "#0a0a0a",
//   "stone-50": "#fafaf9",
//   "stone-100": "#f5f5f4",
//   "stone-200": "#e7e5e4",
//   "stone-300": "#d6d3d1",
//   "stone-400": "#a8a29e",
//   "stone-500": "#78716c",
//   "stone-600": "#57534e",
//   "stone-700": "#44403c",
//   "stone-800": "#292524",
//   "stone-900": "#1c1917",
//   "stone-950": "#0c0a09",
//   "red-50": "#fef2f2",
//   "red-100": "#fee2e2",
//   "red-200": "#fecaca",
//   "red-300": "#fca5a5",
//   "red-400": "#f87171",
//   "red-500": "#ef4444",
//   "red-600": "#dc2626",
//   "red-700": "#b91c1c",
//   "red-800": "#991b1b",
//   "red-900": "#7f1d1d",
//   "red-950": "#450a0a",
//   "orange-50": "#fff7ed",
//   "orange-100": "#ffedd5",
//   "orange-200": "#fed7aa",
//   "orange-300": "#fdba74",
//   "orange-400": "#fb923c",
//   "orange-500": "#f97316",
//   "orange-600": "#ea580c",
//   "orange-700": "#c2410c",
//   "orange-800": "#9a3412",
//   "orange-900": "#7c2d12",
//   "orange-950": "#431407",
//   "amber-50": "#fffbeb",
//   "amber-100": "#fef3c7",
//   "amber-200": "#fde68a",
//   "amber-300": "#fcd34d",
//   "amber-400": "#fbbf24",
//   "amber-500": "#f59e0b",
//   "amber-600": "#d97706",
//   "amber-700": "#b45309",
//   "amber-800": "#92400e",
//   "amber-900": "#78350f",
//   "amber-950": "#451a03",
//   "yellow-50": "#fefce8",
//   "yellow-100": "#fef9c3",
//   "yellow-200": "#fef08a",
//   "yellow-300": "#fde047",
//   "yellow-400": "#facc15",
//   "yellow-500": "#eab308",
//   "yellow-600": "#ca8a04",
//   "yellow-700": "#a16207",
//   "yellow-800": "#854d0e",
//   "yellow-900": "#713f12",
//   "yellow-950": "#422006",
//   "lime-50": "#f7fee7",
//   "lime-100": "#ecfccb",
//   "lime-200": "#d9f99d",
//   "lime-300": "#bef264",
//   "lime-400": "#a3e635",
//   "lime-500": "#84cc16",
//   "lime-600": "#65a30d",
//   "lime-700": "#4d7c0f",
//   "lime-800": "#3f6212",
//   "lime-900": "#365314",
//   "lime-950": "#1a2e05",
//   "green-50": "#f0fdf4",
//   "green-100": "#dcfce7",
//   "green-200": "#bbf7d0",
//   "green-300": "#86efac",
//   "green-400": "#4ade80",
//   "green-500": "#22c55e",
//   "green-600": "#16a34a",
//   "green-700": "#15803d",
//   "green-800": "#166534",
//   "green-900": "#14532d",
//   "green-950": "#052e16",
//   "emerald-50": "#ecfdf5",
//   "emerald-100": "#d1fae5",
//   "emerald-200": "#a7f3d0",
//   "emerald-300": "#6ee7b7",
//   "emerald-400": "#34d399",
//   "emerald-500": "#10b981",
//   "emerald-600": "#059669",
//   "emerald-700": "#047857",
//   "emerald-800": "#065f46",
//   "emerald-900": "#064e3b",
//   "emerald-950": "#022c22",
//   "teal-50": "#f0fdfa",
//   "teal-100": "#ccfbf1",
//   "teal-200": "#99f6e4",
//   "teal-300": "#5eead4",
//   "teal-400": "#2dd4bf",
//   "teal-500": "#14b8a6",
//   "teal-600": "#0d9488",
//   "teal-700": "#0f766e",
//   "teal-800": "#115e59",
//   "teal-900": "#134e4a",
//   "teal-950": "#042f2e",
//   "cyan-50": "#ecfeff",
//   "cyan-100": "#cffafe",
//   "cyan-200": "#a5f3fc",
//   "cyan-300": "#67e8f9",
//   "cyan-400": "#22d3ee",
//   "cyan-500": "#06b6d4",
//   "cyan-600": "#0891b2",
//   "cyan-700": "#0e7490",
//   "cyan-800": "#155e75",
//   "cyan-900": "#164e63",
//   "cyan-950": "#083344",
//   "sky-50": "#f0f9ff",
//   "sky-100": "#e0f2fe",
//   "sky-200": "#bae6fd",
//   "sky-300": "#7dd3fc",
//   "sky-400": "#38bdf8",
//   "sky-500": "#0ea5e9",
//   "sky-600": "#0284c7",
//   "sky-700": "#0369a1",
//   "sky-800": "#075985",
//   "sky-900": "#0c4a6e",
//   "sky-950": "#082f49",
//   "blue-50": "#eff6ff",
//   "blue-100": "#dbeafe",
//   "blue-200": "#bfdbfe",
//   "blue-300": "#93c5fd",
//   "blue-400": "#60a5fa",
//   "blue-500": "#3b82f6",
//   "blue-600": "#2563eb",
//   "blue-700": "#1d4ed8",
//   "blue-800": "#1e40af",
//   "blue-900": "#1e3a8a",
//   "blue-950": "#172554",
//   "indigo-50": "#eef2ff",
//   "indigo-100": "#e0e7ff",
//   "indigo-200": "#c7d2fe",
//   "indigo-300": "#a5b4fc",
//   "indigo-400": "#818cf8",
//   "indigo-500": "#6366f1",
//   "indigo-600": "#4f46e5",
//   "indigo-700": "#4338ca",
//   "indigo-800": "#3730a3",
//   "indigo-900": "#312e81",
//   "indigo-950": "#1e1b4b",
//   "violet-50": "#f5f3ff",
//   "violet-100": "#ede9fe",
//   "violet-200": "#ddd6fe",
//   "violet-300": "#c4b5fd",
//   "violet-400": "#a78bfa",
//   "violet-500": "#8b5cf6",
//   "violet-600": "#7c3aed",
//   "violet-700": "#6d28d9",
//   "violet-800": "#5b21b6",
//   "violet-900": "#4c1d95",
//   "violet-950": "#2e1065",
//   "purple-50": "#faf5ff",
//   "purple-100": "#f3e8ff",
//   "purple-200": "#e9d5ff",
//   "purple-300": "#d8b4fe",
//   "purple-400": "#c084fc",
//   "purple-500": "#a855f7",
//   "purple-600": "#9333ea",
//   "purple-700": "#7e22ce",
//   "purple-800": "#6b21a8",
//   "purple-900": "#581c87",
//   "purple-950": "#3b0764",
//   "fuchsia-50": "#fdf4ff",
//   "fuchsia-100": "#fae8ff",
//   "fuchsia-200": "#f5d0fe",
//   "fuchsia-300": "#f0abfc",
//   "fuchsia-400": "#e879f9",
//   "fuchsia-500": "#d946ef",
//   "fuchsia-600": "#c026d3",
//   "fuchsia-700": "#a21caf",
//   "fuchsia-800": "#86198f",
//   "fuchsia-900": "#701a75",
//   "fuchsia-950": "#4a044e",
//   "pink-50": "#fdf2f8",
//   "pink-100": "#fce7f3",
//   "pink-200": "#fbcfe8",
//   "pink-300": "#f9a8d4",
//   "pink-400": "#f472b6",
//   "pink-500": "#ec4899",
//   "pink-600": "#db2777",
//   "pink-700": "#be185d",
//   "pink-800": "#9d174d",
//   "pink-900": "#831843",
//   "pink-950": "#500724",
//   "rose-50": "#fff1f2",
//   "rose-100": "#ffe4e6",
//   "rose-200": "#fecdd3",
//   "rose-300": "#fda4af",
//   "rose-400": "#fb7185",
//   "rose-500": "#f43f5e",
//   "rose-600": "#e11d48",
//   "rose-700": "#be123c",
//   "rose-800": "#9f1239",
//   "rose-900": "#881337",
//   "rose-950": "#4c0519",
// }

// let newObj: any={};

// for (let [key, value] of Object.entries(obj)) {
//   newObj[key] = hexToHsl(value);
// }

// console.log(newObj);



let obj: any = {
  "slate-50": "210 40% 98%",
  "slate-100": "210 40% 96%",
  "slate-200": "214 31% 91%",
  "slate-300": "213 26% 83%",
  "slate-400": "215 20% 65%",
  "slate-500": "215 16% 46%",
  "slate-600": "215 19% 34%",
  "slate-700": "215 24% 26%",
  "slate-800": "217 32% 17%",
  "slate-900": "222 47% 11%",
  "slate-950": "229 84% 4%",
  "gray-50": "210 19% 98%",
  "gray-100": "220 14% 95%",
  "gray-200": "220 13% 90%",
  "gray-300": "216 12% 83%",
  "gray-400": "218 10% 64%",
  "gray-500": "220 8% 46%",
  "gray-600": "215 13% 34%",
  "gray-700": "217 19% 26%",
  "gray-800": "215 27% 16%",
  "gray-900": "221 39% 10%",
  "gray-950": "224 71% 4%",
  "zinc-50": "0 0% 98%",
  "zinc-100": "240 4% 95%",
  "zinc-200": "240 5% 90%",
  "zinc-300": "240 4% 83%",
  "zinc-400": "240 5% 64%",
  "zinc-500": "240 3% 46%",
  "zinc-600": "240 5% 33%",
  "zinc-700": "240 5% 26%",
  "zinc-800": "240 3% 15%",
  "zinc-900": "240 5% 10%",
  "zinc-950": "240 10% 3%",
  "neutral-50": "0 0% 98%",
  "neutral-100": "0 0% 96%",
  "neutral-200": "0 0% 89%",
  "neutral-300": "0 0% 83%",
  "neutral-400": "0 0% 63%",
  "neutral-500": "0 0% 45%",
  "neutral-600": "0 0% 32%",
  "neutral-700": "0 0% 25%",
  "neutral-800": "0 0% 14%",
  "neutral-900": "0 0% 9%",
  "neutral-950": "0 0% 3%",
  "stone-50": "60 9% 97%",
  "stone-100": "60 4% 95%",
  "stone-200": "20 5% 90%",
  "stone-300": "24 5% 82%",
  "stone-400": "24 5% 63%",
  "stone-500": "25 5% 44%",
  "stone-600": "33 5% 32%",
  "stone-700": "30 6% 25%",
  "stone-800": "12 6% 15%",
  "stone-900": "24 9% 10%",
  "stone-950": "20 14% 4%",
  "red-50": "0 85% 97%",
  "red-100": "0 93% 94%",
  "red-200": "0 96% 89%",
  "red-300": "0 93% 81%",
  "red-400": "0 90% 70%",
  "red-500": "0 84% 60%",
  "red-600": "0 72% 50%",
  "red-700": "0 73% 41%",
  "red-800": "0 70% 35%",
  "red-900": "0 62% 30%",
  "red-950": "0 74% 15%",
  "orange-50": "33 100% 96%",
  "orange-100": "34 100% 91%",
  "orange-200": "32 97% 83%",
  "orange-300": "31 97% 72%",
  "orange-400": "27 95% 60%",
  "orange-500": "25 94% 53%",
  "orange-600": "21 90% 48%",
  "orange-700": "17 88% 40%",
  "orange-800": "15 79% 33%",
  "orange-900": "15 74% 27%",
  "orange-950": "13 81% 14%",
  "amber-50": "48 100% 96%",
  "amber-100": "48 96% 88%",
  "amber-200": "48 96% 76%",
  "amber-300": "46 96% 64%",
  "amber-400": "43 96% 56%",
  "amber-500": "38 92% 50%",
  "amber-600": "32 94% 43%",
  "amber-700": "26 90% 37%",
  "amber-800": "23 82% 31%",
  "amber-900": "22 77% 26%",
  "amber-950": "21 91% 14%",
  "yellow-50": "55 91% 95%",
  "yellow-100": "55 96% 88%",
  "yellow-200": "53 98% 76%",
  "yellow-300": "50 97% 63%",
  "yellow-400": "48 95% 53%",
  "yellow-500": "45 93% 47%",
  "yellow-600": "41 96% 40%",
  "yellow-700": "35 91% 32%",
  "yellow-800": "32 80% 28%",
  "yellow-900": "28 72% 25%",
  "yellow-950": "26 83% 14%",
  "lime-50": "78 92% 95%",
  "lime-100": "80 89% 89%",
  "lime-200": "81 88% 79%",
  "lime-300": "82 84% 67%",
  "lime-400": "83 77% 55%",
  "lime-500": "84 80% 44%",
  "lime-600": "85 85% 34%",
  "lime-700": "86 78% 27%",
  "lime-800": "86 68% 22%",
  "lime-900": "88 61% 20%",
  "lime-950": "89 80% 10%",
  "green-50": "138 76% 96%",
  "green-100": "141 84% 92%",
  "green-200": "141 78% 85%",
  "green-300": "142 76% 73%",
  "green-400": "142 69% 58%",
  "green-500": "142 70% 45%",
  "green-600": "142 76% 36%",
  "green-700": "142 71% 29%",
  "green-800": "143 64% 24%",
  "green-900": "144 61% 20%",
  "green-950": "145 80% 10%",
  "emerald-50": "152 80% 95%",
  "emerald-100": "149 80% 89%",
  "emerald-200": "152 75% 80%",
  "emerald-300": "156 71% 66%",
  "emerald-400": "158 64% 51%",
  "emerald-500": "160 84% 39%",
  "emerald-600": "161 93% 30%",
  "emerald-700": "163 93% 24%",
  "emerald-800": "163 88% 19%",
  "emerald-900": "164 85% 16%",
  "emerald-950": "166 91% 9%",
  "teal-50": "166 76% 96%",
  "teal-100": "167 85% 89%",
  "teal-200": "168 83% 78%",
  "teal-300": "171 76% 64%",
  "teal-400": "172 66% 50%",
  "teal-500": "173 80% 40%",
  "teal-600": "175 83% 31%",
  "teal-700": "175 77% 26%",
  "teal-800": "176 69% 21%",
  "teal-900": "176 60% 19%",
  "teal-950": "179 84% 10%",
  "cyan-50": "183 100% 96%",
  "cyan-100": "185 95% 90%",
  "cyan-200": "186 93% 81%",
  "cyan-300": "187 92% 69%",
  "cyan-400": "188 85% 53%",
  "cyan-500": "189 94% 42%",
  "cyan-600": "192 91% 36%",
  "cyan-700": "193 82% 30%",
  "cyan-800": "194 69% 27%",
  "cyan-900": "196 63% 23%",
  "cyan-950": "197 78% 14%",
  "sky-50": "204 100% 97%",
  "sky-100": "204 93% 93%",
  "sky-200": "201 94% 86%",
  "sky-300": "199 95% 73%",
  "sky-400": "198 93% 59%",
  "sky-500": "199 88% 48%",
  "sky-600": "200 98% 39%",
  "sky-700": "201 96% 32%",
  "sky-800": "201 89% 27%",
  "sky-900": "202 80% 23%",
  "sky-950": "204 80% 15%",
  "blue-50": "214 100% 96%",
  "blue-100": "214 94% 92%",
  "blue-200": "213 96% 87%",
  "blue-300": "212 96% 78%",
  "blue-400": "213 93% 67%",
  "blue-500": "217 91% 59%",
  "blue-600": "221 83% 53%",
  "blue-700": "224 76% 48%",
  "blue-800": "226 70% 40%",
  "blue-900": "224 64% 32%",
  "blue-950": "226 57% 20%",
  "indigo-50": "226 100% 96%",
  "indigo-100": "226 100% 93%",
  "indigo-200": "228 96% 88%",
  "indigo-300": "230 93% 81%",
  "indigo-400": "234 89% 73%",
  "indigo-500": "239 83% 66%",
  "indigo-600": "243 75% 58%",
  "indigo-700": "245 57% 50%",
  "indigo-800": "244 54% 41%",
  "indigo-900": "242 47% 34%",
  "indigo-950": "244 47% 20%",
  "violet-50": "250 100% 97%",
  "violet-100": "251 91% 95%",
  "violet-200": "251 95% 91%",
  "violet-300": "252 94% 85%",
  "violet-400": "255 91% 76%",
  "violet-500": "258 89% 66%",
  "violet-600": "262 83% 57%",
  "violet-700": "263 69% 50%",
  "violet-800": "263 69% 42%",
  "violet-900": "264 67% 34%",
  "violet-950": "261 72% 22%",
  "purple-50": "270 100% 98%",
  "purple-100": "269 100% 95%",
  "purple-200": "269 100% 91%",
  "purple-300": "269 97% 85%",
  "purple-400": "270 95% 75%",
  "purple-500": "271 91% 65%",
  "purple-600": "271 81% 55%",
  "purple-700": "272 71% 47%",
  "purple-800": "273 67% 39%",
  "purple-900": "274 65% 31%",
  "purple-950": "274 86% 20%",
  "fuchsia-50": "289 100% 97%",
  "fuchsia-100": "287 100% 95%",
  "fuchsia-200": "288 95% 90%",
  "fuchsia-300": "291 93% 82%",
  "fuchsia-400": "292 91% 72%",
  "fuchsia-500": "292 84% 60%",
  "fuchsia-600": "293 69% 48%",
  "fuchsia-700": "295 72% 39%",
  "fuchsia-800": "295 70% 32%",
  "fuchsia-900": "297 63% 28%",
  "fuchsia-950": "297 90% 16%",
  "pink-50": "327 73% 97%",
  "pink-100": "326 77% 94%",
  "pink-200": "326 84% 89%",
  "pink-300": "327 87% 81%",
  "pink-400": "329 85% 70%",
  "pink-500": "330 81% 60%",
  "pink-600": "333 71% 50%",
  "pink-700": "335 77% 41%",
  "pink-800": "336 74% 35%",
  "pink-900": "336 69% 30%",
  "pink-950": "336 83% 17%",
  "rose-50": "356 100% 97%",
  "rose-100": "356 100% 94%",
  "rose-200": "353 96% 90%",
  "rose-300": "353 95% 81%",
  "rose-400": "351 94% 71%",
  "rose-500": "350 89% 60%",
  "rose-600": "347 77% 49%",
  "rose-700": "345 82% 40%",
  "rose-800": "343 79% 34%",
  "rose-900": "342 75% 30%",
  "rose-950": "343 87% 15%",
};

let themeObj:any = {};

// for (let [key, value] of Object.entries(obj)) {
//   let colorName = key.split('-')[0]; // Get the color name (e.g., "slate")
//   if (!themeObj[colorName]) {
//     themeObj[colorName] = {
//       "light": {
//         "background": "0 0% 100%",
//         "foreground": colorName + "-950",
//         "card": "white",
//         "card-foreground": colorName + "-950",
//         "popover": "white",
//         "popover-foreground": colorName + "-950",
//         "primary": colorName + "-900",
//         "primary-foreground": colorName + "-50",
//         "secondary": colorName + "-100",
//         "secondary-foreground": colorName + "-900",
//         "muted": colorName + "-100",
//         "muted-foreground": colorName + "-500",
//         "accent": colorName + "-100",
//         "accent-foreground": colorName + "-900",
//         "destructive": "red-500",
//         "destructive-foreground": colorName + "-50",
//         "border": colorName + "-200",
//         "input": colorName + "-200",
//         "ring": colorName + "-950"
//       },
//       "dark": {
//         "background": colorName + "-950",
//         "foreground": colorName + "-50",
//         "card": colorName + "-950",
//         "card-foreground": colorName + "-50",
//         "popover": colorName + "-950",
//         "popover-foreground": colorName + "-50",
//         "primary": colorName + "-50",
//         "primary-foreground": colorName + "-900",
//         "secondary": colorName + "-800",
//         "secondary-foreground": colorName + "-50",
//         "muted": colorName + "-800",
//         "muted-foreground": colorName + "-400",
//         "accent": colorName + "-800",
//         "accent-foreground": colorName + "-50",
//         "destructive": "red-900",
//         "destructive-foreground": colorName + "-50",
//         "border": colorName + "-800",
//         "input": colorName + "-800",
//         "ring": colorName + "-300"
//       }
//     };
//   }
// }
for (let [key, value] of Object.entries(obj)) {
  let colorName = key.split('-')[0]; // Get the color name (e.g., "slate")
  if (!themeObj[colorName]) {
    themeObj[colorName] = {
      "light": {
        "background": "0 0% 100%",
        "foreground": obj[colorName + "-950"],
        "card": "0 0% 100%",
        "card-foreground": obj[colorName + "-950"],
        "popover": "0 0% 100%",
        "popover-foreground": obj[colorName + "-950"],
        "primary": obj[colorName + "-900"],
        "primary-foreground": obj[colorName + "-50"],
        "secondary": obj[colorName + "-100"],
        "secondary-foreground": obj[colorName + "-900"],
        "muted": obj[colorName + "-100"],
        "muted-foreground": obj[colorName + "-500"],
        "accent": obj[colorName + "-100"],
        "accent-foreground": obj[colorName + "-900"],
        "destructive": obj["red-900"],
        "destructive-foreground": obj[colorName + "-50"],
        "border": obj[colorName + "-200"],
        "input": obj[colorName + "-200"],
        "ring": obj[colorName + "-950"]
      },
      "dark": {
        "background": obj[colorName + "-950"],
        "foreground": obj[colorName + "-50"],
        "card": obj[colorName + "-950"],
        "card-foreground": obj[colorName + "-50"],
        "popover": obj[colorName + "-950"],
        "popover-foreground": obj[colorName + "-50"],
        "primary": obj[colorName + "-50"],
        "primary-foreground": obj[colorName + "-900"],
        "secondary": obj[colorName + "-800"],
        "secondary-foreground": obj[colorName + "-50"],
        "muted": obj[colorName + "-800"],
        "muted-foreground": obj[colorName + "-400"],
        "accent": obj[colorName + "-800"],
        "accent-foreground": obj[colorName + "-50"],
        "destructive": obj["red-900"],
        "destructive-foreground": obj[colorName + "-50"],
        "border": obj[colorName + "-800"],
        "input": obj[colorName + "-800"],
        "ring": obj[colorName + "-300"]
      }
    };
  }
}

// console.log(themeObj);
// console.log(themeObj);


let scheme = new SchemeContent(Hct.fromInt(argbFromHex(`${hslToHex("224 71.4% 4.1%")}`)), false, 1);
let theme: { [key: string]: string } = {};

for (let [key, value] of Object.entries(materialColors)) {
  theme[key] = hexFromArgb(value.getArgb(scheme));
};

for (let [key, value] of Object.entries(theme)) {
  let uiTheme = `"${key}": "${hexToHsl(value)}",`;
  console.log(uiTheme);
}
