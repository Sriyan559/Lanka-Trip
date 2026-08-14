'use client';

import React from 'react';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import { Flame, Plus, GitCompare, ShieldAlert, Edit3, ChevronRight } from 'lucide-react';

interface SystemConfigurationRightRailProps {
  onNavigateTab: (tabId: string) => void;
  onActionClick: (actionKey: string) => void;
}

export function SystemConfigurationRightRail({ onNavigateTab, onActionClick }: SystemConfigurationRightRailProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. Configuration Health */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">
          Configuration Health
        </h4>
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
          <HealthScore score={95} max={100} label="Very Good" size="sm" />
          <div className="text-right">
            <span className="text-[9px] text-gray-400 block uppercase">Overall Status</span>
            <span className="text-xs font-bold text-emerald-700">95% Healthy</span>
          </div>
        </div>
      </div>

      {/* 2. Configuration Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Configuration Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Domains</span><span className="font-bold text-gray-900">28</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Keys</span><span className="font-bold text-gray-900">184</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Active</span><span className="font-bold text-gray-900">176</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Overrides</span><span className="font-medium text-emerald-700">42</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Secrets</span><span className="font-medium text-blue-700">34</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Restricted</span><span className="font-medium text-rose-700">16</span></div>
        </div>
      </div>

      {/* 3. Override Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Override Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Tenant</span><span className="font-bold text-gray-900">18</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Ecosystem</span><span className="font-bold text-gray-900">9</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Business Unit</span><span className="font-bold text-gray-900">7</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Channel</span><span className="font-bold text-gray-900">4</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Environment</span><span className="font-bold text-gray-900">12</span></div>
          <div className="flex justify-between items-center border-t border-gray-100 mt-1 pt-1"><span className="text-gray-700 font-semibold">Overrides (Total)</span><span className="font-bold text-gray-900">42</span></div>
        </div>
      </div>

      {/* 4. Configuration Risk */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Configuration Risk
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Low</span><span className="font-bold text-emerald-700">156</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Medium</span><span className="font-bold text-amber-600">22</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">High</span><span className="font-bold text-rose-600">4</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Critical</span><span className="font-bold text-rose-700">2</span></div>
        </div>
      </div>

      {/* 5. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Quick Queues
        </h4>
        <div className="space-y-1 text-[10px]">
          <button type="button" onClick={() => onNavigateTab('change-requests')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Pending Changes</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.25 rounded text-[9px]">9</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('validation')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Validation Warnings</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">6</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('validation')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Critical Errors</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">2</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('drift')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Drift Findings</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">5</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('domains')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Ownership Gaps</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">3</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('dependencies')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Secrets Referenced</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.25 rounded text-[9px]">34</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('reviews')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Reviews Due</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.25 rounded text-[9px]">5</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('exceptions')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Configuration Exceptions</span>
            <span className="font-bold text-purple-700 bg-purple-50 px-1.5 py-0.25 rounded text-[9px]">4</span>
          </button>
        </div>
      </div>

      {/* 6. Recommended Next Action */}
      <div className="bg-rose-950 text-white rounded p-3 shadow-sm border border-rose-900 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-rose-200 text-[10px] font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Recommended Next Action</span>
        </div>
        <p className="text-[10px] text-rose-100 leading-relaxed">
          Review the 9 pending configuration changes before production deployment to ensure validity and compliance across all environments.
        </p>
        <button
          type="button"
          onClick={() => onActionClick('review_pending_changes')}
          className="w-full mt-1 py-1.5 bg-rose-900 hover:bg-rose-800 text-white text-[10px] font-bold rounded text-center transition-colors border border-rose-700"
        >
          Review Pending Changes
        </button>
      </div>

      {/* 7. Final Actions */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Final Actions
        </h4>
        <div className="flex flex-col gap-1 text-[10px]">
          <button type="button" onClick={() => onActionClick('create_config')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Create Configuration</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('request_change')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Request Configuration Change</span><Edit3 className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('review_pending_changes')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Pending Changes</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('validation')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Validation Warnings</span><ShieldAlert className="w-3 h-3 text-amber-600" /></button>
          <button type="button" onClick={() => onActionClick('review_drift')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Configuration Drift</span><GitCompare className="w-3 h-3 text-rose-600" /></button>
          <button type="button" onClick={() => onNavigateTab('domains')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Ownership Gaps</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('dependencies')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Secrets Referenced</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('exceptions')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Exceptions</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('compare_environments')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Compare Environments</span><GitCompare className="w-3 h-3 text-gray-400" /></button>
        </div>
      </div>
    </div>
  );
}
export default SystemConfigurationRightRail;
