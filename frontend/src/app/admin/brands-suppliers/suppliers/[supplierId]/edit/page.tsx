"use client";

import React from 'react';
import { SupplierOnboardingForm } from '@/components/admin/brands-suppliers/SupplierOnboardingForm';

export default function SupplierEditPage({ params }: { params: { supplierId: string } }) {
  return <SupplierOnboardingForm supplierId={params.supplierId} />;
}
