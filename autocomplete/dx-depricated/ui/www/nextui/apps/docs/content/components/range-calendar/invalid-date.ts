const App = `import {RangeCalendar} from "@nextui-org/react";
import {today, getLocalTimeZone, isWeekend} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";


export default function App() {
  let [date, setDate] = React.useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({weeks: 1}),
  });
  let {locale} = useLocale();
  let isInvalid = isWeekend(date.start, locale) || isWeekend(date.end, locale);

  return (
    <RangeCalendar
      aria-label="Date (Invalid on weekends)"
      errorMessage={isInvalid ? "We are closed on weekends" : undefined}
      isInvalid={isInvalid}
      value={date}
      onChange={setDate}
    />
  );
}`;

const AppTs = `import {RangeCalendar} from "@nextui-org/react";
import type {DateValue} from "@react-types/calendar";
import type {RangeValue} from "@react-types/shared";
import {today, getLocalTimeZone, isWeekend} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";


export default function App() {
  let [date, setDate] = React.useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({weeks: 1}),
  });
  let {locale} = useLocale();
  let isInvalid = isWeekend(date.start, locale) || isWeekend(date.end, locale);

  return (
    <RangeCalendar
      aria-label="Date (Invalid on weekends)"
      errorMessage={isInvalid ? "We are closed on weekends" : undefined}
      isInvalid={isInvalid}
      value={date}
      onChange={setDate}
    />
  );
}`;

const react = {
  "/App.jsx": App,
  "/App.tsx": AppTs,
};

export default {
  ...react,
};
