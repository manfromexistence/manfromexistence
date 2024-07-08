import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './box-rename-css';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('box-rename-css', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./box-rename-css.test/actual.js'),
            path: require.resolve('./box-rename-css.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./box-rename-css.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./box-rename-css.test/expected.js'),
            path: require.resolve('./box-rename-css.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./box-rename-css.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
