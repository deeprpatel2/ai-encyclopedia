# MCP TypeScript SDK

> The official TypeScript SDK for building MCP servers and clients. 11,700+ stars.

| Field | Value |
|-------|-------|
| **URL** | https://github.com/modelcontextprotocol/typescript-sdk |
| **Stars** | 11,728 |
| **Language** | TypeScript |
| **Topics** | mcp, typescript, sdk, ai-tools |
| **Added** | 2026-03-02 |

---

## What Is This?

The official TypeScript SDK for building Model Context Protocol servers and clients. Provides server libraries (tools/resources/prompts), transport layers (Streamable HTTP, stdio), auth helpers, and client libraries.

## Installation

```bash
npm install @modelcontextprotocol/sdk zod@3
```

## Quick Start: Build a Server

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-server",
  version: "1.0.0",
});

// Register a tool
server.registerTool(
  "hello",
  {
    description: "Say hello to someone",
    inputSchema: {
      name: z.string().describe("Name to greet"),
    },
  },
  async ({ name }) => ({
    content: [{ type: "text", text: `Hello, ${name}!` }],
  }),
);

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Key Components

| Component | Import Path | Purpose |
|-----------|------------|---------|
| `McpServer` | `@modelcontextprotocol/sdk/server/mcp.js` | Main server class |
| `StdioServerTransport` | `@modelcontextprotocol/sdk/server/stdio.js` | stdio transport |
| `StreamableHTTPServerTransport` | `@modelcontextprotocol/sdk/server/streamableHttp.js` | HTTP transport |
| `Client` | `@modelcontextprotocol/sdk/client/index.js` | MCP client |

## SDK Features

- **Server**: Tools, resources, prompts, subscriptions, notifications
- **Client**: Transport connectors, high-level helpers, OAuth helpers
- **Middleware**: Express, Hono, Node.js HTTP adapters
- **Auth**: OAuth 2.0 helpers for both server and client
- **Validation**: Zod-based input schema validation

## Use Cases

- Build custom MCP servers exposing your APIs as AI-callable tools
- Create MCP clients that connect to existing servers
- Integrate MCP into Express/Hono web applications
- Add OAuth authentication to MCP servers

## Key Takeaways

- **Package:** `@modelcontextprotocol/sdk`
- **Input validation:** Uses Zod for type-safe schemas
- **Transport:** stdio (local) or Streamable HTTP (remote)
- **Maturity:** 11,700+ stars, official Anthropic-maintained SDK

## Related Sources

- [MCP Specification](../articles/mcp-official-specification.md)
- [Build an MCP Server](../articles/mcp-build-server-tutorial.md)
- [MCP Python SDK](./mcp-python-sdk.md)
- Topic: [mcp-servers](../topics/mcp-servers.md)

---

*Last processed: 2026-03-02*
