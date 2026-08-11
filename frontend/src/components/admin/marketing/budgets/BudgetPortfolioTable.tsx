"use client";

import React from "react";
import { BudgetRecord } from "@/data/marketingBudgets.mock";
import { BudgetStatusBadge } from "./BudgetStatusBadge";
import { MoreVertical, DollarSign } from "lucide-react";

interface BudgetPortfolioTableProps {
  budgets: BudgetRecord[];
  selectedId: string;
  onSelectBudget: (budget: BudgetRecord) => void;
  selectedCheckboxes: string[];
  onToggleCheckbox: (id: string) => void;
  onToggleAllCheckboxes: () => void;
}

export function BudgetPortfolioTable({
  budgets = [],
  selectedId,
  onSelectBudget,
  selectedCheckboxes = [],
  onToggleCheckbox,
  onToggleAllCheckboxes,
}: BudgetPortfolioTableProps) {
  const isAllSelected =
    budgets.length > 0 && selectedCheckboxes.length === budgets.length;

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl shadow-2xs overflow-hidden flex flex-col">
      {/* Header Title Bar */}
      <div className="p-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Marketing Budget Portfolio
          </h3>
          <p className="text-[11px] text-gray-500">
            Approved and planned marketing budgets across business units, campaigns, channels and initiatives.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-xs text-gray-700 font-sans border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
              <th className="py-2.5 px-3 w-8">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleAllCheckboxes}
                  className="rounded border-gray-300 text-[#800020] focus:ring-[#800020] cursor-pointer"
                />
              </th>
              <th className="py-2.5 px-3">Budget</th>
              <th className="py-2.5 px-3">Budget ID</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Budget Type</th>
              <th className="py-2.5 px-3">Owner</th>
              <th className="py-2.5 px-3">Business Unit</th>
              <th className="py-2.5 px-3">Brand</th>
              <th className="py-2.5 px-3">Period</th>
              <th className="py-2.5 px-3 text-right">Approved Budget</th>
              <th className="py-2.5 px-3 text-right">Committed</th>
              <th className="py-2.5 px-3 text-right">Actual Spend</th>
              <th className="py-2.5 px-3 text-right">Unspent Balance</th>
              <th className="py-2.5 px-3 text-center">Utilization %</th>
              <th className="py-2.5 px-3 text-center">Commitment Coverage %</th>
              <th className="py-2.5 px-3 text-right">Forecast Final Spend</th>
              <th className="py-2.5 px-3 text-right">Forecast % Variance</th>
              <th className="py-2.5 px-3">Spend Health</th>
              <th className="py-2.5 px-3">Approval</th>
              <th className="py-2.5 px-3">Last Updated</th>
              <th className="py-2.5 px-3 text-center w-10">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {budgets.length === 0 ? (
              <tr>
                <td colSpan={21} className="py-8 text-center text-gray-500 font-normal">
                  No marketing budgets found for the selected filters.
                </td>
              </tr>
            ) : (
              budgets.map((bgt) => {
                const isSelected = selectedId === bgt.id;
                const isChecked = selectedCheckboxes.includes(bgt.id);

                return (
                  <tr
                    key={bgt.id}
                    onClick={() => onSelectBudget(bgt)}
                    className={`transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "bg-rose-50/50 hover:bg-rose-50"
                        : "hover:bg-gray-50/80"
                    }`}
                  >
                    <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleCheckbox(bgt.id)}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020] cursor-pointer"
                      />
                    </td>
                    <td className="py-2.5 px-3 font-bold text-gray-900 flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                      <span className={isSelected ? "text-[#800020]" : ""}>{bgt.budgetName}</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-gray-600">
                      {bgt.budgetId}
                    </td>
                    <td className="py-2.5 px-3">
                      <BudgetStatusBadge status={bgt.status} type="status" />
                    </td>
                    <td className="py-2.5 px-3 text-gray-700">{bgt.budgetType}</td>
                    <td className="py-2.5 px-3 text-gray-800 font-semibold">{bgt.owner}</td>
                    <td className="py-2.5 px-3 text-gray-600">{bgt.businessUnit}</td>
                    <td className="py-2.5 px-3 text-gray-600">{bgt.brand}</td>
                    <td className="py-2.5 px-3 text-gray-600 text-[11px]">{bgt.period}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-gray-900">
                      {bgt.approvedBudget}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-emerald-700">
                      {bgt.committed}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-blue-700">
                      {bgt.actualSpend}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-orange-700">
                      {bgt.unspentBalance}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 min-w-[70px]">
                        <span className="font-bold text-gray-900 text-[11px]">
                          {bgt.utilizationPercent}%
                        </span>
                        <div className="w-10 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${Math.min(bgt.utilizationPercent, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 min-w-[70px]">
                        <span className="font-bold text-gray-900 text-[11px]">
                          {bgt.commitmentCoveragePercent}%
                        </span>
                        <div className="w-10 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full"
                            style={{ width: `${Math.min(bgt.commitmentCoveragePercent, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-gray-900">
                      {bgt.forecastFinalSpend}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-gray-900">
                      <span className={bgt.forecastVariancePercent.startsWith("+") ? "text-rose-600 font-bold" : "text-emerald-700 font-bold"}>
                        {bgt.forecastVariancePercent}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <BudgetStatusBadge status={bgt.spendHealth} type="spendHealth" />
                    </td>
                    <td className="py-2.5 px-3">
                      <BudgetStatusBadge status={bgt.approval} type="approval" />
                    </td>
                    <td className="py-2.5 px-3 text-gray-500 text-[11px]">
                      {bgt.lastUpdated}
                    </td>
                    <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
