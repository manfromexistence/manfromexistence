import { BoldPlugin } from '@udecode/plate-basic-marks/react';

import { createPlateEditor } from '../../../../react/editor/withPlate';
import { type HtmlDeserializer, createSlatePlugin } from '../../../plugin';
import { BaseParagraphPlugin } from '../../paragraph';
import { pluginDeserializeHtml } from './pluginDeserializeHtml';

const parse = () => ({ type: BaseParagraphPlugin.key });

// describe('when type', () => {
//   let deserializer: Deserializer = {};
//   const htmlDeserializer: HtmlDeserializer = {};
//
//   deserializer = htmlDeserializer;
// });

describe('when element is p and validNodeName is P', () => {
  it('should be p type', () => {
    const deserializer: HtmlDeserializer = {
      isElement: true,
      parse,
      rules: [
        {
          validNodeName: 'P',
        },
      ],
    };

    expect(
      pluginDeserializeHtml(
        createPlateEditor(),
        createSlatePlugin({
          node: { type: BaseParagraphPlugin.key },
          parsers: {
            html: {
              deserializer,
            },
          },
        }),
        { element: document.createElement('p') }
      )?.node
    ).toEqual(parse());
  });
});

describe('when element is p, validAttribute', () => {
  it('returns p type with an existing attribute', () => {
    const element = document.createElement('p');
    element.setAttribute('title', '');

    expect(
      pluginDeserializeHtml(
        createPlateEditor(),
        createSlatePlugin({
          node: { type: BaseParagraphPlugin.key },
          parsers: {
            html: {
              deserializer: {
                isElement: true,
                parse: parse,
                rules: [
                  {
                    validAttribute: { title: '' },
                  },
                ],
              },
            },
          },
        }),
        { element }
      )?.node
    ).toEqual(parse());
  });

  it('doesnt return p type with an unset attribute', () => {
    const element = document.createElement('p');

    expect(
      pluginDeserializeHtml(
        createPlateEditor(),
        createSlatePlugin({
          node: { type: BaseParagraphPlugin.key },
          parsers: {
            html: {
              deserializer: {
                isElement: true,
                parse: parse,
                rules: [
                  {
                    validAttribute: { title: '' },
                  },
                ],
              },
            },
          },
        }),
        { element }
      )?.node
    ).not.toEqual(parse());
  });
});

describe('when element is p with color and rule style is different', () => {
  it('should not be p type', () => {
    const element = document.createElement('p');
    element.style.color = '#FF0000';

    expect(
      pluginDeserializeHtml(
        createPlateEditor(),
        createSlatePlugin({
          node: { type: BaseParagraphPlugin.key },
          parsers: {
            html: {
              deserializer: {
                isElement: true,
                parse: parse,
                rules: [
                  {
                    validStyle: {
                      color: '#333',
                    },
                  },
                ],
              },
            },
          },
        }),
        { element }
      )?.node
    ).not.toEqual(parse());
  });
});

describe('when element is p with same style color than rule', () => {
  it('should be', () => {
    const element = document.createElement('p');
    element.style.color = 'rgb(255, 0, 0)';

    expect(
      pluginDeserializeHtml(
        createPlateEditor(),
        createSlatePlugin({
          node: { type: BaseParagraphPlugin.key },
          parsers: {
            html: {
              deserializer: {
                isElement: true,
                parse: parse,
                rules: [
                  {
                    validStyle: {
                      color: 'rgb(255, 0, 0)',
                    },
                  },
                ],
              },
            },
          },
        }),
        { element }
      )?.node
    ).toEqual(parse());
  });
});

describe('when element has style color and rule style color is *', () => {
  it('should be p type', () => {
    const element = document.createElement('p');
    element.style.color = '#FF0000';

    expect(
      pluginDeserializeHtml(
        createPlateEditor(),
        createSlatePlugin({
          node: { type: BaseParagraphPlugin.key },
          parsers: {
            html: {
              deserializer: {
                isElement: true,
                parse: parse,
                rules: [
                  {
                    validStyle: {
                      color: '*',
                    },
                  },
                ],
              },
            },
          },
        }),
        { element }
      )?.node
    ).toEqual(parse());
  });
});

describe('when element is strong and validNodeName is strong', () => {
  it('should be', () => {
    const el = document.createElement('strong');
    el.textContent = 'hello';

    expect(
      pluginDeserializeHtml(
        createPlateEditor(),
        createSlatePlugin({
          node: { isLeaf: true, type: BoldPlugin.key },
          parsers: {
            html: {
              deserializer: {
                rules: [
                  {
                    validNodeName: 'STRONG',
                  },
                ],
              },
            },
          },
        }),
        { deserializeLeaf: true, element: el }
      )?.node
    ).toEqual({ [BoldPlugin.key]: true });
  });
});
