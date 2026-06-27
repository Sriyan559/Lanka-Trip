import { Suspense } from 'react';
import InquiryCreateContent from './InquiryCreateContent';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export const metadata = {
  title: 'Send Inquiry — EcomLanka',
  description: 'Ask a supplier for more details, samples, or a custom quote on EcomLanka',
};

export default function InquiryCreatePage() {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading inquiry form…" />}>
      <InquiryCreateContent />
    </Suspense>
  );
}
