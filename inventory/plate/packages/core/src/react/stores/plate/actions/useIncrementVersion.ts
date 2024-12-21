import React from 'react';

import type { PlateChangeKey } from '../PlateStore';

import {
  type UsePlateEditorStoreOptions,
  usePlateActions,
} from '../createPlateStore';

export const useIncrementVersion = (
  key: PlateChangeKey,
  id?: string,
  options: UsePlateEditorStoreOptions = {}
) => {
  const previousVersionRef = React.useRef(1);

  const set = usePlateActions(id, {
    debugHookName: 'useIncrementVersion',
    ...options,
  })[key]();

  return React.useCallback(() => {
    const nextVersion = previousVersionRef.current + 1;
    set(nextVersion);
    previousVersionRef.current = nextVersion;
  }, [set]);
};
