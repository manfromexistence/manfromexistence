import * as utils from '../utils/color_utils';

/**
 * Quantizes an image into a map, with keys of ARGB colors, and values of the
 * number of times that color appears in the image.
 */
// material_color_utilities is designed to have a consistent API across
// platforms and modular components that can be moved around easily. Using a
// class as a namespace facilitates this.
//
// tslint:disable-next-line:class-as-namespace
export class QuantizerMap {
  /**
   * @param pixels Colors in ARGB format.
   * @return A Map with keys of ARGB colors, and values of the number of times
   *     the color appears in the image.
   */
  static quantize(pixels: number[]): Map<number, number> {
    const countByColor = new Map<number, number>();
    for (let i = 0; i < pixels.length; i++) {
      const pixel = pixels[i];
      const alpha = utils.alphaFromArgb(pixel);
      if (alpha < 255) {
        continue;
      }
      countByColor.set(pixel, (countByColor.get(pixel) ?? 0) + 1);
    }
    return countByColor;
  }
}
