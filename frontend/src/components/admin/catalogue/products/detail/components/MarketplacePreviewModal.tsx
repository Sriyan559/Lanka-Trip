"use client";

import React from "react";
import { X, ExternalLink, Star } from "lucide-react";
import { MOCK_PRODUCT_DETAIL_RECORD } from "@/data/productDetail.mock";

interface MarketplacePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MarketplacePreviewModal: React.FC<MarketplacePreviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const p = MOCK_PRODUCT_DETAIL_RECORD;

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
          <ExternalLink size={16} className="text-[#741d35]" />
          <h3 className="text-base font-bold text-gray-900">Storefront Marketplace Preview</h3>
        </div>

        {/* Mock Storefront Listing Card */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-2xs space-y-3">
          <div className="relative w-full h-44 bg-gray-50 rounded overflow-hidden">
            <img src={p.thumbnail} alt={p.productName} className="w-full h-full object-contain p-2" />
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold uppercase">
              {p.brand}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900">{p.productName} — {p.variantInfo}</h4>
            <p className="text-[11.5px] text-gray-500 line-clamp-2 mt-1">{p.shortDescription}</p>
          </div>

          <div className="flex items-center gap-1 text-amber-400 text-xs">
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <span className="text-gray-500 text-[11px] font-semibold ml-1">(4.9 · 128 reviews)</span>
          </div>

          <div className="flex items-baseline justify-between pt-2 border-t border-gray-100">
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">MRP Price</span>
              <span className="text-base font-extrabold text-gray-900">LKR {p.mrp.toLocaleString()}.00</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">
              Status: {p.publicationStatus}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-gray-100 mt-4">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5c172a]"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
