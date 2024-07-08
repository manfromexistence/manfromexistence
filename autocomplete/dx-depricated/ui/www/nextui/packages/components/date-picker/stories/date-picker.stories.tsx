import React from "react";
import {Meta} from "@storybook/react";
import {dateInput} from "@nextui-org/theme";
import {
  DateValue,
  getLocalTimeZone,
  isWeekend,
  now,
  parseAbsoluteToLocal,
  parseDate,
  parseZonedDateTime,
  startOfMonth,
  startOfWeek,
  today,
} from "@internationalized/date";
import {I18nProvider, useDateFormatter, useLocale} from "@react-aria/i18n";
import {Button, ButtonGroup} from "@nextui-org/button";
import {Radio, RadioGroup} from "@nextui-org/radio";
import {cn} from "@nextui-org/system";

import {DatePicker, DatePickerProps} from "../src";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "faded", "bordered", "underlined"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    labelPlacement: {
      control: {
        type: "select",
      },
      options: ["inside", "outside", "outside-left"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-start">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof DatePicker>;

const defaultProps = {
  label: "Birth Date",
  className: "max-w-[256px]",
  ...dateInput.defaultVariants,
};

const Template = (args: DatePickerProps) => <DatePicker {...args} />;

const LabelPlacementTemplate = (args: DatePickerProps) => (
  <div className="w-full max-w-xl flex flex-col items-start gap-4">
    <DatePicker {...args} description="inside" />
    <DatePicker {...args} description="outside" labelPlacement="outside" />
    <DatePicker {...args} description="outside-left" labelPlacement="outside-left" />
  </div>
);

const ControlledTemplate = (args: DatePickerProps) => {
  const [value, setValue] = React.useState<DateValue>(parseDate("2024-04-04"));

  let formatter = useDateFormatter({dateStyle: "full"});

  return (
    <div className="flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <DatePicker {...args} label="Date (controlled)" value={value} onChange={setValue} />
        <p className="text-default-500 text-sm">
          Selected date: {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
        </p>
      </div>
      <DatePicker {...args} defaultValue={parseDate("2024-04-04")} label="Date (uncontrolled)" />
    </div>
  );
};

const TimeZonesTemplate = (args: DatePickerProps) => (
  <div className="w-full max-w-xl flex flex-col items-start gap-4">
    <DatePicker
      {...args}
      className="max-w-xs"
      defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
      labelPlacement="outside"
    />
    <DatePicker
      // {...args}
      className="max-w-xs"
      defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
      labelPlacement="outside"
    />
  </div>
);

const GranularityTemplate = (args: DatePickerProps) => {
  let [date, setDate] = React.useState<DateValue>(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <DatePicker
        {...args}
        className="max-w-md"
        granularity="second"
        label="Date and time"
        value={date}
        onChange={setDate}
      />
      <DatePicker
        {...args}
        className="max-w-md"
        granularity="day"
        label="Date"
        value={date}
        onChange={setDate}
      />
      <DatePicker {...args} className="max-w-md" granularity="second" label="Event date" />
      <DatePicker
        {...args}
        className="max-w-md"
        granularity="second"
        label="Event date"
        placeholderValue={now("America/New_York")}
      />
    </div>
  );
};

const InternationalCalendarsTemplate = (args: DatePickerProps) => {
  let [date, setDate] = React.useState<DateValue>(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="hi-IN-u-ca-indian">
        <DatePicker
          {...args}
          className="max-w-md"
          label="Appointment date"
          value={date}
          onChange={setDate}
        />
      </I18nProvider>
    </div>
  );
};

const PresetsTemplate = (args: DatePickerProps) => {
  let defaultDate = today(getLocalTimeZone());

  const [value, setValue] = React.useState<DateValue>(defaultDate);

  let {locale} = useLocale();
  let formatter = useDateFormatter({dateStyle: "full"});

  let now = today(getLocalTimeZone());
  let nextWeek = startOfWeek(now.add({weeks: 1}), locale);
  let nextMonth = startOfMonth(now.add({months: 1}));

  const CustomRadio = (props) => {
    const {children, ...otherProps} = props;

    return (
      <Radio
        {...otherProps}
        classNames={{
          base: cn(
            "flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between",
            "cursor-pointer rounded-full border-2 border-default-200/60",
            "data-[selected=true]:border-primary",
          ),
          label: "text-tiny text-default-500",
          labelWrapper: "px-1 m-0",
          wrapper: "hidden",
        }}
      >
        {children}
      </Radio>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <DatePicker
        CalendarBottomContent={
          <RadioGroup
            aria-label="Date precision"
            classNames={{
              base: "w-full pb-2",
              wrapper: "-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[280px] overflow-scroll",
            }}
            defaultValue="exact_dates"
            orientation="horizontal"
          >
            <CustomRadio value="exact_dates">Exact dates</CustomRadio>
            <CustomRadio value="1_day">1 day</CustomRadio>
            <CustomRadio value="2_days">2 days</CustomRadio>
            <CustomRadio value="3_days">3 days</CustomRadio>
            <CustomRadio value="7_days">7 days</CustomRadio>
            <CustomRadio value="14_days">14 days</CustomRadio>
          </RadioGroup>
        }
        CalendarTopContent={
          <ButtonGroup
            fullWidth
            className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
            radius="full"
            size="sm"
            variant="bordered"
          >
            <Button onPress={() => setValue(now)}>Today</Button>
            <Button onPress={() => setValue(nextWeek)}>Next week</Button>
            <Button onPress={() => setValue(nextMonth)}>Next month</Button>
          </ButtonGroup>
        }
        calendarProps={{
          focusedValue: value,
          onFocusChange: setValue,
          nextButtonProps: {
            variant: "bordered",
          },
          prevButtonProps: {
            variant: "bordered",
          },
        }}
        value={value}
        onChange={setValue}
        {...args}
        label="Event date"
      />
      <p className="text-default-500 text-sm">
        Selected date: {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
      </p>
    </div>
  );
};

const UnavailableDatesTemplate = (args: DatePickerProps) => {
  let now = today(getLocalTimeZone());

  let disabledRanges = [
    [now, now.add({days: 5})],
    [now.add({days: 14}), now.add({days: 16})],
    [now.add({days: 23}), now.add({days: 24})],
  ];

  let {locale} = useLocale();

  let isDateUnavailable = (date) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
    );

  return (
    <DatePicker
      aria-label="Appointment date"
      isDateUnavailable={isDateUnavailable}
      minValue={today(getLocalTimeZone())}
      {...args}
    />
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const WithMonthAndYearPickers = {
  render: Template,
  args: {
    ...defaultProps,
    variant: "bordered",
    showMonthAndYearPickers: true,
  },
};

export const WithTimeField = {
  render: Template,
  args: {
    ...defaultProps,
    label: "Event date",
    hideTimeZone: true,
    showMonthAndYearPickers: true,
    defaultValue: now(getLocalTimeZone()),
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
  },
};

export const Required = {
  render: Template,
  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const Disabled = {
  render: Template,
  args: {
    ...defaultProps,
    isDisabled: true,
    defaultValue: parseDate("2024-04-04"),
  },
};

export const ReadOnly = {
  render: Template,
  args: {
    ...defaultProps,
    isReadOnly: true,
    defaultValue: parseDate("2024-04-04"),
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: null,
    "aria-label": "Birth date",
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: "Please enter your birth date",
  },
};

export const SelectorIcon = {
  render: Template,

  args: {
    ...defaultProps,
    selectorIcon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M8 2v4m8-4v4" />
          <rect height="18" rx="2" width="18" x="3" y="4" />
          <path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
        </g>
      </svg>
    ),
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    errorMessage: "Please enter a valid date",
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    isInvalid: true,
    defaultValue: parseDate("2024-04-04"),
    errorMessage: "Please enter a valid date",
  },
};

export const TimeZones = {
  render: TimeZonesTemplate,

  args: {
    ...defaultProps,
    label: "Event date",
    defaultValue: parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]"),
  },
};

export const Granularity = {
  render: GranularityTemplate,

  args: {
    ...defaultProps,
  },
};

export const InternationalCalendars = {
  render: InternationalCalendarsTemplate,

  args: {
    ...defaultProps,
    showMonthAndYearPickers: true,
  },
};

export const MinDateValue = {
  render: Template,

  args: {
    ...defaultProps,
    minValue: today(getLocalTimeZone()),
    defaultValue: parseDate("2024-04-03"),
  },
};

export const MaxDateValue = {
  render: Template,

  args: {
    ...defaultProps,
    maxValue: today(getLocalTimeZone()),
    defaultValue: parseDate("2024-04-05"),
  },
};

export const UnavailableDates = {
  render: UnavailableDatesTemplate,
  args: {
    ...defaultProps,
    defaultValue: today(getLocalTimeZone()),
    unavailableDates: [today(getLocalTimeZone())],
  },
};

export const VisibleMonths = {
  render: Template,

  args: {
    ...defaultProps,
    visibleMonths: 2,
  },
};

export const PageBehavior = {
  render: Template,
  args: {
    ...defaultProps,
    visibleMonths: 2,
    pageBehavior: "single",
  },
};

export const Presets = {
  render: PresetsTemplate,
  args: {
    ...defaultProps,
  },
};
