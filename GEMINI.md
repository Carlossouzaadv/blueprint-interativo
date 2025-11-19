# GEMINI.md - Blueprint Interativo Context

## Project Overview
**Blueprint Interativo** is a Next.js 14+ portfolio website showcasing AI/SaaS architectural expertise.
- **Tech Stack**: Next.js 14+, TypeScript, TailwindCSS, Vercel, Google Gemini API.
- **Goal**: Interactive case studies + AI chatbot to impress CTOs/recruiters.

## Current Status (as of Nov 12, 2025)
**Overall Status**: Implementation Phase - Significantly Ahead of Schedule.
**Completion**: 5/7 Core Components Built (71% Implementation Ready).

### Completed Tasks
- [x] **TASK-001**: Next.js Project Setup (Config, Tailwind, TypeScript).
- [x] **TASK-002**: Data Structure (`lib/data.ts` with 4 projects).
- [x] **TASK-003**: Hero Component (`Hero.tsx` + i18n).
- [x] **TASK-004**: Blueprint Component (`Blueprint.tsx` - Stretch Goal).
- [x] **TASK-005**: RAG Chatbot Frontend (`RAGChatbot.tsx` - Stretch Goal).

### Next Immediate Task
- [ ] **TASK-006**: Build Chatbot Backend API (`/api/chat`).
  - Integration with Gemini API.
  - RAG implementation using curriculum data.
  - Replace mock data in `RAGChatbot.tsx`.

## Key Files
- **Context**: `CLAUDE.md` (Architecture, Commands).
- **Status**: `planning-docs/SESSION_STATE.md` (Detailed progress).
- **Data**: `src/lib/data.ts` (Project blueprints).
- **Components**: `src/components/` (Hero, Blueprint, RAGChatbot).

## Development Guidelines
- **Commands**: `npm run dev`, `npm run build`, `npm test`, `npm run check`.
- **Testing**: `test-analyst` agent validation required for major components.
- **Documentation**: Keep `planning-docs/` updated via `project-manager` agent (or manually if needed).

## Memory & Continuity
This file serves as a quick context loader for the Gemini agent to resume work immediately without re-reading all documentation every time.
