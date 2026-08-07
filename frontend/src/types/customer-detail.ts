export interface CustomerDetailRecord {
  id: string;
  name: string;
  tagline: string;
  avatarUrl?: string;
  avatarInitials: string;
  customerType: "Individual" | "Business" | "VIP";
  lifecycleSegment: "Active Customer" | "New" | "Repeat" | "Loyalty Member" | "High-Value Customer" | "Dormant" | "Restricted";
  verificationStatus: "Verified" | "Verification Pending" | "Unverified";
  loyaltyTier: "Gold" | "Platinum" | "Silver" | "Bronze" | "Standard";
  riskLevel: "Low" | "Medium" | "High";
  restrictionStatus: "None" | "Restricted";
  preferredChannel: "Mobile App" | "Website" | "B2B Portal" | "Retail";
  region: string;
  owner: string;
  registeredDate: string;
  lastActivity: string;
  lastOrderDate: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  preferredLanguage: string;
  nationalId: string;
  accountSource: string;
  profileCompleteness: number;
  verificationReadiness: number;
  totalOrders: number;
  lifetimeValue: number;
  avgOrderValue: number;
  loyaltyPoints: number;
  returnRate: number;
  openCasesCount: number;
  activeAddressesCount: number;
  consentCoverage: number;
  riskScore: number;
  customerHealthScore: number;
  concurrencyNotice?: {
    updatedBy: string;
    updatedAgo: string;
  };
}

export interface CustomerOrderHistory {
  id: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled" | "Processing";
  channel: string;
}

export interface CustomerReturnHistory {
  id: string;
  orderId: string;
  reason: string;
  status: "Open" | "Completed" | "Pending" | "Rejected";
  amount: number;
  supplier: string;
}

export interface CustomerLoyaltyTransaction {
  date: string;
  type: "Earned" | "Redeemed" | "Expired";
  description: string;
  points: number;
  expiryDate?: string;
}

export interface CustomerSupportInteraction {
  id: string;
  subject: string;
  channel: string;
  status: "Open" | "Pending" | "Resolved" | "Closed";
  updatedAt: string;
}

export interface CustomerActivityLog {
  id: string;
  dateTime: string;
  activity: string;
  channel: string;
  performedBy: string;
  result: "SUCCESS" | "FAILED" | "WARNING";
}

export interface CustomerDetailFullData {
  profile: CustomerDetailRecord;
  healthScores: { label: string; value: number }[];
  lifecycleMilestones: { label: string; date: string; status: "completed" | "current" | "upcoming" }[];
  addresses: {
    type: "Default Billing & Shipping" | "Home Address" | "Office Address";
    address: string;
  }[];
  segments: string[];
  identity: {
    kycStatus: string;
    documentType: string;
    documentNumber: string;
    verifiedOn: string;
    expiryDate: string;
    verificationSource: string;
    addressMatch: string;
    riskNotes: string;
  };
  purchaseBehaviour: {
    totalOrders: number;
    completed: number;
    cancelled: number;
    failedPayments: number;
    avgOrderValue: number;
    repeatPurchaseRate: number;
    favouriteCategory: string;
    preferredBrand: string;
    recentOrders: CustomerOrderHistory[];
  };
  returnsDisputes: {
    openReturns: number;
    completedReturns: number;
    refundsPending: number;
    refundsCompletedAmount: number;
    activeDisputes: number;
    avgResolutionTimeDays: number;
    recentReturns: CustomerReturnHistory[];
  };
  loyalty: {
    tier: string;
    pointsBalance: number;
    pointsEarnedYtd: number;
    pointsRedeemedYtd: number;
    nextTierPoints: number;
    rewardLiabilityLkr: number;
    pointsExpiring90Days: number;
    recentTransactions: CustomerLoyaltyTransaction[];
  };
  consentPrivacy: {
    emailConsent: boolean;
    smsConsent: boolean;
    pushConsent: boolean;
    personalisationConsent: boolean;
    dataProcessingBasis: string;
    consentSource: string;
    consentDate: string;
    privacyRequests: {
      access: number;
      correction: number;
      deletion: number;
      portability: number;
    };
  };
  riskRestrictions: {
    overallRiskScore: number;
    riskCategory: string;
    chargebackRisk: string;
    excessiveReturnRisk: string;
    duplicateAccountRisk: string;
    activeRestrictions: string;
    riskOwner: string;
  };
  supportComms: {
    openCases: number;
    resolvedCases30d: number;
    avgResponseTimeHours: number;
    csat30d: number;
    recentInteractions: CustomerSupportInteraction[];
  };
  relatedRecords: {
    householdAccount: string;
    loyaltyCard: string;
    marketplaceProfile: string;
    supportCaseSummary: string;
    lastOrder: string;
  };
  recordQuality: {
    duplicateRisk: string;
    missingFields: number;
    dataFreshness: string;
    dataAccuracyScore: number;
    auditCompleteness: number;
  };
  recentActivities: CustomerActivityLog[];
  lifecycleNodes: {
    id: string;
    label: string;
    status: "Completed" | "Current" | "Warning" | "Critical" | "Upcoming";
    stepNumber: number;
    date?: string;
  }[];
}
