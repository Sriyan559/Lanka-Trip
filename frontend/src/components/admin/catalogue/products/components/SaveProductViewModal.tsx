"use client";

import React, { useState } from "react";
import { X, Bookmark } from "lucide-react";
import toast from "react-hot-toast";

interface SaveProductViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string, isDefault: boolean) => Promise<void>;
}

export const SaveProductViewModal: React.FC<SaveProductViewModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [viewName, setViewName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [isDefault, setIsDefault] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!viewName.trim()) {
      toast.error("Please enter a view name.");
      return;
    }
    setIsSaving(true);
    try { await onSave(viewName, description, isDefault); toast.success(`Saved custom filter view "${viewName}".`); setViewName(""); setDescription(""); onClose(); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Unable to save view."); }
    finally { setIsSaving(false); }
  };

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
          <div className="w-10 h-10 rounded-full bg-[#f5ebed] text-[#741d35] flex items-center justify-center">
            <Bookmark size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Save Custom Product View</h3>
            <p className="text-[12px] text-gray-500">Save current filter preset for quick access later.</p>
          </div>
        </div>

        <div className="space-y-3.5 mb-6 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">View Name *</label>
            <input
              type="text"
              placeholder="e.g. High Risk Skincare Serums"
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description (Optional)</label>
            <textarea
              placeholder="Brief description of what this filter view isolates..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full p-2.5 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Visibility</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full h-9 px-2.5 rounded border border-gray-300 text-xs text-gray-700 focus:outline-none"
            >
              <option value="private">Only Me (Private)</option>
              <option value="team">My Team</option>
              <option value="public">All Catalogue Admin Users</option>
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="rounded border-gray-300 text-[#741d35] focus:ring-[#741d35]"
            />
            <span className="font-semibold text-gray-700">Set as my default Catalogue view</span>
          </label>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded border border-gray-300 text-[12px] font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5c172a]"
          >
            {isSaving ? "Saving..." : "Save Preset View"}
          </button>
        </div>
      </div>
    </div>
  );
};
