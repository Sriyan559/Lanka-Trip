'use client';

import React from 'react';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import { Flame, Plus, ChevronRight, RefreshCw, AlertTriangle, ShieldAlert } from 'lucide-react';

interface LocalizationRightRailProps {
  onNavigateTab: (tabId: string) => void;
  onActionClick: (actionKey: string) => void;
}

export function LocalizationRightRail({ onNavigateTab, onActionClick }: LocalizationRightRailProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. Localization Health */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">
          Localization Health
        </h4>
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
          <HealthScore score={96} max={100} label="Excellent" size="sm" />
          <div className="text-right">
            <span className="text-[9px] text-gray-400 block uppercase">Overall Status</span>
            <span className="text-xs font-bold text-emerald-700">96% Healthy</span>
          </div>
        </div>

        {/* Health Indicators */}
        <div className="space-y-1.5 text-[9px] mt-2">
          <div className="flex justify-between items-center"><span className="text-gray-500">Locale Coverage</span><span className="font-bold text-gray-900">96%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Translation Coverage</span><span className="font-bold text-gray-900">96%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">FX Freshness</span><span className="font-bold text-gray-900">96%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Format Compliance</span><span className="font-bold text-gray-900">97%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Inheritance Health</span><span className="font-bold text-gray-900">94%</span></div>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('readiness')}
          className="w-full mt-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[10px] font-bold rounded text-center border border-gray-200 transition-colors"
        >
          View Full Scorecard →
        </button>
      </div>

      {/* 2. Overall Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Overall Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Total Locales</span><span className="font-bold text-gray-900">112</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Total Languages</span><span className="font-bold text-gray-900">32</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Total Currencies</span><span className="font-bold text-gray-900">28</span></div>
          <div className="flex justify-between items-center border-t border-gray-100 mt-1 pt-1"><span className="text-gray-700 font-semibold">Translation Coverage</span><span className="font-bold text-emerald-700">96%</span></div>
        </div>
      </div>

      {/* 3. Coverage by Status */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Coverage by Status
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Published</span><span className="font-bold text-emerald-700">104</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">In Review</span><span className="font-bold text-amber-600">6</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Draft</span><span className="font-bold text-gray-900">2</span></div>
        </div>
      </div>

      {/* 4. Localization Alerts */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Localization Alerts
        </h4>
        <div className="space-y-1.5 text-[9px] mt-1.5">
          <div className="flex items-center gap-1.5 text-rose-700 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span><span>High Priority (7)</span></div>
          <div className="flex items-center gap-1.5 text-amber-700 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span><span>Medium Priority (11)</span></div>
          <div className="flex items-center gap-1.5 text-blue-700 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span><span>Low Priority (5)</span></div>
        </div>
      </div>

      {/* 5. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Quick Queues
        </h4>
        <div className="space-y-1 text-[10px]">
          <button type="button" onClick={() => onNavigateTab('translations')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Translation Review</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">12</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('exchange-rates')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">FX Rate Updates</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">4</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('inheritance')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Override Approvals</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.25 rounded text-[9px]">6</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('locales')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Locale Publishing</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.25 rounded text-[9px]">3</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('formats')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Format Issues</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">5</span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => onNavigateTab('translations')}
          className="w-full mt-2.5 py-1 text-[#741d35] hover:underline text-[10px] font-bold text-center"
        >
          Open Review Queues →
        </button>
      </div>

      {/* 6. Recommended Next Action */}
      <div className="bg-rose-950 text-white rounded p-3 shadow-sm border border-rose-900 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-rose-200 text-[10px] font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Recommended Next Action</span>
        </div>
        <p className="text-[10px] text-rose-100 leading-relaxed font-medium">
          Complete translation review for 12 locales with high-impact gaps and refresh 2 stale currency rates. Publishing these updates will improve overall readiness by an estimated 4%.
        </p>
        <button
          type="button"
          onClick={() => onActionClick('run_readiness_optimization')}
          className="w-full mt-1 py-1.5 bg-rose-900 hover:bg-rose-800 text-white text-[10px] font-bold rounded text-center transition-colors border border-rose-700 shadow-xs"
        >
          Run Readiness Optimization
        </button>
      </div>

      {/* 7. Final Actions */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Final Actions
        </h4>
        <div className="flex flex-col gap-1 text-[10px]">
          <button type="button" onClick={() => onActionClick('add_locale')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Add Locale</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('add_language')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Add Language</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('add_currency')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Add Currency</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('translations')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Translation Gaps</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('refresh_fx_rates')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Refresh Exchange Rates</span><RefreshCw className="w-3 h-3 text-emerald-600" /></button>
          <button type="button" onClick={() => onNavigateTab('inheritance')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Locale Overrides</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('formats')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Format Overrides</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('languages')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Fallback Rules</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('generate_report')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Generate Localization Report</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('export_registry')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Export Localization Registry</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('open_audit')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Open Localization Audit</span><ShieldAlert className="w-3 h-3 text-rose-600" /></button>
        </div>
      </div>
    </div>
  );
}
export default LocalizationRightRail;
