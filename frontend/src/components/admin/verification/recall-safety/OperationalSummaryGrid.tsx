import React from 'react';
import { OPERATIONAL_PANELS } from './recallSafetyMock';
import { OperationalSummaryCard } from './OperationalSummaryCard';

interface OperationalSummaryGridProps {
  liveData?: Record<string, any>;
}

export function OperationalSummaryGrid({ liveData = {} }: OperationalSummaryGridProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
          Operational Summary Panels
        </h3>
        <span className="text-[10px] text-gray-400">12 operational views</span>
      </div>
      {/* 6-per-row on XL, 4 on LG, 3 on MD, 2 on SM, 1 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {OPERATIONAL_PANELS.map((panel) => {
          // Merge live data if available
          const livePanelData = liveData?.[panel.id];
          const mergedPanel = livePanelData
            ? { ...panel, rows: livePanelData.rows ?? panel.rows }
            : panel;
          return (
            <OperationalSummaryCard key={panel.id} panel={mergedPanel} />
          );
        })}
      </div>
    </div>
  );
}
