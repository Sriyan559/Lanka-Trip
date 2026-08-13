import { ModuleDetailWorkspace } from "@/components/admin/ecosystem-modules/detail/ModuleDetailWorkspace";

export default async function ModuleDetailRoute({
  params,
}: {
  params: Promise<{ moduleKey: string }>;
}) {
  const { moduleKey } = await params;
  return <ModuleDetailWorkspace moduleKey={moduleKey} />;
}
