import React from 'react';

interface RegistryRow {
  type: string;
  users: string;
  count: number | string;
  privilege: string;
  highRisk: string;
  lastUpdated: string;
}

interface HealthRow {
  dimension: string;
  baseScore: string;
  goodScore: string;
  satisfactoryScore: string;
  needsAttention: string;
  score: number;
  trend: 'up' | 'neutral' | 'down';
}

export function RegistryAndHealthScorecard() {
  const registryData: RegistryRow[] = [
    { type: 'Enterprise User', users: 'admin.user@slbeauty.com', count: '424', privilege: 'User', highRisk: 'Low', lastUpdated: 'Aug 13, 2026 11:45 AM' },
    { type: 'Local EU User', users: 'local.user@slbeauty.com', count: '140', privilege: 'Local Auth', highRisk: 'Low', lastUpdated: 'Aug 13, 2026 11:45 AM' },
    { type: 'SSO User', users: 'sso.user@slbeauty.com', count: '286', privilege: 'SSO Managed', highRisk: 'Low', lastUpdated: 'Aug 13, 2026 11:45 AM' },
    { type: 'Limited Access', users: 'limit.user@slbeauty.com', count: '54', privilege: 'User', highRisk: 'Low', lastUpdated: 'Aug 13, 2026 11:45 AM' },
    { type: 'Contractor', users: 'contractor@slbeauty.com', count: '16', privilege: 'User', highRisk: 'Low', lastUpdated: 'Aug 13, 2026 11:45 AM' },
    { type: 'Service Account', users: 'service.acct@slbeauty.com', count: '22', privilege: 'System', highRisk: 'Low', lastUpdated: 'Aug 13, 2026 11:45 AM' },
    { type: 'Administrative User', users: 'admin.staff@slbeauty.com', count: '24', privilege: 'Admin', highRisk: 'High', lastUpdated: 'Aug 13, 2026 11:45 AM' }
  ];

  const healthData: HealthRow[] = [
    { dimension: 'User Coverage', baseScore: '100%', goodScore: '100%', satisfactoryScore: '100%', needsAttention: '0%', score: 97, trend: 'up' },
    { dimension: 'Administration', baseScore: '100%', goodScore: '100%', satisfactoryScore: '100%', needsAttention: '0%', score: 97, trend: 'up' },
    { dimension: 'Privileged Accounts', baseScore: '100%', goodScore: '95%', satisfactoryScore: '5%', needsAttention: '0%', score: 96, trend: 'up' },
    { dimension: 'MFA Adoption', baseScore: '92%', goodScore: '85%', satisfactoryScore: '10%', needsAttention: '5%', score: 94, trend: 'up' },
    { dimension: 'SSO Coverage', baseScore: '90%', goodScore: '80%', satisfactoryScore: '15%', needsAttention: '5%', score: 93, trend: 'up' },
    { dimension: 'Service Accounts', baseScore: '98%', goodScore: '90%', satisfactoryScore: '8%', needsAttention: '2%', score: 95, trend: 'up' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      {/* 1. User, Account & Identity Registry */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">1. User, Account & Identity Registry</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Users</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Count</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Privilege</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">High Risk</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {registryData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 font-bold text-gray-900">{row.type}</td>
                  <td className="p-2 text-gray-500 truncate max-w-[125px]" title={row.users}>{row.users}</td>
                  <td className="p-2 text-center font-bold text-gray-900">{row.count}</td>
                  <td className="p-2 text-gray-950 font-bold">{row.privilege}</td>
                  <td className="p-2">
                    <span className={`text-[9px] font-bold px-1.5 py-0.25 rounded ${
                      row.highRisk === 'High' ? 'text-red-700 bg-red-50' : 'text-gray-600 bg-gray-50'
                    }`}>
                      {row.highRisk}
                    </span>
                  </td>
                  <td className="p-2 text-gray-400 whitespace-nowrap">{row.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Identity Health Scorecard */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">2. Identity Health Scorecard</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Identity Dimension</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Base Score</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Good Score</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Satisfactory</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center text-red-500">Needs Attn</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Score</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {healthData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 font-bold text-gray-900">{row.dimension}</td>
                  <td className="p-2 text-center text-gray-500">{row.baseScore}</td>
                  <td className="p-2 text-center text-gray-500">{row.goodScore}</td>
                  <td className="p-2 text-center text-gray-500">{row.satisfactoryScore}</td>
                  <td className="p-2 text-center text-red-500 font-bold">{row.needsAttention}</td>
                  <td className="p-2 text-center">
                    <span className="bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded text-[9px] font-bold">
                      {row.score}
                    </span>
                  </td>
                  <td className="p-2 text-center font-bold text-green-600">
                    {row.trend === 'up' ? '↑' : '→'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
