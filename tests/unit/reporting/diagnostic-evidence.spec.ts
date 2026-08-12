import { describe, expect, test } from 'vitest';

import { redactSensitiveText, sanitizeUrl } from '../../../src/reporting/diagnostic-evidence.js';

describe('sanitizeUrl', () => {
  test('removes credentials, query parameters, and fragments', () => {
    expect(sanitizeUrl('https://user:pass@example.com/api/items?token=secret#result')).toBe(
      'https://example.com/api/items',
    );
  });
});

describe('redactSensitiveText', () => {
  test('redacts common sensitive assignments', () => {
    const examples = [
      ['password=secret123', 'password=[REDACTED]'],
      ['token: abc123', 'token: [REDACTED]'],
      ['Authorization: Bearer-secret', 'Authorization: [REDACTED]'],
      ['api_key="private-value"', 'api_key=[REDACTED]'],
    ] as const;

    for (const [input, expected] of examples) {
      expect(redactSensitiveText(input)).toBe(expected);
    }
  });

  test('removes query parameters from URLs embedded in an error', () => {
    expect(redactSensitiveText('Request failed at https://example.com/orders?token=secret')).toBe(
      'Request failed at https://example.com/orders',
    );
  });
});
