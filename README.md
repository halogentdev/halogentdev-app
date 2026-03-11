# Halogent CLI

[![npm version](https://img.shields.io/npm/v/halogent.svg)](https://www.npmjs.com/package/halogent)

Private AI Agent Control Plane for Solana - CLI

## Installation

```bash
npm install -g halogent
```

## Overview

Halogent is a command‑line interface for interacting with the Halogent control plane. It
allows you to authenticate, manage agents, inspect a dashboard, and integrate with
systemd/docker.

## Full‑Stack Dashboard

This repository also contains a full-stack web application used as the
Halogent Dashboard. The frontend is built with React 18, TypeScript, Vite,
TailwindCSS and shadcn/ui, with routing handled by wouter and data fetched
via TanStack React Query. The backend is an Express.js server in TypeScript
using Drizzle ORM (PostgreSQL) and Privy passwordless email authentication
with session support. Development environment variables are outlined in
`.env.example`.

### Development

```bash
# install project dependencies
npm install

# run server in dev mode (uses ts-node-dev + Vite middleware)
npm run dev
```

Frontend code lives under `client/src`, backend under `server/`, shared types
in `shared/schema.ts`.

```
HALOGENT
  Private Agent Control Plane
  https://halogent.tech
```

## Commands

| Command                                | Description                                |
|----------------------------------------|--------------------------------------------|
| `auth set-key <key>`                   | Store API key (prefix `hlg_live_`)         |
| `init`                                 | Initialize workspace & verify connection   |
| `agent pull <id>`                      | Fetch agent configuration                  |
| `agent start <id>`                     | Start an agent                             |
| `agent stop <id>`                      | Stop an agent                              |
| `agent status <id>`                    | Query agent status                         |
| `agent dev <id>`                       | Start agent in verbose/dev mode            |
| `service install <id>`                 | Print systemd unit for auto‑start          |
| `config set-endpoint <url>`            | Override default API endpoint              |
| `dashboard`                            | Render terminal dashboard                  |
| `--version`                            | Show version and commands                  |

## Architecture

```
+----------------+          +-------------------------+
|   User Server  | <------> |  Halogent Control Plane |
|  (CLI / agent) |          |   https://halogent.tech|
+----------------+          +-------------------------+
```

Agents run on user machines (Solana bots) and communicate with the central control
plane for configuration, heartbeats, and commands.

## Deployment Examples

### Docker

```Dockerfile
FROM node:20
RUN npm install -g halogent
ENTRYPOINT ["halogent"]
```

### systemd

Use `halogent service install <id>` to generate a unit file, e.g.:

```
[Unit]
Description=Halogent Agent my-agent
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/halogent agent start my-agent
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable with `systemctl enable --now <file>`.

### docker-compose

```yaml
version: '3'
services:
  agent:
    image: node:20
    command: halogent agent start my-agent
    restart: always
```

## Config & Privacy

Configuration is stored in `~/.halogent/config.json`: 

```json
{ "apiKey": "hlg_live_...", "endpoint": "https://halogent.tech" }
```

Only the API key and optional custom endpoint are saved locally. No agent data
leaves your machine except when you explicitly pull or start agents.

## Requirements

- Node.js 18+ (built-in modules only)
- Network access to `https://halogent.tech`

## Links

- Website: https://halogent.tech
- Twitter/X: https://x.com/halogent_tech

## License

MIT © 2026 Halogent
