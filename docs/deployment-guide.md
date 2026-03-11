# Deployment Guide

Deploy agents and the dashboard from Docker, VPS/bare metal, or local runtime.

## Docker

```dockerfile
FROM node:20
RUN npm install -g halogent
ENTRYPOINT ["halogent"]
```

Run your agent container with an environment variable for the API key.

## VPS / Bare Metal

1. Install Node.js 18+
2. `npm install -g halogent`
3. Use `halogent service install <id>` to generate a systemd unit.
4. Place unit file in `/etc/systemd/system/` and `systemctl enable --now <file>`.

## Docker‑Compose

```yaml
version: '3'
services:
  agent:
    image: node:20
    command: halogent agent start <id>
    restart: always
```

## Local Runtime

Simply run the CLI commands on your machine; no container needed. Configure
`~/.halogent/config.json` with `apiKey` and optional `endpoint`.
