'use client';

import React from 'react';

export function NumberedAnalyticsGrid() {
  return (
    <div className="space-y-2">
      {/* Row 1: Cards 1, 2, 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.20fr)_minmax(0,1.40fr)_minmax(0,1.40fr)] gap-2 text-xs items-start">
        {/* 1. Report Distribution */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">1. Report Distribution</h4>
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded border border-slate-100 mb-1">
              <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-emerald-500" strokeWidth="5" strokeDasharray="69, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-amber-500" strokeWidth="5" strokeDasharray="15, 100" strokeDashoffset="-69" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-rose-500" strokeWidth="5" strokeDasharray="8, 100" strokeDashoffset="-84" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-blue-500" strokeWidth="5" strokeDasharray="8, 100" strokeDashoffset="-92" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>
              <div className="space-y-0.5 text-[8.5px]">
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Completed <strong className="text-slate-900 ml-1">148 (69%)</strong></div>
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> In Progress <strong className="text-slate-900 ml-1">32 (15%)</strong></div>
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Failed <strong className="text-slate-900 ml-1">18 (8%)</strong></div>
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Scheduled <strong className="text-slate-900 ml-1">16 (8%)</strong></div>
              </div>
            </div>
          </div>
          <div className="pt-0.5 border-t border-slate-100 flex justify-between text-[9px]">
            <span className="text-slate-500">Total Reports</span>
            <strong className="text-slate-900">214 (100%)</strong>
          </div>
        </div>

        {/* 2. Data Scope / Schedule & Delivery */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">2. Data Scope / Schedule &amp; Delivery</h4>
            <div className="space-y-0.5 text-[9px] text-slate-700">
              <div className="flex justify-between"><span>Daily Reports</span><span className="font-mono text-slate-900">116</span><strong className="text-slate-900">54.21%</strong></div>
              <div className="flex justify-between"><span>Weekly Reports</span><span className="font-mono text-slate-900">62</span><strong className="text-slate-900">28.97%</strong></div>
              <div className="flex justify-between"><span>Monthly Reports</span><span className="font-mono text-slate-900">18</span><strong className="text-slate-900">8.41%</strong></div>
              <div className="flex justify-between"><span>Ad-hoc Reports</span><span className="font-mono text-slate-900">18</span><strong className="text-slate-900">8.41%</strong></div>
            </div>
          </div>
          <div className="pt-0.5 border-t border-slate-100 flex justify-between text-[9px]">
            <span className="text-slate-500">Total</span>
            <strong className="text-slate-900">214 (100%)</strong>
          </div>
        </div>

        {/* 3. Generation History / Timeliness */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">3. Generation History / Timeliness</h4>
            <div className="bg-slate-50 p-1.5 rounded border border-slate-100 mb-1.5">
              <svg className="w-full h-14" viewBox="0 0 200 50">
                <line x1="0" y1="10" x2="200" y2="10" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="0" y1="25" x2="200" y2="25" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="0" y1="40" x2="200" y2="40" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2 2" />
                <polyline fill="none" stroke="#10b981" strokeWidth="1.5" points="0,12 30,10 60,15 90,8 120,13 150,8 180,11 200,7" />
                <polyline fill="none" stroke="#f59e0b" strokeWidth="1" points="0,32 30,35 60,30 90,36 120,31 150,33 180,29 200,32" />
                <polyline fill="none" stroke="#e11d48" strokeWidth="1" points="0,42 30,44 60,40 90,45 120,41 150,43 180,38 200,42" />
              </svg>
              <div className="flex justify-between text-[7px] text-slate-400 font-semibold px-0.5 mt-0.5">
                <span>Jul 16</span><span>Jul 17</span><span>Jul 18</span><span>Jul 19</span><span>Jul 20</span><span>Jul 21</span><span>Jul 22</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[8.5px] justify-between">
              <span className="flex items-center gap-1 text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> On Time <strong>(90.84%)</strong></span>
              <span className="flex items-center gap-1 text-amber-600"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Delayed <strong>(5.77%)</strong></span>
              <span className="flex items-center gap-1 text-rose-600"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Failed <strong>(3.39%)</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Cards 4, 5, 6, 7, 8 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.00fr)_minmax(0,1.10fr)_minmax(0,1.20fr)_minmax(0,1.10fr)_minmax(0,1.20fr)] gap-2 text-xs items-start">
        {/* 4. Schedule & Reports */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">4. Schedule &amp; Reports</h4>
            <div className="space-y-0.5 text-[8.5px]">
              <div className="flex justify-between"><span className="text-slate-500">Total Scheduled</span><strong className="text-slate-900">228</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Successfully Run</span><strong className="text-emerald-600">198 (86.84%)</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Missed / Skipped</span><strong className="text-amber-600">20 (8.77%)</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Failed</span><strong className="text-rose-600">10 (4.39%)</strong></div>
            </div>
          </div>
        </div>

        {/* 5. Export Jobs */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">5. Export Jobs</h4>
            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded border border-slate-100">
              <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-emerald-500" strokeWidth="5" strokeDasharray="84, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-rose-500" strokeWidth="5" strokeDasharray="11, 100" strokeDashoffset="-84" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-amber-500" strokeWidth="5" strokeDasharray="5, 100" strokeDashoffset="-95" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>
              <div className="space-y-0.5 text-[8px]">
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Completed <strong>122 (84%)</strong></div>
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Failed <strong>16 (11%)</strong></div>
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> In Progress <strong>8 (5%)</strong></div>
              </div>
            </div>
          </div>
          <div className="pt-0.5 border-t border-slate-100 flex justify-between text-[8px]">
            <span className="text-slate-400">Total Jobs</span>
            <strong className="text-slate-900">146</strong>
          </div>
        </div>

        {/* 6. Export Volumes */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">6. Export Volumes</h4>
            <div className="flex items-baseline justify-between mb-1">
              <strong className="text-slate-900 text-sm font-extrabold">3.42M</strong>
              <span className="text-[8px] text-emerald-600 font-bold">▲ 12% vs last month</span>
            </div>
            {/* Compact line chart */}
            <div className="bg-slate-50 p-1.5 rounded border border-slate-100 mb-1.5">
              <svg className="w-full h-10" viewBox="0 0 150 30">
                <polyline fill="none" stroke="#0d9488" strokeWidth="1.5" points="0,25 25,20 50,15 75,22 100,10 125,18 150,12" />
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[8px] text-slate-500 pt-0.5 border-t border-slate-100">
              <div>Avg. Size: <strong className="text-slate-800">23.4K</strong></div>
              <div>Avg. Duration: <strong className="text-slate-800">00:02:14</strong></div>
            </div>
          </div>
        </div>

        {/* 7. Import Jobs */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">7. Import Jobs</h4>
            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded border border-slate-100">
              <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-emerald-500" strokeWidth="5" strokeDasharray="83, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-rose-500" strokeWidth="5" strokeDasharray="10, 100" strokeDashoffset="-83" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-amber-500" strokeWidth="5" strokeDasharray="7, 100" strokeDashoffset="-93" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>
              <div className="space-y-0.5 text-[8px]">
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Completed <strong>48 (83%)</strong></div>
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Failed <strong>6 (10%)</strong></div>
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> In Progress <strong>4 (7%)</strong></div>
              </div>
            </div>
          </div>
          <div className="pt-0.5 border-t border-slate-100 flex justify-between text-[8px]">
            <span className="text-slate-400">Total Jobs</span>
            <strong className="text-slate-900">58</strong>
          </div>
        </div>

        {/* 8. Import Volumes */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">8. Import Volumes</h4>
            <div className="flex items-baseline justify-between mb-1">
              <strong className="text-slate-900 text-sm font-extrabold">618K</strong>
              <span className="text-[8px] text-emerald-600 font-bold">▲ 9% vs last month</span>
            </div>
            {/* Dense vertical bar chart */}
            <div className="flex items-end gap-0.5 h-10 px-1 justify-between mb-1.5 bg-slate-50 p-1 rounded border border-slate-100">
              <span className="w-1 bg-emerald-500 rounded-t-xs h-2" />
              <span className="w-1 bg-emerald-500 rounded-t-xs h-5" />
              <span className="w-1 bg-emerald-500 rounded-t-xs h-3" />
              <span className="w-1 bg-emerald-500 rounded-t-xs h-7" />
              <span className="w-1 bg-emerald-500 rounded-t-xs h-8" />
              <span className="w-1 bg-emerald-500 rounded-t-xs h-2" />
              <span className="w-1 bg-emerald-500 rounded-t-xs h-5" />
              <span className="w-1 bg-emerald-500 rounded-t-xs h-7" />
              <span className="w-1 bg-emerald-500 rounded-t-xs h-3" />
              <span className="w-1 bg-emerald-500 rounded-t-xs h-8" />
              <span className="w-1 bg-emerald-500 rounded-t-xs h-6" />
              <span className="w-1 bg-emerald-500 rounded-t-xs h-7" />
            </div>
            <div className="grid grid-cols-2 gap-1 text-[8px] text-slate-500 pt-0.5 border-t border-slate-100">
              <div>Avg. Size: <strong className="text-slate-800">13.6K</strong></div>
              <div>Avg. Duration: <strong className="text-slate-800">00:01:42</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Cards 9, 10, 11, 12 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.00fr)_minmax(0,1.20fr)_minmax(0,1.10fr)_minmax(0,1.20fr)] gap-2 text-xs items-start">
        {/* 9. Data Mappings */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">9. Data Mappings</h4>
            <div className="space-y-0.5 text-[8.5px]">
              <div className="flex justify-between"><span className="text-slate-500">Total Mappings</span><strong className="text-slate-900">142</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Active</span><strong className="text-emerald-600">128 (90.14%)</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Inactive</span><strong className="text-amber-600">10 (7.04%)</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Error</span><strong className="text-rose-600">4 (2.82%)</strong></div>
            </div>
          </div>
        </div>

        {/* 10. Change Success */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">10. Change Success</h4>
            <div className="bg-slate-50 p-1.5 rounded border border-slate-100 mb-1">
              <svg className="w-full h-10" viewBox="0 0 150 30">
                <polyline fill="none" stroke="#10b981" strokeWidth="1.5" points="0,8 25,6 50,11 75,5 100,9 125,7 150,4" />
                <polyline fill="none" stroke="#e11d48" strokeWidth="1" points="0,22 25,24 50,20 75,26 100,23 125,24 150,26" />
              </svg>
              <div className="flex justify-between text-[7px] text-slate-400 font-semibold px-0.5 mt-0.5">
                <span>Jul 16</span><span>Jul 19</span><span>Jul 22</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[8.5px]">
              <span className="flex items-center gap-1 text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Success <strong>(93.13%)</strong></span>
              <span className="flex items-center gap-1 text-rose-600"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Failed <strong>(6.87%)</strong></span>
            </div>
          </div>
        </div>

        {/* 11. Transfer Jobs & Monitor */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">11. Transfer Jobs &amp; Monitor</h4>
            <div className="space-y-0.5 text-[8.5px]">
              <div className="flex justify-between"><span className="text-slate-500">Total Transfers</span><strong className="text-slate-900">92</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Completed</span><strong className="text-emerald-600">74 (80.43%)</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Failed</span><strong className="text-rose-600">11 (11.96%)</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Pending</span><strong className="text-blue-600">7 (7.61%)</strong></div>
            </div>
          </div>
        </div>

        {/* 12. Transfer Exceptions */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">12. Transfer Exceptions</h4>
            <div className="bg-slate-50 p-1.5 rounded border border-slate-100 mb-1">
              <svg className="w-full h-10" viewBox="0 0 150 30">
                <polyline fill="none" stroke="#e11d48" strokeWidth="1.5" points="0,18 30,12 60,22 90,10 120,16 150,13" />
                <polyline fill="none" stroke="#f59e0b" strokeWidth="1" points="0,10 30,16 60,9 90,20 120,12 150,15" />
                <polyline fill="none" stroke="#3b82f6" strokeWidth="1" points="0,25 30,22 60,26 90,23 120,25 150,22" />
              </svg>
              <div className="flex justify-between text-[7px] text-slate-400 font-semibold px-0.5 mt-0.5">
                <span>Jul 16</span><span>Jul 19</span><span>Jul 22</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[8.5px] text-slate-600">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Blocking</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Warning</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Info</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Cards 13, 14, 15, 16 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.10fr)_minmax(0,1.20fr)_minmax(0,1.20fr)_minmax(0,1.10fr)] gap-2 text-xs items-start">
        {/* 13. Audit Trail */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">13. Audit Trail</h4>
            <div className="flex items-center justify-between gap-1">
              <div className="shrink-0">
                <strong className="text-slate-900 text-sm font-extrabold block">18,412</strong>
                <span className="text-[8px] text-emerald-600 font-bold block">▲ 14% vs last month</span>
              </div>
              {/* Compact bar chart aligned right */}
              <div className="flex items-end gap-0.5 h-8 pr-1 flex-1 justify-end">
                <span className="w-1 bg-emerald-500 rounded-t-xs h-1" />
                <span className="w-1 bg-emerald-500 rounded-t-xs h-2" />
                <span className="w-1 bg-emerald-500 rounded-t-xs h-1.5" />
                <span className="w-1 bg-emerald-500 rounded-t-xs h-3" />
                <span className="w-1 bg-emerald-500 rounded-t-xs h-4.5" />
                <span className="w-1 bg-emerald-500 rounded-t-xs h-3.5" />
                <span className="w-1 bg-emerald-500 rounded-t-xs h-5" />
                <span className="w-1 bg-emerald-500 rounded-t-xs h-2" />
                <span className="w-1 bg-emerald-500 rounded-t-xs h-4" />
                <span className="w-1 bg-emerald-500 rounded-t-xs h-3" />
                <span className="w-1 bg-emerald-500 rounded-t-xs h-1.5" />
                <span className="w-1 bg-emerald-500 rounded-t-xs h-3" />
                <span className="w-1 bg-emerald-500 rounded-t-xs h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* 14. Detected Audit & Event */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">14. Detected Audit &amp; Event</h4>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex justify-between"><span>Permission Changes</span><strong className="text-slate-900">2,140</strong></div>
              <div className="flex justify-between"><span>Report Exports</span><strong className="text-slate-900">3,085</strong></div>
              <div className="flex justify-between"><span>Data Exports</span><strong className="text-slate-900">2,875</strong></div>
              <div className="flex justify-between"><span>Data Imports</span><strong className="text-slate-900">1,982</strong></div>
              <div className="flex justify-between"><span>Data Deletions</span><strong className="text-slate-900">1,143</strong></div>
              <div className="flex justify-between"><span>Financial Actions</span><strong className="text-slate-900">1,478</strong></div>
            </div>
          </div>
        </div>

        {/* 15. Access & Evidence */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">15. Access &amp; Evidence</h4>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex justify-between"><span>Total Evidence Items</span><strong className="text-slate-900">24,835</strong></div>
              <div className="flex justify-between"><span>Access Requests</span><strong className="text-slate-900">4,210</strong></div>
              <div className="flex justify-between"><span>Access Grants</span><strong className="text-emerald-600">14,122</strong></div>
              <div className="flex justify-between"><span>Access Denials</span><strong className="text-rose-600">1,203</strong></div>
              <div className="flex justify-between"><span>Evidence Files</span><strong className="text-slate-900">5,300</strong></div>
            </div>
          </div>
        </div>

        {/* 16. Change Coverage */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">16. Change Coverage</h4>
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded border border-slate-100">
              <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-emerald-500" strokeWidth="4" strokeDasharray="94, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-[8px] font-extrabold text-slate-900">94%</span>
              </div>
              <div className="space-y-0.5 text-[8px]">
                <div>Complete: <strong className="text-slate-900">94.00%</strong></div>
                <div>Partial: <strong className="text-amber-600">4.50%</strong></div>
                <div>Missing: <strong className="text-rose-600">1.50%</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Cards 17, 18, 19, 20, 21, 22, 23 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.20fr)_minmax(0,1.10fr)_minmax(0,1.10fr)_minmax(0,1.00fr)_minmax(0,1.00fr)_minmax(0,1.00fr)_minmax(0,1.00fr)] gap-2 text-xs items-start">
        {/* 17. Retention Health */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">17. Retention Health</h4>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex justify-between"><span>In Retention</span><strong className="text-slate-900">2.43M</strong></div>
              <div className="flex justify-between"><span>Expiring &lt; 30 Days</span><strong className="text-amber-600">148K</strong></div>
              <div className="flex justify-between"><span>Expired</span><strong className="text-rose-600">32K</strong></div>
              <div className="flex justify-between"><span>Related</span><strong className="text-slate-900">12K</strong></div>
            </div>
          </div>
          <div className="pt-0.5 border-t border-slate-100 flex justify-between text-[8px]">
            <span className="text-slate-400">Retention Policy Compliance</span>
            <strong className="text-emerald-600">98.2%</strong>
          </div>
        </div>

        {/* 18. Retention Rule Hits */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">18. Retention Rule Hits</h4>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex justify-between"><span>Legal Hold</span><strong className="text-slate-900">6</strong></div>
              <div className="flex justify-between"><span>Regulatory Hold</span><strong className="text-slate-900">5</strong></div>
              <div className="flex justify-between"><span>Customer Policy Hold</span><strong className="text-slate-900">4</strong></div>
              <div className="flex justify-between"><span>Auto-Delete Executed</span><strong className="text-slate-900">2</strong></div>
            </div>
          </div>
        </div>

        {/* 19. Reporting Frequency */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">19. Reporting Frequency</h4>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex justify-between"><span>Daily</span><strong className="text-slate-900">116 (54.21%)</strong></div>
              <div className="flex justify-between"><span>Weekly</span><strong className="text-slate-900">62 (28.97%)</strong></div>
              <div className="flex justify-between"><span>Monthly</span><strong className="text-slate-900">18 (8.41%)</strong></div>
              <div className="flex justify-between"><span>Ad-hoc</span><strong className="text-slate-900">18 (8.41%)</strong></div>
            </div>
          </div>
        </div>

        {/* 20. Version History */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">20. Version History</h4>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div><span className="text-slate-400">Current Version:</span> <strong className="font-mono text-slate-900">7.2.1</strong></div>
              <div><span className="text-slate-400">Updated:</span> <span className="text-slate-600">Jul 22, 2026 09:45 AM</span></div>
              <div><span className="text-slate-400">Updated By:</span> <strong className="text-slate-800">System</strong></div>
            </div>
          </div>
        </div>

        {/* 21. Record Accuracy */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">21. Record Accuracy</h4>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex justify-between"><span>Accuracy Rate</span><strong className="text-emerald-600">99.42%</strong></div>
              <div className="flex justify-between"><span>Variance</span><strong className="text-slate-600">0.58%</strong></div>
            </div>
          </div>
        </div>

        {/* 22. System Health */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">22. System Health</h4>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex items-center gap-1 text-emerald-700 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> All Systems Operational</div>
              <div className="flex justify-between"><span className="text-slate-400">Latency:</span> <strong className="font-mono text-slate-900">123 ms</strong></div>
            </div>
          </div>
        </div>

        {/* 23. System Notifications */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">23. System Notifications</h4>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex items-center justify-between"><span className="flex items-center gap-1 text-rose-600 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Critical</span><strong className="text-rose-600">0</strong></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-1 text-amber-600 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Warning</span><strong className="text-amber-600">2</strong></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-1 text-blue-600 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Info</span><strong className="text-blue-600">3</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
