import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { ActionButton } from "./ActionButton";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: (inputReason?: string) => void;
  onClose: () => void;
  requireReason?: boolean;
  reasonPlaceholder?: string;
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm Action",
  cancelLabel = "Cancel",
  isDestructive = false,
  onConfirm,
  onClose,
  requireReason = false,
  reasonPlaceholder = "Enter reason or operational notes...",
}: ConfirmationModalProps) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(reason);
      setReason("");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl max-w-md w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            {isDestructive ? (
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            )}
            <h3 className="text-sm font-bold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 text-xs text-gray-600">
          <p className="leading-relaxed">{message}</p>

          {requireReason && (
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1 uppercase">
                Operational Reason
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={reasonPlaceholder}
                rows={3}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 p-3 bg-gray-50/80 border-t border-gray-100">
          <ActionButton
            label={cancelLabel}
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={loading}
          />
          <ActionButton
            label={confirmLabel}
            variant={isDestructive ? "destructive" : "primary"}
            size="sm"
            loading={loading}
            disabled={requireReason && !reason.trim()}
            onClick={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
}
