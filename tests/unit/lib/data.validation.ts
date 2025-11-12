/**
 * Comprehensive validation tests for src/lib/data.ts
 *
 * This file contains both automated validation logic and test specifications
 * for the project blueprints data structure.
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

/**
 * VALIDATION SUITE: TypeScript Types and Interfaces
 */
export const typeValidationTests = {
  name: 'TypeScript Type System',
  tests: [
    {
      id: 'type-bilingual-text',
      description: 'BilingualText interface should have pt and en properties',
      validate: (): boolean => {
        const sample: BilingualText = { pt: 'Português', en: 'English' };
        return 'pt' in sample && 'en' in sample;
      },
      expectedResult: true,
    },
    {
      id: 'type-project-blueprint',
      description: 'ProjectBlueprint should have all required fields',
      validate: (): boolean => {
        const requiredFields = [
          'id',
          'slug',
          'title',
          'description',
          'status',
          'challenge',
          'blueprint',
          'decisions',
          'metrics',
          'technologies',
        ];
        const project = projects[0];
        return requiredFields.every((field) => field in project);
      },
      expectedResult: true,
    },
    {
      id: 'type-status-enum',
      description: 'Status should be one of: production, staging, poc, maintenance',
      validate: (): boolean => {
        const validStatuses = ['production', 'staging', 'poc', 'maintenance'];
        return projects.every((p) => validStatuses.includes(p.status));
      },
      expectedResult: true,
    },
    {
      id: 'type-technology-categories',
      description: 'All technologies should have valid categories',
      validate: (): boolean => {
        const validCategories = [
          'frontend',
          'backend',
          'database',
          'ai',
          'devops',
          'other',
        ];
        return projects.every((project) =>
          project.technologies.every((tech) =>
            validCategories.includes(tech.category)
          )
        );
      },
      expectedResult: true,
    },
  ],
};

/**
 * VALIDATION SUITE: Bilingual Content Coverage
 */
export const bilingualValidationTests = {
  name: 'Bilingual Content (PT/EN)',
  tests: [
    {
      id: 'i18n-all-titles-complete',
      description: 'All projects must have PT and EN titles',
      validate: (): boolean => {
        return projects.every(
          (p) => p.title.pt && p.title.pt.length > 0 && p.title.en && p.title.en.length > 0
        );
      },
      expectedResult: true,
    },
    {
      id: 'i18n-all-descriptions-complete',
      description: 'All projects must have PT and EN descriptions',
      validate: (): boolean => {
        return projects.every(
          (p) =>
            p.description.pt &&
            p.description.pt.length > 0 &&
            p.description.en &&
            p.description.en.length > 0
        );
      },
      expectedResult: true,
    },
    {
      id: 'i18n-all-challenges-complete',
      description: 'All projects must have PT and EN challenge descriptions',
      validate: (): boolean => {
        return projects.every(
          (p) =>
            p.challenge.pt &&
            p.challenge.pt.length > 0 &&
            p.challenge.en &&
            p.challenge.en.length > 0
        );
      },
      expectedResult: true,
    },
    {
      id: 'i18n-all-blueprints-complete',
      description: 'All projects must have PT and EN blueprint descriptions',
      validate: (): boolean => {
        return projects.every(
          (p) =>
            p.blueprint.pt &&
            p.blueprint.pt.length > 0 &&
            p.blueprint.en &&
            p.blueprint.en.length > 0
        );
      },
      expectedResult: true,
    },
    {
      id: 'i18n-all-decisions-complete',
      description: 'All projects must have PT and EN decision descriptions',
      validate: (): boolean => {
        return projects.every(
          (p) =>
            p.decisions.pt &&
            p.decisions.pt.length > 0 &&
            p.decisions.en &&
            p.decisions.en.length > 0
        );
      },
      expectedResult: true,
    },
    {
      id: 'i18n-all-metrics-complete',
      description: 'All projects must have PT and EN metrics descriptions',
      validate: (): boolean => {
        return projects.every(
          (p) =>
            p.metrics.pt &&
            p.metrics.pt.length > 0 &&
            p.metrics.en &&
            p.metrics.en.length > 0
        );
      },
      expectedResult: true,
    },
    {
      id: 'i18n-content-quality-challenge',
      description: 'Challenge descriptions should be substantive (min 30 chars each)',
      validate: (): boolean => {
        return projects.every(
          (p) => p.challenge.pt.length >= 30 && p.challenge.en.length >= 30
        );
      },
      expectedResult: true,
    },
    {
      id: 'i18n-content-quality-blueprint',
      description: 'Blueprint descriptions should be substantive (min 30 chars each)',
      validate: (): boolean => {
        return projects.every(
          (p) => p.blueprint.pt.length >= 30 && p.blueprint.en.length >= 30
        );
      },
      expectedResult: true,
    },
  ],
};

/**
 * VALIDATION SUITE: Required Fields and Data Completeness
 */
export const completenessValidationTests = {
  name: 'Data Completeness and Required Fields',
  tests: [
    {
      id: 'completeness-all-projects-have-ids',
      description: 'All projects must have unique IDs',
      validate: (): boolean => {
        const ids = projects.map((p) => p.id);
        return ids.length === new Set(ids).size && ids.every((id) => id && id.length > 0);
      },
      expectedResult: true,
    },
    {
      id: 'completeness-all-projects-have-slugs',
      description: 'All projects must have unique slugs',
      validate: (): boolean => {
        const slugs = projects.map((p) => p.slug);
        return (
          slugs.length === new Set(slugs).size && slugs.every((slug) => slug && slug.length > 0)
        );
      },
      expectedResult: true,
    },
    {
      id: 'completeness-all-projects-have-technologies',
      description: 'All projects must list at least 3 technologies',
      validate: (): boolean => {
        return projects.every((p) => p.technologies && p.technologies.length >= 3);
      },
      expectedResult: true,
    },
    {
      id: 'completeness-all-projects-have-year',
      description: 'All projects should have a year field',
      validate: (): boolean => {
        return projects.every((p) => p.year && p.year > 2000 && p.year <= 2025);
      },
      expectedResult: true,
    },
    {
      id: 'completeness-all-projects-have-position',
      description: 'All projects should have a position field for ordering',
      validate: (): boolean => {
        return projects.every((p) => typeof p.position === 'number' && p.position > 0);
      },
      expectedResult: true,
    },
    {
      id: 'completeness-positions-are-unique',
      description: 'All projects should have unique position values',
      validate: (): boolean => {
        const positions = projects.map((p) => p.position || 0);
        return positions.length === new Set(positions).size;
      },
      expectedResult: true,
    },
    {
      id: 'completeness-technology-names-unique-per-project',
      description: 'No project should list the same technology twice',
      validate: (): boolean => {
        return projects.every((p) => {
          const techNames = p.technologies.map((t) => t.name);
          return techNames.length === new Set(techNames).size;
        });
      },
      expectedResult: true,
    },
  ],
};

/**
 * VALIDATION SUITE: Individual Project Data
 */
export const projectValidationTests = {
  name: 'Individual Project Data Validation',
  tests: [
    {
      id: 'project-justoai-v1-complete',
      description: 'JustoAI V1 project should be complete with all fields',
      validate: (): boolean => {
        const project = getProjectById('justoai-v1');
        return (
          project !== undefined &&
          project.title.pt &&
          project.title.en &&
          project.challenge.pt &&
          project.challenge.en &&
          project.blueprint.pt &&
          project.blueprint.en &&
          project.decisions.pt &&
          project.decisions.en &&
          project.metrics.pt &&
          project.metrics.en &&
          project.technologies.length > 0
        );
      },
      expectedResult: true,
    },
    {
      id: 'project-justoai-v2-complete',
      description: 'JustoAI V2 project should be complete with all fields',
      validate: (): boolean => {
        const project = getProjectById('justoai-v2');
        return (
          project !== undefined &&
          project.title.pt &&
          project.title.en &&
          project.challenge.pt &&
          project.challenge.en &&
          project.blueprint.pt &&
          project.blueprint.en &&
          project.decisions.pt &&
          project.decisions.en &&
          project.metrics.pt &&
          project.metrics.en &&
          project.technologies.length > 0
        );
      },
      expectedResult: true,
    },
    {
      id: 'project-poker-grinders-edge-complete',
      description: "Poker Grinder's Edge project should be complete",
      validate: (): boolean => {
        const project = getProjectById('poker-grinders-edge');
        return (
          project !== undefined &&
          project.title.pt &&
          project.title.en &&
          project.challenge.pt &&
          project.challenge.en &&
          project.blueprint.pt &&
          project.blueprint.en &&
          project.decisions.pt &&
          project.decisions.en &&
          project.metrics.pt &&
          project.metrics.en &&
          project.technologies.length > 0
        );
      },
      expectedResult: true,
    },
    {
      id: 'project-cerebro-juridico-complete',
      description: 'Cérebro Jurídico project should be complete',
      validate: (): boolean => {
        const project = getProjectById('cerebro-juridico');
        return (
          project !== undefined &&
          project.title.pt &&
          project.title.en &&
          project.challenge.pt &&
          project.challenge.en &&
          project.blueprint.pt &&
          project.blueprint.en &&
          project.decisions.pt &&
          project.decisions.en &&
          project.metrics.pt &&
          project.metrics.en &&
          project.technologies.length > 0
        );
      },
      expectedResult: true,
    },
  ],
};

/**
 * VALIDATION SUITE: Helper Functions
 */
export const helperFunctionsTests = {
  name: 'Helper Functions Logic',
  tests: [
    {
      id: 'helper-getAllProjects-sorts-by-position',
      description: 'getAllProjects() should return sorted by position',
      validate: (): boolean => {
        const sorted = getAllProjects();
        for (let i = 1; i < sorted.length; i++) {
          if ((sorted[i - 1].position || 0) > (sorted[i].position || 0)) {
            return false;
          }
        }
        return true;
      },
      expectedResult: true,
    },
    {
      id: 'helper-getProjectById-finds-project',
      description: 'getProjectById() should find project by ID',
      validate: (): boolean => {
        const project = getProjectById('justoai-v1');
        return project !== undefined && project.id === 'justoai-v1';
      },
      expectedResult: true,
    },
    {
      id: 'helper-getProjectById-returns-undefined-on-miss',
      description: 'getProjectById() should return undefined for non-existent ID',
      validate: (): boolean => {
        return getProjectById('non-existent-project') === undefined;
      },
      expectedResult: true,
    },
    {
      id: 'helper-getProjectBySlug-finds-project',
      description: 'getProjectBySlug() should find project by slug',
      validate: (): boolean => {
        const project = getProjectBySlug('justoai-v1');
        return project !== undefined && project.slug === 'justoai-v1';
      },
      expectedResult: true,
    },
    {
      id: 'helper-getProjectBySlug-returns-undefined-on-miss',
      description: 'getProjectBySlug() should return undefined for non-existent slug',
      validate: (): boolean => {
        return getProjectBySlug('non-existent-slug') === undefined;
      },
      expectedResult: true,
    },
    {
      id: 'helper-getProjectsByStatus-filters-correctly',
      description: 'getProjectsByStatus() should filter by status',
      validate: (): boolean => {
        const production = getProjectsByStatus('production');
        return production.every((p) => p.status === 'production');
      },
      expectedResult: true,
    },
    {
      id: 'helper-getAllTechnologies-returns-unique',
      description: 'getAllTechnologies() should return unique technologies',
      validate: (): boolean => {
        const allTechs = getAllTechnologies();
        const names = allTechs.map((t) => t.name);
        return names.length === new Set(names).size;
      },
      expectedResult: true,
    },
    {
      id: 'helper-getAllTechnologies-covers-all-projects',
      description: 'getAllTechnologies() should include all tech from all projects',
      validate: (): boolean => {
        const allTechs = getAllTechnologies();
        const allNames = new Set(allTechs.map((t) => t.name));
        return projects.every((p) =>
          p.technologies.every((t) => allNames.has(t.name))
        );
      },
      expectedResult: true,
    },
    {
      id: 'helper-getTechnologiesByCategory-filters-correctly',
      description: 'getTechnologiesByCategory() should filter by category',
      validate: (): boolean => {
        const frontend = getTechnologiesByCategory('frontend');
        return frontend.every((t) => t.category === 'frontend');
      },
      expectedResult: true,
    },
  ],
};

/**
 * VALIDATION SUITE: Data Structure Consistency
 */
export const consistencyValidationTests = {
  name: 'Data Structure Consistency',
  tests: [
    {
      id: 'consistency-id-slug-match',
      description: 'Project ID and slug should be identical or closely related',
      validate: (): boolean => {
        return projects.every((p) => p.id === p.slug);
      },
      expectedResult: true,
    },
    {
      id: 'consistency-technologies-have-categories',
      description: 'All technologies must have a category',
      validate: (): boolean => {
        return projects.every((p) =>
          p.technologies.every((t) => t.category !== undefined && t.category !== null)
        );
      },
      expectedResult: true,
    },
    {
      id: 'consistency-valid-years',
      description: 'All project years should be valid and reasonable',
      validate: (): boolean => {
        const currentYear = new Date().getFullYear();
        return projects.every(
          (p) => p.year && p.year >= 2020 && p.year <= currentYear
        );
      },
      expectedResult: true,
    },
    {
      id: 'consistency-status-distribution',
      description: 'Should have mix of statuses (not all same)',
      validate: (): boolean => {
        const statuses = new Set(projects.map((p) => p.status));
        return statuses.size > 1;
      },
      expectedResult: true,
    },
  ],
};

/**
 * VALIDATION SUITE: Edge Cases and Potential Issues
 */
export const edgeCaseValidationTests = {
  name: 'Edge Cases and Potential Issues',
  tests: [
    {
      id: 'edge-case-empty-strings',
      description: 'No bilingual fields should be empty strings',
      validate: (): boolean => {
        return !projects.some(
          (p) =>
            p.title.pt === '' ||
            p.title.en === '' ||
            p.description.pt === '' ||
            p.description.en === '' ||
            p.challenge.pt === '' ||
            p.challenge.en === '' ||
            p.blueprint.pt === '' ||
            p.blueprint.en === '' ||
            p.decisions.pt === '' ||
            p.decisions.en === '' ||
            p.metrics.pt === '' ||
            p.metrics.en === ''
        );
      },
      expectedResult: true,
    },
    {
      id: 'edge-case-null-values',
      description: 'No critical fields should be null',
      validate: (): boolean => {
        return !projects.some(
          (p) =>
            p.id === null ||
            p.slug === null ||
            p.title === null ||
            p.status === null ||
            p.technologies === null
        );
      },
      expectedResult: true,
    },
    {
      id: 'edge-case-projects-count',
      description: 'Should have exactly 4 projects',
      validate: (): boolean => {
        return projects.length === 4;
      },
      expectedResult: true,
    },
    {
      id: 'edge-case-technology-role-optional',
      description: 'Technology role should be optional but consistent',
      validate: (): boolean => {
        return projects.every((p) =>
          p.technologies.every((t) => typeof t.role === 'string' || t.role === undefined)
        );
      },
      expectedResult: true,
    },
    {
      id: 'edge-case-special-characters',
      description: 'Should handle special characters in Portuguese (ã, é, ç, etc)',
      validate: (): boolean => {
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
        return /[ãéçôâ]/i.test(portugueseText);
      },
      expectedResult: true,
    },
  ],
};

/**
 * VALIDATION SUITE: Import and Component Integration
 */
export const importIntegrationTests = {
  name: 'Import and Component Integration',
  tests: [
    {
      id: 'import-projects-array-exists',
      description: 'projects array should be importable and populated',
      validate: (): boolean => {
        return (
          Array.isArray(projects) && projects.length > 0
        );
      },
      expectedResult: true,
    },
    {
      id: 'import-all-functions-exist',
      description: 'All helper functions should be exported and callable',
      validate: (): boolean => {
        return (
          typeof getAllProjects === 'function' &&
          typeof getProjectById === 'function' &&
          typeof getProjectBySlug === 'function' &&
          typeof getProjectsByStatus === 'function' &&
          typeof getAllTechnologies === 'function' &&
          typeof getTechnologiesByCategory === 'function'
        );
      },
      expectedResult: true,
    },
    {
      id: 'import-functions-return-correct-types',
      description: 'Helper functions should return expected types',
      validate: (): boolean => {
        return (
          Array.isArray(getAllProjects()) &&
          (getProjectById('invalid') === undefined ||
            typeof getProjectById('justoai-v1') === 'object') &&
          (getProjectBySlug('invalid') === undefined ||
            typeof getProjectBySlug('justoai-v1') === 'object') &&
          Array.isArray(getProjectsByStatus('production')) &&
          Array.isArray(getAllTechnologies()) &&
          Array.isArray(getTechnologiesByCategory('frontend'))
        );
      },
      expectedResult: true,
    },
  ],
};

/**
 * RUN ALL VALIDATIONS
 */
export function runAllValidations() {
  const allSuites = [
    typeValidationTests,
    bilingualValidationTests,
    completenessValidationTests,
    projectValidationTests,
    helperFunctionsTests,
    consistencyValidationTests,
    edgeCaseValidationTests,
    importIntegrationTests,
  ];

  const results = allSuites.map((suite) => {
    const testResults = suite.tests.map((test) => {
      try {
        const result = test.validate();
        return {
          id: test.id,
          description: test.description,
          passed: result === test.expectedResult,
          result,
          expectedResult: test.expectedResult,
          error: null,
        };
      } catch (error) {
        return {
          id: test.id,
          description: test.description,
          passed: false,
          result: null,
          expectedResult: test.expectedResult,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    });

    return {
      suiteName: suite.name,
      totalTests: testResults.length,
      passedTests: testResults.filter((t) => t.passed).length,
      failedTests: testResults.filter((t) => !t.passed).length,
      tests: testResults,
    };
  });

  return results;
}
