"use client";

import React, { useState } from "react";
import { X, Upload, Download, FileSpreadsheet, AlertTriangle, CheckCircle2 } from "lucide-react";
import { validateImportFile, ImportValidationResult } from "@/utils/mediaValidation";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (count: number) => void;
}

export function ImportMediaModal({ isOpen, onClose, onSuccess }: ImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<ImportValidationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      const res = validateImportFile(selected.name);
      setValidationResult(res);
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Asset_ID,Asset_Name,Asset_Type,Linked_Entity_Type,Linked_Entity_Name,Format,Resolution,File_Size,Alt_Text,Rights_Owner,Rights_Expiry_Date\n" +
      "MED-2026-000001,Sample Hero Shot,Product Image — Hero,Product,Radiance Serum,JPEG,2400x2400,2.1MB,Radiance serum bottle shot,Estee Lauder,2027-12-31\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "media_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApplyImport = () => {
    if (!validationResult) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(validationResult.validRecords);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full shadow-2xl border border-line overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-white">
          <div>
            <h2 className="text-base font-extrabold text-ink tracking-tight">Import Media Assets</h2>
            <p className="text-[12px] text-muted">Bulk upload asset metadata using CSV, XLSX, or ZIP archives.</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-ink rounded-md hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4 text-[12px]">
          {/* Download Template Bar */}
          <div className="p-3 bg-slate-50 border border-line rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <FileSpreadsheet size={16} className="text-[#671021]" />
              <span>Need the standard metadata template?</span>
            </div>
            <button
              onClick={handleDownloadTemplate}
              className="text-[11px] font-bold text-[#671021] hover:underline flex items-center gap-1"
            >
              <Download size={13} /> Download Template
            </button>
          </div>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-[#671021] bg-white transition-colors">
            <input
              type="file"
              id="import-media-file"
              className="hidden"
              onChange={handleFileDrop}
              accept=".zip,.csv,.xlsx"
            />
            <label htmlFor="import-media-file" className="cursor-pointer flex flex-col items-center gap-2">
              <Upload size={22} className="text-[#671021]" />
              <div><span className="font-bold text-ink">Choose ZIP, CSV or XLSX file</span> to import</div>
              <span className="text-[10px] text-muted">Includes media files & structured metadata table</span>
            </label>
            {file && (
              <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 font-mono text-[11px] font-bold inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} /> {file.name}
              </div>
            )}
          </div>

          {/* Validation Summary */}
          {validationResult && (
            <div className="p-4 rounded-lg bg-slate-50 border border-line flex flex-col gap-2 text-[11px]">
              <div className="flex items-center justify-between font-bold text-ink border-b border-line pb-2">
                <span>Validation Summary</span>
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                  {validationResult.validRecords} / {validationResult.totalRecords} Valid Records
                </span>
              </div>

              {validationResult.errors.length > 0 && (
                <div className="flex flex-col gap-1 mt-1 text-rose-800 font-medium">
                  <span className="font-bold flex items-center gap-1 text-rose-900">
                    <AlertTriangle size={13} /> {validationResult.invalidRecords} Invalid Rows Detected:
                  </span>
                  <ul className="list-disc list-inside text-[10px] pl-1 font-mono text-rose-700">
                    {validationResult.errors.map((err, idx) => (
                      <li key={idx}>Row {err.row}: {err.reason}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-line">
            <button
              onClick={onClose}
              className="h-9 px-4 rounded border border-line bg-white text-[12px] font-semibold text-ink hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyImport}
              disabled={!validationResult || isProcessing}
              className="h-9 px-5 rounded bg-[#671021] text-white text-[12px] font-bold hover:bg-[#520c1a] disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Apply Import"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
