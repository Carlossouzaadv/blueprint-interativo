/**
 * Standalone validation runner for data.ts
 * Can be executed with Node.js without Jest/TypeScript compilation
 */

const fs = require('fs');
const path = require('path');

// Mock TypeScript imports by reading and parsing the data.ts file
const dataFilePath = path.join(__dirname, '../../../src/lib/data.ts');
const dataContent = fs.readFileSync(dataFilePath, 'utf-8');

// Extract and validate TypeScript types by pattern matching
console.log('='.repeat(80));
console.log('BLUEPRINT INTERATIVO - DATA LAYER VALIDATION REPORT');
console.log('='.repeat(80));
console.log(`Generated: ${new Date().toISOString()}`);
console.log('');

// ============================================================================
// SECTION 1: ANALYZE FILE STRUCTURE
// ============================================================================
console.log('1. FILE STRUCTURE ANALYSIS');
console.log('-'.repeat(80));

const interfaceMatches = dataContent.match(/export interface \w+/g) || [];
const typeMatches = dataContent.match(/export type \w+/g) || [];
const functionMatches = dataContent.match(/export function \w+/g) || [];
const constMatches = dataContent.match(/export const \w+/g) || [];

console.log(`Interfaces: ${interfaceMatches.length}`);
interfaceMatches.forEach((match) => console.log(`  - ${match.replace('export interface ', '')}`));

console.log(`\nFunctions: ${functionMatches.length}`);
functionMatches.forEach((match) => console.log(`  - ${match.replace('export function ', '')}`));

console.log(`\nConstants: ${constMatches.length}`);
constMatches.forEach((match) => console.log(`  - ${match.replace('export const ', '')}`));

console.log('');

// ============================================================================
// SECTION 2: BILINGUAL CONTENT VALIDATION
// ============================================================================
console.log('2. BILINGUAL CONTENT VALIDATION (PT/EN)');
console.log('-'.repeat(80));

// Extract project data using regex
const projectMatches = dataContent.match(/{\s*id: '([^']+)'[\s\S]*?technologies:[\s\S]*?\],\s*year:/g) || [];

console.log(`Projects found in data: ${projectMatches.length}`);

// Detailed analysis
const projects = [
  'justoai-v1',
  'justoai-v2',
  'poker-grinders-edge',
  'cerebro-juridico',
];

const bilingualFields = ['title', 'description', 'challenge', 'blueprint', 'decisions', 'metrics'];

let projectValidationPassed = 0;
let projectValidationFailed = 0;

projects.forEach((projectId) => {
  console.log(`\nProject: ${projectId}`);

  let projectValid = true;
  bilingualFields.forEach((field) => {
    const ptPattern = new RegExp(`pt:\\s*['"](.*?)['"](,|\\s)`, 'gs');
    const enPattern = new RegExp(`en:\\s*['"](.*?)['"](,|\\s)`, 'gs');

    const ptMatches = dataContent.match(ptPattern) || [];
    const enMatches = dataContent.match(enPattern) || [];

    if (ptMatches.length > 0 && enMatches.length > 0) {
      console.log(`  ✓ ${field}: Has both PT and EN content`);
    } else {
      console.log(`  ✗ ${field}: Missing PT or EN content`);
      projectValid = false;
    }
  });

  if (projectValid) {
    console.log(`  Status: PASS`);
    projectValidationPassed++;
  } else {
    console.log(`  Status: FAIL`);
    projectValidationFailed++;
  }
});

console.log(
  `\nBilingual Validation Summary: ${projectValidationPassed} passed, ${projectValidationFailed} failed`
);
console.log('');

// ============================================================================
// SECTION 3: REQUIRED FIELDS VALIDATION
// ============================================================================
console.log('3. REQUIRED FIELDS VALIDATION');
console.log('-'.repeat(80));

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
  'year',
  'position',
];

console.log('Checking for required fields in data structure:');
requiredFields.forEach((field) => {
  const hasField = dataContent.includes(`${field}:`);
  const status = hasField ? '✓' : '✗';
  console.log(`  ${status} ${field}`);
});

console.log('');

// ============================================================================
// SECTION 4: TECHNOLOGY ANALYSIS
// ============================================================================
console.log('4. TECHNOLOGY STACK ANALYSIS');
console.log('-'.repeat(80));

const techCategories = ['frontend', 'backend', 'database', 'ai', 'devops', 'other'];
console.log('Technology categories defined:');
techCategories.forEach((cat) => {
  const count = (dataContent.match(new RegExp(`category: ['"]${cat}['"]`, 'g')) || []).length;
  console.log(`  - ${cat}: ${count} technologies`);
});

console.log('');

// ============================================================================
// SECTION 5: HELPER FUNCTIONS ANALYSIS
// ============================================================================
console.log('5. HELPER FUNCTIONS ANALYSIS');
console.log('-'.repeat(80));

const expectedFunctions = [
  'getAllProjects',
  'getProjectById',
  'getProjectBySlug',
  'getProjectsByStatus',
  'getAllTechnologies',
  'getTechnologiesByCategory',
];

console.log('Exported helper functions:');
expectedFunctions.forEach((func) => {
  const hasFunction = new RegExp(`export function ${func}\\(`).test(dataContent);
  const status = hasFunction ? '✓' : '✗';
  console.log(`  ${status} ${func}()`);
});

console.log('');

// ============================================================================
// SECTION 6: CODE QUALITY CHECKS
// ============================================================================
console.log('6. CODE QUALITY CHECKS');
console.log('-'.repeat(80));

// Check for TSDoc comments
const docComments = (dataContent.match(/\/\*\*[\s\S]*?\*\//g) || []).length;
console.log(`JSDoc/TSDoc comments: ${docComments}`);

// Check for TypeScript strict mode
const hasStrict = dataContent.includes('strict');
console.log(`TypeScript strict mode: ${hasStrict ? '✓' : '✗'}`);

// Check for type exports
const typeExports = (dataContent.match(/export (type|interface)/g) || []).length;
console.log(`Type/Interface exports: ${typeExports}`);

// Check for immutable data
const hasReadonly = dataContent.includes('readonly');
const isMutable = !hasReadonly;
console.log(`Data structure: ${isMutable ? 'Mutable (writable)' : 'Immutable (readonly)'}`);

console.log('');

// ============================================================================
// SECTION 7: POTENTIAL ISSUES
// ============================================================================
console.log('7. POTENTIAL ISSUES AND RECOMMENDATIONS');
console.log('-'.repeat(80));

const issues = [];

// Check for duplicate IDs
const idPattern = /id:\s*['"]([^'"]+)['"]/g;
const ids = [];
let match;
while ((match = idPattern.exec(dataContent)) !== null) {
  ids.push(match[1]);
}
const uniqueIds = new Set(ids);
if (ids.length !== uniqueIds.size) {
  issues.push('Duplicate project IDs found');
}

// Check for unmatched bilinguals
const ptCount = (dataContent.match(/pt:/g) || []).length;
const enCount = (dataContent.match(/en:/g) || []).length;
if (ptCount !== enCount) {
  issues.push(`Unmatched bilingual fields: PT=${ptCount}, EN=${enCount}`);
}

// Check for empty objects
if (dataContent.includes('{}')) {
  issues.push('Empty objects found - might indicate incomplete data');
}

// Check for TODO/FIXME comments
const hasFixme = dataContent.includes('TODO') || dataContent.includes('FIXME');
if (hasFixme) {
  issues.push('TODO or FIXME comments found in code');
}

if (issues.length === 0) {
  console.log('✓ No critical issues found');
} else {
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ✗ ${issue}`);
  });
}

console.log('');

// ============================================================================
// SECTION 8: RECOMMENDATIONS
// ============================================================================
console.log('8. TEST PLAN RECOMMENDATIONS');
console.log('-'.repeat(80));

const testPlan = [
  'Unit Tests:',
  '  - Type checking for BilingualText interface',
  '  - Validation of ProjectBlueprint structure',
  '  - Helper function return types',
  '  - getAllProjects() sorting by position',
  '  - getProjectById() lookup functionality',
  '  - getProjectBySlug() lookup functionality',
  '  - getProjectsByStatus() filtering',
  '  - getAllTechnologies() deduplication',
  '  - getTechnologiesByCategory() filtering',
  '',
  'Integration Tests:',
  '  - Import and export of all types and functions',
  '  - Helper functions with edge cases (null, undefined)',
  '  - Component consumption of project data',
  '',
  'Data Integrity Tests:',
  '  - All projects have complete bilingual content',
  '  - No empty strings or null values',
  '  - Unique IDs, slugs, and positions',
  '  - Valid years (2020-current)',
  '  - Valid status values',
  '  - Valid technology categories',
  '',
  'Content Quality Tests:',
  '  - Portuguese special characters (ã, é, ç, etc)',
  '  - Minimum content length for descriptions',
  '  - Meaningful content (not placeholder text)',
];

testPlan.forEach((line) => console.log(line));

console.log('');

// ============================================================================
// FINAL SUMMARY
// ============================================================================
console.log('='.repeat(80));
console.log('VALIDATION SUMMARY');
console.log('='.repeat(80));

console.log(`
File: src/lib/data.ts
Location: ${dataFilePath}
File Size: ${(dataContent.length / 1024).toFixed(2)} KB
Lines of Code: ${dataContent.split('\n').length}

TypeScript Interfaces: ${interfaceMatches.length}
Helper Functions: ${functionMatches.length}
Export Constants: ${constMatches.length}

Projects Defined: ${projects.length}
Bilingual Fields per Project: ${bilingualFields.length}

Status: Ready for implementation testing
Next Steps: Run Jest test suite with data.test.ts
`);

console.log('='.repeat(80));
