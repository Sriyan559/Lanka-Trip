import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function RightIntelligenceRail({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[300px] flex-shrink-0 flex flex-col gap-4 border-l border-gray-200 pl-4 py-4 min-h-screen">
      {children}
    </div>
  );
}

export function RailSection({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="flex flex-col mb-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

interface HealthScoreGaugeProps {
  score: number;
  label: string;
  statusText: string;
  statusColor?: string;
  metrics: { label: string; value: string; progress: number }[];
}

export function HealthScoreGauge({ score, label, statusText, statusColor = '#22c55e', metrics }: HealthScoreGaugeProps) {
  return (
    <div className="flex items-start gap-4 mb-2">
      <div className="w-20 h-20 flex-shrink-0 relative flex flex-col items-center justify-center">
        <CircularProgressbar
          value={score}
          text={`${score}`}
          strokeWidth={8}
          styles={buildStyles({
            textSize: '28px',
            pathColor: statusColor,
            textColor: '#111827',
            trailColor: '#f3f4f6',
            pathTransitionDuration: 0.5,
          })}
        />
        <div className="absolute -bottom-1 bg-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-gray-200 shadow-sm" style={{ color: statusColor }}>
          {statusText}
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 mt-1">
        {metrics.map((m, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-medium text-gray-600">{m.label}</span>
              <span className="font-bold text-gray-900">{m.value}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1">
              <div className="bg-green-500 h-1 rounded-full" style={{ width: `${m.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
