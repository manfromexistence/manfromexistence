import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_generateUtilityClasses as generateUtilityClasses,
} from '@mui/utils';

export interface InputBaseClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if the component is a descendant of `FormControl`. */
  formControl: string;
  /** Styles applied to the root element if the component is focused. */
  focused: string;
  /** Styles applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `startAdornment` is provided. */
  adornedStart: string;
  /** Styles applied to the root element if `endAdornment` is provided. */
  adornedEnd: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** Styles applied to the input element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `multiline={true}`. */
  multiline: string;
  /** Styles applied to the root element if the color is secondary. */
  colorSecondary: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** Styles applied to the root element if `hiddenLabel={true}`. */
  hiddenLabel: string;
  /** State class applied to the root element if `readOnly={true}`. */
  readOnly: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the input element if `size="small"`. */
  inputSizeSmall: string;
  /** Styles applied to the input element if `multiline={true}`. */
  inputMultiline: string;
  /** Styles applied to the input element if `type="search"`. */
  inputTypeSearch: string;
  /** Styles applied to the input element if `startAdornment` is provided. */
  inputAdornedStart: string;
  /** Styles applied to the input element if `endAdornment` is provided. */
  inputAdornedEnd: string;
  /** Styles applied to the input element if `hiddenLabel={true}`. */
  inputHiddenLabel: string;
}

export type InputBaseClassKey = keyof InputBaseClasses;

export function getInputBaseUtilityClass(slot: string): string {
  return generateUtilityClass('MuiInputBase', slot);
}

const inputBaseClasses: InputBaseClasses = generateUtilityClasses('MuiInputBase', [
  'root',
  'formControl',
  'focused',
  'disabled',
  'adornedStart',
  'adornedEnd',
  'error',
  'sizeSmall',
  'multiline',
  'colorSecondary',
  'fullWidth',
  'hiddenLabel',
  'readOnly',
  'input',
  'inputSizeSmall',
  'inputMultiline',
  'inputTypeSearch',
  'inputAdornedStart',
  'inputAdornedEnd',
  'inputHiddenLabel',
]);

export default inputBaseClasses;
