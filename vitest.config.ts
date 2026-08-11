import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
    },
    include: ['src/**/*.unit.spec.ts', 'tests/unit/**/*.spec.ts'],
    passWithNoTests: true,
    restoreMocks: true,
  },
});
