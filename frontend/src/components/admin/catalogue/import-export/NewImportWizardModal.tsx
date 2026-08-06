"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Upload, FileText, ArrowRight, ArrowLeft } from "lucide-react";

interface NewImportWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (importName: string) => void;
}

export function NewImportWizardModal({
  isOpen,
  onClose,
  onSuccess,
}: NewImportWizardModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [importName, setImportName] = useState("Product Master Bulk Import");
  const [importType, setImportType] = useState("Product Master Import");
  const [source, setSource] = useState("Supplier Feed");
  const [fileName, setFileName] = useState("product_master_2026.csv");

  if (!isOpen) return null;

  const steps = [
    "1. Select Import Type",
    "2. Upload File",
    "3. File Inspection",
    "4. Field Mapping",
    "5. Validation",
    "6. Duplicate Review",
    "7. Change Preview",
    "8. Approval",
    "9. Execute",
    "10. Reconcile",
  ];

  const handleNext = () => {
    if (currentStep < 10) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onSuccess(importName);
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-line w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-line flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-bold text-[#671021] uppercase tracking-wider">
              Step {currentStep} of 10 — New Import Wizard
            </span>
            <h2 className="text-lg font-extrabold text-ink">{steps[currentStep - 1]}</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded text-slate-500">
            <X size={18} />
          </button>
        </div>

        {/* Wizard Stepper Strip */}
        <div className="px-4 py-2 border-b border-line bg-white flex items-center gap-2 overflow-x-auto scrollbar-none text-[10px]">
          {steps.map((st, idx) => {
            const num = idx + 1;
            const isCompleted = num < currentStep;
            const isActive = num === currentStep;
            return (
              <div
                key={st}
                onClick={() => setCurrentStep(num)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#671021] text-white font-bold"
                    : isCompleted
                    ? "bg-emerald-50 text-emerald-700 font-bold"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {isCompleted ? <CheckCircle2 size={12} /> : <span>{num}.</span>}
                <span>{st.split(". ")[1]}</span>
              </div>
            );
          })}
        </div>

        {/* Modal Step Content */}
        <div className="p-6 overflow-y-auto flex-1 text-[12px]">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-ink mb-1">Import Job Name</label>
                <input
                  type="text"
                  value={importName}
                  onChange={(e) => setImportName(e.target.value)}
                  className="w-full h-9 px-3 rounded border border-line text-[12px] font-medium text-ink focus:outline-none focus:border-[#671021]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-ink mb-1">Import Type</label>
                  <select
                    value={importType}
                    onChange={(e) => setImportType(e.target.value)}
                    className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none"
                  >
                    <option value="Product Master Import">Product Master Import</option>
                    <option value="Product Delta Update">Product Delta Update</option>
                    <option value="Category Mapping">Category Mapping</option>
                    <option value="Brand Authorization Import">Brand Authorization Import</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-ink mb-1">Source System</label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none"
                  >
                    <option value="Supplier Feed">Supplier Feed</option>
                    <option value="Internal PIM">Internal PIM</option>
                    <option value="Media Assets Hub">Media Assets Hub</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 text-center border-2 border-dashed border-slate-300 rounded-xl p-8 bg-slate-50">
              <Upload size={36} className="mx-auto text-slate-400" />
              <div>
                <span className="font-bold text-ink text-[14px]">Drag and drop your file here</span>
                <p className="text-[11px] text-muted">Supports CSV, XLSX, JSON (Max 100MB)</p>
              </div>
              <div className="flex justify-center">
                <label className="px-4 py-2 rounded bg-white border border-line font-bold text-[#671021] hover:bg-slate-100 cursor-pointer shadow-xs">
                  Browse File
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
              {fileName && (
                <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold text-[12px]">
                  <FileText size={16} /> Selected: {fileName}
                </div>
              )}
            </div>
          )}

          {currentStep >= 3 && (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-semibold text-[11.5px]">
                Validation for step {currentStep} passed successfully for <strong>{importName}</strong> ({fileName}).
              </div>
              <p className="text-slate-600 leading-relaxed">
                Step {currentStep} parameters are populated and verified against schema standard 2026.1. Click Next to proceed to the next workflow stage.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-line flex items-center justify-between bg-slate-50">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="h-9 px-4 rounded border border-line text-[12px] font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1.5"
          >
            <ArrowLeft size={14} /> Previous Step
          </button>

          <div className="flex items-center gap-2">
            <button onClick={onClose} className="h-9 px-4 rounded border border-line text-[12px] font-bold text-slate-600 hover:bg-slate-100">
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="h-9 px-5 rounded bg-[#671021] text-white text-[12px] font-bold hover:bg-[#520d1a] flex items-center gap-1.5 shadow-sm"
            >
              <span>{currentStep === 10 ? "Execute Import" : "Next Step"}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
