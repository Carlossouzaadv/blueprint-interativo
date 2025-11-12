# Blueprint Interativo - Project Technical Summary

Comprehensive technical documentation extracted from four production projects.

## 1. JustoAI V1 - Legal Process AI Assistant

### Tech Stack
- Backend: FastAPI (Python)
- Database: Supabase PostgreSQL
- Auth: JWT + Supabase Auth
- AI: Google Gemini API, OpenAI
- PDF: PyMuPDF, PDFMiner, PyPDF2
- Payments: Stripe
- Deployment: Railway

### Core Features
- Legal document upload & processing
- PDF analysis with AI
- Process type validation
- Report generation (PDF/Word)
- Stripe integration
- Metadata extraction

---

## 2. JustoAI V2 - Enterprise Legal SaaS

### Tech Stack
Frontend:
- Next.js 15.5.3 (App Router)
- React 19.1.0
- TypeScript 5.x
- Tailwind CSS 4 + Radix UI
- React Hook Form + Zod
- React Context + TanStack Query

Backend:
- Node.js 20+
- Next.js API Routes + Fastify
- Prisma ORM 6.16.1
- Bull + BullMQ (Redis)
- PostgreSQL (Supabase)
- Redis (Upstash)

Services:
- Google Gemini + Claude API
- JUDIT (Brazilian judicial API)
- Clerk + Supabase Auth
- Resend Email
- Sentry (error tracking)
- Vercel + Railway deployment

### Core Features
- Case Management CRUD
- Document Upload & Processing
- AI-Powered Analysis
- Real-time JUDIT Integration
- Report Generation (Excel/PDF/Word)
- Workspace Management
- Credit System
- Admin Dashboard
- Job Queue (Bull)
- Real-time Telemetry

---

## 3. Poker Grinder's Edge - Poker Analytics

### Tech Stack
Mobile (React Native):
- React Native + TypeScript
- React Navigation
- Zustand (state)
- NativeWind (styling)
- iOS + Android

Web (Next.js):
- Next.js 14+
- TypeScript
- React Context + Zustand
- Tailwind CSS

Backend (NestJS):
- NestJS + TypeScript
- PostgreSQL 14+ (Prisma)
- JWT Authentication
- class-validator
- Jest testing

### Core Features
Mobile:
- Bankroll Management
- GTO Helper
- Study Lab
- Hand Analysis
- Coach Marketplace

Web:
- Team Management
- Analytics Dashboard
- Coach Tools
- Bulk Data Import

Backend:
- Auth Module
- Sessions Management
- Hand History Processing
- User Management

### Architectural Patterns
- Strategy Pattern (poker site parsers)
- Repository Pattern (Prisma)
- Dependency Injection (NestJS)
- DTO Pattern (validation)
- Guard Pattern (auth/authorization)

---

## 4. Cérebro Jurídico - Legal AI Search Platform

### Tech Stack
Processing:
- PyMuPDF (fitz) - PDF extraction
- Pandas - DataFrames
- NumPy - Numerical ops
- tqdm - Progress UI
- psutil - Monitoring

NLP & Vector:
- Sentence Transformers (embeddings)
- ChromaDB (vector storage)
- Hybrid search (TF-IDF + semantic)

Web:
- FastAPI (backend)
- HTML5 + JavaScript (frontend)

### Pipeline Phases

Phase 1: PDF Cleaning (Complete)
- Input: 11,241 PDFs (~15GB)
- Output: Clean texts (~2GB)
- Metrics: 99% precision, 85-90% reduction

Phase 2: Metadata Extraction (Complete)
- Extract: Decision #, date, chamber, rapporteur, summary, votes, citations
- Success: >95%, Completeness: ~85%

Phase 3B: Semantic Chunking (Complete)
- 72,335 enriched chunks
- Hierarchical: Summaries (256), Votes (512), Segments (128-256)
- Format: JSONL

Phase 3C: Vector Search (In Progress)
- Model: paraphrase-multilingual-mpnet-base-v2
- Search types: TF-IDF + Semantic + Hybrid
- Response time: <1s

### Performance
- Speed: ~1s per PDF
- Extraction rate: >95%
- Quality score: ~85%
- Size reduction: 84-90%
- Total time: 3-4 hours (11,241 PDFs)

---

## Comparison Matrix

| Feature | JustoAI V1 | JustoAI V2 | Poker Grinder's | Cérebro Jurídico |
|---------|-----------|-----------|-----------------|------------------|
| Backend | FastAPI | Next.js API | NestJS | FastAPI |
| Frontend | API only | Next.js 15 | React Native+Next | HTML5+JS |
| Database | Supabase PG | PostgreSQL | PostgreSQL | File-based |
| AI/ML | Gemini | Gemini+Claude | None | Transformers |
| Key Feature | Doc Processing | Enterprise SaaS | Mobile Analytics | Semantic Search |
| Scale | 100s | 1000s | Mobile+Web | 11,241 docs |

---

## Key Technologies Overview

Languages: Python (V1, Cérebro), TypeScript/JS (V2, Poker Grinder's)

Databases:
- PostgreSQL: V1, V2, Poker Grinder's
- Supabase: V1, V2 (managed)
- Redis: V2 (Upstash)
- ChromaDB: Cérebro (vector)

Frameworks:
- Backend: FastAPI (Python), NestJS, Next.js API Routes
- Frontend: Next.js, React Native, HTML5+JS

AI/ML:
- LLMs: Google Gemini, Anthropic Claude
- Embeddings: Sentence Transformers
- Vector DB: ChromaDB
- Search: Hybrid TF-IDF + semantic

Libraries:
- PDF: PyMuPDF, pdf-parse, Puppeteer
- Queues: Bull, BullMQ
- ORM: Prisma, SQLAlchemy
- Validation: Pydantic, class-validator, Zod
- Auth: JWT, Clerk, Supabase Auth
- Testing: Jest, Pytest

---

## Architecture Patterns

1. Multi-tenant SaaS (JustoAI V2)
2. Strategy Pattern (Poker Grinder's parsers)
3. Repository Pattern (all ORMs)
4. Async Job Processing (Bull queues)
5. Pipeline Architecture (Cérebro linear flow)
6. Omnichannel (Poker Grinder's mobile+web+backend)

---

**Last Updated**: November 12, 2025
