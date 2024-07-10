import 'jasmine';

import {hexFromArgb} from './string_utils';

declare global {
  namespace jasmine {
    interface Matchers<T> {
      matchesColor(expected: number): boolean;
    }
  }
}

/**
 * Exports a matcher called `matchesColor` that takes two numbers, and logs
 * the equivalent hex codes on failure.
 *
 * To use, add to your test file:
 *  beforeEach(() => {
 *    jasmine.addMatchers(customMatchers);
 *  });
 *
 * Then it can be used as a standard matcher:
 *  expect(scheme.onSurface).matchesColor(0xff000000);
 */
export const customMatchers: jasmine.CustomMatcherFactories = {
  matchesColor(
      util: jasmine.MatchersUtil,
      customEqualityTesters: readonly jasmine.CustomEqualityTester[]) {
    return {
      compare(actual: number, expected: number) {
        const pass = util.equals(actual, expected);
        return {
          pass,
          message: `Expected color ${hexFromArgb(actual)} to ${
              pass ? 'NOT' : ''} match: ${hexFromArgb(expected)}`,
        };
      },
    };
  },
};
