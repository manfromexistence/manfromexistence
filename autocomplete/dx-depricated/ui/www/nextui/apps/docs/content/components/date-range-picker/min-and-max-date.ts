const App = `import {DateRangePicker} from "@nextui-org/react";
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <div className="w-full flex flex-col gap-1">
        <h3>Min date</h3>
        <DateRangePicker
          label="Date and time"
          minValue={today(getLocalTimeZone())}
          defaultValue={{
            start: today(getLocalTimeZone()).subtract({days: 1}),
            end: parseDate("2024-04-08"),
          }}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <h3>Max date</h3>
        <DateRangePicker
          label="Date and time"
          maxValue={today(getLocalTimeZone())}
          defaultValue={{
            start: today(getLocalTimeZone()).subtract({days: 1}),
            end: parseDate("2024-04-08"),
          }}
        />
      </div>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
