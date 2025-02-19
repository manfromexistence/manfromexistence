import type React from 'react';

import type { CxOptions } from 'class-variance-authority';

import { cn } from './cn';
import { withProps } from './withProps';

/**
 * Set default `className` with `cn`.
 *
 * - IntelliSense: add `withCn` to `classAttributes`
 * - ESLint: add `withCn` to `settings.tailwindcss.callees`
 */
export function withCn<T extends React.ComponentType<any>>(
  Component: T,
  ...inputs: CxOptions
) {
  return withProps(Component, { className: cn(inputs) } as any);
}
