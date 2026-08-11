# ADR 0001: Explicit UI Setup Instead of Page-State Fixtures

- Status: Accepted
- Date: 2026-07-23

## Decision

SauceDemo prerequisite journeys will use plain composable setup functions called from test hooks.
Page objects will be constructed directly. The framework will not create fixtures such as
`cartReady`, `checkoutReady`, or `paymentReady` in v1.

Custom fixtures are reserved for configured dependencies and resources with setup, controlled scope,
or guaranteed teardown.

## Consequences

- Test setup remains visible.
- UI actions are reused through page objects and setup functions.
- The fixture dependency graph remains small.
- Setup functions may later become fixtures only if real lifecycle requirements emerge.
