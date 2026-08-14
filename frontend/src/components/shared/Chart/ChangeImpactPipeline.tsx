'use client';

import React from 'react';

interface ChangeImpactPipelineProps {
  currentStep: number;
  progressPercentage: number;
  className?: string;
}

export function ChangeImpactPipeline({ currentStep, progressPercentage, className = '' }: ChangeImpactPipelineProps) {
  const steps = [
    { num: 1, label: 'Draft' },
    { num: 2, label: 'In Progress' },
    { num: 3, label: 'Security Review' },
    { num: 4, label: 'Owner Approval' },
    { num: 5, label: 'Change Approval' },
    { num: 6, label: 'Scheduled' },
    { num: 7, label: 'Applied' },
    { num: 8, label: 'Verified' },
  ];

  return (
    <div className={`w-full flex flex-col p-2 min-w-0 ${className}`}>
      {/* Steps Visual */}
      <div className="relative flex items-center justify-between w-full mb-3 px-3">
        {/* Background Line */}
        <div className="absolute left-[3%] right-[3%] top-3 h-0.5 bg-gray-200 -z-10"></div>
        {/* Progress Line */}
        <div 
          className="absolute left-[3%] top-3 h-0.5 bg-emerald-500 -z-10 transition-all duration-500" 
          style={{ width: `${(currentStep - 1) * (100 / (steps.length - 1))}%` }}
        ></div>

        {steps.map((step) => {
          const isCompleted = step.num < currentStep;
          const isCurrent = step.num === currentStep;
          
          return (
            <div key={step.num} className="flex flex-col items-center gap-1 z-10 w-12">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-colors ${
                isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' 
                : isCurrent ? 'bg-white border-emerald-500 text-emerald-600 shadow-sm'
                : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {isCompleted ? '✓' : step.num}
              </div>
              <span className={`text-[8px] font-bold text-center leading-tight ${
                isCompleted || isCurrent ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Overview Stats */}
      <div className="flex items-center justify-between text-[10px] border-t border-gray-150 pt-3">
        <div className="flex gap-4 font-bold text-gray-900">
          <div className="flex flex-col items-center">
            <span className="text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Draft</span>
            <span>2</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 font-semibold uppercase tracking-wider text-[8px]">In Progress</span>
            <span>3</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Security</span>
            <span>5</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Owner</span>
            <span>1</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Change Approval</span>
            <span>2</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Scheduled</span>
            <span>4</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Applied</span>
            <span>1</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Verified</span>
            <span>4</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Overall Progress</span>
          <span className="font-extrabold text-[#741d35]">{progressPercentage}%</span>
        </div>
      </div>
    </div>
  );
}
export default ChangeImpactPipeline;
