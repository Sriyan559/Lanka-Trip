'use client';

import React from 'react';
import { Users } from 'lucide-react';
import { RoleHierarchyNode } from '@/lib/administration/roles-permissions/roles-permissions.types';

interface RoleHierarchyTreeProps {
  root: RoleHierarchyNode;
  className?: string;
}

export function RoleHierarchyTree({ root, className = '' }: RoleHierarchyTreeProps) {
  const children = root.children || [];

  return (
    <div className={`w-full flex flex-col items-center justify-center py-0.5 px-0.5 min-w-0 ${className}`}>
      {/* Root Node */}
      <div className="flex flex-col items-center">
        <div className="px-3 py-0.5 bg-red-50/80 border border-red-300 rounded text-red-700 text-[10px] font-bold shadow-2xs">
          {root.title}
        </div>
      </div>

      {/* SVG Connecting Tree with Branch Lines and Down Arrows */}
      <div className="w-full max-w-[320px] h-5 relative my-0.5">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 20">
          <defs>
            <marker
              id="tree-arrow-head"
              viewBox="0 0 6 6"
              refX="3"
              refY="3"
              markerWidth="3.5"
              markerHeight="3.5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#9ca3af" />
            </marker>
          </defs>
          {/* Main Stem from Root */}
          <line x1="200" y1="0" x2="200" y2="7" stroke="#9ca3af" strokeWidth="1.2" />
          {/* Horizontal Branch Line */}
          <line x1="50" y1="7" x2="350" y2="7" stroke="#9ca3af" strokeWidth="1.2" />
          {/* Drop lines to 4 child nodes with arrowheads */}
          <line x1="50" y1="7" x2="50" y2="19" stroke="#9ca3af" strokeWidth="1.2" markerEnd="url(#tree-arrow-head)" />
          <line x1="150" y1="7" x2="150" y2="19" stroke="#9ca3af" strokeWidth="1.2" markerEnd="url(#tree-arrow-head)" />
          <line x1="250" y1="7" x2="250" y2="19" stroke="#9ca3af" strokeWidth="1.2" markerEnd="url(#tree-arrow-head)" />
          <line x1="350" y1="7" x2="350" y2="19" stroke="#9ca3af" strokeWidth="1.2" markerEnd="url(#tree-arrow-head)" />
        </svg>
      </div>

      {/* 4 Child Cards Grid */}
      <div className="grid grid-cols-4 gap-1 w-full mt-0.5">
        {children.map((child) => (
          <div
            key={child.id}
            className="w-full px-1 py-1 bg-white border border-gray-200 rounded text-center shadow-2xs flex flex-col items-center justify-between min-h-[50px]"
          >
            <span
              className="text-[8.5px] font-semibold text-gray-800 leading-tight block text-center"
              title={child.title}
            >
              {child.title}
            </span>
            <div className="w-full h-px bg-gray-100 my-0.5" />
            <div className="flex items-center justify-center gap-0.5 text-[8.5px] text-gray-600 font-medium whitespace-nowrap">
              <Users className="w-2.5 h-2.5 text-gray-400 shrink-0" />
              <span>{child.userCount} Users</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
