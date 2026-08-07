"use client";

import React, { Suspense } from "react";
import { CustomerFormDashboard } from "@/components/admin/customers/form/CustomerFormDashboard";

export default function CustomerCreatePage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm font-semibold">Loading Customer Create Form...</div>}>
      <CustomerFormDashboard mode="create" />
    </Suspense>
  );
}
