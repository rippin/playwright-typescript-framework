# AI Triage Safety Model

AI failure triage is planned but not implemented in this scaffold.

## Boundaries

- Triage is optional and advisory.
- AI output cannot change test status, modify code, create issues, approve deployments, or update
  visual baselines.
- Paid calls run only on trusted default-branch failures or explicit manual dispatch.
- Fork pull requests never receive the OpenAI key.
- Raw trace archives are never submitted.

## Evidence

The future evidence collector may include test identity, browser project, retry attempt, error,
steps, selected screenshots, console errors, and failed requests.

Before persistence or submission it must remove:

- Cookies and storage state
- Authorization and proxy-authorization headers
- Tokens and API keys
- Configured secret values
- Unselected request and response bodies

## Evaluation

The local evaluation harness will use versioned fixtures and measure:

- Structured-output schema validity
- Failure-category accuracy
- Evidence-reference validity
- Appropriate `needsHumanReview` behavior
- Missing-key, refusal, rate-limit, and timeout handling
- Latency and token usage
