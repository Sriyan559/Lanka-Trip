import React from 'react';

interface InputFeedRow {
  name: string;
  lastRun: string;
  errorRate: string;
  records: string;
}

interface ActivityRow {
  time: string;
  actor: string;
  action: string;
  target: string;
  result: string;
}

export function InputFeedsAndActivity() {
  const feeds: InputFeedRow[] = [
    { name: 'Product Image Sync', lastRun: 'May 18, 08:45 AM', errorRate: '0.8%', records: '12,542' },
    { name: 'Inventory Feed', lastRun: 'May 18, 08:30 AM', errorRate: '1.2%', records: '31,768' },
    { name: 'Pricing Update', lastRun: 'May 18, 08:15 AM', errorRate: '0.3%', records: '8,941' }
  ];

  const activities: ActivityRow[] = [
    { time: 'May 18, 09:15 AM', actor: 'elena.vance@slbeauty.com', action: 'Resolved configuration issue', target: 'SAML SSO certificate', result: 'Success' },
    { time: 'May 18, 09:02 AM', actor: 'nimal.perera@slbeauty.com', action: 'Granted admin access', target: 'nimal.perera@slbeauty.com', result: 'Success' },
    { time: 'May 18, 08:47 AM', actor: 'priya.kumar@slbeauty.com', action: 'Updated platform setting', target: 'API rate limit', result: 'Success' },
    { time: 'May 18, 08:30 AM', actor: 'nimal.perera@slbeauty.com', action: 'Approved workflow', target: 'Price Change Approval', result: 'Success' },
    { time: 'May 18, 08:05 AM', actor: 'security.team@slbeauty.com', action: 'Added notification template', target: 'Order Confirmation', result: 'Success' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      {/* 1. Administration Input Feeds */}
      <div className="bg-white border border-gray-200 rounded shadow-sm lg:col-span-1">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Administration Input Feeds</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Feed</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Last Run</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Error Rate</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-right pr-3">Records</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {feeds.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2.5 font-bold text-gray-900">{row.name}</td>
                  <td className="p-2.5 text-gray-500 whitespace-nowrap">{row.lastRun}</td>
                  <td className="p-2.5 text-red-600 font-bold">{row.errorRate}</td>
                  <td className="p-2.5 text-right font-bold text-gray-900 pr-3">{row.records}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Recent Administration Activity */}
      <div className="bg-white border border-gray-200 rounded shadow-sm lg:col-span-2">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Recent Administration Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Time</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Actor</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Target</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {activities.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2.5 text-gray-500 whitespace-nowrap">{row.time}</td>
                  <td className="p-2.5 font-bold text-gray-900 truncate max-w-[120px]" title={row.actor}>{row.actor}</td>
                  <td className="p-2.5 text-gray-900 truncate max-w-[150px]" title={row.action}>{row.action}</td>
                  <td className="p-2.5 text-gray-500 truncate max-w-[150px]" title={row.target}>{row.target}</td>
                  <td className="p-2.5">
                    <span className="text-[9px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                      {row.result}
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
