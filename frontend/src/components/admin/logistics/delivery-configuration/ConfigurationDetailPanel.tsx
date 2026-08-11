"use client";

import React, { useState } from "react";
import { ConfigurationRecord } from "@/types/logistics/deliveryConfiguration";
import { StatusBadge } from "../shared/StatusBadge";
import { DetailCard } from "../shared/DetailCard";
import { ReusableTabs } from "../shared/ReusableTabs";
import { StatusTimeline, TimelineStep } from "../shared/StatusTimeline";
import { CheckCircle2, Play, Settings } from "lucide-react";

interface ConfigurationDetailPanelProps {
  config: ConfigurationRecord;
  onRunSimulation?: () => void;
  onUpdateStatus?: (status: string) => void;
}

const DETAIL_SUB_TABS = [
  "Overview",
  "Rule Definition",
  "Zone Mapping",
  "Carrier Eligibility",
  "Warehouses",
  "Services",
  "Rates",
  "Capacity",
  "Cut-Offs",
  "SLA",
  "Surcharges",
  "Calendar",
  "Dependencies",
  "Impact Simulation",
  "Approvals",
  "Conflicts (0)",
  "Exceptions (0)",
  "Linked Records",
  "Activity",
  "Audit History",
];

const LIFECYCLE_STAGES = [
  { stage: "Draft Created", timestamp: "May 01", completed: true },
  { stage: "Rule Defined", timestamp: "May 02", completed: true },
  { stage: "Zone Mapping Validated", timestamp: "May 03", completed: true },
  { stage: "Carrier Eligibility Validated", timestamp: "May 05", completed: true },
  { stage: "Warehouse Eligibility Validated", timestamp: "May 06", completed: true },
  { stage: "Rate Validated", timestamp: "May 07", completed: true },
  { stage: "Capacity Validated", timestamp: "May 07", completed: true },
  { stage: "Cut-Off Validated", timestamp: "May 08", completed: true },
  { stage: "SLA Validated", timestamp: "May 08", completed: true },
  { stage: "Dependency Check", timestamp: "May 09", completed: true },
  { stage: "Impact Simulation Completed", timestamp: "May 09", completed: true },
  { stage: "Submitted for Review", timestamp: "May 10", completed: true },
  { stage: "Reviewed", timestamp: "May 11", completed: true },
  { stage: "Submitted for Approval", timestamp: "May 12", completed: true },
  { stage: "Approved", timestamp: "May 13", completed: true },
  { stage: "Scheduled", timestamp: "May 14", completed: true },
  { stage: "Active", timestamp: "May 15", completed: true, current: true },
  { stage: "Periodic Review", timestamp: "Jun 15", completed: false },
  { stage: "Suspended", timestamp: "--", completed: false },
  { stage: "Retired", timestamp: "--", completed: false },
  { stage: "Archived", timestamp: "--", completed: false },
];

export function ConfigurationDetailPanel({
  config,
  onRunSimulation,
  onUpdateStatus,
}: ConfigurationDetailPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState("Overview");

  const timelineSteps: TimelineStep[] = LIFECYCLE_STAGES.map((st) => ({
    label: st.stage,
    timestamp: st.timestamp,
    status: st.completed ? (st.current ? "current" : "completed") : "pending",
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-3">
      {/* Selected Configuration Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2.5 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-gray-900 tracking-tight">
                Selected Configuration: {config.configRef} — {config.configName}
              </h2>
              <StatusBadge status={config.activationStatus} size="sm" />
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Active Configuration
              </span>
            </div>
            <p className="text-[10.5px] text-gray-500 font-normal mt-0.5">
              Rule Type: <span className="font-semibold text-gray-800">{config.ruleType}</span> |{" "}
              Zone: <span className="font-semibold text-gray-800">{config.zoneName}</span> |{" "}
              Carrier: <span className="font-semibold text-gray-800">{config.carrier}</span> |{" "}
              Version: <span className="font-mono font-semibold text-gray-800">{config.version}</span>
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-1.5">
          {onRunSimulation && (
            <button
              type="button"
              onClick={onRunSimulation}
              className="text-[10.5px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2 py-1 rounded transition-colors flex items-center gap-1"
            >
              <Play className="w-3 h-3" />
              Run Impact Simulation
            </button>
          )}
          {onUpdateStatus && (
            <button
              type="button"
              onClick={() => onUpdateStatus("Suspended")}
              className="text-[10.5px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2 py-1 rounded transition-colors"
            >
              Suspend Rule
            </button>
          )}
        </div>
      </div>

      {/* 19 Sub-Tabs */}
      <div className="border-b border-gray-100 pb-1">
        <ReusableTabs
          tabs={DETAIL_SUB_TABS}
          activeTab={activeSubTab}
          onTabChange={setActiveSubTab}
        />
      </div>

      {/* Overview Tab Content */}
      {activeSubTab === "Overview" && (
        <div className="space-y-3">
          {/* Row 1: Quick Stats + Delivery Zone Hierarchy + Carrier Eligibility Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-2.5">
            {/* Quick Stats Grid */}
            <div className="lg:col-span-3">
              <DetailCard title="Quick Stats">
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                    <span className="text-gray-400 block text-[9.5px]">Affected Orders</span>
                    <span className="font-bold text-gray-900">12,456</span>
                  </div>
                  <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                    <span className="text-gray-400 block text-[9.5px]">Shipments (30D)</span>
                    <span className="font-bold text-blue-700">11,236</span>
                  </div>
                  <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                    <span className="text-gray-400 block text-[9.5px]">Active Carriers</span>
                    <span className="font-bold text-emerald-700">4</span>
                  </div>
                  <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                    <span className="text-gray-400 block text-[9.5px]">Active Services</span>
                    <span className="font-bold text-emerald-700">24</span>
                  </div>
                  <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                    <span className="text-gray-400 block text-[9.5px]">Capacity Used</span>
                    <span className="font-bold text-amber-700">1,356</span>
                  </div>
                  <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                    <span className="text-gray-400 block text-[9.5px]">SLA Compliance</span>
                    <span className="font-bold text-emerald-700">93%</span>
                  </div>
                </div>
              </DetailCard>
            </div>

            {/* Delivery Zone Hierarchy */}
            <div className="lg:col-span-4">
              <DetailCard title="Delivery Zone Hierarchy">
                <div className="text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Region:</span>
                    <span className="font-bold text-gray-900">{config.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Province:</span>
                    <span className="font-bold text-gray-900">{config.province}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">District:</span>
                    <span className="font-bold text-gray-900">{config.district}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">City / Area:</span>
                    <span className="font-bold text-gray-900">{config.cityArea}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Zone Code:</span>
                    <span className="font-mono font-bold text-gray-900">DZ-COL-01</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Zone Type / Status:</span>
                    <span className="font-bold text-emerald-700">Urban / Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Effective Window:</span>
                    <span className="text-gray-900">{config.effectiveFrom} — {config.effectiveTo}</span>
                  </div>
                </div>
              </DetailCard>
            </div>

            {/* Carrier Eligibility Matrix */}
            <div className="lg:col-span-5">
              <DetailCard title="Carrier Eligibility Matrix">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                      <tr>
                        <th className="p-1">Carrier</th>
                        <th className="p-1">Standard</th>
                        <th className="p-1">Express</th>
                        <th className="p-1">Same-Day</th>
                        <th className="p-1">COD</th>
                        <th className="p-1">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-1 font-bold text-gray-900">Domex</td>
                        <td className="p-1 text-emerald-700 font-bold">Eligible</td>
                        <td className="p-1 text-emerald-700 font-bold">Eligible</td>
                        <td className="p-1 text-emerald-700 font-bold">Eligible</td>
                        <td className="p-1 text-emerald-700 font-bold">Eligible</td>
                        <td className="p-1 text-emerald-700 font-bold">Active</td>
                      </tr>
                      <tr>
                        <td className="p-1 font-bold text-gray-900">Kandy Regional</td>
                        <td className="p-1 text-emerald-700 font-bold">Eligible</td>
                        <td className="p-1 text-emerald-700 font-bold">Eligible</td>
                        <td className="p-1 text-amber-700 font-bold">Limited</td>
                        <td className="p-1 text-emerald-700 font-bold">Eligible</td>
                        <td className="p-1 text-emerald-700 font-bold">Active</td>
                      </tr>
                      <tr>
                        <td className="p-1 font-bold text-gray-900">SpeedX Logistics</td>
                        <td className="p-1 text-emerald-700 font-bold">Eligible</td>
                        <td className="p-1 text-amber-700 font-bold">Limited</td>
                        <td className="p-1 text-rose-700 font-bold">Ineligible</td>
                        <td className="p-1 text-emerald-700 font-bold">Eligible</td>
                        <td className="p-1 text-amber-700 font-bold">Restricted</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </DetailCard>
            </div>
          </div>

          {/* Row 2: Rate Rule Summary + Capacity Management + SLA & Cut-off Promise + Impact Simulation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2.5">
            {/* Rate Rule Summary */}
            <div className="lg:col-span-3">
              <DetailCard title="Rate Rule Summary">
                <div className="text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Flat Rate:</span>
                    <span className="font-mono font-bold text-gray-900">LKR 180</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Weight Based (0-5kg):</span>
                    <span className="font-mono font-bold text-gray-900">LKR 220</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Distance Surcharge:</span>
                    <span className="font-mono font-bold text-gray-900">LKR 20 - 40</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Free Ship Threshold:</span>
                    <span className="font-mono font-bold text-emerald-700">LKR 3,000</span>
                  </div>
                </div>
              </DetailCard>
            </div>

            {/* Capacity Management */}
            <div className="lg:col-span-3">
              <DetailCard title="Capacity Management">
                <div className="text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Capacity Limit:</span>
                    <span className="font-mono font-bold text-gray-900">2,000 Orders/Day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Capacity Used:</span>
                    <span className="font-mono font-bold text-blue-700">1,356 (68%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Same-Day Limit:</span>
                    <span className="font-mono text-gray-900">500 (38%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Projected Utilisation:</span>
                    <span className="font-bold text-emerald-700">72% (Next 7 Days)</span>
                  </div>
                </div>
              </DetailCard>
            </div>

            {/* SLA Promise & Cut-Off */}
            <div className="lg:col-span-3">
              <DetailCard title="SLA &amp; Promise &amp; Cut-Off">
                <div className="text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Same-Day Cut-Off:</span>
                    <span className="font-bold text-gray-900">1:00 PM (Same-Day)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Next-Day Cut-Off:</span>
                    <span className="font-bold text-gray-900">4:00 PM (Next-Day)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Standard Ground:</span>
                    <span className="font-bold text-gray-900">6:00 PM (2-3 Days)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">SLA Compliance (30D):</span>
                    <span className="font-bold text-emerald-700">93%</span>
                  </div>
                </div>
              </DetailCard>
            </div>

            {/* Impact Simulation Card */}
            <div className="lg:col-span-3">
              <DetailCard title="Impact Simulation (What-If)">
                <div className="text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scenario:</span>
                    <span className="font-bold text-gray-900">Increase Orders by 20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Projected Capacity:</span>
                    <span className="font-bold text-blue-700">82%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">SLA Compliance Impact:</span>
                    <span className="font-bold text-amber-700">-3.2%</span>
                  </div>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={onRunSimulation}
                      className="w-full text-center text-[10.5px] font-bold py-1 bg-rose-700 text-white rounded hover:bg-rose-800 transition-colors"
                    >
                      Run New Simulation
                    </button>
                  </div>
                </div>
              </DetailCard>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tabs Fallback Content */}
      {activeSubTab !== "Overview" && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center text-xs text-gray-500">
          <p className="font-semibold text-gray-800">
            {activeSubTab} Data for {config.configName}
          </p>
          <p className="mt-1">Displaying rules, thresholds, and governance logs for {activeSubTab.toLowerCase()}.</p>
        </div>
      )}

      {/* Configuration Lifecycle / Workflow Timeline */}
      <div className="border-t border-gray-100 pt-2.5">
        <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight mb-2">
          Configuration Lifecycle / Workflow Timeline
        </h4>
        <StatusTimeline steps={timelineSteps} />
      </div>
    </div>
  );
}
