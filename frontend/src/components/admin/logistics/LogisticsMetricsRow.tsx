"use client";

import React from "react";
import { Package, Boxes, Layers, CheckSquare, Send, Truck, CheckCircle2, AlertTriangle, RotateCcw, ShieldAlert } from "lucide-react";

export interface LogisticsMetricsProps { metrics?: Record<string, number | null | undefined>; }

export function LogisticsMetricsRow({ metrics = {} }: LogisticsMetricsProps) {
  const items = [
    ["Total Fulfilment Orders", metrics.total_orders, Package],
    ["Awaiting Inventory Allocation", metrics.awaiting_allocation, Boxes],
    ["Picking in Progress", metrics.picking_in_progress, Layers],
    ["Packing in Progress", metrics.packing_in_progress, CheckSquare],
    ["Ready for Dispatch", metrics.ready_for_dispatch, Send],
    ["Awaiting Carrier Pickup", metrics.awaiting_carrier_pickup, Truck],
    ["Shipments in Transit", metrics.shipments_in_transit, Truck],
    ["Out for Delivery", metrics.out_for_delivery, Truck],
    ["Delivered This Period", metrics.delivered_this_period, CheckCircle2],
    ["Delayed or Failed Deliveries", metrics.delayed_or_failed, AlertTriangle],
    ["Returns Awaiting Collection", metrics.returns_awaiting, RotateCcw],
    ["Logistics SLA Breaches", metrics.sla_breaches, ShieldAlert],
  ] as const;

  return <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-1.5 text-[10px]">
    {items.map(([title, value, Icon]) => <div key={title} className="bg-white p-2 rounded-xl border border-line shadow-xs h-[60px] flex flex-col justify-between">
      <div className="flex items-center gap-1"><Icon size={12} className="text-blue-600"/><span className="text-[9px] font-semibold text-muted leading-tight truncate" title={title}>{title}</span></div>
      <div className="text-sm font-bold text-ink">{Number(value ?? 0).toLocaleString()}</div>
    </div>)}
  </div>;
}
