"use client";

import React from "react";
import { ProductMasterFormState } from "@/types/productForm";

interface Step3BrandSupplierProps {
  formState: ProductMasterFormState;
  onChange: (field: keyof ProductMasterFormState, value: any) => void;
}

export const Step3BrandSupplier: React.FC<Step3BrandSupplierProps> = ({ formState, onChange }) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs space-y-4">
      <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2">
        Step 3 — Brand & Supplier Relationship
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Brand Name *</label>
          <input
            type="text"
            value={formState.brand}
            onChange={(e) => onChange("brand", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Brand Auth Reference ID</label>
          <input
            type="text"
            value={formState.brandAuthId}
            onChange={(e) => onChange("brandAuthId", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 font-mono text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Supplier *</label>
          <input
            type="text"
            value={formState.supplier}
            onChange={(e) => onChange("supplier", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Supplier Risk Classification</label>
          <select
            value={formState.supplierRisk}
            onChange={(e) => onChange("supplierRisk", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          >
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>
        </div>
      </div>
    </div>
  );
};
