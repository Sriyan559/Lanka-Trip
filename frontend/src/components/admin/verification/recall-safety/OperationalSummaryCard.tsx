import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { OperationalPanel } from './recallSafetyMock';

// ── Single operational panel ──────────────────────────────────────────────────
interface OperationalSummaryCardProps {
  panel: OperationalPanel;
}

export function OperationalSummaryCard({ panel }: OperationalSummaryCardProps) {
  const isActivityPanel = panel.id === 'recent-activity';

  return (
    <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm h-full flex flex-col">
      {/* Panel header */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-[11px] font-bold text-gray-900 leading-tight">{panel.title}</h4>
        {panel.viewAllLabel && (
          <button className="flex items-center gap-0.5 text-[10px] text-[#7a0023] font-semibold hover:underline flex-shrink-0">
            View All
            <ArrowRight size={10} />
          </button>
        )}
      </div>

      {/* Activity panel special layout */}
      {isActivityPanel ? (
        <div className="flex-grow">
          {panel.rows.length === 0 ? (
            <div className="flex flex-col h-full">
              {/* Always show header */}
              <div className="grid grid-cols-3 gap-1 pb-1.5 mb-1 border-b border-gray-100">
                <span className="text-[9px] font-semibold text-gray-400 uppercase">Activity</span>
                <span className="text-[9px] font-semibold text-gray-400 uppercase">Case</span>
                <span className="text-[9px] font-semibold text-gray-400 uppercase text-right">Time</span>
              </div>
              <div className="flex items-center justify-center flex-grow py-3">
                <span className="text-[10px] text-gray-300 italic">No recent activity</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-3 gap-1 pb-1.5 mb-1 border-b border-gray-100">
                <span className="text-[9px] font-semibold text-gray-400 uppercase">Activity</span>
                <span className="text-[9px] font-semibold text-gray-400 uppercase">Case</span>
                <span className="text-[9px] font-semibold text-gray-400 uppercase text-right">Time</span>
              </div>
              {panel.rows.map((row, i) => (
                <div key={i} className="grid grid-cols-3 gap-1 text-[10px] py-0.5 hover:bg-gray-50 rounded">
                  <span className="text-gray-700 truncate">{row.label}</span>
                  {row.cols.map((c, j) => (
                    <span key={j} className={`text-gray-500 ${j === row.cols.length - 1 ? 'text-right' : ''}`}>{c}</span>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Standard data table panel */
        <div className="flex-grow overflow-hidden">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-gray-100">
                {panel.headers.map((h, i) => (
                  <th key={h} className={`pb-1 font-semibold text-gray-400 uppercase text-[9px] ${i === 0 ? 'text-left' : 'text-right'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {panel.rows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-1 text-gray-700 pr-1 truncate max-w-[110px]">{row.label}</td>
                  {row.cols.map((col, j) => (
                    <td key={j} className={`py-1 text-right font-semibold ${
                      String(col) === '0' || String(col) === '0%' ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
