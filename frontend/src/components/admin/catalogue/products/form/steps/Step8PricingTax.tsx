"use client";

import React from "react";
import { ProductMasterFormState } from "@/types/productForm";

interface Step8PricingTaxProps {
  formState: ProductMasterFormState;
  onChange: (field: keyof ProductMasterFormState, value: any) => void;
}

export const Step8PricingTax: React.FC<Step8PricingTaxProps> = ({ formState, onChange }) => {
  const margin = formState.mrp > 0 ? (((formState.mrp - formState.costPrice) / formState.mrp) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs space-y-4">
      <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2">
        Step 8 — Pricing, Margins & Tax Configuration
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">MRP Selling Price (LKR) *</label>
          <input
            type="number"
            value={formState.mrp}
            onChange={(e) => onChange("mrp", parseFloat(e.target.value) || 0)}
            className="w-full h-9 px-3 rounded border border-gray-300 font-mono text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Cost Price (LKR) *</label>
          <input
            type="number"
            value={formState.costPrice}
            onChange={(e) => onChange("costPrice", parseFloat(e.target.value) || 0)}
            className="w-full h-9 px-3 rounded border border-gray-300 font-mono text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Gross Margin (%)</label>
          <div className="h-9 px-3 rounded border border-gray-200 bg-gray-50 flex items-center font-bold text-emerald-700 text-xs">
            {margin}%
          </div>
        </div>
      </div>
    </div>
  );
};
