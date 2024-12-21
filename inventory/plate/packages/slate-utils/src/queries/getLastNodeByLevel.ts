import {
  type ChildOf,
  type ElementOrTextOf,
  type TEditor,
  type TNode,
  type TNodeEntry,
  getLastNode,
  isAncestor,
} from '@udecode/slate';

const getLastChild = <N extends ChildOf<R>, R extends TNode>(
  node: R,
  level: number
): N | R => {
  if (!(level + 1) || !isAncestor(node)) return node;

  const { children } = node;

  const lastNode = children.at(-1)!;

  return getLastChild(lastNode, level - 1) as N;
};

/** Get the last node at a given level. */
export const getLastNodeByLevel = <
  N extends ElementOrTextOf<E>,
  E extends TEditor = TEditor,
>(
  editor: E,
  level: number
): TNodeEntry<N> | undefined => {
  const { children } = editor;

  const lastNode = children.at(-1);

  if (!lastNode) return;

  const [, lastPath] = getLastNode(editor, []);

  return [getLastChild(lastNode, level - 1) as N, lastPath.slice(0, level + 1)];
};
