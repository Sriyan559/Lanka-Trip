"use client";

import React, { useState, useEffect } from "react";
import { X, Save, CheckCircle2 } from "lucide-react";
import { MediaAsset, MediaDashboardData } from "@/types/mediaManagement";

interface DrawerProps {
  isOpen: boolean;
  asset: MediaAsset | null;
  onClose: () => void;
  onSave: (updated: MediaAsset) => void;
  options: MediaDashboardData["options"];
}

export function EditMediaMetadataDrawer({ isOpen, asset, onClose, onSave, options }: DrawerProps) {
  const [formData, setFormData] = useState<MediaAsset | null>(asset);

  useEffect(() => {
    setFormData(asset);
  }, [asset]);

  if (!isOpen || !formData) return null;

  const handleChange = (field: keyof MediaAsset, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl border-l border-line flex flex-col justify-between">
        {/* Header */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-slate-50">
          <div>
            <div className="text-[10px] font-mono font-bold text-[#671021]">{formData.id}</div>
            <h2 className="text-base font-extrabold text-ink tracking-tight">Edit Media Metadata</h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-ink rounded-md hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 flex-1 overflow-y-auto flex flex-col gap-4 text-[12px]">
          <div>
            <label className="block font-bold text-ink mb-1">Asset Name</label>
            <input
              type="text"
              value={formData.name}
              disabled
              className="w-full h-9 px-3 border border-line rounded font-semibold text-ink"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink mb-1">Asset Type</label>
              <select
                disabled
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full h-9 px-2 border border-line rounded font-semibold text-ink"
              >
                <option value="Product Image — Hero">Product Image — Hero</option>
                <option value="Packaging Image — Back">Packaging Image — Back</option>
                <option value="Packaging Image — Ingredients">Packaging Image — Ingredients</option>
                <option value="Document — Certificate">Document — Certificate</option>
                <option value="Campaign Image — Banner">Campaign Image — Banner</option>
                <option value="Product Demo — Video">Product Demo — Video</option>
                <option value="Lifestyle Image — Model">Lifestyle Image — Model</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">Approval Status</label>
              <select
                value={formData.approvalStatus}
                onChange={(e) => handleChange("approvalStatus", e.target.value)}
                className="w-full h-9 px-2 border border-line rounded font-semibold text-ink"
              >
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Needs Review">Needs Review</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Product Name</label>
            <select
              value={formData.productId || ""}
              onChange={(e) => handleChange("productId", e.target.value)}
              className="w-full h-9 px-3 border border-line rounded font-semibold text-ink"
            ><option value="">Unlinked</option>{options.products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}</select>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Brand Name</label>
            <input
              type="text"
              value={formData.brandName}
              disabled
              className="w-full h-9 px-3 border border-line rounded font-semibold text-ink"
            />
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Accessibility Alt Text</label>
            <textarea
              rows={3}
              value={formData.altText || ""}
              onChange={(e) => handleChange("altText", e.target.value)}
              className="w-full px-3 py-2 border border-line rounded font-medium text-ink"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink mb-1">Quality Score</label>
              <input
                type="number"
                min={0}
                max={100}
                value={formData.qualityScore ?? ""}
                disabled
                className="w-full h-9 px-3 border border-line rounded font-mono font-bold text-ink"
              />
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">Usage Rights Status</label>
              <input
                type="text"
                value={formData.usageRightsStatus}
                disabled
                className="w-full h-9 px-3 border border-line rounded font-semibold text-ink"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Owner Name</label>
            <input
              type="text"
              value={formData.ownerName}
              disabled
              className="w-full h-9 px-3 border border-line rounded font-semibold text-ink"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-line mt-auto">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded border border-line bg-white text-[12px] font-semibold text-ink hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-9 px-5 rounded bg-[#671021] text-white text-[12px] font-bold hover:bg-[#520c1a] flex items-center gap-1.5"
            >
              <Save size={14} /> Save Metadata
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
