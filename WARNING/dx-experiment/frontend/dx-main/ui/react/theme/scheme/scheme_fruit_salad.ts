import {Hct} from '../hct/hct';
import {TonalPalette} from '../palettes/tonal_palette';
import * as math from '../utils/math_utils';

import {DynamicScheme} from './dynamic_scheme';
import {Variant} from './variant';

/**
 * A playful theme - the source color's hue does not appear in the theme.
 */
export class SchemeFruitSalad extends DynamicScheme {
  constructor(sourceColorHct: Hct, isDark: boolean, contrastLevel: number) {
    super({
      sourceColorArgb: sourceColorHct.toInt(),
      variant: Variant.FRUIT_SALAD,
      contrastLevel,
      isDark,
      primaryPalette: TonalPalette.fromHueAndChroma(
          math.sanitizeDegreesDouble(sourceColorHct.hue - 50.0), 48.0),
      secondaryPalette: TonalPalette.fromHueAndChroma(
          math.sanitizeDegreesDouble(sourceColorHct.hue - 50.0), 36.0),
      tertiaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 36.0),
      neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 10.0),
      neutralVariantPalette:
          TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0),
    });
  }
}
