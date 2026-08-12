'use client';

import React from 'react';
import {
  Search,
  Building2,
  Store,
  MapPin,
  Globe,
  FileCheck,
  Activity,
  Database,
  Clock,
  ChevronDown,
} from 'lucide-react';

export function CasesContextBar() {
  return (
    <div className="bg-canvas border border-line rounded-lg px-3 py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[11px] text-slate-600">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <div className="flex items-center gap-1.5 font-medium">
          <Search size={13} className="text-slate-400" />
          <span>Smart CS Search</span>
        </div>

        <div className="flex items-center gap-1.5 font-medium">
          <Building2 size={13} className="text-slate-400" />
          <span>Enterprise Beauty Marketplace</span>
        </div>

        <div className="flex items-center gap-1.5 font-medium">
          <Store size={13} className="text-slate-400" />
          <span>Business Units: <strong className="text-ink">All Business Units</strong></span>
        </div>

        <div className="flex items-center gap-1.5 font-medium">
          <MapPin size={13} className="text-slate-400" />
          <span>Region: <strong className="text-ink">Sri Lanka</strong></span>
        </div>

        <div className="flex items-center gap-1.5 font-medium">
          <Globe size={13} className="text-slate-400" />
          <span>Region Scope: <strong className="text-ink">All Customer Support Queues</strong></span>
        </div>

        <div className="flex items-center gap-1.5 font-medium">
          <FileCheck size={13} className="text-slate-400" />
          <span>SLA Policy: <strong className="text-ink font-mono">SUP-SLA-015</strong></span>
        </div>

        <div className="flex items-center gap-1.5 font-medium">
          <Activity size={13} className="text-emerald-500" />
          <span>Routing Engine: <strong className="text-emerald-700">Healthy</strong></span>
        </div>

        <div className="flex items-center gap-1.5 font-medium">
          <Database size={13} className="text-slate-400" />
          <span>Data Completeness: <strong className="text-ink">99%</strong></span>
        </div>

        <div className="flex items-center gap-1.5 font-medium">
          <Clock size={13} className="text-slate-400" />
          <span>Last Sync: <strong className="text-ink">Jul 22, 2026 10:55 AM</strong></span>
        </div>
      </div>

      <button
        type="button"
        className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-ink transition-colors"
      >
        More Actions
        <ChevronDown size={12} />
      </button>
    </div>
  );
}
