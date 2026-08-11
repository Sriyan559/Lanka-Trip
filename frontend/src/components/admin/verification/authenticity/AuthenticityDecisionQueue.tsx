import React from 'react';

const DEFAULT_DECISIONS = [
  { type: 'Evidence Review',             pending: 0, overdue: 0 },
  { type: 'Packaging Review',            pending: 0, overdue: 0 },
  { type: 'Identifier Review',           pending: 0, overdue: 0 },
  { type: 'Brand Authorization Review',  pending: 0, overdue: 0 },
  { type: 'Restriction Decision',        pending: 0, overdue: 0 },
];

interface AuthenticityDecisionQueueProps {
  data?: { type: string; pending: number; overdue: number }[];
}

export function AuthenticityDecisionQueue({ data = [] }: AuthenticityDecisionQueueProps) {
  const rows = DEFAULT_DECISIONS.map((def) => {
    const live = data.find((d) => d.type === def.type);
    return live ?? def;
  });

  const totalPending = rows.reduce((a, r) => a + r.pending, 0);
  const totalOverdue = rows.reduce((a, r) => a + r.overdue, 0);
  const overdueRate = totalPending > 0 ? ((totalOverdue / totalPending) * 100).toFixed(1) : '0.0';

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm h-full">
      <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide mb-3">Authenticity Decision Queue</h3>
      <table className="w-full text-[11px]">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-1.5 text-left text-[10px] font-semibold text-gray-500 pr-2">Decision Type</th>
            <th className="pb-1.5 text-right text-[10px] font-semibold text-gray-500 w-16">Pending</th>
            <th className="pb-1.5 text-right text-[10px] font-semibold text-gray-500 w-16">Overdue</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.type} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="py-1.5 text-gray-700 pr-2">{row.type}</td>
              <td className="py-1.5 text-right font-semibold text-gray-900">{row.pending}</td>
              <td className={`py-1.5 text-right font-bold ${row.overdue > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                {row.overdue}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200">
            <td className="pt-2 font-bold text-gray-900">Total</td>
            <td className="pt-2 text-right font-bold text-gray-900">{totalPending}</td>
            <td className="pt-2 text-right font-bold text-red-600">{totalOverdue}</td>
          </tr>
          <tr>
            <td colSpan={3} className="pt-1 text-right text-[10px] text-gray-400">
              Overdue Rate: <span className="font-bold text-red-600">{overdueRate}%</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
