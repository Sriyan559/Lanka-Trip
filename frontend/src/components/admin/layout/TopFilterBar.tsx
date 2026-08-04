'use client';

import type { ReactNode } from 'react';

type TopFilterBarProps = {
  children?: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function TopFilterBar({
  children,
  title,
  description,
  actions,
  className = '',
}: TopFilterBarProps) {
  return (
    <section className={`top-filter-bar ${className}`.trim()}>
      {(title || description || actions) && (
        <div className="top-filter-bar__header">
          <div>
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
          </div>

          {actions && <div>{actions}</div>}
        </div>
      )}

      {children}
    </section>
  );
}
