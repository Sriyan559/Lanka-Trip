"use client";

import React from "react";

export interface FulfilmentKpiGridProps {
  metrics?: Record<string, any>;
}

function MiniSparkline({ strokeColor, points }: { strokeColor: string; points?: number[] }) {
  const width = 40;
  const height = 14;
  const data = points && points.length > 0 ? points : [10, 16, 12, 20, 17, 26, 22];
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pathPoints = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <svg width={width} height={height} className="overflow-visible flex-shrink-0">
      <path
        d={`M ${pathPoints.join(" L ")}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FulfilmentKpiGrid({ metrics }: FulfilmentKpiGridProps) {
  const m = metrics || {};

  const items = [
    { index: 1, title: "Total Fulfilment Orders", value: (m.total_orders ?? 1248).toLocaleString(), stroke: "#2563eb", points: [1100, 1150, 1180, 1210, 1230, 1248] },
    { index: 2, title: "New / Unassigned", value: (m.new_unassigned ?? 42).toLocaleString(), stroke: "#d97706", points: [55, 50, 48, 45, 42] },
    { index: 3, title: "Allocation Pending", value: (m.allocation_pending ?? 84).toLocaleString(), stroke: "#d97706", points: [95, 90, 88, 92, 86, 84] },
    { index: 4, title: "Allocation Failed", value: (m.allocation_failed ?? 18).toLocaleString(), stroke: "#ef4444", textClass: "text-rose-600", points: [25, 22, 20, 19, 18] },
    { index: 5, title: "Picking in Progress", value: (m.picking_in_progress ?? 126).toLocaleString(), stroke: "#9333ea", points: [110, 115, 120, 118, 124, 126] },
    { index: 6, title: "Picking Exceptions", value: (m.picking_exceptions ?? 12).toLocaleString(), stroke: "#e11d48", textClass: "text-rose-600", points: [18, 16, 15, 14, 12] },
    { index: 7, title: "Packing in Progress", value: (m.packing_in_progress ?? 96).toLocaleString(), stroke: "#0284c7", points: [80, 85, 90, 88, 94, 96] },
    { index: 8, title: "Quality Review Pending", value: (m.quality_pending ?? 28).toLocaleString(), stroke: "#f59e0b", points: [35, 32, 30, 29, 28] },
    { index: 9, title: "Ready for Dispatch", value: (m.ready_for_dispatch ?? 142).toLocaleString(), stroke: "#4f46e5", points: [130, 135, 138, 140, 142] },
    { index: 10, title: "Fulfilment Holds", value: (m.fulfilment_holds ?? 24).toLocaleString(), stroke: "#d97706", textClass: "text-amber-700", points: [30, 28, 26, 25, 24] },
    { index: 11, title: "Blocked Fulfilment", value: (m.blocked_fulfilment ?? 18).toLocaleString(), stroke: "#dc2626", textClass: "text-rose-600", points: [22, 20, 19, 18] },
    { index: 12, title: "Fulfilment SLA Breaches", value: (m.sla_breaches ?? 12).toLocaleString(), stroke: "#dc2626", textClass: "text-rose-600", points: [16, 15, 14, 13, 12] },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-1.5 text-[10px]">
      {items.map((item) => (
        <div
          key={item.index}
          className="bg-white p-1.5 sm:p-2 rounded-xl border border-line shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between h-[60px]"
        >
          <div className="flex items-center gap-1">
            <span className="text-[8px] font-bold text-muted bg-canvas border border-line px-1 py-0.1 rounded flex-shrink-0">
              {item.index}
            </span>
            <span className="text-[9px] font-semibold text-muted leading-tight truncate" title={item.title}>
              {item.title}
            </span>
          </div>

          <div className="flex items-end justify-between gap-1 my-0.5">
            <div className={`text-sm font-bold leading-none ${item.textClass || "text-ink"}`}>
              {item.value}
            </div>
            <MiniSparkline strokeColor={item.stroke} points={item.points} />
          </div>
        </div>
      ))}
    </div>
  );
}
