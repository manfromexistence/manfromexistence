import React from 'react';

import type { TCodeBlockElement } from '@udecode/plate-code-block';
import type { SlateElementProps } from '@udecode/plate-common';

import { cn } from '@udecode/cn';
import { SlateElement } from '@udecode/plate-common';

export const CodeBlockElementStatic = ({
  children,
  className,
  ...props
}: SlateElementProps<TCodeBlockElement>) => {
  const { element } = props;

  const codeClassName = element?.lang
    ? `${element.lang} language-${element.lang}`
    : '';

  return (
    <SlateElement
      className={cn(className, 'relative py-1', codeClassName)}
      {...props}
    >
      <pre className="overflow-x-auto rounded-md bg-muted px-6 py-8 font-mono text-sm leading-[normal] [tab-size:2]">
        <code>{children}</code>
      </pre>
    </SlateElement>
  );
};
