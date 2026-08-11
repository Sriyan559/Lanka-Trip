"use client";

import React from "react";
import { ApprovalWorkflowStage } from "@/data/marketingBudgets.mock";

interface ApprovalWorkflowCardProps {
  workflow: ApprovalWorkflowStage[];
}

export function ApprovalWorkflowCard({ workflow }: ApprovalWorkflowCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Approval Workflow
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          {workflow.map((st) => (
            <div key={st.id} className="flex justify-between items-center text-[11px]">
              <span className="text-gray-700 font-semibold">{st.role}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-700">{st.status}</span>
                <span className="text-gray-400 font-mono">{st.date}</span>
              </div>
            </div>
          ))}
          <div className="pt-1.5 border-t border-gray-100 flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Pending Approvals</span>
            <span className="font-bold text-emerald-700">None</span>
          </div>
        </div>
      </div>
    </div>
  );
}
