import React, {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
  memo,
} from "react";
import { Antd } from './antd/antd';
import { Nextui } from './nextui/nextui';
import { argbFromHex, themeFromSourceColor, hexFromArgb, MaterialDynamicColors, SchemeContent, Hct } from "./theme";

interface ValueObject {
  [themeName: string]: string;
}

export interface hexProps {
  hexValue?: number;
  hexNumber?: number;
}

export interface UseThemeProps {
  /** List of all available theme names */
  themes: string[];
  /** Forced theme name for the current page */
  forcedTheme?: string | undefined;
  /** Update the theme */
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  /** Active theme name */
  theme?: string | undefined;
  /** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: string | undefined;
  /** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
  systemTheme?: "dark" | "light" | undefined;
}

export interface ThemeProviderProps {
  /** List of all available theme names */
  themes?: string[] | undefined;
  /** Forced theme name for the current page */
  forcedTheme?: string | undefined;
  /** Whether to switch between dark and light themes based on prefers-color-scheme */
  enableSystem?: boolean | undefined;
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean | undefined;
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  enableColorScheme?: boolean | undefined;
  /** Key used to store theme setting in localStorage */
  storageKey?: string | undefined;
  /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
  defaultTheme?: string | undefined;
  /** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
  attribute?: string | "class" | undefined;
  /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
  value?: ValueObject | undefined;
  /** Nonce string to pass to the inline script for CSP headers */
  nonce?: string | undefined;

  children?: React.ReactNode;
}

const colorSchemes = ["light", "dark"];
const MEDIA = "(prefers-color-scheme: dark)";
const isServer = typeof window === "undefined";
const ThemeContext = createContext<UseThemeProps | undefined>(undefined);
const defaultContext: UseThemeProps = { setTheme: (_) => { }, themes: [] };

export const useTheme = () => useContext(ThemeContext) ?? defaultContext;

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const context = useContext(ThemeContext);

  // Ignore nested context providers, just passthrough children
  if (context) return <Fragment>{props.children}</Fragment>;
  return <Ui {...props} />;
};

const defaultThemes = ["light", "dark"];

const Ui: React.FC<ThemeProviderProps> = ({
  forcedTheme,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = "theme",
  themes = defaultThemes,
  defaultTheme = enableSystem ? "system" : "light",
  attribute = "data-theme",
  value,
  children,
  nonce,
}) => {
  const [theme, setThemeState] = useState(() =>
    getTheme(storageKey, defaultTheme)
  );
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    getTheme(storageKey)
  );
  const attrs = !value ? themes : Object.values(value);

  const applyTheme = useCallback((theme) => {
    let resolved = theme;
    if (!resolved) return;

    // If theme is system, resolve it before setting theme
    if (theme === "system" && enableSystem) {
      resolved = getSystemTheme();
    }

    const name = value ? value[resolved] : resolved;
    const enable = disableTransitionOnChange ? disableAnimation() : null;
    const d = document.documentElement;

    if (attribute === "class") {
      d.classList.remove(...attrs);

      if (name) d.classList.add(name);
    } else {
      if (name) {
        d.setAttribute(attribute, name);
      } else {
        d.removeAttribute(attribute);
      }
    }

    if (enableColorScheme) {
      const fallback = colorSchemes.includes(defaultTheme)
        ? defaultTheme
        : null;
      const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;
      // @ts-ignore
      d.style.colorScheme = colorScheme;
    }

    enable?.();
  }, []);

  const setTheme = useCallback(
    (theme) => {
      const newTheme = typeof theme === "function" ? theme(theme) : theme;
      setThemeState(newTheme);

      // Save to storage
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch (e) {
        // Unsupported
      }
    },
    [forcedTheme]
  );

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e);
      setResolvedTheme(resolved);

      if (theme === "system" && enableSystem && !forcedTheme) {
        applyTheme("system");
      }
    },
    [theme, forcedTheme]
  );

  // Always listen to System preference
  useEffect(() => {
    const media = window.matchMedia(MEDIA);

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handleMediaQuery);
    handleMediaQuery(media);

    return () => media.removeListener(handleMediaQuery);
  }, [handleMediaQuery]);

  // localStorage event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return;
      }

      // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
      const theme = e.newValue || defaultTheme;
      setTheme(theme);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [setTheme]);

  // Whenever theme or forcedTheme changes, apply it
  useEffect(() => {
    applyTheme(forcedTheme ?? theme);
  }, [forcedTheme, theme]);

  const providerValue = useMemo(
    () => ({
      theme,
      setTheme,
      forcedTheme,
      resolvedTheme: theme === "system" ? resolvedTheme : theme,
      themes: enableSystem ? [...themes, "system"] : themes,
      systemTheme: (enableSystem ? resolvedTheme : undefined) as
        | "light"
        | "dark"
        | undefined,
    }),
    [theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes]
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeScript
        {...{
          forcedTheme,
          disableTransitionOnChange,
          enableSystem,
          enableColorScheme,
          storageKey,
          themes,
          defaultTheme,
          attribute,
          value,
          children,
          attrs,
          nonce,
        }}
      />
      <Antd>
        <Nextui>
          {children}
        </Nextui>
      </Antd>
    </ThemeContext.Provider>
  );
};

const ThemeScript = memo(
  ({
    forcedTheme,
    storageKey,
    attribute,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    value,
    attrs,
    nonce,
  }: ThemeProviderProps & { attrs: string[]; defaultTheme: string }) => {
    const defaultSystem = defaultTheme === "system";

    // Code-golfing the amount of characters in the script
    const optimization = (() => {
      if (attribute === "class") {
        const removeClasses = `c.remove(${attrs
          .map((t: string) => `'${t}'`)
          .join(",")})`;

        return `let d=document.documentElement,c=d.classList;${removeClasses};`;
      } else {
        return `let d=document.documentElement,hexNumber='${attribute}',s='setAttribute';`;
      }
    })();

    const fallbackColorScheme = (() => {
      if (!enableColorScheme) {
        return "";
      }

      const fallback = colorSchemes.includes(defaultTheme)
        ? defaultTheme
        : null;

      if (fallback) {
        return `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${defaultTheme}'`;
      } else {
        return `if(e==='light'||e==='dark')d.style.colorScheme=e`;
      }
    })();

    const updateDOM = (
      name: string,
      literal: boolean = false,
      setColorScheme = true
    ) => {
      const resolvedName = value ? value[name] : name;
      const hexValue = literal ? name + `|| ''` : `'${resolvedName}'`;
      let text = "";

      // MUCH faster to set colorScheme alongside HTML attribute/class
      // as it only incurs 1 style recalculation rather than 2
      // This can save over 250ms of work for pages with big DOM
      if (
        enableColorScheme &&
        setColorScheme &&
        !literal &&
        colorSchemes.includes(name)
      ) {
        text += `d.style.colorScheme = '${name}';`;
      }

      if (attribute === "class") {
        if (literal || resolvedName) {
          text += `c.add(${hexValue})`;
        } else {
          text += `null`;
        }
      } else {
        if (resolvedName) {
          text += `d[s](hexNumber,${hexValue})`;
        }
      }

      return text;
    };

    const scriptSrc = (() => {
      if (forcedTheme) {
        return `!function(){${optimization}${updateDOM(forcedTheme)}}()`;
      }

      if (enableSystem) {
        return `!function(){try{${optimization}let e=localStorage.getItem('${storageKey}');if('system'===e||(!e&&${defaultSystem})){let t='${MEDIA}',m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM(
          "dark"
        )}}else{${updateDOM("light")}}}else if(e){${value ? `let x=${JSON.stringify(value)};` : ""
          }${updateDOM(value ? `x[e]` : "e", true)}}${!defaultSystem
            ? `else{` + updateDOM(defaultTheme, false, false) + "}"
            : ""
          }${fallbackColorScheme}}catch(e){}}()`;
      }

      return `!function(){try{${optimization}let e=localStorage.getItem('${storageKey}');if(e){${value ? `let x=${JSON.stringify(value)};` : ""
        }${updateDOM(value ? `x[e]` : "e", true)}}else{${updateDOM(
          defaultTheme,
          false,
          false
        )};}${fallbackColorScheme}}catch(t){}}();`;
    })();

    return (
      <script nonce={nonce} dangerouslySetInnerHTML={{ __html: scriptSrc }} />
    );
  },
  // Never re-render this component
  () => true
);

// Helpers
const getTheme = (key: string, fallback?: string) => {
  if (isServer) return undefined;
  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return theme || fallback;
};

const disableAnimation = () => {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e) e = window.matchMedia(MEDIA);
  const isDark = e.matches;
  const systemTheme = isDark ? "dark" : "light";
  return systemTheme;
};




// const theme = themeFromSourceColor(argbFromHex('#f82506'), [
//   {
//     name: "Glassmorphisum",
//     value: argbFromHex("#ff0000"),
//     blend: true,
//   },
//   {
//     name: "Neomorphisum",
//     value: argbFromHex("#ff0000"),
//     blend: true,
//   },
//   {
//     name: "LinearGradient",
//     value: argbFromHex("#ff0000"),
//     blend: true,
//   },
//   {
//     name: "Radiel Gradinet",
//     value: argbFromHex("#ff0000"),
//     blend: true,
//   },
//   {
//     name: "Mesh Gradient",
//     value: argbFromHex("#ff0000"),
//     blend: true,
//   },
//   {
//     name: "Shadow",
//     value: argbFromHex("#ff0000"),
//     blend: true,
//   },
//   {
//     name: "Neon",
//     value: argbFromHex("#ff0000"),
//     blend: true,
//   },
// ]);
// console.log(JSON.stringify(theme, null, 2));

// First Quest, (hsl to hex) converter.
function hslToHex(hsl: string) {
  const regex: any = /^(\d+|\d+\.\d+)\s+(\d+|\d+\.\d+)%\s+(\d+|\d+\.\d+)%$/;
  let matches: any = hsl.match(regex);
  let hue = Number(matches[1]);
  let saturation = Number(matches[2]);
  let luminosity = Number(matches[3]);
  // First let me make (hsl to rgb) ofcourse based on algorithm from http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB.
  let hslToRgb = function (hue, saturation, lightness) {
    if (hue == undefined) {
      return [0, 0, 0];
    }

    let chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
    let huePrime = hue / 60;
    let secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

    huePrime = Math.floor(huePrime);
    let red;
    let green;
    let blue;

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
  function hexToRgb(hex: any) {

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
  function expand(hex) {
    return hex
      .split('')
      .reduce(function (accum, value) {

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
  background: MaterialDynamicColors.background,
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
  primary: MaterialDynamicColors.primary,
  onPrimary: MaterialDynamicColors.onPrimary,
  primaryContainer: MaterialDynamicColors.primaryContainer,
  onPrimaryContainer: MaterialDynamicColors.onPrimaryContainer,
  inversePrimary: MaterialDynamicColors.inversePrimary,
  secondary: MaterialDynamicColors.secondary,
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


// console.log(JSON.stringify(shadcnThemes, null, 2));


let scheme = new SchemeContent(Hct.fromInt(argbFromHex(`${hslToHex("47.9 95.8% 53.1%")}`)), true, 1);
let theme: { [key: string]: string } = {};

for (let [key, value] of Object.entries(materialColors)) {
  theme[key] = hexFromArgb(value.getArgb(scheme));
};

// for (let [key, value] of Object.entries(theme)) {
//   let uiTheme = `${key}:"${hexToHsl(value)}",`;
//   console.log(uiTheme);
// }

// for (let [key,value] of Object.entries(shadcnThemes)){
//   let one = `${key}: ${value}`;
//   console.log(one);
// }

