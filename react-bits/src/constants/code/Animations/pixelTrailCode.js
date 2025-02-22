import { generateCliCommands } from '@/utils/utils';

import code from '@content/Animations/PixelTrail/PixelTrail.jsx?raw';
import css from '@content/Animations/PixelTrail/PixelTrail.css?raw';
import tailwind from '@tailwind/Animations/PixelTrail/PixelTrail.jsx?raw';
import tsCode from '@ts-default/Animations/PixelTrail/PixelTrail.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/PixelTrail/PixelTrail.tsx?raw';

export const pixelTrail = {
  ...(generateCliCommands('Animations/PixelTrail')),
  installation: `npm i three @react-three/fiber @react-three/drei`,
  usage: `import PixelTrail from './PixelTrail';

<div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
  <PixelTrail
    gridSize={50}
    trailSize={0.1}
    maxAge={250}
    interpolate={5}
    color="#fff"
    gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
