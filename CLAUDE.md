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
7. Commit with conventional commits (feat/fix/chore/docs)
8. Push and create pull request to main

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
