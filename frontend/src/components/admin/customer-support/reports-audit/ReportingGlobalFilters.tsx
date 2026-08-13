'use client';

import React from 'react';

export function ReportingGlobalFilters() {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs text-[10px] grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-2 text-slate-700">
      <div>
        <label className="text-slate-400 block font-medium">Time Range</label>
        <select className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold text-slate-900 text-[10px]">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Quarter</option>
        </select>
      </div>

      <div>
        <label className="text-slate-400 block font-medium">Primary Marketplace</label>
        <select className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold text-slate-900 text-[10px]">
          <option>All Marketplaces</option>
          <option>SL Beauty Core</option>
        </select>
      </div>

      <div>
        <label className="text-slate-400 block font-medium">Business Unit</label>
        <select className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold text-slate-900 text-[10px]">
          <option>All Business Units</option>
          <option>Retail</option>
          <option>Wholesale</option>
        </select>
      </div>

      <div>
        <label className="text-slate-400 block font-medium">Region</label>
        <select className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold text-slate-900 text-[10px]">
          <option>All Regions</option>
          <option>Sri Lanka</option>
        </select>
      </div>

      <div>
        <label className="text-slate-400 block font-medium">Support Segment</label>
        <select className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold text-slate-900 text-[10px]">
          <option>All Customer Segments</option>
          <option>VIP / Premium</option>
        </select>
      </div>

      <div>
        <label className="text-slate-400 block font-medium">Case Source</label>
        <select className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold text-slate-900 text-[10px]">
          <option>All Sources</option>
          <option>Web Portal</option>
        </select>
      </div>

      <div>
        <label className="text-slate-400 block font-medium">Data Source</label>
        <select className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold text-slate-900 text-[10px]">
          <option>All Sources</option>
          <option>API Warehouse</option>
        </select>
      </div>

      <div>
        <label className="text-slate-400 block font-medium">Knowledge Domain</label>
        <select className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold text-slate-900 text-[10px]">
          <option>All Domains</option>
          <option>Policy &amp; QA</option>
        </select>
      </div>

      <div>
        <label className="text-slate-400 block font-medium">Workforce Source</label>
        <select className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold text-slate-900 text-[10px]">
          <option>All Sources</option>
          <option>WFM Engine</option>
        </select>
      </div>

      <div>
        <label className="text-slate-400 block font-medium">Auto Refresh</label>
        <select className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold text-slate-900 text-[10px]">
          <option>5 Minutes</option>
          <option>1 Minute</option>
          <option>Off</option>
        </select>
      </div>

      <div>
        <label className="text-slate-400 block font-medium">Audit Zone</label>
        <select className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold text-slate-900 text-[10px]">
          <option>Prod &amp; QA</option>
          <option>Production Only</option>
        </select>
      </div>
    </div>
  );
}
