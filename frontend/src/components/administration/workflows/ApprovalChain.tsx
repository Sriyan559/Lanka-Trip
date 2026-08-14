'use client';

import React from 'react';
import { ApprovalChainNode } from '@/lib/administration/workflows/workflows.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { User, CheckCircle, Clock, ChevronRight } from 'lucide-react';

interface ApprovalChainProps {
  chain: ApprovalChainNode[];
  workflowTitle?: string;
}

export function ApprovalChain({ chain, workflowTitle = 'Production Configuration Change' }: ApprovalChainProps) {
  return (
    <SectionCard title={`Approval Chain (${workflowTitle})`}>
      <div className="flex flex-col gap-3">
        <div className="overflow-x-auto pb-1">
          <div className="flex items-center gap-2 min-w-max py-2">
            {chain.map((node, idx) => {
              const isCompleted = node.status === 'Completed';
              const isCurrent = node.status === 'Current';
              const isPending = node.status === 'Pending';
              const isUpcoming = node.status === 'Upcoming';

              let borderColor = 'border-gray-200 bg-gray-50';
              let iconColor = 'text-gray-400';
              let roleColor = 'text-gray-600';

              if (isCompleted) {
                borderColor = 'border-emerald-300 bg-emerald-50/60';
                iconColor = 'text-emerald-600';
                roleColor = 'text-emerald-900';
              } else if (isCurrent) {
                borderColor = 'border-[#741d35] bg-[#741d35]/5 ring-2 ring-[#741d35]/20';
                iconColor = 'text-[#741d35]';
                roleColor = 'text-[#741d35] font-extrabold';
              } else if (isPending) {
                borderColor = 'border-amber-300 bg-amber-50/60';
                iconColor = 'text-amber-600';
                roleColor = 'text-amber-900';
              }

              return (
                <React.Fragment key={node.id}>
                  <div className={`flex items-center gap-2 p-2 rounded border min-w-[130px] ${borderColor}`}>
                    <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
                      {isCompleted ? (
                        <CheckCircle className={`w-3.5 h-3.5 ${iconColor}`} />
                      ) : (
                        <User className={`w-3.5 h-3.5 ${iconColor}`} />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-[10px] font-bold truncate ${roleColor}`}>
                        {node.role}
                      </span>
                      <span className="text-[9px] text-gray-500 font-medium truncate">
                        {node.actor}
                      </span>
                    </div>
                  </div>

                  {idx < chain.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-150 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span className="text-gray-600 font-medium">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#741d35] inline-block" />
            <span className="text-[#741d35] font-bold">Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
            <span className="text-gray-600 font-medium">Pending</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
            <span className="text-gray-600 font-medium">Upcoming</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
export default ApprovalChain;
