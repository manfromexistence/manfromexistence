import {Tabs, Tab, Snippet} from "@nextui-org/react";
import {Key, useState} from "react";

import Codeblock from "./codeblock";

import {YarnIcon, NpmSmallIcon, PnpmIcon, BunIcon, CLIBoldIcon} from "@/components/icons";

type PackageManagerName = "cli" | "npm" | "yarn" | "pnpm" | "bun";

type PackageManager = {
  icon: JSX.Element;
  label?: string;
  name: PackageManagerName;
};

const packageManagers: PackageManager[] = [
  {
    name: "cli",
    label: "CLI",
    icon: <CLIBoldIcon className="text-lg text-default-600 dark:text-default-400" />,
  },
  {
    name: "npm",
    icon: <NpmSmallIcon className="text-[#E53E3E]" />,
  },
  {
    name: "yarn",
    icon: <YarnIcon className="text-[#2C8EBB]" />,
  },
  {
    name: "pnpm",
    icon: <PnpmIcon className="text-[#F69220]" />,
  },
  {
    name: "bun",
    icon: <BunIcon className="text-lg text-[#FBF0DF]" />,
  },
];

export interface PackageManagersProps {
  commands: Partial<Record<PackageManagerName, React.Key>>;
}

export const PackageManagers = ({commands}: PackageManagersProps) => {
  const [selectedManager, setSelectedManager] = useState<PackageManagerName>(
    commands.cli ? "cli" : "npm",
  );

  const handleSelectionChange = (tabKey: Key) => {
    setSelectedManager(tabKey as PackageManagerName);
  };

  return (
    <Tabs
      aria-label="NextUI installation commands"
      classNames={{
        base: "group mt-4",
        tabList: "h-10",
      }}
      selectedKey={selectedManager}
      variant="underlined"
      onSelectionChange={handleSelectionChange}
    >
      {packageManagers.map(({name, label, icon}) => {
        if (!commands[name]) return null;

        return (
          <Tab
            key={name}
            title={
              <div className="flex items-center space-x-2">
                {icon}
                <span>{label || name}</span>
              </div>
            }
          >
            <Snippet
              disableTooltip
              fullWidth
              hideSymbol
              classNames={{
                base: "bg-code-background text-code-foreground",
                pre: "font-light text-base",
                copyButton: "text-lg text-zinc-500 mr-2",
              }}
            >
              <Codeblock removeIndent codeString={commands[name] as string} language="bash" />
            </Snippet>
          </Tab>
        );
      })}
    </Tabs>
  );
};
