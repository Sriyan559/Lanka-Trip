"use client";

import React from "react";
import { 
  Package, Clock, Truck, Send, CheckCircle2, AlertTriangle, RotateCcw, ShieldAlert, Award, CheckSquare
} from "lucide-react";

export interface ShipmentKpiGridProps {
  metrics?: Record<string, any>;
}

function MiniSparkline({ strokeColor, points }: { strokeColor: string; points?: number[] }) {
  const width = 36;
  const height = 12;
  const data = points && points.length > 0 ? points : [12, 18, 14, 22, 19, 28, 24];
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pathPoints = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 3) - 1.5;
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

export function ShipmentKpiGrid({ metrics }: ShipmentKpiGridProps) {
  const m = metrics || {};

  const items = [
    { title: "Total Shipments", value: "1,426", icon: <Package size={11} className="text-blue-600" />, stroke: "#2563eb", points: [1300, 1340, 1380, 1400, 1426] },
    { title: "Creation Pending", value: "42", icon: <Clock size={11} className="text-amber-600" />, stroke: "#d97706", points: [55, 50, 48, 45, 42] },
    { title: "Awaiting Carrier", value: "28", icon: <Truck size={11} className="text-purple-600" />, stroke: "#9333ea", points: [35, 32, 30, 29, 28] },
    { title: "Awaiting Pickup", value: "64", icon: <Truck size={11} className="text-amber-600" />, stroke: "#f59e0b", points: [75, 70, 68, 65, 64] },
    { title: "Collected / Picked Up", value: "118", icon: <Send size={11} className="text-indigo-600" />, stroke: "#4f46e5", points: [100, 105, 110, 115, 118] },
    { title: "In Transit", value: "286", icon: <Truck size={11} className="text-blue-600" />, stroke: "#3b82f6", points: [250, 260, 270, 280, 286] },
    { title: "At Delivery Hub", value: "118", icon: <Truck size={11} className="text-purple-600" />, stroke: "#8b5cf6", points: [100, 105, 110, 114, 118] },
    { title: "Out for Delivery", value: "156", icon: <Send size={11} className="text-amber-600" />, stroke: "#f59e0b", points: [140, 145, 148, 152, 156] },
    { title: "Delivered", value: "842", icon: <CheckCircle2 size={11} className="text-emerald-600" />, stroke: "#10b981", points: [780, 800, 815, 830, 842] },
    { title: "Delayed", value: "18", icon: <AlertTriangle size={11} className="text-rose-600" />, textClass: "text-rose-600", stroke: "#e11d48", points: [25, 22, 20, 19, 18] },
    { title: "Failed Delivery", value: "12", icon: <AlertTriangle size={11} className="text-rose-600" />, textClass: "text-rose-600", stroke: "#dc2626", points: [18, 15, 14, 13, 12] },
    { title: "Return to Origin", value: "14", icon: <RotateCcw size={11} className="text-purple-600" />, stroke: "#a855f7", points: [18, 16, 15, 14] },
    { title: "SLA Breaches", value: "16", icon: <ShieldAlert size={11} className="text-rose-600" />, textClass: "text-rose-600", stroke: "#dc2626", points: [22, 20, 18, 16] },
    { title: "First-Attempt Rate", value: "94%", icon: <Award size={11} className="text-emerald-600" />, stroke: "#10b981", points: [90, 91, 92, 93, 94] },
    { title: "On-Time Rate", value: "91%", icon: <Award size={11} className="text-emerald-600" />, stroke: "#10b981", points: [88, 89, 90, 91] },
    { title: "POD Completeness", value: "88%", icon: <CheckSquare size={11} className="text-emerald-600" />, stroke: "#059669", points: [84, 85, 86, 87, 88] },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 xl:grid-cols-16 gap-1.5 text-[9.5px]">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white p-1 sm:p-1.5 rounded-xl border border-line shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between h-[56px]"
        >
          <div className="flex items-center gap-0.5">
            {item.icon}
            <span className="text-[8.5px] font-semibold text-muted leading-tight truncate" title={item.title}>
              {item.title}
            </span>
          </div>

          <div className="flex items-end justify-between gap-0.5 my-0.5">
            <div className={`text-xs sm:text-sm font-bold leading-none ${item.textClass || "text-ink"}`}>
              {item.value}
            </div>
            <MiniSparkline strokeColor={item.stroke} points={item.points} />
          </div>
        </div>
      ))}
    </div>
  );
}
