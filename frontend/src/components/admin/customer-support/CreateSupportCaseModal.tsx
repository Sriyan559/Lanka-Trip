'use client';

import React, { useState } from 'react';
import { X, AlertCircle, Loader2 } from 'lucide-react';
import type { SupportChannel, SupportPriority, CreateSupportCaseDto } from '@/types/customerSupport';

interface CreateSupportCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dto: CreateSupportCaseDto) => Promise<void>;
}

export function CreateSupportCaseModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateSupportCaseModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [caseCategory, setCaseCategory] = useState('Delivery Issue');
  const [issueType, setIssueType] = useState('Shipment Not Dispatched');
  const [channel, setChannel] = useState<SupportChannel>('In-App Chat');
  const [priority, setPriority] = useState<SupportPriority>('Normal');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [relatedOrderId, setRelatedOrderId] = useState('');
  const [relatedReturnId, setRelatedReturnId] = useState('');
  const [relatedShipmentId, setRelatedShipmentId] = useState('');
  const [relatedProductName, setRelatedProductName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [assignedTeam, setAssignedTeam] = useState('Tier 1 Support');
  const [assignedAgent, setAssignedAgent] = useState('Unassigned');
  const [slaTarget, setSlaTarget] = useState('24 Hours');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Customer Name is required.');
      return;
    }
    if (!subject.trim()) {
      setErrorMsg('Subject is required.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Case Description is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg(null);
      await onSubmit({
        customerName: customerName.trim(),
        customerId: customerId.trim() || undefined,
        caseCategory,
        issueType,
        channel,
        priority,
        subject: subject.trim(),
        description: description.trim(),
        relatedOrderId: relatedOrderId.trim() || undefined,
        relatedReturnId: relatedReturnId.trim() || undefined,
        relatedShipmentId: relatedShipmentId.trim() || undefined,
        relatedProductName: relatedProductName.trim() || undefined,
        supplierName: supplierName.trim() || undefined,
        assignedTeam,
        assignedAgent: assignedAgent.trim() || undefined,
        slaTarget,
      });
      onClose();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to create support case. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full h-[38px] px-3 bg-white border border-line rounded-lg text-[13px] text-ink focus:outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 transition-shadow";
  const labelClass = "block text-[11px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[800px] flex flex-col max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-line bg-slate-50">
          <h2 className="text-[16px] font-bold text-ink">Create Support Case</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-md p-1 border border-line shadow-sm">
            <X size={18} />
          </button>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="mx-5 mt-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[12px] flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Modal Body / Form */}
        <form id="create-support-case-form" onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
            {/* Row 1 */}
            <div>
              <label className={labelClass}>Customer Name *</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Elena Rodriguez"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Customer ID</label>
              <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="e.g. CUS-2026-01842"
                className={inputClass}
              />
            </div>

            {/* Row 2 */}
            <div>
              <label className={labelClass}>Case Category *</label>
              <select
                value={caseCategory}
                onChange={(e) => setCaseCategory(e.target.value)}
                className={inputClass}
              >
                <option value="Delivery Issue">Delivery Issue</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Product Safety">Product Safety</option>
                <option value="Return & Refund">Return & Refund</option>
                <option value="Authenticity">Authenticity</option>
                <option value="Supplier Issue">Supplier Issue</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Issue Type *</label>
              <input
                type="text"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                placeholder="e.g. Shipment Not Dispatched"
                className={inputClass}
                required
              />
            </div>

            {/* Row 3 */}
            <div>
              <label className={labelClass}>Channel *</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as SupportChannel)}
                className={inputClass}
              >
                <option value="In-App Chat">In-App Chat</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Web Portal">Web Portal</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Priority *</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as SupportPriority)}
                className={inputClass}
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            {/* Row 4: Subject (Span 2) */}
            <div className="md:col-span-2">
              <label className={labelClass}>Subject *</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Summary of customer inquiry or complaint"
                className={inputClass}
                required
              />
            </div>

            {/* Row 5: Description (Span 2) */}
            <div className="md:col-span-2">
              <label className={labelClass}>Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description of customer inquiry, order issue, or complaint details"
                className="w-full min-h-[100px] p-3 bg-white border border-line rounded-lg text-[13px] text-ink focus:outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 transition-shadow resize-y"
                required
              />
            </div>

            {/* Row 6 */}
            <div>
              <label className={labelClass}>Related Order ID</label>
              <input
                type="text"
                value={relatedOrderId}
                onChange={(e) => setRelatedOrderId(e.target.value)}
                placeholder="e.g. ORD-2026-009021"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Related Return ID</label>
              <input
                type="text"
                value={relatedReturnId}
                onChange={(e) => setRelatedReturnId(e.target.value)}
                placeholder="e.g. RET-2026-045075"
                className={inputClass}
              />
            </div>

            {/* Row 7 */}
            <div>
              <label className={labelClass}>Related Shipment ID</label>
              <input
                type="text"
                value={relatedShipmentId}
                onChange={(e) => setRelatedShipmentId(e.target.value)}
                placeholder="e.g. SHP-2026-010293"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Related Product Name</label>
              <input
                type="text"
                value={relatedProductName}
                onChange={(e) => setRelatedProductName(e.target.value)}
                placeholder="e.g. Radiance Vitamin C Serum"
                className={inputClass}
              />
            </div>

            {/* Row 8 */}
            <div>
              <label className={labelClass}>Supplier Name</label>
              <input
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="e.g. Luxe Distribution Pvt Ltd"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Assigned Team *</label>
              <select
                value={assignedTeam}
                onChange={(e) => setAssignedTeam(e.target.value)}
                className={inputClass}
              >
                <option value="Tier 1 Support">Tier 1 Support</option>
                <option value="Tier 2 Support">Tier 2 Support</option>
                <option value="Finance Team">Finance Team</option>
                <option value="Logistics Ops">Logistics Ops</option>
                <option value="Safety & Compliance">Safety & Compliance</option>
              </select>
            </div>

            {/* Row 9 */}
            <div>
              <label className={labelClass}>Assigned Agent</label>
              <select
                value={assignedAgent}
                onChange={(e) => setAssignedAgent(e.target.value)}
                className={inputClass}
              >
                <option value="Unassigned">Unassigned</option>
                <option value="Amaya Perera">Amaya Perera</option>
                <option value="Dilan Perera">Dilan Perera</option>
                <option value="Nadeesha Silva">Nadeesha Silva</option>
                <option value="Elena Vance">Elena Vance</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>SLA Target *</label>
              <select
                value={slaTarget}
                onChange={(e) => setSlaTarget(e.target.value)}
                className={inputClass}
              >
                <option value="4 Hours">4 Hours</option>
                <option value="12 Hours">12 Hours</option>
                <option value="24 Hours">24 Hours</option>
                <option value="48 Hours">48 Hours</option>
              </select>
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-line bg-slate-50">
          <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white border border-line text-slate-700 text-[13px] font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm" disabled={isSubmitting}>
            Cancel
          </button>

          <button
            type="submit"
            form="create-support-case-form"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-900 text-white text-[13px] font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Creating Case...</span>
              </>
            ) : (
              <span>Create Support Case</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
