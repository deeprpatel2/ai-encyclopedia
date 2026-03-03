# Oh My OpenCode — Multi-Model AI Agent Orchestrator

> The best agent harness. Batteries-included agents, hooks, MCPs, and workflows for 75+ models. An open-source alternative to Claude Code that works with any LLM. 36,200+ stars.

| Field | Value |
|-------|-------|
| **URL** | https://github.com/code-yeongyu/oh-my-opencode |
| **Stars** | 36,200+ |
| **Language** | TypeScript |
| **Topics** | ai-coding, open-source, multi-model, agents, opencode, developer-tools |
| **Added** | 2026-03-02 |

---

## What Is Oh My OpenCode?

Oh My OpenCode (OMO) is a plugin/harness for OpenCode — a terminal-based open-source AI coding agent. While Claude Code locks you into Claude models only, Oh My OpenCode gives you a full AI dev team using **any model** (75+ supported) with parallel agents, auto-execution, and deterministic code refactoring.

## Why It Matters

| Feature | Claude Code | Oh My OpenCode |
|---------|------------|----------------|
| Models | Claude only | 75+ (Claude, GPT, DeepSeek, Qwen, Mistral, local) |
| Agents | Single | Multi-agent parallel (Sisyphus orchestrator) |
| Execution | User-approved | Auto-execution mode available |
| Refactoring | AI-assisted | Deterministic (LSP/AST-grep based) |
| License | Proprietary | Open source |

## Architecture: The AI Dev Team

Oh My OpenCode orchestrates multiple specialized agents in parallel:

| Agent | Role |
|-------|------|
| **Sisyphus** | Orchestrator — manages all other agents, relentless task completion |
| **Hephaestus** | Builder — writes and refactors code |
| **Oracle** | Reviewer — analyzes code quality, finds bugs |
| **Librarian** | Researcher — searches docs, finds patterns |
| **Explore** | Scout — navigates codebase, understands structure |

## Key Features

- **75+ Models**: Claude, GPT-4, DeepSeek, Qwen, Mistral, Llama, local models via Ollama
- **Multi-Agent Parallel Execution**: Agents work simultaneously on different tasks
- **Deterministic Refactoring**: Uses LSP and AST-grep for precise, reliable code changes
- **IDE-Level Tools**: Full language server integration
- **MCP Support**: Connect to any MCP server for external tools
- **Hooks System**: Pre/post execution hooks for custom workflows
- **Monorepo Support**: Built for complex, multi-package codebases

## How to Use

### Install

```bash
# Install OpenCode first
npm install -g opencode

# Then install Oh My OpenCode
npm install -g oh-my-opencode
```

### Configure Models

```yaml
# .opencode.yaml
models:
  default: claude-sonnet-4-6
  fast: deepseek-chat
  reasoning: deepseek-r1
```

### Run

```bash
# Start with default model
opencode

# Use a specific model
opencode --model deepseek-r1

# Auto-execution mode (no confirmations)
opencode --auto
```

## Use Cases

- **Multi-Model Development**: Use Claude for complex reasoning, DeepSeek for speed, local models for privacy
- **Large Codebase Refactoring**: Deterministic AST-based refactoring across entire monorepos
- **AI Team Simulation**: Parallel agents for code, review, and research simultaneously
- **Cost Optimization**: Mix expensive and cheap models based on task complexity
- **Privacy-First Development**: Use local models via Ollama for sensitive code

## Key Takeaways

- **What it solves:** Open-source Claude Code alternative that works with any LLM
- **Killer feature:** Multi-agent parallel execution with specialized roles
- **Best for:** Developers who want model flexibility and parallel AI agents
- **Maturity:** 36,200+ stars, rapidly growing community
- **Differentiator:** Deterministic refactoring via LSP/AST-grep (not just AI guessing)

## Related Sources

- [OpenClaw](./openclaw.md)
- [LangChain / LangGraph](./langchain.md)
- [CrewAI](./crewai.md)
- Topic: [ai-landscape-2026](../topics/ai-landscape-2026.md)

---

*Last processed: 2026-03-02*
