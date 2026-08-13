'use client';

import React, { useState } from 'react';
import {
  Store,
  Headphones,
  BookOpen,
  FileText,
  Shield,
  Users,
  MessageSquare,
  ThumbsUp,
} from 'lucide-react';

export function KnowledgeSourceContextBar() {
  const [activeSource, setActiveSource] = useState('marketplace');

  const sources = [
    { id: 'marketplace', label: 'SL Beauty Marketplace', icon: Store },
    { id: 'servicedesk', label: 'Service Desk & Cases', icon: Headphones },
    { id: 'kb', label: 'KB Articles', icon: BookOpen },
    { id: 'docs', label: 'Internal Documents', icon: FileText },
    { id: 'policy', label: 'Policy Center', icon: Shield },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'conversations', label: 'Conversations', icon: MessageSquare },
    { id: 'feedback', label: 'Customer Feedback', icon: ThumbsUp },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs text-[11px] flex flex-wrap items-center justify-between gap-2 text-slate-700">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold text-slate-900 text-xs">Source / Context:</span>
        <div className="flex flex-wrap items-center gap-1">
          {sources.map((s) => {
            const IconComponent = s.icon;
            const isSelected = activeSource === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSource(s.id)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors text-[11px] font-medium border ${
                  isSelected
                    ? 'bg-slate-100 border-slate-300 text-slate-900 font-bold'
                    : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200'
                }`}
              >
                <IconComponent size={13} className={isSelected ? 'text-[#881337]' : 'text-slate-400'} />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 text-[10px] text-slate-500 border-l border-slate-200 pl-3">
        <div>
          <span className="block text-slate-400 font-medium">KB Last Updated</span>
          <span className="font-bold text-slate-800">Jul 12, 2025 10:41 AM PT</span>
        </div>
        <div>
          <span className="block text-slate-400 font-medium">Data Coverage</span>
          <span className="font-bold text-slate-800">All Channels</span>
        </div>
      </div>
    </div>
  );
}
