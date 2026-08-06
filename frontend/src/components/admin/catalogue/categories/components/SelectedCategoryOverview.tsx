"use client";

import React, { useState } from "react";
import { Edit3, Sliders, ExternalLink, ChevronRight, MoreHorizontal } from "lucide-react";
import { CategoryItem } from "@/types/categoryManagement";

interface SelectedCategoryOverviewProps {
  category: CategoryItem | null;
  onEditCategory: (cat: CategoryItem) => void;
  onManageAttributes: (cat: CategoryItem) => void;
  onViewProducts: (cat: CategoryItem) => void;
}

export const SelectedCategoryOverview: React.FC<SelectedCategoryOverviewProps> = ({
  category,
  onEditCategory,
  onManageAttributes,
  onViewProducts,
}) => {
  const [showMoreActions, setShowMoreActions] = useState(false);

  if (!category) {
    return (
      <div className="bg-white rounded border border-gray-200 p-4 text-center text-xs text-gray-400 shadow-2xs">
        Select a category from the tree or table to view details.
      </div>
    );
  }

  return (
    <div className="bg-white rounded border border-gray-200 p-3.5 flex flex-col gap-3 shadow-2xs h-full text-xs">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-gray-900">{category.categoryName}</h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {category.status}
          </span>
        </div>
        <button
          onClick={() => onEditCategory(category)}
          className="h-7 px-2.5 rounded border border-gray-300 bg-white text-[11px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1 shadow-2xs"
        >
          <Edit3 size={12} /> Edit Category
        </button>
      </div>

      {/* Category Info Grid */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11.5px] border-b border-gray-100 pb-3">
        <div>
          <span className="text-gray-400 font-semibold block text-[10px] uppercase">Category ID</span>
          <span className="font-mono font-bold text-gray-800">{category.categoryId}</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold block text-[10px] uppercase">Parent Category</span>
          <span className="font-semibold text-gray-800">{category.parentCategory}</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold block text-[10px] uppercase">Level</span>
          <span className="font-semibold text-gray-800">{category.level}</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold block text-[10px] uppercase">Active Products</span>
          <span className="font-mono font-bold text-gray-900">{category.activeProductsCount}</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold block text-[10px] uppercase">Required Attributes</span>
          <span className="font-semibold text-gray-800">{category.requiredAttributesCount}</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold block text-[10px] uppercase">Attribute Coverage</span>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${category.attributeCoveragePercent}%` }}
              />
            </div>
            <span className="font-bold text-[10.5px] text-emerald-700">
              {category.attributeCoveragePercent}%
            </span>
          </div>
        </div>
        <div>
          <span className="text-gray-400 font-semibold block text-[10px] uppercase">Eligible Channels</span>
          <span className="font-semibold text-gray-800 flex items-center gap-1">
            {category.channelEligibilityText} Channels{" "}
            <span className="text-[10px] text-[#741d35] font-bold hover:underline cursor-pointer">View &gt;</span>
          </span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold block text-[10px] uppercase">Compliance Rules</span>
          <span className="font-semibold text-emerald-700 flex items-center gap-1">
            {category.complianceStatus}{" "}
            <span className="text-[10px] text-[#741d35] font-bold hover:underline cursor-pointer">View &gt;</span>
          </span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold block text-[10px] uppercase">SEO Readiness</span>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-full rounded-full"
                style={{ width: `${category.seoReadinessPercent}%` }}
              />
            </div>
            <span className="font-bold text-[10.5px] text-sky-700">
              {category.seoReadinessPercent}%
            </span>
          </div>
        </div>
        <div>
          <span className="text-gray-400 font-semibold block text-[10px] uppercase">Last Updated</span>
          <span className="text-[10.5px] text-gray-600 font-medium">{category.updatedDate}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-400 font-semibold block text-[10px] uppercase">Owner</span>
          <span className="font-semibold text-gray-800">{category.owner}</span>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => onManageAttributes(category)}
          className="flex-1 h-8 px-3 rounded border border-gray-300 bg-white text-[11.5px] font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <Sliders size={13} /> Manage Attributes
        </button>
        <button
          onClick={() => onViewProducts(category)}
          className="flex-1 h-8 px-3 rounded border border-gray-300 bg-white text-[11.5px] font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <ExternalLink size={13} /> View Products
        </button>
      </div>
    </div>
  );
};
