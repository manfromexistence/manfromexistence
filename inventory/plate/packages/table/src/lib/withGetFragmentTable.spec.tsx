/** @jsx jsxt */

import type { SlateEditor } from '@udecode/plate-common';

import { createPlateEditor } from '@udecode/plate-common/react';
import { jsxt } from '@udecode/plate-test-utils';

import { BaseTablePlugin } from '.';
import { getTableGridAbove } from './queries/getTableGridAbove';

jsxt;

describe('withGetFragmentTable', () => {
  // https://github.com/udecode/editor-protocol/issues/19
  describe('when copying cells 11-21', () => {
    it('should copy a table 2x1 with 11-21 cells', () => {
      const input = (
        <editor>
          <htable>
            <htr>
              <htd>
                11
                <anchor />
              </htd>
              <htd>12</htd>
            </htr>
            <htr>
              <htd>
                21
                <focus />
              </htd>
              <htd>22</htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const editor = createPlateEditor({
        editor: input,
        plugins: [BaseTablePlugin],
      });

      const fragment = editor.getFragment();

      expect(fragment).toEqual([getTableGridAbove(editor)[0][0]]);
    });
  });

  // https://github.com/udecode/editor-protocol/issues/63
  describe('when copying a single cell with 2 blocks', () => {
    it('should copy only the 2 blocks', () => {
      const blocks = (
        <fragment>
          <hp>
            <anchor />
            11
          </hp>
          <hp>
            12
            <focus />
          </hp>
        </fragment>
      );

      const input = (
        <editor>
          <htable>
            <htr>
              <htd>{blocks}</htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const editor = createPlateEditor({
        editor: input,
        plugins: [BaseTablePlugin],
      });

      const fragment = editor.getFragment();

      expect(fragment).toEqual(blocks);
    });
  });
});
