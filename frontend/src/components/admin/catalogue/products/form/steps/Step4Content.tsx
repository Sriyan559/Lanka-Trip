"use client";

import React from "react";
import { ProductMasterFormState } from "@/types/productForm";

interface Step4ContentProps {
  formState: ProductMasterFormState;
  onChange: (field: keyof ProductMasterFormState, value: any) => void;
}

export const Step4Content: React.FC<Step4ContentProps> = ({ formState, onChange }) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs space-y-4">
      <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2">
        Step 4 — Product Content & Copywriting
      </h3>

      <div className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Short Description *</label>
          <input
            type="text"
            value={formState.shortDescription}
            onChange={(e) => onChange("shortDescription", e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Detailed Description & Benefits</label>
          <textarea
            value={formState.longDescription}
            onChange={(e) => onChange("longDescription", e.target.value)}
            rows={3}
            className="w-full p-2.5 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Key Benefits</label>
            <input
              type="text"
              value={formState.keyBenefits}
              onChange={(e) => onChange("keyBenefits", e.target.value)}
              className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Warnings & Cautions</label>
            <input
              type="text"
              value={formState.warnings}
              onChange={(e) => onChange("warnings", e.target.value)}
              className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
