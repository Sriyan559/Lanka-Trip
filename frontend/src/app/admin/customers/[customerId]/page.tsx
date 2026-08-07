"use client";

import React, { Suspense, use } from "react";
import { CustomerDetailDashboard } from "@/components/admin/customers/detail/CustomerDetailDashboard";

interface CustomerDetailPageProps {
  params: Promise<{ customerId: string }> | { customerId: string };
}

export default function CustomerDetailPage({ params }: CustomerDetailPageProps) {
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const customerId = resolvedParams?.customerId || "CUST-100001";

  return (
    <Suspense fallback={<div className="p-6 text-sm font-semibold">Loading Customer Detail...</div>}>
      <CustomerDetailDashboard customerId={customerId} />
    </Suspense>
  );
}
