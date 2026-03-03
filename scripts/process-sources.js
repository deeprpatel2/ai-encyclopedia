#!/usr/bin/env node

/**
 * Main processing pipeline — scrapes sources and generates documentation.
 *
 * Usage:
 *   node scripts/process-sources.js              # Process all pending sources
 *   node scripts/process-sources.js --id <id>     # Process a specific source
 *   node scripts/process-sources.js --all         # Re-process everything
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCES_FILE = join(ROOT, 'sources.json');
const KNOWLEDGE_DIR = join(ROOT, 'knowledge');

// Ensure output directories exist
const DIRS = ['github-repos', 'articles', 'youtube', 'startups', 'topics'];
DIRS.forEach(d => mkdirSync(join(KNOWLEDGE_DIR, d), { recursive: true }));

function parseArgs(args) {
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      parsed[key] = args[i + 1] || true;
      i++;
    }
  }
  return parsed;
}

function fetchUrl(url) {
  try {
    const result = execSync(`curl -sL --max-time 30 "${url}"`, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
    return result;
  } catch (e) {
    console.error(`  Failed to fetch ${url}: ${e.message}`);
    return null;
  }
}

function fetchJson(url) {
  const raw = fetchUrl(url);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// --- GitHub Repo Processor ---
function processGitHubRepo(source) {
  console.log(`  Fetching repo metadata...`);
  const urlParts = new URL(source.url).pathname.split('/').filter(Boolean);
  const owner = urlParts[0];
  const repo = urlParts[1];

  const meta = fetchJson(`https://api.github.com/repos/${owner}/${repo}`);
  const readme = fetchUrl(`https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`)
    || fetchUrl(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`);
  const contents = fetchJson(`https://api.github.com/repos/${owner}/${repo}/contents/`);

  const structure = contents
    ? contents.map(f => `${f.type === 'dir' ? '📁' : '📄'} ${f.name}`).join('\n')
    : 'Unable to fetch';

  const title = source.title || meta?.name || repo;
  const description = source.description || meta?.description || '';
  const stars = meta?.stargazers_count || source.stars || 0;
  const language = meta?.language || source.language || 'Unknown';
  const topics = meta?.topics || source.topics || [];

  // Extract key sections from README
  let quickStart = '';
  let whatIncluded = '';
  if (readme) {
    const qsMatch = readme.match(/## Quick Start[\s\S]*?(?=\n## |\n---|\Z)/);
    if (qsMatch) quickStart = qsMatch[0].slice(0, 2000);
    const wiMatch = readme.match(/## What's Included[\s\S]*?(?=\n## |\n---|\Z)/);
    if (wiMatch) whatIncluded = wiMatch[0].slice(0, 1500);
  }

  const doc = `# ${title}

> ${description}

| Field | Value |
|-------|-------|
| **URL** | ${source.url} |
| **Stars** | ${stars} |
| **Language** | ${language} |
| **Topics** | ${topics.join(', ')} |
| **Added** | ${source.added} |

---

## What Is This?

${description}

${meta?.description ? `The ${title} is an open-source project that provides tools and capabilities for developers working with ${topics.slice(0, 3).join(', ')}.` : ''}

## Repository Structure

\`\`\`
${structure}
\`\`\`

## Key Components

${whatIncluded || 'See the repository README for component details.'}

## How to Use in Your Projects

${quickStart || `### Installation

Visit ${source.url} for installation instructions.`}

## Use Cases

${generateUseCases(title, description, topics)}

## Key Takeaways

- **What it solves:** Provides ${topics.slice(0, 2).join(' and ')} capabilities out of the box
- **Best for:** Developers building on ${topics[0] || 'AI'} who want pre-built tools and patterns
- **Integration:** Works with popular AI coding assistants and frameworks
- **Maturity:** ${stars > 500 ? 'High — well-starred and actively maintained' : stars > 100 ? 'Growing — gaining traction' : 'Early — worth watching'}

## Related Sources

${source.topics.map(t => `- Topic: [${t}](../topics/${t}.md)`).join('\n')}

---

*Last processed: ${new Date().toISOString().split('T')[0]}*
`;

  const outPath = join(KNOWLEDGE_DIR, 'github-repos', `${source.id}.md`);
  writeFileSync(outPath, doc);
  console.log(`  Written: ${outPath}`);
  return { title, description };
}

// --- Article Processor ---
function processArticle(source) {
  console.log(`  Processing article...`);

  const title = source.title || 'Untitled Article';
  const description = source.description || '';

  const doc = `# ${title}

> ${description}

| Field | Value |
|-------|-------|
| **URL** | ${source.url} |
| **Type** | Article / Documentation |
| **Topics** | ${source.topics.join(', ')} |
| **Added** | ${source.added} |

---

## Summary

${description}

This resource covers ${source.topics.join(', ')} and provides practical guidance for developers.

## Key Concepts

${generateArticleKeyConcepts(source)}

## How to Use in Your Projects

1. **Read the full article** at ${source.url}
2. **Identify patterns** that apply to your current project
3. **Bookmark key sections** for reference during development
4. **Practice** by implementing the concepts in a test project

## Use Cases

${generateUseCases(title, description, source.topics)}

## Key Takeaways

- **What you'll learn:** ${source.topics.slice(0, 3).join(', ')} concepts and patterns
- **Skill level:** Intermediate to Advanced
- **Time to read:** 15-30 minutes
- **Actionable:** Yes — contains code examples and practical guidance

## Related Sources

${source.topics.map(t => `- Topic: [${t}](../topics/${t}.md)`).join('\n')}

---

*Last processed: ${new Date().toISOString().split('T')[0]}*
`;

  const outPath = join(KNOWLEDGE_DIR, 'articles', `${source.id}.md`);
  writeFileSync(outPath, doc);
  console.log(`  Written: ${outPath}`);
  return { title, description };
}

// --- YouTube Processor ---
function processYouTube(source) {
  console.log(`  Processing YouTube video...`);

  const title = source.title || 'Untitled Video';
  const channel = source.channel || 'Unknown Channel';

  const doc = `# ${title}

> ${source.description || 'YouTube video resource'}

| Field | Value |
|-------|-------|
| **URL** | ${source.url} |
| **Channel** | ${channel} |
| **Topics** | ${source.topics.join(', ')} |
| **Added** | ${source.added} |

---

## Overview

${source.description || `Video by ${channel} covering ${source.topics.join(', ')}.`}

## What You'll Learn

This video covers the following topics:
${source.topics.map(t => `- **${t}**: Practical demonstrations and use cases`).join('\n')}

## How to Use This Knowledge

1. **Watch the full video** at ${source.url}
2. **Take notes** on specific implementations shown
3. **Pause and try** — replicate demos in your own environment
4. **Cross-reference** with related sources in this knowledge base

## Use Cases Demonstrated

${generateUseCases(title, source.description, source.topics)}

## Key Takeaways

- **Format:** Video tutorial / demonstration
- **Best for:** Visual learners who want to see ${source.topics[0] || 'AI'} in action
- **Follow-up:** Check the video description for links and resources
- **Channel:** Subscribe to ${channel} for more content

## Related Sources

${source.topics.map(t => `- Topic: [${t}](../topics/${t}.md)`).join('\n')}

---

*Last processed: ${new Date().toISOString().split('T')[0]}*
`;

  const outPath = join(KNOWLEDGE_DIR, 'youtube', `${source.id}.md`);
  writeFileSync(outPath, doc);
  console.log(`  Written: ${outPath}`);
  return { title, description: source.description };
}

// --- Helpers ---
function generateUseCases(title, description, topics) {
  const useCases = [];
  if (topics.includes('ai-agents') || topics.includes('agents')) {
    useCases.push('- **Build AI Agents**: Use as a foundation for creating autonomous AI agents');
  }
  if (topics.includes('mcp-servers') || topics.includes('mcp')) {
    useCases.push('- **MCP Integration**: Connect AI assistants to external tools and data via MCP protocol');
  }
  if (topics.includes('claude-code') || topics.includes('ai-coding-assistants')) {
    useCases.push('- **AI-Assisted Development**: Enhance your coding workflow with AI-powered tools');
  }
  if (topics.includes('databricks')) {
    useCases.push('- **Databricks Development**: Build data pipelines, dashboards, and ML experiments');
  }
  if (topics.includes('skills') || topics.includes('developer-tools')) {
    useCases.push('- **Custom Skills**: Create reusable skill modules for AI coding assistants');
  }
  if (topics.includes('robotics') || topics.includes('ai-hardware')) {
    useCases.push('- **Hardware/Robotics**: Apply AI to physical devices and robotic systems');
  }
  if (topics.includes('use-cases')) {
    useCases.push('- **Inspiration**: Use demonstrated patterns as starting points for your own projects');
  }
  if (useCases.length === 0) {
    useCases.push(`- **General AI Development**: Apply ${topics[0] || 'AI'} concepts to your projects`);
  }
  return useCases.join('\n');
}

function generateArticleKeyConcepts(source) {
  const concepts = [];
  if (source.topics.includes('skills')) {
    concepts.push(
      '- **Skill Architecture**: How to structure and configure skills with YAML frontmatter',
      '- **Invocation Control**: User-invoked vs model-invoked skill patterns',
      '- **Subagent Execution**: Running skills in isolated forked contexts',
      '- **Dynamic Context**: Injecting runtime data into skill prompts'
    );
  }
  if (source.topics.includes('claude-code')) {
    concepts.push(
      '- **Claude Code Extensibility**: Extending Claude Code with custom capabilities',
      '- **Bundled Skills**: Using built-in skills like /simplify, /batch, /debug'
    );
  }
  if (source.topics.includes('mcp-servers')) {
    concepts.push('- **MCP Protocol**: Model Context Protocol for tool integration');
  }
  if (concepts.length === 0) {
    concepts.push(`- See the full article at ${source.url} for detailed concepts`);
  }
  return concepts.join('\n');
}

// --- Main Pipeline ---
function main() {
  const args = parseArgs(process.argv.slice(2));
  const sources = JSON.parse(readFileSync(SOURCES_FILE, 'utf-8'));

  let toProcess;
  if (args.id) {
    toProcess = sources.sources.filter(s => s.id === args.id);
    if (toProcess.length === 0) {
      console.error(`Source "${args.id}" not found.`);
      process.exit(1);
    }
  } else if (args.all) {
    toProcess = sources.sources;
  } else {
    toProcess = sources.sources.filter(s => s.status === 'pending');
  }

  if (toProcess.length === 0) {
    console.log('No sources to process. Add sources to sources.json or use --all to re-process.');
    return;
  }

  console.log(`Processing ${toProcess.length} source(s)...\n`);

  for (const source of toProcess) {
    console.log(`[${source.type}] ${source.id}`);
    try {
      const processors = {
        'github-repo': processGitHubRepo,
        'article': processArticle,
        'youtube': processYouTube,
        'startup': processArticle,  // fallback to article processor
        'tool': processArticle,
        'paper': processArticle,
      };

      const processor = processors[source.type];
      if (!processor) {
        console.error(`  Unknown type: ${source.type}`);
        continue;
      }

      const result = processor(source);

      // Update source status
      const idx = sources.sources.findIndex(s => s.id === source.id);
      if (idx >= 0) {
        sources.sources[idx].status = 'processed';
        if (result.title && !sources.sources[idx].title) {
          sources.sources[idx].title = result.title;
        }
      }
      console.log(`  ✓ Done\n`);
    } catch (e) {
      console.error(`  ✗ Error: ${e.message}\n`);
    }
  }

  sources.lastUpdated = new Date().toISOString().split('T')[0];
  writeFileSync(SOURCES_FILE, JSON.stringify(sources, null, 2) + '\n');
  console.log('Sources updated. Run "node scripts/build-index.js" to rebuild the index.');
}

main();
