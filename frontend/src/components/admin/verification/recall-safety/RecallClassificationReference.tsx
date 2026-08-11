import React from 'react';
import { CLASSIFICATION_REFS } from './recallSafetyMock';

export function RecallClassificationReference() {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
          Recall Classification Reference
        </h3>
        <span className="text-[10px] text-gray-400">Quick Reference</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {CLASSIFICATION_REFS.map((ref) => (
          <div
            key={ref.label}
            className={`flex flex-col border rounded-md px-3 py-2 min-w-[130px] flex-1 ${ref.bg} ${ref.border}`}
          >
            <span className={`text-[11px] font-bold ${ref.text} mb-0.5`}>{ref.label}</span>
            <span className="text-[10px] text-gray-500 leading-tight">{ref.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
