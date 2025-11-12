# CLAUDE.md - Blueprint Interativo

A one-page interactive portfolio website built with **Next.js 14+**, **TypeScript**, and **TailwindCSS**. The project showcases AI/SaaS architectural expertise through interactive project blueprints and an AI-powered chatbot assistant.

## Quick Project Context

**Blueprint Interativo** demonstrates solution architecture capabilities by presenting three case studies (JustoAI V1/V2, Poker Grinder's Edge, Cérebro Jurídico) as interactive architecture blueprints, targeted at CTOs, tech recruiters, and product leaders.

## Common Development Commands

### Building and Running
```bash
# Install dependencies
npm install

# Start development server (Next.js)
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Run with Docker (optional)
docker-compose up
```

### Testing
```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests (if needed)
npm run test:integration

# Run E2E tests (with Playwright/Cypress)
npm run test:e2e

# Generate coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Run TypeScript type checking
npm run typecheck

# Format with Prettier
npm run format

# Run all checks (lint + typecheck + format)
npm run check
```

## Architecture Overview

### Frontend Architecture
```
Browser → Next.js App Router → React Components (TailwindCSS) → API Routes
            ↓                          ↓                          ↓
         Pages                    [HeroComponent]          AI Chatbot Backend
         Layouts              [BlueprintComponent]        RAG/Gemini API
         Components              [ChatbotComponent]
```

### Core Components (To Be Built)

1. **Frontend Layer** (`app/` & `src/components/`)
   - **[HeroComponent]**: Hero section with professional summary (PT/EN)
   - **[BlueprintComponent]**: Interactive project blueprint cards (JustoAI, Poker Grinder's Edge, Cérebro Jurídico)
   - **[RAGChatbotComponent]**: AI assistant chatbot trained on curriculum data
   - Navigation: Language switcher (PT/EN), mobile responsive
   - Footer: Contact, links, social profiles

2. **Backend/API Layer** (`app/api/`)
   - AI Chatbot endpoint: `/api/chat` - Handles RAG queries
   - Project data endpoint: `/api/projects` - Serves blueprint data from `/lib/data.ts`
   - Health check: `/api/health`

3. **Data Layer** (`lib/`)
   - `lib/data.ts`: Project blueprints (structured data for JustoAI V1/V2, Poker Grinder's Edge, Cérebro Jurídico)
   - Project schema: { challenge, blueprint, decisions, metrics }

### Technology Stack
- **Frontend**: Next.js 14+ (App Router), React 18+, TypeScript
- **Styling**: TailwindCSS + Headless UI
- **State Management**: React Context API (minimal state)
- **Data**: TypeScript data structures (`lib/data.ts`)
- **AI Chatbot Backend**: Next.js API Routes + Python/FastAPI (or Node.js/Express microservice)
- **Deployment**: Vercel (optimized for Next.js)
- **Chatbot AI**: Google Gemini API with RAG capabilities

## Development Workflow

1. Create feature branch from `main`
2. Develop components (Hero, Blueprints, Chatbot UI)
3. Populate data in `lib/data.ts` with project blueprints
4. Test responsive design (mobile/desktop)
5. Run `npm run check` to verify all checks pass
6. Test locally with `npm run dev` in both PT/EN
7. **Prepare commit message** (see "Git Commit Protocol" below)
8. Push and create pull request to main

---

## Git Commit Protocol

**CRITICAL RULE**: Claude NEVER makes commits autonomously. This is a human decision.

### What Claude Does
- Writes and tests code
- Stages files (`git add`)
- **PREPARES commit message** (presents it to you)
- **WAITS for your approval** before committing

### What YOU (Carlos) Do
- Review the code changes
- Review the proposed commit message
- Make the actual `git commit` yourself
- `git push` when ready

### Why This Rule Exists
- **Intentionality**: Commits should reflect YOUR decisions about project progress
- **Accountability**: You maintain commit history ownership
- **Quality Gate**: You decide what's worth committing vs what needs refinement
- **Trust**: Never automate decisions that have human/business implications

### Example Flow

```
Claude:  "I've created src/components/Hero.tsx and updated src/lib/data.ts"
Claude:  "Here's the proposed commit message:"
Claude:
         feat: Build Hero component with bilingual support

         - Create Hero.tsx with professional summary display
         - Support PT/EN language switching
         - Mobile responsive design (TailwindCSS)
         - Accessibility: WCAG 2.1 AA compliant
         - CTA button: "Explore My Blueprints"

         Fixes TASK-003 requirements. Component validated
         and production-ready.

Claude:  "Ready to commit when you are. Run the command below when approved:"
Claude:  "git commit -m \"feat: Build Hero component with bilingual support\n\n...\""

YOU:     [Review changes]
YOU:     [Review commit message]
YOU:     [Run git commit]
YOU:     [Run git push]
```

### When Files Are Staged

If Claude stages files with `git add`:
- Changes are ready for your review
- You can run `git status` to see what's staged
- You decide if it's worth committing (may ask Claude to make changes first)
- You run the commit command yourself

**Never** will Claude do:
```bash
git commit -m "..."  # ❌ NEVER
git push             # ❌ NEVER
```

---

## Specialized Agent Coordination Protocol

**IMPORTANT**: This project uses specialized Claude agents to maintain quality and workflow consistency. After completing major milestones, specific agents MUST be invoked to do their designated work. This ensures proper code validation, testing, and documentation updates.

### When to Invoke Agents

After completing any of these major milestones, **IMMEDIATELY invoke the agents below** (in order):

| Milestone | Triggers | Agents to Call |
|-----------|----------|-----------------|
| New component created | `src/components/*.tsx` file added/modified | `test-analyst` → `project-manager` |
| Data structure created/modified | `src/lib/data.ts` file added/modified | `test-analyst` → `project-manager` |
| New API route created | `app/api/**` file added | `test-analyst` → `project-manager` |
| Task completion (TASK-00X) | Any daily task marked COMPLETED | `test-analyst` → `project-manager` |
| Feature complete | Feature branch ready for PR | `test-analyst` → `project-manager` |

### Agent Responsibilities

#### 1. **test-analyst Agent**
**Purpose**: Validate code quality, create tests, identify issues

**Invoke When**: New code is created or modified (components, data layers, API routes)

**Responsibilities**:
- Validate TypeScript types and interfaces
- Check bilingual content (PT/EN) completeness
- Verify all required fields are present
- Test helper functions and exports
- Identify potential issues or edge cases
- Create comprehensive test suite (Jest/Vitest)
- Generate validation reports
- Ensure code is "PRODUCTION READY" before proceeding

**What NOT to do**: Don't update planning docs or make git commits (not their job)

**Example Invocation**:
```
Task: test-analyst agent
Description: Validate and test new data.ts structure
Prompt: [Detailed requirements for code to test]
```

#### 2. **project-manager Agent**
**Purpose**: Update planning documentation, track progress, make recommendations

**Invoke When**: Major tasks complete or status changes

**Responsibilities**:
- Update `planning-docs/DAILY_BACKLOG.md`
  - Mark tasks as COMPLETED with actual time spent
  - Update time budget and remaining hours
  - Document success criteria status
  - Add completion notes
- Update `planning-docs/SESSION_STATE.md`
  - Update "Current Task" section
  - Update "Progress" and "Milestones"
  - Update implementation readiness percentage
  - Update session metadata (time spent, completion rate)
  - Update overall status at bottom
- Maintain proper markdown formatting
- Make strategic recommendations for next steps

**What NOT to do**: Don't write code, don't make code changes

**Example Invocation**:
```
Task: project-manager agent
Description: Update planning docs after task completion
Prompt: [Details about what task was completed]
```

### Correct Workflow Pattern

**❌ WRONG - Don't Do This**:
```
1. Create component
2. Run typecheck locally
3. Manually update DAILY_BACKLOG.md ← WRONG! This is project-manager's job
4. Manually add entry to SESSION_STATE.md ← WRONG! This is project-manager's job
5. Move to next task
```

**✅ CORRECT - Do This**:
```
1. Create component
2. Run typecheck locally
3. Invoke test-analyst agent → Gets validation, test suite, quality report
4. Invoke project-manager agent → Gets docs updated automatically
5. Review reports and recommendations
6. Move to next task
```

### Why This Structure Exists

This project requires **high-quality, well-documented code** because:
- **Recruitment Tool**: Code showcases architectural thinking to CTOs/recruiters
- **Bilingual Complexity**: PT/EN content must be 100% synchronized
- **Multi-component Coordination**: Hero, Blueprint, Chatbot need to integrate seamlessly
- **Planning Continuity**: Docs must accurately track progress for future sessions

By dividing work between specialized agents:
- **Quality Stays High**: test-analyst ensures code meets production standards
- **Docs Stay Current**: project-manager keeps planning docs in sync with reality
- **Consistency Maintained**: Both agent types prevent human error/forgetfulness
- **Future Proof**: Even without context, agents know their responsibilities

### Implementation Checklist

Use this checklist when completing major work:

- [ ] Code is written and locally tested
- [ ] `npm run check` passes (no lint/type errors)
- [ ] Task is logically complete
- [ ] **INVOKE test-analyst**: "Validate [component/data/API] for production readiness"
  - Wait for report
  - Review any identified issues
  - Fix critical issues if needed
  - Get approval: "Production Ready ✓"
- [ ] **INVOKE project-manager**: "Update planning docs after [task name] completion"
  - Wait for update confirmation
  - Verify docs are current
- [ ] Proceed to next task

### Communication

When invoking agents, be explicit about:
1. **What was completed**: "TASK-002: Create Data Structure (lib/data.ts)"
2. **What to validate/document**: "[Specific files, features, metrics]"
3. **Success criteria**: "[What defines success for this milestone]"
4. **Expected deliverables**: "[Reports, tests, doc updates, recommendations]"

---

## No-Nonsense Rule

**If a major code milestone is completed WITHOUT invoking the corresponding agents, that's a process failure.** This section exists to prevent that. Future Claude instances reading this must understand: agents exist to maintain standards, and they MUST be used.

## Configuration

### Environment Variables
```bash
# Required (Frontend)
NEXT_PUBLIC_APP_NAME=Blueprint Interativo
NEXT_PUBLIC_AUTHOR=Carlos Souza

# Required (AI Chatbot)
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
NEXT_PUBLIC_CHATBOT_ENABLED=true

# Optional
NEXT_PUBLIC_GA_ID=your_ga_id  # Google Analytics
NODE_ENV=development|production
```

### Configuration Files
- `package.json`: Dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `next.config.js`: Next.js build configuration
- `tailwind.config.ts`: TailwindCSS theme
- `.eslintrc.json`: ESLint rules
- `.prettierrc`: Code formatting (Prettier)

## Important Files and Locations

### Next.js Structure
- **App**: `app/` directory (App Router)
- **Pages**: `app/(pages)/page.tsx`, `app/layout.tsx`
- **Components**: `src/components/` (reusable UI components)
- **Data**: `src/lib/data.ts` (project blueprints)
- **API Routes**: `app/api/` (backend endpoints)
- **Styles**: `src/styles/globals.css` (global TailwindCSS)
- **Public Assets**: `public/` (images, icons, PDFs)
- **Tests**: `tests/` or `__tests__/` (Jest/Vitest)

### Key Component Files (To Build)
- `src/components/Hero.tsx` - [HeroComponent]
- `src/components/Blueprint.tsx` - [BlueprintComponent]
- `src/components/Chatbot.tsx` - [RAGChatbotComponent]
- `src/components/Navigation.tsx` - Header with language switcher
- `src/lib/data.ts` - Project data structure

## Build & Deployment

### Local Development
```bash
npm run dev  # Runs on http://localhost:3000
```

### Production Build
```bash
npm run build  # Creates optimized build
npm run start  # Serves production build locally
```

### Deployment to Vercel
```bash
# Connected via git - automatic deployment on push to main
vercel deploy
```

## Internationalization (i18n)

**Current Approach**: Static PT/EN pages with TypeScript language constants
- **PT**: Portuguese (Brazil) - default for visitors from Brazil
- **EN**: English - for international recruiters/stakeholders

**Files**:
- `src/lib/i18n.ts` - Language constants and translations
- `src/lib/data.ts` - Bilingual project data

## Testing Strategy

### Unit Tests
- Component snapshot tests (Hero, Blueprint, Chatbot)
- Data transformation tests
- i18n tests

### Integration Tests
- API route tests (chatbot endpoint)
- Component integration (parent-child communication)

### E2E Tests
- Full user journeys (hero → blueprint → chatbot)
- Language switching
- Responsive behavior

## AI Chatbot Architecture

### Frontend (Next.js Component)
- [RAGChatbotComponent]: Interactive chat UI in TailwindCSS
- Message history management
- Real-time streaming responses (optional)

### Backend Options (Choose One)
1. **Option A: Next.js API Routes** (Simpler)
   - Endpoint: `app/api/chat/route.ts`
   - Direct Gemini API calls via `@google/generative-ai`
   - RAG implementation via curriculum embeddings

2. **Option B: Separate FastAPI Service** (Scalable)
   - Python FastAPI backend for RAG/LLM complexity
   - Docker deployment alongside Next.js

3. **Option C: Vercel AI SDK** (Recommended)
   - `vercel/ai` package - Gemini integration
   - Streaming support built-in
   - Simpler setup

## Performance Targets
- **Response Time**: < 2 seconds for initial page load
- **Chatbot Response**: < 3 seconds for RAG queries
- **Mobile Score**: > 90 (Lighthouse)
- **Accessibility**: WCAG 2.1 AA minimum
- **SEO**: Fully indexed, schema markup for portfolio
