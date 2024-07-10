import 'jasmine';

import {Hct} from '../hct/hct';

import {DislikeAnalyzer} from './dislike_analyzer';

describe('dislike analyzer', () => {
  it('likes Monk Skin Tone Scale colors', () => {
    // From https://skintone.google#/get-started
    const monkSkinToneScaleColors = [
      0xfff6ede4,
      0xfff3e7db,
      0xfff7ead0,
      0xffeadaba,
      0xffd7bd96,
      0xffa07e56,
      0xff825c43,
      0xff604134,
      0xff3a312a,
      0xff292420,
    ];
    for (const color of monkSkinToneScaleColors) {
      expect(DislikeAnalyzer.isDisliked(Hct.fromInt(color))).toBeFalse();
    }
  });

  it('dislikes bile colors', () => {
    const unlikable = [
      0xff95884B,
      0xff716B40,
      0xffB08E00,
      0xff4C4308,
      0xff464521,
    ];
    for (const color of unlikable) {
      expect(DislikeAnalyzer.isDisliked(Hct.fromInt(color))).toBeTrue();
    }
  });

  it('makes bile colors likable', () => {
    const unlikable = [
      0xff95884B,
      0xff716B40,
      0xffB08E00,
      0xff4C4308,
      0xff464521,
    ];
    for (const color of unlikable) {
      const hct = Hct.fromInt(color);
      expect(DislikeAnalyzer.isDisliked(hct)).toBeTrue();
      const likable = DislikeAnalyzer.fixIfDisliked(hct);
      expect(DislikeAnalyzer.isDisliked(likable)).toBeFalse();
    }
  });

  it('likes tone 67 colors', () => {
    const color = Hct.from(100.0, 50.0, 67.0);
    expect(DislikeAnalyzer.isDisliked(color)).toBeFalse()
    expect(DislikeAnalyzer.fixIfDisliked(color).toInt()).toEqual(color.toInt());
  });
});
