# How to Build an MCP Server — Complete Tutorial

> Step-by-step guide to building MCP servers in Python and TypeScript. From zero to a working server connected to Claude Desktop.

| Field | Value |
|-------|-------|
| **URL** | https://modelcontextprotocol.io/docs/develop/build-server |
| **Type** | Official Tutorial |
| **Topics** | mcp, tutorial, python, typescript, build-server |
| **Added** | 2026-03-02 |

---

## Overview

This guide walks through building a complete MCP weather server that exposes two tools (`get_alerts` and `get_forecast`), then connecting it to Claude Desktop as a host.

## Python MCP Server

### Prerequisites
- Python 3.10+
- MCP Python SDK 1.2.0+
- `uv` package manager

### Step 1: Set Up Environment

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create project
uv init weather
cd weather
uv venv
source .venv/bin/activate

# Install dependencies
uv add "mcp[cli]" httpx
touch weather.py
```

### Step 2: Initialize FastMCP Server

```python
from typing import Any
import httpx
from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP("weather")

# Constants
NWS_API_BASE = "https://api.weather.gov"
USER_AGENT = "weather-app/1.0"
```

**Key:** `FastMCP` uses Python type hints and docstrings to auto-generate tool definitions.

### Step 3: Add Helper Functions

```python
async def make_nws_request(url: str) -> dict[str, Any] | None:
    """Make a request to the NWS API with proper error handling."""
    headers = {"User-Agent": USER_AGENT, "Accept": "application/geo+json"}
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, timeout=30.0)
            response.raise_for_status()
            return response.json()
        except Exception:
            return None
```

### Step 4: Define Tools with `@mcp.tool()`

```python
@mcp.tool()
async def get_alerts(state: str) -> str:
    """Get weather alerts for a US state.

    Args:
        state: Two-letter US state code (e.g. CA, NY)
    """
    url = f"{NWS_API_BASE}/alerts/active/area/{state}"
    data = await make_nws_request(url)

    if not data or "features" not in data:
        return "Unable to fetch alerts or no alerts found."

    if not data["features"]:
        return "No active alerts for this state."

    alerts = [format_alert(feature) for feature in data["features"]]
    return "\n---\n".join(alerts)


@mcp.tool()
async def get_forecast(latitude: float, longitude: float) -> str:
    """Get weather forecast for a location.

    Args:
        latitude: Latitude of the location
        longitude: Longitude of the location
    """
    points_url = f"{NWS_API_BASE}/points/{latitude},{longitude}"
    points_data = await make_nws_request(points_url)

    if not points_data:
        return "Unable to fetch forecast data for this location."

    forecast_url = points_data["properties"]["forecast"]
    forecast_data = await make_nws_request(forecast_url)

    if not forecast_data:
        return "Unable to fetch detailed forecast."

    periods = forecast_data["properties"]["periods"]
    forecasts = []
    for period in periods[:5]:
        forecast = f"""
    {period["name"]}:
    Temperature: {period["temperature"]}°{period["temperatureUnit"]}
    Wind: {period["windSpeed"]} {period["windDirection"]}
    Forecast: {period["detailedForecast"]}
    """
        forecasts.append(forecast)
    return "\n---\n".join(forecasts)
```

### Step 5: Run the Server

```python
def main():
    mcp.run(transport="stdio")

if __name__ == "__main__":
    main()
```

Run: `uv run weather.py`

---

## TypeScript MCP Server

### Prerequisites
- Node.js 16+
- npm

### Step 1: Set Up Environment

```bash
mkdir weather && cd weather
npm init -y
npm install @modelcontextprotocol/sdk zod@3
npm install -D @types/node typescript
mkdir src && touch src/index.ts
```

**package.json additions:**
```json
{
  "type": "module",
  "bin": { "weather": "./build/index.js" },
  "scripts": { "build": "tsc && chmod 755 build/index.js" }
}
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true
  },
  "include": ["src/**/*"]
}
```

### Step 2: Initialize McpServer

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});
```

### Step 3: Register Tools

```typescript
server.registerTool(
  "get_alerts",
  {
    description: "Get weather alerts for a state",
    inputSchema: {
      state: z.string().length(2).describe("Two-letter state code (e.g. CA, NY)"),
    },
  },
  async ({ state }) => {
    const stateCode = state.toUpperCase();
    const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
    const alertsData = await makeNWSRequest(alertsUrl);

    if (!alertsData) {
      return { content: [{ type: "text", text: "Failed to retrieve alerts data" }] };
    }

    const features = alertsData.features || [];
    if (features.length === 0) {
      return { content: [{ type: "text", text: `No active alerts for ${stateCode}` }] };
    }

    const formattedAlerts = features.map(formatAlert);
    return {
      content: [{ type: "text", text: `Active alerts for ${stateCode}:\n\n${formattedAlerts.join("\n")}` }],
    };
  },
);
```

### Step 4: Run the Server

```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
```

Build and run: `npm run build`

---

## Connect to Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

### Python Server
```json
{
  "mcpServers": {
    "weather": {
      "command": "uv",
      "args": ["--directory", "/ABSOLUTE/PATH/TO/weather", "run", "weather.py"]
    }
  }
}
```

### TypeScript Server
```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/weather/build/index.js"]
    }
  }
}
```

Restart Claude Desktop after saving.

---

## Critical Logging Rules

| Transport | Do | Don't |
|-----------|-----|-------|
| **stdio** | Use `console.error()` or `logging.info()` (stderr) | `console.log()` or `print()` (corrupts JSON-RPC) |
| **HTTP** | Standard output logging is fine | — |

---

## Testing with MCP Inspector

The official MCP Inspector tool helps debug servers during development:
- Verify tool schemas
- Test edge cases
- Debug issues before connecting to a real client

---

## Official SDK Repos

| Language | Package | Stars |
|----------|---------|-------|
| Python | `mcp[cli]` / `fastmcp` | 21,900+ |
| TypeScript | `@modelcontextprotocol/sdk` | 11,700+ |
| Java | Official Java SDK | Active |
| C# | Official C# SDK (Microsoft) | Active |
| Go | Official Go SDK | Active |
| Kotlin | Official Kotlin SDK | Active |
| Ruby | Official Ruby SDK | Active |
| Swift | Official Swift SDK | Active |

---

## Patterns for Your Own Servers

### Pattern 1: Database MCP Server
Expose SQL execution, schema inspection, and data exploration as tools.

### Pattern 2: API Wrapper MCP Server
Wrap any REST API as MCP tools — the AI can call your APIs directly.

### Pattern 3: File System MCP Server
Expose file read/write/search capabilities for AI-powered file management.

### Pattern 4: DevOps MCP Server
Expose deployment, monitoring, and infrastructure management tools.

### Pattern 5: Knowledge Base MCP Server
Expose search, retrieval, and document analysis tools over your data.

## Key Takeaways

- **Python:** Use `FastMCP` — type hints + docstrings = auto-generated tool definitions
- **TypeScript:** Use `McpServer` + `zod` for input validation
- **Transport:** Start with stdio for local development, move to HTTP for production
- **Testing:** Use MCP Inspector before connecting to a real host
- **Logging:** NEVER use stdout for stdio servers (corrupts JSON-RPC)
- **Config:** Register in `claude_desktop_config.json` for Claude Desktop

## Related Sources

- [MCP Official Specification](./mcp-official-specification.md)
- [MCP Official Servers](../github-repos/mcp-official-servers.md)
- Topic: [mcp-servers](../topics/mcp-servers.md)

---

*Last processed: 2026-03-02*
