"use client";

import React from "react";
import { X, AlertTriangle } from "lucide-react";

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDiscard: () => void;
  onSaveDraftAndExit: () => void;
}

export const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({
  isOpen,
  onClose,
  onConfirmDiscard,
  onSaveDraftAndExit,
}) => {
  if (!isOpen) return null;

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
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Unsaved Changes Detected</h3>
            <p className="text-[12px] text-gray-500">
              You have modified form fields that have not been saved to draft yet.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-4 border-t border-gray-100 text-xs">
          <button
            onClick={onClose}
            className="w-full sm:w-auto h-9 px-4 rounded border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Continue Editing
          </button>
          <button
            onClick={onSaveDraftAndExit}
            className="w-full sm:w-auto h-9 px-4 rounded bg-white border border-gray-300 font-bold text-gray-800 hover:bg-gray-50"
          >
            Save Draft & Exit
          </button>
          <button
            onClick={onConfirmDiscard}
            className="w-full sm:w-auto h-9 px-4 rounded bg-rose-600 text-white font-bold hover:bg-rose-700"
          >
            Discard Changes
          </button>
        </div>
      </div>
    </div>
  );
};
