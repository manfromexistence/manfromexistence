const App = `import {DatePicker} from "@nextui-org/react";
import {now, parseAbsoluteToLocal} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";

export default function App() {
  let [date, setDate] = React.useState(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <DatePicker
        className="max-w-md"
        granularity="second"
        label="Date and time"
        value={date}
        onChange={setDate}
      />
      <DatePicker
        className="max-w-md"
        granularity="day"
        label="Date"
        value={date}
        onChange={setDate}
      />
      <DatePicker className="max-w-md" granularity="second" label="Event date" />
      <DatePicker
        className="max-w-md"
        granularity="second"
        label="Event date"
        placeholderValue={now("America/New_York")}
      />
    </div>
  );
}`;

const AppTs = `import {DatePicker} from "@nextui-org/react";
import {DateValue, now, parseAbsoluteToLocal} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";

export default function App() {
  let [date, setDate] = React.useState<DateValue>(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <DatePicker
        className="max-w-md"
        granularity="second"
        label="Date and time"
        value={date}
        onChange={setDate}
      />
      <DatePicker
        className="max-w-md"
        granularity="day"
        label="Date"
        value={date}
        onChange={setDate}
      />
      <DatePicker className="max-w-md" granularity="second" label="Event date" />
      <DatePicker
        className="max-w-md"
        granularity="second"
        label="Event date"
        placeholderValue={now("America/New_York")}
      />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
  "/App.tsx": AppTs,
};

export default {
  ...react,
};
