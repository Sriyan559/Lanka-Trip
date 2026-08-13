"use client";

import React, { useState } from "react";
import { Package } from "lucide-react";

export interface OperationPreviewProps { operation?: Record<string, any> | null; }
const tabs = ["Overview", "Fulfilment", "Inventory Allocation", "Picking", "Packing", "Dispatch", "Shipment", "Tracking", "Carrier", "Delivery", "Proof of Delivery", "Returns", "Claims", "Costs", "Reconciliation", "Exceptions", "Linked Records", "Communications", "Activity", "Audit History"];
const lifecycle = ["Shipment Created", "Carrier Booked", "In Transit", "Out for Delivery", "Delivered", "Returned", "Closed"];

export function LogisticsOperationPreviewSection({ operation }: OperationPreviewProps) {
  const [activeTab, setActiveTab] = useState("Overview");
  const status = operation?.status ?? null;
  const currentIndex = status ? ({ pending:0, booked:1, in_transit:2, delayed:2, out_for_delivery:3, delivered:4, failed:3, returned:5, cancelled:6 } as Record<string, number>)[status] ?? 0 : -1;
  const cards = [
    ["Order Ref", operation?.order_number], ["Shipment Ref", operation?.shipment_number],
    ["Tracking", operation?.tracking_number], ["Carrier", operation?.carrier_name],
    ["Status", status], ["Estimated Ship", operation?.estimated_ship_date],
    ["Estimated Delivery", operation?.estimated_delivery_date], ["Shipped At", operation?.shipped_at],
    ["Delivered At", operation?.delivered_at], ["Last Updated", operation?.updated_at],
  ];
  return <section className="bg-white rounded-xl border border-line shadow-xs overflow-hidden text-[10px]">
    <header className="p-3 border-b border-line bg-canvas flex justify-between"><div className="flex gap-2"><Package size={14}/><div><h3 className="text-[11px] font-bold uppercase">Selected Logistics Operation Preview</h3><p className="text-muted">Database record and lifecycle state</p></div></div><strong className="font-mono">{operation?.shipment_number ?? "No operation selected"}</strong></header>
    <div className="border-b border-line overflow-x-auto"><div className="flex gap-1 p-2 whitespace-nowrap">{tabs.map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`px-2 py-1 rounded ${activeTab === tab ? "bg-primary-900 text-white" : "text-muted"}`}>{tab}</button>)}</div></div>
    <div className="p-3 space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-1.5">{cards.map(([label,value]) => <div key={label} className="p-2 bg-canvas border border-line rounded"><span className="text-muted uppercase text-[8px] block">{label}</span><strong className="block truncate">{value == null || value === "" ? "—" : String(value)}</strong></div>)}</div>
      {!operation && <p className="text-center text-muted py-3">Select a logistics operation to load its details. Lifecycle stages remain visible below.</p>}
      <div><h4 className="font-bold uppercase mb-3">Current Fulfilment / Logistics Lifecycle</h4><div className="flex overflow-x-auto pb-2">{lifecycle.map((stage,i) => <div key={stage} className="min-w-[120px] flex-1 text-center relative"><div className={`mx-auto w-6 h-6 rounded-full border-2 flex items-center justify-center ${i < currentIndex ? "bg-emerald-600 border-emerald-600 text-white" : i === currentIndex ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-muted"}`}>{i+1}</div><div className="mt-1 font-semibold">{stage}</div><div className="text-muted">{i === 0 && operation?.created_at ? String(operation.created_at) : "—"}</div></div>)}</div></div>
    </div>
  </section>;
}
