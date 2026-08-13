import React from 'react';

interface HealthDomain {
  domain: string;
  score: number;
  openIssues: number;
  critical: number;
  warning: number;
  pending: number;
  owner: string;
  trend: 'up' | 'neutral' | 'down';
  status: string;
}

export function AdministrationHealthOverview() {
  const domains: HealthDomain[] = [
    { domain: 'Identity & Users', score: 98, openIssues: 3, critical: 0, warning: 2, pending: 1, owner: 'Elena Vance', trend: 'up', status: 'Excellent' },
    { domain: 'Roles & Permissions', score: 97, openIssues: 4, critical: 1, warning: 2, pending: 1, owner: 'Priya Kumar', trend: 'up', status: 'Excellent' },
    { domain: 'Tenants & Organization', score: 98, openIssues: 3, critical: 0, warning: 2, pending: 1, owner: 'Arun Silva', trend: 'up', status: 'Excellent' },
    { domain: 'Platform Configuration', score: 97, openIssues: 6, critical: 2, warning: 2, pending: 2, owner: 'Riyaad Nawar', trend: 'up', status: 'Excellent' },
    { domain: 'Localization', score: 96, openIssues: 2, critical: 0, warning: 2, pending: 0, owner: 'Enya Nawar', trend: 'neutral', status: 'Excellent' },
    { domain: 'Communications', score: 94, openIssues: 3, critical: 1, warning: 2, pending: 0, owner: 'Gihan Silva', trend: 'up', status: 'Good' },
    { domain: 'Security & Authentication', score: 96, openIssues: 4, critical: 1, warning: 2, pending: 1, owner: 'Security Team', trend: 'neutral', status: 'Excellent' },
    { domain: 'Workflows & Approvals', score: 93, openIssues: 3, critical: 1, warning: 1, pending: 1, owner: 'Priya Kumar', trend: 'up', status: 'Good' },
    { domain: 'Data Governance', score: 95, openIssues: 5, critical: 1, warning: 4, pending: 0, owner: 'Arun Silva', trend: 'up', status: 'Excellent' },
    { domain: 'Maintenance & Jobs', score: 94, openIssues: 7, critical: 1, warning: 6, pending: 0, owner: 'Nimal Perera', trend: 'up', status: 'Good' },
    { domain: 'Audit', score: 98, openIssues: 1, critical: 0, warning: 1, pending: 0, owner: 'Security Team', trend: 'up', status: 'Excellent' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded shadow-sm mb-4">
      <div className="p-3 border-b border-gray-200">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Administration Health Overview</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Domain</th>
              <th className="p-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Health Score</th>
              <th className="p-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Open Issues</th>
              <th className="p-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center text-red-600">Critical</th>
              <th className="p-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center text-orange-600">Warning</th>
              <th className="p-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center text-blue-600">Pending</th>
              <th className="p-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="p-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Trend</th>
              <th className="p-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-150 text-[11px] font-semibold text-gray-700">
            {domains.map((d, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="p-2.5 font-bold text-gray-900">{d.domain}</td>
                <td className="p-2.5 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    d.score >= 95 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-700 border border-orange-200'
                  }`}>
                    {d.score}
                  </span>
                </td>
                <td className="p-2.5 text-center font-bold text-gray-950">{d.openIssues}</td>
                <td className="p-2.5 text-center font-bold text-red-600">{d.critical || '0'}</td>
                <td className="p-2.5 text-center font-bold text-orange-600">{d.warning || '0'}</td>
                <td className="p-2.5 text-center font-bold text-blue-600">{d.pending || '0'}</td>
                <td className="p-2.5 text-gray-900">{d.owner}</td>
                <td className="p-2.5 text-center font-bold text-green-600">
                  {d.trend === 'up' ? '↑' : '→'}
                </td>
                <td className="p-2.5">
                  <span className={`text-[10px] font-bold ${
                    d.status === 'Excellent' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
