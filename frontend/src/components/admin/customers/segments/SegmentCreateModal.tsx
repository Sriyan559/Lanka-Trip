"use client";

import React, { useState } from "react";
import { X, Sparkles, Plus, Check } from "lucide-react";

interface SegmentCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, type: string) => void;
}

export function SegmentCreateModal({ isOpen, onClose, onSave }: SegmentCreateModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Dynamic");
  const [category, setCategory] = useState("Behavioral");
  const [membershipType, setMembershipType] = useState("Inclusive");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name, type);
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-line rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-4 py-3 border-b border-line flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#671021]" />
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider font-mono">
              Create Customer Segment
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-slate-200 rounded text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 text-[11.5px]">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Segment Name <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. High-Value Beauty Buyers"
              className="w-full px-3 py-1.5 bg-slate-50 border border-line rounded text-slate-800 focus:outline-none focus:border-[#671021] focus:bg-white font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Segment Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-line rounded text-slate-800 font-medium focus:outline-none focus:border-[#671021]"
              >
                <option value="Dynamic">Dynamic</option>
                <option value="Static Group">Static Group</option>
                <option value="Lifecycle">Lifecycle</option>
                <option value="Value">Value</option>
                <option value="Loyalty">Loyalty</option>
                <option value="Behavioral">Behavioral</option>
                <option value="Risk Pool">Risk Pool</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Membership Type</label>
              <select
                value={membershipType}
                onChange={(e) => setMembershipType(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-line rounded text-slate-800 font-medium focus:outline-none focus:border-[#671021]"
              >
                <option value="Inclusive">Inclusive</option>
                <option value="Exclusive">Exclusive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-line rounded text-slate-800 font-medium"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-line flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-white border border-line rounded font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#671021] text-white rounded font-bold hover:bg-[#520d1a] transition-colors cursor-pointer shadow-2xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Create Segment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
