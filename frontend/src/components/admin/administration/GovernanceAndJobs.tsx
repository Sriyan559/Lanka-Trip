import React from 'react';

interface GovJob {
  type: string;
  status: string;
  lastRun: string;
  nextRun: string;
}

interface FailedJob {
  name: string;
  lastRun: string;
  error: string;
  retries: number;
}

interface ExceptionItem {
  type: string;
  count: number;
  trend: 'up' | 'down' | 'neutral';
}

interface GovernanceAndJobsProps {
  governanceJobs?: Array<{ job: string; frequency: string; lastRun: string; status: string }>;
  loading?: boolean;
}

export function GovernanceAndJobs({ governanceJobs, loading = false }: GovernanceAndJobsProps = {}) {

  const govJobs: GovJob[] = [
    { type: 'Data Profiling', status: 'Completed', lastRun: 'May 18, 08:15 AM', nextRun: 'May 19, 08:00 AM' },
    { type: 'Data Lineage Sync', status: 'Completed', lastRun: 'May 18, 08:30 AM', nextRun: 'May 19, 08:30 AM' },
    { type: 'Retention Policy Check', status: 'Completed', lastRun: 'May 18, 07:00 AM', nextRun: 'May 19, 07:00 AM' },
    { type: 'PII Discovery', status: 'Completed', lastRun: 'May 18, 07:30 AM', nextRun: 'May 19, 07:30 AM' },
    { type: 'Data Quality Scan', status: 'Completed', lastRun: 'May 18, 08:00 AM', nextRun: 'May 19, 20:00 AM' }
  ];

  const failedJobs: FailedJob[] = [
    { name: 'Product Image Sync', lastRun: 'May 18, 08:45 AM', error: 'Timeout', retries: 2 },
    { name: 'Inventory Feed', lastRun: 'May 18, 08:30 AM', error: 'API 503', retries: 3 },
    { name: 'Pricing Update', lastRun: 'May 18, 08:15 AM', error: 'Validation', retries: 1 }
  ];

  const exceptions: ExceptionItem[] = [
    { type: 'Configuration Issues', count: 6, trend: 'up' },
    { type: 'Security Warnings', count: 4, trend: 'up' },
    { type: 'Workflow Exceptions', count: 4, trend: 'up' },
    { type: 'Provider Issues', count: 2, trend: 'down' },
    { type: 'Governance Exceptions', count: 5, trend: 'up' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {/* 1. Data Governance Review Jobs */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Data Governance Review Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Job Type</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Last Run</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Next Run</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {govJobs.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 font-bold text-gray-950 truncate max-w-[100px]">{row.type}</td>
                  <td className="p-2">
                    <span className="text-green-600 font-bold flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-green-500"></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-2 text-gray-500 whitespace-nowrap">{row.lastRun}</td>
                  <td className="p-2 text-gray-500 whitespace-nowrap">{row.nextRun}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Failed Jobs */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Failed Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Job</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Last Run</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Error</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Retries</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {failedJobs.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 font-bold text-gray-950 truncate max-w-[100px]">{row.name}</td>
                  <td className="p-2 text-gray-500 whitespace-nowrap">{row.lastRun}</td>
                  <td className="p-2">
                    <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                      {row.error}
                    </span>
                  </td>
                  <td className="p-2 text-center text-gray-900 font-bold">{row.retries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Administration Exception Center */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Exception Center</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Exception Type</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Count</th>
                <th className="p-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-[10px] font-semibold text-gray-700">
              {exceptions.map((row, i) => {
                const countClass = row.count > 3 ? 'text-red-600 font-bold' : 'text-gray-900';
                return (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-2 font-bold text-gray-900">{row.type}</td>
                    <td className={`p-2 text-center ${countClass}`}>{row.count}</td>
                    <td className="p-2 text-center font-bold">
                      {row.trend === 'up' ? (
                        <span className="text-red-500">↑</span>
                      ) : (
                        <span className="text-green-500">↓</span>
                      )}
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
