/** @jsx jsxt */

import type { TEditor } from '@udecode/slate';

import { jsxt } from '@udecode/plate-test-utils';

import { isBlockTextEmptyAfterSelection } from '../../isBlockTextEmptyAfterSelection';

jsxt;

const editor = (
  <editor>
    <hp>
      <htext>first</htext>
      <ha>test</ha>
    </hp>
  </editor>
) as any as TEditor;

const output = false;

it('should be', () => {
  editor.isInline = (element) => element.type === 'a';

  expect(isBlockTextEmptyAfterSelection(editor)).toEqual(output);
});