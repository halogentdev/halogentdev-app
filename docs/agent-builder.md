# Agent Builder

Use the web dashboard or CLI to create agents that perform Solana tasks.

1. **Name & Description** – give your agent a meaningful identifier.
2. **Model Selection** – choose from supported AI models (GPT-4o, Claude, etc.).
3. **System Prompts** – set instructions that guide behavior (e.g. “scan for
   whale trades”).
4. **Skills Assignment** – pick from the Skill System categories (see
   `skill-system.md`). Skills grant on-chain reading, automation, analysis, and
   more.
5. **Privacy Settings** – control prompt logging, memory mode, telemetry, and
   model allowlists.

After saving, the agent receives an ID usable with the CLI commands
`halogent agent pull <id>` and `halogent agent start <id>`.
