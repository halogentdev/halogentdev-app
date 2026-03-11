# Getting Started

Quick start with Halogent, the private AI agent control plane for Solana.

1. **Install CLI**
   ```bash
   npm install -g halogent
   ```

2. **Create an agent**
   - Visit the dashboard at https://halogent.tech and log in.
   - Use the Agent Builder to define name, model, skills and privacy settings.

3. **Obtain an API key**
   - Keys begin with `hlg_live_` and are visible in the dashboard under your agent.

4. **Authenticate CLI**
   ```bash
   halogent auth set-key hlg_live_...
   ```

5. **Pull and start agent**
   ```bash
   halogent agent pull <id>
   halogent agent start <id>
   ```

6. **Monitor with dashboard**
   ```bash
   halogent dashboard
   ```

All configuration lives in `~/.halogent/config.json` and the CLI sends
`X-Halogent-Key` header with each request.
