"use client";

import React, { useEffect, useState } from "react";
import { SharedDataTable, SharedDataTableTab } from "../shared/SharedDataTable";
import { Settings, FileText, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { productApprovalsApi, ProductApprovalSummary } from "@/services/api/productApprovals";

export function ProductApprovalsTableSection() {
  const [data, setData] = useState<ProductApprovalSummary[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    productApprovalsApi.getApprovals().then(setData);
  }, []);

  const tabs: SharedDataTableTab[] = [
    { label: "All", count: "486", active: true },
    { label: "Pending", count: "312", active: false },
    { label: "Initial Review", count: "126", active: false },
    { label: "Brand Authorization", count: "48", active: false },
    { label: "Compliance Review", count: "36", active: false },
    { label: "Information Requested", count: "42", active: false },
    { label: "Final Decision", count: "28", active: false },
    { label: "Approved", count: "294", active: false },
    { label: "Rejected", count: "28", active: false },
  ];

  const getStatusBadge = (status: string) => {
    let bg = 'bg-slate-100', text = 'text-slate-700';
    if (status === 'Approved' || status === 'Valid') { bg = 'bg-green-50 text-green-700 border-green-200'; }
    else if (status.includes('Pending') || status.includes('Review')) { bg = 'bg-orange-50 text-orange-700 border-orange-200'; }
    else if (status.includes('Requested')) { bg = 'bg-blue-50 text-blue-700 border-blue-200'; }
    else if (status === 'Rejected' || status.includes('Risk')) { bg = 'bg-red-50 text-red-700 border-red-200'; }

    return (
      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium border ${bg}`}>
        {status}
      </span>
    );
  };

  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const toggleSelectAll = () => setSelectedIds(allSelected ? [] : data.map(d => d.id));
  const toggleSelect = (id: string) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="mb-6">
      <SharedDataTable 
        tabs={tabs}
        searchPlaceholder="Search product ID, name, brand, submitter..."
        filters={["Approval Stage", "Risk Level", "Brand", "Supplier", "Category"]}
        itemCountLabel="128 submissions"
      >
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-slate-50 border-b border-line whitespace-nowrap">
                  <th className="py-2.5 px-3 w-8"><input type="checkbox" className="rounded border-line" checked={allSelected} onChange={toggleSelectAll} /></th>
                  <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Product</th>
                  <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Submission ID</th>
                  <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Brand</th>
                  <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Category</th>
                  <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Supplier</th>
                  <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Completeness</th>
                  <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider text-center">Brand Authorization</th>
                  <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider text-center">Compliance</th>
                  <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider text-center">Risk</th>
                  <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Submitted</th>
                  <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider text-center">SLA</th>
                  <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Reviewer</th>
                  <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider text-center">Status</th>
                  <th className="py-2.5 px-3 w-24"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="border-b border-line hover:bg-slate-50 transition-colors whitespace-nowrap">
                    <td className="py-3 px-3 w-8"><input type="checkbox" className="rounded border-line" checked={selectedIds.includes(row.id)} onChange={() => toggleSelect(row.id)} /></td>
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <Link href={`/admin/catalogue/approvals/${row.id}`} className="text-[12px] font-bold text-ink hover:underline truncate max-w-[150px]" title={row.productName}>
                          {row.productName}
                        </Link>
                        <span className="text-[10px] font-medium text-muted">{row.productId}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-[11px] font-medium text-[#0ea5e9]">{row.id}</td>
                    <td className="py-3 px-3 text-[11px] text-ink">{row.brand}</td>
                    <td className="py-3 px-3 text-[11px] text-ink">{row.category}</td>
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-ink truncate max-w-[120px]" title={row.supplier}>{row.supplier}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium w-8">{row.completeness}%</span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: `${row.completeness}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">{getStatusBadge(row.brandAuthorization)}</td>
                    <td className="py-3 px-3 text-center">{getStatusBadge(row.complianceState)}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-[10px] font-semibold ${row.riskLevel === 'High' ? 'text-red-600' : row.riskLevel === 'Medium' ? 'text-orange-500' : 'text-green-600'}`}>{row.riskLevel}</span>
                    </td>
                    <td className="py-3 px-3 text-[11px] text-slate-500">{row.submittedDate}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-[11px] font-medium ${row.slaStatus === 'Breached' ? 'text-red-600' : 'text-green-600'}`}>{row.sla}</span>
                    </td>
                    <td className="py-3 px-3 text-[11px] text-slate-600">{row.assignedReviewer}</td>
                    <td className="py-3 px-3 text-center text-[10px] font-medium text-[#0ea5e9]">{row.stage}</td>
                    <td className="py-3 px-3 text-right">
                      <Link href={`/admin/catalogue/approvals/${row.id}`} className="h-7 px-3 rounded bg-white border border-line text-[10px] font-medium text-ink hover:bg-canvas transition-colors flex items-center justify-center">
                        Open Approval
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </SharedDataTable>
    </div>
  );
}
