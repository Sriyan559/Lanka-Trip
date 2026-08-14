import React from 'react';
import {render,screen,waitFor} from '@testing-library/react';
import {describe,expect,it,vi} from 'vitest';
import {LiveHealthAdoptionWorkspace,LiveReleaseWorkspace} from '@/components/admin/ecosystem-modules/LiveReleaseHealthWorkspace';

vi.mock('@/services/api/ecosystemOperations',()=>({
 releasesApi:{
  dashboard:vi.fn(async()=>({dashboard:{context:{ecosystem:'Ecosystem Modules',region:null,timezone:'UTC',registryStatus:'database_connected',lastUpdated:'2026-08-14T00:00:00Z'},summary:{registeredVersions:0,releaseCandidates:0,scheduled:0,inProgress:0,blocked:0,released:0,rolledBack:0,pendingApprovals:0,environmentDrift:0},health:{score:null,status:'not_evaluated',reason:'No approved numeric release-health formula is configured.'},environmentMatrix:[],environmentDrift:[],environments:[],calendar:[],readiness:[],governance:[],promotionQueue:[],migration:{status:'not_configured',message:'Migration tracking not configured.'},activity:[],recommendation:{action:null,releaseId:null,reason:'No immediate release action is required.'},permissions:{canCreate:true,canExport:true}}})),
  list:vi.fn(async()=>({releases:{data:[],current_page:1,last_page:1,per_page:20,total:0}})),references:vi.fn(async()=>({references:{modules:[],environments:['development','production']}})),export:vi.fn(),create:vi.fn(),transition:vi.fn(),detail:vi.fn(),
 },
 healthAdoptionApi:{
  dashboard:vi.fn(async()=>({dashboard:{context:{monitoringStatus:'telemetry_not_configured',telemetrySource:'ecosystem_module_health_checks',usageSource:'ecosystem_module_usage_daily',lastEvaluated:null},summary:{registered:0,operational:0,degraded:0,critical:0,unknown:0,monitored:0,availability:null,errorRate:null,latency:null,throughput:null,healthScore:null,adoptionRate:null,eligibleTenants:0,activeTenants:0,openIncidents:0},healthStatus:'not_evaluated',operationalSummary:{operational:0,degraded:0,critical:0,unknown:0,openIncidents:0},adoptionSummary:{high:0,healthy:0,low:0,dormant:0,notEvaluated:0},environmentHealth:[],incidents:[],activity:[],permissions:{canView:true,canExport:true},generatedAt:'2026-08-14T00:00:00Z'}})),
  modules:vi.fn(async()=>({modules:{data:[],current_page:1,last_page:1,per_page:20,total:0}})),export:vi.fn(),trends:vi.fn(),
 },
}));

describe('live ecosystem release and health pages',()=>{
 it('keeps the complete release structure visible for an empty database',async()=>{render(<LiveReleaseWorkspace/>);await waitFor(()=>expect(screen.getByText('No releases found.')).toBeInTheDocument());expect(screen.getByText('Versions, Releases & Environment Management')).toBeInTheDocument();expect(screen.getByText('No release selected.')).toBeInTheDocument();expect(screen.getByText('No environment versions recorded.')).toBeInTheDocument();expect(screen.getByText('Migration tracking not configured.')).toBeInTheDocument();expect(screen.getByText('Not Evaluated')).toBeInTheDocument();});
 it('shows telemetry and adoption as unavailable rather than fabricated zero measurements',async()=>{render(<LiveHealthAdoptionWorkspace/>);await waitFor(()=>expect(screen.getByText('No modules found.')).toBeInTheDocument());expect(screen.getByText('Module Health, Performance & Adoption')).toBeInTheDocument();expect(screen.getAllByText('Telemetry not configured.').length).toBeGreaterThan(0);expect(screen.getByText('No undocumented numeric score is calculated.')).toBeInTheDocument();expect(screen.getByText('Missing telemetry is never classified as dormant.')).toBeInTheDocument();});
});
