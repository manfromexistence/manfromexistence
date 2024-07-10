import type { ValidContractInstance } from "@thirdweb-dev/sdk";
import type { ExtensionDetectedState } from "components/buttons/ExtensionDetectButton";
import type { ComponentType } from "react";

// We're using it everywhere.
type PotentialContractInstance =
  | ValidContractInstance
  | null
  | undefined;

export type EnhancedRoute<T = any> = {
  title: string;
  path: string;
  isDefault?: true;
  isBeta?: true;
  isEnabled?: ExtensionDetectedState;
  component: ComponentType<T>;
};

export type BasicContract = {
  chainId: number;
  address: string;
}
