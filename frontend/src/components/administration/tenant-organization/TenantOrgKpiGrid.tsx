import React from 'react';
import {
  Building2,
  Globe,
  Network,
  Layers,
  Share2,
  Map,
  Flag,
  Scale,
  Briefcase,
  Compass,
  GitFork,
  Key,
  Shield,
  MapPin,
  PieChart,
  AlertCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Activity,
} from 'lucide-react';

interface TenantOrgKpiGridProps {
  kpis: Record<string, { value: number | string; trend: string }>;
}

export function TenantOrgKpiGrid({ kpis }: TenantOrgKpiGridProps) {
  const cards = [
    { label: 'Tenants', key: 'tenants', icon: Building2, color: 'text-[#741d35]' },
    { label: 'Active Ecosystems', key: 'activeEcosystems', icon: Globe, color: 'text-blue-600' },
    { label: 'Organizations', key: 'organizations', icon: Network, color: 'text-emerald-600' },
    { label: 'Business Units', key: 'businessUnits', icon: Layers, color: 'text-purple-600' },
    { label: 'Channels', key: 'channels', icon: Share2, color: 'text-indigo-600' },
    { label: 'Regions', key: 'regions', icon: Map, color: 'text-cyan-600' },
    { label: 'Countries', key: 'countries', icon: Flag, color: 'text-emerald-600' },
    { label: 'Legal Entities', key: 'legalEntities', icon: Scale, color: 'text-blue-600' },
    { label: 'Operating Entities', key: 'operatingEntities', icon: Briefcase, color: 'text-[#741d35]' },
    { label: 'Operating Areas', key: 'operatingAreas', icon: Compass, color: 'text-indigo-600' },
    { label: 'Parent Relationships', key: 'parentRelationships', icon: GitFork, color: 'text-purple-600' },
    { label: 'Inherited Scopes', key: 'inheritedScopes', icon: Key, color: 'text-emerald-600' },
    { label: 'Direct Scopes', key: 'directScopes', icon: Shield, color: 'text-blue-600' },
    { label: 'Country Assignments', key: 'countryAssignments', icon: MapPin, color: 'text-teal-600' },
    { label: 'Sector Assignments', key: 'sectorAssignments', icon: PieChart, color: 'text-indigo-600' },
    { label: 'Inactive Structures', key: 'inactiveStructures', icon: AlertCircle, color: 'text-amber-600' },
    { label: 'Pending Changes', key: 'pendingChanges', icon: Clock, color: 'text-amber-600' },
    { label: 'Exceptions', key: 'exceptions', icon: AlertTriangle, color: 'text-rose-600' },
    { label: 'Reviews Due', key: 'reviewsDue', icon: Calendar, color: 'text-rose-600' },
    { label: 'Organization Health', key: 'organizationHealth', icon: Activity, color: 'text-emerald-600' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-10 gap-2 mb-3">
      {cards.map((c, idx) => {
        const Icon = c.icon;
        const data = kpis[c.key] || { value: 0, trend: 'No change' };
        const isUpTrend = data.trend.startsWith('+');

        return (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded p-2 shadow-2xs flex flex-col justify-between min-h-[68px]"
          >
            <div className="flex items-center justify-between gap-1 text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
              <span className="truncate">{c.label}</span>
              <Icon className={`w-3.5 h-3.5 ${c.color} opacity-75 flex-shrink-0`} />
            </div>
            <div className="mt-1">
              <span className="text-base font-extrabold text-gray-900 leading-none">
                {data.value}
              </span>
              <span
                className={`block text-[8px] font-medium mt-0.5 truncate ${
                  isUpTrend ? 'text-emerald-600 font-semibold' : 'text-gray-400'
                }`}
              >
                {data.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
