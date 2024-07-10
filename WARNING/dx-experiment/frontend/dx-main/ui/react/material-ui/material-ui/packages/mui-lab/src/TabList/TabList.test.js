// @ts-check
import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui-internal/test-utils';
import Tab from '@mui/material/Tab';
import Tabs, { tabsClasses as classes } from '@mui/material/Tabs';
import TabList from './TabList';
import TabContext from '../TabContext';
import describeConformance from '../../test/describeConformance';

describe('<TabList />', () => {
  const { render } = createRenderer();

  // @ts-ignore mui name does not exist for this component
  describeConformance(<TabList />, () => ({
    classes,
    inheritComponent: Tabs,
    /**
     * @param {React.ReactNode} node
     */
    render: (node) => render(<TabContext value="0">{node}</TabContext>),
    wrapMount: (mount) => (node) => {
      const wrapper = mount(<TabContext value="0">{node}</TabContext>);
      return wrapper.childAt(0);
    },
    refInstanceof: window.HTMLDivElement,
    // TODO: no idea why reactTestRenderer fails
    skip: [
      'componentsProp',
      'themeDefaultProps',
      'themeStyleOverrides',
      'themeVariants',
      'rootClass',
      'reactTestRenderer',
    ],
  }));

  // outside of TabContext pass every test in Tabs

  it('provides the active value to Tab so that they can be indicated as selected', () => {
    const { getAllByRole } = render(
      <TabContext value="0">
        <TabList>
          <Tab value="0" />
          <Tab value="1" />
        </TabList>
      </TabContext>,
    );
    const [tabOne, tabTwo] = getAllByRole('tab');

    expect(tabOne).to.have.attribute('aria-selected', 'true');
    expect(tabTwo).to.have.attribute('aria-selected', 'false');
  });

  it('should accept a null child', () => {
    render(
      <TabContext value="0">
        <TabList>
          <Tab value="0" />
          {null}
        </TabList>
      </TabContext>,
    );
  });
});
