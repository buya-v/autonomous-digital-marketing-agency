# Autonomous Digital Marketing Agency - Requirements Document

## Iteration 4

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
Implement an Integration features

## Refined Requirements
# Technical Specification: ADMA Iteration 4 (Production Hardening & Live Integrations)

## 1. Project Overview
**Iteration 4 Goal:** Transform ADMA from a prototype into a **Live Production-Ready SaaS**. This phase focuses on "Zero-Failure Initialization," robust error handling, and the deployment of live marketing API integrations (Meta, Google, LinkedIn). The priority is resolving the persistent "Unknown issue" loop and ensuring the UI is never blank.

---

## 2. Core Technical Requirements

### 2.1 Initialization & Resilience (The "Anti-Blank Screen" Protocol)
*   **Sequential Bootstrapping:** Refactor `main.js/tsx` to use a prioritized loading sequence:
    1.  Core CSS & Theme Tokens.
    2.  Critical Error Boundary Layer.
    3.  User Authentication/Session State.
    4.  Dashboard Layout (Static Elements).
    5.  Async API Data (Dynamic Components).
*   **Global Error Boundaries:** 
    *   Implement a React/Vue-level Error Boundary at the root.
    *   **Acceptance Criteria:** If a JavaScript crash occurs, the user must see a branded "Recovery Screen" with a "Reload App" button and a specific error code, rather than a blank white page.
*   **Telemetery & Root Cause Logging:** 
    *   Replace generic "Unknown issue" messages with a **Contextual Error Mapper**.
    *   Every catch block must log: `Timestamp`, `ComponentID`, `ActionAttempted`, and `RawErrorStack`.

### 2.2 Live Marketing Integrations
*   **OAuth Integration Hub:** A centralized manager for Meta Ads, Google Ads, and LinkedIn Campaign Manager.
*   **Real-time Data Fetching:** Shift from mock JSON to live REST/GraphQL fetches.
*   **State Persistence:** Securely store encrypted API tokens in the backend/local storage with automatic refresh-token logic.

---

## 3. UI/UX Design Tokens

To ensure a "Live SaaS" feel, the following design tokens must be applied across all components.

| Token Category | Variable Name | Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Colors** | `--brand-primary` | `#2563EB` (Electric Blue) | Action buttons, active states. |
| | `--brand-success` | `#10B981` (Growth Green) | Positive ROI, successful syncs. |
| | `--brand-error` | `#EF4444` (Alert Red) | Critical failures, disconnected APIs. |
| | `--bg-main` | `#0F172A` (Deep Navy) | Main dashboard background. |
| **Typography** | `--font-main` | 'Inter', sans-serif | Primary UI text. |
| | `--font-mono` | 'JetBrains Mono' | System logs and error IDs. |
| **Spacing** | `--space-unit` | 4px | Base scale (4, 8, 16, 32, 64). |
| **Feedback** | `--transition-fast`| 150ms ease-in-out | Hover states and transitions. |

---

## 4. Component Breakdown

### 4.1 `AppRoot` (High Priority)
*   **Function:** Mounts the Global Error Boundary and initializes the `ThemeStore`.
*   **Requirement:** Must render a "Skeleton Dashboard" if data fetching takes > 300ms.

### 4.2 `IntegrationManager`
*   **Function:** A card-based UI for managing API connections.
*   **Features:**
    *   Connection status indicators (Green/Red/Amber).
    *   "Sync Now" manual trigger.
    *   Detailed "Last Error" tooltip to solve the "Unknown issue" feedback.

### 4.3 `MarketingAgencyDashboard`
*   **Function:** The primary workspace view.
*   **Refinement:** Refactor from a single monolithic component into sub-modules:
    *   `StatGrid`: Performance metrics.
    *   `CampaignMonitor`: Live feed of active ads.
    *   `AILogStream`: Real-time view of what the autonomous agent is doing.

### 4.4 `FallbackUI`
*   **Function:** The UI rendered by the Error Boundary.
*   **Requirement:** Must include a "Diagnostics" dropdown that shows the exact JSON error causing the crash to help developers debug "Unknown issues" in production.

---

## 5. Acceptance Criteria (Definition of Done)

1.  **Zero Blank Screens:** The application must show a loading skeleton or a functional dashboard layout within 1.5 seconds of page load, even if the backend is slow.
2.  **Explicit Errors:** The string "Unknown issue..." must be removed from the codebase. Every error must have a source (e.g., `Meta_API_Auth_Failure`).
3.  **Live Sync:** Successfully pull "Total Spend" from at least one live API (Meta or Google) and display it on the dashboard.
4.  **DOM Verification:** The dashboard components must be verified as "Mounted" in the browser console before the loading spinner is dismissed.
5.  **Loop Prevention:** If an initialization error occurs 3 times in a row, the app must clear its local cache and redirect to a "Safe Mode" login.

---

## 6. Implementation Priority (Roadmap)

1.  **Phase A (The Shield):** Implement Global Error Boundary + Contextual Logging (Solves the "Unknown Issue").
2.  **Phase B (The Skeleton):** Refactor Initialization logic + Skeleton UI (Solves the "Blank Screen").
3.  **Phase C (The Bridge):** Deploy Meta/Google OAuth Integration Hub.
4.  **Phase D (The Polish):** Apply Design Tokens and finalize transition animations.

## Acceptance Criteria
- All features must be fully implemented (no placeholders)
- UI must be responsive and accessible
- Error handling must be comprehensive
- Code must pass TypeScript compilation

---
*Generated by ASLA Product Agent - Iteration 4 - 2025-12-31T03:57:47.466Z*
