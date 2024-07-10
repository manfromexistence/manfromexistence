import * as utils from '../utils/color_utils';

import {PointProvider} from './point_provider';

/**
 * Provides conversions needed for K-Means quantization. Converting input to
 * points, and converting the final state of the K-Means algorithm to colors.
 */
export class LabPointProvider implements PointProvider {
  /**
   * Convert a color represented in ARGB to a 3-element array of L*a*b*
   * coordinates of the color.
   */
  fromInt(argb: number): number[] {
    return utils.labFromArgb(argb);
  }

  /**
   * Convert a 3-element array to a color represented in ARGB.
   */
  toInt(point: number[]): number {
    return utils.argbFromLab(point[0], point[1], point[2]);
  }

  /**
   * Standard CIE 1976 delta E formula also takes the square root, unneeded
   * here. This method is used by quantization algorithms to compare distance,
   * and the relative ordering is the same, with or without a square root.
   *
   * This relatively minor optimization is helpful because this method is
   * called at least once for each pixel in an image.
   */
  distance(from: number[], to: number[]): number {
    const dL = from[0] - to[0];
    const dA = from[1] - to[1];
    const dB = from[2] - to[2];
    return dL * dL + dA * dA + dB * dB;
  }
}
