# ADR 0002: Risk-Based CI and Deployment Execution

- Status: Accepted
- Date: 2026-07-23

## Decision

Pull requests will not run the full regression suite. They will run fast quality checks, Chromium
smoke coverage, deterministic API checks, and selected high-risk accessibility checks.

Lower-environment deployments add blocking smoke and environment-appropriate regression.
Production runs only explicitly safe verification. Broad browser, mobile, accessibility, and visual
coverage runs nightly.

## Consequences

- Pull-request feedback remains fast.
- Promotion gates validate deployed builds.
- Expensive breadth moves to later risk-appropriate stages.
- Nightly coverage supplements rather than replaces earlier high-risk checks.
