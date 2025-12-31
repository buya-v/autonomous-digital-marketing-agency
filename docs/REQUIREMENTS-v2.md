# Autonomous Digital Marketing Agency - Requirements Document

## Iteration 2

## Project Description
Project Name: Autonomous Digital Marketing Agency

Project Summary
The Autonomous Digital Marketing Agency is an AI-driven platform designed to plan, execute, and optimize multi-channel marketing campaigns with minimal human intervention. By integrating with major social media and advertising networks, the application automates the entire lifecycle of digital marketing, from creative asset generation to real-time budget bidding. This tool empowers businesses to maintain a sophisticated market presence without hiring external agencies or internal staff.

Key Features
- Automated Strategy Engine: Analyzes market trends and business data to allocate budgets and select channels (Google, Meta, LinkedIn) dynamically.
- Generative Content Studio: Utilizes large language models and image generators to produce ad copy, social posts, and visuals tailored to the brand voice.
- Real-Time Optimization: Autonomously adjusts bids, A/B tests creatives, and pauses underperforming ads to maximize ROI.
- Predictive Analytics: Provides a unified dashboard tracking conversion rates and customer acquisition costs.

Target Users
Small business owners, early-stage startups, and solopreneurs who require professional marketing results but lack the budget or expertise for traditional agencies.

Core User Flows
1. Onboarding: The user connects social accounts, inputs their website URL, defines a monthly budget, and selects a primary goal (e.g., "increase sales").
2. Activation: The system analyzes the inputs, generates a strategy and initial creative assets, and launches the campaign upon a single user confirmation.
3. Monitoring: The user receives weekly performance digests, while the system handles daily adjustments and optimization in the background.

## User Feedback Incorporated
PRIORITY ISSUES
Implement the complete end-to-end campaign lifecycle logic, ensuring data flows correctly from the AI generation module to the execution layer. Verify and stabilize OAuth token handling for connected accounts to prevent authentication failures during autonomous publishing attempts.

FEATURE REQUESTS
Integrate live production APIs for Meta (Facebook/Instagram) and Google Ads to replace current sandbox environments, enabling actual ad spend and content publishing. Add a "Master Kill Switch" functionality to allow immediate manual suspension of all autonomous AI activities in case of error.

UI/UX IMPROVEMENTS
Develop a real-time system status dashboard that visualizes active background processes, API latency, and campaign execution states to prove system functionality to the user.

TECHNICAL DEBT
Remove hardcoded placeholder data from the campaign performance views and connect the frontend to the real-time analytics backend service. Refactor the job queue architecture to handle asynchronous multi-channel posting tasks without timeout errors.

## Refined Requirements
# Technical Specification: Autonomous Digital Marketing Agency (ADMA) - Iteration 2

## 1. Project Overview
ADMA is a SaaS platform that automates the end-to-end digital marketing lifecycle. Iteration 2 focuses on transitioning from a "Sandbox/Simulation" state to a "Live Production" environment, emphasizing reliability, real-time transparency, and safety controls.

## 2. Updated Technical Architecture

### 2.1 Tech Stack
*   **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React (Icons).
*   **State Management:** TanStack Query (FKA React Query) for server state; Zustand for global UI state (Kill Switch).
*   **Backend/API:** Next.js Server Actions & Route Handlers.
*   **Database & Auth:** PostgreSQL (via Prisma), NextAuth.js (OAuth 2.0 flow).
*   **Job Queue:** BullMQ with Redis (to handle asynchronous multi-channel posting and retries).
*   **AI/ML:** OpenAI (GPT-4o) for copy, Midjourney/DALL-E 3 for creative.

### 2.2 API Integration Layer
*   **Meta Graph API:** Production access for Facebook/Instagram Ads & Insights.
*   **Google Ads API:** Production access for Search/Display campaigns.
*   **OAuth Manager:** Centralized service to handle token encryption, storage, and silent background refreshes to prevent "Expired Token" failures.

---

## 3. Core Feature Specifications (Iteration 2)

### 3.1 End-to-End Campaign Lifecycle
*   **Logic Flow:** AI Generation Module → Approval Workflow → Creative Asset Storage (S3) → Platform Publishing (Meta/Google) → Performance Monitoring.
*   **Requirement:** Data must persist across transitions. No data loss between the "Creative Generation" and "Execution" layers.

### 3.2 Master Kill Switch (Critical Safety)
*   **Functionality:** A global boolean flag in the database and a high-priority state in the UI. 
*   **Action:** When toggled "OFF," all outgoing API calls to Meta/Google are intercepted and halted. Active job queues are paused immediately.
*   **Location:** Persistent header/navigation bar accessible from any screen.

### 3.3 Live Production Integration
*   Migration from `sandbox_mode` to `production_mode` for all external SDKs.
*   Implementation of real ad-spend budget capping to prevent AI-driven overspending.

### 3.4 Real-Time System Status Dashboard
*   **Visualizer:** A "System Pulse" view showing:
    *   Active Background Jobs (e.g., "Generating Image...", "Syncing Meta Insights...").
    *   API Latency (Meta, Google, OpenAI).
    *   OAuth Health Status (Connected/Disconnected).

---

## 4. UI/UX Design Tokens & Components

### 4.1 Design Tokens
| Token | Value | Purpose |
| :--- | :--- | :--- |
| **Primary** | `#2563EB` (Blue 600) | Main actions, brand identity |
| **Success** | `#10B981` (Emerald 500) | Live campaigns, healthy API status |
| **Danger** | `#DC2626` (Red 600) | **Master Kill Switch**, errors, stopping campaigns |
| **Warning** | `#F59E0B` (Amber 500) | Pending approvals, high latency |
| **Surface** | `#0F172A` (Slate 900) | Dark mode dashboard background |
| **Card** | `#1E293B` (Slate 800) | Component containers |

### 4.2 Component Breakdown
1.  **`GlobalKillSwitch`**: A prominent toggle component with double-confirmation modal.
2.  **`StatusMarquee`**: A thin top-bar showing real-time API health and active AI processing tasks.
3.  **`AnalyticsDashboard`**: Replacing placeholders with live Recharts components connected to the Google/Meta streaming API.
4.  **`CampaignExecutionLog`**: A terminal-style feed showing the AI's step-by-step actions (e.g., `[14:02:01] AI generated headline for "Winter Sale"`).
5.  **`OAuthConnectionCard`**: A status card allowing users to re-authenticate or refresh tokens manually if background refresh fails.

---

## 5. Technical Debt & Refactoring

### 5.1 App Initialization Fix
*   **Issue:** JS runtime errors causing blank screens on load.
*   **Fix:** Refactor `layout.tsx` to include a `ClientBoundary` and ensuring the DOM is not manipulated before hydration. Implement a `LoadingSkeleton` to cover the "Unknown" state while data fetches.

### 5.2 Job Queue Refactor
*   **Issue:** Timeouts during multi-channel posting.
*   **Fix:** Move publishing logic out of Next.js Route Handlers and into **BullMQ workers**. This allows for 5+ minute execution times and automatic retries without blocking the UI.

---

## 6. Acceptance Criteria

| ID | Feature | Acceptance Criteria |
| :--- | :--- | :--- |
| **AC-1** | Master Kill Switch | Clicking the switch halts all active API calls within < 500ms and updates DB status. |
| **AC-2** | Production APIs | Successfully publish a $1/day test campaign to Meta/Google without manual intervention. |
| **AC-3** | Real-time Dashboard | Dashboard displays at least 3 live metrics (latency, active jobs, spend) without page refresh (WebSockets or Polling). |
| **AC-4** | OAuth Stability | User remains authenticated for 7 days without needing to re-login, via automated refresh tokens. |
| **AC-5** | Zero Data Lag | Campaign views must show "No Data" or actual backend data, never hardcoded placeholders. |

## 7. Prioritization for Iteration 2
1.  **P0 (Critical):** Master Kill Switch & Initialization Fix (Stability).
2.  **P0 (Critical):** OAuth Stability & Token Refresh (Access).
3.  **P1 (High):** Live Meta/Google API Integration (Core Value).
4.  **P1 (High):** Real-time Status Dashboard (Trust/Visibility).
5.  **P2 (Medium):** Job Queue Refactoring (Performance).

## Acceptance Criteria
- All features must be fully implemented (no placeholders)
- UI must be responsive and accessible
- Error handling must be comprehensive
- Code must pass TypeScript compilation

---
*Generated by ASLA Product Agent - Iteration 2 - 2025-12-31T01:21:13.868Z*
