const ClockCircleLinearIcon = `export const ClockCircleLinearIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);`;

const App = `import {TimeInput} from "@nextui-org/react";
import {ClockCircleLinearIcon} from './ClockCircleLinearIcon';
import {Time} from "@internationalized/date";

export default function App() {
  return (
    <TimeInput 
      label="Event Time" 
      labelPlacement="outside" 
      defaultValue={new Time(11, 45)} 
      endContent={(
        <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
      )}
    />
  );
}`;

const react = {
  "/App.jsx": App,
  "/ClockCircleLinearIcon.jsx": ClockCircleLinearIcon,
};

export default {
  ...react,
};
