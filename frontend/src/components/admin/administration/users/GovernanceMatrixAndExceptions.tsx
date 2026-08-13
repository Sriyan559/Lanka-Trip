import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface GateRow {
  gate: string;
  status: string;
}

interface MatrixRow {
  dimension: string;
  high: number;
  medium: number;
  low: number;
}

interface ExceptionRow {
  type: string;
  count: number;
  reviewDate: string;
  owner: string;
  status: string;
}

export function GovernanceMatrixAndExceptions() {
  const gates: GateRow[] = [
    { gate: 'Account Provisioning Gate', status: 'Pass' },
    { gate: 'Privilege Assignment Gate', status: 'Pass' },
    { gate: 'MFA Enforcement Gate', status: 'Pass' },
    { gate: 'Access Review Gate', status: 'Pass' },
    { gate: 'Deprovisioning Gate', status: 'Pass' }
  ];

  const matrix: MatrixRow[] = [
    { dimension: 'High Risk', high: 13, medium: 4, low: 1 },
    { dimension: 'Sensitive Accounts', high: 312, medium: 45, low: 2 },
    { dimension: 'Dormant / Inactive', high: 8, medium: 4, low: 1 }
  ];

  const exceptions: ExceptionRow[] = [
    { type: 'Finance Analyst', count: 2, reviewDate: 'Aug 12, 2026', owner: 'Finance Manager', status: 'Secure' },
    { type: 'Marketing Analyst', count: 1, reviewDate: 'Aug 11, 2026', owner: 'Marketing Lead', status: 'Secure' },
    { type: 'Product Analyst', count: 1, reviewDate: 'Aug 10, 2026', owner: 'Product Manager', status: 'Secure' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {/* Identity Governance Gates */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Identity Governance Gates</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Gate</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {gates.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2.5 font-bold text-gray-900">{row.gate}</td>
                  <td className="p-2.5 text-center flex items-center justify-center gap-1.5 text-green-600 font-bold">
                    <CheckCircle2 size={12} className="text-green-500" />
                    <span>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enterprise Identity Health Matrix */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Identity Health Matrix</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-left pl-3">Dimension</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-red-600 bg-red-50/30">High Priority</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-orange-600 bg-orange-50/30">Medium Priority</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-blue-600 bg-blue-50/30">Low Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {matrix.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2.5 text-left font-bold text-gray-950 pl-3">{row.dimension}</td>
                  <td className="p-2.5 text-red-600 font-bold bg-red-50/10">{row.high}</td>
                  <td className="p-2.5 text-orange-600 font-bold bg-orange-50/10">{row.medium}</td>
                  <td className="p-2.5 text-blue-600 font-bold bg-blue-50/10">{row.low}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 16. Identity Exceptions */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">16. Identity Exceptions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Exception Type</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Count</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Review Date</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {exceptions.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2.5 font-bold text-gray-900">{row.type}</td>
                  <td className="p-2.5 text-center text-gray-900 font-bold">{row.count}</td>
                  <td className="p-2.5 text-gray-500 whitespace-nowrap">{row.reviewDate}</td>
                  <td className="p-2.5 text-gray-500 truncate max-w-[80px]" title={row.owner}>{row.owner}</td>
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
    </div>
  );
}
