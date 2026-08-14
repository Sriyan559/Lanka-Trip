import React from 'react';

interface ConfigHealthRow {
  domain: string;
  current: number;
  last7d: number;
  trend: 'up' | 'neutral' | 'down';
  status: string;
}

interface ConfigExceptionRow {
  title: string;
  domain: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: string;
  detected: string;
}

interface PlatformConfigurationHealthProps {
  platformConfigs?: Array<{ config: string; domain: string; state: string; drift: string; sync: string }>;
  loading?: boolean;
}

export function PlatformConfigurationHealth({ platformConfigs, loading = false }: PlatformConfigurationHealthProps = {}) {

  const healthData: ConfigHealthRow[] = [
    { domain: 'Mobile', current: 94, last7d: 94, trend: 'up', status: 'Excellent' },
    { domain: 'Marketplace', current: 92, last7d: 92, trend: 'up', status: 'Excellent' },
    { domain: 'Customer', current: 96, last7d: 95, trend: 'up', status: 'Excellent' },
    { domain: 'Finance', current: 93, last7d: 91, trend: 'up', status: 'Excellent' },
    { domain: 'Logistics', current: 97, last7d: 97, trend: 'neutral', status: 'Excellent' },
    { domain: 'AI / Analytics', current: 90, last7d: 85, trend: 'up', status: 'Good' },
    { domain: 'Security', current: 96, last7d: 95, trend: 'up', status: 'Excellent' },
    { domain: 'Integration', current: 94, last7d: 94, trend: 'neutral', status: 'Excellent' },
    { domain: 'Notifications', current: 98, last7d: 98, trend: 'neutral', status: 'Excellent' }
  ];

  const exceptionData: ConfigExceptionRow[] = [
    { title: 'SAML SSO certificate expiring', domain: 'Security', severity: 'high', status: 'Open', detected: 'May 18, 09:08 AM' },
    { title: 'Security baseline not enforced', domain: 'Security', severity: 'high', status: 'Open', detected: 'May 18, 08:21 AM' },
    { title: 'Email sender throttling risk', domain: 'Communications', severity: 'medium', status: 'Open', detected: 'May 18, 08:10 AM' },
    { title: 'Workflow timeout threshold high', domain: 'Workflows', severity: 'medium', status: 'Open', detected: 'May 18, 07:38 AM' },
    { title: 'Inactive roles cleanup required', domain: 'Roles', severity: 'low', status: 'Open', detected: 'May 18, 07:30 AM' },
    { title: 'General profile sync delay', domain: 'Identity', severity: 'low', status: 'Open', detected: 'May 18, 07:20 AM' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      {/* Platform Configuration Health */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Platform Configuration Health</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Domain</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Current</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Last 7 Days</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Trend</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {healthData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 font-bold text-gray-900">{row.domain}</td>
                  <td className="p-2 text-center font-bold text-gray-900">{row.current}%</td>
                  <td className="p-2 text-center text-gray-500">{row.last7d}%</td>
                  <td className="p-2 text-center text-green-600 font-bold">
                    {row.trend === 'up' ? '↑' : '→'}
                  </td>
                  <td className="p-2 text-green-600 font-bold">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configuration Exceptions */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Configuration Exceptions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Domain Exception</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Detected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {exceptionData.map((row, i) => {
                let badgeClass = 'text-green-600 bg-green-50 border-green-200';
                if (row.severity === 'medium') badgeClass = 'text-orange-600 bg-orange-50 border-orange-200';
                else if (row.severity === 'high' || row.severity === 'critical') badgeClass = 'text-red-600 bg-red-50 border-red-200';

                return (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{row.title}</span>
                        <span className="text-[9px] text-gray-400 font-medium uppercase mt-0.5">{row.domain}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <span className={`text-[8px] font-bold uppercase border px-1.5 py-0.5 rounded ${badgeClass}`}>
                        {row.severity}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full">
                        {row.status}
                      </span>
                    </td>
                    <td className="p-2 text-gray-500 whitespace-nowrap">{row.detected}</td>
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
