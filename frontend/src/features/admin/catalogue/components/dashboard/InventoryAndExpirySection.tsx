"use client";

import React from "react";
import { Clock, Search } from "lucide-react";

export function InventoryAndExpirySection() {
  return (
    <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
      <h3 className="text-[13px] font-bold text-ink mb-6">Inventory & Expiry Operations</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Available Stock", value: "184,620", suffix: "units", color: "text-ink" },
          { label: "Reserved Stock", value: "32,450", suffix: "units", color: "text-ink" },
          { label: "Quarantined Stock", value: "2,380", suffix: "units", color: "text-red-600" },
          { label: "Low-Stock Products", value: "318", suffix: "products", color: "text-amber-600" },
          { label: "Out of Stock Products", value: "126", suffix: "products", color: "text-red-600" },
          { label: "Near-Expiry Batches", value: "42", suffix: "batches", color: "text-amber-600" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="text-[11px] font-semibold text-muted leading-tight">{item.label}</div>
            <div className={`text-lg font-bold ${item.color}`}>
              {item.value} <span className="text-[11px] font-medium text-muted ml-0.5">{item.suffix}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[12px] font-bold text-ink">Expiry Exposure (Units)</h4>
          <span className="text-[11px] font-bold text-muted">Total Exposure: <span className="text-ink">183,640 units</span></span>
        </div>
        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
          <div className="h-full bg-red-500" style={{ width: '8.8%' }} title="0-30 Days: 16,200 (8.8%)" />
          <div className="h-full bg-amber-500" style={{ width: '17.8%' }} title="31-60 Days: 32,780 (17.8%)" />
          <div className="h-full bg-yellow-400" style={{ width: '13.8%' }} title="61-90 Days: 25,350 (13.8%)" />
          <div className="h-full bg-green-500" style={{ width: '59.6%' }} title="Over 90 Days: 109,310 (59.6%)" />
        </div>
        <div className="flex justify-between mt-2 text-[10px] font-medium text-muted">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-red-500" /> 0-30 Days (8.8%)</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-amber-500" /> 31-60 Days (17.8%)</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-yellow-400" /> 61-90 Days (13.8%)</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-green-500" /> Over 90 Days (59.6%)</div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[12px] font-bold text-ink">Priority Inventory Batches</h4>
          <div className="flex items-center gap-3">
            <button className="text-[11px] font-semibold text-[#8b2c45] hover:underline flex items-center gap-1">
              <Search size={14} /> Batch Details
            </button>
            <button className="text-[11px] font-semibold text-[#8b2c45] hover:underline flex items-center gap-1">
              <Clock size={14} /> Quick Expiry
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-line bg-canvas/50">
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Batch ID</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Product</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Warehouse</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase text-right">Available Qty</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase text-right">Expiry Date</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase text-right">Days Rem.</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Status</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Quality</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "BT-2024-0098", product: "Radiance Vitamin C Serum", warehouse: "Colombo Main Hub", qty: "2,450", expiry: "15 Jun 2027", days: 164, status: "Low Stock", sColor: "text-amber-600 bg-amber-50", quality: "Active", qColor: "text-green-600" },
                { id: "BT-2024-0112", product: "Luxe Skin Cream", warehouse: "Colombo Main Hub", qty: "1,250", expiry: "01 Mar 2025", days: 209, status: "Low Stock", sColor: "text-amber-600 bg-amber-50", quality: "Active", qColor: "text-green-600" },
                { id: "BT-2024-0115", product: "Nourishing Glow Oil", warehouse: "Galle Supplier Hub", qty: "450", expiry: "10 Apr 2024", days: 66, status: "Near Expiry", sColor: "text-red-600 bg-red-50", quality: "Quarantined", qColor: "text-red-600" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-line hover:bg-slate-50">
                  <td className="py-3 px-3 text-[11px] text-blue-600 font-medium cursor-pointer hover:underline">{row.id}</td>
                  <td className="py-3 px-3 text-[12px] font-medium text-ink">{row.product}</td>
                  <td className="py-3 px-3 text-[11px] text-muted">{row.warehouse}</td>
                  <td className="py-3 px-3 text-[11px] font-semibold text-ink text-right">{row.qty}</td>
                  <td className="py-3 px-3 text-[11px] text-muted text-right">{row.expiry}</td>
                  <td className={`py-3 px-3 text-[11px] font-bold text-right ${row.days < 90 ? 'text-red-600' : 'text-ink'}`}>{row.days}</td>
                  <td className="py-3 px-3">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${row.sColor}`}>{row.status}</span>
                  </td>
                  <td className="py-3 px-3 text-[11px] font-semibold">
                    <span className={row.qColor}>{row.quality}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
