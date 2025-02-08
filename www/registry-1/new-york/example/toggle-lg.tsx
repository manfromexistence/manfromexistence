import { FontItalicIcon } from '@radix-ui/react-icons';

import { Toggle } from '@/registry-1/new-york/ui/toggle';

export default function ToggleLg() {
  return (
    <Toggle size="lg" aria-label="Toggle italic">
      <FontItalicIcon className="h-4 w-4" />
    </Toggle>
  );
}
