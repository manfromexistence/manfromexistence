import { serializeHtml } from '../serializeHtml';
import { components, createStaticEditor } from './create-static-editor';

describe('serializePlateStatic with attributes', () => {
  it('should serialize elements with right slate attributes', async () => {
    const editor = createStaticEditor([
      {
        children: [{ bold: true, text: 'Right Aligned Heading' }],
        type: 'p',
      },
    ]);

    const html = await serializeHtml(editor, {
      components: components,
      preserveClassNames: [],
      stripClassNames: true,
    });

    expect(html).toEqual(
      '<div data-slate-editor="true" data-slate-node="value"><div data-slate-node="element" data-slate-type="p" style="position:relative"><span data-slate-node="text"><span data-slate-leaf="true" data-slate-bold="true"><strong data-slate-leaf="true" data-slate-bold="true"><span data-slate-string="true">Right Aligned Heading</span></strong></span></span></div></div>'
    );
  });
});
