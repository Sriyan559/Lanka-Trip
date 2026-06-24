import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryContent from './CategoryContent';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { SRI_LANKA_CATEGORIES } from '@/lib/constants';

export async function generateMetadata({ params }) {
  const cat = SRI_LANKA_CATEGORIES.find((c) => c.slug === params.slug);
  return { title: cat ? `${cat.label} — Sri Lankan Exports` : 'Category' };
}

export default function CategoryPage({ params }) {
  const cat = SRI_LANKA_CATEGORIES.find((c) => c.slug === params.slug);
  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {cat && (
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{cat.icon}</span>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{cat.label}</h1>
              <p className="text-sm text-gray-400">Sri Lankan export products in this category</p>
            </div>
          </div>
        )}
        <Suspense fallback={<LoadingSpinner />}>
          <CategoryContent slug={params.slug} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
