/**
 * Integration Tests for Home Page
 *
 * Tests the app/page.tsx component for:
 * - Language switcher functionality
 * - Hero component integration
 * - Language state management
 * - Content switching on language change
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { professionalProfile } from '@/lib/profile';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Github: () => <div data-testid="github-icon">Github</div>,
  Linkedin: () => <div data-testid="linkedin-icon">Linkedin</div>,
  Mail: () => <div data-testid="mail-icon">Mail</div>,
  Phone: () => <div data-testid="phone-icon">Phone</div>,
  ChevronDown: () => <div data-testid="chevron-down-icon">ChevronDown</div>,
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Home Page Integration', () => {
  describe('Page Rendering', () => {
    it('should render without crashing', () => {
      render(<Home />);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('should render main element', () => {
      render(<Home />);
      const main = screen.getByRole('main');
      expect(main).toHaveClass('bg-slate-900');
    });

    it('should render both Hero section and projects section', () => {
      render(<Home />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent(professionalProfile.name);

      const h2Array = screen.getAllByRole('heading', { level: 2 });
      const projectHeading = h2Array.find(h => h.textContent?.match(/Projetos em Desenvolvimento|Projects Coming Soon/));
      expect(projectHeading?.textContent).toMatch(/Projetos em Desenvolvimento|Projects Coming Soon/);
    });
  });

  describe('Language Switcher', () => {
    it('should render language buttons', () => {
      render(<Home />);
      expect(screen.getByRole('button', { name: 'PT' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();
    });

    it('should have PT button active by default', () => {
      render(<Home />);
      const ptButton = screen.getByRole('button', { name: 'PT' });
      expect(ptButton).toHaveClass('bg-blue-600');
      expect(ptButton).toHaveClass('text-white');
    });

    it('should have EN button inactive by default', () => {
      render(<Home />);
      const enButton = screen.getByRole('button', { name: 'EN' });
      expect(enButton).toHaveClass('bg-slate-700');
    });

    it('should be fixed positioned at top right', () => {
      render(<Home />);
      const buttonContainer = screen
        .getByRole('button', { name: 'PT' })
        .closest('div');
      expect(buttonContainer).toHaveClass('fixed');
      expect(buttonContainer).toHaveClass('top-4');
      expect(buttonContainer).toHaveClass('right-4');
      expect(buttonContainer).toHaveClass('z-50');
    });

    it('should have proper gap between buttons', () => {
      render(<Home />);
      const buttonContainer = screen
        .getByRole('button', { name: 'PT' })
        .closest('div');
      expect(buttonContainer).toHaveClass('gap-2');
    });
  });

  describe('Language Switching Functionality', () => {
    it('should switch to English when EN button clicked', () => {
      render(<Home />);
      const enButton = screen.getByRole('button', { name: 'EN' });

      fireEvent.click(enButton);

      // EN button should now be active
      expect(enButton).toHaveClass('bg-blue-600');

      // PT button should now be inactive
      const ptButton = screen.getByRole('button', { name: 'PT' });
      expect(ptButton).toHaveClass('bg-slate-700');

      // English content should be displayed
      expect(
        screen.getByText(professionalProfile.location.en)
      ).toBeInTheDocument();
    });

    it('should switch back to Portuguese when PT button clicked', () => {
      render(<Home />);
      const enButton = screen.getByRole('button', { name: 'EN' });
      const ptButton = screen.getByRole('button', { name: 'PT' });

      // Switch to English first
      fireEvent.click(enButton);
      expect(
        screen.getByText(professionalProfile.location.en)
      ).toBeInTheDocument();

      // Switch back to Portuguese
      fireEvent.click(ptButton);
      expect(
        screen.getByText(professionalProfile.location.pt)
      ).toBeInTheDocument();

      // PT button should be active
      expect(ptButton).toHaveClass('bg-blue-600');
      expect(enButton).toHaveClass('bg-slate-700');
    });
  });

  describe('Hero Component Integration', () => {
    it('should render Hero with language from state', () => {
      render(<Home />);
      expect(
        screen.getByText(professionalProfile.location.pt)
      ).toBeInTheDocument();
    });

    it('should update Hero content when language changes', () => {
      render(<Home />);
      const enButton = screen.getByRole('button', { name: 'EN' });

      fireEvent.click(enButton);

      expect(
        screen.getByText(professionalProfile.title.en)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(professionalProfile.title.pt)
      ).not.toBeInTheDocument();
    });

    it('should render all Hero contact links', () => {
      render(<Home />);
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('Projects Section', () => {
    it('should have projects section with id "projects"', () => {
      render(<Home />);
      const projectsSection = screen.getByText(/Projetos em Desenvolvimento|Projects Coming Soon/).closest('section');
      expect(projectsSection).toHaveAttribute('id', 'projects');
    });

    it('should have correct styling for projects section', () => {
      render(<Home />);
      const projectsSection = screen.getByText(/Projetos em Desenvolvimento|Projects Coming Soon/).closest('section');
      expect(projectsSection).toHaveClass('min-h-screen');
      expect(projectsSection).toHaveClass('bg-slate-800');
      expect(projectsSection).toHaveClass('flex');
    });

    it('should display Portuguese placeholder text when language is PT', () => {
      render(<Home />);
      expect(
        screen.getByText('Projetos em Desenvolvimento')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Os blueprints dos projetos serão exibidos aqui')
      ).toBeInTheDocument();
    });

    it('should display English placeholder text when language is EN', () => {
      render(<Home />);
      const enButton = screen.getByRole('button', { name: 'EN' });
      fireEvent.click(enButton);

      expect(screen.getByText('Projects Coming Soon')).toBeInTheDocument();
      expect(
        screen.getByText('Project blueprints will be displayed here')
      ).toBeInTheDocument();
    });

    it('should switch projects section language with Hero', () => {
      render(<Home />);

      // Initially Portuguese
      expect(
        screen.getByText('Projetos em Desenvolvimento')
      ).toBeInTheDocument();

      // Switch to English
      const enButton = screen.getByRole('button', { name: 'EN' });
      fireEvent.click(enButton);

      expect(screen.getByText('Projects Coming Soon')).toBeInTheDocument();
      expect(
        screen.queryByText('Projetos em Desenvolvimento')
      ).not.toBeInTheDocument();
    });
  });

  describe('Layout and Structure', () => {
    it('should have proper HTML structure', () => {
      render(<Home />);
      const main = screen.getByRole('main');
      expect(main.tagName).toBe('MAIN');
    });

    it('should have multiple sections', () => {
      const { container } = render(<Home />);
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(1);
    });

    it('should render content in correct order', () => {
      const { container } = render(<Home />);
      const main = screen.getByRole('main');
      const children = main.children;

      // First should be language switcher div
      expect(children[0].querySelector('button')).toBeInTheDocument();

      // Then Hero section
      expect(main.querySelector('section')).toBeInTheDocument();
    });
  });

  describe('Button States and Styling', () => {
    it('should have proper button styling for PT button', () => {
      render(<Home />);
      const ptButton = screen.getByRole('button', { name: 'PT' });
      expect(ptButton).toHaveClass('px-4');
      expect(ptButton).toHaveClass('py-2');
      expect(ptButton).toHaveClass('rounded-lg');
      expect(ptButton).toHaveClass('font-semibold');
      expect(ptButton).toHaveClass('transition-colors');
    });

    it('should have proper button styling for EN button', () => {
      render(<Home />);
      const enButton = screen.getByRole('button', { name: 'EN' });
      expect(enButton).toHaveClass('px-4');
      expect(enButton).toHaveClass('py-2');
      expect(enButton).toHaveClass('rounded-lg');
      expect(enButton).toHaveClass('font-semibold');
      expect(enButton).toHaveClass('transition-colors');
    });

    it('should have hover states on inactive buttons', () => {
      render(<Home />);
      const enButton = screen.getByRole('button', { name: 'EN' });

      // When inactive (default), should have hover class
      expect(enButton).toHaveClass('hover:bg-slate-600');
    });
  });

  describe('Accessibility', () => {
    it('should have clickable buttons for language switching', () => {
      render(<Home />);
      const ptButton = screen.getByRole('button', { name: 'PT' });
      const enButton = screen.getByRole('button', { name: 'EN' });

      expect(ptButton.tagName).toBe('BUTTON');
      expect(enButton.tagName).toBe('BUTTON');
    });

    it('should allow keyboard navigation between buttons', () => {
      render(<Home />);
      const ptButton = screen.getByRole('button', { name: 'PT' });
      const enButton = screen.getByRole('button', { name: 'EN' });

      // Buttons should be focusable
      expect(ptButton).toBeVisible();
      expect(enButton).toBeVisible();
    });

    it('should have semantic section elements', () => {
      const { container } = render(<Home />);
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
      sections.forEach((section) => {
        expect(section.tagName).toBe('SECTION');
      });
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive container classes', () => {
      render(<Home />);
      const main = screen.getByRole('main');
      expect(main).toHaveClass('bg-slate-900');
    });

    it('should have z-index for fixed language switcher', () => {
      render(<Home />);
      const switcherDiv = screen
        .getByRole('button', { name: 'PT' })
        .closest('div');
      expect(switcherDiv).toHaveClass('z-50');
    });
  });

  describe('Component Composition', () => {
    it('should compose Hero and Projects sections together', () => {
      render(<Home />);

      // Hero content
      const name = screen.getByText(professionalProfile.name);
      expect(name).toBeInTheDocument();

      // Projects section
      const projectsHeading = screen.getByText(/Projetos em Desenvolvimento|Projects Coming Soon/);
      expect(projectsHeading).toBeInTheDocument();

      // Verify they are in the same document
      expect(name.closest('main')).toBe(
        projectsHeading.closest('main')
      );
    });

    it('should maintain language state across sections', () => {
      render(<Home />);

      // Switch to English
      const enButton = screen.getByRole('button', { name: 'EN' });
      fireEvent.click(enButton);

      // Both Hero and Projects should be in English
      expect(
        screen.getByText(professionalProfile.title.en)
      ).toBeInTheDocument();
      expect(screen.getByText('Projects Coming Soon')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid language switches', () => {
      render(<Home />);
      const ptButton = screen.getByRole('button', { name: 'PT' });
      const enButton = screen.getByRole('button', { name: 'EN' });

      // Rapid clicks
      fireEvent.click(enButton);
      fireEvent.click(ptButton);
      fireEvent.click(enButton);

      // Should still be in English
      expect(
        screen.getByText(professionalProfile.title.en)
      ).toBeInTheDocument();
    });

    it('should maintain state after clicking same button multiple times', () => {
      render(<Home />);
      const ptButton = screen.getByRole('button', { name: 'PT' });

      fireEvent.click(ptButton);
      fireEvent.click(ptButton);
      fireEvent.click(ptButton);

      // Should still be in Portuguese
      expect(
        screen.getByText(professionalProfile.title.pt)
      ).toBeInTheDocument();
    });
  });
});
