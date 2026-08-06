"use client";

import React, { useState } from "react";
import { X, Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface ImportProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportProductsModal: React.FC<ImportProductsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExts = [".csv", ".xlsx"];
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

    if (!validExts.includes(ext)) {
      setErrorMsg("Invalid file format. Only .CSV and .XLSX files are supported.");
      setSelectedFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File size exceeds 10MB limit.");
      setSelectedFile(null);
      return;
    }

    setErrorMsg(null);
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast.success(`Successfully uploaded and queued ${selectedFile.name} for import.`);
      setSelectedFile(null);
      onClose();
    }, 800);
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
            <h3 className="text-base font-bold text-gray-900">Import Product Masters</h3>
            <p className="text-[12px] text-gray-500">
              Bulk create or update product masters using CSV or Excel files.
            </p>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#741d35] transition-colors bg-gray-50/50 relative mb-4">
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <FileText size={32} className="mx-auto text-gray-400 mb-2" />
          <p className="text-[12.5px] font-semibold text-gray-700">
            Drag and drop your file here, or <span className="text-[#741d35] underline">browse</span>
          </p>
          <p className="text-[11px] text-gray-400 mt-1">Supports .CSV, .XLSX up to 10MB</p>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 text-rose-600 text-[12px] font-medium bg-rose-50 p-2.5 rounded border border-rose-200 mb-4">
            <AlertCircle size={15} />
            <span>{errorMsg}</span>
          </div>
        )}

        {selectedFile && !errorMsg && (
          <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded mb-4 text-[12px]">
            <div className="flex items-center gap-2 text-emerald-800 font-medium">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>{selectedFile.name}</span>
              <span className="text-emerald-600 text-[11px]">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-gray-400 hover:text-gray-600 text-xs font-semibold"
            >
              Remove
            </button>
          </div>
        )}

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded border border-gray-300 text-[12px] font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5c172a] disabled:opacity-40 transition-colors"
          >
            {isUploading ? "Uploading..." : "Start Import"}
          </button>
        </div>
      </div>
    </div>
  );
};
