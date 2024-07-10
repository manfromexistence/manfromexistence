import { Blend } from '../blend/blend';
import { CorePalette } from '../palettes/core_palette';
import { Scheme } from '../scheme/scheme';
import { sourceColorFromImage } from './image_utils';
import { hexFromArgb } from './string_utils';
// import {TonalPalette} from '../palettes/tonal_palette';

/**
 * Custom color used to pair with a theme
 */
export interface CustomColor {
  value: any;
  name: string;
  blend: boolean;
}

/**
 * Color group
 */
export interface ColorGroup {
  color: string;
  onColor: string;
  colorContainer: string;
  onColorContainer: string;
}

/**
 * Custom Color Group
 */
export interface CustomColorGroup {
  // color: any;
  value: any;
  name: string;
  blend: boolean;
  light: ColorGroup;
  dark: ColorGroup;
}

/**
 * Theme
 */
export interface Theme {
  name?: string;
  source?: string;
  schemes?: { 
    light: Scheme;
    // light_medium_contrast: Scheme;
    // light_high_contrast: Scheme;
    dark: Scheme;
    // dark_medium_contrast: Scheme;
    // dark_high_contrast: Scheme;
  };
  palettes?: {
    primary: any; 
    secondary: any; 
    tertiary: any;
    neutral: any;
    neutralVariant: any;
    error: any;
  };
  extendedColors: CustomColorGroup[];
}

/**
 * Generate a theme from a source color
 *
 * @param source Source color
 * @param customColors Array of custom colors
 * @return Theme object
 */
export function themeFromSourceColor(
  source: number, customColors: CustomColor[] = []): Theme {
  const palette = CorePalette.of(source);
  
  return {
    name: "Dx-Ui/react",
    source: hexFromArgb(source),
    schemes: {
      light: Scheme.light(source),
      dark: Scheme.dark(source)
      // light_medium_contrast: Scheme.light(source)),
      // light_high_contrast: Scheme.light(source)),
      // dark_medium_contrast: Scheme.dark(source)),
      // dark_high_contrast: Scheme.dark(source)),
    },
    palettes: {
      primary: {
        "5": hexFromArgb(palette.a1.tone(5)),
        "10": hexFromArgb(palette.a1.tone(10)),
        "15": hexFromArgb(palette.a1.tone(15)),
        "20": hexFromArgb(palette.a1.tone(20)),
        "25": hexFromArgb(palette.a1.tone(25)),
        "30": hexFromArgb(palette.a1.tone(30)),
        "35": hexFromArgb(palette.a1.tone(35)),
        "40": hexFromArgb(palette.a1.tone(40)),
        "45": hexFromArgb(palette.a1.tone(45)),
        "50": hexFromArgb(palette.a1.tone(50)),
        "60": hexFromArgb(palette.a1.tone(60)),
        "70": hexFromArgb(palette.a1.tone(70)),
        "80": hexFromArgb(palette.a1.tone(80)),
        "90": hexFromArgb(palette.a1.tone(90)),
        "95": hexFromArgb(palette.a1.tone(95)),
        "98": hexFromArgb(palette.a1.tone(98)),
        "99": hexFromArgb(palette.a1.tone(99)),
        "100": hexFromArgb(palette.a1.tone(100))
      },
      secondary: {
        "5": hexFromArgb(palette.a2.tone(5)),
        "10": hexFromArgb(palette.a2.tone(10)),
        "15": hexFromArgb(palette.a2.tone(15)),
        "20": hexFromArgb(palette.a2.tone(20)),
        "25": hexFromArgb(palette.a2.tone(25)),
        "30": hexFromArgb(palette.a2.tone(30)),
        "35": hexFromArgb(palette.a2.tone(35)),
        "40": hexFromArgb(palette.a2.tone(40)),
        "45": hexFromArgb(palette.a2.tone(45)),
        "50": hexFromArgb(palette.a2.tone(50)),
        "60": hexFromArgb(palette.a2.tone(60)),
        "70": hexFromArgb(palette.a2.tone(70)),
        "80": hexFromArgb(palette.a2.tone(80)),
        "90": hexFromArgb(palette.a2.tone(90)),
        "95": hexFromArgb(palette.a2.tone(95)),
        "98": hexFromArgb(palette.a2.tone(98)),
        "99": hexFromArgb(palette.a2.tone(99)),
        "100": hexFromArgb(palette.a2.tone(100))
      },
      tertiary: {
        "5": hexFromArgb(palette.a3.tone(5)),
        "10": hexFromArgb(palette.a3.tone(10)),
        "15": hexFromArgb(palette.a3.tone(15)),
        "20": hexFromArgb(palette.a3.tone(20)),
        "25": hexFromArgb(palette.a3.tone(25)),
        "30": hexFromArgb(palette.a3.tone(30)),
        "35": hexFromArgb(palette.a3.tone(35)),
        "40": hexFromArgb(palette.a3.tone(40)),
        "45": hexFromArgb(palette.a3.tone(45)),
        "50": hexFromArgb(palette.a3.tone(50)),
        "60": hexFromArgb(palette.a3.tone(60)),
        "70": hexFromArgb(palette.a3.tone(70)),
        "80": hexFromArgb(palette.a3.tone(80)),
        "90": hexFromArgb(palette.a3.tone(90)),
        "95": hexFromArgb(palette.a3.tone(95)),
        "98": hexFromArgb(palette.a3.tone(98)),
        "99": hexFromArgb(palette.a3.tone(99)),
        "100": hexFromArgb(palette.a3.tone(100))
      },
      neutral: {
        "5": hexFromArgb(palette.n1.tone(5)),
        "10": hexFromArgb(palette.n1.tone(10)),
        "15": hexFromArgb(palette.n1.tone(15)),
        "20": hexFromArgb(palette.n1.tone(20)),
        "25": hexFromArgb(palette.n1.tone(25)),
        "30": hexFromArgb(palette.n1.tone(30)),
        "35": hexFromArgb(palette.n1.tone(35)),
        "40": hexFromArgb(palette.n1.tone(40)),
        "45": hexFromArgb(palette.n1.tone(45)),
        "50": hexFromArgb(palette.n1.tone(50)),
        "60": hexFromArgb(palette.n1.tone(60)),
        "70": hexFromArgb(palette.n1.tone(70)),
        "80": hexFromArgb(palette.n1.tone(80)),
        "90": hexFromArgb(palette.n1.tone(90)),
        "95": hexFromArgb(palette.n1.tone(95)),
        "98": hexFromArgb(palette.n1.tone(98)),
        "99": hexFromArgb(palette.n1.tone(99)),
        "100": hexFromArgb(palette.n1.tone(100))
      },
      neutralVariant: {
        "5": hexFromArgb(palette.n2.tone(5)),
        "10": hexFromArgb(palette.n2.tone(10)),
        "15": hexFromArgb(palette.n2.tone(15)),
        "20": hexFromArgb(palette.n2.tone(20)),
        "25": hexFromArgb(palette.n2.tone(25)),
        "30": hexFromArgb(palette.n2.tone(30)),
        "35": hexFromArgb(palette.n2.tone(35)),
        "40": hexFromArgb(palette.n2.tone(40)),
        "45": hexFromArgb(palette.n2.tone(45)),
        "50": hexFromArgb(palette.n2.tone(50)),
        "60": hexFromArgb(palette.n2.tone(60)),
        "70": hexFromArgb(palette.n2.tone(70)),
        "80": hexFromArgb(palette.n2.tone(80)),
        "90": hexFromArgb(palette.n2.tone(90)),
        "95": hexFromArgb(palette.n2.tone(95)),
        "98": hexFromArgb(palette.n2.tone(98)),
        "99": hexFromArgb(palette.n2.tone(99)),
        "100": hexFromArgb(palette.n2.tone(100))
      },
      error: {
        "5": hexFromArgb(palette.error.tone(5)),
        "10": hexFromArgb(palette.error.tone(10)),
        "15": hexFromArgb(palette.error.tone(15)),
        "20": hexFromArgb(palette.error.tone(20)),
        "25": hexFromArgb(palette.error.tone(25)),
        "30": hexFromArgb(palette.error.tone(30)),
        "35": hexFromArgb(palette.error.tone(35)),
        "40": hexFromArgb(palette.error.tone(40)),
        "45": hexFromArgb(palette.error.tone(45)),
        "50": hexFromArgb(palette.error.tone(50)),
        "60": hexFromArgb(palette.error.tone(60)),
        "70": hexFromArgb(palette.error.tone(70)),
        "80": hexFromArgb(palette.error.tone(80)),
        "90": hexFromArgb(palette.error.tone(90)),
        "95": hexFromArgb(palette.error.tone(95)),
        "98": hexFromArgb(palette.error.tone(98)),
        "99": hexFromArgb(palette.error.tone(99)),
        "100": hexFromArgb(palette.error.tone(100))
      },
    },
    extendedColors: customColors.map((c) => customColor(source, c)),
  };
}

/**
 * Generate a theme from an image source
 *
 * @param image Image element
 * @param customColors Array of custom colors
 * @return Theme object
 */
export async function themeFromImage(
  image: HTMLImageElement, customColors: CustomColor[] = []) {
  const source = await sourceColorFromImage(image);
  return themeFromSourceColor(source, customColors);
}

/**
 * Generate custom color group from source and target color
 *
 * @param source Source color
 * @param color Custom color
 * @return Custom color group
 *
 * @link https://m3.material.io/styles/color/the-color-system/color-roles
 */
export function customColor(
  source: number, color: CustomColor): CustomColorGroup {
  let value = color.value;
  const from = value;
  const to = source;
  if (color.blend) {
    value = Blend.harmonize(from, to);
  }
  const palette = CorePalette.of(value);
  const tones = palette.a1;
  return {
    // color,
    name: color.name,
    value: hexFromArgb(value),
    blend: color.blend,
    light: {
      color: hexFromArgb(tones.tone(40)),
      onColor: hexFromArgb(tones.tone(100)),
      colorContainer: hexFromArgb(tones.tone(90)),
      onColorContainer: hexFromArgb(tones.tone(10)),
    },
    dark: {
      color: hexFromArgb(tones.tone(80)),
      onColor: hexFromArgb(tones.tone(20)),
      colorContainer: hexFromArgb(tones.tone(30)),
      onColorContainer: hexFromArgb(tones.tone(90)),
    },
  };
}

/**
 * Apply a theme to an element
 *
 * @param theme Theme object
 * @param options Options
 */
// export function applyTheme(theme: Theme, options?: {
//   dark?: boolean,
//   target?: HTMLElement,
//   brightnessSuffix?: boolean,
//   paletteTones?: number[],
// }) {
//   const target = options?.target || document.body;
//   const isDark = options?.dark ?? false;
//   const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
//   setSchemeProperties(target, scheme);
//   if (options?.brightnessSuffix) {
//     setSchemeProperties(target, theme.schemes.dark, '-dark');
//     setSchemeProperties(target, theme.schemes.light, '-light');
//   }
//   if (options?.paletteTones) {
//     const tones = options?.paletteTones ?? [];
//     for (const [key, palette] of Object.entries(theme.palettes)) {
//       const paletteKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
//       for (const tone of tones) {
//         const token = `--md-ref-palette-${paletteKey}-${paletteKey}${tone}`;
//         const color = hexFromArgb(palette.tone(tone));
//         target.style.setProperty(token, color);
//       }
//     }
//   }
// }

// function setSchemeProperties(
//   target: HTMLElement,
//   scheme: Scheme,
//   suffix: string = '',
// ) {
//   for (const [key, value] of Object.entries(scheme.toJSON())) {
//     const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
//     const color = hexFromArgb(value);
//     target.style.setProperty(`--md-sys-color-${token}${suffix}`, color);
//   }
// }