# CLI Reference

Halogent CLI installed via `npm install -g halogent`.

## Commands

- `auth set-key <key>` – store API key (prefix `hlg_live_`).
- `init` – initialize workspace and verify connection to halogent.tech.
- `agent pull <id>` – fetch config from `/api/v1/agent/:id/config`.
- `agent start <id>` – POST `/api/v1/agent/:id/start` and begin heartbeat.
- `agent stop <id>` – POST `/api/v1/agent/:id/stop`.
- `agent status <id>` – GET `/api/v1/agent/:id/status`.
- `agent dev <id>` – verbose start for development.
- `service install <id>` – output a systemd service unit.
- `config set-endpoint <url>` – override default control plane endpoint.
- `dashboard` – GET `/api/v1/dashboard` and render terminal view.
- `--version` – show version and command list.

Config file location: `~/.halogent/config.json`. Auth header: `X-Halogent-Key`.
