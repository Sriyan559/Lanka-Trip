import React from 'react';
import {
  Users, UserCog, ShieldCheck, ShieldAlert, Award, FileQuestion, Settings,
  AlertTriangle, Play, HelpCircle, Building2, Store, Globe2, Languages, Coins,
  Workflow, Bell, CalendarClock, ScrollText, CheckCircle2, UserCheck, Key
} from 'lucide-react';

interface KpiItem {
  title: string;
  value: string | number;
  delta?: string;
  trend?: 'up' | 'down' | 'neutral';
  alertType?: 'healthy' | 'warning' | 'danger' | 'info' | 'neutral';
  icon: any;
  sparklinePoints: string;
}

interface KpiCardProps {
  item: KpiItem;
}

function IdentityKpiCard({ item }: KpiCardProps) {
  const Icon = item.icon;
  
  let iconColorClass = 'text-blue-600 bg-blue-50';
  let deltaColorClass = 'text-gray-500';
  let strokeColor = '#3b82f6';
  
  if (item.alertType === 'healthy') {
    iconColorClass = 'text-green-600 bg-green-50';
    deltaColorClass = 'text-green-600';
    strokeColor = '#10b981';
  } else if (item.alertType === 'warning') {
    iconColorClass = 'text-orange-600 bg-orange-50';
    deltaColorClass = 'text-orange-600';
    strokeColor = '#f97316';
  } else if (item.alertType === 'danger') {
    iconColorClass = 'text-red-600 bg-red-50';
    deltaColorClass = 'text-red-600';
    strokeColor = '#ef4444';
  } else if (item.alertType === 'neutral') {
    iconColorClass = 'text-gray-500 bg-gray-50';
    deltaColorClass = 'text-gray-500';
    strokeColor = '#9ca3af';
  }

  return (
    <div className="flex flex-col justify-between p-2.5 bg-white border border-gray-200 rounded shadow-sm min-h-[92px] hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate mr-1" title={item.title}>
          {item.title}
        </span>
        <div className={`p-1 rounded-full ${iconColorClass}`}>
          <Icon size={12} strokeWidth={2.5} />
        </div>
      </div>
      
      <div className="flex items-baseline justify-between mt-1">
        <span className="text-base font-extrabold text-gray-900 leading-none">{item.value}</span>
        {item.delta && (
          <span className={`text-[9px] font-bold ${deltaColorClass}`}>
            {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : ''} {item.delta}
          </span>
        )}
      </div>

      <div className="w-full h-4 mt-2">
        <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.5"
            points={item.sparklinePoints}
          />
        </svg>
      </div>
    </div>
  );
}

export function IdentityKpiGrid() {
  const firstRow: KpiItem[] = [
    {
      title: 'Total Accounts',
      value: '446',
      delta: '6.7%',
      trend: 'up',
      alertType: 'healthy',
      icon: Users,
      sparklinePoints: '0,18 20,16 40,15 60,11 80,7 100,5'
    },
    {
      title: 'Active Users',
      value: '428',
      delta: '3.2%',
      trend: 'up',
      alertType: 'healthy',
      icon: UserCheck,
      sparklinePoints: '0,15 20,16 40,13 60,11 80,10 100,5'
    },
    {
      title: 'Administrators',
      value: '24',
      delta: '4.3%',
      trend: 'up',
      alertType: 'healthy',
      icon: UserCog,
      sparklinePoints: '0,15 20,16 40,13 60,11 80,10 100,5'
    },
    {
      title: 'Privileged Users',
      value: '8',
      delta: '0%',
      trend: 'neutral',
      alertType: 'neutral',
      icon: ShieldCheck,
      sparklinePoints: '0,10 20,10 40,10 60,10 80,10 100,10'
    },
    {
      title: 'Pending Invites',
      value: '15',
      delta: '36.4%',
      trend: 'up',
      alertType: 'info',
      icon: FileQuestion,
      sparklinePoints: '0,18 20,16 40,14 60,11 80,9 100,2'
    },
    {
      title: 'Locked Accounts',
      value: '4',
      delta: '20.0%',
      trend: 'down',
      alertType: 'healthy', // Down is good
      icon: ShieldAlert,
      sparklinePoints: '0,5 20,7 40,10 60,12 80,14 100,16'
    },
    {
      title: 'Suspended Accounts',
      value: '8',
      delta: '11.1%',
      trend: 'down',
      alertType: 'healthy', // Down is good
      icon: ShieldAlert,
      sparklinePoints: '0,8 20,9 40,11 60,13 80,14 100,17'
    },
    {
      title: 'MFA Gaps',
      value: '6',
      delta: '25.0%',
      trend: 'down',
      alertType: 'healthy', // Down is good
      icon: AlertTriangle,
      sparklinePoints: '0,5 20,8 40,9 60,11 80,12 100,15'
    },
    {
      title: 'Access Reviews',
      value: '12',
      delta: '7.7%',
      trend: 'up',
      alertType: 'warning',
      icon: HelpCircle,
      sparklinePoints: '0,16 20,15 40,13 60,11 80,10 100,5'
    },
    {
      title: 'Identity Health',
      value: '97/100',
      delta: '2 pts',
      trend: 'up',
      alertType: 'healthy',
      icon: CheckCircle2,
      sparklinePoints: '0,18 20,16 40,17 60,14 80,10 100,5'
    }
  ];

  const secondRow: KpiItem[] = [
    {
      title: 'Human Users',
      value: '424',
      delta: '3.2%',
      trend: 'up',
      alertType: 'healthy',
      icon: Users,
      sparklinePoints: '0,15 20,14 40,12 60,10 80,7 100,5'
    },
    {
      title: 'Service Accounts',
      value: '22',
      delta: '10.0%',
      trend: 'up',
      alertType: 'info',
      icon: Settings,
      sparklinePoints: '0,15 20,14 40,12 60,11 80,8 100,6'
    },
    {
      title: 'Memberships',
      value: '612',
      delta: '5.2%',
      trend: 'up',
      alertType: 'healthy',
      icon: Building2,
      sparklinePoints: '0,18 20,16 40,15 60,11 80,7 100,5'
    },
    {
      title: 'Multi-Tenant Users',
      value: '26',
      delta: '19.2%',
      trend: 'up',
      alertType: 'info',
      icon: Store,
      sparklinePoints: '0,15 20,14 40,12 60,10 80,8 100,5'
    },
    {
      title: 'Temp Access',
      value: '8',
      delta: '14.2%',
      trend: 'down',
      alertType: 'neutral',
      icon: CalendarClock,
      sparklinePoints: '0,5 20,7 40,11 60,13 80,14 100,16'
    },
    {
      title: 'Dormant Accounts',
      value: '11',
      delta: '9.2%',
      trend: 'down',
      alertType: 'healthy', // Down is good
      icon: ShieldAlert,
      sparklinePoints: '0,5 20,8 40,11 60,12 80,14 100,16'
    },
    {
      title: 'SSO Managed',
      value: '286',
      delta: '6.2%',
      trend: 'up',
      alertType: 'healthy',
      icon: CheckCircle2,
      sparklinePoints: '0,18 20,16 40,15 60,11 80,7 100,5'
    },
    {
      title: 'Local Auth',
      value: '140',
      delta: '2.9%',
      trend: 'down',
      alertType: 'neutral',
      icon: Key,
      sparklinePoints: '0,5 20,7 40,10 60,11 80,13 100,15'
    },
    {
      title: 'Requests Pending',
      value: '11',
      delta: '15.4%',
      trend: 'up',
      alertType: 'warning',
      icon: FileQuestion,
      sparklinePoints: '0,15 20,14 40,12 60,10 80,8 100,6'
    },
    {
      title: 'Exceptions',
      value: '5',
      delta: '16.7%',
      trend: 'down',
      alertType: 'healthy', // Down is good
      icon: AlertTriangle,
      sparklinePoints: '0,5 20,8 40,11 60,12 80,14 100,16'
    }
  ];

  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Row 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
        {firstRow.map((item, i) => (
          <IdentityKpiCard key={i} item={item} />
        ))}
      </div>
      {/* Row 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
        {secondRow.map((item, i) => (
          <IdentityKpiCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
