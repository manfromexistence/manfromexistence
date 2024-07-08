"use client"

import { callAll, cx } from "@chakra-ui/utils"
import { HTMLMotionProps } from "framer-motion"
import { forwardRef } from "react"
import { HTMLChakraProps } from "../../styled-system"
import { usePopoverContext, usePopoverStyles } from "./popover-context"
import { PopoverTransition, PopoverTransitionProps } from "./popover-transition"

export interface PopoverContentProps extends PopoverTransitionProps {
  children?: React.ReactNode
  rootProps?: HTMLChakraProps<"div">
  motionProps?: HTMLMotionProps<"section">
}

export const PopoverContent = forwardRef<HTMLElement, PopoverContentProps>(
  function PopoverContent(props, ref) {
    const { rootProps, motionProps, ...contentProps } = props

    const api = usePopoverContext()
    const styles = usePopoverStyles()

    return (
      <PopoverTransition
        {...motionProps}
        {...api.getContentProps(contentProps, ref)}
        onAnimationComplete={callAll(
          api.onAnimationComplete,
          contentProps.onAnimationComplete,
        )}
        className={cx("chakra-popover__content", props.className)}
        css={[styles.content, props.css]}
      />
    )
  },
)

PopoverContent.displayName = "PopoverContent"
