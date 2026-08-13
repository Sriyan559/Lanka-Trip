import React from 'react';

interface MfaSsoRow {
  metric: string;
  users: number;
  percentage: number;
  target: number;
  status: string;
}

interface RequestRow {
  type: string;
  pending: number;
  approved: number;
  rejected: number;
  sla: string;
  status: string;
}

interface ReadinessRow {
  area: string;
  score: number;
  required: number;
  passed: number;
  exceptions: number;
  pending: number;
  status: string;
}

export function MfaAccessAndReadiness() {
  const mfaData: MfaSsoRow[] = [
    { metric: 'MFA Adoption', users: 396, percentage: 92, target: 95, status: 'Needs Action' },
    { metric: 'SSO Adoption', users: 286, percentage: 67, target: 70, status: 'Needs Action' },
    { metric: 'Users with MFA + SSO', users: 280, percentage: 65, target: 70, status: 'Needs Action' }
  ];

  const requestData: RequestRow[] = [
    { type: 'Access Requests', pending: 15, approved: 48, rejected: 6, sla: '1.2 Days', status: 'On Track' },
    { type: 'Role Change Requests', pending: 6, approved: 22, rejected: 3, sla: '1.1 Days', status: 'On Track' },
    { type: 'Admin Access Requests', pending: 2, approved: 14, rejected: 1, sla: '0.9 Days', status: 'On Track' }
  ];

  const readinessData: ReadinessRow[] = [
    { area: 'User Access', score: 95, required: 15, passed: 13, exceptions: 2, pending: 0, status: 'Good' },
    { area: 'Privilege Access', score: 90, required: 15, passed: 12, exceptions: 2, pending: 1, status: 'Good' },
    { area: 'Authentication', score: 94, required: 15, passed: 13, exceptions: 1, pending: 1, status: 'Good' },
    { area: 'Session Control', score: 96, required: 15, passed: 13, exceptions: 2, pending: 0, status: 'Good' },
    { area: 'Account Lifecycle', score: 92, required: 15, passed: 11, exceptions: 2, pending: 2, status: 'Good' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      
      {/* 8. MFA & SSO Coverage */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">8. MFA & SSO Coverage</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Metric</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Users</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">% Active</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Target</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {mfaData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 font-bold text-gray-900">{row.metric}</td>
                  <td className="p-2 text-center text-gray-900">{row.users}</td>
                  <td className="p-2 text-center text-gray-900 font-bold">{row.percentage}%</td>
                  <td className="p-2 text-center text-gray-400 font-bold">{row.target}%</td>
                  <td className="p-2">
                    <span className="text-[9px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-1.5 py-0.5 rounded-full">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 9. Access Requests & Approvals */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">9. Access Requests & Approvals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Request Type</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Pending</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Approved (30D)</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Rejected (30D)</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Avg SLA</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {requestData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 font-bold text-gray-955 truncate max-w-[100px]">{row.type}</td>
                  <td className="p-2 text-center text-blue-600 font-bold">{row.pending}</td>
                  <td className="p-2 text-center text-gray-900">{row.approved}</td>
                  <td className="p-2 text-center text-gray-400">{row.rejected}</td>
                  <td className="p-2 font-bold text-gray-800">{row.sla}</td>
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

      {/* 10. Risk Readiness */}
      <div className="bg-white border border-gray-200 rounded shadow-sm flex flex-col justify-between">
        <div>
          <div className="p-3 border-b border-gray-200">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">10. Risk Readiness</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Control Area</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Score</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Req</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Pass</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Excp</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Pend</th>
                  <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
                {readinessData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-2 font-bold text-gray-900 truncate max-w-[85px]">{row.area}</td>
                    <td className="p-2 text-center text-gray-900 font-bold">{row.score}%</td>
                    <td className="p-2 text-center text-gray-400">{row.required}</td>
                    <td className="p-2 text-center text-green-600 font-bold">{row.passed}</td>
                    <td className="p-2 text-center text-orange-600 font-bold">{row.exceptions}</td>
                    <td className="p-2 text-center text-blue-600 font-bold">{row.pending}</td>
                    <td className="p-2 text-green-600 font-bold">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-3 bg-gray-50/60 border-t border-gray-200 flex justify-between items-center text-[10px]">
          <span className="font-bold text-gray-500 uppercase">Overall Readiness Score</span>
          <span className="text-green-600 font-extrabold text-xs">90%</span>
        </div>
      </div>
    </div>
  );
}
