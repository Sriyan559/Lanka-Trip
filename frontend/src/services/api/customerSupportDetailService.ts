import { getMockCaseDetail } from '@/mocks/admin/customerSupportDetail.mock';
import type { CaseDetailFullData } from '@/types/customerSupportDetail';

// Memory cache for stateful mutations during session
const caseStore: Record<string, CaseDetailFullData> = {};

export async function fetchCaseDetail(caseId: string): Promise<CaseDetailFullData> {
  // Simulate small network delay
  await new Promise((resolve) => setTimeout(resolve, 80));

  if (!caseStore[caseId]) {
    const fixture = getMockCaseDetail(caseId);
    if (!fixture) {
      throw new Error('Support case not found.');
    }
    caseStore[caseId] = JSON.parse(JSON.stringify(fixture));
  }

  return caseStore[caseId];
}

export async function addCustomerMessage(
  caseId: string,
  messageBody: string,
  attachments?: { name: string; url: string; size: string }[]
): Promise<{ success: boolean; messageId: string }> {
  const caseData = await fetchCaseDetail(caseId);
  const msgId = `msg-${Date.now()}`;

  caseData.messages.push({
    id: msgId,
    senderName: 'Elena Vance', // Logged in compliance/support lead
    senderRole: 'Support Agent',
    channel: caseData.caseInfo.channel,
    timestamp: new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
    messageBody,
    isCustomerVisible: true,
    deliveryStatus: 'Sent',
    attachments,
  });

  caseData.auditEvents.unshift({
    id: `aud-${Date.now()}`,
    eventType: 'Customer Message Sent',
    actorName: 'Elena Vance',
    actorRole: 'Compliance Lead',
    timestamp: new Date().toLocaleString(),
    details: `Sent message to customer: "${messageBody.substring(0, 40)}..."`,
  });

  caseData.caseInfo.lastUpdated = 'Just now';
  return { success: true, messageId: msgId };
}

export async function addInternalNote(
  caseId: string,
  noteContent: string,
  visibility: 'Internal Only' | 'Team Leads Only' = 'Internal Only'
): Promise<{ success: boolean; noteId: string }> {
  const caseData = await fetchCaseDetail(caseId);
  const noteId = `note-${Date.now()}`;

  caseData.internalNotes.unshift({
    id: noteId,
    authorName: 'Elena Vance',
    authorRole: 'Compliance Lead',
    createdAt: new Date().toLocaleString(),
    content: noteContent,
    visibility,
  });

  caseData.auditEvents.unshift({
    id: `aud-${Date.now()}`,
    eventType: 'Internal Note Added',
    actorName: 'Elena Vance',
    actorRole: 'Compliance Lead',
    timestamp: new Date().toLocaleString(),
    details: `Added internal note (${visibility}).`,
  });

  caseData.caseInfo.lastUpdated = 'Just now';
  return { success: true, noteId };
}

export async function toggleChecklistItem(
  caseId: string,
  itemId: number,
  newStatus: 'Completed' | 'Pending' | 'In Progress' | 'Blocked' | 'N/A',
  reason?: string
): Promise<{ success: boolean }> {
  const caseData = await fetchCaseDetail(caseId);
  const item = caseData.checklist.find((i) => i.id === itemId);
  if (item) {
    const prev = item.status;
    item.status = newStatus;
    if (newStatus === 'Completed') {
      item.completedAt = new Date().toLocaleString();
      item.completedBy = 'Elena Vance';
    }

    caseData.auditEvents.unshift({
      id: `aud-${Date.now()}`,
      eventType: 'Checklist Item Updated',
      actorName: 'Elena Vance',
      actorRole: 'Compliance Lead',
      timestamp: new Date().toLocaleString(),
      details: `Updated task "${item.task}" status from ${prev} to ${newStatus}.${reason ? ` Reason: ${reason}` : ''}`,
      previousValue: prev,
      newValue: newStatus,
    });
  }
  return { success: true };
}

export async function assignCase(
  caseId: string,
  agentName: string,
  agentId?: string,
  assignedTeam?: string,
  reason?: string
): Promise<{ success: boolean }> {
  const caseData = await fetchCaseDetail(caseId);
  const prevAgent = caseData.caseInfo.assignedAgentName || 'Unassigned';

  caseData.caseInfo.assignedAgentName = agentName;
  if (agentId) caseData.caseInfo.assignedAgentId = agentId;
  if (assignedTeam) caseData.caseInfo.assignedTeam = assignedTeam;
  caseData.caseInfo.lastUpdated = 'Just now';

  caseData.auditEvents.unshift({
    id: `aud-${Date.now()}`,
    eventType: 'Agent Assigned',
    actorName: 'Elena Vance',
    actorRole: 'Compliance Lead',
    timestamp: new Date().toLocaleString(),
    details: `Reassigned case from ${prevAgent} to ${agentName} (${assignedTeam || caseData.caseInfo.assignedTeam}).${reason ? ` Reason: ${reason}` : ''}`,
    previousValue: prevAgent,
    newValue: agentName,
  });

  return { success: true };
}

export async function changePriority(
  caseId: string,
  newPriority: 'Low' | 'Normal' | 'High' | 'Urgent' | 'Critical',
  reason?: string
): Promise<{ success: boolean }> {
  const caseData = await fetchCaseDetail(caseId);
  const prev = caseData.caseInfo.priority;

  caseData.caseInfo.priority = newPriority;
  caseData.caseInfo.lastUpdated = 'Just now';

  caseData.auditEvents.unshift({
    id: `aud-${Date.now()}`,
    eventType: 'Priority Changed',
    actorName: 'Elena Vance',
    actorRole: 'Compliance Lead',
    timestamp: new Date().toLocaleString(),
    details: `Changed case priority from ${prev} to ${newPriority}.${reason ? ` Reason: ${reason}` : ''}`,
    previousValue: prev,
    newValue: newPriority,
  });

  return { success: true };
}

export async function escalateCase(
  caseId: string,
  escalationLevel: string,
  targetTeam: string,
  reason: string
): Promise<{ success: boolean }> {
  const caseData = await fetchCaseDetail(caseId);

  caseData.caseInfo.caseStatus = 'Escalated';
  caseData.caseInfo.riskLevel = 'Critical';
  caseData.caseInfo.lastUpdated = 'Just now';

  caseData.escalationEvents.unshift({
    id: `esc-${Date.now()}`,
    timestamp: new Date().toLocaleString(),
    level: escalationLevel,
    escalatedBy: 'Elena Vance',
    escalatedTo: targetTeam,
    reason,
    status: 'Active',
  });

  caseData.auditEvents.unshift({
    id: `aud-${Date.now()}`,
    eventType: 'Case Escalated',
    actorName: 'Elena Vance',
    actorRole: 'Compliance Lead',
    timestamp: new Date().toLocaleString(),
    details: `Escalated case to ${escalationLevel} (${targetTeam}). Reason: ${reason}`,
  });

  return { success: true };
}

export async function markCaseResolved(
  caseId: string,
  resolutionCategory: string,
  resolutionSummary: string,
  customerOutcome: string,
  internalNotes?: string
): Promise<{ success: boolean }> {
  const caseData = await fetchCaseDetail(caseId);

  caseData.caseInfo.caseStatus = 'Resolved';
  caseData.caseInfo.slaStatus = 'Completed';
  caseData.caseInfo.lastUpdated = 'Just now';

  // Mark lifecycle stage 8 as active/completed
  caseData.lifecycleStages.forEach((stg) => {
    if (stg.stageNumber <= 8) {
      stg.status = 'completed';
      if (stg.stageNumber === 8) {
        stg.timestamp = new Date().toLocaleString();
        stg.actor = 'Elena Vance';
      }
    }
  });

  caseData.auditEvents.unshift({
    id: `aud-${Date.now()}`,
    eventType: 'Case Resolved',
    actorName: 'Elena Vance',
    actorRole: 'Compliance Lead',
    timestamp: new Date().toLocaleString(),
    details: `Case marked as Resolved. Category: ${resolutionCategory}. Summary: ${resolutionSummary}. Customer outcome: ${customerOutcome}`,
  });

  return { success: true };
}

export async function closeCase(
  caseId: string,
  closureReason: string
): Promise<{ success: boolean }> {
  const caseData = await fetchCaseDetail(caseId);

  caseData.caseInfo.caseStatus = 'Closed';
  caseData.caseInfo.lastUpdated = 'Just now';

  // Mark stage 9 as completed
  caseData.lifecycleStages.forEach((stg) => {
    stg.status = 'completed';
    if (stg.stageNumber === 9) {
      stg.timestamp = new Date().toLocaleString();
      stg.actor = 'Elena Vance';
    }
  });

  caseData.auditEvents.unshift({
    id: `aud-${Date.now()}`,
    eventType: 'Case Closed',
    actorName: 'Elena Vance',
    actorRole: 'Compliance Lead',
    timestamp: new Date().toLocaleString(),
    details: `Case closed. Reason: ${closureReason}`,
  });

  return { success: true };
}
