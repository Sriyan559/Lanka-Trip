import { LiveSectorPackDetail } from "@/components/admin/ecosystem-modules/sector-packs/LiveSectorPackWorkspace";
import "../../ecosystem.css";

export const metadata = {
  title: "Beauty & Wellness | SL Beauty Enterprise Admin",
  description:
    "Sector pack detail and capability configuration for beauty, retail, professional services, and customer experience.",
};

export default function SectorPackDetailsPage({ params }: { params: { packKey: string } }) {
  return <LiveSectorPackDetail slug={params.packKey} />;
}
