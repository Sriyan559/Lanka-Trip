import React from 'react';
import { READINESS_METRICS, type ReadinessMetric } from './recallSafetyMock';

function ReadinessBar({ metric }: { metric: ReadinessMetric & { liveValue?: number } }) {
  const pct = Math.min(100, Math.max(0, metric.liveValue ?? metric.value));
  const color =
    pct >= 80 ? '#16a34a' :
    pct >= 60 ? '#f59e0b' :
    '#dc2626';
  const textColor =
    pct >= 80 ? 'text-green-700' :
    pct >= 60 ? 'text-amber-700' :
    'text-red-700';

  return (
    <div className="flex flex-col gap-1 min-w-0">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-medium text-gray-600 truncate pr-1">{metric.label}</span>
        <span className={`font-bold flex-shrink-0 text-[11px] ${textColor}`}>{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

interface RecallReadinessScorecardProps {
  data?: Record<string, number>;
}

export function RecallReadinessScorecard({ data = {} }: RecallReadinessScorecardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
          Recall Readiness Health Scorecard
        </h3>
        <span className="text-[10px] text-gray-400">Live metrics</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
        {READINESS_METRICS.map((metric) => (
          <ReadinessBar
            key={metric.key}
            metric={{ ...metric, liveValue: data?.[metric.key] }}
          />
        ))}
      </div>
    </div>
  );
}
