import { cn } from "@/helpers";
import { HTMLAttributes, ReactHTMLElement } from "react";

const AdvertiseHeading = (props: HTMLAttributes<HTMLHeadingElement>) => {
  const { className, ...rest } = props;

  return (
    <h3
      className={cn(
        "lg:text-5xl md:text-5xl max-md:text-3xl max-md:pb-4 font-bold",
        className
      )}
      {...rest}
    />
  );
};

const AdvertiseParagraph = (props: HTMLAttributes<HTMLParagraphElement>) => {
  const { className, ...rest } = props;

  return (
    <p
      className={cn("pb-3 font-medium text-gray-700 md:text-lg", className)}
      {...rest}
    />
  );
};

export { AdvertiseHeading, AdvertiseParagraph };
