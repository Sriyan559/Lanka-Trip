import Link from 'next/link';
import Image from 'next/image';
import { YOU_MAY_LIKE } from '@/lib/constants';

export default function YouMayLike() {
  return (
    <aside className="hidden xl:block w-44 flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 self-start">
      <div className="px-3 py-2.5 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">You May Like</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {YOU_MAY_LIKE.map((item) => (
          <Link
            key={item.label}
            href={`/search?q=${encodeURIComponent(item.label)}`}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 transition-colors"
          >
            <Image
              src={item.image}
              alt={item.label}
              width={44}
              height={44}
              unoptimized
              className="rounded-lg object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <div className="text-xs font-medium text-gray-800 line-clamp-1">{item.label}</div>
              <div className="text-[11px] text-gray-400">{item.count} Products</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="px-3 py-2 border-t border-gray-100">
        <p className="text-[11px] text-gray-400 mb-1.5">Can&apos;t find what you need?</p>
        <Link
          href="/rfq"
          className="block text-center text-xs py-1.5 border border-accent-500 text-accent-600 rounded-lg hover:bg-accent-50 font-medium transition-colors"
        >
          Post Your Request
        </Link>
      </div>
    </aside>
  );
}
