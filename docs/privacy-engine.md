# Privacy Engine

Halogent's privacy engine computes a **privacy score** based on configuration
options. Lower scores indicate stricter privacy.

- **Prompt logging** – disabled by default; when off, prompts never leave your
  runtime.
- **Memory modes** – `local` stores memory on your machine; `hosted` keeps it
  on halogent.tech (encrypted).
- **Secret ownership** – choose whether API keys and other secrets are owned by
  the user or the server.
- **Telemetry** – opt-in monitoring of agent performance.
- **Model allowlists** – restrict which AI models agents may call.

Settings reside in `~/.halogent/config.json` or via dashboard UI. The control
plane never inspects private data unless logging is enabled.
