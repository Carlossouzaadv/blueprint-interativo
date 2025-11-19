/**
 * Professional Profile Data
 *
 * Bilingual (PT/EN) professional profile information extracted from curriculum
 */

export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface ProfessionalProfile {
  name: string;
  location: {
    pt: string;
    en: string;
  };
  title: {
    pt: string;
    en: string;
  };
  summary: {
    pt: string;
    en: string;
  };
  keyStats: {
    label: {
      pt: string;
      en: string;
    };
    value: string;
  }[];
  contact: ContactInfo;
  certifications?: {
    name: string;
    issuer: string;
    year: number;
    url?: string;
  }[];
}

export const professionalProfile: ProfessionalProfile = {
  name: 'Carlos Souza',
  location: {
    pt: 'Rio de Janeiro, RJ',
    en: 'Rio de Janeiro, Brazil',
  },
  title: {
    pt: 'Especialista em Produto e Arquiteto de Soluções de IA',
    en: 'AI Product Specialist and SaaS Solutions Architect',
  },
  summary: {
    pt: 'Especialista em Produto e Arquiteto de Soluções de IA (LegalTech/TaxTech) com um diferencial estratégico único: 14+ anos de experiência prévia como Advogado Sênior (Tributário & Societário). Expertise comprovada em liderar projetos de alta complexidade (M&A, Governança com ganhos de 10% de EBITDA) e profundo conhecimento técnico em arquitetar produtos SaaS complexos (Python, Node.js, RAG, Jurimetria). Recentemente certificado em IA (Google, AWS) e Gestão Ágil (Atlassian Jira), uno a visão de negócio (advocacia) com a metodologia de execução (Agile) para liderar equipes de engenharia na entrega de soluções de alto valor.',
    en: 'AI Product Specialist and SaaS Solutions Architect (LegalTech/FinTech) with a unique strategic advantage: 14+ years of prior experience as a Senior Corporate & Tax Lawyer. Proven expertise in leading high-impact projects (M&A, Governance delivering 10% EBITDA gains) and deep technical knowledge in architecting complex SaaS products (Python, Node.js, RAG, Jurimetrics). Newly certified in AI (Google, AWS) and Agile Management (Atlassian Jira), I bridge the business vision (legal expertise) with execution methodology (Agile) to lead engineering teams in delivering high-value solutions.',
  },
  keyStats: [
    {
      label: {
        pt: 'Anos de Experiência',
        en: 'Years of Experience',
      },
      value: '14+',
    },
    {
      label: {
        pt: 'Projetos SaaS',
        en: 'SaaS Projects',
      },
      value: '4',
    },
    {
      label: {
        pt: 'Certificações Técnicas',
        en: 'Technical Certifications',
      },
      value: '5+',
    },
  ],
  contact: {
    phone: '+55 21 98964-8889',
    email: 'carlossouza.pr@gmail.com',
    linkedin: 'https://www.linkedin.com/in/carlos-souza-5874315b/',
    github: 'https://github.com/Carlossouzaadv',
  },
  certifications: [
    {
      name: 'Google Cloud Computing Foundations: Networking & Security',
      issuer: 'Google Cloud',
      year: 2023,
    },
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: 2023,
    },
    {
      name: 'Atlassian Jira Fundamentals',
      issuer: 'Atlassian',
      year: 2023,
    },
  ],
};

/**
 * Helper function to get contact links
 */
export function getContactLinks() {
  return {
    linkedin: professionalProfile.contact.linkedin,
    github: professionalProfile.contact.github,
    email: `mailto:${professionalProfile.contact.email}`,
    phone: `tel:${professionalProfile.contact.phone.replace(/\s/g, '')}`,
  };
}
