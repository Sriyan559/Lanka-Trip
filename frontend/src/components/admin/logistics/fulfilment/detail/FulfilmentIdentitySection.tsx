"use client";

import React from "react";
import { User, CheckCircle2 } from "lucide-react";

interface FulfilmentIdentitySectionProps {
  fulfilmentId?: string;
}

export function FulfilmentIdentitySection({ fulfilmentId = "FUL-2026-0008921" }: FulfilmentIdentitySectionProps) {
  const statusSnapshotBadges = [
    { label: "Inventory Validated", type: "success" },
    { label: "Fully Reserved", type: "success" },
    { label: "Fully Allocated", type: "success" },
    { label: "Picking Completed", type: "success" },
    { label: "Packing In Progress", type: "warning" },
    { label: "Quality Pending", type: "warning" },
    { label: "Not Ready for Dispatch", type: "danger" },
    { label: "No Active Hold", type: "success" },
    { label: "No Critical Exception", type: "success" },
    { label: "Shipment Not Created", type: "neutral" },
    { label: "SLA On Track", type: "success" },
  ];

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "success":
        return "text-emerald-800 bg-emerald-50 border-emerald-200 font-bold";
      case "warning":
        return "text-amber-800 bg-amber-50 border-amber-200 font-bold";
      case "danger":
        return "text-rose-800 bg-rose-50 border-rose-200 font-bold";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200 font-medium";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 text-[9.5px]">
      {/* 1. FULFILMENT IDENTITY */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs space-y-1.5 flex flex-col justify-between">
        <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider border-b border-line pb-1">
          Fulfilment Identity
        </h4>
        <div className="space-y-0.5 text-[9.5px] my-auto">
          <div className="flex justify-between"><span className="text-muted">Fulfilment Ref:</span><strong className="font-mono text-primary-900 font-bold">{fulfilmentId}</strong></div>
          <div className="flex justify-between"><span className="text-muted">Customer:</span><strong className="text-ink">Amaya Perera</strong></div>
          <div className="flex justify-between"><span className="text-muted">Customer ID:</span><span className="font-mono text-muted">CUST-1000231</span></div>
          <div className="flex justify-between"><span className="text-muted">Priority:</span><strong className="text-ink">Standard</strong></div>
          <div className="flex justify-between"><span className="text-muted">Service Level:</span><span className="text-muted">Same-Day</span></div>
          <div className="flex justify-between"><span className="text-muted">Order Date:</span><span className="text-muted">May 26 2025</span></div>
          <div className="flex justify-between"><span className="text-muted">Owner:</span><span className="text-ink font-semibold flex items-center gap-0.5"><User size={10} /> Nuwan W.</span></div>
        </div>
      </div>

      {/* 2. RELATED ORDER */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs space-y-1.5 flex flex-col justify-between">
        <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider border-b border-line pb-1">
          Related Order
        </h4>
        <div className="space-y-0.5 text-[9.5px] my-auto">
          <div className="flex justify-between"><span className="text-muted">Order:</span><strong className="font-mono text-blue-700">ORD-2026-500812</strong></div>
          <div className="flex justify-between"><span className="text-muted">Channel:</span><span className="text-muted">Marketplace Web</span></div>
          <div className="flex justify-between"><span className="text-muted">Order Type:</span><span className="text-muted">Beauty Marketplace</span></div>
          <div className="flex justify-between"><span className="text-muted">Payment:</span><strong className="text-emerald-700 bg-emerald-50 px-1 py-0.1 rounded border border-emerald-200 text-[8.5px]">Paid</strong></div>
          <div className="flex justify-between"><span className="text-muted">COD:</span><span className="text-muted">No</span></div>
          <div className="flex justify-between"><span className="text-muted">Delivery Address:</span><span className="text-ink font-semibold">Colombo 07</span></div>
        </div>
      </div>

      {/* 3. SUPPLIER / SELLER */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs space-y-1.5 flex flex-col justify-between">
        <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider border-b border-line pb-1">
          Supplier / Seller
        </h4>
        <div className="space-y-0.5 text-[9.5px] my-auto">
          <div className="flex justify-between"><span className="text-muted">Supplier:</span><strong className="text-ink truncate max-w-[90px]" title="Glow Labs Pvt Ltd">Glow Labs Pvt Ltd</strong></div>
          <div className="flex justify-between"><span className="text-muted">Seller Tier:</span><strong className="text-amber-700 bg-amber-50 px-1 py-0.1 rounded border border-amber-200 text-[8.5px]">Gold</strong></div>
          <div className="flex justify-between"><span className="text-muted">Contact:</span><span className="text-emerald-700 font-bold flex items-center gap-0.5"><CheckCircle2 size={10} /> Verified</span></div>
          <div className="flex justify-between"><span className="text-muted">Seller SLA:</span><strong className="text-ink">97%</strong></div>
          <div className="flex justify-between"><span className="text-muted">Risk:</span><span className="text-emerald-700 font-bold bg-emerald-50 px-1 py-0.1 rounded border border-emerald-200 text-[8.5px]">Low</span></div>
        </div>
      </div>

      {/* 4. WAREHOUSE ASSIGNMENT */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs space-y-1.5 flex flex-col justify-between">
        <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider border-b border-line pb-1">
          Warehouse Assignment
        </h4>
        <div className="space-y-0.5 text-[9.5px] my-auto">
          <div className="flex justify-between"><span className="text-muted">Fulfilment Centre:</span><strong className="text-ink truncate max-w-[85px]" title="FC Colombo Central">FC Colombo Central</strong></div>
          <div className="flex justify-between"><span className="text-muted">Zone:</span><span className="text-muted">Beauty-North</span></div>
          <div className="flex justify-between"><span className="text-muted">Pick Wave:</span><span className="font-mono text-muted">WAVE-0526-09</span></div>
          <div className="flex justify-between"><span className="text-muted">Packing Station:</span><span className="font-mono text-muted">PK-04</span></div>
          <div className="flex justify-between"><span className="text-muted">Capacity:</span><strong className="text-emerald-700 font-bold">Healthy</strong></div>
        </div>
      </div>

      {/* 5. SHIPMENT LINKAGE */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs space-y-1.5 flex flex-col justify-between">
        <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider border-b border-line pb-1">
          Shipment Linkage
        </h4>
        <div className="space-y-0.5 text-[9.5px] my-auto">
          <div className="flex justify-between"><span className="text-muted">Shipment:</span><span className="text-muted italic">Not Created</span></div>
          <div className="flex justify-between"><span className="text-muted">Carrier:</span><span className="text-muted italic">Pending</span></div>
          <div className="flex justify-between"><span className="text-muted">Service Level:</span><span className="text-muted">Standard</span></div>
          <div className="flex justify-between"><span className="text-muted">Label:</span><span className="text-muted">Not Printed</span></div>
          <div className="flex justify-between"><span className="text-muted">Tracking:</span><span className="text-muted">Not Assigned</span></div>
        </div>
      </div>

      {/* 6. STATUS SNAPSHOT */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs space-y-1.5 flex flex-col justify-between">
        <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider border-b border-line pb-1">
          Status Snapshot
        </h4>
        <div className="flex flex-wrap gap-1 text-[8.5px] my-auto">
          {statusSnapshotBadges.map((b, i) => (
            <span key={i} className={`px-1.5 py-0.2 rounded border ${getBadgeStyle(b.type)}`}>
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
