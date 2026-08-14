'use client';

import React from 'react';
import { OrgHierarchyNodeItem } from '@/lib/administration/tenant-organization/tenant-organization.types';

interface OrgHierarchyTreeProps {
  root: OrgHierarchyNodeItem;
  className?: string;
}

export function OrgHierarchyTree({ root, className = '' }: OrgHierarchyTreeProps) {
  return (
    <div className={`w-full flex flex-col items-center justify-center p-2 min-w-0 ${className}`}>
      {/* Root Node: Tenant */}
      <div className="flex flex-col items-center">
        <div className="px-3 py-1 bg-rose-50 border border-rose-300 rounded text-center shadow-2xs">
          <span className="text-[10px] font-extrabold text-rose-900 block">{root.name}</span>
          <span className="text-[8px] font-bold text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded inline-block mt-0.5">
            {root.status}
          </span>
        </div>
        <div className="w-px h-2.5 bg-gray-300" />
      </div>

      {/* Level 1: Ecosystem */}
      {root.children && root.children.length > 0 && (
        <div className="flex flex-col items-center w-full">
          {root.children.map((eco) => (
            <div key={eco.id} className="flex flex-col items-center w-full">
              <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded text-center shadow-2xs">
                <span className="text-[10px] font-extrabold text-blue-900 block">{eco.name}</span>
                <span className="text-[8px] font-bold text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded inline-block mt-0.5">
                  {eco.status}
                </span>
              </div>

              {/* Horizontal Bar for Organizations */}
              {eco.children && eco.children.length > 0 && (
                <>
                  <div className="w-px h-2.5 bg-gray-300" />
                  <div className="relative w-full max-w-[340px]">
                    <div className="absolute left-6 right-6 top-0 h-px bg-gray-300" />
                  </div>

                  {/* Level 2: Organizations Grid */}
                  <div className="grid grid-cols-3 gap-2 w-full mt-0 pt-0">
                    {eco.children.map((org) => (
                      <div key={org.id} className="flex flex-col items-center">
                        <div className="w-px h-2 bg-gray-300" />
                        <div className="w-full px-1.5 py-1 bg-white border border-gray-200 rounded text-center shadow-2xs">
                          <span className="text-[9px] font-bold text-gray-900 block truncate" title={org.name}>
                            {org.name}
                          </span>
                          <span className="text-[7px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.1 rounded inline-block">
                            {org.status}
                          </span>
                        </div>

                        {/* Level 3: Business Units (Sub-nodes) */}
                        {org.children && org.children.length > 0 && (
                          <div className="flex flex-col items-center w-full mt-1">
                            <div className="w-px h-2 bg-gray-300" />
                            <div className="grid grid-cols-3 gap-1 w-full">
                              {org.children.map((bu) => (
                                <div key={bu.id} className="px-1 py-0.5 bg-gray-50 border border-gray-200 rounded text-center">
                                  <span className="text-[7px] font-bold text-gray-700 block truncate" title={bu.name}>
                                    {bu.name}
                                  </span>
                                  <span className="text-[6px] text-emerald-600 font-semibold">{bu.status}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Topology Legend at bottom */}
      <div className="flex items-center justify-center gap-3 mt-3 pt-2 border-t border-gray-150 w-full text-[8px] text-gray-500 font-semibold">
        <div className="flex items-center gap-1">
          <span className="w-3 h-px bg-gray-400 inline-block" />
          <span>Parent - Child</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-700 font-bold">
          <span>&rarr; Direct</span>
        </div>
        <div className="flex items-center gap-1 text-blue-700 font-bold">
          <span>&rarr; Inherited</span>
        </div>
        <div className="flex items-center gap-1 text-rose-600 font-bold">
          <span>&times; Restricted</span>
        </div>
      </div>
    </div>
  );
}
