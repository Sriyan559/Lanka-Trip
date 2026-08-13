import React from 'react';
import {
  Users, UserCog, ShieldCheck, ShieldAlert, Award, FileQuestion, Settings,
  AlertTriangle, Play, HelpCircle, Building2, Store, Globe2, Languages, Coins,
  Workflow, Bell, CalendarClock, ScrollText, CheckCircle2
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

function AdministrationKpiCard({ item }: KpiCardProps) {
  const Icon = item.icon;
  
  // Choose color theme based on alertType
  let iconColorClass = 'text-blue-600 bg-blue-50';
  let deltaColorClass = 'text-gray-500';
  let strokeColor = '#3b82f6'; // blue
  
  if (item.alertType === 'healthy') {
    iconColorClass = 'text-green-600 bg-green-50';
    deltaColorClass = 'text-green-600';
    strokeColor = '#10b981'; // green
  } else if (item.alertType === 'warning') {
    iconColorClass = 'text-orange-600 bg-orange-50';
    deltaColorClass = 'text-orange-600';
    strokeColor = '#f97316'; // orange
  } else if (item.alertType === 'danger') {
    iconColorClass = 'text-red-600 bg-red-50';
    deltaColorClass = 'text-red-600';
    strokeColor = '#ef4444'; // red
  } else if (item.alertType === 'neutral') {
    iconColorClass = 'text-gray-500 bg-gray-50';
    deltaColorClass = 'text-gray-500';
    strokeColor = '#9ca3af'; // gray
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

      {/* Sparkline */}
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

export function AdministrationKpiGrid() {
  const firstRow: KpiItem[] = [
    {
      title: 'Active Users',
      value: '428',
      delta: '12.4%',
      trend: 'up',
      alertType: 'healthy',
      icon: Users,
      sparklinePoints: '0,18 10,15 20,17 30,12 40,10 50,14 60,8 70,11 80,6 90,9 100,2'
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
      title: 'Privileged Admins',
      value: '8',
      delta: '0%',
      trend: 'neutral',
      alertType: 'neutral',
      icon: ShieldCheck,
      sparklinePoints: '0,10 20,10 40,10 60,10 80,10 100,10'
    },
    {
      title: 'Active Roles',
      value: '34',
      delta: '3.0%',
      trend: 'up',
      alertType: 'healthy',
      icon: Award,
      sparklinePoints: '0,15 25,12 50,14 75,9 100,4'
    },
    {
      title: 'Pending Requests',
      value: '11',
      delta: '10.0%',
      trend: 'down',
      alertType: 'healthy', // Downwards pending requests is good
      icon: FileQuestion,
      sparklinePoints: '0,5 20,7 40,12 60,8 80,14 100,15'
    },
    {
      title: 'Config Issues',
      value: '6',
      delta: '20.0%',
      trend: 'up',
      alertType: 'danger',
      icon: Settings,
      sparklinePoints: '0,18 20,15 40,16 60,11 80,7 100,2'
    },
    {
      title: 'Security Warnings',
      value: '4',
      delta: '33.3%',
      trend: 'up',
      alertType: 'warning',
      icon: ShieldAlert,
      sparklinePoints: '0,15 20,17 40,12 60,14 80,8 100,4'
    },
    {
      title: 'Failed System Jobs',
      value: '3',
      delta: '50.0%',
      trend: 'down',
      alertType: 'healthy', // Downwards failed jobs is good
      icon: Play,
      sparklinePoints: '0,4 20,8 40,5 60,12 80,15 100,18'
    },
    {
      title: 'Gov Exceptions',
      value: '5',
      delta: '25.0%',
      trend: 'up',
      alertType: 'danger',
      icon: HelpCircle,
      sparklinePoints: '0,16 20,14 40,15 60,11 80,9 100,5'
    },
    {
      title: 'Admin Health',
      value: '96/100',
      delta: '2 pts',
      trend: 'up',
      alertType: 'healthy',
      icon: CheckCircle2,
      sparklinePoints: '0,18 20,16 40,17 60,14 80,10 100,5'
    }
  ];

  const secondRow: KpiItem[] = [
    {
      title: 'Tenants',
      value: '12',
      delta: '0%',
      trend: 'neutral',
      alertType: 'neutral',
      icon: Building2,
      sparklinePoints: '0,10 20,10 40,10 60,10 80,10 100,10'
    },
    {
      title: 'Business Units',
      value: '18',
      delta: '5.9%',
      trend: 'up',
      alertType: 'healthy',
      icon: Store,
      sparklinePoints: '0,15 20,14 40,12 60,10 80,7 100,5'
    },
    {
      title: 'Channels',
      value: '8',
      delta: '0%',
      trend: 'neutral',
      alertType: 'neutral',
      icon: Globe2,
      sparklinePoints: '0,10 20,10 40,10 60,10 80,10 100,10'
    },
    {
      title: 'Supported Countries',
      value: '6',
      delta: '0%',
      trend: 'neutral',
      alertType: 'neutral',
      icon: Globe2,
      sparklinePoints: '0,10 20,10 40,10 60,10 80,10 100,10'
    },
    {
      title: 'Languages',
      value: '5',
      delta: '0%',
      trend: 'neutral',
      alertType: 'neutral',
      icon: Languages,
      sparklinePoints: '0,10 20,10 40,10 60,10 80,10 100,10'
    },
    {
      title: 'Currencies',
      value: '7',
      delta: '0%',
      trend: 'neutral',
      alertType: 'neutral',
      icon: Coins,
      sparklinePoints: '0,10 20,10 40,10 60,10 80,10 100,10'
    },
    {
      title: 'Active Workflows',
      value: '42',
      delta: '7.7%',
      trend: 'up',
      alertType: 'healthy',
      icon: Workflow,
      sparklinePoints: '0,16 20,14 40,15 60,11 80,9 100,5'
    },
    {
      title: 'Notification Providers',
      value: '6',
      delta: '0%',
      trend: 'neutral',
      alertType: 'neutral',
      icon: Bell,
      sparklinePoints: '0,10 20,10 40,10 60,10 80,10 100,10'
    },
    {
      title: 'Scheduled Jobs',
      value: '28',
      delta: '2.7%',
      trend: 'up',
      alertType: 'healthy',
      icon: CalendarClock,
      sparklinePoints: '0,15 20,13 40,14 60,11 80,8 100,6'
    },
    {
      title: 'Audit Coverage',
      value: '99%',
      delta: '1%',
      trend: 'up',
      alertType: 'healthy',
      icon: ScrollText,
      sparklinePoints: '0,12 20,13 40,10 60,8 80,6 100,4'
    }
  ];

  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Row 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
        {firstRow.map((item, i) => (
          <AdministrationKpiCard key={i} item={item} />
        ))}
      </div>
      {/* Row 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
        {secondRow.map((item, i) => (
          <AdministrationKpiCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
