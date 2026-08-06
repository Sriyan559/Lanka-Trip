"use client";

import React, { useState } from "react";
import { X, Check, Plus } from "lucide-react";
import { QualityIssueType, QualitySeverity, QualityBusinessImpact } from "@/types/catalogueQuality";

interface CreateQualityCaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (caseTitle: string) => void;
}

export function CreateQualityCaseDrawer({
  isOpen,
  onClose,
  onSuccess,
}: CreateQualityCaseDrawerProps) {
  const [title, setTitle] = useState("Unverified Ingredient Listing");
  const [issueType, setIssueType] = useState<QualityIssueType>("Incomplete Safety Data");
  const [entityName, setEntityName] = useState("Nourishing Hair Treatment 100ml");
  const [sku, setSku] = useState("NHT-100ML");
  const [brand, setBrand] = useState("Luxe Distribution");
  const [category, setCategory] = useState("Hair Care");
  const [severity, setSeverity] = useState<QualitySeverity>("High");
  const [businessImpact, setBusinessImpact] = useState<QualityBusinessImpact>("Compliance risk");
  const [owner, setOwner] = useState("Elena Vance");
  const [description, setDescription] = useState("Ingredient concentration claims missing NMRA certification document.");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(title);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl border-l border-line flex flex-col justify-between">
        <div className="p-4 border-b border-line flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-bold text-[#671021] uppercase tracking-wider">
              Governance & Quality Case
            </span>
            <h2 className="text-base font-extrabold text-ink">Create New Quality Case</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded text-slate-500">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex-1 overflow-y-auto space-y-4 text-[12px]">
          <div>
            <label className="block font-bold text-ink mb-1">Case Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-9 px-3 rounded border border-line text-[12px] font-medium text-ink focus:outline-none focus:border-[#671021]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink mb-1">Issue Type *</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value as QualityIssueType)}
                className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none"
              >
                <option value="Possible Duplicate Product">Possible Duplicate Product</option>
                <option value="Duplicate Barcode Conflict">Duplicate Barcode Conflict</option>
                <option value="Incomplete Safety Data">Incomplete Safety Data</option>
                <option value="Missing Mandatory Media">Missing Mandatory Media</option>
                <option value="Classification Conflict">Classification Conflict</option>
                <option value="Publication Blocker">Publication Blocker</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">Severity *</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as QualitySeverity)}
                className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink mb-1">Entity / Product Name *</label>
              <input
                type="text"
                required
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                className="w-full h-9 px-3 rounded border border-line text-[12px] font-medium text-ink focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">SKU *</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full h-9 px-3 rounded border border-line text-[12px] font-mono text-ink focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink mb-1">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full h-9 px-3 rounded border border-line text-[12px] font-medium text-ink focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-9 px-3 rounded border border-line text-[12px] font-medium text-ink focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink mb-1">Business Impact *</label>
              <select
                value={businessImpact}
                onChange={(e) => setBusinessImpact(e.target.value as QualityBusinessImpact)}
                className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none"
              >
                <option value="Compliance risk">Compliance risk</option>
                <option value="Customer confusion">Customer confusion</option>
                <option value="Wrong fulfilment">Wrong fulfilment</option>
                <option value="Poor conversion">Poor conversion</option>
                <option value="Not publishable">Not publishable</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">Assigned Owner *</label>
              <select
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none"
              >
                <option value="Elena Vance">Elena Vance</option>
                <option value="Marcus Lee">Marcus Lee</option>
                <option value="Priya Kapoor">Priya Kapoor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Description & Evidence</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded border border-line text-[12px] font-medium text-ink focus:outline-none focus:border-[#671021]"
            />
          </div>
        </form>

        <div className="p-4 border-t border-line bg-slate-50 flex items-center justify-end gap-2">
          <button onClick={onClose} className="h-9 px-4 rounded border border-line text-[12px] font-bold text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="h-9 px-5 rounded bg-[#671021] text-white text-[12px] font-bold hover:bg-[#520d1a] flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={14} /> Create Quality Case
          </button>
        </div>
      </div>
    </div>
  );
}
