import React from 'react';
import Link from 'next/link';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  Users, UserCheck, Shield, Key, AlertTriangle, Play, HelpCircle, FileText,
  Activity, Settings, PlusCircle, ArrowUpRight, Search, FileBarChart
} from 'lucide-react';

interface OverviewRowProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

function OverviewRow({ label, value, highlight }: OverviewRowProps) {
  return (
    <div className="flex justify-between items-center text-[11px] font-semibold py-1 border-b border-gray-100 last:border-0">
      <span className="text-gray-500">{label}</span>
      <span className={`font-bold ${highlight ? 'text-red-600 bg-red-50 px-1.5 py-0.25 rounded' : 'text-gray-900'}`}>{value}</span>
    </div>
  );
}

export function AdministrationOperationalRail() {
  const score = 96;

  return (
    <div className="w-[300px] flex-shrink-0 flex flex-col gap-4 border-l border-gray-200 pl-4 py-1 min-h-screen">
      
      {/* A. Administration Health Gauge */}
      <div className="bg-white border border-gray-200 rounded p-3.5 shadow-sm flex flex-col items-center">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Administration Health</span>
        
        <div className="w-24 h-24 relative flex flex-col items-center justify-center mb-2">
          <CircularProgressbar
            value={score}
            strokeWidth={9}
            styles={buildStyles({
              pathColor: '#10b981', // green
              trailColor: '#f3f4f6',
              pathTransitionDuration: 0.5,
            })}
          />
          {/* Custom Overlay Text for 96 /100 style */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-gray-900 leading-none mt-1">{score}</span>
            <span className="text-[9px] font-bold text-gray-400">/100</span>
          </div>
        </div>
        
        <span className="text-[11px] font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
          Excellent
        </span>
      </div>

      {/* B. Identity & Platform Overview */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 pb-1 border-b border-gray-150">Identity & Platform Overview</h3>
        <div className="flex flex-col">
          <OverviewRow label="Active Users" value="428" />
          <OverviewRow label="Administrators" value="24" />
          <OverviewRow label="Privileged Admins" value="8" />
          <OverviewRow label="Roles" value="34" />
          <OverviewRow label="Pending Requests" value="11" />
          <OverviewRow label="Locked Accounts" value="1" highlight />
        </div>
      </div>

      {/* C. Platform Scope Overview */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 pb-1 border-b border-gray-150">Platform Scope Overview</h3>
        <div className="flex flex-col">
          <OverviewRow label="Tenants" value="12" />
          <OverviewRow label="Business Units" value="18" />
          <OverviewRow label="Channels" value="8" />
          <OverviewRow label="Countries" value="6" />
          <OverviewRow label="Languages" value="5" />
          <OverviewRow label="Currencies" value="7" />
        </div>
      </div>

      {/* D. Administration Operations */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 pb-1 border-b border-gray-150">Administration Operations</h3>
        <div className="flex flex-col">
          <OverviewRow label="Configuration Issues" value="6" highlight />
          <OverviewRow label="Security Warnings" value="4" highlight />
          <OverviewRow label="Failed Jobs" value="3" highlight />
          <OverviewRow label="Workflow Exceptions" value="4" highlight />
          <OverviewRow label="Provider Issues" value="2" highlight />
          <OverviewRow label="Governance Exceptions" value="5" highlight />
        </div>
      </div>

      {/* E. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 pb-1 border-b border-gray-150">Quick Queues</h3>
        <div className="flex flex-col">
          <OverviewRow label="Pending Admin Requests" value="11" />
          <OverviewRow label="Configuration Issues" value="6" />
          <OverviewRow label="Security Warnings" value="4" />
          <OverviewRow label="Failed Jobs" value="3" />
          <OverviewRow label="Governance Exceptions" value="5" />
          <OverviewRow label="Access Review Due" value="3" />
          <OverviewRow label="Workflow Exceptions" value="4" />
          <OverviewRow label="Provider Issues" value="2" />
        </div>
      </div>

      {/* F. Recommended Next Action (burgundy card) */}
      <div className="bg-[#741d35] text-white rounded p-3.5 shadow-sm">
        <div className="flex items-center gap-1.5 mb-2">
          <AlertTriangle size={14} className="text-amber-300" />
          <h4 className="text-[11px] font-bold uppercase tracking-wider">Recommended Next Action</h4>
        </div>
        <p className="text-[10px] font-semibold text-red-50 leading-relaxed mb-3">
          Review the six administration configuration issues before the next production change window. Two affect authentication settings and one affects email delivery performance.
        </p>
        <Link
          href="/admin/administration/system-configuration"
          className="block text-center w-full bg-white hover:bg-gray-100 text-[#741d35] font-extrabold text-[10px] py-1.5 rounded transition-colors shadow-sm"
        >
          View Configuration Issues
        </Link>
      </div>

      {/* G. Final Actions Links */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 pb-1 border-b border-gray-150">Final Actions</h3>
        <div className="flex flex-col gap-1">
          <Link href="/admin/administration" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <Activity size={12} />
            <span>Review Administration Health</span>
          </Link>
          <Link href="/admin/administration/users" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <PlusCircle size={12} />
            <span>Create Administrator</span>
          </Link>
          <Link href="/admin/administration" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <Settings size={12} />
            <span>Review Pending Requests</span>
          </Link>
          <Link href="/admin/administration/roles-permissions" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <Shield size={12} />
            <span>Review Privileged Administrators</span>
          </Link>
          <Link href="/admin/administration/system-configuration" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <Settings size={12} />
            <span>Review Configuration Issues</span>
          </Link>
          <Link href="/admin/administration" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <AlertTriangle size={12} />
            <span>Review Security Warnings</span>
          </Link>
          <Link href="/admin/administration/workflows" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <ArrowUpRight size={12} />
            <span>Review Workflow Exceptions</span>
          </Link>
          <Link href="/admin/administration" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <Play size={12} />
            <span>Review Failed Jobs</span>
          </Link>
          <Link href="/admin/administration" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <Settings size={12} />
            <span>Review Communication Health</span>
          </Link>
          <Link href="/admin/administration/data-governance" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <FileText size={12} />
            <span>Review Data Governance</span>
          </Link>
          <Link href="/admin/administration" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <AlertTriangle size={12} />
            <span>Review Administration Risks</span>
          </Link>
          <Link href="/admin/administration/reports-audit" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <FileBarChart size={12} />
            <span>Export Administration Report</span>
          </Link>
          <Link href="/admin/administration/reports-audit" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1">
            <Search size={12} />
            <span>Open Administration Audit</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
