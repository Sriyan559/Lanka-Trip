"use client";

import React from "react";
import { ReportTemplateItem } from "@/data/marketingReportsAudit.mock";
import { ChevronRight } from "lucide-react";

interface ReportTemplatesCardProps {
  templates: ReportTemplateItem[];
}

export function ReportTemplatesCard({ templates }: ReportTemplatesCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          7. Report Templates
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          {templates.map((tmpl) => (
            <div
              key={tmpl.id}
              className="flex justify-between items-center p-1.5 rounded hover:bg-gray-50 text-gray-800 cursor-pointer font-medium text-[11px]"
            >
              <span>{tmpl.templateName}</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
