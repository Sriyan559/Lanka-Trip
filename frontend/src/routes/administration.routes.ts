/**
 * Central Administration Module Route Configuration (AD01 - AD14)
 */

export interface AdministrationRouteMetadata {
  id: string;
  name: string;
  route: string;
  module: string;
  domain: string;
  primaryDeveloperResponsibility: string;
  entryFrom: string;
  handoffRoutes: string[];
}

export const ADMINISTRATION_ROUTES: Record<string, AdministrationRouteMetadata> = {
  AD01: {
    id: 'AD01',
    name: 'Administration Command Center',
    route: '/admin/administration',
    module: 'Administration',
    domain: 'Core Command',
    primaryDeveloperResponsibility: 'Administration / Command Center',
    entryFrom: 'All Administration screens',
    handoffRoutes: ['/admin/administration/users', '/admin/administration/roles-permissions', '/admin/administration/reports-audit'],
  },
  AD02: {
    id: 'AD02',
    name: 'Users, Accounts & Identity Management',
    route: '/admin/administration/users',
    module: 'Administration',
    domain: 'Users & Identity',
    primaryDeveloperResponsibility: 'Administration / Users & Identity / Users, Accounts & Identity Management',
    entryFrom: '/admin/administration',
    handoffRoutes: ['/admin/administration/users/[userRef]', '/admin/administration/roles-permissions', '/admin/administration/reports-audit'],
  },
  AD03: {
    id: 'AD03',
    name: 'User Detail, Access & Activity',
    route: '/admin/administration/users/[userRef]',
    module: 'Administration',
    domain: 'Users & Identity',
    primaryDeveloperResponsibility: 'Administration / Users & Identity / User Detail, Access & Activity',
    entryFrom: '/admin/administration/users',
    handoffRoutes: ['/admin/administration/roles-permissions', '/admin/administration/security-authentication', '/admin/administration/reports-audit'],
  },
  AD04: {
    id: 'AD04',
    name: 'Roles, Permissions & Access Profiles',
    route: '/admin/administration/roles-permissions',
    module: 'Administration',
    domain: 'Access Control',
    primaryDeveloperResponsibility: 'Administration / Access Control / Roles, Permissions & Access Profiles',
    entryFrom: '/admin/administration/users',
    handoffRoutes: ['/admin/administration/users', '/admin/administration/reports-audit'],
  },
  AD05: {
    id: 'AD05',
    name: 'Tenant, Ecosystem & Organizational Structure',
    route: '/admin/administration/tenant-organization',
    module: 'Administration',
    domain: 'Tenant & Org',
    primaryDeveloperResponsibility: 'Administration / Tenant & Org / Tenant, Ecosystem & Organizational Structure',
    entryFrom: '/admin/administration',
    handoffRoutes: ['/admin/administration/business-units-channels', '/admin/administration/reports-audit'],
  },
  AD06: {
    id: 'AD06',
    name: 'Business Units, Channels & Operating Scope',
    route: '/admin/administration/business-units-channels',
    module: 'Administration',
    domain: 'Business Units',
    primaryDeveloperResponsibility: 'Administration / Business Units / Business Units, Channels & Operating Scope',
    entryFrom: '/admin/administration/tenant-organization',
    handoffRoutes: ['/admin/administration/tenant-organization', '/admin/administration/system-configuration'],
  },
  AD07: {
    id: 'AD07',
    name: 'System Configuration & Global Settings',
    route: '/admin/administration/system-configuration',
    module: 'Administration',
    domain: 'Configuration',
    primaryDeveloperResponsibility: 'Administration / Configuration / System Configuration & Global Settings',
    entryFrom: '/admin/administration',
    handoffRoutes: ['/admin/administration/localization-regional', '/admin/administration/reports-audit'],
  },
  AD08: {
    id: 'AD08',
    name: 'Localization, Languages, Currency & Regional Settings',
    route: '/admin/administration/localization-regional',
    module: 'Administration',
    domain: 'Localization',
    primaryDeveloperResponsibility: 'Administration / Localization / Localization, Languages, Currency & Regional Settings',
    entryFrom: '/admin/administration/system-configuration',
    handoffRoutes: ['/admin/administration/system-configuration', '/admin/administration/reports-audit'],
  },
  AD09: {
    id: 'AD09',
    name: 'Communications, Notifications & Template Management',
    route: '/admin/administration/communications',
    module: 'Administration',
    domain: 'Communications',
    primaryDeveloperResponsibility: 'Administration / Communications / Communications, Notifications & Template Management',
    entryFrom: '/admin/administration',
    handoffRoutes: ['/admin/administration/security-authentication', '/admin/administration/reports-audit'],
  },
  AD10: {
    id: 'AD10',
    name: 'Security, Authentication & Session Control',
    route: '/admin/administration/security-authentication',
    module: 'Administration',
    domain: 'Security & Auth',
    primaryDeveloperResponsibility: 'Administration / Security & Auth / Security, Authentication & Session Control',
    entryFrom: '/admin/administration',
    handoffRoutes: ['/admin/administration/users', '/admin/administration/reports-audit'],
  },
  AD11: {
    id: 'AD11',
    name: 'Workflows, Approvals & Administrative Process Control',
    route: '/admin/administration/workflows',
    module: 'Administration',
    domain: 'Workflows',
    primaryDeveloperResponsibility: 'Administration / Workflows / Workflows, Approvals & Administrative Process Control',
    entryFrom: '/admin/administration',
    handoffRoutes: ['/admin/administration/roles-permissions', '/admin/administration/reports-audit'],
  },
  AD12: {
    id: 'AD12',
    name: 'Data Governance, Retention, Privacy & Administrative Data Controls',
    route: '/admin/administration/data-governance',
    module: 'Administration',
    domain: 'Data Governance',
    primaryDeveloperResponsibility: 'Administration / Data Governance / Data Governance, Retention, Privacy & Administrative Data Controls',
    entryFrom: '/admin/administration',
    handoffRoutes: ['/admin/administration/roles-permissions', '/admin/administration/reports-audit'],
  },
  AD13: {
    id: 'AD13',
    name: 'Maintenance, Diagnostics, System Jobs & Operational Administration',
    route: '/admin/administration/maintenance-diagnostics',
    module: 'Administration',
    domain: 'Maintenance',
    primaryDeveloperResponsibility: 'Administration / Maintenance / Maintenance, Diagnostics, System Jobs & Operational Administration',
    entryFrom: '/admin/administration',
    handoffRoutes: ['/admin/administration/workflows', '/admin/administration/reports-audit'],
  },
  AD14: {
    id: 'AD14',
    name: 'Administration Reports, Audit, Export & Change History',
    route: '/admin/administration/reports-audit',
    module: 'Administration',
    domain: 'Audit & Governance',
    primaryDeveloperResponsibility: 'Administration / Audit & Governance / Reports, Audit & Change History',
    entryFrom: '/admin/administration',
    handoffRoutes: ['/admin/administration', '/admin/administration/users'],
  },
};
