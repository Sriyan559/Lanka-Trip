"use client";

import React, { useState } from "react";
import {
  Edit3,
  Send,
  ExternalLink,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { ProductDetailRecord } from "@/types/productDetail";

interface ProductSummaryCardProps {
  product: ProductDetailRecord;
  onEdit: () => void;
  onSubmitApproval: () => void;
  onPreviewMarketplace: () => void;
  onMoreAction: (action: string) => void;
}

export const ProductSummaryCard: React.FC<ProductSummaryCardProps> = ({
  product,
  onEdit,
  onSubmitApproval,
  onPreviewMarketplace,
  onMoreAction,
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const moreActionOptions = [
    { label: "Duplicate Product", action: "duplicate" },
    { label: "Request Information", action: "request-info" },
    { label: "Suspend Publication", action: "suspend" },
    { label: "Export Product Record", action: "export" },
    { label: "View Audit History", action: "audit" },
    { label: "Archive Product", action: "archive", danger: true },
  ];

  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs flex flex-col gap-4">
      {/* Top Header Row: Image, Metadata, Action Buttons */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
        {/* Product Image & Main Metadata */}
        <div className="flex flex-col sm:flex-row items-start gap-4 min-w-0 flex-1">
          <img
            src={product.thumbnail}
            alt={product.productName}
            className="w-24 h-24 rounded border border-gray-200 object-contain bg-gray-50 shrink-0 p-1"
          />

          <div className="flex flex-col gap-2 min-w-0 flex-1">
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              {product.productName} — <span className="text-gray-600 font-normal">{product.variantInfo}</span>
            </h2>

            {/* Compact Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1.5 text-[11.5px] border-t border-gray-100 pt-2">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Public Product Ref</span>
                <span className="font-mono font-bold text-gray-800">{product.publicId}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Database Product ID</span>
                <span className="font-mono text-gray-600">{product.dbProductId}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">SKU</span>
                <span className="font-mono font-bold text-gray-800">{product.sku}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Barcode (GTIN)</span>
                <span className="font-mono text-gray-600">{product.barcode}</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Brand</span>
                <span className="font-semibold text-gray-800">{product.brand}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Supplier</span>
                <span className="text-gray-700">{product.supplier}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Category</span>
                <span className="text-gray-700">{product.department} &gt; {product.category}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Product Type</span>
                <span className="text-gray-700">{product.productType}</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Primary Variant</span>
                <span className="text-gray-800 font-semibold">{product.primaryVariant}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Country of Origin</span>
                <span className="text-gray-700">{product.countryOfOrigin}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Manufacturer</span>
                <span className="text-gray-700">{product.manufacturer}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={onEdit}
            className="h-9 px-3.5 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5c172a] flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Edit3 size={14} />
            <span>Edit Product</span>
          </button>

          <button
            onClick={onSubmitApproval}
            className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Send size={14} className="text-gray-500" />
            <span>Submit for Approval</span>
          </button>

          <button
            onClick={onPreviewMarketplace}
            className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <ExternalLink size={14} className="text-gray-500" />
            <span>Preview Marketplace Listing</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsMoreMenuOpen((prev) => !prev)}
              className="h-9 px-3 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1 transition-colors shadow-2xs"
            >
              <span>More Actions</span>
              <ChevronDown size={14} />
            </button>

            {isMoreMenuOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg py-1 z-30 text-[11.5px]">
                {moreActionOptions.map((opt) => (
                  <button
                    key={opt.action}
                    onClick={() => {
                      onMoreAction(opt.action);
                      setIsMoreMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-gray-50 font-medium ${
                      opt.danger ? "text-rose-600 hover:bg-rose-50" : "text-gray-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row: Status Badges & Owner Record Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-gray-100 text-xs">
        {/* Status Strip */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-medium">Product Status</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {product.productStatus}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-medium">Approval Status</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {product.approvalStatus}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-medium">Publication Status</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              {product.publicationStatus}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-medium">Risk Level</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              {product.riskLevel}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-medium">Data Completeness</span>
            <span className="font-bold text-gray-900 text-xs">{product.completenessPercent}%</span>
          </div>
        </div>

        {/* Owner & Reviewer Information */}
        <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded border border-gray-200 text-[11px]">
          <div className="w-7 h-7 rounded-full bg-[#f5ebed] text-[#741d35] flex items-center justify-center font-bold text-xs shrink-0">
            EV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">{product.ownerName}</span>
              <span className="text-gray-400">({product.ownerRole})</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500 text-[10.5px]">
              <span>Created: {product.createdDate}</span>
              <span>Updated: {product.updatedDate}</span>
              <span className="font-bold text-gray-700">Record Version: {product.recordVersion}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
