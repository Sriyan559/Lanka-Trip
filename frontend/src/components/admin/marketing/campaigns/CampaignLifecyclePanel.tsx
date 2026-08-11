"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import {
  FileEdit,
  Clock,
  Calendar,
  PlayCircle,
  CheckCircle,
  PauseCircle,
  XCircle,
} from "lucide-react";

interface LifecycleStage {
  stage: string;
  count: number;
  color: string;
}

const STAGE_ICONS: Record<string, React.ElementType> = {
  Draft: FileEdit,
  "Awaiting Approval": Clock,
  Scheduled: Calendar,
  Active: PlayCircle,
  Completed: CheckCircle,
  Paused: PauseCircle,
  Cancelled: XCircle,
};

export function CampaignLifecyclePanel({
  stages = [],
}: {
  stages: LifecycleStage[];
}) {
  const progressionStages = stages.filter(
    (s) => s.stage !== "Paused" && s.stage !== "Cancelled"
  );
  const terminalStages = stages.filter(
    (s) => s.stage === "Paused" || s.stage === "Cancelled"
  );

  return (
    <MarketingSectionCard
      title="Campaign Lifecycle"
      className="h-auto"
      bodyClassName="p-2 flex flex-col justify-start min-h-0"
    >
      <div className="flex items-start justify-between w-full gap-1 pt-0.5 pb-1">
        {/* Main Active Lifecycle Flow (5 stages: Draft -> Awaiting -> Scheduled -> Active -> Completed) */}
        <div className="flex-1 min-w-0 relative">
          {/* Connector Line behind icons */}
          <div className="absolute top-[12px] left-[8%] right-[8%] h-[1.5px] bg-emerald-200 z-0" />

          <div className="grid grid-cols-5 gap-0.5 w-full relative z-10 items-start">
            {progressionStages.map((stg) => {
              const IconComp = STAGE_ICONS[stg.stage] || PlayCircle;
              let displayLabel = stg.stage;
              if (stg.stage === "Awaiting Approval") {
                displayLabel = "Awaiting\nApproval";
              }

              return (
                <div
                  key={stg.stage}
                  className="flex flex-col items-center text-center min-w-0 w-full overflow-hidden"
                >
                  {/* Circle Icon */}
                  <div className="w-5 h-5 rounded-full bg-white border border-emerald-500 text-emerald-600 flex items-center justify-center shadow-2xs z-10 shrink-0">
                    <IconComp className="w-2.5 h-2.5" />
                  </div>

                  {/* Label */}
                  <div className="mt-1 text-[7.5px] 2xl:text-[8px] font-bold text-gray-700 leading-[1.05] text-center whitespace-pre-line break-words w-full min-h-[18px] flex items-center justify-center px-0.5">
                    {displayLabel}
                  </div>

                  {/* Count Badge */}
                  <span
                    className={`text-[8.5px] 2xl:text-[9.5px] font-extrabold px-1.5 py-0.2 rounded-full mt-0.5 inline-block shrink-0 ${stg.color}`}
                  >
                    {stg.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vertical Divider Line separating active pipeline from terminal states */}
        <div className="w-[1px] h-[64px] bg-gray-200 shrink-0 mx-0.5" />

        {/* Off-Path / Terminal States (Paused, Cancelled) */}
        <div className="w-[30%] min-w-0 relative">
          {/* Connector Line behind icons */}
          <div className="absolute top-[12px] left-[20%] right-[20%] h-[1.5px] bg-rose-200 z-0" />

          <div className="grid grid-cols-2 gap-0.5 w-full relative z-10 items-start">
            {terminalStages.map((stg) => {
              const IconComp = STAGE_ICONS[stg.stage] || PauseCircle;
              const isPaused = stg.stage === "Paused";

              return (
                <div
                  key={stg.stage}
                  className="flex flex-col items-center text-center min-w-0 w-full overflow-hidden"
                >
                  {/* Circle Icon */}
                  <div
                    className={`w-5 h-5 rounded-full bg-white border flex items-center justify-center shadow-2xs z-10 shrink-0 ${
                      isPaused
                        ? "border-rose-400 text-rose-600"
                        : "border-gray-400 text-gray-600"
                    }`}
                  >
                    <IconComp className="w-2.5 h-2.5" />
                  </div>

                  {/* Label */}
                  <div className="mt-1 text-[7.5px] 2xl:text-[8px] font-bold text-gray-700 leading-[1.05] text-center whitespace-pre-line break-words w-full min-h-[18px] flex items-center justify-center px-0.5">
                    {stg.stage}
                  </div>

                  {/* Count Badge */}
                  <span
                    className={`text-[8.5px] 2xl:text-[9.5px] font-extrabold px-1.5 py-0.2 rounded-full mt-0.5 inline-block shrink-0 ${stg.color}`}
                  >
                    {stg.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MarketingSectionCard>
  );
}






