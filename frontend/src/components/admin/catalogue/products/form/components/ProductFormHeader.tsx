"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle, Play, Send } from "lucide-react";
import { ProductFormMode } from "@/types/productForm";

interface ProductFormHeaderProps {
  mode: ProductFormMode;
  productId?: string;
  hasBlockers: boolean;
  blockersCount: number;
  onCancel: () => void;
  onSaveDraft: () => void;
  onValidate: () => void;
  onPreview: () => void;
  onSubmitApproval: () => void;
}

export const ProductFormHeader: React.FC<ProductFormHeaderProps> = ({
  mode,
  productId,
  hasBlockers,
  blockersCount,
  onCancel,
  onSaveDraft,
  onValidate,
  onPreview,
  onSubmitApproval,
}) => {
  const isCreate = mode === "create";

  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Breadcrumb */}
      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
        Catalogue &nbsp;/&nbsp; Product Masters &nbsp;/&nbsp;{" "}
        <span className="text-gray-800">
          {isCreate ? "Create Product Master" : `Edit Product Master (${productId || "PROD-2024-00421"})`}
        </span>
      </div>

      {/* Title & Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <Link
            href="/admin/catalogue/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#741d35] transition-colors mb-1"
          >
            <ArrowLeft size={14} />
            <span>Back to Product Masters</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            {isCreate ? "Create Product Master" : "Edit Product Master"}
          </h1>
          <p className="text-[12px] text-gray-500 mt-0.5">
            {isCreate
              ? "Create a validated product master record for approval, inventory linkage and channel publication."
              : "Update the product master record, validate changes and maintain approval and publication readiness."}
          </p>
        </div>

        {/* Top-Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={onCancel}
            className="h-9 px-3.5 rounded bg-white border border-gray-300 text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            Cancel
          </button>

          <button
            onClick={onSaveDraft}
            className="h-9 px-3.5 rounded bg-white border border-gray-300 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Save size={14} className="text-gray-500" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={onValidate}
            className="h-9 px-3.5 rounded bg-white border border-gray-300 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <CheckCircle size={14} className="text-gray-500" />
            <span>Validate Product</span>
          </button>

          <button
            onClick={onPreview}
            className="h-9 px-3.5 rounded bg-white border border-gray-300 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Play size={14} className="text-gray-500" />
            <span>Preview Product</span>
          </button>

          <div className="relative group">
            <button
              onClick={onSubmitApproval}
              disabled={hasBlockers}
              className={`h-9 px-4 rounded text-[12px] font-bold flex items-center gap-1.5 transition-colors shadow-2xs ${
                hasBlockers
                  ? "bg-rose-100/70 text-[#741d35]/60 cursor-not-allowed border border-rose-200"
                  : "bg-[#741d35] text-white hover:bg-[#5c172a]"
              }`}
            >
              <Send size={14} />
              <span>Submit for Approval</span>
            </button>

            {hasBlockers && (
              <div className="absolute right-0 top-full mt-1.5 hidden group-hover:block bg-gray-900 text-white text-[11px] px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap z-30">
                Resolve {blockersCount} blocking issues before submitting.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
