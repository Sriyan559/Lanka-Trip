import React from "react";
import { DollarSign, CreditCard, ShieldCheck, Warehouse, Truck, CheckSquare } from "lucide-react";

export interface SecondaryMetricsProps {
  logisticsCostToday?: number;
  carrierChargesPending?: number;
  codPendingRemittance?: number;
  warehouseCapacityUsed?: number;
  carrierCapacityUsed?: number;
  podCompleteness?: number;
}

export function LogisticsSecondaryMetricsStrip({
  logisticsCostToday = 0,
  carrierChargesPending = 0,
  codPendingRemittance = 0,
  warehouseCapacityUsed = 0,
  carrierCapacityUsed = 0,
  podCompleteness = 0,
}: SecondaryMetricsProps) {
  const items = [
    {
      label: "Logistics Cost This Period",
      value: `LKR ${logisticsCostToday.toLocaleString()}`,
      icon: <DollarSign size={16} className="text-blue-600" />,
    },
    {
      label: "Carrier Charges Pending",
      value: `LKR ${carrierChargesPending.toLocaleString()}`,
      icon: <CreditCard size={16} className="text-amber-600" />,
    },
    {
      label: "COD Collections Pending",
      value: `LKR ${codPendingRemittance.toLocaleString()}`,
      icon: <ShieldCheck size={16} className="text-emerald-600" />,
    },
    {
      label: "Warehouse Capacity Used",
      value: `${warehouseCapacityUsed}%`,
      icon: <Warehouse size={16} className="text-purple-600" />,
    },
    {
      label: "Carrier Capacity Used",
      value: `${carrierCapacityUsed}%`,
      icon: <Truck size={16} className="text-sky-600" />,
    },
    {
      label: "Proof-of-Delivery Completeness",
      value: `${podCompleteness}%`,
      icon: <CheckSquare size={16} className="text-emerald-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white p-3 rounded-xl border border-line shadow-sm flex items-center gap-3">
          <div className="p-2 rounded-lg bg-canvas border border-line flex-shrink-0">
            {item.icon}
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-medium text-muted truncate">{item.label}</div>
            <div className="text-sm font-bold text-ink truncate mt-0.5">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
