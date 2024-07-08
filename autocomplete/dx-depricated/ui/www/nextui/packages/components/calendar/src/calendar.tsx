import type {DateValue} from "@internationalized/date";
import type {ForwardedRef, ReactElement, Ref} from "react";

import {forwardRef} from "@nextui-org/system";

import {UseCalendarProps, useCalendar} from "./use-calendar";
import {CalendarProvider} from "./calendar-context";
import {CalendarBase} from "./calendar-base";

interface Props<T extends DateValue> extends Omit<UseCalendarProps<T>, "isHeaderWrapperExpanded"> {}

function Calendar<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {context, getBaseCalendarProps} = useCalendar<T>({...props, ref});

  return (
    <CalendarProvider value={context}>
      <CalendarBase {...getBaseCalendarProps()} />
    </CalendarProvider>
  );
}

Calendar.displayName = "NextUI.Calendar";

export type CalendarProps<T extends DateValue = DateValue> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Calendar) as <T extends DateValue>(
  props: CalendarProps<T>,
) => ReactElement;
