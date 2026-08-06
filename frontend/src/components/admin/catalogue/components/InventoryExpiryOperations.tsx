"use client";

import React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import {
  INVENTORY_BATCHES,
  EXPIRY_EXPOSURE_RANGES,
  CHANNEL_READINESS_ITEMS,
} from "@/data/catalogue.mock";

export const InventoryExpiryOperations: React.FC = () => {
  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-xs flex flex-col gap-6">
      {/* Title */}
      <div>
        <h2 className="text-sm font-bold text-gray-900">Inventory & Expiry Operations</h2>
        <p className="text-[11.5px] text-gray-500">
          Monitor stock availability, batch expiry timelines, channel publishing readiness and quarantine actions.
        </p>
      </div>

      {/* Summary Metrics + Expiry Exposure Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Metrics Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <span className="text-[11px] font-medium text-gray-500 block mb-0.5">Available Stock</span>
            <span className="text-base font-extrabold text-gray-900">184,620 <span className="text-xs text-gray-500 font-normal">units</span></span>
          </div>
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <span className="text-[11px] font-medium text-gray-500 block mb-0.5">Reserved Stock</span>
            <span className="text-base font-extrabold text-gray-900">32,450 <span className="text-xs text-gray-500 font-normal">units</span></span>
          </div>
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <span className="text-[11px] font-medium text-gray-500 block mb-0.5">Quarantined Stock</span>
            <span className="text-base font-extrabold text-rose-600">2,380 <span className="text-xs text-gray-500 font-normal">units</span></span>
          </div>
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <span className="text-[11px] font-medium text-gray-500 block mb-0.5">Low-Stock Products</span>
            <span className="text-base font-extrabold text-amber-600">318 <span className="text-xs text-gray-500 font-normal">products</span></span>
          </div>
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <span className="text-[11px] font-medium text-gray-500 block mb-0.5">Out-of-Stock</span>
            <span className="text-base font-extrabold text-rose-600">126 <span className="text-xs text-gray-500 font-normal">products</span></span>
          </div>
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <span className="text-[11px] font-medium text-gray-500 block mb-0.5">Near-Expiry Batches</span>
            <span className="text-base font-extrabold text-amber-600">42 <span className="text-xs text-gray-500 font-normal">batches</span></span>
          </div>
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <span className="text-[11px] font-medium text-gray-500 block mb-0.5">Expired Batches</span>
            <span className="text-base font-extrabold text-rose-600">9 <span className="text-xs text-gray-500 font-normal">batches</span></span>
          </div>
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <span className="text-[11px] font-medium text-gray-500 block mb-0.5">Recalled Batches</span>
            <span className="text-base font-extrabold text-rose-700">5 <span className="text-xs text-gray-500 font-normal">batches</span></span>
          </div>
        </div>

        {/* Expiry Exposure Bar Panel */}
        <div className="p-3.5 rounded bg-gray-50 border border-gray-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2 text-[11.5px]">
            <span className="font-bold text-gray-800">Expiry Exposure (Units)</span>
            <span className="text-gray-500">Total: <strong className="text-gray-900">183,640 units</strong></span>
          </div>

          {/* Stacked Progress Bar */}
          <div className="w-full h-3 rounded-full overflow-hidden flex mb-3">
            {EXPIRY_EXPOSURE_RANGES.map((item) => (
              <div
                key={item.range}
                className="h-full"
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                title={`${item.range}: ${item.qty.toLocaleString()} units (${item.percentage}%)`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10.5px]">
            {EXPIRY_EXPOSURE_RANGES.map((item) => (
              <div key={item.range} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-gray-600 font-medium truncate">{item.range}:</span>
                <span className="font-bold text-gray-900">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2 Tables Grid: Priority Inventory Batches & Channel Publication Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Priority Inventory Batches */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Priority Inventory Batches
            </h3>
            <button className="text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
              <span>View all inventory & expiry operations</span>
              <ChevronRight size={12} />
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase text-[9.5px]">
                  <th className="py-2 px-2.5">Batch</th>
                  <th className="py-2 px-2.5">Batch ID</th>
                  <th className="py-2 px-2.5">Product</th>
                  <th className="py-2 px-2.5">Warehouse</th>
                  <th className="py-2 px-2.5">Available Qty</th>
                  <th className="py-2 px-2.5">Expiry Date</th>
                  <th className="py-2 px-2.5">Days Rem.</th>
                  <th className="py-2 px-2.5">Status</th>
                  <th className="py-2 px-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {INVENTORY_BATCHES.map((batch) => (
                  <tr key={batch.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-2.5 px-2.5 font-bold text-gray-900 whitespace-nowrap">{batch.batchName}</td>
                    <td className="py-2.5 px-2.5 font-mono text-blue-600 font-semibold text-[10.5px] whitespace-nowrap">{batch.batchId}</td>
                    <td className="py-2.5 px-2.5 font-medium text-gray-800 max-w-[130px] truncate">{batch.productName}</td>
                    <td className="py-2.5 px-2.5 text-gray-600 text-[10.5px] whitespace-nowrap">{batch.warehouse}</td>
                    <td className="py-2.5 px-2.5 font-bold text-gray-900 whitespace-nowrap">{batch.availableQty.toLocaleString()} units</td>
                    <td className="py-2.5 px-2.5 text-gray-500 text-[10.5px] whitespace-nowrap">{batch.expiryDate}</td>
                    <td className="py-2.5 px-2.5 font-bold text-rose-600 whitespace-nowrap">{batch.daysRemaining}</td>
                    <td className="py-2.5 px-2.5 whitespace-nowrap">
                      <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold text-[9.5px]">
                        {batch.stockStatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-2.5 text-right whitespace-nowrap">
                      <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700">
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Channel Publication Readiness */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Channel Publication Readiness
          </h3>

          <div className="overflow-x-auto border border-gray-200 rounded">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase text-[9.5px]">
                  <th className="py-2 px-2.5">Channel</th>
                  <th className="py-2 px-2.5">Readiness</th>
                  <th className="py-2 px-2.5">Eligible</th>
                  <th className="py-2 px-2.5">Blocked</th>
                  <th className="py-2 px-2.5">Media Issues</th>
                  <th className="py-2 px-2.5">Pricing Issues</th>
                  <th className="py-2 px-2.5">Policy Issues</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {CHANNEL_READINESS_ITEMS.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-2.5 px-2.5 font-semibold text-gray-900 whitespace-nowrap">{item.channel}</td>
                    <td className="py-2.5 px-2.5 min-w-[110px]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-[10.5px]">{item.readinessPercent}%</span>
                        <div className="w-12 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${item.readinessPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-2.5 font-bold text-emerald-600 whitespace-nowrap">{item.eligibleCount.toLocaleString()}</td>
                    <td className="py-2.5 px-2.5 font-bold text-rose-600 whitespace-nowrap">{item.blockedCount}</td>
                    <td className="py-2.5 px-2.5 text-gray-600 whitespace-nowrap">{item.mediaIssuesCount}</td>
                    <td className="py-2.5 px-2.5 text-gray-600 whitespace-nowrap">{item.pricingIssuesCount}</td>
                    <td className="py-2.5 px-2.5 text-gray-600 whitespace-nowrap">{item.policyIssuesCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
