import { expect, test as base, type Request } from '@playwright/test';

import {
  type DiagnosticEvidence,
  redactSensitiveText,
  sanitizeUrl,
} from '../reporting/diagnostic-evidence.js';

interface UiFixtures {
  diagnostics: void;
}

export const test = base.extend<UiFixtures>({
  diagnostics: [
    async ({ page }, use, testInfo) => {
      const evidence: DiagnosticEvidence = {
        pageErrors: [],
        failedRequests: [],
      };
      const onPageError = (error: Error) => {
        evidence.pageErrors.push(redactSensitiveText(error.stack ?? error.message));
      };
      const onRequestFailed = (request: Request) => {
        evidence.failedRequests.push({
          errorText: redactSensitiveText(request.failure()?.errorText ?? 'Unknown network failure'),
          method: request.method(),
          url: sanitizeUrl(request.url()),
        });
      };

      page.on('pageerror', onPageError);
      page.on('requestfailed', onRequestFailed);

      try {
        await use();
      } finally {
        page.off('pageerror', onPageError);
        page.off('requestfailed', onRequestFailed);

        const testFailed = testInfo.status !== testInfo.expectedStatus;
        const hasEvidence = evidence.pageErrors.length > 0 || evidence.failedRequests.length > 0;

        if (testFailed && hasEvidence) {
          await testInfo.attach('diagnostic-evidence', {
            body: JSON.stringify(evidence, null, 2),
            contentType: 'application/json',
          });
        }
      }
    },
    { auto: true },
  ],
});

export { expect };
