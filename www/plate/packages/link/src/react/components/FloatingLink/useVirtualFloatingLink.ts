import {
  type UseVirtualFloatingOptions,
  useVirtualFloating,
} from '@udecode/plate-floating';
import { useEditorPlugin } from '@udecode/plate/react';

import { LinkPlugin } from '../../LinkPlugin';

export const useVirtualFloatingLink = ({
  editorId,
  ...floatingOptions
}: { editorId: string } & UseVirtualFloatingOptions) => {
  const { setOption } = useEditorPlugin(LinkPlugin);

  return useVirtualFloating({
    onOpenChange: (open) => setOption('openEditorId', open ? editorId : null),
    ...floatingOptions,
  });
};
