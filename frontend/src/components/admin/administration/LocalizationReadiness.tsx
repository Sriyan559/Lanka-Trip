import React from 'react';

interface LocalizationItem {
  label: string;
  count: number;
  progress: number;
}

interface CommHealthItem {
  channel: string;
  status: string;
  uptime: string;
  issues: number;
}

export function LocalizationReadiness() {
  const locItems: LocalizationItem[] = [
    { label: 'Supported Languages', count: 5, progress: 100 },
    { label: 'Countries', count: 6, progress: 100 },
    { label: 'Currencies', count: 7, progress: 100 },
    { label: 'Time Zones', count: 5, progress: 100 },
    { label: 'Tax Configurations', count: 6, progress: 100 },
    { label: 'Localization Completeness', count: 99, progress: 99 } // using count as metric value percentage here
  ];

  const commItems: CommHealthItem[] = [
    { channel: 'Email', status: 'Healthy', uptime: '99.72%', issues: 0 },
    { channel: 'SMS', status: 'Healthy', uptime: '99.61%', issues: 0 },
    { channel: 'Push', status: 'Healthy', uptime: '99.85%', issues: 0 },
    { channel: 'In-App', status: 'Healthy', uptime: '99.84%', issues: 0 },
    { channel: 'System Alerts', status: 'Healthy', uptime: '99.90%', issues: 0 },
    { channel: 'Webhooks', status: 'Healthy', uptime: '99.80%', issues: 0 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      {/* Localization & Regional Readiness */}
      <div className="bg-white border border-gray-200 rounded shadow-sm p-3 flex flex-col justify-between">
        <div>
          <div className="border-b border-gray-200 pb-2 mb-3">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Localization & Regional Readiness</h2>
          </div>
          <div className="flex flex-col gap-3.5">
            {locItems.map((item, i) => (
              <div key={i} className="flex flex-col gap-1 text-[11px] font-semibold text-gray-700">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">{item.label === 'Localization Completeness' ? '' : item.count}</span>
                    <span className="font-bold text-gray-900">{item.progress}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Communication Health */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Communication Health</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Channel</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Uptime (7D)</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Issues</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {commItems.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2.5 font-bold text-gray-900">{row.channel}</td>
                  <td className="p-2.5">
                    <span className="text-green-600 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-2.5 font-bold text-gray-900">{row.uptime}</td>
                  <td className="p-2.5 text-center font-bold text-gray-500">{row.issues}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
