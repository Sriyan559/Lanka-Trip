import React from 'react';

interface HighRiskRow {
  type: string;
  count: number;
  due: string;
  position: number;
  status: string;
}

interface RiskRow {
  type: string;
  affected: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  trend: 'up' | 'down' | 'neutral';
  owner: string;
  status: string;
  actionLabel: string;
}

interface ActivityEvent {
  timestamp: string;
  description: string;
}

export function RiskReviewsAndSessions() {
  const highRisks: HighRiskRow[] = [
    { type: 'Excessive Access', count: 24, due: 'Sep 13, 2026', position: 44, status: 'Open' },
    { type: 'Elevated Access', count: 7, due: 'Sep 12, 2026', position: 12, status: 'Open' },
    { type: 'Product Analyst', count: 3, due: 'Sep 10, 2026', position: 6, status: 'Open' }
  ];

  const risks: RiskRow[] = [
    { type: 'Dormant High Privilege Accounts', affected: 7, severity: 'high', trend: 'up', owner: 'Security Team', status: 'Open', actionLabel: 'Investigate' },
    { type: 'Excessive High Privilege', affected: 2, severity: 'high', trend: 'up', owner: 'Security Team', status: 'Open', actionLabel: 'Review' },
    { type: 'Out-of-Policy Access', affected: 4, severity: 'medium', trend: 'neutral', owner: 'Compliance', status: 'Open', actionLabel: 'Review' },
    { type: 'Unmanaged Directory Conflict', affected: 3, severity: 'low', trend: 'down', owner: 'Identity Team', status: 'Open', actionLabel: 'Resolve' }
  ];

  const activities: ActivityEvent[] = [
    { timestamp: 'Aug 13, 11:32 AM', description: 'Priya Kumar logged in via SSO' },
    { timestamp: 'Aug 13, 10:52 AM', description: 'MFA authentication completed for Nimal De Silva' },
    { timestamp: 'Aug 13, 10:16 AM', description: 'New user invitation sent to anuradha.j@slbeauty.com' },
    { timestamp: 'Aug 13, 09:41 AM', description: 'Dormant finance user reactivated' },
    { timestamp: 'Aug 13, 09:05 AM', description: 'Directory sync completed successfully' }
  ];

  return (
    <div className="flex flex-col gap-4 mb-4">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Divergent & High Risk Identity Reviews */}
        <div className="bg-white border border-gray-200 rounded shadow-sm lg:col-span-1">
          <div className="p-3 border-b border-gray-200">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Divergent & High Risk Reviews</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Review Type</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Count</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Nearest Due</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Review Pos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
                {highRisks.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-2.5 font-bold text-gray-900 truncate max-w-[90px]">{row.type}</td>
                    <td className="p-2.5 text-center text-red-600 font-bold">{row.count}</td>
                    <td className="p-2.5 text-gray-500 whitespace-nowrap">{row.due}</td>
                    <td className="p-2.5 text-center text-gray-550">{row.status}</td>
                    <td className="p-2.5 text-center">
                      <button type="button" className="px-2 py-0.5 text-[9px] font-bold text-[#741d35] border border-[#741d35]/25 hover:bg-red-50/50 rounded shadow-2xs">
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 18. Identity Risks */}
        <div className="bg-white border border-gray-200 rounded shadow-sm lg:col-span-2">
          <div className="p-3 border-b border-gray-200">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">18. Identity Risks</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Risk Type</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Affected</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Trend</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Owner</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
                {risks.map((row, i) => {
                  let rClass = 'text-green-600 bg-green-50 border-green-200';
                  if (row.severity === 'medium') rClass = 'text-orange-600 bg-orange-50 border-orange-200';
                  else if (row.severity === 'high' || row.severity === 'critical') rClass = 'text-red-600 bg-red-50 border-red-200';

                  return (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="p-2 font-bold text-gray-900">{row.type}</td>
                      <td className="p-2 text-center text-gray-900 font-bold">{row.affected}</td>
                      <td className="p-2">
                        <span className={`text-[8px] font-bold uppercase border px-1.5 py-0.5 rounded ${rClass}`}>
                          {row.severity}
                        </span>
                      </td>
                      <td className="p-2 text-center font-bold text-gray-900">
                        {row.trend === 'up' ? (
                          <span className="text-red-500">↑</span>
                        ) : row.trend === 'down' ? (
                          <span className="text-green-500">↓</span>
                        ) : (
                          <span className="text-gray-400">→</span>
                        )}
                      </td>
                      <td className="p-2 text-gray-500 truncate max-w-[80px]" title={row.owner}>{row.owner}</td>
                      <td className="p-2 text-center text-gray-600">{row.status}</td>
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          className="px-2 py-0.5 text-[9px] font-bold text-gray-700 border border-gray-200 hover:bg-gray-50 rounded transition-colors shadow-2xs"
                        >
                          {row.actionLabel}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 19. Active Sessions */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-sm lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="border-b border-gray-200 pb-2 mb-2">
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">19. Active Sessions</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-[10px] font-semibold text-gray-700">
              {/* Active group */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-50 pb-0.5">Active Sessions</span>
                <div className="flex justify-between items-center">
                  <span>Total</span>
                  <strong className="text-gray-900">180</strong>
                </div>
                <div className="flex justify-between items-center text-gray-550 pl-1">
                  <span>User Sessions</span>
                  <strong>120</strong>
                </div>
                <div className="flex justify-between items-center text-gray-550 pl-1">
                  <span>Admin Sessions</span>
                  <strong>32</strong>
                </div>
                <div className="flex justify-between items-center text-gray-550 pl-1">
                  <span>API Sessions</span>
                  <strong>22</strong>
                </div>
                <div className="flex justify-between items-center text-gray-550 pl-1">
                  <span>Service Sessions</span>
                  <strong>6</strong>
                </div>
              </div>

              {/* Privileged group */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-50 pb-0.5">Privileged Sessions</span>
                <div className="flex justify-between items-center text-red-600">
                  <span>Privileged</span>
                  <strong>12</strong>
                </div>
                <div className="flex justify-between items-center text-gray-550 pl-1">
                  <span>Admin</span>
                  <strong>8</strong>
                </div>
                <div className="flex justify-between items-center text-gray-550 pl-1">
                  <span>Elevated</span>
                  <strong>3</strong>
                </div>
                <div className="flex justify-between items-center text-gray-550 pl-1">
                  <span>Service Account</span>
                  <strong>1</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent User & Identity Activity */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="border-b border-gray-200 pb-2 mb-2">
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Recent User & Identity Activity</h2>
            </div>
            
            <div className="flex flex-col gap-2">
              {activities.map((act, i) => (
                <div key={i} className="flex justify-between items-center text-[10px] font-semibold py-1 border-b border-gray-50 last:border-0">
                  <span className="text-gray-900">{act.description}</span>
                  <span className="text-gray-400 whitespace-nowrap ml-4">{act.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-right">
            <button className="text-[10px] font-bold text-[#741d35] hover:underline" type="button">
              View All Activity →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
