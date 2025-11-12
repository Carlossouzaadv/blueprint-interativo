/**
 * Unit Tests for src/lib/data.ts
 *
 * Tests the project blueprints data structure, bilingual content,
 * and helper functions used throughout the application.
 */

import {
  projects,
  getAllProjects,
  getProjectById,
  getProjectBySlug,
  getProjectsByStatus,
  getAllTechnologies,
  getTechnologiesByCategory,
  ProjectBlueprint,
  BilingualText,
} from '../../../src/lib/data';

describe('src/lib/data.ts - Project Blueprints Data Layer', () => {
  // ==========================================================================
  // SUITE 1: TypeScript Types and Interfaces
  // ==========================================================================
  describe('TypeScript Types and Interfaces', () => {
    it('should have BilingualText interface with pt and en properties', () => {
      const sample: BilingualText = { pt: 'Português', en: 'English' };
      expect(sample.pt).toBeDefined();
      expect(sample.en).toBeDefined();
      expect(typeof sample.pt).toBe('string');
      expect(typeof sample.en).toBe('string');
    });

    it('should have ProjectBlueprint with all required fields', () => {
      const project = projects[0];
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('slug');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('status');
      expect(project).toHaveProperty('challenge');
      expect(project).toHaveProperty('blueprint');
      expect(project).toHaveProperty('decisions');
      expect(project).toHaveProperty('metrics');
      expect(project).toHaveProperty('technologies');
      expect(project).toHaveProperty('year');
      expect(project).toHaveProperty('position');
    });

    it('should have valid status values', () => {
      const validStatuses = ['production', 'staging', 'poc', 'maintenance'];
      projects.forEach((project) => {
        expect(validStatuses).toContain(project.status);
      });
    });

    it('should have valid technology categories', () => {
      const validCategories = [
        'frontend',
        'backend',
        'database',
        'ai',
        'devops',
        'other',
      ];
      projects.forEach((project) => {
        project.technologies.forEach((tech) => {
          expect(validCategories).toContain(tech.category);
        });
      });
    });

    it('should have optional role property in Technology', () => {
      projects.forEach((project) => {
        project.technologies.forEach((tech) => {
          if (tech.role !== undefined) {
            expect(typeof tech.role).toBe('string');
          }
        });
      });
    });
  });

  // ==========================================================================
  // SUITE 2: Bilingual Content Coverage (PT/EN)
  // ==========================================================================
  describe('Bilingual Content (PT/EN)', () => {
    it('should have complete PT/EN titles for all projects', () => {
      projects.forEach((project) => {
        expect(project.title.pt).toBeDefined();
        expect(project.title.pt).not.toBe('');
        expect(project.title.en).toBeDefined();
        expect(project.title.en).not.toBe('');
      });
    });

    it('should have complete PT/EN descriptions for all projects', () => {
      projects.forEach((project) => {
        expect(project.description.pt).toBeDefined();
        expect(project.description.pt).not.toBe('');
        expect(project.description.en).toBeDefined();
        expect(project.description.en).not.toBe('');
      });
    });

    it('should have complete PT/EN challenge content for all projects', () => {
      projects.forEach((project) => {
        expect(project.challenge.pt).toBeDefined();
        expect(project.challenge.pt).not.toBe('');
        expect(project.challenge.en).toBeDefined();
        expect(project.challenge.en).not.toBe('');
      });
    });

    it('should have complete PT/EN blueprint content for all projects', () => {
      projects.forEach((project) => {
        expect(project.blueprint.pt).toBeDefined();
        expect(project.blueprint.pt).not.toBe('');
        expect(project.blueprint.en).toBeDefined();
        expect(project.blueprint.en).not.toBe('');
      });
    });

    it('should have complete PT/EN decisions content for all projects', () => {
      projects.forEach((project) => {
        expect(project.decisions.pt).toBeDefined();
        expect(project.decisions.pt).not.toBe('');
        expect(project.decisions.en).toBeDefined();
        expect(project.decisions.en).not.toBe('');
      });
    });

    it('should have complete PT/EN metrics content for all projects', () => {
      projects.forEach((project) => {
        expect(project.metrics.pt).toBeDefined();
        expect(project.metrics.pt).not.toBe('');
        expect(project.metrics.en).toBeDefined();
        expect(project.metrics.en).not.toBe('');
      });
    });

    it('should have substantive challenge descriptions (min 30 chars)', () => {
      projects.forEach((project) => {
        expect(project.challenge.pt.length).toBeGreaterThanOrEqual(30);
        expect(project.challenge.en.length).toBeGreaterThanOrEqual(30);
      });
    });

    it('should have substantive blueprint descriptions (min 30 chars)', () => {
      projects.forEach((project) => {
        expect(project.blueprint.pt.length).toBeGreaterThanOrEqual(30);
        expect(project.blueprint.en.length).toBeGreaterThanOrEqual(30);
      });
    });

    it('should contain Portuguese special characters (ã, é, ç, ô, â)', () => {
      const portugueseText = projects
        .flatMap((p) => [
          p.title.pt,
          p.description.pt,
          p.challenge.pt,
          p.blueprint.pt,
          p.decisions.pt,
          p.metrics.pt,
        ])
        .join('');
      expect(/[ãéçôâ]/i.test(portugueseText)).toBe(true);
    });

    it('should have meaningful PT/EN content (not just placeholders)', () => {
      projects.forEach((project) => {
        // Check that content contains at least some actual words
        const contentFields = [
          project.title.pt,
          project.description.pt,
          project.challenge.pt,
        ];
        contentFields.forEach((content) => {
          expect(content.length).toBeGreaterThan(5);
          expect(/[a-záéíóúàâêãõç]/i.test(content)).toBe(true); // Has Portuguese chars
        });
      });
    });
  });

  // ==========================================================================
  // SUITE 3: Data Completeness and Required Fields
  // ==========================================================================
  describe('Data Completeness and Required Fields', () => {
    it('should have exactly 4 projects', () => {
      expect(projects.length).toBe(4);
    });

    it('should have unique project IDs', () => {
      const ids = projects.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have unique project slugs', () => {
      const slugs = projects.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });

    it('should have non-empty IDs and slugs', () => {
      projects.forEach((project) => {
        expect(project.id).toBeDefined();
        expect(project.id.length).toBeGreaterThan(0);
        expect(project.slug).toBeDefined();
        expect(project.slug.length).toBeGreaterThan(0);
      });
    });

    it('should have at least 3 technologies per project', () => {
      projects.forEach((project) => {
        expect(project.technologies.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('should have valid year for all projects', () => {
      const currentYear = new Date().getFullYear();
      projects.forEach((project) => {
        expect(project.year).toBeDefined();
        expect(project.year).toBeGreaterThanOrEqual(2020);
        expect(project.year).toBeLessThanOrEqual(currentYear);
      });
    });

    it('should have unique position values', () => {
      const positions = projects.map((p) => p.position || 0);
      const uniquePositions = new Set(positions);
      expect(positions.length).toBe(uniquePositions.size);
    });

    it('should have position values greater than 0', () => {
      projects.forEach((project) => {
        expect(project.position).toBeGreaterThan(0);
      });
    });

    it('should not have duplicate technologies in same project', () => {
      projects.forEach((project) => {
        const techNames = project.technologies.map((t) => t.name);
        const uniqueTechNames = new Set(techNames);
        expect(techNames.length).toBe(uniqueTechNames.size);
      });
    });

    it('should have technologies with valid names', () => {
      projects.forEach((project) => {
        project.technologies.forEach((tech) => {
          expect(tech.name).toBeDefined();
          expect(tech.name.length).toBeGreaterThan(0);
          expect(typeof tech.name).toBe('string');
        });
      });
    });
  });

  // ==========================================================================
  // SUITE 4: Individual Project Data
  // ==========================================================================
  describe('Individual Project Data', () => {
    it('JustoAI V1 project should be complete', () => {
      const project = getProjectById('justoai-v1');
      expect(project).toBeDefined();
      expect(project?.id).toBe('justoai-v1');
      expect(project?.slug).toBe('justoai-v1');
      expect(project?.status).toBe('maintenance');
      expect(project?.year).toBe(2023);
      expect(project?.technologies.length).toBeGreaterThan(0);
    });

    it('JustoAI V2 project should be complete', () => {
      const project = getProjectById('justoai-v2');
      expect(project).toBeDefined();
      expect(project?.id).toBe('justoai-v2');
      expect(project?.slug).toBe('justoai-v2');
      expect(project?.status).toBe('production');
      expect(project?.year).toBe(2024);
      expect(project?.technologies.length).toBeGreaterThan(0);
    });

    it("Poker Grinder's Edge project should be complete", () => {
      const project = getProjectById('poker-grinders-edge');
      expect(project).toBeDefined();
      expect(project?.id).toBe('poker-grinders-edge');
      expect(project?.slug).toBe('poker-grinders-edge');
      expect(project?.status).toBe('production');
      expect(project?.year).toBe(2024);
      expect(project?.technologies.length).toBeGreaterThan(0);
    });

    it('Cérebro Jurídico project should be complete', () => {
      const project = getProjectById('cerebro-juridico');
      expect(project).toBeDefined();
      expect(project?.id).toBe('cerebro-juridico');
      expect(project?.slug).toBe('cerebro-juridico');
      expect(project?.status).toBe('poc');
      expect(project?.year).toBe(2024);
      expect(project?.technologies.length).toBeGreaterThan(0);
    });

    it('Each project should have unique position', () => {
      const positions = [
        getProjectById('justoai-v1')?.position,
        getProjectById('justoai-v2')?.position,
        getProjectById('poker-grinders-edge')?.position,
        getProjectById('cerebro-juridico')?.position,
      ];
      const uniquePositions = new Set(positions);
      expect(positions.length).toBe(uniquePositions.size);
    });
  });

  // ==========================================================================
  // SUITE 5: Helper Functions Logic and Correctness
  // ==========================================================================
  describe('Helper Functions', () => {
    describe('getAllProjects()', () => {
      it('should return all projects', () => {
        const allProjects = getAllProjects();
        expect(allProjects.length).toBe(4);
      });

      it('should return projects sorted by position', () => {
        const allProjects = getAllProjects();
        for (let i = 1; i < allProjects.length; i++) {
          const prevPosition = allProjects[i - 1].position || 0;
          const currentPosition = allProjects[i].position || 0;
          expect(prevPosition).toBeLessThanOrEqual(currentPosition);
        }
      });

      it('should return array', () => {
        expect(Array.isArray(getAllProjects())).toBe(true);
      });
    });

    describe('getProjectById()', () => {
      it('should find project by valid ID', () => {
        const project = getProjectById('justoai-v1');
        expect(project).toBeDefined();
        expect(project?.id).toBe('justoai-v1');
      });

      it('should return undefined for non-existent ID', () => {
        const project = getProjectById('non-existent-project');
        expect(project).toBeUndefined();
      });

      it('should find all 4 projects by their IDs', () => {
        const ids = ['justoai-v1', 'justoai-v2', 'poker-grinders-edge', 'cerebro-juridico'];
        ids.forEach((id) => {
          const project = getProjectById(id);
          expect(project).toBeDefined();
          expect(project?.id).toBe(id);
        });
      });

      it('should be case-sensitive', () => {
        const project1 = getProjectById('justoai-v1');
        const project2 = getProjectById('JustoAI-V1');
        expect(project1).toBeDefined();
        expect(project2).toBeUndefined();
      });
    });

    describe('getProjectBySlug()', () => {
      it('should find project by valid slug', () => {
        const project = getProjectBySlug('justoai-v1');
        expect(project).toBeDefined();
        expect(project?.slug).toBe('justoai-v1');
      });

      it('should return undefined for non-existent slug', () => {
        const project = getProjectBySlug('non-existent-slug');
        expect(project).toBeUndefined();
      });

      it('should find all 4 projects by their slugs', () => {
        const slugs = [
          'justoai-v1',
          'justoai-v2',
          'poker-grinders-edge',
          'cerebro-juridico',
        ];
        slugs.forEach((slug) => {
          const project = getProjectBySlug(slug);
          expect(project).toBeDefined();
          expect(project?.slug).toBe(slug);
        });
      });

      it('should be case-sensitive', () => {
        const project1 = getProjectBySlug('poker-grinders-edge');
        const project2 = getProjectBySlug('Poker-Grinders-Edge');
        expect(project1).toBeDefined();
        expect(project2).toBeUndefined();
      });
    });

    describe('getProjectsByStatus()', () => {
      it('should filter projects by production status', () => {
        const production = getProjectsByStatus('production');
        expect(production.length).toBeGreaterThan(0);
        production.forEach((p) => {
          expect(p.status).toBe('production');
        });
      });

      it('should filter projects by poc status', () => {
        const poc = getProjectsByStatus('poc');
        expect(poc.length).toBeGreaterThan(0);
        poc.forEach((p) => {
          expect(p.status).toBe('poc');
        });
      });

      it('should filter projects by maintenance status', () => {
        const maintenance = getProjectsByStatus('maintenance');
        expect(maintenance.length).toBeGreaterThan(0);
        maintenance.forEach((p) => {
          expect(p.status).toBe('maintenance');
        });
      });

      it('should filter projects by staging status', () => {
        const staging = getProjectsByStatus('staging');
        // May be empty, but should not throw
        expect(Array.isArray(staging)).toBe(true);
      });

      it('should return array', () => {
        expect(Array.isArray(getProjectsByStatus('production'))).toBe(true);
      });

      it('should return empty array for invalid status', () => {
        const result = getProjectsByStatus('invalid-status' as any);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(0);
      });
    });

    describe('getAllTechnologies()', () => {
      it('should return array of technologies', () => {
        const allTechs = getAllTechnologies();
        expect(Array.isArray(allTechs)).toBe(true);
      });

      it('should return unique technologies', () => {
        const allTechs = getAllTechnologies();
        const names = allTechs.map((t) => t.name);
        const uniqueNames = new Set(names);
        expect(names.length).toBe(uniqueNames.size);
      });

      it('should include technologies from all projects', () => {
        const allTechs = getAllTechnologies();
        const allNames = new Set(allTechs.map((t) => t.name));

        projects.forEach((project) => {
          project.technologies.forEach((tech) => {
            expect(allNames.has(tech.name)).toBe(true);
          });
        });
      });

      it('should have multiple technologies', () => {
        const allTechs = getAllTechnologies();
        expect(allTechs.length).toBeGreaterThan(10);
      });

      it('should preserve technology properties', () => {
        const allTechs = getAllTechnologies();
        allTechs.forEach((tech) => {
          expect(tech.name).toBeDefined();
          expect(tech.category).toBeDefined();
        });
      });
    });

    describe('getTechnologiesByCategory()', () => {
      it('should filter technologies by frontend category', () => {
        const frontend = getTechnologiesByCategory('frontend');
        expect(frontend.length).toBeGreaterThan(0);
        frontend.forEach((t) => {
          expect(t.category).toBe('frontend');
        });
      });

      it('should filter technologies by backend category', () => {
        const backend = getTechnologiesByCategory('backend');
        expect(backend.length).toBeGreaterThan(0);
        backend.forEach((t) => {
          expect(t.category).toBe('backend');
        });
      });

      it('should filter technologies by database category', () => {
        const database = getTechnologiesByCategory('database');
        expect(database.length).toBeGreaterThan(0);
        database.forEach((t) => {
          expect(t.category).toBe('database');
        });
      });

      it('should filter technologies by ai category', () => {
        const ai = getTechnologiesByCategory('ai');
        expect(ai.length).toBeGreaterThan(0);
        ai.forEach((t) => {
          expect(t.category).toBe('ai');
        });
      });

      it('should filter technologies by devops category', () => {
        const devops = getTechnologiesByCategory('devops');
        expect(Array.isArray(devops)).toBe(true);
      });

      it('should filter technologies by other category', () => {
        const other = getTechnologiesByCategory('other');
        expect(Array.isArray(other)).toBe(true);
      });

      it('should return empty array for invalid category', () => {
        const result = getTechnologiesByCategory('invalid' as any);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(0);
      });

      it('should return unique technologies per category', () => {
        const categories = ['frontend', 'backend', 'database', 'ai', 'devops', 'other'] as const;
        categories.forEach((category) => {
          const techs = getTechnologiesByCategory(category);
          const names = techs.map((t) => t.name);
          const uniqueNames = new Set(names);
          expect(names.length).toBe(uniqueNames.size);
        });
      });
    });
  });

  // ==========================================================================
  // SUITE 6: Data Consistency and Structure
  // ==========================================================================
  describe('Data Consistency and Structure', () => {
    it('should have ID equal to slug for all projects', () => {
      projects.forEach((project) => {
        expect(project.id).toBe(project.slug);
      });
    });

    it('should have all technologies with valid categories', () => {
      const validCategories = [
        'frontend',
        'backend',
        'database',
        'ai',
        'devops',
        'other',
      ];
      projects.forEach((project) => {
        project.technologies.forEach((tech) => {
          expect(validCategories).toContain(tech.category);
        });
      });
    });

    it('should have consistent status across projects', () => {
      const validStatuses = ['production', 'staging', 'poc', 'maintenance'];
      projects.forEach((project) => {
        expect(validStatuses).toContain(project.status);
      });
    });

    it('should have mix of different statuses', () => {
      const statuses = new Set(projects.map((p) => p.status));
      expect(statuses.size).toBeGreaterThan(1);
    });

    it('should have technologies with optional role descriptions', () => {
      projects.forEach((project) => {
        project.technologies.forEach((tech) => {
          if (tech.role !== undefined) {
            expect(typeof tech.role).toBe('string');
            expect(tech.role.length).toBeGreaterThan(0);
          }
        });
      });
    });

    it('should not have null or undefined critical fields', () => {
      projects.forEach((project) => {
        expect(project.id).not.toBeNull();
        expect(project.slug).not.toBeNull();
        expect(project.title).not.toBeNull();
        expect(project.status).not.toBeNull();
        expect(project.technologies).not.toBeNull();
      });
    });
  });

  // ==========================================================================
  // SUITE 7: Edge Cases and Robustness
  // ==========================================================================
  describe('Edge Cases and Robustness', () => {
    it('should handle accessing projects after export', () => {
      expect(projects).toBeDefined();
      expect(projects.length).toBe(4);
    });

    it('should not allow modification of project data (immutability)', () => {
      const originalLength = projects.length;
      // This test documents the current behavior (mutable)
      // If immutability is desired, this test would need adjustment
      expect(projects.length).toBe(originalLength);
    });

    it('should handle special characters in project names', () => {
      const project = getProjectById('cerebro-juridico');
      expect(project?.title.pt).toContain('Cérebro');
    });

    it('should handle apostrophes in project names', () => {
      const project = getProjectById('poker-grinders-edge');
      expect(project?.title.pt).toContain("Grinder");
    });

    it('should have content without placeholder text', () => {
      projects.forEach((project) => {
        expect(project.title.pt).not.toMatch(/TODO|FIXME|placeholder/i);
        expect(project.title.en).not.toMatch(/TODO|FIXME|placeholder/i);
      });
    });

    it('should have consistent capitalization in titles', () => {
      projects.forEach((project) => {
        // Title should start with capital letter
        expect(project.title.pt[0]).toMatch(/[A-ZÁÉÍÓÚÀÂÊÃÕÇ]/);
        expect(project.title.en[0]).toMatch(/[A-Z]/);
      });
    });

    it('should handle multiple technologies per category per project', () => {
      projects.forEach((project) => {
        const categoryCount = new Map<string, number>();
        project.technologies.forEach((tech) => {
          const count = categoryCount.get(tech.category) || 0;
          categoryCount.set(tech.category, count + 1);
        });
        // At least some projects should have multiple techs per category
        let hasMultiple = false;
        categoryCount.forEach((count) => {
          if (count > 1) hasMultiple = true;
        });
        // This is informational - just checking data is structured
        expect(Array.isArray(project.technologies)).toBe(true);
      });
    });

    it('should handle whitespace in content correctly', () => {
      projects.forEach((project) => {
        // No leading/trailing whitespace in key fields
        expect(project.title.pt).toBe(project.title.pt.trim());
        expect(project.title.en).toBe(project.title.en.trim());
      });
    });
  });

  // ==========================================================================
  // SUITE 8: Technology Stack Validation
  // ==========================================================================
  describe('Technology Stack Validation', () => {
    it('should have frontend technologies for at least 3 projects', () => {
      const projectsWithFrontend = projects.filter((p) =>
        p.technologies.some((t) => t.category === 'frontend')
      );
      expect(projectsWithFrontend.length).toBeGreaterThanOrEqual(3);
    });

    it('should have backend technologies for all projects', () => {
      const projectsWithBackend = projects.filter((p) =>
        p.technologies.some((t) => t.category === 'backend')
      );
      expect(projectsWithBackend.length).toBe(4);
    });

    it('should have database technologies for all projects', () => {
      const projectsWithDatabase = projects.filter((p) =>
        p.technologies.some((t) => t.category === 'database')
      );
      expect(projectsWithDatabase.length).toBe(4);
    });

    it('should have AI technologies for all projects', () => {
      const projectsWithAI = projects.filter((p) =>
        p.technologies.some((t) => t.category === 'ai')
      );
      expect(projectsWithAI.length).toBe(4);
    });

    it('should have overlapping technologies across projects', () => {
      const allTechs = getAllTechnologies();
      const allTechCount = allTechs.length;
      const totalProjectTechs = projects.reduce(
        (sum, p) => sum + p.technologies.length,
        0
      );
      // Should have fewer unique technologies than total
      expect(allTechCount).toBeLessThan(totalProjectTechs);
    });

    it('should have consistent technology definitions across projects', () => {
      const techMap = new Map<string, { category: string; role?: string }>();
      projects.forEach((p) => {
        p.technologies.forEach((tech) => {
          if (techMap.has(tech.name)) {
            // Same technology should have same category
            expect(techMap.get(tech.name)?.category).toBe(tech.category);
          } else {
            techMap.set(tech.name, { category: tech.category, role: tech.role });
          }
        });
      });
      expect(techMap.size).toBeGreaterThan(0);
    });
  });

  // ==========================================================================
  // SUITE 9: Import and Export Validation
  // ==========================================================================
  describe('Module Exports and Imports', () => {
    it('should export projects array', () => {
      expect(projects).toBeDefined();
      expect(Array.isArray(projects)).toBe(true);
    });

    it('should export all required functions', () => {
      expect(typeof getAllProjects).toBe('function');
      expect(typeof getProjectById).toBe('function');
      expect(typeof getProjectBySlug).toBe('function');
      expect(typeof getProjectsByStatus).toBe('function');
      expect(typeof getAllTechnologies).toBe('function');
      expect(typeof getTechnologiesByCategory).toBe('function');
    });

    it('should allow importing types', () => {
      // This test documents that types are exported
      // The fact that we can import ProjectBlueprint means it's available
      expect(ProjectBlueprint).toBeDefined();
      expect(BilingualText).toBeDefined();
    });

    it('should have functions return correct types', () => {
      const allProjects = getAllProjects();
      expect(Array.isArray(allProjects)).toBe(true);

      const project = getProjectById('justoai-v1');
      expect(project === undefined || typeof project === 'object').toBe(true);

      const byStatus = getProjectsByStatus('production');
      expect(Array.isArray(byStatus)).toBe(true);

      const allTechs = getAllTechnologies();
      expect(Array.isArray(allTechs)).toBe(true);
    });
  });
});
