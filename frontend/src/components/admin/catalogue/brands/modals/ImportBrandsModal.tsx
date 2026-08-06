"use client";

import React, { useState } from "react";
import { X, Upload, Download, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface ImportBrandsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (importedCount: number) => void;
}

export const ImportBrandsModal: React.FC<ImportBrandsModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);

  if (!isOpen) return null;

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,Brand Name,Brand ID,Legal Owner,Primary Supplier,Country,Territory,Brand Owner\nEstée Lauder,BRD-24-0124,Estée Lauder Companies Inc.,Luxe Distribution Pte Ltd,USA,Global,Elena Vance\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "brand_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Downloaded brand_import_template.csv");
  };

  const handleProcessImport = () => {
    if (!file) {
      toast.error("Please select or drop a CSV/XLSX file first.");
      return;
    }
    onImportSuccess(12);
    toast.success("Successfully imported 12 brand master records!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <Upload size={16} className="text-[#741d35]" />
            <h3 className="text-sm font-bold text-gray-900">Import Brand Masters</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700 rounded">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 text-xs">
          <p className="text-gray-600">
            Upload CSV or XLSX file containing brand masters, legal ownership, primary suppliers, and authorization records.
          </p>

          {/* Drag and Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-gray-50/50 hover:bg-gray-100/50 transition-colors cursor-pointer"
          >
            <FileSpreadsheet size={32} className="text-[#741d35]" />
            <div className="text-center">
              <span className="font-bold text-gray-800 block">
                {file ? file.name : "Drag & drop CSV or XLSX file here"}
              </span>
              <span className="text-[11px] text-gray-500">Supports .csv, .xlsx files up to 10MB</span>
            </div>
            <label className="mt-2 px-3 py-1.5 bg-white border border-gray-300 rounded font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer shadow-2xs">
              Browse File
              <input type="file" accept=".csv,.xlsx" onChange={handleFileSelect} className="hidden" />
            </label>
          </div>

          {/* Validation Checklist */}
          <div className="p-3 rounded bg-amber-50/70 border border-amber-200 flex flex-col gap-1 text-[11px] text-amber-900">
            <span className="font-bold flex items-center gap-1">
              <AlertCircle size={13} className="text-amber-700" /> Validation Requirements
            </span>
            <ul className="list-disc pl-4 text-amber-800 space-y-0.5">
              <li>Required columns: Brand Name, Brand ID, Legal Owner, Country</li>
              <li>Brand ID must be unique in the system</li>
              <li>Valid date format: YYYY-MM-DD for authorization expiry</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="px-3 py-1.5 rounded border border-gray-300 bg-white text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
          >
            <Download size={13} />
            Template
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleProcessImport}
              className="px-4 py-1.5 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a]"
            >
              Import Brands
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
