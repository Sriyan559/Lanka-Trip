"use client";

import React, { useEffect, useState } from "react";
import { X, Move, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { CategoryItem } from "@/types/categoryManagement";

interface MoveCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: CategoryItem | null;
  onConfirmMove: (category: CategoryItem, newParent: string) => void;
  parentOptions: Array<{id:string;name:string}>;
}

export const MoveCategoryModal: React.FC<MoveCategoryModalProps> = ({
  isOpen,
  onClose,
  category,
  onConfirmMove,
  parentOptions,
}) => {
  const [selectedParent, setSelectedParent] = useState("");
  useEffect(() => setSelectedParent(category?.parentId || ""), [category?.id, category?.parentId]);

  if (!isOpen || !category) return null;

  const handleMove = () => {
    if (selectedParent === category.id) {
      toast.error("Circular Hierarchy Error: A category cannot be its own parent!");
      return;
    }

    onConfirmMove(category, selectedParent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <Move size={15} className="text-[#741d35]" /> Move Category — {category.categoryName}
          </h2>
          <button onClick={onClose} className="p-1 rounded text-gray-400 hover:text-gray-700">
            <X size={16} />
          </button>
        </div>

        <div className="p-4 space-y-3.5 text-xs">
          <div className="p-2.5 bg-gray-50 border border-gray-200 rounded space-y-1">
            <div className="font-semibold text-gray-700">Current Category Info</div>
            <div>Name: <span className="font-bold text-gray-900">{category.categoryName}</span></div>
            <div>Current Parent: <span className="font-bold text-gray-900">{category.parentCategory}</span></div>
            <div>Active Products: <span className="font-bold text-gray-900">{category.activeProductsCount}</span></div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Select New Parent Category *</label>
            <select
              value={selectedParent}
              onChange={(e) => setSelectedParent(e.target.value)}
              className="w-full h-8 px-2.5 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none"
            >
              <option value="">Root</option>
              {parentOptions.filter(p=>p.id!==category.id).map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-amber-800 flex items-start gap-2 text-[11px]">
            <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
            <p>
              Moving this category updates its hierarchy path and every descendant path derived from it.
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
            onClick={handleMove}
            className="h-8 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a] flex items-center gap-1.5 shadow-2xs"
          >
            <Move size={13} />
            <span>Confirm Move</span>
          </button>
        </div>
      </div>
    </div>
  );
};
