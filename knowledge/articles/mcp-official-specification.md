# MCP Official Specification — Complete Reference

> The Model Context Protocol (MCP) is an open protocol that enables seamless integration between LLM applications and external data sources and tools. Created by Anthropic, adopted by OpenAI, Google DeepMind, and 8,600+ community servers.

| Field | Value |
|-------|-------|
| **URL** | https://modelcontextprotocol.io/specification/2025-11-25 |
| **Type** | Official Specification |
| **Protocol Version** | 2025-11-25 (Stable: 2026.1.0) |
| **Topics** | mcp, protocol, specification, ai-agents, tools |
| **Added** | 2026-03-02 |

---

## What Is MCP?

MCP (Model Context Protocol) is an **open standard** for connecting AI assistants to external data sources and tools. Think of it as **USB-C for AI** — a universal plug that lets any AI model connect to any data source or tool.

**Created by:** Anthropic (November 2024)
**Adopted by:** OpenAI, Google DeepMind, Microsoft, and the broader AI ecosystem
**Current Scale:** 8,600+ community-built MCP servers

## Core Architecture

```
┌─────────────────────────────────┐
│        Application Host         │  (e.g., Claude Desktop, Cursor, VS Code)
│                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │Client│ │Client│ │Client│   │  Each client = 1:1 with a server
│  │  1   │ │  2   │ │  3   │   │
│  └──┬───┘ └──┬───┘ └──┬───┘   │
└─────┼────────┼────────┼────────┘
      │        │        │
      ▼        ▼        ▼
  ┌──────┐ ┌──────┐ ┌──────┐
  │Server│ │Server│ │Server│
  │Files │ │ DB   │ │ API  │
  └──────┘ └──────┘ └──────┘
```

### Three Core Roles

| Role | What It Does | Examples |
|------|-------------|----------|
| **Host** | Container app that manages clients. Controls permissions, security, user authorization. | Claude Desktop, Cursor, VS Code |
| **Client** | Connector within the host. 1:1 relationship with a server. Handles protocol negotiation. | SDK client instance |
| **Server** | Provides context and capabilities. Exposes resources, tools, prompts. | File server, DB server, API server |

## The Three Primitives

MCP servers expose three types of capabilities:

| Primitive | Controlled By | What It Does | Example |
|-----------|--------------|-------------|---------|
| **Resources** | Application | File-like data the client reads | File contents, DB schemas, API responses |
| **Tools** | AI Model | Functions the LLM can call | Run SQL, send email, create file |
| **Prompts** | User | Pre-written templates for tasks | Slash commands, workflow templates |

## Protocol Details

### Message Format
- Built on **JSON-RPC 2.0**
- Stateful sessions with capability negotiation
- Inspired by Language Server Protocol (LSP)

### Transport Options
1. **stdio** — Local process communication (most common for desktop)
2. **Streamable HTTP** — Remote server communication (for web/cloud)

### Connection Lifecycle

```
1. Host creates Client
2. Client sends "initialize" with its capabilities
3. Server responds with its capabilities
4. Capability negotiation complete → session active
5. Client sends requests (tools/list, tools/call, resources/read)
6. Server sends responses + notifications
7. Client or Host terminates session
```

### Capability Negotiation

Servers declare what they support:
```json
{
  "capabilities": {
    "tools": { "listChanged": true },
    "resources": { "subscribe": true, "listChanged": true },
    "prompts": { "listChanged": true }
  }
}
```

## Tools — Deep Dive

### Defining a Tool

```json
{
  "name": "get_weather",
  "title": "Weather Information Provider",
  "description": "Get current weather for a location",
  "inputSchema": {
    "type": "object",
    "properties": {
      "location": { "type": "string", "description": "City name or zip code" }
    },
    "required": ["location"]
  }
}
```

### Tool Call Flow

```
1. Client → Server: tools/list (discover available tools)
2. Server → Client: list of tool definitions
3. LLM selects a tool to use
4. Client → Server: tools/call { name, arguments }
5. Server → Client: tool result { content, isError }
6. Client → LLM: process result
```

### Tool Result Types
- **Text**: `{ "type": "text", "text": "result" }`
- **Image**: `{ "type": "image", "data": "base64...", "mimeType": "image/png" }`
- **Audio**: `{ "type": "audio", "data": "base64...", "mimeType": "audio/wav" }`
- **Resource Link**: `{ "type": "resource_link", "uri": "file:///..." }`
- **Embedded Resource**: `{ "type": "resource", "resource": {...} }`
- **Structured Content**: via `structuredContent` field + `outputSchema`

### Error Handling
- **Protocol Errors**: JSON-RPC errors (unknown tool, malformed request)
- **Execution Errors**: `isError: true` in result (API failures, validation errors)

## Resources — Deep Dive

### Defining a Resource

```json
{
  "uri": "file:///project/src/main.rs",
  "name": "main.rs",
  "description": "Primary application entry point",
  "mimeType": "text/x-rust"
}
```

### URI Schemes
- `https://` — Web resources (client can fetch directly)
- `file://` — Filesystem-like resources
- `git://` — Git version control
- Custom schemes allowed per RFC 3986

### Subscriptions
Clients can subscribe to resource changes and get notifications:
```json
{ "method": "resources/subscribe", "params": { "uri": "file:///main.rs" } }
// → Server sends notifications/resources/updated when it changes
```

## Security Principles

1. **User Consent**: Users must explicitly approve all data access and tool invocations
2. **Data Privacy**: Hosts must get consent before exposing user data to servers
3. **Tool Safety**: Always a human in the loop for tool execution
4. **LLM Sampling Controls**: Users control if/how sampling occurs
5. **Server Isolation**: Servers can't see the full conversation or other servers

## Key Takeaways

- **What it solves:** Universal protocol for AI-to-tool/data integration
- **Think of it as:** USB-C for AI — one standard plug for everything
- **Adoption:** Anthropic, OpenAI, Google DeepMind, Microsoft, 8,600+ community servers
- **Core idea:** Servers expose Tools + Resources + Prompts over JSON-RPC
- **Transport:** stdio (local) or Streamable HTTP (remote)
- **Security:** Human-in-the-loop always required for tool invocations

## Related Sources

- [Build an MCP Server Tutorial](./mcp-build-server-tutorial.md)
- [MCP Official Servers](../github-repos/mcp-official-servers.md)
- [MCP TypeScript SDK](../github-repos/mcp-typescript-sdk.md)
- [MCP Python SDK](../github-repos/mcp-python-sdk.md)
- Topic: [mcp-servers](../topics/mcp-servers.md)

---

*Last processed: 2026-03-02*
