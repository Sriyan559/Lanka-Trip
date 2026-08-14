import React from 'react';

interface UserIdentity {
  email: string;
  type: string;
  tenant: string;
  scope: string;
  lastLogin: string;
  mfa: boolean;
  status: string;
}

interface PrivilegedAdmin {
  email: string;
  role: string;
  scope: string;
  privilegeLevel: string; // Shows "Full", "High", "Medium", etc.
  lastLogin: string;
  reviewDue: string;
  risk: 'low' | 'medium' | 'high' | 'critical';
  status: string;
}

interface AdministrativeIdentityTableProps {
  administrativeIdentities?: UserIdentity[];
  privilegedAdmins?: PrivilegedAdmin[];
  loading?: boolean;
}

export function AdministrativeIdentityTable({
  administrativeIdentities,
  privilegedAdmins: propPrivilegedAdmins,
  loading = false,
}: AdministrativeIdentityTableProps = {}) {
  const defaultUsers: UserIdentity[] = [
    { email: 'elena.vance@slbeauty.com', type: 'Admin', tenant: 'SL Beauty', scope: 'Platform Admin', lastLogin: 'May 18, 09:08 AM', mfa: true, status: 'Active' },
    { email: 'anuradha@slbeauty.com', type: 'Admin', tenant: 'SL Beauty', scope: 'Business Unit Admin', lastLogin: 'May 18, 08:21 AM', mfa: true, status: 'Active' },
    { email: 'nimal.perera@slbeauty.com', type: 'Admin', tenant: 'SL Beauty', scope: 'Security Admin', lastLogin: 'May 18, 07:56 AM', mfa: true, status: 'Active' },
    { email: 'arun.silva@slbeauty.com', type: 'Admin', tenant: 'SL Beauty', scope: 'Security Admin', lastLogin: 'May 18, 07:38 AM', mfa: true, status: 'Active' },
    { email: 'priya.kumar@slbeauty.com', type: 'Admin', tenant: 'SL Beauty', scope: 'Operations Admin', lastLogin: 'May 18, 07:30 AM', mfa: true, status: 'Active' },
    { email: 'security.team@slbeauty.com', type: 'Admin', tenant: 'SL Beauty', scope: 'Security Team', lastLogin: 'May 18, 07:30 AM', mfa: true, status: 'Active' }
  ];

  const defaultPrivileged: PrivilegedAdmin[] = [
    { email: 'elena.vance@slbeauty.com', role: 'Platform Admin', scope: 'Enterprise Wide', privilegeLevel: 'Full', lastLogin: 'May 18, 09:08 AM', reviewDue: 'Jun 17, 2026', risk: 'low', status: 'Active' },
    { email: 'anuradha@slbeauty.com', role: 'Operations Admin', scope: 'Enterprise Wide', privilegeLevel: 'High', lastLogin: 'May 18, 08:21 AM', reviewDue: 'Jun 17, 2026', risk: 'low', status: 'Active' },
    { email: 'nimal.perera@slbeauty.com', role: 'Security Admin', scope: 'Enterprise Wide', privilegeLevel: 'High', lastLogin: 'May 18, 07:56 AM', reviewDue: 'Jun 17, 2026', risk: 'low', status: 'Active' },
    { email: 'arun.silva@slbeauty.com', role: 'Business Unit Admin', scope: 'SL Beauty', privilegeLevel: 'Medium', lastLogin: 'May 18, 07:38 AM', reviewDue: 'Jun 17, 2026', risk: 'low', status: 'Active' },
    { email: 'security.team@slbeauty.com', role: 'Security Team', scope: 'Security Domain', privilegeLevel: 'High', lastLogin: 'May 18, 07:30 AM', reviewDue: 'Jun 17, 2026', risk: 'low', status: 'Active' }
  ];

  const users = administrativeIdentities && administrativeIdentities.length > 0 ? administrativeIdentities : defaultUsers;
  const privilegedAdmins = propPrivilegedAdmins && propPrivilegedAdmins.length > 0 ? propPrivilegedAdmins : defaultPrivileged;


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      {/* Users & Administrative Identity */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Users & Administrative Identity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">User</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Tenant</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Scope</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">MFA</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 font-bold text-gray-900 truncate max-w-[120px]" title={u.email}>{u.email}</td>
                  <td className="p-2">{u.type}</td>
                  <td className="p-2 truncate">{u.tenant}</td>
                  <td className="p-2 text-gray-900 truncate">{u.scope}</td>
                  <td className="p-2 whitespace-nowrap text-gray-500">{u.lastLogin}</td>
                  <td className="p-2 text-center text-green-600 font-bold">{u.mfa ? 'Yes' : 'No'}</td>
                  <td className="p-2">
                    <span className="text-[9px] font-bold text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Privileged Administrators */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Privileged Administrators</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Administrator</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Platform Role</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Scope</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Last Used</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Review Due</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Risk</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {privilegedAdmins.map((pa, i) => {
                let riskClass = 'text-green-600 bg-green-50 border-green-200';
                if (pa.risk === 'medium') riskClass = 'text-orange-600 bg-orange-50 border-orange-200';
                else if (pa.risk === 'high' || pa.risk === 'critical') riskClass = 'text-red-600 bg-red-50 border-red-200';

                return (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-2 font-bold text-gray-900 truncate max-w-[120px]" title={pa.email}>{pa.email}</td>
                    <td className="p-2 truncate">{pa.role}</td>
                    <td className="p-2 truncate">{pa.scope}</td>
                    <td className="p-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        pa.privilegeLevel === 'Full' ? 'bg-purple-100 text-purple-800' :
                        pa.privilegeLevel === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {pa.privilegeLevel}
                      </span>
                    </td>
                    <td className="p-2 whitespace-nowrap text-gray-500">{pa.lastLogin}</td>
                    <td className="p-2 whitespace-nowrap text-gray-500">{pa.reviewDue}</td>
                    <td className="p-2 text-center">
                      <span className={`text-[8px] font-bold uppercase border px-1.5 py-0.5 rounded ${riskClass}`}>
                        {pa.risk}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className="text-[9px] font-bold text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
                        {pa.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
