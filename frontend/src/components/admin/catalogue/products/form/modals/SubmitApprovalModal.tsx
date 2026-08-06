"use client";

import React from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

interface SubmitApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
}

export const SubmitApprovalModal: React.FC<SubmitApprovalModalProps> = ({
  isOpen,
  onClose,
  onConfirmSubmit,
}) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirmSubmit();
    toast.success("Product Master successfully submitted for approval!");
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
            <Send size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Submit for Approval</h3>
            <p className="text-[12px] text-gray-500">
              Submit product master record to the Compliance & Regulatory review queue.
            </p>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-900 text-xs mb-6 flex items-start gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Ready for Submission</div>
            <div className="text-[11px] mt-0.5">All 120 required fields and formulation matrix checks have passed validation.</div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 text-xs">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="h-9 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a]"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
};
