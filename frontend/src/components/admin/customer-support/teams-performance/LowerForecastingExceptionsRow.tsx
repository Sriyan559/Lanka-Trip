'use client';

import React from 'react';
import {
  WorkforceForecastItem,
  QueueForecastItem,
  WorkforceAlertItem,
  AssignmentHistoryItem,
} from '@/types/teamsPerformance';

interface LowerForecastingExceptionsRowProps {
  forecasts: WorkforceForecastItem[];
  queueForecasts: QueueForecastItem[];
  alerts: WorkforceAlertItem[];
  history: AssignmentHistoryItem[];
}

export function LowerForecastingExceptionsRow({
  forecasts,
  queueForecasts,
  alerts,
  history,
}: LowerForecastingExceptionsRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1.35fr)_minmax(0,1.55fr)_minmax(0,1.75fr)] gap-2 text-xs items-start">
      {/* 1. Forecasting & Staffing */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1 text-xs">Forecasting &amp; Staffing</h4>
          <div className="overflow-x-auto mb-1">
            <table className="w-full text-left text-[9px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Date</th>
                  <th className="py-1 px-1 text-center">Required</th>
                  <th className="py-1 px-1 text-center">Scheduled</th>
                  <th className="py-1 px-1 text-center">Gap</th>
                  <th className="py-1 px-1 text-right">Peak Vol</th>
                  <th className="py-1 px-1 text-right">Peak Hrs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {forecasts.map((f, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-1 px-1 font-bold text-slate-900 whitespace-nowrap">{f.date}</td>
                    <td className="py-1 px-1 text-center font-bold text-slate-800">{f.required.toLocaleString()}</td>
                    <td className="py-1 px-1 text-center font-bold text-slate-800">{f.scheduled.toLocaleString()}</td>
                    <td className={`py-1 px-1 text-center font-bold ${f.gap < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {f.gap}
                    </td>
                    <td className="py-1 px-1 text-right font-mono text-slate-700">{f.peakVolume.toLocaleString()}</td>
                    <td className="py-1 px-1 text-right text-slate-500 whitespace-nowrap">{f.peakHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-[8px] text-slate-500 space-y-0.5 pt-1 border-t border-slate-100">
            <p><strong className="text-rose-600">Red</strong> indicates deficit vs forecasted capacity</p>
            <p><strong className="text-emerald-600">Green</strong> indicates surplus vs forecasted capacity</p>
          </div>
        </div>
      </div>

      {/* 2. Queue Forecast (Next 7 Days) */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1 text-xs">Queue Forecast (Next 7 Days)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[9px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Queue</th>
                  <th className="py-1 px-1 text-center">Cases</th>
                  <th className="py-1 px-1 text-center">Avg/Day</th>
                  <th className="py-1 px-1 text-center">Required</th>
                  <th className="py-1 px-1 text-center">Scheduled</th>
                  <th className="py-1 px-1 text-center">Gap</th>
                  <th className="py-1 px-1 text-center">Utilisation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {queueForecasts.map((q, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-1 px-1 font-bold text-slate-900 whitespace-nowrap">{q.queue}</td>
                    <td className="py-1 px-1 text-center font-bold text-slate-800">{q.cases}</td>
                    <td className="py-1 px-1 text-center text-slate-600">{q.avgPerDay}</td>
                    <td className="py-1 px-1 text-center font-semibold text-slate-800">{q.required}</td>
                    <td className="py-1 px-1 text-center font-semibold text-slate-800">{q.scheduled}</td>
                    <td className={`py-1 px-1 text-center font-bold ${q.gap < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {q.gap}
                    </td>
                    <td className="py-1 px-1 text-center text-emerald-600 font-bold">~</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3. Exceptions & Alerts */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1 text-xs">Exceptions &amp; Alerts</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[9px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Alert Type</th>
                  <th className="py-1 px-1">Description</th>
                  <th className="py-1 px-1">Severity</th>
                  <th className="py-1 px-1">Team</th>
                  <th className="py-1 px-1 text-center">Agents</th>
                  <th className="py-1 px-1 text-right">Since</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {alerts.map((a, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-1 px-1 font-bold text-slate-900 whitespace-nowrap">{a.type}</td>
                    <td className="py-1 px-1 text-slate-600 whitespace-normal break-words">{a.description}</td>
                    <td className="py-1 px-1">
                      <span className={`px-1 py-0.1 rounded font-bold ${a.severity === 'High' ? 'bg-rose-100 text-rose-800' : a.severity === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                        {a.severity}
                      </span>
                    </td>
                    <td className="py-1 px-1 text-slate-700 whitespace-nowrap">{a.team}</td>
                    <td className="py-1 px-1 text-center font-bold text-slate-900">{a.agentsCount}</td>
                    <td className="py-1 px-1 text-right text-slate-500 whitespace-nowrap">{a.since}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-1 mt-1 border-t border-slate-100 flex justify-end">
          <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
            View all alerts &gt;
          </button>
        </div>
      </div>

      {/* 4. Assignment / Reassignment History */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1 text-xs">Assignment / Reassignment History</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[9px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Agent</th>
                  <th className="py-1 px-1">From/To Team</th>
                  <th className="py-1 px-1">Reason</th>
                  <th className="py-1 px-1">Date</th>
                  <th className="py-1 px-1 text-center">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {history.map((h, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-1 px-1 font-bold text-slate-900 whitespace-nowrap">{h.agentName}</td>
                    <td className="py-1 px-1 text-slate-700 whitespace-nowrap">{h.toTeam}</td>
                    <td className="py-1 px-1 text-slate-600 whitespace-nowrap">{h.reason}</td>
                    <td className="py-1 px-1 text-slate-500 whitespace-nowrap">{h.date}</td>
                    <td className="py-1 px-1 text-center text-emerald-600 font-bold">
                      {h.impactPositive ? '↑' : '↓'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-1 mt-1 border-t border-slate-100 flex justify-end">
          <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
            View all history &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
