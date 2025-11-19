import '@testing-library/jest-dom';

// Suppress Next.js specific warnings
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock scrollIntoView for JSDOM (not natively supported)
// Only apply in jsdom environment (not in node environment for API tests)
if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = jest.fn();
}
