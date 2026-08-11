"use client";

import React from "react";
import Link from "next/link";
import { MARKETING_BUDGETS_MOCK_DATA } from "@/data/marketingBudgets.mock";
import { SelectedBudgetWorkspace } from "@/components/admin/marketing/budgets/selected/SelectedBudgetWorkspace";
import { BudgetContextStrip } from "@/components/admin/marketing/budgets/BudgetContextStrip";
import { ArrowLeft } from "lucide-react";

export default function BudgetDetailPage({
  params,
}: {
  params: { budgetId: string };
}) {
  const { budgetId } = params;

  // Find details by budgetId
  const details =
    MARKETING_BUDGETS_MOCK_DATA.selectedBudgetDetails[budgetId] ||
    MARKETING_BUDGETS_MOCK_DATA.selectedBudgetDetails["BUD-2026-0001"] ||
    null;

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col gap-3">
        {/* Top Breadcrumb & Return Link */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200/80 shadow-2xs">
          <Link
            href="/admin/marketing/budgets"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Marketing Budgets</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Link href="/admin/marketing" className="hover:text-[#800020]">
              Marketing
            </Link>
            <span>/</span>
            <Link
              href="/admin/marketing/budgets"
              className="hover:text-[#800020]"
            >
              Budgets
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{budgetId}</span>
          </div>
        </div>

        {/* Context Strip */}
        <BudgetContextStrip context={MARKETING_BUDGETS_MOCK_DATA.context} />

        {/* Selected Budget Workspace */}
        <SelectedBudgetWorkspace details={details} />
      </div>
    </div>
  );
}
