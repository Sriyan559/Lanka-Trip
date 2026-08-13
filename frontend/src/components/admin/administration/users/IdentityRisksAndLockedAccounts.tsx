import React from 'react';
import Link from 'next/link';

interface RiskInsightRow {
  user: string;
  tenant: string;
  ecosystem: string;
  bu: string;
  risk: string;
  membershipType: string;
  primarySecondary: string;
  status: string;
  createdBy: string;
  reviewDate: string;
}

interface LockedDormantRow {
  category: string;
  count: number;
  example: string;
  since: string;
  risk: 'low' | 'medium' | 'high' | 'critical';
  actionLabel: string;
}

export function IdentityRisksAndLockedAccounts() {
  const riskInsights: RiskInsightRow[] = [
    { user: 'Priya Kumar', tenant: 'SL Beauty', ecosystem: 'Marketplace', bu: 'Operations', risk: 'Dormant Privilege', membershipType: 'Owner', primarySecondary: 'Primary', status: 'Active', createdBy: 'Platform Admin', reviewDate: 'Sep 13, 2026' },
    { user: 'Arun Silva', tenant: 'SL Beauty', ecosystem: 'Marketplace', bu: 'Operations', risk: 'Shared Account', membershipType: 'Owner', primarySecondary: 'Primary', status: 'Active', createdBy: 'Platform Admin', reviewDate: 'Sep 13, 2026' },
    { user: 'Saman de Silva', tenant: 'SL Beauty', ecosystem: 'Marketplace', bu: 'Operations', risk: 'Out-of-Policy Access', membershipType: 'Owner', primarySecondary: 'Secondary', status: 'Active', createdBy: 'Security Analyst', reviewDate: 'Sep 11, 2026' }
  ];

  const lockedData: LockedDormantRow[] = [
    { category: 'Locked Accounts', count: 4, example: 'mohan.patel@slbeauty.com', since: '3 days', risk: 'high', actionLabel: 'Unlock' },
    { category: 'Suspended Accounts', count: 8, example: 'navod.silva@slbeauty.com', since: '7 days', risk: 'high', actionLabel: 'Review' },
    { category: 'Dormant Accounts', count: 11, example: 'kumudini.pathirana@slbeauty.com', since: '45 days', risk: 'medium', actionLabel: 'Review' }
  ];

  return (
    <div className="flex flex-col gap-4 mb-4">
      
      {/* 6. Identity Risks (Accounts Review Insights) */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">6. Identity Risks (Accounts Review Insights)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">User</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Tenant</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Ecosystem</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Business Unit</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Risk Type</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Membership</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Primary/Sec</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Created By</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Review Date</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {riskInsights.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 font-bold text-gray-900">{row.user}</td>
                  <td className="p-2 truncate">{row.tenant}</td>
                  <td className="p-2 truncate">{row.ecosystem}</td>
                  <td className="p-2 truncate">{row.bu}</td>
                  <td className="p-2 text-red-600 font-bold">{row.risk}</td>
                  <td className="p-2">{row.membershipType}</td>
                  <td className="p-2 text-gray-500">{row.primarySecondary}</td>
                  <td className="p-2">
                    <span className="text-[9px] font-bold text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
                      {row.status}
                    </span>
                  </td>
                  <td className="p-2 text-gray-500 truncate">{row.createdBy}</td>
                  <td className="p-2 text-gray-500 whitespace-nowrap">{row.reviewDate}</td>
                  <td className="p-2 text-center">
                    <button className="text-[9px] font-bold text-[#741d35] hover:underline" type="button">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 7. Locked, Suspended & Dormant Accounts */}
        <div className="bg-white border border-gray-200 rounded shadow-sm">
          <div className="p-3 border-b border-gray-200">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">7. Locked, Suspended & Dormant Accounts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Count</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Example Account</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Expired / Since</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Risk</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
                {lockedData.map((row, i) => {
                  let rClass = 'text-green-600 bg-green-50 border-green-200';
                  if (row.risk === 'medium') rClass = 'text-orange-600 bg-orange-50 border-orange-200';
                  else if (row.risk === 'high' || row.risk === 'critical') rClass = 'text-red-600 bg-red-50 border-red-200';

                  return (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="p-2.5 font-bold text-gray-900">{row.category}</td>
                      <td className="p-2.5 text-center font-bold text-gray-900">{row.count}</td>
                      <td className="p-2.5 text-gray-500 truncate max-w-[120px]" title={row.example}>{row.example}</td>
                      <td className="p-2.5 text-gray-500 whitespace-nowrap">{row.since}</td>
                      <td className="p-2.5 text-center">
                        <span className={`text-[8px] font-bold uppercase border px-1.5 py-0.5 rounded ${rClass}`}>
                          {row.risk}
                        </span>
                      </td>
                      <td className="p-2.5 text-center">
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

        {/* User Action Toolbar */}
        <div className="bg-white border border-gray-200 rounded p-3.5 shadow-sm flex flex-col justify-center gap-2.5">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">User Identity Management Actions</h3>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded text-[10px] font-bold text-gray-700 shadow-2xs transition-colors">
              Open User Detail
            </button>
            <button type="button" className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded text-[10px] font-bold text-gray-700 shadow-2xs transition-colors">
              Review Memberships
            </button>
            <button type="button" className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded text-[10px] font-bold text-[#741d35] shadow-2xs transition-colors">
              Review Effective Roles
            </button>
            <button type="button" className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded text-[10px] font-bold text-gray-700 shadow-2xs transition-colors">
              Review Authentication
            </button>
            <button type="button" className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded text-[10px] font-bold text-gray-700 shadow-2xs transition-colors">
              Regenerate Access
            </button>
            <button type="button" className="px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded text-[10px] font-bold text-red-600 shadow-2xs transition-colors">
              Suspend Account
            </button>
            <button type="button" className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded text-[10px] font-bold text-gray-700 shadow-2xs transition-colors">
              View Audit History
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
