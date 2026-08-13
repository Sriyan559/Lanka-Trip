"use client";
import React from "react";
export interface ShipmentKpiGridProps { metrics?: Record<string,any> | null }
export function ShipmentKpiGrid({metrics={}}:ShipmentKpiGridProps){
 const m=metrics??{};
 const status=Object.fromEntries((m.by_status??[]).map((x:any)=>[x.status,Number(x.count)]));
 const cards=[['Total Shipments',m.total_shipments],['Creation Pending',status.pending],['Awaiting Carrier',m.quick_queue?.unassigned_carrier],['Awaiting Pickup',status.booked],['Collected / Picked Up',status.picked_up],['In Transit',status.in_transit],['At Delivery Hub',status.at_hub],['Out for Delivery',status.out_for_delivery],['Delivered',status.delivered],['Delayed',m.delayed_count],['Failed Delivery',m.failed_count],['Return to Origin',status.returned],['SLA Breaches',m.delayed_count],['First-Attempt Rate',null],['On-Time Rate',null],['POD Completeness',null]];
 return <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 xl:grid-cols-16 gap-1.5 text-[9.5px]">{cards.map(([title,value])=><div key={String(title)} className="bg-white p-1.5 rounded-xl border border-line shadow-xs h-[56px] flex flex-col justify-between"><span className="text-[8.5px] font-semibold text-muted truncate">{title}</span><strong className="text-sm">{value==null?'—':Number(value).toLocaleString()}</strong></div>)}</div>;
}
