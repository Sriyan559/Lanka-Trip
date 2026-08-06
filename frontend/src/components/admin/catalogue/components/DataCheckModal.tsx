"use client";

import React, { useState } from "react";
import { X, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface DataCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataCheckModal: React.FC<DataCheckModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleRunCheck = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      toast.success("Catalogue Data Health Check completed. 0 critical errors found.");
    }, 700);
  };

  const validationResults = [
    { title: "EAN / Barcode Uniqueness", status: "Pass", details: "All 12,840 records pass checksum." },
    { title: "Mandatory Image Ratio", status: "Pass", details: "84% products meet 1:1 square ratio." },
    { title: "Brand Authorization Linkage", status: "Warning", details: "9 products flagged with pending authorization." },
    { title: "Taxonomy & Category Mapping", status: "Pass", details: "Categories aligned with SL Beauty taxonomy v3." },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Catalogue Data Check</h3>
            <p className="text-[12px] text-gray-500">
              Run automated integrity scan across all master records.
            </p>
          </div>
        </div>

        <div className="space-y-2.5 mb-6">
          {validationResults.map((res, i) => (
            <div
              key={i}
              className="p-3 rounded border border-gray-200 bg-gray-50/60 flex items-start gap-2.5"
            >
              {res.status === "Pass" ? (
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <div className="font-bold text-gray-900">{res.title}</div>
                <div className="text-gray-500 text-[11px] mt-0.5">{res.details}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <button
            onClick={handleRunCheck}
            disabled={isScanning}
            className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <RefreshCw size={13} className={isScanning ? "animate-spin text-[#741d35]" : ""} />
            <span>{isScanning ? "Scanning..." : "Re-run Validation Scan"}</span>
          </button>
          <button
            onClick={onClose}
            className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5c172a]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
