import React from 'react';

interface TemporaryGrantRow {
  type: string;
  active: number;
  expiring: number;
  expired: number;
  duration: string;
  grantedBy: string;
  status: string;
}

interface MembershipRow {
  type: string;
  total: number;
  human: number;
  service: number;
  status: string;
}

interface CertificationRow {
  type: string;
  overdue: number;
  dueSoon: number;
  completed: number;
  window: string;
  status: string;
}

export function GrantsMembershipsAndCertifications() {
  const grants: TemporaryGrantRow[] = [
    { type: 'System Access', active: 4, expiring: 1, expired: 0, duration: '4.2 Days', grantedBy: 'Platform Admin', status: 'On Track' },
    { type: 'Application Access', active: 3, expiring: 0, expired: 1, duration: '3.1 Days', grantedBy: 'Security Team', status: 'On Track' },
    { type: 'Data Access', active: 1, expiring: 0, expired: 0, duration: '2.0 Days', grantedBy: 'Data Owner', status: 'On Track' },
    { type: 'Elevated Access', active: 0, expiring: 0, expired: 0, duration: '—', grantedBy: '—', status: '—' }
  ];

  const memberships: MembershipRow[] = [
    { type: 'Tenant Memberships', total: 612, human: 428, service: 18, status: 'Active' },
    { type: 'Business Unit Access', total: 286, human: 256, service: 8, status: 'Active' },
    { type: 'Project / Channel Access', total: 154, human: 102, service: 4, status: 'Active' }
  ];

  const certifications: CertificationRow[] = [
    { type: 'Access Certification', overdue: 12, dueSoon: 8, completed: 44, window: 'Sep 01 - Sep 15, 2026', status: 'Needs Attention' },
    { type: 'Privileged Access Review', overdue: 2, dueSoon: 2, completed: 16, window: 'Sep 01 - Sep 15, 2026', status: 'On Track' },
    { type: 'Admin Role Review', overdue: 3, dueSoon: 1, completed: 8, window: 'Sep 15 - Sep 30, 2026', status: 'Needs Attention' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {/* 11. Temporary Access Grants */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">11. Temporary Access Grants</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Access Type</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Active</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Expiring</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Expired</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Avg. Duration</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Granted By</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {grants.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 font-bold text-gray-900">{row.type}</td>
                  <td className="p-2 text-center text-gray-900 font-bold">{row.active}</td>
                  <td className="p-2 text-center text-orange-600 font-bold">{row.expiring}</td>
                  <td className="p-2 text-center text-gray-400">{row.expired}</td>
                  <td className="p-2 font-medium text-gray-700">{row.duration}</td>
                  <td className="p-2 text-gray-500 truncate max-w-[80px]" title={row.grantedBy}>{row.grantedBy}</td>
                  <td className="p-2">
                    {row.status !== '—' ? (
                      <span className="text-[9px] font-bold text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
                        {row.status}
                      </span>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 12. Membership Overview */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">12. Memberships Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Membership Type</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Total</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Human</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Service</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {memberships.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2.5 font-bold text-gray-900">{row.type}</td>
                  <td className="p-2.5 text-center font-bold text-gray-900">{row.total}</td>
                  <td className="p-2.5 text-center text-gray-500">{row.human}</td>
                  <td className="p-2.5 text-center text-gray-400">{row.service}</td>
                  <td className="p-2.5">
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

      {/* 13. Certification & Review */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">13. Certification & Review</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Review Type</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Overdue</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Due Soon</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Comp (30D)</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Next Review Window</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {certifications.map((row, i) => {
                let statusColor = 'text-green-600 bg-green-50 border-green-200';
                if (row.status === 'Needs Attention') {
                  statusColor = 'text-orange-600 bg-orange-50 border-orange-200';
                }

                return (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-2 font-bold text-gray-955 truncate max-w-[100px]" title={row.type}>{row.type}</td>
                    <td className={`p-2 text-center font-bold ${row.overdue > 0 ? 'text-red-600 bg-red-50/50' : 'text-gray-900'}`}>{row.overdue}</td>
                    <td className="p-2 text-center text-orange-600 font-bold">{row.dueSoon}</td>
                    <td className="p-2 text-center text-gray-500">{row.completed}</td>
                    <td className="p-2 text-gray-500 whitespace-nowrap text-[9px]">{row.window}</td>
                    <td className="p-2">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${statusColor}`}>
                        {row.status === 'Needs Attention' ? 'Needs Attention' : 'On Track'}
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
