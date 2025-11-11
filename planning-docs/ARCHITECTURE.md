# Architecture Documentation - Blueprint Interativo

## System Overview

**Blueprint Interativo** is a serverless, single-page portfolio application built on Next.js that showcases solution architecture expertise through interactive case studies. The system consists of three integrated layers: (1) a React/TailwindCSS frontend with language switching and interactive blueprint cards, (2) a TypeScript data layer containing structured project blueprints, and (3) Next.js API routes that provide chatbot endpoints backed by Google Gemini API for RAG-based curriculum queries. The entire system is deployed on Vercel with automatic scaling, requiring no backend infrastructure management.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Next.js App Router (Page: / or /en, /pt)               │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐   │  │
│  │  │  Hero       │  │ Blueprints   │  │  Chatbot     │   │  │
│  │  │ Component   │  │ Component    │  │  Component   │   │  │
│  │  └─────────────┘  └──────────────┘  └──────────────┘   │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  Navigation / Language Switcher (PT/EN)          │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────┬──────────────────────────────────┬──────────────┘
                 │                                  │
        ┌────────▼─────────────┐        ┌──────────▼──────────┐
        │  Fetch Project Data  │        │  POST /api/chat     │
        │  From lib/data.ts    │        │  with message       │
        └────────┬─────────────┘        └──────────┬──────────┘
                 │                                  │
    ┌────────────▼──────────────┐    ┌─────────────▼──────────────┐
    │  Data Layer (TypeScript)  │    │  Backend: Next.js API      │
    │  ┌──────────────────────┐ │    │  ┌──────────────────────┐  │
    │  │ lib/data.ts          │ │    │  │ app/api/chat/route.ts│  │
    │  │ - JustoAI V1         │ │    │  │ - Parse request      │  │
    │  │ - JustoAI V2         │ │    │  │ - Call Gemini API    │  │
    │  │ - Poker Grinder's    │ │    │  │ - Return response    │  │
    │  │ - Cérebro Jurídico   │ │    │  └──────────────────────┘  │
    │  └──────────────────────┘ │    │          │                 │
    └────────────────────────────┘    └──────────┼─────────────────┘
                                                 │
                                   ┌─────────────▼──────────────┐
                                   │  External AI Service       │
                                   │  Google Gemini API         │
                                   │  (with RAG on Curriculum)  │
                                   └────────────────────────────┘
```

## Core Components

### Frontend Layer

**Technology**: Next.js 14+ (App Router), React 18+, TypeScript, TailwindCSS

**Responsibilities**:
- Render single page with smooth language switching (PT/EN)
- Display interactive project blueprint cards
- Manage chatbot UI and message streaming
- Handle responsive design (mobile/tablet/desktop)
- Track engagement (analytics events)

**Key Files**:
```
app/
├── layout.tsx                    # Root layout with language context
├── page.tsx                      # Main page (auto-detect language)
├── [lang]/
│   ├── page.tsx                 # Language-specific page
│   └── layout.tsx               # Language context provider
│
src/components/
├── Hero.tsx                      # [HeroComponent] - Professional intro
├── Blueprint.tsx                 # [BlueprintComponent] - Project cards
├── Chatbot.tsx                   # [RAGChatbotComponent] - Chat UI
├── Navigation.tsx                # Header + Language switcher
├── Footer.tsx                    # Links + Contact info
├── LanguageProvider.tsx          # Context for language switching
│
src/lib/
├── data.ts                       # Project blueprints (structured)
├── i18n.ts                       # Language constants & translations
└── utils.ts                      # Helper functions
```

**Component Responsibilities**:

#### [HeroComponent]
- Displays professional summary (Resumo Profissional)
- Shows: Name, Title, Key Stat (14+ years + AI Architect)
- CTA button: "Explore My Blueprints" / "Explore Architecture"
- Mobile responsive, accessibility optimized

#### [BlueprintComponent]
- Interactive cards for each project (JustoAI V1, V2, Poker Grinder's, Cérebro Jurídico)
- Each card shows:
  - **Challenge**: Business/legal problem
  - **Blueprint**: Tech stack diagram (Python/FastAPI, Node.js/NestJS, etc.)
  - **Decisions**: Why each technology choice
  - **Metrics**: Impact (EBITDA gain, scalability, cost optimization)
- Expandable/collapsible on mobile
- Click → Detailed view modal

#### [RAGChatbotComponent]
- Chat UI with message history
- User input box + Send button
- Real-time streaming of AI responses
- Message rendering with markdown support
- Accessibility: ARIA labels, keyboard navigation

#### Navigation
- Header with logo/title
- Language switcher dropdown (PT/EN)
- Preserves scroll position on language switch
- Mobile hamburger menu (optional)

### Data Layer

**Technology**: TypeScript, Static JSON/objects

**Responsibilities**:
- Define project blueprint schema
- Store all project information (Challenge, Blueprint, Decisions, Metrics)
- Provide typed data interface to components
- Support bilingual content (PT/EN)

**File Structure**:
```typescript
// src/lib/data.ts

export interface Project {
  id: string;                    // "justoai-v1", "poker-grinders", etc.
  title: { pt: string; en: string };
  challenge: {
    pt: string;
    en: string;
    painPoints: string[];
  };
  blueprint: {
    techStack: {
      backend: string;          // "Python/FastAPI" or "Node.js/NestJS"
      frontend: string;
      database: string;
      aiProvider: string;
    };
    architecture: string;        // ASCII diagram or description
    components: string[];
  };
  decisions: Array<{
    technology: string;
    whyChosen: { pt: string; en: string };
    tradeoffs: string[];
  }>;
  metrics: {
    ebitdaGain?: string;
    scalability: string;
    costOptimization: string;
    userBase?: string;
  };
  version?: string;              // For V1/V2 tracking
  relatedProjects?: string[];    // Link V1 to V2
}

export const projects: Project[] = [
  {
    id: "justoai-v1",
    title: { pt: "JustoAI V1", en: "JustoAI V1" },
    challenge: { ... },
    blueprint: { ... },
    decisions: [ ... ],
    metrics: { ... }
  },
  // ... more projects
];
```

**Data Population Strategy**:
- Extract from `/docs/source-data/Curriculum - PT/EN - Carlos Souza.docx`
- Structure as TypeScript objects for type safety
- Create PT/EN versions simultaneously
- Link related projects (V1 → V2 evolution)

### Backend/API Layer

**Technology**: Next.js API Routes, TypeScript, Google Gemini API

**Responsibilities**:
- Provide chatbot endpoint
- Handle RAG (Retrieval-Augmented Generation) queries
- Stream responses back to client
- Error handling & rate limiting

**Key Files**:
```
app/api/
├── chat/
│   └── route.ts                 # POST /api/chat endpoint
├── projects/
│   └── route.ts                 # GET /api/projects endpoint
└── health/
    └── route.ts                 # GET /api/health endpoint
```

#### `/api/chat` Endpoint
```typescript
// POST /api/chat
// Request: { message: string; history?: Message[] }
// Response: Server-Sent Events (SSE) or JSON { response: string }

async function POST(req: Request) {
  const { message } = await req.json();

  // 1. Retrieve relevant curriculum context (RAG)
  //    - Search embeddings of curriculum data
  //    - Get top 3 most relevant sections

  // 2. Build system prompt with context
  const systemPrompt = `You are an AI assistant trained on Carlos Souza's background...
  Relevant background: ${relevantContext}`;

  // 3. Call Gemini API
  const response = await gemini.generateContent({
    systemPrompt,
    messages: [{ role: "user", content: message }]
  });

  // 4. Stream response to client
  return new Response(response.stream());
}
```

#### `/api/projects` Endpoint
```typescript
// GET /api/projects?lang=pt
// Response: { projects: Project[] }

async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "en";

  return Response.json({
    projects: projects.map(p => ({
      id: p.id,
      title: p.title[lang as 'pt' | 'en'],
      // ... localized data
    }))
  });
}
```

#### Chatbot Training Data (RAG)
```typescript
// Data to embed & search for RAG

const curriculumEmbeddings = {
  "background": "14+ years as Senior Lawyer in Tax/Corporate...",
  "ai-expertise": "Google Gemini integration, RAG implementation...",
  "projects": "JustoAI (LegalTech SaaS), Poker Grinder's (FinTech)...",
  "achievements": "10% EBITDA increase, R$5M returns...",
  "technical-skills": "Python, Node.js, TypeScript, PostgreSQL..."
};

// When user asks: "What's your EBITDA improvement experience?"
// System retrieves: curriculumEmbeddings["achievements"]
// And provides in context to Gemini
```

## Design Patterns

### Pattern 1: Language Context Provider
**Where Used**: Root layout, all components
**Purpose**: Global language state management without Redux
**Implementation**: React Context API with localStorage persistence

```typescript
// src/components/LanguageProvider.tsx
const LanguageContext = createContext<{
  language: 'pt' | 'en';
  setLanguage: (lang: 'pt' | 'en') => void;
}>({ language: 'pt', setLanguage: () => {} });

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('pt');

  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved) setLanguage(saved as 'pt' | 'en');
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
```

### Pattern 2: Data-Driven Components
**Where Used**: BlueprintComponent
**Purpose**: Single component, multiple project instances
**Implementation**: Map over projects array, pass data as props

```typescript
export function Blueprints() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map(project => (
        <Blueprint key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### Pattern 3: Streaming Chat Responses
**Where Used**: Chatbot component
**Purpose**: Real-time user feedback during AI response generation
**Implementation**: ReadableStream from API, parsed with TextDecoder

```typescript
// Frontend
const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message }) });
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const text = decoder.decode(value);
  setMessages(prev => [...prev, { role: 'assistant', content: text }]);
}
```

## Data Flow

### Request Lifecycle (Chatbot)

1. **User Action**: Visitor types message in chatbot input box
2. **Frontend**: React component captures input, calls `setMessages()` to show "typing..." state
3. **API Request**: Fetch `POST /api/chat` with message + history
4. **Backend Processing**:
   - Parse request message
   - Retrieve curriculum embeddings (RAG search)
   - Build Gemini prompt with context
   - Stream response back
5. **Response Streaming**: ReadableStream returns tokens as they generate
6. **UI Update**: Each token updates message display in real-time
7. **Completion**: Message marked as complete, user can continue conversation

### Request Lifecycle (Blueprint Interaction)

1. **User Action**: Click on project card
2. **Frontend**: React state toggles `selectedProject`
3. **Modal/Expansion**: Details slide in or modal opens
4. **No API Call**: All data already in `lib/data.ts` (static)
5. **Analytics**: Optional event tracking (visit blueprint, time spent)

### State Management

| State | Location | Purpose | Persistence |
|-------|----------|---------|-------------|
| **Language** | Context API | Current language (PT/EN) | localStorage |
| **Chat Messages** | Component State | Chatbot conversation history | sessionStorage (optional) |
| **Selected Blueprint** | Component State | Which project is expanded | None (UI only) |
| **User Theme** | localStorage | Dark/Light mode (future) | localStorage |

## Security Architecture

### Frontend Security
- **XSS Prevention**: React auto-escapes JSX content
- **CSP Headers**: Set via next.config.js or Vercel settings
- **HTTPS**: Enforced by Vercel (automatic)
- **Dependency Scanning**: Dependabot via GitHub

### Backend Security
- **API Key Storage**: Gemini API key in `NEXT_PUBLIC_GEMINI_API_KEY` (safe - read-only operations)
- **Rate Limiting**: Implement via Vercel Rate Limiting or middleware
- **Input Validation**: Sanitize chatbot input before sending to Gemini
- **CORS**: Allow only same-origin requests (default Next.js behavior)

### Data Security
- **No Sensitive Data**: No passwords, no database, no user tracking data
- **Curriculum Data**: Public information from resume (curriculum.docx)
- **No Cookies**: Minimal tracking, language preference in localStorage only

## Performance Considerations

### Caching Strategy

| Layer | Cache Type | TTL | Content |
|-------|-----------|-----|---------|
| **Browser** | Service Worker | 24h | Static assets (CSS, JS, fonts) |
| **Browser** | localStorage | Infinite | Language preference |
| **Vercel** | CDN | 60m | HTML pages, API responses |
| **Vercel** | Function Cache | 5m | Gemini API responses (if identical query) |

### Optimization Points

1. **Code Splitting**: Lazy load blueprint modals
2. **Image Optimization**: Use Next.js `<Image />` component
3. **Bundle Size**: Keep TailwindCSS tree-shaked (PurgeCSS)
4. **SSR**: Next.js pre-renders pages (static generation)
5. **API Response Compression**: gzip by default on Vercel
6. **Font Loading**: Self-host or use system fonts (no Google Fonts for speed)

### Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| **Lighthouse Score** | > 90 | PageSpeed Insights |
| **First Contentful Paint (FCP)** | < 1.5s | WebVitals |
| **Largest Contentful Paint (LCP)** | < 2.5s | WebVitals |
| **Cumulative Layout Shift (CLS)** | < 0.1 | WebVitals |
| **Time to Interactive (TTI)** | < 3.5s | Lighthouse |

## Scalability Plan

### Horizontal Scaling
- **Load Balancing**: Vercel handles auto-scaling (multi-region deployment)
- **Session Management**: No server-side sessions needed (stateless API)
- **API Calls**: Gemini API handles rate limiting & throttling

### Vertical Scaling
- **Resource Limits**: No limits (serverless)
- **Growth Path**:
  - Phase 1: < 1,000 monthly visitors (current)
  - Phase 2: < 10,000 monthly (add caching)
  - Phase 3: > 10,000 monthly (add CDN edge caching)

### Cost Optimization
- **Vercel Hobby Plan**: $0/month for portfolio use
- **Gemini API**: Pay-as-you-go (free tier available)
- **No Database**: Eliminates database hosting costs
- **Estimated Cost**: < $10/month for Gemini API (low chat volume)

## External Integrations

### Service: Google Gemini API
**Purpose**: AI chatbot responses, curriculum-based RAG

**Authentication**: API Key in environment variable
```
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

**Endpoints Used**:
- `generateContent()` - Main LLM endpoint
- `embedContent()` - Optional for custom embeddings (future)

**Rate Limits**:
- Free Tier: 60 requests/minute
- Paid Tier: Higher limits (if needed)

**Fallback Strategy**:
- If API fails: Show static response from FAQ
- Error logging to console (no external service)

### Service: Vercel Deployment
**Purpose**: Hosting, auto-scaling, CI/CD

**Configuration**:
- Git integration (auto-deploy on push to main)
- Environment variables in Vercel dashboard
- Analytics integration (optional)

## Development Guidelines

### Code Organization
```
blueprint-interativo/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main page
│   ├── [lang]/                # Language-specific routes
│   │   ├── page.tsx           # Localized page
│   │   └── layout.tsx         # Language provider
│   └── api/                   # API routes
│       ├── chat/route.ts      # Chatbot endpoint
│       ├── projects/route.ts  # Projects endpoint
│       └── health/route.ts    # Health check
│
├── src/
│   ├── components/            # React components
│   │   ├── Hero.tsx
│   │   ├── Blueprint.tsx
│   │   ├── Chatbot.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageProvider.tsx
│   ├── lib/
│   │   ├── data.ts            # Project blueprints
│   │   ├── i18n.ts            # Language constants
│   │   └── utils.ts           # Helper functions
│   └── styles/
│       └── globals.css        # Global TailwindCSS
│
├── public/                    # Static assets
│   ├── images/
│   └── icons/
│
├── tests/                     # Test files
│   ├── components/
│   ├── api/
│   └── utils/
│
└── docs/                      # Documentation
    └── source-data/           # Curriculum DOCX files
```

### Naming Conventions
- **Components**: PascalCase (`Hero.tsx`, `Blueprint.tsx`)
- **Functions**: camelCase (`fetchProjects()`, `translateText()`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_MESSAGE_LENGTH = 1000`)
- **Files**: kebab-case (`language-provider.tsx`) or PascalCase for components

### Import Organization
```typescript
// 1. React & Next.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { clsx } from 'clsx';

// 3. Internal components
import { Hero } from '@/components/Hero';

// 4. Internal utilities
import { getProjectById } from '@/lib/utils';
import { projects } from '@/lib/data';
```

## Testing Strategy

### Unit Tests
- **Components**: Snapshot + props testing
  - Does Hero render correctly?
  - Does Blueprint card expand/collapse?
  - Does language switcher change language?
- **Data**: Schema validation
  - Are all projects properly structured?
  - Do projects have all required fields?
- **i18n**: Translation completeness
  - Are all PT translations present?
  - Are all EN translations present?

### Integration Tests
- **API Routes**: Request/response testing
  - Does `/api/chat` accept valid input?
  - Does `/api/projects?lang=pt` return Portuguese?
- **Component Integration**: Parent-child communication
  - Does language change propagate to all components?
  - Does selecting a blueprint update the UI?

### E2E Tests
- **User Journeys**:
  - Visitor lands → Sees hero → Clicks blueprint → Reads details
  - Visitor switches language → Content updates
  - Visitor opens chatbot → Types message → Gets response

### Test Coverage Targets
- **Components**: > 80% coverage
- **API Routes**: 100% coverage
- **Utilities**: > 90% coverage
- **E2E**: All critical user paths

## Deployment Architecture

### Environments

| Environment | URL | Purpose | Auto-Deploy |
|-------------|-----|---------|-------------|
| **Development** | localhost:3000 | Local testing | N/A |
| **Preview** | blueprint-*.vercel.app | PR previews | Yes (on PR) |
| **Staging** | staging.blueprint.vercel.app | Pre-production | Manual |
| **Production** | blueprint-interativo.vercel.app | Live site | Yes (on main) |

### CI/CD Pipeline

1. **Code Commit** → Push to GitHub (main branch)
2. **GitHub Actions**: Run tests & linting (if configured)
3. **Vercel Deployment**: Auto-build & deploy
4. **Health Check**: `/api/health` endpoint verification
5. **Production Live**: Site updated within 2-3 minutes

### Deployment Checklist

- [ ] All tests passing
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Language switching works (PT/EN)
- [ ] Chatbot responds to test queries
- [ ] Analytics tracking (if enabled)
- [ ] Environment variables set in Vercel

## Monitoring & Logging

### Metrics Tracked

| Metric | Tool | Purpose |
|--------|------|---------|
| **Page Load Time** | Vercel Analytics | Performance monitoring |
| **API Response Time** | Custom logging | Chatbot latency |
| **Error Rate** | Sentry (optional) | Error tracking |
| **User Engagement** | Google Analytics (optional) | Visitor behavior |
| **Uptime** | Vercel Uptime Monitoring | Service availability |

### Log Levels

- **ERROR**: API failures, crash errors
  - Example: "Gemini API returned 429 (rate limit)"
- **WARN**: Unexpected behavior, missing data
  - Example: "Project blueprint missing metrics field"
- **INFO**: Important events, deployments
  - Example: "Site deployed v1.0.0"
- **DEBUG**: Development details, variable values
  - Example: "Language context updated to 'pt'"

### Monitoring Alerts

- Page load time > 3s: Warning
- Error rate > 1%: Alert
- API downtime > 5 min: Critical alert
- Chatbot accuracy low: Manual review needed
