'use client';

import React from 'react';
import { WorkflowStageNode } from '@/lib/administration/workflows/workflows.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { ChevronRight } from 'lucide-react';

interface WorkflowStagePipelineProps {
  stages: WorkflowStageNode[];
  totalActiveInstances?: number;
}

export function WorkflowStagePipeline({ stages, totalActiveInstances = 126 }: WorkflowStagePipelineProps) {
  return (
    <SectionCard title="Workflow Stage Pipeline">
      <div className="flex flex-col gap-3">
        {/* Horizontal Pipeline Stepper */}
        <div className="overflow-x-auto pb-1">
          <div className="flex items-center gap-1.5 min-w-max py-2">
            {stages.map((stage, idx) => {
              const isCompleted = stage.status === 'Completed';
              const isInProgress = stage.status === 'In-Progress';
              const isPending = stage.status === 'Pending';
              const isUpcoming = stage.status === 'Upcoming';

              let nodeBorderColor = 'border-gray-200 bg-gray-50 text-gray-500';
              let countColor = 'text-gray-600 bg-gray-100';

              if (isCompleted) {
                nodeBorderColor = 'border-emerald-300 bg-emerald-50/60 text-emerald-900';
                countColor = 'text-emerald-700 bg-emerald-100';
              } else if (isInProgress) {
                nodeBorderColor = 'border-amber-300 bg-amber-50/60 text-amber-900 ring-2 ring-amber-400/30';
                countColor = 'text-amber-700 bg-amber-100 font-extrabold';
              } else if (isPending) {
                nodeBorderColor = 'border-blue-300 bg-blue-50/60 text-blue-900';
                countColor = 'text-blue-700 bg-blue-100';
              }

              return (
                <React.Fragment key={stage.id}>
                  <div
                    className={`flex flex-col items-center justify-between p-2 rounded border min-w-[100px] min-h-[64px] transition-colors ${nodeBorderColor}`}
                  >
                    <span className="text-[10px] font-bold text-center leading-tight">
                      {stage.label}
                    </span>
                    <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full mt-1.5 ${countColor}`}>
                      {stage.count}
                    </span>
                  </div>

                  {idx < stages.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Legend & Total */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-gray-150 text-[10px]">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span className="text-gray-600 font-medium">Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              <span className="text-gray-600 font-medium">In-Progress</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              <span className="text-gray-600 font-medium">Pending</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
              <span className="text-gray-600 font-medium">Upcoming</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
              <span className="text-gray-600 font-medium">Skipped</span>
            </div>
          </div>

          <div className="text-gray-700 font-bold">
            Total Active Instances: <span className="text-[#741d35] font-extrabold">{totalActiveInstances}</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
export default WorkflowStagePipeline;
