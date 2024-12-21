import React from 'react';

import type { TEditableProps } from '@udecode/slate-react';

import {
  type TDescendant,
  type TElement,
  type TNodeEntry,
  type TText,
  findNodePath,
  getRange,
  isElement,
  isInline,
  isVoid,
} from '@udecode/slate';
import clsx from 'clsx';
import { type DecoratedRange, Range, Text } from 'slate';

import type { SlateEditor } from '../../editor';
import type { NodeComponents } from '../../plugin';
import type { SlateRenderElementProps } from '../types';

import { pipeRenderElementStatic } from '../pipeRenderElementStatic';
import { pipeRenderLeafStatic } from '../pluginRenderLeafStatic';
import { pipeDecorate } from '../utils/pipeDecorate';

function ElementStatic({
  components,
  decorate,
  decorations,
  editor,
  element = { children: [], type: '' },
}: {
  components: NodeComponents;
  decorate: TEditableProps['decorate'];
  decorations: DecoratedRange[];
  editor: SlateEditor;
  element: TElement;
  style?: React.CSSProperties;
}) {
  const renderElement = pipeRenderElementStatic(editor, {
    components,
  });

  const attributes: SlateRenderElementProps['attributes'] = {
    'data-slate-node': 'element',
    ref: null,
  };

  let children: React.ReactNode = (
    <Children
      components={components}
      decorate={decorate}
      decorations={decorations}
      editor={editor}
    >
      {element.children}
    </Children>
  );

  if (isVoid(editor, element)) {
    attributes['data-slate-void'] = true;
    children = (
      <span
        style={{
          color: 'transparent',
          height: '0',
          outline: 'none',
          position: 'absolute',
        }}
        data-slate-spacer
      >
        <Children
          components={components}
          decorate={decorate}
          decorations={decorations}
          editor={editor}
        >
          {element.children}
        </Children>
      </span>
    );
  }
  if (isInline(editor, element)) {
    attributes['data-slate-inline'] = true;
  }

  return (
    <React.Fragment>
      {renderElement?.({
        attributes,
        children,
        element,
      })}
    </React.Fragment>
  );
}

function LeafStatic({
  components,
  decorations,
  editor,
  leaf = { text: '' },
}: {
  components: NodeComponents;
  decorations: DecoratedRange[];
  editor: SlateEditor;
  leaf: TText;
}) {
  const renderLeaf = pipeRenderLeafStatic(editor, {
    components,
  });

  const leaves = Text.decorations(leaf, decorations);

  return (
    <span data-slate-node="text">
      {leaves.map((l, index) => {
        const leafElement = renderLeaf!({
          attributes: { 'data-slate-leaf': true },
          children: (
            <span data-slate-string={true}>
              {l.text === '' ? '\uFEFF' : l.text}
            </span>
          ),
          leaf: l as TText,
          text: l as TText,
        });

        return <React.Fragment key={index}>{leafElement}</React.Fragment>;
      })}
    </span>
  );
}

const defaultDecorate: (entry: TNodeEntry) => DecoratedRange[] = () => [];

function Children({
  children = [],
  components,
  decorate = defaultDecorate,
  decorations,
  editor,
}: {
  children: TDescendant[];
  components: NodeComponents;
  decorate: TEditableProps['decorate'];
  decorations: DecoratedRange[];
  editor: SlateEditor;
}) {
  return (
    <React.Fragment>
      {children.map((child, i) => {
        const p = findNodePath(editor, child);

        let ds: DecoratedRange[] = [];

        if (p) {
          const range = getRange(editor, p);
          ds = decorate([child, p]);

          for (const dec of decorations) {
            const d = Range.intersection(dec, range);

            if (d) {
              ds.push(d);
            }
          }
        }

        return isElement(child) ? (
          <ElementStatic
            key={i}
            components={components}
            decorate={decorate}
            decorations={ds}
            editor={editor}
            element={child}
          />
        ) : (
          <LeafStatic
            key={i}
            components={components}
            decorations={ds}
            editor={editor}
            leaf={child}
          />
        );
      })}
    </React.Fragment>
  );
}

export type PlateStaticProps = {
  components: NodeComponents;
  editor: SlateEditor;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

export function PlateStatic(props: PlateStaticProps) {
  const { className, components, editor, ...rest } = props;

  const decorate = pipeDecorate(editor);

  let afterEditable: React.ReactNode = null;
  let beforeEditable: React.ReactNode = null;

  editor.pluginList.forEach((plugin) => {
    const {
      render: { afterEditable: AfterEditable, beforeEditable: BeforeEditable },
    } = plugin;

    if (AfterEditable) {
      afterEditable = (
        <>
          {afterEditable}
          <AfterEditable />
        </>
      );
    }
    if (BeforeEditable) {
      beforeEditable = (
        <>
          {beforeEditable}
          <BeforeEditable />
        </>
      );
    }
  });

  const content = (
    <div
      className={clsx('slate-editor', className)}
      data-slate-editor
      data-slate-node="value"
      {...rest}
    >
      <Children
        components={components}
        decorate={decorate}
        decorations={[]}
        editor={editor}
      >
        {editor.children}
      </Children>
    </div>
  );

  let aboveEditable: React.ReactNode = (
    <>
      {beforeEditable}
      {content}
      {afterEditable}
    </>
  );

  editor.pluginList.forEach((plugin) => {
    const {
      render: { aboveEditable: AboveEditable },
    } = plugin;

    if (AboveEditable) {
      aboveEditable = <AboveEditable>{aboveEditable}</AboveEditable>;
    }
  });

  return aboveEditable;
}
