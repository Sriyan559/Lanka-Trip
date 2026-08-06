"use client";

import React, { useState } from "react";
import { X, Edit3 } from "lucide-react";
import toast from "react-hot-toast";
import { MOCK_PRODUCT_DETAIL_RECORD } from "@/data/productDetail.mock";

interface EditProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProductDrawer: React.FC<EditProductDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const p = MOCK_PRODUCT_DETAIL_RECORD;
  const [productName, setProductName] = useState(p.productName);
  const [sku, setSku] = useState(p.sku);
  const [barcode, setBarcode] = useState(p.barcode);
  const [shortDesc, setShortDesc] = useState(p.shortDescription);

  if (!isOpen) return null;

  const handleSave = () => {
    toast.success("Updated product master record.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl p-6 flex flex-col justify-between relative overflow-y-auto">
        <div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#f5ebed] text-[#741d35] flex items-center justify-center">
                <Edit3 size={16} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Edit Product Master</h3>
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
              <label className="block font-semibold text-gray-700 mb-1">Product Title *</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">SKU *</label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full h-9 px-3 rounded border border-gray-300 font-mono text-xs focus:outline-none focus:border-[#741d35]"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Barcode (GTIN)</label>
                <input
                  type="text"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="w-full h-9 px-3 rounded border border-gray-300 font-mono text-xs focus:outline-none focus:border-[#741d35]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Short Description</label>
              <textarea
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
              />
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
            onClick={handleSave}
            className="h-9 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
