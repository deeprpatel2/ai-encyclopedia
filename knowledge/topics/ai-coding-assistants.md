# Topic: AI Coding Assistants & Developer Tools

> Cross-source knowledge guide covering AI-powered coding tools, skills systems, MCP servers, and developer productivity platforms.

---

## Sources in This Topic

| Source | Type | Key Focus |
|--------|------|-----------|
| [Databricks AI Dev Kit](../github-repos/databricks-ai-dev-kit.md) | GitHub Repo | MCP tools + skills for Databricks development |
| [Claude Code Skills](../articles/claude-code-skills.md) | Article | Creating and managing skills for Claude Code |

## The Big Picture

AI coding assistants are evolving from simple autocomplete to full autonomous agents. The key technologies driving this:

### 1. Skills / Custom Instructions
**What:** Markdown files that teach AI assistants patterns and behaviors.
**Why it matters:** Lets you customize AI behavior per-project without retraining.
**Sources:** Claude Code Skills guide, Databricks AI Dev Kit (19 skills included)

### 2. MCP (Model Context Protocol)
**What:** A protocol for AI assistants to call external tools (APIs, databases, services).
**Why it matters:** Extends AI capabilities beyond text — run SQL, deploy code, manage infrastructure.
**Sources:** Databricks AI Dev Kit (50+ MCP tools)

### 3. Agent Frameworks
**What:** Systems that let AI agents plan, execute multi-step tasks, and use tools autonomously.
**Why it matters:** Moves from single-prompt interactions to complex workflow automation.
**Sources:** Both Claude Code Skills (subagent execution) and Databricks AI Dev Kit (builder app)

## Patterns to Apply

### Pattern: Skill-Based Architecture
Instead of one massive prompt, break your AI instructions into modular skills:
```
.claude/skills/
├── code-review/SKILL.md     # Review checklist
├── deploy/SKILL.md           # Deployment workflow
├── debug/SKILL.md            # Debugging playbook
└── api-design/SKILL.md       # API conventions
```

### Pattern: MCP Tool Registration
Register domain-specific tools via MCP so your AI assistant can take real actions:
```json
{
  "tools": {
    "execute_sql": "Run SQL queries on Databricks",
    "create_job": "Create a scheduled workflow",
    "deploy_model": "Deploy ML model to endpoint"
  }
}
```

### Pattern: Parallel Agent Execution
Use batch/parallel patterns for large-scale changes:
- Claude Code's `/batch` skill spawns agents in isolated worktrees
- Each agent implements one unit of work independently
- Results are merged via PRs

## Tools Comparison

| Tool | Type | Strengths |
|------|------|-----------|
| Claude Code | AI Coding Assistant | Skills, subagents, /batch, deep reasoning |
| Cursor | AI Code Editor | IDE integration, inline completions, MCP support |
| Windsurf | AI Code Editor | Flow-based AI, context awareness |
| Databricks AI Dev Kit | Toolkit | 50+ MCP tools, 19 skills, Databricks-specific |

## What to Learn Next

1. **Create your first Claude Code skill** — Start with a simple code review checklist
2. **Set up an MCP server** — Connect Claude Code to an external API
3. **Try /batch** — Run a large-scale refactor across your codebase
4. **Build custom tools** — Use databricks-tools-core for Python-based AI tools

## Related Topics

- [MCP Servers](./mcp-servers.md) *(to be created as more sources are added)*
- [AI Agents](./ai-agents.md) *(to be created as more sources are added)*
- [Databricks](./databricks.md) *(to be created as more sources are added)*

---

*Auto-generated topic guide. Updated: 2026-03-02*
