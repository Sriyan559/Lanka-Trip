"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isReturnsWorkspace = pathname === "/admin/marketplace" || pathname === "/admin/marketplace/returns" || pathname.startsWith("/admin/marketplace/returns/");

  return (
    <div className="shell-rich">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="shell-main">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className={`page${isReturnsWorkspace ? " marketplace-returns-page" : ""}`}>{children}</main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
