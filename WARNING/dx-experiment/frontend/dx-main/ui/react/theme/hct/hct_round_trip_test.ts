import 'jasmine';

import * as colorUtils from '../utils/color_utils';

import {Hct} from './hct';

// Testing 512 out of 16_777_216 colors.

describe('HCT roundtrip', () => {
  it('preserves original color', () => {
    for (let r = 0; r < 296; r += 37) {
      for (let g = 0; g < 296; g += 37) {
        for (let b = 0; b < 296; b += 37) {
          const argb = colorUtils.argbFromRgb(
              Math.min(255, r),
              Math.min(255, g),
              Math.min(255, b),
          );

          const hct = Hct.fromInt(argb);
          const reconstructed = Hct.from(
              hct.hue,
              hct.chroma,
              hct.tone,
          ).toInt();

          expect(reconstructed).toEqual(argb);
        }
      }
    }
  });
});
