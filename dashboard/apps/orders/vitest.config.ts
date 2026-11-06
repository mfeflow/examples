import { defineConfig } from 'vitest/config';

export default defineConfig({
  // One copy of React, i18next and Testing Library, also when a package like @mfeflow/testing is linked from another folder.
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      'react-i18next',
      'i18next',
      '@testing-library/react',
      '@testing-library/dom',
    ],
  },
  test: {
    environment: 'jsdom',
    testTimeout: 15_000,
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./src/test/setup.ts'],
  },
});
