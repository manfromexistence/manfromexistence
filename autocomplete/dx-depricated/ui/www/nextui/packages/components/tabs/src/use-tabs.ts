import type {TabsVariantProps, SlotsToClasses, TabsSlots, TabsReturnType} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {tabs} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, objectToDeps} from "@nextui-org/shared-utils";
import {ReactRef, filterDOMProps} from "@nextui-org/react-utils";
import {useMemo, RefObject, useCallback} from "react";
import {TabListState, TabListStateOptions, useTabListState} from "@react-stately/tabs";
import {AriaTabListProps, useTabList} from "@react-aria/tabs";
import {mergeProps} from "@react-aria/utils";
import {CollectionProps} from "@nextui-org/aria-utils";
import {CollectionChildren} from "@react-types/shared";
import {HTMLMotionProps} from "framer-motion";

export interface Props extends Omit<HTMLNextUIProps, "children"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The props to modify the cursor motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<"span">;
  /**
   * Whether the tabs selection should occur on press up instead of press down.
   * @default true
   */
  shouldSelectOnPressUp?: boolean;
  /**
   * Whether the cursor should be hidden.
   * @default false
   */
  disableCursorAnimation?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Tabs classNames={{
   *    base:"base-classes", // main wrapper (tabs + panels)
   *    tabList: "tab-list-classes", // tabs wrapper
   *    tab: "tab-classes", // tab item
   *    panel: "panel-classes", // tab panel
   * }} />
   * ``
   */
  classNames?: SlotsToClasses<TabsSlots>;
  /**
   * The position of the tabs.
   * @default 'top'
   */
  placement?: "top" | "bottom" | "start" | "end";
  /**
   * Whether the tabs are vertical it will invalidate the placement prop when the value is true.
   * @default false
   */
  isVertical?: boolean;
}

export type UseTabsProps<T> = Props &
  TabsVariantProps &
  Omit<TabListStateOptions<T>, "children" | keyof AriaTabListProps<T>> &
  Omit<AriaTabListProps<T>, "children" | "orientation"> &
  CollectionProps<T>;

export type ValuesType<T = object> = {
  state: TabListState<T>;
  slots: TabsReturnType;
  disableCursorAnimation?: boolean;
  listRef?: RefObject<HTMLElement>;
  shouldSelectOnPressUp?: boolean;
  classNames?: SlotsToClasses<TabsSlots>;
  motionProps?: HTMLMotionProps<"span">;
  disableAnimation?: boolean;
  isDisabled?: boolean;
};

export function useTabs<T extends object>(originalProps: UseTabsProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, tabs.variantKeys);

  const {
    ref,
    as,
    className,
    classNames,
    children,
    disableCursorAnimation,
    motionProps,
    isVertical = false,
    shouldSelectOnPressUp = true,
    ...otherProps
  } = props;

  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const state = useTabListState<T>({
    children: children as CollectionChildren<T>,
    ...otherProps,
  });
  const {tabListProps} = useTabList<T>(otherProps as AriaTabListProps<T>, state, domRef);

  const slots = useMemo(
    () =>
      tabs({
        ...variantProps,
        className,
        ...(isVertical ? {placement: "start"} : {}),
      }),
    [objectToDeps(variantProps), className, isVertical],
  );

  const baseStyles = clsx(classNames?.base, className);

  const values = useMemo<ValuesType<T>>(
    () => ({
      state,
      slots,
      classNames,
      motionProps,
      listRef: domRef,
      shouldSelectOnPressUp,
      disableCursorAnimation,
      isDisabled: originalProps?.isDisabled,
      disableAnimation: originalProps?.disableAnimation,
    }),
    [
      state,
      slots,
      domRef,
      motionProps,
      disableCursorAnimation,
      shouldSelectOnPressUp,
      originalProps?.disableAnimation,
      originalProps?.isDisabled,
      classNames,
    ],
  );

  const getBaseProps: PropGetter = useCallback(
    (props) => ({
      "data-slot": "base",
      className: slots.base({class: clsx(baseStyles, props?.className)}),
      ...mergeProps(
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
        props,
      ),
    }),
    [baseStyles, otherProps, slots],
  );

  const placement = (variantProps as Props).placement ?? (isVertical ? "start" : "top");
  const getWrapperProps: PropGetter = useCallback(
    (props) => ({
      "data-slot": "tabWrapper",
      className: slots.wrapper({class: clsx(classNames?.wrapper, props?.className)}),
      "data-placement": placement,
      "data-vertical":
        isVertical || placement === "start" || placement === "end" ? "vertical" : "horizontal",
    }),
    [classNames, slots, placement, isVertical],
  );

  const getTabListProps: PropGetter = useCallback(
    (props) => ({
      ref: domRef,
      "data-slot": "tabList",
      className: slots.tabList({class: clsx(classNames?.tabList, props?.className)}),
      ...mergeProps(tabListProps, props),
    }),
    [domRef, tabListProps, classNames, slots],
  );

  return {
    Component,
    domRef,
    state,
    values,
    getBaseProps,
    getTabListProps,
    getWrapperProps,
  };
}

export type UseTabsReturn = ReturnType<typeof useTabs>;
