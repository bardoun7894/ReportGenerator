# Tech-Spec: ReportCreator MVP - Arabic Educational Report Generator

**Created:** 2025-12-04
**Status:** Ready for Development
**Timeline:** 3-day sprint
**Developer:** Barry (Quick Flow Solo Dev)

## Overview

### Problem Statement

Teachers and student advisors waste 30+ minutes manually drafting formal Arabic educational reports. Generic AI tools don't understand educational tone, and cloud solutions raise student privacy concerns. Manual templates are rigid and formatting is painful.

### Solution

A self-hosted Next.js web application that generates professional Arabic reports in <3 minutes using GLM-4.6 AI, with browser preview and dual-format export (PDF/Word), deployed via Docker for data privacy.

### Scope (In/Out)

**✅ IN SCOPE (MVP):**
- User authentication (Clerk)
- Dashboard with "Create New" + "Recent Reports" list
- Report generator form (Title, Student Name, Type dropdown with 5 options)
- GLM-4.6 AI integration with OpenRouter fallback
- Browser HTML preview with Arabic RTL rendering
- PDF export (with embedded Amiri/Noto Arabic font)
- Word export (editable .docx)
- MongoDB storage for user data and report history
- Docker Compose deployment (Next.js + MongoDB containers)

**❌ OUT OF SCOPE (Post-MVP):**
- Payment processing
- Custom template builder
- Batch report generation
- Admin analytics dashboard
- Edit mode (preview is read-only)
- Multi-tenant/multi-school support

---

## Context for Development

### Tech Stack

**Frontend:**
- Next.js 14 (App Router, React Server Components)
- TypeScript
- Tailwind CSS (RTL support configured)
- Shadcn/UI components (optional, for speed)

**Backend:**
- Next.js API Routes (serverless functions)
- MongoDB (local Docker container)
- Mongoose ODM

**AI Integration:**
- Primary: GLM-4.6 API (direct endpoint)
- Fallback: OpenRouter API
- API Key (GLM-4.6): `9637857ede084db0a2a371a1587bdc54.p2dUwuilroCt4T7R`

**Authentication:**
- Clerk (fastest integration, handles UI + session management)

**Document Generation:**
- PDF: `puppeteer` or `pdf-lib` with Arabic font embedding
- Word: `docx` npm package with RTL support

**Deployment:**
- Docker + Docker Compose
- Container 1: Next.js app
- Container 2: MongoDB

**Arabic Font:**
- Embed Amiri or Noto Sans Arabic (Google Fonts)
- Ensure proper RTL rendering in CSS

---

### Codebase Patterns

**Project Structure (Greenfield):**
```
ReportCreator/
├── .next/                    # Next.js build
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth pages (login, register)
│   ├── dashboard/           # Main dashboard
│   ├── api/                 # API routes
│   │   ├── generate/        # AI report generation
│   │   ├── export/          # PDF/Word export
│   │   └── reports/         # CRUD for reports
│   └── layout.tsx           # Root layout (Clerk provider)
├── components/              # React components
│   ├── report-form.tsx
│   ├── report-preview.tsx
│   └── report-list.tsx
├── lib/                     # Utilities
│   ├── db.ts               # MongoDB connection
│   ├── ai.ts               # GLM-4.6 + OpenRouter client
│   ├── pdf-generator.ts    # PDF export logic
│   └── docx-generator.ts   # Word export logic
├── models/                  # Mongoose schemas
│   ├── User.ts
│   └── Report.ts
├── public/
│   └── fonts/              # Amiri/Noto Arabic fonts
├── docker-compose.yml
├── Dockerfile
├── .env.local              # Environment variables
├── package.json
└── tsconfig.json
```

**Naming Conventions:**
- Components: PascalCase (`ReportForm.tsx`)
- API routes: kebab-case (`/api/generate-report/route.ts`)
- Utilities: camelCase (`aiClient.ts`)

**State Management:**
- React Server Components for data fetching
- Client components for interactivity (form, preview)
- No Redux/Zustand needed for MVP

---

### Files to Reference

Since this is greenfield, **no existing files** to reference. Fresh setup required.

**Key Dependencies to Install:**
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "@clerk/nextjs": "^4.0.0",
    "mongoose": "^8.0.0",
    "axios": "^1.6.0",
    "docx": "^8.0.0",
    "puppeteer": "^21.0.0",
    "tailwindcss": "^3.0.0"
  }
}
```

---

### Technical Decisions

**1. Why Clerk over NextAuth?**
- Faster integration (pre-built UI components)
- Session management out-of-the-box
- Cost acceptable for MVP ($0 for <5k users)

**2. Why GLM-4.6 over GPT-4?**
- Cost-effective ($0.001/1k tokens vs $0.03)
- Strong Arabic language support
- User provided direct API key

**3. Why Puppeteer for PDF over ReportLab?**
- Consistency: Same HTML rendered in preview and PDF
- No Python dependency (keeps stack unified)
- Easier font embedding

**4. Why MongoDB over PostgreSQL?**
- Flexible schema (report metadata varies by type)
- Faster setup with Mongoose
- JSON-native storage for AI responses

---

## Implementation Plan

### Phase 1: Project Setup (2-3 hours)

- [ ] **Task 1.1:** Initialize Next.js 14 project with TypeScript
  ```bash
  npx create-next-app@latest report-creator --typescript --tailwind --app
  ```

- [ ] **Task 1.2:** Configure Docker Compose
  - Create `docker-compose.yml` (Next.js service + MongoDB service)
  - Create `Dockerfile` for Next.js app
  - Set up volumes for MongoDB persistence

- [ ] **Task 1.3:** Install and configure Clerk
  - Add Clerk provider to `app/layout.tsx`
  - Set up Clerk environment variables
  - Create login/signup pages

- [ ] **Task 1.4:** Set up MongoDB connection
  - Create `lib/db.ts` with Mongoose connection
  - Define `models/User.ts` and `models/Report.ts` schemas

- [ ] **Task 1.5:** Configure Tailwind for RTL
  - Add RTL plugin
  - Import Amiri font from Google Fonts

---

### Phase 2: Core Features (6-8 hours)

- [ ] **Task 2.1:** Build Dashboard UI
  - Protected route (Clerk auth check)
  - "Create New Report" button
  - "Recent Reports" list (fetch from MongoDB)

- [ ] **Task 2.2:** Create Report Form Component
  - Input fields: Title, Student Name
  - Dropdown: Report Type (5 options)
  - Submit button → API call

- [ ] **Task 2.3:** Implement AI Generation API (`/api/generate`)
  - Accept: `{title, studentName, reportType}`
  - Call GLM-4.6 API with prompt engineering:
    ```
    System: "أنت مساعد متخصص في كتابة التقارير التعليمية الرسمية بالعربية"
    User: "اكتب تقرير {reportType} عن الطالب {studentName} بعنوان: {title}"
    ```
  - Fallback to OpenRouter if GLM-4.6 fails
  - Return: `{reportText, generatedAt}`

- [ ] **Task 2.4:** Save Generated Report to MongoDB
  - Store: userId, title, studentName, type, content, createdAt
  - Return report ID to frontend

- [ ] **Task 2.5:** Build HTML Preview Component
  - Display generated Arabic text with RTL styling
  - Use Amiri font from Google Fonts
  - Responsive design

---

### Phase 3: Export Features (4-5 hours)

- [ ] **Task 3.1:** Implement PDF Export (`/api/export/pdf`)
  - Use Puppeteer to render HTML preview as PDF
  - Embed Amiri font in PDF
  - Headers: Student name, date, report type
  - Footer: Page numbers
  - Return: PDF file download

- [ ] **Task 3.2:** Implement Word Export (`/api/export/docx`)
  - Use `docx` library
  - Set RTL paragraph direction
  - Use Arabic-compatible font (Amiri)
  - Structure: Title → Student Name → Report Content
  - Return: .docx file download

- [ ] **Task 3.3:** Add Export Buttons to Preview
  - "Download PDF" button
  - "Download Word" button
  - Loading states during generation

---

### Phase 4: Polish & Testing (2-3 hours)

- [ ] **Task 4.1:** Error Handling
  - AI API failures → retry with OpenRouter
  - MongoDB connection errors → user-friendly message
  - Invalid form inputs → validation

- [ ] **Task 4.2:** Loading States
  - Skeleton loaders for dashboard
  - Spinner during AI generation
  - Progress indicator for export

- [ ] **Task 4.3:** Manual Testing Checklist
  - [ ] User can sign up/login via Clerk
  - [ ] User can create report with all 5 types
  - [ ] Generated report appears in <10 seconds
  - [ ] Preview shows correct Arabic RTL text
  - [ ] PDF export downloads with proper formatting
  - [ ] Word export is editable in Microsoft Word
  - [ ] Reports persist after refresh (MongoDB)

- [ ] **Task 4.4:** Docker Deployment Test
  - [ ] `docker-compose up` starts both containers
  - [ ] App accessible at http://localhost:3000
  - [ ] MongoDB data persists across restarts

---

## Acceptance Criteria

### AC1: User Authentication
**Given** I am a new teacher
**When** I visit the app for the first time
**Then** I see a Clerk signup form
**And** I can create an account with email/password
**And** I'm redirected to the dashboard

### AC2: Report Generation
**Given** I am logged in
**When** I fill out the report form (Title: "Monthly Progress", Student: "Ahmed Ali", Type: "Academic")
**And** I click "Generate Report"
**Then** I see a loading indicator
**And** Within 10 seconds, I see an HTML preview with Arabic text
**And** The text is properly aligned RTL
**And** The report is saved to my account

### AC3: PDF Export Quality
**Given** I have a generated report in preview
**When** I click "Download PDF"
**Then** A PDF file downloads
**And** Opening it shows:
  - Proper Arabic RTL rendering
  - Amiri font embedded (no missing characters)
  - Student name in header
  - Date in footer
  - Clean A4 formatting (2.5cm margins)

### AC4: Word Export Quality
**Given** I have a generated report in preview
**When** I click "Download Word"
**Then** A .docx file downloads
**And** Opening it in Microsoft Word shows:
  - Editable Arabic text
  - RTL paragraph direction
  - Proper font (Amiri or fallback)
  - Titled sections

### AC5: Report History
**Given** I have created 3 reports
**When** I return to the dashboard
**Then** I see my 3 most recent reports listed
**And** I can click each to view it again
**And** I can export them again without regenerating

### AC6: Error Recovery
**Given** GLM-4.6 API fails (network error)
**When** I submit a report generation request
**Then** The system automatically retries with OpenRouter
**And** I still get a valid report within 15 seconds
**Or** I see a clear error message if both fail

### AC7: Docker Deployment
**Given** I have Docker installed
**When** I run `docker-compose up`
**Then** Both containers (Next.js + MongoDB) start
**And** I can access the app at localhost:3000
**And** Data persists when I stop and restart containers

---

## Additional Context

### Dependencies

**Runtime:**
- Node.js 20+
- Docker + Docker Compose
- MongoDB 7.0

**NPM Packages:**
- `@clerk/nextjs` - Authentication
- `mongoose` - MongoDB ODM
- `axios` - HTTP client for AI APIs
- `docx` - Word document generation
- `puppeteer` - PDF generation
- `tailwindcss` - Styling
- `@headlessui/react` - UI components (optional)

### Testing Strategy

**Manual Testing (MVP):**
- Test all 5 report types
- Test on Arabic-language browsers
- Verify PDF rendering on Windows/Mac
- Verify Word compatibility (Office 365, LibreOffice)

**Future (Post-MVP):**
- Unit tests for AI prompt engineering
- Integration tests for API routes
- E2E tests with Playwright

### Environment Variables

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# MongoDB
MONGODB_URI=mongodb://mongodb:27017/reportcreator

# AI APIs
GLM_API_KEY=9637857ede084db0a2a371a1587bdc54.p2dUwuilroCt4T7R
GLM_API_URL=https://open.bigmodel.cn/api/paas/v4/chat/completions
OPENROUTER_API_KEY=<optional-fallback>
OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Notes

**Arabic Text Handling:**
- Use `dir="rtl"` on containers
- CSS: `text-align: right` for Arabic content
- Google Fonts API: `https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap`

**AI Prompt Engineering:**
```typescript
const systemPrompt = `أنت مساعد متخصص في كتابة التقارير التعليمية الرسمية بالعربية.
يجب أن تكون التقارير:
- مهنية ورسمية
- مناسبة للسياق التعليمي
- واضحة ومفصلة
- محترمة ومحفزة للطالب`;

const userPrompt = `اكتب تقرير ${reportType} عن الطالب ${studentName} بعنوان: ${title}`;
```

**Performance Targets:**
- AI generation: <10s (GLM-4.6 is fast)
- PDF export: <5s (Puppeteer headless Chrome)
- Word export: <2s (docx library is instant)
- Total workflow: <3 minutes (target achieved)

**Risk Mitigation:**
- **Risk:** GLM-4.6 API unstable → **Mitigation:** OpenRouter fallback
- **Risk:** Arabic fonts not rendering → **Mitigation:** Embed fonts in PDF, test on multiple platforms
- **Risk:** Docker setup too complex for user → **Mitigation:** Provide clear README with step-by-step commands

---

## Development Sequence

**Day 1 (Setup + Core):**
1. Project init + Docker setup (2h)
2. Clerk auth + Dashboard skeleton (2h)
3. Report form + AI integration (3h)

**Day 2 (Features):**
1. HTML preview component (2h)
2. PDF export (3h)
3. Word export (2h)

**Day 3 (Polish + Deploy):**
1. Report history list (1h)
2. Error handling + loading states (2h)
3. Testing + bug fixes (3h)
4. Docker deployment validation (1h)

---

**Total Estimated Effort:** 20-22 hours (realistic for 3-day sprint with focused work)

**End of Tech Spec**
