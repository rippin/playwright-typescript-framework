# Environment Configuration

Runtime values come from environment variables validated by `src/config/environment.ts`.

Local development may copy `.env.example` to `.env`. CI uses GitHub environments named `test`,
`staging`, and `production`, with URLs in environment variables and private credentials in
environment secrets.

Do not commit environment-specific `.env` files.
