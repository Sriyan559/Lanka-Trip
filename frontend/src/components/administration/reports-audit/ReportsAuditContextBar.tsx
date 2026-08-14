'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function ReportsAuditContextBar() {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-3 font-medium">
      <Link href="/admin/administration" className="hover:text-[#741d35] transition-colors">
        Administration
      </Link>
      <ChevronRight className="w-3 h-3 text-gray-400" />
      <span className="text-gray-900 font-bold">Reports & Audit</span>
    </div>
  );
}

export default ReportsAuditContextBar;
