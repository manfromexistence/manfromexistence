import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './core-styles-import';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('core-styles-import', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./core-styles-import.test/actual.js'),
            path: require.resolve('./core-styles-import.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./core-styles-import.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./core-styles-import.test/expected.js'),
            path: require.resolve('./core-styles-import.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./core-styles-import.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
