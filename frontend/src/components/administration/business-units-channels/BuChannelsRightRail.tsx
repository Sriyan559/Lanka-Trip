'use client';

import React from 'react';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import { Flame, Plus, Share2, ShieldAlert, Download, Clock, ChevronRight } from 'lucide-react';

interface BuChannelsRightRailProps {
  onNavigateTab: (tabId: string) => void;
  onActionClick: (actionKey: string) => void;
}

export function BuChannelsRightRail({ onNavigateTab, onActionClick }: BuChannelsRightRailProps) {
  const healthMetrics = [
    { label: 'Structure Integrity', value: 97 },
    { label: 'Operating Coverage', value: 96 },
    { label: 'Regional Readiness', value: 96 },
    { label: 'Channel Readiness', value: 97 },
    { label: 'Environment Readiness', value: 95 },
    { label: 'Ownership Coverage', value: 96 },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. Operating Health */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">
          Operating Health
        </h4>
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
          <HealthScore score={96} max={100} label="Excellent" size="sm" />
          <div className="text-right">
            <span className="text-[9px] text-gray-400 block uppercase">Overall Status</span>
            <span className="text-xs font-bold text-emerald-700">96% Healthy</span>
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

      {/* 2. Business Unit & Channel Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Business Unit & Channel Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Business Units</span><span className="font-bold text-gray-900">18</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Active Units</span><span className="font-bold text-gray-900">16</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Channels</span><span className="font-bold text-gray-900">8</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Active Channels</span><span className="font-medium text-gray-700">7</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Shared Channels</span><span className="font-medium text-gray-700">3</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Operating Scopes</span><span className="font-medium text-gray-700">42</span></div>
        </div>
      </div>

      {/* 3. Operating Scope Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Operating Scope Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Inherited Scopes</span><span className="font-bold text-gray-900">24</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Direct Scopes</span><span className="font-bold text-gray-900">18</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Restricted Scopes</span><span className="font-bold text-gray-900">4</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Country Assignments</span><span className="font-semibold text-emerald-700">26</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Region Assignments</span><span className="font-semibold text-blue-700">12</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Production Enabled Units</span><span className="font-semibold text-gray-800">14</span></div>
        </div>
      </div>

      {/* 4. Operating Risk */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Operating Risk
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Scope Conflicts</span><span className="font-bold text-rose-700">3</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Ownership Gaps</span><span className="font-bold text-rose-700">2</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Inactive Units</span><span className="font-medium text-gray-700">2</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Pending Changes</span><span className="font-medium text-gray-700">5</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Reviews Due</span><span className="font-medium text-amber-700">4</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Exceptions</span><span className="font-bold text-rose-700">3</span></div>
        </div>
      </div>

      {/* 5. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Quick Queues
        </h4>
        <div className="space-y-1 text-[10px]">
          <button type="button" onClick={() => onNavigateTab('reviews')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Pending Changes</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.25 rounded text-[9px]">5</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('reviews')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Reviews Due</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">4</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('exceptions')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Scope Conflicts</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">3</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('ownership')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Ownership Gaps</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">2</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('exceptions')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Exceptions</span>
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
          Review scope conflicts and ownership gaps affecting operating production readiness.
        </p>
        <div className="text-[9px] text-rose-200 border-t border-rose-900 pt-1 space-y-0.5">
          <div className="flex justify-between"><span>Owner</span><span className="font-semibold text-white">Enterprise Administrator</span></div>
          <div className="flex justify-between"><span>Due Date</span><span className="font-semibold text-amber-300">Aug 15, 2026</span></div>
        </div>
        <button
          type="button"
          onClick={() => onActionClick('review_scope_conflicts')}
          className="w-full mt-1 py-1.5 bg-rose-900 hover:bg-rose-800 text-white text-[10px] font-bold rounded text-center transition-colors border border-rose-700"
        >
          Review Scope Conflicts
        </button>
      </div>

      {/* 7. Final Actions */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Final Actions
        </h4>
        <div className="flex flex-col gap-1 text-[10px]">
          <button type="button" onClick={() => onActionClick('create_bu')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Create Business Unit</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('create_channel')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Create Channel</span><Share2 className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('review_readiness')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Operating Readiness</span><ShieldAlert className="w-3 h-3 text-rose-600" /></button>
          <button type="button" onClick={() => onActionClick('review_ownership')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Ownership Gaps</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('regional-availability')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Regional Readiness</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('environment-applicability')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Environment Applicability</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('reviews')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Pending Changes</span><Clock className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('export_registry')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Export Operating Structure</span><Download className="w-3 h-3 text-gray-400" /></button>
        </div>
      </div>
    </div>
  );
}
export default BuChannelsRightRail;
