import {Hct} from '../hct/hct';
import {TonalPalette} from '../palettes/tonal_palette';

import {DynamicScheme} from './dynamic_scheme';
import {Variant} from './variant';

/** A Dynamic Color theme that is near grayscale. */
export class SchemeNeutral extends DynamicScheme {
  constructor(sourceColorHct: Hct, isDark: boolean, contrastLevel: number) {
    super({
      sourceColorArgb: sourceColorHct.toInt(),
      variant: Variant.NEUTRAL,
      contrastLevel,
      isDark,
      primaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 12.0),
      secondaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 8.0),
      tertiaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0),
      neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 2.0),
      neutralVariantPalette:
          TonalPalette.fromHueAndChroma(sourceColorHct.hue, 2.0),
    });
  }
}