# MCP Python SDK (FastMCP)

> The official Python SDK for building MCP servers and clients. 21,900+ stars. Includes FastMCP for rapid server development.

| Field | Value |
|-------|-------|
| **URL** | https://github.com/modelcontextprotocol/python-sdk |
| **Stars** | 21,923 |
| **Language** | Python |
| **Topics** | mcp, python, sdk, fastmcp, ai-tools |
| **Added** | 2026-03-02 |

---

## What Is This?

The official Python SDK for building MCP servers and clients. Includes **FastMCP** — a high-level framework that auto-generates tool definitions from Python type hints and docstrings.

## Installation

```bash
# With uv (recommended)
uv add "mcp[cli]"

# With pip
pip install "mcp[cli]"
```

## Quick Start: Build a Server with FastMCP

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-server")

@mcp.tool()
async def hello(name: str) -> str:
    """Say hello to someone.

    Args:
        name: Name to greet
    """
    return f"Hello, {name}!"

# Run with stdio transport
mcp.run(transport="stdio")
```

**That's it.** FastMCP reads your type hints (`name: str`) and docstring to auto-generate the tool's JSON Schema. No manual schema definition needed.

## Key Features

### FastMCP Decorators

```python
@mcp.tool()        # Define a tool (function the LLM can call)
@mcp.resource()    # Define a resource (data the client can read)
@mcp.prompt()      # Define a prompt (template for users)
```

### Resource Example

```python
@mcp.resource("config://app")
def get_config() -> str:
    """Return application configuration."""
    return json.dumps({"debug": True, "version": "1.0"})
```

### Prompt Example

```python
@mcp.prompt()
def code_review(code: str) -> str:
    """Create a code review prompt.

    Args:
        code: The code to review
    """
    return f"Please review this code:\n\n{code}"
```

## Running Servers

```bash
# stdio transport (for Claude Desktop)
uv run my_server.py

# Or with the MCP CLI
mcp run my_server.py

# Test with MCP Inspector
mcp dev my_server.py
```

## Why Python SDK Has More Stars

- FastMCP makes server creation incredibly simple (decorator-based)
- Python is the dominant language in AI/ML
- Type hints + docstrings = zero boilerplate
- Async-first design works well with modern Python

## Use Cases

- Wrap Python APIs and libraries as MCP tools
- Build data science MCP servers (pandas, SQL, ML models)
- Create DevOps automation servers
- Expose RAG/search functionality to AI assistants

## Key Takeaways

- **Package:** `mcp[cli]` (includes FastMCP)
- **Magic:** Type hints + docstrings → auto-generated tool schemas
- **Transport:** stdio (local) or HTTP (remote)
- **Testing:** `mcp dev` launches the MCP Inspector
- **Maturity:** 21,900+ stars, most popular MCP SDK

## Related Sources

- [MCP Specification](../articles/mcp-official-specification.md)
- [Build an MCP Server](../articles/mcp-build-server-tutorial.md)
- [MCP TypeScript SDK](./mcp-typescript-sdk.md)
- Topic: [mcp-servers](../topics/mcp-servers.md)

---

*Last processed: 2026-03-02*
