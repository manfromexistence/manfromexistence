import 'jasmine';

import {customMatchers} from '../utils/test_utils';

import {SchemeAndroid} from './scheme_android';

beforeEach(() => {
  jasmine.addMatchers(customMatchers);
});

describe('android scheme', () => {
  it('blue light scheme', () => {
    const scheme = SchemeAndroid.light(0xff0000ff);
    expect(scheme.colorAccentPrimary).matchesColor(0xffe0e0ff);
  });

  it('blue dark scheme', () => {
    const scheme = SchemeAndroid.dark(0xff0000ff);
    expect(scheme.colorAccentPrimary).matchesColor(0xffe0e0ff);
  });

  it('3rd party light scheme', () => {
    const scheme = SchemeAndroid.light(0xff6750a4);
    expect(scheme.colorAccentPrimary).matchesColor(0xffe9ddff);
    expect(scheme.colorAccentSecondary).matchesColor(0xffe8def8);
    expect(scheme.colorAccentTertiary).matchesColor(0xffffd9e3);
    expect(scheme.colorSurface).matchesColor(0xfffdf8fd);
    expect(scheme.textColorPrimary).matchesColor(0xff1c1b1e);
  });

  it('3rd party dark scheme', () => {
    const scheme = SchemeAndroid.dark(0xff6750a4);
    expect(scheme.colorAccentPrimary).matchesColor(0xffe9ddff);
    expect(scheme.colorAccentSecondary).matchesColor(0xffe8def8);
    expect(scheme.colorAccentTertiary).matchesColor(0xffffd9e3);
    expect(scheme.colorSurface).matchesColor(0xff313033);
    expect(scheme.textColorPrimary).matchesColor(0xfff4eff4);
  });
});
