# GitHub Official MCP Server

> GitHub's official MCP Server for AI-powered GitHub operations. 27,400+ stars. Manage repos, issues, PRs, and more through AI assistants.

| Field | Value |
|-------|-------|
| **URL** | https://github.com/github/github-mcp-server |
| **Stars** | 27,398 |
| **Language** | Go |
| **Topics** | github, mcp, mcp-server |
| **Added** | 2026-03-02 |

---

## What Is This?

GitHub's official MCP Server that lets AI assistants interact with GitHub. Manage repositories, issues, pull requests, code search, and more — all through natural language via any MCP-compatible client.

## Setup

### In Claude Desktop

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN=<your-token>",
        "ghcr.io/github/github-mcp-server"
      ]
    }
  }
}
```

### In Claude Code

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<your-token>"
      }
    }
  }
}
```

## Available Tools

- **Repository management**: Create, fork, list repos
- **Issues**: Create, read, update, close, comment on issues
- **Pull Requests**: Create, review, merge, comment on PRs
- **Code Search**: Search across repos with GitHub's code search
- **File Operations**: Read, create, update files in repos
- **Branches**: Create, delete, list branches
- **Actions**: View workflow runs and status
- **Releases**: Create and manage releases

## Use Cases

- **AI-Powered Code Review**: Let Claude review PRs and leave comments
- **Issue Triage**: AI reads and categorizes new issues
- **Automated Documentation**: AI generates docs from code
- **Release Management**: AI creates release notes from commits
- **Project Management**: AI tracks issues and PRs across repos

## Key Takeaways

- **What it solves:** GitHub integration for any MCP-compatible AI assistant
- **Best for:** Developers who want AI-powered GitHub workflow automation
- **Auth:** GitHub Personal Access Token required
- **Maturity:** Extremely high — 27,400+ stars, official GitHub project
- **Runs via:** Docker container or direct binary

## Related Sources

- [MCP Specification](../articles/mcp-official-specification.md)
- [MCP Official Servers](./mcp-official-servers.md)
- Topic: [mcp-servers](../topics/mcp-servers.md)

---

*Last processed: 2026-03-02*
