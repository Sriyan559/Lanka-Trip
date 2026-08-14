'use client';

import React from 'react';
import { BuTopologyNodeItem } from '@/lib/administration/business-units-channels/bu-channels.types';

interface BuTopologyTreeProps {
  root: BuTopologyNodeItem;
  className?: string;
}

export function BuTopologyTree({ root, className = '' }: BuTopologyTreeProps) {
  return (
    <div className={`w-full flex flex-col items-center justify-center p-2 min-w-0 ${className}`}>
      {/* Root Node: Enterprise */}
      <div className="flex flex-col items-center">
        <div className="px-3 py-1 bg-blue-50 border border-blue-300 rounded text-center shadow-2xs">
          <span className="text-[10px] font-extrabold text-blue-900 block">{root.name}</span>
          <span className="text-[7px] font-bold text-gray-500 bg-gray-100 px-1 py-0.2 rounded inline-block mt-0.5">
            Enterprise
          </span>
        </div>
        <div className="w-px h-2.5 bg-gray-300" />
      </div>

      {/* Level 1: Operational Group / Ecosystem */}
      {root.children && root.children.length > 0 && (
        <div className="flex flex-col items-center w-full">
          {root.children.map((eco) => (
            <div key={eco.id} className="flex flex-col items-center w-full">
              <div className="px-3 py-1 bg-purple-50 border border-purple-200 rounded text-center shadow-2xs">
                <span className="text-[10px] font-extrabold text-purple-900 block">{eco.name}</span>
                <span className="text-[7px] font-bold text-purple-700 bg-purple-100 px-1 py-0.2 rounded inline-block mt-0.5">
                  Ecosystem
                </span>
              </div>

              {/* Horizontal line connecting Level 2 Business Units */}
              {eco.children && eco.children.length > 0 && (
                <>
                  <div className="w-px h-2.5 bg-gray-300" />
                  <div className="relative w-full max-w-[340px]">
                    <div className="absolute left-6 right-6 top-0 h-px bg-gray-300" />
                  </div>

                  {/* Level 2: Business Units */}
                  <div className="grid grid-cols-3 gap-2 w-full mt-0 pt-0">
                    {eco.children.map((org) => (
                      <div key={org.id} className="flex flex-col items-center">
                        <div className="w-px h-2 bg-gray-300" />
                        <div className="w-full px-1.5 py-1 bg-white border border-gray-200 rounded text-center shadow-2xs">
                          <span className="text-[9px] font-extrabold text-gray-900 block truncate" title={org.name}>
                            {org.name}
                          </span>
                          <span className="text-[7px] font-bold text-blue-700 bg-blue-50 px-1 py-0.1 rounded inline-block">
                            Business Unit
                          </span>
                        </div>

                        {/* Level 3: Operational Groups / Sub-units (Wellness & Care, Customer Operations, Shared Services) */}
                        {org.name === 'Beauty Retail' && (
                          <div className="flex flex-col items-center w-full mt-1.5">
                            <div className="w-px h-2 bg-gray-300" />
                            <div className="relative w-full max-w-[90px]">
                              <div className="absolute left-2.5 right-2.5 top-0 h-px bg-gray-300" />
                            </div>
                            <div className="grid grid-cols-3 gap-0.5 w-full mt-0 pt-0">
                              <div className="flex flex-col items-center">
                                <div className="w-px h-1.5 bg-gray-300" />
                                <div className="px-0.5 py-0.5 bg-gray-50 border border-gray-200 rounded text-center w-full">
                                  <span className="text-[6.5px] font-bold text-gray-800 block truncate" title="Wellness & Care">
                                    Wellness & Care
                                  </span>
                                  <span className="text-[5.5px] text-purple-700 font-bold block">Op. Group</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-px h-1.5 bg-gray-300" />
                                <div className="px-0.5 py-0.5 bg-gray-50 border border-gray-200 rounded text-center w-full">
                                  <span className="text-[6.5px] font-bold text-gray-800 block truncate" title="Customer Operations">
                                    Customer Ops
                                  </span>
                                  <span className="text-[5.5px] text-purple-700 font-bold block">Op. Group</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-px h-1.5 bg-gray-300" />
                                <div className="px-0.5 py-0.5 bg-gray-50 border border-gray-200 rounded text-center w-full">
                                  <span className="text-[6.5px] font-bold text-gray-800 block truncate" title="Shared Services">
                                    Shared Serv
                                  </span>
                                  <span className="text-[5.5px] text-purple-700 font-bold block">Op. Group</span>
                                </div>
                              </div>
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

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 mt-3.5 pt-2 border-t border-gray-150 w-full text-[8px] text-gray-500 font-semibold">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-1.5 bg-blue-50 border border-blue-200 rounded inline-block" />
          <span>Business Unit</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-1.5 bg-purple-50 border border-purple-200 rounded inline-block" />
          <span>Operational Group</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-px border-t-2 border-dashed border-emerald-500 inline-block" />
          <span>Shared Channel</span>
        </div>
      </div>
    </div>
  );
}
