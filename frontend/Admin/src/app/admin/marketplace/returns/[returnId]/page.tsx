import React from "react";
import { ReturnDetailView } from "@/features/admin/returns/components/ReturnDetailView";

interface PageProps {
  params: Promise<{ returnId: string }>;
}

export default async function ReturnDetailPage({ params }: PageProps) {
  const { returnId } = await params;
  return <ReturnDetailView returnId={returnId} />;
}
