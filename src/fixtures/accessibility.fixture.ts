import { AxeBuilder } from '@axe-core/playwright';
import { expect, test as base } from '@playwright/test';

interface AccessibilityFixtures {
  makeAxeBuilder: () => AxeBuilder;
}

const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] as const;

export const test = base.extend<AccessibilityFixtures>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () => new AxeBuilder({ page }).withTags([...WCAG_AA_TAGS]);

    await use(makeAxeBuilder);
  },
});

export { expect };
