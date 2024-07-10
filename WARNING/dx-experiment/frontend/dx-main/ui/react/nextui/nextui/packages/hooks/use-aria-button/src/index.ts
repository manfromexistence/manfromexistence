// We had to copy this file from @react-aria/button because of the console.warn
// once they fix it we can remove this file and use the original one

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  InputHTMLAttributes,
  RefObject,
} from "react";
import {AriaButtonProps as BaseAriaButtonProps} from "@react-types/button";
import {DOMAttributes} from "@react-types/shared";
import {filterDOMProps, mergeProps} from "@react-aria/utils";
import {useFocusable} from "@react-aria/focus";
import {usePress} from "@nextui-org/use-aria-press";

export type AriaButtonProps<T extends ElementType = "button"> = BaseAriaButtonProps<T> & {
  /** Whether text selection should be enabled on the pressable element. */
  allowTextSelectionOnPress?: boolean;
};

export interface ButtonAria<T> {
  /** Props for the button element. */
  buttonProps: T;
  /** Whether the button is currently pressed. */
  isPressed: boolean;
}

// Order with overrides is important: 'button' should be default
export function useAriaButton(
  props: AriaButtonProps<"button">,
  ref: RefObject<HTMLButtonElement>,
): ButtonAria<ButtonHTMLAttributes<HTMLButtonElement>>;
export function useAriaButton(
  props: AriaButtonProps<"a">,
  ref: RefObject<HTMLAnchorElement>,
): ButtonAria<AnchorHTMLAttributes<HTMLAnchorElement>>;
export function useAriaButton(
  props: AriaButtonProps<"div">,
  ref: RefObject<HTMLDivElement>,
): ButtonAria<HTMLAttributes<HTMLDivElement>>;
export function useAriaButton(
  props: AriaButtonProps<"input">,
  ref: RefObject<HTMLInputElement>,
): ButtonAria<InputHTMLAttributes<HTMLInputElement>>;
export function useAriaButton(
  props: AriaButtonProps<"span">,
  ref: RefObject<HTMLSpanElement>,
): ButtonAria<HTMLAttributes<HTMLSpanElement>>;
export function useAriaButton(
  props: AriaButtonProps<ElementType>,
  ref: RefObject<Element>,
): ButtonAria<DOMAttributes>;
/**
 * Provides the behavior and accessibility implementation for a button component. Handles mouse, keyboard, and touch interactions,
 * focus behavior, and ARIA props for both native button elements and custom element types.
 * @param props - Props to be applied to the button.
 * @param ref - A ref to a DOM element for the button.
 */
export function useAriaButton(
  props: AriaButtonProps<ElementType>,
  ref: RefObject<any>,
): ButtonAria<HTMLAttributes<any>> {
  let {
    elementType = "button",
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    // @ts-ignore - undocumented
    preventFocusOnPress,
    // @ts-ignore - undocumented
    allowFocusWhenDisabled,
    // @ts-ignore
    onClick: deprecatedOnClick,
    href,
    target,
    rel,
    type = "button",
    allowTextSelectionOnPress,
  } = props;
  let additionalProps;

  if (elementType === "button") {
    additionalProps = {
      type,
      disabled: isDisabled,
    };
  } else {
    additionalProps = {
      role: "button",
      tabIndex: isDisabled ? undefined : 0,
      href: elementType === "a" && isDisabled ? undefined : href,
      target: elementType === "a" ? target : undefined,
      type: elementType === "input" ? type : undefined,
      disabled: elementType === "input" ? isDisabled : undefined,
      "aria-disabled": !isDisabled || elementType === "input" ? undefined : isDisabled,
      rel: elementType === "a" ? rel : undefined,
    };
  }

  let {pressProps, isPressed} = usePress({
    onPressStart,
    onPressEnd,
    onPressChange,
    onPress,
    isDisabled,
    preventFocusOnPress,
    allowTextSelectionOnPress,
    ref,
  });

  let {focusableProps} = useFocusable(props, ref);

  if (allowFocusWhenDisabled) {
    focusableProps.tabIndex = isDisabled ? -1 : focusableProps.tabIndex;
  }
  let buttonProps = mergeProps(
    focusableProps,
    pressProps,
    filterDOMProps(props, {labelable: true}),
  );

  return {
    isPressed, // Used to indicate press state for visual
    buttonProps: mergeProps(additionalProps, buttonProps, {
      "aria-haspopup": props["aria-haspopup"],
      "aria-expanded": props["aria-expanded"],
      "aria-controls": props["aria-controls"],
      "aria-pressed": props["aria-pressed"],
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        deprecatedOnClick?.(e);
      },
    }),
  };
}
