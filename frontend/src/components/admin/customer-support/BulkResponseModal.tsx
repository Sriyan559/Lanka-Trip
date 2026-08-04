'use client';

import React, { useState } from 'react';
import { X, AlertCircle, Loader2 } from 'lucide-react';
import type { BulkResponseDto } from '@/types/customerSupport';

interface BulkResponseModalProps {
  isOpen: boolean;
  selectedCaseIds: string[];
  onClose: () => void;
  onSubmit: (dto: BulkResponseDto) => Promise<void>;
}

export function BulkResponseModal({
  isOpen,
  selectedCaseIds,
  onClose,
  onSubmit,
}: BulkResponseModalProps) {
  const [template, setTemplate] = useState('status-update');
  const [message, setMessage] = useState(
    'Thank you for contacting SL Beauty Support. Your case is currently under review by our operations team, and we will update you within 4 hours.'
  );
  const [internalNote, setInternalNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTemplateChange = (val: string) => {
    setTemplate(val);
    if (val === 'status-update') {
      setMessage(
        'Thank you for contacting SL Beauty Support. Your case is currently under review by our operations team, and we will update you within 4 hours.'
      );
    } else if (val === 'logistics-delay') {
      setMessage(
        'We sincerely apologize for the delay in dispatching your package. We have contacted our logistics partner to expedite your delivery.'
      );
    } else if (val === 'refund-acknowledgement') {
      setMessage(
        'Your refund request has been received and escalated to our Finance team for verification. Please allow 1-2 business days for processing.'
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMsg('Response message cannot be empty.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg(null);
      await onSubmit({
        caseIds: selectedCaseIds,
        templateId: template,
        message: message.trim(),
        internalNote: internalNote.trim() || undefined,
      });
      onClose();
    } catch {
      setErrorMsg('Failed to send bulk response.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full h-[38px] px-3 bg-white border border-line rounded-lg text-[13px] text-ink focus:outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 transition-shadow";
  const labelClass = "block text-[11px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[560px] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-line bg-slate-50">
          <h2 className="text-[16px] font-bold text-ink">Send Bulk Response</h2>
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
          <p className="text-[13px] text-slate-600 mb-5">
            Sending batch response to <strong className="text-primary-900">{selectedCaseIds.length}</strong> customer support case(s).
          </p>

          <form id="bulk-response-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>Response Template</label>
              <select
                value={template}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className={inputClass}
              >
                <option value="status-update">General Status Update</option>
                <option value="logistics-delay">Logistics Delay Notification</option>
                <option value="refund-acknowledgement">Refund Request Acknowledgement</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Customer Message *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full min-h-[100px] p-3 bg-white border border-line rounded-lg text-[13px] text-ink focus:outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 transition-shadow resize-y"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Internal Operations Note</label>
              <input
                type="text"
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Optional internal note for audit trail"
                className={inputClass}
              />
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-line bg-slate-50">
          <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white border border-line text-slate-700 text-[13px] font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm" disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" form="bulk-response-form" className="flex items-center gap-2 px-5 py-2.5 bg-primary-900 text-white text-[13px] font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm disabled:opacity-70" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <span>Send Response</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
