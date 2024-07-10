import 'jasmine';

import {Contrast} from './contrast';

describe('contrast', () => {
  it('ratioOfTones_outOfBoundsInput', () => {
    expect(21.0).toBeCloseTo(Contrast.ratioOfTones(-10.0, 110.0), 0.001);
  });

  it('lighter_impossibleRatioErrors', () => {
    expect(-1.0).toBeCloseTo(Contrast.lighter(90.0, 10.0), 0.001);
  });

  it('lighter_outOfBoundsInputAboveErrors', () => {
    expect(-1.0).toBeCloseTo(Contrast.lighter(110.0, 2.0), 0.001);
  });

  it('lighter_outOfBoundsInputBelowErrors', () => {
    expect(-1.0).toBeCloseTo(Contrast.lighter(-10.0, 2.0), 0.001);
  });

  it('lighterUnsafe_returnsMaxTone', () => {
    expect(100).toBeCloseTo(Contrast.lighterUnsafe(100.0, 2.0), 0.001);
  });

  it('darker_impossibleRatioErrors', () => {
    expect(-1.0).toBeCloseTo(Contrast.darker(10.0, 20.0), 0.001);
  });

  it('darker_outOfBoundsInputAboveErrors', () => {
    expect(-1.0).toBeCloseTo(Contrast.darker(110.0, 2.0), 0.001);
  });

  it('darker_outOfBoundsInputBelowErrors', () => {
    expect(-1.0).toBeCloseTo(Contrast.darker(-10.0, 2.0), 0.001);
  });

  it('darkerUnsafe_returnsMinTone', () => {
    expect(0.0).toBeCloseTo(Contrast.darkerUnsafe(0.0, 2.0), 0.001);
  });
});