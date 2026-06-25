'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import useCategories from '@/hooks/useCategories';

export default function CategorySidebar() {
  const { categories, loading, error, retry } = useCategories();

  return (
    <aside className="hidden lg:block w-52 flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 py-2 self-start">
      <div className="px-3 py-2 border-b border-gray-100 mb-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">All Categories</span>
      </div>
      <nav className="space-y-0.5 px-1">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800 group transition-colors"
          >
            <span className="flex-1 text-[13px] leading-tight line-clamp-1">{cat.label}</span>
            <ChevronRight size={12} className="text-gray-300 group-hover:text-primary-600" />
          </Link>
        ))}
        {loading && <p className="px-2 py-2 text-xs text-gray-400">Loading categories…</p>}
        {error && (
          <button type="button" onClick={retry} className="px-2 py-2 text-xs text-red-600 hover:underline">
            Retry categories
          </button>
        )}
      </nav>
      <div className="px-3 pt-2 mt-1 border-t border-gray-100">
        <Link href="/categories" className="text-xs text-primary-700 font-medium hover:underline">
          More Categories →
        </Link>
      </div>
    </aside>
  );
}
