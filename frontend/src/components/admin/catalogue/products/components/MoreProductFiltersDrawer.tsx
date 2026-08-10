"use client";

import React, { useState } from "react";
import { X, SlidersHorizontal, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

interface MoreProductFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MoreProductFiltersDrawer: React.FC<MoreProductFiltersDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minVariants, setMinVariants] = useState("");
  const [hasPromotions, setHasPromotions] = useState("all");

  if (!isOpen) return null;

  const handleApply = () => toast.error("Price, promotion, and extended variant filters are unavailable in the current product-master API.");

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between relative">
        <div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#f5ebed] text-[#741d35] flex items-center justify-center">
                <SlidersHorizontal size={16} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Extended Product Filters</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Price Range (LKR)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none"
                />
                <span className="text-gray-400 font-bold">-</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Minimum Variant Count</label>
              <input
                type="number"
                placeholder="e.g. 5"
                value={minVariants}
                onChange={(e) => setMinVariants(e.target.value)}
                className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Promotional Deals Linkage</label>
              <select
                value={hasPromotions}
                onChange={(e) => setHasPromotions(e.target.value)}
                className="w-full h-9 px-2.5 rounded border border-gray-300 text-xs text-gray-700 focus:outline-none"
              >
                <option value="all">All Products</option>
                <option value="active-promo">Active Promotional Deals</option>
                <option value="no-promo">No Promotional Deals</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="h-9 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a]"
          >
            Apply Extended Filters
          </button>
        </div>
      </div>
    </div>
  );
};
