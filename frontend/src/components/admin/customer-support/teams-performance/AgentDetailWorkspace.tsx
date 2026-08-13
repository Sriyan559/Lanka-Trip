'use client';

import React, { useState } from 'react';
import { AgentSkillItem, ShiftCoverageItem } from '@/types/teamsPerformance';

interface AgentDetailWorkspaceProps {
  skills: AgentSkillItem[];
  shifts: ShiftCoverageItem[];
}

export function AgentDetailWorkspace({ skills, shifts }: AgentDetailWorkspaceProps) {
  const [activeTab, setActiveTab] = useState('workload');

  return (
    <div className="space-y-2">
      {/* Agent Detail Tabs */}
      <div className="flex items-center gap-4 border-b border-slate-200 text-xs">
        {['Workload & Capacity', 'Skills', 'Performance', 'Coaching', 'History'].map((tab) => {
          const tabId = tab.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
          const isActive = activeTab === tabId || (activeTab === 'workload' && tabId === 'workload-capacity');
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tabId)}
              className={`pb-1 font-bold text-[11px] border-b-2 transition-colors ${
                isActive
                  ? 'border-[#881337] text-[#881337]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Main Agent Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.20fr)_minmax(0,1.40fr)_minmax(0,1.50fr)_minmax(0,1.80fr)] gap-2 text-xs items-start">
        {/* Card 1: Utilisation Trend & Channel Mix */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs space-y-2 flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Utilisation Trend (Last 7 Days)</h4>
            {/* SVG Line Graph */}
            <div className="bg-slate-50 p-1.5 rounded border border-slate-100 mb-2">
              <svg className="w-full h-16" viewBox="0 0 200 60">
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  points="10,35 40,38 70,25 100,22 130,30 160,45 190,32"
                />
                <circle cx="10" cy="35" r="2.5" className="fill-emerald-600" />
                <circle cx="40" cy="38" r="2.5" className="fill-emerald-600" />
                <circle cx="70" cy="25" r="2.5" className="fill-emerald-600" />
                <circle cx="100" cy="22" r="2.5" className="fill-emerald-600" />
                <circle cx="130" cy="30" r="2.5" className="fill-emerald-600" />
                <circle cx="160" cy="45" r="2.5" className="fill-emerald-600" />
                <circle cx="190" cy="32" r="2.5" className="fill-emerald-600" />
              </svg>
              <div className="flex justify-between text-[8px] text-slate-400 font-semibold px-1 mt-0.5">
                <span>Mon (76%)</span>
                <span>Tue (74%)</span>
                <span>Wed (81%)</span>
                <span>Thu (82%)</span>
                <span>Fri (78%)</span>
                <span>Sat (69%)</span>
                <span>Sun (76%)</span>
              </div>
            </div>

            <h4 className="font-bold text-slate-900 mb-1 text-xs">Channels Mix (Last 7 Days)</h4>
            <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded border border-slate-100 text-[10px]">
              {/* SVG Donut */}
              <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-blue-500" strokeWidth="6" strokeDasharray="40, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-emerald-500" strokeWidth="6" strokeDasharray="35, 100" strokeDashoffset="-40" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-indigo-500" strokeWidth="6" strokeDasharray="15, 100" strokeDashoffset="-75" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-slate-300" strokeWidth="6" strokeDasharray="10, 100" strokeDashoffset="-90" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>

              <div className="space-y-0.5 text-[9px] font-medium text-slate-700">
                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Email <strong className="text-slate-900 ml-auto">40%</strong></div>
                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Chat <strong className="text-slate-900 ml-auto">35%</strong></div>
                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Call <strong className="text-slate-900 ml-auto">15%</strong></div>
                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Other <strong className="text-slate-900 ml-auto">10%</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Skills & Coverage */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Skills &amp; Coverage (Agent)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[9px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                    <th className="py-1 px-1">Skill</th>
                    <th className="py-1 px-1">Level</th>
                    <th className="py-1 px-1">Proficiency</th>
                    <th className="py-1 px-1 text-center">Demand</th>
                    <th className="py-1 px-1 text-center">Staffed</th>
                    <th className="py-1 px-1 text-right">Gap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {skills.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-1 px-1 font-bold text-slate-900 whitespace-nowrap">{s.skill}</td>
                      <td className="py-1 px-1 text-slate-600">{s.level}</td>
                      <td className="py-1 px-1 text-slate-600">{s.proficiency}</td>
                      <td className="py-1 px-1 text-center">
                        <span className={`px-1 py-0.1 rounded font-bold ${s.demand === 'High' ? 'text-rose-700 bg-rose-50' : 'text-slate-600'}`}>
                          {s.demand}
                        </span>
                      </td>
                      <td className="py-1 px-1 text-center">
                        <span className={`px-1 py-0.1 rounded font-bold ${s.staffed === 'Good' ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'}`}>
                          {s.staffed}
                        </span>
                      </td>
                      <td className="py-1 px-1 text-right font-mono font-bold text-slate-900">{s.gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Card 3: Schedule & Shift Management */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Schedule &amp; Shift Management</h4>

            <span className="text-[10px] font-bold text-slate-500 block mb-1">Shift Coverage (May 12 – May 18)</span>
            <div className="overflow-x-auto mb-2">
              <table className="w-full text-left text-[9px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                    <th className="py-1 px-1">Shift</th>
                    <th className="py-1 px-1 text-center">Required</th>
                    <th className="py-1 px-1 text-center">Scheduled</th>
                    <th className="py-1 px-1 text-right">Coverage</th>
                    <th className="py-1 px-1 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {shifts.map((sh, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-1 px-1 font-bold text-slate-900 whitespace-nowrap">
                        {sh.shift} <span className="font-normal text-slate-400">({sh.timeWindow})</span>
                      </td>
                      <td className="py-1 px-1 text-center font-bold text-slate-800">{sh.required}</td>
                      <td className="py-1 px-1 text-center font-bold text-slate-800">{sh.scheduled}</td>
                      <td className="py-1 px-1 text-right font-bold text-emerald-600">{sh.coveragePercent}%</td>
                      <td className="py-1 px-1 text-center">
                        <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 rounded font-bold">
                          {sh.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <span className="text-[10px] font-bold text-slate-500 block mb-1">Coverage Trend (Required vs Scheduled)</span>
            <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
              <svg className="w-full h-16" viewBox="0 0 200 60">
                <polyline fill="none" stroke="#e11d48" strokeWidth="1.5" points="10,25 40,22 70,30 100,20 130,28 160,35 190,32" />
                <polyline fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 3" points="10,28 40,25 70,32 100,24 130,30 160,38 190,34" />
              </svg>
              <div className="flex items-center justify-between text-[8px] text-slate-500 font-semibold mt-0.5">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-rose-600"><span className="w-2 h-0.5 bg-rose-600" /> Required</span>
                  <span className="flex items-center gap-1 text-blue-600"><span className="w-2 h-0.5 bg-blue-600" /> Scheduled</span>
                </div>
                <span>May 12 - May 18</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Performance, QA & Coaching */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Performance, QA &amp; Coaching</h4>

            <div className="grid grid-cols-4 gap-1 text-[9px] mb-2 pb-1 border-b border-slate-100">
              <div><span className="text-slate-400 block">SLA Compliance</span><strong className="text-slate-900 font-bold text-xs">93%</strong></div>
              <div><span className="text-slate-400 block">CSAT</span><strong className="text-emerald-600 font-bold text-xs">96%</strong></div>
              <div><span className="text-slate-400 block">First Response</span><strong className="text-slate-900 font-bold text-xs">18m</strong></div>
              <div><span className="text-slate-400 block">Resolution Time</span><strong className="text-slate-900 font-bold text-xs">6.4h</strong></div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                <span className="text-[9px] font-bold text-slate-600 block mb-1">QA Performance (Last 30 Days)</span>
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
                    <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-200" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-emerald-500" strokeDasharray="95, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="absolute text-[8px] font-bold text-slate-900">95%</span>
                  </div>
                  <div className="text-[8px] space-y-0.5">
                    <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Compliant 420 (84%)</div>
                    <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Minor 60 (12%)</div>
                    <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Major 20 (4%)</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-1.5 rounded border border-slate-100 text-[8px] space-y-1">
                <span className="font-bold text-slate-600 block">Top Violations (Last 30 Days)</span>
                <div className="flex justify-between"><span>SLA Compliance</span><strong className="text-slate-900">92%</strong></div>
                <div className="flex justify-between"><span>Policy Adherence</span><strong className="text-slate-900">94%</strong></div>
                <div className="flex justify-between"><span>Communication</span><strong className="text-slate-900">96%</strong></div>
              </div>
            </div>

            {/* Coaching Queue */}
            <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
              <span className="text-[9px] font-bold text-slate-600 block mb-1">Coaching Queue</span>
              <div className="grid grid-cols-3 gap-1 text-[8px] font-medium text-center">
                <div className="bg-rose-100 text-rose-800 p-1 rounded font-bold">High (1-2 Days): 5</div>
                <div className="bg-amber-100 text-amber-800 p-1 rounded font-bold">Med (3-5 Days): 18</div>
                <div className="bg-blue-100 text-blue-800 p-1 rounded font-bold">Low (6-10 Days): 11</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
