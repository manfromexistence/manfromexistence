import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Tree image', () => {
  imageDemoTest('tree', { skip: ['virtual-scroll.tsx', 'big-data.tsx'] });
});
