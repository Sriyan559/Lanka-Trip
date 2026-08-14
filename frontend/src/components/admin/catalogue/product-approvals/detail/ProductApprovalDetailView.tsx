"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, AlertTriangle, RefreshCw, CheckCircle, XCircle, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { productApprovalsApi } from "@/services/api/productApprovals";

export function ProductApprovalDetailView() {
  const params = useParams();
  const productId = (params?.productId || params?.id || "") as string;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (productId) {
      productApprovalsApi.getApprovalById(productId).then(setData);
    }
  }, [productId]);



  if (!data) return <div className="p-8 text-center text-muted">Loading approval details...</div>;

  return (
    <div className="flex flex-col w-full h-full">
      {/* Warning Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-2 text-amber-800 text-[12px] font-medium">
          <AlertTriangle size={14} className="text-amber-500" />
          <span>This product submission is currently under review by another user. Please communicate before making final decisions.</span>
        </div>
        <button className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900 bg-white border border-amber-200 rounded px-3 py-1 hover:bg-amber-100 transition-colors">
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      <div className="flex h-full w-full overflow-hidden">
        <div className="flex-1 overflow-auto p-6 flex flex-col">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex items-center text-[11px] font-medium text-muted gap-2 mb-2">
              <Link href="/admin/catalogue/approvals" className="hover:text-ink flex items-center gap-1">
                <ArrowLeft size={12} /> Back to Product Approval Queue
              </Link>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
              <div className="flex items-start gap-5 flex-1">
                <div className="w-24 h-24 bg-white border border-line rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-2 relative shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-900 to-amber-700 opacity-20"></div>
                  <div className="w-12 h-16 bg-amber-900 rounded-t-lg rounded-b flex flex-col items-center pt-2 border border-amber-950 relative z-10 shadow-lg">
                    <div className="w-3 h-4 bg-amber-950 rounded-t border-b border-black"></div>
                  </div>
                </div>
                
                <div className="flex flex-col flex-1">
                  <h1 className="text-xl font-bold text-ink mb-1">{data.productName}</h1>
                  <span className="text-[12px] text-muted mb-4">{data.brand} • {data.supplier}</span>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Approval ID</span>
                      <span className="text-[12px] font-semibold text-[#0ea5e9]">{data.id}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Product ID</span>
                      <span className="text-[12px] font-semibold text-ink">{data.productId}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">SKU</span>
                      <span className="text-[12px] font-semibold text-ink">{data.sku}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Category</span>
                      <span className="text-[12px] font-semibold text-ink">{data.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Readiness Metric Strip */}
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-6">
            <div className="bg-white border border-line rounded p-2 flex flex-col shadow-sm">
              <span className="text-[9px] font-bold text-muted truncate">Identity</span>
              <span className="text-[12px] font-bold text-green-700">{data.metrics.identity}%</span>
            </div>
            <div className="bg-white border border-line rounded p-2 flex flex-col shadow-sm">
              <span className="text-[9px] font-bold text-muted truncate">Classification</span>
              <span className="text-[12px] font-bold text-green-700">{data.metrics.classification}%</span>
            </div>
            <div className="bg-white border border-line rounded p-2 flex flex-col shadow-sm">
              <span className="text-[9px] font-bold text-muted truncate">Brand Verification</span>
              <span className="text-[12px] font-bold text-green-700">{data.metrics.brandVerification}%</span>
            </div>
            <div className="bg-white border border-line rounded p-2 flex flex-col shadow-sm">
              <span className="text-[9px] font-bold text-muted truncate">Compliance</span>
              <span className="text-[12px] font-bold text-orange-600">{data.metrics.complianceReadiness}%</span>
            </div>
            <div className="bg-white border border-line rounded p-2 flex flex-col shadow-sm">
              <span className="text-[9px] font-bold text-muted truncate">Variant</span>
              <span className="text-[12px] font-bold text-green-700">{data.metrics.variantReadiness}%</span>
            </div>
            <div className="bg-white border border-line rounded p-2 flex flex-col shadow-sm">
              <span className="text-[9px] font-bold text-muted truncate">Media</span>
              <span className="text-[12px] font-bold text-orange-600">{data.metrics.mediaReadiness}%</span>
            </div>
            <div className="bg-white border border-line rounded p-2 flex flex-col shadow-sm">
              <span className="text-[9px] font-bold text-muted truncate">Inventory Link</span>
              <span className="text-[12px] font-bold text-green-700">Linked</span>
            </div>
            <div className="bg-white border border-line rounded p-2 flex flex-col shadow-sm">
              <span className="text-[9px] font-bold text-muted truncate">Publication</span>
              <span className="text-[12px] font-bold text-orange-600">Not Ready</span>
            </div>
            <div className="bg-white border border-line rounded p-2 flex flex-col shadow-sm">
              <span className="text-[9px] font-bold text-muted truncate">Duplicate Risk</span>
              <span className="text-[12px] font-bold text-green-700">Low</span>
            </div>
            <div className="bg-white border border-line rounded p-2 flex flex-col shadow-sm">
              <span className="text-[9px] font-bold text-muted truncate">Open Issues</span>
              <span className="text-[12px] font-bold text-red-600">3</span>
            </div>
          </div>

          {/* Detailed Tabs */}
          <div className="flex items-center gap-6 border-b border-line mb-6 overflow-x-auto">
            {["Approval Overview", "Product Identity", "Brand & Supplier", "Product Content", "Ingredients & Safety", "Variants & Attributes", "Images & Media", "Compliance", "Inventory & Batches", "Pricing & Tax", "Publication & Channels", "Audit History"].map((tab, i) => (
              <button key={tab} className={`whitespace-nowrap pb-3 text-[12px] font-bold border-b-2 transition-colors ${i === 0 ? 'border-[#741d35] text-[#741d35]' : 'border-transparent text-muted hover:text-ink hover:border-line'}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Placeholder */}
          <div className="flex-1 border border-line bg-white rounded-lg p-8 text-center text-muted shadow-sm flex flex-col items-center justify-center">
            <h3 className="text-sm font-bold text-ink mb-2">Approval Overview Content</h3>
            <p className="text-[12px]">Submission summary, approval checklist, blocking issues, reviewer notes, and approval history go here.</p>
          </div>
        </div>

        {/* Right-side Approval Rail */}
        <div className="w-[320px] shrink-0 border-l border-line bg-slate-50 flex flex-col overflow-auto p-4 gap-4">
          <div className="bg-white border border-line rounded-lg p-4 shadow-sm">
            <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-4">Current Approval State</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-muted font-medium">Stage</span>
                <span className="font-bold text-[#0ea5e9]">{data.stage}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-muted font-medium">Status</span>
                <span className="font-bold text-orange-600">{data.status}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-muted font-medium">SLA Remaining</span>
                <span className="font-bold text-ink">{data.slaRemaining}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-muted font-medium">Risk Level</span>
                <span className="font-bold text-red-600">{data.riskLevel}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-line flex flex-col gap-2">
              <h4 className="text-[11px] font-bold text-ink mb-1">Final Decision Actions</h4>
              <button className="w-full py-2 bg-[#059669] text-white rounded text-[11px] font-bold hover:bg-[#047857] flex items-center justify-center gap-1.5 shadow-sm">
                <CheckCircle size={14} /> Approve Product
              </button>
              <button className="w-full py-2 bg-white border border-[#dc2626] text-[#dc2626] rounded text-[11px] font-bold hover:bg-red-50 flex items-center justify-center gap-1.5 shadow-sm">
                <XCircle size={14} /> Reject Product
              </button>
              <button className="w-full py-2 bg-white border border-line text-ink rounded text-[11px] font-bold hover:bg-slate-50 shadow-sm">
                Request Additional Information
              </button>
              <button className="w-full py-2 bg-white border border-line text-ink rounded text-[11px] font-bold hover:bg-slate-50 shadow-sm">
                Return to Previous Stage
              </button>
              <button className="w-full py-2 bg-white border border-line text-ink rounded text-[11px] font-bold hover:bg-slate-50 shadow-sm flex items-center justify-center gap-1.5">
                <MoreHorizontal size={14} /> More Options
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
