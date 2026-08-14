import Link from 'next/link';
import {
  BookOpenCheck,
  BarChart3,
  CircleGauge,
  Headphones,
  LifeBuoy,
  MessageSquareText,
  PackageSearch,
  RotateCcw,
  ShieldAlert,
  SlidersHorizontal,
  Truck,
  UsersRound,
} from 'lucide-react';

import { PageHeader } from '@/components/admin/layout/PageHeader';

const supportWorkspaces = [
  {
    label: 'Cases & Queues',
    description: 'Review, assign, prioritize, and resolve customer support cases.',
    href: '/admin/customer-support/cases',
    icon: LifeBuoy,
  },
  {
    label: 'Conversations',
    description: 'Manage customer conversations across supported service channels.',
    href: '/admin/customer-support/conversations',
    icon: MessageSquareText,
  },
  {
    label: 'Complaints & Escalations',
    description: 'Investigate complaints, escalations, and service recovery actions.',
    href: '/admin/customer-support/complaints',
    icon: ShieldAlert,
  },
  {
    label: 'Order & Delivery Support',
    description: 'Handle order status, fulfilment, shipment, and delivery enquiries.',
    href: '/admin/customer-support/order-delivery',
    icon: Truck,
  },
  {
    label: 'Returns & Refund Support',
    description: 'Coordinate return, refund, compensation, and dispute support.',
    href: '/admin/customer-support/returns-refunds',
    icon: RotateCcw,
  },
  {
    label: 'Product & Supplier Support',
    description: 'Resolve product information, quality, stock, and supplier issues.',
    href: '/admin/customer-support/product-supplier',
    icon: PackageSearch,
  },
  {
    label: 'SLA & Routing',
    description: 'Administer service policies, routing rules, and response targets.',
    href: '/admin/customer-support/sla-routing',
    icon: SlidersHorizontal,
  },
  {
    label: 'Knowledge & Agent Assistance',
    description: 'Find governed knowledge and assistance resources for support agents.',
    href: '/admin/customer-support/knowledge',
    icon: BookOpenCheck,
  },
  {
    label: 'Teams & Performance',
    description: 'Review support teams, workforce capacity, and agent performance.',
    href: '/admin/customer-support/teams-performance',
    icon: UsersRound,
  },
  {
    label: 'Satisfaction & QA',
    description: 'Monitor customer satisfaction and service quality evaluation.',
    href: '/admin/customer-support/satisfaction-qa',
    icon: Headphones,
  },
  {
    label: 'Reports / Audit',
    description: 'Access support reporting, governance records, and audit history.',
    href: '/admin/customer-support/reports-audit',
    icon: BarChart3,
  },
] as const;

export default function CustomerSupportCommandCenterPage() {
  return (
    <div className="mx-auto flex max-w-[1920px] flex-col gap-6 pb-10">
      <PageHeader
        crumbs={['Customer Support', 'Command Center']}
        title="Customer Support Command Center"
        description="Open the operational workspace needed to manage customer service, resolution, quality, and governance."
      />

      <section
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        aria-label="Customer Support workspaces"
      >
        {supportWorkspaces.map((workspace) => {
          const Icon = workspace.icon;

          return (
            <Link
              key={workspace.href}
              href={workspace.href}
              className="group flex min-h-32 gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-primary-200 hover:shadow-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-900">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2 font-semibold text-slate-900">
                  {workspace.label}
                  <CircleGauge
                    size={14}
                    className="opacity-0 transition group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-2 block text-sm leading-5 text-slate-600">
                  {workspace.description}
                </span>
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
