<p align="center">
  <img src="https://i.ibb.co.com/GQ0jLw7Q/Untitled-design-2026-03-10-T193707-335.png" width="80" />
</p>

<h3 align="center">Halogent Dashboard</h3>
<p align="center">Private AI Agent Control Plane for Solana</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=halogentdev&repo=halogent-dashboard&style=flat-square&color=7c3aed&label=Views" alt="Views" />
  <a href="https://halogent.tech"><img src="https://img.shields.io/badge/Live-halogent.tech-7c3aed?style=flat-square" alt="Live" /></a>
  <a href="https://www.npmjs.com/package/halogent"><img src="https://img.shields.io/npm/v/halogent?style=flat-square&color=7c3aed&label=CLI" alt="CLI" /></a>
  <img src="https://img.shields.io/badge/License-MIT-7c3aed?style=flat-square" alt="License" />
</p>

---

## Overview

Halogent is a web-based control plane for building, deploying, and managing private AI agents on Solana. Agents run on your own infrastructure while the dashboard handles orchestration, monitoring, and configuration.

The control plane sees your agent exists. It never sees what your agent does.

## Screenshots

> Dashboard, Agent Builder, Privacy Engine, Live Agent Feed, and more at [halogent.tech](https://halogent.tech)

## Features

- **Agent Builder** - Create autonomous AI agents for DeFi yield scanning, whale tracking, MEV detection, and more
- **Privacy Engine** - Granular control over prompt logging, memory storage, model allowlists, and telemetry with real-time privacy score
- **Modular Skills** - On-chain skills: wallet monitor, DEX scanner, transaction parser, market data feeds from Jupiter, Birdeye, and CoinGecko
- **Self-Hosted Deploy** - Generate deployment scripts for Docker, VPS, bare metal, or local runtime
- **Agent Playground** - Test agents in sandbox with tool call inspection, latency tracking, and privacy flags
- **Live Agent Feed** - Public feed of active community agents running on Solana
- **CLI Dashboard** - Full terminal dashboard via `halogent dashboard` command
- **30+ AI Models** - GPT-4o, Claude 3.5, DeepSeek R1, Llama 3.3, Gemini 2.0, Mistral, and more

## Architecture
```
┌─── CONTROL PLANE (this repo) ────────┐
│ │
│ Dashboard UI API Server │
│ Agent Registry Deployment Manager │
│ Privacy Engine Monitoring │
│ │
└──────────────┬────────────────────────┘
│ encrypted (HTTPS)
│ heartbeat + config only
┌──────────────┴────────────────────────┐
│ │
│ USER INFRASTRUCTURE │
│ Agent Runtime Strategy Logic │
│ Wallet Access Local Memory │
│ Private Keys Execution Engine │
│ │
└───────────────────────────────────────┘

```

## Tech Stack

| Layer | Technology |
|:------|:-----------|
| Frontend | React 18, TypeScript, Vite, TailwindCSS, shadcn/ui |
| Backend | Express.js, TypeScript, Drizzle ORM |
| Database | PostgreSQL |
| Auth | Privy (passwordless email OTP) |
| Routing | wouter |
| State | TanStack React Query v5 |
| Fonts | Space Grotesk, DM Sans, JetBrains Mono |
| Design | Glass morphism, purple accent (#7c3aed), dark theme |

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Environment Variables

```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
VITE_PRIVY_APP_ID=your_privy_app_id
PRIVY_APP_SECRET=your_privy_app_secret
SESSION_SECRET=your_session_secret
```
Run Locally
git clone https://github.com/halogentdev/halogent-dashboard.git
cd halogent-dashboard
npm install
npm run db:push
npm run dev
The app starts at http://localhost:5000.
```
Project Structure
client/src/
├── pages/
│   ├── landing.tsx          Public landing with live agent feed
│   ├── login.tsx            Privy email authentication
│   ├── install.tsx          Step-by-step CLI install guide
│   ├── docs.tsx             Full platform documentation
│   ├── dashboard.tsx        Stats overview and metrics
│   ├── agents.tsx           Agent registry and creation
│   ├── agent-detail.tsx     Agent config and deployment
│   ├── skills.tsx           Skill toggle dashboard
│   ├── privacy.tsx          Privacy engine controls
│   ├── deployments.tsx      Deployment history
│   └── playground.tsx       Agent testing sandbox
├── components/
│   ├── app-sidebar.tsx      Navigation sidebar
│   └── dashboard-layout.tsx Layout with header/footer
└── lib/
    ├── auth.tsx             Privy auth context
    └── queryClient.ts       API client setup
server/
├── routes.ts                API endpoints
├── storage.ts               Data layer and agent lifecycle
└── index.ts                 Express server
shared/
└── schema.ts                Types and Zod schemas
halogent-cli/
└── bin/halogent.js          CLI source (published to npm)
```
