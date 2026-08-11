import { QueuePage } from "../../../../../../src/components/admin/common/QueuePage";
import { AuthorizationQueueSummary } from "../../../../../../src/components/admin/verification/AuthorizationQueueSummary";
import { authorizations } from "../../../../mocks/admin/fixtures";
import { adminRoute } from "../../../../lib/admin";

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
          { header: "Reference", cell: (r: any) => r.publicReference },
          { header: "Brand", cell: (r: any) => r.brand },
          { header: "Supplier", cell: (r: any) => r.supplier },
          { header: "Territory", cell: (r: any) => r.territory },
          { header: "Type", cell: (r: any) => r.type },
          { header: "Expiry", cell: (r: any) => r.expiry },
          { header: "Conflict", cell: (r: any) => r.conflictStatus },
          { header: "Status", cell: (r: any) => r.status },
        ]}
        actionLabel="Open Case"
        href={(r: any) => adminRoute.authorization(r.id)}
      />
    </>
  );
}
