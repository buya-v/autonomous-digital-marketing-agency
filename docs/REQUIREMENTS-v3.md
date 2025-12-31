# Autonomous Digital Marketing Agency - Requirements Document

## Iteration 3

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
Initial iteration - no previous feedback

## Refined Requirements
# Technical Specification: Autonomous Digital Marketing Agency (ADMA) - Iteration 3

## 1. Project Overview
Iteration 3 marks the transition of ADMA from a controlled simulation environment to a **Live Production-Ready SaaS**. The primary focus is "Production Hardening": ensuring the system is resilient to runtime errors, provides instantaneous visual feedback, and maintains a robust connection to live marketing APIs (Meta, Google Ads, LinkedIn).

## 2. Technical Architecture Refinement

### 2.1 Core Tech Stack
*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript (Strict Mode)
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **State Management:** TanStack Query (Data fetching) & Zustand (Global UI State)
*   **Error Tracking:** Sentry (or similar) integrated with custom Error Boundaries.

### 2.2 Critical Reliability Architecture (Addressing Feedback)
To resolve the "Blank Screen" and "Unknown State" issues identified in Iteration 2, the following architectural patterns are mandated:

1.  **Hydration Guard Pattern:** All top-level dashboard components must be wrapped in a Client-Side Hydration check to prevent mismatch between Server and Client DOM.
2.  **Global & Segment Error Boundaries:** 
    *   A root `error.tsx` to catch catastrophic failures.
    *   Nested `error.tsx` for specific widgets (e.g., Campaign Stats, Log Feed) so one failing API doesn't crash the entire dashboard.
3.  **Skeleton State Defaulting:** Components must render Tailwind-based Skeleton loaders instead of returning `null` or `undefined` during data fetching or initialization.

---

## 3. UI/UX Design Tokens

### 3.1 Color Palette (Production Hardened)
| Token | Hex Code | Usage |
| :--- | :--- | :--- |
| `brand-primary` | `#0F172A` | Deep Navy (Trust/Authority) |
| `brand-accent` | `#3B82F6` | Electric Blue (Action/Primary Buttons) |
| `status-live` | `#10B981` | Emerald (Live Production State) |
| `status-warning` | `#F59E0B` | Amber (Approval Required/Safety Gate) |
| `status-error` | `#EF4444` | Red (Critical Failure/Kill Switch) |
| `bg-surface` | `#F8FAFC` | Light Gray (Dashboard Background) |

### 3.2 Typography & Spacing
*   **Font Stack:** Inter (Sans-serif) for UI; JetBrains Mono for Live Logs/Code.
*   **Base Spacing:** 4px (Base-1), 8px (Base-2), 16px (Base-4), 24px (Base-6).
*   **Corner Radius:** `rounded-lg` (8px) for cards; `rounded-full` for status indicators.

---

## 4. Component Breakdown

### 4.1 Shell Components
*   **`RootErrorBoundary`:** High-level wrapper providing a "Soft Reset" button and error reporting.
*   **`AppInitializer`:** Non-rendering component that pre-fetches user settings and agency state before mounting children.
*   **`GlobalNavigation`:** Sidebar containing Agency Switcher, Campaign Manager, Safety Controls, and Billing.

### 4.2 Dashboard Modules
*   **`LiveActionFeed`:** A real-time, auto-scrolling terminal showing AI thought processes and API calls.
    *   *Requirement:* Must handle 100+ logs/minute without browser lag.
*   **`PerformanceMetricGrid`:** 4-column layout showing Spend, CTR, ROAS, and Conversions.
    *   *Requirement:* Real-time "Pulse" animation when data updates.
*   **`CampaignKillSwitch`:** A prominent, high-contrast button that immediately pauses all active API tokens.

### 4.3 Safety & Governance Components
*   **`ApprovalGateModal`:** Triggers when the AI proposes a budget increase >20%.
*   **`TokenStatusBadge`:** Visual indicator of API connectivity (Green: Connected, Yellow: Expiring, Red: Revoked).

---

## 5. Feature Requirements & Prioritization

### Priority 1: Resilience & Visibility (Immediate)
*   **Refactored Init Logic:** Ensure `layout.tsx` validates the existence of the Agency context before rendering the Dashboard.
*   **Visual Error States:** Replace all "Unknown" text with specific error messages (e.g., "Meta API Timeout") and a retry button.
*   **Live Production Toggle:** A UI switch to move between "Sandbox" (Mock data) and "Production" (Real API keys).

### Priority 2: Real-time Transparency
*   **Streaming Logs:** Implement WebSockets or Supabase Realtime to push AI "thoughts" to the UI instantly.
*   **Breadcrumb Activity:** A small indicator showing exactly which step the AI is on (e.g., "Analyzing Competitor Keywords...").

### Priority 3: Safety Controls
*   **Hard Spending Limits:** User-defined daily caps that the AI cannot override.
*   **Manual Intervention Mode:** Ability to pause the AI agent while keeping the campaigns running.

---

## 6. Acceptance Criteria

| ID | Feature | Acceptance Criteria |
| :--- | :--- | :--- |
| **AC 1.1** | **Initialization** | Dashboard renders within 1.5s. No "Blank Screen" on page refresh. |
| **AC 1.2** | **Error Handling** | If the Marketing API fails, only the "Stats" widget shows an error; the rest of the dashboard remains interactive. |
| **AC 2.1** | **Live Transparency** | The `LiveActionFeed` updates automatically without user refresh when the AI takes an action. |
| **AC 3.1** | **Kill Switch** | Clicking "Emergency Stop" sends a `PATCH` request to all active campaign endpoints and flips UI to "Paused" state within 500ms. |
| **AC 4.1** | **State Consistency** | Agency state (Active/Inactive) persists in LocalStorage/Database and populates correctly on re-login. |

---

## 7. Implementation Roadmap (Iteration 3)
1.  **Phase 1 (Stabilization):** Implement Global Error Boundaries and refactor the `AppInitializer`.
2.  **Phase 2 (Visibility):** Build the `LiveActionFeed` with streaming support.
3.  **Phase 3 (Production Bridge):** Connect the UI to live Marketing API wrappers and implement the `CampaignKillSwitch`.
4.  **Phase 4 (Validation):** User testing to ensure the "Unknown" state is no longer reachable.

## Acceptance Criteria
- All features must be fully implemented (no placeholders)
- UI must be responsive and accessible
- Error handling must be comprehensive
- Code must pass TypeScript compilation

---
*Generated by ASLA Product Agent - Iteration 3 - 2025-12-31T02:11:28.131Z*
