import React from "react";
import { LogisticsMetrics } from "@/types/logistics";
import { Truck, Clock, Calendar, Box, CheckCircle2, AlertTriangle, XCircle, RotateCcw, AlertCircle, HelpCircle, DollarSign } from "lucide-react";

interface LogisticsMetricsRowProps {
  metrics: LogisticsMetrics;
}

export function LogisticsMetricsRow({ metrics }: LogisticsMetricsRowProps) {
  
  const metricItems = [
    { label: "Total Active Shipments", value: metrics.totalActiveShipments.toLocaleString(), icon: <Truck size={18} className="text-ink" />, border: "border-line" },
    { label: "Pending Carrier Assignment", value: metrics.pendingCarrierAssignment, icon: <Truck size={18} className="text-warning" />, border: "border-warning" },
    { label: "Pickup Scheduled", value: metrics.pickupScheduled, icon: <Calendar size={18} className="text-primary-600" />, border: "border-primary-600" },
    { label: "Awaiting Pickup", value: metrics.awaitingPickup, icon: <Truck size={18} className="text-purple-600" />, border: "border-purple-600" },
    { label: "Picked Up Today", value: metrics.pickedUpToday, icon: <CheckCircle2 size={18} className="text-success" />, border: "border-success" },
    { label: "In Transit", value: metrics.inTransit, icon: <Truck size={18} className="text-blue-600" />, border: "border-blue-600" },
    { label: "Out for Delivery", value: metrics.outForDelivery, icon: <Truck size={18} className="text-blue-500" />, border: "border-blue-500" },
    { label: "Delivered Today", value: metrics.deliveredToday, icon: <CheckCircle2 size={18} className="text-success" />, border: "border-success" },
    { label: "Delivery Exceptions", value: metrics.deliveryExceptions, icon: <AlertTriangle size={18} className="text-danger" />, border: "border-danger", textClass: "text-danger" },
    { label: "Failed Deliveries", value: metrics.failedDeliveries, icon: <XCircle size={18} className="text-danger" />, border: "border-danger", textClass: "text-danger" },
    { label: "Return Shipments", value: metrics.returnShipments, icon: <RotateCcw size={18} className="text-purple-600" />, border: "border-purple-600" },
    { label: "SLA Breaches", value: metrics.slaBreaches, icon: <Clock size={18} className="text-danger" />, border: "border-danger", textClass: "text-danger" },
    { label: "COD Pending Remittance", value: `LKR ${(metrics.codPendingRemittance/1000000).toFixed(2)}M`, icon: <HelpCircle size={18} className="text-warning" />, border: "border-warning", textClass: "text-warning" },
    { label: "Logistics Cost Today", value: `LKR ${(metrics.logisticsCostToday).toLocaleString()}`, icon: <DollarSign size={18} className="text-blue-600" />, border: "border-blue-600" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {metricItems.map((item, index) => (
        <div key={index} className={`flex-1 min-w-[180px] bg-white p-3 rounded-xl border border-line shadow-sm hover-lift flex flex-col justify-between`}>
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
