import {render,screen,waitFor} from '@testing-library/react';
import {describe,expect,it,vi} from 'vitest';

vi.mock('@/services/api/ecosystemControls',()=>({
  ecosystemIntegrationsApi:{dashboard:vi.fn().mockResolvedValue({data:{summary:{registered:0},health:{score:null,status:'not_evaluated',reason:'No formula'},providers:[],governance:{},telemetry:{available:false,message:'Integration telemetry unavailable.'},activity:[],permissions:{canManage:true},generatedAt:'2026-08-14T00:00:00Z'}}),list:vi.fn().mockResolvedValue({data:{data:[],total:0}}),references:vi.fn().mockResolvedValue({data:{modules:[],providers:[]}}),create:vi.fn(),update:vi.fn(),export:vi.fn()},
  ecosystemGovernanceApi:{dashboard:vi.fn().mockResolvedValue({data:{summary:{humanIdentities:0},health:{score:null,status:'not_evaluated',reason:'No formula'},identities:{data:[]},policies:[],roles:[],effectivePermissions:[],requests:[],temporaryAccess:[],certifications:[],sodConflicts:[],permissions:{canManage:true}}}),createPolicy:vi.fn(),createRequest:vi.fn(),decide:vi.fn(),export:vi.fn()},
  ecosystemAuditApi:{dashboard:vi.fn().mockResolvedValue({data:{summary:{auditRecords:0},health:{score:null,status:'not_evaluated',reason:'Integrity verification not configured'},records:{data:[],total:0},reports:[],exports:[],schedules:[],evidence:[],exceptions:[]}}),generateReport:vi.fn(),createExport:vi.fn(),schedule:vi.fn(),evidence:vi.fn(),export:vi.fn()},
}));

import {LiveGovernanceWorkspace,LiveIntegrationWorkspace,LiveReportsAuditWorkspace} from './LiveControlCenterWorkspace';

describe('live ecosystem control center workspaces',()=>{
  it('renders authoritative zero-data states without mock scores or rows',async()=>{
    const integration=render(<LiveIntegrationWorkspace/>);
    expect(await screen.findByText('Integrations, Services & External Providers')).toBeInTheDocument();
    await waitFor(()=>expect(screen.getByText('No integrations configured.')).toBeInTheDocument());
    expect(screen.getByText('Monitoring unavailable')).toBeInTheDocument();
    integration.unmount();

    const governance=render(<LiveGovernanceWorkspace/>);
    expect(await screen.findByText('Governance, Access, Security & Policy Control')).toBeInTheDocument();
    await waitFor(()=>expect(screen.getByText('No effective permissions.')).toBeInTheDocument());
    governance.unmount();

    render(<LiveReportsAuditWorkspace/>);
    expect(await screen.findByText('Reports, Audit, Export & Ecosystem Change History')).toBeInTheDocument();
    await waitFor(()=>expect(screen.getByText('No audit records match the current filters.')).toBeInTheDocument());
    expect(screen.queryByText('96')).not.toBeInTheDocument();
  });
});
