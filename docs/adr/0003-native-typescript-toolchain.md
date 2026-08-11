# ADR 0003: Native TypeScript Toolchain

- Status: Accepted
- Date: 2026-07-28

## Decision

The framework will use TypeScript 7, type-aware Oxlint, and Oxfmt. Oxlint will load
`eslint-plugin-playwright` through its JavaScript-plugin compatibility layer so Playwright-specific
test rules remain enforced. TypeScript compilation remains a separate `tsc --noEmit` quality step.

## Consequences

- Type checking, linting, and formatting use the modern native TypeScript/Oxc toolchain.
- Playwright-specific rules depend on Oxlint's JavaScript-plugin compatibility layer.
- `eslint-plugin-playwright` still declares ESLint as an npm peer, so npm installs ESLint
  transitively even though the repository has no ESLint configuration or command.
- The compatibility layer is less mature than native Oxlint rules and must be reviewed during
  dependency upgrades.
- Keeping `tsc --noEmit` separate provides an explicit compiler check while the toolchain matures.
