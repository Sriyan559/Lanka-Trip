"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isMarketplaceWorkspace =
    pathname === "/admin/marketplace" ||
    pathname.startsWith("/admin/marketplace/returns") ||
    pathname.startsWith("/admin/marketplace/listings");

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
