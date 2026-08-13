import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ContextStripItemProps {
  label: string;
  value: string;
  isStatus?: boolean;
  statusType?: 'healthy' | 'neutral';
}

function ContextStripItem({ label, value, isStatus, statusType = 'healthy' }: ContextStripItemProps) {
  return (
    <div className="flex flex-col min-w-[95px] border-r border-gray-150 pr-4 last:border-0 last:pr-0">
      <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">{label}</span>
      <span className="text-[11px] font-bold text-gray-800 flex items-center gap-1.5 whitespace-nowrap">
        {isStatus && (
          <span className={`w-1.5 h-1.5 rounded-full ${statusType === 'healthy' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
        )}
        {value}
      </span>
    </div>
  );
}

export function IdentityContextStrip() {
  return (
    <div className="flex flex-wrap items-center justify-between bg-white border border-gray-200 p-3 mb-4 rounded shadow-sm gap-y-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <ContextStripItem label="Tenant" value="SL Beauty" />
        <ContextStripItem label="Ecosystem" value="Beauty Marketplace" />
        <ContextStripItem label="Admin Scope" value="Enterprise Wide" />
        <ContextStripItem label="Region" value="Sri Lanka" />
        <ContextStripItem label="Environment" value="Production" />
        <ContextStripItem label="Identity Registry" value="Connected" isStatus />
        <ContextStripItem label="Membership Registry" value="Connected" isStatus />
        <ContextStripItem label="Risk Registry" value="Connected" isStatus />
        <ContextStripItem label="Auth Source" value="Connected" isStatus />
        <ContextStripItem label="MFA Source" value="Healthy" isStatus />
        <ContextStripItem label="SSO Source" value="Connected" isStatus />
        <ContextStripItem label="Geo Reference" value="Connected" isStatus />
        <ContextStripItem label="Directory Sync" value="Healthy" isStatus />
        <ContextStripItem label="Audit Service" value="Connected" isStatus />
        <ContextStripItem label="Data Completeness" value="99%" />
        <ContextStripItem label="Access Assigned" value="Administration Scope" />
      </div>
      
      <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
        <div className="flex flex-col items-end">
          <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">Last Evaluated</span>
          <span className="text-[11px] font-bold text-gray-800 whitespace-nowrap">Aug 13, 2026 11:45 AM</span>
        </div>
        <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors" title="Sync Status Strip">
          <RefreshCw size={12} />
        </button>
      </div>
    </div>
  );
}
