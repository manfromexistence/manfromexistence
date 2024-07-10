import {Hct} from '../hct/hct';
import {TonalPalette} from '../palettes/tonal_palette';

import {DynamicScheme} from './dynamic_scheme';
import {Variant} from './variant';

/**
 * A Dynamic Color theme that maxes out colorfulness at each position in the
 * Primary Tonal Palette.
 */
export class SchemeVibrant extends DynamicScheme {
  /**
   * Hues (in degrees) used at breakpoints such that designers can specify a
   * hue rotation that occurs at a given break point.
   */
  private static readonly hues = [
    0.0,
    41.0,
    61.0,
    101.0,
    131.0,
    181.0,
    251.0,
    301.0,
    360.0,
  ];

  /**
   * Hue rotations (in degrees) of the Secondary [TonalPalette],
   * corresponding to the breakpoints in [hues].
   */
  private static readonly secondaryRotations = [
    18.0,
    15.0,
    10.0,
    12.0,
    15.0,
    18.0,
    15.0,
    12.0,
    12.0,
  ];

  /**
   * Hue rotations (in degrees) of the Tertiary [TonalPalette],
   * corresponding to the breakpoints in [hues].
   */
  private static readonly tertiaryRotations = [
    35.0,
    30.0,
    20.0,
    25.0,
    30.0,
    35.0,
    30.0,
    25.0,
    25.0,
  ];

  constructor(sourceColorHct: Hct, isDark: boolean, contrastLevel: number) {
    super({
      sourceColorArgb: sourceColorHct.toInt(),
      variant: Variant.VIBRANT,
      contrastLevel,
      isDark,
      primaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 200.0),
      secondaryPalette: TonalPalette.fromHueAndChroma(
          DynamicScheme.getRotatedHue(
              sourceColorHct, SchemeVibrant.hues,
              SchemeVibrant.secondaryRotations),
          24.0),
      tertiaryPalette: TonalPalette.fromHueAndChroma(
          DynamicScheme.getRotatedHue(
              sourceColorHct, SchemeVibrant.hues,
              SchemeVibrant.tertiaryRotations),
          32.0),
      neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 10.0),
      neutralVariantPalette:
          TonalPalette.fromHueAndChroma(sourceColorHct.hue, 12.0),
    });
  }
}
