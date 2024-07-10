import { CustomConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { Divider, Flex, Stack } from "@chakra-ui/react";
import { Heading, Text, TrackedLink } from "tw-components";
import { EngineOverviewDescription } from "./overview/engine-description";

export const EngineNoConnectedWallet: React.FC = () => {
  return (
    <Stack spacing={8}>
      <Stack>
        <Heading size="title.lg" as="h1">
          Engine
        </Heading>
        <Text>
          Engine is a backend HTTP server that calls smart contracts with your
          backend wallets. Reliably send blockchain transactions, manage smart
          wallets, enable gasless transactions, and more.{" "}
          <TrackedLink
            href="https://portal.thirdweb.com/infrastructure/engine/overview"
            isExternal
            category="engine"
            label="clicked-learn-more"
            color="blue.500"
          >
            Learn more to get started for free
          </TrackedLink>
          .
        </Text>
      </Stack>

      <Divider />

      <Stack>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={3}
          justify="space-between"
        >
          <Stack>
            <Heading size="title.sm">Get Started</Heading>
            <Text>
              Sign in with your admin wallet to manage Engine instances from
              this dashboard.
            </Text>
          </Stack>

          <Flex h="fit-content">
            <CustomConnectWallet />
          </Flex>
        </Flex>
        <EngineOverviewDescription />
      </Stack>
    </Stack>
  );
};
