'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Plus, Send, MoreVertical } from 'lucide-react';

interface CaseDetailHeaderProps {
  caseReference: string;
  subject: string;
  returnToUrl: string;
  onOpenAddNote: () => void;
  onOpenSendUpdate: () => void;
  onOpenMoreActions: () => void;
}

export function CaseDetailHeader({
  caseReference,
  subject,
  returnToUrl,
  onOpenAddNote,
  onOpenSendUpdate,
  onOpenMoreActions,
}: CaseDetailHeaderProps) {
  return (
    <div className="p-6 pb-0">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">
        <Link href="/admin/customer-support/cases" className="hover:text-primary-900 transition-colors">
          Customer Support
        </Link>
        <ChevronRight size={12} />
        <Link href={returnToUrl} className="hover:text-primary-900 transition-colors">
          Support Operations
        </Link>
        <ChevronRight size={12} />
        <span className="text-primary-900">{caseReference}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-ink">{subject}</h1>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-line text-slate-700 text-[13px] font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            onClick={onOpenAddNote}
          >
            <Plus size={15} />
            <span>Add Note</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 bg-primary-900 text-white text-[13px] font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm"
            onClick={onOpenSendUpdate}
          >
            <Send size={15} />
            <span>Send Customer Update</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 bg-white border border-line text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            onClick={onOpenMoreActions}
            aria-label="More actions"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
