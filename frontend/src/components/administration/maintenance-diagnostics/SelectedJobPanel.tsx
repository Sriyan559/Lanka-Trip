'use client';

import React from 'react';
import { SelectedJobDetails } from '@/lib/administration/maintenance-diagnostics/maintenance.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';

interface SelectedJobPanelProps {
  job: SelectedJobDetails;
  onViewDetails: () => void;
  onViewRecentRuns: () => void;
  onViewLogs: () => void;
  onViewDependencies: () => void;
}

export function SelectedJobPanel({
  job,
  onViewDetails,
  onViewRecentRuns,
  onViewLogs,
  onViewDependencies,
}: SelectedJobPanelProps) {
  return (
    <SectionCard title={`Selected Job — ${job.jobName}`}>
      <div className="flex flex-col justify-between h-full text-[10px]">
        <div className="grid grid-cols-12 gap-2">
          {/* Main info columns */}
          <div className="col-span-8 grid grid-cols-2 gap-x-2 gap-y-1.5 border-r border-gray-150 pr-2">
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Service</span>
              <span className="font-bold text-gray-900">{job.service}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Retry Policy</span>
              <span className="font-semibold text-gray-800 truncate block">{job.retryPolicy}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Type</span>
              <span className="font-semibold text-gray-800">{job.type}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Dead-Letter Handling</span>
              <span className="font-semibold text-gray-800 truncate block">{job.deadLetterHandling}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Schedule</span>
              <span className="font-mono text-gray-800">{job.schedule}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Worker Pool</span>
              <span className="font-semibold text-gray-800">{job.workerPool}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Lifecycle</span>
              <StatusBadge status={job.lifecycle} size="xs" />
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Execution Mode</span>
              <span className="font-semibold text-gray-800">{job.executionMode}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Last Run</span>
              <span className="font-semibold text-gray-600 text-[9px]">{job.lastRun}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Concurrency</span>
              <span className="font-bold text-gray-900">{job.concurrency}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Status</span>
              <StatusBadge status={job.status} size="xs" />
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">SLA</span>
              <span className="font-bold text-gray-900">{job.sla}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Success Rate</span>
              <span className="font-bold text-emerald-700">{job.successRate}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">SLA Compliance</span>
              <span className="font-bold text-emerald-700">{job.slaCompliance}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Avg Duration</span>
              <span className="font-semibold text-gray-800">{job.avgDuration}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Next Run</span>
              <span className="font-semibold text-gray-600 text-[9px]">{job.nextRun}</span>
            </div>
          </div>

          {/* Right health score */}
          <div className="col-span-4 flex flex-col justify-between pl-1">
            <div className="space-y-1.5">
              <div>
                <span className="text-gray-400 font-semibold block text-[9px] uppercase">Job Ref</span>
                <span className="font-mono text-gray-700 text-[10px]">JOB-IMG-SYNC-001</span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold block text-[9px] uppercase">Owner</span>
                <span className="font-bold text-gray-900">Platform Operations</span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold block text-[9px] uppercase">Avg Duration (30d)</span>
                <span className="font-bold text-gray-900">2m 18s</span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-150 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-gray-400 block uppercase">Job Health</span>
                <span className="text-xs font-extrabold text-emerald-700">{job.healthScore} / 100</span>
              </div>
              <HealthScore score={job.healthScore} max={100} label={job.statusLabel} size="sm" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 pt-2 border-t border-gray-150 flex items-center gap-1.5 flex-wrap text-[9px]">
          <button type="button" onClick={onViewDetails} className="px-2 py-1 bg-[#741d35] hover:bg-[#5d172a] text-white font-bold rounded shadow-2xs transition-colors">
            View job details
          </button>
          <button type="button" onClick={onViewRecentRuns} className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors">
            View recent runs
          </button>
          <button type="button" onClick={onViewLogs} className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors">
            View logs
          </button>
          <button type="button" onClick={onViewDependencies} className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors">
            View dependencies
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
export default SelectedJobPanel;
