'use client';

import React from 'react';
import {
  QualityDefectItem,
  ServiceInitiativeItem,
  ScorecardVersionItem,
} from '@/types/satisfactionQa';

interface DefectsGovernanceRowProps {
  defects: QualityDefectItem[];
  initiatives: ServiceInitiativeItem[];
  versions: ScorecardVersionItem[];
  onCreateCoachingAction?: () => void;
  onCreateKnowledgeGap?: () => void;
}

export function DefectsGovernanceRow({
  defects,
  initiatives,
  versions,
  onCreateCoachingAction,
  onCreateKnowledgeGap,
}: DefectsGovernanceRowProps) {
  return (
    <div className="space-y-2">
      {/* Upper sub-row: M, N, O, P, Q, R, S, T, U */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.50fr)_minmax(0,1.20fr)_minmax(0,1.00fr)_minmax(0,1.00fr)_minmax(0,1.00fr)_minmax(0,1.00fr)_minmax(0,1.10fr)_minmax(0,1.20fr)_minmax(0,1.10fr)] gap-2 text-xs items-start">
        {/* Section M: Quality Defect Portfolio */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">M. Quality Defect Portfolio</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[9px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                    <th className="py-1 px-1">Defect ID</th>
                    <th className="py-1 px-1">Category</th>
                    <th className="py-1 px-1">Severity</th>
                    <th className="py-1 px-1">Customer Impact</th>
                    <th className="py-1 px-1 text-center">Coaching Req</th>
                    <th className="py-1 px-1">Owner</th>
                    <th className="py-1 px-1">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {defects.map((d, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-1 px-1 font-mono font-bold text-slate-900 whitespace-nowrap">{d.defectId}</td>
                      <td className="py-1 px-1 text-slate-700 whitespace-nowrap">{d.category}</td>
                      <td className="py-1 px-1">
                        <span className={`px-1 py-0.1 rounded font-bold text-[8px] ${d.severity === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                          {d.severity}
                        </span>
                      </td>
                      <td className="py-1 px-1 text-slate-700 whitespace-nowrap">{d.customerImpact}</td>
                      <td className="py-1 px-1 text-center font-bold text-rose-600">{d.coachingRequired ? 'Yes' : 'No'}</td>
                      <td className="py-1 px-1 text-slate-700 whitespace-nowrap">{d.owner}</td>
                      <td className="py-1 px-1 whitespace-nowrap">
                        <span className="px-1 py-0.1 bg-amber-50 text-amber-800 rounded font-bold text-[8px]">
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pt-1 mt-1 border-t border-slate-100">
            <button type="button" className="text-[9px] text-blue-600 font-semibold hover:underline">
              View all 27 defects &gt;
            </button>
          </div>
        </div>

        {/* Section N: Root Cause Analysis */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">N. Root Cause Analysis</h4>
            <div className="space-y-1 text-[9px]">
              <div>
                <div className="flex justify-between text-slate-600 mb-0.5">
                  <span>Knowledge Gap</span>
                  <strong className="text-slate-900">38%</strong>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                  <div className="bg-rose-500 h-1 rounded-full" style={{ width: '38%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-600 mb-0.5">
                  <span>Process Ambiguity</span>
                  <strong className="text-slate-900">28%</strong>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                  <div className="bg-amber-500 h-1 rounded-full" style={{ width: '28%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-600 mb-0.5">
                  <span>Training Need</span>
                  <strong className="text-slate-900">18%</strong>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                  <div className="bg-purple-500 h-1 rounded-full" style={{ width: '18%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-600 mb-0.5">
                  <span>Policy Misinterpretation</span>
                  <strong className="text-slate-900">10%</strong>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                  <div className="bg-blue-500 h-1 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-600 mb-0.5">
                  <span>System Limitation</span>
                  <strong className="text-slate-900">6%</strong>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                  <div className="bg-slate-400 h-1 rounded-full" style={{ width: '6%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section O: Communication Quality */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">O. Communication Quality</h4>
            <div className="bg-slate-50 p-1.5 rounded border border-slate-100 mb-1.5 flex items-center justify-between">
              <span className="text-[9px] text-slate-500">Score</span>
              <strong className="text-emerald-600 font-extrabold text-xs">96% <span className="text-[8px] font-bold">▲ 1%</span></strong>
            </div>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex justify-between"><span>Clarity</span><strong className="text-slate-900">96%</strong></div>
              <div className="flex justify-between"><span>Empathy</span><strong className="text-slate-900">94%</strong></div>
              <div className="flex justify-between"><span>Professionalism</span><strong className="text-slate-900">98%</strong></div>
            </div>
          </div>
        </div>

        {/* Section P: Policy Adherence */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">P. Policy Adherence</h4>
            <div className="bg-slate-50 p-1.5 rounded border border-slate-100 mb-1.5 flex items-center justify-between">
              <span className="text-[9px] text-slate-500">Score</span>
              <strong className="text-emerald-600 font-extrabold text-xs">96% <span className="text-[8px] font-bold">▲ 1%</span></strong>
            </div>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex justify-between"><span>Policy Accuracy</span><strong className="text-slate-900">97%</strong></div>
              <div className="flex justify-between"><span>Escalation Handling</span><strong className="text-slate-900">94%</strong></div>
              <div className="flex justify-between"><span>Exception Handling</span><strong className="text-slate-900">92%</strong></div>
            </div>
          </div>
        </div>

        {/* Section Q: QA Sampling */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">Q. QA Sampling</h4>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex justify-between"><span>Risk-Based Sample</span><strong className="text-slate-900">12% (224)</strong></div>
              <div className="flex justify-between"><span>New Agent Sample</span><strong className="text-slate-900">15% (178)</strong></div>
              <div className="flex justify-between"><span>Safety Sample</span><strong className="text-slate-900">10% (118)</strong></div>
              <div className="flex justify-between pt-0.5 border-t border-slate-100"><span>Total Coverage</span><strong className="text-emerald-600">1.5% (1,248)</strong></div>
            </div>
          </div>
        </div>

        {/* Section R: Calibration */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">R. Calibration</h4>
            <div className="grid grid-cols-3 gap-0.5 text-[8px] text-center mb-1 bg-slate-50 p-1 rounded border border-slate-100">
              <div><span className="text-slate-400 block">Completed</span><strong className="text-slate-900 font-bold">12</strong></div>
              <div><span className="text-slate-400 block">Pending</span><strong className="text-purple-700 font-bold">6</strong></div>
              <div><span className="text-slate-400 block">Agreement</span><strong className="text-emerald-600 font-bold">92%</strong></div>
            </div>
            <span className="text-[8px] text-slate-500 block">Most Divergent: <strong>Resolution Quality</strong></span>
          </div>
        </div>

        {/* Section S: QA Appeals */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">S. QA Appeals</h4>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex justify-between"><span>Appeals: <strong className="text-slate-900">8</strong></span> <span>Original Score: <strong className="text-slate-900">76%</strong></span></div>
              <div className="flex justify-between text-slate-500"><span>Qa-2026-00411</span><span className="font-bold text-blue-600">Scoring Reviewed</span></div>
              <div className="flex justify-between text-slate-500"><span>Qa-2026-00405</span><span className="font-bold text-purple-600">In Review</span></div>
            </div>
          </div>
        </div>

        {/* Section T: Coaching Triggers (CS12 Integration) */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">T. Coaching Triggers</h4>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex justify-between"><span>Low QA Score (&lt;85%)</span><strong className="text-rose-600">12</strong></div>
              <div className="flex justify-between"><span>Critical Defects</span><strong className="text-rose-600">7</strong></div>
              <div className="flex justify-between"><span>Repeat Contact High</span><strong className="text-amber-600">10</strong></div>
              <div className="flex justify-between"><span>Policy Violation</span><strong className="text-amber-600">5</strong></div>
              <div className="flex justify-between"><span>CSAT Negative Trend</span><strong className="text-amber-600">6</strong></div>
              <div className="flex justify-between pt-0.5 border-t border-slate-100 font-bold"><span>Total Triggers</span><strong className="text-purple-700">18</strong></div>
            </div>
          </div>
          <div className="pt-1 mt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={onCreateCoachingAction}
              className="text-[8px] text-purple-700 font-bold hover:underline"
            >
              + Create Coaching Action (CS12)
            </button>
          </div>
        </div>

        {/* Section U: Corrective Actions (CS11 Integration) */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">U. Corrective Actions</h4>
            <div className="space-y-0.5 text-[8px] text-slate-700">
              <div className="flex justify-between"><span>Update Knowledge Article</span><strong className="text-slate-900">5</strong></div>
              <div className="flex justify-between"><span>Clarify Policy Guidance</span><strong className="text-slate-900">4</strong></div>
              <div className="flex justify-between"><span>Retrain / Workshop</span><strong className="text-slate-900">2</strong></div>
              <div className="flex justify-between"><span>Improve Visibility / Alerts</span><strong className="text-slate-900">3</strong></div>
              <div className="flex justify-between pt-0.5 border-t border-slate-100 font-bold"><span>Total Actions</span><strong className="text-[#881337]">14</strong></div>
            </div>
          </div>
          <div className="pt-1 mt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={onCreateKnowledgeGap}
              className="text-[8px] text-[#881337] font-bold hover:underline"
            >
              + Create Knowledge Gap (CS11)
            </button>
          </div>
        </div>
      </div>

      {/* Lower sub-row: V, W, X */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.80fr)_minmax(0,1.40fr)_minmax(0,1.40fr)] gap-2 text-xs items-start">
        {/* Section V: Service Excellence Initiatives */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">V. Service Excellence Initiatives</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[9px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                    <th className="py-1 px-1">Initiative</th>
                    <th className="py-1 px-1 text-center">Baseline</th>
                    <th className="py-1 px-1 text-center">Target</th>
                    <th className="py-1 px-1 text-center">Current</th>
                    <th className="py-1 px-1">Owner</th>
                    <th className="py-1 px-1 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {initiatives.map((ini, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-1 px-1 font-bold text-slate-900 whitespace-nowrap">{ini.name}</td>
                      <td className="py-1 px-1 text-center text-slate-500">{ini.baseline}</td>
                      <td className="py-1 px-1 text-center font-semibold text-slate-800">{ini.target}</td>
                      <td className="py-1 px-1 text-center font-bold text-emerald-600">{ini.current}</td>
                      <td className="py-1 px-1 text-slate-700 whitespace-nowrap">{ini.owner}</td>
                      <td className="py-1 px-1 text-center">
                        <span className={`px-1 py-0.1 rounded font-bold text-[8px] ${ini.status === 'On Track' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {ini.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section W: QA Governance */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">W. QA Governance</h4>
            <div className="space-y-1 text-[9px]">
              <div className="flex justify-between"><span className="text-slate-500">QA Policy</span><strong className="font-mono text-slate-900">SUP-QA-v4</strong> <span className="text-emerald-600 font-bold">Active</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Scorecard</span><strong className="font-mono text-slate-900">QA-SC-v4</strong> <span className="text-emerald-600 font-bold">Active</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Calibration Model</span><strong className="font-mono text-slate-900">CAL-MOD-3</strong> <span className="text-emerald-600 font-bold">Active</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Sampling Plan</span><strong className="font-mono text-slate-900">SAMP-PLAN-5</strong> <span className="text-emerald-600 font-bold">Active</span></div>
            </div>
          </div>
          <div className="pt-1 mt-1 border-t border-slate-100">
            <button type="button" className="text-[9px] text-blue-600 font-semibold hover:underline">
              View governance center &gt;
            </button>
          </div>
        </div>

        {/* Section X: Scorecard Versions */}
        <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">X. Scorecard Versions</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[9px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                    <th className="py-1 px-1">Version</th>
                    <th className="py-1 px-1 text-center">Status</th>
                    <th className="py-1 px-1">Effective From</th>
                    <th className="py-1 px-1">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {versions.map((ver, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-1 px-1 font-mono font-bold text-slate-900 whitespace-nowrap">{ver.version}</td>
                      <td className="py-1 px-1 text-center">
                        <span className={`px-1 py-0.1 rounded font-bold text-[8px] ${ver.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                          {ver.status}
                        </span>
                      </td>
                      <td className="py-1 px-1 text-slate-500 whitespace-nowrap">{ver.effectiveFrom}</td>
                      <td className="py-1 px-1 text-slate-600 whitespace-normal break-words">{ver.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
