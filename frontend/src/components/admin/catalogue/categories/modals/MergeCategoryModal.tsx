"use client";

import React, { useEffect, useState } from "react";
import { X, GitMerge, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { CategoryItem } from "@/types/categoryManagement";

interface MergeCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceCategory: CategoryItem | null;
  onConfirmMerge: (source: CategoryItem, targetName: string) => void;
  categoryOptions: Array<{id:string;name:string}>;
}

export const MergeCategoryModal: React.FC<MergeCategoryModalProps> = ({
  isOpen,
  onClose,
  sourceCategory,
  onConfirmMerge,
  categoryOptions,
}) => {
  const [targetCategory, setTargetCategory] = useState("");
  useEffect(() => setTargetCategory(""), [sourceCategory?.id]);

  if (!isOpen || !sourceCategory) return null;

  const handleMerge = () => {
    if (!targetCategory || targetCategory === sourceCategory.id) {
      toast.error("Source and destination category cannot be the same!");
      return;
    }

    onConfirmMerge(sourceCategory, targetCategory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <GitMerge size={15} className="text-[#741d35]" /> Merge Category — {sourceCategory.categoryName}
          </h2>
          <button onClick={onClose} className="p-1 rounded text-gray-400 hover:text-gray-700">
            <X size={16} />
          </button>
        </div>

        <div className="p-4 space-y-3.5 text-xs">
          <div className="p-2.5 bg-[#f5ebed]/60 border border-[#741d35]/30 rounded space-y-1 text-gray-800">
            <div className="font-bold text-[#741d35]">Source Category to Merge</div>
            <div>Name: <span className="font-bold">{sourceCategory.categoryName}</span></div>
            <div>Category ID: <span className="font-mono font-bold">{sourceCategory.categoryId}</span></div>
            <div>Assigned Products: <span className="font-bold">{sourceCategory.activeProductsCount}</span></div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Select Destination Target Category *</label>
            <select
              value={targetCategory}
              onChange={(e) => setTargetCategory(e.target.value)}
              className="w-full h-8 px-2.5 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none"
            >
              <option value="">Select a category</option>
              {categoryOptions.filter(p=>p.id!==sourceCategory.id).map(p=><option key={p.id} value={p.id}>{p.name} (ID {p.id})</option>)}
            </select>
          </div>

          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-rose-800 flex items-start gap-2 text-[11px]">
            <AlertTriangle size={14} className="text-rose-600 shrink-0 mt-0.5" />
            <p>
              Merging reassigns products and children, combines non-conflicting required attributes, and permanently removes the source category. This installation has no archive model.
            </p>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="h-8 px-3 rounded border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleMerge}
            className="h-8 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a] flex items-center gap-1.5 shadow-2xs"
          >
            <GitMerge size={13} />
            <span>Confirm Merge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
