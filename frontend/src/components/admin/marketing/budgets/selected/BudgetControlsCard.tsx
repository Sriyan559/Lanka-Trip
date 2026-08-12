"use client";

import React from "react";
import { BudgetControlSetting } from "@/data/marketingBudgets.mock";

interface BudgetControlsCardProps {
  controls: BudgetControlSetting[];
}

export function BudgetControlsCard({ controls }: BudgetControlsCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Budget Controls
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          {controls.map((ctrl) => (
            <div key={ctrl.label} className="flex justify-between items-center text-[11px]">
              <span className="text-gray-500 font-medium">{ctrl.label}</span>
              <span className="font-bold text-gray-900 font-mono">{ctrl.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
