# Three-Portal Architecture - Benson Estimating Platform

## Table of Contents

1. [Portal Overview](#portal-overview)
2. [Client Portal](#client-portal)
3. [Subcontractor Portal](#subcontractor-portal)
4. [Staff Portal](#staff-portal)
5. [Security & Access Control](#security--access-control)
6. [Technical Implementation](#technical-implementation)
7. [Integration Points](#integration-points)
8. [Development Roadmap](#development-roadmap)

## Portal Overview

The Benson Estimating Platform requires three completely separate portals with distinct user experiences, security boundaries, and feature sets:

### Portal Separation Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    Public Website                           │
│            (Marketing, Resources, Tools)                    │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
┌───────▼──────┐ ┌────▼─────┐ ┌────▼─────────┐
│ Client Portal│ │Subcontrac│ │ Staff Portal │
│              │ │tor Portal│ │              │
│ Project View │ │Field Work│ │AI Estimator  │
│ Communication│ │Invoicing │ │Full Admin    │
│ Progress     │ │Documents │ │Analytics     │
└──────────────┘ └──────────┘ └──────────────┘
```

### User Journey Separation

- **Clients**: `/client-portal/*` - Homeowners/property managers viewing their projects
- **Subcontractors**: `/sub-portal/*` - Field workers managing tasks and invoicing
- **Staff**: `/staff-portal/*` - Benson employees with full system access

## Client Portal

**Target Users**: Property owners, property managers, insurance adjusters
**Primary Use Cases**: Project visibility, communication, approvals

### Client Portal Features

#### 1. Project Dashboard

```typescript
interface ClientDashboard {
  activeProjects: ClientProject[];
  recentUpdates: ProjectUpdate[];
  pendingApprovals: Approval[];
  insuranceClaims: InsuranceClaim[];
  totalInvestment: ProjectFinancials;
}

interface ClientProject {
  id: string;
  name: string;
  address: string;
  type: "Insurance Claim" | "Remodel" | "Maintenance" | "Inspection Repairs";
  status: "Estimate" | "Approved" | "In Progress" | "Complete";
  startDate: Date;
  estimatedCompletion: Date;
  progress: number; // 0-100%
  lastUpdate: Date;
  primaryContact: Contact;
  insuranceInfo?: InsuranceDetails;
}

interface InsuranceClaim {
  claimNumber: string;
  carrier: string;
  adjuster: Contact;
  deductible: number;
  coverageAmount: number;
  status: "Submitted" | "Under Review" | "Approved" | "Disputed" | "Closed";
  requiredDocuments: InsuranceDocument[];
}
```

**Features**:

- **Project Overview Cards**: Visual project status with progress bars by type
- **Insurance Claim Tracking**: Claim status, adjuster info, coverage details
- **Timeline View**: 2-4 week project timeline with milestone tracking
- **Financial Summary**: Insurance coverage, deductible, out-of-pocket costs
- **Photo Gallery**: Before/during/after photos with insurance submission status
- **Legal Documentation**: Insurance-required documents and compliance items

#### 2. Communication Center

```typescript
interface ClientCommunication {
  projectMessages: ConversationThread[];
  changeOrders: ChangeOrderThread[];
  submittals: SubmittalApproval[];
  insuranceCorrespondence: InsuranceMessage[];
  contactDirectory: StaffContact[];
}

interface ConversationThread {
  id: string;
  subject: string;
  participants: Contact[];
  messages: Message[];
  attachments: Attachment[];
  priority: "Low" | "Normal" | "High" | "Insurance Required";
  status: "Open" | "Pending Client" | "Pending Insurance" | "Resolved";
  insuranceVisible: boolean; // Must be visible to insurance if true
}

interface ChangeOrderThread {
  id: string;
  originalScope: string;
  proposedChange: string;
  costImpact: number;
  timeImpact: number;
  reason:
    | "Client Request"
    | "Code Requirement"
    | "Hidden Damage"
    | "Material Unavailable";
  status: "Proposed" | "Client Review" | "Approved" | "Rejected";
  digitalSignature?: string;
}
```

**Features**:

- **Change Order Workflow**: Digital change order process with e-signatures
- **Submittal Approvals**: Material selection with visual previews
- **Insurance Documentation**: Correspondence required for claim compliance
- **Progress Photos**: Before/during/after with insurance submission tracking
- **Emergency Contact**: Direct line for urgent issues during work hours

#### 3. Approval Workflow

```typescript
interface ClientApproval {
  id: string;
  type:
    | "Change Order"
    | "Material Selection"
    | "Submittal"
    | "Insurance Documentation";
  description: string;
  costImpact: number;
  timeImpact: number;
  requiredBy: Date;
  status: "Pending" | "Approved" | "Rejected" | "Insurance Review";
  documents: Document[];
  visualMockups?: string[]; // URLs to visual representations
  insuranceRequired: boolean;
}

interface MaterialSelection {
  category: "Flooring" | "Paint" | "Fixtures" | "Cabinets" | "Countertops";
  options: MaterialOption[];
  selectedOption?: string;
  visualMockup?: string;
  insuranceApproved: boolean;
}
```

**Features**:

- **Digital Change Orders**: E-signature with scan-back integration
- **Material Selections**: Visual mockups for finishes, fixtures, colors
- **Submittal Approvals**: Contractor submittals requiring client approval
- **Insurance Compliance**: Approvals that require insurance carrier visibility
- **Visual Mockups**: 3D renderings or photos showing proposed materials

#### 4. Project Documentation

```typescript
interface ClientDocuments {
  contracts: LegalDocument[];
  insuranceDocuments: InsuranceDocument[];
  permits: PermitDocument[];
  warranties: WarrantyDocument[];
  certificates: CertificateDocument[];
  progressPhotos: ProjectPhoto[];
  inspectionReports: InspectionReport[];
  changeOrderHistory: ChangeOrder[];
}

interface InsuranceDocument {
  type:
    | "Scope of Loss"
    | "Estimate"
    | "Adjuster Report"
    | "Coverage Letter"
    | "Settlement";
  document: Document;
  submittedToInsurance: boolean;
  approvedByInsurance: boolean;
  clientMustSee: boolean; // Legal requirement for client visibility
}

interface ProjectPhoto {
  id: string;
  category: "Before" | "During" | "After" | "Damage Documentation";
  room: string;
  timestamp: Date;
  insuranceSubmitted: boolean;
  description: string;
}
```

**Features**:

- **Insurance Documentation**: All docs required by insurance law/regulation
- **Contract Management**: Signed contracts with digital change order tracking
- **Progress Photo Gallery**: Before/during/after organized by room and date
- **Inspection Reports**: Original inspection with repair completion verification
- **Permit & Compliance**: Required permits and contractor licensing certificates
- **Warranty Center**: Equipment warranties and service contact information

### Client Portal Information Architecture

```
Home Dashboard
├── Active Projects
│   ├── Project A Details
│   │   ├── Timeline & Milestones
│   │   ├── Photo Gallery
│   │   ├── Documents
│   │   ├── Messages
│   │   └── Approvals
│   └── Project B Details
├── Messages & Communication
├── Pending Approvals
├── Payment & Billing
└── Profile & Settings
```

## Subcontractor Portal

**Target Users**: Field workers, trade contractors, subcontractor office staff
**Primary Use Cases**: Work management, documentation, invoicing

### Research-Based Feature Blueprint

Based on field research, subcontractors need to complete tasks in 30-90 seconds. The portal must be mobile-first with offline capabilities.

#### 1. Work Queue + Schedule (Core Need #1)

```typescript
interface SubWorkQueue {
  todayTasks: WorkTask[];
  thisWeekTasks: WorkTask[];
  overdueTasks: WorkTask[];
  blockedTasks: WorkTask[];
  upcomingSchedule: ScheduledWork[];
}

interface WorkTask {
  id: string;
  projectName: string;
  address: string;
  room: string;
  taskDescription: string;
  priority: "Low" | "Normal" | "High" | "Emergency";
  status: "Assigned" | "In Progress" | "Waiting on GC" | "Complete" | "Blocked";
  dueDate: Date;
  estimatedHours: number;
  specialInstructions: string;
  contacts: ProjectContact[];
  blockedReason?: string;
}
```

**Features**:

- **"My Work" List**: Today, this week, overdue, blocked with clear status
- **One-Tap Job Details**: Address, access codes, superintendent contact, scope
- **Conflict Alerts**: Push notifications when schedule changes
- **Blocked Task Explanations**: Clear "why blocked" for every stalled item
- **Quick Actions**: Mark started, request materials, report issues

#### 2. Drawings/Docs with Revision Control (Core Need #2)

```typescript
interface SubDocuments {
  currentPlans: DrawingSet;
  specifications: SpecDocument[];
  revisionHistory: RevisionLog[];
  installDetails: InstallationGuide[];
  safetyRequirements: SafetyDoc[];
  materialSpecs: MaterialSpecification[];
  tradeSpecificDocs: TradeDocument[];
}

interface DrawingSet {
  version: string;
  sheets: DrawingSheet[];
  lastUpdated: Date;
  supersededVersions: DrawingSet[];
  markups: PlanMarkup[];
  tradeFilter: "All" | "Plumbing" | "Electrical" | "HVAC" | "Flooring";
}

interface TradeDocument {
  trade: "Plumbing" | "Electrical" | "HVAC" | "Flooring";
  type:
    | "Code Requirements"
    | "Install Guide"
    | "Material Specs"
    | "Safety Protocol";
  document: Document;
  required: boolean;
}
```

**Features**:

- **Trade-Filtered Plans**: Filter drawings by plumbing, electrical, HVAC, flooring
- **Installation Guides**: Step-by-step guides specific to each trade
- **Code Requirements**: Local building codes and compliance requirements
- **Material Specifications**: Exact specs for materials and fixtures
- **Revision Control**: Clear version tracking with superseded warnings
- **Offline Access**: Download complete doc sets for offline field use

#### 3. Contextual Messaging (Core Need #3)

```typescript
interface SubMessaging {
  projectThreads: MessageThread[];
  rfiRequests: RFIRequest[];
  announcements: ProjectAnnouncement[];
  directMessages: DirectMessage[];
}

interface MessageThread {
  id: string;
  context: "Room" | "Plan Sheet" | "Task" | "Safety" | "Material";
  contextId: string;
  attachedPhotos: Photo[];
  participants: Contact[];
  priority: "Normal" | "Urgent";
  status: "Open" | "Resolved";
  lastRead: Record<string, Date>;
}
```

**Features**:

- **Threaded by Context**: Messages tied to specific rooms/tasks/plans
- **Photo Integration**: Attach photos directly to conversations
- **Mentions & Notifications**: @mentions with push notifications
- **Read Receipts**: Know who has seen critical messages
- **Quick Templates**: Common questions and responses

#### 4. Field Proof of Work (Core Need #4)

```typescript
interface ProofOfWork {
  photoCapture: FieldPhoto[];
  videoDocumentation: FieldVideo[];
  completionChecklists: TaskChecklist[];
  timeTracking: WorkTimeLog[];
  qualityControl: QCInspection[];
}

interface FieldPhoto {
  id: string;
  taskId: string;
  room: string;
  category: "Before" | "During" | "Complete" | "Issue" | "Material";
  timestamp: Date;
  gpsLocation: GPSCoord;
  metadata: PhotoMetadata;
  annotations: PhotoAnnotation[];
}
```

**Features**:

- **Smart Camera**: Auto-timestamp, GPS, task/room tagging
- **Completion Checklists**: Step-by-step verification with photos
- **Time Tracking**: Start/stop work with automatic calculations
- **Quality Documentation**: Before/during/after photo sequences
- **Issue Reporting**: Photo + description of problems or changes needed

#### 5. Invoicing + Waivers (Core Need #5)

```typescript
interface SubInvoicing {
  invoiceTemplates: InvoiceTemplate[];
  draftInvoices: Invoice[];
  submittedInvoices: Invoice[];
  waiverRequirements: WaiverDocument[];
  paymentStatus: PaymentTracking[];
  insuranceBondingDocs: InsuranceBondingDoc[];
  w9Forms: W9Document[];
}

interface Invoice {
  id: string;
  projectId: string;
  period: DateRange;
  lineItems: InvoiceLineItem[];
  totalAmount: number;
  status:
    | "Draft"
    | "Submitted"
    | "Under Review"
    | "Approved"
    | "Scheduled for Payment"
    | "Paid";
  submissionMethod: "Portal" | "Email" | "Physical";
  requiredWaivers: WaiverDocument[];
  missingDocuments: string[];
  submittedDate?: Date;
  approvedDate?: Date;
  paidDate?: Date;
  paymentSchedule?: Date; // Target: 7 days from approval
}

interface InsuranceBondingDoc {
  type: "Insurance Certificate" | "Bonding Certificate";
  expirationDate: Date;
  status: "Current" | "Expiring Soon" | "Expired" | "Not Required";
  canUpdateAnytime: boolean;
}

interface PaymentMethod {
  newSubcontractor: {
    requiredDocs: ["W-9", "Insurance Certificate?", "Bonding Certificate?"];
    paymentMethods: ["Check" | "Card Payment"];
    processingTime: "7 days";
  };
  existingSubcontractor: {
    requiredDocs: ["Invoice Only"];
    paymentMethods: ["Check" | "Card Payment" | "ACH"];
    processingTime: "7 days";
  };
}
```

**Features**:

- **Invoice Submission**: Digital portal submission or email/physical backup
- **7-Day Payment Cycle**: Clear expectation and tracking of payment timeline
- **New Sub Onboarding**: Automatic W-9 and insurance/bonding requirement
- **Insurance/Bonding Tracking**: Update anytime, alerts before expiration
- **Payment Method Options**: Check, card, or ACH based on sub preference
- **Document Requirements**: Clear checklist before invoice submission

### Subcontractor Portal Information Architecture

```
Home (My Work Dashboard)
├── Today's Tasks
├── This Week's Schedule
├── Needs Action Items
└── Payment Status

Projects
├── Active Projects
│   ├── Project Details
│   │   ├── Work Queue
│   │   ├── Plans & Docs
│   │   ├── Messages & RFIs
│   │   ├── Photo Documentation
│   │   └── Time & Materials
│   └── Schedule View
└── Completed Projects

Invoicing
├── Create Invoice
├── Draft Invoices
├── Submitted Invoices
├── Payment Status
└── Waiver Management

Profile & Company
├── Crew Management
├── Certifications & Insurance
├── W-9 & Tax Documents
└── Account Settings
```

### Subcontractor UX Requirements

#### "Smoothest/Easiest" UX Patterns (Non-negotiable)

1. **Visibility of Status**: Clear labels (Assigned, Waiting on GC, Approved, Paid)
2. **Real-World Language**: Use "Punch", "RFI", "Install Complete", "Pay App"
3. **Error Prevention**: Guardrails before submission (missing photo, wrong date)
4. **Recognition Over Recall**: Prefilled context, recent projects, saved templates
5. **Fast Recovery**: Undo windows, clear error messages, draft autosave

#### Mobile-First Design Requirements

- **Thumb Navigation**: All primary actions within thumb reach
- **Offline Capability**: Work without internet, sync when connected
- **Fast Loading**: <2 second load times on 3G connection
- **Large Touch Targets**: Minimum 44px touch areas
- **Swipe Actions**: Swipe to complete tasks, mark progress

## Staff Portal

**Target Users**: Benson employees (estimators, project managers, admins)
**Primary Use Cases**: AI estimation, project management, business analytics

### Staff Portal Features

#### 1. AI Estimating Workspace (Crown Jewel)

```typescript
interface AIEstimatingWorkspace {
  projectSetup: ProjectConfiguration;
  documentProcessing: DocumentProcessor;
  aiExtraction: TaskExtractionEngine;
  questioningSystem: DynamicQuestionnaire;
  costCalculation: EstimationEngine;
  estimateReview: EstimateValidator;
}
```

**Features** (Existing - Enhanced):

- **Project Creation**: Full project setup with client information
- **PDF Processing**: Upload and parse inspection reports
- **AI Task Extraction**: OpenAI-powered task identification
- **Dynamic Questioning**: Smart follow-up questions for accuracy
- **Cost Calculation**: Material + labor + markup calculations
- **Estimate Generation**: Professional estimates with citations
- **Version Control**: Track estimate revisions and changes

#### 2. Project Management Dashboard

```typescript
interface ProjectManagement {
  activeProjects: StaffProject[];
  resourceAllocation: ResourceSchedule;
  profitabilityAnalysis: ProjectProfitability;
  hubspotIntegration: CRMIntegration;
  subcontractorManagement: SubManagement;
}

interface StaffProject {
  id: string;
  client: Client;
  type: "Insurance Claim" | "Remodel" | "Maintenance" | "Inspection Repairs";
  status: DetailedProjectStatus;
  profitability: ProfitabilityMetrics;
  timeline: ProjectTimeline; // 2-4 week standard
  resources: ResourceAllocation;
  insuranceInfo?: InsuranceClaimDetails;
  hubspotDealId?: string;
}

interface SubManagement {
  activeSubcontractors: {
    plumbing: Subcontractor[];
    electrical: Subcontractor[];
    hvac: Subcontractor[];
    flooring: Subcontractor[];
  };
  paymentQueue: SubcontractorPayment[];
  insuranceBondingStatus: InsuranceBondingTracker[];
  newSubOnboarding: OnboardingStatus[];
}

interface ProjectProfitability {
  jobCosting: {
    materials: number;
    labor: number;
    subcontractors: number;
    overhead: number;
  };
  profitFlow: {
    estimatedProfit: number;
    actualProfit: number;
    variance: number;
  };
  vendorCosts: VendorCostBreakdown[];
}
```

**Features**:

- **Project Type Management**: Handle insurance claims, remodels, maintenance, inspections
- **HubSpot Integration**: Sync projects with CRM deals and client data
- **Subcontractor Management**: Track 4 main trades with payment status
- **Job Costing Dashboard**: Real-time cost tracking vs estimates
- **Profit Flow Analysis**: Estimated vs actual profit with variance reporting
- **Overhead Tracking**: Track and allocate overhead costs to projects

#### 3. Business Intelligence & Analytics

```typescript
interface BusinessAnalytics {
  estimateAccuracy: AccuracyMetrics;
  aiPerformance: AIMetrics;
  profitabilityAnalysis: DetailedProfitMetrics;
  operationalEfficiency: EfficiencyMetrics;
  complianceTracking: ComplianceMetrics;
}

interface DetailedProfitMetrics {
  profitAndLoss: {
    revenue: number;
    cogs: number; // Cost of goods sold
    grossProfit: number;
    overhead: number;
    netProfit: number;
    margins: MarginAnalysis;
  };
  jobCosting: {
    byProjectType: Record<ProjectType, CostBreakdown>;
    byTrade: Record<Trade, CostBreakdown>;
    estimateAccuracy: number; // % accurate vs actual
  };
  vendorCosts: {
    subcontractorSpend: VendorSpendAnalysis;
    materialCosts: MaterialCostAnalysis;
    paymentTiming: PaymentTimingMetrics;
  };
  cashFlow: {
    accountsReceivable: number;
    accountsPayable: number;
    workInProgress: number;
    projectedCashFlow: CashFlowProjection[];
  };
}

interface ComplianceMetrics {
  contractorLicensing: LicenseStatus;
  insuranceCoverage: InsuranceStatus;
  stateRegulations: RegulationCompliance;
  federalCompliance: FederalComplianceStatus;
}
```

**Features**:

- **Profit & Loss Dashboard**: Revenue, COGS, overhead, net profit tracking
- **Job Costing Analysis**: Cost breakdowns by project type and trade
- **Vendor Cost Management**: Subcontractor spend and material cost analysis
- **Cash Flow Management**: AR/AP tracking with 7-day payment cycles
- **Compliance Monitoring**: State/federal contractor regulation compliance
- **US Bank Integration**: Connect with business banking for financial data

#### 4. System Administration

```typescript
interface SystemAdmin {
  userManagement: UserAdmin;
  organizationSettings: OrgConfig;
  aiConfiguration: AISettings;
  pricingManagement: PricingAdmin;
  securityControls: SecurityAdmin;
}
```

**Features**:

- **User Management**: Create/manage client and subcontractor accounts
- **Permission Management**: Role-based access control
- **AI Model Management**: Configure and tune AI extraction models
- **Pricing Database**: Manage pricing sources and overrides
- **Audit & Compliance**: System audit logs and compliance reporting

### Staff Portal Information Architecture

```
Dashboard
├── AI Estimating Workspace
├── Active Projects Overview
├── Business Metrics
└── Alerts & Notifications

AI Estimator
├── New Estimate
│   ├── Project Setup
│   ├── Document Upload
│   ├── AI Extraction
│   ├── Question Resolution
│   └── Final Review
├── Estimate Library
└── AI Performance Analytics

Project Management
├── Project Pipeline
├── Resource Scheduling
├── Client Communications
├── Profitability Analysis
└── Risk Management

Business Intelligence
├── Accuracy Dashboards
├── Profitability Reports
├── Market Analysis
├── Operational Metrics
└── Custom Reports

Administration
├── User Management
├── System Configuration
├── AI Model Management
├── Pricing Administration
└── Security & Audit
```

## Security & Access Control

### Role-Based Access Control (RBAC)

```typescript
enum UserRole {
  // Client Portal
  CLIENT_OWNER = "client_owner",
  CLIENT_MANAGER = "client_manager",
  CLIENT_VIEWER = "client_viewer",

  // Subcontractor Portal
  SUB_ADMIN = "sub_admin",
  SUB_FOREMAN = "sub_foreman",
  SUB_WORKER = "sub_worker",

  // Staff Portal
  STAFF_ADMIN = "staff_admin",
  STAFF_ESTIMATOR = "staff_estimator",
  STAFF_PM = "staff_pm",
  STAFF_VIEWER = "staff_viewer",
}

interface Permission {
  resource: string;
  actions: ("create" | "read" | "update" | "delete")[];
  conditions?: AccessCondition[];
}
```

### Data Isolation Strategy

```sql
-- Row Level Security (RLS) Policies
CREATE POLICY "clients_own_data" ON projects
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM project_participants
      WHERE project_id = projects.id
      AND role LIKE 'client_%'
    )
  );

CREATE POLICY "subs_assigned_projects" ON tasks
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM task_assignments
      WHERE task_id = tasks.id
    )
  );

CREATE POLICY "staff_org_access" ON organizations
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members
      WHERE organization_id = organizations.id
      AND role LIKE 'staff_%'
    )
  );
```

### Security Requirements by Portal

#### Client Portal Security

- **Authentication**: Multi-factor authentication required
- **Data Access**: Only their own projects and related communications
- **Document Security**: Read-only access to approved documents
- **Communication**: Can only message assigned staff members
- **Audit Trail**: All actions logged with IP and timestamp

#### Subcontractor Portal Security

- **Mobile Security**: Biometric authentication on mobile devices
- **Offline Security**: Encrypted local storage for offline data
- **Data Scope**: Only assigned projects and related tasks
- **Photo Security**: GPS and timestamp verification for field photos
- **Invoice Security**: Digital signatures required for invoice submission

#### Staff Portal Security

- **Admin Access**: Full system access with detailed audit logging
- **AI Security**: Secure API key management for OpenAI integration
- **Data Export**: Controlled data export with approval workflows
- **System Changes**: Change management process for system modifications
- **Compliance**: SOC 2 Type II compliance for enterprise clients

## Technical Implementation

### Portal Routing Strategy

```typescript
// Route structure with strict separation
const portalRoutes = {
  client: {
    basePath: "/client-portal",
    authGuard: "ClientAuthGuard",
    routes: [
      "/dashboard",
      "/projects/:projectId",
      "/messages",
      "/approvals",
      "/documents",
      "/settings",
    ],
  },
  subcontractor: {
    basePath: "/sub-portal",
    authGuard: "SubcontractorAuthGuard",
    routes: [
      "/work-queue",
      "/projects/:projectId",
      "/invoicing",
      "/documents",
      "/profile",
    ],
  },
  staff: {
    basePath: "/staff-portal",
    authGuard: "StaffAuthGuard",
    routes: [
      "/dashboard",
      "/ai-estimator",
      "/project-management",
      "/analytics",
      "/admin",
    ],
  },
};
```

### Shared Components Architecture

```typescript
// Shared UI components with portal-specific theming
interface PortalTheme {
  primary: string;
  secondary: string;
  accent: string;
  layout: "mobile-first" | "desktop-first" | "hybrid";
  navigation: "bottom-tabs" | "sidebar" | "top-nav";
}

const portalThemes: Record<Portal, PortalTheme> = {
  client: {
    primary: "#3C0008", // Benson brand red
    secondary: "#F8F9FA", // Light gray
    accent: "#28A745", // Success green
    layout: "hybrid",
    navigation: "sidebar",
  },
  subcontractor: {
    primary: "#007BFF", // Work-focused blue
    secondary: "#6C757D", // Neutral gray
    accent: "#FFC107", // Alert yellow
    layout: "mobile-first",
    navigation: "bottom-tabs",
  },
  staff: {
    primary: "#6F42C1", // Professional purple
    secondary: "#E9ECEF", // Light background
    accent: "#17A2B8", // Info blue
    layout: "desktop-first",
    navigation: "top-nav",
  },
};
```

### Database Schema Extensions

```sql
-- Portal-specific user profiles
CREATE TABLE client_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  company_name text,
  property_type text,
  communication_preferences jsonb,
  notification_settings jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE subcontractor_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  company_name text NOT NULL,
  trade_specialties text[],
  license_numbers jsonb,
  insurance_info jsonb,
  crew_size integer,
  mobile_device_id text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE staff_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  employee_id text UNIQUE NOT NULL,
  department text,
  role staff_role NOT NULL,
  permissions jsonb,
  ai_access_level integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);
```

## Integration Points

### Cross-Portal Data Flow

```typescript
interface CrossPortalIntegration {
  // Client approves change order → Staff gets notification → Sub gets updated task
  changeOrderFlow: {
    trigger: "client_approval";
    actions: ["notify_staff", "update_project_scope", "assign_sub_tasks"];
  };

  // Sub completes work → Staff reviews → Client gets update
  workCompletionFlow: {
    trigger: "sub_task_complete";
    actions: ["staff_review_required", "client_progress_update"];
  };

  // Staff creates estimate → Client gets approval request
  estimateApprovalFlow: {
    trigger: "estimate_generated";
    actions: ["client_approval_required", "schedule_presentation"];
  };
}
```

### Notification System

```typescript
interface NotificationStrategy {
  clients: {
    channels: ["email", "sms", "portal"];
    frequency: "immediate" | "daily_digest" | "weekly_summary";
    types: ["project_updates", "approval_requests", "payment_due"];
  };

  subcontractors: {
    channels: ["push", "sms", "portal"];
    frequency: "immediate";
    types: ["new_assignments", "schedule_changes", "payment_processed"];
  };

  staff: {
    channels: ["email", "slack", "portal"];
    frequency: "immediate";
    types: ["client_responses", "sub_submissions", "system_alerts"];
  };
}
```

## Development Roadmap

### Phase 1: Foundation (Months 1-2)

**Deliverable**: Full portal launch with core workflows

#### Week 1-2: Portal Architecture Setup

- [ ] Set up routing with strict portal separation
- [ ] Implement role-based authentication guards
- [ ] Create portal-specific themes and layouts
- [ ] Set up database schema extensions
- [ ] Integrate HubSpot CRM connection
- [ ] Set up US Bank business API integration

#### Week 3-4: Client Portal Full Launch

- [ ] Project dashboard with insurance claim integration
- [ ] Digital change order workflow with e-signature
- [ ] Material selection with visual mockups
- [ ] Insurance documentation compliance system
- [ ] Before/during/after photo galleries
- [ ] Mobile-responsive design

#### Week 5-6: Subcontractor Portal Full Launch

- [ ] Mobile-first work queue with trade filtering
- [ ] Invoice submission with W-9/insurance management
- [ ] 7-day payment tracking system
- [ ] Offline photo capture with sync
- [ ] Trade-specific document access
- [ ] iOS app preparation

#### Week 7-8: Staff Portal Full Launch

- [ ] AI Estimator moved to staff portal with enhanced features
- [ ] Job costing and profit/loss dashboards
- [ ] Subcontractor management (plumbing/electrical/HVAC/flooring)
- [ ] State/federal compliance monitoring
- [ ] Business intelligence reporting
- [ ] Complete user management system

### Phase 2: Enhancement & Scale (Months 3-4)

**Deliverable**: Advanced features and integrations

#### Advanced Business Intelligence

- [ ] Detailed profit/loss analysis by project type
- [ ] Cash flow projections and AR/AP management
- [ ] Vendor cost analysis and payment optimization
- [ ] Estimate accuracy tracking and improvement
- [ ] Regulatory compliance dashboard

#### Mobile App Development (iOS First)

- [ ] Native iOS app for subcontractors
- [ ] Offline-first architecture with sync
- [ ] Biometric authentication
- [ ] GPS-enabled photo capture
- [ ] Push notifications for work assignments

#### Advanced Integrations

- [ ] Deep HubSpot CRM integration with deal sync
- [ ] US Bank business account integration
- [ ] QuickBooks integration for accounting
- [ ] Insurance carrier API connections
- [ ] Document signing service integration

### Phase 3: Advanced Features (Months 5-6)

**Deliverable**: Enterprise-grade features and optimizations

#### Advanced Integrations

- [ ] CRM integration (Salesforce/HubSpot)
- [ ] Accounting integration (QuickBooks/Sage)
- [ ] Document management integration
- [ ] Calendar/scheduling integration
- [ ] Payment processing integration

#### Mobile Apps

- [ ] Native mobile app for subcontractors
- [ ] Offline-first architecture
- [ ] Push notification system
- [ ] GPS and photo verification
- [ ] Biometric authentication

#### Business Intelligence

- [ ] Advanced analytics dashboards
- [ ] Predictive modeling for estimates
- [ ] Market intelligence integration
- [ ] Custom reporting engine
- [ ] KPI tracking and alerts

### Phase 4: Scale & Optimize (Months 7-12)

**Deliverable**: Scalable, high-performance platform

#### Performance Optimizations

- [ ] Database query optimization
- [ ] CDN implementation for assets
- [ ] Caching strategy implementation
- [ ] Load balancing and scaling
- [ ] Performance monitoring

#### Enterprise Features

- [ ] Multi-tenant architecture
- [ ] White-label portal options
- [ ] Advanced security controls
- [ ] Compliance reporting (SOC 2, HIPAA)
- [ ] API for third-party integrations

## Success Metrics by Portal

### Client Portal KPIs

- **Project Completion Time**: 2-4 week average project timeline
- **Change Order Approval Time**: <48 hours from digital submission
- **Insurance Claim Processing**: Time from documentation to approval
- **Client Satisfaction**: Net Promoter Score >8 for project completion
- **Communication Response**: <24 hours response to client messages

### Subcontractor Portal KPIs

- **Time to First Action**: <60 seconds after mobile login
- **Invoice Processing**: 7-day payment cycle achievement rate >95%
- **New Sub Onboarding**: Complete W-9 and docs within first invoice
- **Insurance/Bonding Compliance**: 100% current documentation
- **Mobile Completion Rate**: >90% of tasks completed on mobile device
- **Payment Satisfaction**: Subcontractor payment satisfaction >9/10

### Staff Portal KPIs

- **Project Profitability**: Maintain profit margins per project type
- **Job Costing Accuracy**: <5% variance from estimate to actual
- **Regulatory Compliance**: 100% compliance with state/federal regulations
- **Business Growth**: Scale from 1-person to team operation capability
- **Financial Integration**: Real-time P&L and cash flow visibility
- **CRM Integration**: 100% project sync with HubSpot deals

This three-portal architecture ensures appropriate separation of concerns, security, and user experience optimization for each distinct user type while maintaining data integrity and business workflow efficiency.
