'use client';

import React from 'react';
import { Plus, ShieldCheck, ChevronDown, BookOpen } from 'lucide-react';

interface KnowledgeHeaderProps {
  onSourceKnowledgeAudit?: () => void;
  onCreateArticle?: () => void;
  onCreatePlaybook?: () => void;
  onMoreActions?: () => void;
}

export function KnowledgeHeader({
  onSourceKnowledgeAudit,
  onCreateArticle,
  onCreatePlaybook,
  onMoreActions,
}: KnowledgeHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-2 border-b border-slate-200">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
          <span>Customer Support</span>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">Knowledge &amp; Agent Assistance</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          CS11 — Knowledge Base, Agent Assistance &amp; Guided Resolution
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
          Source trusted knowledge, guide agents with AI assistance and playbooks, and resolve customer issues faster with confidence and consistency.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onSourceKnowledgeAudit}
          className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <Plus size={14} className="text-slate-500" />
          Source Knowledge Audit
        </button>

        <button
          type="button"
          onClick={onCreateArticle}
          className="px-3 py-1.5 bg-[#881337] hover:bg-[#70102e] text-white text-xs font-semibold rounded transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <Plus size={14} />
          Create Knowledge Article
        </button>

        <button
          type="button"
          onClick={onCreatePlaybook}
          className="px-3 py-1.5 bg-[#881337] hover:bg-[#70102e] text-white text-xs font-semibold rounded transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <Plus size={14} />
          Create Resolution Playbook
        </button>

        <button
          type="button"
          onClick={onMoreActions}
          className="px-2.5 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1"
        >
          More Actions
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
