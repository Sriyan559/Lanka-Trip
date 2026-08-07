"use client";

import React from "react";
import { Clock, Search, ChevronRight } from "lucide-react";

export function InventoryAndExpirySection() {
  return (
    <div className="bg-white rounded-xl border border-line p-5 shadow-sm flex flex-col">
      <h3 className="text-[14px] font-bold text-ink mb-6">Inventory & Expiry Operations</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Available Stock", value: "184,620", suffix: "units", color: "text-ink", border: "border-slate-100" },
          { label: "Reserved Stock", value: "32,450", suffix: "units", color: "text-ink", border: "border-slate-100" },
          { label: "Quarantined Stock", value: "2,380", suffix: "units", color: "text-[#dc2626]", border: "border-red-100 bg-red-50" },
          { label: "Low-Stock Products", value: "318", suffix: "products", color: "text-[#ea580c]", border: "border-orange-100 bg-orange-50" },
          { label: "Out of Stock Products", value: "126", suffix: "products", color: "text-[#dc2626]", border: "border-red-100 bg-red-50" },
          { label: "Near-Expiry Batches", value: "42", suffix: "batches", color: "text-[#ea580c]", border: "border-orange-100 bg-orange-50" },
        ].map((item, i) => (
          <div key={i} className={`flex flex-col gap-1.5 p-3 rounded-lg border ${item.border}`}>
            <div className="text-[11px] font-bold text-muted leading-tight">{item.label}</div>
            <div className={`text-[16px] font-bold tracking-tight ${item.color}`}>
              {item.value} <span className="text-[10px] font-semibold text-muted ml-0.5 tracking-normal">{item.suffix}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 bg-slate-50 border border-slate-100 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[13px] font-bold text-ink">Expiry Exposure (Units)</h4>
          <span className="text-[11px] font-bold text-muted">Total Exposure: <span className="text-ink">183,640 units</span></span>
        </div>
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
          <div className="h-full bg-[#dc2626]" style={{ width: '8.8%' }} title="0-30 Days: 16,200 (8.8%)" />
          <div className="h-full bg-[#ea580c]" style={{ width: '17.8%' }} title="31-60 Days: 32,780 (17.8%)" />
          <div className="h-full bg-[#f59e0b]" style={{ width: '13.8%' }} title="61-90 Days: 25,350 (13.8%)" />
          <div className="h-full bg-[#059669]" style={{ width: '59.6%' }} title="Over 90 Days: 109,310 (59.6%)" />
        </div>
        <div className="flex justify-between mt-4 text-[10px] font-bold text-muted">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#dc2626] shadow-sm" /> 0-30 Days (8.8%)</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#ea580c] shadow-sm" /> 31-60 Days (17.8%)</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-sm" /> 61-90 Days (13.8%)</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#059669] shadow-sm" /> Over 90 Days (59.6%)</div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[13px] font-bold text-ink">Priority Inventory Batches</h4>
          <div className="flex items-center gap-3">
            <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">
              <Search size={14} /> Batch Details
            </button>
            <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">
              <Clock size={14} /> Quick Expiry
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line bg-white">
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Batch ID</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Product</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Warehouse</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase text-right">Available Qty</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase text-right">Expiry Date</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase text-right">Days Rem.</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Status</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Quality</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "BT-2024-0098", product: "Radiance Vitamin C Serum", warehouse: "Colombo Main Hub", qty: "2,450", expiry: "15 Jun 2027", days: 164, status: "Low Stock", sColor: "text-[#ea580c] bg-orange-50 border border-orange-100", quality: "Active", qColor: "text-[#059669]" },
                { id: "BT-2024-0112", product: "Luxe Skin Cream", warehouse: "Colombo Main Hub", qty: "1,250", expiry: "01 Mar 2025", days: 209, status: "Low Stock", sColor: "text-[#ea580c] bg-orange-50 border border-orange-100", quality: "Active", qColor: "text-[#059669]" },
                { id: "BT-2024-0115", product: "Nourishing Glow Oil", warehouse: "Galle Supplier Hub", qty: "450", expiry: "10 Apr 2024", days: 66, status: "Near Expiry", sColor: "text-[#dc2626] bg-red-50 border border-red-100", quality: "Quarantined", qColor: "text-[#dc2626]" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-line hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 text-[11px] text-[#0284c7] font-bold cursor-pointer hover:underline">{row.id}</td>
                  <td className="py-3 px-3 text-[11px] font-bold text-ink">{row.product}</td>
                  <td className="py-3 px-3 text-[10px] font-semibold text-muted">{row.warehouse}</td>
                  <td className="py-3 px-3 text-[11px] font-bold text-ink text-right">{row.qty}</td>
                  <td className="py-3 px-3 text-[10px] font-semibold text-muted text-right">{row.expiry}</td>
                  <td className={`py-3 px-3 text-[11px] font-bold text-right ${row.days < 90 ? 'text-[#dc2626]' : 'text-ink'}`}>{row.days}</td>
                  <td className="py-3 px-3">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${row.sColor}`}>{row.status}</span>
                  </td>
                  <td className="py-3 px-3 text-[10px] font-bold">
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
