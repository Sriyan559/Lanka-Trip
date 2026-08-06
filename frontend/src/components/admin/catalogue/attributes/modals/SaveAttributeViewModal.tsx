"use client";

import React, { useState } from "react";
import { X, Bookmark } from "lucide-react";
import toast from "react-hot-toast";

interface SaveAttributeViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaveAttributeViewModal: React.FC<SaveAttributeViewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [viewName, setViewName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewName.trim()) {
      toast.error("Please enter a View Name.");
      return;
    }
    toast.success(`Saved custom view "${viewName}"!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <Bookmark size={16} className="text-[#741d35]" />
            <h3 className="text-sm font-bold text-gray-900">Save Custom View</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700 rounded">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 flex flex-col gap-3.5 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">View Name *</label>
            <input
              type="text"
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              placeholder="e.g. Variant Attributes Required for Wholesale"
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe view purpose..."
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
            />
          </div>

          <div className="p-3 bg-gray-50 rounded border border-gray-200 text-[11px] text-gray-600">
            Includes active search query, status tab, attribute group, data type, input type, and risk level filters.
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a]"
            >
              Save View
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
