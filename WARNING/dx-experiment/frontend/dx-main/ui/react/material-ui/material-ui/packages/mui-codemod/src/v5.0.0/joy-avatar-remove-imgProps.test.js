import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './joy-avatar-remove-imgProps';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('joy-avatar-remove-imgProps', () => {
      it('transforms `imgProps` prop to `slotProps.img`', () => {
        const actual = transform(
          {
            source: read('./joy-avatar-remove-imgProps.test/actual.js'),
            path: require.resolve('./joy-rename-components-to-slots.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./joy-avatar-remove-imgProps.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
