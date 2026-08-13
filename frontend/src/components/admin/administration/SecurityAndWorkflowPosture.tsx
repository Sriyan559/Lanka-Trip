import React from 'react';

interface QueueItem {
  type: string;
  user: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  age: string;
}

export function SecurityAndWorkflowPosture() {
  const queue: QueueItem[] = [
    { type: 'Create Administrator', user: 'Elena Vance', priority: 'high', age: '2h 15m' },
    { type: 'Grant Elevated Access', user: 'Arun Silva', priority: 'high', age: '3h 42m' },
    { type: 'Config Change', user: 'Nimal Perera', priority: 'medium', age: '5h 10m' },
    { type: 'Workflow Exception', user: 'Priya Kumar', priority: 'medium', age: '7h 25m' },
    { type: 'Data Access Request', user: 'Security Team', priority: 'low', age: '9h 00m' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {/* 1. Security & Authentication Posture */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm flex flex-col justify-between min-h-[160px]">
        <div>
          <div className="border-b border-gray-150 pb-1.5 mb-2.5">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Security & Auth Posture</h3>
          </div>
          <div className="flex flex-col gap-2 text-[10px] font-semibold text-gray-600">
            <div className="flex justify-between items-center">
              <span>MFA Coverage</span>
              <strong className="text-green-600">92%</strong>
            </div>
            <div className="flex justify-between items-center">
              <span>SSO Coverage</span>
              <strong className="text-green-600">90%</strong>
            </div>
            <div className="flex justify-between items-center">
              <span>Privileged MFA</span>
              <strong className="text-green-600">98%</strong>
            </div>
            <div className="flex justify-between items-center">
              <span>Locked Accounts</span>
              <strong className="text-gray-900">1</strong>
            </div>
            <div className="flex justify-between items-center bg-rose-50 px-1 rounded text-red-600">
              <span>Security Warnings</span>
              <strong className="text-red-700">4</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Workflow & Approval Health */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm flex flex-col justify-between min-h-[160px]">
        <div>
          <div className="border-b border-gray-150 pb-1.5 mb-2.5">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Workflow & Approval Health</h3>
          </div>
          <div className="flex flex-col gap-2 text-[10px] font-semibold text-gray-600">
            <div className="flex justify-between items-center">
              <span>Active Workflows</span>
              <strong className="text-gray-900">42</strong>
            </div>
            <div className="flex justify-between items-center">
              <span>Successful (7D)</span>
              <strong className="text-green-600">1,254</strong>
            </div>
            <div className="flex justify-between items-center text-blue-600">
              <span>Pending Approvals</span>
              <strong className="text-blue-700">23</strong>
            </div>
            <div className="flex justify-between items-center text-orange-600">
              <span>Overdue Approvals</span>
              <strong className="text-orange-700">3</strong>
            </div>
            <div className="flex justify-between items-center bg-red-50 px-1 rounded text-red-600">
              <span>Workflow Exceptions</span>
              <strong className="text-red-700">4</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Administrative Approval Queue */}
      <div className="bg-white border border-gray-200 rounded shadow-sm flex flex-col justify-between min-h-[160px]">
        <div>
          <div className="p-2 border-b border-gray-200">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Approval Queue</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-1.5 text-[8px] font-bold text-gray-500 uppercase tracking-wider">Request</th>
                  <th className="p-1.5 text-[8px] font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="p-1.5 text-[8px] font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="p-1.5 text-[8px] font-bold text-gray-500 uppercase tracking-wider">Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-[9px] font-semibold text-gray-700">
                {queue.map((row, i) => {
                  let pColor = 'text-green-600 bg-green-50 border-green-200';
                  if (row.priority === 'medium') pColor = 'text-orange-600 bg-orange-50 border-orange-200';
                  else if (row.priority === 'high' || row.priority === 'critical') pColor = 'text-red-600 bg-red-50 border-red-200';

                  return (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="p-1.5 font-bold text-gray-900 truncate max-w-[85px]">{row.type}</td>
                      <td className="p-1.5 text-gray-900 truncate max-w-[65px]">{row.user}</td>
                      <td className="p-1.5">
                        <span className={`text-[8px] font-bold uppercase border px-1.5 py-0.25 rounded ${pColor}`}>
                          {row.priority}
                        </span>
                      </td>
                      <td className="p-1.5 text-gray-500">{row.age}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
