import {Suspense} from "react";
import CancellationManagementView from "@/components/admin/marketplace/orders/cancellations/CancellationManagementView";

export default function CancellationManagementPage(){return <Suspense fallback={<div className="state">Loading cancellations…</div>}><CancellationManagementView/></Suspense>}
