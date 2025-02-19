import { FontItalicIcon } from '@radix-ui/react-icons';

import { Toggle } from '@/registry-1/new-york/ui/toggle';

export default function ToggleSm() {
  return (
    <Toggle size="sm" aria-label="Toggle italic">
      <FontItalicIcon className="h-4 w-4" />
    </Toggle>
  );
}
