import React from 'react';
import Link from 'next/link';

interface AuthRow {
  method: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'neutral';
}

interface AdminRow {
  userRef: string;
  email: string;
  role: string;
  scope: string;
  privilege: string;
  prodActivity: string;
  mfa: boolean;
  lastLogin: string;
  reviewDue: string;
  status: string;
}

export function AuthAndAdministrators() {
  const authData: AuthRow[] = [
    { method: 'MFA (Mandatory)', count: 396, percentage: 92, trend: 'up' },
    { method: 'SSO / SAML / OIDC', count: 286, percentage: 67, trend: 'up' },
    { method: 'Password + MFA', count: 110, percentage: 25, trend: 'up' },
    { method: 'Password Fallback', count: 30, percentage: 7, trend: 'down' },
    { method: 'External Directory / LDAP', count: 22, percentage: 5, trend: 'neutral' }
  ];

  const adminData: AdminRow[] = [
    { userRef: 'USER-2026-00001', email: 'elena.vance@slbeauty.com', role: 'Platform Admin', scope: 'Enterprise Wide', privilege: 'High', prodActivity: 'Verified', mfa: true, lastLogin: 'Aug 13, 11:45 AM', reviewDue: 'Sep 01, 2026', status: 'Secure' },
    { userRef: 'USER-2026-00002', email: 'anuradha@slbeauty.com', role: 'Operations Admin', scope: 'Enterprise Wide', privilege: 'High', prodActivity: 'Verified', mfa: true, lastLogin: 'Aug 13, 11:41 AM', reviewDue: 'Sep 01, 2026', status: 'Secure' },
    { userRef: 'USER-2026-00003', email: 'nimal.perera@slbeauty.com', role: 'Security Admin', scope: 'Enterprise Wide', privilege: 'High', prodActivity: 'Verified', mfa: true, lastLogin: 'Aug 13, 10:16 AM', reviewDue: 'Sep 01, 2026', status: 'Secure' },
    { userRef: 'USER-2026-00004', email: 'arun.silva@slbeauty.com', role: 'Functional Admin', scope: 'SL Beauty', privilege: 'Medium', prodActivity: 'Verified', mfa: true, lastLogin: 'Aug 13, 10:16 AM', reviewDue: 'Sep 01, 2026', status: 'Secure' },
    { userRef: 'USER-2026-00005', email: 'security.team@slbeauty.com', role: 'IT Ops Admin', scope: 'Security Domain', privilege: 'High', prodActivity: 'Verified', mfa: true, lastLogin: 'Aug 13, 10:15 AM', reviewDue: 'Sep 01, 2026', status: 'Secure' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      {/* 3. Authentication */}
      <div className="bg-white border border-gray-200 rounded shadow-sm lg:col-span-1 flex flex-col justify-between">
        <div>
          <div className="p-3 border-b border-gray-200">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">3. Authentication</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center"># Users</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">% Users</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
                {authData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-2 font-bold text-gray-900">{row.method}</td>
                    <td className="p-2 text-center text-gray-900">{row.count}</td>
                    <td className="p-2 text-center text-gray-900 font-bold">{row.percentage}%</td>
                    <td className="p-2 text-center font-bold">
                      {row.trend === 'up' ? (
                        <span className="text-green-600">↑</span>
                      ) : row.trend === 'down' ? (
                        <span className="text-red-500">↓</span>
                      ) : (
                        <span className="text-gray-400">→</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-3 bg-gray-50/60 border-t border-gray-200 flex justify-between items-center text-[10px]">
          <span className="font-bold text-gray-500 uppercase">MFA Effectiveness Rate</span>
          <span className="text-green-600 font-extrabold text-xs">98%</span>
        </div>
      </div>

      {/* 4. Administrators */}
      <div className="bg-white border border-gray-200 rounded shadow-sm lg:col-span-2">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">4. Administrators</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Admin User</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Platform Role</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Scope</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Privilege</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Prod Activity</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">MFA</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Review Due</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {adminData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 font-bold text-gray-900">
                    <Link
                      href={`/admin/administration/users/${row.userRef}`}
                      className="text-[#741d35] hover:underline"
                    >
                      {row.email}
                    </Link>
                  </td>
                  <td className="p-2 truncate">{row.role}</td>
                  <td className="p-2 truncate">{row.scope}</td>
                  <td className="p-2 text-center">
                    <span className={`px-1.5 py-0.25 rounded text-[8px] font-bold ${
                      row.privilege === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {row.privilege}
                    </span>
                  </td>
                  <td className="p-2 text-green-600 font-bold flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-green-500"></span>
                    {row.prodActivity}
                  </td>
                  <td className="p-2 text-center text-green-600 font-bold">{row.mfa ? 'Yes' : 'No'}</td>
                  <td className="p-2 whitespace-nowrap text-gray-500">{row.lastLogin}</td>
                  <td className="p-2 whitespace-nowrap text-gray-500">{row.reviewDue}</td>
                  <td className="p-2">
                    <span className="text-[9px] font-bold text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
                      {row.status}
                    </span>
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
