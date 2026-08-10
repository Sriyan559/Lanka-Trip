"use client";

import React from "react";
import { 
  Package, Boxes, Layers, CheckSquare, Send, Truck, Clock, CheckCircle2, AlertTriangle, RotateCcw, ShieldAlert
} from "lucide-react";

export interface LogisticsMetricsProps {
  metrics?: Record<string, any>;
}

function MiniSparkline({ strokeColor, points }: { strokeColor: string; points?: number[] }) {
  const width = 64;
  const height = 20;

  // Render a clean SVG path for the sparkline trend visual
  const data = points && points.length > 0 ? points : [12, 18, 14, 22, 19, 28, 24];
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pathPoints = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${pathPoints.join(" L ")}`;

  return (
    <svg width={width} height={height} className="overflow-visible flex-shrink-0">
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogisticsMetricsRow({ metrics }: LogisticsMetricsProps) {
  const m = metrics || {};

  const items = [
    {
      title: "Total Fulfilment Orders",
      value: (m.total_orders ?? m.totalActiveShipments ?? 1248).toLocaleString(),
      icon: <Package size={16} className="text-blue-600" />,
      stroke: "#2563eb",
      points: [1100, 1150, 1180, 1210, 1230, 1248],
    },
    {
      title: "Awaiting Inventory Allocation",
      value: (m.awaiting_allocation ?? m.pendingCarrierAssignment ?? 84).toLocaleString(),
      icon: <Boxes size={16} className="text-amber-600" />,
      stroke: "#d97706",
      points: [95, 90, 88, 92, 86, 84],
    },
    {
      title: "Picking in Progress",
      value: (m.picking_in_progress ?? 126).toLocaleString(),
      icon: <Layers size={16} className="text-purple-600" />,
      stroke: "#9333ea",
      points: [110, 115, 120, 118, 124, 126],
    },
    {
      title: "Packing in Progress",
      value: (m.packing_in_progress ?? 96).toLocaleString(),
      icon: <CheckSquare size={16} className="text-sky-600" />,
      stroke: "#0284c7",
      points: [80, 85, 90, 88, 94, 96],
    },
    {
      title: "Ready for Dispatch",
      value: (m.ready_for_dispatch ?? m.pickupScheduled ?? 142).toLocaleString(),
      icon: <Send size={16} className="text-indigo-600" />,
      stroke: "#4f46e5",
      points: [130, 135, 138, 140, 142],
    },
    {
      title: "Awaiting Carrier Pickup",
      value: (m.awaiting_carrier_pickup ?? m.awaitingPickup ?? 64).toLocaleString(),
      icon: <Truck size={16} className="text-amber-600" />,
      stroke: "#f59e0b",
      points: [70, 68, 65, 66, 64],
    },
    {
      title: "Shipments in Transit",
      value: (m.shipments_in_transit ?? m.inTransit ?? 286).toLocaleString(),
      icon: <Truck size={16} className="text-blue-600" />,
      stroke: "#3b82f6",
      points: [250, 260, 270, 275, 280, 286],
    },
    {
      title: "Out for Delivery",
      value: (m.out_for_delivery ?? 118).toLocaleString(),
      icon: <Truck size={16} className="text-emerald-600" />,
      stroke: "#10b981",
      points: [100, 105, 110, 112, 115, 118],
    },
    {
      title: "Delivered This Period",
      value: (m.delivered_this_period ?? m.deliveredToday ?? 842).toLocaleString(),
      icon: <CheckCircle2 size={16} className="text-emerald-600" />,
      stroke: "#059669",
      points: [780, 800, 815, 830, 842],
    },
    {
      title: "Delayed or Failed Deliveries",
      value: (m.delayed_or_failed ?? m.failedDeliveries ?? 42).toLocaleString(),
      icon: <AlertTriangle size={16} className="text-rose-600" />,
      textClass: "text-rose-600",
      stroke: "#e11d48",
      points: [55, 50, 48, 45, 42],
    },
    {
      title: "Returns Awaiting Collection",
      value: (m.returns_awaiting ?? m.returnShipments ?? 38).toLocaleString(),
      icon: <RotateCcw size={16} className="text-purple-600" />,
      stroke: "#a855f7",
      points: [45, 42, 40, 39, 38],
    },
    {
      title: "Logistics SLA Breaches",
      value: (m.sla_breaches ?? m.slaBreaches ?? 12).toLocaleString(),
      icon: <ShieldAlert size={16} className="text-rose-600" />,
      textClass: "text-rose-600",
      stroke: "#dc2626",
      points: [18, 16, 15, 14, 12],
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white p-3.5 rounded-xl border border-line shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center gap-1.5 mb-2">
            {item.icon}
            <span className="text-[11px] font-semibold text-muted leading-tight truncate">
              {item.title}
            </span>
          </div>

          <div className="flex items-end justify-between gap-2 mt-1">
            <div className={`text-xl font-bold ${item.textClass || "text-ink"}`}>
              {item.value}
            </div>
            <MiniSparkline strokeColor={item.stroke} points={item.points} />
          </div>
        </div>
      ))}
    </div>
  );
}
