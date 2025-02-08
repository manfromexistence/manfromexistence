import { blocks } from '@/registry-1/registry-blocks';
import { charts } from '@/registry-1/registry-charts';
import { examples } from '@/registry-1/registry-examples';
import { hooks } from '@/registry-1/registry-hooks';
import { lib } from '@/registry-1/registry-lib';
import { themes } from '@/registry-1/registry-themes';
import { ui } from '@/registry-1/registry-ui';
import { Registry } from '@/registry-1/schema';

export const registry: Registry = [
  ...ui,
  ...examples,
  ...blocks,
  ...charts,
  ...lib,
  ...hooks,
  ...themes,
];
