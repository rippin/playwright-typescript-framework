# Framework Architecture

## Design Goals

The framework favors explicit tests, Playwright-native behavior, composition, and deterministic
state. It avoids generic base pages, page-object fixtures, hidden navigation, and abstractions
created before reuse exists.

## Planned Structure

```text
.
├── src/
│   ├── ai/             # Evidence models, redaction, triage, and local evaluation
│   ├── api/            # Typed domain API clients
│   ├── components/     # Reusable UI component objects
│   ├── config/         # Validated environment configuration
│   ├── data/           # Typed constants and deterministic builders
│   ├── fixtures/       # Dependencies and resources with managed lifecycle
│   ├── pages/          # Thin page objects
│   ├── reporting/      # Sanitized reporting and dashboard preparation
│   └── support/        # Explicit prerequisite UI setup functions
├── tests/
│   ├── __screenshots__/ # Approved visual baselines mirroring their owning test paths
│   ├── api/            # Restful Booker tests
│   ├── setup/          # Authentication setup projects
│   ├── ui/             # Functional, accessibility, and visual tests grouped by feature
│   ├── unit/           # Deterministic framework unit tests
└── docs/adr/           # Durable architecture decisions
```

Specialized UI checks stay beside the functional coverage for the same feature and use explicit
filename suffixes: `*.a11y.spec.ts` and `*.visual.spec.ts`. Playwright projects select those files
without duplicating them in the functional browser projects.

The `tests/` tree contains executable tests and assets owned by those tests. Approved visual
baselines are committed under `tests/__screenshots__/`; temporary actual and difference images are
written to ignored test output directories.

Directories are reserved in this scaffold. Implementations will be introduced in reviewed vertical
slices.

## Dependency Direction

```text
Tests
  ├── page/component objects
  ├── setup functions
  ├── fixtures
  └── data builders

Setup functions
  └── page/component objects

Resource fixtures
  ├── API clients
  └── data builders

Page/component objects
  └── Playwright locators and actions
```

Page objects do not call tests or fixtures. API clients do not depend on browser objects. Tests own
behavioral assertions.

## UI Action Ownership

- Page and component objects contain raw locator interactions.
- A test hook calls a setup function to reach the required starting state.
- The test body performs the behavior under test and owns the assertions.
- One smoke test proves the complete shopping journey.
- Page-specific tests independently arrange their prerequisites and never depend on earlier tests.

For the SauceDemo shopping flow, custom state fixtures such as `checkoutReady` or `paymentReady`
will not be introduced in v1. Product values are typed constants, checkout information is typed test
data, and prerequisite navigation is handled by composable setup functions.

## Fixture Policy

Fixtures are used for configured dependencies or resources with meaningful lifecycle:

- Configured API clients
- Temporary bookings with guaranteed cleanup
- Temporary users when an API supports creation and deletion
- Role-specific browser contexts
- Automatic diagnostic listeners

Fixtures are not used for:

- Simple page-object construction
- Static product data
- Input-data builders
- Clicking through prerequisite pages
- Generic utility functions

## State and Isolation

- Every test receives a fresh browser context.
- Authenticated contexts start from reusable `storageState`.
- Shared authentication is limited to tests that do not mutate shared account state.
- Mutable browser state, such as a SauceDemo cart, is created per test.
- Mutable backend state uses unique data and best-effort cleanup.
- Tests remain independent under parallel execution and arbitrary ordering.

## External Systems

SauceDemo and Restful Booker are uncontrolled public systems. Tests will perform a bounded
availability probe and report an external-environment failure explicitly. They will not silently
skip failures or perform load, performance, or security scanning.
