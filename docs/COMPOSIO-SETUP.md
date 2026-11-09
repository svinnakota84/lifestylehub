# Ten-role Composio workspace

The new workspace implements ten software assistant roles in `shared/agents.mjs`. They are not employees and are not shown as running until a real backend is configured. A successful request returns the actual model response, executed tool names, server timestamp and request ID. There are no timed mock responses.

## Deployment

GitHub Pages serves static files only. The frontend can be published there, but it cannot run the Composio handler. `netlify.toml` provides a full-stack alternative for the same repository: build `dist`, and publish `netlify/functions/agents.mjs` at `/api/agents`. No hosting account or paid service has been created by this change.

Configure these **server-only** environment variables on the serverless host: `COMPOSIO_API_KEY`, `OPENAI_API_KEY`, `OPENAI_MODEL` (an available Responses API model), `COMPOSIO_USER_ID` (the owner identity with the intended connected accounts), and a strong `AGENT_ACCESS_TOKEN` of at least 32 characters. Do not put those values into GitHub source, chat, or a `VITE_` variable.

Connect the required apps for that Composio user. Configure `COMPOSIO_ROLE_TOOLKITS` as a JSON mapping from each role ID to its approved toolkit slugs. The role IDs are `maya`, `arjun`, `sarah`, `rajesh`, `elena`, `vikram`, `priya`, `marcus`, `ananya`, and `david`. A missing or empty list disables that role. Choose only the connected apps needed for each role; a model key alone does not connect business data.

For a separate Pages frontend, set public `VITE_AGENT_API_URL` to the full HTTPS backend `/api/agents` URL and set `AGENT_ALLOWED_ORIGINS` on the backend to the exact frontend origins. Rebuild the frontend. For one full-stack deployment, leave the URL blank to use the same origin.

The owner supplies the access token in the workspace. It stays in tab memory and is sent only to the configured backend. This is a single-owner deployment, not multi-user staff or customer authentication. Do not share the token with visitors. Use an identity provider and per-user authorization before expanding access to a team.

## Execution boundary

Sessions use Composio's direct-tools preset, restrict toolkits by role, block create/update/destructive tool tags, and disable the remote sandbox, proxy execution and connection-management tools. There is no sending, purchasing, paying, publishing or production mutation feature. The model can research connected records and draft text. Financial and legal roles organize information for professional review.

Runs have limited input/output and tool-loop budgets. The handler rejects missing credentials, invalid roles, invalid origins, unauthorized requests and unapproved toolkits. Errors do not expose upstream messages, prompts, records or secrets. The supplied unit tests verify these boundaries with isolated test doubles; they do not verify a live Composio account.

## Validation

`npm test`, `npm run lint`, `npm run build`. A local SDK schema test validates the actual installed Composio configuration. Live integration still requires server credentials and app connections; no successful live tool execution is claimed by this repository until observed.

References: https://docs.composio.dev/docs/providers/openai and https://docs.composio.dev/docs/configuring-sessions
