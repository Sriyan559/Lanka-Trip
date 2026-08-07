'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SupplierForm } from '@/components/admin/brands-suppliers/SupplierForm';
import { suppliersApi, SupplierDetail } from '@/services/api/suppliers';
import toast from 'react-hot-toast';

export default function EditSupplierPage() {
  const { supplierId } = useParams();
  const router = useRouter();
  const [data, setData] = useState<SupplierDetail | null>(null);

  useEffect(() => {
    if (supplierId) {
      suppliersApi.getSupplierById(supplierId as string).then(setData);
    }
  }, [supplierId]);

  if (!data) {
    return (
      <div className="p-8 text-center text-gray-500">Loading draft...</div>
    );
  }

  return (
    <SupplierForm
      mode="edit"
      supplierId={supplierId as string}
      draftId={`SUP-DRAFT-${supplierId}`}
      recordVersion="v1.0"
      initialValues={{
        supplierName: data.name ?? '',
        legalName: data.legalCompany ?? '',
        country: data.country ?? '',
        primaryContact: data.primaryContact?.name ?? '',
        email: data.primaryContact?.email ?? '',
        phone: data.primaryContact?.phone ?? '',
      }}
      completeness={{
        overallPercent: 82,
        requiredCompleted: 96,
        requiredTotal: 128,
        blockingCount: 3,
        warningCount: 6,
        autosaveLabel: 'Saved 2 minutes ago',
      }}
      blockingIssues={[
        { id: 'bi-1', label: 'Insurance certificate expired', severity: 'error' },
        { id: 'bi-2', label: 'Beneficial owner declaration missing', severity: 'error' },
        { id: 'bi-3', label: 'KYC document upload pending', severity: 'error' },
      ]}
      onSave={() => {
        toast.success('Supplier draft saved successfully!');
      }}
      onValidate={() => {
        toast.success('Compliance & validation scan complete: all clear!');
      }}
      onCancel={() => {
        if (confirm('Cancel and discard changes?')) {
          router.push(`/admin/brands-suppliers/suppliers/${supplierId}`);
        }
      }}
    />
  );
}
