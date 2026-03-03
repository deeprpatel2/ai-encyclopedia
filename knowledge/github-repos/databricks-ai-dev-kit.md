# Databricks AI Dev Kit

> Databricks Toolkit for AI Coding Agents — MCP server, skills, and core library for building on Databricks with Claude Code, Cursor, and more.

| Field | Value |
|-------|-------|
| **URL** | https://github.com/databricks-solutions/ai-dev-kit |
| **Stars** | 744 |
| **Language** | Python |
| **Topics** | databricks, ai-agents, mcp-servers, vibe-coding, claude-code, cursor |
| **Status** | Databricks Certified Gold Project |
| **Added** | 2026-03-02 |

---

## What Is This?

The **AI Dev Kit** gives your AI coding assistant (Claude Code, Cursor, Windsurf, etc.) the tools and knowledge it needs to build on Databricks. Instead of your AI guessing at APIs, it gets:

- **50+ MCP tools** — executable actions for Databricks (run SQL, create jobs, deploy models)
- **19 markdown skills** — best-practice patterns the AI follows (Spark pipelines, Unity Catalog, etc.)
- **A Python core library** — high-level functions you can use directly in code
- **A visual builder app** — full-stack web UI for Databricks development

## Repository Structure

```
📁 .claude-plugin          # Claude Code plugin configuration
📁 .claude                 # Claude settings and skills
📁 .github                 # CI/CD workflows
📁 databricks-builder-app  # Full-stack web app with chat UI
📁 databricks-mcp-server   # MCP server with 50+ tools
📁 databricks-skills       # 19 markdown skills for patterns
📁 databricks-tools-core   # Python library core
📁 hooks                   # Git hooks
📄 install.sh              # Mac/Linux installer
📄 install.ps1             # Windows installer
📄 .mcp.json               # MCP configuration
```

## Key Components

| Component | Description |
|-----------|-------------|
| `databricks-tools-core/` | Python library with high-level Databricks functions |
| `databricks-mcp-server/` | MCP server exposing 50+ tools for AI assistants |
| `databricks-skills/` | 19 markdown skills teaching Databricks patterns |
| `databricks-builder-app/` | Full-stack web app with Claude Code integration |

## How to Use in Your Projects

### Quick Install (Mac/Linux)

```bash
bash <(curl -sL https://raw.githubusercontent.com/databricks-solutions/ai-dev-kit/main/install.sh)
```

### Quick Install (Windows PowerShell)

```powershell
irm https://raw.githubusercontent.com/databricks-solutions/ai-dev-kit/main/install.ps1 | iex
```

### Advanced Options

```bash
# Global installation with force reinstall
bash <(curl -sL https://raw.githubusercontent.com/databricks-solutions/ai-dev-kit/main/install.sh) --global --force

# Install for specific tools only (cursor, claude-code)
bash <(curl -sL https://raw.githubusercontent.com/databricks-solutions/ai-dev-kit/main/install.sh) --tools cursor
```

### Use the Core Library Directly

```python
from databricks_tools_core.sql import execute_sql

results = execute_sql("SELECT * FROM my_catalog.schema.table LIMIT 10")
```

Works with LangChain, OpenAI Agents SDK, or any Python framework.

### Visual Builder App

```bash
cd ai-dev-kit/databricks-builder-app
./scripts/setup.sh
# Follow instructions to start the app
```

## What You Can Build With This

- **Spark Declarative Pipelines** — streaming tables, CDC, SCD Type 2, Auto Loader
- **Databricks Jobs** — scheduled workflows, multi-task DAGs
- **AI/BI Dashboards** — visualizations, KPIs, analytics
- **Unity Catalog** — tables, volumes, governance
- **Genie Spaces** — natural language data exploration
- **Knowledge Assistants** — RAG-based document Q&A
- **MLflow Experiments** — evaluation, scoring, traces
- **Model Serving** — deploy ML models and AI agents to endpoints
- **Databricks Apps** — full-stack web applications

## Use Cases

### 1. AI-Assisted Data Pipeline Development
Install the kit in your project, then ask Claude Code to build a Spark pipeline. The 19 skills guide the AI to follow best practices for streaming tables, CDC patterns, and Auto Loader configurations.

### 2. MCP-Powered Databricks Automation
Register the MCP server in your AI assistant to get 50+ executable actions: run SQL, create jobs, deploy models, manage Unity Catalog — all through natural language.

### 3. Rapid Prototyping with Visual Builder
Use the builder app's chat UI to prototype Databricks solutions. Ask for dashboards, notebooks, or workflows and iterate visually.

### 4. Team Knowledge Base
The 19 skills serve as living documentation for your team's Databricks patterns. As the AI follows them, team members learn consistent practices.

### 5. Cross-Framework Integration
Use `databricks-tools-core` with LangChain, OpenAI, or any Python framework to add Databricks capabilities to your existing AI agents.

## Key Takeaways

- **What it solves:** Bridges the gap between AI coding assistants and Databricks platform
- **Best for:** Data engineers and developers building on Databricks who want AI-assisted development
- **Integration:** Works with Claude Code, Cursor, Windsurf, and any MCP-compatible tool
- **Maturity:** High — 744 stars, Databricks Certified Gold Project, actively maintained
- **Prerequisites:** uv (Python package manager), Databricks CLI, an AI coding environment

## Related Sources

- Topic: [databricks](../topics/ai-coding-assistants.md)
- Topic: [mcp-servers](../topics/ai-coding-assistants.md)
- Topic: [claude-code](../topics/ai-coding-assistants.md)
- Topic: [ai-agents](../topics/ai-coding-assistants.md)

---

*Last processed: 2026-03-02*
