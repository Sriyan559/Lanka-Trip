import { Suspense } from 'react';
import OrderCreateContent from './OrderCreateContent';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export const metadata = {
  title: 'Secured Trade Order — EcomLanka',
  description: 'Place a secured trade service order on EcomLanka',
};

export default function OrderCreatePage() {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading order form…" />}>
      <OrderCreateContent />
    </Suspense>
  );
}
