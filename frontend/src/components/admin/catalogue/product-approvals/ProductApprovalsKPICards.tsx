"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, ListTodo, AlertTriangle, HelpCircle, FileWarning, Search, FileText, FileCheck, ShieldAlert } from "lucide-react";
import { productApprovalsApi } from "@/services/api/productApprovals";

export function ProductApprovalsKPICards() {
  const [kpis, setKpis] = useState<any[]>([]);

  useEffect(() => {
    productApprovalsApi.getApprovalKPIs().then(setKpis);
  }, []);

  const getStatusIcon = (status?: string, id?: string) => {
    if (id === '1') return <ListTodo size={18} className="text-gray-500" />;
    if (status === 'success') return <CheckCircle2 size={18} className="text-green-600" />;
    if (status === 'warning') return <AlertTriangle size={18} className="text-orange-500" />;
    if (status === 'danger') return <ShieldAlert size={18} className="text-red-500" />;
    if (status === 'info') return <HelpCircle size={18} className="text-blue-500" />;
    return <FileText size={18} className="text-gray-500" />;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'danger': return 'text-red-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-900';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {kpis.map((kpi) => (
        <div key={kpi.id} className="bg-white border border-line rounded-lg p-4 shadow-sm flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <span className="text-[11px] text-muted font-medium uppercase">{kpi.label}</span>
            <div className="p-1.5 rounded-full bg-slate-50 border border-line">
              {getStatusIcon(kpi.status, kpi.id)}
            </div>
          </div>
          <div className="flex items-end gap-2 mt-auto">
            <span className={`text-2xl font-bold ${getStatusColor(kpi.status)}`}>{kpi.value}</span>
            {kpi.trend && (
              <span className={`text-xs font-medium mb-1 ${kpi.trendDirection === 'down' ? 'text-red-500' : 'text-green-500'}`}>
                {kpi.trendDirection === 'down' ? '↓' : '↑'} {kpi.trend}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
