import {Hct} from '../hct/hct';
import {TonalPalette} from '../palettes/tonal_palette';

import {DynamicScheme} from './dynamic_scheme';
import {Variant} from './variant';

/** A Dynamic Color theme that is grayscale. */
export class SchemeMonochrome extends DynamicScheme {
  constructor(sourceColorHct: Hct, isDark: boolean, contrastLevel: number) {
    super({
      sourceColorArgb: sourceColorHct.toInt(),
      variant: Variant.MONOCHROME,
      contrastLevel,
      isDark,
      primaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0),
      secondaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0),
      tertiaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0),
      neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0),
      neutralVariantPalette:
          TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0),
    });
  }
}