"use client";

import React, { useState } from "react";
import { X, Upload, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

interface SafetyEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmUpload: () => void;
}

export const SafetyEvidenceModal: React.FC<SafetyEvidenceModalProps> = ({
  isOpen,
  onClose,
  onConfirmUpload,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpload = () => {
    onConfirmUpload();
    toast.success("Uploaded Clinical Safety Certificate for 15% Vitamin C.");
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

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#f5ebed] text-[#741d35] flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Upload Clinical Safety Evidence</h3>
            <p className="text-[12px] text-gray-500">
              Required for restricted compound Ascorbic Acid (Vitamin C 15.00%).
            </p>
          </div>
        </div>

        <div
          onClick={() => setFileName("Clinical_Safety_Assessment_Report_VitC_2026.pdf")}
          className="border-2 border-dashed border-gray-300 rounded-lg p-5 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100/70 cursor-pointer transition-colors mb-4 text-xs"
        >
          <Upload size={24} className="text-[#741d35] mb-1" />
          {fileName ? (
            <div className="font-bold text-emerald-700">{fileName} (Attached)</div>
          ) : (
            <div>
              <div className="font-bold text-gray-800">Click to upload safety report PDF</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Accepted: PDF, JPG, PNG (Max 15MB)</div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 text-xs">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="h-9 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a]"
          >
            Save & Resolve Blocker
          </button>
        </div>
      </div>
    </div>
  );
};
