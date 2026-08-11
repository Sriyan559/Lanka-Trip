import React from "react";

export interface DetailField {
  label: string;
  value: React.ReactNode;
  isBadge?: boolean;
}

interface DetailCardProps {
  title: string;
  fields?: DetailField[];
  children?: React.ReactNode;
  actionNode?: React.ReactNode;
  className?: string;
}

export function DetailCard({
  title,
  fields,
  children,
  actionNode,
  className = "",
}: DetailCardProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-3 shadow-2xs ${className}`}
    >
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
          {title}
        </h3>
        {actionNode}
      </div>

      {children ? (
        children
      ) : (
        <div className="space-y-1.5 text-xs">
          {fields?.map((field, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 py-0.5"
            >
              <span className="text-gray-500 font-normal truncate min-w-0">
                {field.label}
              </span>
              <div className="font-semibold text-gray-900 truncate text-right flex-shrink-0">
                {field.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
