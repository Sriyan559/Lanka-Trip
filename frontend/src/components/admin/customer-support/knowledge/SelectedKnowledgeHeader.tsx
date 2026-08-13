'use client';

import React from 'react';
import { Eye, Edit2, Play, History } from 'lucide-react';
import { KnowledgeItem } from '@/types/knowledge';

interface SelectedKnowledgeHeaderProps {
  item: KnowledgeItem;
  onViewFullArticle?: () => void;
  onEdit?: () => void;
  onPreview?: () => void;
  onViewVersionHistory?: () => void;
}

export function SelectedKnowledgeHeader({
  item,
  onViewFullArticle,
  onEdit,
  onPreview,
  onViewVersionHistory,
}: SelectedKnowledgeHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-1">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-sm font-bold text-slate-900">
          Selected Knowledge Item — <span className="text-slate-900 font-extrabold">{item.title}</span>
        </h3>
        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {item.status}
        </span>
        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
          {item.classification}
        </span>
        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold text-[10px]">
          {item.type}
        </span>
        <span className="text-xs font-bold text-emerald-600">
          Knowledge Health: 96/100
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <button
          type="button"
          onClick={onViewFullArticle}
          className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
        >
          View Full Article
        </button>
        <span className="text-slate-300">|</span>
        <button
          type="button"
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
        >
          Edit
        </button>
        <span className="text-slate-300">|</span>
        <button
          type="button"
          onClick={onPreview}
          className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
        >
          Preview
        </button>
        <span className="text-slate-300">|</span>
        <button
          type="button"
          onClick={onViewVersionHistory}
          className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
        >
          View Version History
        </button>
      </div>
    </div>
  );
}
