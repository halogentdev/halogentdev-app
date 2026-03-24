# Halogent — Private AI Agent Control Plane for Solana

**Version:** v1.4.0  
**Website:** https://halogent.tech  
**npm:** https://npmjs.com/package/halogent  
**X:** https://x.com/halogent_tech  
**GitHub org:** https://github.com/halogentdev  
**License:** MIT

---

## Banner / Header

[![npm version](https://img.shields.io/npm/v/halogent?color=blue&style=flat-square)](https://npmjs.com/package/halogent)  
[![website](https://img.shields.io/website?url=https%3A%2F%2Fhalogent.tech&style=flat-square)](https://halogent.tech)  
[![X](https://img.shields.io/badge/X-%40halogent__tech-blue?style=flat-square)](https://x.com/halogent_tech)  
[![license](https://img.shields.io/badge/license-MIT-yellow?style=flat-square)](LICENSE)

---

## Project Overview

Halogent is a private AI agent control plane built for Solana operators and builders.

Key traits:
- self-hosted runtime (VPS/Docker/local)
- playground for real provider execution (OpenAI/Anthropic/Gemini)
- privacy-first mode (zero telemetry, local memory, user-owned secrets)
- CLI v1.4.0 for agent lifecycle and control
- REST API v1 for programmatic orchestration
- PostgreSQL backend with Drizzle ORM
- React + TypeScript frontend (Vite, Tailwind, shadcn/ui)
- Express.js API server (TypeScript)

---

## Architecture (ASCII)

```
+--------------------------+                     +--------------------+
|  Halogent Control Plane  |                     |  User Agent Host   |
|  (dashboard + REST API)  |<---- HTTPS/WS ---->|  (VPS/Docker/Local)|
|  - React UI              |                     |  - Runtime process |
|  - Express backend       |                     |  - agent runtime   |
|  - PostgreSQL (Drizzle)  |                     |  - local config    |
+--------------------------+                     +--------------------+
            ^
            |
        CLI + REST API
        (halogent)
            |
            v
+--------------------------+
|  Developer / Operator    |
+--------------------------+
```

---

## Quick Start

```bash
npm install -g halogent
halogent auth set-key <your-api-key>
halogent agent list
```

---

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- Backend: Express.js + TypeScript
- Auth: Privy (wallet + email login)
- Database: PostgreSQL (Drizzle ORM)
- CLI: Node.js (npm package `halogent`)

---

## CLI v1.4.0

### install

```bash
npm install -g halogent
```

or

```bash
curl -sSL https://halogent.tech/cli/halogent.js -o /usr/local/bin/halogent
chmod +x /usr/local/bin/halogent
```

### key commands

```bash
halogent auth set-key <key>
halogent auth login
halogent auth status
```

### agent commands

```bash
halogent agent list
halogent agent pull <id>
halogent agent start <id>
halogent agent stop <id>
halogent agent restart <id>
halogent agent status <id>
halogent agent logs <id>
```

### system commands

```bash
halogent dashboard
halogent config set-endpoint <url>
halogent service install <id>
```

---

## Full CLI Reference Table

| Command | Description |
|---------|-------------|
| `halogent auth set-key <key>` | Provide API key for CLI and server auth |
| `halogent auth login` | OAuth wallet/email login via Privy |
| `halogent auth status` | Display current auth state |
| `halogent agent list` | List registered agents |
| `halogent agent pull <id>` | Download agent package/manifest |
| `halogent agent start <id>` | Start agent runtime process |
| `halogent agent stop <id>` | Stop agent runtime |
| `halogent agent restart <id>` | Restart agent runtime |
| `halogent agent status <id>` | Agent runtime health and status |
| `halogent agent logs <id>` | Tail/log output for agent |
| `halogent dashboard` | Open control plane UI |
| `halogent config set-endpoint <url>` | Set control plane API endpoint |
| `halogent service install <id>` | Install as system service |

---

## REST API v1 Reference Table

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/agents` | GET | `X-Halogent-Key` | List agents |
| `/api/v1/agent/:id/config` | GET | `X-Halogent-Key` | Agent config |
| `/api/v1/agent/:id/status` | GET | `X-Halogent-Key` | Agent runtime status |
| `/api/v1/agent/:id/logs` | GET | `X-Halogent-Key` | Agent logs |
| `/api/v1/agent/:id/start` | POST | `X-Halogent-Key` | Start agent |
| `/api/v1/agent/:id/stop` | POST | `X-Halogent-Key` | Stop agent |
| `/api/v1/agent/:id/restart` | POST | `X-Halogent-Key` | Restart agent |
| `/api/v1/dashboard` | GET | `X-Halogent-Key` | Dashboard summary |

---

## Playground: Real AI Execution (API-key-in, zero server-storage)

- Providers:
  - OpenAI: `gpt-4o`, `o1`, `o3`
  - Anthropic: `claude-3.5-sonnet`, `claude-3-opus`
  - Google Gemini
- Required: user provides provider API key at UI prompt
- Key is used client-side or runtime call; not persisted by control plane

Typical session:

```bash
export HALOGENT_PROVIDER=openai
export HALOGENT_KEY=<your-openai-key>

curl -X POST https://your-server/api/v1/agent/<id>/start \
  -H "X-Halogent-Key: <control-plane-key>"
```

Browser playground workflow:
- connect wallet/email via Privy
- choose provider
- paste API key in session modal
- run inference

---

## Self-hosting Deployment

### 1. VPS

```bash
git clone https://github.com/halogentdev/halogentdev-app.git
cd halogentdev-app
npm ci
npm run build
npm run start
```

- Ensure PostgreSQL accessible
- Configure env:
  - `DATABASE_URL`
  - `PRIVY_API_KEY`
  - `HALOGENT_BASE_URL`
  - `PORT=3000`

### 2. Docker

```bash
docker build -t halogent:1.4.0 .
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL=postgres://user:pass@db:5432/halogent \
  -e PRIVY_API_KEY="$PRIVY_API_KEY" \
  -e HALOGENT_BASE_URL="https://your-host" \
  --name halogent halogent:1.4.0
```

### 3. Local (dev)

```bash
cp .env.example .env
npm ci
npm run dev
```

Local CLI endpoint:

```bash
halogent config set-endpoint http://localhost:3000
```

---

## Privacy-first Architecture

- Zero telemetry. no analytics, no event forwarding.
- Agent user secrets are never written to server DB.
- Runtime stores:
  - minimal agent metadata
  - status, config
  - logs under opt-in retention
- Runtime does not store API keys for LLM providers across sessions.
- Local memory mode is optional (on-agent), user-controlled.
- User data (wallet, email) is handled by Privy; not captured in raw form by Halogent.

---

## Install script

- `curl -sSL https://halogent.tech/install.sh | bash`
- script installs CLI and config defaults for self-hosted server

## CLI binary distribution

- Served at `https://halogent.tech/cli/halogent.js`
- Use with:

```bash
curl -sSL https://halogent.tech/cli/halogent.js -o /usr/local/bin/halogent
chmod +x /usr/local/bin/halogent
```

---

## Contributing

1. Fork repository
2. Create branch `feature/<name>` or `fix/<name>`
3. Write code and tests
4. Validate:
   ```bash
   npm ci
   npm test
   npm run lint
   ```
5. Open PR to `main`
6. Add changelog entry in `docs/changelog.md` if behavior changes
7. Follow repository coding style (Prettier+ESLint)

---

## Changelog

### v1.4.0
- Added CLI `agent logs` and `agent status` commands.
- Added dashboard path `GET /api/v1/dashboard`.
- Added auth status command and better session handling.
- Zero telemetry, local memory and provider API key privacy updates.

### v1.3.0
- Introduced self-hosted playground with OpenAI/Anthropic/Gemini provider integration.
- Added `service install` and `config set-endpoint` commands.

---

## License

MIT License.  
Full text in `LICENSE`.  
Copyright (c) 2026 Halogent, Inc.

---

## Notes

- This README is designed for production usage, operator installation, API integration, and secure self-hosted deployment.
- Keep control plane endpoint private and use strong `X-Halogent-Key` management in automation scripts.
