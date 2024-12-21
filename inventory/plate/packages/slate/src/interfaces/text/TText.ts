import type {
  Simplify,
  UnionToIntersection,
  UnknownObject,
} from '@udecode/utils';

import type { TEditor } from '../editor/TEditor';
import type { TElement } from '../element/TElement';
import type { TNode, TNodeProps } from '../node/TNode';

/**
 * `Text` objects represent the nodes that contain the actual text content of a
 * Slate document along with any formatting properties. They are always leaf
 * nodes in the document tree as they cannot contain any children.
 */
export type TText = {
  text: string;
} & UnknownObject;

/** A utility type to get all the text node types from a root node type. */
export type TextOf<N extends TNode> = TEditor extends N
  ? TText
  : TElement extends N
    ? TText
    : N extends TEditor
      ? TextOf<N['children'][number]>
      : N extends TElement
        ? Extract<N['children'][number], TText> | TextOf<N['children'][number]>
        : N extends TText
          ? N
          : never;

/** A utility type to get all the mark types from a root node type. */
export type MarksOf<N extends TNode> = Simplify<
  UnionToIntersection<TNodeProps<TextOf<N>>>
>;

export type MarkKeysOf<N extends TNode> =
  {} extends MarksOf<N> ? unknown : keyof MarksOf<N>;
