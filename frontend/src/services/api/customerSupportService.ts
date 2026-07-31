import {
  mockSupportCases,
  mockSupportMetricSummary,
  mockOperationsHealth,
  mockPriorityAlerts,
  mockAgentWorkload,
  mockQuickQueue,
  mockSentimentDistribution,
  mockCaseMixCategories,
} from "@/mocks/admin/customerSupport.mock";
import type {
  SupportCaseItem,
  SupportCaseFilterParams,
  SupportCaseMetricSummary,
  SupportOperationsHealthData,
  PriorityAlertData,
  AgentWorkloadItem,
  QuickQueueItemData,
  CustomerSentimentDistribution,
  CaseMixCategory,
  CreateSupportCaseDto,
  BulkAssignSupportCasesDto,
  BulkResponseDto,
  SaveSupportViewDto,
} from "@/types/customerSupport";

// TODO(api): Replace this isolated mock adapter when Laravel exposes protected
// Admin Customer Support endpoints with the same filters and response shapes.
export async function fetchSupportCases(filters: SupportCaseFilterParams = {}): Promise<{
  data: SupportCaseItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  let filtered = [...mockSupportCases];

  // Search filter across fields
  if (filters.search && filters.search.trim() !== "") {
    const q = filters.search.toLowerCase().trim();
    filtered = filtered.filter(
      (c) =>
        c.caseReference.toLowerCase().includes(q) ||
        c.dbCaseId.toLowerCase().includes(q) ||
        c.customerName.toLowerCase().includes(q) ||
        c.customerId.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.issueType.toLowerCase().includes(q) ||
        c.caseCategory.toLowerCase().includes(q) ||
        (c.relatedOrderReference && c.relatedOrderReference.toLowerCase().includes(q)) ||
        (c.relatedReturnReference && c.relatedReturnReference.toLowerCase().includes(q)) ||
        (c.relatedShipmentReference && c.relatedShipmentReference.toLowerCase().includes(q)) ||
        (c.relatedProductName && c.relatedProductName.toLowerCase().includes(q)) ||
        (c.supplierName && c.supplierName.toLowerCase().includes(q)) ||
        (c.lastCustomerMessage && c.lastCustomerMessage.toLowerCase().includes(q))
    );
  }

  // Individual domain filters
  if (filters.status && filters.status !== "all") {
    const s = filters.status.toLowerCase();
    filtered = filtered.filter((c) => c.caseStatus.toLowerCase().replace(/\s+/g, "-") === s || c.caseStatus.toLowerCase() === s);
  }

  if (filters.priority && filters.priority !== "all") {
    const p = filters.priority.toLowerCase();
    filtered = filtered.filter((c) => c.priority.toLowerCase() === p);
  }

  if (filters.sla && filters.sla !== "all") {
    const sla = filters.sla.toLowerCase();
    filtered = filtered.filter((c) => c.slaStatus.toLowerCase().replace(/\s+/g, "-") === sla || c.slaStatus.toLowerCase() === sla);
  }

  if (filters.escalation && filters.escalation !== "all") {
    if (filters.escalation === "escalated") {
      filtered = filtered.filter((c) => c.caseStatus === "Escalated" || c.riskLevel === "Critical");
    }
  }

  if (filters.category && filters.category !== "all") {
    const cat = filters.category.toLowerCase();
    filtered = filtered.filter((c) => c.caseCategory.toLowerCase() === cat);
  }

  if (filters.issueType && filters.issueType !== "all") {
    const it = filters.issueType.toLowerCase();
    filtered = filtered.filter((c) => c.issueType.toLowerCase().includes(it));
  }

  if (filters.channel && filters.channel !== "all") {
    const ch = filters.channel.toLowerCase();
    filtered = filtered.filter((c) => c.channel.toLowerCase().replace(/\s+/g, "-") === ch || c.channel.toLowerCase() === ch);
  }

  if (filters.assignedAgent && filters.assignedAgent !== "all") {
    if (filters.assignedAgent === "unassigned") {
      filtered = filtered.filter((c) => !c.assignedAgentName || c.assignedAgentName === "Unassigned");
    } else {
      filtered = filtered.filter((c) => c.assignedAgentName && c.assignedAgentName.toLowerCase().includes(filters.assignedAgent!.toLowerCase()));
    }
  }

  if (filters.sentiment && filters.sentiment !== "all") {
    filtered = filtered.filter((c) => c.sentiment.toLowerCase() === filters.sentiment!.toLowerCase());
  }

  if (filters.risk && filters.risk !== "all") {
    filtered = filtered.filter((c) => c.riskLevel.toLowerCase() === filters.risk!.toLowerCase());
  }

  // Quick filters mapping
  if (filters.quickFilter && filters.quickFilter !== "all") {
    const qf = filters.quickFilter.toLowerCase();
    if (qf === "unassigned") {
      filtered = filtered.filter((c) => !c.assignedAgentName || c.assignedAgentName === "Unassigned");
    } else if (qf === "urgent") {
      filtered = filtered.filter((c) => c.priority === "Urgent");
    } else if (qf === "critical") {
      filtered = filtered.filter((c) => c.priority === "Critical");
    } else if (qf === "sla-at-risk") {
      filtered = filtered.filter((c) => c.slaStatus === "At Risk");
    } else if (qf === "sla-breach") {
      filtered = filtered.filter((c) => c.slaStatus === "Breached");
    } else if (qf === "waiting-customer") {
      filtered = filtered.filter((c) => c.caseStatus === "Waiting for Customer");
    } else if (qf === "waiting-supplier") {
      filtered = filtered.filter((c) => c.caseStatus === "Waiting for Supplier");
    } else if (qf === "waiting-logistics") {
      filtered = filtered.filter((c) => c.caseStatus === "Waiting for Logistics");
    } else if (qf === "waiting-finance") {
      filtered = filtered.filter((c) => c.caseStatus === "Waiting for Finance");
    } else if (qf === "safety-complaint") {
      filtered = filtered.filter((c) => c.isSafetyComplaint || c.caseCategory === "Product Safety");
    } else if (qf === "authenticity-complaint") {
      filtered = filtered.filter((c) => c.isAuthenticityComplaint || c.caseCategory === "Authenticity");
    } else if (qf === "escalated") {
      filtered = filtered.filter((c) => c.caseStatus === "Escalated");
    }
  }

  // Sorting
  if (filters.sort) {
    const field = filters.sort as keyof SupportCaseItem;
    const dir = filters.direction === "desc" ? -1 : 1;
    filtered.sort((a, b) => {
      const valA = a[field] ?? "";
      const valB = b[field] ?? "";
      if (valA < valB) return -1 * dir;
      if (valA > valB) return 1 * dir;
      return 0;
    });
  }

  // Pagination
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 25;
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startIndex = (page - 1) * pageSize;
  const data = filtered.slice(startIndex, startIndex + pageSize);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function fetchSupportMetrics(): Promise<SupportCaseMetricSummary> {
  return { ...mockSupportMetricSummary };
}

export async function fetchSupportOperationsHealth(): Promise<SupportOperationsHealthData> {
  return { ...mockOperationsHealth };
}

export async function fetchPriorityAlerts(): Promise<PriorityAlertData[]> {
  return [...mockPriorityAlerts];
}

export async function fetchAgentWorkload(): Promise<AgentWorkloadItem[]> {
  return [...mockAgentWorkload];
}

export async function fetchQuickQueue(): Promise<QuickQueueItemData[]> {
  return [...mockQuickQueue];
}

export async function fetchSentimentAndCaseMix(): Promise<{
  sentiment: CustomerSentimentDistribution;
  caseMix: CaseMixCategory[];
}> {
  return {
    sentiment: { ...mockSentimentDistribution },
    caseMix: [...mockCaseMixCategories],
  };
}

export async function createSupportCase(dto: CreateSupportCaseDto): Promise<{ success: boolean; caseId: string; caseReference: string }> {
  const newId = String(Math.floor(1000 + Math.random() * 9000));
  const newRef = `CS-2026-00${newId}`;
  
  const newCase: SupportCaseItem = {
    id: newId,
    caseReference: newRef,
    dbCaseId: newId,
    priority: dto.priority,
    caseStatus: "Open",
    customerName: dto.customerName,
    customerId: dto.customerId || `CUS-2026-0${Math.floor(1000 + Math.random() * 9000)}`,
    caseCategory: dto.caseCategory,
    issueType: dto.issueType,
    channel: dto.channel,
    subject: dto.subject,
    relatedOrderId: dto.relatedOrderId,
    relatedOrderReference: dto.relatedOrderId ? `ORD-2026-00${dto.relatedOrderId}` : undefined,
    relatedReturnId: dto.relatedReturnId,
    relatedReturnReference: dto.relatedReturnId ? `RET-2026-04${dto.relatedReturnId}` : undefined,
    relatedShipmentId: dto.relatedShipmentId,
    relatedShipmentReference: dto.relatedShipmentId ? `SHP-2026-01${dto.relatedShipmentId}` : undefined,
    sentiment: "Neutral",
    riskLevel: dto.priority === "Critical" ? "Critical" : dto.priority === "Urgent" ? "High" : "Medium",
    slaStatus: "Within Target",
    firstResponseDue: "2 Hours Remaining",
    resolutionDue: "Jul 24, 2026 5:00 PM",
    assignedAgentName: dto.assignedAgentId ? "Assigned Agent" : "Unassigned",
    assignedAgentId: dto.assignedAgentId,
    assignedTeam: dto.assignedTeam || "General Support",
    lastCustomerMessage: dto.description,
    lastUpdated: "Just now",
    createdAt: new Date().toISOString(),
  };

  mockSupportCases.unshift(newCase);
  return { success: true, caseId: newId, caseReference: newRef };
}

export async function bulkAssignSupportCases(dto: BulkAssignSupportCasesDto): Promise<{ success: boolean; count: number }> {
  dto.caseIds.forEach((id) => {
    const item = mockSupportCases.find((c) => c.id === id || c.caseReference === id);
    if (item) {
      if (dto.assignedAgentName) item.assignedAgentName = dto.assignedAgentName;
      if (dto.assignedTeam) item.assignedTeam = dto.assignedTeam;
      item.lastUpdated = "Just now";
    }
  });
  return { success: true, count: dto.caseIds.length };
}

export async function sendBulkResponse(dto: BulkResponseDto): Promise<{ success: boolean; count: number }> {
  dto.caseIds.forEach((id) => {
    const item = mockSupportCases.find((c) => c.id === id || c.caseReference === id);
    if (item) {
      item.caseStatus = "Waiting for Customer";
      item.lastUpdated = "Just now";
    }
  });
  return { success: true, count: dto.caseIds.length };
}

export async function saveSupportView(dto: SaveSupportViewDto): Promise<{ success: boolean; viewId: string }> {
  return { success: true, viewId: `view-${Date.now()}` };
}

export function exportSupportReportCSV(cases: SupportCaseItem[]): string {
  const headers = [
    "Case Reference",
    "DB Case ID",
    "Priority",
    "Status",
    "Customer",
    "Customer ID",
    "Category",
    "Issue Type",
    "Channel",
    "Subject",
    "Order Ref",
    "Return Ref",
    "Shipment Ref",
    "Product",
    "Supplier",
    "Sentiment",
    "Risk",
    "SLA",
    "Assigned Agent",
    "Last Updated",
  ];

  const rows = cases.map((c) => [
    c.caseReference,
    c.dbCaseId,
    c.priority,
    c.caseStatus,
    `"${c.customerName}"`,
    c.customerId,
    `"${c.caseCategory}"`,
    `"${c.issueType}"`,
    c.channel,
    `"${c.subject.replace(/"/g, '""')}"`,
    c.relatedOrderReference || "",
    c.relatedReturnReference || "",
    c.relatedShipmentReference || "",
    `"${(c.relatedProductName || "").replace(/"/g, '""')}"`,
    `"${(c.supplierName || "").replace(/"/g, '""')}"`,
    c.sentiment,
    c.riskLevel,
    c.slaStatus,
    `"${c.assignedAgentName || "Unassigned"}"`,
    c.lastUpdated,
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
