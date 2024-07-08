import useWorkspace from "@/lib/swr/use-workspace";
import { LinkProps } from "@/lib/types";
import {
  InfoTooltip,
  SimpleTooltipContent,
  Switch,
  TooltipContent,
  useRouterStuff,
} from "@dub/ui";
import { FADE_IN_ANIMATION_SETTINGS } from "@dub/utils";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function IOSSection({
  props,
  data,
  setData,
}: {
  props?: LinkProps;
  data: LinkProps;
  setData: Dispatch<SetStateAction<LinkProps>>;
}) {
  const { plan } = useWorkspace();
  const { queryParams } = useRouterStuff();
  const { ios } = data;
  const [enabled, setEnabled] = useState(!!ios);
  useEffect(() => {
    if (enabled) {
      // if enabling, add previous ios link if exists
      setData({
        ...data,
        ios: props?.ios || ios,
      });
    } else {
      // if disabling, remove ios link
      setData({ ...data, ios: null });
    }
  }, [enabled]);

  return (
    <div className="relative border-b border-gray-200 pb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between space-x-2">
          <h2 className="text-sm font-medium text-gray-900">iOS Targeting</h2>
          <InfoTooltip
            content={
              <SimpleTooltipContent
                title="Redirect your iOS users to a different link."
                cta="Learn more about device targeting."
                href="https://dub.co/help/article/device-targeting"
              />
            }
          />
        </div>
        <Switch
          fn={() => setEnabled(!enabled)}
          checked={enabled}
          // iOS targeting is only available on Dub's Pro plan
          {...((!plan || plan === "free") && !enabled
            ? {
                disabledTooltip: (
                  <TooltipContent
                    title={`iOS targeting is only available on ${process.env.NEXT_PUBLIC_APP_NAME}'s Pro plan. Upgrade to Pro to use this feature.`}
                    cta="Upgrade to Pro"
                    {...(plan === "free"
                      ? {
                          onClick: () =>
                            queryParams({
                              set: {
                                upgrade: "pro",
                              },
                            }),
                        }
                      : {
                          href: "https://dub.co/pricing",
                        })}
                  />
                ),
              }
            : {})}
        />
      </div>
      {enabled && (
        <motion.div
          className="mt-3 flex rounded-md shadow-sm"
          {...FADE_IN_ANIMATION_SETTINGS}
        >
          <input
            name="ios-url"
            id="ios-url"
            type="url"
            placeholder="https://apps.apple.com/app/1611158928"
            value={ios || ""}
            onChange={(e) => {
              setData({ ...data, ios: e.target.value });
            }}
            className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
            aria-invalid="true"
          />
        </motion.div>
      )}
    </div>
  );
}
