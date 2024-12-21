import type { RegistryEntry } from '@/registry/schema';

export function getRegistryTitle(item: Partial<RegistryEntry>): string {
  return (
    item.doc?.title ??
    item.name
      ?.replace('-demo', '')
      ?.split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') ??
    ''
  );
}

export function getDocTitle(item: { route?: string; title?: string }): string {
  return (
    item.title ??
    item.route
      ?.split('/')
      .pop()
      ?.split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') ??
    ''
  );
}
