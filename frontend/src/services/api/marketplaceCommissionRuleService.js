import {marketplaceCommissionsFixture} from "@/mocks/marketplaceCommissions.mock";
import {commissionRuleEditorFixture} from "@/mocks/marketplaceCommissionRule.mock";

export function createTemporaryCommissionRuleReference(){return `DRAFT-COM-${Date.now().toString().slice(-8)}`}
export async function fetchCommissionRuleEditor(ruleId,signal){if(signal?.aborted)throw new DOMException("Request aborted","AbortError");const rule=marketplaceCommissionsFixture.rules.find(item=>item.id===ruleId);if(!rule)throw new Error("RULE_NOT_FOUND");return structuredClone({...commissionRuleEditorFixture,rule:{...commissionRuleEditorFixture.defaults,name:rule.name,id:rule.id,type:rule.type,version:3,status:rule.status,rate:rule.rate.replace("%",""),minimumFee:rule.min.replace("LKR ",""),maximumFee:rule.max.replace("LKR ",""),effectiveFrom:"2026-08-05",effectiveTo:"2026-09-30"}})}
export async function createCommissionRuleEditorDraft(signal){if(signal?.aborted)throw new DOMException("Request aborted","AbortError");return structuredClone({...commissionRuleEditorFixture,rule:{...commissionRuleEditorFixture.defaults,id:createTemporaryCommissionRuleReference()}})}
export async function recordCommissionRuleEditorAction(ruleId,action,payload={}){await Promise.resolve();return{id:`local-${Date.now()}`,ruleId,action,payload,source:"local-preview",at:new Date().toISOString()}}

