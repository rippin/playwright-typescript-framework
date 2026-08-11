# TypeScript Playwright Portfolio Framework

## Goal

Build a portfolio-quality Playwright and TypeScript framework covering:

- SauceDemo UI automation
- Restful Booker API automation
- Multiple environments
- Secure GitHub Actions CI/CD
- Accessibility, ARIA snapshots, visual testing, and mobile coverage
- Optional AI-assisted failure triage with an evaluation harness
- Recruiter-focused documentation and sanitized reporting

Java and Python versions will later be separate, language-idiomatic repositories.

## Learning and Implementation Approach

- Make architecture decisions before generating code.
- Use AI for approved scaffolding and commodity configuration.
- Review generated changes incrementally as pull-request-sized units.
- Personally implement or substantially revise high-value architecture.
- Add no portfolio implementation files until explicitly approved.
- Document how this framework improves upon the earlier Crexi framework.

## Framework Architecture

- Use Node.js 24 LTS, an npm lockfile, strict TypeScript 7, type-aware Oxlint, and Oxfmt.
- Install and lock the current stable Playwright version when implementation
  begins.
- Use thin page and component objects without a heavyweight base-page
  hierarchy.
- Use typed fixtures, API clients, schema validators, and deterministic data
  builders.
- Use a setup project with reusable `storageState`.
- Give every test a fresh browser context.
- Use shared authentication only for tests that do not mutate shared account
  state.
- Create unique users or test data through APIs where isolation requires it.
- Construct simple page objects directly unless they require a managed
  lifecycle.
- Use explicit setup functions for SauceDemo prerequisite journeys; do not add
  page-state fixtures such as `checkoutReady` or `paymentReady` in v1.
- Reserve custom fixtures for configured dependencies and resources with
  meaningful setup, scope, or teardown.
- Validate environment configuration and fail fast with clear errors.
- Report external availability failures explicitly rather than silently
  skipping affected tests.

## Planned Coverage

### SauceDemo

- Login states
- Inventory and filtering
- Cart management
- Checkout validation
- Successful checkout
- Accessibility checks
- Focused ARIA snapshots
- Focused visual regression
- Mobile smoke path

### Restful Booker

- Authentication
- Create, read, update, and delete operations
- Response-schema validation
- Negative requests
- Unique test data
- Best-effort cleanup

## Test Classifications

- `@smoke`
- `@regression`
- `@a11y`
- `@visual`
- `@prod-safe`
- `@destructive`, if needed for deployment safety

## Execution Strategy

| Trigger               | Coverage                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Pull request          | Formatting, linting, type checking, unit tests, deterministic API checks, Chromium smoke, and selected high-risk accessibility checks |
| Test deployment       | Blocking smoke followed by regression; both can gate promotion                                                                        |
| Staging deployment    | Blocking critical journeys plus selected cross-browser validation                                                                     |
| Production deployment | Minimal `@prod-safe` smoke, health checks, monitoring, and rollback signals                                                           |
| Nightly               | Full regression, complete cross-browser matrix, mobile, and representative accessibility and visual coverage                          |

The portfolio cannot perform real deployments of SauceDemo or Restful Booker.
It will demonstrate an environment-aware deployment-verification interface
that an application pipeline could invoke.

## Accessibility, ARIA, and Visual Strategy

- Use Axe tests for automatically detectable accessibility-rule violations.
- Use ARIA snapshots to protect important accessibility-tree structure.
- Use visual tests to protect rendered layout and styling.
- Keep accessibility checks as separate tagged tests near related functional
  tests.
- Run high-risk accessibility checks early, including selected pull-request
  checks.
- Use ARIA snapshots selectively for forms, dialogs, navigation, and semantic
  structure.
- Limit visual tests to stable, visually important areas.
- Run visual comparisons only in a pinned Linux Chromium environment.
- Fix viewport, locale, timezone, theme, and test data for visual tests.
- Mask only genuinely dynamic regions.
- Require reviewed baseline updates rather than accepting them automatically.
- Keep visual tests outside the pull-request gate while testing an
  uncontrolled public target.

## Diagnostics and Flaky-Test Policy

- Allow one CI retry for evidence collection.
- Enable `failOnFlakyTests`.
- Fail the quality gate when a test passes only on retry.
- Retain traces on retry or failure.
- Capture appropriate screenshots, console errors, failed requests, and test
  steps.
- Limit workers to avoid stressing public demo systems.

## AI-Assisted Triage

- Make AI triage opt-in and advisory only.
- Collect sanitized failure evidence.
- Never submit raw traces, cookies, authorization headers, tokens, or secrets.
- Use the OpenAI Responses API with image input and structured output.
- Classify failures as product defect, test defect, environment, data, likely
  flake, or unknown.
- Include evidence references, confidence, investigation steps, and
  `needsHumanReview`.
- Do not allow AI to change results, modify code, create issues, or approve
  deployments.
- Run paid triage only on trusted `main` failures or through manual invocation.
- Build a local, versioned evaluation harness for schema validity, category
  accuracy, evidence grounding, latency, and token usage.

## Portfolio and Security

- Publish a sanitized GitHub Pages dashboard.
- Retain full private GitHub Actions artifacts for a limited period.
- Do not publish traces, credentials, storage state, cookies, or headers.
- Pin third-party Actions to full commit SHAs.
- Use read-only permissions by default.
- Isolate deployment permissions.
- Add Dependabot, dependency review, CodeQL, and high-severity audit checks.
- Create a recruiter-first README with architecture, test matrix, tradeoffs,
  sample outputs, and the AI safety model.
- Use the MIT license.

## Acceptance Criteria

- A clean checkout runs quality checks and Chromium tests without private
  credentials.
- UI and API suites run independently and in arbitrary order.
- Tests are safe for parallel execution according to their data strategy.
- Lower-environment verification supports promotion gates.
- Production execution contains only explicitly safe tests.
- Retry-passing tests fail as flaky.
- Failures produce useful sanitized evidence.
- Visual and accessibility failures produce reviewable artifacts.
- Fork pull requests never receive paid-service credentials.
- Unit tests cover configuration, schemas, reporters, redaction, AI parsing,
  and evaluation scoring.
- No repository remote, secret, Pages, or branch-protection changes occur
  without explicit authorization.
