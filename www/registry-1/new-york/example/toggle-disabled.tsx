import { UnderlineIcon } from '@radix-ui/react-icons';

import { Toggle } from '@/registry-1/new-york/ui/toggle';

export default function ToggleDisabled() {
  return (
    <Toggle aria-label="Toggle italic" disabled>
      <UnderlineIcon className="h-4 w-4" />
    </Toggle>
  );
}
