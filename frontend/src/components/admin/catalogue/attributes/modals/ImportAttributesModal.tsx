"use client";

import React, { useState } from "react";
import { X, Upload, Download, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface ImportAttributesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (count: number) => void;
}

export const ImportAttributesModal: React.FC<ImportAttributesModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadTemplate = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Attribute Name,Attribute ID,Group,Data Type,Input Type,Required,Variant Generating,Owner\n" +
      "Coverage Index,ATTR-0210,Product Identity,Number,Number,Yes,No,Elena Vance\n" +
      "Blue Light Shield,ATTR-0211,Skin & Beauty,Text,Dropdown,Yes,Yes,Marcus Lee\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attribute_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Downloaded attribute import CSV template!");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file to import.");
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast.success(`Successfully imported 24 attributes from ${selectedFile.name}!`);
      onImportSuccess(24);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <Upload size={18} className="text-[#741d35]" />
            <h3 className="text-sm font-bold text-gray-900">Import Attribute Masters</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700 rounded">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 text-xs">
          {/* Download Template Banner */}
          <div className="p-3 bg-[#f5ebed]/40 border border-[#741d35]/20 rounded flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#741d35]">
              <FileText size={16} />
              <span className="font-semibold">Download standardized CSV/XLSX template</span>
            </div>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="px-2.5 py-1 rounded bg-[#741d35] text-white text-[11px] font-bold hover:bg-[#5c172a] flex items-center gap-1"
            >
              <Download size={12} /> Template
            </button>
          </div>

          {/* Drag and Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center flex flex-col items-center justify-center gap-2 transition-colors ${
              isDragOver ? "border-[#741d35] bg-[#f5ebed]/20" : "border-gray-300 bg-gray-50"
            }`}
          >
            <Upload size={24} className="text-gray-400" />
            <div className="text-gray-700 font-semibold">
              Drag and drop your file here, or{" "}
              <label className="text-[#741d35] hover:underline cursor-pointer">
                browse
                <input
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <span className="text-[11px] text-gray-400">Supports .CSV, .XLSX up to 10MB</span>

            {selectedFile && (
              <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 font-medium text-[11px] flex items-center gap-1.5">
                <CheckCircle2 size={13} /> Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={`px-4 py-1.5 rounded text-xs font-bold text-white flex items-center gap-1.5 ${
              selectedFile && !isUploading ? "bg-[#741d35] hover:bg-[#5c172a]" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isUploading ? "Importing..." : "Start Import"}
          </button>
        </div>
      </div>
    </div>
  );
};
