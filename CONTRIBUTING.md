# Contributing to AI Encyclopedia

Thanks for your interest in contributing! This is a community-driven AI knowledge base — the more people contribute, the better it gets for everyone.

## How to Contribute

### 1. Add a New Source (Easiest)

Found an amazing AI repo, article, video, or tool? Add it!

**Option A: Open a Pull Request**

1. Fork this repo
2. Add your source to `sources.json`:

```json
{
  "id": "unique-slug-name",
  "type": "github-repo",
  "url": "https://github.com/owner/repo",
  "title": "Human-Readable Title",
  "description": "One sentence explaining what this is.",
  "topics": ["ai", "relevant", "tags"],
  "added": "2026-03-02",
  "status": "pending",
  "notes": "Why this is worth including."
}
```

3. Run `node scripts/process-sources.js && node scripts/build-index.js`
4. Submit a PR

**Option B: Open an Issue**

Just open an issue with the link and a short description. Someone will add it.

**Supported source types:**

| Type | Use For |
|------|---------|
| `github-repo` | Open-source repos, SDKs, frameworks |
| `article` | Blog posts, documentation, tutorials |
| `youtube` | Video tutorials, demos, conference talks |
| `startup` | AI companies and products |
| `tool` | Developer tools and utilities |
| `paper` | Research papers |

### 2. Improve Existing Documentation

Found something wrong or incomplete in `knowledge/`?

1. Fork the repo
2. Edit the relevant `.md` file in `knowledge/`
3. Submit a PR with a description of what you changed and why

### 3. Add a New Topic Guide

Topic guides in `knowledge/topics/` cross-reference multiple sources. To create one:

1. Pick a topic that has 3+ sources (check `sources.json`)
2. Create `knowledge/topics/your-topic.md`
3. Follow the pattern in existing topic guides:
   - Summary table of related sources
   - Overview of the topic
   - Key patterns and concepts
   - Practical guidance ("How to use in your projects")
   - What to learn next

### 4. Improve the Scripts

The automation scripts in `scripts/` handle source processing and indexing. PRs welcome for:

- Better content scraping
- New source type processors
- Index improvements
- CLI UX enhancements

## Quality Standards

### What We Accept

- **Verified, high-quality sources** — official docs, well-maintained repos (50+ stars), reputable publications
- **Accurate documentation** — factual, up-to-date, technically correct
- **Practical content** — includes "how to use" guidance, not just theory
- **Clear writing** — concise, well-structured, scannable

### What We Don't Accept

- Low-quality or spam repos (< 50 stars with no clear value)
- Paywalled content that can't be summarized
- Duplicate sources (check `sources.json` first)
- Marketing/promotional content disguised as technical knowledge
- AI-generated content that hasn't been reviewed for accuracy
- Sources with no clear relevance to AI/ML/developer tools

## Source Quality Checklist

Before adding a source, verify:

- [ ] The source is actively maintained (updated within last 12 months)
- [ ] The content is technically accurate
- [ ] It provides actionable knowledge (not just hype)
- [ ] It doesn't duplicate an existing source in the knowledge base
- [ ] GitHub repos have meaningful stars/usage (50+ stars recommended)
- [ ] Articles are from reputable authors or publications

## Writing Style

- Use clear, direct language
- Include code examples where relevant
- Structure with headers, tables, and bullet points for scannability
- Always include "How to Use in Your Projects" sections
- Link to related sources within the knowledge base
- Add a "Key Takeaways" section at the end of each document

## PR Process

1. **Fork** the repo
2. **Create a branch** (`git checkout -b add/my-new-source`)
3. **Make your changes**
4. **Test** — run `node scripts/build-index.js` to verify the index builds
5. **Submit a PR** with:
   - What you added/changed
   - Why it's valuable
   - Any relevant context

PRs are typically reviewed within 48 hours.

## Code of Conduct

- Be respectful and constructive
- Focus on quality over quantity
- Give credit where credit is due
- Help others learn — that's the whole point

## Questions?

Open an issue with the `question` label. We're happy to help!

---

*AI Encyclopedia is MIT licensed and community-driven. Every contribution makes AI knowledge more accessible.*
