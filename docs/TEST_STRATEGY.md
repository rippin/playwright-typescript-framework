# Test Strategy

## Coverage Layers

- Deterministic unit tests protect configuration, schemas, redaction, reporting, and AI evaluation.
- API tests protect Restful Booker contracts and lifecycle behavior.
- UI tests protect SauceDemo user journeys.
- Axe tests detect automatically discoverable accessibility violations.
- ARIA snapshots protect selected accessibility-tree structures.
- Visual tests protect stable, visually important rendering.
- A small smoke suite protects critical integration paths.

Neither Axe, ARIA snapshots, nor visual comparison replaces functional assertions or manual
accessibility assessment.

## Shopping-Flow Design

```text
Inventory → Cart → Checkout information → Order overview → Confirmation
```

- `cart.spec.ts` arranges a cart and tests cart behavior.
- `checkout-info.spec.ts` reaches checkout and tests input validation.
- `order-overview.spec.ts` submits valid information and tests order details.
- `purchase.smoke.spec.ts` performs one complete happy path.

Prerequisite actions are setup, not the subject of the page-focused test. They are composed through
plain setup functions and implemented using the same page objects as the test body.

## Tags

| Tag            | Meaning                                                              |
| -------------- | -------------------------------------------------------------------- |
| `@smoke`       | Fast, critical, deterministic release signal                         |
| `@regression`  | Broader behavioral coverage                                          |
| `@a11y`        | Accessibility-focused coverage                                       |
| `@high-risk`   | Accessibility or behavior important enough for the pull-request gate |
| `@visual`      | Focused deterministic screenshot comparison                          |
| `@prod-safe`   | Non-destructive and approved for production verification             |
| `@destructive` | Creates or materially changes persistent state                       |

## Execution

| Trigger               | Coverage                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Pull request          | Formatting, linting, type checking, unit tests, deterministic API checks, Chromium smoke, and selected high-risk accessibility checks |
| Test deployment       | Blocking smoke followed by regression; both may gate promotion                                                                        |
| Staging deployment    | Blocking critical journeys plus selected cross-browser validation                                                                     |
| Production deployment | Minimal `@prod-safe` smoke, health checks, monitoring, and rollback signals                                                           |
| Nightly               | Full regression, complete cross-browser matrix, mobile, and representative accessibility and visual coverage                          |

## Flaky-Test Policy

- CI permits one retry to collect evidence.
- `failOnFlakyTests` makes retry-passing tests fail the quality gate.
- Traces are recorded on the first retry.
- Screenshots and video are retained only on failure.
- Flaky tests are fixed or quarantined with ownership and an explicit expiration; retries are not a
  substitute for diagnosis.

## Visual Policy

- Visual tests run on pinned Linux Chromium.
- Viewport, locale, timezone, theme, animations, and test data are controlled.
- Prefer component or stable-region screenshots over broad full-page snapshots.
- Mask only genuinely dynamic regions.
- Baseline changes require human review.
- Visual tests remain outside the pull-request gate while the target is an uncontrolled public
  application.
