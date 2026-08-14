'use client';

import React from 'react';
import { AuditKpiItem } from '@/lib/administration/reports-audit/reports-audit.types';
import { ReusableSparkline } from '@/components/shared/Chart/ReusableSparkline';

interface ReportsAuditKpiGridProps {
  row1Kpis: AuditKpiItem[];
  row2Kpis: AuditKpiItem[];
}

export function ReportsAuditKpiGrid({ row1Kpis, row2Kpis }: ReportsAuditKpiGridProps) {
  return (
    <div className="flex flex-col gap-2 mb-3">
      {/* Row 1 KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
        {row1Kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white border border-gray-200 rounded p-2 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block truncate">
                {kpi.title}
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-sm font-extrabold text-gray-900 leading-none">
                  {kpi.value}
                </span>
                {kpi.sparkline && (
                  <ReusableSparkline
                    data={kpi.sparkline}
                    width={40}
                    height={12}
                    color={kpi.color || '#10b981'}
                  />
                )}
              </div>
            </div>
            {kpi.status && (
              <div className="mt-1">
                <span
                  className={`text-[8px] font-bold px-1 py-0.25 rounded ${
                    kpi.status === 'Critical'
                      ? 'bg-rose-50 text-rose-700'
                      : kpi.status === 'Alert'
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {kpi.status}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Row 2 KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
        {row2Kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white border border-gray-200 rounded px-2 py-1.5 shadow-2xs flex flex-col justify-between"
          >
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wider block truncate">
              {kpi.title}
            </span>
            <span className="text-xs font-bold text-gray-800 leading-none mt-0.5">
              {kpi.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportsAuditKpiGrid;
