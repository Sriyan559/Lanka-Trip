"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const rawPathname = usePathname();
  const pathname = rawPathname ?? "";

  const isMarketplaceWorkspace =
    pathname === "/admin/marketplace" ||
    pathname.startsWith("/admin/marketplace/returns") ||
    pathname.startsWith("/admin/marketplace/listings") ||
    pathname.startsWith("/admin/marketplace/sellers") ||
    pathname.startsWith("/admin/marketplace/promotions") ||
    pathname.startsWith("/admin/marketplace/policy-violations") ||
    pathname.startsWith("/admin/marketplace/commissions") ||
    pathname.startsWith("/admin/marketplace/orders") ||
    pathname.startsWith("/admin/marketplace/settings") ||
    pathname.startsWith("/admin/marketplace/channels");

  return (
    <div className="shell-rich">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="shell-main">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className={`page${isMarketplaceWorkspace ? " marketplace-returns-page" : ""}`}>{children}</main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
