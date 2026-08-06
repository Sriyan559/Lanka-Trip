"use client";

import React, { useState, useEffect } from "react";
import { X, Edit3 } from "lucide-react";
import toast from "react-hot-toast";
import { SafetyDeclarationCard } from "@/types/productForm";

interface DeclarationEditModalProps {
  isOpen: boolean;
  declaration: SafetyDeclarationCard | null;
  onClose: () => void;
  onSave: (updated: SafetyDeclarationCard) => void;
}

export const DeclarationEditModal: React.FC<DeclarationEditModalProps> = ({
  isOpen,
  declaration,
  onClose,
  onSave,
}) => {
  const [val, setVal] = useState("");

  useEffect(() => {
    if (declaration) setVal(declaration.value);
  }, [declaration, isOpen]);

  if (!isOpen || !declaration) return null;

  const handleSave = () => {
    onSave({
      ...declaration,
      value: val.trim(),
      status: "good",
    });
    toast.success(`Updated declaration for ${declaration.title}`);
    onClose();
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

        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-4">
          <Edit3 size={16} className="text-[#741d35]" />
          <h3 className="text-base font-bold text-gray-900">Edit Declaration</h3>
        </div>

        <div className="space-y-3 text-xs mb-6">
          <label className="block font-semibold text-gray-700">{declaration.title}</label>
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 text-xs">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="h-9 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a]"
          >
            Save Declaration
          </button>
        </div>
      </div>
    </div>
  );
};
