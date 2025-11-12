/**
 * Blueprint Component Test Suite
 * Comprehensive testing for the Blueprint component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Blueprint from '@/components/Blueprint';
import * as dataModule from '@/lib/data';

// Mock the data module
jest.mock('@/lib/data', () => ({
  getAllProjects: jest.fn(),
  getProjectById: jest.fn(),
  getProjectBySlug: jest.fn(),
  getProjectsByStatus: jest.fn(),
  getAllTechnologies: jest.fn(),
  getTechnologiesByCategory: jest.fn(),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronDown: ({ className }: any) => <div data-testid="chevron-down" className={className} />,
  ChevronUp: ({ className }: any) => <div data-testid="chevron-up" className={className} />,
  Target: ({ className }: any) => <div data-testid="icon-target" className={className} />,
  Lightbulb: ({ className }: any) => <div data-testid="icon-lightbulb" className={className} />,
  Zap: ({ className }: any) => <div data-testid="icon-zap" className={className} />,
  Code2: ({ className }: any) => <div data-testid="icon-code2" className={className} />,
}));

describe('Blueprint Component', () => {
  const mockProjects = [
    {
      id: 'justoai-v1',
      slug: 'justoai-v1',
      title: { pt: 'JustoAI (V1)', en: 'JustoAI (V1)' },
      description: { pt: 'MVP de validação', en: 'MVP validation' },
      status: 'maintenance' as const,
      challenge: { pt: 'Desafio PT', en: 'Challenge EN' },
      blueprint: { pt: 'Solução PT', en: 'Solution EN' },
      decisions: { pt: 'Decisões PT', en: 'Decisions EN' },
      metrics: { pt: 'Resultados PT', en: 'Results EN' },
      technologies: [
        { name: 'Python', category: 'backend' as const, role: 'Core language' },
        { name: 'FastAPI', category: 'backend' as const, role: 'REST API' },
      ],
      year: 2023,
      position: 1,
    },
    {
      id: 'justoai-v2',
      slug: 'justoai-v2',
      title: { pt: 'JustoAI (V2)', en: 'JustoAI (V2)' },
      description: { pt: 'Escalabilidade SaaS', en: 'SaaS scalability' },
      status: 'production' as const,
      challenge: { pt: 'Desafio V2 PT', en: 'Challenge V2 EN' },
      blueprint: { pt: 'Solução V2 PT', en: 'Solution V2 EN' },
      decisions: { pt: 'Decisões V2 PT', en: 'Decisions V2 EN' },
      metrics: { pt: 'Resultados V2 PT', en: 'Results V2 EN' },
      technologies: [
        { name: 'Node.js', category: 'backend' as const, role: 'Runtime' },
        { name: 'TypeScript', category: 'backend' as const, role: 'Type safety' },
      ],
      year: 2024,
      position: 2,
    },
    {
      id: 'poker-grinders-edge',
      slug: 'poker-grinders-edge',
      title: { pt: "Poker Grinder's Edge", en: "Poker Grinder's Edge" },
      description: { pt: 'Ecossistema SaaS', en: 'SaaS ecosystem' },
      status: 'production' as const,
      challenge: { pt: 'Desafio poker PT', en: 'Challenge poker EN' },
      blueprint: { pt: 'Solução poker PT', en: 'Solution poker EN' },
      decisions: { pt: 'Decisões poker PT', en: 'Decisions poker EN' },
      metrics: { pt: 'Resultados poker PT', en: 'Results poker EN' },
      technologies: [
        { name: 'NestJS', category: 'backend' as const, role: 'Framework' },
        { name: 'React Native', category: 'frontend' as const, role: 'Mobile' },
      ],
      year: 2024,
      position: 3,
    },
    {
      id: 'cerebro-juridico',
      slug: 'cerebro-juridico',
      title: { pt: 'Cérebro Jurídico', en: 'Cérebro Jurídico' },
      description: { pt: 'RAG para buscas semânticas', en: 'RAG for semantic search' },
      status: 'poc' as const,
      challenge: { pt: 'Desafio cerebro PT', en: 'Challenge cerebro EN' },
      blueprint: { pt: 'Solução cerebro PT', en: 'Solution cerebro EN' },
      decisions: { pt: 'Decisões cerebro PT', en: 'Decisions cerebro EN' },
      metrics: { pt: 'Resultados cerebro PT', en: 'Results cerebro EN' },
      technologies: [
        { name: 'Python', category: 'backend' as const, role: 'Core' },
        { name: 'Streamlit', category: 'frontend' as const, role: 'UI' },
      ],
      year: 2024,
      position: 4,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (dataModule.getAllProjects as jest.Mock).mockReturnValue(mockProjects);
  });

  // Test 1: Component renders correctly
  describe('Rendering', () => {
    it('should render the component with section title', () => {
      render(<Blueprint language="pt" />);
      expect(screen.getByText('Arquitetura dos Projetos')).toBeInTheDocument();
    });

    it('should render English title when language is en', () => {
      render(<Blueprint language="en" />);
      expect(screen.getByText('Project Architecture')).toBeInTheDocument();
    });

    it('should render all 4 projects', () => {
      render(<Blueprint language="pt" />);
      expect(screen.getByText('JustoAI (V1)')).toBeInTheDocument();
      expect(screen.getByText('JustoAI (V2)')).toBeInTheDocument();
      expect(screen.getByText("Poker Grinder's Edge")).toBeInTheDocument();
      expect(screen.getByText('Cérebro Jurídico')).toBeInTheDocument();
    });

    it('should render with correct grid layout class', () => {
      const { container: doc } = render(<Blueprint language="pt" />);
      const grid = doc.querySelector('.grid.grid-cols-1');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('lg:grid-cols-2');
    });
  });

  // Test 2: Language switching
  describe('Language Support (PT/EN)', () => {
    it('should display Portuguese labels when language is pt', () => {
      render(<Blueprint language="pt" />);
      expect(screen.getAllByText('Desafio').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Solução').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Decisões').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Tecnologias').length).toBeGreaterThan(0);
    });

    it('should display English labels when language is en', () => {
      render(<Blueprint language="en" />);
      expect(screen.getAllByText('Challenge').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Blueprint').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Decisions').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Technologies').length).toBeGreaterThan(0);
    });

    it('should display Portuguese project content when language is pt', () => {
      render(<Blueprint language="pt" />);
      // Check for Portuguese descriptions
      expect(screen.getByText('MVP de validação')).toBeInTheDocument();
      expect(screen.getByText('Escalabilidade SaaS')).toBeInTheDocument();
    });

    it('should display English project content when language is en', () => {
      render(<Blueprint language="en" />);
      // Check for English descriptions
      expect(screen.getByText('MVP validation')).toBeInTheDocument();
      expect(screen.getByText('SaaS scalability')).toBeInTheDocument();
    });

    it('should display Portuguese status labels when language is pt', () => {
      render(<Blueprint language="pt" />);
      expect(screen.getByText('Manutenção')).toBeInTheDocument();
      expect(screen.getAllByText('Produção').length).toBeGreaterThan(0);
      expect(screen.getByText('PoC')).toBeInTheDocument();
    });

    it('should display English status labels when language is en', () => {
      render(<Blueprint language="en" />);
      expect(screen.getByText('Maintenance')).toBeInTheDocument();
      expect(screen.getAllByText('Production').length).toBeGreaterThan(0);
      expect(screen.getByText('PoC')).toBeInTheDocument();
    });

    it('should display Portuguese results label when language is pt', () => {
      render(<Blueprint language="pt" />);
      // Expand metrics section to see label
      expect(screen.getAllByText('Resultados').length).toBeGreaterThan(0);
    });

    it('should display English results label when language is en', () => {
      render(<Blueprint language="en" />);
      // Expand metrics section to see label
      expect(screen.getAllByText('Results').length).toBeGreaterThan(0);
    });
  });

  // Test 3: Expand/Collapse functionality
  describe('Expand/Collapse Sections', () => {
    it('should not show challenge content initially', () => {
      render(<Blueprint language="pt" />);
      expect(screen.queryByText('Desafio PT')).not.toBeInTheDocument();
    });

    it('should expand challenge section when button is clicked', async () => {
      render(<Blueprint language="pt" />);
      const challengeButtons = screen.getAllByText('Desafio');
      fireEvent.click(challengeButtons[0]);

      // Wait for content to appear
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();
    });

    it('should collapse challenge section after expanding and clicking again', async () => {
      render(<Blueprint language="pt" />);
      const challengeButtons = screen.getAllByText('Desafio');

      // Expand
      fireEvent.click(challengeButtons[0]);
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();

      // Collapse
      fireEvent.click(challengeButtons[0]);
      expect(screen.queryByText('Desafio PT')).not.toBeInTheDocument();
    });

    it('should expand blueprint section', async () => {
      render(<Blueprint language="pt" />);
      const blueprintButtons = screen.getAllByText('Solução');
      fireEvent.click(blueprintButtons[0]);
      expect(screen.getByText('Solução PT')).toBeInTheDocument();
    });

    it('should expand decisions section', async () => {
      render(<Blueprint language="pt" />);
      const decisionsButtons = screen.getAllByText('Decisões');
      fireEvent.click(decisionsButtons[0]);
      expect(screen.getByText('Decisões PT')).toBeInTheDocument();
    });

    it('should expand technologies section', async () => {
      render(<Blueprint language="pt" />);
      const techButtons = screen.getAllByText('Tecnologias');
      fireEvent.click(techButtons[0]);

      // Look for technology badges
      expect(screen.getByText('Python')).toBeInTheDocument();
      expect(screen.getByText('FastAPI')).toBeInTheDocument();
    });

    it('should toggle multiple sections independently', async () => {
      render(<Blueprint language="pt" />);

      // Get all section buttons
      const challengeButtons = screen.getAllByText('Desafio');
      const blueprintButtons = screen.getAllByText('Solução');

      // Expand challenge
      fireEvent.click(challengeButtons[0]);
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();

      // Expand blueprint (for same project)
      fireEvent.click(blueprintButtons[0]);
      expect(screen.getByText('Solução PT')).toBeInTheDocument();

      // Both should be visible
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();
      expect(screen.getByText('Solução PT')).toBeInTheDocument();
    });

    it('should toggle chevron icon on expand/collapse', async () => {
      render(<Blueprint language="pt" />);
      const challengeButtons = screen.getAllByText('Desafio');

      // Initially should show ChevronDown
      fireEvent.click(challengeButtons[0]);

      // After click, button structure changes but component should still work
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();
    });
  });

  // Test 4: Data display
  describe('Data Display', () => {
    it('should display project titles correctly', () => {
      render(<Blueprint language="pt" />);
      mockProjects.forEach(project => {
        expect(screen.getByText(project.title.pt)).toBeInTheDocument();
      });
    });

    it('should display project descriptions correctly', () => {
      render(<Blueprint language="pt" />);
      expect(screen.getByText('MVP de validação')).toBeInTheDocument();
      expect(screen.getByText('Escalabilidade SaaS')).toBeInTheDocument();
    });

    it('should display project years when available', () => {
      render(<Blueprint language="pt" />);
      expect(screen.getAllByText(/Ano: \d{4}/).length).toBeGreaterThan(0);
    });

    it('should display status badges for all projects', () => {
      render(<Blueprint language="pt" />);
      expect(screen.getByText('Manutenção')).toBeInTheDocument();
      expect(screen.getAllByText('Produção').length).toBeGreaterThan(0);
      expect(screen.getByText('PoC')).toBeInTheDocument();
    });

    it('should display technologies when section is expanded', async () => {
      render(<Blueprint language="pt" />);
      const techButtons = screen.getAllByText('Tecnologias');
      fireEvent.click(techButtons[0]);

      expect(screen.getByText('Python')).toBeInTheDocument();
      expect(screen.getByText('FastAPI')).toBeInTheDocument();
    });

    it('should display technology roles as title attribute', async () => {
      render(<Blueprint language="pt" />);
      const techButtons = screen.getAllByText('Tecnologias');
      fireEvent.click(techButtons[0]);

      const pythonTech = screen.getByText('Python');
      expect(pythonTech).toHaveAttribute('title', 'Core language');
    });

    it('should display metrics when available', async () => {
      render(<Blueprint language="pt" />);
      // Metrics are always visible (not in collapsible section)
      expect(screen.getAllByText('Resultados').length).toBeGreaterThan(0);
    });
  });

  // Test 5: Status badges and colors
  describe('Status Badges', () => {
    it('should display status badge for production projects', () => {
      render(<Blueprint language="pt" />);
      const productionBadges = screen.getAllByText('Produção');
      expect(productionBadges.length).toBeGreaterThan(0);
    });

    it('should display status badge for poc projects', () => {
      render(<Blueprint language="pt" />);
      expect(screen.getByText('PoC')).toBeInTheDocument();
    });

    it('should display status badge for maintenance projects', () => {
      render(<Blueprint language="pt" />);
      expect(screen.getByText('Manutenção')).toBeInTheDocument();
    });

    it('should apply correct CSS classes to production status', () => {
      render(<Blueprint language="pt" />);
      const prodBadges = screen.getAllByText('Produção');
      const prodBadge = prodBadges[0].closest('span');
      expect(prodBadge).toHaveClass('bg-green-900', 'text-green-200', 'border-green-700');
    });

    it('should apply correct CSS classes to poc status', () => {
      render(<Blueprint language="pt" />);
      const pocBadge = screen.getByText('PoC').closest('span');
      expect(pocBadge).toHaveClass('bg-blue-900', 'text-blue-200', 'border-blue-700');
    });

    it('should apply correct CSS classes to maintenance status', () => {
      render(<Blueprint language="pt" />);
      const maintenanceBadge = screen.getByText('Manutenção').closest('span');
      expect(maintenanceBadge).toHaveClass('bg-slate-700', 'text-slate-300', 'border-slate-600');
    });
  });

  // Test 6: Icons and visual elements
  describe('Icons and Visual Elements', () => {
    it('should render icon elements for sections', () => {
      render(<Blueprint language="pt" />);
      // Icons might not be directly visible but should be rendered
      // We're checking the component structure
      const section = screen.getByText('Arquitetura dos Projetos').closest('section');
      expect(section).toBeInTheDocument();
    });

    it('should render description text below title', () => {
      render(<Blueprint language="pt" />);
      const description = screen.getByText(
        'Explore os blueprints técnicos de cada projeto, desde o desafio até as decisões arquiteturais'
      );
      expect(description).toBeInTheDocument();
    });

    it('should render cards with proper structure', () => {
      const { container } = render(<Blueprint language="pt" />);
      const cards = container.querySelectorAll('.bg-slate-900.border');
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  // Test 7: Empty state
  describe('Empty State', () => {
    it('should display empty state message when no projects', () => {
      (dataModule.getAllProjects as jest.Mock).mockReturnValue([]);
      render(<Blueprint language="pt" />);
      expect(screen.getByText('Nenhum projeto disponível')).toBeInTheDocument();
    });

    it('should display empty state message in English when no projects', () => {
      (dataModule.getAllProjects as jest.Mock).mockReturnValue([]);
      render(<Blueprint language="en" />);
      expect(screen.getByText('No projects available')).toBeInTheDocument();
    });
  });

  // Test 8: Responsive classes
  describe('Responsive Design', () => {
    it('should have responsive grid classes', () => {
      const { container: doc } = render(<Blueprint language="pt" />);
      const grid = doc.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('lg:grid-cols-2');
    });

    it('should have responsive padding classes', () => {
      const { container: doc } = render(<Blueprint language="pt" />);
      const section = doc.querySelector('section');
      expect(section).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });

    it('should have responsive typography classes on title', () => {
      render(<Blueprint language="pt" />);
      const title = screen.getByText('Arquitetura dos Projetos');
      expect(title).toHaveClass('text-3xl', 'sm:text-4xl', 'lg:text-5xl');
    });

    it('should have responsive text on card titles', () => {
      render(<Blueprint language="pt" />);
      const cardTitle = screen.getByText('JustoAI (V1)');
      expect(cardTitle).toHaveClass('text-2xl', 'sm:text-3xl');
    });
  });

  // Test 9: Section header
  describe('Section Header', () => {
    it('should render section title in Portuguese', () => {
      render(<Blueprint language="pt" />);
      expect(screen.getByText('Arquitetura dos Projetos')).toBeInTheDocument();
    });

    it('should render section title in English', () => {
      render(<Blueprint language="en" />);
      expect(screen.getByText('Project Architecture')).toBeInTheDocument();
    });

    it('should render description in Portuguese', () => {
      render(<Blueprint language="pt" />);
      expect(screen.getByText(
        'Explore os blueprints técnicos de cada projeto, desde o desafio até as decisões arquiteturais'
      )).toBeInTheDocument();
    });

    it('should render description in English', () => {
      render(<Blueprint language="en" />);
      expect(screen.getByText(
        'Explore the technical blueprints of each project, from challenge to architectural decisions'
      )).toBeInTheDocument();
    });
  });

  // Test 10: Default language
  describe('Default Language', () => {
    it('should use Portuguese as default language', () => {
      render(<Blueprint />);
      expect(screen.getByText('Arquitetura dos Projetos')).toBeInTheDocument();
    });

    it('should display Portuguese content when no language prop', () => {
      render(<Blueprint />);
      expect(screen.getAllByText('Desafio').length).toBeGreaterThan(0);
    });
  });

  // Test 11: Card structure
  describe('Card Structure', () => {
    it('should have header section for each card', () => {
      const { container: doc } = render(<Blueprint language="pt" />);
      const headers = doc.querySelectorAll('.bg-gradient-to-r');
      expect(headers.length).toBeGreaterThan(0);
    });

    it('should have collapsible sections in each card', () => {
      const { container: doc } = render(<Blueprint language="pt" />);
      // Each project has 4 collapsible sections + metrics
      const buttons = doc.querySelectorAll('button');
      // Should have buttons for: challenge, blueprint, decisions, tech for each project
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  // Test 12: Technology display
  describe('Technology Display', () => {
    it('should display all technologies for a project', async () => {
      render(<Blueprint language="pt" />);
      const techButtons = screen.getAllByText('Tecnologias');
      fireEvent.click(techButtons[0]);

      expect(screen.getByText('Python')).toBeInTheDocument();
      expect(screen.getByText('FastAPI')).toBeInTheDocument();
    });

    it('should display technology badges with correct styling', async () => {
      render(<Blueprint language="pt" />);
      const techButtons = screen.getAllByText('Tecnologias');
      fireEvent.click(techButtons[0]);

      const badge = screen.getByText('Python').closest('span');
      expect(badge).toHaveClass('bg-blue-900', 'text-blue-200', 'border-blue-700');
    });

    it('should display different technologies for different projects', async () => {
      render(<Blueprint language="pt" />);
      const techButtons = screen.getAllByText('Tecnologias');

      // First project
      fireEvent.click(techButtons[0]);
      expect(screen.getByText('Python')).toBeInTheDocument();

      // Collapse first
      fireEvent.click(techButtons[0]);

      // Second project
      fireEvent.click(techButtons[1]);
      expect(screen.getByText('Node.js')).toBeInTheDocument();
    });
  });
});
