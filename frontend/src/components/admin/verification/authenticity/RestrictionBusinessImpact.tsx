import React from 'react';

const DEFAULT_METRICS = [
  { label: 'Products',       key: 'products',        icon: '📦' },
  { label: 'Listings',       key: 'listings',        icon: '📋' },
  { label: 'Suppliers',      key: 'suppliers',       icon: '🏭' },
  { label: 'Inventory Units',key: 'inventory_units', icon: '🗃️' },
  { label: 'Orders',         key: 'orders',          icon: '📑' },
  { label: 'Customers',      key: 'customers',       icon: '👤' },
  { label: 'Channels',       key: 'channels',        icon: '📡' },
  { label: 'Regions',        key: 'regions',         icon: '🗺️' },
];

interface RestrictionBusinessImpactProps {
  data?: Record<string, number | string>;
  financialExposure?: string | number;
  reputationalRisk?: string;
}

export function RestrictionBusinessImpact({
  data = {},
  financialExposure,
  reputationalRisk,
}: RestrictionBusinessImpactProps) {
  const exposure = financialExposure ?? data?.financial_exposure ?? '—';
  const repRisk = reputationalRisk ?? (data?.reputational_risk as string) ?? '—';

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm h-full">
      <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide mb-3">
        Restriction &amp; Business Impact
      </h3>

      <div className="grid grid-cols-4 gap-2 mb-3">
        {DEFAULT_METRICS.map((m) => (
          <div key={m.key} className="flex flex-col items-center bg-gray-50 border border-gray-100 rounded p-2 text-center">
            <span className="text-[14px] font-bold text-gray-900">{data[m.key] ?? 0}</span>
            <span className="text-[9px] text-gray-500 mt-0.5">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex-1 bg-red-50 border border-red-100 rounded p-2">
          <div className="text-[9px] font-semibold text-gray-500 mb-0.5">Financial Exposure (LKR)</div>
          <div className="text-[13px] font-bold text-red-700">{exposure.toLocaleString?.() ?? exposure}</div>
        </div>
        <div className="flex-1 bg-orange-50 border border-orange-100 rounded p-2">
          <div className="text-[9px] font-semibold text-gray-500 mb-0.5">Reputational Risk</div>
          <div className="text-[13px] font-bold text-orange-700">{repRisk}</div>
        </div>
      </div>
    </div>
  );
}
