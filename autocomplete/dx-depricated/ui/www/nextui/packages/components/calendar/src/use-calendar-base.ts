import type {CalendarReturnType, CalendarVariantProps} from "@nextui-org/theme";
import type {CalendarPropsBase as AriaCalendarPropsBase} from "@react-types/calendar";
import type {CalendarSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaCalendarGridProps} from "@react-aria/calendar";
import type {AriaButtonProps} from "@react-types/button";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {ButtonProps} from "@nextui-org/button";
import type {SupportedCalendars} from "@nextui-org/system";
import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {RefObject, ReactNode} from "react";

import {Calendar, CalendarDate} from "@internationalized/date";
import {mapPropsVariants} from "@nextui-org/system";
import {useCallback, useMemo} from "react";
import {calendar} from "@nextui-org/theme";
import {useControlledState} from "@react-stately/utils";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {useLocale} from "@react-aria/i18n";
import {clamp, dataAttr, objectToDeps} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {useProviderContext} from "@nextui-org/system";

type NextUIBaseProps = Omit<HTMLNextUIProps<"div">, keyof AriaCalendarPropsBase | "onChange">;

interface Props extends NextUIBaseProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Custom content to be included in the top of the calendar.
   */
  topContent?: ReactNode;
  /**
   * Custom content to be included in the bottom of the calendar.
   */
  bottomContent?: ReactNode;
  /**
   * The number of months to display at once. Up to 3 months are supported.
   * Passing a number greater than 1 will disable the `showMonthAndYearPickers` prop.
   *
   * @default 1
   */
  visibleMonths?: number;
  /**
   * The width to be applied to the calendar component. This value is multiplied by the number
   * of visible months to determine the total width of the calendar.
   *
   * @default 256
   */
  calendarWidth?: number | string;
  /**
   * Props for the navigation button, prev button and next button.
   */
  navButtonProps?: ButtonProps;
  /**
   * Props for the previous button.
   */
  prevButtonProps?: ButtonProps;
  /**
   * Props for the next button.
   */
  nextButtonProps?: ButtonProps;
  /**
   * Whether to show the description or error message.
   * @default true
   */
  showHelper?: boolean;
  /**
   * Whether the calendar header is expanded. This is only available if the `showMonthAndYearPickers` prop is set to `true`.
   * @default false
   */
  isHeaderExpanded?: boolean;
  /**
   * Whether the calendar header should be expanded by default.This is only available if the `showMonthAndYearPickers` prop is set to `true`.
   * @default false
   */
  isHeaderDefaultExpanded?: boolean;
  /**
   * The event handler for the calendar header expanded state. This is only available if the `showMonthAndYearPickers` prop is set to `true`.
   * @param isExpanded boolean
   * @returns void
   */
  onHeaderExpandedChange?: (isExpanded: boolean) => void;
  /**
   * This function helps to reduce the bundle size by providing a custom calendar system.
   *
   * In the example above, the createCalendar function from the `@internationalized/date` package
   * is passed to the useCalendarState hook. This function receives a calendar identifier string,
   * and provides Calendar instances to React Stately, which are used to implement date manipulation.
   *
   * By default, this includes all calendar systems supported by @internationalized/date. However,
   * if your application supports a more limited set of regions, or you know you will only be picking dates
   * in a certain calendar system, you can reduce your bundle size by providing your own implementation
   * of `createCalendar` that includes a subset of these Calendar implementations.
   *
   * For example, if your application only supports Gregorian dates, you could implement a `createCalendar`
   * function like this:
   *
   * @example
   *
   * import {GregorianCalendar} from '@internationalized/date';
   *
   * function createCalendar(identifier) {
   *  switch (identifier) {
   *    case 'gregory':
   *      return new GregorianCalendar();
   *    default:
   *      throw new Error(`Unsupported calendar ${identifier}`);
   *  }
   * }
   *
   * This way, only GregorianCalendar is imported, and the other calendar implementations can be tree-shaken.
   *
   * You can also use the NextUIProvider to provide the createCalendar function to all nested components.
   *
   * @default all calendars
   */
  createCalendar?: (calendar: SupportedCalendars) => Calendar | null;
  /**
   * The style of weekday names to display in the calendar grid header,
   * e.g. single letter, abbreviation, or full day name.
   * @default "narrow"
   */
  weekdayStyle?: AriaCalendarGridProps["weekdayStyle"];
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   *
   * Component: Calendar, RangeCalendar
   *
   * <Component classNames={{
   *    base:"base-classes",
   *    nextButton:"next-button-classes",
   *    prevButton:"prev-button-classes",
   *    header:"header-classes",
   *    title:"title-classes",
   *    content:"content-classes",
   *    gridWrapper:"grid-wrapper-classes",
   *    grid:"grid-classes",
   *    gridHeader:"grid-header-classes",
   *    gridHeaderRow:"grid-header-row-classes",
   *    gridHeaderCell:"grid-header-cell-classes",
   *    gridBody:"grid-body-classes",
   *    gridBodyRow:"grid-row-classes",
   *    cell:"grid-cell-classes",
   *    cellButton:"grid-cell-button-classes",
   *    pickerWrapper:"picker-wrapper-classes",
   *    pickerMonthList:"picker-month-list-classes",
   *    pickerYearList:"picker-year-list-classes",
   *    pickerHighlight:"picker-highlight-classes",
   *    pickerItem:"picker-item-classes",
   *    helperWrapper:"helper-wrapper-classes",
   *    errorMessage:"error-message-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<CalendarSlots>;
}

export type UseCalendarBasePropsComplete = Props & CalendarVariantProps & AriaCalendarPropsBase;

// Omit internal props
export type UseCalendarBaseProps = Omit<UseCalendarBasePropsComplete, "isRange">;

export type ContextType<T extends CalendarState | RangeCalendarState> = {
  state: T;
  visibleMonths: number;
  headerRef?: RefObject<any>;
  slots?: CalendarReturnType;
  weekdayStyle?: AriaCalendarGridProps["weekdayStyle"];
  isHeaderExpanded?: boolean;
  showMonthAndYearPickers?: boolean;
  setIsHeaderExpanded?: (isExpanded: boolean) => void;
  classNames?: SlotsToClasses<CalendarSlots>;
  disableAnimation?: boolean;
};

export function useCalendarBase(originalProps: UseCalendarBasePropsComplete) {
  const [props, variantProps] = mapPropsVariants(originalProps, calendar.variantKeys);

  const providerContext = useProviderContext();

  const {
    ref,
    as,
    children,
    className,
    topContent,
    bottomContent,
    showHelper = true,
    calendarWidth = 256,
    visibleMonths: visibleMonthsProp = 1,
    weekdayStyle = "narrow",
    navButtonProps = {},
    isHeaderExpanded: isHeaderExpandedProp,
    isHeaderDefaultExpanded,
    onHeaderExpandedChange = () => {},
    minValue = providerContext?.defaultDates?.minDate ?? new CalendarDate(1900, 1, 1),
    maxValue = providerContext?.defaultDates?.maxDate ?? new CalendarDate(2099, 12, 31),
    createCalendar: createCalendarProp = providerContext?.createCalendar ?? null,
    prevButtonProps: prevButtonPropsProp,
    nextButtonProps: nextButtonPropsProp,
    errorMessage,
    classNames,
    ...otherProps
  } = props;

  const Component = as || "div";
  const visibleMonths = clamp(visibleMonthsProp, 1, 3);

  /**
   * Determines whether to show the month and year pickers.
   * The pickers are shown if `showMonthAndYearPickers` is true,
   * there is only one visible month (`visibleMonths === 1`),
   * and it's not a range calendar (`!isRange`).
   */
  const showMonthAndYearPickers =
    originalProps.showMonthAndYearPickers && visibleMonths === 1 && !originalProps?.isRange;

  const domRef = useDOMRef(ref);

  const handleHeaderExpandedChange = useCallback(
    (isExpanded: boolean | undefined) => {
      onHeaderExpandedChange(isExpanded || false);
    },
    [onHeaderExpandedChange],
  );

  const [isHeaderExpanded, setIsHeaderExpanded] = useControlledState<boolean | undefined>(
    isHeaderExpandedProp,
    isHeaderDefaultExpanded ?? false,
    handleHeaderExpandedChange,
  );

  const visibleDuration = useMemo(() => ({months: visibleMonths}), [visibleMonths]);
  const hasMultipleMonths = visibleMonths > 1;
  const shouldFilterDOMProps = typeof Component === "string";

  const {locale} = useLocale();

  const slots = useMemo(
    () =>
      calendar({
        ...variantProps,
        showMonthAndYearPickers,
        isRange: !!originalProps.isRange,
        isHeaderWrapperExpanded: isHeaderExpanded,
        className,
      }),
    [objectToDeps(variantProps), showMonthAndYearPickers, isHeaderExpanded, className],
  );

  const disableAnimation = originalProps.disableAnimation ?? false;

  const commonButtonProps: ButtonProps = {
    size: "sm",
    variant: "light",
    radius: "full",
    isIconOnly: true,
    disableAnimation,
    ...navButtonProps,
  };

  const baseProps = {
    "data-slot": "base",
    "data-has-multiple-months": dataAttr(hasMultipleMonths),
    style: {
      // @ts-ignore
      "--visible-months": visibleMonths,
      "--calendar-width": calendarWidth,
    } as React.CSSProperties,
  };

  const getPrevButtonProps = (props = {}) => {
    return {
      "data-slot": "prev-button",
      tabIndex: isHeaderExpanded ? -1 : 0,
      className: slots.prevButton({class: classNames?.prevButton}),
      ...mergeProps(commonButtonProps, prevButtonPropsProp, props),
    } as AriaButtonProps;
  };

  const getNextButtonProps = (props = {}) => {
    return {
      "data-slot": "next-button",
      tabIndex: isHeaderExpanded ? -1 : 0,
      className: slots.nextButton({class: classNames?.nextButton}),
      ...mergeProps(commonButtonProps, nextButtonPropsProp, props),
    } as AriaButtonProps;
  };

  const getErrorMessageProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "error-message",
      className: slots.errorMessage({class: classNames?.errorMessage}),
      ...props,
    };
  };

  return {
    Component,
    children,
    domRef,
    slots,
    locale,
    minValue,
    maxValue,
    baseProps,
    showHelper,
    weekdayStyle,
    visibleMonths,
    visibleDuration,
    shouldFilterDOMProps,
    isHeaderExpanded,
    showMonthAndYearPickers,
    createCalendar: createCalendarProp,
    getPrevButtonProps,
    getNextButtonProps,
    getErrorMessageProps,
    setIsHeaderExpanded,
    topContent,
    bottomContent,
    errorMessage,
    classNames,
    otherProps,
  };
}

export type UseCalendarBaseReturn = ReturnType<typeof useCalendarBase>;
