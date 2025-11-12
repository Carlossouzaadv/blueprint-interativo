/**
 * Unit Tests for Hero Component
 *
 * Tests the Hero.tsx component for:
 * - Rendering with correct language (PT/EN)
 * - Proper bilingual content display
 * - Responsive design structure
 * - Accessibility attributes
 * - Interactive elements (buttons, links)
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '@/components/Hero';
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

describe('Hero Component', () => {
  describe('Rendering and Initialization', () => {
    it('should render without crashing', () => {
      const { container } = render(<Hero language="pt" />);
      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('should render with default Portuguese language', () => {
      render(<Hero />);
      expect(
        screen.getByText(professionalProfile.location.pt)
      ).toBeInTheDocument();
    });

    it('should render main section element', () => {
      const { container } = render(<Hero language="pt" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('min-h-screen');
      expect(section).toHaveClass('bg-gradient-to-br');
    });
  });

  describe('Portuguese Language (PT) Content', () => {
    beforeEach(() => {
      render(<Hero language="pt" />);
    });

    it('should display Portuguese location', () => {
      expect(
        screen.getByText(professionalProfile.location.pt)
      ).toBeInTheDocument();
    });

    it('should display name', () => {
      expect(screen.getByText(professionalProfile.name)).toBeInTheDocument();
    });

    it('should display Portuguese title', () => {
      expect(
        screen.getByText(professionalProfile.title.pt)
      ).toBeInTheDocument();
    });

    it('should display Portuguese summary', () => {
      expect(
        screen.getByText(professionalProfile.summary.pt)
      ).toBeInTheDocument();
    });

    it('should display Portuguese CTA button text', () => {
      expect(screen.getByText('Explorar Arquitetura')).toBeInTheDocument();
    });

    it('should display Portuguese scroll indicator text', () => {
      expect(screen.getByText('Deslize para explorar')).toBeInTheDocument();
    });

    it('should display Portuguese key stat labels', () => {
      professionalProfile.keyStats.forEach((stat) => {
        expect(screen.getByText(stat.label.pt)).toBeInTheDocument();
      });
    });

    it('should display all key stat values', () => {
      professionalProfile.keyStats.forEach((stat) => {
        expect(screen.getByText(stat.value)).toBeInTheDocument();
      });
    });
  });

  describe('English Language (EN) Content', () => {
    beforeEach(() => {
      render(<Hero language="en" />);
    });

    it('should display English location', () => {
      expect(
        screen.getByText(professionalProfile.location.en)
      ).toBeInTheDocument();
    });

    it('should display English title', () => {
      expect(
        screen.getByText(professionalProfile.title.en)
      ).toBeInTheDocument();
    });

    it('should display English summary', () => {
      expect(
        screen.getByText(professionalProfile.summary.en)
      ).toBeInTheDocument();
    });

    it('should display English CTA button text', () => {
      expect(screen.getByText('Explore Architecture')).toBeInTheDocument();
    });

    it('should display English scroll indicator text', () => {
      expect(screen.getByText('Scroll to explore')).toBeInTheDocument();
    });

    it('should display English key stat labels', () => {
      professionalProfile.keyStats.forEach((stat) => {
        expect(screen.getByText(stat.label.en)).toBeInTheDocument();
      });
    });
  });

  describe('Contact Information Display', () => {
    it('should display contact links', () => {
      render(<Hero language="pt" />);
      // LinkedIn text could be CV (mobile) or LinkedIn (desktop)
      const linkedinText = screen.queryByText('CV') || screen.queryByText('LinkedIn');
      expect(linkedinText).toBeInTheDocument(); // LinkedIn link on mobile shows "CV"
      expect(screen.getByText('Email')).toBeInTheDocument();
      const phoneTexts = screen.getAllByText('Phone');
      expect(phoneTexts.length).toBeGreaterThan(0); // Multiple Phone texts due to icon mock and label
      expect(screen.getByText('Code')).toBeInTheDocument(); // GitHub link
    });

    it('should have correct LinkedIn link href', () => {
      render(<Hero language="pt" />);
      const linkedinLink = screen.queryByText('CV')?.closest('a');
      expect(linkedinLink).toHaveAttribute('href', professionalProfile.contact.linkedin);
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should have correct email link href', () => {
      render(<Hero language="pt" />);
      const emailLink = screen.getByText('Email').closest('a');
      expect(emailLink).toHaveAttribute(
        'href',
        `mailto:${professionalProfile.contact.email}`
      );
    });

    it('should have correct phone link href', () => {
      render(<Hero language="pt" />);
      const phoneLinks = screen.getAllByText('Phone');
      const phoneLink = phoneLinks[phoneLinks.length - 1].closest('a');
      const phoneWithoutSpaces = professionalProfile.contact.phone.replace(/\s/g, '');
      const expectedPhoneHref = `tel:${phoneWithoutSpaces}`;
      expect(phoneLink?.getAttribute('href')).toBe(expectedPhoneHref);
    });

    it('should have correct GitHub link href', () => {
      render(<Hero language="pt" />);
      const githubLink = screen.getByText('Code').closest('a');
      expect(githubLink).toHaveAttribute('href', professionalProfile.contact.github);
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Button and Interactive Elements', () => {
    it('should have CTA button linking to projects section', () => {
      render(<Hero language="pt" />);
      const links = screen.getAllByRole('link');
      const ctaButton = links.find(link => link.textContent?.includes('Explorar Arquitetura'));
      expect(ctaButton).toHaveAttribute('href', '#projects');
    });

    it('should render CTA button with correct content', () => {
      render(<Hero language="pt" />);
      const links = screen.getAllByRole('link');
      const ctaButton = links.find(link => link.textContent?.includes('Explorar Arquitetura'));
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton?.textContent).toContain('Explorar Arquitetura');
    });

    it('should have icons rendered', () => {
      render(<Hero language="pt" />);
      expect(screen.getByTestId('github-icon')).toBeInTheDocument();
      expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
      expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
      expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
      expect(screen.getAllByTestId('chevron-down-icon')).toHaveLength(2); // Two chevron icons
    });
  });

  describe('Semantic HTML and Accessibility', () => {
    it('should use semantic section element', () => {
      const { container } = render(<Hero language="pt" />);
      const section = container.querySelector('section');
      expect(section?.tagName).toBe('SECTION');
    });

    it('should have proper heading hierarchy', () => {
      render(<Hero language="pt" />);
      // Main name should be h1
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent(professionalProfile.name);

      // Title should be h2
      const h2 = screen.getByRole('heading', { level: 2 });
      expect(h2).toHaveTextContent(professionalProfile.title.pt);
    });

    it('should have multiple links for accessibility', () => {
      render(<Hero language="pt" />);
      const links = screen.getAllByRole('link');
      // Should have: CTA link, LinkedIn link, Email link, Phone link, GitHub link
      expect(links.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Responsive Design Structure', () => {
    it('should have responsive grid layout', () => {
      const { container } = render(<Hero language="pt" />);
      const section = container.querySelector('section');
      const gridContainer = section?.querySelector('[class*="grid"]');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('lg:grid-cols-2');
    });

    it('should have responsive padding classes', () => {
      const { container } = render(<Hero language="pt" />);
      const section = container.querySelector('section');
      // Check for responsive padding
      const paddingElement = section?.querySelector('[class*="px-"]');
      expect(paddingElement).toBeInTheDocument();
    });

    it('should have max-width constraint', () => {
      const { container } = render(<Hero language="pt" />);
      const section = container.querySelector('section');
      const maxWidthElement = section?.querySelector('[class*="max-w-"]');
      expect(maxWidthElement).toBeInTheDocument();
    });

    it('should hide right column on mobile (lg:hidden)', () => {
      const { container } = render(<Hero language="pt" />);
      const section = container.querySelector('section');
      const hiddenColumn = section?.querySelector('[class*="lg:flex"]');
      expect(hiddenColumn).toBeInTheDocument();
      expect(hiddenColumn).toHaveClass('hidden');
      expect(hiddenColumn).toHaveClass('lg:flex');
    });
  });

  describe('Color and Styling Classes', () => {
    it('should have dark theme gradient background', () => {
      const { container } = render(<Hero language="pt" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-gradient-to-br');
      expect(section).toHaveClass('from-slate-900');
      expect(section).toHaveClass('via-slate-800');
      expect(section).toHaveClass('to-slate-900');
    });

    it('should have white text for primary heading', () => {
      render(<Hero language="pt" />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveClass('text-white');
      expect(h1).toHaveClass('font-bold');
    });

    it('should have blue accent color for location', () => {
      render(<Hero language="pt" />);
      const locationElement = screen.getByText(
        professionalProfile.location.pt
      );
      expect(locationElement).toHaveClass('text-blue-400');
    });

    it('should have stat boxes with slate background', () => {
      const { container } = render(<Hero language="pt" />);
      const section = container.querySelector('section');
      const statBoxes = section?.querySelectorAll('[class*="bg-slate-800"]');
      expect(statBoxes && statBoxes.length > 0).toBe(true);
    });
  });

  describe('Animation Classes', () => {
    it('should have pulse animation on background elements', () => {
      const { container } = render(<Hero language="pt" />);
      const section = container.querySelector('section');
      const animatedElements = section?.querySelectorAll('[class*="animate-pulse"]');
      expect(animatedElements && animatedElements.length > 0).toBe(true);
    });

    it('should have bounce animation on scroll indicator', () => {
      const { container } = render(<Hero language="pt" />);
      const section = container.querySelector('section');
      const bounceElement = section?.querySelector('[class*="animate-bounce"]');
      expect(bounceElement).toBeInTheDocument();
    });
  });

  describe('Language Prop Handling', () => {
    it('should handle PT language prop correctly', () => {
      const { unmount } = render(<Hero language="pt" />);
      expect(
        screen.getByText(professionalProfile.title.pt)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(professionalProfile.title.en)
      ).not.toBeInTheDocument();
      unmount();
    });

    it('should handle EN language prop correctly', () => {
      const { unmount } = render(<Hero language="en" />);
      expect(
        screen.getByText(professionalProfile.title.en)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(professionalProfile.title.pt)
      ).not.toBeInTheDocument();
      unmount();
    });

    it('should have default PT when no language prop provided', () => {
      render(<Hero />);
      expect(
        screen.getByText(professionalProfile.location.pt)
      ).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept language prop as string', () => {
      const { container } = render(<Hero language="pt" />);
      expect(container).toBeInTheDocument();
    });

    it('should have HeroProps interface with optional language', () => {
      // This test verifies the prop interface is properly typed
      // TypeScript will catch any mismatches at compile time
      const heroElement = <Hero language="pt" />;
      expect(heroElement).toBeDefined();
    });
  });
});
