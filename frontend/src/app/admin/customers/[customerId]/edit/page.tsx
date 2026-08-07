"use client";

import React, { Suspense, use } from "react";
import { CustomerFormDashboard } from "@/components/admin/customers/form/CustomerFormDashboard";

interface CustomerEditPageProps {
  params: Promise<{ customerId: string }> | { customerId: string };
}

export default function CustomerEditPage({ params }: CustomerEditPageProps) {
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const customerId = resolvedParams?.customerId || "CUST-100001";

  return (
    <Suspense fallback={<div className="p-6 text-sm font-semibold">Loading Customer Edit Form...</div>}>
      <CustomerFormDashboard mode="edit" customerId={customerId} />
    </Suspense>
  );
}
