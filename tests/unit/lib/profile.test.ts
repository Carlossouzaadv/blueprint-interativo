/**
 * Unit Tests for Professional Profile Data Structure
 *
 * Tests the profile.ts data structure for:
 * - Type correctness
 * - Bilingual content (PT/EN) completeness
 * - Contact information validity
 * - Data integrity
 */

import {
  professionalProfile,
  getContactLinks,
  ProfessionalProfile,
  ContactInfo,
} from '@/lib/profile';

describe('Professional Profile Data Structure', () => {
  describe('profile.ts Types', () => {
    it('should define ContactInfo interface with required fields', () => {
      const contact: ContactInfo = professionalProfile.contact;
      expect(contact).toHaveProperty('phone');
      expect(contact).toHaveProperty('email');
      expect(contact).toHaveProperty('linkedin');
      expect(contact).toHaveProperty('github');
    });

    it('should define ProfessionalProfile interface with all required fields', () => {
      const profile: ProfessionalProfile = professionalProfile;
      expect(profile).toHaveProperty('name');
      expect(profile).toHaveProperty('location');
      expect(profile).toHaveProperty('title');
      expect(profile).toHaveProperty('summary');
      expect(profile).toHaveProperty('keyStats');
      expect(profile).toHaveProperty('contact');
    });
  });

  describe('professionalProfile Object', () => {
    it('should have valid name property', () => {
      expect(professionalProfile.name).toBeDefined();
      expect(typeof professionalProfile.name).toBe('string');
      expect(professionalProfile.name.length).toBeGreaterThan(0);
      expect(professionalProfile.name).toBe('Carlos Souza');
    });

    it('should have bilingual location field', () => {
      expect(professionalProfile.location).toBeDefined();
      expect(professionalProfile.location).toHaveProperty('pt');
      expect(professionalProfile.location).toHaveProperty('en');
      expect(typeof professionalProfile.location.pt).toBe('string');
      expect(typeof professionalProfile.location.en).toBe('string');
      expect(professionalProfile.location.pt.length).toBeGreaterThan(0);
      expect(professionalProfile.location.en.length).toBeGreaterThan(0);
    });

    it('should have bilingual title field', () => {
      expect(professionalProfile.title).toBeDefined();
      expect(professionalProfile.title).toHaveProperty('pt');
      expect(professionalProfile.title).toHaveProperty('en');
      expect(typeof professionalProfile.title.pt).toBe('string');
      expect(typeof professionalProfile.title.en).toBe('string');
      expect(professionalProfile.title.pt.length).toBeGreaterThan(0);
      expect(professionalProfile.title.en.length).toBeGreaterThan(0);
    });

    it('should have bilingual summary field', () => {
      expect(professionalProfile.summary).toBeDefined();
      expect(professionalProfile.summary).toHaveProperty('pt');
      expect(professionalProfile.summary).toHaveProperty('en');
      expect(typeof professionalProfile.summary.pt).toBe('string');
      expect(typeof professionalProfile.summary.en).toBe('string');
      expect(professionalProfile.summary.pt.length).toBeGreaterThan(0);
      expect(professionalProfile.summary.en.length).toBeGreaterThan(0);
      // Portuguese summary should be substantial
      expect(professionalProfile.summary.pt.length).toBeGreaterThan(100);
      // English summary should be substantial
      expect(professionalProfile.summary.en.length).toBeGreaterThan(100);
    });

    it('should have keyStats array with bilingual labels', () => {
      expect(professionalProfile.keyStats).toBeDefined();
      expect(Array.isArray(professionalProfile.keyStats)).toBe(true);
      expect(professionalProfile.keyStats.length).toBeGreaterThan(0);

      professionalProfile.keyStats.forEach((stat) => {
        expect(stat).toHaveProperty('label');
        expect(stat).toHaveProperty('value');
        expect(stat.label).toHaveProperty('pt');
        expect(stat.label).toHaveProperty('en');
        expect(typeof stat.label.pt).toBe('string');
        expect(typeof stat.label.en).toBe('string');
        expect(typeof stat.value).toBe('string');
        expect(stat.label.pt.length).toBeGreaterThan(0);
        expect(stat.label.en.length).toBeGreaterThan(0);
        expect(stat.value.length).toBeGreaterThan(0);
      });
    });

    it('should have exactly 3 key stats', () => {
      expect(professionalProfile.keyStats.length).toBe(3);
    });

    it('should have valid key stats values', () => {
      expect(professionalProfile.keyStats[0].label.pt).toBe(
        'Anos de Experiência'
      );
      expect(professionalProfile.keyStats[0].label.en).toBe(
        'Years of Experience'
      );
      expect(professionalProfile.keyStats[0].value).toBe('14+');

      expect(professionalProfile.keyStats[1].label.pt).toBe('Projetos SaaS');
      expect(professionalProfile.keyStats[1].label.en).toBe('SaaS Projects');
      expect(professionalProfile.keyStats[1].value).toBe('4');

      expect(professionalProfile.keyStats[2].label.pt).toBe(
        'Certificações Técnicas'
      );
      expect(professionalProfile.keyStats[2].label.en).toBe(
        'Technical Certifications'
      );
      expect(professionalProfile.keyStats[2].value).toBe('5+');
    });
  });

  describe('Contact Information', () => {
    it('should have valid phone number', () => {
      expect(professionalProfile.contact.phone).toBeDefined();
      expect(typeof professionalProfile.contact.phone).toBe('string');
      // Phone should follow Brazilian format
      expect(professionalProfile.contact.phone).toMatch(/^\+55/);
    });

    it('should have valid email address', () => {
      expect(professionalProfile.contact.email).toBeDefined();
      expect(typeof professionalProfile.contact.email).toBe('string');
      expect(professionalProfile.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it('should have valid LinkedIn URL', () => {
      expect(professionalProfile.contact.linkedin).toBeDefined();
      expect(typeof professionalProfile.contact.linkedin).toBe('string');
      expect(professionalProfile.contact.linkedin).toMatch(
        /https?:\/\/(www\.)?linkedin\.com/
      );
    });

    it('should have valid GitHub URL', () => {
      expect(professionalProfile.contact.github).toBeDefined();
      expect(typeof professionalProfile.contact.github).toBe('string');
      expect(professionalProfile.contact.github).toMatch(
        /https?:\/\/(www\.)?github\.com/
      );
    });
  });

  describe('getContactLinks() Helper Function', () => {
    it('should return contact links object', () => {
      const links = getContactLinks();
      expect(links).toBeDefined();
      expect(links).toHaveProperty('linkedin');
      expect(links).toHaveProperty('github');
      expect(links).toHaveProperty('email');
      expect(links).toHaveProperty('phone');
    });

    it('should generate valid mailto link for email', () => {
      const links = getContactLinks();
      expect(links.email).toBe(`mailto:${professionalProfile.contact.email}`);
      expect(links.email).toMatch(/^mailto:/);
    });

    it('should generate valid tel link for phone', () => {
      const links = getContactLinks();
      // Phone number should have spaces removed for tel: protocol
      expect(links.phone).toMatch(/^tel:\+55\d+/);
      expect(links.phone).not.toMatch(/\s/);
    });

    it('should preserve LinkedIn URL', () => {
      const links = getContactLinks();
      expect(links.linkedin).toBe(professionalProfile.contact.linkedin);
    });

    it('should preserve GitHub URL', () => {
      const links = getContactLinks();
      expect(links.github).toBe(professionalProfile.contact.github);
    });
  });

  describe('Bilingual Content Consistency', () => {
    it('should have Portuguese content for all bilingual fields', () => {
      expect(professionalProfile.location.pt).toBeDefined();
      expect(professionalProfile.title.pt).toBeDefined();
      expect(professionalProfile.summary.pt).toBeDefined();
      professionalProfile.keyStats.forEach((stat) => {
        expect(stat.label.pt).toBeDefined();
      });
    });

    it('should have English content for all bilingual fields', () => {
      expect(professionalProfile.location.en).toBeDefined();
      expect(professionalProfile.title.en).toBeDefined();
      expect(professionalProfile.summary.en).toBeDefined();
      professionalProfile.keyStats.forEach((stat) => {
        expect(stat.label.en).toBeDefined();
      });
    });

    it('Portuguese and English content should be different', () => {
      expect(professionalProfile.location.pt).not.toBe(
        professionalProfile.location.en
      );
      expect(professionalProfile.title.pt).not.toBe(
        professionalProfile.title.en
      );
      expect(professionalProfile.summary.pt).not.toBe(
        professionalProfile.summary.en
      );
    });
  });

  describe('Data Immutability and Type Safety', () => {
    it('should be properly typed as ProfessionalProfile', () => {
      const profile: ProfessionalProfile = professionalProfile;
      expect(profile).toBeDefined();
    });

    it('should have non-null values for all required fields', () => {
      expect(professionalProfile.name).not.toBeNull();
      expect(professionalProfile.location).not.toBeNull();
      expect(professionalProfile.title).not.toBeNull();
      expect(professionalProfile.summary).not.toBeNull();
      expect(professionalProfile.keyStats).not.toBeNull();
      expect(professionalProfile.contact).not.toBeNull();
    });

    it('should not contain undefined values in string fields', () => {
      const hasUndefinedStrings =
        professionalProfile.name === undefined ||
        professionalProfile.location.pt === undefined ||
        professionalProfile.location.en === undefined ||
        professionalProfile.title.pt === undefined ||
        professionalProfile.title.en === undefined ||
        professionalProfile.summary.pt === undefined ||
        professionalProfile.summary.en === undefined ||
        professionalProfile.contact.phone === undefined ||
        professionalProfile.contact.email === undefined ||
        professionalProfile.contact.linkedin === undefined ||
        professionalProfile.contact.github === undefined;

      expect(hasUndefinedStrings).toBe(false);
    });
  });
});
