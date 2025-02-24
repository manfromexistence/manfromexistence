// TabbedLayout.js
import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Icon
} from "@chakra-ui/react";
import { FiCode, FiEye, FiHeart, FiTerminal } from "react-icons/fi";
import ContributionSection from "./ContributionSection";

const tabStyles = {
  _selected: { color: "#fff", bg: "#111" },
  borderRadius: "10px",
  bg: "#060606",
  fontSize: "14px",
  border: "1px solid #ffffff1c",
  height: 9,
  padding: "0.5rem 1rem",
  transition: "background-color 0.3s",
  "&:hover": { bg: "#222" },
};

const TabbedLayout = ({ children, className }) => {
  const contentMap = {
    PreviewTab: null,
    CodeTab: null,
    CliTab: null
  };

  React.Children.forEach(children, (child) => {
    if (child.type === PreviewTab) {
      contentMap.PreviewTab = child;
    } else if (child.type === CodeTab) {
      contentMap.CodeTab = child;
    } else if (child.type === CliTab) {
      contentMap.CliTab = child;
    }
  });

  return (
    <Tabs mt={4} variant="unstyled" isLazy lazyBehavior="unmountOnExit" className={className} w='100%'>
      <TabList justifyContent="space-between">
        <Flex wrap='wrap' gap='0.5rem'>
          <Tab sx={tabStyles}>
            <Icon as={FiEye} />
            &nbsp;Preview
          </Tab>
          <Tab sx={tabStyles}>
            <Icon as={FiCode} />
            &nbsp;Code
          </Tab>
          <Tab sx={{ ...tabStyles, marginRight: "0.5rem" }} className="cli-tab">
            <Icon as={FiTerminal} />
            &nbsp;CLI
          </Tab>
        </Flex>
        <Tab sx={tabStyles} className="contribute-tab">
          <Icon as={FiHeart} />
          &nbsp;Contribute
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel p={0}>{contentMap.PreviewTab}</TabPanel>
        <TabPanel p={0}>{contentMap.CodeTab}</TabPanel>
        <TabPanel p={0}>{contentMap.CliTab}</TabPanel>
        <TabPanel p={0}>
          <ContributionSection />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

// Helper components to wrap tab content
const PreviewTab = ({ children }) => <>{children}</>;
const CodeTab = ({ children }) => <>{children}</>;
const CliTab = ({ children }) => <>{children}</>;

export { TabbedLayout, PreviewTab, CodeTab, CliTab };