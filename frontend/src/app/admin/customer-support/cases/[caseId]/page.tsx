'use client';

import React from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, LifeBuoy, AlertTriangle, CheckCircle, ShieldCheck, User } from 'lucide-react';
import { mockSupportCases } from '@/mocks/admin/customerSupport.mock';
import { sanitizeInternalRedirect } from '@/lib/authRedirect';
import toast from 'react-hot-toast';

export default function CustomerSupportCaseDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [resolved, setResolved] = React.useState(false);

  const caseId = params?.caseId as string;
  const returnTo = sanitizeInternalRedirect(
    searchParams.get('returnTo'),
    '/admin/customer-support/cases',
  );

  const caseData = mockSupportCases.find(
    (item) =>
      item.id === caseId
      || item.dbCaseId === caseId
      || item.caseReference === caseId,
  );

  if (!caseData) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold text-slate-900">Support case not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The requested case does not exist in the available support data.
        </p>
        <Link
          href="/admin/customer-support/cases"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#722140]"
        >
          <ArrowLeft size={16} />
          Back to Support Queue
        </Link>
      </div>
    );
  }

  return (
    <div className="case-detail-page p-6 bg-slate-50 min-h-screen text-slate-800 text-xs">
      {/* Return to Queue Navigation Link */}
      <div className="mb-4">
        <Link
          href={returnTo}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#722140] hover:underline"
        >
          <ArrowLeft size={16} />
          <span>Back to Support Queue</span>
        </Link>
      </div>

      {/* Case Header Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 mb-6 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-base font-extrabold text-[#722140]">
                {caseData.caseReference}
              </span>
              <span className="text-slate-400 font-mono text-xs">(DB ID: {caseData.dbCaseId})</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">
                {caseData.priority} Priority
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-sky-100 text-sky-800 rounded-full">
                {caseData.caseStatus}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">{caseData.subject}</h1>
            <p className="text-slate-500 mt-1 text-xs">
              Customer: <span className="font-semibold text-slate-800">{caseData.customerName}</span> ({caseData.customerId}) • Channel: {caseData.channel} • Created: {caseData.createdAt}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push(returnTo)}
              className="px-4 py-2 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-50 text-slate-700"
            >
              Return to Cases Queue
            </button>
            <button
              type="button"
              disabled={resolved}
              onClick={() => {
                setResolved(true);
                toast.success('Case marked as resolved in this mock workspace.');
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#722140] text-white rounded hover:bg-[#5a1a33]"
            >
              {resolved ? 'Case Resolved' : 'Resolve Case'}
            </button>
          </div>
        </div>
      </div>

      {/* Detail Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-3">
            <h2 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
              Case Information & Communication
            </h2>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded">
                <span className="text-slate-400 block font-medium">Category</span>
                <span className="font-semibold text-slate-800">{caseData.caseCategory}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded">
                <span className="text-slate-400 block font-medium">Issue Type</span>
                <span className="font-semibold text-slate-800">{caseData.issueType}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded">
                <span className="text-slate-400 block font-medium">Assigned Agent</span>
                <span className="font-semibold text-slate-800">{caseData.assignedAgentName || 'Unassigned'}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded">
                <span className="text-slate-400 block font-medium">Assigned Team</span>
                <span className="font-semibold text-slate-800">{caseData.assignedTeam || 'General Support'}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 mt-2">
              <span className="text-slate-500 font-semibold block mb-1">Latest Customer Message</span>
              <p className="text-slate-800 italic">&quot;{caseData.lastCustomerMessage}&quot;</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-3">
            <h2 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
              Commerce Relationship Context
            </h2>

            {caseData.relatedOrderReference && (
              <div className="flex items-center justify-between p-2.5 bg-blue-50/50 border border-blue-200 rounded">
                <div>
                  <span className="text-[10px] text-blue-600 font-bold block uppercase">Related Order</span>
                  <span className="font-mono font-bold text-blue-900">{caseData.relatedOrderReference}</span>
                </div>
                <Link
                  href={`/admin/marketplace/orders/${caseData.relatedOrderReference}`}
                  className="px-2 py-1 bg-blue-600 text-white text-[10px] font-semibold rounded hover:bg-blue-700"
                >
                  View Order
                </Link>
              </div>
            )}

            {caseData.relatedShipmentReference && (
              <div className="flex items-center justify-between p-2.5 bg-teal-50/50 border border-teal-200 rounded">
                <div>
                  <span className="text-[10px] text-teal-600 font-bold block uppercase">Related Shipment</span>
                  <span className="font-mono font-bold text-teal-900">{caseData.relatedShipmentReference}</span>
                </div>
              </div>
            )}

            {caseData.relatedProductName && (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Product</span>
                <span className="font-semibold text-slate-800">{caseData.relatedProductName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
