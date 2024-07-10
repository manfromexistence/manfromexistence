import {Button, ButtonProps, Code, Link, Tooltip} from "@nextui-org/react";
import {ReactNode} from "react";
import Balancer from "react-wrap-balancer";

import {GithubIcon, NpmIcon, AdobeIcon, StorybookIcon, NextJsIcon} from "@/components/icons";
import {COMPONENT_PATH, COMPONENT_THEME_PATH} from "@/libs/github/constants";
import {trackEvent} from "@/utils/va";

export interface ComponentLinksProps {
  component: string;
  styles?: string;
  storybook?: string;
  rscCompatible?: boolean;
  reactAriaHook?: string;
}

const ButtonLink = ({
  children,
  href,
  startContent,
  tooltip,
  ...props
}: ButtonProps & {
  href: string;
  tooltip?: string | ReactNode;
}) => {
  const handlePress = () => {
    if (!href) return;

    trackEvent("ComponentLinks - Click", {
      category: "docs",
      action: "click",
      data: href || "",
    });
  };

  const button = (
    <Button
      isExternal
      as={Link}
      className="!text-small py-4 bg-default-100 dark:bg-default-50 text-default-700"
      href={href}
      size="sm"
      startContent={startContent}
      onPress={handlePress}
      {...props}
    >
      {children}
    </Button>
  );

  return tooltip ? (
    <Tooltip className="max-w-[230px]" content={tooltip}>
      {button}
    </Tooltip>
  ) : (
    button
  );
};

export const ComponentLinks = ({
  component,
  storybook,
  styles,
  rscCompatible,
  reactAriaHook,
}: ComponentLinksProps) => {
  if (!component) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <ButtonLink
        href={`https://storybook.nextui.org/?path=/story/components-${
          storybook || component
        }--default`}
        startContent={<StorybookIcon className="text-lg text-[#ff4785]" />}
      >
        Storybook
      </ButtonLink>
      <ButtonLink
        href={`https://www.npmjs.com/package/@nextui-org/${component}`}
        startContent={<NpmIcon className="text-2xl text-[#E53E3E]" />}
      >
        {`@nextui-org/${component}`}
      </ButtonLink>
      {reactAriaHook && (
        <ButtonLink
          href={`https://react-spectrum.adobe.com/react-aria/${reactAriaHook}.html`}
          startContent={<AdobeIcon className="text-lg text-[#E1251B]" />}
        >
          React Aria
        </ButtonLink>
      )}
      {rscCompatible && (
        <ButtonLink
          href="https://nextjs.org/docs/app/building-your-application/rendering/server-components"
          startContent={<NextJsIcon size={18} />}
          tooltip={
            <p>
              <Balancer>
                This component doesn&apos;t use the
                <Code className="font-normal bg-transparent px-0 py-0 text-code-mdx">
                  `use client;`
                </Code>
                directive making it compatible with RSC.
              </Balancer>
            </p>
          }
        >
          Server component
        </ButtonLink>
      )}

      <ButtonLink href={`${COMPONENT_PATH}/${component}`} startContent={<GithubIcon size={20} />}>
        Source
      </ButtonLink>
      <ButtonLink
        href={`${COMPONENT_THEME_PATH}/${styles || component}.ts`}
        startContent={<GithubIcon size={20} />}
      >
        Styles source
      </ButtonLink>
    </div>
  );
};
