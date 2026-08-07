import PolicyViolationCaseDetailView from "@/components/admin/marketplace/policy-violations/detail/PolicyViolationCaseDetailView";

export default function PolicyViolationCaseDetailPage({params}){
  return <PolicyViolationCaseDetailView caseId={params.caseId}/>;
}
