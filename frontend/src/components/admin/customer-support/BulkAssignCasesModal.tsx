'use client';

import React, { useState } from 'react';
import { X, AlertCircle, Loader2 } from 'lucide-react';
import type { BulkAssignSupportCasesDto } from '@/types/customerSupport';

interface BulkAssignCasesModalProps {
  isOpen: boolean;
  selectedCaseIds: string[];
  onClose: () => void;
  onSubmit: (dto: BulkAssignSupportCasesDto) => Promise<void>;
}

export function BulkAssignCasesModal({
  isOpen,
  selectedCaseIds,
  onClose,
  onSubmit,
}: BulkAssignCasesModalProps) {
  const [assignedAgentName, setAssignedAgentName] = useState('Amaya Perera');
  const [assignedTeam, setAssignedTeam] = useState('Logistics Support');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCaseIds.length === 0) {
      setErrorMsg('No cases selected for bulk assignment.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg(null);
      await onSubmit({
        caseIds: selectedCaseIds,
        assignedAgentName,
        assignedTeam,
        reason,
      });
      onClose();
    } catch {
      setErrorMsg('Failed to assign cases.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full h-[38px] px-3 bg-white border border-line rounded-lg text-[13px] text-ink focus:outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 transition-shadow";
  const labelClass = "block text-[11px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[480px] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-line bg-slate-50">
          <h2 className="text-[16px] font-bold text-ink">Assign Cases</h2>
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
            Assigning <strong className="text-primary-900">{selectedCaseIds.length}</strong> selected support case(s).
          </p>

          <form id="bulk-assign-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>Assign Agent</label>
              <select
                value={assignedAgentName}
                onChange={(e) => setAssignedAgentName(e.target.value)}
                className={inputClass}
              >
                <option value="Amaya Perera">Amaya Perera</option>
                <option value="Dilan Perera">Dilan Perera</option>
                <option value="Nadeesha Silva">Nadeesha Silva</option>
                <option value="Elena Vance">Elena Vance</option>
                <option value="Unassigned">Unassigned</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Assign Team</label>
              <select
                value={assignedTeam}
                onChange={(e) => setAssignedTeam(e.target.value)}
                className={inputClass}
              >
                <option value="Logistics Support">Logistics Support</option>
                <option value="Finance & Payments">Finance & Payments</option>
                <option value="Safety & Compliance">Safety & Compliance</option>
                <option value="Returns Operations">Returns Operations</option>
                <option value="Quality & Authenticity">Quality & Authenticity</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Reason / Reassignment Note</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Optional reason for assignment change"
                className={inputClass}
              />
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-line bg-slate-50">
          <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white border border-line text-slate-700 text-[13px] font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm" disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" form="bulk-assign-form" className="flex items-center gap-2 px-5 py-2.5 bg-primary-900 text-white text-[13px] font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm disabled:opacity-70" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Assigning...</span>
              </>
            ) : (
              <span>Assign Cases</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
