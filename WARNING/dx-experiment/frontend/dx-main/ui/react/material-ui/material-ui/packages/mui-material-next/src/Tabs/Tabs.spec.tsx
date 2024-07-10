import * as React from 'react';
import Tabs from '@mui/material-next/Tabs';

function testOnChange() {
  function handleTabsChange(event: React.SyntheticEvent, tabsValue: unknown) {}
  <Tabs onChange={handleTabsChange} />;

  function handleElementChange(event: React.ChangeEvent) {}
  <Tabs
    // @ts-expect-error internally it's either FocusEvent or ClickEvent
    onChange={handleElementChange}
  />;
}
