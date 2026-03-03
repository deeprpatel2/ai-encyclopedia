# Claude Code Skills — Complete Guide

> Create, manage, and share skills to extend Claude Code's capabilities. Custom commands, bundled skills, subagent execution, and the Agent Skills open standard.

| Field | Value |
|-------|-------|
| **URL** | https://code.claude.com/docs/en/skills |
| **Type** | Official Documentation |
| **Topics** | claude-code, skills, developer-tools, ai-coding-assistants, mcp-servers |
| **Added** | 2026-03-02 |

---

## What Are Claude Code Skills?

Skills extend what Claude Code can do. You create a `SKILL.md` file with instructions, and Claude adds it to its toolkit. Skills follow the [Agent Skills](https://agentskills.io) open standard, which works across multiple AI tools.

**Key concept:** A skill = a `SKILL.md` file with YAML frontmatter (config) + markdown content (instructions).

## Bundled Skills (Built-in)

These ship with every Claude Code installation:

| Skill | What It Does |
|-------|-------------|
| `/simplify` | Reviews your changed files for code reuse, quality, and efficiency. Spawns 3 parallel review agents. |
| `/batch <instruction>` | Orchestrates large-scale changes across a codebase in parallel. Spawns one agent per work unit in isolated git worktrees. |
| `/debug [description]` | Troubleshoots your Claude Code session by reading debug logs. |

## Skill Storage Locations (Priority Order)

| Location | Path | Scope |
|----------|------|-------|
| Enterprise | Managed settings | All users in org |
| Personal | `~/.claude/skills/<name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<name>/SKILL.md` | This project only |
| Plugin | `<plugin>/skills/<name>/SKILL.md` | Where plugin enabled |

Higher-priority locations win when names conflict.

## How to Create a Skill

### Step 1: Create the Directory

```bash
mkdir -p ~/.claude/skills/my-skill
```

### Step 2: Write SKILL.md

```yaml
---
name: my-skill
description: What this skill does and when to use it
---

Your instructions here. Claude follows these when the skill is invoked.

1. **Step one**: Do this
2. **Step two**: Then do this
3. **Step three**: Finally this
```

### Step 3: Test It

```
# Let Claude auto-invoke (if description matches)
How does this code work?

# Or invoke directly
/my-skill
```

## Frontmatter Configuration Reference

| Field | Required | Description |
|-------|----------|-------------|
| `name` | No | Display name (defaults to directory name). Lowercase, hyphens, max 64 chars. |
| `description` | Recommended | What it does + when to use it. Claude uses this for auto-invocation. |
| `argument-hint` | No | Autocomplete hint, e.g., `[issue-number]` |
| `disable-model-invocation` | No | `true` = only YOU can invoke (prevents auto-trigger) |
| `user-invocable` | No | `false` = only CLAUDE can invoke (background knowledge) |
| `allowed-tools` | No | Tools Claude can use without permission, e.g., `Read, Grep, Glob` |
| `model` | No | Override the model used |
| `context` | No | `fork` = run in isolated subagent context |
| `agent` | No | Subagent type when `context: fork` (e.g., `Explore`, `Plan`) |
| `hooks` | No | Hooks scoped to this skill's lifecycle |

## Invocation Control Matrix

| Config | You Can Invoke | Claude Can Invoke | When Loaded |
|--------|---------------|------------------|-------------|
| Default | Yes | Yes | Description always loaded, full skill on invoke |
| `disable-model-invocation: true` | Yes | No | Not in context until you invoke |
| `user-invocable: false` | No | Yes | Description always loaded, full skill on invoke |

## String Substitutions

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | All arguments passed to the skill |
| `$ARGUMENTS[N]` or `$N` | Specific argument by index (0-based) |
| `${CLAUDE_SESSION_ID}` | Current session ID |

## Advanced Patterns

### Dynamic Context Injection

Use `` !`command` `` to run shell commands before skill content is sent to Claude:

```yaml
---
name: pr-summary
context: fork
agent: Explore
---

## PR Context
- PR diff: !`gh pr diff`
- Changed files: !`gh pr diff --name-only`

Summarize this pull request...
```

### Subagent Execution

Add `context: fork` to run in isolation:

```yaml
---
name: deep-research
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:
1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with file references
```

### Supporting Files

```
my-skill/
├── SKILL.md           # Main instructions (required)
├── template.md        # Template for Claude to fill in
├── examples/
│   └── sample.md      # Example output
└── scripts/
    └── validate.sh    # Script Claude can execute
```

### Permission Control

```text
# Allow only specific skills
Skill(commit)
Skill(review-pr *)

# Deny specific skills
Skill(deploy *)
```

## How to Use in Your Projects

### Pattern 1: Code Review Skill
Create a project-level skill that enforces your team's review checklist.

### Pattern 2: Deploy Workflow
Create a `disable-model-invocation: true` skill for safe, user-triggered deployments.

### Pattern 3: Codebase Knowledge
Create `user-invocable: false` skills with domain knowledge Claude uses automatically.

### Pattern 4: Parallel Batch Operations
Use `/batch` for large-scale refactors across many files.

### Pattern 5: Visual Output Generation
Bundle Python/Node scripts that generate interactive HTML reports.

## Use Cases

- **AI-Assisted Development**: Enhance your coding workflow with custom AI behaviors
- **Team Standardization**: Share project skills via git to ensure consistent patterns
- **Custom Workflows**: Automate deployments, PR reviews, issue fixes with skill chains
- **Knowledge Base**: Teach Claude about your codebase with background skills
- **MCP Integration**: Combine skills with MCP servers for external tool access

## Key Takeaways

- **Skills = SKILL.md files** with YAML frontmatter + markdown instructions
- **Two invocation modes**: User-invoked (`/name`) and model-invoked (automatic)
- **Subagent support**: Run complex skills in isolated contexts with `context: fork`
- **Dynamic data**: Inject runtime data with `` !`command` `` syntax
- **Open standard**: Works across Claude Code, Cursor, and other Agent Skills-compatible tools
- **Keep SKILL.md under 500 lines** — use supporting files for detailed reference

## Related Sources

- Topic: [claude-code](../topics/ai-coding-assistants.md)
- Topic: [skills](../topics/ai-coding-assistants.md)
- Topic: [developer-tools](../topics/ai-coding-assistants.md)
- See also: [Databricks AI Dev Kit](../github-repos/databricks-ai-dev-kit.md) — uses skills extensively

---

*Last processed: 2026-03-02*
