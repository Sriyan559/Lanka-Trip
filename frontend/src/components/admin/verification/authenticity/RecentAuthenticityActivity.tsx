import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ActivityItem {
  id?: string;
  activity: string;
  by: string;
  time: string;
  type?: 'counterfeit' | 'unauthorized' | 'packaging' | 'identifier' | 'duplicate' | 'general';
}

const TYPE_DOT: Record<string, string> = {
  counterfeit:  'bg-red-500',
  unauthorized: 'bg-orange-500',
  packaging:    'bg-amber-500',
  identifier:   'bg-purple-500',
  duplicate:    'bg-blue-500',
  general:      'bg-gray-400',
};

interface RecentAuthenticityActivityProps {
  data?: ActivityItem[];
}

export function RecentAuthenticityActivity({ data = [] }: RecentAuthenticityActivityProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
          Recent Authenticity &amp; Counterfeit Activity
        </h3>
        <button className="flex items-center gap-1 text-[10px] text-[#7a0023] font-semibold hover:underline">
          View all activity
          <ArrowRight size={11} />
        </button>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col">
          {/* Table header always visible even when empty */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 pb-1.5 mb-1.5 border-b border-gray-200">
            <span className="text-[10px] font-semibold text-gray-500 uppercase">Activity</span>
            <span className="text-[10px] font-semibold text-gray-500 uppercase w-20 text-center">By</span>
            <span className="text-[10px] font-semibold text-gray-500 uppercase w-20 text-right">Time</span>
          </div>
          <div className="py-8 text-center">
            <span className="text-[11px] text-gray-300 italic">No recent activity</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 pb-1.5 mb-1.5 border-b border-gray-200">
            <span className="text-[10px] font-semibold text-gray-500 uppercase">Activity</span>
            <span className="text-[10px] font-semibold text-gray-500 uppercase w-20 text-center">By</span>
            <span className="text-[10px] font-semibold text-gray-500 uppercase w-20 text-right">Time</span>
          </div>
          <div className="flex flex-col divide-y divide-gray-50">
            {data.map((item, idx) => {
              const dotClass = TYPE_DOT[item.type ?? 'general'];
              return (
                <div key={item.id ?? idx} className="grid grid-cols-[1fr_auto_auto] gap-2 py-1.5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-1.5 min-w-0">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${dotClass}`} />
                    <span className="text-[11px] text-gray-700 leading-snug truncate">{item.activity}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 w-20 text-center truncate">{item.by}</span>
                  <span className="text-[10px] text-gray-400 w-20 text-right whitespace-nowrap">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
