# Contributing

## Development Workflow

1. Use Node.js 24 LTS and npm 11.
2. Create branches with the `codex/` prefix for Codex-assisted work.
3. Keep changes small enough to review as a coherent architectural or behavioral increment.
4. Run `npm run quality` before opening a pull request.
5. Run the narrowest relevant Playwright command after tests are introduced.
6. Explain design tradeoffs and baseline changes in the pull-request description.

## Framework Rules

- Tests are independent and safe to run in arbitrary order.
- Raw locator interactions belong in page or component objects.
- Prerequisite UI journeys use explicit setup functions called from test hooks.
- Custom fixtures are reserved for configured dependencies or resources with meaningful lifecycle.
- Simple page objects are constructed directly in tests.
- Backend setup is preferred over UI setup when a controlled API exists.
- No test may depend on another test's output.
- No `waitForTimeout()` calls are accepted.
- Visual baseline updates require human review.

## Commit Safety

Do not commit:

- `.env` files other than `.env.example`
- OpenAI or service API keys
- Playwright storage state
- Raw traces or private reports
- Cookies, authorization headers, or tokens
