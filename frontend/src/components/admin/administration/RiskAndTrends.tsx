import React from 'react';
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

interface RiskRow {
  domain: string;
  low: number;
  medium: number;
  high: number;
  critical: number;
}

export function RiskAndTrends() {
  const risks: RiskRow[] = [
    { domain: 'Identity & Access', low: 8, medium: 5, high: 2, critical: 0 },
    { domain: 'Configuration', low: 6, medium: 3, high: 1, critical: 0 },
    { domain: 'Security', low: 7, medium: 2, high: 1, critical: 0 },
    { domain: 'Workflow', low: 6, medium: 1, high: 1, critical: 0 },
    { domain: 'Data Governance', low: 7, medium: 2, high: 1, critical: 0 },
    { domain: 'Operational', low: 2, medium: 5, high: 1, critical: 0 }
  ];

  // Helper to calculate total for a row
  const rowTotal = (r: RiskRow) => r.low + r.medium + r.high + r.critical;

  // Generate 30 days of mock trend data (May 1st to May 30th)
  const healthData = Array.from({ length: 30 }, (_, i) => {
    // Generate scores oscillating between 93 and 98, ending at 96
    const baseScores = [94, 95, 93, 94, 96, 95, 95, 96, 97, 96, 95, 94, 93, 95, 96, 97, 98, 97, 96, 95, 94, 95, 96, 97, 96, 95, 97, 98, 97, 96];
    const date = new Date(2026, 4, i + 1);
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
      score: baseScores[i] || 96
    };
  });

  const changesData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2026, 4, i + 1);
    // Generating consistent change patterns
    const total = 10 + Math.floor(Math.sin(i / 2) * 5) + Math.floor(Math.cos(i / 5) * 5) + (i % 3) * 2 + 15;
    const failed = i % 8 === 0 ? 2 : i % 11 === 0 ? 1 : 0;
    const successful = total - failed;
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
      'Total Changes': total,
      'Successful': successful,
      'Failed': failed
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      {/* 1. Administration Risk Portfolio */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Administration Risk Portfolio</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-left pl-3">Risk Level</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-green-700 bg-green-50/50">Low</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-orange-700 bg-orange-50/50">Medium</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-red-700 bg-red-50/50">High</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-red-900 bg-red-100/50">Critical</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {risks.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2.5 text-left font-bold text-gray-950 pl-3">{r.domain}</td>
                  <td className="p-2.5 font-bold text-green-700 bg-green-50/30">{r.low}</td>
                  <td className="p-2.5 font-bold text-orange-700 bg-orange-50/30">{r.medium}</td>
                  <td className="p-2.5 font-bold text-red-600 bg-red-50/30">{r.high}</td>
                  <td className="p-2.5 font-bold text-red-900 bg-red-100/20">{r.critical || '0'}</td>
                  <td className="p-2.5 font-bold text-gray-900 bg-gray-50/40">{rowTotal(r)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Administration Health Trend */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Health Trend (30 Days)</h2>
            <span className="text-[11px] font-extrabold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
              Current: 96
            </span>
          </div>
          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={healthData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <YAxis domain={[90, 100]} tick={{ fontSize: 9, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px' }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 2, fill: '#10b981', strokeWidth: 0 }}
                  name="Health Score"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Administration Changes Trend */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm flex flex-col justify-between">
        <div>
          <div className="border-b border-gray-200 pb-2 mb-2">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Changes Trend (30 Days)</h2>
          </div>
          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={changesData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px' }} />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '9px', paddingTop: '4px' }} />
                <Line type="monotone" dataKey="Total Changes" stroke="#2563eb" strokeWidth={1.5} dot={{ r: 0 }} />
                <Line type="monotone" dataKey="Successful" stroke="#10b981" strokeWidth={1.5} dot={{ r: 0 }} />
                <Line type="monotone" dataKey="Failed" stroke="#ef4444" strokeWidth={1.5} dot={{ r: 0 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
