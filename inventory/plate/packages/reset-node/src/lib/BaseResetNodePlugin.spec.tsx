/** @jsx jsxt */

import { createSlateEditor } from '@udecode/plate-common';
import { jsxt } from '@udecode/plate-test-utils';

import { BaseResetNodePlugin } from './BaseResetNodePlugin';

jsxt;

describe('ResetNodePlugin', () => {
  describe('when delete from start to end of editor', () => {
    const input = (
      <editor>
        <hp test="test">
          <anchor />
          test
        </hp>
        <hp>
          test
          <focus />
        </hp>
      </editor>
    ) as any;

    const output = (
      <editor>
        <hp>
          <htext />
          <cursor />
        </hp>
      </editor>
    ) as any;

    it('should reset', () => {
      const editor = createSlateEditor({
        editor: input,
        plugins: [BaseResetNodePlugin],
      });

      editor.deleteFragment();

      expect(editor.children).toEqual(output.children);
    });
  });

  describe('when delete from end to start of editor', () => {
    const input = (
      <editor>
        <hp test="test">
          <focus />
          test
        </hp>
        <hp>
          test
          <anchor />
        </hp>
      </editor>
    ) as any;

    const output = (
      <editor>
        <hp>
          <htext />
          <cursor />
        </hp>
      </editor>
    ) as any;

    it('should reset', () => {
      const editor = createSlateEditor({
        editor: input,
        plugins: [BaseResetNodePlugin],
      });

      editor.deleteFragment();

      expect(editor.children).toEqual(output.children);
    });
  });

  describe('when delete at first block start', () => {
    const input = (
      <editor>
        <hh1 test="test">
          <cursor />
          test
        </hh1>
      </editor>
    ) as any;

    const output = (
      <editor>
        <hp>
          <cursor />
          test
        </hp>
      </editor>
    ) as any;

    it('should reset', () => {
      const editor = createSlateEditor({
        editor: input,
        plugins: [BaseResetNodePlugin],
      });

      editor.deleteBackward('character');

      expect(editor.children).toEqual(output.children);
    });
  });
});
