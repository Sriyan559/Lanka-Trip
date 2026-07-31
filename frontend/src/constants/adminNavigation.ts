import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  LayoutDashboard,
  LayoutGrid,
  LifeBuoy,
  Megaphone,
  Settings,
  ShieldCheck,
  Store,
  Tags,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

export type AdminNavigationItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  exact?: boolean;
  disabled?: boolean;
  badge?: string;
  children?: Array<{
    id: string;
    label: string;
    href: string;
  }>;
};

export const ADMIN_NAVIGATION: AdminNavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    id: "marketplace",
    label: "Marketplace",
    href: "/admin/marketplace/orders",
    icon: Store,
    children: [
      {
        id: "orders",
        label: "Orders",
        href: "/admin/marketplace/orders",
      },
      {
        id: "returns",
        label: "Returns & Disputes",
        href: "/admin/marketplace/returns",
      },
    ],
  },
  {
    id: "catalogue",
    label: "Catalogue",
    href: "/admin/catalogue/product-approvals",
    icon: BookOpen,
    children: [
      {
        id: "product-approvals",
        label: "Product Approvals",
        href: "/admin/catalogue/product-approvals",
      },
      {
        id: "inventory",
        label: "Inventory & Expiry",
        href: "/admin/catalogue/inventory",
      },
    ],
  },
  {
    id: "brands-suppliers",
    label: "Brands & Suppliers",
    href: "/admin/verification/brand-authorizations",
    icon: Tags,
  },
  {
    id: "verification",
    label: "Verification & Compliance",
    href: "/admin/verification/suppliers",
    icon: ShieldCheck,
    children: [
      {
        id: "supplier-verification",
        label: "Supplier Verification",
        href: "/admin/verification/suppliers",
      },
      {
        id: "brand-authorizations",
        label: "Brand Authorizations",
        href: "/admin/verification/brand-authorizations",
      },
    ],
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
    disabled: true,
    badge: "Coming Soon",
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    disabled: true,
    badge: "Coming Soon",
  },
  {
    id: "finance",
    label: "Finance",
    icon: Wallet,
    disabled: true,
    badge: "Coming Soon",
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: Truck,
    href: "/admin/logistics",
  },
  {
    id: "customer-support",
    label: "Customer Support",
    icon: LifeBuoy,
    disabled: true,
    badge: "Coming Soon",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    disabled: true,
    badge: "Coming Soon",
  },
  {
    id: "ecosystem-modules",
    label: "Ecosystem Modules",
    icon: LayoutGrid,
    disabled: true,
    badge: "Coming Soon",
  },
  {
    id: "administration",
    label: "Administration",
    icon: Settings,
    disabled: true,
    badge: "Coming Soon",
  },
];
