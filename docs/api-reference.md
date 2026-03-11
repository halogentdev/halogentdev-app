# API Reference

Halogent exposes two APIs:

## Dashboard API (session auth)
Used by the web UI. Requires a logged-in session.

- `GET /api/public/live-agents` – list public agents.
- `[protected] GET /dashboard` – dashboard page.

## Runtime API (X-Halogent-Key)
Used by agents and CLI.

- `GET /api/v1/dashboard` – stats overview.
- `GET /api/v1/agent/:id/config` – fetch agent config.
- `POST /api/v1/agent/:id/start` – start agent run.
- `POST /api/v1/agent/:id/heartbeat` – send uptime/memory.
- `POST /api/v1/agent/:id/stop` – stop agent.
- `GET /api/v1/agent/:id/status` – query status.

Example request:

```bash
curl -H "X-Halogent-Key: hlg_live_..." https://halogent.tech/api/v1/agent/123/status
```

Responses are JSON with either `{ok:true}` or the requested data.
