import { General } from "@/components";
import { cn } from "@/helpers";
import React from "react";

const AudienceStats = () => {
  return (
    <div className="grid md:grid-cols-2 pb-8">
      <General.AdvertiseHeading>Audience stats</General.AdvertiseHeading>
      <div>
        <General.AdvertiseParagraph>
          The newsletter is received every week by more than{" "}
          <b>10,300 people</b>, with an <b>average open rate of 55%</b> and{" "}
          <b>CTR of between 35 and 40%</b>.
        </General.AdvertiseParagraph>
        <div className="flex items-center justify-center py-8">
          {statsBar
            .sort((a, b) => {
              return parseFloat(b.width) - parseFloat(a.width);
            })
            .map((stat, index) => {
              let bgColor = "bg-gray-200";

              if (index === 0) {
                bgColor = "bg-gray-800";
              } else if (index === 1) {
                bgColor = "bg-gray-600";
              } else if (index === 2) {
                bgColor = "bg-gray-400";
              } else if (index === 3) {
                bgColor = "bg-gray-200";
              }

              return (
                <div
                  key={index}
                  style={{ width: stat.width }}
                  className={`h-4 ${bgColor} mr-0.5`}
                ></div>
              );
            })}
        </div>
        <div className="grid grid-cols-4 divide-x-2 pb-4">
          {stats.map((stat, index) => (
            <div key={index}>
              <span
                className={cn(
                  "md:text-4xl text-2xl font-bold text-center block pb-2"
                )}
              >
                {stat.percentage}
              </span>
              <p className="text-center font-medium text-gray-700 md:text-lg text-xs">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudienceStats;

const stats = [
  {
    percentage: "23k",
    description: "monthly visits",
  },
  {
    percentage: "1100",
    description: "subscribers",
  },
  {
    percentage: "55%",
    description: "open rate",
  },
  {
    percentage: "20%",
    description: "CTR",
  },
];

const statsBar = stats.map((stat) => {
  let width = "0%";
  if (stat.percentage.includes("%")) {
    width = stat.percentage;
  } else if (stat.percentage.includes("k")) {
    const number = parseFloat(stat.percentage.replace("k", ""));
    width = `${number}%`;
  } else {
    width = `${parseFloat(stat.percentage) / 100}%`;
  }

  return { ...stat, width: width };
});
