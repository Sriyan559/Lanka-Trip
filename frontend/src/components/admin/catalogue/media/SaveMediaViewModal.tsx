"use client";

import React, { useState } from "react";
import { X, BookmarkPlus } from "lucide-react";

interface SaveViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (viewName: string) => void;
}

export function SaveMediaViewModal({ isOpen, onClose, onSave }: SaveViewModalProps) {
  const [viewName, setViewName] = useState("");
  const [description, setDescription] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (viewName.trim()) {
      onSave(viewName.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-line overflow-hidden">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <BookmarkPlus size={18} className="text-[#671021]" />
            <h2 className="text-base font-extrabold text-ink tracking-tight">Save Filter Preset View</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-ink rounded-md">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 text-[12px]">
          <div>
            <label className="block font-bold text-ink mb-1">View Name *</label>
            <input
              type="text"
              required
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              placeholder="e.g. Pending Approval Images"
              className="w-full h-9 px-3 border border-line rounded font-semibold text-ink focus:outline-none focus:border-[#671021]"
            />
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description of this custom view preset..."
              className="w-full h-9 px-3 border border-line rounded text-ink"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-line">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="rounded border-line text-[#671021]"
              />
              <span>Set as my default media workspace view</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="rounded border-line text-[#671021]"
              />
              <span>Share preset with other Admin workspace users</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-line mt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded border border-line bg-white font-semibold text-ink hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-9 px-5 rounded bg-[#671021] text-white font-bold hover:bg-[#520c1a]"
            >
              Save View Preset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
