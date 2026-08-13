'use client';

import React from 'react';

export interface CriticalityBadgeProps {
  criticality: 'High' | 'Medium' | 'Low';
  className?: string;
}

export function CriticalityBadge({ criticality, className = '' }: CriticalityBadgeProps) {
  const variants = {
    High: 'bg-red-100 text-red-700 border-red-300',
    Medium: 'bg-orange-100 text-orange-700 border-orange-300',
    Low: 'bg-green-100 text-green-700 border-green-300',
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold border ${variants[criticality]} ${className}`}>
      {criticality}
    </span>
  );
}

export interface StatusBadgeProps {
  status: 'Required' | 'Compatible' | 'Warning' | 'Blocked';
  className?: string;
}

export function DependencyStatusBadge({ status, className = '' }: StatusBadgeProps) {
  const variants = {
    Required: 'bg-green-100 text-green-700 border-green-300',
    Compatible: 'bg-green-100 text-green-700 border-green-300',
    Warning: 'bg-orange-100 text-orange-700 border-orange-300',
    Blocked: 'bg-red-100 text-red-700 border-red-300',
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold border ${variants[status]} ${className}`}>
      {status}
    </span>
  );
}

export interface CompatibilityBadgeProps {
  compatibility: string | number;
  className?: string;
}

export function CompatibilityPercentageBadge({ compatibility, className = '' }: CompatibilityBadgeProps) {
  let variant = 'bg-green-100 text-green-700 border-green-300';

  if (typeof compatibility === 'string') {
    if (compatibility === 'Partial') {
      variant = 'bg-orange-100 text-orange-700 border-orange-300';
    } else if (compatibility === 'Incompatible') {
      variant = 'bg-red-100 text-red-700 border-red-300';
    }
  } else if (typeof compatibility === 'number') {
    if (compatibility < 95) variant = 'bg-orange-100 text-orange-700 border-orange-300';
    if (compatibility < 50) variant = 'bg-red-100 text-red-700 border-red-300';
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold border ${variant} ${className}`}>
      {compatibility}
      {typeof compatibility === 'number' ? '%' : ''}
    </span>
  );
}
