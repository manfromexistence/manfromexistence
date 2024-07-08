/* eslint-disable no-restricted-imports */
import { useLayoutEffect as vanillaUseLayoutEffect, useEffect } from 'react';

/**
 * A substitute for React's useLayoutEffect, which does not generate warnings on
 * SSR. It is named useLayoutEffect so that all eslint rules applying to the
 * original useLayoutEffect would also apply to it.
 * This solution was suggested by Alex Reardon.
 * @see https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
 * @see https://github.com/grommet/grommet/issues/4765
 */
export const useLayoutEffect =
  typeof window !== 'undefined' ? vanillaUseLayoutEffect : useEffect;

export default useLayoutEffect;
