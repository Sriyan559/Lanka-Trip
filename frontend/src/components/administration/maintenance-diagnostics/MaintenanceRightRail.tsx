'use client';

import React from 'react';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import { Flame, Plus, RotateCcw, Wrench, Download, ChevronRight, RefreshCw, Trash2 } from 'lucide-react';

interface MaintenanceRightRailProps {
  onNavigateTab: (tabId: string) => void;
  onActionClick: (actionKey: string) => void;
}

export function MaintenanceRightRail({ onNavigateTab, onActionClick }: MaintenanceRightRailProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. Operations Health */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">Operations Health</h4>
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
          <HealthScore score={96} max={100} label="Excellent" size="sm" />
          <div className="text-right">
            <span className="text-[9px] text-gray-400 block uppercase">Overall Status</span>
            <span className="text-xs font-bold text-emerald-700">Excellent</span>
          </div>
        </div>
        <div className="space-y-1 text-[9px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Auto Refresh</span><span className="font-bold text-gray-900">On</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Cluster Health</span><span className="font-bold text-emerald-700">96%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Service Health</span><span className="font-bold text-emerald-700">96%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Job Success Rate</span><span className="font-bold text-emerald-700">99%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Queue Health</span><span className="font-bold text-emerald-700">95%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Worker Health</span><span className="font-bold text-emerald-700">96%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Dependency Health</span><span className="font-bold text-amber-600">90%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Data Integrity</span><span className="font-bold text-emerald-700">99%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Security Posture</span><span className="font-bold text-emerald-700">97%</span></div>
        </div>
      </div>

      {/* 2. Job Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">Job Summary</h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between"><span className="text-gray-500">Total Jobs</span><span className="font-bold text-gray-900">36</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Completed</span><span className="font-bold text-emerald-700">22</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Failed</span><span className="font-bold text-rose-700">5</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Retry</span><span className="font-bold text-amber-700">16</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Running</span><span className="font-bold text-blue-700">8</span></div>
          <div className="flex justify-between"><span className="text-gray-500">SLA Compliance</span><span className="font-bold text-emerald-700">100%</span></div>
        </div>
      </div>

      {/* 3. Service Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">Service Summary</h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between"><span className="text-gray-500">Total Services</span><span className="font-bold text-gray-900">52</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Healthy</span><span className="font-bold text-emerald-700">46</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Degraded Services</span><span className="font-bold text-amber-700">3</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Disabled</span><span className="font-bold text-rose-700">2</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Unknown Services</span><span className="font-bold text-gray-500">2</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Recommended Action</span><span className="font-bold text-amber-600">3</span></div>
        </div>
      </div>

      {/* 4. Maintenance Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">Maintenance Summary</h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between"><span className="text-gray-500">Upcoming (2h)</span><span className="font-bold text-amber-700">2</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Archive Due</span><span className="font-bold text-gray-900">18</span></div>
          <div className="flex justify-between"><span className="text-gray-500">New Due</span><span className="font-bold text-gray-900">2</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Completed 30d</span><span className="font-bold text-emerald-700">8</span></div>
        </div>
      </div>

      {/* 5. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">Quick Queues</h4>
        <div className="space-y-1 text-[10px]">
          {[
            { label: 'Retry Queue', value: 16, color: 'text-amber-700 bg-amber-50', tab: 'queues' },
            { label: 'Dead-Letter Queue', value: 3, color: 'text-rose-700 bg-rose-50', tab: 'queues' },
            { label: 'High Priority Queue', value: 445, color: 'text-blue-700 bg-blue-50', tab: 'workers' },
            { label: 'Delayed Queue', value: 0, color: 'text-gray-600 bg-gray-50', tab: 'queues' },
            { label: 'Scheduled Queue', value: 74, color: 'text-indigo-700 bg-indigo-50', tab: 'schedules' },
            { label: 'Background Queue', value: 445, color: 'text-emerald-700 bg-emerald-50', tab: 'workers' },
          ].map((q) => (
            <button
              key={q.label}
              type="button"
              onClick={() => onNavigateTab(q.tab)}
              className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left"
            >
              <span className="text-gray-600">{q.label}</span>
              <span className={`font-bold px-1.5 py-0.5 rounded text-[9px] ${q.color}`}>{q.value}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. Recommended Next Action */}
      <div className="bg-rose-950 text-white rounded p-3 shadow-sm border border-rose-900 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-rose-200 text-[10px] font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Recommended Next Action</span>
        </div>
        <p className="text-[10px] text-rose-100 leading-relaxed font-medium">
          Search Index Optimization is scheduled to start in 10 minutes. Review pre-checks and dependency readiness.
        </p>
        <div className="grid grid-cols-3 gap-1 text-[9px] mt-1">
          <div><span className="text-rose-400 block uppercase font-bold">Impact</span><span className="text-white font-bold">High</span></div>
          <div><span className="text-rose-400 block uppercase font-bold">Owner</span><span className="text-white font-bold">Platform Operations</span></div>
          <div><span className="text-rose-400 block uppercase font-bold">ETA</span><span className="text-white font-bold">10 minutes</span></div>
        </div>
        <button
          type="button"
          onClick={() => onActionClick('review_readiness')}
          className="w-full mt-1 py-1.5 bg-rose-900 hover:bg-rose-800 text-white text-[10px] font-bold rounded text-center transition-colors border border-rose-700"
        >
          Review & Confirm Readiness
        </button>
      </div>

      {/* 7. Final Actions */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">Final Actions</h4>
        <div className="flex flex-col gap-1 text-[10px]">
          {[
            { label: 'Run All Health Checks', icon: <RefreshCw className="w-3 h-3 text-emerald-600" />, action: 'run_health_checks' },
            { label: 'Restart Failed Jobs', icon: <RotateCcw className="w-3 h-3 text-rose-600" />, action: 'restart_failed_jobs' },
            { label: 'Clear Retry Queue', icon: <Trash2 className="w-3 h-3 text-amber-600" />, action: 'clear_retry_queue' },
            { label: 'Reprocess Dead-Letter Jobs', icon: <ChevronRight className="w-3 h-3 text-gray-400" />, action: 'reprocess_dead_letter' },
            { label: 'Route Service-Critical Jobs', icon: <ChevronRight className="w-3 h-3 text-gray-400" />, action: 'route_critical_jobs' },
            { label: 'Start Maintenance Window', icon: <Wrench className="w-3 h-3 text-blue-600" />, action: 'start_maintenance' },
            { label: 'View Operations Dashboard', icon: <ChevronRight className="w-3 h-3 text-gray-400" />, action: 'view_dashboard' },
            { label: 'Download Operations Report', icon: <Download className="w-3 h-3 text-gray-400" />, action: 'download_report' },
            { label: 'Sync Dependency Graph', icon: <ChevronRight className="w-3 h-3 text-gray-400" />, action: 'sync_dependency' },
            { label: 'Clear Caches (All Services)', icon: <Trash2 className="w-3 h-3 text-amber-600" />, action: 'clear_caches' },
          ].map((action) => (
            <button
              key={action.action}
              type="button"
              onClick={() => onActionClick(action.action)}
              className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
            >
              <span>{action.label}</span>
              {action.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MaintenanceRightRail;
