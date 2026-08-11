import React from 'react';

const DEFAULT_ACTIONS = [
  { type: 'Request Supplier Action',  open: 0, completed: 0 },
  { type: 'Correct Packaging',         open: 0, completed: 0 },
  { type: 'Revalidate Identifiers',    open: 0, completed: 0 },
  { type: 'Remove Duplicate Listings', open: 0, completed: 0 },
  { type: 'Reauthorization',           open: 0, completed: 0 },
];

interface CorrectiveActionsRevalidationProps {
  data?: { type: string; open: number; completed: number }[];
}

export function CorrectiveActionsRevalidation({ data = [] }: CorrectiveActionsRevalidationProps) {
  const rows = DEFAULT_ACTIONS.map((def) => {
    const live = data.find((d) => d.type === def.type);
    return live ?? def;
  });

  const totalOpen = rows.reduce((a, r) => a + r.open, 0);
  const totalCompleted = rows.reduce((a, r) => a + r.completed, 0);
  const totalAll = totalOpen + totalCompleted;
  const completionPct = totalAll > 0 ? ((totalCompleted / totalAll) * 100).toFixed(1) : '0.0';

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm h-full">
      <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide mb-3">Corrective Actions &amp; Revalidation</h3>
      <table className="w-full text-[11px]">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-1.5 text-left text-[10px] font-semibold text-gray-500 pr-2">Action Type</th>
            <th className="pb-1.5 text-right text-[10px] font-semibold text-gray-500 w-16">Open</th>
            <th className="pb-1.5 text-right text-[10px] font-semibold text-gray-500 w-20">Completed</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.type} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="py-1.5 text-gray-700 pr-2">{row.type}</td>
              <td className={`py-1.5 text-right font-semibold ${row.open > 0 ? 'text-amber-600' : 'text-gray-400'}`}>
                {row.open}
              </td>
              <td className={`py-1.5 text-right font-bold ${row.completed > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                {row.completed}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200">
            <td className="pt-2 font-bold text-gray-900">Total</td>
            <td className="pt-2 text-right font-bold text-amber-600">{totalOpen}</td>
            <td className="pt-2 text-right font-bold text-green-600">{totalCompleted}</td>
          </tr>
          <tr>
            <td colSpan={3} className="pt-1 text-right text-[10px] text-gray-400">
              Completion: <span className="font-bold text-green-600">{completionPct}%</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
