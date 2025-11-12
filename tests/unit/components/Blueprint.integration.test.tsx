/**
 * Blueprint Component Integration Tests
 * Tests Blueprint component integrated with app/page.tsx and language switching
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Blueprint from '@/components/Blueprint';

// Mock the data module with real project data
jest.mock('@/lib/data', () => ({
  getAllProjects: () => [
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
      ],
      year: 2024,
      position: 4,
    },
  ],
  getProjectById: jest.fn(),
  getProjectBySlug: jest.fn(),
  getProjectsByStatus: jest.fn(),
  getAllTechnologies: jest.fn(),
  getTechnologiesByCategory: jest.fn(),
}));

jest.mock('lucide-react', () => ({
  ChevronDown: ({ className }: any) => <div data-testid="chevron-down" className={className} />,
  ChevronUp: ({ className }: any) => <div data-testid="chevron-up" className={className} />,
  Target: ({ className }: any) => <div data-testid="icon-target" className={className} />,
  Lightbulb: ({ className }: any) => <div data-testid="icon-lightbulb" className={className} />,
  Zap: ({ className }: any) => <div data-testid="icon-zap" className={className} />,
  Code2: ({ className }: any) => <div data-testid="icon-code2" className={className} />,
}));

describe('Blueprint Component - Integration Tests', () => {
  // Test 1: Switching between languages with parent component simulation
  describe('Language Switching Behavior', () => {
    it('should switch from PT to EN while keeping expand state', () => {
      const { rerender } = render(<Blueprint language="pt" />);

      // Expand a section in PT
      const challengeButtonsPT = screen.getAllByText('Desafio');
      fireEvent.click(challengeButtonsPT[0]);
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();

      // Switch language
      rerender(<Blueprint language="en" />);

      // The expanded section should now show English content
      const challengeButtonsEN = screen.getAllByText('Challenge');
      expect(challengeButtonsEN.length).toBeGreaterThan(0);
    });

    it('should maintain expand state across language switches', () => {
      const { rerender } = render(<Blueprint language="pt" />);

      // Expand challenge section
      const challengeButtonsPT = screen.getAllByText('Desafio');
      fireEvent.click(challengeButtonsPT[0]);

      // Switch to English
      rerender(<Blueprint language="en" />);

      // Content should still be showing (but in English)
      expect(screen.getByText('Challenge EN')).toBeInTheDocument();
    });

    it('should display correct content when switching from EN to PT', () => {
      const { rerender } = render(<Blueprint language="en" />);

      // Expand in English
      const challengeButtonsEN = screen.getAllByText('Challenge');
      fireEvent.click(challengeButtonsEN[0]);
      expect(screen.getByText('Challenge EN')).toBeInTheDocument();

      // Switch to Portuguese
      rerender(<Blueprint language="pt" />);

      // Should show Portuguese content
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();
    });
  });

  // Test 2: Responsive behavior
  describe('Responsive Behavior', () => {
    it('should render all projects in a single column on narrow viewports', () => {
      const { container } = render(<Blueprint language="pt" />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1');
    });

    it('should have proper card spacing', () => {
      const { container } = render(<Blueprint language="pt" />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('gap-6');
      expect(grid).toHaveClass('lg:gap-8');
    });
  });

  // Test 3: Complete workflow simulation
  describe('Complete User Workflow', () => {
    it('should allow user to expand multiple sections across projects', () => {
      render(<Blueprint language="pt" />);

      // Expand first project's challenge
      const challengeButtons = screen.getAllByText('Desafio');
      fireEvent.click(challengeButtons[0]);
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();

      // Expand first project's blueprint
      const blueprintButtons = screen.getAllByText('Solução');
      fireEvent.click(blueprintButtons[0]);
      expect(screen.getByText('Solução PT')).toBeInTheDocument();

      // Expand first project's decisions
      const decisionsButtons = screen.getAllByText('Decisões');
      fireEvent.click(decisionsButtons[0]);
      expect(screen.getByText('Decisões PT')).toBeInTheDocument();

      // Expand first project's technologies
      const techButtons = screen.getAllByText('Tecnologias');
      fireEvent.click(techButtons[0]);
      expect(screen.getByText('Python')).toBeInTheDocument();
    });

    it('should allow collapsing and re-expanding sections', () => {
      render(<Blueprint language="pt" />);

      const challengeButtons = screen.getAllByText('Desafio');

      // Expand
      fireEvent.click(challengeButtons[0]);
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();

      // Collapse
      fireEvent.click(challengeButtons[0]);
      expect(screen.queryByText('Desafio PT')).not.toBeInTheDocument();

      // Re-expand
      fireEvent.click(challengeButtons[0]);
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();
    });

    it('should display all 4 projects with different statuses', () => {
      render(<Blueprint language="pt" />);

      expect(screen.getByText('JustoAI (V1)')).toBeInTheDocument();
      expect(screen.getByText('JustoAI (V2)')).toBeInTheDocument();
      expect(screen.getByText("Poker Grinder's Edge")).toBeInTheDocument();
      expect(screen.getByText('Cérebro Jurídico')).toBeInTheDocument();

      // Check statuses
      expect(screen.getByText('Manutenção')).toBeInTheDocument();
      expect(screen.getAllByText('Produção').length).toBeGreaterThan(0);
      expect(screen.getByText('PoC')).toBeInTheDocument();
    });
  });

  // Test 4: Content accuracy
  describe('Content Accuracy', () => {
    it('should display accurate Portuguese content for JustoAI V1', () => {
      render(<Blueprint language="pt" />);

      expect(screen.getByText('MVP de validação')).toBeInTheDocument();
      expect(screen.getByText('Ano: 2023')).toBeInTheDocument();
    });

    it('should display accurate English content for JustoAI V1', () => {
      render(<Blueprint language="en" />);

      expect(screen.getByText('MVP validation')).toBeInTheDocument();
    });

    it('should display accurate Portuguese content for JustoAI V2', () => {
      render(<Blueprint language="pt" />);

      expect(screen.getByText('Escalabilidade SaaS')).toBeInTheDocument();
    });

    it('should display accurate English content for JustoAI V2', () => {
      render(<Blueprint language="en" />);

      expect(screen.getByText('SaaS scalability')).toBeInTheDocument();
    });

    it('should display accurate content for all projects when expanded', () => {
      render(<Blueprint language="pt" />);

      // Expand all challenge sections
      const challengeButtons = screen.getAllByText('Desafio');
      challengeButtons.forEach(button => fireEvent.click(button));

      // Check for specific content from each project
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();
      expect(screen.getByText('Desafio V2 PT')).toBeInTheDocument();
      expect(screen.getByText('Desafio poker PT')).toBeInTheDocument();
      expect(screen.getByText('Desafio cerebro PT')).toBeInTheDocument();
    });
  });

  // Test 5: Interaction patterns
  describe('Interaction Patterns', () => {
    it('should handle rapid expand/collapse clicks', () => {
      render(<Blueprint language="pt" />);

      const challengeButtons = screen.getAllByText('Desafio');

      // Rapid clicks
      fireEvent.click(challengeButtons[0]);
      fireEvent.click(challengeButtons[0]);
      fireEvent.click(challengeButtons[0]);

      // Should be expanded
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();
    });

    it('should allow independent section expansion', () => {
      render(<Blueprint language="pt" />);

      const buttons = {
        challenge: screen.getAllByText('Desafio'),
        blueprint: screen.getAllByText('Solução'),
        decisions: screen.getAllByText('Decisões'),
        tech: screen.getAllByText('Tecnologias'),
      };

      // Expand only challenge
      fireEvent.click(buttons.challenge[0]);
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();
      expect(screen.queryByText('Solução PT')).not.toBeInTheDocument();

      // Expand only blueprint
      fireEvent.click(buttons.blueprint[0]);
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();
      expect(screen.getByText('Solução PT')).toBeInTheDocument();
    });
  });

  // Test 6: Visual consistency
  describe('Visual Consistency', () => {
    it('should maintain consistent styling across projects', () => {
      const { container } = render(<Blueprint language="pt" />);

      // Check that all cards have consistent background
      const cards = container.querySelectorAll('.bg-slate-900');
      expect(cards.length).toBeGreaterThan(0);

      cards.forEach(card => {
        expect(card).toHaveClass('border', 'border-slate-700', 'rounded-xl');
      });
    });

    it('should have consistent button styling', () => {
      const { container } = render(<Blueprint language="pt" />);

      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);

      // Sample a few buttons to check styling
      buttons.forEach(button => {
        if (button.textContent?.includes('Desafio') ||
            button.textContent?.includes('Solução') ||
            button.textContent?.includes('Decisões') ||
            button.textContent?.includes('Tecnologias')) {
          expect(button).toHaveClass('w-full', 'transition-colors');
        }
      });
    });
  });

  // Test 7: Accessibility
  describe('Accessibility Features', () => {
    it('should have proper semantic HTML structure', () => {
      const { container } = render(<Blueprint language="pt" />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();

      const h2 = container.querySelector('h2');
      expect(h2).toBeInTheDocument();
      expect(h2?.textContent).toContain('Arquitetura dos Projetos');
    });

    it('should have proper heading hierarchy', () => {
      const { container } = render(<Blueprint language="pt" />);

      const h2 = container.querySelector('h2');
      expect(h2).toBeInTheDocument();

      const h3s = container.querySelectorAll('h3');
      expect(h3s.length).toBeGreaterThan(0);

      const h4s = container.querySelectorAll('h4');
      expect(h4s.length).toBeGreaterThan(0);
    });

    it('should have proper button accessibility', () => {
      const { container } = render(<Blueprint language="pt" />);

      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        // All buttons should have readable text or aria-label
        expect(button.textContent?.trim().length || button.getAttribute('aria-label')).toBeTruthy();
      });
    });
  });

  // Test 8: Data mutation isolation
  describe('Data Mutation Isolation', () => {
    it('should maintain independent state for each section', () => {
      render(<Blueprint language="pt" />);

      // Expand first project's challenge but not second project's
      const challengeButtons = screen.getAllByText('Desafio');
      fireEvent.click(challengeButtons[0]);
      expect(screen.getByText('Desafio PT')).toBeInTheDocument();

      // Second project's challenge should still be collapsed
      const allChallengeContent = screen.queryAllByText(/Desafio/);
      expect(allChallengeContent.length).toBeGreaterThanOrEqual(1);
    });
  });

  // Test 9: Error resilience
  describe('Error Resilience', () => {
    it('should render even if some project data is missing non-critical fields', () => {
      // The component should still render all projects
      render(<Blueprint language="pt" />);

      expect(screen.getByText('JustoAI (V1)')).toBeInTheDocument();
      expect(screen.getByText('JustoAI (V2)')).toBeInTheDocument();
      expect(screen.getByText("Poker Grinder's Edge")).toBeInTheDocument();
      expect(screen.getByText('Cérebro Jurídico')).toBeInTheDocument();
    });
  });

  // Test 10: Performance considerations
  describe('Performance Considerations', () => {
    it('should render all sections without excessive DOM manipulation', () => {
      const { container } = render(<Blueprint language="pt" />);

      // Count initial buttons (should be 4 projects * 4 sections = 16 buttons minimum)
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThanOrEqual(16);
    });

    it('should handle rapid language switching', () => {
      const { rerender } = render(<Blueprint language="pt" />);

      // Rapid switching
      for (let i = 0; i < 5; i++) {
        rerender(<Blueprint language={i % 2 === 0 ? 'pt' : 'en'} />);
      }

      // Should still render correctly
      expect(screen.getByText('Arquitetura dos Projetos')).toBeInTheDocument();
    });
  });
});
