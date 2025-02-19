import React from 'react';

import type { Nullable } from '@udecode/plate';

import {
  createAtomStore,
  createPrimitiveComponent,
  useReadOnly,
} from '@udecode/plate/react';

import type { ResizeDirection, ResizeEvent } from '../types';

import { isTouchEvent } from '../utils';

export type ResizeHandleStoreState = {
  onResize: (event: ResizeEvent) => void;
};

const initialState: Nullable<ResizeHandleStoreState> = {
  onResize: null,
};

export const {
  ResizeHandleProvider,
  useResizeHandleSet,
  useResizeHandleStore,
  useResizeHandleValue,
} = createAtomStore(initialState as ResizeHandleStoreState, {
  name: 'resizeHandle',
  suppressWarnings: true,
});

export type ResizeHandleOptions = {
  direction?: ResizeDirection;
  initialSize?: number;
  onHover?: () => void;
  onHoverEnd?: () => void;
  onMouseDown?: React.MouseEventHandler;
  onResize?: (event: ResizeEvent) => void;
  onTouchStart?: React.TouchEventHandler;
};

export const useResizeHandleState = ({
  direction = 'left',
  initialSize: _initialSize,
  onHover,
  onHoverEnd,
  onMouseDown,
  onResize: onResizeProp,
  onTouchStart,
}: ResizeHandleOptions) => {
  const readOnly = useReadOnly();
  const onResizeStore = useResizeHandleValue('onResize');
  const onResize = onResizeProp ?? onResizeStore;

  const [isResizing, setIsResizing] = React.useState(false);
  const [initialPosition, setInitialPosition] = React.useState(0);
  const [initialSizeState, setInitialSize] = React.useState(0);
  const initialSize = _initialSize ?? initialSizeState;

  const isHorizontal = direction === 'left' || direction === 'right';

  React.useEffect(() => {
    if (!isResizing) return;

    const sendResizeEvent = (
      event: MouseEvent | TouchEvent,
      finished: boolean
    ) => {
      const { clientX, clientY } = isTouchEvent(event)
        ? event.touches[0] || event.changedTouches[0]
        : event;

      const currentPosition = isHorizontal ? clientX : clientY;
      const delta = currentPosition - initialPosition;
      onResize({
        delta,
        direction,
        finished,
        initialSize,
      });
    };

    const handleMouseMove = (event: MouseEvent | TouchEvent) =>
      sendResizeEvent(event, false);

    const handleMouseUp = (event: MouseEvent | TouchEvent) => {
      setIsResizing(false);
      onHoverEnd?.();
      sendResizeEvent(event, true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [
    isResizing,
    initialPosition,
    initialSize,
    onResize,
    isHorizontal,
    onHoverEnd,
    direction,
  ]);

  return {
    direction,
    initialPosition,
    initialSize,
    isHorizontal,
    isResizing,
    readOnly,
    setInitialPosition,
    setInitialSize,
    setIsResizing,
    onHover,
    onHoverEnd,
    onMouseDown,
    onResize,
    onTouchStart,
  };
};

export const useResizeHandle = ({
  isHorizontal,
  isResizing,
  readOnly,
  setInitialPosition,
  setInitialSize,
  setIsResizing,
  onHover,
  onHoverEnd,
  onMouseDown,
  onTouchStart,
}: ReturnType<typeof useResizeHandleState>) => {
  const handleMouseDown: React.MouseEventHandler = (event) => {
    const { clientX, clientY } = event;
    setInitialPosition(isHorizontal ? clientX : clientY);

    const element = (event.target as HTMLElement).parentElement!;
    setInitialSize(isHorizontal ? element.offsetWidth : element.offsetHeight);

    setIsResizing(true);

    onMouseDown?.(event);
  };

  const handleTouchStart: React.TouchEventHandler = (event) => {
    const { touches } = event;
    const touch = touches[0];
    const { clientX, clientY } = touch;
    setInitialPosition(isHorizontal ? clientX : clientY);

    const element = (event.target as HTMLElement).parentElement!;
    setInitialSize(isHorizontal ? element.offsetWidth : element.offsetHeight);
    setIsResizing(true);
    onTouchStart?.(event);
  };

  const handleMouseOver = () => {
    onHover?.();
  };

  const handleMouseOut = () => {
    if (!isResizing) {
      onHoverEnd?.();
    }
  };

  return {
    hidden: readOnly,
    props: {
      onMouseDown: handleMouseDown,
      onMouseOut: handleMouseOut,
      onMouseOver: handleMouseOver,
      onTouchEnd: handleMouseOut,
      onTouchMove: handleMouseOver,
      onTouchStart: handleTouchStart,
    },
  };
};

export const ResizeHandle = createPrimitiveComponent<
  'div',
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onResize'>
>('div')({
  propsHook: useResizeHandle,
  stateHook: useResizeHandleState,
});

export type ResizeHandleProps = React.ComponentPropsWithRef<
  typeof ResizeHandle
>;
