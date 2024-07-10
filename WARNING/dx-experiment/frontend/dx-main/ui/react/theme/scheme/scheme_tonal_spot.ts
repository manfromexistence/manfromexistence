import {Hct} from '../hct/hct';
import {TonalPalette} from '../palettes/tonal_palette';
import * as math from '../utils/math_utils';

import {DynamicScheme} from './dynamic_scheme';
import {Variant} from './variant';

/**
 * A Dynamic Color theme with low to medium colorfulness and a Tertiary
 * TonalPalette with a hue related to the source color.
 *
 * The default Material You theme on Android 12 and 13.
 */
export class SchemeTonalSpot extends DynamicScheme {
  constructor(sourceColorHct: Hct, isDark: boolean, contrastLevel: number) {
    super({
      sourceColorArgb: sourceColorHct.toInt(),
      variant: Variant.TONAL_SPOT,
      contrastLevel,
      isDark,
      primaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 36.0),
      secondaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0),
      tertiaryPalette: TonalPalette.fromHueAndChroma(
          math.sanitizeDegreesDouble(sourceColorHct.hue + 60.0),
          24.0,
          ),
      neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 6.0),
      neutralVariantPalette:
          TonalPalette.fromHueAndChroma(sourceColorHct.hue, 8.0),
    });
  }
}
