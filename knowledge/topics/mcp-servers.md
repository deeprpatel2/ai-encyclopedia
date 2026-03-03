# Topic: MCP Servers — Complete Knowledge Guide

> Everything you need to know about the Model Context Protocol: what it is, how it works, how to build servers, available SDKs, the ecosystem, and practical patterns for your projects.

---

## Sources in This Topic

| Source | Type | Key Focus |
|--------|------|-----------|
| [MCP Official Specification](../articles/mcp-official-specification.md) | Spec | Protocol architecture, primitives, security |
| [Build an MCP Server](../articles/mcp-build-server-tutorial.md) | Tutorial | Step-by-step Python + TypeScript server builds |
| [MCP Official Servers](../github-repos/mcp-official-servers.md) | GitHub | 79,900+ star reference server collection |
| [MCP TypeScript SDK](../github-repos/mcp-typescript-sdk.md) | GitHub | Official TS SDK (11,700+ stars) |
| [MCP Python SDK](../github-repos/mcp-python-sdk.md) | GitHub | Official Python SDK with FastMCP (21,900+ stars) |
| [GitHub MCP Server](../github-repos/github-mcp-server.md) | GitHub | GitHub's official MCP server (27,400+ stars) |
| [Databricks AI Dev Kit](../github-repos/databricks-ai-dev-kit.md) | GitHub | 50+ MCP tools for Databricks |
| [Claude Code Skills](../articles/claude-code-skills.md) | Article | Skills + MCP integration patterns |

---

## What Is MCP? (The 30-Second Version)

**MCP = USB-C for AI.** One universal protocol that lets any AI model connect to any tool or data source.

```
Before MCP:  Each AI app builds custom integrations → N×M problem
With MCP:    Everyone speaks the same protocol → N+M problem (solved!)
```

**Created by:** Anthropic (Nov 2024)
**Adopted by:** OpenAI, Google DeepMind, Microsoft
**Ecosystem:** 8,600+ community servers, SDKs in 8 languages

---

## How MCP Works

### Architecture

```
Host (Claude Desktop / Cursor / VS Code)
  └── Client 1 ──── Server 1 (Files)
  └── Client 2 ──── Server 2 (Database)
  └── Client 3 ──── Server 3 (GitHub API)
```

Each **Host** creates **Clients**, each Client has a 1:1 connection with a **Server**.

### The Three Primitives

| What | Who Controls | Purpose | Example |
|------|-------------|---------|---------|
| **Tools** | AI Model | Functions the LLM calls | `execute_sql`, `send_email` |
| **Resources** | Application | Data for context | File contents, DB schemas |
| **Prompts** | User | Templates for tasks | Slash commands, workflows |

### Protocol Stack
- **Message format:** JSON-RPC 2.0
- **Transport:** stdio (local) or Streamable HTTP (remote)
- **Session:** Stateful with capability negotiation
- **Security:** Human-in-the-loop for all tool calls

---

## How to Build an MCP Server

### Fastest Path: Python with FastMCP

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-server")

@mcp.tool()
async def search_docs(query: str) -> str:
    """Search documentation for a topic.

    Args:
        query: Search query string
    """
    # Your logic here
    results = do_search(query)
    return format_results(results)

mcp.run(transport="stdio")
```

**That's it.** Type hints + docstrings = auto-generated tool schema. No boilerplate.

### TypeScript Alternative

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "my-server", version: "1.0.0" });

server.registerTool("search_docs", {
  description: "Search documentation",
  inputSchema: { query: z.string().describe("Search query") },
}, async ({ query }) => ({
  content: [{ type: "text", text: `Results for: ${query}` }],
}));

const transport = new StdioServerTransport();
await server.connect(transport);
```

### Register in Claude Desktop

```json
{
  "mcpServers": {
    "my-server": {
      "command": "uv",
      "args": ["--directory", "/path/to/server", "run", "server.py"]
    }
  }
}
```

---

## Available SDKs

| Language | Package | Stars | Notes |
|----------|---------|-------|-------|
| **Python** | `mcp[cli]` | 21,900+ | FastMCP — decorator-based, auto-schemas |
| **TypeScript** | `@modelcontextprotocol/sdk` | 11,700+ | Zod validation, Express/Hono middleware |
| **Go** | Official Go SDK | Active | Official, maintained by community |
| **Java** | Official Java SDK | Active | Spring AI integration |
| **C#** | Official C# SDK | Active | Microsoft-maintained |
| **Kotlin** | Official Kotlin SDK | Active | JVM ecosystem |
| **Ruby** | Official Ruby SDK | Active | Ruby ecosystem |
| **Swift** | Official Swift SDK | Active | Apple ecosystem |

---

## MCP Server Patterns for Your Projects

### Pattern 1: API Wrapper Server
Wrap any REST/GraphQL API as MCP tools. The AI can call your APIs directly.

```python
@mcp.tool()
async def create_ticket(title: str, description: str, priority: str) -> str:
    """Create a support ticket in our system."""
    response = await api_client.post("/tickets", json={...})
    return f"Created ticket #{response['id']}"
```

### Pattern 2: Database Server
Expose SQL execution, schema inspection, and data analysis.

```python
@mcp.tool()
async def query_database(sql: str) -> str:
    """Execute a read-only SQL query against the analytics database."""
    results = await db.execute(sql)
    return format_as_table(results)
```

### Pattern 3: Knowledge Base Server
Expose search and retrieval over your documentation/data.

```python
@mcp.tool()
async def search_knowledge(query: str, max_results: int = 5) -> str:
    """Search the knowledge base for relevant documents."""
    results = vector_store.similarity_search(query, k=max_results)
    return format_results(results)
```

### Pattern 4: DevOps Server
Expose deployment, monitoring, and infrastructure tools.

```python
@mcp.tool()
async def deploy_service(service: str, version: str) -> str:
    """Deploy a service to production."""
    result = await deploy_manager.deploy(service, version)
    return f"Deployed {service} v{version}: {result.status}"
```

### Pattern 5: File Processing Server
Expose document parsing, image analysis, or data transformation.

```python
@mcp.tool()
async def parse_pdf(file_path: str) -> str:
    """Extract text content from a PDF file."""
    text = pdf_reader.extract(file_path)
    return text
```

---

## The MCP Ecosystem

### Top Servers by Stars

| Server | Stars | What It Does |
|--------|-------|-------------|
| MCP Official Servers | 79,900+ | Reference implementations |
| GitHub MCP Server | 27,400+ | GitHub operations |
| MCP Python SDK | 21,900+ | Python SDK + FastMCP |
| MCP TypeScript SDK | 11,700+ | TypeScript SDK |

### Major Adopters
- **Anthropic**: Claude Desktop, Claude Code
- **OpenAI**: ChatGPT, Agents SDK
- **Microsoft**: VS Code, C# SDK, Azure
- **Google**: DeepMind integration
- **Cursor**: AI code editor
- **Windsurf**: AI code editor
- **Databricks**: 50+ MCP tools for data platform

### Awesome Lists
- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)
- [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)

---

## Critical Rules When Building MCP Servers

1. **Never `console.log()` in stdio servers** — it corrupts JSON-RPC messages
2. **Always validate inputs** — use Zod (TS) or type hints (Python)
3. **Implement error handling** — return `isError: true` for execution failures
4. **Test with MCP Inspector** before connecting to a real host
5. **Use absolute paths** in `claude_desktop_config.json`
6. **Declare capabilities** during initialization
7. **Human-in-the-loop** — never skip user consent for destructive actions

---

## What to Learn Next

1. **Build your first server** → Follow the [Build Tutorial](../articles/mcp-build-server-tutorial.md)
2. **Explore existing servers** → Browse [Official Servers](../github-repos/mcp-official-servers.md)
3. **Read the spec** → Deep dive into [MCP Specification](../articles/mcp-official-specification.md)
4. **Pick your SDK** → [Python](../github-repos/mcp-python-sdk.md) or [TypeScript](../github-repos/mcp-typescript-sdk.md)
5. **Build something real** → Wrap your own API as an MCP server

---

*Auto-generated topic guide. Updated: 2026-03-02*
