"use client";

import React, { useState } from "react";
import { X, Upload, FileText, Download, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

interface IngredientImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmImport: () => void;
}

export const IngredientImportModal: React.FC<IngredientImportModalProps> = ({
  isOpen,
  onClose,
  onConfirmImport,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectFile = () => {
    setSelectedFile("formulation_batch_import_v2.csv");
    toast.success("Loaded formulation import file preview.");
  };

  const handleImport = () => {
    if (!selectedFile) {
      toast.error("Please select a valid CSV/XLSX file to import.");
      return;
    }
    onConfirmImport();
    toast.success("Imported 6 formulation ingredients into matrix.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#f5ebed] text-[#741d35] flex items-center justify-center">
            <Upload size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Import Ingredient List</h3>
            <p className="text-[12px] text-gray-500">
              Batch upload formulation matrix compounds from CSV or XLSX spreadsheets.
            </p>
          </div>
        </div>

        {/* Drag & Drop Box */}
        <div
          onClick={handleSelectFile}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100/70 cursor-pointer transition-colors mb-4"
        >
          <FileText size={32} className="text-[#741d35] mb-2" />
          {selectedFile ? (
            <div>
              <div className="font-bold text-gray-900 text-xs flex items-center gap-1">
                <CheckCircle2 size={14} className="text-emerald-600" /> {selectedFile}
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5">Ready for import (6 rows detected)</div>
            </div>
          ) : (
            <div>
              <div className="font-bold text-gray-800 text-xs">Click to browse or drop CSV/XLSX file here</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Maximum size: 10MB</div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs mb-6 pt-1">
          <button
            onClick={() => toast("Downloading INCI Template CSV...", { icon: "📥" })}
            className="text-[#741d35] font-bold hover:underline flex items-center gap-1"
          >
            <Download size={13} />
            <span>Download Template CSV</span>
          </button>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 text-xs">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            className="h-9 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a]"
          >
            Confirm & Import
          </button>
        </div>
      </div>
    </div>
  );
};
