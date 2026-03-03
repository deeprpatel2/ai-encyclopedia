# AI Encyclopedia

> The open-source, community-driven AI knowledge base. GitHub repos, articles, videos, tools — all scraped, documented, indexed, and cross-referenced. Add a source, get rich documentation.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Sources](https://img.shields.io/badge/sources-9-green.svg)](KNOWLEDGE_INDEX.md)
[![Topics](https://img.shields.io/badge/topics-26-orange.svg)](KNOWLEDGE_INDEX.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## What Is This?

A living knowledge base that turns AI resources into organized, actionable documentation.

```
You add a source → Scripts scrape & process it → Rich docs are generated → Master index auto-updates
```

**Three types of knowledge:**
1. **Individual Source Docs** — Deep-dive on each repo/article/video with use cases and how-to guides
2. **Topic Guides** — Cross-source knowledge grouped by theme (e.g., "MCP Servers", "AI Agents")
3. **Master Index** — Searchable catalog of everything, auto-generated

## Browse the Knowledge Base

| Topic | Sources | Start Here |
|-------|---------|------------|
| **MCP Servers** | 8 sources | [Complete MCP Guide](knowledge/topics/mcp-servers.md) |
| **AI Coding Assistants** | 2 sources | [AI Coding Tools Guide](knowledge/topics/ai-coding-assistants.md) |
| **Full Index** | 9 sources, 26 topics | [KNOWLEDGE_INDEX.md](KNOWLEDGE_INDEX.md) |

### Featured Sources

| Source | Type | Stars | Doc |
|--------|------|-------|-----|
| MCP Official Servers | GitHub | 79,900+ | [Read](knowledge/github-repos/mcp-official-servers.md) |
| GitHub MCP Server | GitHub | 27,400+ | [Read](knowledge/github-repos/github-mcp-server.md) |
| MCP Python SDK (FastMCP) | GitHub | 21,900+ | [Read](knowledge/github-repos/mcp-python-sdk.md) |
| MCP TypeScript SDK | GitHub | 11,700+ | [Read](knowledge/github-repos/mcp-typescript-sdk.md) |
| MCP Specification | Spec | Official | [Read](knowledge/articles/mcp-official-specification.md) |
| Build an MCP Server | Tutorial | Official | [Read](knowledge/articles/mcp-build-server-tutorial.md) |
| Claude Code Skills | Docs | Official | [Read](knowledge/articles/claude-code-skills.md) |
| Databricks AI Dev Kit | GitHub | 744 | [Read](knowledge/github-repos/databricks-ai-dev-kit.md) |

## Quick Start

### Add a New Source

**Via CLI:**
```bash
npm install  # first time only

# GitHub repo
node scripts/add-source.js --type github-repo --url "https://github.com/owner/repo" --topics "ai,agents"

# Article or docs
node scripts/add-source.js --type article --url "https://example.com/post" --topics "llm,tutorial" --title "My Article"

# YouTube video
node scripts/add-source.js --type youtube --url "https://youtube.com/watch?v=xxx" --topics "demo,ai"

# Then process and index
node scripts/process-sources.js && node scripts/build-index.js
```

**Or just edit `sources.json` directly:**
```json
{
  "id": "my-new-source",
  "type": "github-repo",
  "url": "https://github.com/owner/repo",
  "topics": ["ai", "agents"],
  "added": "2026-03-02",
  "status": "pending"
}
```

### Discover Related Content

```bash
# Find high-quality repos (100+ stars) on a topic
node scripts/discover.js --topic "ai agents"
node scripts/discover.js --topic "mcp servers" --min-stars 500
```

## Project Structure

```
ai-encyclopedia/
├── README.md                          # You are here
├── KNOWLEDGE_INDEX.md                 # Master index (auto-generated)
├── CONTRIBUTING.md                    # How to contribute
├── LICENSE                            # MIT License
├── sources.json                       # Source registry — add content here
├── package.json                       # Node.js dependencies
│
├── knowledge/                         # Generated documentation
│   ├── github-repos/                  # GitHub repo deep-dives
│   ├── articles/                      # Article summaries & guides
│   ├── youtube/                       # Video breakdowns
│   ├── startups/                      # Startup profiles
│   └── topics/                        # Cross-source topic guides
│
├── scripts/                           # Automation
│   ├── process-sources.js             # Main processing pipeline
│   ├── add-source.js                  # CLI to add new sources
│   ├── build-index.js                 # Rebuild master index
│   └── discover.js                    # Find related external content
│
├── templates/                         # Documentation templates
│   ├── github-repo.md
│   ├── article.md
│   └── youtube.md
│
└── .github/workflows/
    └── update-knowledge.yml           # Auto-update on push
```

## Supported Source Types

| Type | Use For | Example |
|------|---------|---------|
| `github-repo` | Open-source repos, SDKs, tools | MCP Python SDK |
| `article` | Docs, blog posts, tutorials | MCP Specification |
| `youtube` | Video tutorials, demos, talks | Conference presentations |
| `startup` | AI companies, products | Emerging AI tools |
| `tool` | Developer utilities | CLI tools, extensions |
| `paper` | Research papers | arXiv papers |

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

**The short version:**
1. Fork the repo
2. Add your source to `sources.json` or improve docs in `knowledge/`
3. Run `node scripts/build-index.js` to verify
4. Submit a PR

**Quality bar:** We only accept verified, high-quality sources — official docs, well-maintained repos (50+ stars), reputable publications. No spam, no marketing fluff.

## How It Works

### Auto-Processing Pipeline

```
sources.json (you add a URL)
    ↓
process-sources.js (scrapes content, generates docs)
    ↓
knowledge/ (rich markdown documentation)
    ↓
build-index.js (rebuilds master index)
    ↓
KNOWLEDGE_INDEX.md (searchable, cross-referenced)
```

### GitHub Action

When you push changes to `sources.json`, the GitHub Action automatically:
1. Processes any `"status": "pending"` sources
2. Rebuilds the knowledge index
3. Commits the generated docs

## License

[MIT License](LICENSE) — use it, fork it, build on it.

---

*AI Encyclopedia — Making AI knowledge accessible, organized, and actionable.*
*Open to everyone.*
