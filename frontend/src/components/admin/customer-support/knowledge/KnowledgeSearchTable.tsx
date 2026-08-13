'use client';

import React from 'react';
import { Star, CheckCircle2, MoreVertical, Eye, Edit2, Copy } from 'lucide-react';
import { KnowledgeItem } from '@/types/knowledge';

interface KnowledgeSearchTableProps {
  items: KnowledgeItem[];
  selectedItemId: string;
  onSelectItem: (id: string) => void;
  onViewItem?: (item: KnowledgeItem) => void;
  onEditItem?: (item: KnowledgeItem) => void;
}

export function KnowledgeSearchTable({
  items,
  selectedItemId,
  onSelectItem,
  onViewItem,
  onEditItem,
}: KnowledgeSearchTableProps) {
  const getClassificationBadge = (c: string) => {
    switch (c) {
      case 'Customer Safe':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Agent Safe':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Internal Only':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={11}
            className={star <= count ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-2xs overflow-hidden">
      <div className="px-3 py-2 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold text-slate-900">Knowledge Search Results</h2>
          <span className="text-[11px] text-slate-500 font-normal">(1-6 of 842)</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] border-collapse min-w-[1100px]">
          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
              <th className="py-2 px-2 text-center w-8">
                <input type="checkbox" className="rounded text-[#881337] focus:ring-[#881337]" />
              </th>
              <th className="py-2 px-1 text-center w-6">#</th>
              <th className="py-2 px-2.5">Article Title</th>
              <th className="py-2 px-2">KB ID</th>
              <th className="py-2 px-2">Type</th>
              <th className="py-2 px-2">Use Case / Topic</th>
              <th className="py-2 px-2">Audience</th>
              <th className="py-2 px-2">Content Classification</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2 text-center">Policy Linked</th>
              <th className="py-2 px-2 text-right">Relevance</th>
              <th className="py-2 px-2 text-center">Confidence</th>
              <th className="py-2 px-2">Last Reviewed</th>
              <th className="py-2 px-2">Author</th>
              <th className="py-2 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {items.map((item, idx) => {
              const isSelected = selectedItemId === item.id;
              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectItem(item.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-rose-50/60 font-medium' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-2 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded text-[#881337] focus:ring-[#881337]" />
                  </td>
                  <td className="py-2 px-1 text-center text-slate-400 font-mono text-[10px]">{idx + 1}</td>
                  <td className="py-2 px-2.5 font-bold text-slate-900">{item.title}</td>
                  <td className="py-2 px-2 font-mono text-[10px] text-slate-500">{item.kbId}</td>
                  <td className="py-2 px-2 text-slate-600">{item.type}</td>
                  <td className="py-2 px-2">{item.topic}</td>
                  <td className="py-2 px-2 text-slate-600">{item.audience}</td>
                  <td className="py-2 px-2">
                    <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${getClassificationBadge(item.classification)}`}>
                      {item.classification}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center">
                    {item.policyLinked ? (
                      <CheckCircle2 size={13} className="text-emerald-600 mx-auto" />
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="py-2 px-2 text-right font-bold text-slate-900">{item.relevance}%</td>
                  <td className="py-2 px-2 flex justify-center">{renderStars(item.confidenceStars)}</td>
                  <td className="py-2 px-2 text-slate-500 text-[10px] whitespace-nowrap">{item.lastReviewed}</td>
                  <td className="py-2 px-2 text-slate-700 font-medium">{item.author}</td>
                  <td className="py-2 px-2 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => onViewItem && onViewItem(item)}
                      className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                    >
                      <MoreVertical size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
        <div className="flex items-center gap-1">
          <button type="button" className="px-2 py-0.5 bg-white border border-slate-300 rounded font-semibold text-slate-700 hover:bg-slate-100">&lt;</button>
          <button type="button" className="px-2 py-0.5 bg-[#881337] text-white rounded font-bold">1</button>
          <button type="button" className="px-2 py-0.5 bg-white border border-slate-300 rounded font-semibold text-slate-700 hover:bg-slate-100">2</button>
          <button type="button" className="px-2 py-0.5 bg-white border border-slate-300 rounded font-semibold text-slate-700 hover:bg-slate-100">3</button>
          <button type="button" className="px-2 py-0.5 bg-white border border-slate-300 rounded font-semibold text-slate-700 hover:bg-slate-100">4</button>
          <button type="button" className="px-2 py-0.5 bg-white border border-slate-300 rounded font-semibold text-slate-700 hover:bg-slate-100">5</button>
          <span>...</span>
          <button type="button" className="px-2 py-0.5 bg-white border border-slate-300 rounded font-semibold text-slate-700 hover:bg-slate-100">141</button>
          <button type="button" className="px-2 py-0.5 bg-white border border-slate-300 rounded font-semibold text-slate-700 hover:bg-slate-100">&gt;</button>
        </div>

        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select className="bg-white border border-slate-300 rounded px-1.5 py-0.5 font-bold text-slate-800">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
