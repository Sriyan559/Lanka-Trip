"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, RefreshCw, X } from "lucide-react";
import toast from "react-hot-toast";

interface ProductDetailHeaderProps {
  productId: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const ProductDetailHeader: React.FC<ProductDetailHeaderProps> = ({
  productId,
  onRefresh,
  isRefreshing = false,
}) => {
  const [showWarning, setShowWarning] = useState(true);

  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Breadcrumb */}
      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
        Catalogue &nbsp;/&nbsp; Product Masters &nbsp;/&nbsp;{" "}
        <span className="text-gray-800">{productId}</span>
      </div>

      {/* Back Link & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <Link
            href="/admin/catalogue/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#741d35] transition-colors mb-1"
          >
            <ArrowLeft size={14} />
            <span>Back to Product Master Management</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Product Master Detail</h1>
        </div>
      </div>

      {/* Conflict Warning Banner */}
      {showWarning && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded p-3 flex items-center justify-between shadow-2xs text-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2 font-medium">
            <AlertTriangle size={16} className="text-amber-600 shrink-0" />
            <span>
              This product master was updated by Marcus Lee (Admin) 2 minutes ago. Please refresh before making changes to avoid conflicts.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onRefresh();
                toast.success("Product record refreshed successfully.");
              }}
              disabled={isRefreshing}
              className="h-8 px-3 rounded bg-white border border-amber-300 text-[11.5px] font-bold text-amber-900 hover:bg-amber-100/60 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw size={12} className={isRefreshing ? "animate-spin text-[#741d35]" : ""} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh Data"}</span>
            </button>
            <button
              onClick={() => setShowWarning(false)}
              className="p-1 text-amber-700 hover:text-amber-900 rounded hover:bg-amber-100/70"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
