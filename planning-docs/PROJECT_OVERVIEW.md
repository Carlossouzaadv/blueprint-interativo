# Project Overview - Blueprint Interativo

## Project Vision

**Name**: Blueprint Interativo
**Purpose**: An interactive one-page portfolio website that demonstrates solution architecture capabilities through case study blueprints and AI-powered assistant
**Value Proposition**: Enables CTOs, tech recruiters, and product leaders to understand hybrid AI/SaaS architecture expertise in < 2 minutes through visual, interactive project blueprints rather than static resume content

## The Problem (The "Pain")

A strong resume on DOCX is **flat**. It says: "14+ years Senior Legal Experience + AI Solution Architect," but doesn't **show** it. A recruiter cannot visualize:
- How Carlos translates business pain (legal/tax) into technical architecture
- The evolution of his thinking (JustoAI V1 → V2 tech stack decisions)
- Why he made specific technology choices
- The business impact of his architectural decisions

## Solution

**Blueprint Interativo** showcases expertise through **interactive case studies** that tell the story of architectural decision-making. Instead of "I built JustoAI," it shows:
1. **The Challenge**: The business/legal problem that needed solving
2. **The Blueprint**: The technical architecture (tech stack, components, flow)
3. **Key Decisions**: Why each technology was chosen, how V1 evolved to V2
4. **Impact**: The business value (EBITDA gains, scalability, cost optimization)

**Bonus Feature**: An AI Chatbot (powered by Cérebro Jurídico concept) trained on the curriculum, allowing recruiters to ask questions interactively.

---

## Current Phase

- [x] **Planning** ← Current (Kick-off meeting)
- [ ] **MVP Development** (Next Phase)
- [ ] **Beta**
- [ ] **Production** (Live)
- [ ] **Maintenance**

---

## Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|----------|
| Language | TypeScript | 5.x | Type-safe development |
| Framework | Next.js | 14+ | React app with SSR, API routes |
| UI Library | React | 18+ | Component-based UI |
| Styling | TailwindCSS | 3.x | Utility-first CSS, responsive design |
| Package Manager | npm | Latest | Dependency management |
| AI Backend | Google Gemini | Latest | Chatbot assistant training |
| State Management | React Context | - | Global language/theme state |
| Deployment | Vercel | - | Optimized for Next.js |
| Testing | Jest + Vitest | Latest | Unit and integration tests |
| E2E Testing | Playwright | Latest | Full user journey testing |
| Linting | ESLint | Latest | Code quality checks |
| Code Format | Prettier | Latest | Code formatting |

---

## Core Architecture

**Blueprint Interativo** is a **Next.js single-page application** that presents interactive case studies of AI/SaaS projects. The architecture has three layers:

1. **Frontend (Next.js + React + TailwindCSS)**: Hero section, project blueprints (cards), AI chatbot component
2. **Data Layer (TypeScript)**: Project blueprint data structure (`lib/data.ts`) with challenge, tech stack, decisions, and metrics
3. **Backend (Next.js API Routes)**: Chatbot endpoint (`/api/chat`) that integrates with Google Gemini API for RAG-based responses trained on curriculum data

**Key Feature**: Bilingual (PT/EN) with language switcher that preserves context across the site.

---

## Success Metrics

**Primary Metric**: CTC (Click-Through Completion)
- [ ] Recruiter/CTO visits site and completes full journey (Hero → Blueprint interaction → Chatbot) in < 3 minutes
- [ ] Target: > 70% of visitors complete journey

**Secondary Metrics**:
- [ ] Lighthouse Score > 90 (Mobile Performance)
- [ ] Accessibility Score = WCAG 2.1 AA
- [ ] Time to First Contentful Paint < 1.5s
- [ ] Blueprint interactions completed: > 50% of visitors click ≥ 1 blueprint
- [ ] Chatbot engagement: > 30% of visitors interact with chatbot
- [ ] Language preference detected: > 85% use correct language automatically

**Qualitative Success**:
- [ ] CTOs/Tech Recruiters report: "I understand his architecture thinking in 2 minutes"
- [ ] Blueprint case studies generate meaningful recruiter conversations

---

## Target Audience

1. **Tech Recruiters** (Primary)
   - Looking for: AI/SaaS architects, senior engineers, technical leaders
   - Pain Point: Cannot assess architectural thinking from static resume
   - Solution: Interactive blueprints + AI assistant show actual project decisions

2. **CTOs / VP Engineering** (Primary)
   - Looking for: Senior architects who understand both business and technology
   - Pain Point: Need to evaluate if candidate understands AI/LLM integrations, scalability
   - Solution: See real projects (JustoAI V1→V2, Poker Grinder's Edge) with decision rationale

3. **Heads of Product** (Secondary)
   - Looking for: Technical founders, product-minded engineers
   - Pain Point: Need to understand business acumen alongside technical depth
   - Solution: Case studies show business value (10% EBITDA gain, R$5M returns from legal projects)

4. **Venture Capital / Startup Ecosystems** (Tertiary)
   - Looking for: CTO candidates, co-founders
   - Pain Point: Assess both technical capability and domain expertise in LegalTech/FinTech
   - Solution: Blueprint Interativo demonstrates 14 years domain knowledge + modern tech stack

---

## Key Integrations

| Service | Purpose | Status | Priority |
|---------|---------|--------|----------|
| Google Gemini API | AI Chatbot backend (RAG) | Planned | High |
| GitHub (curriculum link) | Social proof of technical work | Planned | Medium |
| LinkedIn (contact) | Recruiter outreach source | Planned | Medium |
| Google Analytics | Visitor tracking & engagement metrics | Planned | Low |

---

## Performance Targets

- **Response Time**: Initial page load < 2 seconds (Vercel optimized)
- **Chatbot Response**: AI response < 3 seconds
- **Throughput**: Handle 100+ concurrent visitors (Vercel auto-scaling)
- **Uptime**: 99.5% availability (Vercel SLA)
- **Scale**: No backend limits (fully serverless via Vercel + Gemini API)
- **Mobile Score**: Lighthouse > 90 on mobile

---

## Project Timeline

- **Start Date**: November 11, 2025 (Today - Kick-off)
- **MVP Target**: November 30, 2025 (3 weeks)
  - Basic structure, Hero component, Blueprint cards (static data), basic chatbot
- **Beta Target**: December 15, 2025 (5 weeks)
  - Full bilingual support, responsive design, chatbot fully trained
- **Production Target**: January 5, 2026 (8 weeks)
  - Live on vercel.com/carlos, fully optimized, SEO ready
- **Current Sprint**: Sprint 0 - Planning & Setup (Nov 11-18)

---

## Team & Resources

- **Primary Developer**: Claude (AI Assistant) + Carlos (Human architect/product owner)
- **Project Manager Agent**: `project-manager.md` (automated documentation)
- **Stakeholders**: CTOs, Tech Recruiters, Product Leaders (external audience)
- **Documentation**: This planning system + CLAUDE.md + ARCHITECTURE.md
- **Repository**: GitHub - Blueprint Interativo (private during development)
- **Deployment**: Vercel (carlossouza.vercel.app or custom domain)
- **Curriculum Source**: `/docs/source-data/Curriculum - PT/EN - Carlos Souza.docx`

---

## Key Features (MVP → Production)

### Phase 1: MVP (by Nov 30)
- [ ] Hero section (professional summary + call-to-action)
- [ ] Blueprint cards (JustoAI, Poker Grinder's Edge, Cérebro Jurídico) - static
- [ ] Basic chatbot UI (non-functional placeholder)
- [ ] Language switcher (PT/EN)
- [ ] Mobile-responsive design

### Phase 2: Beta (by Dec 15)
- [ ] Chatbot fully integrated with Gemini API
- [ ] Chatbot trained on curriculum data (RAG implementation)
- [ ] Blueprint card interactions (expand/collapse, detailed view)
- [ ] Full i18n implementation
- [ ] Analytics integration
- [ ] Accessibility audit (WCAG 2.1 AA)

### Phase 3: Production (by Jan 5)
- [ ] SEO optimization (meta tags, schema markup)
- [ ] Performance optimization (code splitting, image optimization)
- [ ] Monitoring & error tracking
- [ ] Custom domain setup
- [ ] Backup & disaster recovery

---

## Success Definition

Blueprint Interativo succeeds when:

1. **Technical**: Site loads in < 2s, Lighthouse score > 90, 0 JavaScript errors
2. **User Experience**: Recruiter can understand Carlos's architecture approach in < 2 minutes
3. **Business**: > 70% of visitors complete the full journey (Hero → Blueprint → Chatbot)
4. **Engagement**: > 50% of visitors interact with ≥ 1 blueprint, > 30% use chatbot

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Gemini API rate limits | Medium | High | Implement caching, fallback responses |
| Poor Chatbot training data | Medium | Medium | Use structured curriculum data, test with specific queries |
| Mobile responsive issues | Low | High | Test early and often, use TailwindCSS breakpoints |
| Language context switching | Low | Medium | Store language preference in localStorage |

---

## Notes

- This is a **recruitment showcase**, not a full SaaS product. Focus on depth of 3-4 key projects rather than breadth.
- The **AI chatbot is a feature**, not the main focus. Primary value is visual blueprints.
- **Bilingual from day 1** is critical - PT attracts Brazilian opportunities, EN attracts international.
- All content should be **factual and verifiable** from the curriculum DOCX files.
