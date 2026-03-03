# DP Patel AI Knowledge Base

> A personal AI encyclopedia that grows with every source you feed it. GitHub repos, articles, YouTube videos, startups — all indexed, documented, and cross-referenced.

## How It Works

```
You add a source → Scripts scrape & process it → Rich documentation is generated → Master index auto-updates
```

**Three types of knowledge:**
1. **Individual Source Docs** — Deep-dive on each repo/article/video with use cases, how-to guides, and key takeaways
2. **Topic Guides** — Cross-source knowledge grouped by theme (e.g., "AI Agents", "MCP Servers")
3. **Master Index** — Searchable catalog of everything in the knowledge base

## Quick Start

### Add a New Source

Edit `sources.json` and add your source:

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

**Supported types:** `github-repo`, `article`, `youtube`, `startup`, `tool`, `paper`

### Process Sources

```bash
# Install dependencies
npm install

# Process all pending sources (scrape + generate docs)
node scripts/process-sources.js

# Process a single source by ID
node scripts/process-sources.js --id databricks-ai-dev-kit

# Add a source via CLI
node scripts/add-source.js --type github-repo --url "https://github.com/owner/repo" --topics "ai,agents"

# Rebuild the master index
node scripts/build-index.js

# Find related external content for a topic
node scripts/discover.js --topic "ai agents"
```

## Project Structure

```
AIKnowledgebase/
├── README.md                          # You are here
├── KNOWLEDGE_INDEX.md                 # Master index (auto-generated)
├── sources.json                       # Source registry — add content here
├── package.json                       # Node.js dependencies
│
├── knowledge/                         # Generated documentation
│   ├── github-repos/                  # GitHub repo deep-dives
│   │   └── databricks-ai-dev-kit.md
│   ├── articles/                      # Article summaries & guides
│   │   └── claude-code-skills.md
│   ├── youtube/                       # Video breakdowns
│   │   └── openclaw-use-cases.md
│   ├── startups/                      # Startup profiles
│   └── topics/                        # Cross-source topic guides
│       └── ai-coding-assistants.md
│
├── scripts/                           # Automation
│   ├── process-sources.js             # Main processing pipeline
│   ├── add-source.js                  # CLI to add new sources
│   ├── build-index.js                 # Rebuild master index
│   ├── discover.js                    # Find related external content
│   └── scrapers/                      # Content scrapers by type
│       ├── github.js
│       ├── article.js
│       └── youtube.js
│
├── templates/                         # Documentation templates
│   ├── github-repo.md
│   ├── article.md
│   └── youtube.md
│
└── .github/workflows/
    └── update-knowledge.yml           # Auto-update on push
```

## Source Registry

All sources live in `sources.json`. Each source has:

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique slug identifier |
| `type` | Yes | `github-repo`, `article`, `youtube`, `startup`, `tool`, `paper` |
| `url` | Yes | Source URL |
| `title` | No | Human-readable title (auto-filled on processing) |
| `topics` | Yes | Array of topic tags for cross-referencing |
| `added` | Yes | Date added (YYYY-MM-DD) |
| `status` | Auto | `pending` → `processed` → `indexed` |
| `notes` | No | Your personal notes |

## Knowledge Categories

| Category | What Goes Here |
|----------|---------------|
| **GitHub Repos** | Open-source tools, SDKs, frameworks, starter kits |
| **Articles** | Technical docs, blog posts, tutorials, guides |
| **YouTube** | Video tutorials, demos, conference talks |
| **Startups** | AI companies, products, platforms to watch |
| **Topics** | Cross-source guides combining multiple sources |

## Auto-Discovery

Run `node scripts/discover.js --topic "your topic"` to find high-quality external content related to topics in your knowledge base. It searches for:
- GitHub repos with 100+ stars
- Official documentation
- Verified technical articles

Only quality, verified sources are suggested — no spam or low-quality content.

## Contributing to Your Own Knowledge Base

1. Find something interesting → Add to `sources.json`
2. Run `node scripts/process-sources.js`
3. Review generated docs in `knowledge/`
4. Commit and push — GitHub Action rebuilds the index

## Stats

<!-- AUTO-UPDATED -->
- **Total Sources:** 3
- **GitHub Repos:** 1
- **Articles:** 1
- **YouTube Videos:** 1
- **Topics Covered:** AI Coding Assistants, MCP Servers, Databricks, AI Agents

---

*Built by DP Patel — AI Knowledge Encyclopedia*
