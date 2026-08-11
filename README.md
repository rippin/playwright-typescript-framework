# Playwright TypeScript Automation Framework

A portfolio framework for modern UI and API quality engineering with Playwright and TypeScript.

> **Current status:** the architecture and toolchain scaffold now includes initial runnable UI and
> API vertical slices. Broader feature coverage, accessibility, visual testing, reporting, and AI
> triage remain intentionally incremental.

## Planned Capabilities

- SauceDemo UI coverage across Chromium, Firefox, WebKit, and mobile emulation
- Restful Booker API coverage with schema validation and isolated test data
- Pull-request, deployment-verification, and nightly execution paths
- Accessibility, ARIA snapshot, and focused visual-regression coverage
- Trace-based diagnostics and strict flaky-test gating
- Sanitized reporting and optional advisory AI failure triage

The project decisions and acceptance criteria live in
[FRAMEWORK_PLAN.md](./FRAMEWORK_PLAN.md). The code ownership and dependency boundaries live in
[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Prerequisites

- Node.js 24 LTS
- npm 11

```bash
nvm use
npm ci
npx playwright install chromium
cp .env.example .env
```

The committed demo credentials are public. `OPENAI_API_KEY` is optional and must remain secret.

## Commands

| Command                      | Purpose                                                           |
| ---------------------------- | ----------------------------------------------------------------- |
| `npm run quality`            | Formatting, linting, type checking, and deterministic unit checks |
| `npm run test:smoke`         | Chromium UI smoke suite                                           |
| `npm run test:ui`            | Chromium UI suite                                                 |
| `npm run test:api`           | API suite                                                         |
| `npm run test:a11y`          | Accessibility suite                                               |
| `npm run test:visual`        | Linux Chromium visual suite                                       |
| `npm run test:cross-browser` | Chromium, Firefox, and WebKit UI suites                           |
| `npm run test:mobile`        | Mobile Chromium smoke suite                                       |
| `npm run test:prod-safe`     | Explicitly production-safe UI checks                              |

UI smoke, Chromium UI, and API commands now have runnable targets. The remaining specialized suites
will become runnable as their corresponding coverage is implemented.

## Execution Model

| Trigger               | Coverage                                                                                     |
| --------------------- | -------------------------------------------------------------------------------------------- |
| Pull request          | Quality checks, deterministic API checks, Chromium smoke, and high-risk accessibility checks |
| Test deployment       | Blocking smoke followed by Chromium regression                                               |
| Staging deployment    | Critical smoke across selected browsers                                                      |
| Production deployment | Minimal `@prod-safe` smoke                                                                   |
| Nightly               | Full regression, cross-browser, mobile, accessibility, and visual coverage                   |

Public demo systems are external dependencies. Availability failures will be reported explicitly
rather than silently skipped.

## Security

- GitHub Actions are pinned to immutable commit SHAs.
- Workflow permissions are read-only unless a job requires more.
- Fork pull requests never receive paid-service credentials.
- Traces, storage state, cookies, headers, and credentials are never published.
- Visual baselines are reviewed changes, not automatically accepted output.

See [SECURITY.md](./SECURITY.md) for reporting and secret-handling expectations.
