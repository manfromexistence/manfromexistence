import { bindFirst } from '@udecode/utils';

import { createSlatePlugin } from '../../plugin';
import { deserializeHtml, parseHtmlDocument } from './utils';

/**
 * Enables support for deserializing inserted content from HTML format to Slate
 * format and serializing Slate content to HTML format.
 */
export const HtmlPlugin = createSlatePlugin({
  key: 'html',
})
  .extendApi(({ editor }) => ({
    deserialize: bindFirst(deserializeHtml, editor),
  }))
  .extend({
    parser: {
      format: 'text/html',
      deserialize: ({ api, data }) => {
        const document = parseHtmlDocument(data);

        return api.html.deserialize({
          element: document.body,
        });
      },
    },
  });
