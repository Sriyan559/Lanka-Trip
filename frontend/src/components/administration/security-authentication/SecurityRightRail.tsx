'use client';

import React from 'react';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import { Flame, Plus, ShieldAlert, AlertTriangle, RefreshCw, ChevronRight } from 'lucide-react';

interface SecurityRightRailProps {
  onNavigateTab: (tabId: string) => void;
  onActionClick: (actionKey: string) => void;
}

export function SecurityRightRail({ onNavigateTab, onActionClick }: SecurityRightRailProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. Security Health Score */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">
          Security Health
        </h4>
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
          <HealthScore score={97} max={100} label="Excellent" size="sm" />
          <div className="text-right">
            <span className="text-[9px] text-gray-400 block uppercase">Overall Status</span>
            <span className="text-xs font-bold text-emerald-700">97% Healthy</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-1.5 text-[9px] mt-2">
          <div className="flex justify-between items-center"><span className="text-gray-500">Authentication Health</span><span className="font-bold text-gray-900">98%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">MFA Coverage</span><span className="font-bold text-gray-900">98%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">SSO Health</span><span className="font-bold text-gray-900">99%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Session Security</span><span className="font-bold text-gray-900">96%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Device Trust</span><span className="font-bold text-gray-900">95%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Credential Health</span><span className="font-bold text-gray-900">96%</span></div>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('reviews')}
          className="w-full mt-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[10px] font-bold rounded text-center border border-gray-200 transition-colors"
        >
          View Full Scorecard →
        </button>
      </div>

      {/* 2. Authentication Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Authentication Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">SSO Managed Users</span><span className="font-bold text-gray-900">286</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">MFA Enrolled Users</span><span className="font-bold text-gray-900">416</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">MFA Coverage</span><span className="font-bold text-emerald-700">98%</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Authentication Providers</span><span className="font-bold text-gray-900">6</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Authentication Methods</span><span className="font-bold text-gray-900">6</span></div>
        </div>
      </div>

      {/* 3. Session Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Session Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Active Sessions</span><span className="font-bold text-gray-900">1,248</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Privileged Sessions</span><span className="font-bold text-amber-700">18</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">High-Risk Sessions</span><span className="font-bold text-rose-700">7</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Suspicious Login Signals</span><span className="font-bold text-[#741d35]">8</span></div>
        </div>
      </div>

      {/* 4. Security Risk Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Security Risk
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Overall Risk Level</span><span className="font-bold text-emerald-700">Low</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Authentication Risk</span><span className="font-bold text-emerald-700">Low</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Session Risk</span><span className="font-bold text-amber-700">Medium</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Credential Risk</span><span className="font-bold text-emerald-700">Low</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Device Trust Risk</span><span className="font-bold text-gray-900">11</span></div>
        </div>
      </div>

      {/* 5. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Quick Queues
        </h4>
        <div className="space-y-1 text-[10px]">
          <button type="button" onClick={() => onNavigateTab('mfa')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">MFA Gaps</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">6</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('active-sessions')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">High-Risk Sessions</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">7</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('suspicious-activity')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Suspicious Logins</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">8</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('lockouts')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Locked Accounts</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">4</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('service-auth')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Expiring Credentials</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">4</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('reviews')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Pending Reviews</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.25 rounded text-[9px]">5</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('break-glass')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Break-Glass Reviews</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">1</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('reviews')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Reviews Due</span>
            <span className="font-bold text-purple-700 bg-purple-50 px-1.5 py-0.25 rounded text-[9px]">3</span>
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
          Review and enforce phishing-resistant MFA for privileged accounts on a 90-day cadence. Tighten step-up authentication for high-risk and critical transactions.
        </p>
        <div className="text-[9px] text-rose-200 font-semibold border-t border-rose-900 pt-1 mt-1">
          Owner: Security Administration | Due: Aug 20, 2024
        </div>
        <button
          type="button"
          onClick={() => onActionClick('review_high_risk_sessions')}
          className="w-full mt-1 py-1.5 bg-rose-900 hover:bg-rose-800 text-white text-[10px] font-bold rounded text-center transition-colors border border-rose-700 shadow-xs"
        >
          Review High-Risk Sessions
        </button>
      </div>

      {/* 7. Final Actions */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Final Actions
        </h4>
        <div className="flex flex-col gap-1 text-[10px]">
          <button type="button" onClick={() => onActionClick('create_policy')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Create Security Policy</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('register_provider')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Register Authentication Provider</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('mfa')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review MFA Gaps</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('sso')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review SSO Health</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('review_high_risk_sessions')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review High-Risk Sessions</span><ShieldAlert className="w-3 h-3 text-rose-600" /></button>
          <button type="button" onClick={() => onNavigateTab('suspicious-activity')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Suspicious Logins</span><AlertTriangle className="w-3 h-3 text-amber-600" /></button>
          <button type="button" onClick={() => onNavigateTab('lockouts')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Locked Accounts</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('service-auth')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Expiring Credentials</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('session-policies')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Session Policies</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('service-auth')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Service Credentials</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('reviews')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Severity Governance</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('break-glass')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Validate Authentication Controls</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('export_registry')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Export Security Registry</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('open_audit')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Open Security Audit</span><ShieldAlert className="w-3 h-3 text-rose-600" /></button>
        </div>
      </div>
    </div>
  );
}
export default SecurityRightRail;
