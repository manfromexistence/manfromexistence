import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface ToggleButtonGroupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the children. */
  grouped: string;
  /** Styles applied to the children if `orientation="horizontal"`. */
  groupedHorizontal: string;
  /** Styles applied to the children if `orientation="vertical"`. */
  groupedVertical: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** Styles applied to the first button in the toggle button group. */
  firstButton: string;
  /** Styles applied to the last button in the toggle button group. */
  lastButton: string;
  /** Styles applied to buttons in the middle of the toggle button group. */
  middleButton: string;
}

export type ToggleButtonGroupClassKey = keyof ToggleButtonGroupClasses;

export function getToggleButtonGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiToggleButtonGroup', slot);
}

const toggleButtonGroupClasses: ToggleButtonGroupClasses = generateUtilityClasses(
  'MuiToggleButtonGroup',
  [
    'root',
    'selected',
    'vertical',
    'disabled',
    'grouped',
    'groupedHorizontal',
    'groupedVertical',
    'fullWidth',
    'firstButton',
    'lastButton',
    'middleButton',
  ],
);

export default toggleButtonGroupClasses;
