import React from "react";
import { Truck, Clock, Calendar, CheckCircle2, AlertTriangle, XCircle, RotateCcw, HelpCircle, DollarSign } from "lucide-react";

export interface LogisticsMetricsProps {
  metrics?: {
    totalActiveShipments?: number;
    pendingCarrierAssignment?: number;
    pickupScheduled?: number;
    awaitingPickup?: number;
    pickedUpToday?: number;
    inTransit?: number;
    outForDelivery?: number;
    deliveredToday?: number;
    deliveryExceptions?: number;
    failedDeliveries?: number;
    returnShipments?: number;
    slaBreaches?: number;
    codPendingRemittance?: number;
    logisticsCostToday?: number;
  };
}

export function LogisticsMetricsRow({ metrics }: LogisticsMetricsProps) {
  const m = metrics || {};

  const metricItems = [
    { label: "Total Active Shipments", value: (m.totalActiveShipments ?? 0).toLocaleString(), icon: <Truck size={18} className="text-ink" /> },
    { label: "Pending Carrier Assignment", value: m.pendingCarrierAssignment ?? 0, icon: <Truck size={18} className="text-amber-600" /> },
    { label: "Pickup Scheduled", value: m.pickupScheduled ?? 0, icon: <Calendar size={18} className="text-primary-600" /> },
    { label: "Awaiting Pickup", value: m.awaitingPickup ?? 0, icon: <Truck size={18} className="text-purple-600" /> },
    { label: "Picked Up Today", value: m.pickedUpToday ?? 0, icon: <CheckCircle2 size={18} className="text-emerald-600" /> },
    { label: "In Transit", value: m.inTransit ?? 0, icon: <Truck size={18} className="text-blue-600" /> },
    { label: "Out for Delivery", value: m.outForDelivery ?? 0, icon: <Truck size={18} className="text-sky-500" /> },
    { label: "Delivered Today", value: m.deliveredToday ?? 0, icon: <CheckCircle2 size={18} className="text-emerald-600" /> },
    { label: "Delivery Exceptions", value: m.deliveryExceptions ?? 0, icon: <AlertTriangle size={18} className="text-rose-600" />, textClass: "text-rose-600" },
    { label: "Failed Deliveries", value: m.failedDeliveries ?? 0, icon: <XCircle size={18} className="text-rose-600" />, textClass: "text-rose-600" },
    { label: "Return Shipments", value: m.returnShipments ?? 0, icon: <RotateCcw size={18} className="text-purple-600" /> },
    { label: "SLA Breaches", value: m.slaBreaches ?? 0, icon: <Clock size={18} className="text-rose-600" />, textClass: "text-rose-600" },
    { label: "COD Pending Remittance", value: m.codPendingRemittance ? `LKR ${(m.codPendingRemittance / 1_000_000).toFixed(2)}M` : "LKR 0.00", icon: <HelpCircle size={18} className="text-amber-600" />, textClass: "text-amber-600" },
    { label: "Logistics Cost Today", value: m.logisticsCostToday ? `LKR ${m.logisticsCostToday.toLocaleString()}` : "LKR 0", icon: <DollarSign size={18} className="text-blue-600" /> },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {metricItems.map((item, index) => (
        <div key={index} className="flex-1 min-w-[180px] bg-white p-3 rounded-xl border border-line shadow-sm hover-lift flex flex-col justify-between">
          <div className="flex items-start gap-2 mb-2">
            {item.icon}
            <span className="text-[11px] font-medium text-muted leading-tight">{item.label}</span>
          </div>
          <div className={`text-xl font-bold ${item.textClass || 'text-ink'}`}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
