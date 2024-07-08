import {ReactNode, forwardRef} from "react";
import {tv, VariantProps} from "tailwind-variants";

const styles = tv({
  base: "flex relative w-full h-auto",
  variants: {
    to: {
      top: "bg-gradient-to-t",
      right: "bg-gradient-to-r",
      left: "bg-gradient-to-l",
      bottom: "bg-gradient-to-b",
      "top-right": "bg-gradient-to-tr",
      "top-left": "bg-gradient-to-tl",
      "bottom-right": "bg-gradient-to-br",
      "bottom-left": "bg-gradient-to-bl",
    },
    color: {
      orange: "from-[#FFB457] to-[#FF705B]",
      green: "from-[#4ADE80] to-[#06B6D4]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-2xl",
      "3xl": "shadow-3xl",
    },
    isCentered: {
      true: "items-center justify-center",
    },
  },
  defaultVariants: {
    radius: "2xl",
    direction: "top-right",
    isCentered: false,
  },
});

export interface GradientBoxProps extends VariantProps<typeof styles> {
  children?: ReactNode;
  className?: string;
}

export const GradientBox = forwardRef<HTMLDivElement, GradientBoxProps>((props, ref) => {
  const {children, className, to, color, radius, shadow, isCentered, ...rest} = props;

  return (
    <div
      ref={ref}
      className={styles({to, color, radius, shadow, isCentered, class: className})}
      {...rest}
    >
      {children}
    </div>
  );
});

GradientBox.displayName = "GradientBox";
