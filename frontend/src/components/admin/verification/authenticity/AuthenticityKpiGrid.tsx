import React from 'react';
import {
  ShieldAlert, ShieldX, ShieldOff, Tag, GitMerge,
  Package, Barcode, Hash, Copy, FileQuestion,
  Lock, Clock
} from 'lucide-react';
import { AuthenticityKpiCard, type AuthenticityKpiCardProps } from './AuthenticityKpiCard';

interface KpiDef extends Omit<AuthenticityKpiCardProps, 'value' | 'trend' | 'trendDirection'> {
  apiKey: string;
}

const KPI_DEFINITIONS: KpiDef[] = [
  { sequence: 1,  title: 'Open Authenticity Investigations', icon: ShieldAlert, tone: 'danger',  apiKey: 'open_investigations' },
  { sequence: 2,  title: 'Suspected Counterfeit Products',   icon: ShieldX,    tone: 'danger',  apiKey: 'suspected_counterfeit' },
  { sequence: 3,  title: 'Confirmed Counterfeit Products',   icon: ShieldOff,  tone: 'danger',  apiKey: 'confirmed_counterfeit' },
  { sequence: 4,  title: 'Unauthorized Brand Use Cases',     icon: Tag,        tone: 'warning', apiKey: 'unauthorized_brand_use' },
  { sequence: 5,  title: 'Brand Relationship Conflicts',     icon: GitMerge,   tone: 'warning', apiKey: 'brand_conflicts' },
  { sequence: 6,  title: 'Packaging Authenticity Issues',    icon: Package,    tone: 'warning', apiKey: 'packaging_issues' },
  { sequence: 7,  title: 'Barcode / GTIN Conflicts',         icon: Barcode,    tone: 'warning', apiKey: 'gtin_conflicts' },
  { sequence: 8,  title: 'Serial / Batch Conflicts',         icon: Hash,       tone: 'warning', apiKey: 'serial_conflicts' },
  { sequence: 9,  title: 'Duplicate Listing Clusters',       icon: Copy,       tone: 'info',    apiKey: 'duplicate_clusters' },
  { sequence: 10, title: 'Evidence Requests Pending',        icon: FileQuestion,tone:'info',    apiKey: 'evidence_pending' },
  { sequence: 11, title: 'Restricted Products',              icon: Lock,       tone: 'danger',  apiKey: 'restricted_products' },
  { sequence: 12, title: 'Investigation SLA Breaches',       icon: Clock,      tone: 'danger',  apiKey: 'sla_breaches' },
];

interface AuthenticityKpiGridProps {
  data?: Record<string, any>;
}

export function AuthenticityKpiGrid({ data }: AuthenticityKpiGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
      {KPI_DEFINITIONS.map((def) => {
        const kpiData = data?.[def.apiKey] || {};
        return (
          <AuthenticityKpiCard
            key={def.sequence}
            sequence={def.sequence}
            title={def.title}
            icon={def.icon}
            tone={def.tone}
            value={kpiData.value ?? 0}
            trend={kpiData.trend ?? '0%'}
            trendDirection={kpiData.trend_direction ?? 'neutral'}
          />
        );
      })}
    </div>
  );
}
