# ReportCreator - Epic Breakdown

**Author:** Chairi  
**Date:** 2025-12-04  
**Project Level:** Medium  
**Target Scale:** Self-hosted educational tool for Arabic educators

---

## Overview

This document provides the complete epic and story breakdown for ReportCreator, decomposing requirements from the PRD into implementable stories with full technical and UX context.

| Metric | Count |
|--------|-------|
| **Total Epics** | 4 |
| **Total Stories** | 18 |
| **FRs Covered** | 12 |
| **MVP Scope** | Epics 1-3 |

---

## Functional Requirements Inventory

| FR ID | Description | Priority | Epic |
|-------|-------------|----------|------|
| **FR1** | Landing page with conversion-focused CTA | MVP | Epic 2 |
| **FR2** | Report type selection (5 types) | MVP | Epic 2 |
| **FR3** | Multi-step wizard form (6 steps) | MVP | Epic 2 |
| **FR4** | Real-time AI content enhancement | MVP | Epic 3 |
| **FR5** | Report preview with inline editing | MVP | Epic 2 |
| **FR6** | PDF export with Arabic RTL support | MVP | Epic 3 |
| **FR7** | Image upload and management | MVP | Epic 2 |
| **FR8** | WhatsApp/Email sharing | v1.1 | Epic 4 |
| **FR9** | User authentication | v1.1 | Epic 4 |
| **FR10** | Report history/dashboard | v1.1 | Epic 4 |
| **FR11** | Template saving | v1.2 | Future |
| **FR12** | Report cloning | v1.2 | Future |

---

## FR Coverage Map

```
Epic 1 (Foundation)     → Project Setup (enables all FRs)
Epic 2 (Report Creation)→ FR1, FR2, FR3, FR5, FR7
Epic 3 (AI & Export)    → FR4, FR6
Epic 4 (User Features)  → FR8, FR9, FR10
```

---

## Epic 1: Foundation & Infrastructure Setup

**Goal:** Establish the technical foundation enabling all subsequent user-facing features.

**User Value:** Developers can begin building features on a solid, deployable foundation.

**PRD Coverage:** Enables all FRs  
**Architecture Sections:** 2-4 (Tech Stack, Directory Structure, Data Models)  
**Dependencies:** None

---

### Story 1.1: Next.js Project Initialization

As a **developer**,  
I want **a properly configured Next.js 14 project with RTL support**,  
So that **I can build Arabic-first UI components**.

**Acceptance Criteria:**

**Given** a fresh development environment  
**When** I run `npx create-next-app@latest`  
**Then** Next.js 14 with App Router is initialized

**And** Tailwind CSS is configured with RTL plugin  
**And** shadcn/ui is installed with Arabic-compatible components  
**And** Cairo and Tajawal fonts are embedded  
**And** `dir="rtl"` is set in root layout

**Technical Notes:**
- Use Architecture section 2 (Frontend Stack)
- Configure `tailwind.config.js` with RTL utilities
- Set up `globals.css` with dark theme variables from UX spec

**Prerequisites:** None

---

### Story 1.2: MongoDB Database Setup

As a **developer**,  
I want **MongoDB schemas and connection utilities**,  
So that **I can persist report data**.

**Acceptance Criteria:**

**Given** MongoDB is running locally or in Docker  
**When** I import the database utilities  
**Then** connection singleton is established (Architecture 4.1)

**And** Report schema matches Architecture section 4  
**And** User schema is defined for future auth  
**And** EnhancedText and UploadedImage types are implemented

**Technical Notes:**
- Follow Architecture section 4 (Data Models)
- Use Mongoose for schema validation
- Implement connection pooling

**Prerequisites:** Story 1.1

---

### Story 1.3: Docker Deployment Configuration

As a **developer**,  
I want **Docker Compose configuration for self-hosted deployment**,  
So that **schools can deploy the application locally**.

**Acceptance Criteria:**

**Given** Docker and Docker Compose are installed  
**When** I run `docker-compose up`  
**Then** Next.js app container starts on port 3000

**And** MongoDB container starts on port 27017  
**And** Nginx reverse proxy handles SSL termination  
**And** Volumes persist uploads and database data

**Technical Notes:**
- Follow Architecture section 9 (Docker Deployment)
- Include Puppeteer dependencies for PDF generation
- Configure environment variables

**Prerequisites:** Stories 1.1, 1.2

---

### Story 1.4: Report Type Configuration System

As a **developer**,  
I want **a dynamic report type configuration system**,  
So that **new report types can be added without code changes**.

**Acceptance Criteria:**

**Given** the config system is set up  
**When** I add a new report type to `report-types.ts`  
**Then** the type appears in selection UI automatically

**And** type-specific fields are dynamically rendered  
**And** validation schemas are auto-generated from config  
**And** 5 report types are pre-configured (Activity, Program, Discipline, Admin, General)

**Technical Notes:**
- Create `config/report-types.ts` with TypeScript schemas
- Follow PRD Report Type Schemas section
- Use Zod for runtime validation

**Prerequisites:** Story 1.1

---

## Epic 2: Core Report Creation Journey

**Goal:** Enable users to create complete reports through a guided multi-step wizard.

**User Value:** Educators can create professional reports by following an intuitive step-by-step process.

**PRD Coverage:** FR1, FR2, FR3, FR5, FR7  
**Architecture Sections:** 3, 5, 6  
**UX Sections:** Screens 1-4  
**Dependencies:** Epic 1

---

### Story 2.1: Landing Page

As a **visitor**,  
I want **a compelling landing page with clear value proposition**,  
So that **I understand the benefit and start creating reports immediately**.

**Acceptance Criteria:**

**Given** I navigate to the application root  
**When** the landing page loads  
**Then** I see Arabic headline "حوّل بيانات فعاليتك إلى تقرير احترافي خلال ثوانٍ"

**And** I see golden CTA button "ابدأ الآن"  
**And** I see 4 feature cards (input, AI, preview, PDF)  
**And** the page follows dark navy gradient theme (UX v2)  
**And** page loads in < 2 seconds

**Technical Notes:**
- Route: `app/(marketing)/page.tsx`
- Use glassmorphism cards from UX spec
- Implement floating gradient orbs animation

**Prerequisites:** Story 1.1

---

### Story 2.2: Report Type Selection

As a **user**,  
I want **to select from available report types**,  
So that **I get a form tailored to my specific needs**.

**Acceptance Criteria:**

**Given** I click "ابدأ الآن" on landing page  
**When** the type selection page loads  
**Then** I see 5 report type cards with icons

**And** MVP types (Activity, Program, General) are enabled  
**And** v1.1 types (Discipline, Admin) show "قريباً" badge  
**And** hovering a card shows green glow effect  
**And** selecting a card navigates to wizard for that type

**Technical Notes:**
- Route: `app/(app)/select/page.tsx`
- Store selection in Zustand wizard store
- Follow UX Screen 2 wireframe

**Prerequisites:** Stories 1.4, 2.1

---

### Story 2.3: Wizard Layout & Navigation

As a **user**,  
I want **a consistent wizard layout with progress tracking**,  
So that **I know where I am and how much remains**.

**Acceptance Criteria:**

**Given** I've selected a report type  
**When** the wizard loads  
**Then** I see step progress bar showing current step

**And** I see step numbers 1-6 with labels  
**And** completed steps show checkmarks  
**And** current step is highlighted  
**And** Previous/Next buttons navigate between steps  
**And** "Save Draft" button persists current state

**Technical Notes:**
- Create `components/wizard/WizardLayout.tsx`
- Use Zustand persist middleware for draft saving
- Follow Architecture section 8 (State Management)

**Prerequisites:** Story 2.2

---

### Story 2.4: Step 1 - Organization Data

As a **user**,  
I want **to enter my school/department information**,  
So that **it appears in the report header**.

**Acceptance Criteria:**

**Given** I'm on wizard step 1  
**When** I enter organization data  
**Then** school name field validates as required

**And** department field validates as required  
**And** logo upload accepts images (PNG, JPG, max 5MB)  
**And** uploaded logo shows preview thumbnail  
**And** data persists when navigating away and back

**Technical Notes:**
- Create `components/wizard/StepOrganization.tsx`
- Use React Hook Form with Zod validation
- Store in wizard Zustand store

**Prerequisites:** Story 2.3

---

### Story 2.5: Step 2 - Activity Details

As a **user**,  
I want **to enter activity/program details**,  
So that **the report documents when, where, and who was involved**.

**Acceptance Criteria:**

**Given** I'm on wizard step 2  
**When** I enter activity details  
**Then** title field is required

**And** date picker shows Arabic calendar  
**And** target audience is multi-select (Students, Teachers, Parents, etc.)  
**And** participants count accepts positive numbers only  
**And** location and duration are optional

**Technical Notes:**
- Create `components/wizard/StepActivity.tsx`
- Use date-fns with Arabic locale
- Implement multi-select with chips UI

**Prerequisites:** Story 2.4

---

### Story 2.6: Steps 3-5 - Content with AI Enhancement Placeholders

As a **user**,  
I want **to enter objectives, results, and recommendations**,  
So that **the report has substantive content**.

**Acceptance Criteria:**

**Given** I'm on steps 3, 4, or 5  
**When** I enter content items  
**Then** I can add multiple text items

**And** each item shows AI enhance button (⚡) - disabled pending Epic 3  
**And** items can be reordered via drag-drop  
**And** items can be deleted  
**And** at least 1 objective is required

**Technical Notes:**
- Create `StepObjectives.tsx`, `StepResults.tsx`, `StepRecommendations.tsx`
- Use @dnd-kit for drag-drop
- AI button connects to Epic 3

**Prerequisites:** Story 2.5

---

### Story 2.7: Step 6 - Media Upload

As a **user**,  
I want **to upload activity photos**,  
So that **the report includes visual documentation**.

**Acceptance Criteria:**

**Given** I'm on wizard step 6  
**When** I upload images  
**Then** up to 6 images are accepted

**And** images show preview thumbnails  
**And** images can be reordered via drag-drop  
**And** images can be removed with X button  
**And** file size limit is 5MB per image

**Technical Notes:**
- Create `components/wizard/StepMedia.tsx`
- POST to `/api/upload` endpoint
- Store URLs in wizard state

**Prerequisites:** Story 2.6

---

### Story 2.8: Report Preview (Read-Only)

As a **user**,  
I want **to preview my report before exporting**,  
So that **I can verify content and layout**.

**Acceptance Criteria:**

**Given** I complete all wizard steps  
**When** I click "معاينة التقرير"  
**Then** I see full report in A4 format

**And** report shows Ministry header (if enabled)  
**And** report shows school name and logo  
**And** all content sections display correctly in RTL  
**And** uploaded images appear in grid  
**And** I can navigate back to edit

**Technical Notes:**
- Route: `app/(app)/preview/[reportId]/page.tsx`
- Create `components/preview/ReportPreview.tsx`
- Match PDF template styling

**Prerequisites:** Story 2.7

---

## Epic 3: AI Enhancement & PDF Export

**Goal:** Elevate content quality through AI and enable professional PDF output.

**User Value:** Users get professionally-worded Arabic text and downloadable PDF reports.

**PRD Coverage:** FR4, FR6  
**Architecture Sections:** 6, 7  
**UX Sections:** AI Enhancement Flow, Export Screen  
**Dependencies:** Epic 2

---

### Story 3.1: AI Enhancement API Endpoint

As a **developer**,  
I want **an API endpoint for real-time text enhancement**,  
So that **the frontend can request AI improvements**.

**Acceptance Criteria:**

**Given** the API endpoint exists  
**When** POST `/api/enhance` is called with text  
**Then** GLM-4.6 processes the request

**And** response includes enhanced Arabic text  
**And** response includes confidence score  
**And** rate limiting allows 5 requests/minute  
**And** fallback to OpenRouter on GLM failure

**Technical Notes:**
- Follow Architecture section 6 (AI Enhancement)
- Use prompt template from Architecture
- Implement Redis caching (24h TTL)

**Prerequisites:** Story 1.2

---

### Story 3.2: AI Enhancement UI Component

As a **user**,  
I want **inline AI suggestions for my content**,  
So that **my brief notes become professional Arabic text**.

**Acceptance Criteria:**

**Given** I enter text in objectives/results/recommendations  
**When** I click the ⚡ button or blur the field  
**Then** API is called and purple suggestion box appears

**And** suggestion shows 🤖 badge  
**And** I can Accept (✓) to use enhanced text  
**And** I can Edit (✏️) to modify suggestion  
**And** I can Reject (✗) to keep original  
**And** loading state shows "جاري تحسين النص..."

**Technical Notes:**
- Create `components/ai/AISuggestionBox.tsx`
- Follow UX AI Enhancement Flow diagram
- Animate box with slideUp effect

**Prerequisites:** Stories 2.6, 3.1

---

### Story 3.3: PDF Template System

As a **developer**,  
I want **HTML templates for PDF generation**,  
So that **reports render correctly with Arabic formatting**.

**Acceptance Criteria:**

**Given** PDF templates exist  
**When** a report is converted to PDF  
**Then** Ministry of Education header displays correctly

**And** Arabic text renders RTL with Cairo font  
**And** content sections follow official format  
**And** images display in proper grid  
**And** A4 page format with correct margins

**Technical Notes:**
- Create `lib/pdf/templates/activity.html`
- Embed Cairo/Tajawal fonts
- Use Handlebars for templating

**Prerequisites:** Story 1.1

---

### Story 3.4: PDF Generation Endpoint

As a **user**,  
I want **to download my report as PDF**,  
So that **I have an official document for printing/sharing**.

**Acceptance Criteria:**

**Given** I'm viewing the report preview  
**When** I click "تنزيل PDF"  
**Then** POST `/api/export/pdf/:reportId` is called

**And** Puppeteer converts HTML template to PDF  
**And** PDF is saved to `/uploads/pdfs/`  
**And** download starts automatically  
**And** generation completes in < 5 seconds

**Technical Notes:**
- Create `app/api/export/pdf/[reportId]/route.ts`
- Follow Architecture section 7 (PDF Generation)
- Use Puppeteer with Chromium in Docker

**Prerequisites:** Stories 2.8, 3.3

---

### Story 3.5: Export Success Screen

As a **user**,  
I want **confirmation that my PDF is ready**,  
So that **I know the report was generated successfully**.

**Acceptance Criteria:**

**Given** PDF generation completes  
**When** I land on the success page  
**Then** I see "✅ تم إنشاء التقرير"

**And** I see document thumbnail preview  
**And** I see primary "تنزيل PDF" button  
**And** I see sharing options (disabled pending Epic 4)  
**And** I see "إنشاء تقرير جديد" button

**Technical Notes:**
- Route: `app/(app)/export/[reportId]/page.tsx`
- Follow UX Screen 5 design
- Implement confetti animation

**Prerequisites:** Story 3.4

---

## Epic 4: Sharing & User Features (v1.1)

**Goal:** Enable report sharing and user account management.

**User Value:** Users can share reports and access their history from any device.

**PRD Coverage:** FR8, FR9, FR10  
**Architecture Sections:** 5, 9  
**Dependencies:** Epic 3

---

### Story 4.1: WhatsApp Share Integration

As a **user**,  
I want **to share my report via WhatsApp**,  
So that **I can quickly send it to colleagues**.

**Acceptance Criteria:**

**Given** I'm on the export success page  
**When** I click "واتساب" share button  
**Then** WhatsApp opens with pre-filled message

**And** message includes report title and summary  
**And** message includes download link (if hosted)  
**Or** PDF file is shared directly (mobile)

**Technical Notes:**
- Use `wa.me` deep link
- Create `/api/export/share` endpoint
- Consider file size limits

**Prerequisites:** Story 3.5

---

### Story 4.2: Email Share Integration

As a **user**,  
I want **to share my report via email**,  
So that **I can send it to formal recipients**.

**Acceptance Criteria:**

**Given** I'm on the export success page  
**When** I click "إيميل" share button  
**Then** email client opens with pre-filled content

**And** email includes professional Arabic template  
**And** PDF is attached or linked  
**And** subject includes report title

**Technical Notes:**
- Use `mailto:` with proper encoding
- Consider SendGrid for server-side sending
- Follow Architecture section 7.3

**Prerequisites:** Story 3.5

---

### Story 4.3: User Authentication Setup

As a **user**,  
I want **to create an account and log in**,  
So that **I can save my reports**.

**Acceptance Criteria:**

**Given** I'm a new user  
**When** I click "تسجيل الدخول"  
**Then** authentication modal appears

**And** I can register with email/password  
**And** I can log in with existing credentials  
**And** session persists across browser sessions  
**And** JWT tokens are securely managed

**Technical Notes:**
- Use NextAuth.js with credentials provider
- Follow Architecture section 5
- Store users in MongoDB

**Prerequisites:** Story 1.2

---

### Story 4.4: Report History Dashboard

As a **logged-in user**,  
I want **to view my previous reports**,  
So that **I can access and redownload them**.

**Acceptance Criteria:**

**Given** I'm logged in  
**When** I navigate to my dashboard  
**Then** I see list of my reports with titles and dates

**And** I can click to view/re-download any report  
**And** I can delete reports I no longer need  
**And** reports are sorted by date (newest first)

**Technical Notes:**
- Route: `app/(app)/dashboard/page.tsx`
- Query reports by userId
- Implement pagination for > 20 reports

**Prerequisites:** Story 4.3

---

## FR Coverage Matrix

| FR ID | Description | Story | Status |
|-------|-------------|-------|--------|
| FR1 | Landing page | 2.1 | ✅ MVP |
| FR2 | Report type selection | 2.2 | ✅ MVP |
| FR3 | Multi-step wizard | 2.3-2.7 | ✅ MVP |
| FR4 | AI content enhancement | 3.1-3.2 | ✅ MVP |
| FR5 | Report preview | 2.8 | ✅ MVP |
| FR6 | PDF export | 3.3-3.5 | ✅ MVP |
| FR7 | Image upload | 2.7 | ✅ MVP |
| FR8 | WhatsApp/Email share | 4.1-4.2 | 🔄 v1.1 |
| FR9 | User authentication | 4.3 | 🔄 v1.1 |
| FR10 | Report history | 4.4 | 🔄 v1.1 |
| FR11 | Template saving | Future | ⏳ v1.2 |
| FR12 | Report cloning | Future | ⏳ v1.2 |

---

## Summary

| Metric | Value |
|--------|-------|
| **Total Epics** | 4 |
| **Total Stories** | 18 |
| **MVP Stories** | 14 (Epics 1-3) |
| **v1.1 Stories** | 4 (Epic 4) |
| **FR Coverage** | 100% for MVP scope |

**Epic Sequence:**
1. **Foundation** → Technical setup enabling all features
2. **Report Creation** → Core user journey from landing to preview
3. **AI & Export** → Content enhancement and PDF generation
4. **User Features** → Sharing and account management

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans._

_This document incorporates context from PRD, Architecture, and UX Design specifications._
