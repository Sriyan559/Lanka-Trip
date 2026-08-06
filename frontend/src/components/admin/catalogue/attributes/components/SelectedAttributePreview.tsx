"use client";

import React from "react";
import { MoreHorizontal, Edit3, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import { CatalogueAttribute } from "@/types/attributeManagement";

interface SelectedAttributePreviewProps {
  attribute: CatalogueAttribute | null;
  onEditAttribute: (attr: CatalogueAttribute) => void;
  onManageAllowedValues: (attr: CatalogueAttribute) => void;
}

export const SelectedAttributePreview: React.FC<SelectedAttributePreviewProps> = ({
  attribute,
  onEditAttribute,
  onManageAllowedValues,
}) => {
  if (!attribute) {
    return (
      <div className="bg-white rounded border border-gray-200 p-6 flex flex-col items-center justify-center text-center shadow-2xs h-full min-w-0">
        <Layers size={32} className="text-gray-300 mb-2" />
        <span className="font-bold text-gray-700 text-xs">No Attribute Selected</span>
        <span className="text-[11px] text-gray-400 mt-0.5">Select an attribute from the table to view its preview.</span>
      </div>
    );
  }

  const allowedValues = attribute.allowedValues || ["Porcelain", "Ivory", "Beige", "Natural", "Honey"];
  const remainingValuesCount = Math.max(0, attribute.allowedValueCount - 5);

  return (
    <div className="bg-white rounded border border-gray-200 p-3.5 flex flex-col justify-between shadow-2xs h-full min-w-0 text-xs">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between mb-3 border-b border-gray-100 pb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm text-gray-900">{attribute.attributeName}</h3>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active
              </span>
            </div>
            <span className="text-[10.5px] font-mono text-gray-400 block mt-0.5">
              ID: {attribute.attributeId} • {attribute.groupName}
            </span>
          </div>
          <button className="p-1 rounded text-gray-400 hover:text-gray-700">
            <MoreHorizontal size={14} />
          </button>
        </div>

        {/* Definition */}
        <div className="mb-3">
          <span className="text-[10.5px] font-semibold text-gray-400 uppercase block mb-1">Definition</span>
          <p className="text-[11px] text-gray-700 leading-relaxed bg-gray-50 p-2 rounded border border-gray-100">
            {attribute.definition || "Name of the shade or color variant used to differentiate product color."}
          </p>
        </div>

        {/* Usage Summary Grid */}
        <div className="grid grid-cols-3 gap-2 text-center mb-3">
          <div className="p-2 rounded bg-gray-50 border border-gray-200">
            <span className="text-[9.5px] font-bold text-gray-500 uppercase block truncate">Products Using</span>
            <span className="text-sm font-black text-gray-900 font-mono">
              {attribute.productUsageCount.toLocaleString()}
            </span>
          </div>
          <div className="p-2 rounded bg-gray-50 border border-gray-200">
            <span className="text-[9.5px] font-bold text-gray-500 uppercase block truncate">Categories Covered</span>
            <span className="text-sm font-black text-emerald-700 font-mono">
              {attribute.categoryCoveragePercent}%
            </span>
          </div>
          <div className="p-2 rounded bg-gray-50 border border-gray-200">
            <span className="text-[9.5px] font-bold text-gray-500 uppercase block truncate">Channels Requiring</span>
            <span className="text-sm font-black text-gray-900 font-mono">
              {attribute.channelEligibilityText}
            </span>
          </div>
        </div>

        {/* Allowed Values Chips */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10.5px] font-semibold text-gray-400 uppercase">
              Allowed Values ({attribute.allowedValueCount})
            </span>
            <button
              onClick={() => onManageAllowedValues(attribute)}
              className="text-[10px] font-bold text-[#741d35] hover:underline"
            >
              Manage &gt;
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {allowedValues.slice(0, 5).map((val, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-gray-100 border border-gray-200 text-[10.5px] font-semibold text-gray-800">
                {val}
              </span>
            ))}
            {remainingValuesCount > 0 && (
              <span className="px-2 py-0.5 rounded bg-gray-200 text-[10.5px] font-bold text-gray-700">
                +{remainingValuesCount} more
              </span>
            )}
          </div>
        </div>

        {/* Validation Logic */}
        <div className="mb-3">
          <span className="text-[10.5px] font-semibold text-gray-400 uppercase block mb-1">Validation Logic</span>
          <p className="text-[10.5px] text-gray-600 italic">
            {attribute.validationLogic || "Must match standardized shade list. No special characters allowed."}
          </p>
        </div>

        {/* Dependent Attributes */}
        <div className="mb-3">
          <span className="text-[10.5px] font-semibold text-gray-400 uppercase block mb-1">Dependent Attributes</span>
          <div className="flex flex-wrap gap-1">
            {(attribute.dependentAttributes || ["Skin Type", "Undertone", "Finish Type"]).map((dep, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 text-[10px] font-semibold">
                {dep}
              </span>
            ))}
          </div>
        </div>

        {/* Eligible Channels */}
        <div className="mb-3">
          <span className="text-[10.5px] font-semibold text-gray-400 uppercase block mb-1">Eligible Channels</span>
          <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-emerald-800">
            <span className="flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 size={11} /> Online Marketplace
            </span>
            <span className="flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 size={11} /> Mobile App
            </span>
            <span className="flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 size={11} /> B2B Wholesale
            </span>
            <span className="flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 size={11} /> Partner Storefront
            </span>
            <span className="flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 size={11} /> Social Commerce
            </span>
          </div>
        </div>

        {/* Completeness & Metadata */}
        <div className="pt-2 border-t border-gray-100 flex flex-col gap-1 text-[10.5px] text-gray-500">
          <div className="flex justify-between items-center">
            <span className="font-medium">Completeness</span>
            <span className="font-bold text-gray-900">{attribute.completenessPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mb-1">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${attribute.completenessPercent}%` }} />
          </div>
          <div className="flex justify-between">
            <span>Last Updated: <span className="font-semibold text-gray-800">{attribute.updatedAt}</span></span>
            <span>Owner: <span className="font-semibold text-gray-800">{attribute.owner}</span></span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-gray-200 flex items-center gap-2 mt-3">
        <button
          onClick={() => onEditAttribute(attribute)}
          className="flex-1 py-1.5 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a] text-center flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
        >
          <Edit3 size={13} />
          Edit Attribute
        </button>
        <button
          onClick={() => onManageAllowedValues(attribute)}
          className="py-1.5 px-3 rounded border border-gray-300 bg-white font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          More Actions
        </button>
      </div>
    </div>
  );
};
