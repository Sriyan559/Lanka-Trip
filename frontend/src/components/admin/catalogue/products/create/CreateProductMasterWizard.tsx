"use client";

import React from "react";
import { WizardSidebar } from "./WizardSidebar";
import { IngredientsAndSafetyStep } from "./IngredientsAndSafetyStep";
import { WizardFooter } from "./WizardFooter";
import { CheckCircle2 } from "lucide-react";

export function CreateProductMasterWizard() {
  const steps = [
    { label: "Identity", status: "complete" },
    { label: "Classification", status: "complete" },
    { label: "Brand & Supplier", status: "complete" },
    { label: "Content", status: "complete" },
    { label: "Ingredients & Safety", status: "active", index: 5 },
    { label: "Variants & Attributes", status: "pending", index: 6 },
    { label: "Images & Media", status: "pending", index: 7 },
    { label: "Pricing & Tax", status: "pending", index: 8 },
    { label: "Inventory & Publication", status: "pending", index: 9 },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Steps Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-line px-2">
        {steps.map((step, i) => (
          <div key={i} className={`flex items-center gap-2 py-2 px-3 rounded-full text-[12px] font-bold whitespace-nowrap ${
            step.status === 'complete' ? 'text-green-600' :
            step.status === 'active' ? 'bg-[#741d35] text-white' :
            'text-muted'
          }`}>
            {step.status === 'complete' ? <CheckCircle2 size={16} /> : <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step.status === 'active' ? 'bg-white text-[#741d35]' : 'border border-muted'}`}>{step.index}</div>}
            {step.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="flex flex-col gap-6">
           <IngredientsAndSafetyStep />
        </div>

        <div>
           <WizardSidebar />
        </div>
      </div>

      <WizardFooter />
    </div>
  );
}
