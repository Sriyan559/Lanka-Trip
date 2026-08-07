import {marketplacePolicyViolationsFixture} from "@/mocks/marketplacePolicyViolations.mock";

const clone = value => JSON.parse(JSON.stringify(value));

export async function fetchMarketplacePolicyViolations(signal) {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  return clone(marketplacePolicyViolationsFixture);
}

export async function recordPolicyViolationPreviewAction(action, caseIds = [], note = "") {
  return {
    id: `local-policy-event-${Date.now()}`,
    action,
    caseIds,
    note,
    occurredAt: new Date().toISOString(),
    source: "local-preview",
    persisted: false,
  };
}
