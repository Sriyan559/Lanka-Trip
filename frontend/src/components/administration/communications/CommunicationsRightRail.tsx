'use client';

import React from 'react';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import { Flame, Plus, Server, AlertTriangle, RefreshCw, ChevronRight, ShieldAlert } from 'lucide-react';

interface CommunicationsRightRailProps {
  onNavigateTab: (tabId: string) => void;
  onActionClick: (actionKey: string) => void;
}

export function CommunicationsRightRail({ onNavigateTab, onActionClick }: CommunicationsRightRailProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. Communications Health Score */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">
          Communications Health
        </h4>
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
          <HealthScore score={96} max={100} label="Excellent" size="sm" />
          <div className="text-right">
            <span className="text-[9px] text-gray-400 block uppercase">Overall Status</span>
            <span className="text-xs font-bold text-emerald-700">96% Healthy</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-1.5 text-[9px] mt-2">
          <div className="flex justify-between items-center"><span className="text-gray-500">Provider Health</span><span className="font-bold text-gray-900">95.7%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Delivery Success</span><span className="font-bold text-gray-900">98.7%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Template Coverage</span><span className="font-bold text-gray-900">97%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Localization Readiness</span><span className="font-bold text-gray-900">95%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Fallback Readiness</span><span className="font-bold text-gray-900">96%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Sender Health</span><span className="font-bold text-gray-900">96%</span></div>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('delivery-health')}
          className="w-full mt-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[10px] font-bold rounded text-center border border-gray-200 transition-colors"
        >
          View Full Scorecard →
        </button>
      </div>

      {/* 2. Channel Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Channel Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Active Channels</span><span className="font-bold text-gray-900">6</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Providers</span><span className="font-bold text-gray-900">11</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Templates</span><span className="font-bold text-gray-900">126</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Notification Rules</span><span className="font-bold text-gray-900">84</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Localized Variants</span><span className="font-bold text-emerald-700">312</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Sender Identities</span><span className="font-bold text-blue-700">24</span></div>
        </div>
      </div>

      {/* 3. Delivery Summary - 24H */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Delivery Summary — 24H
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Sent</span><span className="font-bold text-gray-900">186K</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Delivered</span><span className="font-bold text-emerald-700">183.6K</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Failed</span><span className="font-bold text-rose-700">1,842</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">In Retry Queue</span><span className="font-bold text-amber-700">742</span></div>
          <div className="flex justify-between items-center border-t border-gray-100 mt-1 pt-1"><span className="text-gray-700 font-semibold">Delivery Success</span><span className="font-bold text-emerald-700">98.7%</span></div>
        </div>
      </div>

      {/* 4. Communications Risk */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Communications Risk
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Degraded Providers</span><span className="font-bold text-rose-700">2</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Template Gaps</span><span className="font-bold text-amber-600">5</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Missing Localizations</span><span className="font-bold text-amber-600">4</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Failed Integrations</span><span className="font-bold text-rose-600">3</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Fallback Gaps</span><span className="font-bold text-rose-600">4</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Communication Exceptions</span><span className="font-bold text-rose-700">3</span></div>
        </div>
      </div>

      {/* 5. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Quick Queues
        </h4>
        <div className="space-y-1 text-[10px]">
          <button type="button" onClick={() => onNavigateTab('failures-retries')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Failed Deliveries</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">1,842</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('failures-retries')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Retry Queue</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">742</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('templates')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Template Gaps</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">5</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('localized-variants')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Missing Localizations</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">4</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('sender-identities')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Sender Expiries</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">3</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('fallback-resilience')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Fallback Gaps</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">4</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('exceptions')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Format Issues</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">5</span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => onNavigateTab('failures-retries')}
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
          Review the two degraded communication providers before routing high volumes to order workflow rules with a 0.74% error threshold but 260ms delivery latency.
        </p>
        <div className="text-[9px] text-rose-200 font-semibold border-t border-rose-900 pt-1 mt-1">
          Due: Aug 14, 2024
        </div>
        <button
          type="button"
          onClick={() => onActionClick('review_provider_health')}
          className="w-full mt-1 py-1.5 bg-rose-900 hover:bg-rose-800 text-white text-[10px] font-bold rounded text-center transition-colors border border-rose-700 shadow-xs"
        >
          Review Provider Health
        </button>
      </div>

      {/* 7. Final Actions */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Final Actions
        </h4>
        <div className="flex flex-col gap-1 text-[10px]">
          <button type="button" onClick={() => onActionClick('create_template')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Create Notification Template</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('register_provider')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Register Provider</span><Server className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('create_rule')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Create Notification Rule</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('review_failures')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Delivery Failures</span><AlertTriangle className="w-3 h-3 text-rose-600" /></button>
          <button type="button" onClick={() => onNavigateTab('failures-retries')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Retry Queue</span><RefreshCw className="w-3 h-3 text-amber-600" /></button>
          <button type="button" onClick={() => onNavigateTab('templates')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Template Gaps</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('localized-variants')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Missing Localizations</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('sender-identities')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Sender Identities</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('fallback-resilience')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Fallback Readiness</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('critical-notifications')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Critical Notifications</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('export_registry')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Export Communications Registry</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('open_audit')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Open Communication Audit</span><ShieldAlert className="w-3 h-3 text-rose-600" /></button>
        </div>
      </div>
    </div>
  );
}
export default CommunicationsRightRail;
