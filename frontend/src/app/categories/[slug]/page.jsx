import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryContent from './CategoryContent';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export async function generateMetadata({ params }) {
  return { title: `${params.slug.replaceAll('-', ' ')} — Sri Lankan Exports` };
}

export default function CategoryPage({ params }) {
  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        <Suspense fallback={<LoadingSpinner />}>
          <CategoryContent slug={params.slug} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
