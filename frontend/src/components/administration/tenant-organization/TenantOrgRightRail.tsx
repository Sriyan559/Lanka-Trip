'use client';

import React from 'react';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import { Flame, Plus, Globe, Building2, ShieldAlert, Download, Clock, ChevronRight } from 'lucide-react';

interface TenantOrgRightRailProps {
  onNavigateTab: (tabId: string) => void;
  onActionClick: (actionKey: string) => void;
}

export function TenantOrgRightRail({ onNavigateTab, onActionClick }: TenantOrgRightRailProps) {
  const healthMetrics = [
    { label: 'Structure Integrity', value: 99 },
    { label: 'Ownership Coverage', value: 97 },
    { label: 'Regional Readiness', value: 96 },
    { label: 'Lifecycle Hygiene', value: 98 },
    { label: 'Scope Integrity', value: 97 },
    { label: 'Review Coverage', value: 95 },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. Organization Health */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">
          Organization Health
        </h4>
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
          <HealthScore score={97} max={100} label="Excellent" size="sm" />
          <div className="text-right">
            <span className="text-[9px] text-gray-400 block uppercase">Overall Status</span>
            <span className="text-xs font-bold text-emerald-700">97% Healthy</span>
          </div>
        </div>
        <div className="space-y-1 text-[9px]">
          {healthMetrics.map((hm, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-gray-500">{hm.label}</span>
              <span className="font-bold text-gray-800">{hm.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Structure Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Structure Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Tenants</span><span className="font-bold text-gray-900">12</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Ecosystems</span><span className="font-bold text-gray-900">14</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Organizations</span><span className="font-bold text-gray-900">28</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Business Units</span><span className="font-medium text-gray-700">18</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Channels</span><span className="font-medium text-gray-700">8</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Regions</span><span className="font-medium text-gray-700">6</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Countries</span><span className="font-medium text-gray-700">2</span></div>
        </div>
      </div>

      {/* 3. Entity Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Entity Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Legal Entities</span><span className="font-bold text-gray-900">9</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Operating Entities</span><span className="font-bold text-gray-900">19</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Parent Relationships</span><span className="font-bold text-gray-900">31</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Inherited Scopes</span><span className="font-semibold text-emerald-700">42</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Direct Scopes</span><span className="font-semibold text-blue-700">26</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Country Assignments</span><span className="font-semibold text-gray-800">24</span></div>
        </div>
      </div>

      {/* 4. Organization Risk */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Organization Risk
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Ownership Gaps</span><span className="font-bold text-rose-700">3</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Structure Conflicts</span><span className="font-bold text-amber-700">2</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Inactive Structures</span><span className="font-medium text-gray-700">3</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Pending Changes</span><span className="font-medium text-gray-700">2</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Exceptions</span><span className="font-medium text-amber-700">2</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Reviews Due</span><span className="font-bold text-rose-700">4</span></div>
        </div>
      </div>

      {/* 5. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Quick Queues
        </h4>
        <div className="space-y-1 text-[10px]">
          <button type="button" onClick={() => onNavigateTab('reviews')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Pending Reviews</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">2</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('hierarchy')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Structure Conflicts</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">2</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('lifecycle')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Pending Changes</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.25 rounded text-[9px]">2</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('reviews')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Reviews Due</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">4</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('tenants')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Inactive Structures</span>
            <span className="font-bold text-gray-700 bg-gray-100 px-1.5 py-0.25 rounded text-[9px]">3</span>
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
          Review 5 high-risk structural changes before approving to preserve organizational integrity.
        </p>
        <div className="text-[9px] text-rose-200 border-t border-rose-900 pt-1 space-y-0.5">
          <div className="flex justify-between"><span>Owner</span><span className="font-semibold text-white">Enterprise Administrator</span></div>
          <div className="flex justify-between"><span>Due Date</span><span className="font-semibold text-amber-300">Aug 15, 2026</span></div>
        </div>
        <button
          type="button"
          onClick={() => onActionClick('review_ownership')}
          className="w-full mt-1 py-1.5 bg-rose-900 hover:bg-rose-800 text-white text-[10px] font-bold rounded text-center transition-colors border border-rose-700"
        >
          Review Ownership Gaps
        </button>
      </div>

      {/* 7. Final Actions */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Final Actions
        </h4>
        <div className="flex flex-col gap-1 text-[10px]">
          <button type="button" onClick={() => onActionClick('create_tenant')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Create Tenant</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('create_ecosystem')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Create Ecosystem</span><Globe className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('create_organization')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Create Organization</span><Building2 className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('review_structure_risks')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Structure Risks</span><ShieldAlert className="w-3 h-3 text-rose-600" /></button>
          <button type="button" onClick={() => onActionClick('review_ownership')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Ownership Gaps</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('scope-inheritance')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Scope Deviations</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('regional-structure')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Regional Structure</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('lifecycle')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Pending Changes</span><Clock className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('export_registry')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Export Organization Registry</span><Download className="w-3 h-3 text-gray-400" /></button>
        </div>
      </div>
    </div>
  );
}
