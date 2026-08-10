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
      value: logisticsCostToday ? `LKR ${(logisticsCostToday / 1_000_000).toFixed(1)}M` : "LKR 18.6M",
      trend: "+8.4%",
      trendUp: true,
      icon: <DollarSign size={16} className="text-blue-600" />,
      isProgress: false,
    },
    {
      label: "Carrier Charges Pending",
      value: carrierChargesPending ? `LKR ${(carrierChargesPending / 1_000_000).toFixed(1)}M` : "LKR 2.1M",
      trend: "-5.2%",
      trendUp: false,
      icon: <CreditCard size={16} className="text-amber-600" />,
      isProgress: false,
    },
    {
      label: "COD Collections Pending",
      value: codPendingRemittance ? `LKR ${(codPendingRemittance / 1_000_000).toFixed(1)}M` : "LKR 1.8M",
      trend: "+3.6%",
      trendUp: true,
      icon: <ShieldCheck size={16} className="text-emerald-600" />,
      isProgress: false,
    },
    {
      label: "Warehouse Capacity Used",
      value: warehouseCapacityUsed !== undefined && warehouseCapacityUsed > 0 ? `${warehouseCapacityUsed}%` : "82%",
      percentage: warehouseCapacityUsed !== undefined && warehouseCapacityUsed > 0 ? warehouseCapacityUsed : 82,
      color: "bg-purple-600",
      icon: <Warehouse size={16} className="text-purple-600" />,
      isProgress: true,
    },
    {
      label: "Carrier Capacity Used",
      value: carrierCapacityUsed !== undefined && carrierCapacityUsed > 0 ? `${carrierCapacityUsed}%` : "76%",
      percentage: carrierCapacityUsed !== undefined && carrierCapacityUsed > 0 ? carrierCapacityUsed : 76,
      color: "bg-sky-600",
      icon: <Truck size={16} className="text-sky-600" />,
      isProgress: true,
    },
    {
      label: "Proof-of-Delivery Completeness",
      value: podCompleteness !== undefined && podCompleteness > 0 ? `${podCompleteness}%` : "93%",
      percentage: podCompleteness !== undefined && podCompleteness > 0 ? podCompleteness : 93,
      color: "bg-emerald-600",
      icon: <CheckSquare size={16} className="text-emerald-600" />,
      isProgress: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white p-3.5 rounded-xl border border-line shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-canvas border border-line flex-shrink-0">
                {item.icon}
              </div>
              <div className="text-[10px] font-semibold text-muted truncate">{item.label}</div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-2 pt-1">
            <div className="text-base font-bold text-ink truncate">{item.value}</div>
            {!item.isProgress && item.trend && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                item.trendUp ? "text-emerald-700 bg-emerald-50 border border-emerald-200" : "text-blue-700 bg-blue-50 border border-blue-200"
              }`}>
                {item.trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {item.trend}
              </span>
            )}
          </div>

          {item.isProgress && (
            <div className="w-full bg-canvas rounded-full h-1.5 border border-line overflow-hidden">
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
