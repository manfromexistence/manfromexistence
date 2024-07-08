/* eslint-disable global-require */
import pkg from '../package.json';

const testDist = process.env.LIB_DIR === 'dist';
const testDistMin = process.env.LIB_DIR === 'dist-min';

describe('antd dist files', () => {
  // https://github.com/ant-design/ant-design/issues/1638
  // https://github.com/ant-design/ant-design/issues/1968
  it('exports modules correctly', () => {
    let antd;
    if (testDist) {
      // eslint-disable-next-line import/no-unresolved
      antd = require('../dist/antd');
    } else if (testDistMin) {
      // eslint-disable-next-line import/no-unresolved
      antd = require('../dist/antd.min');
    } else {
      antd = require('../components');
    }
    expect(Object.keys(antd)).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/1970
  // https://github.com/ant-design/ant-design/issues/1804
  if (testDist) {
    it('antd.js should export version', () => {
      // eslint-disable-next-line global-require,import/no-unresolved
      const antd = require('../dist/antd');
      expect(antd).toBeTruthy();
      expect(antd.version).toBe(pkg.version);
    });

    it('antd.min.js should export version', () => {
      // eslint-disable-next-line global-require,import/no-unresolved
      const antd = require('../dist/antd.min');
      expect(antd).toBeTruthy();
      expect(antd.version).toBe(pkg.version);
    });
  }
});
