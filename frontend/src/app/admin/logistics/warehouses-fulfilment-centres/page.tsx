import { redirect } from "next/navigation";

export default function LegacyWarehousesRedirectPage() {
  redirect("/admin/logistics/warehouses");
}
