import { Registry } from '@/registry-1/schema';

export const hooks: Registry = [
  {
    name: 'use-mobile',
    type: 'registry:hook',
    files: [
      {
        path: 'hooks/use-mobile.tsx',
        type: 'registry:hook',
      },
    ],
  },
  {
    name: 'use-toast',
    type: 'registry:hook',
    files: [
      {
        path: 'hooks/use-toast.ts',
        type: 'registry:hook',
      },
    ],
  },
];
