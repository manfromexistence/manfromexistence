import React from 'react';

import { cn } from '@udecode/cn';

import { AspectRatio } from './ui/aspect-ratio';

export function ComponentCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <AspectRatio asChild ratio={1 / 1}>
      <div
        className={cn(
          'flex items-center justify-center rounded-md border p-8',
          className
        )}
        {...props}
      />
    </AspectRatio>
  );
}
