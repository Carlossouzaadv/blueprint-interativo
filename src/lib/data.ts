/**
 * Project Blueprints Data
 *
 * Bilingual (PT/EN) structured data for architecture blueprints
 * showcasing case studies: JustoAI V1/V2, Poker Grinder's Edge, Cérebro Jurídico
 */

/**
 * Bilingual Text Type
 * Supports both Portuguese (PT) and English (EN) content
 */
export interface BilingualText {
  pt: string;
  en: string;
}

/**
 * Project Challenge Section
 * Describes the problem statement and what was being solved
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Challenge extends BilingualText {}

/**
 * Project Blueprint Section
 * Describes the architectural solution and technology stack
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Blueprint extends BilingualText {}

/**
 * Project Decisions Section
 * Documents key technical and strategic decisions
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Decisions extends BilingualText {}

/**
 * Project Metrics Section
 * Showcases results, impact, and key performance indicators
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Metrics extends BilingualText {}

/**
 * Technology Used in Project
 */
export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'devops' | 'other';
  role?: string; // Brief description of how it's used (e.g., "State management", "ORM")
}

/**
 * Project Blueprint Data Structure
 * Complete architecture case study with challenge, solution, decisions, and metrics
 */
export interface ProjectBlueprint {
  id: string;
  slug: string;
  title: BilingualText;
  description: BilingualText;
  status: 'production' | 'staging' | 'poc' | 'maintenance';
  challenge: Challenge;
  blueprint: Blueprint;
  decisions: Decisions;
  metrics: Metrics;
  technologies: Technology[];
  year?: number;
  position?: number; // Display order on portfolio
}

/**
 * Projects Data - 4 Case Studies
 *
 * Each project follows the structure:
 * - Challenge: The problem to solve
 * - Blueprint: The architectural solution
 * - Decisions: Key technical decisions
 * - Metrics: Results and impact
 */
export const projects: ProjectBlueprint[] = [
  {
    id: 'justoai-v1',
    slug: 'justoai-v1',
    title: {
      pt: 'JustoAI (V1)',
      en: 'JustoAI (V1)',
    },
    description: {
      pt: 'MVP de validação para automação de análise de documentos jurídicos com IA',
      en: 'MVP validation for legal document analysis automation using AI',
    },
    status: 'maintenance',
    challenge: {
      pt: 'Validar a automação da análise de documentos jurídicos com IA. O problema era substituir a análise manual demorada por um processo automatizado.',
      en: 'Validate the automation of legal document analysis using AI. The problem was replacing time-consuming manual analysis with an automated process.',
    },
    blueprint: {
      pt: 'MVP (V1) focado na validação. Stack: Python (FastAPI) para o back-end e Next.js para o front-end.',
      en: 'MVP (V1) focused on validation. Stack: Python (FastAPI) for the backend and Next.js for the frontend.',
    },
    decisions: {
      pt: 'Escolha do Python/FastAPI pela sua força em prototipagem rápida de IA e integração com bibliotecas de ML.',
      en: 'Chose Python/FastAPI for its strength in rapid AI prototyping and ML library integration.',
    },
    metrics: {
      pt: 'Validação do MVP concluída, provando a viabilidade da automação.',
      en: 'MVP validation completed, proving the viability of automation.',
    },
    technologies: [
      { name: 'Python', category: 'backend', role: 'Core language' },
      { name: 'FastAPI', category: 'backend', role: 'REST API framework' },
      { name: 'Next.js', category: 'frontend', role: 'Frontend framework' },
      { name: 'Gemini AI', category: 'ai', role: 'Legal document analysis' },
      { name: 'PostgreSQL', category: 'database', role: 'Data persistence' },
      { name: 'Supabase', category: 'database', role: 'Managed PostgreSQL' },
    ],
    year: 2023,
    position: 1,
  },
  {
    id: 'justoai-v2',
    slug: 'justoai-v2',
    title: {
      pt: 'JustoAI (V2)',
      en: 'JustoAI (V2)',
    },
    description: {
      pt: 'Escalabilidade SaaS com otimização I/O e integrações de APIs externas',
      en: 'SaaS scalability with I/O optimization and external API integrations',
    },
    status: 'production',
    challenge: {
      pt: 'Escalar o produto após a validação do MVP. Era preciso otimizar I/O (operações de entrada/saída) e permitir integrações com APIs externas (como a JUDIT).',
      en: 'Scale the product after MVP validation. Needed to optimize I/O and allow integrations with external APIs (like JUDIT).',
    },
    blueprint: {
      pt: 'Evolução da arquitetura (V2) para um sistema escalável. Stack: Node.js (TypeScript) com BullMQ/Redis para gerenciamento de filas e otimização de I/O.',
      en: 'Architecture evolution (V2) for a scalable system. Stack: Node.js (TypeScript) with BullMQ/Redis for queue management and I/O optimization.',
    },
    decisions: {
      pt: 'Decisão estratégica de migrar de Python para Node.js/TypeScript para melhor performance em operações I/O-bound (comunicação com APIs, uploads) e escalabilidade.',
      en: 'Strategic decision to migrate from Python to Node.js/TypeScript for better performance in I/O-bound operations (API calls, uploads) and scalability.',
    },
    metrics: {
      pt: 'Arquitetura pronta para escalar, otimização de custos de API de IA e viabilização do modelo de receita SaaS.',
      en: 'Architecture ready to scale, optimization of AI API costs, and enabling the SaaS revenue model.',
    },
    technologies: [
      { name: 'Node.js', category: 'backend', role: 'Runtime' },
      { name: 'TypeScript', category: 'backend', role: 'Type safety' },
      { name: 'Next.js', category: 'frontend', role: 'Full-stack framework' },
      { name: 'React', category: 'frontend', role: 'UI library' },
      { name: 'Prisma ORM', category: 'backend', role: 'Database access layer' },
      { name: 'PostgreSQL', category: 'database', role: 'Main database' },
      { name: 'Supabase', category: 'database', role: 'Managed PostgreSQL' },
      { name: 'Redis', category: 'database', role: 'Caching and queues' },
      { name: 'Upstash', category: 'devops', role: 'Managed Redis' },
      { name: 'BullMQ', category: 'backend', role: 'Job queue system' },
      { name: 'Bull', category: 'backend', role: 'Task scheduling' },
      { name: 'Google Gemini', category: 'ai', role: 'AI analysis' },
      { name: 'Anthropic Claude', category: 'ai', role: 'AI analysis' },
      { name: 'Clerk', category: 'backend', role: 'Authentication' },
      { name: 'Sentry', category: 'devops', role: 'Error tracking' },
      { name: 'JUDIT API', category: 'other', role: 'Legal integration' },
      { name: 'Stripe', category: 'other', role: 'Payments' },
    ],
    year: 2024,
    position: 2,
  },
  {
    id: 'poker-grinders-edge',
    slug: 'poker-grinders-edge',
    title: {
      pt: "Poker Grinder's Edge",
      en: "Poker Grinder's Edge",
    },
    description: {
      pt: 'Ecossistema SaaS multi-plataforma com integridade financeira garantida',
      en: 'Multi-platform SaaS ecosystem with guaranteed financial integrity',
    },
    status: 'production',
    challenge: {
      pt: 'Garantir 100% de integridade financeira e realizar parsing de dados complexos (históricos de mãos de poker).',
      en: 'Ensure 100% financial integrity and parse complex data (poker hand histories).',
    },
    blueprint: {
      pt: 'Ecossistema SaaS Multi-plataforma (Web/Mobile). Stack: NestJS (Back-end), React Native (Mobile) e Next.js (Web).',
      en: 'Multi-platform SaaS Ecosystem (Web/Mobile). Stack: NestJS (Backend), React Native (Mobile), and Next.js (Web).',
    },
    decisions: {
      pt: "Implementação do 'Strategy Pattern' para o parsing de dados complexos. Criação de 'Guards Matemáticos' para garantir a integridade financeira.",
      en: "Implementation of the 'Strategy Pattern' for complex data parsing. Creation of 'Math Guards' to ensure financial integrity.",
    },
    metrics: {
      pt: 'Sistema com 100% de integridade financeira, focado em robustez e escalabilidade.',
      en: 'System with 100% financial integrity, focused on robustness and scalability.',
    },
    technologies: [
      { name: 'NestJS', category: 'backend', role: 'Backend framework' },
      { name: 'TypeScript', category: 'backend', role: 'Type safety' },
      { name: 'Next.js', category: 'frontend', role: 'Web framework' },
      { name: 'React', category: 'frontend', role: 'Web UI' },
      { name: 'React Native', category: 'frontend', role: 'Mobile app' },
      { name: 'PostgreSQL', category: 'database', role: 'Data persistence' },
      { name: 'Prisma ORM', category: 'backend', role: 'Database access' },
      { name: 'Strategy Pattern', category: 'backend', role: 'Hand parsing' },
      { name: 'Math Guards', category: 'backend', role: 'Financial integrity' },
      { name: 'Tailwind CSS', category: 'frontend', role: 'Styling' },
      { name: 'Radix UI', category: 'frontend', role: 'Component library' },
      { name: 'Zustand', category: 'frontend', role: 'State management' },
    ],
    year: 2024,
    position: 3,
  },
  {
    id: 'cerebro-juridico',
    slug: 'cerebro-juridico',
    title: {
      pt: 'Cérebro Jurídico',
      en: 'Cérebro Jurídico',
    },
    description: {
      pt: 'RAG (Retrieval-Augmented Generation) para buscas semânticas em documentos jurídicos',
      en: 'RAG (Retrieval-Augmented Generation) for semantic search in legal documents',
    },
    status: 'poc',
    challenge: {
      pt: 'Permitir consulta semântica (baseada em significado, não palavra-chave) em grandes bases de documentos jurídicos.',
      en: 'Enable semantic search (based on meaning, not keywords) across large legal document bases.',
    },
    blueprint: {
      pt: 'Protótipo de RAG (Retrieval-Augmented Generation). Stack: Streamlit (UI), FAISS (Vector DB) e Gemini AI (LLM).',
      en: 'RAG (Retrieval-Augmented Generation) prototype. Stack: Streamlit (UI), FAISS (Vector DB), and Gemini AI (LLM).',
    },
    decisions: {
      pt: 'Uso de RAG para aplicar técnicas avançadas de IA, combinando busca vetorial (FAISS) com a capacidade de geração de linguagem (Gemini).',
      en: 'Use of RAG to apply advanced AI techniques, combining vector search (FAISS) with language generation (Gemini).',
    },
    metrics: {
      pt: 'Prova de Conceito (PoC) desenvolvida com sucesso, validando a consulta semântica. 11.241 decisões judiciais processadas, 72.335 chunks semânticos.',
      en: 'Proof of Concept (PoC) successfully developed, validating semantic search. 11,241 court decisions processed, 72,335 semantic chunks.',
    },
    technologies: [
      { name: 'Python', category: 'backend', role: 'Core language' },
      { name: 'FastAPI', category: 'backend', role: 'API framework' },
      { name: 'Streamlit', category: 'frontend', role: 'Web UI' },
      { name: 'ChromaDB', category: 'database', role: 'Vector database' },
      { name: 'FAISS', category: 'ai', role: 'Vector search' },
      { name: 'Google Gemini', category: 'ai', role: 'LLM for generation' },
      { name: 'Sentence Transformers', category: 'ai', role: 'Embeddings' },
      { name: 'RAG Pattern', category: 'ai', role: 'Architecture pattern' },
      { name: 'PDF Processing', category: 'backend', role: 'Document parsing' },
      { name: 'TF-IDF', category: 'ai', role: 'Hybrid search' },
    ],
    year: 2024,
    position: 4,
  },
];

/**
 * Helper function to get all projects
 */
export function getAllProjects(): ProjectBlueprint[] {
  return projects.sort((a, b) => (a.position || 0) - (b.position || 0));
}

/**
 * Helper function to get a project by ID
 */
export function getProjectById(id: string): ProjectBlueprint | undefined {
  return projects.find(project => project.id === id);
}

/**
 * Helper function to get a project by slug
 */
export function getProjectBySlug(slug: string): ProjectBlueprint | undefined {
  return projects.find(project => project.slug === slug);
}

/**
 * Helper function to filter projects by status
 */
export function getProjectsByStatus(status: ProjectBlueprint['status']): ProjectBlueprint[] {
  return projects.filter(project => project.status === status);
}

/**
 * Helper function to get all unique technologies used
 */
export function getAllTechnologies(): Technology[] {
  const techMap = new Map<string, Technology>();

  projects.forEach(project => {
    project.technologies.forEach(tech => {
      if (!techMap.has(tech.name)) {
        techMap.set(tech.name, tech);
      }
    });
  });

  return Array.from(techMap.values());
}

/**
 * Helper function to get technologies by category
 */
export function getTechnologiesByCategory(category: Technology['category']): Technology[] {
  const allTechs = getAllTechnologies();
  return allTechs.filter(tech => tech.category === category);
}
