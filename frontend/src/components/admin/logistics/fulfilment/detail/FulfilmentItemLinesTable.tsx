"use client";

import React from "react";
import { MoreVertical } from "lucide-react";

export function FulfilmentItemLinesTable() {
  const items = [
    { id: 1, product: "Glow Serum 30ml", sku: "GLW-30ML", variant: "Default", supplier: "Glow Labs", ordered: 6, reserved: 6, allocated: 6, picked: 6, packed: 6, short: 0, sub: "No", backorder: "No", wh: "FC Colombo Central", loc: "A-01-01", batch: "BATCH-2505", expiry: "May 2026", qc: "Passed", handling: "None", status: "Packed" },
    { id: 2, product: "Vitamin C Cleanser", sku: "VCC-150ML", variant: "Default", supplier: "Glow Labs", ordered: 6, reserved: 6, allocated: 6, picked: 6, packed: 4, short: 0, sub: "No", backorder: "No", wh: "FC Colombo Central", loc: "A-01-02", batch: "BATCH-2505", expiry: "Jun 2026", qc: "Passed", handling: "None", status: "Packing" },
    { id: 3, product: "Hydra Moisturizer", sku: "HYD-50ML", variant: "Default", supplier: "Glow Labs", ordered: 6, reserved: 6, allocated: 6, picked: 6, packed: 6, short: 0, sub: "No", backorder: "No", wh: "FC Colombo Central", loc: "A-02-01", batch: "BATCH-2505", expiry: "May 2026", qc: "Passed", handling: "None", status: "Packed" },
    { id: 4, product: "Lip Balm SPF 15", sku: "LB-SPF15", variant: "Default", supplier: "Glow Labs", ordered: 3, reserved: 3, allocated: 3, picked: 3, packed: 1, short: 0, sub: "No", backorder: "No", wh: "FC Colombo Central", loc: "A-03-01", batch: "BATCH-3005", expiry: "Jul 2026", qc: "Passed", handling: "Fragile", status: "Packing" },
    { id: 5, product: "Face Mist 100ml", sku: "FM-100ML", variant: "Default", supplier: "Glow Labs", ordered: 3, reserved: 3, allocated: 3, picked: 3, packed: 1, short: 0, sub: "No", backorder: "No", wh: "FC Colombo Central", loc: "A-04-01", batch: "BATCH-3005", expiry: "Jun 2026", qc: "Passed", handling: "None", status: "Packing" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden flex flex-col text-xs">
      <div className="p-3 border-b border-line bg-canvas flex items-center justify-between">
        <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">
          Fulfilment Item Lines (5)
        </h4>
        <span className="text-[10px] text-muted">Total Quantity: 24</span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-[11px] whitespace-nowrap divide-y divide-line">
          <thead className="bg-canvas text-muted font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-2.5 py-2 w-6 text-center">#</th>
              <th className="px-3 py-2">Product</th>
              <th className="px-2.5 py-2 font-mono">SKU</th>
              <th className="px-2 py-2">Variant</th>
              <th className="px-2.5 py-2">Supplier</th>
              <th className="px-2 py-2 text-center">Ordered Qty</th>
              <th className="px-2 py-2 text-center">Reserved Qty</th>
              <th className="px-2 py-2 text-center">Allocated Qty</th>
              <th className="px-2 py-2 text-center">Picked Qty</th>
              <th className="px-2 py-2 text-center">Packed Qty</th>
              <th className="px-2 py-2 text-center">Short Qty</th>
              <th className="px-2 py-2 text-center">Substitution</th>
              <th className="px-2 py-2 text-center">Backorder</th>
              <th className="px-2.5 py-2">Source Warehouse</th>
              <th className="px-2.5 py-2">Source Location</th>
              <th className="px-2.5 py-2 font-mono">Batch / Lot</th>
              <th className="px-2 py-2">Expiry</th>
              <th className="px-2.5 py-2">Quality Status</th>
              <th className="px-2.5 py-2">Handling</th>
              <th className="px-2.5 py-2">Line Status</th>
              <th className="px-2 py-2 text-center w-8">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-white font-medium">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-canvas transition-colors">
                <td className="px-2.5 py-2 text-center text-muted font-bold">{item.id}</td>
                <td className="px-3 py-2 font-bold text-ink">{item.product}</td>
                <td className="px-2.5 py-2 font-mono text-muted">{item.sku}</td>
                <td className="px-2 py-2 text-muted">{item.variant}</td>
                <td className="px-2.5 py-2 text-muted">{item.supplier}</td>
                <td className="px-2 py-2 text-center font-bold">{item.ordered}</td>
                <td className="px-2 py-2 text-center font-bold text-emerald-700">{item.reserved}</td>
                <td className="px-2 py-2 text-center font-bold text-emerald-700">{item.allocated}</td>
                <td className="px-2 py-2 text-center font-bold text-purple-700">{item.picked}</td>
                <td className="px-2 py-2 text-center font-bold text-blue-700">{item.packed}</td>
                <td className="px-2 py-2 text-center font-bold text-gray-400">{item.short}</td>
                <td className="px-2 py-2 text-center text-muted">{item.sub}</td>
                <td className="px-2 py-2 text-center text-muted">{item.backorder}</td>
                <td className="px-2.5 py-2 text-muted">{item.wh}</td>
                <td className="px-2.5 py-2 font-mono text-muted">{item.loc}</td>
                <td className="px-2.5 py-2 font-mono text-muted">{item.batch}</td>
                <td className="px-2 py-2 text-muted">{item.expiry}</td>
                <td className="px-2.5 py-2">
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                    {item.qc}
                  </span>
                </td>
                <td className="px-2.5 py-2 text-muted">{item.handling}</td>
                <td className="px-2.5 py-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.status === 'Packed'
                      ? 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                      : 'text-blue-800 bg-blue-50 border border-blue-200'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-2 py-2 text-center">
                  <button className="p-1 hover:bg-canvas rounded text-muted hover:text-ink">
                    <MoreVertical size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
