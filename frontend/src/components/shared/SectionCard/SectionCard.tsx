import React from 'react';

interface SectionCardProps {
  title: string | React.ReactNode;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  noPadding?: boolean;
}

export function SectionCard({
  title,
  subtitle,
  badge,
  actions,
  children,
  className = '',
  bodyClassName = '',
  noPadding = false,
}: SectionCardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded shadow-2xs flex flex-col min-w-0 ${className}`}>
      {(title || actions || badge) && (
        <div className="px-3 py-2.5 border-b border-gray-200 flex items-center justify-between gap-2 min-h-[38px] bg-white">
          <div className="flex items-center gap-2 min-w-0">
            {typeof title === 'string' ? (
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider truncate">
                {title}
              </h3>
            ) : (
              title
            )}
            {badge}
            {subtitle && (
              <span className="text-[10px] text-gray-500 font-normal truncate hidden sm:inline">
                {subtitle}
              </span>
            )}
          </div>
          {actions && <div className="flex items-center gap-1.5 flex-shrink-0">{actions}</div>}
        </div>
      )}
      <div className={`${noPadding ? '' : 'p-3'} flex-1 min-w-0 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
