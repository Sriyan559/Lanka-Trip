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

function MiniSparkline({ strokeColor, hasData }: { strokeColor: string; hasData: boolean }) {
  const width = 60;
  const height = 18;

  const pathD = hasData
    ? `M 0 14 L 12 10 L 24 12 L 36 6 L 48 8 L 60 2`
    : `M 0 16 L 60 16`;

  return (
    <svg width={width} height={height} className="overflow-visible flex-shrink-0">
      <path d={pathD} fill="none" stroke={hasData ? strokeColor : "#e5e7eb"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LogisticsMetricsRow({ metrics }: LogisticsMetricsProps) {
  const m = metrics || {};

  const metricItems = [
    { label: "Total Active Shipments", value: (m.totalActiveShipments ?? 0).toLocaleString(), icon: <Truck size={16} className="text-ink" />, stroke: "#3b82f6", count: m.totalActiveShipments ?? 0 },
    { label: "Pending Carrier Assignment", value: (m.pendingCarrierAssignment ?? 0).toLocaleString(), icon: <Truck size={16} className="text-amber-600" />, stroke: "#f59e0b", count: m.pendingCarrierAssignment ?? 0 },
    { label: "Pickup Scheduled", value: (m.pickupScheduled ?? 0).toLocaleString(), icon: <Calendar size={16} className="text-primary-600" />, stroke: "#2563eb", count: m.pickupScheduled ?? 0 },
    { label: "Awaiting Pickup", value: (m.awaitingPickup ?? 0).toLocaleString(), icon: <Truck size={16} className="text-purple-600" />, stroke: "#9333ea", count: m.awaitingPickup ?? 0 },
    { label: "Picked Up Today", value: (m.pickedUpToday ?? 0).toLocaleString(), icon: <CheckCircle2 size={16} className="text-emerald-600" />, stroke: "#10b981", count: m.pickedUpToday ?? 0 },
    { label: "In Transit", value: (m.inTransit ?? 0).toLocaleString(), icon: <Truck size={16} className="text-blue-600" />, stroke: "#0284c7", count: m.inTransit ?? 0 },
    { label: "Out for Delivery", value: (m.outForDelivery ?? 0).toLocaleString(), icon: <Truck size={16} className="text-sky-500" />, stroke: "#06b6d4", count: m.outForDelivery ?? 0 },
    { label: "Delivered Today", value: (m.deliveredToday ?? 0).toLocaleString(), icon: <CheckCircle2 size={16} className="text-emerald-600" />, stroke: "#10b981", count: m.deliveredToday ?? 0 },
    { label: "Delivery Exceptions", value: (m.deliveryExceptions ?? 0).toLocaleString(), icon: <AlertTriangle size={16} className="text-rose-600" />, textClass: "text-rose-600", stroke: "#f43f5e", count: m.deliveryExceptions ?? 0 },
    { label: "Failed Deliveries", value: (m.failedDeliveries ?? 0).toLocaleString(), icon: <XCircle size={16} className="text-rose-600" />, textClass: "text-rose-600", stroke: "#ef4444", count: m.failedDeliveries ?? 0 },
    { label: "Return Shipments", value: (m.returnShipments ?? 0).toLocaleString(), icon: <RotateCcw size={16} className="text-purple-600" />, stroke: "#a855f7", count: m.returnShipments ?? 0 },
    { label: "SLA Breaches", value: (m.slaBreaches ?? 0).toLocaleString(), icon: <Clock size={16} className="text-rose-600" />, textClass: "text-rose-600", stroke: "#dc2626", count: m.slaBreaches ?? 0 },
    { label: "COD Pending Remittance", value: m.codPendingRemittance ? `LKR ${(m.codPendingRemittance / 1_000_000).toFixed(2)}M` : "LKR 0.00", icon: <HelpCircle size={16} className="text-amber-600" />, textClass: "text-amber-600", stroke: "#d97706", count: m.codPendingRemittance ?? 0 },
    { label: "Logistics Cost Today", value: m.logisticsCostToday ? `LKR ${m.logisticsCostToday.toLocaleString()}` : "LKR 0", icon: <DollarSign size={16} className="text-blue-600" />, stroke: "#2563eb", count: m.logisticsCostToday ?? 0 },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {metricItems.map((item, index) => (
        <div key={index} className="flex-1 min-w-[180px] bg-white p-3.5 rounded-xl border border-line shadow-sm hover-lift flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              {item.icon}
              <span className="text-[11px] font-medium text-muted leading-tight">{item.label}</span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-2 mt-1">
            <div className={`text-xl font-bold ${item.textClass || 'text-ink'}`}>
              {item.value}
            </div>
            <MiniSparkline strokeColor={item.stroke} hasData={item.count > 0} />
          </div>
        </div>
      ))}
    </div>
  );
}
