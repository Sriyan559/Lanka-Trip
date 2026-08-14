import React from 'react';
import Link from 'next/link';
import { IdentityUser } from '@/services/api/administrationService';
import { Edit, ShieldAlert, KeyRound } from 'lucide-react';

interface AuthRow {
  method: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'neutral';
}

interface AuthAndAdministratorsProps {
  users?: IdentityUser[];
  loading?: boolean;
  onEditUser?: (user: IdentityUser) => void;
  onStatusUser?: (user: IdentityUser, status: 'active' | 'suspended' | 'locked') => void;
  onResetPasswordUser?: (user: IdentityUser) => void;
}

export function AuthAndAdministrators({
  users,
  loading = false,
  onEditUser,
  onStatusUser,
  onResetPasswordUser,
}: AuthAndAdministratorsProps = {}) {
  const authData: AuthRow[] = [
    { method: 'MFA (Mandatory)', count: 396, percentage: 92, trend: 'up' },
    { method: 'SSO / SAML / OIDC', count: 286, percentage: 67, trend: 'up' },
    { method: 'Password + MFA', count: 110, percentage: 25, trend: 'up' },
    { method: 'Password Fallback', count: 30, percentage: 7, trend: 'down' },
    { method: 'External Directory / LDAP', count: 22, percentage: 5, trend: 'neutral' }
  ];

  const defaultAdminUsers: IdentityUser[] = [
    { id: 1, name: 'Elena Vance', email: 'elena.vance@slbeauty.com', username: 'elena.vance', role: 'super_admin', displayRole: 'Platform Administrator', businessUnit: 'Enterprise Wide', tenant: 'SL Beauty Enterprise', privilege: 'Full', status: 'active', mfa: true, mfaStatus: 'Enforced', authMethod: 'SAML / SSO', risk: 'Low', lastLogin: 'Aug 14, 2026 11:45 AM', created_at: 'Jul 15, 2026' },
    { id: 2, name: 'Anuradha Perera', email: 'anuradha@slbeauty.com', username: 'anuradha', role: 'admin', displayRole: 'Administrator', businessUnit: 'Enterprise Wide', tenant: 'SL Beauty Enterprise', privilege: 'High', status: 'active', mfa: true, mfaStatus: 'Enforced', authMethod: 'SAML / SSO', risk: 'Low', lastLogin: 'Aug 14, 2026 11:41 AM', created_at: 'Jul 15, 2026' },
    { id: 3, name: 'Nimal Perera', email: 'nimal.perera@slbeauty.com', username: 'nimal.perera', role: 'admin', displayRole: 'Security Admin', businessUnit: 'Enterprise Wide', tenant: 'SL Beauty Enterprise', privilege: 'High', status: 'active', mfa: true, mfaStatus: 'Enforced', authMethod: 'Password + MFA', risk: 'Low', lastLogin: 'Aug 14, 2026 10:16 AM', created_at: 'Jul 15, 2026' }
  ];

  const displayUsers = users && users.length > 0 ? users : defaultAdminUsers;

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

      {/* 4. User & Administrator Accounts */}
      <div className={`bg-white border border-gray-200 rounded shadow-sm lg:col-span-2 ${loading ? 'opacity-70' : ''}`}>
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            4. User & Administrator Directory ({displayUsers.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">User</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Platform Role</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Business Unit</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Privilege</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">MFA</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {displayUsers.map((user) => {
                const isActive = user.status === 'active';
                const isLocked = user.status === 'locked' || user.status === 'suspended';

                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-2 font-bold text-gray-900">
                      <div>
                        <div className="text-gray-900">{user.name}</div>
                        <div className="text-[9px] text-gray-400 font-normal">{user.email}</div>
                      </div>
                    </td>
                    <td className="p-2 truncate max-w-[110px]">{user.displayRole || user.role}</td>
                    <td className="p-2 truncate max-w-[120px]">{user.businessUnit || 'SL Beauty'}</td>
                    <td className="p-2 text-center">
                      <span className={`px-1.5 py-0.25 rounded text-[8px] font-bold ${
                        user.privilege === 'Full' || user.privilege === 'High'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.privilege || 'Standard'}
                      </span>
                    </td>
                    <td className="p-2 text-center font-bold text-green-600">
                      {user.mfa ? 'Yes' : 'No'}
                    </td>
                    <td className="p-2 whitespace-nowrap text-gray-500">{user.lastLogin}</td>
                    <td className="p-2">
                      <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded-full capitalize ${
                        isActive
                          ? 'text-green-600 bg-green-50 border-green-200'
                          : isLocked
                          ? 'text-red-600 bg-red-50 border-red-200'
                          : 'text-amber-600 bg-amber-50 border-amber-200'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-2 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        {onEditUser && (
                          <button
                            type="button"
                            onClick={() => onEditUser(user)}
                            className="p-1 text-gray-500 hover:text-gray-900 rounded hover:bg-gray-100"
                            title="Edit User"
                          >
                            <Edit size={12} />
                          </button>
                        )}
                        {onStatusUser && (
                          <button
                            type="button"
                            onClick={() => onStatusUser(user, isActive ? 'suspended' : 'active')}
                            className={`p-1 rounded hover:bg-gray-100 ${
                              isActive ? 'text-amber-600 hover:text-amber-800' : 'text-green-600 hover:text-green-800'
                            }`}
                            title={isActive ? 'Suspend User' : 'Activate User'}
                          >
                            <ShieldAlert size={12} />
                          </button>
                        )}
                        {onResetPasswordUser && (
                          <button
                            type="button"
                            onClick={() => onResetPasswordUser(user)}
                            className="p-1 text-blue-600 hover:text-blue-800 rounded hover:bg-gray-100"
                            title="Reset Password"
                          >
                            <KeyRound size={12} />
                          </button>
                        )}
                      </div>
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

