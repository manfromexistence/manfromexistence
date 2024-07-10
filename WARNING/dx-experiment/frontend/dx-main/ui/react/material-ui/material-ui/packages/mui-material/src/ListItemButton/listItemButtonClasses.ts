import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface ListItemButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the `component`'s `focusVisibleClassName` prop. */
  focusVisible: string;
  /** Styles applied to the component element if dense. */
  dense: string;
  /** Styles applied to the component element if `alignItems="flex-start"`. */
  alignItemsFlexStart: string;
  /** State class applied to the inner `component` element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the inner `component` element if `divider={true}`. */
  divider: string;
  /** Styles applied to the inner `component` element unless `disableGutters={true}`. */
  gutters: string;
  /** State class applied to the root element if `selected={true}`. */
  selected: string;
}

export type ListItemButtonClassKey = keyof ListItemButtonClasses;

export function getListItemButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemButton', slot);
}

const listItemButtonClasses: ListItemButtonClasses = generateUtilityClasses('MuiListItemButton', [
  'root',
  'focusVisible',
  'dense',
  'alignItemsFlexStart',
  'disabled',
  'divider',
  'gutters',
  'selected',
]);

export default listItemButtonClasses;
