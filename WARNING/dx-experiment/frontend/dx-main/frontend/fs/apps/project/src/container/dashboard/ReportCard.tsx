import { cn } from "@/helpers";
import { ArrowDown, ArrowUp, MousePointerClick, UserCheck } from "lucide-react";

interface ReportCardProps {
  title: string;
  value: string;
  percentage: string;
  growth: string;
  icon?: React.ReactNode;
}

export const ReportCard = ({
  growth,
  percentage,
  title,
  value,
  icon,
}: ReportCardProps) => {
  return (
    <div className="p-2 rounded-xl border flex flex-col gap-2 shadow-sm">
      <span className="">
        {icon ? icon : <ArrowDown size={20} strokeWidth={1.5} />}
      </span>
      <p className="font-medium">{title}</p>
      <div className="flex ice justify-between gap-6">
        <p className="text-2xl font-bold">{value}</p>
        <div className="flex items-center">
          <p
            className={cn(
              "rounded-full text-xs flex items-center justify-center px-1 py-1",
              growth === "up"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            )}
          >
            <span>
              {growth === "up" ? (
                <ArrowUp size={16} strokeWidth={1.5} />
              ) : (
                <ArrowDown size={16} strokeWidth={1.5} />
              )}
            </span>
            <span>{percentage}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
