import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export interface TabScrollButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
}

export type TabScrollButtonClassKey = keyof TabScrollButtonClasses;

export function getTabScrollButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTabScrollButton', slot);
}

const tabScrollButtonClasses: TabScrollButtonClasses = generateUtilityClasses(
  'MuiTabScrollButton',
  ['root', 'vertical', 'horizontal', 'disabled'],
);

export default tabScrollButtonClasses;
