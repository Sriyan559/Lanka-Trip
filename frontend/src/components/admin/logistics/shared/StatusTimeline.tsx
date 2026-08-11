import React from "react";

export interface TimelineStep {
  id?: string | number;
  label: string;
  timestamp?: string;
  status: "completed" | "current" | "pending" | "failed";
  isException?: boolean;
}

interface StatusTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export function StatusTimeline({ steps, className = "" }: StatusTimelineProps) {
  return (
    <div className={`w-full overflow-x-auto no-scrollbar py-2 ${className}`}>
      <div className="flex items-center justify-between min-w-[900px] relative">
        {/* Connecting line */}
        <div className="absolute top-3 left-4 right-4 h-0.5 bg-gray-200 -z-0" />

        {steps.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";
          const isFailed = step.status === "failed";

          let nodeBg = "bg-gray-200 border-gray-300 text-gray-400";
          if (isCompleted) {
            nodeBg = "bg-emerald-600 border-emerald-600 text-white";
          } else if (isCurrent) {
            nodeBg = "bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100";
          } else if (isFailed) {
            nodeBg = "bg-rose-600 border-rose-600 text-white";
          }

          return (
            <div
              key={step.id || index}
              className="flex flex-col items-center text-center relative z-10 px-1 min-w-[70px]"
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all ${nodeBg}`}
              >
                {isCompleted ? "✓" : isFailed ? "!" : index + 1}
              </div>
              <span
                className={`text-[10px] font-semibold mt-1.5 leading-tight ${
                  isCurrent
                    ? "text-blue-700 font-bold"
                    : isCompleted
                    ? "text-gray-900"
                    : isFailed
                    ? "text-rose-700 font-bold"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
              {step.timestamp && (
                <span className="text-[9px] text-gray-400 font-normal mt-0.5">
                  {step.timestamp}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
