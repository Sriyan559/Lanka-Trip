"use client";

import React from "react";
import { X, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import { DUPLICATE_CANDIDATES } from "@/data/productForm.mock";

interface DuplicateComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DuplicateComparisonModal: React.FC<DuplicateComparisonModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2.5 border-b border-gray-200 pb-3 mb-4">
          <ShieldAlert size={18} className="text-amber-500" />
          <div>
            <h3 className="text-base font-bold text-gray-900">Compare Duplicate Candidates</h3>
            <p className="text-[11.5px] text-gray-500">Cross-reference draft product against existing catalogue masters.</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {DUPLICATE_CANDIDATES.map((cand) => (
            <div key={cand.id} className="p-3 bg-gray-50 rounded border border-gray-200 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-gray-900">{cand.productName}</div>
                <div className="text-gray-500 text-[11px] mt-0.5">
                  Brand: {cand.brand} | SKU: {cand.sku} | Barcode: {cand.barcode}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {cand.matchScorePercent}% Match
                </span>
                <button
                  onClick={() => {
                    toast.success("Confirmed not a duplicate.");
                    onClose();
                  }}
                  className="block text-[10.5px] font-bold text-[#741d35] hover:underline mt-1"
                >
                  Not a Duplicate
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end pt-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded bg-[#741d35] text-white font-bold text-xs hover:bg-[#5c172a]"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
