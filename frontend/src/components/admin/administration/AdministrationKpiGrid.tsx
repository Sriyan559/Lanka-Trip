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

interface AdministrationKpiGridProps {
  kpis?: Record<
    string,
    {
      value: string | number;
      delta?: string;
      trend?: 'up' | 'down' | 'neutral';
      status?: 'healthy' | 'warning' | 'danger' | 'info' | 'neutral';
    }
  >;
  loading?: boolean;
}

export function AdministrationKpiGrid({ kpis, loading }: AdministrationKpiGridProps = {}) {
  const getKpi = (key: string, defaultVal: string | number, defaultDelta?: string, defaultTrend?: 'up' | 'down' | 'neutral', defaultStatus?: 'healthy' | 'warning' | 'danger' | 'info' | 'neutral') => {
    if (kpis && kpis[key]) {
      return {
        value: kpis[key].value,
        delta: kpis[key].delta ?? defaultDelta,
        trend: kpis[key].trend ?? defaultTrend,
        alertType: kpis[key].status ?? defaultStatus,
      };
    }
    return {
      value: defaultVal,
      delta: defaultDelta,
      trend: defaultTrend,
      alertType: defaultStatus,
    };
  };

  const activeUsers = getKpi('active_users', '428', '12.4%', 'up', 'healthy');
  const administrators = getKpi('administrators', '24', '4.3%', 'up', 'healthy');
  const privilegedAdmins = getKpi('privileged_admins', '8', '0%', 'neutral', 'neutral');
  const securityPosture = getKpi('security_posture', '98%', '+0.5%', 'up', 'healthy');
  const openExceptions = getKpi('open_exceptions', '0', '-100%', 'down', 'healthy');
  const activeSessions = getKpi('active_sessions', '18', '6.7%', 'up', 'healthy');
  const systemHealth = getKpi('system_health', '96%', '+1.2%', 'up', 'healthy');
  const pendingWorkflows = getKpi('pending_workflows', '3', '-25%', 'down', 'healthy');
  const scheduledTasks = getKpi('scheduled_tasks', '28', '100%', 'up', 'healthy');
  const auditEvents = getKpi('audit_events_24h', '1,284', '8.9%', 'up', 'healthy');

  const businessUnits = getKpi('business_units', '14', '2.1%', 'up', 'healthy');
  const organizations = getKpi('organizations', '4', '0%', 'neutral', 'neutral');

  const firstRow: KpiItem[] = [
    {
      title: 'Active Users',
      value: activeUsers.value,
      delta: activeUsers.delta,
      trend: activeUsers.trend,
      alertType: activeUsers.alertType,
      icon: Users,
      sparklinePoints: '0,18 10,15 20,17 30,12 40,10 50,14 60,8 70,11 80,6 90,9 100,2'
    },
    {
      title: 'Administrators',
      value: administrators.value,
      delta: administrators.delta,
      trend: administrators.trend,
      alertType: administrators.alertType,
      icon: UserCog,
      sparklinePoints: '0,15 20,16 40,13 60,11 80,10 100,5'
    },
    {
      title: 'Privileged Admins',
      value: privilegedAdmins.value,
      delta: privilegedAdmins.delta,
      trend: privilegedAdmins.trend,
      alertType: privilegedAdmins.alertType,
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
      value: pendingWorkflows.value,
      delta: pendingWorkflows.delta,
      trend: pendingWorkflows.trend,
      alertType: pendingWorkflows.alertType,
      icon: FileQuestion,
      sparklinePoints: '0,5 20,7 40,12 60,8 80,14 100,15'
    },
    {
      title: 'Config Issues',
      value: openExceptions.value,
      delta: openExceptions.delta,
      trend: openExceptions.trend,
      alertType: openExceptions.alertType,
      icon: Settings,
      sparklinePoints: '0,18 20,15 40,16 60,11 80,7 100,2'
    },
    {
      title: 'Security Posture',
      value: securityPosture.value,
      delta: securityPosture.delta,
      trend: securityPosture.trend,
      alertType: securityPosture.alertType,
      icon: ShieldAlert,
      sparklinePoints: '0,15 20,17 40,12 60,14 80,8 100,4'
    },
    {
      title: 'Active Sessions',
      value: activeSessions.value,
      delta: activeSessions.delta,
      trend: activeSessions.trend,
      alertType: activeSessions.alertType,
      icon: Play,
      sparklinePoints: '0,4 20,8 40,5 60,12 80,15 100,18'
    },
    {
      title: 'Gov Exceptions',
      value: '0',
      delta: '-100%',
      trend: 'down',
      alertType: 'healthy',
      icon: HelpCircle,
      sparklinePoints: '0,16 20,14 40,15 60,11 80,9 100,5'
    },
    {
      title: 'Admin Health',
      value: systemHealth.value,
      delta: systemHealth.delta,
      trend: systemHealth.trend,
      alertType: systemHealth.alertType,
      icon: CheckCircle2,
      sparklinePoints: '0,18 20,16 40,17 60,14 80,10 100,5'
    }
  ];

  const secondRow: KpiItem[] = [
    {
      title: 'Tenants',
      value: organizations.value,
      delta: organizations.delta,
      trend: organizations.trend,
      alertType: organizations.alertType,
      icon: Building2,
      sparklinePoints: '0,10 20,10 40,10 60,10 80,10 100,10'
    },
    {
      title: 'Business Units',
      value: businessUnits.value,
      delta: businessUnits.delta,
      trend: businessUnits.trend,
      alertType: businessUnits.alertType,
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
      value: scheduledTasks.value,
      delta: scheduledTasks.delta,
      trend: scheduledTasks.trend,
      alertType: scheduledTasks.alertType,
      icon: CalendarClock,
      sparklinePoints: '0,15 20,13 40,14 60,11 80,8 100,6'
    },
    {
      title: 'Audit Events 24h',
      value: auditEvents.value,
      delta: auditEvents.delta,
      trend: auditEvents.trend,
      alertType: auditEvents.alertType,
      icon: ScrollText,
      sparklinePoints: '0,12 20,13 40,10 60,8 80,6 100,4'
    }
  ];

  return (
    <div className={`flex flex-col gap-3 mb-4 ${loading ? 'opacity-70' : ''}`}>
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

