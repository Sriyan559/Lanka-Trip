import {QueuePage} from "@/components/admin/common/QueuePage";
import {AuthorizationQueueSummary} from "@/components/admin/verification/AuthorizationQueueSummary";
import {authorizations} from "@/mocks/admin/fixtures";
import {adminRoute} from "@/lib/admin";

export default function Page() {
  return (
    <>
      <AuthorizationQueueSummary />
      <QueuePage
        title="Brand Authorization Review Queue"
        description="Validate supplier rights by brand, territory and channel."
        crumbs={["Admin", "Verification", "Brand Authorizations"]}
        rows={authorizations}
        columns={[
          { header: "Reference", cell: (r) => r.publicReference },
          { header: "Brand", cell: (r) => r.brand },
          { header: "Supplier", cell: (r) => r.supplier },
          { header: "Territory", cell: (r) => r.territory },
          { header: "Type", cell: (r) => r.type },
          { header: "Expiry", cell: (r) => r.expiry },
          { header: "Conflict", cell: (r) => r.conflictStatus },
          { header: "Status", cell: (r) => r.status },
        ]}
        actionLabel="Open Case"
        href={(r) => adminRoute.authorization(r.id)}
      />
    </>
  );
}
