"use client";

import React from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

export const Step6VariantsAttributes: React.FC = () => {
  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <h3 className="text-xs font-bold text-gray-900">Step 6 — Variants & Attribute Matrix</h3>
        <button
          onClick={() => toast.success("Added new variant entry row.")}
          className="h-8 px-3 rounded bg-white border border-gray-300 text-[11px] font-bold text-[#741d35] hover:bg-gray-50 flex items-center gap-1"
        >
          <Plus size={14} /> Add Variant
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-[9.5px]">
              <th className="py-2 px-3">Variant Name</th>
              <th className="py-2 px-3">Size</th>
              <th className="py-2 px-3">SKU</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3 text-right">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="py-2.5 px-3 font-bold text-gray-800">Standard 30 ml</td>
              <td className="py-2.5 px-3 text-gray-600">30 ml</td>
              <td className="py-2.5 px-3 font-mono text-gray-600">RAD-VITC-30ML</td>
              <td className="py-2.5 px-3 font-bold text-emerald-700">Active</td>
              <td className="py-2.5 px-3 text-right font-bold text-gray-800">2,450</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-2.5 px-3 font-bold text-gray-800">Large 50 ml</td>
              <td className="py-2.5 px-3 text-gray-600">50 ml</td>
              <td className="py-2.5 px-3 font-mono text-gray-600">RAD-VITC-50ML</td>
              <td className="py-2.5 px-3 font-bold text-emerald-700">Active</td>
              <td className="py-2.5 px-3 text-right font-bold text-gray-800">1,200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
