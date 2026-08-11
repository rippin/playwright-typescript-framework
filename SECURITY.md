# Security Policy

## Supported Version

This portfolio project supports only the latest code on the default branch.

## Reporting

Do not open a public issue containing credentials, tokens, cookies, storage state, request headers,
or private test artifacts. Report sensitive findings privately to the repository owner.

## Secret Handling

- Public demo credentials may appear only in `.env.example`.
- `OPENAI_API_KEY` and future private credentials must use local environment files or GitHub
  environment secrets.
- Paid AI calls are permitted only on trusted default-branch or manually dispatched workflows.
- Fork pull requests must never receive secrets.
- Diagnostic publishing must remove cookies, authorization headers, tokens, configured secret
  values, and raw trace archives.
