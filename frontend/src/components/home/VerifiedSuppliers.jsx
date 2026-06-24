import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, MapPin } from 'lucide-react';

export default function VerifiedSuppliers({ suppliers = [] }) {
  if (!suppliers.length) return null;

  return (
    <section className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">Verified Suppliers</h2>
        <Link href="/suppliers?verified=1" className="flex items-center gap-1 text-sm text-primary-700 hover:underline font-medium">
          View More <ArrowRight size={13} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {suppliers.slice(0, 6).map((supplier) => (
          <Link
            key={supplier.id}
            href={`/suppliers/${supplier.id}`}
            className="border border-gray-100 rounded-xl p-3 hover:border-primary-200 hover:shadow-sm transition-all"
          >
            <Image
              src={supplier.logo || `https://placehold.co/80x80/f0fdf4/155e2c?text=${encodeURIComponent(supplier.company_name.slice(0, 2))}`}
              alt={supplier.company_name}
              width={64}
              height={64}
              unoptimized
              className="w-14 h-14 rounded-xl object-cover border border-gray-100 mb-3"
            />
            <div className="flex items-start gap-1">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{supplier.company_name}</h3>
              <BadgeCheck size={13} className="text-primary-600 flex-shrink-0 mt-0.5" />
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
              <MapPin size={11} />
              <span className="line-clamp-1">{supplier.location || supplier.country}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
