/**
 * An interface to allow use of different color spaces by
 * quantizers.
 */

export declare interface PointProvider {
  toInt(point: number[]): number;
  fromInt(argb: number): number[];
  distance(from: number[], to: number[]): number;
}
