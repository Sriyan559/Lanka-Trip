import React from 'react';
import { LIFECYCLE_STEPS } from './recallSafetyMock';

interface RecallLifecycleWorkflowProps {
  currentStep?: number;
}

export function RecallLifecycleWorkflow({ currentStep = 0 }: RecallLifecycleWorkflowProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
          Recall &amp; Incident Lifecycle / Workflow
        </h3>
        <span className="text-[10px] text-gray-400">{LIFECYCLE_STEPS.length} steps</span>
      </div>

      {/* Horizontally scrollable step row */}
      <div className="overflow-x-auto">
        <div className="flex items-start gap-0 min-w-max pb-1">
          {LIFECYCLE_STEPS.map((step, idx) => {
            const isActive  = step.number === currentStep;
            const isDone    = step.number < currentStep;
            const isLast    = idx === LIFECYCLE_STEPS.length - 1;

            return (
              <React.Fragment key={step.number}>
                {/* Step */}
                <div className="flex flex-col items-center gap-1 w-[90px]">
                  {/* Circle */}
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-bold border-2 transition-colors ${
                      isActive
                        ? 'bg-[#7a0023] text-white border-[#7a0023]'
                        : isDone
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-white text-gray-500 border-gray-300'
                    }`}
                  >
                    {step.number}
                  </div>
                  {/* Label */}
                  <span className={`text-[9px] text-center leading-tight px-1 ${
                    isActive ? 'font-bold text-[#7a0023]' :
                    isDone   ? 'font-semibold text-green-700' :
                    'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div className="flex items-center h-7 mt-0">
                    <div className={`h-0.5 w-4 ${isDone ? 'bg-green-400' : 'bg-gray-200'}`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
