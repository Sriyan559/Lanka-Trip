import React from 'react';

export type StatusVariant =
  | 'Active'
  | 'Secure'
  | 'Verified'
  | 'Healthy'
  | 'Pass'
  | 'Approved'
  | 'Compliant'
  | 'Direct Access'
  | 'Allowed'
  | 'High'
  | 'Critical'
  | 'Denied'
  | 'Failed'
  | 'Revoked'
  | 'Expired'
  | 'Locked'
  | 'Suspended'
  | 'Conditional'
  | 'Inherited Access'
  | 'Conditional Access'
  | 'Approval Req.'
  | 'Pending'
  | 'Pending Review'
  | 'Needs Attention'
  | 'Warning'
  | 'Medium'
  | 'Low'
  | 'Standard'
  | 'Neutral'
  | 'Bound Security'
  | 'Enforced'
  | 'Still Active'
  | 'Ended'
  | string;

interface StatusBadgeProps {
  status: StatusVariant;
  label?: string;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'pill' | 'badge' | 'dot' | 'subtle';
  className?: string;
}

export function StatusBadge({ status, label, size = 'xs', variant = 'pill', className = '' }: StatusBadgeProps) {
  const displayLabel = label || status;
  const norm = String(displayLabel || '').toLowerCase().trim();

  let colorClasses = 'bg-gray-100 text-gray-700 border-gray-200';
  let dotColor = 'bg-gray-400';

  if (
    norm === 'active' ||
    norm === 'secure' ||
    norm === 'verified' ||
    norm === 'healthy' ||
    norm === 'pass' ||
    norm === 'approved' ||
    norm === 'compliant' ||
    norm === 'allowed' ||
    norm === 'direct access' ||
    norm === 'still active' ||
    norm === 'on track' ||
    norm === 'published' ||
    norm === 'current'
  ) {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-emerald-500';
  } else if (
    norm === 'high' ||
    norm === 'critical' ||
    norm === 'denied' ||
    norm === 'failed' ||
    norm === 'revoked' ||
    norm === 'expired' ||
    norm === 'locked' ||
    norm === 'suspended' ||
    norm === 'fail'
  ) {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
    dotColor = 'bg-rose-500';
  } else if (
    norm === 'conditional' ||
    norm === 'conditional access' ||
    norm === 'inherited access' ||
    norm === 'approval req.' ||
    norm === 'pending' ||
    norm === 'pending review' ||
    norm === 'needs attention' ||
    norm === 'warning' ||
    norm === 'medium' ||
    norm === 'bound security' ||
    norm === 'stale'
  ) {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
    dotColor = 'bg-amber-500';
  } else if (norm === 'enforced') {
    colorClasses = 'bg-teal-50 text-teal-700 border-teal-200';
    dotColor = 'bg-teal-500';
  } else if (norm === 'low' || norm === 'ended') {
    colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';
    dotColor = 'bg-slate-400';
  }

  const sizeClasses =
    size === 'xs'
      ? 'text-[9px] px-1.5 py-0.5'
      : size === 'sm'
      ? 'text-[10px] px-2 py-0.5'
      : 'text-[11px] px-2.5 py-1';

  if (variant === 'dot') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold ${colorClasses.replace(/bg-[^ ]+/g, '')} ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
        <span>{displayLabel}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center font-bold border rounded-full whitespace-nowrap leading-none transition-colors ${sizeClasses} ${colorClasses} ${className}`}
    >
      {displayLabel}
    </span>
  );
}
