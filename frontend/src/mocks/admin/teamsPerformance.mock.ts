import {
  SupportTeamItem,
  AgentTierSummary,
  AgentSkillItem,
  ShiftCoverageItem,
  WorkforceForecastItem,
  QueueForecastItem,
  WorkforceAlertItem,
  AssignmentHistoryItem,
} from '@/types/teamsPerformance';

export const mockSupportTeams: SupportTeamItem[] = [
  { id: '1', name: 'Customer Operations', agents: 128, available: 34, busy: 70, atCapacity: 18, overloaded: 6, utilisation: 81, slaPercent: 92, csat: 96, avgResponseMinutes: 18, avgResolutionHours: 5.2, risk: 'Low' },
  { id: '2', name: 'Order & Delivery', agents: 72, available: 19, busy: 35, atCapacity: 11, overloaded: 7, utilisation: 84, slaPercent: 91, csat: 94, avgResponseMinutes: 22, avgResolutionHours: 5.8, risk: 'High' },
  { id: '3', name: 'Returns & Refunds', agents: 45, available: 12, busy: 20, atCapacity: 9, overloaded: 4, utilisation: 86, slaPercent: 90, csat: 93, avgResponseMinutes: 25, avgResolutionHours: 6.1, risk: 'High' },
  { id: '4', name: 'Product & Supplier', agents: 54, available: 14, busy: 28, atCapacity: 8, overloaded: 4, utilisation: 78, slaPercent: 95, csat: 92, avgResponseMinutes: 16, avgResolutionHours: 5.0, risk: 'Medium' },
  { id: '5', name: 'VIP Support', agents: 31, available: 8, busy: 15, atCapacity: 5, overloaded: 3, utilisation: 76, slaPercent: 98, csat: 97, avgResponseMinutes: 12, avgResolutionHours: 4.2, risk: 'Medium' },
  { id: '6', name: 'Technical Support', agents: 27, available: 6, busy: 15, atCapacity: 5, overloaded: 1, utilisation: 82, slaPercent: 88, csat: 90, avgResponseMinutes: 24, avgResolutionHours: 6.8, risk: 'Low' },
  { id: '7', name: 'Chat & Messaging', agents: 21, available: 7, busy: 9, atCapacity: 3, overloaded: 2, utilisation: 72, slaPercent: 88, csat: 95, avgResponseMinutes: 16, avgResolutionHours: 4.5, risk: 'Low' },
  { id: '8', name: 'Social & Community', agents: 12, available: 4, busy: 6, atCapacity: 2, overloaded: 0, utilisation: 70, slaPercent: 85, csat: 88, avgResponseMinutes: 36, avgResolutionHours: 7.2, risk: 'Low' },
];

export const mockAgentTiers: AgentTierSummary[] = [
  { tier: 'All', agents: 128, activeCases: 1286, atCapacity: 18, overloaded: 6, utilisation: 81, slaPercent: 92, csat: 96, avgResponseMinutes: 18, avgCasesPerAgent: 20.9, fcrPercent: 72, qaScore: 96, slaCompliance: 92, gslScore: 92 },
  { tier: 'Senior Agents', agents: 44, activeCases: 512, atCapacity: 8, overloaded: 2, utilisation: 78, slaPercent: 95, csat: 98, avgResponseMinutes: 14, avgCasesPerAgent: 16.0, fcrPercent: 74, qaScore: 98, slaCompliance: 95, gslScore: 96 },
  { tier: 'Experienced Agents', agents: 52, activeCases: 512, atCapacity: 7, overloaded: 2, utilisation: 82, slaPercent: 92, csat: 96, avgResponseMinutes: 18, avgCasesPerAgent: 20.3, fcrPercent: 71, qaScore: 96, slaCompliance: 92, gslScore: 91 },
  { tier: 'Mid-Level Agents', agents: 24, activeCases: 178, atCapacity: 2, overloaded: 1, utilisation: 83, slaPercent: 91, csat: 94, avgResponseMinutes: 20, avgCasesPerAgent: 21.3, fcrPercent: 69, qaScore: 94, slaCompliance: 91, gslScore: 88 },
  { tier: 'New Agents', agents: 8, activeCases: 84, atCapacity: 1, overloaded: 1, utilisation: 72, slaPercent: 87, csat: 92, avgResponseMinutes: 23, avgCasesPerAgent: 21.0, fcrPercent: 61, qaScore: 90, slaCompliance: 86, gslScore: 86 },
];

export const mockAgentSkills: AgentSkillItem[] = [
  { skill: 'Order Tracking', level: 'Expert', proficiency: 'Expert', demand: 'High', staffed: 'Good', gap: '+1.2' },
  { skill: 'Returns & Refunds', level: 'Expert', proficiency: 'Advanced', demand: 'High', staffed: 'Low', gap: '+0.8' },
  { skill: 'Product Ingredients', level: 'Advanced', proficiency: 'Advanced', demand: 'Medium', staffed: 'Good', gap: '+1.5' },
  { skill: 'Billing & Payments', level: 'Advanced', proficiency: 'Intermediate', demand: 'High', staffed: 'Good', gap: '+0.1' },
  { skill: 'SLA & Policy', level: 'Advanced', proficiency: 'Advanced', demand: 'High', staffed: 'Good', gap: '+0.2' },
  { skill: 'Technical Issues', level: 'Intermediate', proficiency: 'Intermediate', demand: 'Medium', staffed: 'Good', gap: '+1.0' },
  { skill: 'VIP Support', level: 'Expert', proficiency: 'Expert', demand: 'High', staffed: 'Low', gap: '-0.1' },
  { skill: 'Chat & Messaging', level: 'Advanced', proficiency: 'Intermediate', demand: 'High', staffed: 'Good', gap: '+1.4' },
  { skill: 'Cross-sell / Upsell', level: 'Intermediate', proficiency: 'Intermediate', demand: 'Low', staffed: 'Good', gap: '+0.3' },
];

export const mockShifts: ShiftCoverageItem[] = [
  { shift: 'Morning', timeWindow: '7am – 3pm', required: 44, scheduled: 42, coveragePercent: 95, status: 'Good' },
  { shift: 'Afternoon', timeWindow: '3pm – 11pm', required: 45, scheduled: 44, coveragePercent: 98, status: 'Good' },
  { shift: 'Night', timeWindow: '11pm – 7am', required: 38, scheduled: 38, coveragePercent: 99, status: 'Good' },
];

export const mockWorkforceForecast: WorkforceForecastItem[] = [
  { date: 'Mon 5/19', day: 'Mon', required: 1423, scheduled: 1390, gap: -33, peakVolume: 1520, peakHours: '10am–1pm' },
  { date: 'Tue 5/20', day: 'Tue', required: 1490, scheduled: 1470, gap: -20, peakVolume: 1560, peakHours: '11am–2pm' },
  { date: 'Wed 5/21', day: 'Wed', required: 1580, scheduled: 1560, gap: -20, peakVolume: 1640, peakHours: '10am–1pm' },
  { date: 'Thu 5/22', day: 'Thu', required: 1620, scheduled: 1600, gap: -20, peakVolume: 1680, peakHours: '12pm–3pm' },
  { date: 'Fri 5/23', day: 'Fri', required: 1550, scheduled: 1540, gap: -10, peakVolume: 1548, peakHours: '11am–2pm' },
  { date: 'Sat 5/24', day: 'Sat', required: 1380, scheduled: 1370, gap: -10, peakVolume: 1420, peakHours: '10am–1pm' },
  { date: 'Sun 5/25', day: 'Sun', required: 1280, scheduled: 1270, gap: -10, peakVolume: 1340, peakHours: '10am–1pm' },
];

export const mockQueueForecast: QueueForecastItem[] = [
  { queue: 'Order & Delivery', cases: 520, avgPerDay: 74, required: 100, scheduled: 82, gap: -18 },
  { queue: 'Returns & Refunds', cases: 340, avgPerDay: 49, required: 60, scheduled: 52, gap: -8 },
  { queue: 'Product Support', cases: 280, avgPerDay: 40, required: 50, scheduled: 42, gap: -8 },
  { queue: 'Billing & Payments', cases: 180, avgPerDay: 26, required: 30, scheduled: 23, gap: -7 },
  { queue: 'Technical Support', cases: 120, avgPerDay: 17, required: 20, scheduled: 18, gap: -2 },
  { queue: 'VIP Support', cases: 80, avgPerDay: 11, required: 10, scheduled: 9, gap: -1 },
];

export const mockWorkforceAlerts: WorkforceAlertItem[] = [
  { type: 'Overloaded Team', description: 'Customer Operations above 80%', severity: 'High', team: 'Customer Ops', agentsCount: 18, since: '25m' },
  { type: 'SLA At Risk', description: 'Order & Delivery SLA falling', severity: 'High', team: 'Order & Delivery', agentsCount: 7, since: '18m' },
  { type: 'Schedule Gap', description: 'Night Shift coverage gap', severity: 'Medium', team: 'Returns & Refunds', agentsCount: 6, since: '1h' },
  { type: 'High Escalations', description: 'Returns & Refunds escalations', severity: 'Medium', team: 'Returns & Refunds', agentsCount: 5, since: '35m' },
  { type: 'QA Below Target', description: 'Policy adherence below target', severity: 'Low', team: 'Product & Supplier', agentsCount: 4, since: '2h' },
  { type: 'New Agent Support', description: 'New agents need coaching', severity: 'Medium', team: 'New Agents', agentsCount: 2, since: '3h' },
];

export const mockAssignmentHistory: AssignmentHistoryItem[] = [
  { agentName: "John D'Souza", fromTeam: 'Agent', toTeam: 'Order & Delivery', reason: 'Customer Operations', date: 'May 18, 10:00 AM', impactPositive: true },
  { agentName: 'Priya Nair', fromTeam: 'Agent', toTeam: 'Returns & Refunds', reason: 'Customer Operations', date: 'May 18, 09:30 AM', impactPositive: true },
  { agentName: 'Rohit Sharma', fromTeam: 'Agent', toTeam: 'Product Support', reason: 'Technical Support', date: 'May 18, 08:45 AM', impactPositive: true },
  { agentName: 'Sara Khan', fromTeam: 'Agent', toTeam: 'Technical Support', reason: 'VIP Support', date: 'May 17, 07:20 PM', impactPositive: true },
  { agentName: 'Daniel Lee', fromTeam: 'Agent', toTeam: 'Chat & Messaging', reason: 'Customer Operations', date: 'May 17, 06:10 PM', impactPositive: true },
];
