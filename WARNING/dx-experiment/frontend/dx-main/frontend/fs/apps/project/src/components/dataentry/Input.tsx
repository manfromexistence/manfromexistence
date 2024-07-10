import { cn } from "@/helpers";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type || "text"}
        className={cn(
          "rounded-full px-4 py-2 border focus:border-black/80 focus:outline-none",
          className
        )}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
