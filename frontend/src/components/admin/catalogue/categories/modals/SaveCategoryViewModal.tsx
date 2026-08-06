"use client";

import React, { useState } from "react";
import { X, Bookmark } from "lucide-react";
import toast from "react-hot-toast";

interface SaveCategoryViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaveCategoryViewModal: React.FC<SaveCategoryViewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [viewName, setViewName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewName) {
      toast.error("View name is required!");
      return;
    }
    toast.success(`Custom view "${viewName}" saved successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <Bookmark size={15} className="text-[#741d35]" /> Save Custom Category View
          </h2>
          <button onClick={onClose} className="p-1 rounded text-gray-400 hover:text-gray-700">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">View Name *</label>
            <input
              type="text"
              required
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              placeholder="e.g. High Risk Face Care Categories"
              className="w-full h-8 px-2.5 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description of this saved filter configuration..."
              className="w-full p-2 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="defaultView" className="rounded border-gray-300 text-[#741d35]" />
            <label htmlFor="defaultView" className="font-semibold text-gray-700">
              Set as my default Category Management view
            </label>
          </div>
        </form>

        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2 text-xs">
          <button
            type="button"
            onClick={onClose}
            className="h-8 px-3 rounded border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="h-8 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a] flex items-center gap-1.5 shadow-2xs"
          >
            <Bookmark size={13} />
            <span>Save View</span>
          </button>
        </div>
      </div>
    </div>
  );
};
