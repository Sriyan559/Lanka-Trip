'use client';

import React from 'react';
import {
  QaEvaluationItem,
  ScorecardCategoryItem,
  CriticalDefectItem,
} from '@/types/satisfactionQa';
import { CheckCircle2, ExternalLink } from 'lucide-react';

interface EvaluationsScorecardRowProps {
  evaluations: QaEvaluationItem[];
  selectedEvalId: string;
  onSelectEval: (id: string) => void;
  categories: ScorecardCategoryItem[];
  defects: CriticalDefectItem[];
  onOpenCase?: (caseId: string) => void;
  onOpenConversation?: () => void;
  onInviteEvidence?: () => void;
}

export function EvaluationsScorecardRow({
  evaluations,
  selectedEvalId,
  onSelectEval,
  categories,
  defects,
  onOpenCase,
  onOpenConversation,
  onInviteEvidence,
}: EvaluationsScorecardRowProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Passed':
        return 'bg-emerald-100 text-emerald-800';
      case 'Needs Attention':
        return 'bg-amber-100 text-amber-800';
      case 'Review Due':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-rose-100 text-rose-800';
    }
  };

  const selectedEval = (evaluations && evaluations.length > 0)
    ? (evaluations.find((e) => e.id === selectedEvalId) || evaluations[0])
    : {
        id: '1',
        evaluationId: 'QA-2026-00421',
        caseId: 'CS-586129',
        customerName: 'S. Richards',
        agentName: 'J. Patel',
        teamName: 'Cust Ops',
        channel: 'Chat',
        evaluatorName: 'A. Perera',
        score: 97,
        qaScore: 97,
        criticalDefects: 0,
        policyAdherence: 90,
        status: 'Passed' as const,
        evaluatedAt: 'May 18, 10:02 AM',
      };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.80fr)_minmax(0,1.40fr)_minmax(0,1.10fr)_minmax(0,1.10fr)] gap-2 text-xs items-start">
      {/* Section D: QA Evaluation Portfolio */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">D. QA Evaluation Portfolio</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Evaluation ID</th>
                  <th className="py-1 px-1">Case</th>
                  <th className="py-1 px-1">Customer</th>
                  <th className="py-1 px-1">Agent</th>
                  <th className="py-1 px-1">Team</th>
                  <th className="py-1 px-1">Channel</th>
                  <th className="py-1 px-1">Evaluator</th>
                  <th className="py-1 px-1 text-right">Score</th>
                  <th className="py-1 px-1 text-right">QA Score</th>
                  <th className="py-1 px-1 text-center text-rose-600">Critical Defect</th>
                  <th className="py-1 px-1 text-right">Policy Adherence</th>
                  <th className="py-1 px-1 text-center">Status</th>
                  <th className="py-1 px-1 text-right">Evaluated At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {evaluations.map((ev) => {
                  const isSelected = selectedEvalId === ev.id;
                  return (
                    <tr
                      key={ev.id}
                      onClick={() => onSelectEval(ev.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-rose-50/70 font-semibold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-1 px-1 font-mono font-bold text-slate-900 whitespace-nowrap">{ev.evaluationId}</td>
                      <td className="py-1 px-1 font-mono text-blue-600 font-medium whitespace-nowrap">{ev.caseId}</td>
                      <td className="py-1 px-1 text-slate-800 whitespace-nowrap">{ev.customerName}</td>
                      <td className="py-1 px-1 font-medium text-slate-900 whitespace-nowrap">{ev.agentName}</td>
                      <td className="py-1 px-1 text-slate-600 whitespace-nowrap">{ev.teamName}</td>
                      <td className="py-1 px-1 text-slate-600 whitespace-nowrap">{ev.channel}</td>
                      <td className="py-1 px-1 text-slate-600 whitespace-nowrap">{ev.evaluatorName}</td>
                      <td className="py-1 px-1 text-right font-bold text-slate-900">{ev.score}%</td>
                      <td className="py-1 px-1 text-right font-bold text-emerald-600">{ev.qaScore}%</td>
                      <td className="py-1 px-1 text-center font-bold text-rose-600">{ev.criticalDefects}</td>
                      <td className="py-1 px-1 text-right font-semibold text-slate-800">{ev.policyAdherence}%</td>
                      <td className="py-1 px-1 text-center">
                        <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] ${getStatusBadge(ev.status)}`}>
                          {ev.status}
                        </span>
                      </td>
                      <td className="py-1 px-1 text-right text-slate-500 text-[9px] whitespace-nowrap">{ev.evaluatedAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="pt-1 mt-1 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
          <span>1-5 of 142</span>
          <div className="flex items-center gap-1">
            <button type="button" className="px-1.5 py-0.2 bg-white border border-slate-300 rounded font-semibold text-slate-700">&lt;</button>
            <button type="button" className="px-1.5 py-0.2 bg-[#881337] text-white rounded font-bold">1</button>
            <button type="button" className="px-1.5 py-0.2 bg-white border border-slate-300 rounded font-semibold text-slate-700">2</button>
            <button type="button" className="px-1.5 py-0.2 bg-white border border-slate-300 rounded font-semibold text-slate-700">3</button>
            <span>...</span>
            <button type="button" className="px-1.5 py-0.2 bg-white border border-slate-300 rounded font-semibold text-slate-700">29</button>
            <button type="button" className="px-1.5 py-0.2 bg-white border border-slate-300 rounded font-semibold text-slate-700">&gt;</button>
          </div>
        </div>
      </div>

      {/* Section E: Selected QA Evaluation */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-bold text-slate-900 text-xs">
              E. Selected QA Evaluation — <span className="text-[#881337]">{selectedEval.evaluationId}</span>
            </h4>
            <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
              View Full Evaluation
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] mb-2 bg-slate-50 p-1.5 rounded border border-slate-100">
            <div>
              <div className="space-y-0.5 text-slate-700">
                <div><span className="text-slate-400">Case:</span> <strong className="text-blue-600 font-mono">{selectedEval.caseId}</strong></div>
                <div><span className="text-slate-400">Customer:</span> <strong className="text-slate-800">{selectedEval.customerName}</strong></div>
                <div><span className="text-slate-400">Agent:</span> <strong className="text-slate-800">{selectedEval.agentName}</strong></div>
                <div><span className="text-slate-400">Team:</span> <strong className="text-slate-800">{selectedEval.teamName}</strong></div>
                <div><span className="text-slate-400">Channel:</span> <strong className="text-slate-800">{selectedEval.channel}</strong></div>
                <div><span className="text-slate-400">Evaluator:</span> <strong className="text-slate-800">{selectedEval.evaluatorName}</strong></div>
                <div><span className="text-slate-400">Evaluated At:</span> <span className="text-slate-600">{selectedEval.evaluatedAt}</span></div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-1 text-[9px]">
                <div className="bg-white p-1 rounded border border-slate-200">
                  <span className="text-slate-400 block">QA Score</span>
                  <strong className="text-emerald-600 font-extrabold text-xs">{selectedEval.qaScore}%</strong>
                  <span className="text-emerald-600 font-bold block text-[8px]">Passed</span>
                </div>
                <div className="bg-white p-1 rounded border border-slate-200">
                  <span className="text-slate-400 block">Critical Defects</span>
                  <strong className="text-slate-900 font-extrabold text-xs">{selectedEval.criticalDefects}</strong>
                  <span className="text-emerald-600 font-bold block text-[8px]">None</span>
                </div>
                <div className="bg-white p-1 rounded border border-slate-200">
                  <span className="text-slate-400 block">Policy Adherence</span>
                  <strong className="text-slate-900 font-extrabold text-xs">{selectedEval.policyAdherence}%</strong>
                </div>
                <div className="bg-white p-1 rounded border border-slate-200">
                  <span className="text-slate-400 block">CSAT</span>
                  <strong className="text-slate-900 font-extrabold text-xs">92%</strong>
                </div>
                <div className="bg-white p-1 rounded border border-slate-200">
                  <span className="text-slate-400 block">CES</span>
                  <strong className="text-slate-900 font-extrabold text-xs">4.3 /5</strong>
                </div>
                <div className="bg-white p-1 rounded border border-slate-200">
                  <span className="text-slate-400 block">FCR</span>
                  <strong className="text-slate-900 font-extrabold text-xs">85%</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 text-[8px] mt-1 pt-1 border-t border-slate-200 text-slate-600">
                <div>Greeting &amp; Auth: <strong className="text-slate-900">96%</strong></div>
                <div>Info Accuracy: <strong className="text-slate-900">98%</strong></div>
                <div>Resolution Quality: <strong className="text-slate-900">97%</strong></div>
                <div>Closing Clarity: <strong className="text-slate-900">95%</strong></div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-1 mt-1 border-t border-slate-100 flex items-center gap-1.5 text-[9px]">
          <button
            type="button"
            onClick={() => onOpenCase && onOpenCase(selectedEval.caseId)}
            className="px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded border border-blue-200 hover:bg-blue-100"
          >
            Open Case
          </button>
          <button
            type="button"
            onClick={onOpenConversation}
            className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded hover:bg-slate-200"
          >
            Open Conversation
          </button>
          <button
            type="button"
            onClick={onInviteEvidence}
            className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded hover:bg-slate-200"
          >
            Invite Evidence
          </button>
        </div>
      </div>

      {/* Section F: QA Scorecard (QA-SC-v4) */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">F. QA Scorecard (QA-SC-v4)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[9px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Category</th>
                  <th className="py-1 px-1 text-center">Weight</th>
                  <th className="py-1 px-1 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {categories.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-1 px-1 font-medium text-slate-800 whitespace-nowrap">{c.category}</td>
                    <td className="py-1 px-1 text-center text-slate-500">{c.weight}%</td>
                    <td className="py-1 px-1 text-right font-bold text-emerald-600">{c.score}%</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold border-t border-slate-200">
                  <td className="py-1 px-1 text-slate-900">Total</td>
                  <td className="py-1 px-1 text-center text-slate-900">100%</td>
                  <td className="py-1 px-1 text-right text-emerald-600">97%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section G: Critical Defects & Severity */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">G. Critical Defects &amp; Severity</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[9px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Defect Type</th>
                  <th className="py-1 px-1 text-center">Count</th>
                  <th className="py-1 px-1 text-center">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {defects.map((d, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-1 px-1 font-medium text-slate-800 leading-tight whitespace-normal break-words">{d.type}</td>
                    <td className="py-1 px-1 text-center font-bold text-slate-900">{d.count}</td>
                    <td className="py-1 px-1 text-center">
                      <span className={`px-1 py-0.1 rounded font-bold text-[8px] ${d.severity === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-rose-50 text-rose-700'}`}>
                        {d.severity}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold border-t border-slate-200">
                  <td className="py-1 px-1 text-slate-900">Total</td>
                  <td className="py-1 px-1 text-center text-rose-600">7</td>
                  <td className="py-1 px-1 text-center">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
