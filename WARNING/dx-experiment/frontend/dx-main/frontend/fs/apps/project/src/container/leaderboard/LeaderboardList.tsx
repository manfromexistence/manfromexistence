"use client";

import { DataDisplay } from "@/components";
import { AlertCircle } from "lucide-react";
import React from "react";

export const LeaderboardList = () => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="pt-4 w-full px-4 relative">
      {show && (
        <p className="absolute -top-0 right-8 bg-yellow-200 rounded-md px-1 text-xs z-50">
          1 Resource = 10 points
        </p>
      )}
      <DataDisplay.Table>
        <DataDisplay.TableHeader>
          <DataDisplay.TableRow>
            {["Position", "Name", "Points"].map((data) => {
              return (
                <DataDisplay.TableHead
                  key={data}
                  className=" font-medium py-2 text-gray-500 first:w-20 text-center "
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>{data}</span>
                    {data === "Points" && (
                      <button
                        className="group"
                        onMouseOver={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                      >
                        <AlertCircle size={12} />
                      </button>
                    )}
                  </div>
                </DataDisplay.TableHead>
              );
            })}
          </DataDisplay.TableRow>
        </DataDisplay.TableHeader>
        <DataDisplay.TableBody>
          {tableData.map((data) => {
            return (
              <DataDisplay.TableRow className="border-b h-12" key={data.name}>
                <DataDisplay.TableCell className="font-semibold text-sm text-center ">
                  {data.position}
                </DataDisplay.TableCell>
                <DataDisplay.TableCell className="font-semibold text-sm">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="inline-block w-6 h-6 rounded-full bg-gray-200"></span>
                    {data.name}
                  </div>
                </DataDisplay.TableCell>
                <DataDisplay.TableCell className="font-semibold text-sm text-center">
                  {data.points} PTS
                </DataDisplay.TableCell>
              </DataDisplay.TableRow>
            );
          })}
        </DataDisplay.TableBody>
      </DataDisplay.Table>
    </div>
  );
};

const tableData = [
  {
    name: "john doe",
    position: "1st",
    points: 10,
  },
  {
    name: "john doe",
    position: "2nd",
    points: 10,
  },
  {
    name: "john doe",
    position: "3rd",
    points: 10,
  },
  {
    name: "john doe",
    position: "4th",
    points: 10,
  },
  {
    name: "john doe",
    position: "5th",
    points: 10,
  },
  {
    name: "john doe",
    position: "6th",
    points: 10,
  },
  {
    name: "john doe",
    position: "7th",
    points: 10,
  },
  {
    name: "john doe",
    position: "8th",
    points: 10,
  },
  {
    name: "john doe",
    position: "9th",
    points: 10,
  },
  {
    name: "john doe",
    position: "10th",
    points: 10,
  },
];
