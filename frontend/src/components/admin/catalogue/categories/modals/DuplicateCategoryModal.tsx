"use client";

import React from "react";
import { X, GitMerge, Check } from "lucide-react";
import toast from "react-hot-toast";
import { DuplicateCategoryPair } from "@/types/categoryManagement";

interface DuplicateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  pair: DuplicateCategoryPair | null;
  onMerge: (pair: DuplicateCategoryPair) => void;
  onIgnore: (pair: DuplicateCategoryPair) => void;
}

export const DuplicateCategoryModal: React.FC<DuplicateCategoryModalProps> = ({
  isOpen,
  onClose,
  pair,
  onMerge,
  onIgnore,
}) => {
  if (!isOpen || !pair) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            Compare Candidate Duplicate Pair ({pair.similarityPercent}% Similarity)
          </h2>
          <button onClick={onClose} className="p-1 rounded text-gray-400 hover:text-gray-700">
            <X size={16} />
          </button>
        </div>

        <div className="p-4 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            {/* Category A */}
            <div className="p-3 rounded border border-gray-200 bg-gray-50 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Category A</span>
              <h3 className="text-base font-bold text-gray-900">{pair.categoryA}</h3>
              <div className="space-y-1 text-gray-700 text-[11.5px]">
                <div>Category ID: <span className="font-mono font-bold">CAT-SKN-9012</span></div>
                <div>Hierarchy Path: Beauty &gt; Skincare &gt; Face Care</div>
                <div>Products Assigned: <span className="font-bold">{pair.productsCount}</span></div>
                <div>Required Attributes: 12</div>
                <div>Compliance Rules: Configured</div>
                <div>Channel Eligibility: 5/5</div>
              </div>
            </div>

            {/* Category B */}
            <div className="p-3 rounded border border-gray-200 bg-gray-50 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Category B</span>
              <h3 className="text-base font-bold text-gray-900">{pair.categoryB}</h3>
              <div className="space-y-1 text-gray-700 text-[11.5px]">
                <div>Category ID: <span className="font-mono font-bold">CAT-SKN-0014</span></div>
                <div>Hierarchy Path: Beauty &gt; Skincare &gt; Face Care</div>
                <div>Products Assigned: <span className="font-bold">846</span></div>
                <div>Required Attributes: 12</div>
                <div>Compliance Rules: Configured</div>
                <div>Channel Eligibility: 5/5</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              onIgnore(pair);
              toast.success("Marked candidate duplicate pair as reviewed/ignored.");
              onClose();
            }}
            className="h-8 px-3 rounded border border-gray-300 bg-white font-semibold text-gray-700 hover:bg-gray-100"
          >
            Ignore Pair
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="h-8 px-3 rounded border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
            >
              Close
            </button>
            <button
              onClick={() => {
                onMerge(pair);
                toast.success(`Merged ${pair.categoryA} into ${pair.categoryB}!`);
                onClose();
              }}
              className="h-8 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a] flex items-center gap-1.5 shadow-2xs"
            >
              <GitMerge size={13} />
              <span>Merge Categories</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
