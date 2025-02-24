import type { TElement } from '@udecode/plate';
import type { DropTargetMonitor, XYCoord } from 'react-dnd';

import type {
  DragItemNode,
  DropDirection,
  ElementDragItemNode,
} from '../types';

export interface GetHoverDirectionOptions {
  dragItem: DragItemNode;

  /** Hovering node. */
  element: TElement;

  monitor: DropTargetMonitor;

  /** The node ref of the node being dragged. */
  nodeRef: any;

  /** The orientation of the drag operation. */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * If dragging a node A over another node B: get the direction of node A
 * relative to node B.
 */
export const getHoverDirection = ({
  dragItem,
  element,
  monitor,
  nodeRef,
  orientation = 'vertical',
}: GetHoverDirectionOptions): DropDirection => {
  if (!nodeRef.current) return;
  // Don't replace items with themselves
  if (element === (dragItem as ElementDragItemNode).element) return;

  // Determine rectangle on screen
  const hoverBoundingRect = nodeRef.current?.getBoundingClientRect();

  if (!hoverBoundingRect) {
    return;
  }

  // Determine mouse position
  const clientOffset = monitor.getClientOffset();

  if (!clientOffset) {
    return;
  }
  if (orientation === 'vertical') {
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Get pixels to the top
    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (hoverClientY < hoverMiddleY) {
      return 'top';
    }
    // Dragging upwards
    if (hoverClientY >= hoverMiddleY) {
      return 'bottom';
    }
  } else {
    // Horizontal orientation for columns
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

    return hoverClientX < hoverMiddleX ? 'left' : 'right';
  }
};
