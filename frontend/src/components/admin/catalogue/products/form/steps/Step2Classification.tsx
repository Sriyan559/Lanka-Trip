"use client";

import React from "react";
import { ProductMasterFormState } from "@/types/productForm";

interface Step2ClassificationProps {
  formState: ProductMasterFormState;
  onChange: (field: keyof ProductMasterFormState, value: any) => void;
}

export const Step2Classification: React.FC<Step2ClassificationProps> = ({ formState, onChange }) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs space-y-4">
      <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2">
        Step 2 — Product Classification
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Department *</label>
          <select
            value={formState.department}
            onChange={(e) => onChange("department", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          >
            <option value="Skincare">Skincare</option>
            <option value="Haircare">Haircare</option>
            <option value="Makeup">Makeup</option>
            <option value="Fragrance">Fragrance</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Category *</label>
          <input
            type="text"
            value={formState.category}
            onChange={(e) => onChange("category", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Subcategory</label>
          <input
            type="text"
            value={formState.subcategory}
            onChange={(e) => onChange("subcategory", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Product Family</label>
          <input
            type="text"
            value={formState.productFamily}
            onChange={(e) => onChange("productFamily", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Beauty Concern</label>
          <input
            type="text"
            value={formState.beautyConcern}
            onChange={(e) => onChange("beautyConcern", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Skin Type</label>
          <input
            type="text"
            value={formState.skinType}
            onChange={(e) => onChange("skinType", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>
      </div>
    </div>
  );
};
