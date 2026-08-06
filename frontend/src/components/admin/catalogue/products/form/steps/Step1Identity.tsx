"use client";

import React from "react";
import { ProductMasterFormState } from "@/types/productForm";

interface Step1IdentityProps {
  formState: ProductMasterFormState;
  onChange: (field: keyof ProductMasterFormState, value: any) => void;
}

export const Step1Identity: React.FC<Step1IdentityProps> = ({ formState, onChange }) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs space-y-4">
      <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2">
        Step 1 — Product Identity
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Product Title *</label>
          <input
            type="text"
            value={formState.productName}
            onChange={(e) => onChange("productName", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Public Product Reference *</label>
          <input
            type="text"
            value={formState.publicId}
            onChange={(e) => onChange("publicId", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 font-mono text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">SKU *</label>
          <input
            type="text"
            value={formState.sku}
            onChange={(e) => onChange("sku", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 font-mono text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Barcode (GTIN)</label>
          <input
            type="text"
            value={formState.barcode}
            onChange={(e) => onChange("barcode", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 font-mono text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Manufacturer</label>
          <input
            type="text"
            value={formState.manufacturer}
            onChange={(e) => onChange("manufacturer", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Country of Origin</label>
          <input
            type="text"
            value={formState.countryOfOrigin}
            onChange={(e) => onChange("countryOfOrigin", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>
      </div>
    </div>
  );
};
