import { type EditorPathOptions, type Location, Editor } from 'slate';

import type { TEditor } from './TEditor';

/** Get the path of a location. */
export const getPath = (
  editor: TEditor,
  at: Location,
  options?: EditorPathOptions
) => Editor.path(editor as any, at, options as any);
