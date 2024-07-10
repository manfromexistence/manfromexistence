import readline from 'readline';
import {
    argbFromHex,
    Hct,
    hexFromArgb,
    MaterialDynamicColors,
    SchemeContent,
} from '@material/material-color-utilities';

var rgbToHsl = require('rgb-to-hsl');
var hexToRgb = require('hex-to-rgb');

function hexToHsl(hex:any) {
	var hsl = rgbToHsl.apply(rgbToHsl, hexToRgb(hex));
	return [`${Math.round(hsl[0])} ${parseInt(hsl[1], 10)}% ${parseInt(hsl[2], 10)}%`];
};


// type Range = [number, number];
// const HUE_RANGE: Range = [0, 360];
// const CHROMA_RANGE: Range = [0, 150];
// const TONE_RANGE: Range = [0, 100];

export interface Theme {
    [tokenName: string]: string;
}

export class ChangeColorEvent extends Event {
    constructor(public color: string) {
        super('change-color', { bubbles: true, composed: true });
    }
}

export class ChangeDarkModeEvent extends Event {
    constructor(public mode: 'light' | 'dark' | 'auto') {
        super('change-mode', { bubbles: true, composed: true });
    }
}

declare global {
    interface HTMLElementEventMap {
        'change-color': ChangeColorEvent;
        'change-mode': ChangeDarkModeEvent;
    }
}


export function applyThemeString(
    themeString: string,
    ssName = 'ui-theme',
) {
    const surfaceContainer = themeString.match(
        /--surface-container:(.+?);/,
    )?.[1];
}

const materialColors = {
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
};

export function hctFromHex(value: string) {
    return Hct.fromInt(argbFromHex(value));
}

export function hexFromHct(hue: number, chroma: number, tone: number) {
    const hct = Hct.from(hue, chroma, tone);
    const value = hct.toInt();
    return hexFromArgb(value);
}

export function themeFromSourceColor(color: string, isDark: boolean): Theme {
    const scheme = new SchemeContent(Hct.fromInt(argbFromHex(color)), isDark, 0);
    const theme: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(materialColors)) {
        theme[key] = hexFromArgb(value.getArgb(scheme));
    }
    return theme;
}

export function applyMaterialTheme(
    theme: Theme,
    ssName = 'ui',
) {
    let styleString = '\n';
    for (const [key, value] of Object.entries(theme)) {
        styleString += `document.documentElement.style.setProperty('--${key}',);`;
    }
    styleString += '\n';

    console.log(styleString);
    applyThemeString(styleString, ssName);
}

export type ColorMode = 'light' | 'dark' | 'auto';

function applyThemeFromColor(color: string, isDark: boolean) {
    const theme = themeFromSourceColor(color, isDark);
    applyMaterialTheme(theme);
}

export function isModeDark(mode: ColorMode, saveAutoMode = true) {
    let isDark = mode === 'dark';
    if (mode === 'auto') {
        console.log("dark")
    }
    return isDark;
}

applyThemeFromColor("#000000",true);
