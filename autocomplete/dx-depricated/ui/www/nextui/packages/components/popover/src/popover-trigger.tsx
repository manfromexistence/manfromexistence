import React, {Children, cloneElement, useMemo} from "react";
import {forwardRef, isNextUIEl} from "@nextui-org/system";
import {pickChildren, filterDOMProps} from "@nextui-org/react-utils";
import {useAriaButton} from "@nextui-org/use-aria-button";
import {Button} from "@nextui-org/button";
import {mergeProps} from "@react-aria/utils";

import {usePopoverContext} from "./popover-context";

export interface PopoverTriggerProps {
  children?: React.ReactNode;
}

/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
const PopoverTrigger = forwardRef<"button", PopoverTriggerProps>((props, _) => {
  const {triggerRef, getTriggerProps} = usePopoverContext();

  const {children, ...otherProps} = props;

  // force a single child
  const child = useMemo<any>(() => {
    if (typeof children === "string") return <p>{children}</p>;

    return Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>;
    };
  }, [children]);

  const {onPress, ...restProps} = useMemo(() => {
    return getTriggerProps(mergeProps(otherProps, child.props), child.ref);
  }, [getTriggerProps, child.props, otherProps, child.ref]);

  // validates if contains a NextUI Button as a child
  const [, triggerChildren] = pickChildren(children, Button);

  const {buttonProps} = useAriaButton({onPress}, triggerRef);

  const hasNextUIButton = useMemo<boolean>(() => {
    return triggerChildren?.[0] !== undefined;
  }, [triggerChildren]);

  const isDisabled = !!restProps?.isDisabled;

  const isNextUIElement = isNextUIEl(child);

  return cloneElement(
    child,
    mergeProps(
      // if we add `isDisabled` prop to DOM elements,
      // react will fail to recognize it on a DOM element,
      // hence, apply filterDOMProps for such case
      filterDOMProps(restProps, {
        enabled: isDisabled && !isNextUIElement,
      }),
      hasNextUIButton ? {onPress} : buttonProps,
    ),
  );
});

PopoverTrigger.displayName = "NextUI.PopoverTrigger";

export default PopoverTrigger;
