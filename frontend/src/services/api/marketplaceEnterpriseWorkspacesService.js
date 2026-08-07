import {enterpriseWorkspaceFixtures} from "@/mocks/marketplaceEnterpriseWorkspaces.mock";

const clone=value=>JSON.parse(JSON.stringify(value));

export async function fetchEnterpriseWorkspace(name,id,signal){
  if(signal?.aborted)throw new DOMException("Aborted","AbortError");
  const data=enterpriseWorkspaceFixtures[name];
  if(!data)throw new Error("WORKSPACE_NOT_FOUND");
  return clone(data);
}

export async function recordEnterprisePreviewAction(workspace,action,recordIds=[],note=""){
  return {id:`local-${workspace}-${Date.now()}`,workspace,action,recordIds,note,source:"local-preview",persisted:false,occurredAt:new Date().toISOString()};
}
