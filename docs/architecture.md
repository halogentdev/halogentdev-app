# Architecture

Halogent separates the **control plane** (hosted at halogent.tech) from each
user's **runtime** where agents execute on Solana infrastructure. This design
enables privacy and decentralization:

- Control plane stores agent configurations, issues commands, and aggregates
  telemetry (if enabled).
- Runtimes run on the user's hardware or cloud, fetching configs and sending
  heartbeats via the Runtime API (`X-Halogent-Key` header).

```
[User Runtime] <--- HTTPS ---> [Control Plane API]
      |                              |
      |--- transactions to Solana --->|
      |                              |
```

**Privacy guarantees**:
- No prompt or state data is sent unless prompt logging is enabled.
- API key prefix `hlg_live_` ensures trust; keys are stored locally under
  `~/.halogent/config.json`.
- Users self-host agents; control plane only knows about existence and status.
