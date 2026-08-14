import React from 'react';

interface SummaryCardsRowProps {
  overview?: any;
  loading?: boolean;
}

export function SummaryCardsRow({ overview, loading }: SummaryCardsRowProps = {}) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
      {/* 1. Access Review Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm flex flex-col justify-between min-h-[140px]">
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Access Review Summary</h3>
          <div className="grid grid-cols-3 gap-1 text-center">
            <div className="flex flex-col bg-gray-50 p-1.5 rounded">
              <span className="text-[10px] font-bold text-gray-500">Current</span>
              <strong className="text-sm font-extrabold text-gray-900 mt-0.5">19</strong>
            </div>
            <div className="flex flex-col bg-gray-50 p-1.5 rounded">
              <span className="text-[10px] font-bold text-gray-500">Due Soon</span>
              <strong className="text-sm font-extrabold text-orange-600 mt-0.5">3</strong>
            </div>
            <div className="flex flex-col bg-red-50 p-1.5 rounded border border-red-100">
              <span className="text-[10px] font-bold text-red-500">Overdue</span>
              <strong className="text-sm font-extrabold text-red-600 mt-0.5">2</strong>
            </div>
          </div>
        </div>
        <div className="mt-2 text-[10px] font-semibold text-gray-500">
          Last complete review: <span className="font-bold text-gray-800">May 15, 2026</span>
        </div>
      </div>

      {/* 2. Roles & Permissions Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm flex flex-col justify-between min-h-[140px]">
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Roles & Permissions Summary</h3>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="flex justify-between items-center text-[10px] font-semibold text-gray-600">
              <span>Active Roles</span>
              <strong className="text-gray-900">34</strong>
            </div>
            <div className="flex justify-between items-center text-[10px] font-semibold text-gray-600">
              <span>Permission Sets</span>
              <strong className="text-gray-900">76</strong>
            </div>
            <div className="flex justify-between items-center text-[10px] font-semibold text-gray-600">
              <span>Privileged Roles</span>
              <strong className="text-purple-700">8</strong>
            </div>
            <div className="flex justify-between items-center text-[10px] font-semibold text-red-600 bg-red-50 px-1 rounded">
              <span>Needs Review</span>
              <strong className="text-red-700">1</strong>
            </div>
          </div>
        </div>
        <div className="mt-2 text-[10px] font-semibold text-gray-500">
          Last change: <span className="font-bold text-gray-800">18 hours ago</span>
        </div>
      </div>

      {/* 3. Tenant / Organization Overview */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm flex flex-col justify-between min-h-[140px]">
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Tenant / Org Overview</h3>
          <div className="grid grid-cols-4 gap-1 text-center">
            <div className="flex flex-col bg-gray-50 p-1 rounded">
              <span className="text-[8px] font-bold text-gray-400">Tenants</span>
              <strong className="text-xs font-extrabold text-gray-900">12</strong>
            </div>
            <div className="flex flex-col bg-gray-50 p-1 rounded">
              <span className="text-[8px] font-bold text-gray-400">BUs</span>
              <strong className="text-xs font-extrabold text-gray-900">18</strong>
            </div>
            <div className="flex flex-col bg-gray-50 p-1 rounded">
              <span className="text-[8px] font-bold text-gray-400">Channels</span>
              <strong className="text-xs font-extrabold text-gray-900">8</strong>
            </div>
            <div className="flex flex-col bg-gray-50 p-1 rounded">
              <span className="text-[8px] font-bold text-gray-400">Countries</span>
              <strong className="text-xs font-extrabold text-gray-900">6</strong>
            </div>
          </div>
        </div>
        <div className="mt-2 text-[10px] font-semibold text-gray-500">
          Primary Hub: <span className="font-bold text-gray-800">Sri Lanka (Colombo)</span>
        </div>
      </div>

      {/* 4. Business Unit & Channel Status */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm flex flex-col justify-between min-h-[140px]">
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">BU & Channel Status</h3>
          <div className="flex flex-col gap-1 overflow-y-auto max-h-[85px] scrollbar-thin">
            <div className="flex justify-between items-center text-[9px] border-b border-gray-100 pb-0.5">
              <span className="font-bold text-gray-800 truncate max-w-[65px]" title="Retail BU">Retail</span>
              <span className="text-gray-500">2 CH</span>
              <span className="text-green-600 font-bold">Active</span>
              <span className="font-bold text-gray-900">96%</span>
            </div>
            <div className="flex justify-between items-center text-[9px] border-b border-gray-100 pb-0.5">
              <span className="font-bold text-gray-800 truncate max-w-[65px]" title="Marketplace BU">Marketplace</span>
              <span className="text-gray-500">2 CH</span>
              <span className="text-green-600 font-bold">Active</span>
              <span className="font-bold text-gray-900">94%</span>
            </div>
            <div className="flex justify-between items-center text-[9px] border-b border-gray-100 pb-0.5">
              <span className="font-bold text-gray-800 truncate max-w-[65px]" title="Logistics BU">Logistics</span>
              <span className="text-gray-500">1 CH</span>
              <span className="text-green-600 font-bold">Active</span>
              <span className="font-bold text-gray-900">93%</span>
            </div>
            <div className="flex justify-between items-center text-[9px] pb-0.5">
              <span className="font-bold text-gray-800 truncate max-w-[65px]" title="Corporate BU">Corporate</span>
              <span className="text-gray-500">2 CH</span>
              <span className="text-green-600 font-bold">Active</span>
              <span className="font-bold text-gray-900">97%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Maintenance Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm flex flex-col justify-between min-h-[140px]">
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Maintenance Summary</h3>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9px] font-semibold text-gray-600">
            <div className="flex justify-between">
              <span>Jobs Today</span>
              <strong className="text-gray-900">28</strong>
            </div>
            <div className="flex justify-between">
              <span>Completed</span>
              <strong className="text-green-600">25</strong>
            </div>
            <div className="flex justify-between">
              <span>Failed</span>
              <strong className="text-red-600">3</strong>
            </div>
            <div className="flex justify-between">
              <span>Maint Windows</span>
              <strong className="text-gray-900">2</strong>
            </div>
            <div className="flex justify-between">
              <span>Open Tasks</span>
              <strong className="text-gray-900">4</strong>
            </div>
            <div className="flex justify-between bg-red-50 px-0.5 rounded text-red-600">
              <span>Overdue Tasks</span>
              <strong className="text-red-700">1</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
