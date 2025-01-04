'use client';

import * as React from 'react';

import type { TableOfContents } from '@/lib/toc';

import { cn } from '@udecode/cn';

import { useLocale } from '@/hooks/useLocale';

interface TocProps {
  toc: TableOfContents;
}

const i18n = {
  cn: {
    onThisPage: '目录',
  },
  en: {
    onThisPage: 'On This Page',
  },
};

export function DashboardTableOfContents({ toc }: TocProps) {
  const locale = useLocale();
  const content = i18n[locale as keyof typeof i18n];

  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [
              item.url,
              item?.items?.map((_item) => _item.url),
            ])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split('#')[1] ?? '')
        : [],
    [toc]
  );
  const activeHeading = useActiveItem(itemIds);

  if (!toc?.items?.length) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">{content.onThisPage}</p>
      <Tree activeItem={activeHeading!} tree={toc} />
    </div>
  );
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    itemIds?.forEach((id) => {
      // eslint-disable-next-line unicorn/prefer-query-selector
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        // eslint-disable-next-line unicorn/prefer-query-selector
        const element = document.getElementById(id);

        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  activeItem?: string;
  level?: number;
}

function Tree({ activeItem, level = 1, tree }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn('m-0 list-none', { 'pl-4': level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn('mt-0 pt-2')}>
            <a
              className={cn(
                'inline-block no-underline transition-colors hover:text-foreground',
                item.url === `#${activeItem}`
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground'
              )}
              href={item.url}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree activeItem={activeItem} level={level + 1} tree={item} />
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}
