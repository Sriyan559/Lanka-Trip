"use client";

import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

function MiniSparkline({ strokeColor, points }: { strokeColor: string; points?: number[] }) {
  const width = 42;
  const height = 14;
  const data = points && points.length > 0 ? points : [10, 15, 12, 18, 15, 24, 24];
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

export function FulfilmentDetailKpis() {
  const cards = [
    { title: "Ordered Quantity", value: "24", trend: "0%", isProgress: false, stroke: "#3b82f6", points: [24, 24, 24, 24, 24] },
    { title: "Reserved Quantity", value: "24", trend: "0%", isProgress: false, stroke: "#10b981", points: [24, 24, 24, 24, 24] },
    { title: "Allocated Quantity", value: "24", trend: "0%", isProgress: false, stroke: "#10b981", points: [24, 24, 24, 24, 24] },
    { title: "Short Quantity", value: "0", trend: "-", isProgress: false, stroke: "#94a3b8", points: [0, 0, 0, 0, 0] },
    { title: "Picked Quantity", value: "24", trend: "0%", isProgress: false, stroke: "#9333ea", points: [24, 24, 24, 24, 24] },
    { title: "Packed Quantity", value: "18", trend: "-25%", trendDown: true, isProgress: false, stroke: "#ef4444", points: [24, 22, 20, 18, 18] },
    { title: "Packages Planned", value: "2", trend: "0%", isProgress: false, stroke: "#0284c7", points: [2, 2, 2, 2, 2] },
    { title: "Packages Completed", value: "1", trend: "-50%", trendDown: true, isProgress: false, stroke: "#ef4444", points: [2, 2, 1, 1, 1] },
    { title: "Allocation Completion", value: "100%", trend: "0%", isProgress: true, percentage: 100, barColor: "bg-emerald-600" },
    { title: "Picking Completion", value: "100%", trend: "0%", isProgress: true, percentage: 100, barColor: "bg-emerald-600" },
    { title: "Packing Completion", value: "75%", trend: "-5%", trendDown: true, isProgress: true, percentage: 75, barColor: "bg-amber-500" },
    { title: "Fulfilment SLA Progress", value: "91%", trend: "+2%", trendUp: true, isProgress: true, percentage: 91, barColor: "bg-emerald-600" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-1.5 text-[10px]">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-1.5 sm:p-2 rounded-xl border border-line shadow-xs flex flex-col justify-between h-[62px]">
          <div className="flex items-center justify-between gap-0.5">
            <span className="text-[9px] font-semibold text-muted truncate leading-tight w-24" title={card.title}>{card.title}</span>
            {card.trend && (
              <span className={`text-[8.5px] font-bold flex items-center flex-shrink-0 ${
                card.trendDown ? "text-rose-600" : card.trendUp ? "text-emerald-600" : "text-muted"
              }`}>
                {card.trendDown && <TrendingDown size={9} />}
                {card.trendUp && <TrendingUp size={9} />}
                {card.trend}
              </span>
            )}
          </div>

          <div className="flex items-end justify-between gap-1 my-0.5">
            <div className="text-sm font-bold text-ink leading-none">{card.value}</div>
            {!card.isProgress && (
              <MiniSparkline strokeColor={card.stroke || "#3b82f6"} points={card.points} />
            )}
          </div>

          {card.isProgress && (
            <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
              <div className={`h-full rounded-full ${card.barColor}`} style={{ width: `${card.percentage}%` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
