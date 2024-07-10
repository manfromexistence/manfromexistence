import 'jasmine';

import {DynamicScheme} from './dynamic_scheme';
import {Hct} from '../hct/hct';

describe('dynamic scheme test', () => {
  it('0 length input', () => {
    const hue = DynamicScheme.getRotatedHue(Hct.from(43, 16, 16), [], []);
    expect(hue).toBeCloseTo(43, 0.4);
  });

  it('1 length input no rotation', () => {
    const hue = DynamicScheme.getRotatedHue(Hct.from(43, 16, 16), [0], [0]);
    expect(hue).toBeCloseTo(43, 0.4);
  });

  it('input length mismatch asserts', () => {
    expect(() => {
      DynamicScheme.getRotatedHue(Hct.from(43, 16, 16), [0, 1], [0]);
    }).toThrow();
  });

  it('on boundary rotation correct', () => {
    const hue = DynamicScheme.getRotatedHue(
      Hct.from(43, 16, 16),
      [0, 42, 360],
      [0, 15, 0],
    );
    expect(hue).toBeCloseTo(43 + 15, 0.4);
  });

  it('rotation result larger than 360 degrees wraps', () => {
    const hue = DynamicScheme.getRotatedHue(
      Hct.from(43, 16, 16),
      [0, 42, 360],
      [0, 480, 0],
    );
    expect(hue).toBeCloseTo(163, 0.4);
  });
});
