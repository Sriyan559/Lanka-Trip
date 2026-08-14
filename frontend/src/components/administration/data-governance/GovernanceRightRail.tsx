'use client';

import React from 'react';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import { Flame, Plus, ShieldAlert, FileText, ChevronRight } from 'lucide-react';

interface GovernanceRightRailProps {
  onNavigateTab: (tabId: string) => void;
  onActionClick: (actionKey: string) => void;
}

export function GovernanceRightRail({ onNavigateTab, onActionClick }: GovernanceRightRailProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. Data Governance Health */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">
          Data Governance Health
        </h4>
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
          <HealthScore score={95} max={100} label="Very Good" size="sm" />
          <div className="text-right">
            <span className="text-[9px] text-gray-400 block uppercase">Overall Status</span>
            <span className="text-xs font-bold text-emerald-700">95% Healthy</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-1 text-[9px] mt-2">
          <div className="flex justify-between items-center"><span className="text-gray-500">Classification Coverage</span><span className="font-bold text-gray-900">95%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Ownership Coverage</span><span className="font-bold text-gray-900">97%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Retention Compliance</span><span className="font-bold text-gray-900">94%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Residency Compliance</span><span className="font-bold text-gray-900">98%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Privacy Compliance</span><span className="font-bold text-gray-900">95%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Review Coverage</span><span className="font-bold text-gray-900">93%</span></div>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('reviews')}
          className="w-full mt-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[10px] font-bold rounded text-center border border-gray-200 transition-colors"
        >
          View Governance Scorecard →
        </button>
      </div>

      {/* 2. Data Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Data Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Total Data Assets</span><span className="font-bold text-gray-900">146</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Personal Data Assets</span><span className="font-bold text-gray-900">38</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Sensitive Data Assets</span><span className="font-bold text-amber-700">42</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">High-Risk Assets</span><span className="font-bold text-rose-700">8</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Restricted Data Assets</span><span className="font-bold text-purple-700">12</span></div>
        </div>
      </div>

      {/* 3. Retention Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Retention Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Retention Due</span><span className="font-bold text-amber-700">24</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Archive Due</span><span className="font-bold text-gray-900">9</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Disposal Due</span><span className="font-bold text-rose-700">4</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Disposal Pending</span><span className="font-bold text-gray-900">2</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Legal Hold</span><span className="font-bold text-blue-700">3</span></div>
        </div>
      </div>

      {/* 4. Data Governance Risk */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Data Governance Risk
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">High-Risk Assets</span><span className="font-bold text-rose-700">8</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Retention Breaches</span><span className="font-bold text-rose-700">4</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Ownership Gaps</span><span className="font-bold text-amber-700">5</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Residency Issues</span><span className="font-bold text-amber-700">2</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Privacy Exceptions</span><span className="font-bold text-rose-700">3</span></div>
        </div>
      </div>

      {/* 5. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Quick Queues
        </h4>
        <div className="space-y-1 text-[10px]">
          <button type="button" onClick={() => onNavigateTab('reviews')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Reviews Due</span>
            <span className="font-bold text-purple-700 bg-purple-50 px-1.5 py-0.25 rounded text-[9px]">6</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('data-assets')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Data Requests</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.25 rounded text-[9px]">7</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('retention-schedule')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Retention Due</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">24</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('archived-disposal')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Disposal Due</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">4</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('exceptions')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Exceptions To Review</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">3</span>
          </button>
        </div>
      </div>

      {/* 6. Recommended Next Action */}
      <div className="bg-rose-950 text-white rounded p-3 shadow-sm border border-rose-900 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-rose-200 text-[10px] font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Recommended Next Action</span>
        </div>
        <p className="text-[10px] text-rose-100 leading-relaxed font-medium">
          Review four retention breaches before the next compliance cycle. Update ownership for five assets with missing or inactive owners.
        </p>
        <button
          type="button"
          onClick={() => onActionClick('review_retention_breaches')}
          className="w-full mt-1 py-1.5 bg-rose-900 hover:bg-rose-800 text-white text-[10px] font-bold rounded text-center transition-colors border border-rose-700 shadow-xs"
        >
          View Retention Breaches
        </button>
      </div>

      {/* 7. Final Actions */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Final Actions
        </h4>
        <div className="flex flex-col gap-1 text-[10px]">
          <button type="button" onClick={() => onActionClick('register_asset')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Register Data Asset</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('create_retention_policy')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Create Retention Policy</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('data-assets')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review High-Risk Data</span><ShieldAlert className="w-3 h-3 text-rose-600" /></button>
          <button type="button" onClick={() => onNavigateTab('retention-schedule')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Retention Actions</span><FileText className="w-3 h-3 text-amber-600" /></button>
          <button type="button" onClick={() => onNavigateTab('ownership')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Ownership Gaps</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('review_retention_breaches')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Retention Breaches</span><ShieldAlert className="w-3 h-3 text-rose-600" /></button>
          <button type="button" onClick={() => onNavigateTab('archived-disposal')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Disposal Queue</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('residency')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Residency Issues</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('data-quality')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Data Quality Warnings</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('exceptions')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Privacy Exceptions</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('data-sharing')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Data Sharing</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('export_registry')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Export Data Governance Registry</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('open_audit')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Open Data Governance Audit</span><ShieldAlert className="w-3 h-3 text-rose-600" /></button>
        </div>
      </div>
    </div>
  );
}
export default GovernanceRightRail;
