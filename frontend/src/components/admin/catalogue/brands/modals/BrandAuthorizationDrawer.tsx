"use client";

import React from "react";
import { X, ShieldCheck, FileText, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { CatalogueBrand } from "@/types/brandManagement";

interface BrandAuthorizationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  brand: CatalogueBrand | null;
}

export const BrandAuthorizationDrawer: React.FC<BrandAuthorizationDrawerProps> = ({
  isOpen,
  onClose,
  brand,
}) => {
  if (!isOpen || !brand) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#741d35]" />
                Brand Authorization Governance — {brand.brandName}
              </h2>
              <p className="text-[11px] text-gray-500">
                Official licensing, territory rights, certificate validation and expiry tracking.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 flex flex-col gap-4 text-xs">
            {/* Status Card */}
            <div className="p-3.5 rounded bg-gray-50 border border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-[10.5px] text-gray-500 font-semibold block">Authorization Status</span>
                <span
                  className={`text-sm font-bold ${
                    brand.authorizationStatus === "Valid"
                      ? "text-emerald-700"
                      : brand.authorizationStatus === "Expiring Soon" || brand.authorizationStatus === "Conditional"
                      ? "text-amber-700"
                      : "text-rose-700"
                  }`}
                >
                  {brand.authorizationStatus}
                </span>
              </div>
              <span className="px-2 py-1 rounded text-[10.5px] font-mono font-bold bg-white border border-gray-200">
                {brand.brandId}
              </span>
            </div>

            {/* Authorization Details */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded border border-gray-200 bg-white">
              <div>
                <span className="text-gray-500 text-[10.5px] block font-medium">Legal Owner</span>
                <span className="font-bold text-gray-900">{brand.legalOwner}</span>
              </div>
              <div>
                <span className="text-gray-500 text-[10.5px] block font-medium">Primary Supplier</span>
                <span className="font-bold text-gray-900">{brand.primarySupplier}</span>
              </div>
              <div>
                <span className="text-gray-500 text-[10.5px] block font-medium">Authorized Territory</span>
                <span className="font-bold text-gray-900">{brand.territory}</span>
              </div>
              <div>
                <span className="text-gray-500 text-[10.5px] block font-medium">Channel Scope</span>
                <span className="font-bold text-gray-900">{brand.channelEligibility} Channels</span>
              </div>
              <div>
                <span className="text-gray-500 text-[10.5px] block font-medium">Valid From</span>
                <span className="font-mono text-gray-800">{brand.authorizationStartDate || "2024-01-01"}</span>
              </div>
              <div>
                <span className="text-gray-500 text-[10.5px] block font-medium">Valid Until</span>
                <span className="font-mono font-bold text-gray-900">{brand.authorizationExpiryDate || "2027-12-31"}</span>
              </div>
            </div>

            {/* Supporting Documents List */}
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-gray-900 text-xs">Supporting Governance Documents</h4>
              {[
                { name: "Brand_Authorization_Certificate_2026.pdf", size: "2.4 MB", date: "04 Jan 2026" },
                { name: "Trademark_Registration_Global.pdf", size: "1.8 MB", date: "12 Oct 2025" },
                { name: "Exclusive_Distribution_Agreement.pdf", size: "4.1 MB", date: "15 Jan 2026" },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded border border-gray-200 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-[#741d35]" />
                    <div>
                      <span className="font-semibold text-gray-800 block text-[11px]">{doc.name}</span>
                      <span className="text-[10px] text-gray-400">{doc.size} • Uploaded {doc.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toast.success(`Downloading ${doc.name}`)}
                    className="text-[10.5px] font-bold text-[#741d35] hover:underline"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <button
            onClick={() => {
              toast.success(`Requesting authorization renewal for ${brand.brandName}`);
            }}
            className="px-3.5 py-1.5 rounded border border-gray-300 bg-white text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Request Renewal
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                toast.success(`Authorization records saved for ${brand.brandName}`);
                onClose();
              }}
              className="px-4 py-1.5 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a] transition-colors shadow-2xs"
            >
              Save Governance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
