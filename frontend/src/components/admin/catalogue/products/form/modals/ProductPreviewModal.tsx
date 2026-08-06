"use client";

import React from "react";
import { X, Play, Star } from "lucide-react";
import { ProductMasterFormState } from "@/types/productForm";

interface ProductPreviewModalProps {
  isOpen: boolean;
  formState: ProductMasterFormState;
  onClose: () => void;
}

export const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({
  isOpen,
  formState,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-4">
          <Play size={16} className="text-[#741d35]" />
          <h3 className="text-base font-bold text-gray-900">Product Storefront Preview</h3>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-2xs space-y-3 text-xs">
          <div className="relative w-full h-40 bg-gray-50 rounded overflow-hidden flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80"
              alt="Thumbnail"
              className="w-full h-full object-contain p-2"
            />
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[9.5px] font-bold uppercase">
              {formState.brand || "Brand"}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900">{formState.productName} — 30 ml</h4>
            <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">{formState.shortDescription}</p>
          </div>

          <div className="flex items-center gap-1 text-amber-400 text-xs">
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <span className="text-gray-500 text-[10.5px] font-semibold ml-1">(4.9 · Preview)</span>
          </div>

          <div className="flex items-baseline justify-between pt-2 border-t border-gray-100">
            <div>
              <span className="text-[9.5px] text-gray-400 block font-semibold">MRP Price</span>
              <span className="text-base font-extrabold text-gray-900">
                LKR {formState.mrp.toLocaleString()}.00
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
              Draft Preview
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-gray-100 mt-4">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a]"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
