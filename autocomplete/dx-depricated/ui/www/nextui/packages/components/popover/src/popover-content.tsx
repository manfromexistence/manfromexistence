import type {AriaDialogProps} from "@react-aria/dialog";
import type {HTMLMotionProps} from "framer-motion";

import {DOMAttributes, ReactNode, useMemo, useCallback, ReactElement} from "react";
import {forwardRef} from "@nextui-org/system";
import {DismissButton} from "@react-aria/overlays";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-utils";
import {m, domAnimation, LazyMotion} from "framer-motion";
import {HTMLNextUIProps} from "@nextui-org/system";
import {RemoveScroll} from "react-remove-scroll";
import {getTransformOrigins} from "@nextui-org/aria-utils";

import {usePopoverContext} from "./popover-context";

export interface PopoverContentProps
  extends AriaDialogProps,
    Omit<HTMLNextUIProps, "children" | "role"> {
  children: ReactNode | ((titleProps: DOMAttributes<HTMLElement>) => ReactNode);
}

const PopoverContent = forwardRef<"div", PopoverContentProps>((props, _) => {
  const {as, children, className, ...otherProps} = props;

  const {
    Component: OverlayComponent,
    isOpen,
    placement,
    backdrop,
    motionProps,
    titleProps,
    disableAnimation,
    shouldBlockScroll,
    getPopoverProps,
    getDialogProps,
    getBackdropProps,
    getContentProps,
    isNonModal,
    onClose,
  } = usePopoverContext();

  const dialogProps = getDialogProps(otherProps);

  // Not needed in the popover context, the popover role comes from getPopoverProps
  delete dialogProps.role;

  const Component = as || OverlayComponent || "div";

  const content = (
    <>
      {!isNonModal && <DismissButton onDismiss={onClose} />}
      <Component {...dialogProps}>
        <div {...getContentProps({className})}>
          {typeof children === "function" ? children(titleProps) : children}
        </div>
      </Component>
      <DismissButton onDismiss={onClose} />
    </>
  );

  const backdropContent = useMemo(() => {
    if (backdrop === "transparent") {
      return null;
    }

    if (disableAnimation) {
      return <div {...getBackdropProps()} />;
    }

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          animate="enter"
          exit="exit"
          initial="exit"
          variants={TRANSITION_VARIANTS.fade}
          {...(getBackdropProps() as HTMLMotionProps<"div">)}
        />
      </LazyMotion>
    );
  }, [backdrop, disableAnimation, getBackdropProps]);

  const RemoveScrollWrapper = useCallback(
    ({children}: {children: ReactElement}) => {
      return (
        <RemoveScroll enabled={shouldBlockScroll && isOpen} removeScrollBar={false}>
          {children}
        </RemoveScroll>
      );
    },
    [shouldBlockScroll, isOpen],
  );

  const contents = disableAnimation ? (
    <RemoveScrollWrapper>{content}</RemoveScrollWrapper>
  ) : (
    <LazyMotion features={domAnimation}>
      <m.div
        animate="enter"
        exit="exit"
        initial="initial"
        style={{
          ...getTransformOrigins(placement === "center" ? "top" : placement),
        }}
        variants={TRANSITION_VARIANTS.scaleSpringOpacity}
        {...motionProps}
      >
        <RemoveScrollWrapper>{content}</RemoveScrollWrapper>
      </m.div>
    </LazyMotion>
  );

  return (
    <div {...getPopoverProps()}>
      {backdropContent}
      {contents}
    </div>
  );
});

PopoverContent.displayName = "NextUI.PopoverContent";

export default PopoverContent;
