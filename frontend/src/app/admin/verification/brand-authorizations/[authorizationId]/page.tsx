import { notFound } from "next/navigation";
import { AuthorizationDetailView } from "@/components/admin/verification/authorization-detail/AuthorizationDetailView";
import { getBrandAuthorizationDetail } from "@/services/api/authorizationDetailService";

export default async function Page({
  params,
}: {
  params: Promise<{ authorizationId: string }>;
}) {
  const { authorizationId } = await params;
  const authorizationCase = await getBrandAuthorizationDetail(authorizationId);

  if (!authorizationCase) notFound();

  return <AuthorizationDetailView initialCase={authorizationCase} />;
}
