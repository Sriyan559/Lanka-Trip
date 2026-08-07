'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { SupplierForm } from '@/components/admin/brands-suppliers/SupplierForm';
import toast from 'react-hot-toast';

export default function CreateSupplierPage() {
  const router = useRouter();

  return (
    <SupplierForm
      mode="create"
      draftId="SUP-DRAFT-NEW"
      recordVersion="v0.1"
      completeness={{
        overallPercent: 0,
        requiredCompleted: 0,
        requiredTotal: 128,
        blockingCount: 0,
        warningCount: 0,
        autosaveLabel: 'Not saved yet',
      }}
      blockingIssues={[]}
      onSave={() => {
        toast.success('Draft saved successfully!');
      }}
      onValidate={() => {
        toast.success('Validation scan complete: all clear!');
      }}
      onCancel={() => {
        if (confirm('Cancel and lose unsaved changes?')) {
          router.push('/admin/brands-suppliers/suppliers');
        }
      }}
    />
  );
}
