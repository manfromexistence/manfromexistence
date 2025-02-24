import { generateCliCommands } from '@/utils/utils';

import code from '@content/Components/InfiniteMenu/InfiniteMenu.jsx?raw';
import css from '@content/Components/InfiniteMenu/InfiniteMenu.css?raw';
import tailwind from '@tailwind/Components/InfiniteMenu/InfiniteMenu.jsx?raw';
import tsCode from '@ts-default/Components/InfiniteMenu/InfiniteMenu.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/InfiniteMenu/InfiniteMenu.tsx?raw';

export const infiniteMenu = {
  ...(generateCliCommands('Components/InfiniteMenu')),
  installation: `npm install gl-matrix`,
  usage: `import InfiniteMenu from './InfiniteMenu'

const items = [
  {
    image: 'https://picsum.photos/300/300?grayscale',
    link: 'https://google.com/',
    title: 'Item 1',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: 'https://google.com/',
    title: 'Item 2',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: 'https://google.com/',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/600/600?grayscale',
    link: 'https://google.com/',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
  }
];

<div style={{ height: '600px', position: 'relative' }}>
  <InfiniteMenu items={items}/>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}