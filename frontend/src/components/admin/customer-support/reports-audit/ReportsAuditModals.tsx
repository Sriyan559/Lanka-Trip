'use client';

import React, { useState } from 'react';
import { X, FileText, Download, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GenerateReportModal({ isOpen, onClose }: ModalProps) {
  const [reportName, setReportName] = useState('');
  const [domain, setDomain] = useState('Cases & Queues');
  const [format, setFormat] = useState('PDF');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Report generation job created for "${reportName || 'Custom Support Report'}"!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <FileText size={16} className="text-[#881337]" /> Generate Operational Report
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Report Title</label>
            <input
              type="text"
              required
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              placeholder="e.g. Weekly Escalations Detail"
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Support Domain</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-slate-900"
              >
                <option value="Cases & Queues">Cases &amp; Queues</option>
                <option value="Workforce">Workforce</option>
                <option value="SLA & Routing">SLA &amp; Routing</option>
                <option value="Complaints">Complaints</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Output Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-slate-900 font-mono font-bold"
              >
                <option value="PDF">PDF</option>
                <option value="Excel">Excel (.xlsx)</option>
                <option value="CSV">CSV</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded hover:bg-slate-200">Cancel</button>
            <button type="submit" className="px-3 py-1.5 bg-[#881337] text-white font-semibold rounded hover:bg-[#70102e]">Generate Report</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ExportDataModal({ isOpen, onClose }: ModalProps) {
  const [scope, setScope] = useState('All Business Units');
  const [domain, setDomain] = useState('Cases & Queues');

  if (!isOpen) return null;

  const handleExport = () => {
    toast.success(`Export Job initiated for ${domain} (${scope})! Estimated records: 24,500.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Download size={16} className="text-slate-700" /> Export Support Data (Secure Contract)
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2 bg-amber-50 border border-amber-200 rounded text-[11px] space-y-1">
            <div className="flex items-center gap-1 font-bold text-amber-800">
              <AlertCircle size={13} /> Permission &amp; Sensitive Data Notice
            </div>
            <p className="text-amber-700 leading-tight">
              Exporting customer support data requires audit logging. Sensitive PII fields will be masked based on your access tier.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Domain</label>
              <select value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5">
                <option value="Cases & Queues">Cases &amp; Queues</option>
                <option value="Satisfaction & QA">Satisfaction &amp; QA</option>
                <option value="Audit Logs">Audit Logs</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Scope</label>
              <select value={scope} onChange={(e) => setScope(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5">
                <option value="All Business Units">All Business Units</option>
                <option value="Retail Only">Retail Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end gap-2 text-xs">
          <button type="button" onClick={onClose} className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded hover:bg-slate-200">Cancel</button>
          <button type="button" onClick={handleExport} className="px-3 py-1.5 bg-slate-800 text-white font-semibold rounded hover:bg-slate-900">Create Export Job</button>
        </div>
      </div>
    </div>
  );
}

export function ImportDataModal({ isOpen, onClose }: ModalProps) {
  const [step, setStep] = useState<'upload' | 'preview'>('upload');
  const [fileName, setFileName] = useState('');

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setStep('preview');
    }
  };

  const handleConfirmImport = () => {
    toast.success(`Import Job created for "${fileName || 'support_import.csv'}"! Transfer validation passed.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Upload size={16} className="text-slate-700" /> Import Support Data (Validate &amp; Preview)
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        {step === 'upload' ? (
          <div className="space-y-3 text-xs">
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer relative">
              <input type="file" onChange={handleFileSelect} className="absolute inset-0 opacity-0 cursor-pointer" />
              <Upload size={24} className="mx-auto text-slate-400 mb-2" />
              <p className="font-semibold text-slate-700">Click to select file or drag &amp; drop</p>
              <p className="text-slate-400 text-[10px] mt-1">Supports .csv, .xlsx, .json up to 50MB</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-[11px] space-y-1">
              <div className="flex items-center gap-1 font-bold text-emerald-800">
                <CheckCircle2 size={13} /> Schema Validation Passed
              </div>
              <p className="text-emerald-700">File: <strong>{fileName}</strong> (1,420 records detected)</p>
            </div>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              <div className="flex justify-between"><span>Mapped Domain:</span> <strong>Cases &amp; Queues</strong></div>
              <div className="flex justify-between"><span>Errors / Warnings:</span> <strong className="text-emerald-600">0 Errors</strong></div>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 flex justify-end gap-2 text-xs">
          <button type="button" onClick={onClose} className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded hover:bg-slate-200">Cancel</button>
          {step === 'preview' && (
            <button type="button" onClick={handleConfirmImport} className="px-3 py-1.5 bg-[#881337] text-white font-semibold rounded hover:bg-[#70102e]">
              Confirm &amp; Execute Import
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
