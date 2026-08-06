"use client";

import React from "react";

export const Step9InventoryPublication: React.FC = () => {
  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs space-y-4">
      <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2">
        Step 9 — Inventory Linkage & Channel Publication
      </h3>

      <div className="space-y-3 text-xs">
        <div className="p-3 bg-gray-50 rounded border border-gray-200 flex items-center justify-between">
          <div>
            <div className="font-bold text-gray-900">Colombo Central Fulfillment Center</div>
            <div className="text-[11px] text-gray-500">Linked to 4 active inventory batches</div>
          </div>
          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10.5px]">
            Linked
          </span>
        </div>

        <div className="p-3 bg-rose-50/60 rounded border border-rose-200 flex items-center justify-between">
          <div>
            <div className="font-bold text-gray-900">Mobile App Storefront Publication</div>
            <div className="text-[11px] text-rose-700 font-semibold">Publication blocked due to pending safety certificate</div>
          </div>
          <span className="font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded text-[10.5px]">
            Blocked
          </span>
        </div>
      </div>
    </div>
  );
};
