import { Dashboard } from "@/container";
import { cn } from "@/helpers";
import { ChevronDown, MousePointerClick, UserCheck } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="">
      <Dashboard.DashboardHeader />
      <section className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl">Dashboard</h2>
            <p className="text-sm">Here&apos;s your weakly report</p>
          </div>
          <div>
            <button className="flex items-center justify-center gap-2 py-1 px-2 border rounded-lg">
              Weakly{" "}
              <span>
                <ChevronDown size={18} />
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-[70%_28%] gap-4 pt-4">
          <div>
            <div className="grid grid-cols-4 gap-4">
              {reports.map((report, index) => (
                <Dashboard.ReportCard key={index} {...report} />
              ))}
            </div>
            <div className="py-4 ">
              <Dashboard.Chart />
            </div>
          </div>
          <div>
            <div className="border rounded-xl">
              <p className="font-semibold p-2">Visitor by countries</p>
              <Dashboard.GeographyChart />
            </div>
            <div className="my-4 border p-3 rounded-xl">
              <p>Traffic source</p>
              <div className="grid gap-4 pt-4">
                {TrafficSource.map((source, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-gray-600 font-medium">
                        {source.title}
                      </h3>
                      <p className="font-bold">{source.value}</p>
                    </div>
                    <div
                      className={cn(
                        "h-2 w-full bg-gray-100 rounded-full mt-2 relative before:absolute before:left-0 before:top-0 before:h-2 before:rounded-full before:bg-blue-700",
                        source.title === "Direct" && "before:w-3/4",
                        source.title === "Referral" && "before:w-1/2",
                        source.title === "Search" && "before:w-2/3",
                        source.title === "Social" && "before:w-1/6"
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;

const reports = [
  {
    title: "Total visits",
    value: "230k",
    percentage: "30%",
    growth: "up",
  },
  {
    title: "Total subscribers",
    value: "15,00",
    percentage: "10%",
    growth: "down",
    icon: <UserCheck size={20} strokeWidth={1.5} />,
  },
  {
    title: "Open rate",
    value: "20%",
    percentage: "5%",
    growth: "up",
  },
  {
    title: "Total clicks",
    value: "32,80",
    percentage: "15%",
    growth: "down",
    icon: <MousePointerClick size={20} strokeWidth={1.5} />,
  },
];

const TrafficSource = [
  {
    title: "Direct",
    value: "2,908",
  },
  {
    title: "Referral",
    value: "760",
  },
  {
    title: "Search",
    value: "980",
  },
  {
    title: "Social",
    value: "300",
  },
];
