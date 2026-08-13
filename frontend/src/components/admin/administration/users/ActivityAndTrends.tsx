import React from 'react';
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';

export function ActivityAndTrends() {
  // Generate 30 days of mock trend data (May 1st to May 30th)
  const activityData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2026, 4, i + 1);
    const newAccounts = 2 + Math.floor(Math.sin(i / 2) * 2) + (i % 5 === 0 ? 3 : 0);
    const invites = 5 + Math.floor(Math.cos(i / 3) * 3) + (i % 4 === 0 ? 4 : 0);
    const disabled = i % 7 === 0 ? 1 : 0;
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
      'New Accounts': newAccounts,
      'Invitations Sent': invites,
      'Accounts Disabled': disabled
    };
  });

  const authActivityData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2026, 4, i + 1);
    const enrollments = 3 + Math.floor(Math.sin(i / 4) * 2);
    const failures = i % 5 === 0 ? 1 : 0;
    const logins = 50 + Math.floor(Math.cos(i / 2) * 15) + (i % 3) * 5;
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
      'MFA Enrollments': enrollments,
      'MFA Failures': failures,
      'SSO Logins': logins
    };
  });

  // Donut chart dataset
  const donutData = [
    { name: 'Platform Admin', value: 51, percentage: 11, color: '#741d35' },
    { name: 'Business / Function', value: 329, percentage: 74, color: '#c96686' },
    { name: 'External / Tenant Admin', value: 53, percentage: 12, color: '#c9a227' },
    { name: 'Unassigned', value: 13, percentage: 3, color: '#ead9ce' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      {/* 14. Identity Activity — Last 30 Days */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm flex flex-col justify-between">
        <div>
          <div className="border-b border-gray-200 pb-2 mb-2">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">14. Identity Activity — Last 30 Days</h2>
          </div>
          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={activityData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px' }} />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '9px', paddingTop: '4px' }} />
                <Line type="monotone" dataKey="New Accounts" stroke="#2563eb" strokeWidth={1.5} dot={{ r: 0 }} />
                <Line type="monotone" dataKey="Invitations Sent" stroke="#10b981" strokeWidth={1.5} dot={{ r: 0 }} />
                <Line type="monotone" dataKey="Accounts Disabled" stroke="#ef4444" strokeWidth={1.5} dot={{ r: 0 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 20B. Authentication Activity — Last 30 Days */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm flex flex-col justify-between">
        <div>
          <div className="border-b border-gray-200 pb-2 mb-2">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">20B. Auth Activity — Last 30 Days</h2>
          </div>
          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={authActivityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px' }} />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '9px', paddingTop: '4px' }} />
                <Line type="monotone" dataKey="MFA Enrollments" stroke="#2563eb" strokeWidth={1.5} dot={{ r: 0 }} />
                <Line type="monotone" dataKey="MFA Failures" stroke="#ef4444" strokeWidth={1.5} dot={{ r: 0 }} />
                <Line type="monotone" dataKey="SSO Logins" stroke="#10b981" strokeWidth={1.5} dot={{ r: 0 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Identity Ownership (Donut Chart) */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm flex flex-col justify-between">
        <div>
          <div className="border-b border-gray-200 pb-2 mb-2">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Identity Ownership</h2>
          </div>
          <div className="flex items-center justify-between gap-2 h-[180px]">
            {/* Donut container */}
            <div className="w-28 h-28 relative flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-extrabold text-gray-900 leading-none">446</span>
                <span className="text-[8px] font-bold text-gray-400 mt-0.5">Total</span>
              </div>
            </div>

            {/* Legend list */}
            <div className="flex flex-col gap-1.5 w-full pr-1">
              {donutData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5 text-[9px] font-semibold text-gray-700">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="truncate max-w-[85px]" title={entry.name}>{entry.name}</span>
                  <span className="ml-auto font-bold text-gray-950 whitespace-nowrap">
                    {entry.percentage}% ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
