# MCP Official Reference Servers

> The official collection of Model Context Protocol servers — 79,900+ stars. Reference implementations and production-ready servers for files, git, databases, memory, and more.

| Field | Value |
|-------|-------|
| **URL** | https://github.com/modelcontextprotocol/servers |
| **Stars** | 79,900+ |
| **Language** | TypeScript |
| **Topics** | mcp, servers, reference-implementation, ai-tools |
| **Added** | 2026-03-02 |

---

## What Is This?

The official MCP servers repository contains both **reference implementations** (demonstrating MCP features) and **production-ready servers** for common integrations. This is the starting point for understanding how MCP servers are built.

## Official Reference Servers

| Server | What It Does | Key Tools |
|--------|-------------|-----------|
| **Everything** | Reference server demonstrating all MCP features | Prompts, resources, tools (all types) |
| **Fetch** | Web content fetching and conversion | Fetch URLs, convert to markdown |
| **Filesystem** | Secure file operations with access controls | Read, write, search, move files |
| **Git** | Git repository operations | Log, diff, status, commit, branch |
| **Memory** | Knowledge graph-based persistent memory | Store, retrieve, relate facts |
| **Sequential Thinking** | Dynamic problem-solving through thought chains | Break down complex problems |
| **Time** | Time and timezone operations | Current time, timezone conversion |

## Community Ecosystem

The broader MCP ecosystem includes 8,600+ community servers covering:

- **Databases**: PostgreSQL, MySQL, MongoDB, SQLite, Redis
- **Cloud**: AWS, GCP, Azure, Docker
- **Productivity**: Google Drive, Slack, Notion, Asana
- **Developer Tools**: GitHub, GitLab, Jira, Linear
- **Search**: Brave Search, Google Search, Tavily
- **Data**: Pandas, Apache Spark, BigQuery
- **Communication**: Email, SMS, Discord
- **AI/ML**: Hugging Face, Weights & Biases, MLflow

## How to Use

### Register a Server in Claude Desktop

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"]
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git", "--repository", "/your/repo"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

### Register in Claude Code (.mcp.json)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}
```

## Use Cases

- **AI-Powered File Management**: Use the filesystem server to let Claude read, write, and search your files
- **Git Workflow Automation**: Use the git server for AI-assisted code reviews and commits
- **Persistent AI Memory**: Use the memory server so Claude remembers facts across sessions
- **Web Research**: Use the fetch server to retrieve and analyze web content
- **Complex Problem Solving**: Use sequential thinking for multi-step reasoning

## Key Takeaways

- **What it solves:** Ready-made MCP servers for common integrations
- **Best for:** Getting started with MCP without building from scratch
- **Install:** Most available via `npx -y @modelcontextprotocol/server-<name>`
- **Maturity:** Extremely high — 79,900+ stars, official Anthropic project
- **Community:** 8,600+ additional community servers available

## Awesome MCP Server Lists

- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)
- [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)
- [appcypher/awesome-mcp-servers](https://github.com/appcypher/awesome-mcp-servers)

## Related Sources

- [MCP Specification](../articles/mcp-official-specification.md)
- [Build an MCP Server](../articles/mcp-build-server-tutorial.md)
- [MCP TypeScript SDK](./mcp-typescript-sdk.md)
- [MCP Python SDK](./mcp-python-sdk.md)
- [GitHub MCP Server](./github-mcp-server.md)
- Topic: [mcp-servers](../topics/mcp-servers.md)

---

*Last processed: 2026-03-02*
