"use client";

import React from "react";
import { DollarSign, CreditCard, ShieldCheck, Warehouse, Truck, CheckSquare, TrendingUp, TrendingDown } from "lucide-react";

export interface SecondaryMetricsProps {
  logisticsCostToday?: number;
  carrierChargesPending?: number;
  codPendingRemittance?: number;
  warehouseCapacityUsed?: number;
  carrierCapacityUsed?: number;
  podCompleteness?: number;
}

export function LogisticsSecondaryMetricsStrip({
  logisticsCostToday,
  carrierChargesPending,
  codPendingRemittance,
  warehouseCapacityUsed,
  carrierCapacityUsed,
  podCompleteness,
}: SecondaryMetricsProps) {
  const items = [
    {
      label: "Logistics Cost This Period",
      value: logisticsCostToday != null ? `LKR ${logisticsCostToday.toLocaleString()}` : "—",
      trend: "+8.4%",
      trendUp: true,
      icon: <DollarSign size={12} className="text-blue-600" />,
      isProgress: false,
    },
    {
      label: "Carrier Charges Pending",
      value: carrierChargesPending != null ? `LKR ${carrierChargesPending.toLocaleString()}` : "—",
      trend: "-5.2%",
      trendUp: false,
      icon: <CreditCard size={12} className="text-amber-600" />,
      isProgress: false,
    },
    {
      label: "COD Collections Pending",
      value: codPendingRemittance != null ? `LKR ${codPendingRemittance.toLocaleString()}` : "—",
      trend: "+3.6%",
      trendUp: true,
      icon: <ShieldCheck size={12} className="text-emerald-600" />,
      isProgress: false,
    },
    {
      label: "Warehouse Capacity Used",
      value: warehouseCapacityUsed != null ? `${warehouseCapacityUsed}%` : "—",
      percentage: warehouseCapacityUsed ?? 0,
      color: "bg-purple-600",
      icon: <Warehouse size={12} className="text-purple-600" />,
      isProgress: true,
    },
    {
      label: "Carrier Capacity Used",
      value: carrierCapacityUsed != null ? `${carrierCapacityUsed}%` : "—",
      percentage: carrierCapacityUsed ?? 0,
      color: "bg-sky-600",
      icon: <Truck size={12} className="text-sky-600" />,
      isProgress: true,
    },
    {
      label: "Proof-of-Delivery Completeness",
      value: podCompleteness != null ? `${podCompleteness}%` : "—",
      percentage: podCompleteness ?? 0,
      color: "bg-emerald-600",
      icon: <CheckSquare size={12} className="text-emerald-600" />,
      isProgress: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-1.5 text-[9.5px]">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white p-1.5 sm:p-2 rounded-xl border border-line shadow-xs flex flex-col justify-between h-[58px]">
          <div className="flex items-center gap-1">
            <div className="p-0.5 rounded bg-canvas border border-line flex-shrink-0">
              {item.icon}
            </div>
            <div className="text-[9px] font-semibold text-muted truncate" title={item.label}>{item.label}</div>
          </div>

          <div className="flex items-end justify-between gap-1 my-0.5">
            <div className="text-sm font-bold text-ink truncate leading-none">{item.value}</div>
            {!item.isProgress && item.trend && (
              <span className={`text-[8.5px] font-bold px-1 py-0.2 rounded flex items-center gap-0.5 ${
                item.trendUp ? "text-emerald-700 bg-emerald-50 border border-emerald-200" : "text-blue-700 bg-blue-50 border border-blue-200"
              }`}>
                {item.trendUp ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                {item.trend}
              </span>
            )}
          </div>

          {item.isProgress && (
            <div className="w-full bg-canvas rounded-full h-1 border border-line overflow-hidden">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
