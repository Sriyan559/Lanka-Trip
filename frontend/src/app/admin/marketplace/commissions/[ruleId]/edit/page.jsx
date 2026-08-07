import CommissionRuleEditorView from "@/components/admin/marketplace/commissions/rule-editor/CommissionRuleEditorView";
export default function EditCommissionRulePage({params}){return <CommissionRuleEditorView mode="edit" ruleId={params.ruleId}/>}
