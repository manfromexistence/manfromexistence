"use client";

import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export const Chart = () => {
  return (
    <div className="rounded-xl border p-2">
      <div className="pb-3">
        <h3 className="text-lg font-semibold">Total Visits</h3>
      </div>
      <ResponsiveContainer width="100%" aspect={2.0}>
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            stroke="hsl(28, 10%, 53%)"
            tickLine={false}
          />
          <Tooltip
            content={<TooltipContent />}
            cursor={{ fill: "transparent" }}
          />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fill="#0a0a0a0a"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const TooltipContent = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-lg">
        <p className="text-gray-600 font-semibold">
          {payload[0].payload.day} : {payload[0].payload.uv}
        </p>
      </div>
    );
  }

  return null;
};

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
    day: "Mon",
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
    day: "Tue",
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
    day: "Wed",
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
    day: "Thu",
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
    day: "Fri",
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
    day: "Sat",
  },

  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
    day: "Sun",
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
    day: "Mon",
  },

  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
    day: "Tue",
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    day: "Wed",
  },
  {
    name: "Page H",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    day: "Thu",
  },
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
    day: "Fri",
  },
];
