import React from 'react';
import { Filter, RefreshCw, Save, Download, SlidersHorizontal, Eye } from 'lucide-react';

interface FiltersState {
  search: string;
  accountType: string;
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  role: string;
  privilege: string;
  state: string;
  authMethod: string;
  mfaStatus: string;
  reviewStatus: string;
  riskLevel: string;
  owner: string;
  lastActivity: string;
}

interface IdentityFiltersProps {
  filters: FiltersState;
  onFilterChange: (key: keyof FiltersState, value: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export function IdentityFilters({
  filters,
  onFilterChange,
  onApply,
  onClear
}: IdentityFiltersProps) {
  const selectClass = "bg-white border border-gray-200 rounded px-1.5 py-0.5 text-[10px] font-semibold text-gray-700 outline-none focus:border-gray-400 transition-colors h-6.5 min-w-[85px] cursor-pointer";

  return (
    <div className="flex flex-col gap-2 p-3 bg-gray-50 border border-gray-200 rounded mb-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        
        {/* User / Account Search */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">User / Account</span>
          <input
            type="text"
            placeholder="Search email/name..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="bg-white border border-gray-200 rounded px-2 py-0.5 text-[10px] font-semibold text-gray-700 outline-none focus:border-gray-400 transition-colors h-6.5 min-w-[110px]"
          />
        </div>

        {/* Account Type */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Account Type</span>
          <select
            value={filters.accountType}
            onChange={(e) => onFilterChange('accountType', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="human">Human User</option>
            <option value="service">Service Account</option>
          </select>
        </div>

        {/* Tenant */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Tenant</span>
          <select
            value={filters.tenant}
            onChange={(e) => onFilterChange('tenant', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="sl-beauty">SL Beauty</option>
          </select>
        </div>

        {/* Ecosystem */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Ecosystem</span>
          <select
            value={filters.ecosystem}
            onChange={(e) => onFilterChange('ecosystem', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="marketplace">Beauty Marketplace</option>
          </select>
        </div>

        {/* Business Unit */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Business Unit</span>
          <select
            value={filters.businessUnit}
            onChange={(e) => onFilterChange('businessUnit', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="retail">Retail</option>
            <option value="marketplace">Marketplace</option>
            <option value="logistics">Logistics</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>

        {/* Role */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Role</span>
          <select
            value={filters.role}
            onChange={(e) => onFilterChange('role', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="platform_admin">Platform Admin</option>
            <option value="security_admin">Security Admin</option>
            <option value="operations_admin">Operations Admin</option>
            <option value="bu_admin">BU Admin</option>
          </select>
        </div>

        {/* Privilege Level */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Privilege Level</span>
          <select
            value={filters.privilege}
            onChange={(e) => onFilterChange('privilege', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="full">Full</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Account State */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Account State</span>
          <select
            value={filters.state}
            onChange={(e) => onFilterChange('state', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="pending">Pending Invite</option>
            <option value="locked">Locked</option>
            <option value="suspended">Suspended</option>
            <option value="dormant">Dormant</option>
          </select>
        </div>

        {/* Authentication Method */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Auth Method</span>
          <select
            value={filters.authMethod}
            onChange={(e) => onFilterChange('authMethod', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="sso">SSO / SAML</option>
            <option value="password_mfa">Password + MFA</option>
            <option value="password">Password Fallback</option>
          </select>
        </div>

        {/* MFA Status */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">MFA Status</span>
          <select
            value={filters.mfaStatus}
            onChange={(e) => onFilterChange('mfaStatus', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled (Gap)</option>
          </select>
        </div>

        {/* Review Status */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Review Status</span>
          <select
            value={filters.reviewStatus}
            onChange={(e) => onFilterChange('reviewStatus', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="certified">Certified</option>
            <option value="due_soon">Due Soon</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Risk Level */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Risk Level</span>
          <select
            value={filters.riskLevel}
            onChange={(e) => onFilterChange('riskLevel', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        {/* Owner / Sponsor */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Owner / Sponsor</span>
          <select
            value={filters.owner}
            onChange={(e) => onFilterChange('owner', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="elena">Elena Vance</option>
            <option value="priya">Priya Kumar</option>
            <option value="arun">Arun Silva</option>
          </select>
        </div>

        {/* Last Activity */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Last Activity</span>
          <select
            value={filters.lastActivity}
            onChange={(e) => onFilterChange('lastActivity', e.target.value)}
            className={selectClass}
          >
            <option value="all">Any Time</option>
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-2 mt-1">
        <div className="flex items-center gap-1 text-[9px] font-bold text-gray-500">
          <span>Active: <strong className="text-gray-800">428</strong></span>
          <span className="mx-1">•</span>
          <span>Pending Invite: <strong className="text-gray-800">15</strong></span>
          <span className="mx-1">•</span>
          <span>Administrator: <strong className="text-gray-800">24</strong></span>
          <span className="mx-1">•</span>
          <span>Privileged: <strong className="text-gray-800">8</strong></span>
          <span className="mx-1">•</span>
          <span>MFA Missing: <strong className="text-red-600">6</strong></span>
          <span className="mx-1">•</span>
          <span>SSO Managed: <strong className="text-gray-800">286</strong></span>
          <span className="mx-1">•</span>
          <span>Local Auth: <strong className="text-gray-800">140</strong></span>
          <span className="mx-1">•</span>
          <span>Locked: <strong className="text-red-600">4</strong></span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onApply}
            className="px-3 h-6.5 text-[10px] font-bold text-white bg-[#741d35] hover:bg-[#5d172a] rounded shadow-sm flex items-center gap-1 transition-colors"
          >
            <Filter size={10} /> Apply Filters
          </button>
          
          <button
            onClick={onClear}
            className="px-3 h-6.5 text-[10px] font-bold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded shadow-sm transition-colors"
          >
            Clear All
          </button>

          <button
            className="p-1 text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded shadow-sm transition-colors"
            title="Save View"
          >
            <Save size={12} />
          </button>

          <button
            onClick={onApply}
            className="p-1 text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded shadow-sm transition-colors"
            title="Refresh Data"
          >
            <RefreshCw size={12} />
          </button>

          <button
            className="p-1 text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded shadow-sm transition-colors"
            title="Columns Visibility"
          >
            <Eye size={12} />
          </button>

          <button
            className="p-1 text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded shadow-sm transition-colors"
            title="Export Records"
          >
            <Download size={12} />
          </button>

          <button
            className="px-2 h-6.5 text-[10px] font-bold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded shadow-sm flex items-center gap-1 transition-colors"
            title="More Filters"
          >
            <SlidersHorizontal size={10} /> More Filters
          </button>
        </div>
      </div>
    </div>
  );
}
