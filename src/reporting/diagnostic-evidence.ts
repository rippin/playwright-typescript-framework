const SENSITIVE_ASSIGNMENT =
  /\b(authorization|cookie|password|secret|token|api[-_]?key)(\s*[:=]\s*)(?:"[^"]*"|'[^']*'|[^\s,;]+)/gi;
const URL_IN_TEXT = /https?:\/\/[^\s"'<>]+/gi;

export interface DiagnosticEvidence {
  pageErrors: string[];
  failedRequests: Array<{
    errorText: string;
    method: string;
    url: string;
  }>;
}

export function sanitizeUrl(value: string): string {
  try {
    const url = new URL(value);

    return `${url.origin}${url.pathname}`;
  } catch {
    return value.split(/[?#]/, 1)[0] ?? value;
  }
}

export function redactSensitiveText(value: string): string {
  return value
    .replace(URL_IN_TEXT, (url) => sanitizeUrl(url))
    .replace(SENSITIVE_ASSIGNMENT, (_match, key: string, separator: string) => {
      return `${key}${separator}[REDACTED]`;
    });
}
