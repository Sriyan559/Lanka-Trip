import "../admin-integrated.css";
import "../authorization-detail.css";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminRouteGuard } from "@/components/admin/layout/AdminRouteGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminRouteGuard>
      <AdminShell>{children}</AdminShell>
    </AdminRouteGuard>
  );
}
