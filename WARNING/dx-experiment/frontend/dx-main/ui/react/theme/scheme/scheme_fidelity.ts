import {DislikeAnalyzer} from '../dislike/dislike_analyzer';
import {Hct} from '../hct/hct';
import {TonalPalette} from '../palettes/tonal_palette';
import {TemperatureCache} from '../temperature/temperature_cache';

import {DynamicScheme} from './dynamic_scheme';
import {Variant} from './variant';

/**
 * A scheme that places the source color in `Scheme.primaryContainer`.
 *
 * Primary Container is the source color, adjusted for color relativity.
 * It maintains constant appearance in light mode and dark mode.
 * This adds ~5 tone in light mode, and subtracts ~5 tone in dark mode.
 * Tertiary Container is the complement to the source color, using
 * `TemperatureCache`. It also maintains constant appearance.
 */
export class SchemeFidelity extends DynamicScheme {
  constructor(sourceColorHct: Hct, isDark: boolean, contrastLevel: number) {
    super({
      sourceColorArgb: sourceColorHct.toInt(),
      variant: Variant.FIDELITY,
      contrastLevel,
      isDark,
      primaryPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue, sourceColorHct.chroma),
      secondaryPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue,
          Math.max(sourceColorHct.chroma - 32.0, sourceColorHct.chroma * 0.5)),
      tertiaryPalette: TonalPalette.fromInt(
          DislikeAnalyzer
              .fixIfDisliked(new TemperatureCache(sourceColorHct).complement)
              .toInt()),
      neutralPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue, sourceColorHct.chroma / 8.0),
      neutralVariantPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue, sourceColorHct.chroma / 8.0 + 4.0),
    });
  }
}
