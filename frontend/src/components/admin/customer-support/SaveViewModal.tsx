'use client';

import React, { useState } from 'react';
import { X, AlertCircle, Loader2 } from 'lucide-react';
import type { SaveSupportViewDto, SupportCaseFilterParams } from '@/types/customerSupport';

interface SaveViewModalProps {
  isOpen: boolean;
  activeFilters: SupportCaseFilterParams;
  onClose: () => void;
  onSubmit: (dto: SaveSupportViewDto) => Promise<void>;
}

export function SaveViewModal({
  isOpen,
  activeFilters,
  onClose,
  onSubmit,
}: SaveViewModalProps) {
  const [viewName, setViewName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewName.trim()) {
      setErrorMsg('View name is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg(null);
      await onSubmit({
        name: viewName.trim(),
        filters: activeFilters,
      });
      onClose();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save view.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[420px] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-line bg-slate-50">
          <h2 className="text-[16px] font-bold text-ink">Save Filter View</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-md p-1 border border-line shadow-sm">
            <X size={18} />
          </button>
        </div>

        {errorMsg && (
          <div className="mx-5 mt-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[12px] flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="p-6">
          <form id="save-view-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Preset View Name *</label>
              <input
                type="text"
                value={viewName}
                onChange={(e) => setViewName(e.target.value)}
                placeholder="e.g. Critical Safety Complaints"
                className="w-full h-[38px] px-3 bg-white border border-line rounded-lg text-[13px] text-ink focus:outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 transition-shadow"
                required
              />
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-line bg-slate-50">
          <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white border border-line text-slate-700 text-[13px] font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm" disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" form="save-view-form" className="flex items-center gap-2 px-5 py-2.5 bg-primary-900 text-white text-[13px] font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm disabled:opacity-70" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save View</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
