# FAQ

**Q: Is my data private?**
A: Yes. Prompts and agent state remain local unless you explicitly enable
prompt logging or use hosted memory. The control plane only sees metadata and
heartbeats.

**Q: Can I self-host the dashboard?**
A: The open‑source repo includes both frontend and backend; you can deploy it
on your own infrastructure.

**Q: Which AI models are supported?**
A: Halogent supports 30+ models including GPT-4o, Claude 3.5, Gemini, Llama
variants, etc. Use model allowlists to restrict usage.

**Q: What are the costs?**
A: Agents consume model tokens and any Solana transaction fees. Control plane
usage is free for now.

**Q: How secure is the API key?**
A: Keys start with `hlg_live_` and should be stored in `~/.halogent/config.json`.
Rotate them from the dashboard if compromised.
